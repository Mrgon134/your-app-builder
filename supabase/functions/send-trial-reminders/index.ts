import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const APP_URL = Deno.env.get("PUBLIC_APP_URL") || "https://nuju.app";
const FROM_EMAIL = Deno.env.get("LIFECYCLE_EMAIL_FROM") || "Ju from Nuju <hello@nuju.app>";
const DAY_MS = 24 * 60 * 60 * 1000;
const TRIAL_DAYS = 7;

type ReminderCampaign = "trial_ending_2_day" | "trial_expired_1_day";

interface Profile {
  id: string;
  display_name: string | null;
  language: string | null;
  trial_started_at: string | null;
  plan: string | null;
}

type DeliveryResult = {
  ok: boolean;
  id: string | null;
  error: string | null;
};

const safeText = (value: unknown, fallback = "") =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : fallback;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getBearerToken = (req: Request) =>
  (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();

function assertCronAuth(req: Request) {
  const token = getBearerToken(req);
  const allowedTokens = [
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    Deno.env.get("REMINDER_CRON_SECRET"),
  ].filter((value): value is string => Boolean(value));

  // The existing pg_cron job calls this function without auth headers. Keep that
  // path working, but reject explicitly wrong bearer tokens so bad configs fail loudly.
  if (token && allowedTokens.length > 0 && !allowedTokens.includes(token)) {
    throw new Error("Unauthorized");
  }
}

async function sendEmail(
  resendApiKey: string,
  to: string,
  subject: string,
  html: string,
): Promise<DeliveryResult> {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    }),
  });

  const text = await resp.text();
  let payload: Record<string, unknown> | null = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  if (!resp.ok) {
    const error = safeText(payload?.message || payload?.error || text, `Resend ${resp.status}`);
    console.error("Resend error:", resp.status, error);
    return { ok: false, id: null, error };
  }

  return { ok: true, id: safeText(payload?.id) || null, error: null };
}

function buildReminderEmail(
  name: string,
  campaign: ReminderCampaign,
  lang: string,
): { subject: string; html: string } {
  const displayName = escapeHtml(name || "there");
  const continueUrl = `${APP_URL}/app?screen=pro&source=trial_email&campaign=${encodeURIComponent(campaign)}`;

  if (campaign === "trial_ending_2_day") {
    const subject = lang === "id"
      ? "Trial Nuju kamu berakhir dalam 2 hari"
      : "Your Nuju trial ends in 2 days";

    const body = lang === "id"
      ? {
          title: `Hi ${displayName}, trial Nuju kamu hampir selesai.`,
          intro: "Akses trial kamu berakhir dalam 2 hari.",
          items: [
            "Ju's deeper emotional read",
            "Voice journaling and transcription",
            "Weekly and monthly insight reviews",
            "Unlimited journal history",
          ],
          cta: "Keep Nuju Pro",
          footer: "Pilih weekly, 3 month, atau lifetime access kapan pun kamu siap.",
        }
      : {
          title: `Hi ${displayName}, your Nuju trial is almost done.`,
          intro: "Your trial access ends in 2 days.",
          items: [
            "Ju's deeper emotional read",
            "Voice journaling and transcription",
            "Weekly and monthly insight reviews",
            "Unlimited journal history",
          ],
          cta: "Keep Nuju Pro",
          footer: "Choose weekly, 3 month, or lifetime access whenever you are ready.",
        };

    return { subject, html: renderEmail(body, continueUrl) };
  }

  const subject = lang === "id"
    ? "Trial Nuju kamu sudah berakhir"
    : "Your Nuju trial has ended";

  const body = lang === "id"
    ? {
        title: `Hi ${displayName}, trial Nuju kamu sudah berakhir.`,
        intro: "Kamu bisa tetap lanjut dengan Nuju Pro supaya Ju tetap bisa membaca pola, suara, dan refleksi panjangmu.",
        items: [
          "Keep deeper AI reflections",
          "Keep voice journaling",
          "Keep long-term mood insight",
          "Keep your full journal history",
        ],
        cta: "Restore Nuju Pro",
        footer: "Tidak ada perubahan otomatis dari email ini. Kamu tetap memilih sendiri di aplikasi.",
      }
    : {
        title: `Hi ${displayName}, your Nuju trial has ended.`,
        intro: "You can continue with Nuju Pro so Ju can keep reading your patterns, voice entries, and longer reflections.",
        items: [
          "Keep deeper AI reflections",
          "Keep voice journaling",
          "Keep long-term mood insight",
          "Keep your full journal history",
        ],
        cta: "Restore Nuju Pro",
        footer: "This email does not change your subscription. You stay in control inside the app.",
      };

  return { subject, html: renderEmail(body, continueUrl) };
}

function renderEmail(
  body: { title: string; intro: string; items: string[]; cta: string; footer: string },
  continueUrl: string,
) {
  const items = body.items
    .map((item) => `<li style="margin:8px 0;color:#332b42">${escapeHtml(item)}</li>`)
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f4f0ff;padding:28px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#17151f">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2dcfb;border-radius:24px;padding:28px">
      <p style="margin:0 0 18px;color:#6b5bd6;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:800">Nuju Pro</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.16;color:#17151f">${body.title}</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#514a62">${escapeHtml(body.intro)}</p>
      <ul style="margin:0 0 24px;padding-left:20px;font-size:15px;line-height:1.55">${items}</ul>
      <a href="${continueUrl}" style="display:inline-block;background:#6b5bd6;color:#fff;text-decoration:none;border-radius:999px;padding:13px 22px;font-weight:800;font-size:15px">${escapeHtml(body.cta)}</a>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#7d748f">${escapeHtml(body.footer)}</p>
      <p style="margin:18px 0 0;font-size:12px;line-height:1.5;color:#9b94ab">Nuju - ${APP_URL}</p>
    </div>
  </body>
</html>`;
}

function pickCampaign(trialStartedAt: string | null): ReminderCampaign | null {
  if (!trialStartedAt) return null;

  const trialStart = new Date(trialStartedAt).getTime();
  if (!Number.isFinite(trialStart)) return null;

  const expiresAt = trialStart + TRIAL_DAYS * DAY_MS;
  const hoursUntilExpiry = (expiresAt - Date.now()) / (60 * 60 * 1000);

  if (hoursUntilExpiry > 24 && hoursUntilExpiry <= 48) return "trial_ending_2_day";
  if (hoursUntilExpiry <= -24 && hoursUntilExpiry > -48) return "trial_expired_1_day";

  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    assertCronAuth(req);

    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const dryRun = body.dryRun === true;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase service role credentials are missing");
    }

    if (!RESEND_API_KEY && !dryRun) {
      console.warn("RESEND_API_KEY not set; skipping email sends");
      return new Response(JSON.stringify({ skipped: true, reason: "RESEND_API_KEY not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, display_name, language, trial_started_at, plan")
      .eq("plan", "free")
      .not("trial_started_at", "is", null);

    if (error) throw error;

    let sent2Day = 0;
    let sentExpired = 0;
    let skipped = 0;
    let failed = 0;
    const results: Record<string, unknown>[] = [];

    for (const profile of (profiles as Profile[]) || []) {
      const campaign = pickCampaign(profile.trial_started_at);
      if (!campaign) continue;

      const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(profile.id);
      if (authError || !user?.email) {
        skipped++;
        results.push({ profileId: profile.id, campaign, status: "skipped", reason: authError?.message || "missing email" });
        continue;
      }

      const { data: existing, error: existingError } = await supabase
        .from("lifecycle_email_events")
        .select("id, status")
        .eq("recipient_email", user.email.toLowerCase())
        .eq("campaign", campaign)
        .in("status", ["queued", "sent"])
        .limit(1);

      if (existingError) throw existingError;
      if ((existing || []).length > 0) {
        skipped++;
        results.push({ email: user.email, campaign, status: "skipped", reason: "already queued or sent" });
        continue;
      }

      const lang = profile.language || "en";
      const name = profile.display_name || "";
      const { subject, html } = buildReminderEmail(name, campaign, lang);

      if (dryRun) {
        results.push({ email: user.email, campaign, status: "preview", subject });
        continue;
      }

      const { data: event, error: eventError } = await supabase
        .from("lifecycle_email_events")
        .insert({
          recipient_email: user.email.toLowerCase(),
          profile_id: profile.id,
          campaign,
          status: "queued",
          subject,
          metadata_json: {
            plan: profile.plan,
            trial_started_at: profile.trial_started_at,
            source: "send-trial-reminders",
          },
        })
        .select("id")
        .single();

      if (eventError) {
        skipped++;
        results.push({ email: user.email, campaign, status: "skipped", reason: eventError.message });
        continue;
      }

      const delivery = await sendEmail(RESEND_API_KEY!, user.email, subject, html);

      if (delivery.ok) {
        if (campaign === "trial_ending_2_day") sent2Day++;
        if (campaign === "trial_expired_1_day") sentExpired++;

        await supabase
          .from("lifecycle_email_events")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            provider_message_id: delivery.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", event.id);
      } else {
        failed++;
        await supabase
          .from("lifecycle_email_events")
          .update({
            status: "failed",
            error_message: delivery.error,
            updated_at: new Date().toISOString(),
          })
          .eq("id", event.id);
      }

      results.push({
        email: user.email,
        campaign,
        status: delivery.ok ? "sent" : "failed",
        messageId: delivery.id,
        error: delivery.error,
      });
    }

    return new Response(
      JSON.stringify({ success: true, dryRun, sent2Day, sentExpired, skipped, failed, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown";
    const status = message === "Unauthorized" ? 401 : 500;
    console.error("Trial reminder error:", e);
    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

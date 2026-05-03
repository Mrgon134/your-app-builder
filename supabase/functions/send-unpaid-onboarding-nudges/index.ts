import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const APP_URL = Deno.env.get("PUBLIC_APP_URL") || "https://nuju.app";
const FROM_EMAIL = Deno.env.get("LIFECYCLE_EMAIL_FROM") || "Ju from Nuju <hello@nuju.app>";

type Campaign = "plan_ready" | "checkout_still_open" | "payment_failed" | "still_here";

type LeadRow = {
  id: string;
  session_id: string;
  user_id: string | null;
  source: string;
  email: string | null;
  name: string | null;
  answers: Record<string, unknown> | null;
  reveal: Record<string, unknown> | null;
  selected_plan: string | null;
  created_at: string;
  updated_at: string;
};

type CheckoutIntentRow = {
  id: string;
  session_id: string;
  email: string;
  name: string | null;
  plan: string;
  status: "initiated" | "processing" | "paid" | "claimed" | "failed" | "expired";
  claimed_user_id: string | null;
  created_at: string;
  updated_at: string;
};

type LifecycleEventRow = {
  recipient_email: string;
  campaign: Campaign;
  status: "queued" | "sent" | "skipped" | "failed";
  sent_at: string | null;
  created_at: string;
};

type ProfileRow = {
  id: string;
  plan: string | null;
  plan_expires_at: string | null;
};

type Candidate = {
  lead: LeadRow;
  intent: CheckoutIntentRow | null;
  campaign: Campaign;
  email: string;
};

const campaignLabels: Record<Campaign, string> = {
  plan_ready: "Plan ready",
  checkout_still_open: "Checkout still open",
  payment_failed: "Payment failed",
  still_here: "Still here",
};

const safeText = (value: unknown, fallback = "") => (
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : fallback
);

const normalizeEmail = (value: unknown) => safeText(value).toLowerCase();

const isExcludedRecipient = (email: string) => {
  const normalized = normalizeEmail(email);
  if (!normalized) return true;

  const excludedDomains = [
    "@icloud.com",
    "@me.com",
    "@mac.com",
    "@privaterelay.appleid.com",
    "@nuju.app",
    "@example.com",
  ];

  if (excludedDomains.some((domain) => normalized.endsWith(domain))) return true;
  if (normalized === "test@test.com") return true;
  if (normalized === "skyjonay@gmail.com") return true;
  if (normalized === "irfanzaen@gmail.com" || normalized === "irfanzaenjr@gmail.com") return true;
  if (normalized.startsWith("debug+") || normalized.startsWith("reviewer+")) return true;
  if (normalized.includes("+test")) return true;

  return false;
};

const clampNumber = (value: unknown, fallback: number, min: number, max: number) => {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getBearerToken = (req: Request) =>
  (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();

const isAuthorized = (req: Request) => {
  const token = getBearerToken(req);
  const allowedTokens = [
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    Deno.env.get("UNPAID_NUDGE_CRON_SECRET"),
  ].filter((value): value is string => Boolean(value));

  return Boolean(token && allowedTokens.includes(token));
};

const getServiceClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service role credentials are missing");
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

const answerLabel = (answers: Record<string, unknown> | null, key: string) => {
  const value = safeText(answers?.[key]);
  const labels: Record<string, string> = {
    overwhelmed: "everything has been feeling like too much",
    unseen: "you have been wanting to feel understood without explaining everything",
    disconnected: "you have been feeling far from yourself lately",
    spiraling: "your thoughts can get loud before you have words for them",
    late_night: "the weight tends to get louder late at night",
    after_conflict: "the weight tends to linger after conflict",
    while_busy: "you keep moving while carrying more than people can see",
    when_alone: "things feel heavier when you are alone with them",
    burden: "you are careful not to feel like a burden",
    words: "the words do not always arrive when you need them",
    functioning: "you keep functioning even when something inside feels stretched",
    privacy: "you need privacy before the honest part can come out",
    name_it: "you want clearer words for what is happening",
    calm_me: "you want the noise to come down first",
    stay_with_me: "you want something gentle to stay with the feeling",
    show_pattern: "you want help seeing the pattern underneath it",
    breathe: "you want a little more room to breathe",
    softer: "you want to feel softer toward yourself",
    clearer: "you want clearer language for the weight",
    less_alone: "you want to feel less alone with it",
  };

  return labels[value] || "";
};

const buildStateLine = (lead: LeadRow) => {
  const answers = lead.answers || {};
  const parts = [
    answerLabel(answers, "goal"),
    answerLabel(answers, "hardestMoment"),
    answerLabel(answers, "blocker"),
    answerLabel(answers, "focus"),
    answerLabel(answers, "relief"),
  ].filter(Boolean);

  if (parts.length === 0) {
    return "you have been trying to find a gentler way to understand what is going on inside";
  }

  if (parts.length === 1) return parts[0];
  return `${parts[0]}, and ${parts[1]}`;
};

const buildEmail = (candidate: Candidate) => {
  const { lead, intent, campaign, email } = candidate;
  const name = safeText(lead.name || intent?.name) || "there";
  const stateLine = buildStateLine(lead);
  const plan = safeText(lead.selected_plan || intent?.plan);
  const planLine = plan
    ? `The plan you chose is still ready when you want to continue.`
    : "Your next step is still ready when you want to continue.";
  const continueUrl = `${APP_URL}/onboarding?source=email&campaign=${encodeURIComponent(campaign)}`;

  const subjects: Record<Campaign, string> = {
    plan_ready: "Your next step is ready",
    checkout_still_open: "Your plan is still here",
    payment_failed: "Your payment did not go through",
    still_here: "Still here when you are ready",
  };

  const intros: Record<Campaign, string> = {
    plan_ready: `Based on what you shared, it sounds like ${stateLine}.`,
    checkout_still_open: `You were close to starting, and based on what you shared, it sounds like ${stateLine}.`,
    payment_failed: `Your payment did not go through, but nothing about your plan was lost. Based on what you shared, it sounds like ${stateLine}.`,
    still_here: `No pressure from this side. Based on what you shared, it sounds like ${stateLine}.`,
  };

  const subject = subjects[campaign];
  const preview = "A quieter way to start is ready for you.";
  const escapedName = escapeHtml(name);
  const escapedIntro = escapeHtml(intros[campaign]);
  const escapedPlanLine = escapeHtml(planLine);
  const escapedEmail = escapeHtml(email);

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f6f2ec;padding:28px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#241f1a">
    <div style="max-width:560px;margin:0 auto;background:#fffaf4;border:1px solid #eadfce;border-radius:24px;padding:28px">
      <p style="margin:0 0 18px;color:#7a6b5c;font-size:13px;letter-spacing:.08em;text-transform:uppercase">Nuju</p>
      <h1 style="margin:0 0 18px;font-size:28px;line-height:1.18;font-weight:700;color:#241f1a">Hi ${escapedName}, your next step is ready.</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#3b332b">${escapedIntro}</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#3b332b">Nuju prepared a softer way to begin: small steps, clear guidance, and support that meets you where you are now.</p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#3b332b">${escapedPlanLine}</p>
      <a href="${continueUrl}" style="display:inline-block;background:#8f7762;color:#fff;text-decoration:none;border-radius:999px;padding:13px 20px;font-weight:700;font-size:15px">Continue my plan</a>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8b7d70">If now is not a good time, you can leave this for later. To stop these emails, reply with unsubscribe.</p>
      <p style="margin:18px 0 0;font-size:12px;line-height:1.5;color:#a19487">Sent to ${escapedEmail} by Nuju.</p>
    </div>
    <div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preview)}</div>
  </body>
</html>`;

  return { subject, html };
};

const sendEmail = async (to: string, subject: string, html: string) => {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured", id: null as string | null };
  }

  const response = await fetch("https://api.resend.com/emails", {
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

  const text = await response.text();
  let payload: Record<string, unknown> | null = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    return {
      ok: false,
      error: safeText(payload?.message || payload?.error || text, `Resend ${response.status}`),
      id: null as string | null,
    };
  }

  return { ok: true, error: null as string | null, id: safeText(payload?.id) || null };
};

const buildEventKey = (email: string, campaign: Campaign) => `${email}:${campaign}`;

const getLatestIntent = (lead: LeadRow, intentsByEmail: Map<string, CheckoutIntentRow[]>) => {
  const email = normalizeEmail(lead.email);
  const intents = intentsByEmail.get(email) || [];
  const sameSession = intents.find((intent) => intent.session_id === lead.session_id);
  return sameSession || intents[0] || null;
};

const hasPaidIntent = (lead: LeadRow, intentsByEmail: Map<string, CheckoutIntentRow[]>) => {
  const email = normalizeEmail(lead.email);
  const intents = intentsByEmail.get(email) || [];
  return intents.some((intent) =>
    ["paid", "claimed"].includes(intent.status) ||
    (intent.claimed_user_id && intent.claimed_user_id === lead.user_id)
  );
};

const hasActivePremiumProfile = (lead: LeadRow, profilesById: Map<string, ProfileRow>) => {
  if (!lead.user_id) return false;

  const profile = profilesById.get(lead.user_id);
  if (!profile) return false;

  const plan = safeText(profile.plan);
  if (plan === "lifetime") return true;
  if (!["weekly", "three_month", "yearly"].includes(plan)) return false;

  const expiresAt = profile.plan_expires_at ? Date.parse(profile.plan_expires_at) : NaN;
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
};

const pickCampaign = (
  lead: LeadRow,
  intent: CheckoutIntentRow | null,
  sentEvents: Map<string, LifecycleEventRow>,
  forcedCampaign: Campaign | null,
): Campaign => {
  if (forcedCampaign) return forcedCampaign;

  if (intent?.status === "failed") return "payment_failed";
  if (intent && ["initiated", "processing"].includes(intent.status)) return "checkout_still_open";

  const email = normalizeEmail(lead.email);
  const planReadySent = sentEvents.get(buildEventKey(email, "plan_ready"));
  if (planReadySent) return "still_here";

  return "plan_ready";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!isAuthorized(req)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const dryRun = body.dryRun !== false;
    const limit = Math.floor(clampNumber(body.limit, 25, 1, 100));
    const minAgeHours = clampNumber(body.minAgeHours, 4, 0, 168);
    const maxLeadAgeDays = clampNumber(body.maxLeadAgeDays, 14, 1, 180);
    const forcedCampaign = safeText(body.campaign) as Campaign;
    const campaign = campaignLabels[forcedCampaign] ? forcedCampaign : null;

    const supabase = getServiceClient();
    const now = Date.now();
    const olderThan = new Date(now - minAgeHours * 60 * 60 * 1000).toISOString();
    const newerThan = new Date(now - maxLeadAgeDays * 24 * 60 * 60 * 1000).toISOString();

    const { data: leads, error: leadsError } = await supabase
      .from("onboarding_leads")
      .select("id, session_id, user_id, source, email, name, answers, reveal, selected_plan, created_at, updated_at")
      .not("email", "is", null)
      .gte("created_at", newerThan)
      .lte("updated_at", olderThan)
      .order("updated_at", { ascending: false })
      .limit(limit * 8);

    if (leadsError) throw leadsError;

    const normalizedLeads = ((leads || []) as LeadRow[])
      .map((lead) => ({ ...lead, email: normalizeEmail(lead.email) }))
      .filter((lead) => Boolean(lead.email) && !isExcludedRecipient(lead.email as string));
    const emails = [...new Set(normalizedLeads.map((lead) => lead.email as string))];

    if (emails.length === 0) {
      return new Response(JSON.stringify({ dryRun, candidates: [], sent: 0, failed: 0, skipped: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [{ data: intents, error: intentsError }, { data: events, error: eventsError }, { data: suppressions, error: suppressionsError }] =
      await Promise.all([
        supabase
          .from("checkout_purchase_intents")
          .select("id, session_id, email, name, plan, status, claimed_user_id, created_at, updated_at")
          .in("email", emails)
          .order("created_at", { ascending: false })
          .limit(500),
        supabase
          .from("lifecycle_email_events")
          .select("recipient_email, campaign, status, sent_at, created_at")
          .in("recipient_email", emails)
          .in("campaign", Object.keys(campaignLabels)),
        supabase
          .from("email_suppression_list")
          .select("email")
          .in("email", emails),
      ]);

    if (intentsError) throw intentsError;
    if (eventsError) throw eventsError;
    if (suppressionsError) throw suppressionsError;

    const profileIds = [
      ...new Set(normalizedLeads.map((lead) => lead.user_id).filter((value): value is string => Boolean(value))),
    ];
    const { data: profiles, error: profilesError } = profileIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, plan, plan_expires_at")
          .in("id", profileIds)
      : { data: [], error: null };

    if (profilesError) throw profilesError;

    const profilesById = new Map<string, ProfileRow>();
    for (const profile of ((profiles || []) as ProfileRow[])) {
      profilesById.set(profile.id, profile);
    }

    const suppressedEmails = new Set(((suppressions || []) as { email: string }[]).map((row) => normalizeEmail(row.email)));
    const intentsByEmail = new Map<string, CheckoutIntentRow[]>();
    for (const intent of ((intents || []) as CheckoutIntentRow[])) {
      const email = normalizeEmail(intent.email);
      if (!email) continue;
      const rows = intentsByEmail.get(email) || [];
      rows.push({ ...intent, email });
      intentsByEmail.set(email, rows);
    }

    const sentEvents = new Map<string, LifecycleEventRow>();
    for (const event of ((events || []) as LifecycleEventRow[])) {
      const email = normalizeEmail(event.recipient_email);
      if (!email || !["queued", "sent"].includes(event.status)) continue;
      sentEvents.set(buildEventKey(email, event.campaign), { ...event, recipient_email: email });
    }

    const candidates: Candidate[] = [];
    for (const lead of normalizedLeads) {
      const email = normalizeEmail(lead.email);
      if (
        !email ||
        isExcludedRecipient(email) ||
        suppressedEmails.has(email) ||
        hasPaidIntent(lead, intentsByEmail) ||
        hasActivePremiumProfile(lead, profilesById)
      ) continue;

      const intent = getLatestIntent(lead, intentsByEmail);
      const nextCampaign = pickCampaign(lead, intent, sentEvents, campaign);
      if (sentEvents.has(buildEventKey(email, nextCampaign))) continue;

      candidates.push({ lead, intent, campaign: nextCampaign, email });
      sentEvents.set(buildEventKey(email, nextCampaign), {
        recipient_email: email,
        campaign: nextCampaign,
        status: "queued",
        sent_at: null,
        created_at: new Date().toISOString(),
      });

      if (candidates.length >= limit) break;
    }

    const preview = candidates.map((candidate) => ({
      email: candidate.email,
      campaign: candidate.campaign,
      leadId: candidate.lead.id,
      checkoutIntentId: candidate.intent?.id || null,
      subject: buildEmail(candidate).subject,
    }));

    if (dryRun) {
      return new Response(JSON.stringify({ dryRun, candidates: preview, sent: 0, failed: 0, skipped: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    const results: Record<string, unknown>[] = [];

    for (const candidate of candidates) {
      const { subject, html } = buildEmail(candidate);

      const { data: event, error: eventError } = await supabase
        .from("lifecycle_email_events")
        .insert({
          recipient_email: candidate.email,
          lead_id: candidate.lead.id,
          checkout_intent_id: candidate.intent?.id || null,
          profile_id: candidate.lead.user_id,
          campaign: candidate.campaign,
          status: "queued",
          subject,
          metadata_json: {
            source: candidate.lead.source,
            session_id: candidate.lead.session_id,
            selected_plan: candidate.lead.selected_plan || candidate.intent?.plan || null,
          },
        })
        .select("id")
        .single();

      if (eventError) {
        skipped++;
        results.push({
          email: candidate.email,
          campaign: candidate.campaign,
          status: "skipped",
          reason: eventError.message,
        });
        continue;
      }

      const delivery = await sendEmail(candidate.email, subject, html);

      if (delivery.ok) {
        sent++;
        await supabase
          .from("lifecycle_email_events")
          .update({
            status: "sent",
            provider_message_id: delivery.id,
            sent_at: new Date().toISOString(),
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
        email: candidate.email,
        campaign: candidate.campaign,
        status: delivery.ok ? "sent" : "failed",
        messageId: delivery.id,
        error: delivery.error,
      });
    }

    return new Response(JSON.stringify({ dryRun, sent, failed, skipped, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-unpaid-onboarding-nudges error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

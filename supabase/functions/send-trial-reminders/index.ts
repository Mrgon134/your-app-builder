import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// This function is called by pg_cron daily to send trial reminder emails.
// It uses Resend (resend.com) to send emails. Set RESEND_API_KEY in Supabase secrets.
//
// Schedule (SQL to run in Supabase SQL editor):
//   select cron.schedule('daily-trial-reminders', '0 9 * * *',
//     $$select net.http_post(
//       url := 'https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/send-trial-reminders',
//       headers := '{"Content-Type":"application/json","Authorization":"Bearer <SERVICE_ROLE_KEY>"}',
//       body := '{}'
//     ) as request_id;$$
//   );

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const APP_URL = "https://nuju.app";

interface Profile {
  id: string;
  display_name: string | null;
  language: string | null;
  trial_started_at: string | null;
  plan: string | null;
}

async function sendEmail(resendApiKey: string, to: string, subject: string, html: string): Promise<boolean> {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ju from Nuju <hello@nuju.app>",
      to: [to],
      subject,
      html,
    }),
  });
  if (!resp.ok) {
    const err = await resp.text();
    console.error("Resend error:", resp.status, err);
  }
  return resp.ok;
}

function buildReminderEmail(name: string, daysLeft: number, lang: string): { subject: string; html: string } {
  const displayName = name || "there";

  if (daysLeft === 2) {
    // Day 5 of 7: 2 days remaining warning
    const subject = lang === "id"
      ? "⏳ Trial Nuju kamu berakhir dalam 2 hari"
      : "⏳ Your Nuju trial ends in 2 days";
    const html = lang === "id"
      ? `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px">
          <h2>Hey ${displayName} 👋</h2>
          <p>Trial 7-hari Nuju kamu berakhir dalam <strong>2 hari</strong>.</p>
          <p>Jangan kehilangan akses ke:</p>
          <ul>
            <li>AI insight setelah setiap entri</li>
            <li>Riwayat mood lengkap</li>
            <li>Pola mood 30 hari</li>
            <li>4 gaya coaching berbeda</li>
          </ul>
          <a href="${APP_URL}/app" style="display:inline-block;background:#7C6EDB;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;margin-top:16px">
            Lanjutkan dengan Plus →
          </a>
          <p style="color:#999;font-size:12px;margin-top:24px">Nuju · ${APP_URL}</p>
        </div>`
      : `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px">
          <h2>Hey ${displayName} 👋</h2>
          <p>Your Nuju 7-day trial ends in <strong>2 days</strong>.</p>
          <p>Don't lose access to:</p>
          <ul>
            <li>AI insight after every entry</li>
            <li>Unlimited mood history</li>
            <li>30-day mood patterns</li>
            <li>4 coaching styles</li>
          </ul>
          <a href="${APP_URL}/app" style="display:inline-block;background:#7C6EDB;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;margin-top:16px">
            Continue with Plus →
          </a>
          <p style="color:#999;font-size:12px;margin-top:24px">Nuju · ${APP_URL}</p>
        </div>`;
    return { subject, html };
  }

  // Day 8: trial has expired
  const subject = lang === "id"
    ? "😢 Trial Nuju kamu telah berakhir"
    : "😢 Your Nuju trial has ended";
  const html = lang === "id"
    ? `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px">
        <h2>Hey ${displayName},</h2>
        <p>Trial gratis Nuju kamu telah berakhir.</p>
        <p>Kamu sudah mulai membangun kebiasaan journaling yang bagus — sayang kalau berhenti sekarang.</p>
        <p>Upgrade ke <strong>Plus seharga $3.33/bulan</strong> untuk tetap melanjutkan perjalananmu.</p>
        <a href="${APP_URL}/app" style="display:inline-block;background:#7C6EDB;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;margin-top:16px">
          Upgrade ke Plus →
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px">Nuju · ${APP_URL}</p>
      </div>`
    : `<div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px">
        <h2>Hey ${displayName},</h2>
        <p>Your Nuju free trial has ended.</p>
        <p>You've started building a great journaling habit — don't let it stop now.</p>
        <p>Upgrade to <strong>Plus for $3.33/month</strong> to keep going.</p>
        <a href="${APP_URL}/app" style="display:inline-block;background:#7C6EDB;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;margin-top:16px">
          Upgrade to Plus →
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px">Nuju · ${APP_URL}</p>
      </div>`;
  return { subject, html };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const REMINDER_CRON_SECRET = Deno.env.get("REMINDER_CRON_SECRET");
    const authToken = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
    const expectedTokens = [SUPABASE_SERVICE_ROLE_KEY, REMINDER_CRON_SECRET].filter(Boolean);

    if (!authToken || !expectedTokens.includes(authToken)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — skipping email sends");
      return new Response(JSON.stringify({ skipped: true, reason: "RESEND_API_KEY not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const now = new Date();
    const TRIAL_DAYS = 7;

    // Find users whose trial expires in ~2 days (day 5 of 7 = 2 days left)
    const day2ReminderStart = new Date(now.getTime() - (TRIAL_DAYS - 2) * 24 * 60 * 60 * 1000);
    const day2ReminderEnd = new Date(day2ReminderStart.getTime() + 24 * 60 * 60 * 1000);

    // Find users whose trial expired ~1 day ago (day 8)
    const expiredStart = new Date(now.getTime() - (TRIAL_DAYS + 1) * 24 * 60 * 60 * 1000);
    const expiredEnd = new Date(expiredStart.getTime() + 24 * 60 * 60 * 1000);

    // Fetch profiles with active/recently-expired trials on free plan
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, display_name, language, trial_started_at, plan")
      .eq("plan", "free")
      .not("trial_started_at", "is", null);

    if (error) {
      console.error("DB error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sent2Day = 0;
    let sentExpired = 0;

    for (const profile of (profiles as Profile[]) || []) {
      const trialStart = new Date(profile.trial_started_at!);
      const trialExpires = new Date(trialStart.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
      const msLeft = trialExpires.getTime() - now.getTime();
      const daysLeft = Math.ceil(msLeft / (24 * 60 * 60 * 1000));

      // Get user email from auth
      const { data: { user }, error: authError } = await supabase.auth.admin.getUserById(profile.id);
      if (authError || !user?.email) continue;

      const lang = profile.language || "en";
      const name = profile.display_name || "";

      if (daysLeft === 2) {
        // 2-day warning
        const { subject, html } = buildReminderEmail(name, 2, lang);
        const ok = await sendEmail(RESEND_API_KEY, user.email, subject, html);
        if (ok) sent2Day++;
      } else if (daysLeft === -1) {
        // Expired 1 day ago nudge
        const { subject, html } = buildReminderEmail(name, -1, lang);
        const ok = await sendEmail(RESEND_API_KEY, user.email, subject, html);
        if (ok) sentExpired++;
      }
    }

    console.info("Trial reminders completed", { sent2Day, sentExpired });

    return new Response(
      JSON.stringify({ success: true, sent2Day, sentExpired }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Reminder error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FEEDBACK_LABELS: Record<string, string> = {
  feedback: "Feedback",
  bug: "Bug report",
  feature: "Feature request",
  billing: "Billing or cancellation help",
};

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const paragraph = (label: string, value: string) => `
  <p style="margin:0 0 12px">
    <strong>${escapeHtml(label)}:</strong><br/>
    <span style="white-space:pre-wrap">${escapeHtml(value || "-")}</span>
  </p>
`;

async function sendEmail(input: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  const from = Deno.env.get("RESEND_FROM") || "Nuju Feedback <hello@nuju.app>";
  const payload: Record<string, unknown> = {
    from,
    to: [input.to],
    subject: input.subject,
    html: input.html,
  };

  if (input.replyTo) {
    payload.reply_to = input.replyTo;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    return { sent: false, reason: `Resend ${response.status}: ${error}` };
  }

  const data = await response.json().catch(() => ({}));
  return { sent: true, id: safeText((data as Record<string, unknown>).id) };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const authHeader = req.headers.get("Authorization") || "";

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase credentials are missing");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data, error: userError } = await supabase.auth.getUser();

    if (userError || !data.user) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const type = safeText(body.type) || "feedback";
    const label = FEEDBACK_LABELS[type] || FEEDBACK_LABELS.feedback;
    const subject = safeText(body.subject).slice(0, 140);
    const message = safeText(body.message).slice(0, 6000);
    const contactEmail = safeText(body.email) || data.user.email || "";
    const page = safeText(body.page).slice(0, 500);
    const plan = safeText(body.plan).slice(0, 80);
    const displayName = safeText(body.displayName).slice(0, 120);
    const userAgent = safeText(body.userAgent).slice(0, 500);

    if (!subject || subject.length < 3) {
      return new Response(JSON.stringify({ error: "Subject is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!message || message.length < 10) {
      return new Response(JSON.stringify({ error: "Message is too short" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ownerEmail = Deno.env.get("FEEDBACK_TO_EMAIL") || "skyjonay@gmail.com";
    const emailSubject = `[Nuju ${label}] ${subject}`;
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:680px;margin:0 auto;padding:28px;color:#241d35;background:#ffffff">
      <h1 style="font-size:22px;line-height:1.3;margin:0 0 18px">${escapeHtml(label)}</h1>
      <div style="border:1px solid #ece8f8;border-radius:20px;padding:20px;background:#fbfaff;margin-bottom:20px">
        ${paragraph("Subject", subject)}
        ${paragraph("Message", message)}
      </div>
      <div style="border:1px solid #eee;border-radius:20px;padding:20px;background:#fff">
        ${paragraph("User ID", data.user.id)}
        ${paragraph("User email", data.user.email || "")}
        ${paragraph("Reply email", contactEmail)}
        ${paragraph("Display name", displayName)}
        ${paragraph("Plan", plan)}
        ${paragraph("Page", page)}
        ${paragraph("User agent", userAgent)}
        ${paragraph("Sent at", new Date().toISOString())}
      </div>
    </div>`;

    const result = await sendEmail({
      to: ownerEmail,
      replyTo: contactEmail,
      subject: emailSubject,
      html,
    });

    if (!result.sent) {
      console.error("Feedback email failed", result);
      return new Response(JSON.stringify({ error: "Email could not be sent" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-feedback error:", error);
    return new Response(JSON.stringify({ error: "Feedback could not be sent" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

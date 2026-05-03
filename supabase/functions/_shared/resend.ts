const APP_URL = "https://nuju.app";

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const planLabel = (plan: string) => {
  switch (plan) {
    case "weekly":
      return "Nuju Weekly";
    case "three_month":
      return "Nuju 3 Month";
    case "yearly":
      return "Nuju Yearly";
    case "lifetime":
    case "lifetime_one_time":
      return "Nuju Lifetime";
    default:
      return "Nuju Pro";
  }
};

const buildActivatedEmail = (name: string, plan: string) => {
  const displayName = name || "there";
  const activePlan = planLabel(plan);
  const subject = `Your ${activePlan} access is active`;
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px;color:#201b2f;background:#ffffff">
    <div style="text-align:center;margin-bottom:28px">
      <div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:18px;background:#f2efff;color:#7c6edb;font-size:28px;font-weight:700">J</div>
      <h1 style="font-size:28px;line-height:1.2;margin:18px 0 8px">You're in, ${displayName}.</h1>
      <p style="font-size:16px;line-height:1.7;color:#6b6479;margin:0">Your ${activePlan} access is active on Nuju.</p>
    </div>

    <div style="border:1px solid #ece8f8;border-radius:24px;padding:22px;background:#fbfaff">
      <p style="font-size:15px;line-height:1.7;color:#3a324d;margin:0 0 14px">You can now open Nuju and keep using the same email you used at checkout. Your paid access is attached to your account.</p>
      <ul style="font-size:15px;line-height:1.8;color:#3a324d;margin:0;padding-left:20px">
        <li>Private mood and journal tracking</li>
        <li>Ju reflections and emotional insights</li>
        <li>Premium access across web and iOS when you sign in with the same account</li>
      </ul>
    </div>

    <div style="text-align:center;margin:28px 0">
      <a href="${APP_URL}/app" style="display:inline-block;background:#7c6edb;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:16px;font-weight:700">Open Nuju</a>
    </div>

    <p style="font-size:13px;line-height:1.7;color:#8b8498;text-align:center;margin:0">Need help? Reply to this email or visit <a href="${APP_URL}/support" style="color:#7c6edb">nuju.app/support</a>.</p>
  </div>`;

  return { subject, html };
};

async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  const from = Deno.env.get("RESEND_FROM") || "Ju from Nuju <hello@nuju.app>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return { sent: false, reason: `Resend ${response.status}: ${error}` };
  }

  const payload = await response.json().catch(() => ({}));
  return { sent: true, id: safeText(payload.id) };
}

export async function sendPurchaseActivatedEmail(
  supabase: {
    from: (table: string) => {
      select: (columns: string) => {
        eq: (column: string, value: string) => {
          maybeSingle: () => Promise<{ data: Record<string, unknown> | null; error: { message?: string } | null }>;
        };
      };
      update: (values: Record<string, unknown>) => {
        eq: (column: string, value: string) => Promise<{ error: { message?: string } | null }>;
      };
    };
  },
  input: {
    intentId: string;
    to: string;
    name?: string | null;
    plan: string;
  },
) {
  const intentId = safeText(input.intentId);
  const to = safeText(input.to).toLowerCase();
  const plan = safeText(input.plan);

  if (!intentId || !to || !plan) {
    return { sent: false, reason: "missing activation email data" };
  }

  const { data: intent, error: intentError } = await supabase
    .from("checkout_purchase_intents")
    .select("metadata_json")
    .eq("id", intentId)
    .maybeSingle();

  if (intentError) {
    return { sent: false, reason: intentError.message || "Could not read checkout intent" };
  }

  const metadata =
    intent?.metadata_json && typeof intent.metadata_json === "object" && !Array.isArray(intent.metadata_json)
      ? intent.metadata_json as Record<string, unknown>
      : {};

  if (metadata.activation_email_sent_at) {
    return { sent: false, reason: "already_sent" };
  }

  const { subject, html } = buildActivatedEmail(safeText(input.name), plan);
  const result = await sendEmail(to, subject, html);

  if (!result.sent) {
    console.warn("Purchase activation email skipped/failed", { intentId, to, reason: result.reason });
    return result;
  }

  const { error: updateError } = await supabase
    .from("checkout_purchase_intents")
    .update({
      metadata_json: {
        ...metadata,
        activation_email_sent_at: new Date().toISOString(),
        activation_email_resend_id: result.id || null,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", intentId);

  if (updateError) {
    console.warn("Purchase activation email sent but metadata update failed", { intentId, error: updateError.message });
  }

  return result;
}

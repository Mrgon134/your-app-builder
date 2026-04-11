import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const normalizeEmail = (value: unknown) => safeText(value).toLowerCase();

const getBaseUrl = () => (
  Deno.env.get("DODO_TEST_MODE") === "true" ? "https://test.dodopayments.com" : "https://live.dodopayments.com"
);

const mergeJson = (current: unknown, patch: Record<string, unknown>) => ({
  ...(current && typeof current === "object" && !Array.isArray(current) ? current as Record<string, unknown> : {}),
  ...patch,
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role credentials are missing");

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { intentId, status, paymentId, subscriptionId, email } = await req.json();
    const normalizedIntentId = safeText(intentId);

    if (!normalizedIntentId) {
      return new Response(JSON.stringify({ error: "intentId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: row, error } = await supabase
      .from("checkout_purchase_intents")
      .select("*")
      .eq("id", normalizedIntentId)
      .maybeSingle();

    if (error) throw error;
    if (!row) {
      return new Response(JSON.stringify({ error: "Checkout intent not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let nextStatus = safeText(row.status) || "initiated";
    const safeIncomingStatus = safeText(status).toLowerCase();
    const safePaymentId = safeText(paymentId);
    const safeSubscriptionId = safeText(subscriptionId);
    const safeIncomingEmail = normalizeEmail(email);

    if ((safeIncomingStatus === "succeeded" || safeIncomingStatus === "success" || safeIncomingStatus === "paid") && nextStatus !== "claimed") {
      nextStatus = "paid";
    } else if ((safeIncomingStatus === "cancelled" || safeIncomingStatus === "failed") && !["paid", "claimed"].includes(nextStatus)) {
      nextStatus = "failed";
    }

    if ((safePaymentId || safeSubscriptionId || safeIncomingEmail || nextStatus !== row.status)) {
      const { data: updatedRow } = await supabase
        .from("checkout_purchase_intents")
        .update({
          status: nextStatus,
          payment_id: safePaymentId || row.payment_id,
          subscription_id: safeSubscriptionId || row.subscription_id,
          email: safeIncomingEmail || row.email,
          updated_at: new Date().toISOString(),
        })
        .eq("id", normalizedIntentId)
        .select("*")
        .single();

      if (updatedRow) {
        Object.assign(row, updatedRow);
      }
    }

    if (!["paid", "claimed", "failed", "expired"].includes(nextStatus) && safeText(row.checkout_session_id)) {
      const dodoKey = Deno.env.get("DODO_PAYMENTS_API_KEY");
      if (dodoKey) {
        const checkoutResp = await fetch(`${getBaseUrl()}/checkouts/${encodeURIComponent(String(row.checkout_session_id))}`, {
          headers: {
            Authorization: `Bearer ${dodoKey}`,
          },
        });

        if (checkoutResp.ok) {
          const checkout = await checkoutResp.json();
          const paymentStatus = safeText(checkout.payment_status).toLowerCase();
          const derivedStatus =
            paymentStatus === "succeeded"
              ? "paid"
              : paymentStatus === "failed" || paymentStatus === "cancelled"
                ? "failed"
                : nextStatus;

          const { data: updatedRow } = await supabase
            .from("checkout_purchase_intents")
            .update({
              status: derivedStatus,
              payment_id: safeText(checkout.payment_id) || row.payment_id,
              email: normalizeEmail(checkout.customer_email) || row.email,
              name: safeText(checkout.customer_name) || row.name,
              metadata_json: mergeJson(row.metadata_json, {
                checkout_status_response: checkout,
              }),
              updated_at: new Date().toISOString(),
            })
            .eq("id", normalizedIntentId)
            .select("*")
            .single();

          if (updatedRow) {
            Object.assign(row, updatedRow);
            nextStatus = safeText(updatedRow.status) || nextStatus;
          }
        }
      }
    }

    return new Response(JSON.stringify({
      intentId: String(row.id),
      status: safeText(row.status),
      email: String(row.email),
      name: row.name ? String(row.name) : null,
      plan: String(row.plan),
      paymentId: row.payment_id ? String(row.payment_id) : null,
      subscriptionId: row.subscription_id ? String(row.subscription_id) : null,
      checkoutSessionId: row.checkout_session_id ? String(row.checkout_session_id) : null,
      claimedUserId: row.claimed_user_id ? String(row.claimed_user_id) : null,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("checkout-status error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

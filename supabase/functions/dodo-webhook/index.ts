import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const normalizeEmail = (value: unknown) => safeText(value).toLowerCase();

async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const hex = Array.from(new Uint8Array(sig))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hex === signature;
  } catch {
    return false;
  }
}

const getProductPlanMap = () => ({
  [Deno.env.get("VITE_DODO_WEEKLY") || Deno.env.get("DODO_WEEKLY_PRODUCT_ID") || "pdt_0NbhHW3W4gTSSif6PbYb8"]: "weekly",
  [Deno.env.get("VITE_DODO_YEARLY") || Deno.env.get("DODO_YEARLY_PRODUCT_ID") || "pdt_0NbhHexts6edZvPqDnoqt"]: "yearly",
  [Deno.env.get("VITE_DODO_LIFETIME") || Deno.env.get("DODO_LIFETIME_PRODUCT_ID") || "pdt_0NbhHzl2NQ8Dx0ntZsPQs"]: "lifetime",
});

const getPayloadData = (event: Record<string, unknown>) =>
  (event.data as Record<string, unknown>)?.object ||
  (event.data as Record<string, unknown>) ||
  (event.payload as Record<string, unknown>)?.object ||
  (event.payload as Record<string, unknown>) ||
  event;

const getMetadata = (event: Record<string, unknown>, payloadData: Record<string, unknown>) => ({
  ...((event.metadata as Record<string, unknown>) || {}),
  ...(((event.data as Record<string, unknown>)?.metadata as Record<string, unknown>) || {}),
  ...((payloadData.metadata as Record<string, unknown>) || {}),
});

const mergeJson = (current: unknown, patch: Record<string, unknown>) => ({
  ...(current && typeof current === "object" && !Array.isArray(current) ? current as Record<string, unknown> : {}),
  ...patch,
});

const planToProfilePlan = (plan: string) => (plan === "lifetime_one_time" ? "lifetime" : plan);

const extractProductId = (payloadData: Record<string, unknown>) =>
  safeText(
    payloadData.product_id ||
    (payloadData.product as Record<string, unknown>)?.id ||
    ((payloadData.product_cart as Record<string, unknown>[] | undefined)?.[0] as Record<string, unknown> | undefined)?.product_id,
  );

const extractPurchaseStatus = (eventName: string, payloadData: Record<string, unknown>) => {
  if (eventName === "subscription.active" || eventName === "subscription.renewed" || eventName === "subscription.updated" || eventName === "payment.succeeded") {
    return "paid";
  }

  if (eventName === "subscription.canceled" || eventName === "subscription.expired" || eventName === "subscription.past_due" || eventName === "payment.failed") {
    return "failed";
  }

  return "";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get("DODO_PAYMENTS_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!webhookSecret) throw new Error("DODO_PAYMENTS_WEBHOOK_SECRET not set");
    if (!supabaseUrl || !supabaseServiceRoleKey) throw new Error("Supabase service role credentials are missing");

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const rawBody = await req.text();
    const signature = req.headers.get("dodo-signature") || req.headers.get("authorization")?.replace("Bearer ", "") || "";

    const isBearerCheck = signature === webhookSecret;
    const isHmacCheck = await verifySignature(rawBody, signature, webhookSecret);
    if (!isBearerCheck && !isHmacCheck) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(rawBody) as Record<string, unknown>;
    const eventName = safeText(event.type || event.event);
    const payloadData = getPayloadData(event);
    const metadata = getMetadata(event, payloadData);
    const productId = extractProductId(payloadData);
    const productPlanMap = getProductPlanMap();

    const metadataPlan = safeText(metadata.plan);
    const plan = metadataPlan || productPlanMap[productId] || "free";
    const purchaseStatus = extractPurchaseStatus(eventName, payloadData);

    const intentId = safeText(metadata.intent_id || payloadData.intent_id);
    const sessionId = safeText(metadata.session_id || payloadData.session_id);
    const checkoutSessionId = safeText(payloadData.checkout_session_id || payloadData.checkout_id || (payloadData.checkout as Record<string, unknown>)?.id);
    const paymentId = safeText(payloadData.payment_id || (eventName.startsWith("payment.") ? payloadData.id : ""));
    const subscriptionId = safeText(payloadData.subscription_id || (eventName.startsWith("subscription.") ? payloadData.id : ""));
    const customerId = safeText(payloadData.customer_id || (payloadData.customer as Record<string, unknown>)?.id);
    const customerEmail = normalizeEmail(
      payloadData.customer_email ||
      (payloadData.customer as Record<string, unknown>)?.email ||
      metadata.email,
    );
    const customerName = safeText(
      payloadData.customer_name ||
      (payloadData.customer as Record<string, unknown>)?.name ||
      metadata.name,
    );

    const directUserId = safeText(metadata.user_id);
    let targetUserId = directUserId;

    let purchaseIntent: Record<string, unknown> | null = null;
    const findBySingleField = async (field: string, value: string) => {
      if (!value) return null;
      const { data } = await supabase
        .from("checkout_purchase_intents")
        .select("*")
        .eq(field, value)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data as Record<string, unknown> | null;
    };

    purchaseIntent =
      (await findBySingleField("id", intentId)) ||
      (await findBySingleField("checkout_session_id", checkoutSessionId)) ||
      (await findBySingleField("payment_id", paymentId)) ||
      (await findBySingleField("subscription_id", subscriptionId));

    if (!purchaseIntent && sessionId && customerEmail) {
      const { data } = await supabase
        .from("checkout_purchase_intents")
        .select("*")
        .eq("session_id", sessionId)
        .eq("email", customerEmail)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      purchaseIntent = data as Record<string, unknown> | null;
    }

    if (purchaseIntent) {
      targetUserId = targetUserId || safeText(purchaseIntent.claimed_user_id);

      const nextStatus =
        purchaseStatus ||
        safeText(purchaseIntent.status) ||
        "initiated";

      await supabase
        .from("checkout_purchase_intents")
        .update({
          session_id: safeText(purchaseIntent.session_id) || sessionId || String(purchaseIntent.id),
          checkout_session_id: checkoutSessionId || safeText(purchaseIntent.checkout_session_id) || null,
          payment_id: paymentId || safeText(purchaseIntent.payment_id) || null,
          subscription_id: subscriptionId || safeText(purchaseIntent.subscription_id) || null,
          email: customerEmail || normalizeEmail(purchaseIntent.email) || null,
          name: customerName || safeText(purchaseIntent.name) || null,
          plan: plan === "lifetime" ? "lifetime_one_time" : (plan || safeText(purchaseIntent.plan)),
          status: nextStatus,
          metadata_json: mergeJson(purchaseIntent.metadata_json, {
            event_name: eventName,
            customer_id: customerId || null,
            payload: payloadData,
          }),
          updated_at: new Date().toISOString(),
        })
        .eq("id", String(purchaseIntent.id));
    } else if (intentId) {
      await supabase.from("checkout_purchase_intents").insert({
        id: intentId,
        session_id: sessionId || intentId,
        checkout_session_id: checkoutSessionId || null,
        payment_id: paymentId || null,
        subscription_id: subscriptionId || null,
        email: customerEmail || "unknown@example.com",
        name: customerName || null,
        plan: plan === "lifetime" ? "lifetime_one_time" : plan || "weekly",
        source: safeText(metadata.source) || "onboarding",
        status: purchaseStatus || "processing",
        metadata_json: {
          customer_id: customerId || null,
          payload: payloadData,
        },
      });
    }

    if (targetUserId) {
      switch (eventName) {
        case "subscription.active":
        case "subscription.renewed":
        case "subscription.updated": {
          const nextBillingDate = safeText(payloadData.next_billing_date || payloadData.current_period_end) || null;
          await supabase.from("profiles").update({
            plan: planToProfilePlan(plan),
            dodo_customer_id: customerId || null,
            dodo_subscription_id: subscriptionId || safeText(payloadData.id) || null,
            plan_expires_at: nextBillingDate,
          }).eq("id", targetUserId);
          break;
        }

        case "subscription.canceled":
        case "subscription.expired":
        case "subscription.past_due": {
          await supabase.from("profiles").update({
            plan: "free",
            plan_expires_at: null,
            dodo_subscription_id: null,
          }).eq("id", targetUserId);
          break;
        }

        case "payment.succeeded": {
          if (planToProfilePlan(plan) === "lifetime") {
            await supabase.from("profiles").update({
              plan: "lifetime",
              dodo_customer_id: customerId || null,
              plan_expires_at: "2099-12-31T23:59:59Z",
            }).eq("id", targetUserId);
          }
          break;
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

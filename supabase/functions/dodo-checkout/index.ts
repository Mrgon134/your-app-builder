import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform",
};

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const normalizedEmail = (value: unknown) => safeText(value).toLowerCase();

const getBaseUrl = () => (
  Deno.env.get("DODO_TEST_MODE") === "true" ? "https://test.dodopayments.com" : "https://live.dodopayments.com"
);

const getProductMap = () => ({
  weekly: Deno.env.get("VITE_DODO_WEEKLY") || Deno.env.get("DODO_WEEKLY_PRODUCT_ID") || "pdt_0NbhHW3W4gTSSif6PbYb8",
  yearly: Deno.env.get("VITE_DODO_YEARLY") || Deno.env.get("DODO_YEARLY_PRODUCT_ID") || "pdt_0NbhHexts6edZvPqDnoqt",
  lifetime_one_time: Deno.env.get("VITE_DODO_LIFETIME") || Deno.env.get("DODO_LIFETIME_PRODUCT_ID") || "pdt_0NbhHzl2NQ8Dx0ntZsPQs",
});

const resolvePlanFromVariant = (variantId: string) => {
  const productMap = getProductMap();
  const entry = Object.entries(productMap).find(([, productId]) => productId === variantId);
  return (entry?.[0] || "") as "weekly" | "yearly" | "lifetime_one_time" | "";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DODO_API_KEY = Deno.env.get("DODO_PAYMENTS_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!DODO_API_KEY) throw new Error("DODO_PAYMENTS_API_KEY not set");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase service role credentials are missing");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const payload = await req.json();

    const variantId = safeText(payload.variant_id);
    const userId = safeText(payload.user_id);
    const guestSessionId = safeText(payload.sessionId);
    const guestEmail = normalizedEmail(payload.email || payload.user_email);
    const guestName = safeText(payload.name || payload.user_name);
    const source = safeText(payload.source) || "onboarding";
    const country = safeText(payload.country);
    const couponCode = safeText(payload.coupon_code);
    const requestedPlan = safeText(payload.plan) as "weekly" | "yearly" | "lifetime_one_time" | "";
    const resolvedPlan = requestedPlan || resolvePlanFromVariant(variantId);
    const isGuestCheckout = !userId;

    if (!variantId) {
      return new Response(JSON.stringify({ error: "variant_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (isGuestCheckout && (!guestSessionId || !guestEmail || !guestName || !resolvedPlan)) {
      return new Response(JSON.stringify({ error: "sessionId, email, name, and plan are required for guest checkout" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const productCart = [
      {
        product_id: variantId,
        quantity: 1,
      },
    ];

    const siteOrigin = safeText(req.headers.get("origin")) || Deno.env.get("PUBLIC_APP_URL") || "https://nuju.app";
    const intentId = isGuestCheckout ? crypto.randomUUID() : null;

    if (isGuestCheckout && intentId) {
      const { error } = await supabase.from("checkout_purchase_intents").insert({
        id: intentId,
        session_id: guestSessionId,
        email: guestEmail,
        name: guestName,
        plan: resolvedPlan,
        source,
        status: "initiated",
        metadata_json: {
          country,
          coupon_code: couponCode || null,
          variant_id: variantId,
        },
      });

      if (error) throw error;
    }

    const checkoutPayload: Record<string, unknown> = {
      product_cart: productCart,
      metadata: {
        ...(userId ? { user_id: userId } : {}),
        ...(intentId ? { intent_id: intentId } : {}),
        ...(guestSessionId ? { session_id: guestSessionId } : {}),
        ...(resolvedPlan ? { plan: resolvedPlan } : {}),
        source,
      },
      return_url: isGuestCheckout && intentId
        ? `${siteOrigin}/checkout/complete?intent_id=${encodeURIComponent(intentId)}`
        : `${siteOrigin}/app`,
    };

    if (guestEmail) {
      checkoutPayload.customer = {
        email: guestEmail,
        name: guestName || undefined,
      };
    }

    if (couponCode) {
      checkoutPayload.discount_code = couponCode;
    }

    const resp = await fetch(`${getBaseUrl()}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DODO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutPayload),
    });

    const responseText = await resp.text();

    if (!resp.ok) {
      if (isGuestCheckout && intentId) {
        await supabase.from("checkout_purchase_intents").update({
          status: "failed",
          metadata_json: {
            country,
            coupon_code: couponCode || null,
            variant_id: variantId,
            dodo_error: responseText,
          },
          updated_at: new Date().toISOString(),
        }).eq("id", intentId);
      }

      return new Response(JSON.stringify({ error: "Failed to create checkout", detail: responseText }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = JSON.parse(responseText);
    const checkoutUrl = safeText(data.checkout_url || data.payment_link || data.url);
    const checkoutSessionId = safeText(data.id || data.checkout_id || data.checkout_session_id);

    if (!checkoutUrl) throw new Error("No checkout URL returned");

    if (isGuestCheckout && intentId) {
      await supabase.from("checkout_purchase_intents").update({
        checkout_session_id: checkoutSessionId || null,
        status: "processing",
        metadata_json: {
          country,
          coupon_code: couponCode || null,
          variant_id: variantId,
          checkout_response: data,
        },
        updated_at: new Date().toISOString(),
      }).eq("id", intentId);
    }

    return new Response(JSON.stringify({
      url: checkoutUrl,
      intentId,
      checkoutSessionId: checkoutSessionId || null,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Checkout error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

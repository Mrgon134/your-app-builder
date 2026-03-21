import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LEMON_API_KEY = Deno.env.get("LEMON_SQUEEZY_API_KEY");
    if (!LEMON_API_KEY) throw new Error("LEMON_SQUEEZY_API_KEY not set");

    const { variant_id, user_id, user_email } = await req.json();

    if (!variant_id || !user_id) {
      return new Response(
        JSON.stringify({ error: "variant_id and user_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a checkout via Lemon Squeezy API
    const resp = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LEMON_API_KEY}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: user_email || undefined,
              custom: {
                user_id,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: Deno.env.get("LEMON_SQUEEZY_STORE_ID") || "0",
              },
            },
            variant: {
              data: {
                type: "variants",
                id: String(variant_id),
              },
            },
          },
        },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Lemon Squeezy API error:", resp.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to create checkout" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();
    const checkoutUrl = data.data?.attributes?.url;

    return new Response(
      JSON.stringify({ url: checkoutUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Checkout error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DODO_API_KEY = Deno.env.get("DODO_PAYMENTS_API_KEY");
    if (!DODO_API_KEY) {
      console.error("DODO_PAYMENTS_API_KEY not set");
      throw new Error("DODO_PAYMENTS_API_KEY not set");
    }

    const { variant_id, user_id, user_email, user_name, country } = await req.json();

    if (!variant_id || !user_id) {
      return new Response(
        JSON.stringify({ error: "variant_id and user_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Creating Dodo checkout: product=${variant_id}, user=${user_id}`);

    // Use /checkouts endpoint (NOT /payments which requires billing address)
    const testMode = Deno.env.get("DODO_TEST_MODE") === "true";
    const baseUrl = testMode ? "https://test.dodopayments.com" : "https://live.dodopayments.com";
    const endpoint = `${baseUrl}/checkouts`;

    // Minimal payload: only product_cart is required for hosted checkout
    // Dodo's hosted checkout page collects billing/customer info itself
    const payload: Record<string, unknown> = {
      product_cart: [
        {
          product_id: variant_id,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user_id,
      },
    };

    // Optional: pass return_url so user comes back to app after payment
    const origin = req.headers.get("origin");
    if (origin) {
      payload.return_url = `${origin}/app`;
    }

    console.log("Dodo payload:", JSON.stringify(payload));

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DODO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await resp.text();
    console.log("Dodo response status:", resp.status, "body:", responseText);

    if (!resp.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to create checkout", detail: responseText }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the checkout session response
    const data = JSON.parse(responseText);
    // Dodo /checkouts returns checkout_url
    const checkoutUrl = data.checkout_url || data.payment_link || data.url;

    if (!checkoutUrl) {
      console.error("No checkout URL returned by Dodo. Full response:", responseText);
      throw new Error("No checkout URL returned");
    }

    console.log("Checkout created successfully:", checkoutUrl);

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

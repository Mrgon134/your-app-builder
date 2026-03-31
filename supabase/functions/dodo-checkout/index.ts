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

    // Dodo Payments endpoint depending on environment
    const testMode = Deno.env.get("DODO_TEST_MODE") === "true";
    const baseUrl = testMode ? "https://test.dodopayments.com" : "https://live.dodopayments.com";
    
    const endpoint = `${baseUrl}/payments`;

    // Dodo requires product_cart array format
    const payload: any = {
      product_cart: [
        {
          product_id: variant_id,
          quantity: 1,
        },
      ],
      payment_link: true,
      return_url: req.headers.get("origin") + "/app",
      customer: {
        email: user_email || `${user_id}@nuju.app`,
        name: user_name || "Nuju User",
      },
      metadata: {
        user_id: user_id,
      }
    };

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DODO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Dodo API error:", resp.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to create checkout", detail: errText }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Dodo API typical response for /payments includes a checkout URL or payment_link
    const data = await resp.json();
    const checkoutUrl = data.payment_link || (data.data && data.data.payment_link);

    if (!checkoutUrl) {
      console.error("No payment link returned by Dodo:", data);
      throw new Error("No payment link returned");
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

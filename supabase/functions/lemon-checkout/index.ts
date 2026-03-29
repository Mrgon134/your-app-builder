import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Country → ISO 4217 currency code mapping for supported regions
const COUNTRY_CURRENCY: Record<string, string> = {
  ID: "IDR", IN: "INR", BR: "BRL", JP: "JPY", KR: "KRW",
  MY: "MYR", TH: "THB", PH: "PHP", VN: "VND",
  GB: "GBP", DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR",
  AU: "AUD", CA: "CAD", SG: "SGD",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LEMON_API_KEY = Deno.env.get("LEMON_SQUEEZY_API_KEY");
    if (!LEMON_API_KEY) {
      console.error("MISSING SECRET: LEMON_SQUEEZY_API_KEY is not set in Supabase Edge Function secrets");
      throw new Error("LEMON_SQUEEZY_API_KEY not set");
    }

    const STORE_ID = Deno.env.get("LEMON_SQUEEZY_STORE_ID");
    if (!STORE_ID || STORE_ID === "0") {
      console.error("MISSING SECRET: LEMON_SQUEEZY_STORE_ID is not set in Supabase Edge Function secrets");
      throw new Error("LEMON_SQUEEZY_STORE_ID not set");
    }

    const { variant_id, user_id, user_email, country } = await req.json();

    if (!variant_id || !user_id) {
      return new Response(
        JSON.stringify({ error: "variant_id and user_id required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Creating checkout: variant=${variant_id}, store=${STORE_ID}, user=${user_id}, country=${country}`);

    // Resolve currency from country code
    const currency = country ? COUNTRY_CURRENCY[country.toUpperCase()] : undefined;

    // Build checkout attributes
    const attributes: Record<string, unknown> = {
      checkout_data: {
        email: user_email || undefined,
        custom: { user_id },
      },
    };

    // If we have a non-USD currency, tell Lemon Squeezy to display it
    if (currency && currency !== "USD") {
      attributes.checkout_options = {
        currency_code: currency,
      };
    }

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
          attributes,
          relationships: {
            store: {
              data: {
                type: "stores",
                id: STORE_ID,
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
        JSON.stringify({ error: "Failed to create checkout", detail: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();
    const checkoutUrl = data.data?.attributes?.url;
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

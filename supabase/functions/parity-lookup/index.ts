import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform",
};

const PD_IDENTIFIER = "7ec59c54-d9ee-4473-91be-799aff6504cb";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the user's real IP from request headers
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      "";

    console.log("ParityDeals lookup for IP:", clientIp);

    // Call ParityDeals server-side API with pd_identifier + IP
    const pdUrl = `https://api.paritydeals.com/api/v1/deals/discount/?pd_identifier=${PD_IDENTIFIER}&ip_address=${clientIp}`;

    const resp = await fetch(pdUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (!resp.ok) {
      console.log("ParityDeals returned non-OK:", resp.status);
      return new Response(
        JSON.stringify({ discountPercentage: 0, couponCode: null, countryCode: "US" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await resp.json();
    console.log("ParityDeals response:", JSON.stringify(data));

    return new Response(
      JSON.stringify({
        discountPercentage: parseFloat(data.discountPercentage) || 0,
        couponCode: data.couponCode || null,
        countryCode: data.countryCode || "US",
        currencyCode: data.currencyCode || "USD",
        currencySymbol: data.currencySymbol || "$",
        country: data.country || "United States",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("ParityDeals error:", e);
    return new Response(
      JSON.stringify({ discountPercentage: 0, couponCode: null, countryCode: "US" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform",
};

const PD_IDENTIFIER = Deno.env.get("PARITYDEALS_PD_IDENTIFIER") || "7ec59c54-d9ee-4473-91be-799aff6504cb";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      "";

    console.log("ParityDeals lookup for IP:", clientIp);

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
    console.log("ParityDeals raw response:", JSON.stringify(data));

    // Try top-level fields first
    let discountPct = parseFloat(data.discountPercentage) || 0;
    let coupon = data.couponCode || null;

    // Parse from message HTML if top-level fields are empty
    // ParityDeals format: use code <b>\u201Cpdmlhofm65\u201D</b> to get <b>65%</b> off
    const msg = data.message || data.messageText || "";

    if (!coupon && msg) {
      // Match: code <b>"couponhere"</b>  (with smart quotes or regular quotes or no quotes)
      const m = msg.match(/code\s*(?:<[^>]*>)*\s*[\u201C\u201D"']?([A-Za-z0-9_]+)[\u201C\u201D"']?\s*(?:<[^>]*>)*/i);
      if (m && m[1]) {
        coupon = m[1];
      }
    }

    if (!discountPct && msg) {
      // Match: <b>65%</b> or just 65%
      const m = msg.match(/(?:<[^>]*>)*\s*(\d+)\s*%/);
      if (m && m[1]) {
        discountPct = parseInt(m[1], 10);
      }
    }

    console.log(`Parsed PPP: country=${data.countryCode}, discount=${discountPct}%, coupon=${coupon}`);

    return new Response(
      JSON.stringify({
        discountPercentage: discountPct,
        couponCode: coupon,
        countryCode: data.countryCode || "US",
        currencyCode: data.currencyCode || "USD",
        currencySymbol: data.currencySymbol || "$",
        usdConversionRate: data.usdConversionRate || null,
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

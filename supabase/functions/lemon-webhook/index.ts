import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Verify Lemon Squeezy webhook signature using HMAC-SHA256
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === signature;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const WEBHOOK_SECRET = Deno.env.get("LEMON_SQUEEZY_WEBHOOK_SECRET");
    if (!WEBHOOK_SECRET) throw new Error("LEMON_SQUEEZY_WEBHOOK_SECRET not set");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.text();
    const signature = req.headers.get("x-signature") || "";

    const valid = await verifySignature(body, signature, WEBHOOK_SECRET);
    if (!valid) {
      console.error("Invalid webhook signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(body);
    const eventName = event.meta?.event_name;
    const customData = event.meta?.custom_data;
    const userId = customData?.user_id;
    const attrs = event.data?.attributes;

    console.log("Lemon webhook event:", eventName, "user:", userId);

    if (!userId) {
      console.error("No user_id in custom_data");
      return new Response(JSON.stringify({ error: "No user_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine plan from variant/product name
    const productName = (attrs?.product_name || attrs?.variant_name || "").toLowerCase();
    let plan = "free";
    if (productName.includes("pro")) plan = "pro";
    else if (productName.includes("plus")) plan = "plus";

    switch (eventName) {
      case "subscription_created":
      case "subscription_resumed":
      case "subscription_updated": {
        const status = attrs?.status;
        if (status === "active" || status === "on_trial") {
          const expiresAt = attrs?.renews_at || attrs?.ends_at;
          await supabase.from("profiles").update({
            plan,
            lemon_customer_id: String(attrs?.customer_id || ""),
            lemon_subscription_id: String(event.data?.id || ""),
            plan_expires_at: expiresAt,
          }).eq("id", userId);
          console.log(`Updated user ${userId} to plan: ${plan}`);
        }
        break;
      }

      case "subscription_cancelled":
      case "subscription_expired": {
        await supabase.from("profiles").update({
          plan: "free",
          plan_expires_at: null,
          lemon_subscription_id: null,
        }).eq("id", userId);
        console.log(`Downgraded user ${userId} to free`);
        break;
      }

      case "subscription_payment_success": {
        // Just log, plan already active
        console.log(`Payment success for user ${userId}`);
        break;
      }

      default:
        console.log(`Unhandled event: ${eventName}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

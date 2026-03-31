import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Dodo payments webhook verification
async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
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
  } catch(e) {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const WEBHOOK_SECRET = Deno.env.get("DODO_PAYMENTS_WEBHOOK_SECRET");
    if (!WEBHOOK_SECRET) throw new Error("DODO_PAYMENTS_WEBHOOK_SECRET not set");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.text();
    const signature = req.headers.get("dodo-signature") || req.headers.get("authorization")?.replace("Bearer ", "") || "";

    // Authorize either via bearer token or HMAC depending on Dodo's setup
    const isBearerCheck = signature === WEBHOOK_SECRET;
    const isHmacCheck = await verifySignature(body, signature, WEBHOOK_SECRET);

    if (!isBearerCheck && !isHmacCheck) {
      console.error("Invalid Dodo webhook signature", signature);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(body);
    const eventName = event.type || event.event;
    
    // Dodo payload format handles metadata
    const payloadData = event.data || event.payload || event;
    const userId = payloadData.metadata?.user_id || event.metadata?.user_id;
    
    console.log("Dodo webhook event:", eventName, "user:", userId);

    if (!userId) {
      console.error("No user_id in metadata");
      return new Response(JSON.stringify({ error: "No user_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const productId = String(payloadData.product_id || "");

    // Map real Dodo product IDs to plan names
    const PRODUCT_PLAN_MAP: Record<string, string> = {
      "pdt_0NbhFlXcexmMdlcYFUaYb": "plus",   // Nuju Plus Monthly
      "pdt_0NbhG9cZxUlLissUYnKkm": "plus",   // Nuju Plus Annual
      "pdt_0NbhHW3W4gTSSif6PbYb8": "pro",    // Nuju Pro Monthly
      "pdt_0NbhHexts6edZvPqDnoqt": "pro",    // Nuju Pro Annual
      "pdt_0NbhHzl2NQ8Dx0ntZsPQs": "lifetime", // Nuju Lifetime
    };
    let plan = PRODUCT_PLAN_MAP[productId] || "free";

    switch (eventName) {
      case "subscription.active":
      case "subscription.renewed":
      case "subscription.updated": {
        const nextBillingDate = payloadData.next_billing_date || payloadData.current_period_end;
        await supabase.from("profiles").update({
          plan,
          dodo_customer_id: String(payloadData.customer_id || ""),
          dodo_subscription_id: String(payloadData.subscription_id || payloadData.id || ""),
          plan_expires_at: nextBillingDate,
        }).eq("id", userId);
        console.log(`Updated user ${userId} to plan: ${plan}`);
        break;
      }

      case "subscription.canceled":
      case "subscription.expired":
      case "subscription.past_due": {
        await supabase.from("profiles").update({
          plan: "free",
          plan_expires_at: null,
          dodo_subscription_id: null,
        }).eq("id", userId);
        console.log(`Downgraded user ${userId} to free`);
        break;
      }

      case "payment.succeeded": {
        // One-time payment like Lifetime Plan
        if (plan === "lifetime") {
          await supabase.from("profiles").update({
            plan: "lifetime",
            dodo_customer_id: String(payloadData.customer_id || ""),
            plan_expires_at: '2099-12-31T23:59:59Z', // Essentially infinite
          }).eq("id", userId);
          console.log(`Updated user ${userId} to lifetime plan`);
        } else {
             console.log(`Payment success for user ${userId} on plan ${plan}`);
        }
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

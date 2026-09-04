import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RevenueCatEvent {
  type: string;
  app_user_id: string;
  original_app_user_id?: string;
  aliases?: string[];
  product_id?: string;
  entitlement_id?: string;
  entitlement_ids?: string[];
  purchased_at_ms?: number;
  expiration_at_ms?: number | null;
  environment?: string;
}

interface RevenueCatWebhookBody {
  api_version?: string;
  event: RevenueCatEvent;
}

const getServiceClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service role credentials are missing");
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Optional authorization check if REVENUECAT_WEBHOOK_AUTH is configured
  const expectedAuth = Deno.env.get("REVENUECAT_WEBHOOK_AUTH") || Deno.env.get("REVENUECAT_WEBHOOK_SECRET");
  if (expectedAuth) {
    const authHeader = req.headers.get("Authorization") || "";
    if (authHeader !== expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return new Response(JSON.stringify({ error: "Unauthorized webhook request" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  try {
    const body = (await req.json()) as RevenueCatWebhookBody;
    const event = body?.event;

    if (!event || !event.type || !event.app_user_id) {
      return new Response(JSON.stringify({ error: "Invalid event payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[revenuecat-webhook] Received ${event.type} for user: ${event.app_user_id}`);

    const admin = getServiceClient();
    const userId = event.app_user_id;

    // Check if user exists in Supabase profiles
    const { data: profile } = await admin
      .from("profiles")
      .select("id, plan, is_pro")
      .eq("id", userId)
      .maybeSingle();

    if (!profile) {
      console.warn(`[revenuecat-webhook] No profile found for user ${userId}; skipping.`);
      return new Response(JSON.stringify({ received: true, message: "User not found in profiles" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const type = event.type.toUpperCase();
    const isLifetime =
      !event.expiration_at_ms ||
      (typeof event.product_id === "string" && event.product_id.toLowerCase().includes("lifetime"));

    if (
      type === "INITIAL_PURCHASE" ||
      type === "RENEWAL" ||
      type === "PRODUCT_CHANGE" ||
      type === "UNCANCELLATION"
    ) {
      const planName = isLifetime ? "lifetime" : "pro";
      const expiresAt = event.expiration_at_ms ? new Date(event.expiration_at_ms).toISOString() : null;

      await admin
        .from("profiles")
        .update({
          is_pro: true,
          plan: planName,
          subscription_status: "active",
          subscription_plan: planName,
          subscription_expires_at: expiresAt,
          plan_expires_at: expiresAt,
        })
        .eq("id", userId);

      console.log(`[revenuecat-webhook] Activated ${planName} for ${userId}`);
    } else if (type === "CANCELLATION") {
      // User canceled auto-renew, but retains access until expiry
      await admin
        .from("profiles")
        .update({
          subscription_status: "canceled",
        })
        .eq("id", userId);

      console.log(`[revenuecat-webhook] Marked canceled for ${userId}`);
    } else if (type === "EXPIRATION") {
      await admin
        .from("profiles")
        .update({
          is_pro: false,
          plan: "free",
          subscription_status: "expired",
        })
        .eq("id", userId);

      console.log(`[revenuecat-webhook] Expired subscription for ${userId}`);
    }

    return new Response(JSON.stringify({ received: true, event: type }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[revenuecat-webhook] Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

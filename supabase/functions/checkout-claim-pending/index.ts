import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const normalizeEmail = (value: unknown) => safeText(value).toLowerCase();

const readPayloadValue = (metadata: Record<string, unknown>, key: string) => {
  const payload = metadata.payload && typeof metadata.payload === "object" && !Array.isArray(metadata.payload)
    ? metadata.payload as Record<string, unknown>
    : {};
  return safeText(metadata[key] || payload[key]);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const authHeader = req.headers.get("Authorization");

    if (!supabaseUrl || !serviceRoleKey || !anonKey) throw new Error("Supabase credentials are missing");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const { data: authData, error: authError } = await userClient.auth.getUser();
    const user = authData.user;
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userEmail = normalizeEmail(user.email);
    if (!userEmail) {
      return new Response(JSON.stringify({ claimed: false, reason: "missing_email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: purchaseIntent, error } = await adminClient
      .from("checkout_purchase_intents")
      .select("*")
      .eq("email", userEmail)
      .eq("status", "paid")
      .is("claimed_user_id", null)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!purchaseIntent) {
      return new Response(JSON.stringify({ claimed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const metadata =
      purchaseIntent.metadata_json && typeof purchaseIntent.metadata_json === "object" && !Array.isArray(purchaseIntent.metadata_json)
        ? purchaseIntent.metadata_json as Record<string, unknown>
        : {};

    const { data: claimedUserId, error: claimError } = await adminClient.rpc("claim_paid_checkout_by_email", {
      p_intent_id: String(purchaseIntent.id),
      p_email: userEmail,
      p_plan: safeText(purchaseIntent.plan),
      p_customer_id: readPayloadValue(metadata, "customer_id") || null,
      p_subscription_id: safeText(purchaseIntent.subscription_id) || null,
      p_next_billing_date: readPayloadValue(metadata, "next_billing_date") || readPayloadValue(metadata, "current_period_end") || null,
    });

    if (claimError) throw claimError;
    const normalizedClaimedUserId = safeText(claimedUserId);

    return new Response(JSON.stringify({
      claimed: normalizedClaimedUserId === user.id,
      intentId: String(purchaseIntent.id),
      plan: String(purchaseIntent.plan),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("checkout-claim-pending error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

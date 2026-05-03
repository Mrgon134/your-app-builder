import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendPurchaseActivatedEmail } from "../_shared/resend.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const safeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const normalizeEmail = (value: unknown) => safeText(value).toLowerCase();

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
      global: {
        headers: { Authorization: authHeader },
      },
    });
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const { data: authData, error: authError } = await userClient.auth.getUser();
    if (authError || !authData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { intentId } = await req.json();
    const normalizedIntentId = safeText(intentId);
    if (!normalizedIntentId) {
      return new Response(JSON.stringify({ error: "intentId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: purchaseIntent, error } = await adminClient
      .from("checkout_purchase_intents")
      .select("*")
      .eq("id", normalizedIntentId)
      .maybeSingle();

    if (error) throw error;
    if (!purchaseIntent) {
      return new Response(JSON.stringify({ error: "Checkout intent not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = authData.user;
    const userEmail = normalizeEmail(user.email);
    const checkoutEmail = normalizeEmail(purchaseIntent.email);

    if (!userEmail || userEmail !== checkoutEmail) {
      return new Response(JSON.stringify({ error: `Sign in with ${purchaseIntent.email} to claim this purchase.` }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!["paid", "claimed"].includes(String(purchaseIntent.status))) {
      return new Response(JSON.stringify({ error: "Payment has not been confirmed yet." }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (purchaseIntent.claimed_user_id && purchaseIntent.claimed_user_id !== user.id) {
      return new Response(JSON.stringify({ error: "This purchase has already been claimed by another account." }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const profilePlan = purchaseIntent.plan === "lifetime_one_time" ? "lifetime" : purchaseIntent.plan;
    const currentProfile = await adminClient.from("profiles").select("*").eq("id", user.id).maybeSingle();
    if (currentProfile.error) throw currentProfile.error;

    const metadataJson =
      purchaseIntent.metadata_json && typeof purchaseIntent.metadata_json === "object" && !Array.isArray(purchaseIntent.metadata_json)
        ? purchaseIntent.metadata_json as Record<string, unknown>
        : {};

    const profilePatch: Record<string, unknown> = {
      id: user.id,
      display_name: safeText(currentProfile.data?.display_name) || safeText(user.user_metadata?.display_name) || safeText(purchaseIntent.name) || null,
      plan: profilePlan,
      onboarded: true,
      dodo_customer_id: safeText(metadataJson.customer_id) || null,
      dodo_subscription_id: safeText(purchaseIntent.subscription_id) || null,
    };

    if (profilePlan === "lifetime") {
      profilePatch.plan_expires_at = "2099-12-31T23:59:59Z";
    } else if (safeText(metadataJson.next_billing_date)) {
      profilePatch.plan_expires_at = safeText(metadataJson.next_billing_date);
    }

    const { error: upsertError } = await adminClient.from("profiles").upsert(profilePatch, {
      onConflict: "id",
    });
    if (upsertError) throw upsertError;

    const { error: claimError } = await adminClient
      .from("checkout_purchase_intents")
      .update({
        claimed_user_id: user.id,
        status: "claimed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", normalizedIntentId);

    if (claimError) throw claimError;

    await sendPurchaseActivatedEmail(adminClient, {
      intentId: normalizedIntentId,
      to: userEmail,
      name: safeText(purchaseIntent.name) || safeText(user.user_metadata?.display_name),
      plan: String(purchaseIntent.plan),
    });

    await adminClient
      .from("onboarding_leads")
      .update({
        user_id: user.id,
        selected_plan: purchaseIntent.plan,
        updated_at: new Date().toISOString(),
      })
      .eq("session_id", String(purchaseIntent.session_id));

    return new Response(JSON.stringify({ claimed: true, plan: profilePlan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("checkout-claim error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

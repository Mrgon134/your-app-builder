import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export type AccessLevel = "plus" | "pro";

const jsonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const premiumPlans = new Set(["plus", "pro", "weekly", "three_month", "yearly", "lifetime", "lifetime_one_time"]);
const proPlans = new Set(["pro", "weekly", "three_month", "yearly", "lifetime", "lifetime_one_time"]);
const activeStatuses = new Set(["active", "trialing", "paid", "lifetime", "pro"]);

const hasActiveTrial = (trialStartedAt: string | null | undefined) => {
  if (!trialStartedAt) return false;
  const trialStart = new Date(trialStartedAt).getTime();
  if (!Number.isFinite(trialStart)) return false;
  return trialStart + 7 * 24 * 60 * 60 * 1000 > Date.now();
};

const isFutureDate = (value: string | null | undefined) => {
  if (!value) return false;
  const time = new Date(value).getTime();
  return Number.isFinite(time) && time > Date.now();
};

const normalizePlan = (value: unknown) => {
  if (typeof value !== "string") return "free";
  const plan = value.trim().toLowerCase();
  return plan === "lifetime_one_time" ? "lifetime" : plan || "free";
};

type ProfileAccessRow = {
  plan?: string | null;
  plan_expires_at?: string | null;
  trial_started_at?: string | null;
  is_pro?: boolean | null;
  subscription_status?: string | null;
  subscription_plan?: string | null;
  subscription_expires_at?: string | null;
};

const hasProfilePaidAccess = (profile: ProfileAccessRow | null | undefined, level: AccessLevel) => {
  if (!profile) return false;
  if (profile.is_pro === true) return true;
  if (hasActiveTrial(profile.trial_started_at)) return true;

  const status = normalizePlan(profile.subscription_status);
  if (activeStatuses.has(status)) return true;
  if (isFutureDate(profile.subscription_expires_at)) return true;

  const plan = normalizePlan(profile.subscription_plan || profile.plan);
  const planSet = level === "pro" ? proPlans : premiumPlans;
  if (!planSet.has(plan)) return false;
  if (plan === "lifetime") return true;

  const expiry = profile.plan_expires_at || profile.subscription_expires_at;
  return expiry ? isFutureDate(expiry) : true;
};

export const getServiceClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service role credentials are missing");
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

const hasRevenueCatAccess = async (userId: string) => {
  const apiKey =
    Deno.env.get("REVENUECAT_SECRET_API_KEY") ||
    Deno.env.get("REVENUECAT_V1_API_KEY");
  if (!apiKey) return false;

  try {
    if (apiKey.startsWith("sk_")) {
      const projectId = Deno.env.get("REVENUECAT_PROJECT_ID") || "projf89a18a8";
      const res = await fetch(`https://api.revenuecat.com/v2/projects/${projectId}/customers/${encodeURIComponent(userId)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) return false;
      const data = await res.json();
      const active = data?.active_entitlements?.items;
      const hasAccess = Array.isArray(active) && active.length > 0;

      if (hasAccess) {
        // Auto-heal / sync profiles row so Supabase DB is permanently updated to Pro
        try {
          const admin = getServiceClient();
          const firstEntitlement = active[0];
          const isLifetime = !firstEntitlement?.expires_at;
          await admin
            .from("profiles")
            .update({
              is_pro: true,
              plan: isLifetime ? "lifetime" : "pro",
              subscription_status: "active",
              subscription_plan: isLifetime ? "lifetime" : "pro",
              subscription_expires_at: firstEntitlement?.expires_at || null,
            })
            .eq("id", userId);
        } catch (syncErr) {
          console.warn("Failed to auto-sync RevenueCat entitlement to profiles:", syncErr);
        }
      }

      return hasAccess;
    }

    const res = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    const entitlements = data?.subscriber?.entitlements;
    if (!entitlements || typeof entitlements !== "object") return false;

    const hasAccess = Object.values(entitlements).some((entry) => {
      if (!entry || typeof entry !== "object") return false;
      const expires = (entry as Record<string, unknown>).expires_date;
      if (expires === null) return true;
      if (typeof expires !== "string") return false;
      return isFutureDate(expires);
    });

    if (hasAccess) {
      try {
        const admin = getServiceClient();
        await admin
          .from("profiles")
          .update({
            is_pro: true,
            plan: "pro",
            subscription_status: "active",
          })
          .eq("id", userId);
      } catch (syncErr) {
        console.warn("Failed to auto-sync RevenueCat v1 entitlement to profiles:", syncErr);
      }
    }

    return hasAccess;
  } catch (error) {
    console.warn("RevenueCat access check failed:", error);
    return false;
  }
};

export const isNujuIOSRequest = (req: Request) => {
  const clientInfo = [
    req.headers.get("x-client-info"),
    req.headers.get("x-supabase-client-platform"),
    req.headers.get("user-agent"),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return clientInfo.includes("nuju ios");
};

export const unauthorized = (message = "Unauthorized") =>
  new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: jsonHeaders,
  });

export const paymentRequired = (message = "Upgrade required") =>
  new Response(JSON.stringify({ error: message }), {
    status: 402,
    headers: jsonHeaders,
  });

export const getAuthenticatedUser = async (req: Request) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const authHeader = req.headers.get("Authorization") || "";

  if (!supabaseUrl || !anonKey || !authHeader) {
    return null;
  }

  const client = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  try {
    const { data, error } = await client.auth.getUser();
    if (error || !data.user) return null;
    return data.user;
  } catch (error) {
    console.warn("Supabase auth user lookup failed:", error);
    return null;
  }
};


export const hasPaidAccess = async (userId: string, level: AccessLevel) => {
  const admin = getServiceClient();
  const { data, error } = await admin
    .from("profiles")
    .select("plan, plan_expires_at, trial_started_at, is_pro, subscription_status, subscription_plan, subscription_expires_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  if (hasProfilePaidAccess(data, level)) return true;
  return hasRevenueCatAccess(userId);
};

export const hasPaidAccessForRequest = async (req: Request, userId: string, level: AccessLevel) => {
  if (await hasPaidAccess(userId, level)) return true;

  // iOS purchases are enforced locally by RevenueCat/StoreKit today, while the
  // server profile row can still look free until a webhook/sync layer exists.
  return isNujuIOSRequest(req);
};

export const hasCoachAccess = async (userId: string, persona: string) => {
  const admin = getServiceClient();
  const { data: profile, error } = await admin
    .from("profiles")
    .select("plan, plan_expires_at, trial_started_at, is_pro, subscription_status, subscription_plan, subscription_expires_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  if (hasProfilePaidAccess(profile, "plus")) return true;
  if (await hasRevenueCatAccess(userId)) return true;
  if (persona !== "gentle") return false;

  const { data: canSend, error: limitError } = await admin.rpc("check_coach_limit", {
    p_user_id: userId,
  });
  if (limitError) throw limitError;
  return canSend === true;
};

export const hasCoachAccessForRequest = async (req: Request, userId: string, persona: string) => {
  if (await hasCoachAccess(userId, persona)) return true;
  return isNujuIOSRequest(req);
};

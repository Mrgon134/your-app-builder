import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export type AccessLevel = "plus" | "pro";

const jsonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const premiumPlans = new Set(["plus", "pro", "weekly", "three_month", "yearly", "lifetime"]);
const proPlans = new Set(["pro", "weekly", "three_month", "yearly", "lifetime"]);

const hasActiveTrial = (trialStartedAt: string | null | undefined) => {
  if (!trialStartedAt) return false;
  const trialStart = new Date(trialStartedAt).getTime();
  if (!Number.isFinite(trialStart)) return false;
  return trialStart + 7 * 24 * 60 * 60 * 1000 > Date.now();
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
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
};

export const getServiceClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase service role credentials are missing");
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

export const hasPaidAccess = async (userId: string, level: AccessLevel) => {
  const admin = getServiceClient();
  const { data, error } = await admin
    .from("profiles")
    .select("plan, trial_started_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  const plan = typeof data?.plan === "string" ? data.plan : "free";
  if (hasActiveTrial(data?.trial_started_at)) return true;
  return level === "pro" ? proPlans.has(plan) : premiumPlans.has(plan);
};

export const hasCoachAccess = async (userId: string, persona: string) => {
  const admin = getServiceClient();
  const { data: profile, error } = await admin
    .from("profiles")
    .select("plan, trial_started_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  const plan = typeof profile?.plan === "string" ? profile.plan : "free";
  if (hasActiveTrial(profile?.trial_started_at) || premiumPlans.has(plan)) return true;
  if (persona !== "gentle") return false;

  const { data: canSend, error: limitError } = await admin.rpc("check_coach_limit", {
    p_user_id: userId,
  });
  if (limitError) throw limitError;
  return canSend === true;
};

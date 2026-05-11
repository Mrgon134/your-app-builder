import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const allowedEvents = new Set([
  "first_open",
  "app_opened",
  "auth_completed",
  "onboarding_started",
  "onboarding_step_viewed",
  "onboarding_step_completed",
  "onboarding_completed",
  "screen_viewed",
  "mood_selected",
  "journal_entry_created",
  "voice_recording_started",
  "voice_transcription_completed",
  "selfie_read_started",
  "selfie_read_completed",
  "selfie_read_failed",
  "habit_created",
  "habit_toggled",
  "paywall_viewed",
  "paywall_offerings_loaded",
  "paywall_offerings_failed",
  "paywall_plan_selected",
  "paywall_skipped",
  "paywall_closed",
  "purchase_started",
  "purchase_succeeded",
  "purchase_cancelled",
  "purchase_failed",
  "restore_started",
  "restore_succeeded",
  "restore_failed",
]);

const safeText = (value: unknown, maxLength = 160) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const safeEventName = (value: unknown) => {
  const name = safeText(value, 64).toLowerCase();
  return /^[a-z0-9_]{2,64}$/.test(name) ? name : "";
};

const safeSource = (value: unknown) => {
  const source = safeText(value, 24);
  return source === "ios" || source === "web" || source === "server" ? source : "ios";
};

const sanitizeValue = (value: unknown, depth = 0): unknown => {
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "string") return value.slice(0, 500);
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (Array.isArray(value)) {
    if (depth >= 2) return [];
    return value.slice(0, 20).map((item) => sanitizeValue(item, depth + 1));
  }
  if (typeof value === "object" && value) {
    if (depth >= 2) return {};
    return sanitizeProperties(value as Record<string, unknown>, depth + 1);
  }
  return null;
};

const sanitizeProperties = (input: Record<string, unknown>, depth = 0) => {
  const output: Record<string, unknown> = {};
  for (const [rawKey, rawValue] of Object.entries(input).slice(0, 30)) {
    const key = rawKey.replace(/[^a-zA-Z0-9_:-]/g, "_").slice(0, 80);
    if (!key) continue;
    output[key] = sanitizeValue(rawValue, depth);
  }
  return output;
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      throw new Error("Supabase credentials are missing");
    }

    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const eventName = safeEventName(body.event_name ?? body.eventName);

    if (!eventName || !allowedEvents.has(eventName)) {
      return jsonResponse({ error: "Unsupported event" }, 400);
    }

    const authHeader = req.headers.get("Authorization") || "";
    let userId: string | null = null;

    if (authHeader.toLowerCase().startsWith("bearer ") && !authHeader.endsWith(anonKey)) {
      const authClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data } = await authClient.auth.getUser();
      userId = data.user?.id ?? null;
    }

    const admin = createClient(supabaseUrl, serviceRoleKey);
    const properties = typeof body.properties === "object" && body.properties
      ? sanitizeProperties(body.properties as Record<string, unknown>)
      : {};

    const { error } = await admin.from("app_events").insert({
      user_id: userId,
      anonymous_id: safeText(body.anonymous_id ?? body.anonymousId, 96) || null,
      event_name: eventName,
      source: safeSource(body.source),
      platform: safeText(body.platform, 24) || "ios",
      app_version: safeText(body.app_version ?? body.appVersion, 40) || null,
      build_number: safeText(body.build_number ?? body.buildNumber, 40) || null,
      session_id: safeText(body.session_id ?? body.sessionId, 96) || null,
      screen: safeText(body.screen, 80) || null,
      context: safeText(body.context, 120) || null,
      product_id: safeText(body.product_id ?? body.productId, 120) || null,
      properties,
    });

    if (error) {
      console.error("track-event insert failed", error);
      return jsonResponse({ error: "Event could not be stored" }, 500);
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("track-event error:", error);
    return jsonResponse({ error: "Event could not be stored" }, 500);
  }
});

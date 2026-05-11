import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, hasPaidAccess, paymentRequired, unauthorized } from "../_shared/function-auth.ts";
import { callChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const moodLabels: Record<number, string> = {
  1: "Rough", 2: "Low", 3: "Okay", 4: "Good", 5: "Great",
};

const langNames: Record<string, string> = {
  en: "English", id: "Indonesian (Bahasa Indonesia)", es: "Spanish (Español)",
  pt: "Portuguese (Português)", ja: "Japanese (日本語)", ko: "Korean (한국어)",
  zh: "Chinese (中文)", hi: "Hindi (हिन्दी)", ar: "Arabic (العربية)",
  fr: "French (Français)", de: "German (Deutsch)", ms: "Malay (Bahasa Melayu)",
  th: "Thai (ไทย)", vi: "Vietnamese (Tiếng Việt)", fil: "Filipino",
};

function buildPrompt(text: string, mood: number, energy: number, lang: string): string {
  const langName = langNames[lang] || "English";
  return `CRITICAL INSTRUCTION: You MUST respond ONLY in ${langName} and your tone should feel intensely human, raw, and empathetic. Do NOT sound like an AI assistant.

You are Ju, a private, trusted emotional space. The user just poured their heart out into their journal. Your job is to provide a brief (2-3 sentences max) reflection that makes them feel deeply seen and heard.

FRAMEWORK TO FOLLOW:
1. VALIDATE FIRST: Never rush to "fix" it or offer toxic positivity like "Stay strong!" or "Tomorrow is another day." Just sit in the feeling with them. 
2. BE SPECIFIC: Reflect on an exact metaphor, emotion, or situation they mentioned. Show you actually listened.
3. CONTEXT (Mood: ${moodLabels[mood] || "Unknown"} ${mood}/5 | Energy: ${energy}/100):
   - If mood is 1-2 (Rough/Low): Use gentle, trauma-informed language. It's okay that things suck right now. Give them permission to rest.
   - If mood is 4-5 (Good/Great): Mirror their joy or peace, but stay grounded. Relish the moment with them.

Their Journal Entry:
"${text}"

Write your reflection. Keep it under 3 sentences. No bullet points. Talk to them like a late-night friend who totally gets it. Respond exclusively in ${langName}.`;
}

async function getInsight(prompt: string): Promise<string> {
  return callChatWithGroqFallback({
    label: "ai-insight",
    maxTokens: 200,
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  });
}

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, mood, energy, lang } = await req.json();
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();
    if (!(await hasPaidAccess(user.id, "plus"))) {
      return paymentRequired("Upgrade to unlock AI insights.");
    }

    const prompt = buildPrompt(text, mood ?? 3, energy ?? 50, lang || "en");
    const insight = await getInsight(prompt);

    return new Response(
      JSON.stringify({ insight }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("ai-insight error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", insight: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

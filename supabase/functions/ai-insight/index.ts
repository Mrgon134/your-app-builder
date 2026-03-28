import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── Provider config via Supabase Dashboard > Edge Functions > Secrets ────────
//
//  AI_PROVIDER  = "gemini" | "openai" | "groq" | "anthropic" | "openai-compatible"
//                 default: "gemini"
//  AI_MODEL     = model name, e.g. "gemini-2.0-flash-lite", "gpt-4o-mini",
//                 "llama-3.3-70b-versatile", "claude-haiku-4-5-20251001", "qwen-turbo"
//  AI_API_KEY   = API key for the chosen provider
//  AI_BASE_URL  = (optional) custom base URL for any OpenAI-compatible provider
//                 e.g. DashScope: https://coding-intl.dashscope.aliyuncs.com/v1
//                      Azure:     https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOY
//                      Together:  https://api.together.xyz/v1
//  GEMINI_API_KEY = legacy fallback if AI_PROVIDER / AI_API_KEY not set
//
// ─────────────────────────────────────────────────────────────────────────────

const moodLabels: Record<number, string> = {
  1: "Rough", 2: "Low", 3: "Okay", 4: "Good", 5: "Great",
};

function buildPrompt(text: string, mood: number, energy: number): string {
  return `You are Ju, a warm and insightful AI journal companion. The user just wrote a journal entry. Analyze their writing and provide a brief, empathetic 2-3 sentence insight.

Be specific to what they wrote — reference their words, feelings, or situations. Don't be generic.
If mood is low (1-2), be extra compassionate. If mood is high (4-5), celebrate with them.
Respond in the same language the user wrote in.

Journal entry (mood: ${moodLabels[mood] || "Unknown"} ${mood}/5, energy: ${energy}/100):

"${text}"

Give a brief personalized insight about this entry.`;
}

// ── Gemini ────────────────────────────────────────────────────────────────────
async function callGemini(prompt: string, model: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ── OpenAI-compatible (OpenAI, Groq, DashScope, Azure, Together, etc.) ────────
async function callOpenAICompat(
  prompt: string,
  model: string,
  apiKey: string,
  baseUrl: string
): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI-compat ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// ── Anthropic ─────────────────────────────────────────────────────────────────
async function callAnthropic(prompt: string, model: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// ── Provider router ───────────────────────────────────────────────────────────
async function getInsight(prompt: string): Promise<string> {
  const provider = Deno.env.get("AI_PROVIDER") || "gemini";
  const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("GEMINI_API_KEY") || "";
  if (!apiKey) throw new Error("No API key set. Add AI_API_KEY (or GEMINI_API_KEY) in Supabase secrets.");

  switch (provider) {
    case "gemini": {
      const model = Deno.env.get("AI_MODEL") || "gemini-2.0-flash-lite";
      return callGemini(prompt, model, apiKey);
    }
    case "openai":
    case "groq": {
      const defaultBase = provider === "groq"
        ? "https://api.groq.com/openai/v1"
        : "https://api.openai.com/v1";
      const baseUrl = Deno.env.get("AI_BASE_URL") || defaultBase;
      const defaultModel = provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
      const model = Deno.env.get("AI_MODEL") || defaultModel;
      return callOpenAICompat(prompt, model, apiKey, baseUrl);
    }
    case "anthropic": {
      const model = Deno.env.get("AI_MODEL") || "claude-haiku-4-5-20251001";
      return callAnthropic(prompt, model, apiKey);
    }
    case "openai-compatible": {
      // For any OpenAI-compatible API (DashScope, Azure, Together, etc.)
      const baseUrl = Deno.env.get("AI_BASE_URL");
      const model = Deno.env.get("AI_MODEL");
      if (!baseUrl) throw new Error("openai-compatible requires AI_BASE_URL in secrets.");
      if (!model) throw new Error("openai-compatible requires AI_MODEL in secrets.");
      return callOpenAICompat(prompt, model, apiKey, baseUrl);
    }
    default:
      throw new Error(
        `Unknown AI_PROVIDER: "${provider}". Valid values: gemini, openai, groq, anthropic, openai-compatible`
      );
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, mood, energy } = await req.json();
    const prompt = buildPrompt(text, mood ?? 3, energy ?? 50);
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

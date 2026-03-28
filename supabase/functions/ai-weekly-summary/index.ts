import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─── Provider config via Supabase Dashboard > Edge Functions > Secrets ────────
// Same config as ai-coach and ai-insight:
//  AI_PROVIDER  = "gemini" | "openai" | "groq" | "anthropic" | "openai-compatible"
//  AI_MODEL     = model name
//  AI_API_KEY   = API key for the chosen provider
//  AI_BASE_URL  = (optional) custom OpenAI-compatible base URL
//  GEMINI_API_KEY = legacy fallback
// ─────────────────────────────────────────────────────────────────────────────

async function callGemini(prompt: string, system: string, model: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function callOpenAICompat(prompt: string, system: string, model: string, apiKey: string, baseUrl: string): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, { role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI-compat ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callAnthropic(prompt: string, system: string, model: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model, max_tokens: 300, system, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

async function getSummary(prompt: string, system: string): Promise<string> {
  const provider = Deno.env.get("AI_PROVIDER") || "gemini";
  const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("GEMINI_API_KEY") || "";
  if (!apiKey) throw new Error("No API key set. Add AI_API_KEY in Supabase secrets.");

  switch (provider) {
    case "gemini": {
      const model = Deno.env.get("AI_MODEL") || "gemini-2.0-flash-lite";
      return callGemini(prompt, system, model, apiKey);
    }
    case "openai":
    case "groq": {
      const defaultBase = provider === "groq" ? "https://api.groq.com/openai/v1" : "https://api.openai.com/v1";
      const baseUrl = Deno.env.get("AI_BASE_URL") || defaultBase;
      const defaultModel = provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
      const model = Deno.env.get("AI_MODEL") || defaultModel;
      return callOpenAICompat(prompt, system, model, apiKey, baseUrl);
    }
    case "anthropic": {
      const model = Deno.env.get("AI_MODEL") || "claude-haiku-4-5-20251001";
      return callAnthropic(prompt, system, model, apiKey);
    }
    case "openai-compatible": {
      const baseUrl = Deno.env.get("AI_BASE_URL");
      const model = Deno.env.get("AI_MODEL");
      if (!baseUrl) throw new Error("openai-compatible requires AI_BASE_URL in secrets.");
      if (!model) throw new Error("openai-compatible requires AI_MODEL in secrets.");
      return callOpenAICompat(prompt, system, model, apiKey, baseUrl);
    }
    default:
      throw new Error(`Unknown AI_PROVIDER: "${provider}".`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { entries, lang } = await req.json();

    if (!entries || entries.length === 0) {
      return new Response(
        JSON.stringify({ summary: "" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const langNames: Record<string, string> = {
      en: "English", id: "Indonesian (Bahasa Indonesia)", es: "Spanish (Español)",
      pt: "Portuguese (Português)", ja: "Japanese (日本語)", ko: "Korean (한국어)",
      zh: "Chinese (中文)", hi: "Hindi (हिन्दी)", ar: "Arabic (العربية)",
      fr: "French (Français)", de: "German (Deutsch)", ms: "Malay (Bahasa Melayu)",
      th: "Thai (ไทย)", vi: "Vietnamese (Tiếng Việt)", fil: "Filipino",
    };
    const langName = langNames[lang] || "English";

    const entrySummaries = entries
      .slice(0, 7)
      .map(
        (e: { mood: number; text: string; date: string }, i: number) =>
          `Day ${i + 1} (${e.date}): mood=${e.mood}/5, "${e.text.slice(0, 100)}"`
      )
      .join("\n");

    const system = `You are Ju, a warm AI journal companion. CRITICAL: Respond ONLY in ${langName}. Summarize the user's last week of journal entries in 3-4 sentences. Be empathetic, notice patterns (mood trends, recurring themes, improvements). Keep it personal and warm.`;

    const summary = await getSummary(entrySummaries, system);

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("ai-weekly-summary error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown", summary: "" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

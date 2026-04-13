import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── Provider config (same as ai-insight) ────────────────────────────────────
//  AI_PROVIDER  = "gemini" | "openai" | "groq" | "anthropic" | "openai-compatible"
//  AI_MODEL     = model name
//  AI_API_KEY   = API key
//  AI_BASE_URL  = (optional) OpenAI-compatible base URL
//  GEMINI_API_KEY = legacy fallback
// ─────────────────────────────────────────────────────────────────────────────

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

interface ExpressionData {
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  neutral: number;
}

interface RegionScores {
  eyes: number;
  eyebrows: number;
  cheeks: number;
  forehead: number;
  chin: number;
  aura: number;
}

function buildPrompt(
  expressions: ExpressionData,
  regionScores: RegionScores,
  moodValue: number,
  dominantExpression: string,
  confidence: number,
  lang: string
): string {
  const langName = langNames[lang] || "English";
  const moodLabel = moodLabels[moodValue] || "Unknown";

  // Format expressions as percentages, only show meaningful ones (>5%)
  const expressionLines = Object.entries(expressions)
    .filter(([, v]) => (v as number) > 0.05)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([k, v]) => `${k} ${Math.round((v as number) * 100)}%`)
    .join(", ");

  // Note any interesting region contradictions
  const contradictions: string[] = [];
  if (moodValue >= 4 && regionScores.eyebrows <= 3)
    contradictions.push("eyebrows still tense despite positive energy");
  if (moodValue >= 4 && regionScores.eyes <= 4)
    contradictions.push("eyes look tired even through the positivity");
  if (moodValue <= 2 && regionScores.eyes >= 8)
    contradictions.push("surprising brightness in the eyes despite low mood");
  if (moodValue <= 2 && regionScores.cheeks >= 7)
    contradictions.push("cheeks relatively lifted for how heavy the mood feels");
  const contradictionNote = contradictions.length
    ? `Interesting facial contradiction: ${contradictions.join("; ")}.`
    : "";

  return `CRITICAL: You MUST respond ONLY in ${langName}. 2-3 sentences maximum. Sound like a trusted friend at midnight — raw, real, human. NOT an AI assistant. NOT clinical.

You are Ju, the companion inside Nuju journal. The user just scanned their face with the camera and you can literally see their expression.

Here's what the face analysis detected:
- Mood: ${moodLabel} (${moodValue}/5)
- Dominant expression: ${dominantExpression} at ${confidence}% confidence
- Full expression blend: ${expressionLines}
- Facial area scores (0-10, higher = more positive/relaxed):
  Eyes ${regionScores.eyes} | Eyebrows ${regionScores.eyebrows} | Cheeks ${regionScores.cheeks} | Forehead ${regionScores.forehead} | Chin ${regionScores.chin} | Overall energy ${regionScores.aura}
${contradictionNote ? `- ${contradictionNote}` : ""}

Write exactly 2-3 sentences that do all of the following:
1. MIRROR what you literally see — be specific to the face data (mention actual regions if something stands out). Make them feel truly seen, not analyzed.
2. Give ONE honest emotional insight — what does this particular expression pattern usually mean?
3. End with ONE question or soft invitation that makes them want to open their journal and write.

Rules:
- Never start with "I can see..." or "It seems..." or "Your face shows..."
- Never be generic — every word must feel like it's written for THIS person's face RIGHT NOW
- No bullet points. Pure prose. Under 60 words total.
- Respond exclusively in ${langName}.`;
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
        generationConfig: { maxOutputTokens: 150, temperature: 0.85 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// ── OpenAI-compatible ─────────────────────────────────────────────────────────
async function callOpenAICompat(
  prompt: string, model: string, apiKey: string, baseUrl: string
): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.85,
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
      max_tokens: 150,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

// ── Provider router ───────────────────────────────────────────────────────────
async function getSummary(prompt: string): Promise<string> {
  const provider = Deno.env.get("AI_PROVIDER") || "gemini";
  const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("GEMINI_API_KEY") || "";
  if (!apiKey) throw new Error("No API key. Add AI_API_KEY or GEMINI_API_KEY in Supabase secrets.");

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
      const baseUrl = Deno.env.get("AI_BASE_URL");
      const model = Deno.env.get("AI_MODEL");
      if (!baseUrl) throw new Error("openai-compatible requires AI_BASE_URL.");
      if (!model) throw new Error("openai-compatible requires AI_MODEL.");
      return callOpenAICompat(prompt, model, apiKey, baseUrl);
    }
    default:
      throw new Error(`Unknown AI_PROVIDER: "${provider}".`);
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { expressions, regionScores, moodValue, dominantExpression, confidence, lang } =
      await req.json();

    const prompt = buildPrompt(
      expressions,
      regionScores,
      moodValue ?? 3,
      dominantExpression ?? "neutral",
      confidence ?? 50,
      lang || "en"
    );

    const summary = await getSummary(prompt);

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("ai-face-summary error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", summary: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

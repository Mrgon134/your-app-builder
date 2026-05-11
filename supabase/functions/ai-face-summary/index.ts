import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, unauthorized } from "../_shared/function-auth.ts";
import { callChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── Provider config (same as ai-insight) ────────────────────────────────────
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

async function getSummary(prompt: string): Promise<string> {
  return callChatWithGroqFallback({
    label: "ai-face-summary",
    maxTokens: 150,
    temperature: 0.85,
    messages: [{ role: "user", content: prompt }],
  });
}

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { expressions, regionScores, moodValue, dominantExpression, confidence, lang } =
      await req.json();
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();

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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { callChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

interface VisionImage {
  data: string;
  mimeType: string;
}

interface FaceSummaryBody {
  expressions?: Partial<ExpressionData>;
  regionScores?: Partial<RegionScores>;
  moodValue?: number;
  dominantExpression?: string;
  confidence?: number;
  lang?: string;
  imageBase64?: string;
  imageMimeType?: string;
  journalText?: string;
}

const moodLabels: Record<number, string> = {
  1: "Rough",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

const langNames: Record<string, string> = {
  en: "English",
  id: "Indonesian (Bahasa Indonesia)",
  es: "Spanish",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  hi: "Hindi",
  ar: "Arabic",
  fr: "French",
  de: "German (Deutsch)",
  ms: "Malay (Bahasa Melayu)",
  th: "Thai",
  vi: "Vietnamese",
  fil: "Filipino",
};

const defaultExpressions: ExpressionData = {
  happy: 0.2,
  sad: 0.08,
  angry: 0.03,
  fearful: 0.04,
  disgusted: 0.02,
  surprised: 0.08,
  neutral: 0.55,
};

const defaultRegions: RegionScores = {
  eyes: 6,
  eyebrows: 6,
  cheeks: 5,
  forehead: 6,
  chin: 6,
  aura: 6,
};

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === "number" && Number.isFinite(value) ? value : fallback;
  return Math.max(min, Math.min(max, n));
}

function normalizeExpressions(value?: Partial<ExpressionData>): ExpressionData {
  return {
    happy: clampNumber(value?.happy, defaultExpressions.happy, 0, 1),
    sad: clampNumber(value?.sad, defaultExpressions.sad, 0, 1),
    angry: clampNumber(value?.angry, defaultExpressions.angry, 0, 1),
    fearful: clampNumber(value?.fearful, defaultExpressions.fearful, 0, 1),
    disgusted: clampNumber(value?.disgusted, defaultExpressions.disgusted, 0, 1),
    surprised: clampNumber(value?.surprised, defaultExpressions.surprised, 0, 1),
    neutral: clampNumber(value?.neutral, defaultExpressions.neutral, 0, 1),
  };
}

function normalizeRegions(value?: Partial<RegionScores>): RegionScores {
  return {
    eyes: clampNumber(value?.eyes, defaultRegions.eyes, 0, 10),
    eyebrows: clampNumber(value?.eyebrows, defaultRegions.eyebrows, 0, 10),
    cheeks: clampNumber(value?.cheeks, defaultRegions.cheeks, 0, 10),
    forehead: clampNumber(value?.forehead, defaultRegions.forehead, 0, 10),
    chin: clampNumber(value?.chin, defaultRegions.chin, 0, 10),
    aura: clampNumber(value?.aura, defaultRegions.aura, 0, 10),
  };
}

function normalizeImage(body: FaceSummaryBody): VisionImage | undefined {
  const raw = body.imageBase64?.trim();
  if (!raw) return undefined;

  const data = raw
    .replace(/^data:image\/[a-z0-9.+-]+;base64,/i, "")
    .replace(/\s/g, "");

  if (!data || data.length > 18_000_000) return undefined;

  const requestedMime = body.imageMimeType?.trim().toLowerCase() || "image/jpeg";
  const mimeType = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(requestedMime)
    ? requestedMime
    : "image/jpeg";

  return { data, mimeType };
}

function buildPrompt(
  expressions: ExpressionData,
  regionScores: RegionScores,
  moodValue: number,
  dominantExpression: string,
  confidence: number,
  lang: string,
  hasImage: boolean,
  journalText?: string,
): string {
  const langName = langNames[lang] || "English";
  const moodLabel = moodLabels[moodValue] || "Okay";
  const expressionLines = Object.entries(expressions)
    .filter(([, v]) => v > 0.05)
    .sort(([, a], [, b]) => b - a)
    .map(([k, v]) => `${k} ${Math.round(v * 100)}%`)
    .join(", ");
  const excerpt = journalText?.trim()
    ? `\nJournal excerpt for context only: "${journalText.trim().slice(0, 260)}"`
    : "";

  const imageInstruction = hasImage
    ? "A selfie image is attached and available to the vision model. First inspect the actual image. Use only visible, non-sensitive cues like eyes, mouth, facial tension, head angle, posture, lighting, framing, and softness. Do not identify the person, infer age/race/gender, diagnose health, or claim certainty."
    : "No image is available to this model. Be honest: use the mood and lightweight expression profile only, and do not claim you saw the selfie.";
  const endingInstruction = hasImage
    ? "Mirror one concrete visible cue from the selfie in natural language. Avoid generic lines like \"I see a calm expression\" unless you name the specific cue that made it feel that way. Give one gentle emotional interpretation with uncertainty (\"maybe\", \"feels like\", \"if that fits\"). End with a soft invitation to keep writing."
    : "Give one gentle emotional interpretation with uncertainty (\"maybe\", \"feels like\", \"if that fits\"). End with a soft invitation to keep writing.";

  return `CRITICAL: Respond ONLY in ${langName}. Write 2 short sentences, under 55 words total. No bullets.

You are Ju, the Nuju journal companion. ${imageInstruction}

Mood selected after writing: ${moodLabel} (${moodValue}/5)
Expression profile fallback: dominant ${dominantExpression} at ${confidence}% confidence; blend ${expressionLines || "neutral"}.
Region fallback scores (0-10): eyes ${regionScores.eyes}, eyebrows ${regionScores.eyebrows}, cheeks ${regionScores.cheeks}, forehead ${regionScores.forehead}, chin ${regionScores.chin}, overall energy ${regionScores.aura}.${excerpt}

Write like a trusted friend, not a clinician. ${endingInstruction}`;
}

async function callOpenRouterVision(prompt: string, image: VisionImage): Promise<string> {
  const apiKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("SELFIE_OPENROUTER_API_KEY") || "";
  if (!apiKey) throw new Error("No OpenRouter API key. Add OPENROUTER_API_KEY in Supabase secrets.");

  const model = Deno.env.get("OPENROUTER_SELFIE_MODEL") || "google/gemini-2.5-flash";
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://nuju.app",
      "X-Title": "Nuju",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:${image.mimeType};base64,${image.data}` } },
          ],
        },
      ],
      max_tokens: 150,
      temperature: 0.65,
    }),
  });

  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function callGroq(prompt: string): Promise<string> {
  return callChatWithGroqFallback({
    label: "ai-face-summary",
    maxTokens: 150,
    temperature: 0.75,
    messages: [{ role: "user", content: prompt }],
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as FaceSummaryBody;
    const expressions = normalizeExpressions(body.expressions);
    const regionScores = normalizeRegions(body.regionScores);
    const moodValue = Math.round(clampNumber(body.moodValue, 3, 1, 5));
    const confidence = Math.round(clampNumber(body.confidence, 50, 0, 100));
    const dominantExpression = body.dominantExpression?.trim() || "neutral";
    const lang = body.lang?.trim() || "en";
    const image = normalizeImage(body);

    let summary: string;
    if (image) {
      const visionPrompt = buildPrompt(
        expressions,
        regionScores,
        moodValue,
        dominantExpression,
        confidence,
        lang,
        true,
        body.journalText,
      );

      try {
        summary = await callOpenRouterVision(visionPrompt, image);
      } catch (error) {
        console.warn("ai-face-summary OpenRouter vision attempt failed; retrying Groq text-only:", error);
        const fallbackPrompt = buildPrompt(
          expressions,
          regionScores,
          moodValue,
          dominantExpression,
          confidence,
          lang,
          false,
          body.journalText,
        );
        summary = await callGroq(fallbackPrompt);
      }
    } else {
      const prompt = buildPrompt(
        expressions,
        regionScores,
        moodValue,
        dominantExpression,
        confidence,
        lang,
        false,
        body.journalText,
      );
      summary = await callGroq(prompt);
    }

    return new Response(
      JSON.stringify({ summary }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("ai-face-summary error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", summary: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

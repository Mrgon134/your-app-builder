import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { callChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface WeeklyAdviceBody {
  theme?: string;
  name?: string;
  avgMood?: number;
  highCount?: number;
  lowCount?: number;
  entryCount?: number;
  delta?: number;
  lang?: string;
  /** Optional: the already-generated weekly summary for extra context */
  weeklySummary?: string;
}

interface WeeklyAdviceAction {
  icon: string;
  title: string;
  body: string;
}

interface WeeklyAdviceResponse {
  headline: string;
  insight: string;
  actions: WeeklyAdviceAction[];
  focus: string;
}

const langNames: Record<string, string> = {
  en: "English",
  id: "Indonesian (Bahasa Indonesia)",
  es: "Spanish",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese (Simplified Mandarin)",
  hi: "Hindi",
  ar: "Arabic",
  fr: "French",
  de: "German",
  ms: "Malay",
  th: "Thai",
  vi: "Vietnamese",
  fil: "Filipino",
};

const cjkLanguages = new Set(["ja", "ko", "zh", "th"]);

function buildSystemPrompt(lang: string): string {
  const langName = langNames[lang] || "English";
  const isCJK = cjkLanguages.has(lang);
  return [
    `You are Ju, a wise, warm journal companion in the Nuju app.`,
    `CRITICAL LANGUAGE RULE: You MUST write your entire response in ${langName}.`,
    `Every word, every sentence, every JSON value must be in ${langName}. Zero English in the output.`,
    isCJK
      ? `For ${langName}: Use ONLY native ${langName} script characters. ABSOLUTELY NO Latin letters, no English words, no romanji/romanization anywhere in the JSON values. If you output any English or Latin characters, you have FAILED. Write as a native ${langName} speaker — use proper ${langName} grammar, particles, and natural phrasing.`
      : `Write naturally and fluently as a native ${langName} speaker would. No English words.`,
    `You must output a valid JSON object with the requested structure.`,
  ]
    .filter(Boolean)
    .join(" ");
}

function buildUserPrompt(body: WeeklyAdviceBody): string {
  const lang = body.lang || "en";

  const theme = body.theme || "building";
  const name = body.name || "";
  const avg = (body.avgMood ?? 3).toFixed(1);
  const high = body.highCount ?? 0;
  const low = body.lowCount ?? 0;
  const count = body.entryCount ?? 0;
  const delta = (body.delta ?? 0).toFixed(2);

  const themeDescriptions: Record<string, string> = {
    lifting:
      "mood is lifting — recent entries are noticeably better than earlier ones. The user is on an upswing.",
    heavy:
      "mood is heavy — recent entries are lower, the week has been tough. The user needs gentleness.",
    bright:
      "mood is bright — consistently high mood, many good days. The user is in a positive stretch.",
    steady:
      "mood is steady — mood has been consistent, neither up nor down. The user is in a stable rhythm.",
    building:
      "the user is still building their journaling habit — early days, forming consistency.",
  };

  const themeDesc = themeDescriptions[theme] || themeDescriptions.building;

  const summaryCtx = body.weeklySummary?.trim()
    ? `\nWeekly summary context: "${body.weeklySummary.trim().slice(0, 400)}"`
    : "";

  return [
    `The user's name is ${name || "(unknown)"}.`,
    `This week's data:`,
    `- Theme: ${themeDesc}`,
    `- Average mood: ${avg}/5 across ${count} entries`,
    `- High-mood entries: ${high}, Low-mood entries: ${low}`,
    `- Recent vs earlier mood delta: ${delta}`,
    summaryCtx,
    ``,
    `Generate a weekly advice card as a JSON object. The advice should feel personal, kind, and actionable — never clinical.`,
    ``,
    `Return ONLY valid JSON (no markdown before or after) with this structure:`,
    `{`,
    `  "headline": "A short 6-10 word headline acknowledging the user's week (use their name if provided)",`,
    `  "insight": "A warm, opinionated advice paragraph (3-5 sentences) about what the user should protect, try, or reflect on for the coming week. Be specific to their theme. Never generic.",`,
    `  "actions": [`,
    `    { "icon": "SF Symbol name", "title": "short action title (3-5 words)", "body": "1-2 sentence actionable description" },`,
    `    { "icon": "SF Symbol name", "title": "short action title (3-5 words)", "body": "1-2 sentence actionable description" },`,
    `    { "icon": "SF Symbol name", "title": "short action title (3-5 words)", "body": "1-2 sentence actionable description" }`,
    `  ],`,
    `  "focus": "A single-sentence focus intention for next week (under 15 words)"`,
    `}`,
    `SF Symbol icon suggestions (pick from these or similar):`,
    `- Lifting: arrow.up.right.circle.fill, sparkles, sun.max.fill`,
    `- Heavy: wind, cloud.rain.fill, hand.raised.fill`,
    `- Bright: sparkles, star.fill, heart.fill`,
    `- Steady: circle.grid.cross, waveform.path, leaf.fill`,
    `- Building: calendar.badge.plus, hammer.fill, figure.walk`,
    ``,
    `Make sure all JSON strings are properly escaped. Return ONLY the JSON object — no markdown fences, no explanation.`,
  ].join("\n");
}

function extractJSON(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return text;
}

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as WeeklyAdviceBody;
    const lang = (body.lang || "en").trim().toLowerCase();
    const isCJK = cjkLanguages.has(lang);

    const systemPrompt = buildSystemPrompt(lang);
    const userPrompt = buildUserPrompt(body);

    const raw = await callChatWithGroqFallback({
      label: "ai-weekly-advice",
      maxTokens: isCJK ? 1200 : 600,
      temperature: isCJK ? 0.4 : 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const json = extractJSON(raw);

    let parsed: WeeklyAdviceResponse;
    try {
      parsed = JSON.parse(json) as WeeklyAdviceResponse;
    } catch {
      console.warn("ai-weekly-advice JSON parse failed, raw:", raw.slice(0, 300));
      return new Response(
        JSON.stringify({
          headline: "",
          insight: "",
          actions: [],
          focus: "",
          _fallback: true,
          _raw: raw.slice(0, 200),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        headline: (parsed.headline || "").trim(),
        insight: (parsed.insight || "").trim(),
        actions: (parsed.actions || []).slice(0, 3).map((a) => ({
          icon: (a.icon || "sparkles").trim(),
          title: (a.title || "").trim(),
          body: (a.body || "").trim(),
        })),
        focus: (parsed.focus || "").trim(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("ai-weekly-advice error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
        headline: null,
        insight: null,
        actions: [],
        focus: null,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, hasPaidAccessForRequest, paymentRequired, unauthorized } from "../_shared/function-auth.ts";
import { callChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function getSummary(prompt: string, system: string): Promise<string> {
  return callChatWithGroqFallback({
    label: "ai-weekly-summary",
    maxTokens: 300,
    temperature: 0.7,
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { entries, lang } = await req.json();
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();
    if (!(await hasPaidAccessForRequest(req, user.id, "plus"))) {
      return paymentRequired("Upgrade to unlock weekly AI summaries.");
    }

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

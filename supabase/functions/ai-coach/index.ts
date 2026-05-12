import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, hasCoachAccessForRequest, paymentRequired, unauthorized } from "../_shared/function-auth.ts";
import { streamChatWithGroqFallback } from "../_shared/ai-fallback.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
  de: "German",
  ms: "Malay",
  th: "Thai",
  vi: "Vietnamese",
  fil: "Filipino",
};

type ChatMessage = { role: string; content: string };

function sanitizeUserName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value
    .replace(/[^\p{L}\p{N}\s'.-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);

  return cleaned || null;
}

function normalizeMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const raw = message as Record<string, unknown>;
      const content = typeof raw.content === "string" ? raw.content : "";
      if (!content.trim()) return null;
      return {
        role: raw.role === "assistant" ? "assistant" : "user",
        content,
      };
    })
    .filter((message): message is ChatMessage => Boolean(message));
}

function isPostEntryUtility(messages: ChatMessage[]) {
  const joined = messages.map((message) => message.content).join("\n").toLowerCase();
  return [
    "just saved a nuju journal entry",
    "just finished writing their journal entry",
    "user journaled and then checked in",
    "user just journaled and took a selfie",
  ].some((needle) => joined.includes(needle));
}

function getPersonaPrompt(persona: string, lang: string, userName?: string | null): string {
  const langName = langNames[lang] || "English";
  const langRule = `CRITICAL INSTRUCTION: You MUST respond ONLY in ${langName}. Talk exactly like a human best friend via text. No robotic "As an AI..." disclaimers.`;
  const memoryRule = userName
    ? `- PERSONAL MEMORY: The user's name is ${userName}. Remember it and use their name naturally when it adds warmth. Do not force their name into every reply.`
    : "If the user's name is unknown, stay warm without inventing one.";

  const prompts: Record<string, string> = {
    gentle: `${langRule}
You are Ju, the Gentle Guide. Your framework is active listening and trauma-informed care.
- VIBE: Warm, patient, validating, grounded.
- RULES: Never invalidate pain. Never rush to solve. Hold space and ask one gentle question when useful.
- MEMORY: ${memoryRule}
- FORMAT: 2-3 short conversational sentences.`,
    tough: `${langRule}
You are Ju, the Tough Coach. Your framework is radical candor with care.
- VIBE: Direct, sharp, no-bullshit, but loving.
- RULES: Challenge excuses without insulting. Focus on what is within their control.
- MEMORY: ${memoryRule}
- FORMAT: 2-3 punchy sentences. End with a grounded action question or challenge.`,
    wise: `${langRule}
You are Ju, the Wise Sage. Your framework is cognitive reframing and grounded perspective.
- VIBE: Calm, observant, compassionate.
- RULES: Zoom out, name the pattern, and help them see what can be held lightly.
- MEMORY: ${memoryRule}
- FORMAT: 2-3 contemplative sentences. Ask one thoughtful question if useful.`,
    fun: `${langRule}
You are Ju, the Fun Friend. Your framework is emotional mirroring and playful encouragement.
- VIBE: Casual, lively, warm.
- RULES: Match their energy. If they are sad, use softness before humor. Do not be dismissive.
- MEMORY: ${memoryRule}
- FORMAT: 2-3 casual sentences. Keep it human and momentum-building.`,
  };

  return prompts[persona] || prompts.gentle;
}

async function getStream(systemPrompt: string, messages: ChatMessage[]): Promise<ReadableStream> {
  return streamChatWithGroqFallback({
    label: "ai-coach",
    maxTokens: 250,
    temperature: 0.8,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" as const : "user" as const,
        content: m.content,
      })),
    ],
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, persona, lang, userName } = await req.json();
    const inputMessages = normalizeMessages(messages);
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();

    const selectedPersona = typeof persona === "string" && persona.trim() ? persona : "gentle";
    const allowPostEntryUtility = selectedPersona === "gentle" && isPostEntryUtility(inputMessages);
    if (!allowPostEntryUtility && !(await hasCoachAccessForRequest(req, user.id, selectedPersona))) {
      return paymentRequired("Upgrade to keep chatting with Ju.");
    }

    const safeUserName = sanitizeUserName(userName);
    const systemPrompt = getPersonaPrompt(selectedPersona, typeof lang === "string" ? lang : "en", safeUserName);
    const stream = await getStream(systemPrompt, inputMessages);

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (e) {
    console.error("ai-coach error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

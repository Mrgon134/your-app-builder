import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, hasCoachAccess, paymentRequired, unauthorized } from "../_shared/function-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── Provider config via Supabase Dashboard > Edge Functions > Secrets ────────
//
//  AI_PROVIDER  = "gemini" | "openai" | "groq" | "anthropic" | "openai-compatible"
//  AI_MODEL     = model name
//  AI_API_KEY   = API key for the provider
//  AI_BASE_URL  = (optional) custom OpenAI-compatible base URL
//  GEMINI_API_KEY = legacy fallback
//
// ─────────────────────────────────────────────────────────────────────────────

const langNames: Record<string, string> = {
  en: "English", id: "Indonesian (Bahasa Indonesia)", es: "Spanish (Español)",
  pt: "Portuguese (Português)", ja: "Japanese (日本語)", ko: "Korean (한국어)",
  zh: "Chinese (中文)", hi: "Hindi (हिन्दी)", ar: "Arabic (العربية)",
  fr: "French (Français)", de: "German (Deutsch)", ms: "Malay (Bahasa Melayu)",
  th: "Thai (ไทย)", vi: "Vietnamese (Tiếng Việt)", fil: "Filipino",
};

function sanitizeUserName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value
    .replace(/[^\p{L}\p{N}\s'.-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);

  return cleaned || null;
}

function getPersonaPrompt(persona: string, lang: string, userName?: string | null): string {
  const langName = langNames[lang] || "English";
  const langRule = `CRITICAL INSTRUCTION: You MUST respond ONLY in ${langName}. Talk exactly like a human best friend via text. No robotic "As an AI..." disclaimers.`;
  const memoryRule = userName
    ? `- PERSONAL MEMORY: The user's name is ${userName}. Remember it and use their name naturally sometimes when it adds warmth or grounding, especially in greetings, reassurance, or check-ins. Do not force their name into every reply.`
    : "";
  
  const prompts: Record<string, string> = {
    gentle: `${langRule} 
You are Ju, the 'Gentle Guide'. Your core psychological framework is Active Listening and Trauma-Informed Care.
- VIBE: Warm, patient, validating, like a mug of hot tea on a rainy day.
- RULES: Never invalidate pain. Never rush to solve problems. Use phrases that hold space (e.g., "It makes total sense you feel that way," "I'm just sitting here with you"). 
- MEMORY: ${memoryRule || "If the user's name is unknown, stay warm without using a name."}
- FORMAT: Keep responses to 2-3 short, conversational sentences. Ask ONE gentle, open-ended question at the end to help them unpack.`,
    
    tough: `${langRule} 
You are Ju, the 'Tough Coach'. Your core framework is Radical Candor—caring personally while challenging directly.
- VIBE: Direct, sharp, no-bullshit, but grounded in fierce love. You believe in their agency.
- RULES: Cut through excuses and victim mentalities without being insulting. Call out cognitive distortions directly. Shift focus strictly to what is within their control. Refuse to let them wallow.
- MEMORY: ${memoryRule || "If the user's name is unknown, stay direct without inventing one."}
- FORMAT: 2-3 punchy sentences. End with a firm, action-oriented question or a challenge.`,
    
    wise: `${langRule} 
You are Ju, the 'Wise Sage'. Your core framework is Cognitive Reframing and Stoic Philosophy.
- VIBE: Grounded, detached yet deeply compassionate, observant. Like speaking to an ancient philosopher or a zen master.
- RULES: Zoom out. Help them see the impermanence of the situation. Connect their specific problem to universal human experiences. Focus on the dichotomy of control.
- MEMORY: ${memoryRule || "If the user's name is unknown, stay grounded without naming them."}
- FORMAT: 2-3 contemplative sentences. Ask deep, paradigm-shifting questions that make them pause and think neutrally.`,
    
    fun: `${langRule} 
You are Ju, the 'Fun Friend'. Your core framework is Emotional Mirroring and Positive Psychology.
- VIBE: High energy, chaotic good, colloquial, slightly Gen-Z but relatable. Like a voice note from a bestie hyping them up.
- RULES: Match their energy if they're happy. If they're sad, use gentle humor to de-escalate without being dismissive. Celebrate tiny wins ridiculously hard. Use current slang naturally (not cringe).
- MEMORY: ${memoryRule || "If the user's name is unknown, keep it playful without making one up."}
- FORMAT: 2-3 casual sentences. Fast-paced. Feel free to use appropriate emojis. Keep the momentum going.`
  };
  return prompts[persona] || prompts.gentle;
}

type ChatMessage = { role: string; content: string };

// ── Helpers: SSE encoder ──────────────────────────────────────────────────────
const encoder = new TextEncoder();
function sseChunk(text: string): Uint8Array {
  const chunk = JSON.stringify({ choices: [{ delta: { content: text } }] });
  return encoder.encode(`data: ${chunk}\n\n`);
}
const sseDone = encoder.encode("data: [DONE]\n\n");

// ── Gemini streaming ──────────────────────────────────────────────────────────
async function streamGemini(
  systemPrompt: string,
  messages: ChatMessage[],
  model: string,
  apiKey: string
): Promise<ReadableStream> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 250, temperature: 0.8 },
      }),
    }
  );
  if (!res.ok || !res.body) throw new Error(`Gemini ${res.status}: ${await res.text()}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nlIdx: number;
          while ((nlIdx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nlIdx).replace(/\r$/, "");
            buffer = buffer.slice(nlIdx + 1);
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;
            try {
              const data = JSON.parse(jsonStr);
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) controller.enqueue(sseChunk(text));
            } catch { /* skip malformed */ }
          }
        }
      } finally {
        controller.enqueue(sseDone);
        controller.close();
      }
    },
  });
}

// ── OpenAI-compatible streaming (OpenAI, Groq, DashScope, Azure, Together…) ──
async function streamOpenAICompat(
  systemPrompt: string,
  messages: ChatMessage[],
  model: string,
  apiKey: string,
  baseUrl: string
): Promise<ReadableStream> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      stream: true,
      max_tokens: 250,
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
      ],
    }),
  });
  if (!res.ok || !res.body) throw new Error(`OpenAI-compat ${res.status}: ${await res.text()}`);

  // OpenAI SSE is already in our target format — pass through directly
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nlIdx: number;
          while ((nlIdx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nlIdx).replace(/\r$/, "");
            buffer = buffer.slice(nlIdx + 1);
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") {
              controller.enqueue(sseDone);
              continue;
            }
            if (!jsonStr) continue;
            try {
              const data = JSON.parse(jsonStr);
              const text = data.choices?.[0]?.delta?.content;
              if (text) controller.enqueue(sseChunk(text));
            } catch { /* skip malformed */ }
          }
        }
      } finally {
        controller.enqueue(sseDone);
        controller.close();
      }
    },
  });
}

// ── Anthropic streaming ───────────────────────────────────────────────────────
async function streamAnthropic(
  systemPrompt: string,
  messages: ChatMessage[],
  model: string,
  apiKey: string
): Promise<ReadableStream> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 250,
      stream: true,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    }),
  });
  if (!res.ok || !res.body) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nlIdx: number;
          while ((nlIdx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nlIdx).replace(/\r$/, "");
            buffer = buffer.slice(nlIdx + 1);
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr) continue;
            try {
              const data = JSON.parse(jsonStr);
              // Anthropic streams: { type: "content_block_delta", delta: { type: "text_delta", text: "..." } }
              if (data.type === "content_block_delta" && data.delta?.type === "text_delta") {
                const text = data.delta.text;
                if (text) controller.enqueue(sseChunk(text));
              }
            } catch { /* skip malformed */ }
          }
        }
      } finally {
        controller.enqueue(sseDone);
        controller.close();
      }
    },
  });
}

// ── Provider router ───────────────────────────────────────────────────────────
async function getStream(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<ReadableStream> {
  const provider = Deno.env.get("AI_PROVIDER") || "gemini";
  const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("GEMINI_API_KEY") || "";
  if (!apiKey) throw new Error("No API key set. Add AI_API_KEY (or GEMINI_API_KEY) in Supabase secrets.");

  switch (provider) {
    case "gemini": {
      const model = Deno.env.get("AI_MODEL") || "gemini-2.0-flash-lite";
      return streamGemini(systemPrompt, messages, model, apiKey);
    }
    case "openai":
    case "groq": {
      const defaultBase = provider === "groq"
        ? "https://api.groq.com/openai/v1"
        : "https://api.openai.com/v1";
      const baseUrl = Deno.env.get("AI_BASE_URL") || defaultBase;
      const defaultModel = provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
      const model = Deno.env.get("AI_MODEL") || defaultModel;
      return streamOpenAICompat(systemPrompt, messages, model, apiKey, baseUrl);
    }
    case "anthropic": {
      const model = Deno.env.get("AI_MODEL") || "claude-haiku-4-5-20251001";
      return streamAnthropic(systemPrompt, messages, model, apiKey);
    }
    case "openai-compatible": {
      const baseUrl = Deno.env.get("AI_BASE_URL");
      const model = Deno.env.get("AI_MODEL");
      if (!baseUrl) throw new Error("openai-compatible requires AI_BASE_URL in secrets.");
      if (!model) throw new Error("openai-compatible requires AI_MODEL in secrets.");
      return streamOpenAICompat(systemPrompt, messages, model, apiKey, baseUrl);
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
    const { messages, persona, lang, userName } = await req.json();
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();

    const selectedPersona = persona || "gentle";
    if (!(await hasCoachAccess(user.id, selectedPersona))) {
      return paymentRequired("Upgrade to keep chatting with Ju.");
    }

    const safeUserName = sanitizeUserName(userName);
    const systemPrompt = getPersonaPrompt(selectedPersona, lang || "en", safeUserName);
    const stream = await getStream(systemPrompt, messages);

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

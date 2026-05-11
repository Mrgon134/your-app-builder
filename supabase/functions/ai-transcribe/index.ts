import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAuthenticatedUser, hasPaidAccess, paymentRequired, unauthorized } from "../_shared/function-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GroqTranscriptionSegment {
  start?: number;
  end?: number;
  text?: string;
}

interface GroqTranscriptionResponse {
  text?: string;
  segments?: GroqTranscriptionSegment[];
}

interface OpenRouterTranscriptionResponse {
  text?: string;
}

// ─── Transcription config ─────────────────────────────────────────────────────
//
//  GROQ_API_KEY     = Groq API key (free at console.groq.com)
//                     → Uses whisper-large-v3, auto-detects language
//                     → Primary provider (fast, accurate, global)
//
//  OPENROUTER_API_KEY = OpenRouter API key (fallback)
//                     → Uses openai/gpt-4o-transcribe by default
//                     → Auto-detects language from audio
//
//  Priority: GROQ_API_KEY → OPENROUTER_API_KEY → error
//
// ─────────────────────────────────────────────────────────────────────────────

/** Groq Whisper large-v3 — auto language detection, with timestamps */
async function transcribeGroq(audioBase64: string, mimeType: string, apiKey: string): Promise<{ transcript: string; segments: { start: number; end: number; text: string }[] }> {
  // Decode base64 → binary
  const audioBytes = Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0));

  // Determine file extension from mimeType
  const ext = mimeType.includes("webm")
    ? "webm"
    : mimeType.includes("ogg")
    ? "ogg"
    : mimeType.includes("mp4")
    ? "mp4"
    : mimeType.includes("wav")
    ? "wav"
    : "webm";

  const form = new FormData();
  form.append("file", new Blob([audioBytes], { type: mimeType }), `audio.${ext}`);
  form.append("model", "whisper-large-v3");
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "segment");
  // No "language" param → Groq auto-detects → works for all global users

  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq transcription failed ${res.status}: ${err}`);
  }

  const data = (await res.json()) as GroqTranscriptionResponse;
  const transcript = (data.text || "").trim();
  const segments = (data.segments || []).map((s) => ({
    start: s.start ?? 0,
    end: s.end ?? 0,
    text: (s.text || "").trim(),
  }));

  return { transcript, segments };
}

/** OpenRouter transcription fallback. */
function formatFromMimeType(mimeType: string): string {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("wav")) return "wav";
  if (mimeType.includes("mpeg")) return "mp3";
  if (mimeType.includes("mp3")) return "mp3";
  if (mimeType.includes("mp4")) return "m4a";
  return "m4a";
}

async function transcribeOpenRouter(
  audioBase64: string,
  mimeType: string,
  apiKey: string,
): Promise<{ transcript: string; segments: { start: number; end: number; text: string }[] }> {
  const model = Deno.env.get("OPENROUTER_TRANSCRIBE_MODEL") || "openai/gpt-4o-transcribe";
  const res = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": Deno.env.get("OPENROUTER_APP_URL") || "https://nuju.app",
      "X-Title": Deno.env.get("OPENROUTER_APP_TITLE") || "Nuju",
    },
    body: JSON.stringify({
      input_audio: {
        data: audioBase64,
        format: formatFromMimeType(mimeType),
      },
      model,
      temperature: 0,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter transcription failed ${res.status}: ${err}`);
  }

  const data = (await res.json()) as OpenRouterTranscriptionResponse;
  return { transcript: (data.text || "").trim(), segments: [] };
}

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { audioBase64, mimeType } = await req.json();
    const user = await getAuthenticatedUser(req);
    if (!user) return unauthorized();
    if (!(await hasPaidAccess(user.id, "pro"))) {
      return paymentRequired("Upgrade to unlock voice journaling.");
    }

    if (!audioBase64 || !mimeType) {
      return new Response(
        JSON.stringify({ error: "Missing audioBase64 or mimeType" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const groqKey = Deno.env.get("GROQ_API_KEY");
    const openRouterKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("AI_FALLBACK_API_KEY");

    let transcript = "";
    let segments: { start: number; end: number; text: string }[] = [];

    if (groqKey) {
      try {
        const result = await transcribeGroq(audioBase64, mimeType, groqKey);
        transcript = result.transcript;
        segments = result.segments;
      } catch (error) {
        if (!openRouterKey) throw error;
        console.warn("Groq transcription failed, falling back to OpenRouter:", error);
        const result = await transcribeOpenRouter(audioBase64, mimeType, openRouterKey);
        transcript = result.transcript;
        segments = result.segments;
      }
    } else if (openRouterKey) {
      const result = await transcribeOpenRouter(audioBase64, mimeType, openRouterKey);
      transcript = result.transcript;
      segments = result.segments;
    } else {
      return new Response(
        JSON.stringify({ error: "No transcription API key set. Add GROQ_API_KEY and OPENROUTER_API_KEY in Supabase secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!transcript && openRouterKey) {
      console.warn("Groq transcription returned empty text, retrying with OpenRouter.");
      const result = await transcribeOpenRouter(audioBase64, mimeType, openRouterKey);
      transcript = result.transcript;
      segments = result.segments;
    }

    return new Response(
      JSON.stringify({ transcript, segments }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("ai-transcribe error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error", transcript: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

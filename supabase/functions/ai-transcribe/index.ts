import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── Transcription config ─────────────────────────────────────────────────────
//
//  GROQ_API_KEY     = Groq API key (free at console.groq.com)
//                     → Uses whisper-large-v3, auto-detects language
//                     → Primary provider (fast, accurate, global)
//
//  GEMINI_API_KEY   = Google Gemini API key (fallback)
//                     → Uses gemini-1.5-flash multimodal audio input
//                     → Auto-detects language from audio
//
//  Priority: GROQ_API_KEY → GEMINI_API_KEY → error
//
// ─────────────────────────────────────────────────────────────────────────────

/** Groq Whisper large-v3 — auto language detection */
async function transcribeGroq(audioBase64: string, mimeType: string, apiKey: string): Promise<string> {
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
  form.append("response_format", "text");
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

  // response_format=text returns plain text directly
  const transcript = await res.text();
  return transcript.trim();
}

/** Gemini 1.5 Flash — multimodal audio, auto language detection (fallback) */
async function transcribeGemini(audioBase64: string, mimeType: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inlineData: { mimeType, data: audioBase64 } },
              {
                text: "Transcribe this audio exactly as spoken. Return ONLY the transcript text, in the same language as the audio. Do not add any explanation, labels, or formatting.",
              },
            ],
          },
        ],
        generationConfig: { temperature: 0, maxOutputTokens: 1000 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini transcription failed ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return text.trim();
}

// ── Handler ───────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { audioBase64, mimeType } = await req.json();

    if (!audioBase64 || !mimeType) {
      return new Response(
        JSON.stringify({ error: "Missing audioBase64 or mimeType" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const groqKey = Deno.env.get("GROQ_API_KEY");
    const geminiKey = Deno.env.get("GEMINI_API_KEY");

    let transcript = "";

    if (groqKey) {
      // Primary: Groq Whisper (free, fastest, best multilingual accuracy)
      transcript = await transcribeGroq(audioBase64, mimeType, groqKey);
    } else if (geminiKey) {
      // Fallback: Gemini 1.5 Flash multimodal
      transcript = await transcribeGemini(audioBase64, mimeType, geminiKey);
    } else {
      return new Response(
        JSON.stringify({ error: "No transcription API key set. Add GROQ_API_KEY or GEMINI_API_KEY in Supabase secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ transcript }),
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

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type OnboardingAnswers = {
  source?: string;
  goal?: string | null;
  struggles?: string[];
  consistency?: string | null;
  hardestMoment?: string | null;
  blocker?: string | null;
  focus?: string | null;
  name?: string;
  email?: string;
  unseenWish?: string | null;
  cost?: string | null;
  style?: string | null;
  resonance?: string[];
  baseline?: string | null;
  relief?: string | null;
  selectedPlan?: string | null;
};

type ResultTeaser = {
  headline: string;
  stateLabel: string;
  mirror: string;
  whyItFits: string;
  firstSupportMove: string;
  supportSignals: string[];
  continuationLine: string;
};

const MAX_REQUEST_BYTES = 25_000;

const safeText = (value: unknown, fallback = "") => {
  if (typeof value !== "string") return fallback;
  return value.replace(/\s+/g, " ").trim();
};

const safeArray = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);

const sanitizeName = (value: unknown) =>
  safeText(value)
    .replace(/[^\p{L}\p{N}\s'.-]/gu, "")
    .slice(0, 40);

const labelFromValue = (value: string | null | undefined, dictionary: Record<string, string>) =>
  value && dictionary[value] ? dictionary[value] : value || "";

const dictionaries = {
  goal: {
    overwhelmed: "everything feels like too much",
    unseen: "wanting to feel understood",
    disconnected: "feeling far from yourself",
    spiraling: "thoughts spiraling fast",
  },
  consistency: {
    rarely: "it hits hard sometimes",
    sometimes: "it comes and goes",
    often: "it happens often",
  },
  hardestMoment: {
    late_night: "late at night",
    after_conflict: "after conflict",
    while_busy: "while trying to keep functioning",
    when_alone: "when left alone with your thoughts",
  },
  blocker: {
    burden: "not wanting to burden people",
    words: "not finding the words in time",
    functioning: "staying functional no matter what",
    privacy: "needing privacy before you can be honest",
  },
  focus: {
    name_it: "help naming what you feel",
    calm_me: "help calming the emotional noise",
    stay_with_me: "gentle emotional company",
    show_pattern: "help seeing the pattern underneath this",
  },
  unseenWish: {
    notice_tired: "someone noticing how tired you are",
    see_pain: "someone seeing the pain under the surface",
    stay_without_fixing: "someone staying with you before trying to fix it",
    help_me_name_it: "someone helping you name what this really is",
  },
  cost: {
    sleep: "it steals softness from your sleep",
    relationships: "it affects how close you can feel to people",
    focus: "it takes up focus and mental space",
    self_trust: "it makes it harder to trust your own feelings",
  },
  style: {
    gentle: "soft and reassuring",
    direct: "clear and honest",
    private: "quiet and low-pressure",
    guided: "held with gentle structure",
  },
  baseline: {
    drained: "drained and stretched thin",
    holding: "holding a lot in",
    coping: "getting by but not fully settled",
    hopeful: "hopeful and ready for something steadier",
  },
  relief: {
    breathe: "breathe a little easier",
    softer: "feel softer toward yourself",
    clearer: "get clearer words for what is happening",
    less_alone: "feel less alone in the moment",
  },
};

const stripMarkdownFence = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed.startsWith("```")) return trimmed;
  return trimmed.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
};

const parseReveal = (raw: string): ResultTeaser => {
  const cleaned = stripMarkdownFence(raw);
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model did not return JSON");
  }

  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  if (
    typeof parsed?.headline !== "string" ||
    typeof parsed?.stateLabel !== "string" ||
    typeof parsed?.mirror !== "string" ||
    typeof parsed?.whyItFits !== "string" ||
    typeof parsed?.firstSupportMove !== "string" ||
    !Array.isArray(parsed?.supportSignals) ||
    typeof parsed?.continuationLine !== "string"
  ) {
    throw new Error("Reveal JSON missing required fields");
  }

  return {
    headline: parsed.headline.trim(),
    stateLabel: parsed.stateLabel.trim(),
    mirror: parsed.mirror.trim(),
    whyItFits: parsed.whyItFits.trim(),
    firstSupportMove: parsed.firstSupportMove.trim(),
    supportSignals: parsed.supportSignals
      .filter((item: unknown): item is string => typeof item === "string")
      .map((item: string) => item.trim())
      .filter(Boolean)
      .slice(0, 3),
    continuationLine: parsed.continuationLine.trim(),
  };
};

const bannedRevealPatterns = [
  /inner world/i,
  /journey/i,
  /safe space/i,
  /validated/i,
  /you're not alone/i,
  /you are not alone/i,
  /together we can/i,
  /as we move forward/i,
  /relief and clarity/i,
  /non-judgmental/i,
  /support that stays/i,
];

const revealNeedsPolish = (reveal: ResultTeaser) => {
  const lines = [
    reveal.headline,
    reveal.stateLabel,
    reveal.mirror,
    reveal.whyItFits,
    reveal.firstSupportMove,
    reveal.continuationLine,
    ...reveal.supportSignals,
  ];

  return bannedRevealPatterns.some((pattern) => lines.some((line) => pattern.test(line)));
};

const buildSupportSignals = (answers: OnboardingAnswers) => {
  const signals: string[] = [];

  switch (answers.hardestMoment) {
    case "late_night":
      signals.push("Late nights make the weight louder");
      break;
    case "after_conflict":
      signals.push("After conflict, the replay keeps running");
      break;
    case "while_busy":
      signals.push("You keep functioning while the weight keeps building");
      break;
    case "when_alone":
      signals.push("Being alone with it makes everything feel heavier");
      break;
  }

  switch (answers.blocker) {
    case "words":
      signals.push("The words disappear right when you need them");
      break;
    case "burden":
      signals.push("You hold a lot back so no one feels burdened");
      break;
    case "functioning":
      signals.push("You stay composed even when something inside is fraying");
      break;
    case "privacy":
      signals.push("You need privacy before the truest thing can come out");
      break;
  }

  switch (answers.relief) {
    case "clearer":
      signals.push("What you want first is clearer language for the weight");
      break;
    case "breathe":
      signals.push("What you want first is a little room to breathe");
      break;
    case "less_alone":
      signals.push("What you want first is to feel less alone in it");
      break;
    case "softer":
      signals.push("What you want first is to soften toward yourself");
      break;
  }

  while (signals.length < 3) {
    signals.push("You want something that gets the feeling before it grows louder");
  }

  return signals.slice(0, 3);
};

const buildConcreteFirstSupportMove = (answers: OnboardingAnswers) => {
  switch (answers.focus) {
    case "name_it":
      return "Ju would start by slowing the moment down just enough to catch the feeling before it blurs, then help you put real words around it.";
    case "calm_me":
      return "Ju would start by helping the noise come down first, because clear thinking is almost impossible while everything still feels this loud.";
    case "stay_with_me":
      return "Ju would start by staying close to the feeling without rushing it, so you do not have to carry the rawest part of it by yourself.";
    case "show_pattern":
      return answers.hardestMoment === "late_night"
        ? "Ju would start by tracing what keeps repeating in those late-night spirals, so the weight stops feeling random and impossible to name."
        : "Ju would start by tracing what keeps repeating underneath this, so the weight stops feeling random and starts making more sense.";
    default:
      return "Ju would start by helping you name what is heaviest first, so it stops staying trapped as one blurred feeling.";
  }
};

const buildConcreteContinuationLine = (answers: OnboardingAnswers) => {
  const name = sanitizeName(answers.name);
  const prefix = name ? `${name}, ` : "";

  switch (answers.hardestMoment) {
    case "late_night":
      return `${prefix}Ju can keep helping you catch those late-night spirals earlier, put words around them, and keep them from taking another quiet hour away from you.`;
    case "after_conflict":
      return `${prefix}Ju can keep helping you untangle what lingers after conflict, so it does not keep echoing long after the moment is over.`;
    case "while_busy":
      return `${prefix}Ju can keep helping you notice the weight while you are still moving, so you do not have to wait for a full collapse to be honest about it.`;
    case "when_alone":
      return `${prefix}Ju can keep helping you hold the weight when you are alone with it, so the feeling does not get bigger every time the room gets quieter.`;
    default:
      return `${prefix}Ju can keep helping you name the weight earlier and meet it more gently before it hardens into another day you just push through.`;
  }
};

const finalizeReveal = (reveal: ResultTeaser, answers: OnboardingAnswers): ResultTeaser => {
  const name = sanitizeName(answers.name);
  const normalizedHeadline = reveal.headline.trim();
  const headline = name && !normalizedHeadline.toLowerCase().includes(name.toLowerCase())
    ? `${name}, ${normalizedHeadline.charAt(0).toLowerCase()}${normalizedHeadline.slice(1)}`
    : normalizedHeadline;

  return {
    ...reveal,
    headline,
    firstSupportMove: buildConcreteFirstSupportMove(answers),
    supportSignals: buildSupportSignals(answers),
    continuationLine: buildConcreteContinuationLine(answers),
  };
};

const buildReadableContext = (answers: OnboardingAnswers) => {
  const name = sanitizeName(answers.name);

  return {
    name: name || "unknown",
    email: safeText(answers.email),
    source: safeText(answers.source, "landing"),
    goal: labelFromValue(answers.goal, dictionaries.goal),
    struggles: safeArray(answers.struggles),
    consistency: labelFromValue(answers.consistency, dictionaries.consistency),
    hardestMoment: labelFromValue(answers.hardestMoment, dictionaries.hardestMoment),
    blocker: labelFromValue(answers.blocker, dictionaries.blocker),
    focus: labelFromValue(answers.focus, dictionaries.focus),
    unseenWish: labelFromValue(answers.unseenWish, dictionaries.unseenWish),
    cost: labelFromValue(answers.cost, dictionaries.cost),
    style: labelFromValue(answers.style, dictionaries.style),
    baseline: labelFromValue(answers.baseline, dictionaries.baseline),
    relief: labelFromValue(answers.relief, dictionaries.relief),
    resonance: safeArray(answers.resonance),
  };
};

const buildPrompt = (answers: OnboardingAnswers) => {
  const readableContext = buildReadableContext(answers);

  return `You are Ju, an emotionally perceptive companion for Nuju.

Your job is to read this onboarding context and write a reveal that feels emotionally precise, intimate, and screen-recordable.

Important rules:
- Sound deeply human, warm, and emotionally intelligent.
- Do not sound clinical, diagnostic, salesy, or like marketing copy.
- Do not mention journaling, onboarding, conversion, product, funnel, pricing, features, or subscriptions.
- If the user's name is known, use it naturally in the headline or continuation line so Ju does not sound like it is talking to a stranger.
- The tone should feel like Ju quietly noticing something true about the user that lands in their chest.
- Be specific enough that it feels tailored to the answers.
- Never shame the user or imply they are broken.
- Avoid generic therapy language like "inner world", "journey", "safe space", "compassionate relationship with your own mind", or "support that stays with you".
- Avoid cliches like "you're not alone", "validation", "together we can", "explore this further", or "relief and clarity".
- Do not sound like a polished coach or wellness brand. Sound like Ju quietly naming the exact thing the user has been carrying.
- Do not use broad praise like "you are resilient", "you are stronger than you think", or "you have been doing your best".
- Let the reveal feel a little uncomfortably accurate in a good way, like Ju noticed the hidden part and said it out loud gently.
- Let the user's concrete answers lead the language. If they said late at night, struggling to find words, holding a lot in, or wanting someone to notice how tired they are, use that emotional texture.
- The reveal should feel a little disarming, like Ju just named the part they have been carrying quietly.
- Prefer plain, concrete language over polished therapy language.

Return JSON only, no markdown fences, with this exact shape:
{
  "headline": "string",
  "stateLabel": "string",
  "mirror": "string",
  "whyItFits": "string",
  "firstSupportMove": "string",
  "supportSignals": ["string", "string", "string"],
  "continuationLine": "string"
}

Field guidance:
- headline: 1 sentence, intimate, direct, strong emotional recognition, ideally 8-16 words
- stateLabel: 2-4 words, clear emotional label, human not clinical
- mirror: 1-2 sentences that feel eerily accurate and validating, with concrete emotional friction
- whyItFits: 2-3 sentences explaining why Ju noticed this, based on at least two specific answers
- firstSupportMove: 1-2 sentences on what Ju would help with first, immediate and grounded rather than abstract
- supportSignals: exactly 3 short lines, concrete and emotionally specific
- continuationLine: 1 sentence that makes continued support feel emotionally valuable, intimate and specific, with no cliches or promises

User context:
${JSON.stringify(readableContext, null, 2)}`;
};

const buildRevisionPrompt = (answers: OnboardingAnswers, reveal: ResultTeaser) => {
  const readableContext = buildReadableContext(answers);

  return `Rewrite this reveal to make it more emotionally precise, concrete, and human.

Important rules:
- Keep the exact same JSON shape.
- Remove any therapy cliches or polished filler.
- Do not use phrases like "safe space", "validated", "you're not alone", "together we can", "as we move forward", or "relief and clarity".
- Keep the language grounded in the user's actual answers.
- Make the mirror feel quietly devastating in a truthful way, not dramatic.
- Make the continuation line feel intimate and specific, not like a motivational speech.

User context:
${JSON.stringify(readableContext, null, 2)}

Current reveal JSON:
${JSON.stringify(reveal, null, 2)}`;
};

async function callGemini(prompt: string, model: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 600, temperature: 0.9 },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function callOpenAICompat(prompt: string, model: string, apiKey: string, baseUrl: string): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.9,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`OpenAI-compat ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

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
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

async function getReveal(prompt: string): Promise<string> {
  const provider = Deno.env.get("AI_PROVIDER") || "gemini";
  const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("GEMINI_API_KEY") || "";
  if (!apiKey) throw new Error("No AI key configured");

  switch (provider) {
    case "gemini": {
      const model = Deno.env.get("AI_MODEL") || "gemini-2.0-flash-lite";
      return callGemini(prompt, model, apiKey);
    }
    case "openai":
    case "groq": {
      const defaultBase = provider === "groq" ? "https://api.groq.com/openai/v1" : "https://api.openai.com/v1";
      const defaultModel = provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini";
      return callOpenAICompat(
        prompt,
        Deno.env.get("AI_MODEL") || defaultModel,
        apiKey,
        Deno.env.get("AI_BASE_URL") || defaultBase,
      );
    }
    case "anthropic": {
      const model = Deno.env.get("AI_MODEL") || "claude-haiku-4-5-20251001";
      return callAnthropic(prompt, model, apiKey);
    }
    case "openai-compatible": {
      const baseUrl = Deno.env.get("AI_BASE_URL");
      const model = Deno.env.get("AI_MODEL");
      if (!baseUrl || !model) throw new Error("AI_BASE_URL and AI_MODEL are required for openai-compatible");
      return callOpenAICompat(prompt, model, apiKey, baseUrl);
    }
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bodyText = await req.text();
    if (bodyText.length > MAX_REQUEST_BYTES) {
      return new Response(JSON.stringify({ error: "Request body is too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(bodyText || "{}");
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { sessionId, userId, answers: rawAnswers, draftOnly } = body;
    const answers = rawAnswers && typeof rawAnswers === "object" && !Array.isArray(rawAnswers)
      ? rawAnswers as OnboardingAnswers
      : {};
    if (!sessionId || typeof sessionId !== "string") {
      return new Response(JSON.stringify({ error: "sessionId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (sessionId.length > 128) {
      return new Response(JSON.stringify({ error: "sessionId is too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    let verifiedUserId: string | null = null;

    if (typeof userId === "string" && userId && supabaseUrl && supabaseAnonKey) {
      const userClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { Authorization: req.headers.get("Authorization") || "" },
        },
      });
      const { data: authData } = await userClient.auth.getUser();
      verifiedUserId = authData.user?.id === userId ? userId : null;
    }

    if (supabaseUrl && supabaseServiceRole) {
      const supabase = createClient(supabaseUrl, supabaseServiceRole);
      if (draftOnly) {
        await supabase.from("onboarding_leads").upsert(
          {
            session_id: sessionId,
            user_id: verifiedUserId,
            source: safeText(answers?.source, "landing"),
            email: safeText(answers?.email) || null,
            name: sanitizeName(answers?.name) || null,
            answers: answers || {},
            selected_plan: safeText(answers?.selectedPlan) || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "session_id" },
        );

        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const prompt = buildPrompt(answers || {});
    const revealText = await getReveal(prompt);
    let reveal = parseReveal(revealText);

    if (revealNeedsPolish(reveal)) {
      try {
        const revisedText = await getReveal(buildRevisionPrompt(answers || {}, reveal));
        reveal = parseReveal(revisedText);
      } catch {
        // Keep the first valid reveal if the rewrite pass fails.
      }
    }

    reveal = finalizeReveal(reveal, answers || {});

    if (supabaseUrl && supabaseServiceRole) {
      const supabase = createClient(supabaseUrl, supabaseServiceRole);
      await supabase.from("onboarding_leads").upsert(
        {
          session_id: sessionId,
          user_id: verifiedUserId,
          source: safeText(answers?.source, "landing"),
          email: safeText(answers?.email) || null,
          name: sanitizeName(answers?.name) || null,
          answers: answers || {},
          reveal,
          selected_plan: safeText(answers?.selectedPlan) || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "session_id" },
      );
    }

    return new Response(JSON.stringify({ reveal }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("onboarding-reveal error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

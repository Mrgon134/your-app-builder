import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { buildResultTeaser, type OnboardingFunnelAnswers, type ResultTeaser } from "@/lib/onboarding-funnel";

interface OnboardingRevealResponse {
  reveal?: ResultTeaser;
  ok?: boolean;
}

const REVEAL_REQUEST_TIMEOUT_MS = 6500;

const fetchWithTimeout = async (input: RequestInfo | URL, init: RequestInit = {}) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REVEAL_REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
};

const isValidReveal = (value: unknown): value is ResultTeaser => {
  if (!value || typeof value !== "object") return false;

  const reveal = value as Record<string, unknown>;
  return (
    typeof reveal.headline === "string" &&
    typeof reveal.stateLabel === "string" &&
    typeof reveal.mirror === "string" &&
    typeof reveal.whyItFits === "string" &&
    typeof reveal.firstSupportMove === "string" &&
    Array.isArray(reveal.supportSignals) &&
    typeof reveal.continuationLine === "string"
  );
};

export const requestOnboardingReveal = async ({
  sessionId,
  answers,
  userId,
}: {
  sessionId: string;
  answers: OnboardingFunnelAnswers;
  userId?: string | null;
}) => {
  try {
    const response = await fetchWithTimeout(`${SUPABASE_URL}/functions/v1/onboarding-reveal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        sessionId,
        userId: userId || null,
        answers,
      }),
    });

    if (!response.ok) {
      throw new Error(`Reveal request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as OnboardingRevealResponse;
    if (!isValidReveal(payload.reveal)) {
      throw new Error("Reveal payload was incomplete");
    }

    return payload.reveal;
  } catch {
    return buildResultTeaser(answers);
  }
};

export const persistOnboardingLead = async ({
  sessionId,
  answers,
  userId,
}: {
  sessionId: string;
  answers: OnboardingFunnelAnswers;
  userId?: string | null;
}) => {
  try {
    await fetchWithTimeout(`${SUPABASE_URL}/functions/v1/onboarding-reveal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        sessionId,
        userId: userId || null,
        answers,
        draftOnly: true,
      }),
    });
  } catch {
    // Keep the funnel smooth even if lead capture fails.
  }
};

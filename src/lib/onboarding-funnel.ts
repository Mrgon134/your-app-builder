export const ONBOARDING_FUNNEL_STORAGE_KEY = "nuju-onboarding-funnel";

export type FunnelGoal = "overwhelmed" | "unseen" | "disconnected" | "spiraling" | null;
export type FunnelConsistency = "rarely" | "sometimes" | "often" | null;
export type FunnelFocus = "name_it" | "calm_me" | "stay_with_me" | "show_pattern" | null;
export type FunnelStyle = "gentle" | "direct" | "private" | "guided" | null;
export type FunnelBaseline = "drained" | "holding" | "coping" | "hopeful" | null;
export type FunnelPlan = "weekly" | "yearly" | "lifetime_one_time" | null;

export interface OnboardingFunnelAnswers {
  source: string;
  goal: FunnelGoal;
  struggles: string[];
  consistency: FunnelConsistency;
  focus: FunnelFocus;
  style: FunnelStyle;
  resonance: string[];
  name: string;
  email: string;
  authCaptured: boolean;
  baseline: FunnelBaseline;
  selectedPlan: FunnelPlan;
}

export interface OnboardingFunnelState {
  step: number;
  answers: OnboardingFunnelAnswers;
}

export interface ResultTeaser {
  headline: string;
  stateLabel: string;
  whyItFits: string;
  firstSupportMove: string;
  supportSignals: string[];
  continuationLine: string;
}

export const createDefaultFunnelState = (source = "landing"): OnboardingFunnelState => ({
  step: 0,
  answers: {
    source,
    goal: null,
    struggles: [],
    consistency: null,
    focus: null,
    style: null,
    resonance: [],
    name: "",
    email: "",
    authCaptured: false,
    baseline: null,
    selectedPlan: null,
  },
});

export const loadFunnelState = (): OnboardingFunnelState | null => {
  try {
    const raw = localStorage.getItem(ONBOARDING_FUNNEL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingFunnelState;
  } catch {
    return null;
  }
};

export const saveFunnelState = (state: OnboardingFunnelState) => {
  try {
    localStorage.setItem(ONBOARDING_FUNNEL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors so the funnel still works.
  }
};

export const clearFunnelState = () => {
  try {
    localStorage.removeItem(ONBOARDING_FUNNEL_STORAGE_KEY);
  } catch {
    // Ignore storage errors so the funnel still works.
  }
};

const STATE_COPY: Record<Exclude<FunnelGoal, null>, { label: string; headline: string; why: string }> = {
  overwhelmed: {
    label: "Feeling overloaded",
    headline: "Ju notices that you have been carrying too much alone.",
    why: "Your answers sound like someone holding a lot at once, while still trying to stay functional on the outside.",
  },
  unseen: {
    label: "Feeling unseen",
    headline: "Ju notices that a big part of this is wanting to feel understood.",
    why: "It sounds less like you need fixing and more like you need somewhere honest where you do not have to explain yourself perfectly.",
  },
  disconnected: {
    label: "Feeling disconnected",
    headline: "Ju notices that you have been a little far from yourself lately.",
    why: "Your answers suggest you want help getting back in touch with what is actually going on inside, not just pushing through it.",
  },
  spiraling: {
    label: "Mind spiraling",
    headline: "Ju notices that your mind has been running ahead of you.",
    why: "It sounds like the hardest part is not the feeling itself, but how fast it grows before you can put it into words.",
  },
};

const SUPPORT_COPY: Record<Exclude<FunnelFocus, null>, string> = {
  name_it: "Help you name what is actually going on, so it feels less tangled and easier to carry.",
  calm_me: "Help you slow the emotional noise down before it takes over the whole moment.",
  stay_with_me: "Stay with you gently enough that you do not feel alone in it while you are sorting it out.",
  show_pattern: "Show you what keeps repeating, so this starts making more sense instead of feeling random.",
};

const STYLE_COPY: Record<Exclude<FunnelStyle, null>, string> = {
  gentle: "Ju starts with a soft, reassuring tone so opening up feels safe instead of effortful.",
  direct: "Ju keeps the reflection clear and grounded, so you do not get lost in vague comfort.",
  private: "Ju keeps things quiet and low-pressure, so the space still feels like yours.",
  guided: "Ju uses more structure and gentle prompts, so you never have to force the first sentence.",
};

const BASELINE_COPY: Record<Exclude<FunnelBaseline, null>, string> = {
  drained: "It keeps the first step very light, because heavy days still deserve support.",
  holding: "It gives you a place to let some pressure out before it hardens into more weight.",
  coping: "It helps turn blurred feelings into something clearer and easier to understand.",
  hopeful: "It helps you hold on to the part of you that already wants something steadier.",
};

const MISUNDERSTOOD_COPY: Record<Exclude<FunnelConsistency, null>, string> = {
  rarely: "You may not feel this way all the time, but when it hits, you still want somewhere safe to land.",
  sometimes: "You seem to move in and out of this, which is why the support has to feel easy to return to.",
  often: "Feeling misunderstood seems close to the center of this, not just a side effect of a hard week.",
};

export const buildResultTeaser = (answers: OnboardingFunnelAnswers): ResultTeaser => {
  const state = answers.goal || "unseen";
  const stateCopy = STATE_COPY[state];
  const namePrefix = answers.name.trim() ? `${answers.name.trim()}, ` : "";

  const signals = [
    answers.consistency ? MISUNDERSTOOD_COPY[answers.consistency] : null,
    answers.struggles.includes("overthinking") ? "Your thoughts seem to get louder before you can say what you really mean." : null,
    answers.struggles.includes("privacy") ? "Emotional safety matters before you can be fully honest." : null,
    answers.struggles.includes("time") ? "Support has to meet you quickly, not ask you to be more put together first." : null,
    answers.struggles.includes("blank") ? "Starting from nothing feels heavy, especially when the feeling is already hard to name." : null,
  ].filter(Boolean) as string[];

  const supportMove = answers.focus
    ? SUPPORT_COPY[answers.focus]
    : "Help you name what is happening and make the moment feel a little less lonely.";

  const supportingSignals = [
    answers.style ? STYLE_COPY[answers.style] : "Ju begins with a tone that feels easy to trust.",
    answers.baseline ? BASELINE_COPY[answers.baseline] : "Ju meets you at your actual energy level instead of asking for perfect consistency.",
  ];

  return {
    headline: `${namePrefix}${stateCopy.headline}`,
    stateLabel: stateCopy.label,
    whyItFits: [stateCopy.why, ...signals].join(" "),
    firstSupportMove: supportMove,
    supportSignals: supportingSignals,
    continuationLine: "Inside the full experience, Ju keeps reflecting what you are carrying so you feel understood again and again, not left to decode it alone.",
  };
};

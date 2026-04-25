export const ONBOARDING_FUNNEL_STORAGE_KEY = "nuju-onboarding-funnel";

export type FunnelGoal = "overwhelmed" | "unseen" | "disconnected" | "spiraling" | null;
export type FunnelConsistency = "rarely" | "sometimes" | "often" | null;
export type FunnelHardestMoment = "late_night" | "after_conflict" | "while_busy" | "when_alone" | null;
export type FunnelBlocker = "burden" | "words" | "functioning" | "privacy" | null;
export type FunnelFocus = "name_it" | "calm_me" | "stay_with_me" | "show_pattern" | null;
export type FunnelUnseenWish = "notice_tired" | "see_pain" | "stay_without_fixing" | "help_me_name_it" | null;
export type FunnelCost = "sleep" | "relationships" | "focus" | "self_trust" | null;
export type FunnelStyle = "gentle" | "direct" | "private" | "guided" | null;
export type FunnelBaseline = "drained" | "holding" | "coping" | "hopeful" | null;
export type FunnelRelief = "breathe" | "softer" | "clearer" | "less_alone" | null;
export type FunnelPlan = "weekly" | "three_month" | "lifetime_one_time" | "free" | null;

const LEGACY_PLAN_MAP: Record<string, FunnelPlan> = {
  yearly: "three_month",
  yearly_trial: "three_month",
};

export interface OnboardingFunnelAnswers {
  source: string;
  goal: FunnelGoal;
  struggles: string[];
  consistency: FunnelConsistency;
  hardestMoment: FunnelHardestMoment;
  blocker: FunnelBlocker;
  focus: FunnelFocus;
  name: string;
  email: string;
  authCaptured: boolean;
  unseenWish: FunnelUnseenWish;
  cost: FunnelCost;
  style: FunnelStyle;
  resonance: string[];
  baseline: FunnelBaseline;
  relief: FunnelRelief;
  selectedPlan: FunnelPlan;
}

export interface OnboardingFunnelState {
  step: number;
  sessionId: string;
  answers: OnboardingFunnelAnswers;
}

export interface ResultTeaser {
  headline: string;
  stateLabel: string;
  mirror: string;
  whyItFits: string;
  firstSupportMove: string;
  supportSignals: string[];
  continuationLine: string;
}

const DEFAULT_SESSION_ID = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `funnel-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const createDefaultFunnelState = (source = "landing"): OnboardingFunnelState => ({
  step: 0,
  sessionId: DEFAULT_SESSION_ID(),
  answers: {
    source,
    goal: null,
    struggles: [],
    consistency: null,
    hardestMoment: null,
    blocker: null,
    focus: null,
    name: "",
    email: "",
    authCaptured: false,
    unseenWish: null,
    cost: null,
    style: null,
    resonance: [],
    baseline: null,
    relief: null,
    selectedPlan: null,
  },
});

const migrateSelectedPlan = (plan: unknown): FunnelPlan => {
  if (plan === null || plan === undefined) return null;
  if (typeof plan !== "string") return null;
  if (plan === "weekly" || plan === "three_month" || plan === "lifetime_one_time" || plan === "free") {
    return plan;
  }
  if (plan in LEGACY_PLAN_MAP) return LEGACY_PLAN_MAP[plan];
  return null;
};

const normalizeState = (state: OnboardingFunnelState | null): OnboardingFunnelState | null => {
  if (!state) return null;

  const defaults = createDefaultFunnelState(state.answers?.source || "landing").answers;

  return {
    step: Number.isFinite(state.step) ? state.step : 0,
    sessionId: state.sessionId || DEFAULT_SESSION_ID(),
    answers: {
      ...defaults,
      ...state.answers,
      selectedPlan: migrateSelectedPlan(state.answers?.selectedPlan),
    },
  };
};

export const loadFunnelState = (): OnboardingFunnelState | null => {
  try {
    const raw = localStorage.getItem(ONBOARDING_FUNNEL_STORAGE_KEY);
    if (!raw) return null;
    return normalizeState(JSON.parse(raw) as OnboardingFunnelState);
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

export const getFunnelContactPrefill = () => {
  const state = loadFunnelState();
  return {
    name: state?.answers.name?.trim() || "",
    email: state?.answers.email?.trim() || "",
  };
};

const GOAL_COPY: Record<Exclude<FunnelGoal, null>, { label: string; headline: string; mirror: string }> = {
  overwhelmed: {
    label: "Carrying too much",
    headline: "Ju notices how much you have been holding while still trying to look okay on the outside.",
    mirror: "This reads like someone who has stayed functional for longer than their heart or mind really had room for.",
  },
  unseen: {
    label: "Wanting to feel understood",
    headline: "Ju notices how tired you are of needing perfect words before anyone really gets it.",
    mirror: "It feels less like you want advice and more like you want something to recognize the feeling before you have to translate it.",
  },
  disconnected: {
    label: "Far from yourself",
    headline: "Ju notices that part of you has gone quiet just to keep getting through the day.",
    mirror: "There is a distance between what you show on the surface and what is actually happening inside you right now.",
  },
  spiraling: {
    label: "Mind running ahead",
    headline: "Ju notices how fast the feeling becomes noise before you even get a chance to name it.",
    mirror: "This feels like the kind of emotional spiral that gets louder the longer you are left alone with it.",
  },
};

const FOCUS_COPY: Record<Exclude<FunnelFocus, null>, string> = {
  name_it: "Ju would help you catch the feeling before it blurs together, then put honest words around it so it stops sitting in your chest as one heavy knot.",
  calm_me: "Ju would help the emotional noise come down first, because nothing feels clear while everything is still this loud inside.",
  stay_with_me: "Ju would stay with the feeling gently enough that you do not have to carry the rawest part of it alone.",
  show_pattern: "Ju would help connect this moment to the pattern under it, so it starts making sense instead of just hurting again.",
};

const HARD_MOMENT_COPY: Record<Exclude<FunnelHardestMoment, null>, string> = {
  late_night: "It sounds like this gets louder in the quiet moments, especially when there is finally room to feel what the day kept buried.",
  after_conflict: "Conflict seems to leave a deeper emotional residue for you than people usually see on the surface.",
  while_busy: "A lot of this seems to hit hardest while you are still trying to hold everything together and keep moving.",
  when_alone: "Being alone with it seems to make the emotional weight expand, not because you are dramatic, but because there is no one there to help you hold it.",
};

const BLOCKER_COPY: Record<Exclude<FunnelBlocker, null>, string> = {
  burden: "You seem used to protecting other people from the full weight of what you feel.",
  words: "A big part of the pain may be how hard it is to find words before the feeling gets even bigger.",
  functioning: "You have probably learned to stay functional even when something inside you is quietly fraying.",
  privacy: "Feeling emotionally safe matters before you can be fully honest, and that has probably made opening up slower and harder.",
};

const UNSEEN_WISH_COPY: Record<Exclude<FunnelUnseenWish, null>, string> = {
  notice_tired: "A part of you wishes someone would notice how tired you are before you have to say it out loud.",
  see_pain: "A part of you wants to be seen beneath the version of you that keeps saying you are fine.",
  stay_without_fixing: "You want presence before solutions. Something that stays close before trying to tidy the feeling away.",
  help_me_name_it: "You want help finding the truest words for this, because naming it would already make it feel less lonely.",
};

const COST_COPY: Record<Exclude<FunnelCost, null>, string> = {
  sleep: "This has likely been following you into your sleep and stealing softness from the hours that are supposed to help you recover.",
  relationships: "This seems to be shaping how close you can feel to other people, even when you still want connection.",
  focus: "It is probably taking up more mental space than most people realize, which makes everyday focus feel heavier than it should.",
  self_trust: "The longer this stays blurred, the easier it is to doubt your own feelings or tell yourself you should be handling it better.",
};

const STYLE_COPY: Record<Exclude<FunnelStyle, null>, string> = {
  gentle: "Ju should feel soft and reassuring first, because you open up more honestly when the space feels emotionally safe.",
  direct: "Ju should stay clear and grounded, because warmth works better for you when it still feels honest and real.",
  private: "Ju should keep the tone quiet and low-pressure, because privacy helps you say the truer thing underneath.",
  guided: "Ju should use gentle structure, because having a thoughtful way in makes it easier to begin before the moment passes.",
};

const BASELINE_COPY: Record<Exclude<FunnelBaseline, null>, string> = {
  drained: "Right now the support has to meet you at a low battery level, not ask you to be more organized or emotionally articulate first.",
  holding: "It feels like you have been holding a lot in, and what you need first is somewhere that lets some of that pressure soften.",
  coping: "You are getting through it, but not in a way that feels settled yet. Ju would meet that middle state gently instead of forcing a bigger breakthrough than you have energy for.",
  hopeful: "There is still a hopeful part of you here. Ju would protect that without pretending everything already feels fine.",
};

const RELIEF_COPY: Record<Exclude<FunnelRelief, null>, string> = {
  breathe: "The first win should be breathing a little easier.",
  softer: "The first win should be feeling less hard on yourself.",
  clearer: "The first win should be having clearer words for what is happening.",
  less_alone: "The first win should be not feeling alone inside the moment anymore.",
};

const CONSISTENCY_COPY: Record<Exclude<FunnelConsistency, null>, string> = {
  rarely: "Even if this does not happen every day, it still cuts deep when it does.",
  sometimes: "This seems to come and go, which can make it harder because the weight never feels fully predictable.",
  often: "This sounds close to a recurring emotional pattern, not just one hard day.",
};

export const buildResultTeaser = (answers: OnboardingFunnelAnswers): ResultTeaser => {
  const goal = answers.goal || "unseen";
  const stateCopy = GOAL_COPY[goal];
  const firstName = answers.name.trim();
  const namePrefix = firstName ? `${firstName}, ` : "";

  const whyParts = [
    CONSISTENCY_COPY[answers.consistency || "sometimes"],
    answers.hardestMoment ? HARD_MOMENT_COPY[answers.hardestMoment] : null,
    answers.blocker ? BLOCKER_COPY[answers.blocker] : null,
    answers.unseenWish ? UNSEEN_WISH_COPY[answers.unseenWish] : null,
    answers.cost ? COST_COPY[answers.cost] : null,
  ].filter(Boolean) as string[];

  return {
    headline: `${namePrefix}${stateCopy.headline}`,
    stateLabel: stateCopy.label,
    mirror: stateCopy.mirror,
    whyItFits: whyParts.join(" "),
    firstSupportMove: answers.focus
      ? FOCUS_COPY[answers.focus]
      : "Ju would help you put words around what is heaviest first, so the feeling stops staying alone and shapeless inside you.",
    supportSignals: [
      answers.style ? STYLE_COPY[answers.style] : "Ju should feel safe enough that you can be real quickly.",
      answers.baseline ? BASELINE_COPY[answers.baseline] : "Ju should meet you gently where you actually are, not where people expect you to be.",
      answers.relief ? RELIEF_COPY[answers.relief] : "The first step should feel like emotional relief, not homework.",
    ],
    continuationLine: firstName
      ? `${firstName}, if this already feels true, the next step is keeping Ju close enough that the next heavy moment does not have to start from scratch.`
      : "If this already feels true, the next step is keeping Ju close enough that the next heavy moment does not have to start from scratch.",
  };
};

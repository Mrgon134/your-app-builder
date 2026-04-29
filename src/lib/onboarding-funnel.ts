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
    headline: "Ju sees how much you have been holding while still trying to look okay.",
    mirror: "You may have been staying functional while carrying more than you had room for.",
  },
  unseen: {
    label: "Wanting to feel understood",
    headline: "Ju sees how tired you are of needing perfect words before you feel understood.",
    mirror: "You may not need advice first. You may need the feeling recognized before you translate it.",
  },
  disconnected: {
    label: "Far from yourself",
    headline: "Ju sees that part of you has gone quiet just to get through the day.",
    mirror: "What you show on the surface may not match what is happening inside right now.",
  },
  spiraling: {
    label: "Mind running ahead",
    headline: "Ju sees how fast the feeling becomes noise before you can name it.",
    mirror: "When you are left alone with it, the noise can get louder fast.",
  },
};

const FOCUS_COPY: Record<Exclude<FunnelFocus, null>, string> = {
  name_it: "First, name the feeling clearly enough that it stops sitting in your chest as one heavy knot.",
  calm_me: "First, bring the noise down so there is room to breathe.",
  stay_with_me: "First, stay with the feeling gently so you do not have to hold the rawest part alone.",
  show_pattern: "First, connect this moment to the pattern under it so it starts making sense.",
};

const HARD_MOMENT_COPY: Record<Exclude<FunnelHardestMoment, null>, string> = {
  late_night: "This may get louder in quiet moments, when the day finally leaves room to feel it.",
  after_conflict: "Conflict may leave a deeper after-feeling than people see.",
  while_busy: "A lot of this may hit hardest while you are still trying to keep moving.",
  when_alone: "Being alone with it can make the weight feel bigger, especially without a soft place to put it.",
};

const BLOCKER_COPY: Record<Exclude<FunnelBlocker, null>, string> = {
  burden: "You may be used to protecting other people from how much you feel.",
  words: "Finding words can be hard when the feeling is already getting big.",
  functioning: "You may have learned to stay functional even when something inside feels frayed.",
  privacy: "Emotional safety matters before you can be fully honest.",
};

const UNSEEN_WISH_COPY: Record<Exclude<FunnelUnseenWish, null>, string> = {
  notice_tired: "A part of you wants your tiredness noticed before you have to say it out loud.",
  see_pain: "A part of you wants to be seen beneath the version that keeps saying you are fine.",
  stay_without_fixing: "You may want presence before solutions.",
  help_me_name_it: "Finding the truest words could already make this feel less lonely.",
};

const COST_COPY: Record<Exclude<FunnelCost, null>, string> = {
  sleep: "This may be following you into the hours that are supposed to help you recover.",
  relationships: "This may be shaping how close you can feel to people, even when you still want connection.",
  focus: "It may be taking up more mental space than people realize.",
  self_trust: "When this stays blurred, it can get harder to trust what you feel.",
};

const STYLE_COPY: Record<Exclude<FunnelStyle, null>, string> = {
  gentle: "A soft, reassuring tone may help you open up more honestly.",
  direct: "Warmth may feel best when it stays clear and grounded.",
  private: "A quiet, low-pressure space may help you say the truer thing.",
  guided: "A little structure may make it easier to begin before the moment passes.",
};

const BASELINE_COPY: Record<Exclude<FunnelBaseline, null>, string> = {
  drained: "Start low-effort, without needing to be organized or articulate first.",
  holding: "You may need somewhere that lets some of the pressure soften.",
  coping: "You are getting through it, but not in a way that feels fully settled yet.",
  hopeful: "There is still a hopeful part of you here, even if everything does not feel fine yet.",
};

const RELIEF_COPY: Record<Exclude<FunnelRelief, null>, string> = {
  breathe: "Start with breathing a little easier.",
  softer: "Start with feeling less hard on yourself.",
  clearer: "Start with clearer words for what is happening.",
  less_alone: "Start with feeling less alone inside the moment.",
};

const CONSISTENCY_COPY: Record<Exclude<FunnelConsistency, null>, string> = {
  rarely: "Even if this does not happen every day, it still matters when it does.",
  sometimes: "This may come and go, which can make the weight feel hard to predict.",
  often: "This sounds like a recurring pattern, not just one hard day.",
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
  const whySummary = whyParts.slice(0, 3).join(" ");

  return {
    headline: `${namePrefix}${stateCopy.headline}`,
    stateLabel: stateCopy.label,
    mirror: stateCopy.mirror,
    whyItFits: whySummary,
    firstSupportMove: answers.focus
      ? FOCUS_COPY[answers.focus]
      : "Start by putting words around what feels heaviest, so it stops staying alone and shapeless.",
    supportSignals: [
      answers.style ? STYLE_COPY[answers.style] : "Keep it simple and safe enough to be honest.",
      answers.baseline ? BASELINE_COPY[answers.baseline] : "Meet the way you actually feel right now.",
      answers.relief ? RELIEF_COPY[answers.relief] : "Let the first step feel like relief, not homework.",
    ],
    continuationLine: firstName
      ? `${firstName}, this does not have to disappear when the page closes.`
      : "This does not have to disappear when the page closes.",
  };
};

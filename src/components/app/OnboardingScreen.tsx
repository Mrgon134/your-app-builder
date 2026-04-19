import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Heart,
  Loader2,
  Mail,
  Shield,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

import juMain from "@/assets/ju-main.webp";
import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { updateProfile } from "@/lib/api";
import { PRICING_CONFIG } from "@/lib/config";
import {
  buildResultTeaser,
  createDefaultFunnelState,
  FunnelPlan,
  loadFunnelState,
  OnboardingFunnelState,
  ResultTeaser,
  saveFunnelState,
} from "@/lib/onboarding-funnel";
import { persistOnboardingLead, requestOnboardingReveal } from "@/lib/onboarding-reveal";
import { ROUTES } from "@/lib/routes";

const TOTAL_STEPS = 20;
const CONTACT_STEP = 7;
const PROCESSING_STEP = 16;
const RESULT_STEP = 17;
const BRIDGE_STEP = 18;
const PAYWALL_STEP = 19;

const STEP_KEYS = [
  "entry",
  "goal",
  "struggles",
  "consistency",
  "hardest_moment",
  "blocker",
  "focus",
  "contact",
  "unseen_wish",
  "cost",
  "style",
  "resonance_1",
  "resonance_2",
  "resonance_3",
  "baseline",
  "relief",
  "processing",
  "result",
  "bridge",
  "paywall",
] as const;

type CheckoutPlan = "yearly_trial" | "lifetime_one_time";
const VALID_PLANS: CheckoutPlan[] = ["yearly_trial", "lifetime_one_time"];

const PHASE_LABELS: Record<number, string> = {
  0: "The softest start",
  1: "Getting to know how you carry it",
  2: "Getting to know how you carry it",
  3: "Getting to know how you carry it",
  4: "Getting to know how you carry it",
  5: "Getting to know how you carry it",
  6: "Getting to know how you carry it",
  7: "Making it personal",
  8: "Understanding the shape of it",
  9: "Understanding the shape of it",
  10: "Understanding the shape of it",
  11: "Seeing if Ju really gets you",
  12: "Seeing if Ju really gets you",
  13: "Seeing if Ju really gets you",
  14: "Prepping your read",
  15: "Prepping your read",
  16: "Ju is reading what you shared...",
  17: "The read Ju built for you",
  18: "Bringing Ju home with you",
  19: "Bringing Ju home with you",
};

const STEP_TINT: Record<number, string> = {
  0: "",
  11: "bg-[rgba(232,135,140,0.035)] dark:bg-[rgba(232,135,140,0.05)]",
  12: "bg-[rgba(232,135,140,0.035)] dark:bg-[rgba(232,135,140,0.05)]",
  13: "bg-[rgba(232,135,140,0.035)] dark:bg-[rgba(232,135,140,0.05)]",
  14: "bg-[rgba(149,225,211,0.045)] dark:bg-[rgba(149,225,211,0.06)]",
  15: "bg-[rgba(149,225,211,0.045)] dark:bg-[rgba(149,225,211,0.06)]",
};

const GOAL_OPTIONS = [
  {
    id: "overwhelmed",
    title: "Everything feels like too much",
    description: "I am still moving, but inside it feels like I am carrying more than I can really hold.",
    icon: Heart,
  },
  {
    id: "unseen",
    title: "I want to feel understood",
    description: "I do not want to explain myself perfectly first. I want something that just gets it.",
    icon: BrainCircuit,
  },
  {
    id: "disconnected",
    title: "I feel far from myself lately",
    description: "I want help getting closer to what is actually happening inside me again.",
    icon: Sparkles,
  },
  {
    id: "spiraling",
    title: "My thoughts run ahead of me",
    description: "The noise gets big fast, and I need something to help me settle before it takes over.",
    icon: Shield,
  },
] as const;

const STRUGGLE_OPTIONS = [
  { id: "overthinking", label: "My thoughts go in circles before I can even say what hurts." },
  { id: "blank", label: "I go blank when I try to explain what I am feeling." },
  { id: "privacy", label: "I hold a lot in because emotional safety matters before I can be real." },
  { id: "time", label: "When it hits, I need support fast. I do not have energy for a whole process." },
  { id: "consistency", label: "I want support, but I disappear when life gets heavy." },
] as const;

const CONSISTENCY_OPTIONS = [
  { id: "rarely", label: "Not all the time, but when it hits, it really stays with me." },
  { id: "sometimes", label: "It comes and goes, but I never feel fully ahead of it." },
  { id: "often", label: "Pretty often. A lot of what I feel stays inside me." },
] as const;

const HARDEST_MOMENT_OPTIONS = [
  { id: "late_night", label: "Late at night, when everything finally gets quiet" },
  { id: "after_conflict", label: "After conflict, when I replay everything alone" },
  { id: "while_busy", label: "While I am still trying to function and keep moving" },
  { id: "when_alone", label: "When I am alone with it and there is no one nearby" },
] as const;

const BLOCKER_OPTIONS = [
  { id: "burden", label: "I do not want to feel like a burden to people" },
  { id: "words", label: "I cannot find the real words in time" },
  { id: "functioning", label: "I am too busy trying to stay functional" },
  { id: "privacy", label: "I need privacy before I can be truly honest" },
] as const;

const FOCUS_OPTIONS = [
  { id: "name_it", label: "Help me name what I am actually feeling" },
  { id: "calm_me", label: "Help me slow the emotional noise down" },
  { id: "stay_with_me", label: "Stay with me gently until I can breathe again" },
  { id: "show_pattern", label: "Help me see the pattern underneath this" },
] as const;

const UNSEEN_WISH_OPTIONS = [
  { id: "notice_tired", label: "I wish someone noticed how tired I am before I say it" },
  { id: "see_pain", label: "I wish someone could see what hurts underneath the surface" },
  { id: "stay_without_fixing", label: "I wish someone stayed with me before trying to fix it" },
  { id: "help_me_name_it", label: "I wish someone helped me find the words for it" },
] as const;

const COST_OPTIONS = [
  { id: "sleep", label: "It follows me into my sleep" },
  { id: "relationships", label: "It affects how close I can feel to people" },
  { id: "focus", label: "It eats up my focus and mental space" },
  { id: "self_trust", label: "It makes it harder to trust myself" },
] as const;

const STYLE_OPTIONS = [
  { id: "gentle", label: "Soft and reassuring", blurb: "I open up more when the space feels gentle first." },
  { id: "direct", label: "Clear and honest", blurb: "I still want warmth, but I do not want vague comfort." },
  { id: "private", label: "Quiet and low-pressure", blurb: "I need it to feel private before I can be fully real." },
  { id: "guided", label: "Held with a little structure", blurb: "Thoughtful prompts make it easier for me to begin." },
] as const;

const RESONANCE_PROMPTS = [
  "Sometimes I do not need advice first. I need to feel like something truly understands what is happening inside me.",
  "The hardest part is not always the feeling itself. It is trying to carry it with no clear words and no soft place to put it.",
  "If something could make me feel understood quickly, I would trust it enough to come back before things got worse.",
] as const;

const BASELINE_OPTIONS = [
  { id: "drained", label: "Drained and stretched thin" },
  { id: "holding", label: "Holding a lot in" },
  { id: "coping", label: "Getting by, but not really settled" },
  { id: "hopeful", label: "Hopeful that something could feel different" },
] as const;

const RELIEF_OPTIONS = [
  { id: "breathe", label: "Breathe a little easier" },
  { id: "softer", label: "Feel softer toward myself" },
  { id: "clearer", label: "Get clearer words for what is happening" },
  { id: "less_alone", label: "Feel less alone inside the moment" },
] as const;

const ProgressBar: React.FC<{ step: number }> = ({ step }) => (
  <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
    <motion.div
      className="h-full rounded-full bg-primary"
      animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
    />
  </div>
);

const StepCard: React.FC<{ children: React.ReactNode; className?: string; tint?: string }> = ({
  children,
  className = "",
  tint = "",
}) => (
  <div
    className={`relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl ${className}`}
  >
    {tint ? <div className={`pointer-events-none absolute inset-0 ${tint}`} aria-hidden /> : null}
    <div className="relative">{children}</div>
  </div>
);

const StepMascot: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div
    className="relative mx-auto mb-4 flex items-center justify-center"
    style={{ width: size, height: size }}
  >
    <div
      className="absolute inset-[-6px] rounded-full bg-primary/20 blur-md"
      style={{ animation: "glow-pulse 3.2s ease-in-out infinite" }}
      aria-hidden
    />
    <img
      src={juMain}
      alt=""
      className="relative h-full w-full object-contain"
      style={{ animation: "ju-float 3.4s ease-in-out infinite" }}
    />
  </div>
);

const personalize = (line: string, firstName: string) =>
  firstName ? line.replace(/\{name\}/g, firstName) : line.replace(/\{name\}, ?/g, "").replace(/, \{name\}/g, "");

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
  />
);

const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background px-5 py-3.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground active:scale-[0.98] ${className}`}
  />
);

const MultiSelectButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-[1.5rem] border px-4 py-4 text-left transition-all ${
      active ? "border-primary bg-primary/8" : "border-border/60 bg-background hover:border-primary/30"
    }`}
  >
    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-primary bg-primary" : "border-border"}`}>
      {active ? <Check className="h-3.5 w-3.5 text-primary-foreground" /> : null}
    </div>
    <p className="text-sm leading-7 text-foreground">{children}</p>
  </button>
);

const ChoiceCard: React.FC<{
  active: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}> = ({ active, onClick, title, description, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`rounded-[1.75rem] border p-5 text-left transition-all ${
      active ? "border-primary bg-primary/8 shadow-sm" : "border-border/60 bg-background hover:border-primary/30"
    }`}
  >
    {Icon ? (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    ) : null}
    <p className={`${Icon ? "mt-4" : ""} text-lg font-semibold text-foreground`}>{title}</p>
    {description ? <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p> : null}
  </button>
);

const OnboardingScreen: React.FC = () => {
  const location = useLocation();
  const geo = useGeoPricing();
  const events = usePostHogEvents();
  const { user } = useAuth();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const source = query.get("source") || "landing";
  const planFromQuery = query.get("plan");
  const preferredPlan = VALID_PLANS.includes(planFromQuery as Exclude<FunnelPlan, null>)
    ? (planFromQuery as Exclude<FunnelPlan, null>)
    : null;

  const initialState = useMemo(() => {
    const stored = loadFunnelState();
    const baseState = stored || createDefaultFunnelState(source);

    return {
      ...baseState,
      answers: {
        ...baseState.answers,
        source,
        selectedPlan: baseState.answers.selectedPlan || preferredPlan,
      },
    } satisfies OnboardingFunnelState;
  }, [preferredPlan, source]);

  const [funnelState, setFunnelState] = useState<OnboardingFunnelState>(initialState);
  const [reveal, setReveal] = useState<ResultTeaser | null>(null);
  const [contactError, setContactError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState<CheckoutPlan | null>(null);
  const navigate = useNavigate();
  const [profileSynced, setProfileSynced] = useState(false);
  const startTrackedRef = useRef(false);
  const completedRef = useRef(false);
  const abandonmentStepRef = useRef(STEP_KEYS[initialState.step] || "entry");
  const abandonmentSourceRef = useRef(initialState.answers.source);
  const abandonmentUserRef = useRef<string | null>(null);
  const processingStartedRef = useRef(false);
  const leadSyncKeyRef = useRef("");

  useEffect(() => {
    saveFunnelState(funnelState);
  }, [funnelState]);

  useEffect(() => {
    abandonmentStepRef.current = STEP_KEYS[funnelState.step] || "unknown";
    abandonmentSourceRef.current = funnelState.answers.source;
    abandonmentUserRef.current = user?.id || null;
  }, [funnelState.answers.source, funnelState.step, user?.id]);

  useEffect(() => {
    if (!startTrackedRef.current) {
      startTrackedRef.current = true;
      events.trackFunnelStart(funnelState.answers.source);
    }
  }, [events, funnelState.answers.source]);

  useEffect(() => {
    return () => {
      if (!completedRef.current) {
        events.trackFunnelAbandoned(abandonmentStepRef.current, abandonmentSourceRef.current, abandonmentUserRef.current);
      }
    };
  }, [events]);

  useEffect(() => {
    if (!user) return;

    setFunnelState((prev) => {
      const nextName = prev.answers.name || String(user.user_metadata?.display_name || user.user_metadata?.name || "").trim();
      const nextEmail = prev.answers.email || user.email || "";

      if (nextName === prev.answers.name && nextEmail === prev.answers.email) {
        return prev;
      }

      return {
        ...prev,
        answers: {
          ...prev.answers,
          name: nextName,
          email: nextEmail,
          authCaptured: true,
        },
      };
    });
  }, [user]);

  useEffect(() => {
    if (!user || profileSynced || !funnelState.answers.name.trim()) return;

    updateProfile(user.id, {
      display_name: funnelState.answers.name.trim(),
      onboarded: true,
    } as never)
      .then(() => setProfileSynced(true))
      .catch(() => {
        // Keep funnel usable even if profile sync fails.
      });
  }, [funnelState.answers.name, profileSynced, user]);

  useEffect(() => {
    if (!funnelState.answers.authCaptured) return;

    const syncKey = [
      funnelState.sessionId,
      user?.id || "anon",
      funnelState.answers.name.trim(),
      funnelState.answers.email.trim(),
      funnelState.answers.selectedPlan || "none",
    ].join(":");

    if (leadSyncKeyRef.current === syncKey) return;
    leadSyncKeyRef.current = syncKey;

    void persistOnboardingLead({
      sessionId: funnelState.sessionId,
      answers: funnelState.answers,
      userId: user?.id || null,
    });
  }, [
    funnelState.answers,
    funnelState.sessionId,
    user?.id,
  ]);

  useEffect(() => {
    if (funnelState.step === RESULT_STEP) {
      const teaser = reveal || buildResultTeaser(funnelState.answers);
      events.trackFunnelResultShown(teaser.stateLabel, funnelState.answers.source, user?.id || null);
    }

    if (funnelState.step === PAYWALL_STEP) {
      events.trackFunnelPaywallShown(funnelState.answers.source, user?.id || null);
    }
  }, [events, funnelState.answers, funnelState.step, reveal, user?.id]);

  useEffect(() => {
    if (funnelState.step !== PROCESSING_STEP || processingStartedRef.current) return;

    processingStartedRef.current = true;
    setCheckoutError("");

    const timer = window.setTimeout(async () => {
      const nextReveal = await requestOnboardingReveal({
        sessionId: funnelState.sessionId,
        answers: funnelState.answers,
        userId: user?.id || null,
      });

      setReveal(nextReveal);
      setFunnelState((prev) => ({ ...prev, step: RESULT_STEP }));
      processingStartedRef.current = false;
    }, 900);

    return () => {
      window.clearTimeout(timer);
      processingStartedRef.current = false;
    };
  }, [funnelState.answers, funnelState.sessionId, funnelState.step, user?.id]);

  const teaser = reveal || buildResultTeaser(funnelState.answers);
  const yearlySavings = Math.max(0, Math.round((1 - geo.rates.yearly / (geo.rates.weekly * 52)) * 100));
  const { snapshot: lifetimeScarcity } = useLifetimeScarcity();

  const getProductId = (plan: CheckoutPlan) => {
    switch (plan) {
      case "yearly_trial":
        return PRICING_CONFIG.products.yearly;
      case "lifetime_one_time":
        return PRICING_CONFIG.products.lifetime_one_time;
      default:
        return "";
    }
  };

  const isConfiguredProduct = (plan: CheckoutPlan) => {
    const productId = getProductId(plan);
    return Boolean(productId) && !productId.includes("VARIANT_ID");
  };

  const setAnswers = (patch: Partial<OnboardingFunnelState["answers"]>) => {
    setFunnelState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        ...patch,
      },
    }));
  };

  const completeStep = () => {
    events.trackFunnelStep(STEP_KEYS[funnelState.step], funnelState.answers.source, user?.id || null);
    setFunnelState((prev) => ({ ...prev, step: Math.min(prev.step + 1, TOTAL_STEPS - 1) }));
  };

  const goBack = () => {
    if (funnelState.step === 0 || funnelState.step === PROCESSING_STEP) return;
    setCheckoutError("");
    setContactError("");
    setFunnelState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
  };

  const toggleStruggle = (id: string) => {
    const active = funnelState.answers.struggles.includes(id);
    setAnswers({
      struggles: active
        ? funnelState.answers.struggles.filter((item) => item !== id)
        : [...funnelState.answers.struggles, id],
    });
  };

  const handleResonance = (prompt: string, matches: boolean) => {
    if (matches && !funnelState.answers.resonance.includes(prompt)) {
      setAnswers({ resonance: [...funnelState.answers.resonance, prompt] });
    }
    completeStep();
  };

  const submitContactCapture = () => {
    setContactError("");

    const name = funnelState.answers.name.trim();
    const email = funnelState.answers.email.trim();

    if (!name) {
      setContactError("Add your name so Ju can speak to you like it knows who you are.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError("Add a real email so Ju can keep this reading with you.");
      return;
    }

    const nextAnswers = {
      ...funnelState.answers,
      authCaptured: true,
      name,
      email,
    };

    void persistOnboardingLead({
      sessionId: funnelState.sessionId,
      answers: nextAnswers,
      userId: user?.id || null,
    });

    setAnswers({ authCaptured: true, name, email });
    completeStep();
  };

  const planForBackend = (plan: CheckoutPlan): "yearly" | "lifetime_one_time" =>
    plan === "yearly_trial" ? "yearly" : "lifetime_one_time";

  const handleContinueFree = () => {
    const freeName = funnelState.answers.name.trim();
    const freeEmail = funnelState.answers.email.trim();

    setAnswers({ selectedPlan: "free" });
    events.trackFunnelPlanSelected("free", funnelState.answers.source, user?.id || null);
    completedRef.current = true;

    void persistOnboardingLead({
      sessionId: funnelState.sessionId,
      answers: {
        ...funnelState.answers,
        authCaptured: funnelState.answers.authCaptured,
        name: freeName,
        email: freeEmail,
        selectedPlan: "free",
      },
      userId: user?.id || null,
    });

    navigate(ROUTES.APP);
  };

  async function handleCheckout(plan: CheckoutPlan) {
    const checkoutName = funnelState.answers.name.trim();
    const checkoutEmail = funnelState.answers.email.trim();

    setAnswers({ selectedPlan: plan });
    setCheckoutError("");
    events.trackFunnelPlanSelected(plan, funnelState.answers.source, user?.id || null);

    if (!checkoutName) {
      setCheckoutError("Add your name first so Ju can carry it into checkout and your read.");
      return;
    }

    if (!checkoutEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutEmail)) {
      setCheckoutError("Add the email you want to keep after payment so Ju can unlock the right account.");
      return;
    }

    if (!isConfiguredProduct(plan)) {
      setCheckoutError("This plan is not configured yet. Add the matching Dodo product ID first.");
      return;
    }

    setCheckoutLoading(plan);
    events.trackFunnelCheckoutStarted(plan, funnelState.answers.source, user?.id || null);

    try {
      await persistOnboardingLead({
        sessionId: funnelState.sessionId,
        answers: {
          ...funnelState.answers,
          authCaptured: true,
          name: checkoutName,
          email: checkoutEmail,
          selectedPlan: plan,
        },
        userId: user?.id || null,
      });

      const response = await fetch(`${SUPABASE_URL}/functions/v1/dodo-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          variant_id: getProductId(plan),
          sessionId: funnelState.sessionId,
          email: checkoutEmail,
          name: checkoutName,
          plan: planForBackend(plan),
          source: funnelState.answers.source,
          country: geo.country,
          coupon_code: geo.couponCode || undefined,
          trial_period_days: plan === "yearly_trial" ? PRICING_CONFIG.trial.annualDays : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout could not be created.");
      }

      const data = await response.json();
      completedRef.current = true;
      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setCheckoutLoading(null);
    }
  }

  const firstName = funnelState.answers.name.trim();
  const trialDays = PRICING_CONFIG.trial.annualDays;

  type PaywallPlanCard = {
    id: CheckoutPlan;
    title: string;
    priceDisplay: string;
    unit: string;
    secondaryLine?: string;
    badge?: string;
    note: string;
    emphasis: string;
    ctaLabel: string;
  };

  const paywallPlans: PaywallPlanCard[] = [
    {
      id: "yearly_trial",
      title: "Annual",
      priceDisplay: "$0 today",
      unit: `Free for ${trialDays} days · then ${geo.formatPrice(geo.rates.yearly)}/year`,
      secondaryLine: `Cancel anytime before day ${trialDays}. No charge if it is not for you.`,
      badge: `${trialDays}-day free trial`,
      emphasis: firstName
        ? `${firstName}, start gentle. Try Ju fully for ${trialDays} days.`
        : `Start gentle. Try Ju fully for ${trialDays} days.`,
      note:
        yearlySavings > 0
          ? `After the trial, annual keeps Ju close at the best long-term value (Save ${yearlySavings}% vs weekly).`
          : "After the trial, annual keeps Ju close at the best long-term value.",
      ctaLabel: `Start ${trialDays}-day free trial`,
    },
    {
      id: "lifetime_one_time",
      title: "Lifetime",
      priceDisplay: geo.formatPrice(geo.rates.lifetime),
      unit: "One payment · Keep Ju close for good",
      badge: "One payment · No renewals",
      emphasis: firstName
        ? `${firstName}, if this already feels right, this is the strongest yes you can give.`
        : "The strongest yes if Ju already feels right.",
      note: "One payment for the people who already feel the fit and do not want renewals hanging over it later.",
      ctaLabel: "Keep Ju for life",
    },
  ];

  const renderResonanceStep = (stepIndex: number) => {
    const prompt = RESONANCE_PROMPTS[stepIndex];
    const intro = firstName
      ? `${firstName}, read this slowly. If it feels like you, just say so.`
      : "Read this slowly. If it feels like you, just say so.";
    return (
      <StepCard className="text-center" tint={STEP_TINT[stepIndex + 11]}>
        <StepMascot size={36} />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Does this feel like you?</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{intro}</p>
        <div className="mt-8 rounded-[2rem] border border-border/60 bg-background px-6 py-10">
          <p
            className="text-xl italic leading-9 text-foreground"
            style={{ fontFamily: "var(--font-writing), Georgia, serif" }}
          >
            {`"${prompt}"`}
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {RESONANCE_PROMPTS.map((_, index) => (
            <span key={index} className={`h-2.5 w-2.5 rounded-full ${index <= stepIndex ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <SecondaryButton onClick={() => handleResonance(prompt, false)}>Not really</SecondaryButton>
          <PrimaryButton onClick={() => handleResonance(prompt, true)}>That feels like me</PrimaryButton>
        </div>
      </StepCard>
    );
  };

  const renderStep = () => {
    switch (funnelState.step) {
      case 0:
        return (
          <StepCard className="text-center">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                style={{ animation: "glow-pulse 3.2s ease-in-out infinite" }}
                aria-hidden
              />
              <img
                src={juMain}
                alt="Ju"
                className="relative h-24 w-24 object-contain"
                style={{ animation: "ju-float 3.4s ease-in-out infinite" }}
              />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Take a breath. Ju is already here.
            </p>
            <h1
              className="mt-3 font-serif text-4xl font-bold leading-tight text-foreground"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              When it is heavy and hard to explain, Ju starts by listening — not asking you to explain first.
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              A few honest answers, then Ju builds a quiet emotional read that sounds like <em>you</em>, not a template.
            </p>
            <div className="mt-8 rounded-[1.85rem] border border-primary/20 bg-primary/[0.06] px-5 py-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What you get first</p>
              <p className="mt-3 text-lg font-semibold leading-8 text-foreground">
                Being understood — before you have anything figured out.
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Ju listens for what feels heavy, what feels lonely, and what kind of presence helps first.
              </p>
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={completeStep}>
                Begin softly
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 1:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              What has been feeling the heaviest lately?
            </h2>
            <p className="mt-3 text-center text-base leading-8 text-muted-foreground">
              No need for perfect words. Pick whichever one sits closest to your chest right now.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {GOAL_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.goal === option.id}
                  onClick={() => setAnswers({ goal: option.id })}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.goal}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 2:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              When this hits, what feels hardest?
            </h2>
            <p className="mt-3 text-center text-base leading-8 text-muted-foreground">
              Pick whichever feel true. You can choose more than one — Ju is listening for the whole shape of it.
            </p>
            <div className="mt-7 space-y-3">
              {STRUGGLE_OPTIONS.map((option) => (
                <MultiSelectButton
                  key={option.id}
                  active={funnelState.answers.struggles.includes(option.id)}
                  onClick={() => toggleStruggle(option.id)}
                >
                  {option.label}
                </MultiSelectButton>
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={funnelState.answers.struggles.length === 0}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 3:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              How often do you feel misunderstood in moments like this?
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              This tells Ju how loud the loneliness underneath it tends to be.
            </p>
            <div className="mt-7 grid gap-3">
              {CONSISTENCY_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.consistency === option.id}
                  onClick={() => setAnswers({ consistency: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.consistency}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 4:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              When does this usually hit the hardest?
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              There is no wrong answer. Ju is just learning the rhythm of when you need support most.
            </p>
            <div className="mt-7 grid gap-3">
              {HARDEST_MOMENT_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.hardestMoment === option.id}
                  onClick={() => setAnswers({ hardestMoment: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.hardestMoment}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 5:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              What usually keeps you from opening up fully?
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              Whatever it is, it does not make you hard to love. It just tells Ju where to be gentle first.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {BLOCKER_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.blocker === option.id}
                  onClick={() => setAnswers({ blocker: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.blocker}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 6:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              What do you need most from Ju first?
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              Whatever you choose, Ju will start there — slowly, nothing else asked of you.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {FOCUS_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.focus === option.id}
                  onClick={() => setAnswers({ focus: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.focus}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case CONTACT_STEP:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              So Ju can actually speak to you
            </h2>
            <p className="mt-3 text-center text-base leading-8 text-muted-foreground">
              Your name makes this feel like a real conversation — not copy written for everyone. Your email keeps your read safe with you.
            </p>
            <div className="mt-7 grid gap-3">
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  value={funnelState.answers.name}
                  onChange={(event) => setAnswers({ name: event.target.value })}
                  placeholder="Your first name or nickname"
                  className="h-14 w-full rounded-2xl border border-border/60 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="email"
                  value={funnelState.answers.email}
                  onChange={(event) => setAnswers({ email: event.target.value })}
                  placeholder="Email"
                  className="h-14 w-full rounded-2xl border border-border/60 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/6 px-4 py-4 text-sm leading-7 text-foreground">
              Ju uses your name in the read so the moment lands more personally and does not feel like copy made for everyone.
            </div>
            {contactError ? (
              <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm text-destructive">
                {contactError}
              </div>
            ) : null}
            <div className="mt-7">
              <PrimaryButton onClick={submitContactCapture}>Continue</PrimaryButton>
            </div>
          </StepCard>
        );

      case 8:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              {personalize(
                "{name}, what do you wish someone would just… know — without you having to spell it out?",
                firstName,
              ).replace(/^, ?/, "")}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              The truest one. The one you rarely get to say out loud.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {UNSEEN_WISH_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.unseenWish === option.id}
                  onClick={() => setAnswers({ unseenWish: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.unseenWish}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 9:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              {firstName
                ? `${firstName}, what has carrying this been costing you most?`
                : "What has carrying this been costing you most?"}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              Not to make you sad — just so Ju can see what the weight has been touching.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {COST_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.cost === option.id}
                  onClick={() => setAnswers({ cost: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.cost}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 10:
        return (
          <StepCard>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              {firstName
                ? `${firstName}, what kind of presence helps you open up most honestly?`
                : "What kind of presence helps you open up most honestly?"}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              Ju will shape the way it sits with you around whichever you choose.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {STYLE_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.style === option.id}
                  onClick={() => setAnswers({ style: option.id })}
                  title={option.label}
                  description={option.blurb}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.style}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 11:
        return renderResonanceStep(0);
      case 12:
        return renderResonanceStep(1);
      case 13:
        return renderResonanceStep(2);

      case 14:
        return (
          <StepCard tint={STEP_TINT[14]}>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              {firstName
                ? `${firstName}, before Ju finishes your read — how are you arriving right now?`
                : "Before Ju finishes your read — how are you arriving right now?"}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              This helps Ju meet you at your actual energy, not a pretend one.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {BASELINE_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.baseline === option.id}
                  onClick={() => setAnswers({ baseline: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.baseline}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 15:
        return (
          <StepCard tint={STEP_TINT[15]}>
            <StepMascot />
            <h2 className="text-center font-serif text-3xl font-bold leading-snug text-foreground">
              {firstName
                ? `If Ju does this right, ${firstName} — what is the first thing you want to feel?`
                : "If Ju does this right, what is the first thing you want to feel?"}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              This becomes the first soft outcome Ju protects for you.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {RELIEF_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.id}
                  active={funnelState.answers.relief === option.id}
                  onClick={() => setAnswers({ relief: option.id })}
                  title={option.label}
                />
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.relief}>
                Let Ju read this
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case PROCESSING_STEP:
        return (
          <StepCard className="text-center">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full bg-primary/20 blur-lg"
                style={{ animation: "glow-pulse 2.4s ease-in-out infinite" }}
                aria-hidden
              />
              <img
                src={juMain}
                alt=""
                className="relative h-16 w-16 object-contain"
                style={{ animation: "ju-float 2.8s ease-in-out infinite" }}
              />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">
              {firstName ? `Ju is sitting with what you shared, ${firstName}…` : "Ju is sitting with what you shared…"}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ju is turning it into a read that sounds like <em>you</em> — not a template.
            </p>
            <div className="mt-6 space-y-3 text-left">
              {[
                "Tracing what hurts most beneath the surface",
                "Noticing what kind of presence feels safest for you",
                firstName
                  ? `Writing a read that uses ${firstName}'s emotional context, not copy for everyone`
                  : "Writing a read that uses your name and emotional context",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background px-4 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </StepCard>
        );

      case RESULT_STEP:
        return (
          <StepCard>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Ju Gets You</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">{teaser.headline}</h2>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  This is Ju's first read on the part of your emotional weight that has been hardest to say out loud.
                </p>
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/6 px-4 py-2 text-sm font-semibold text-primary">
                {teaser.stateLabel}
              </div>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.75rem] border border-primary/20 bg-primary/6 px-5 py-5">
                <p className="text-sm font-semibold text-foreground">What Ju notices first</p>
                <p className="mt-3 text-[15px] leading-8 text-foreground">{teaser.mirror}</p>
              </div>
              <div className="rounded-[1.75rem] border border-border/60 bg-background px-5 py-5">
                <p className="text-sm font-semibold text-foreground">Why this fits</p>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{teaser.whyItFits}</p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.75rem] border border-border/60 bg-background px-5 py-5">
              <p className="text-sm font-semibold text-foreground">What Ju would help with first</p>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{teaser.firstSupportMove}</p>
              <div className="mt-5 space-y-3">
                {teaser.supportSignals.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <PrimaryButton onClick={completeStep}>
                Keep going
                <ChevronRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case BRIDGE_STEP:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Keep this feeling open</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">
              {firstName
                ? `${firstName}, this is your first read. The deeper care starts when Ju can stay.`
                : "This is your first read. The deeper care starts when Ju can stay."}
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">{teaser.continuationLine}</p>
            <div className="mt-7 grid gap-3">
              {[
                firstName
                  ? `Ju remembers how this catches in you, ${firstName}, so the next heavy moment does not have to start from scratch.`
                  : "Ju remembers how this catches in you, so the next heavy moment does not have to start from scratch.",
                "Support that begins from your real emotional pattern instead of generic comfort that misses the point.",
                "Turn being understood into something you can reach for before the next hard moment gets bigger.",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-border/60 bg-background px-5 py-5">
                  <p className="text-sm leading-7 text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep}>Show me how Ju stays</PrimaryButton>
            </div>
          </StepCard>
        );

      case PAYWALL_STEP:
      default:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Keep Ju close</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">
              {firstName
                ? `${firstName}, keep the version of Ju that already gets you.`
                : "Keep the version of Ju that already gets you."}
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              {firstName
                ? `Start gentle, ${firstName}. Try Ju fully for ${trialDays} days — no charge if it is not for you.`
                : `Start gentle. Try Ju fully for ${trialDays} days — no charge if it is not for you.`}
            </p>

            {checkoutError ? (
              <div className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm text-destructive">
                {checkoutError}
              </div>
            ) : null}

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {paywallPlans.map((plan) => {
                const selected = funnelState.answers.selectedPlan === plan.id;
                const isLoading = checkoutLoading === plan.id;
                const available = isConfiguredProduct(plan.id);
                const isLifetime = plan.id === "lifetime_one_time";

                return (
                  <div
                    key={plan.id}
                    className={`rounded-[1.8rem] border p-5 transition-all ${
                      isLifetime
                        ? "border-primary/40 bg-[linear-gradient(180deg,rgba(245,241,255,0.97),rgba(255,255,255,0.99))] shadow-[0_24px_60px_-28px_rgba(124,110,219,0.5)] dark:border-[#9385F6]/50 dark:bg-[radial-gradient(circle_at_top,rgba(156,137,255,0.22),transparent_45%),linear-gradient(180deg,#201934_0%,#161124_100%)] dark:text-white"
                        : "border-primary/25 bg-primary/[0.04] shadow-[0_18px_42px_-26px_rgba(124,110,219,0.35)] dark:border-white/10 dark:bg-white/[0.03]"
                    } ${selected ? "ring-2 ring-primary/40" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-lg font-semibold ${isLifetime ? "text-foreground dark:text-white" : "text-foreground"}`}>
                          {plan.title}
                        </p>
                        <p className={`mt-4 text-4xl font-bold tracking-tight ${isLifetime ? "text-foreground dark:text-white" : "text-foreground"}`}>
                          {plan.priceDisplay}
                        </p>
                        <p className={`mt-1 text-sm font-medium ${isLifetime ? "text-muted-foreground dark:text-white/72" : "text-muted-foreground"}`}>
                          {plan.unit}
                        </p>
                        {plan.secondaryLine ? (
                          <p className={`mt-2 text-xs ${isLifetime ? "text-muted-foreground dark:text-white/60" : "text-muted-foreground"}`}>
                            {plan.secondaryLine}
                          </p>
                        ) : null}
                      </div>
                      {plan.badge ? (
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                            isLifetime
                              ? "bg-primary/12 text-primary dark:bg-white/12 dark:text-white"
                              : "bg-primary/12 text-primary"
                          }`}
                        >
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className={`mt-4 text-sm font-semibold ${isLifetime ? "text-foreground dark:text-white" : "text-foreground"}`}>
                      {plan.emphasis}
                    </p>
                    <p className={`mt-2 text-sm leading-7 ${isLifetime ? "text-muted-foreground dark:text-white/78" : "text-muted-foreground"}`}>
                      {plan.note}
                    </p>

                    {isLifetime ? (
                      <LifetimeScarcityMeter className="mt-4" scarcity={lifetimeScarcity} />
                    ) : null}

                    <div className="mt-6">
                      <PrimaryButton
                        className={
                          isLifetime
                            ? "bg-[linear-gradient(135deg,#9385F6,#6F5FE8)] text-white hover:shadow-[0_18px_35px_-18px_rgba(124,110,219,0.75)] dark:bg-[linear-gradient(135deg,#9B8FFF,#7767EA)]"
                            : ""
                        }
                        onClick={() => handleCheckout(plan.id)}
                        disabled={!available || Boolean(checkoutLoading)}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {!available ? "Coming soon" : plan.ctaLabel}
                      </PrimaryButton>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleContinueFree}
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Maybe later, continue free
              </button>
            </div>
          </StepCard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,110,219,0.18),_transparent_38%),linear-gradient(180deg,#f8f6ff_0%,#ffffff_46%,#f6f4ff_100%)] px-4 py-6 dark:bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-4xl flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            disabled={funnelState.step === 0 || funnelState.step === PROCESSING_STEP}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/90 text-muted-foreground transition-all disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="w-full max-w-[420px]">
            <ProgressBar step={funnelState.step} />
          </div>
          <Link
            to={ROUTES.LANDING}
            className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
            onClick={() => {
              completedRef.current = true;
            }}
          >
            Exit
          </Link>
        </div>

        <div className="mb-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {PHASE_LABELS[funnelState.step] || `Step ${Math.min(funnelState.step + 1, TOTAL_STEPS)} of ${TOTAL_STEPS}`}
          </p>
        </div>

        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={funnelState.step}
              className="w-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;

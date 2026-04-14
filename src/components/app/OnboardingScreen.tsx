import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const VALID_PLANS: Exclude<FunnelPlan, null>[] = ["weekly", "yearly", "lifetime_one_time"];

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

const StepCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

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
  const [checkoutLoading, setCheckoutLoading] = useState<Exclude<FunnelPlan, null> | null>(null);
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

  const getProductId = (plan: Exclude<FunnelPlan, null>) => {
    switch (plan) {
      case "weekly":
        return PRICING_CONFIG.products.weekly;
      case "yearly":
        return PRICING_CONFIG.products.yearly;
      case "lifetime_one_time":
        return PRICING_CONFIG.products.lifetime_one_time;
      default:
        return "";
    }
  };

  const isConfiguredProduct = (plan: Exclude<FunnelPlan, null>) => {
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

  async function handleCheckout(plan: Exclude<FunnelPlan, null>) {
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
          plan,
          source: funnelState.answers.source,
          country: geo.country,
          coupon_code: geo.couponCode || undefined,
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

  const paywallPlans: Array<{
    id: Exclude<FunnelPlan, null>;
    title: string;
    price: string;
    unit: string;
    badge?: string;
    note: string;
    emphasis: string;
  }> = [
    {
      id: "weekly",
      title: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      unit: "Start softly, week by week",
      note: "Best if you want Ju with you now and want to begin with the lightest commitment.",
      emphasis: "A gentle first yes",
    },
    {
      id: "yearly",
      title: "Annual",
      price: geo.formatPrice(geo.rates.yearly),
      unit: "Keep Ju close all year",
      badge: yearlySavings > 0 ? `Save ${yearlySavings}%` : "Best value",
      note: "Best if you already know this kind of support belongs in your life consistently.",
      emphasis: "The clearest long-term value",
    },
    {
      id: "lifetime_one_time",
      title: "Lifetime",
      price: geo.formatPrice(geo.rates.lifetime),
      unit: "Keep Ju close for good",
      badge: "Limited offer",
      note: "One payment for the people who already feel the fit and do not want renewals hanging over it later.",
      emphasis: "The strongest yes if Ju already feels right",
    },
  ];

  const renderResonanceStep = (stepIndex: number) => {
    const prompt = RESONANCE_PROMPTS[stepIndex];
    return (
      <StepCard className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step {stepIndex + 11}</p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Does this feel true for you?</h2>
        <div className="mt-8 rounded-[2rem] border border-border/60 bg-background px-6 py-10">
          <p className="text-xl font-semibold leading-9 text-foreground">{prompt}</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {RESONANCE_PROMPTS.map((_, index) => (
            <span key={index} className={`h-2.5 w-2.5 rounded-full ${index <= stepIndex ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <SecondaryButton onClick={() => handleResonance(prompt, false)}>Not really</SecondaryButton>
          <PrimaryButton onClick={() => handleResonance(prompt, true)}>That feels true</PrimaryButton>
        </div>
      </StepCard>
    );
  };

  const renderStep = () => {
    switch (funnelState.step) {
      case 0:
        return (
          <StepCard className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-inner">
              <img src={juMain} alt="Ju" className="h-14 w-14 object-contain" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">Let Ju understand what has been heavy</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-foreground">
              When you feel a lot and cannot explain it, Ju helps you feel understood.
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              This starts with a few honest choices, then Ju gives you a personal emotional read that is built from what you shared.
            </p>
            <div className="mt-8 rounded-[1.85rem] border border-primary/18 bg-primary/6 px-5 py-5 text-left">
              <p className="text-sm font-semibold text-foreground">The first win is simple</p>
              <p className="mt-3 text-lg font-semibold leading-8 text-foreground">
                Feeling understood before you have everything figured out.
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Ju listens for what feels heavy, what feels lonely, and what kind of support would help first.
              </p>
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={completeStep}>
                Start
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 1:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 1</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What has been feeling the heaviest lately?</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Choose the one that feels closest to what has been sitting on your chest.
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 2</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What feels hardest when this hits?</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Choose the ones that feel true. This helps Ju understand why it has felt so hard to carry alone.
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 3</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">How often do you feel misunderstood in moments like this?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 4</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">When does this usually hit the hardest?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 5</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What usually stops you from opening up fully?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 6</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What do you need most from Ju first?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 7</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Who is Ju speaking to?</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Add your name and email so the read can feel like it is speaking to you, not at you.
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 8</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What do you wish someone understood without you having to spell it out?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 9</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What has carrying this been costing you most lately?</h2>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 10</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What kind of presence helps you open up most honestly?</h2>
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
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 14</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">How are you arriving right now?</h2>
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
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 15</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">If Ju helps in the right way, what should you feel first?</h2>
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">Ju is reading what has been heavy...</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ju is turning what you shared into a read that sounds like you, not like everyone else.
            </p>
            <div className="mt-6 space-y-3 text-left">
              {[
                "Tracing what hurts most beneath the surface",
                "Noticing what kind of presence feels safest for you",
                "Writing a read that uses your name and emotional context",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background px-4 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
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
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">This only gets more valuable when Ju can stay with you.</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">{teaser.continuationLine}</p>
            <div className="mt-7 grid gap-3">
              {[
                "Come back when the same weight returns and Ju still remembers where it tends to catch in you.",
                "Get support that starts from your real emotional pattern instead of generic comfort that misses the point.",
                "Turn this first feeling of being understood into something you can reach for before the next hard moment gets bigger.",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-border/60 bg-background px-5 py-5">
                  <p className="text-sm leading-7 text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep}>Show me the plans</PrimaryButton>
            </div>
          </StepCard>
        );

      case PAYWALL_STEP:
      default:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Choose your plan</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Keep the version of Ju that gets you.</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              You have already felt the first read. Choose how you want this kind of support to stay with you from here.
            </p>

            {checkoutError ? (
              <div className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm text-destructive">
                {checkoutError}
              </div>
            ) : null}

            <div className="mt-7 grid gap-4 xl:grid-cols-3">
              {paywallPlans.map((plan) => {
                const selected = funnelState.answers.selectedPlan === plan.id;
                const isLoading = checkoutLoading === plan.id;
                const available = isConfiguredProduct(plan.id);

                return (
                  <div
                    key={plan.id}
                    className={`rounded-[1.8rem] border p-5 transition-all ${
                      plan.id === "lifetime_one_time"
                        ? "border-primary/40 bg-[linear-gradient(180deg,rgba(245,241,255,0.97),rgba(255,255,255,0.99))] shadow-[0_24px_60px_-28px_rgba(124,110,219,0.5)] dark:border-[#9385F6]/50 dark:bg-[radial-gradient(circle_at_top,rgba(156,137,255,0.22),transparent_45%),linear-gradient(180deg,#201934_0%,#161124_100%)] dark:text-white"
                        : plan.id === "yearly"
                          ? "border-primary/18 bg-primary/[0.03] dark:border-white/10 dark:bg-white/[0.03]"
                          : "border-border/60 bg-background dark:border-white/10 dark:bg-white/[0.02]"
                    } ${selected ? "shadow-md shadow-primary/10" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-lg font-semibold ${plan.id === "lifetime_one_time" ? "text-foreground dark:text-white" : "text-foreground"}`}>
                          {plan.title}
                        </p>
                        <p className={`mt-4 text-4xl font-bold tracking-tight ${plan.id === "lifetime_one_time" ? "text-foreground dark:text-white" : "text-foreground"}`}>
                          {plan.price}
                        </p>
                        <p className={`mt-1 text-sm font-medium ${plan.id === "lifetime_one_time" ? "text-muted-foreground dark:text-white/72" : "text-muted-foreground"}`}>
                          {plan.unit}
                        </p>
                      </div>
                      {plan.badge ? (
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                            plan.id === "lifetime_one_time"
                              ? "bg-primary/12 text-primary dark:bg-white/12 dark:text-white"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className={`mt-4 text-sm font-semibold ${plan.id === "lifetime_one_time" ? "text-foreground dark:text-white" : "text-foreground"}`}>
                      {plan.emphasis}
                    </p>
                    <p className={`mt-2 text-sm leading-7 ${plan.id === "lifetime_one_time" ? "text-muted-foreground dark:text-white/78" : "text-muted-foreground"}`}>
                      {plan.note}
                    </p>

                    {plan.id === "lifetime_one_time" ? (
                      <LifetimeScarcityMeter className="mt-4" scarcity={lifetimeScarcity} />
                    ) : null}

                    <div className="mt-6">
                      <PrimaryButton
                        className={
                          plan.id === "lifetime_one_time"
                            ? "bg-[linear-gradient(135deg,#9385F6,#6F5FE8)] text-white hover:shadow-[0_18px_35px_-18px_rgba(124,110,219,0.75)] dark:bg-[linear-gradient(135deg,#9B8FFF,#7767EA)]"
                            : "!border !border-[#DDD8EA] !bg-[#F1EEF7] !text-[#31284F] hover:!bg-[#E6E0F2] hover:shadow-[0_12px_24px_-18px_rgba(45,37,80,0.35)] dark:!border-white/10 dark:!bg-white/10 dark:!text-white"
                        }
                        onClick={() => handleCheckout(plan.id)}
                        disabled={!available || Boolean(checkoutLoading)}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {!available ? "Coming soon" : selected ? `Continue with ${plan.title}` : `Choose ${plan.title}`}
                      </PrimaryButton>
                    </div>
                  </div>
                );
              })}
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
            Step {Math.min(funnelState.step + 1, TOTAL_STEPS)} of {TOTAL_STEPS}
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

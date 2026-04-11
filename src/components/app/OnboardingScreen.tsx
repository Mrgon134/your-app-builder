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
  Lock,
  Mail,
  Shield,
  TrendingUp,
  UserRound,
} from "lucide-react";

import juMain from "@/assets/ju-main.webp";
import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { supabase, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { saveAuthIntent } from "@/lib/auth-intent";
import { updateProfile } from "@/lib/api";
import { PRICING_CONFIG } from "@/lib/config";
import {
  buildResultTeaser,
  clearFunnelState,
  createDefaultFunnelState,
  FunnelPlan,
  loadFunnelState,
  OnboardingFunnelState,
  saveFunnelState,
} from "@/lib/onboarding-funnel";
import { ROUTES } from "@/lib/routes";

const TOTAL_STEPS = 12;
const PROCESSING_STEP = 7;
const AUTH_STEP = 8;
const RESULT_STEP = 10;
const PAYWALL_STEP = 11;

const STEP_KEYS = [
  "entry",
  "goal",
  "struggles",
  "consistency",
  "focus",
  "style",
  "resonance",
  "processing",
  "auth",
  "baseline",
  "result",
  "paywall",
] as const;

const GOAL_OPTIONS = [
  {
    id: "overwhelmed",
    title: "Everything feels like too much",
    description: "My mind feels crowded and I need help holding what is hitting me.",
    icon: Heart,
  },
  {
    id: "unseen",
    title: "I want to feel understood",
    description: "I want something that gets what I mean without making me explain it perfectly.",
    icon: BrainCircuit,
  },
  {
    id: "disconnected",
    title: "I feel far from myself",
    description: "I want help understanding what is really going on inside me.",
    icon: TrendingUp,
  },
  {
    id: "spiraling",
    title: "My thoughts keep spiraling",
    description: "I need help slowing the noise down before it takes over the whole moment.",
    icon: Shield,
  },
] as const;

const STRUGGLE_OPTIONS = [
  { id: "overthinking", label: "By the time I try to explain it, my thoughts are already running in circles." },
  { id: "time", label: "When it hits, I need support fast. I do not have energy for a whole process." },
  { id: "blank", label: "I know I feel something, but I go blank when I try to put it into words." },
  { id: "privacy", label: "I hold a lot in because I do not feel understood easily." },
  { id: "consistency", label: "I want support, but I disappear when life or emotions get heavy." },
] as const;

const CONSISTENCY_OPTIONS = [
  { id: "rarely", label: "Only once in a while, but when it happens it still really stings" },
  { id: "sometimes", label: "Sometimes I feel understood, but not in the moments I need it most" },
  { id: "often", label: "Pretty often. A lot of what I feel stays stuck inside me" },
] as const;

const FOCUS_OPTIONS = [
  { id: "name_it", label: "Help me name what I am actually feeling" },
  { id: "calm_me", label: "Help me calm the emotional noise down" },
  { id: "stay_with_me", label: "Stay with me gently until I can breathe again" },
  { id: "show_pattern", label: "Show me what pattern this might be part of" },
] as const;

const STYLE_OPTIONS = [
  { id: "gentle", label: "Soft and reassuring", blurb: "I open up more when I feel handled gently." },
  { id: "direct", label: "Clear and honest", blurb: "I still want warmth, but I do not want vague comfort." },
  { id: "private", label: "Quiet and low-pressure", blurb: "I need it to feel private before I can be real." },
  { id: "guided", label: "Held with a little structure", blurb: "A few thoughtful prompts make it easier for me to start." },
] as const;

const RESONANCE_PROMPTS = [
  "Sometimes I do not need advice first. I need to feel like something actually understands what is happening inside me.",
  "When my mind gets loud, the hardest part is finding words for it before the feeling gets even bigger.",
  "If something could make me feel understood quickly, I would trust it enough to keep coming back.",
] as const;

const BASELINE_OPTIONS = [
  { id: "drained", label: "Drained and stretched thin" },
  { id: "holding", label: "Holding a lot in" },
  { id: "coping", label: "Getting by, but not really settled" },
  { id: "hopeful", label: "Hopeful and ready for something steadier" },
] as const;

const VALID_PLANS: Exclude<FunnelPlan, null>[] = ["weekly", "yearly", "lifetime_one_time"];

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

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const geo = useGeoPricing();
  const events = usePostHogEvents();
  const { user, signUp } = useAuth();

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
  const [resonanceIndex, setResonanceIndex] = useState(() =>
    Math.min(initialState.answers.resonance.length, RESONANCE_PROMPTS.length - 1),
  );
  const [emailPassword, setEmailPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<Exclude<FunnelPlan, null> | null>(null);
  const [profileSynced, setProfileSynced] = useState(false);
  const startTrackedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    saveFunnelState(funnelState);
  }, [funnelState]);

  useEffect(() => {
    if (!startTrackedRef.current) {
      startTrackedRef.current = true;
      events.trackFunnelStart(funnelState.answers.source);
    }
  }, [events, funnelState.answers.source]);

  useEffect(() => {
    if (funnelState.step !== PROCESSING_STEP) return;

    const timer = window.setTimeout(() => {
      setFunnelState((prev) => ({ ...prev, step: AUTH_STEP }));
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [funnelState.step]);

  useEffect(() => {
    if (funnelState.step === AUTH_STEP) {
      events.trackFunnelAuthShown(funnelState.answers.source);
    }

    if (funnelState.step === RESULT_STEP) {
      const teaser = buildResultTeaser(funnelState.answers);
      events.trackFunnelResultShown(teaser.stateLabel, funnelState.answers.source, user?.id || null);
    }

    if (funnelState.step === PAYWALL_STEP) {
      events.trackFunnelPaywallShown(funnelState.answers.source, user?.id || null);
    }
  }, [events, funnelState.answers, funnelState.step, user?.id]);

  useEffect(() => {
    if (!user || funnelState.step !== AUTH_STEP) return;

    setFunnelState((prev) => ({
      ...prev,
      step: AUTH_STEP + 1,
      answers: {
        ...prev.answers,
        authCaptured: true,
        email: prev.answers.email || user.email || "",
      },
    }));
    events.trackFunnelAuthCompleted("session", funnelState.answers.source, user.id);
  }, [events, funnelState.answers.source, funnelState.step, user]);

  useEffect(() => {
    if (!user || profileSynced || !funnelState.answers.name.trim()) return;

    updateProfile(user.id, {
      display_name: funnelState.answers.name.trim(),
      onboarded: true,
    } as never)
      .then(() => setProfileSynced(true))
      .catch(() => {
        // The funnel can continue even if profile sync fails.
      });
  }, [funnelState.answers.name, profileSynced, user]);

  useEffect(() => {
    return () => {
      if (!completedRef.current) {
        events.trackFunnelAbandoned(STEP_KEYS[funnelState.step] || "unknown", funnelState.answers.source, user?.id || null);
      }
    };
  }, [events, funnelState.answers.source, funnelState.step, user?.id]);

  const teaser = buildResultTeaser(funnelState.answers);
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
    setFunnelState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
  };

  const handleResonance = (matches: boolean) => {
    const prompt = RESONANCE_PROMPTS[resonanceIndex];
    if (matches && prompt && !funnelState.answers.resonance.includes(prompt)) {
      setAnswers({ resonance: [...funnelState.answers.resonance, prompt] });
    }

    if (resonanceIndex >= RESONANCE_PROMPTS.length - 1) {
      completeStep();
      return;
    }

    setResonanceIndex((prev) => prev + 1);
  };

  const startGoogleAuth = async () => {
    setGoogleLoading(true);
    setAuthError("");

    saveAuthIntent({
      source: "onboarding",
      resumePath: ROUTES.ONBOARDING,
      plan: funnelState.answers.selectedPlan || undefined,
    });
    saveFunnelState(funnelState);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + ROUTES.AUTH_CALLBACK,
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      setAuthError(error.message || "Google sign-in failed.");
      setGoogleLoading(false);
      return;
    }

    events.trackFunnelAuthCompleted("google_redirect", funnelState.answers.source, user?.id || null);
  };

  const submitEmailCapture = async () => {
    setAuthError("");
    setAuthMessage("");

    if (!funnelState.answers.name.trim() || !funnelState.answers.email.trim()) {
      setAuthError("Add your name and email so Ju can save your result.");
      return;
    }

    setAnswers({ authCaptured: true });

    if (user) {
      events.trackFunnelAuthCompleted("existing_session", funnelState.answers.source, user.id);
      completeStep();
      return;
    }

    if (!emailPassword.trim()) {
      completeStep();
      return;
    }

    setEmailLoading(true);
    const { error } = await signUp(
      funnelState.answers.email.trim(),
      emailPassword,
      funnelState.answers.name.trim(),
    );
    setEmailLoading(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    setAuthMessage("Check your email if you do not get signed in instantly. Ju has already saved your result here.");
    completeStep();
  };

  const handleCheckout = async (plan: Exclude<FunnelPlan, null>) => {
    setAnswers({ selectedPlan: plan });
    events.trackFunnelPlanSelected(plan, funnelState.answers.source, user?.id || null);

    if (!user) {
      saveAuthIntent({
        source: "onboarding",
        plan,
        resumePath: ROUTES.ONBOARDING,
      });
      navigate(`${ROUTES.AUTH}?mode=signup`);
      return;
    }

    if (!isConfiguredProduct(plan)) {
      setAuthError("This plan is not configured yet. Add the matching Dodo product ID first.");
      return;
    }

    setCheckoutLoading(plan);
    events.trackFunnelCheckoutStarted(plan, funnelState.answers.source, user.id);

    try {
      await updateProfile(user.id, {
        display_name: funnelState.answers.name.trim() || null,
        onboarded: true,
      } as never);

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/dodo-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          variant_id: getProductId(plan),
          user_id: user.id,
          user_email: user.email,
          user_name: funnelState.answers.name.trim() || user.email?.split("@")[0] || "User",
          country: geo.country,
          coupon_code: geo.couponCode || undefined,
        }),
      });

      if (!resp.ok) {
        throw new Error("Checkout could not be created.");
      }

      const data = await resp.json();
      completedRef.current = true;
      events.trackFunnelCheckoutCompleted(plan, funnelState.answers.source, user.id);
      window.open(data.url, "_blank");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setCheckoutLoading(null);
    }
  };

  const finishWithoutUpgrade = async () => {
    if (!user) {
      completedRef.current = true;
      clearFunnelState();
      navigate(ROUTES.LANDING);
      return;
    }

    try {
      await updateProfile(user.id, { onboarded: true } as never);
    } catch {
      // Ignore profile update errors and continue to the app.
    }

    completedRef.current = true;
    clearFunnelState();
    navigate(ROUTES.APP);
  };

  const paywallPlans: Array<{
    id: Exclude<FunnelPlan, null>;
    title: string;
    price: string;
    unit: string;
    badge?: string;
    highlight?: boolean;
    note: string;
  }> = [
    {
      id: "weekly",
      title: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      unit: "/week",
      note: "For when you want support now, but still want to stay cautious.",
    },
    {
      id: "yearly",
      title: "Annual",
      price: geo.formatPrice(geo.rates.yearly),
      unit: "/year",
      badge: yearlySavings > 0 ? `Save ${yearlySavings}%` : "Best value",
      highlight: false,
      note: "For when you want Ju in your life long enough to really feel the difference.",
    },
    {
      id: "lifetime_one_time",
      title: "Lifetime",
      price: geo.formatPrice(geo.rates.lifetime),
      unit: "one-time",
      badge: "One-time",
      note: "For when you already know this is the kind of support you want to keep.",
    },
  ];

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
              A few quick choices help Ju notice what is really going on underneath the noise, so the first result already feels personal.
            </p>
            <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
              {[
                "Fast enough for a heavy moment",
                "Built to feel deeply personal",
                "Made to help you feel understood quickly",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border/60 bg-background px-4 py-4 text-sm text-foreground">
                  {item}
                </div>
              ))}
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
              {GOAL_OPTIONS.map((option) => {
                const Icon = option.icon;
                const active = funnelState.answers.goal === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ goal: option.id })}
                    className={`rounded-[1.75rem] border p-5 text-left transition-all ${
                      active ? "border-primary bg-primary/8 shadow-sm" : "border-border/60 bg-background hover:border-primary/30"
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-foreground">{option.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{option.description}</p>
                  </button>
                );
              })}
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
              Choose the ones that feel true. This helps Ju understand why it has been hard to carry on your own.
            </p>
            <div className="mt-7 space-y-3">
              {STRUGGLE_OPTIONS.map((option) => {
                const active = funnelState.answers.struggles.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      setAnswers({
                        struggles: active
                          ? funnelState.answers.struggles.filter((item) => item !== option.id)
                          : [...funnelState.answers.struggles, option.id],
                      })
                    }
                    className={`flex w-full items-center gap-3 rounded-[1.5rem] border px-4 py-4 text-left transition-all ${
                      active ? "border-primary bg-primary/8" : "border-border/60 bg-background hover:border-primary/30"
                    }`}
                  >
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-primary bg-primary" : "border-border"}`}>
                      {active ? <Check className="h-3.5 w-3.5 text-primary-foreground" /> : null}
                    </div>
                    <p className="text-sm leading-7 text-foreground">{option.label}</p>
                  </button>
                );
              })}
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
              {CONSISTENCY_OPTIONS.map((option) => {
                const active = funnelState.answers.consistency === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ consistency: option.id })}
                    className={`rounded-[1.5rem] border px-5 py-5 text-left transition-all ${
                      active ? "border-primary bg-primary/8" : "border-border/60 bg-background hover:border-primary/30"
                    }`}
                  >
                    <p className="text-base font-semibold text-foreground">{option.label}</p>
                  </button>
                );
              })}
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
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What kind of support do you wish you had right now?</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {FOCUS_OPTIONS.map((option) => {
                const active = funnelState.answers.focus === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ focus: option.id })}
                    className={`rounded-[1.5rem] border px-5 py-5 text-left transition-all ${
                      active ? "border-primary bg-primary/8" : "border-border/60 bg-background hover:border-primary/30"
                    }`}
                  >
                    <p className="text-base font-semibold text-foreground">{option.label}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.focus}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 5:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 5</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">What kind of presence helps you open up?</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {STYLE_OPTIONS.map((option) => {
                const active = funnelState.answers.style === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ style: option.id })}
                    className={`rounded-[1.75rem] border p-5 text-left transition-all ${
                      active ? "border-primary bg-primary/8" : "border-border/60 bg-background hover:border-primary/30"
                    }`}
                  >
                    <p className="text-lg font-semibold text-foreground">{option.label}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{option.blurb}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.style}>
                Continue
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 6:
        return (
          <StepCard className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 6</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Does this feel familiar?</h2>
            <div className="mt-8 rounded-[2rem] border border-border/60 bg-background px-6 py-10">
              <p className="text-xl font-semibold leading-9 text-foreground">{RESONANCE_PROMPTS[resonanceIndex]}</p>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {RESONANCE_PROMPTS.map((_, index) => (
                <span
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full ${index <= resonanceIndex ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <SecondaryButton onClick={() => handleResonance(false)}>Not really</SecondaryButton>
              <PrimaryButton onClick={() => handleResonance(true)}>That feels true</PrimaryButton>
            </div>
          </StepCard>
        );

      case 7:
        return (
          <StepCard className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">Ju is reading your pattern...</h2>
            <div className="mt-6 space-y-3 text-left">
              {[
                "Noticing what has been heaviest for you lately",
                "Understanding what kind of support feels safest",
                "Shaping a result that feels surprisingly personal",
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

      case 8:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 7</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Save what Ju noticed</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Add your name and email so Ju can keep this reading with you and bring it back the next time you need it.
            </p>

            <div className="mt-7 grid gap-3">
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  value={funnelState.answers.name}
                  onChange={(event) => setAnswers({ name: event.target.value })}
                  placeholder="Your name or nickname"
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
              {!user && (
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="password"
                    value={emailPassword}
                    onChange={(event) => setEmailPassword(event.target.value)}
                    placeholder="Create a password now if you want (optional)"
                    className="h-14 w-full rounded-2xl border border-border/60 bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              )}
            </div>

            {user && (
              <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/6 px-4 py-4 text-sm text-foreground">
                You are already signed in, so Ju can keep this with your account right away.
              </div>
            )}

            {authError && (
              <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm text-destructive">
                {authError}
              </div>
            )}

            {authMessage && (
              <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/6 px-4 py-4 text-sm text-foreground">
                {authMessage}
              </div>
            )}

            <div className="mt-7 grid gap-3">
              <PrimaryButton onClick={submitEmailCapture} disabled={emailLoading}>
                {emailLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Continue
              </PrimaryButton>
              {!user && (
                <SecondaryButton onClick={startGoogleAuth} disabled={googleLoading}>
                  {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Continue with Google
                </SecondaryButton>
              )}
            </div>
          </StepCard>
        );

      case 9:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Step 8</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">How are you arriving right now?</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {BASELINE_OPTIONS.map((option) => {
                const active = funnelState.answers.baseline === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers({ baseline: option.id })}
                    className={`rounded-[1.5rem] border px-5 py-5 text-left transition-all ${
                      active ? "border-primary bg-primary/8" : "border-border/60 bg-background hover:border-primary/30"
                    }`}
                  >
                    <p className="text-base font-semibold text-foreground">{option.label}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-7">
              <PrimaryButton onClick={completeStep} disabled={!funnelState.answers.baseline}>
                Show my result
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 10:
        return (
          <StepCard>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Ju Gets You</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">{teaser.headline}</h2>
                <p className="mt-3 text-base leading-8 text-muted-foreground">
                  This is the emotional state Ju thinks you are in right now, based on what you shared.
                </p>
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/6 px-4 py-2 text-sm font-semibold text-primary">
                {teaser.stateLabel}
              </div>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.75rem] border border-border/60 bg-background px-5 py-5">
                <p className="text-sm font-semibold text-foreground">Why Ju thinks this fits</p>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{teaser.whyItFits}</p>
              </div>
              <div className="rounded-[1.75rem] border border-primary/20 bg-primary/6 px-5 py-5">
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
            </div>

            <div className="mt-7 rounded-[1.75rem] border border-border/60 bg-background px-5 py-5">
                <p className="text-sm font-semibold text-foreground">What opens up next</p>
              <p className="mt-2 text-sm leading-8 text-muted-foreground">
                {teaser.continuationLine}
              </p>
            </div>

            <div className="mt-7">
              <PrimaryButton onClick={completeStep}>
                See ways to continue
                <ChevronRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </StepCard>
        );

      case 11:
      default:
        return (
          <StepCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Choose your plan</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Keep the version of Ju that gets you</h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              Ju has already started reading what is heavy for you. Choose how closely you want that support to stay with you from here.
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Weekly is the cautious start, Annual is the strongest value, and Lifetime is for people who already know this kind of support fits.
            </p>

            {authError && (
              <div className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm text-destructive">
                {authError}
              </div>
            )}

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
                        ? "border-primary/35 bg-[linear-gradient(180deg,rgba(245,241,255,0.96),rgba(255,255,255,0.99))] shadow-[0_20px_50px_-24px_rgba(124,110,219,0.38)]"
                        : plan.highlight
                          ? "border-primary/30 bg-primary/6"
                          : "border-border/60 bg-background"
                    } ${selected ? "shadow-md shadow-primary/10" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-foreground">{plan.title}</p>
                        <p className="mt-1 text-3xl font-bold text-foreground">
                          {plan.price}
                          <span className="ml-1 text-sm font-medium text-muted-foreground">{plan.unit}</span>
                        </p>
                      </div>
                      {plan.badge ? (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.note}</p>

                    {plan.id === "lifetime_one_time" && (
                      <LifetimeScarcityMeter
                        className="mt-4"
                        scarcity={lifetimeScarcity}
                      />
                    )}

                    <div className="mt-5">
                      <PrimaryButton
                        className={
                          plan.id === "lifetime_one_time"
                            ? "bg-[linear-gradient(135deg,#7C6EDB,#6A58D8)] text-white hover:shadow-[0_18px_35px_-18px_rgba(124,110,219,0.75)]"
                            : "!border !border-border/70 !bg-[#EAE8F2] !text-[#2A2342] hover:!bg-[#DED9ED] hover:shadow-sm"
                        }
                        onClick={() => handleCheckout(plan.id)}
                        disabled={!available || Boolean(checkoutLoading)}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {selected ? `Continue with ${plan.title}` : `Choose ${plan.title}`}
                      </PrimaryButton>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <SecondaryButton onClick={finishWithoutUpgrade}>
                {user ? "Continue with limited access" : "Not now"}
              </SecondaryButton>
              {!user && (
                <SecondaryButton
                  onClick={() => {
                    saveAuthIntent({ source: "onboarding", resumePath: ROUTES.ONBOARDING });
                    navigate(`${ROUTES.AUTH}?mode=login`);
                  }}
                >
                  Sign in instead
                </SecondaryButton>
              )}
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Weekly is the lightest start, Annual gives the best value, and Lifetime is the one-time premium path.
            </p>
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

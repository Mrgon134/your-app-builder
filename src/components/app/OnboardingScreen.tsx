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
  UserRound,
} from "lucide-react";

import juGood from "@/assets/ju-good.webp";
import juGreat from "@/assets/ju-great.webp";
import juLow from "@/assets/ju-low.webp";
import juMain from "@/assets/ju-main.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { updateProfile } from "@/lib/api";
import { saveAuthIntent } from "@/lib/auth-intent";
import { PRICING_CONFIG } from "@/lib/config";
import {
  buildResultTeaser,
  createDefaultFunnelState,
  loadFunnelState,
  OnboardingFunnelState,
  ResultTeaser,
  saveFunnelState,
} from "@/lib/onboarding-funnel";
import { persistOnboardingLead, requestOnboardingReveal } from "@/lib/onboarding-reveal";
import { isIOS, isNative } from "@/lib/platform";
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

type CheckoutPlan = "weekly" | "three_month" | "lifetime_one_time";
const VALID_PLANS: CheckoutPlan[] = ["weekly", "three_month", "lifetime_one_time"];

interface OnboardingVisualScene {
  accent: string;
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  quote: string;
  chips: string[];
}

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
  14: "Getting your read ready",
  15: "Getting your read ready",
  16: "Holding what you shared...",
  17: "Your first read",
  18: "Keeping support close",
  19: "Keeping support close",
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

const getStepPercent = (step: number) => Math.round(((step + 1) / TOTAL_STEPS) * 100);

const getVisualBars = (step: number, compact = false) => {
  const base = compact ? [34, 58, 42, 72, 50] : [32, 54, 44, 68, 50, 78, 46];

  return base.map((value, index) => 26 + ((value + step * 9 + index * 11) % (compact ? 46 : 58)));
};

const SignalBars: React.FC<{ step: number; accent: string; compact?: boolean }> = ({ step, accent, compact = false }) => {
  const bars = getVisualBars(step, compact);

  return (
    <div className={`flex items-end ${compact ? "h-12 gap-1.5" : "h-24 gap-2"}`} aria-hidden="true">
      {bars.map((height, index) => (
        <motion.span
          key={`${step}-${index}`}
          className="block flex-1 rounded-full bg-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]"
          initial={{ height: `${compact ? 18 : 22}%`, opacity: 0.35 }}
          animate={{ height: `${height}%`, opacity: 1 }}
          transition={{ duration: 0.7, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(180deg, ${accent}F2 0%, rgba(255,255,255,0.72) 100%)`,
            boxShadow: `0 10px 24px -18px ${accent}`,
          }}
        />
      ))}
    </div>
  );
};

const ProgressBar: React.FC<{ step: number }> = ({ step }) => (
  <div className="w-full">
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/60 shadow-[inset_4px_4px_10px_rgba(124,110,219,0.09),inset_-4px_-4px_10px_rgba(255,255,255,0.92)]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#8f82ea_0%,#7c6edb_48%,#4ecdc4_100%)]"
          animate={{ width: `${getStepPercent(step)}%` }}
          transition={{ type: "spring", stiffness: 250, damping: 28 }}
        />
      </div>
      <span className="min-w-[3.25rem] text-right text-[11px] font-semibold text-[#746B8F]">
        {step + 1}/{TOTAL_STEPS}
      </span>
    </div>
    <div
      className="mt-2 grid gap-1"
      style={{ gridTemplateColumns: `repeat(${TOTAL_STEPS}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <motion.span
          key={index}
          className="h-1.5 rounded-full"
          animate={{
            backgroundColor: index <= step ? "#7C6EDB" : "rgba(124,110,219,0.14)",
            opacity: index <= step ? 1 : 0.7,
          }}
          transition={{ duration: 0.25 }}
        />
      ))}
    </div>
  </div>
);

const StepCard: React.FC<{ children: React.ReactNode; className?: string; tint?: string }> = ({
  children,
  className = "",
  tint = "",
}) => (
  <div
    className={`nuju-neu-surface relative overflow-hidden rounded-[2rem] p-6 backdrop-blur-xl ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.42),rgba(255,255,255,0)_44%,rgba(78,205,196,0.05))]" aria-hidden />
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
      className="absolute inset-[-8px] rounded-full border border-white/70 bg-white/45 shadow-[inset_5px_5px_14px_rgba(124,110,219,0.08),inset_-5px_-5px_14px_rgba(255,255,255,0.9)]"
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

const OnboardingCompanionVisual: React.FC<{ scene: OnboardingVisualScene; step: number }> = ({ scene, step }) => {
  const percent = getStepPercent(step);
  const phaseIndex = Math.min(5, Math.floor((step / (TOTAL_STEPS - 1)) * 6));

  return (
    <aside
      className="nuju-neu-surface hero-ambient-field relative hidden min-h-[620px] overflow-hidden rounded-[2.75rem] p-6 backdrop-blur-2xl lg:block"
      aria-hidden="true"
      style={{ "--scene-accent": scene.accent } as React.CSSProperties}
    >
      <div className="absolute inset-0 hero-grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.58),rgba(255,255,255,0)_42%,rgba(78,205,196,0.08)_72%,rgba(255,255,255,0.46))]" />

      <motion.div
        key={`${step}-${scene.title}`}
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full flex-col"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="nuju-soft-button inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
            <span className="h-2 w-6 rounded-full" style={{ backgroundColor: scene.accent }} />
            {scene.eyebrow}
          </div>
          <div className="rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-[11px] font-bold text-[#746B8F] shadow-sm">
            {step + 1} of {TOTAL_STEPS}
          </div>
        </div>

        <div className="nuju-neu-pressed relative mt-7 min-h-[330px] overflow-hidden rounded-[2.4rem] border border-white/50">
          <div className="absolute inset-0 story-ambient-field opacity-95" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 360" fill="none" aria-hidden="true">
            <motion.path
              key={`path-${step}`}
              d="M48 232 C128 128 192 298 276 174 C354 58 402 170 476 96"
              stroke={scene.accent}
              strokeWidth="16"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.18 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              key={`path-soft-${step}`}
              d="M42 266 C116 196 182 262 252 212 C330 156 390 236 480 176"
              stroke="#4ECDC4"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.12 }}
              animate={{ pathLength: 1, opacity: 0.28 }}
              transition={{ duration: 1.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className="relative z-10 flex min-h-[330px] flex-col justify-between p-6">
            <div className="mx-auto mt-4 flex h-48 w-48 items-center justify-center rounded-full border border-white/75 bg-white/42 shadow-[inset_12px_12px_30px_rgba(124,110,219,0.08),inset_-12px_-12px_30px_rgba(255,255,255,0.92)]">
              <motion.div
                className="flex h-36 w-36 items-center justify-center rounded-full border border-white/75 bg-white/56"
                animate={{ scale: [1, 1.035, 1], rotate: [0, 1.5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={scene.image}
                  alt=""
                  className="h-28 w-28 object-contain drop-shadow-[0_22px_32px_rgba(80,63,153,0.18)]"
                  style={{ animation: "ju-float 3.4s ease-in-out infinite" }}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-[1fr_0.82fr] items-end gap-4">
              <div className="rounded-[1.5rem] border border-white/70 bg-white/58 p-4 shadow-[0_18px_42px_-34px_rgba(80,63,153,0.58)] backdrop-blur-xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#746B8F]">Emotional signal</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{scene.quote}</p>
              </div>
              <SignalBars step={step} accent={scene.accent} />
            </div>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="font-serif text-4xl font-semibold leading-tight text-foreground">
            {scene.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {scene.body}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {scene.chips.map((chip) => (
            <span
              key={chip}
              className="nuju-soft-button rounded-2xl px-3 py-2 text-center text-[11px] font-semibold"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="nuju-neu-pressed mt-auto rounded-[1.75rem] p-4">
          <div className="flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#746B8F]">
            <span>Story opened</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.span
                key={index}
                className="h-2 rounded-full"
                animate={{
                  backgroundColor: index <= phaseIndex ? scene.accent : "rgba(124,110,219,0.14)",
                  scaleX: index === phaseIndex ? 1.08 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

const OnboardingMiniCompanion: React.FC<{ scene: OnboardingVisualScene; step: number }> = ({ scene, step }) => (
  <motion.div
    key={`${step}-${scene.eyebrow}-mini`}
    className="nuju-neu-surface hero-ambient-field mb-4 overflow-hidden rounded-[1.75rem] p-3 lg:hidden"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    aria-hidden="true"
  >
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/58 shadow-[inset_5px_5px_14px_rgba(124,110,219,0.08),inset_-5px_-5px_14px_rgba(255,255,255,0.88)]">
        <img src={scene.image} alt="" className="h-10 w-10 object-contain" style={{ animation: "ju-float 3.4s ease-in-out infinite" }} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.18em] text-[#746B8F]">{scene.eyebrow}</p>
        <p className="mt-1 truncate text-sm font-semibold text-foreground">{scene.quote}</p>
      </div>
      <div className="w-20">
        <SignalBars step={step} accent={scene.accent} compact />
      </div>
    </div>
  </motion.div>
);

const personalize = (line: string, firstName: string) =>
  firstName ? line.replace(/\{name\}/g, firstName) : line.replace(/\{name\}, ?/g, "").replace(/, \{name\}/g, "");

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`nuju-brand-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
  />
);

const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`nuju-soft-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] ${className}`}
  />
);

const MultiSelectButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-[1.5rem] border px-4 py-4 text-left transition-all active:scale-[0.99] ${
      active ? "nuju-neu-pressed border-primary/35 bg-primary/8" : "nuju-neu-surface border-white/70 hover:-translate-y-0.5"
    }`}
  >
    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? "border-primary bg-primary" : "border-primary/20 bg-white/60"}`}>
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
    className={`rounded-[1.75rem] border p-5 text-left transition-all active:scale-[0.99] ${
      active ? "nuju-neu-pressed border-primary/35 bg-primary/8" : "nuju-neu-surface border-white/70 hover:-translate-y-0.5"
    }`}
  >
    {Icon ? (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/62 shadow-[inset_4px_4px_10px_rgba(124,110,219,0.07),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]">
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
  const tiktok = useTikTokPixel();
  const { user } = useAuth();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const source = query.get("source") || "landing";
  const planFromQuery = query.get("plan");
  const normalizedQueryPlan = planFromQuery === "yearly" || planFromQuery === "yearly_trial" ? "three_month" : planFromQuery;
  const preferredPlan = VALID_PLANS.includes(normalizedQueryPlan as CheckoutPlan)
    ? (normalizedQueryPlan as CheckoutPlan)
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
  const paywallTrackedKeyRef = useRef("");

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
      const selectedPlan = funnelState.answers.selectedPlan;
      const paywallKey = `${funnelState.sessionId}:${funnelState.answers.source}`;

      if (paywallTrackedKeyRef.current !== paywallKey) {
        paywallTrackedKeyRef.current = paywallKey;
        events.trackFunnelPaywallShown(funnelState.answers.source, user?.id || null);
        tiktok.trackPaywallView(funnelState.answers.source, selectedPlan);
      }
    }
  }, [events, funnelState.answers, funnelState.sessionId, funnelState.step, reveal, tiktok, user?.id]);

  useEffect(() => {
    if (funnelState.step !== PROCESSING_STEP || processingStartedRef.current) return;

    processingStartedRef.current = true;
    setCheckoutError("");

    let cancelled = false;
    let settled = false;
    const showReveal = (nextReveal: ResultTeaser) => {
      if (cancelled || settled) return;
      settled = true;
      setReveal(nextReveal);
      setFunnelState((prev) => ({ ...prev, step: RESULT_STEP }));
      processingStartedRef.current = false;
    };

    const fallbackTimer = window.setTimeout(() => {
      showReveal(buildResultTeaser(funnelState.answers));
    }, 7500);

    const timer = window.setTimeout(async () => {
      const nextReveal = await requestOnboardingReveal({
        sessionId: funnelState.sessionId,
        answers: funnelState.answers,
        userId: user?.id || null,
      });

      window.clearTimeout(fallbackTimer);
      showReveal(nextReveal);
    }, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(fallbackTimer);
      processingStartedRef.current = false;
    };
  }, [funnelState.answers, funnelState.sessionId, funnelState.step, user?.id]);

  const teaser = reveal || buildResultTeaser(funnelState.answers);
  const threeMonthSavings = Math.max(0, Math.round((1 - geo.rates.threeMonth / (geo.rates.weekly * 13)) * 100));
  const useNativeStoreKit = isNative() && isIOS();
  const threeMonthTrialEnabled = PRICING_CONFIG.trial.threeMonthIntroOfferEnabled;
  const threeMonthTrialDays = PRICING_CONFIG.trial.threeMonthDays;

  const getProductId = (plan: CheckoutPlan) => {
    switch (plan) {
      case "weekly":
        return PRICING_CONFIG.products.weekly;
      case "three_month":
        return PRICING_CONFIG.products.three_month;
      case "lifetime_one_time":
        return PRICING_CONFIG.products.lifetime_one_time;
      default:
        return "";
    }
  };

  const isConfiguredProduct = (plan: CheckoutPlan) => {
    if (useNativeStoreKit) return true;
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
      setContactError("Add a name or nickname so this can feel personal.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError("Add an email so your read can be saved for you.");
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

  const planForBackend = (plan: CheckoutPlan): "weekly" | "three_month" | "lifetime_one_time" => plan;

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
      setCheckoutError("Add your name first so this stays personal.");
      return;
    }

    if (!checkoutEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutEmail)) {
      setCheckoutError("Add the email you want to use with Ju.");
      return;
    }

    if (!isConfiguredProduct(plan)) {
      setCheckoutError("This plan is not ready yet. Pick another way to keep Ju close for now.");
      return;
    }

    setCheckoutLoading(plan);
    events.trackFunnelCheckoutStarted(plan, funnelState.answers.source, user?.id || null);
    tiktok.trackCheckoutStarted(plan, funnelState.answers.source);

    let checkoutWindow: Window | null = null;

    try {
      if (!useNativeStoreKit) {
        // Open during the click gesture so mobile browsers do not block the
        // Dodo checkout redirect after the async lead save finishes.
        checkoutWindow = window.open("about:blank", "_blank");
      }

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

      if (useNativeStoreKit) {
        saveAuthIntent({
          source: "onboarding",
          screen: "pro",
          plan,
          resumePath: ROUTES.APP,
          checkoutEmail,
          checkoutName,
        });
        completedRef.current = true;
        navigate(user ? `${ROUTES.APP}?screen=pro` : `${ROUTES.AUTH}?mode=signup`);
        return;
      }

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
        }),
      });

      if (!response.ok) {
        checkoutWindow?.close();
        throw new Error("Checkout could not be created.");
      }

      const data = await response.json();
      if (!data.url) {
        checkoutWindow?.close();
        throw new Error("Checkout could not open. Try again in a moment.");
      }

      completedRef.current = true;
      if (checkoutWindow) {
        checkoutWindow.location.href = data.url;
      } else {
        window.location.assign(data.url);
      }
    } catch (error) {
      checkoutWindow?.close();
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not open. Try again in a moment.");
    } finally {
      setCheckoutLoading(null);
    }
  }

  const firstName = funnelState.answers.name.trim();
  const onboardingScene = useMemo<OnboardingVisualScene>(() => {
    if (funnelState.step === 0) {
      return {
        accent: "#7C6EDB",
        image: juMain,
        eyebrow: "Start soft",
        title: "This can start gently.",
        body: "No polished story needed. Just one honest click at a time, until the weight starts to feel less shapeless.",
        quote: "No perfect words yet. Just enough truth to begin.",
        chips: ["Quick start", "Private start", "No pressure"],
      };
    }

    if (funnelState.step <= 6) {
      return {
        accent: "#6C9BCF",
        image: juLow,
        eyebrow: "Listening mode",
        title: "Ju is learning the shape of what feels heavy.",
        body: "These early answers help Ju meet the real moment, without asking you to explain everything perfectly.",
        quote: "You can be unclear and still be understood.",
        chips: ["Low effort", "Emotion-first", "Finding the shape"],
      };
    }

    if (funnelState.step === CONTACT_STEP) {
      return {
        accent: "#7C6EDB",
        image: juMain,
        eyebrow: "Make it yours",
        title: "A personal read needs a personal anchor.",
        body: "Your name helps Ju speak to you more naturally. Your email keeps the read waiting if you come back later.",
        quote: "This is where the read starts feeling like yours.",
        chips: ["Saved for you", "Private by default", "Easy to return"],
      };
    }

    if (funnelState.step <= 10) {
      return {
        accent: "#E8878C",
        image: juRough,
        eyebrow: "Under the surface",
        title: "The hidden cost deserves a softer place to land.",
        body: "Ju is paying attention to when this shows up, what it touches, and what kind of presence helps you feel safer.",
        quote: "The part that is hardest to say is usually the part that needs the softest room.",
        chips: ["What it touches", "Less alone", "Warm honesty"],
      };
    }

    if (funnelState.step <= 13) {
      return {
        accent: "#FFB347",
        image: juOkay,
        eyebrow: "Resonance check",
        title: "Notice the line that makes you pause.",
        body: "These are small mirrors. Choose by feeling, not by trying to get it right.",
        quote: "If one line feels close, you do not have to explain why yet.",
        chips: ["Read slowly", "Choose by feeling", "No perfect answer"],
      };
    }

    if (funnelState.step <= 15) {
      return {
        accent: "#95E1D3",
        image: juGood,
        eyebrow: "Almost ready",
        title: "Ju is tuning the read to the state you are in now.",
        body: "Your energy matters. The read should meet the version of you who is here right now.",
        quote: "The goal is a first feeling of relief, not a perfect insight.",
        chips: ["Your pace", "Relief first", "Almost there"],
      };
    }

    if (funnelState.step === PROCESSING_STEP) {
      return {
        accent: "#7C6EDB",
        image: juMain,
        eyebrow: "Taking this in",
        title: "Ju is holding the thread with care.",
        body: "This small pause helps the read stay gentle, specific, and close to what you shared.",
        quote: "A careful answer can take one quiet breath.",
        chips: ["Reading gently", "Finding the thread", "Almost ready"],
      };
    }

    if (funnelState.step === RESULT_STEP) {
      return {
        accent: "#4ECDC4",
        image: juGreat,
        eyebrow: teaser.stateLabel,
        title: "This is what Ju heard underneath it.",
        body: "A warm first read on the part of the weight that has been hard to say out loud.",
        quote: teaser.headline,
        chips: ["Seen clearly", "Pattern named", "First support"],
      };
    }

    if (funnelState.step === BRIDGE_STEP) {
      return {
        accent: "#95E1D3",
        image: juGood,
        eyebrow: "Keep the thread",
        title: "Stay with the part of you that finally felt seen.",
        body: "You have a read that belongs to this moment. Ju can keep that thread close for the next time the feeling returns.",
        quote: "The next heavy moment should not have to meet you alone.",
        chips: ["Keep the thread", "Come back softly", "Ready when it hits"],
      };
    }

    return {
      accent: "#7C6EDB",
      image: juGreat,
      eyebrow: "Keep the quiet open",
        title: "Keep Ju close for the moments you usually carry alone.",
        body: "Choose the path that lets Ju stay close enough to become a place you can return to when you need it.",
        quote: "A softer place can stay within reach.",
      chips: [threeMonthTrialEnabled ? `${threeMonthTrialDays}-day trial` : "3-month rhythm", "Return anytime", "Private support"],
    };
  }, [funnelState.step, teaser.headline, teaser.stateLabel, threeMonthTrialDays, threeMonthTrialEnabled]);

  type PaywallPlanCard = {
    id: CheckoutPlan;
    title: string;
    priceDisplay: string;
    unit: string;
    secondaryLine?: string;
    badge?: string;
    note: string;
    emphasis: string;
    features: string[];
    ctaLabel: string;
    recommended?: boolean;
  };

  const paywallPlans: PaywallPlanCard[] = [
    {
      id: "weekly",
      title: "Weekly",
      priceDisplay: geo.formatPrice(geo.rates.weekly),
      unit: "per week",
      badge: "Flexible",
      emphasis: firstName
        ? `${firstName}, keep Ju close for the week ahead.`
        : "Keep Ju close for the week ahead.",
      note: `${geo.formatPrice(geo.rates.weekly)} billed weekly. Cancel anytime in Apple Subscriptions.`,
      features: ["Saved read and voice notes", "Cancel anytime"],
      ctaLabel: "Start weekly",
    },
    {
      id: "three_month",
      title: "3 Month",
      priceDisplay: geo.formatPrice(geo.rates.threeMonth),
      unit: "every 3 months",
      secondaryLine: threeMonthSavings > 0 ? `About ${threeMonthSavings}% less than staying weekly.` : undefined,
      badge: threeMonthTrialEnabled ? `${threeMonthTrialDays}-day trial` : "Recommended",
      emphasis: firstName
        ? threeMonthTrialEnabled
          ? `${firstName}, take one quiet week and see how it feels.`
          : `${firstName}, keep Ju close long enough for it to feel familiar.`
        : threeMonthTrialEnabled
          ? "Take one quiet week and see how it feels."
          : "Keep Ju close long enough for it to feel familiar.",
      note: threeMonthTrialEnabled
        ? `${threeMonthTrialDays} days free for eligible users, then ${geo.formatPrice(geo.rates.threeMonth)} every 3 months. Cancel anytime in Apple Subscriptions.`
        : `${geo.formatPrice(geo.rates.threeMonth)} every 3 months. Cancel anytime in Apple Subscriptions.`,
      features: ["Saved read and voice notes", "More room to settle in", "Clear renewal terms"],
      ctaLabel: threeMonthTrialEnabled ? `Start ${threeMonthTrialDays}-day free trial` : "Choose 3 Month",
      recommended: true,
    },
    {
      id: "lifetime_one_time",
      title: "Lifetime",
      priceDisplay: geo.formatPrice(geo.rates.lifetime),
      unit: "one payment",
      badge: "No renewals",
      emphasis: firstName
        ? `${firstName}, keep Ju close without another renewal.`
        : "Keep Ju close without another renewal.",
      note: `${geo.formatPrice(geo.rates.lifetime)} one-time purchase. No subscription renewal.`,
      features: ["One payment", "Future updates"],
      ctaLabel: "Keep Ju for life",
    },
  ];
  const selectedPaywallPlan =
    paywallPlans.find((plan) => plan.id === funnelState.answers.selectedPlan) ||
    paywallPlans.find((plan) => plan.recommended && isConfiguredProduct(plan.id)) ||
    paywallPlans.find((plan) => isConfiguredProduct(plan.id)) ||
    paywallPlans.find((plan) => plan.recommended) ||
    paywallPlans[0];
  const selectedPlanAvailable = isConfiguredProduct(selectedPaywallPlan.id);

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
              When it is heavy and hard to explain, Ju starts by listening first.
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              A few honest answers, then Ju reflects the feeling back in words that are easier to hold.
            </p>
            <div className="mt-8 rounded-[1.85rem] border border-primary/20 bg-primary/[0.06] px-5 py-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What you get first</p>
              <p className="mt-3 text-lg font-semibold leading-8 text-foreground">
                Being understood before you have anything figured out.
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
              Pick whichever feel true. You can choose more than one. Ju is listening for the whole shape of it.
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
              This helps Ju understand how often you need support.
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
              Whatever it is, it just shows Ju where to be gentle first.
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
              Whatever you choose, Ju will start there slowly, nothing else asked of you.
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
              Give this read a place to return to
            </h2>
            <p className="mt-3 text-center text-base leading-8 text-muted-foreground">
              Your name helps Ju speak to you more naturally. Your email keeps the read saved for when you come back.
            </p>
            <div className="mt-7 grid gap-3">
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  value={funnelState.answers.name}
                  onChange={(event) => setAnswers({ name: event.target.value })}
                  placeholder="Your first name or nickname"
                  className="nuju-neu-pressed h-14 w-full rounded-2xl border border-white/70 bg-white/50 pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <input
                  type="email"
                  value={funnelState.answers.email}
                  onChange={(event) => setAnswers({ email: event.target.value })}
                  placeholder="Email"
                  className="nuju-neu-pressed h-14 w-full rounded-2xl border border-white/70 bg-white/50 pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/30 focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>
            <div className="nuju-soft-button mt-4 rounded-2xl px-4 py-4 text-sm leading-7 text-[#5c547f]">
              This keeps the read close to you without adding pressure to explain more than you want to.
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
                "{name}, what do you wish someone would just know without you having to spell it out?",
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
              So Ju can understand what this has been touching.
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
              Ju will match the tone that feels easiest to trust.
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
                ? `${firstName}, before Ju finishes your read, how are you arriving right now?`
                : "Before Ju finishes your read, how are you arriving right now?"}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              This helps Ju meet the way you really feel right now.
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
                ? `${firstName}, what is the first thing you want to feel from this?`
                : "What is the first thing you want to feel from this?"}
            </h2>
            <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
              Choose the feeling you want Ju to protect first.
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
              {firstName ? `Ju is making room for what you shared, ${firstName}...` : "Ju is making room for what you shared..."}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Ju is shaping a first read around what felt heaviest.
            </p>
            <div className="mt-6 space-y-3 text-left">
              {[
                "Making the feeling easier to hold",
                "Finding the safest place to begin",
                firstName
                  ? `Keeping ${firstName}'s words close`
                  : "Keeping your words close",
              ].map((item) => (
                <div key={item} className="nuju-soft-button flex items-center gap-3 rounded-2xl px-4 py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 shadow-[inset_3px_3px_8px_rgba(124,110,219,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.9)]">
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
                  This is Ju's first read on the part that has been hard to put into words.
                </p>
              </div>
              <div className="rounded-full border border-primary/20 bg-primary/6 px-4 py-2 text-sm font-semibold text-primary">
                {teaser.stateLabel}
              </div>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="nuju-neu-pressed rounded-[1.75rem] border border-primary/20 px-5 py-5">
                <p className="text-sm font-semibold text-foreground">What Ju notices first</p>
                <p className="mt-3 text-[15px] leading-8 text-foreground">{teaser.mirror}</p>
              </div>
              <div className="nuju-soft-button rounded-[1.75rem] px-5 py-5 text-left">
                <p className="text-sm font-semibold text-foreground">Why this fits</p>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{teaser.whyItFits}</p>
              </div>
            </div>

            <div className="nuju-soft-button mt-4 rounded-[1.75rem] px-5 py-5 text-left">
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Keep the thread close</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">
              {firstName
                ? `${firstName}, this is the moment to keep what felt clear within reach.`
                : "This is the moment to keep what felt clear within reach."}
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              {teaser.continuationLine} Ju can stay close for the next heavy moment, so you do not have to begin from zero again.
            </p>
            <div className="mt-6 grid gap-2">
              {[
                firstName
                  ? `When the feeling comes back, Ju keeps your place, ${firstName}.`
                  : "When the feeling comes back, Ju keeps your place.",
                "The goal is not more journaling pressure. It is a softer place to land when your head gets crowded.",
                threeMonthTrialEnabled
                  ? `${threeMonthTrialDays} days gives you room to feel whether Ju becomes something you naturally reach for.`
                  : "A three-month rhythm gives Ju room to become something you naturally reach for.",
              ].map((item) => (
                <div key={item} className="nuju-soft-button rounded-[1.35rem] px-4 py-4">
                  <p className="text-sm leading-6 text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <PrimaryButton onClick={completeStep}>See options</PrimaryButton>
            </div>
          </StepCard>
        );

      case PAYWALL_STEP:
      default:
        return (
          <StepCard className="mx-auto max-w-md overflow-hidden p-0">
            <div className="hero-ambient-field relative h-36 overflow-hidden border-b border-white/70">
              <div className="absolute inset-0 hero-demo-field opacity-60" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(250,249,246,0.94))]" />
              <div className="absolute left-5 top-5 max-w-[9.75rem] sm:max-w-[12rem]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#746B8F]">Your read is open</p>
                <p className="mt-2 text-xl font-semibold leading-tight text-foreground">
                  Keep this softer place within reach.
                </p>
              </div>
              <img
                src={juGreat}
                alt=""
                className="absolute bottom-2 right-7 h-24 w-24 object-contain drop-shadow-[0_18px_30px_rgba(80,63,153,0.18)]"
              />
            </div>

            <div className="px-4 pb-4 pt-3">
              <h2 className="text-center font-serif text-[1.55rem] font-bold leading-tight text-foreground">
                {firstName ? `${firstName}, keep Ju close.` : "Keep Ju close."}
              </h2>
              <p className="mx-auto mt-1 max-w-[19rem] text-center text-xs leading-5 text-muted-foreground">
                Start with a quiet week. See whether Ju becomes the place you reach for when your head gets crowded.
              </p>

              <div className="mt-3 space-y-2">
                {[
                  "Keep this read saved and easy to return to",
                  "Come back when the feeling gets loud again",
                  "Let Ju remember the thread so you do not start over",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 text-xs leading-5 text-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {checkoutError ? (
                <div className="mt-3 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-3 text-sm text-destructive">
                  {checkoutError}
                </div>
              ) : null}

              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {paywallPlans.map((plan) => {
                  const selected = plan.id === selectedPaywallPlan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setAnswers({ selectedPlan: plan.id })}
                      disabled={!isConfiguredProduct(plan.id)}
                      className={`relative min-h-[76px] rounded-xl border px-1.5 py-2 text-center transition-all active:scale-[0.98] disabled:opacity-50 ${
                        selected
                          ? "nuju-neu-pressed border-primary/35 bg-primary/[0.08]"
                          : "nuju-soft-button border-white/70"
                      }`}
                    >
                      {plan.recommended ? (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFD166] px-2 py-0.5 text-[8px] font-bold uppercase text-[#5c547f]">
                          Trial
                        </span>
                      ) : null}
                      <span className="block text-[11px] font-bold text-foreground">{plan.title}</span>
                      <span className="mt-1 block text-xs font-semibold text-foreground">{plan.priceDisplay}</span>
                      <span className="mt-0.5 block text-[9px] leading-3 text-muted-foreground">
                        {plan.id === "lifetime_one_time" ? "once" : plan.unit}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="nuju-neu-pressed mt-3 rounded-2xl border border-primary/15 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-foreground">{selectedPaywallPlan.badge || "Selected"}</span>
                  {selectedPaywallPlan.id === "three_month" && threeMonthTrialEnabled ? (
                    <span className="text-xs font-semibold text-primary">No charge today if eligible</span>
                  ) : null}
                </div>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{selectedPaywallPlan.emphasis}</p>
                {selectedPaywallPlan.secondaryLine ? (
                  <p className="mt-1 text-[11px] font-semibold text-primary">{selectedPaywallPlan.secondaryLine}</p>
                ) : null}
              </div>

              <PrimaryButton
                className="mt-3 py-3.5"
                onClick={() => handleCheckout(selectedPaywallPlan.id)}
                disabled={!selectedPlanAvailable || Boolean(checkoutLoading)}
              >
                {checkoutLoading === selectedPaywallPlan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {!selectedPlanAvailable ? "Not ready yet" : selectedPaywallPlan.ctaLabel}
              </PrimaryButton>

              <p className="mt-2 text-center text-[10px] leading-4 text-muted-foreground">
                {selectedPaywallPlan.note}
              </p>

              <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-medium text-muted-foreground">
                <Link to={ROUTES.TERMS} className="underline-offset-4 hover:text-foreground hover:underline">Terms</Link>
                <span aria-hidden="true">-</span>
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:text-foreground hover:underline"
                >
                  EULA
                </a>
                <span aria-hidden="true">-</span>
                <Link to={ROUTES.PRIVACY} className="underline-offset-4 hover:text-foreground hover:underline">Privacy</Link>
              </div>

              <button
                type="button"
                onClick={handleContinueFree}
                className="mt-2 w-full text-center text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Not now, continue free
              </button>
            </div>
          </StepCard>
        );
    }
  };

  return (
    <div className={`onboarding-page-field min-h-[100dvh] bg-[#FAF9F6] px-4 dark:bg-background ${funnelState.step === PAYWALL_STEP ? "py-3 sm:py-6" : "py-6"}`}>
      <div className={`mx-auto flex w-full max-w-6xl flex-col ${funnelState.step === PAYWALL_STEP ? "min-h-[calc(100dvh-1.5rem)] sm:min-h-[calc(100dvh-3rem)]" : "min-h-[calc(100dvh-3rem)]"}`}>
        <div className={`flex items-center justify-between gap-4 ${funnelState.step === PAYWALL_STEP ? "mb-4" : "mb-6"}`}>
          <button
            onClick={goBack}
            disabled={funnelState.step === 0 || funnelState.step === PROCESSING_STEP}
            className="nuju-soft-button flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all disabled:opacity-40"
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

        <div className={funnelState.step === PAYWALL_STEP ? "sr-only" : "mb-5 text-center"}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {PHASE_LABELS[funnelState.step] || `Step ${Math.min(funnelState.step + 1, TOTAL_STEPS)} of ${TOTAL_STEPS}`}
          </p>
        </div>

        <div className={`grid flex-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] ${funnelState.step === PAYWALL_STEP ? "items-start sm:items-center" : "items-center"}`}>
          <OnboardingCompanionVisual scene={onboardingScene} step={funnelState.step} />
          <div className="flex min-w-0 flex-col justify-center">
            {funnelState.step !== PAYWALL_STEP ? (
              <OnboardingMiniCompanion scene={onboardingScene} step={funnelState.step} />
            ) : null}
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
    </div>
  );
};

export default OnboardingScreen;

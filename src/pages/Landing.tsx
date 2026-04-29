import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Globe2,
  Heart,
  Lock,
  Mic,
  PenLine,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import HeroPatternPreview from "@/components/landing/HeroPatternPreview";
import SEOHead from "@/components/SEOHead";
import { Magnetic } from "@/components/ui/Magnetic";
import juMain from "@/assets/ju-main.webp";
import juRough from "@/assets/ju-rough.webp";
import juLow from "@/assets/ju-low.webp";
import juOkay from "@/assets/ju-okay.webp";
import juGood from "@/assets/ju-good.webp";
import juGreat from "@/assets/ju-great.webp";
import stickerDiary from "@/assets/sticker-diary.webp";
import stickerZen from "@/assets/sticker-zen.webp";
import heroAura from "@/assets/generated/nuju-hero-aura.webp";
import revealRibbon from "@/assets/generated/nuju-reveal-ribbon.webp";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { PRICING_CONFIG } from "@/lib/config";
import { ROUTES } from "@/lib/routes";

type PlanId = "weekly" | "three_month" | "lifetime_one_time";

type IconCopy = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const proofSignals: IconCopy[] = [
  {
    title: "Mood tap to begin",
    body: "No blank-page stare. Tap how it really is, then say the messy part.",
    icon: PenLine,
  },
  {
    title: "One sentence that fits",
    body: "Ju reads between the lines and reflects what is underneath.",
    icon: Heart,
  },
  {
    title: "A small next move",
    body: "Leave with one next step small enough to actually do.",
    icon: TrendingUp,
  },
];

const moodCharacters = [
  {
    label: "Rough",
    line: "when it is loud",
    image: juRough,
    color: "#e8878c",
  },
  {
    label: "Low",
    line: "when you are holding it",
    image: juLow,
    color: "#6c9bcf",
  },
  {
    label: "Okay",
    line: "when it is steady",
    image: juOkay,
    color: "#ffb347",
  },
  {
    label: "Good",
    line: "when softness returns",
    image: juGood,
    color: "#4aa99f",
  },
  {
    label: "Great",
    line: "when you feel back",
    image: juGreat,
    color: "#3ca9a3",
  },
];

const bentoItems = [
  {
    title: "Check in without performing",
    body: "Tap a mood, talk for 30 seconds, or write one honest sentence. Ju meets you there.",
    icon: Mic,
    className: "lg:col-span-5",
  },
  {
    title: "One private emotional read",
    body: "The reveal gives you the sentence you were circling around, in language that sounds like yours.",
    icon: BrainCircuit,
    className: "lg:col-span-7",
  },
  {
    title: "Mood patterns that stay human",
    body: "Your week gets painted in softer context, not judged as a streak of good and bad days.",
    icon: TrendingUp,
    className: "lg:col-span-7",
  },
  {
    title: "Private by default",
    body: "Your check-ins and reflections stay attached to your account and your choices.",
    icon: Lock,
    className: "lg:col-span-5",
  },
];

const benefits: IconCopy[] = [
  {
    title: "No blank-page pressure",
    body: "Start with a mood, not an essay. Nuju helps you find the first honest sentence.",
    icon: Sparkles,
  },
  {
    title: "Feels like a friend, not a clipboard",
    body: "The tone is warm first, then useful. It is built to land when your brain feels loud.",
    icon: ShieldCheck,
  },
  {
    title: "Fast enough for hard days",
    body: "The first reveal is intentionally short, so support can start before the spiral gets bigger.",
    icon: Zap,
  },
  {
    title: "Support you can return to",
    body: "If it fits, Ju becomes a quiet place to check in, write, and notice what keeps repeating.",
    icon: Heart,
  },
];

const howSteps: IconCopy[] = [
  {
    title: "Say the messy part",
    body: "Tap a mood, then speak or write the sentence you would normally keep editing.",
    icon: Mic,
  },
  {
    title: "See the Ju Gets You reveal",
    body: "Ju reflects the pattern under the noise with one sentence that finally fits.",
    icon: BrainCircuit,
  },
  {
    title: "Choose how Ju stays",
    body: "Start free. Stay weekly, for 3 months, or lifetime only if the reveal feels right.",
    icon: Check,
  },
];

const whatYouGetItems: IconCopy[] = [
  {
    title: "Personal reveal",
    body: "One sentence that names what you have been circling around.",
    icon: Sparkles,
  },
  {
    title: "Private writing",
    body: "A low-pressure place to keep the thoughts you do not want to perform.",
    icon: PenLine,
  },
  {
    title: "Mood-aware support",
    body: "Ju adapts the tone and next step to what you are carrying.",
    icon: Heart,
  },
  {
    title: "Patterns over time",
    body: "Watch your week become easier to read without turning it into homework.",
    icon: TrendingUp,
  },
];

const comparisonRows = [
  {
    label: "The first move",
    nuju: "One mood tap starts the session.",
    journal: "You stare at the blank page and try to manufacture insight.",
  },
  {
    label: "The first win",
    nuju: "The reveal gives you one sentence that fits.",
    journal: "You finish writing and still wonder what it meant.",
  },
  {
    label: "What happens next",
    nuju: "Ju gives one small next move.",
    journal: "You decide the next move alone.",
  },
  {
    label: "Low-energy days",
    nuju: "Built for the moment your brain feels loud.",
    journal: "The effort is yours again tomorrow.",
  },
];

const comparisonReadLinks = [
  {
    href: "/blog/best-ai-journaling-apps",
    label: "Category guide",
    title: "Best AI journaling apps",
    body: "Compare Nuju with other AI journals on privacy, mood tracking, and the quality of the first reveal.",
  },
  {
    href: "/blog/daylio-alternatives",
    label: "Alternative guide",
    title: "Best Daylio alternatives",
    body: "Useful if mood logging alone is not enough and you want words that land.",
  },
  {
    href: "/blog/reflectly-alternatives",
    label: "Alternative guide",
    title: "Best Reflectly alternatives",
    body: "For people who want something more personal than prompts and streaks.",
  },
];

const landingFaqs = [
  {
    q: "Do I need to pay before I can use Nuju?",
    a: "No. Start with the Ju Gets You reveal first. If the fit feels real after that, you can keep Ju close with weekly, 3-month, or lifetime access.",
  },
  {
    q: "What happens in the reveal?",
    a: "You tap a mood, speak or write what is heavy, then Ju reflects the emotional pattern underneath with one sentence that finally fits.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Nuju is built around private journaling. Your entries and reveal stay attached to your account and your choices.",
  },
  {
    q: "Can I use voice instead of typing?",
    a: "Yes. Voice and text both work, so you can talk when your hands are tired or type when you need more control.",
  },
  {
    q: "What plans are available if I want Ju to stay with me?",
    a: "You can continue weekly, choose a 3-month subscription, or unlock lifetime access with one payment.",
  },
];

const SectionHeader = ({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "center";
}) => (
  <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f66c9]">{eyebrow}</p>
    <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">{title}</h2>
    <p className="mt-5 text-base leading-8 text-zinc-600 sm:text-lg">{body}</p>
  </div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const geo = useGeoPricing();
  const ttk = useTikTokPixel();
  const { snapshot: lifetimeScarcity } = useLifetimeScarcity();
  const { trackLandingView, trackFunnelStart, trackPricingView } = usePostHogEvents();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const threeMonthTrialEnabled = PRICING_CONFIG.trial.threeMonthIntroOfferEnabled;
  const threeMonthTrialDays = PRICING_CONFIG.trial.threeMonthDays;

  const howItWorksRef = useRef<HTMLElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const hasTrackedPricingViewRef = useRef(false);

  useEffect(() => {
    trackLandingView();
    ttk.trackPageView();
  }, [trackLandingView, ttk]);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHowItWorks = () =>
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToPricing = () =>
    pricingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const startOnboarding = (plan?: PlanId) => {
    const params = new URLSearchParams({ source: "landing" });

    trackFunnelStart("landing");
    ttk.trackWaitlistSignup();

    if (plan) {
      params.set("plan", plan);
      ttk.trackAddToCart(plan);
    }

    navigate(`${ROUTES.ONBOARDING}?${params.toString()}`);
  };

  const handlePricingVisible = () => {
    if (hasTrackedPricingViewRef.current) return;
    hasTrackedPricingViewRef.current = true;
    trackPricingView(null);
    ttk.trackPricingView();
  };

  const pricingCards = [
    {
      name: "Start free",
      price: "$0",
      unit: "",
      badge: "No card",
      note: "Try the reveal first. Keep private writing open without paying.",
      cta: "Start free",
      features: ["Ju Gets You reveal", "Private writing", "No card to start"],
      onClick: () => startOnboarding(),
    },
    {
      name: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      unit: "/week",
      badge: "Flexible",
      note: "For keeping Ju close without making the commitment feel bigger than the moment.",
      cta: "Choose weekly",
      features: ["Full Ju support", "Voice and text check-ins", "Cancel anytime"],
      onClick: () => startOnboarding("weekly"),
    },
    {
      name: "3 Month",
      price: geo.formatPrice(geo.rates.threeMonth),
      unit: "/3 months",
      badge: threeMonthTrialEnabled ? `${threeMonthTrialDays}-day trial` : "Recommended",
      note: threeMonthTrialEnabled
        ? `Start with ${threeMonthTrialDays} days free if your Apple account is eligible.`
        : "The calmest path if you want Ju to become a place you return to.",
      cta: threeMonthTrialEnabled ? `Start ${threeMonthTrialDays}-day trial path` : "Choose 3 month",
      features: ["Best habit window", "Full history", "Mood-aware reflections"],
      onClick: () => startOnboarding("three_month"),
    },
    {
      name: "Lifetime",
      price: geo.formatPrice(geo.rates.lifetime),
      unit: "one-time",
      badge: "One-time",
      note: "For people who already know this kind of support should stay close.",
      cta: "Choose lifetime",
      features: ["One payment", "No renewals", "Future premium updates"],
      onClick: () => startOnboarding("lifetime_one_time"),
    },
  ] as const;

  const geoPricingNote = geo.hasLocalizedDisplay
    ? `Approximate prices shown in ${geo.displayCurrency} for your region`
    : geo.currency !== geo.displayCurrency
      ? `Prices shown in ${geo.displayCurrency}. Regional checkout in ${geo.currency} may appear later.`
      : null;

  const landingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to start with Nuju",
    description: "Learn how Nuju helps you feel understood in three simple steps.",
    step: [
      {
        "@type": "HowToStep",
        name: "Share what feels heavy",
        text: "Answer a few gentle prompts so Ju can understand what has been hard to hold alone.",
      },
      {
        "@type": "HowToStep",
        name: "See the Ju Gets You reveal",
        text: "Get one personal read on what Ju notices, why it fits, and what support would help first.",
      },
      {
        "@type": "HowToStep",
        name: "Choose whether Ju stays close",
        text: "Keep the support going only if the reveal feels like a genuine fit for you.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-zinc-950">
      <SEOHead
        title="AI Journaling App and Mood Tracker"
        description="Nuju is the 30-second AI journal that reads between your lines, reflects what is underneath, and gives you one next step that fits."
        canonical="https://nuju.app/"
      />
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(landingFaqSchema)}</script>

      <nav className="sticky top-0 z-40 border-b border-zinc-200/70 bg-[#f7f7f4]/82 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white bg-white/80 shadow-sm">
              <img src={juMain} alt="Nuju logo" className="h-7 w-7 object-contain" width={28} height={28} />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-zinc-950">Nuju</p>
              <p className="text-xs font-medium text-zinc-500">Feel understood faster</p>
            </div>
          </div>

          <div className="hidden items-center gap-1 rounded-full border border-zinc-200/80 bg-white/65 p-1 text-sm font-semibold text-zinc-600 shadow-sm backdrop-blur-xl md:flex">
            <button onClick={scrollToHowItWorks} className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950">
              How it works
            </button>
            <button onClick={scrollToPricing} className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950">
              Plans
            </button>
            <Link to="/blog" className="rounded-full px-4 py-2 transition hover:bg-zinc-100 hover:text-zinc-950">
              Guides
            </Link>
          </div>

          <button
            onClick={() => startOnboarding()}
            className="inline-flex items-center gap-2 rounded-full bg-[#6f66c9] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_-18px_rgba(24,24,27,0.7)] transition hover:-translate-y-0.5 hover:bg-[#665ec0] active:scale-[0.98]"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <section
        data-testid="landing-hero"
        className="relative isolate overflow-hidden px-4 py-12 sm:px-6 lg:min-h-[760px] lg:py-16"
      >
        <img
          src={heroAura}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-30 h-full w-full scale-105 object-cover object-center opacity-95 animate-aurora-a"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(251,251,250,0.98)_0%,rgba(251,251,250,0.88)_42%,rgba(251,251,250,0.48)_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.045] [background-image:linear-gradient(#18181b_1px,transparent_1px),linear-gradient(90deg,#18181b_1px,transparent_1px)] [background-size:28px_28px]" aria-hidden="true" />
        <div className="absolute -right-16 top-28 -z-10 h-72 w-72 rounded-full bg-[#6f66c9]/10 blur-3xl animate-aurora-b" aria-hidden="true" />
        <div className="absolute bottom-24 left-[42%] -z-10 h-56 w-56 rounded-full bg-[#4aa99f]/10 blur-3xl animate-aurora-c" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-white" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-600 shadow-sm backdrop-blur-xl sm:text-xs sm:tracking-[0.16em]">
              <span className="h-2 w-2 rounded-full bg-[#6f66c9]" />
              <span className="sm:hidden">Try Ju Gets You in 30s</span>
              <span className="hidden sm:inline">New - try Ju Gets You in 30 seconds</span>
            </div>

            <h1 className="mt-7 max-w-[11ch] text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
              Journaling, but it gets <span className="text-[#6f66c9]">you.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
              Tap a mood. Say the heavy part. Ju reflects the pattern underneath in one sentence that finally fits.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <button
                  onClick={() => startOnboarding()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6f66c9] px-7 py-4 text-base font-bold text-white shadow-[0_18px_42px_-24px_rgba(24,24,27,0.75)] transition hover:-translate-y-0.5 hover:bg-[#665ec0] active:scale-[0.98] sm:w-auto"
                >
                  Start the Ju Gets You reveal
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Magnetic>
              <button
                onClick={scrollToHowItWorks}
                className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200/90 bg-white/72 px-7 py-4 text-base font-bold text-zinc-900 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white active:scale-[0.98] sm:w-auto"
              >
                See how it works
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {["30-second reveal", "No card to start", "Private by default"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-zinc-200/80 bg-white/58 px-3 py-1.5 text-sm font-semibold text-zinc-600 backdrop-blur-xl"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-10 hidden max-w-2xl gap-3 border-t border-zinc-200/80 pt-6 sm:grid sm:grid-cols-3">
              {proofSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.title}>
                    <Icon className="h-4 w-4 text-[#6f66c9]" />
                    <p className="mt-3 text-sm font-bold text-zinc-950">{signal.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{signal.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <HeroPatternPreview />

            <div className="absolute -bottom-10 left-12 right-12 rounded-[1.75rem] border border-white/70 bg-white/78 p-4 shadow-[0_24px_60px_-38px_rgba(39,39,42,0.75)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Your week, painted</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-950">Moods become a softer pattern, not a score.</p>
                </div>
                <div className="flex -space-x-2">
                  {moodCharacters.map((mood) => (
                    <span key={mood.label} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-50">
                      <img src={mood.image} alt={`${mood.label} Ju mood`} className="h-7 w-7 object-contain" width={28} height={28} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-2 w-full max-w-xl lg:hidden">
            <HeroPatternPreview />
          </div>
        </motion.div>
      </section>

      <section data-testid="landing-proof-bar" className="border-y border-zinc-200/80 bg-white/55 px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["What it does", "Turns the messy part into one sentence that fits."],
            ["Why it lands", "The first win happens before a paywall or long habit loop."],
            ["Why people stay", "Ju keeps the tone soft, private, and easy to return to."],
          ].map(([title, body]) => (
            <div key={title} className="border-l border-zinc-200 pl-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f66c9]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        data-testid="landing-visual-strip"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-24 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Product preview"
            title="Every screen is made for the moment your brain feels loud."
            body="Nuju does not ask you to become a perfect journaler. It gives your mood, voice, and thoughts a calm place to land."
          />

          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-zinc-900 bg-zinc-950 p-5 text-white shadow-[0_34px_90px_-56px_rgba(24,24,27,0.9)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/42">5 moods. 1 Ju.</p>
                <h3 className="mt-4 max-w-md text-4xl font-black tracking-tight text-white sm:text-5xl">
                  A companion that shifts when you do.
                </h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/62">
                  The design language follows the product promise: your state changes, so Ju changes with it.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {moodCharacters.map((mood, index) => (
                  <motion.div
                    key={mood.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: index * 0.05, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                    className="relative min-h-[11rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <div className="absolute inset-x-4 top-4 h-16 rounded-full blur-2xl" style={{ backgroundColor: `${mood.color}55` }} />
                    <img
                      src={mood.image}
                      alt={`${mood.label} Ju mood`}
                      className="relative mx-auto h-20 w-20 object-contain"
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                    <p className="relative mt-4 text-sm font-black text-white">{mood.label}</p>
                    <p className="relative mt-1 text-xs leading-5 text-white/58">{mood.line}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {bentoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                  className={`group min-h-[15rem] rounded-[2rem] border border-zinc-200/80 bg-white/74 p-7 shadow-[0_20px_55px_-42px_rgba(39,39,42,0.7)] backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white ${item.className}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-[#6f66c9]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 max-w-xl text-2xl font-bold tracking-tight text-zinc-950">{item.title}</h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">{item.body}</p>
                  <div className="mt-8 h-px w-full bg-zinc-200/80" />
                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-zinc-500">
                    <span className="h-2 w-2 rounded-full bg-[#6f66c9]" />
                    Designed for low-energy moments
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-benefits"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden border-y border-zinc-200/80 bg-white/64 px-4 py-24 sm:px-6"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(111,102,201,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,247,244,0.72)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Core value"
              title="One mood tap. One honest sentence. One softer next move."
              body="The promise is simple: tell Ju the messy part, get a reveal that lands, then decide if you want more support."
            />
            <button
              onClick={() => startOnboarding()}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 active:scale-[0.98]"
            >
              Start the reveal
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-10 overflow-hidden rounded-[2.35rem] border border-white/70 bg-white/68 p-3 shadow-[0_32px_90px_-58px_rgba(39,39,42,0.8)] backdrop-blur-2xl">
              <div className="relative min-h-[22rem] overflow-hidden rounded-[1.85rem] border border-zinc-200/70 bg-[#fbfaf6] p-6">
                <img
                  src={revealRibbon}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-82 animate-aurora-b"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,250,246,0.16)_0%,rgba(251,250,246,0.78)_62%,rgba(251,250,246,0.95)_100%)]" />
                <div className="relative flex h-full min-h-[19.5rem] flex-col justify-end">
                  <div className="mb-auto flex items-center justify-between">
                    <p className="rounded-full border border-white/80 bg-white/64 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#6f66c9] shadow-sm backdrop-blur-xl">
                      The Ju Gets You reveal
                    </p>
                    <img src={stickerZen} alt="Nuju calm sticker" className="h-16 w-16 shrink-0 object-contain drop-shadow-sm" width={64} height={64} loading="lazy" />
                  </div>
                  <p className="max-w-sm text-3xl font-black leading-tight tracking-tight text-zinc-950">
                    "You are carrying more than you let on."
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-600">
                    One plain sentence that lands, then one next move small enough to actually do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-[1.75rem] border border-zinc-200/80 bg-[#fbfbfa] p-6">
                  <Icon className="h-5 w-5 text-[#6f66c9]" />
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-zinc-950">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{benefit.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={howItWorksRef}
        data-testid="landing-how-it-works"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-24 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="How it works"
            title="From heavy to held in three small moves."
            body="Nuju keeps the first session short because the goal is not a perfect journal entry. The goal is to feel less alone with the feeling."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.15fr_0.9fr]">
            {howSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/74 p-7 shadow-[0_20px_55px_-44px_rgba(39,39,42,0.55)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-black text-[#6f66c9]">0{index + 1}</span>
                    <Icon className="h-5 w-5 text-zinc-500" />
                  </div>
                  <h3 className="mt-10 text-2xl font-bold tracking-tight text-zinc-950">{step.title}</h3>
                  <p className="mt-4 text-base leading-8 text-zinc-600">{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={pricingSectionRef}
        data-testid="landing-pricing-teaser"
        onViewportEnter={handlePricingVisible}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-zinc-200/80 bg-[#fdfdfb] px-4 py-24 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Plans"
            title="Start free. Stay only if it fits."
            body="The reveal comes first. Pricing only matters after Ju has shown you why it feels different."
          />

          {geoPricingNote && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600">
              <Globe2 className="h-4 w-4 text-[#6f66c9]" />
              {geoPricingNote}
            </div>
          )}

          <div data-testid="landing-what-you-get" className="mt-10 grid gap-4 lg:grid-cols-4">
            {whatYouGetItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border-t border-zinc-200 pt-5">
                  <Icon className="h-4 w-4 text-[#6f66c9]" />
                  <h3 className="mt-4 text-base font-bold text-zinc-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {pricingCards.map((plan) => {
              const isLifetime = plan.name === "Lifetime";
              const isThreeMonth = plan.name === "3 Month";

              return (
                <article
                  key={plan.name}
                  className={`flex min-h-[31rem] flex-col rounded-[2rem] border p-6 shadow-[0_22px_65px_-48px_rgba(39,39,42,0.8)] ${
                    isThreeMonth
                      ? "border-[#6f66c9]/35 bg-white"
                      : isLifetime
                        ? "border-zinc-800 bg-zinc-950 text-white"
                        : "border-zinc-200/80 bg-white/74"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={isLifetime ? "text-xl font-bold text-white" : "text-xl font-bold text-zinc-950"}>{plan.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        isLifetime ? "bg-white/10 text-white" : "bg-[#f0effc] text-[#5f56b7]"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <div className="mt-8 flex items-end gap-2">
                    <span className={isLifetime ? "text-4xl font-black text-white" : "text-4xl font-black text-zinc-950"}>{plan.price}</span>
                    {plan.unit && <span className={isLifetime ? "pb-1 text-sm text-white/60" : "pb-1 text-sm text-zinc-500"}>{plan.unit}</span>}
                  </div>

                  <p className={isLifetime ? "mt-4 text-sm leading-7 text-white/68" : "mt-4 text-sm leading-7 text-zinc-600"}>{plan.note}</p>

                  {isLifetime && <LifetimeScarcityMeter className="mt-5" scarcity={lifetimeScarcity} />}

                  <ul className="mt-7 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className={isLifetime ? "flex gap-2 text-sm text-white/78" : "flex gap-2 text-sm text-zinc-600"}>
                        <Check className={isLifetime ? "mt-0.5 h-4 w-4 shrink-0 text-white" : "mt-0.5 h-4 w-4 shrink-0 text-[#6f66c9]"} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={plan.onClick}
                    className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-bold transition active:scale-[0.98] ${
                      isLifetime
                        ? "bg-white text-zinc-950 hover:-translate-y-0.5"
                        : isThreeMonth
                          ? "bg-[#6f66c9] text-white hover:-translate-y-0.5 hover:bg-[#665ec0]"
                          : "border border-zinc-200 bg-zinc-50 text-zinc-950 hover:-translate-y-0.5 hover:bg-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-comparison"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-24 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Nuju vs. journaling alone"
            title="One starts with a stare. The other starts with a sentence."
            body="Blank pages can be beautiful when you have energy. Nuju is for the moment before that, when you need help finding the first honest sentence."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <article className="overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/72 p-6 shadow-[0_22px_65px_-48px_rgba(39,39,42,0.8)]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Without Nuju</p>
                  <h3 className="mt-4 text-3xl font-black tracking-tight text-zinc-950">Paper, notes app, blank stare.</h3>
                </div>
                <img src={stickerDiary} alt="Nuju diary sticker" className="h-20 w-20 shrink-0 object-contain" width={80} height={80} loading="lazy" />
              </div>
              <div className="mt-8 space-y-4 border-t border-zinc-200 pt-6">
                {["Stare at a blank page", "Generate insight yourself", "Wonder if it mattered", "Start over tomorrow"].map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm font-semibold text-zinc-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    {item}
                  </p>
                ))}
              </div>
            </article>

            <article className="overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950 p-6 text-white shadow-[0_30px_80px_-48px_rgba(24,24,27,0.95)]">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">With Nuju</p>
                  <h3 className="mt-4 text-3xl font-black tracking-tight text-white">One mood tap. One sentence that lands.</h3>
                </div>
                <img src={juMain} alt="Ju mascot" className="h-20 w-20 shrink-0 object-contain" width={80} height={80} loading="lazy" />
              </div>
              <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">{row.label}</p>
                    <p className="mt-3 text-sm leading-6 text-white/78">{row.nuju}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div data-testid="landing-internal-links" className="mt-10 grid gap-4 lg:grid-cols-3">
            {comparisonReadLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group rounded-[1.75rem] border border-zinc-200/80 bg-white/74 p-6 shadow-[0_18px_52px_-44px_rgba(39,39,42,0.6)] transition hover:-translate-y-1 hover:bg-white"
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f66c9]">{link.label}</span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-zinc-950 group-hover:text-[#5f56b7]">{link.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{link.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-950">
                  Read comparison
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-faq"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-zinc-200/80 bg-white/62 px-4 py-24 sm:px-6"
        id="faq"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Quick answers before you begin."
            body="The reveal is intentionally low-pressure. These are the details people usually want before they start."
            align="center"
          />

          <div className="mt-12 space-y-3">
            {landingFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-[1.5rem] border border-zinc-200/80 bg-[#fbfbfa]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left text-base font-bold text-zinc-950">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-zinc-500 transition group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-7 text-zinc-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-final-cta"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-24 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-white p-6 shadow-[0_30px_85px_-58px_rgba(39,39,42,0.8)] sm:p-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f66c9]">Let the first sentence land</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
              Mind loud? Ju gets it.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              Open Nuju when your thoughts feel crowded. Tap a mood, say the real thing, and let Ju give the sentence you have been trying to reach.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <button
                  onClick={() => startOnboarding()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6f66c9] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#665ec0] active:scale-[0.98] sm:w-auto"
                >
                  Start your reveal - free
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Magnetic>
              <button
                onClick={scrollToPricing}
                className="inline-flex w-full items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-7 py-4 text-base font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white active:scale-[0.98] sm:w-auto"
              >
                See plans
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-[2rem] border border-zinc-200 bg-[#f7f7f4] p-8">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white bg-white shadow-sm">
                <img src={juMain} alt="Ju mascot" className="h-16 w-16 object-contain" width={64} height={64} loading="lazy" />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                30-second reveal
              </p>
              <p className="mt-3 text-base font-semibold leading-7 text-zinc-950">
                Private by default. No card to start. Built for the moment before clarity.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="border-t border-zinc-200/80 bg-[#fbfbfa] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
            The AI journal app built for everyday emotional wellness
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-600">
            Nuju is an AI journaling app and mood tracker that helps you log how you feel, understand emotional patterns, and get personalized reflections without blank-page pressure. Use it for daily check-ins, private writing, mood tracking, and a softer way to notice what is happening inside.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-bold text-zinc-950">AI mood tracker</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Track emotional changes and notice patterns that are easy to miss when every day blurs together.</p>
            </div>
            <div>
              <h3 className="font-bold text-zinc-950">Personal AI reflection</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Get private reflections that help you name what you feel before trying to fix it.</p>
            </div>
            <div>
              <h3 className="font-bold text-zinc-950">Daily journal prompts</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Use gentle prompts when you want to write but do not know where to start.</p>
            </div>
          </div>
          <p className="mt-8 text-sm leading-7 text-zinc-600">
            Available as a <Link to="/install" state={{ from: "/" }} className="font-semibold text-[#5f56b7] hover:underline">progressive web app</Link> on iOS, Android, and desktop. Read more on our <Link to="/about" state={{ from: "/" }} className="font-semibold text-[#5f56b7] hover:underline">about page</Link>, visit the <Link to="/support" state={{ from: "/" }} className="font-semibold text-[#5f56b7] hover:underline">support center</Link>, or browse the <Link to="/blog" className="font-semibold text-[#5f56b7] hover:underline">journaling and wellness blog</Link>.
          </p>
        </div>
      </section>

      <footer className="border-t border-zinc-200/80 bg-[#f7f7f4] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src={juMain} alt="Nuju logo" className="h-9 w-9 object-contain" width={36} height={36} loading="lazy" />
              <div>
                <p className="text-lg font-bold text-zinc-950">Nuju</p>
                <p className="text-sm text-zinc-500">Support that helps you feel understood.</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500">Copyright 2026 Nuju. Built for quieter minds and more understood moments.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-3 border-t border-zinc-200/80 pt-6 text-xs font-semibold text-zinc-500">
            <Link to="/about" state={{ from: "/" }} className="hover:text-zinc-950">About</Link>
            <Link to="/support" state={{ from: "/" }} className="hover:text-zinc-950">Support</Link>
            <Link to="/contact" state={{ from: "/" }} className="hover:text-zinc-950">Contact</Link>
            <Link to="/privacy" state={{ from: "/" }} className="hover:text-zinc-950">Privacy</Link>
            <Link to="/terms" state={{ from: "/" }} className="hover:text-zinc-950">Terms</Link>
            <Link to="/medical-disclaimer" state={{ from: "/" }} className="hover:text-zinc-950">Medical Disclaimer</Link>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom,0px),0.75rem)] pt-2 sm:hidden"
          >
            <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-zinc-200/80 bg-white/92 p-1.5 pl-4 shadow-[0_18px_50px_-24px_rgba(24,24,27,0.65)] backdrop-blur-2xl">
              <span className="text-xs font-bold text-zinc-950">Feel understood in 30s</span>
              <button
                onClick={() => startOnboarding()}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#6f66c9] px-4 py-2.5 text-xs font-bold text-white active:scale-[0.98]"
              >
                Start free
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;

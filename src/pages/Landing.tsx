import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Heart,
  Lock,
  Mic,
  PenLine,
  Shield,
  Sparkles,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";

import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import HeroPatternPreview from "@/components/landing/HeroPatternPreview";
import SEOHead from "@/components/SEOHead";
import { Magnetic } from "@/components/ui/Magnetic";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { PRICING_CONFIG } from "@/lib/config";
import { ROUTES } from "@/lib/routes";
import juGood from "@/assets/ju-good.webp";
import juGreat from "@/assets/ju-great.webp";
import juLow from "@/assets/ju-low.webp";
import juMain from "@/assets/ju-main.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";

const MOOD_SHOWCASE = [
  { label: "Rough", img: juRough, color: "#E8878C", line: "When everything feels too loud." },
  { label: "Low", img: juLow, color: "#6C9BCF", line: "When you are quietly holding it together." },
  { label: "Okay", img: juOkay, color: "#FFB347", line: "When the weight is steady, not loud." },
  { label: "Good", img: juGood, color: "#95E1D3", line: "When softness is finally returning." },
  { label: "Great", img: juGreat, color: "#4ECDC4", line: "When you feel yourself again." },
] as const;

const heroSignals = [
  { label: "Private", value: "Your words stay yours", icon: Lock },
  { label: "Fast", value: "A read in about a minute", icon: Zap },
  { label: "Warm", value: "Clarity without clinical distance", icon: Heart },
] as const;

const heroEmotionalArc = [
  { label: "Name it", copy: "Say the messy version", color: "#6C9BCF" },
  { label: "Feel seen", copy: "Watch the pattern emerge", color: "#7C6EDB" },
  { label: "Soften", copy: "Leave with one next step", color: "#4ECDC4" },
] as const;

const benefitRows = [
  {
    eyebrow: "Start softer",
    title: "No blank page to fight.",
    body: "Say the messy version. Ju helps turn it into something you can hold.",
    proof: "A gentle read in the first minute.",
    accent: "#6C9BCF",
    icon: Mic,
    image: juLow,
    imageAlt: "Ju holding a low mood moment",
  },
  {
    eyebrow: "Feel seen",
    title: "A read that sounds like you.",
    body: "Nuju reflects what feels heavy and what may be underneath it.",
    proof: "Clear enough to land. Soft enough to trust.",
    accent: "#7C6EDB",
    icon: BrainCircuit,
    image: juMain,
    imageAlt: "Ju mascot giving a gentle reflection",
  },
  {
    eyebrow: "Stay close",
    title: "One small step after the read.",
    body: "Keep writing, speak it out, or follow the next gentle move.",
    proof: "No pressure. Just a quieter way back to yourself.",
    accent: "#4ECDC4",
    icon: TrendingUp,
    image: juGreat,
    imageAlt: "Ju feeling great",
  },
] as const;

const storyMoments = [
  {
    phase: "01",
    title: "The messy version is enough.",
    body: "Start with the sentence you would normally keep inside. It can be fragmented, tired, or hard to explain.",
    sample: "I feel tangled today. Everything feels too loud and I just want to disappear for a bit.",
    signal: "Overstimulated",
    metric: "Low energy, high noise",
    reflection: "Ju hears a nervous system asking for quiet, not a person failing to cope.",
    action: "Start with two minutes of silence.",
    accent: "#6C9BCF",
    icon: Mic,
    bars: [36, 72, 48, 84, 58, 74],
  },
  {
    phase: "02",
    title: "Ju reads between the lines.",
    body: "A warm read appears without making you explain everything perfectly.",
    sample: "The heaviness is not nothing. It sounds like your body has been holding too much input for too long.",
    signal: "Pattern forming",
    metric: "Emotion tagged gently",
    reflection: "Your words are enough. Ju gives them back with a softer shape.",
    action: "Name the loudest feeling first.",
    accent: "#7C6EDB",
    icon: BrainCircuit,
    bars: [42, 50, 78, 62, 88, 70],
  },
  {
    phase: "03",
    title: "A pattern appears without pressure.",
    body: "Nuju quietly notices what keeps coming back.",
    sample: "This kind of fog keeps showing up after days where you keep saying yes while needing quiet.",
    signal: "Recurring arc",
    metric: "Tuesday spikes noticed",
    reflection: "The day starts to feel less random when the pattern has a name.",
    action: "Protect one low-input hour.",
    accent: "#4ECDC4",
    icon: TrendingUp,
    bars: [34, 46, 66, 92, 54, 76],
  },
  {
    phase: "04",
    title: "The next step feels small enough to take.",
    body: "End with one soft move that feels small enough to try.",
    sample: "You do not need to solve the whole day. Lower the noise first, then come back to the story.",
    signal: "Relief direction",
    metric: "One soft move",
    reflection: "You do not have to solve the whole day. Start with one breath.",
    action: "Drop your shoulders and breathe once.",
    accent: "#FFB347",
    icon: Sparkles,
    bars: [48, 58, 64, 74, 86, 92],
  },
] as const;

const quickFeatures = [
  {
    title: "Voice or text check-ins",
    body: "Start with whatever feels easiest in the moment.",
    icon: Mic,
  },
  {
    title: "Personal reveal",
    body: "A short reflection that helps the feeling make sense.",
    icon: BrainCircuit,
  },
  {
    title: "Mood-aware companion",
    body: "Ju changes with the moment instead of repeating the same script.",
    icon: Heart,
  },
  {
    title: "Private by default",
    body: "Your entries and emotional reads stay tied to your account and your choices.",
    icon: Lock,
  },
  {
    title: "Fast enough for hard days",
    body: "A few taps is enough to get support started before the spiral grows.",
    icon: Zap,
  },
  {
    title: "Close on every screen",
    body: "Install Nuju and keep the support nearby when the day gets loud.",
    icon: Smartphone,
  },
] as const;

const whatYouGetItems = [
  {
    title: "Free reveal first",
    body: "Start with the Ju Gets You reveal and decide after the read lands.",
    icon: Sparkles,
  },
  {
    title: "Private writing",
    body: "Keep a quiet place for the feelings that are not ready for anyone else.",
    icon: PenLine,
  },
  {
    title: "One readable pattern",
    body: "See the emotional throughline without needing to self-diagnose.",
    icon: BrainCircuit,
  },
  {
    title: "A next-step direction",
    body: "Know what would help first instead of leaving with vague comfort.",
    icon: TrendingUp,
  },
] as const;

const testimonials = [
  {
    name: "Lena R.",
    role: "Late-night overthinker",
    text: "It felt like the app noticed what I was carrying before I had fully figured out how to say it.",
  },
  {
    name: "Marcus T.",
    role: "Keeps things inside",
    text: "The reveal was the moment. It made me think, okay, this actually gets me and I want to keep going.",
  },
  {
    name: "Aisha K.",
    role: "Trying to come back to herself",
    text: "I did not stay because it was a journal. I stayed because it felt like somewhere I could be understood quickly.",
  },
] as const;

const comparisonRows = [
  {
    label: "Starting when your thoughts are messy",
    nuju: "Guided prompts help you begin quickly",
    journal: "You still have to create clarity from a blank page",
  },
  {
    label: "Feeling understood fast",
    nuju: "The reveal reflects the emotional pattern back to you",
    journal: "You have to generate the interpretation yourself",
  },
  {
    label: "Knowing what to do next",
    nuju: "Ju points toward the next kind of support that fits",
    journal: "The next move stays ambiguous unless you figure it out alone",
  },
  {
    label: "Coming back on hard days",
    nuju: "Fast, low-pressure, and designed for low energy moments",
    journal: "The setup effort is still yours every single time",
  },
  {
    label: "Emotional safety in the first minute",
    nuju: "Warm language helps the support land without feeling clinical",
    journal: "The page stays neutral until you do all the emotional work",
  },
] as const;

const comparisonReadLinks = [
  {
    href: "/ai-journal",
    label: "Product overview",
    title: "Nuju as an AI journal",
    body: "The full feature breakdown, free vs paid, coach personas, and privacy stance in one page.",
  },
  {
    href: "/mood-tracker",
    label: "Product overview",
    title: "Nuju as a mood tracker",
    body: "How the 10-second check-in turns into 30-day trends, AI summaries, and pattern detection.",
  },
  {
    href: "/voice-journaling",
    label: "Product overview",
    title: "Voice journaling in Nuju",
    body: "Talk for a minute, get an automatic transcript and AI reflection, and feed spoken entries into your mood patterns.",
  },
  {
    href: "/blog/best-ai-journaling-apps",
    label: "Category guide",
    title: "Best AI journaling apps",
    body: "See how Nuju stacks up on privacy, mood tracking, and real emotional insight.",
  },
  {
    href: "/blog/daylio-alternatives",
    label: "Alternative guide",
    title: "Best Daylio alternatives",
    body: "For readers already comparing mood trackers and wondering where Nuju fits.",
  },
  {
    href: "/blog/reflectly-alternatives",
    label: "Alternative guide",
    title: "Best Reflectly alternatives",
    body: "Useful when someone wants more than prompts and beginner journaling structure.",
  },
] as const;

const landingFaqs = [
  {
    q: "Do I need to pay before I can use Nuju?",
    a: "No. You start with the Ju Gets You reveal first. If the fit feels real after that, you can keep Ju close with weekly, 3-month, or lifetime access.",
  },
  {
    q: "What exactly happens in the reveal?",
    a: "You answer a few quick prompts, then Ju reflects back the emotional pattern it notices, why that read fits, and what kind of support would help first.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Nuju is built around privacy. Your journal data is stored securely, protected with row-level access controls, and we do not sell your personal data.",
  },
  {
    q: "Why does Nuju ask for my name and email so early?",
    a: "Because the reveal is meant to feel personal. Your name helps the read feel like it belongs to you, and your email keeps that support attached to the same account if you decide to continue.",
  },
  {
    q: "What plans are available if I want Ju to stay with me?",
    a: "You can continue weekly, choose a 3-month subscription, or unlock lifetime access with one payment.",
  },
] as const;

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const geo = useGeoPricing();
  const ttk = useTikTokPixel();
  const { snapshot: lifetimeScarcity } = useLifetimeScarcity();
  const { trackLandingView, trackFunnelStart, trackPricingView } = usePostHogEvents();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [heroPointer, setHeroPointer] = useState({ x: 50, y: 34 });
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeStory = storyMoments[activeStoryIndex] ?? storyMoments[0];
  const threeMonthTrialEnabled = PRICING_CONFIG.trial.threeMonthIntroOfferEnabled;
  const threeMonthTrialDays = PRICING_CONFIG.trial.threeMonthDays;

  const howItWorksRef = useRef<HTMLElement>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const hasTrackedPricingViewRef = useRef(false);

  useEffect(() => {
    trackLandingView();
    ttk.trackPageView();
  }, [trackLandingView, ttk]);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHowItWorks = () =>
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToPricing = () =>
    pricingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const startOnboarding = (plan?: "weekly" | "three_month" | "lifetime_one_time") => {
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

  const handleHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHeroPointer({
      x: Math.round(((event.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((event.clientY - rect.top) / rect.height) * 100),
    });
  };

  const pricingCards = [
    {
      name: "Start free",
      price: "$0",
      unit: "",
      badge: "Free start",
      note: "See your personal reveal and keep private writing open. No credit card needed.",
      cta: "Start free",
      features: ["Personal reveal", "Private writing stays free"],
      onClick: () => startOnboarding(),
    },
    {
      name: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      unit: "/week",
      badge: "Lowest commitment",
      note: "For trying Ju without making the week feel bigger than it is.",
      cta: "Choose weekly",
      features: ["Voice, memory, coach, and full history", "Cancel anytime"],
      onClick: () => startOnboarding("weekly"),
    },
    {
      name: "3 Month",
      price: geo.formatPrice(geo.rates.threeMonth),
      unit: "/3 months",
      badge: threeMonthTrialEnabled ? `${threeMonthTrialDays}-day trial` : "Recommended",
      note: threeMonthTrialEnabled
        ? `Start with ${threeMonthTrialDays} days free if you are eligible, then let Ju become a place you return to.`
        : "The calmest path if you want Ju to become a place you return to.",
      cta: threeMonthTrialEnabled ? `Start ${threeMonthTrialDays}-day trial path` : "Choose 3 month",
      features: [
        "Best balance",
        threeMonthTrialEnabled ? "Trial-first on eligible Apple accounts" : "Built for habit formation",
      ],
      onClick: () => startOnboarding("three_month"),
    },
    {
      name: "Lifetime",
      price: geo.formatPrice(geo.rates.lifetime),
      unit: "one-time",
      badge: "One-time",
      note: "A one-time unlock for people who already know this support should stay close.",
      cta: "Choose lifetime",
      features: ["One payment, no renewals", "Future premium updates included"],
      onClick: () => startOnboarding("lifetime_one_time"),
    },
  ] as const;

  const landingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": landingFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to start with Nuju",
    "description": "Learn how Nuju helps you feel understood in three simple steps.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Share what feels heavy",
        "text": "Answer a few gentle prompts so Ju can understand what has been hard to hold alone.",
      },
      {
        "@type": "HowToStep",
        "name": "See the Ju Gets You reveal",
        "text": "Get one personal read on what Ju notices, why it fits, and what support would help first.",
      },
      {
        "@type": "HowToStep",
        "name": "Choose whether Ju stays close",
        "text": "Keep the support going only if the reveal feels like a genuine fit for you.",
      },
    ],
  };

  const geoPricingNote = geo.hasLocalizedDisplay
    ? `Approximate prices shown in ${geo.displayCurrency} for your region`
    : geo.currency !== geo.displayCurrency
      ? `Prices shown in ${geo.displayCurrency}. Regional checkout in ${geo.currency} may appear later.`
      : null;

  return (
    <div
      className="min-h-screen bg-[#FAF9F6] text-[#3f3a52] dark:bg-background dark:text-foreground"
      style={
        {
          "--foreground": "252 18% 27%",
          "--muted-foreground": "246 8% 48%",
        } as React.CSSProperties
      }
    >
      <SEOHead
        title="Nuju — AI Journal App for Mood Tracking & Emotional Clarity"
        description="Nuju is the AI journal app that turns hard-to-explain feelings into a private emotional read, gentle mood patterns, and a soft next step. Start the free Ju Gets You reveal."
        canonical="https://nuju.app/"
        noSuffix
      />
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(landingFaqSchema)}</script>

      <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
        <div className="flex h-14 w-full max-w-[620px] items-center justify-between rounded-full border border-white/70 bg-white/72 px-2.5 shadow-[0_18px_50px_-32px_rgba(28,25,23,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-background/75">
          <Link to="/" className="flex items-center gap-2.5 pl-2" aria-label="Nuju home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F6F2FF] dark:bg-white/8">
              <img src={juMain} alt="" className="h-6 w-6 object-contain" width={24} height={24} />
            </span>
            <span className="block text-[17px] font-semibold text-foreground">
              Nuju
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex">
            <button onClick={scrollToHowItWorks} className="transition hover:text-foreground">Approach</button>
            <button onClick={scrollToPricing} className="transition hover:text-foreground">Plans</button>
            <a href="#faq" className="transition hover:text-foreground">FAQ</a>
          </div>

          <button
            onClick={() => startOnboarding()}
            className="nuju-brand-button h-10 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Try Nuju free
          </button>
        </div>
      </nav>

      <section
        data-testid="landing-hero"
        onPointerMove={handleHeroPointer}
        style={
          {
            "--hero-x": `${heroPointer.x}%`,
            "--hero-y": `${heroPointer.y}%`,
          } as React.CSSProperties
        }
        className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36"
      >
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 hero-ambient-field" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,246,0.34),rgba(250,249,246,0.86)_64%,#FAF9F6)] dark:bg-[linear-gradient(180deg,rgba(15,14,20,0.58),rgba(15,14,20,0.9)_70%,hsl(var(--background)))]" />
          <div className="absolute inset-0 nuju-grain opacity-[0.035]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-5xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-[0_12px_34px_-26px_rgba(28,25,23,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ECDC4]" />
              Messy feeling in, warm read out
            </div>

            <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-[0.98] text-foreground sm:text-7xl lg:text-[92px]">
              Name what you feel. Even when you can't.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              For the moments you cannot explain cleanly yet, Nuju turns the messy version into a warm read, a clearer pattern, and one gentle next step. No perfect words needed.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <button
                  onClick={() => startOnboarding()}
                  className="nuju-brand-button group inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Start the Ju Gets You reveal
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <button
                onClick={scrollToHowItWorks}
                className="inline-flex h-14 items-center justify-center rounded-full border border-black/[0.08] bg-white/72 px-6 text-sm font-semibold text-foreground backdrop-blur-xl transition hover:bg-white active:scale-[0.98] dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/10"
              >
                Watch how it works
              </button>
            </div>

            <div className="mx-auto mt-8 hidden max-w-3xl gap-2 sm:grid sm:grid-cols-3">
              {heroSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.label}
                    className="rounded-full border border-black/[0.06] bg-white/54 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{signal.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-10 max-w-3xl sm:mt-14"
          >
            <HeroPatternPreview />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65 }}
          className="relative mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-3"
        >
          {heroEmotionalArc.map((item, index) => (
            <div
              key={item.label}
              className="group rounded-[18px] border border-black/[0.06] bg-white/58 px-4 py-4 shadow-[0_18px_48px_-34px_rgba(0,0,0,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <section data-testid="landing-proof-bar" className="px-4 pb-12 sm:px-6">
        <div className="nuju-neu-surface mx-auto grid max-w-6xl gap-3 rounded-[24px] p-3 backdrop-blur-2xl md:grid-cols-3">
          {["Feel seen before you pay", "No credit card to start", "Made for low-energy days"].map((signal) => (
            <div key={signal} className="flex items-center gap-3 rounded-[18px] px-4 py-3">
              <Check className="h-5 w-5 text-[#4ECDC4]" />
              <span className="text-sm font-semibold text-foreground">{signal}</span>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        data-testid="landing-visual-strip"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Meet Ju</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                One companion, tuned to the moment you are actually in.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Ju changes with the emotional weather of the moment, so Nuju feels less like a blank page and more like a companion that meets you where you are.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {MOOD_SHOWCASE.map((mood, index) => (
              <motion.div
                key={mood.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                className="group rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-[0_24px_70px_-52px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex h-32 items-center justify-center rounded-[18px] bg-[#F4F1EC] dark:bg-white/[0.05]">
                  <img src={mood.img} alt={`Ju feeling ${mood.label}`} className="h-24 w-24 object-contain transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: mood.color }} />
                  <h3 className="font-semibold text-foreground">{mood.label}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{mood.line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-benefits"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-black/[0.06] bg-white/58 px-4 py-20 sm:px-6 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why it helps</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              The first relief is feeling accurately seen.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Nuju turns a small honest check-in into a softer read on what is really happening underneath the day.
            </p>
          </div>

          <div className="mt-14 space-y-5">
            {benefitRows.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08, duration: 0.65 }}
                  className="nuju-neu-surface grid gap-8 rounded-[28px] p-5 md:grid-cols-[1fr_0.8fr] md:p-8"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground dark:bg-white/[0.06]">
                      <Icon className="h-4 w-4" style={{ color: benefit.accent }} />
                      {benefit.eyebrow}
                    </div>
                    <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{benefit.body}</p>
                    <p className="mt-6 max-w-2xl border-l-2 pl-4 text-sm leading-7 text-foreground/78" style={{ borderColor: benefit.accent }}>
                      {benefit.proof}
                    </p>
                  </div>
                  <div className="nuju-neu-pressed flex items-center justify-center rounded-[22px] p-8">
                    <img src={benefit.image} alt={benefit.imageAlt} className="h-40 w-40 object-contain sm:h-52 sm:w-52" loading="lazy" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={howItWorksRef}
        data-testid="landing-how-it-works"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative scroll-mt-28 overflow-hidden border-y border-black/[0.06] bg-white/64 px-4 py-24 sm:px-6 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="absolute inset-0 story-ambient-field opacity-80" aria-hidden="true" />
        <div className="absolute inset-0 nuju-grain opacity-[0.025]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              A scrollable emotional journey, not another blank page.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Raw words become a soft read, a pattern, and one gentle move.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4 lg:py-10">
              {storyMoments.map((moment, index) => {
                const Icon = moment.icon;
                const isActive = activeStoryIndex === index;

                return (
                  <motion.button
                    key={moment.title}
                    type="button"
                    onClick={() => setActiveStoryIndex(index)}
                    onFocus={() => setActiveStoryIndex(index)}
                    onMouseEnter={() => setActiveStoryIndex(index)}
                    onViewportEnter={() => setActiveStoryIndex(index)}
                    animate={{ opacity: isActive ? 1 : 0.74, y: isActive ? 0 : 4, scale: isActive ? 1 : 0.992 }}
                    viewport={{ once: false, margin: "-28% 0px -42% 0px" }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className={`group w-full rounded-[24px] p-5 text-left transition duration-500 ${
                      isActive
                        ? "nuju-neu-surface"
                        : "border border-white/70 bg-white/48 hover:bg-white/74 dark:border-white/10 dark:bg-white/[0.04]"
                    }`}
                    style={isActive ? { boxShadow: `0 28px 86px -66px ${moment.accent}` } : undefined}
                    aria-pressed={isActive}
                  >
                    <div className="flex gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] text-white shadow-[0_16px_36px_-26px_rgba(28,25,23,0.7)]"
                        style={{ backgroundColor: moment.accent }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          Phase {moment.phase}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
                          {moment.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{moment.body}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="nuju-neu-surface relative overflow-hidden rounded-[36px] p-4 backdrop-blur-2xl sm:p-5">
                <div className="absolute inset-0 hero-demo-field" aria-hidden="true" />

                <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-[#FBFAF7]/82 p-5 dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Live story preview
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground">Ju gets the moment</h3>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white/80 px-3 py-2 text-xs font-semibold text-muted-foreground">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeStory.accent }} />
                      {activeStory.signal}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {storyMoments.map((moment, index) => (
                      <button
                        key={moment.phase}
                        type="button"
                        onClick={() => setActiveStoryIndex(index)}
                        className={`h-2 rounded-full transition ${
                          activeStoryIndex === index ? "opacity-100" : "opacity-25 hover:opacity-60"
                        }`}
                        style={{ backgroundColor: moment.accent }}
                        aria-label={`Show phase ${moment.phase}`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStory.title}
                      initial={{ opacity: 0, y: 22, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 0.98 }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6"
                    >
                      <div className="nuju-neu-pressed rounded-[26px] p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          Honest check-in
                        </p>
                        <p className="mt-3 text-base leading-7 text-foreground">{activeStory.sample}</p>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_0.78fr]">
                        <div className="nuju-neu-surface rounded-[26px] p-5 text-[#4c4569]">
                          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C6EDB]/70">
                            <BrainCircuit className="h-4 w-4" style={{ color: activeStory.accent }} />
                            Ju noticed
                          </div>
                          <p className="mt-4 text-sm leading-7 text-[#4c4569]/82">{activeStory.reflection}</p>
                          <div className="nuju-neu-pressed mt-5 rounded-[20px] p-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C6EDB]/60">
                              Next gentle move
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#4c4569]/78">{activeStory.action}</p>
                          </div>
                        </div>

                        <div className="nuju-neu-surface rounded-[26px] p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                            Pattern signal
                          </p>
                          <p className="mt-2 text-sm font-semibold text-foreground">{activeStory.metric}</p>
                          <div className="mt-5 flex h-28 items-end gap-2">
                            {activeStory.bars.map((height, index) => (
                              <motion.span
                                key={`${activeStory.phase}-${index}`}
                                initial={{ height: 12 }}
                                animate={{ height }}
                                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                className="min-w-0 flex-1 rounded-full"
                                style={{
                                  background: `linear-gradient(180deg, ${activeStory.accent}, rgba(21,21,24,0.12))`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <svg className="mt-5 h-16 w-full overflow-visible" viewBox="0 0 480 80" aria-hidden="true">
                        <path
                          d="M4 56 C 72 20, 126 74, 190 38 S 318 30, 374 48 S 442 62, 476 22"
                          fill="none"
                          stroke={activeStory.accent}
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="story-path-draw"
                        />
                      </svg>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-social-proof"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-black/[0.06] bg-[#F4F1EC] px-4 py-20 sm:px-6 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What people feel</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              It feels personal quickly because the read starts with your real words.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_22px_70px_-56px_rgba(0,0,0,0.56)] dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-base leading-8 text-foreground">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDE9FE] text-sm font-bold text-primary">
                    {testimonial.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-features"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Product depth</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Clean enough to trust. Useful enough to return to.
            </h2>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[22px] border border-black/[0.06] bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#F4F1EC] dark:bg-white/[0.06]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-mid-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-8 sm:px-6"
      >
        <div className="nuju-neu-surface mx-auto grid max-w-6xl gap-8 rounded-[30px] p-6 text-[#4c4569] md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Begin softly</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Start with the moment you are in.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Answer a few gentle prompts, see what Ju notices, then decide whether this support should stay close.
            </p>
          </div>
          <button
            onClick={() => startOnboarding()}
            className="nuju-brand-button inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Start the Ju Gets You reveal
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </motion.section>

      <motion.section
        ref={pricingSectionRef}
        data-testid="landing-pricing-teaser"
        onViewportEnter={handlePricingVisible}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Choose after the reveal</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                If the reveal feels right, choose how Ju stays with you.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Keep the first step free. Then make the upgrade feel calm, transparent, and easy to understand.
              </p>
              {geoPricingNote && <p className="mt-4 text-sm text-muted-foreground">{geoPricingNote}</p>}
            </div>

            <div>
              <div data-testid="landing-what-you-get" className="grid gap-3 sm:grid-cols-2">
                {whatYouGetItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-[22px] border border-black/[0.06] bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {pricingCards.map((displayPlan) => {
              const isLifetime = displayPlan.name === "Lifetime";
              return (
                <div
                  key={displayPlan.name}
                  className={`flex min-h-[420px] flex-col rounded-[26px] border p-6 ${
                    isLifetime
                      ? "nuju-neu-surface border-[#7C6EDB]/18 bg-[linear-gradient(145deg,rgba(246,242,255,0.88),rgba(234,250,249,0.72))] text-[#4c4569]"
                      : "nuju-neu-surface text-foreground"
                  }`}
                >
                  <div className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${isLifetime ? "bg-[#7C6EDB]/12 text-[#7C6EDB]" : "bg-[#F4F1EC] text-muted-foreground dark:bg-white/[0.06]"}`}>
                    {displayPlan.badge}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{displayPlan.name}</h3>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-semibold">{displayPlan.price}</span>
                    {displayPlan.unit && <span className={isLifetime ? "text-[#7C6EDB]/70" : "text-muted-foreground"}>{displayPlan.unit}</span>}
                  </div>
                  <p className={`mt-4 text-sm leading-7 ${isLifetime ? "text-[#4c4569]/68" : "text-muted-foreground"}`}>
                    {displayPlan.note}
                  </p>

                  {isLifetime && <LifetimeScarcityMeter className="mt-4" scarcity={lifetimeScarcity} />}

                  <ul className="mt-6 flex-1 space-y-3">
                    {displayPlan.features.map((feature) => (
                      <li key={feature} className={`flex gap-2 text-sm ${isLifetime ? "text-[#4c4569]/72" : "text-muted-foreground"}`}>
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#4ECDC4]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={displayPlan.onClick}
                    className={`mt-8 h-12 rounded-full text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98] ${
                      isLifetime
                        ? "nuju-brand-button"
                        : "nuju-brand-button"
                    }`}
                  >
                    {displayPlan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-comparison"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-black/[0.06] bg-white/58 px-4 py-20 sm:px-6 dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Nuju vs. blank-page journaling</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Why Nuju beats journaling alone on hard days.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              When the day is heavy, the difference is how much effort you need before the support starts.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white dark:border-white/10 dark:bg-white/[0.04]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-black/[0.06] bg-[#FAF9F6] text-left dark:border-white/10 dark:bg-white/[0.04]">
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Decision point</th>
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Nuju</th>
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Journaling alone</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-black/[0.06] last:border-b-0 dark:border-white/10">
                      <th className="px-5 py-5 text-left align-top text-sm font-semibold text-foreground">{row.label}</th>
                      <td className="px-5 py-5 align-top text-sm leading-7 text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#4ECDC4]" />
                          <span>{row.nuju}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 align-top text-sm leading-7 text-muted-foreground">{row.journal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div data-testid="landing-internal-links" className="mt-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Keep comparing</p>
              <h3 className="mt-3 text-3xl font-semibold text-foreground">The pages people read before choosing a journaling app</h3>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {comparisonReadLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group rounded-[22px] border border-black/[0.06] bg-white p-5 transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{link.label}</span>
                  <h4 className="mt-4 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">{link.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{link.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-faq"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20 sm:px-6"
        id="faq"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-4xl font-semibold text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-center text-base leading-7 text-muted-foreground">
            Quick answers before you begin.
          </p>

          <div className="mt-10 space-y-3">
            {landingFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-[20px] border border-black/[0.06] bg-white dark:border-white/10 dark:bg-white/[0.04]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-semibold text-foreground">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-final-cta"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 pb-24 pt-6 sm:px-6"
      >
        <div className="nuju-neu-surface mx-auto max-w-5xl overflow-hidden rounded-[32px] p-8 text-center sm:p-12">
          <div className="nuju-neu-pressed mx-auto flex h-20 w-20 items-center justify-center rounded-[24px]">
            <img src={juMain} alt="Ju mascot" className="h-14 w-14 animate-ju-float object-contain" width={56} height={56} loading="lazy" />
          </div>
          <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            You do not need perfect words to feel understood.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Start with one honest sentence. Ju will help turn it into a clearer, softer next step.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => startOnboarding()}
              className="nuju-brand-button inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start the Ju Gets You reveal
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={scrollToPricing}
              className="nuju-soft-button inline-flex h-14 items-center justify-center rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              See plans
            </button>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            60-second reveal · No credit card to start · Private by default
          </p>
        </div>
      </motion.section>

      <section className="border-t border-black/[0.06] bg-white/58 px-4 py-16 sm:px-6 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            The AI journal app built for everyday emotional wellness
          </h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Nuju is a daily journaling app powered by artificial intelligence that helps you track your mood, understand emotional patterns, and get personalized insights in as little as 30 seconds a day. Whether you want to start a mood journal, develop a daily reflection habit, or get support from an AI coach, Nuju adapts to how you feel right now.
          </p>
          <div className="mb-8 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-foreground">AI mood tracker</h3>
              <p className="text-sm text-muted-foreground">Log your mood daily and see 30-day trends, weekly summaries, and emotional patterns you would never notice on your own.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Personal AI coach</h3>
              <p className="text-sm text-muted-foreground">Choose from four AI coaching personas and get responses tailored to your journaling style.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Daily journal prompts</h3>
              <p className="text-sm text-muted-foreground">Stuck on what to write? Nuju surfaces journaling prompts that help you reflect without blank-page anxiety.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Available as a <Link to="/install" state={{ from: "/" }} className="text-primary hover:underline">progressive web app</Link> on iOS, Android, and desktop.
            Read more on our <Link to="/about" state={{ from: "/" }} className="text-primary hover:underline">about page</Link>, or visit the <Link to="/support" state={{ from: "/" }} className="text-primary hover:underline">support center</Link> if you have questions.
            Looking for tips? Read our <Link to="/blog" className="text-primary hover:underline">journaling and wellness blog</Link>.
          </p>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] bg-[#FAF9F6] px-4 py-10 sm:px-6 dark:border-white/10 dark:bg-background">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <img src={juMain} alt="Nuju logo - Ju the AI journal companion" className="h-8 w-8 object-contain" width={32} height={32} loading="lazy" />
              <div>
                <p className="text-lg font-semibold text-foreground">Nuju</p>
                <p className="text-sm text-muted-foreground">Support that helps you feel understood.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80">Copyright 2026 Nuju. Built for quieter minds and more understood moments.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 border-t border-black/[0.06] pt-6 text-xs dark:border-white/10">
            <Link to="/about" state={{ from: "/" }} className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link to="/support" state={{ from: "/" }} className="text-muted-foreground transition-colors hover:text-foreground">Support</Link>
            <Link to="/contact" state={{ from: "/" }} className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
            <Link to="/privacy" state={{ from: "/" }} className="text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
            <Link to="/terms" state={{ from: "/" }} className="text-muted-foreground transition-colors hover:text-foreground">Terms</Link>
            <Link to="/medical-disclaimer" state={{ from: "/" }} className="text-muted-foreground transition-colors hover:text-foreground">Medical Disclaimer</Link>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom,0px),0.75rem)] pt-2 sm:hidden"
          >
            <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-black/[0.08] bg-white/95 p-1.5 pl-4 shadow-[0_20px_54px_-26px_rgba(0,0,0,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-background/95">
              <span className="text-xs font-semibold text-foreground">Feel understood in 60s</span>
              <button
                onClick={() => startOnboarding()}
              className="nuju-brand-button ml-auto inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-xs font-bold active:scale-[0.98]"
              >
                Start reveal
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

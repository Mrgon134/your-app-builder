import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { PRICING_CONFIG } from "@/lib/config";
import { ROUTES } from "@/lib/routes";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Globe,
  Heart,
  Lock,
  Mic,
  PenLine,
  Quote,
  Shield,
  Sparkles,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";
import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import juMain from "@/assets/ju-main.webp";
import juRough from "@/assets/ju-rough.webp";
import juLow from "@/assets/ju-low.webp";
import juOkay from "@/assets/ju-okay.webp";
import juGood from "@/assets/ju-good.webp";
import juGreat from "@/assets/ju-great.webp";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import HeroPatternPreview from "@/components/landing/HeroPatternPreview";
import SEOHead from "@/components/SEOHead";
import { Magnetic } from "@/components/ui/Magnetic";

const MOOD_SHOWCASE = [
  { label: "Rough", img: juRough, color: "#E8878C", line: "When everything feels too loud." },
  { label: "Low", img: juLow, color: "#6C9BCF", line: "When you are quietly holding it together." },
  { label: "Okay", img: juOkay, color: "#FFB347", line: "When the weight is steady, not loud." },
  { label: "Good", img: juGood, color: "#95E1D3", line: "When softness is finally returning." },
  { label: "Great", img: juGreat, color: "#4ECDC4", line: "When you feel yourself again." },
];

const benefitRows = [
  {
    eyebrow: "Outcome 01",
    title: "Feel understood before you need a polished explanation.",
    body: "Nuju turns a few honest answers into one readable emotional pattern, so the first reaction is relief instead of more effort.",
    proof: "The Ju Gets You reveal is meant to land in one glance. That makes the first win emotional clarity, not homework.",
    accent: "#E8878C",
    icon: Heart,
    image: juLow,
    imageAlt: "Ju feeling low",
    visualEyebrow: "What the reveal gives back",
    visualLine: "\"You are carrying more than you let people see. That is why the moment feels heavier than it looks from the outside.\"",
    chips: ["One clear read", "Under 1 minute"],
  },
  {
    eyebrow: "Outcome 02",
    title: "Get clarity that feels warm, not clinical.",
    body: "The tone is gentle on purpose. Nuju is built to help you soften enough to keep going, not feel analyzed by a clever machine.",
    proof: "The first read should feel safe before it becomes useful. That is why Ju starts with resonance before advice.",
    accent: "#7C6EDB",
    icon: Shield,
    image: juMain,
    imageAlt: "Ju mascot",
    visualEyebrow: "Why it feels easier to trust",
    visualLine: "\"Warm first. Honest second. That is what makes the deeper support feel believable instead of generic.\"",
    chips: ["Private by default", "No performance required"],
  },
  {
    eyebrow: "Outcome 03",
    title: "Leave with one honest next step instead of vague comfort.",
    body: "After the reveal, Ju points toward the kind of support that fits the moment, whether you need help naming it, calming it, or staying with it.",
    proof: "The reveal does not stop at reflection. It gives the next move enough shape that coming back later still feels easy.",
    accent: "#4ECDC4",
    icon: TrendingUp,
    image: juGreat,
    imageAlt: "Ju feeling great",
    visualEyebrow: "What happens after the click",
    visualLine: "\"Name it. Soften it. Stay with it. The first step is clearer when the pattern is not hidden anymore.\"",
    chips: ["A next step", "Easy to return to"],
  },
] as const;

const quickFeatures = [
  {
    title: "Voice or text check-ins",
    body: "Say the messy version out loud, or type quietly when you need more control.",
    icon: Mic,
  },
  {
    title: "Personal reveal",
    body: "Ju reflects the pattern it hears beneath the noise, in language meant to feel like yours.",
    icon: BrainCircuit,
  },
  {
    title: "Mood-aware companion",
    body: "Ju changes with the moment, so support does not feel like the same script every day.",
    icon: Heart,
  },
  {
    title: "Private by default",
    body: "Your entries, reveal, and check-ins stay attached to your account and your choices.",
    icon: Lock,
  },
  {
    title: "Fast enough for hard days",
    body: "Begin before the spiral grows. A few taps is enough to get Ju listening.",
    icon: Zap,
  },
  {
    title: "Support that stays close",
    body: "Keep Ju on your home screen so the next heavy moment does not start from zero.",
    icon: Smartphone,
  },
] as const;

const whatYouGetItems = [
  {
    title: "Free reveal, then private writing",
    body: "You can start with the Ju Gets You reveal and keep writing privately without a card.",
    icon: Sparkles,
  },
  {
    title: "One readable emotional pattern",
    body: "Nuju reflects what it notices in plain language that clicks fast, even when your thoughts are messy.",
    icon: PenLine,
  },
  {
    title: "A next-step direction",
    body: "The reveal points you toward the kind of support that fits the moment instead of leaving you with a vague summary.",
    icon: TrendingUp,
  },
  {
    title: "A path if you want Ju to stay",
    body: "If the fit is real, you can keep Ju close weekly, for 3 months, or with a lifetime unlock after the reveal.",
    icon: Shield,
  },
] as const;

const socialProofSignals = [
  "Feels personal quickly",
  "The reveal is the moment",
  "Easy to come back on hard days",
] as const;

const heroEmotionalArc = [
  { label: "Heavy", copy: "Say the messy part", color: "#6C9BCF" },
  { label: "Seen", copy: "Feel the read land", color: "#7C6EDB" },
  { label: "Softer", copy: "Know what helps first", color: "#4ECDC4" },
] as const;

const secondaryProofStats = [
  {
    value: "1 clear read",
    title: "An emotional read you can feel fast",
    body: "The first win is seeing your inner state reflected back in a way that clicks immediately.",
    icon: PenLine,
  },
  {
    value: "< 1 minute",
    title: "Fast enough for the moment you need it",
    body: "When support starts quickly, it is much easier to come back before things spiral bigger.",
    icon: TrendingUp,
  },
  {
    value: "1 next step",
    title: "Support that tells you where to begin",
    body: "After the reveal, Ju keeps helping you name, calm, or stay with what is there instead of leaving you alone with it.",
    icon: BrainCircuit,
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
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const hasTrackedPricingViewRef = useRef(false);

  useEffect(() => {
    trackLandingView();
    ttk.trackPageView();
  }, [trackLandingView, ttk]);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 600);
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

  const emotionalMoments = benefitRows.map((benefit) => ({
    title: benefit.title,
    body: benefit.body,
    icon: benefit.icon,
  }));

  const differencePoints = benefitRows.map((benefit) => ({
    title: benefit.visualEyebrow,
    body: benefit.proof,
  }));

  const steps = [
    {
      title: "Tell Ju what has been heavy",
      body: "The opening prompts stay light on purpose. They are there to understand what feels hard, not make you perform self-awareness first.",
      icon: Mic,
    },
    {
      title: "See the Ju Gets You reveal",
      body: "You get one clear read on what Ju notices, why it fits, and what kind of support would help first.",
      icon: Heart,
    },
    {
      title: "Choose how closely Ju stays with you",
      body: "If the reveal feels real, decide whether you want weekly, 3-month, or lifetime access.",
      icon: TrendingUp,
    },
  ];

  const proofCards = quickFeatures.slice(0, 4).map((feature) => ({
    title: feature.title,
    body: feature.body,
    icon: feature.icon,
  }));

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
  ];

  const landingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": landingFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
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
        "text": "Answer a few gentle prompts so Ju can understand what has been hard to hold alone."
      },
      {
        "@type": "HowToStep",
        "name": "See the Ju Gets You reveal",
        "text": "Get one personal read on what Ju notices, why it fits, and what support would help first."
      },
      {
        "@type": "HowToStep",
        "name": "Choose whether Ju stays close",
        "text": "Keep the support going only if the reveal feels like a genuine fit for you."
      }
    ]
  };

  const geoPricingNote = geo.hasLocalizedDisplay
    ? `Approximate prices shown in ${geo.displayCurrency} for your region`
    : geo.currency !== geo.displayCurrency
      ? `Prices shown in ${geo.displayCurrency}. Regional checkout in ${geo.currency} may appear later.`
      : null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Journaling App and Mood Tracker"
        description="Nuju helps you turn hard-to-explain feelings into one private emotional read, gentle mood patterns, and a next step that feels close to you."
        canonical="https://nuju.app/"
      />
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(landingFaqSchema)}</script>
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
              <img src={juMain} alt="Ju, the Nuju mascot" className="h-7 w-7 object-contain" width={28} height={28} />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-foreground">Nuju</p>
              <p className="text-xs font-medium text-muted-foreground">A softer way to feel understood</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollToPricing}
              className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.04] sm:inline-flex"
            >
              See plans
            </button>
            <button
              onClick={() => startOnboarding()}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
            >
              Start reveal
            </button>
          </div>
        </div>
      </nav>

      <section data-testid="landing-hero" className="relative overflow-hidden px-4 pb-24 pt-14 sm:pt-20">
        {/* Aurora blobs - animated mood-colored gradient clouds */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 hero-grid-bg opacity-60" />
          <div className="aurora-blob animate-aurora-a left-[-10%] top-[-8%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(124,110,219,0.55),transparent_65%)]" />
          <div className="aurora-blob animate-aurora-b right-[-12%] top-[4%] h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(78,205,196,0.42),transparent_65%)]" />
          <div className="aurora-blob animate-aurora-c left-[30%] top-[40%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(255,179,71,0.28),transparent_65%)]" />
          <div className="aurora-blob animate-aurora-a right-[10%] top-[55%] h-[22rem] w-[22rem] bg-[radial-gradient(circle,rgba(232,135,140,0.28),transparent_65%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="text-left">
            <Magnetic>
              <motion.div
                whileHover={{ scale: 1.04 }}
                onClick={() => startOnboarding()}
                className="group mb-7 inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-xs font-semibold text-foreground/85 shadow-[0_8px_24px_-12px_rgba(124,110,219,0.35)] backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-white/90 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#4ECDC4]/70" />
                  <span className="relative h-2 w-2 rounded-full bg-[#4ECDC4]" />
                </span>
                <span className="tracking-wide uppercase text-[11px]">Start with the Ju Gets You reveal</span>
                <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
              </motion.div>
            </Magnetic>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[5.25rem]"
            >
              When your mind feels loud,
              <br />
              <span className="text-shimmer italic">Ju makes it feel understood.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-sm font-semibold uppercase tracking-[0.18em] text-primary"
            >
              For the moments you cannot explain cleanly yet
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              Answer a few honest prompts. Ju reflects the pattern underneath the noise, then gives you one soft next step so you do not have to force clarity from a blank page.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <button
                  onClick={() => startOnboarding()}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#8A7CE8_0%,#7C6EDB_45%,#6F5FE8_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-12px_rgba(124,110,219,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_55px_-12px_rgba(124,110,219,0.7)] active:scale-[0.97]"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.4)_50%,transparent_70%)] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[gradient-flow_1.5s_ease]" />
                  <span className="relative">Start the Ju Gets You reveal</span>
                  <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={scrollToHowItWorks}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-white/60 px-6 py-4 text-sm font-semibold text-foreground/90 backdrop-blur-md transition-all hover:border-primary/30 hover:bg-white/90 active:scale-[0.97] dark:bg-white/5 dark:hover:bg-white/10"
                >
                  See how it works
                </button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 1 }}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ECDC4]" />
                60-second reveal
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Private by default
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-[#E8878C]" />
                Warm, never clinical
              </span>
            </motion.div>
          </div>

          {/* Hero visual - preview card wrapped with floating mood Ju orbs */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="relative"
          >
            {/* Floating mood orbs (desktop only) */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                className="absolute -left-10 top-8 animate-ju-orbit-a"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_20px_40px_-12px_rgba(108,155,207,0.55)] ring-4 ring-[#6C9BCF]/15">
                  <div className="absolute inset-0 rounded-full bg-[#6C9BCF]/20 blur-xl" />
                  <img src={juLow} alt="" className="relative h-14 w-14 object-contain" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
                className="absolute -right-8 top-20 animate-ju-orbit-b"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_16px_36px_-12px_rgba(78,205,196,0.55)] ring-4 ring-[#4ECDC4]/15">
                  <div className="absolute inset-0 rounded-full bg-[#4ECDC4]/20 blur-xl" />
                  <img src={juGreat} alt="" className="relative h-11 w-11 object-contain" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                className="absolute -left-14 bottom-6 animate-ju-orbit-c"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_14px_30px_-12px_rgba(255,179,71,0.55)] ring-4 ring-[#FFB347]/15">
                  <div className="absolute inset-0 rounded-full bg-[#FFB347]/20 blur-xl" />
                  <img src={juOkay} alt="" className="relative h-10 w-10 object-contain" />
                </div>
              </motion.div>
            </div>

             <HeroPatternPreview />

             <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto mt-5 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/72 p-3 shadow-[0_20px_55px_-34px_rgba(80,63,153,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8"
             >
              <div className="absolute left-8 right-8 top-8 h-px bg-[linear-gradient(90deg,rgba(108,155,207,0.08),rgba(124,110,219,0.55),rgba(78,205,196,0.08))]" aria-hidden />
              <div className="grid gap-2 sm:grid-cols-3">
                {heroEmotionalArc.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05 + index * 0.1, duration: 0.45 }}
                    className="relative rounded-[1.25rem] border border-border/50 bg-background/78 px-4 py-3 text-left dark:border-white/10 dark:bg-white/6"
                  >
                    <span
                      className="mb-3 flex h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]"
                      style={{ backgroundColor: item.color, color: item.color }}
                    />
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{item.copy}</p>
                  </motion.div>
                ))}
              </div>
             </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social proof strip - right under hero */}
      <section data-testid="landing-proof-bar" className="relative px-4 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-5xl flex-col gap-4 rounded-[2rem] border border-border/50 bg-card/80 px-6 py-5 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex -space-x-2">
            {[juRough, juLow, juOkay, juGood, juGreat].map((src, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full bg-white ring-2 ring-white shadow-sm overflow-hidden"
                style={{ zIndex: 5 - i }}
              >
                <img src={src} alt="" className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[#FFB347]">
            {[0,1,2,3,4].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L10 15l-5.3 2.8 1-5.8L1.4 7.7l5.9-.9z" />
              </svg>
            ))}
          </div>
          <p className="text-sm font-medium text-foreground/85">
            The moment that matters: <span className="font-bold text-foreground">"It noticed what I could not name."</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {["60-second reveal", "No credit card to start", "Private by default"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Meet Ju - mood showcase */}
      <motion.section
        data-testid="landing-visual-strip"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden px-4 py-24"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="aurora-blob animate-aurora-c left-[10%] top-[20%] h-80 w-80 bg-[radial-gradient(circle,rgba(149,225,211,0.35),transparent_65%)]" />
          <div className="aurora-blob animate-aurora-b right-[10%] bottom-[10%] h-80 w-80 bg-[radial-gradient(circle,rgba(232,135,140,0.25),transparent_65%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Meet Ju in the moment</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              See Ju across the moods.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Five tender expressions. One companion that changes with how you feel, so support never arrives the same way every time.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {MOOD_SHOWCASE.map((mood, index) => (
              <motion.div
                key={mood.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
                className="group relative flex flex-col items-center rounded-[2rem] border border-border/50 bg-card/80 p-6 text-center shadow-[0_10px_30px_-14px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all hover:shadow-[0_20px_50px_-18px_rgba(0,0,0,0.2)]"
                style={{
                  background: `linear-gradient(180deg, ${mood.color}12 0%, transparent 55%), hsl(var(--card) / 0.8)`,
                }}
              >
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-90"
                  style={{ background: mood.color }}
                />
                <div
                  className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.15)] ring-4 transition-transform group-hover:scale-105"
                  style={{ boxShadow: `0 14px 32px -12px ${mood.color}88`, borderColor: `${mood.color}30` }}
                >
                  <img
                    src={mood.img}
                    alt={`Ju feeling ${mood.label}`}
                    className="h-16 w-16 object-contain transition-transform duration-500 group-hover:animate-ju-float"
                    loading="lazy"
                  />
                </div>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ background: `${mood.color}1f`, color: mood.color }}
                >
                  {mood.label}
                </span>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{mood.line}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            data-testid="landing-proof-strip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-14 max-w-2xl text-center"
          >
            <p className="font-writing text-xl italic leading-8 text-foreground/85 sm:text-2xl">
              "The first time I opened it on a bad day, Ju looked like how I was feeling. That was the moment I knew."
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">- Early user - 4 months with Ju</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-benefits"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-border/50 bg-secondary/35 px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">When the feeling finally has words</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              What changes after the reveal starts landing.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The first relief is simple: feeling seen in a moment that usually stays trapped inside you.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {emotionalMoments.map((moment, index) => {
              const Icon = moment.icon;
              const accents = ["#E8878C", "#7C6EDB", "#4ECDC4"];
              const accent = accents[index] ?? "#7C6EDB";
              return (
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  key={moment.title}
                  className="group relative overflow-hidden glass-card rounded-[2rem] p-7"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1 opacity-80"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />
                  <div
                    className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
                    style={{ background: accent }}
                  />
                  <div
                    className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${accent}1a`, color: accent }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <h3 className="relative font-serif text-2xl font-semibold text-foreground">{moment.title}</h3>
                  <p className="relative mt-4 text-base leading-7 text-muted-foreground">{moment.body}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 grid gap-8 rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:grid-cols-[0.85fr_1.15fr]"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">The real shift</p>
              <h3 className="mt-4 max-w-md font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                You are not being asked to perform self-awareness first.
              </h3>
              <p className="mt-4 max-w-md text-base leading-8 text-muted-foreground">
                Nuju is meant to meet you before the polished insight. The first job is helping you feel understood quickly enough that you want to keep going.
              </p>
            </div>
            <div className="grid gap-5">
              {differencePoints.map((point) => (
                <div key={point.title} className="border-b border-border/60 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-lg font-semibold text-foreground">{point.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{point.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={howItWorksRef}
        data-testid="landing-how-it-works"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How it works</p>
              <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                A few honest answers. One deeply personal read.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                You do not need to understand the whole app first. You only need one moment where Ju reflects something true enough that you feel it.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(124,110,219,0.08),rgba(78,205,196,0.05))] p-7 shadow-[0_14px_40px_-18px_rgba(124,110,219,0.35)]"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                <p className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Why it feels different</p>
                <p className="relative mt-3 font-writing text-[1.6rem] italic leading-9 text-foreground">
                  Feel understood first.
                  <br />
                  The deeper support can come after.
                </p>
              </motion.div>
            </div>

            <div className="relative grid gap-5">
              {/* Vertical connector line */}
              <div className="absolute left-[32px] top-4 bottom-4 hidden w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent sm:block" aria-hidden="true" />
              {steps.map((step, index) => {
                const Icon = step.icon;
                const stepAccents = ["#E8878C", "#7C6EDB", "#4ECDC4"];
                const accent = stepAccents[index] ?? "#7C6EDB";
                return (
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 100 }}
                    key={step.title}
                    className="relative rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-[0_10px_28px_-12px_rgba(0,0,0,0.15)]"
                        style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}0d)` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: accent }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em]"
                            style={{ background: `${accent}15`, color: accent }}
                          >
                            Step 0{index + 1}
                          </p>
                        </div>
                        <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">{step.title}</h3>
                        <p className="mt-3 text-base leading-7 text-muted-foreground">{step.body}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-social-proof"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#f7f5ff] px-4 py-20 dark:bg-[#18152a]"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Early notes</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              What early users keep saying.
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-8"
          >
            <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">After a few weeks</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-foreground">
                  That first read becomes something you can return to.
                </h3>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Once the trust is there, the deeper patterns start to matter more. But the first win is still the feeling of being understood quickly.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {secondaryProofStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                    key={stat.value} 
                    className="rounded-[1.6rem] bg-secondary/45 p-5 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-5 font-serif text-3xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{stat.title}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{stat.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {proofCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                  key={card.title}
                  className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => {
              const avatars = [juGood, juOkay, juGreat];
              const accents = ["#95E1D3", "#FFB347", "#4ECDC4"];
              const avatar = avatars[index] ?? juMain;
              const accent = accents[index] ?? "#7C6EDB";
              return (
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  key={item.name}
                  className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-7 shadow-sm transition-all hover:shadow-xl"
                >
                  <div
                    className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
                    style={{ background: accent }}
                  />
                  <Quote className="relative h-6 w-6" style={{ color: `${accent}99` }} />
                  <p className="relative mt-4 font-writing text-[17px] italic leading-8 text-foreground">"{item.text}"</p>
                  <div className="relative mt-6 flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-2"
                      style={{ boxShadow: `0 6px 18px -6px ${accent}aa`, borderColor: accent }}
                    >
                      <img src={avatar} alt="" className="h-8 w-8 object-contain" loading="lazy" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-[2rem] border border-border/60 bg-card px-6 py-7 shadow-sm sm:px-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why people keep going</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground">
                  The experience works when you feel seen fast.
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "It feels personal quickly",
                  "The first read lands in one glance",
                  "Coming back still feels easy on hard days",
                ].map((line, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    key={line} 
                    className="rounded-[1.5rem] bg-secondary/45 px-4 py-4 text-sm leading-6 text-foreground"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-features"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What stays with you</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              The support stays small enough to use.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A hard day needs fewer decisions, clearer words, and a place that does not ask you to become articulate first.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {quickFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-mid-cta"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-6"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-[linear-gradient(135deg,#F5F3FF_0%,#FFFFFF_48%,#EEF9F7_100%)] px-6 py-10 shadow-[0_30px_70px_-30px_rgba(124,110,219,0.4)] sm:px-10 dark:border-primary/30 dark:bg-[linear-gradient(135deg,#1E1A34_0%,#191527_55%,#14202A_100%)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Start gently</p>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                Start with the reveal. Decide on plans later.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                If the read feels close, take the lowest-friction next step. You can decide how long Ju stays after you feel the fit.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                onClick={() => startOnboarding()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#8A7CE8_0%,#7C6EDB_45%,#6F5FE8_100%)] px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(124,110,219,0.7)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Start the Ju Gets You reveal
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={scrollToPricing}
                className="inline-flex items-center justify-center rounded-full border border-border/70 bg-white/70 px-6 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-white active:scale-[0.97] dark:bg-white/5 dark:hover:bg-white/10"
              >
                See plans
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["60-second reveal", "No credit card to start", "Private by default"].map((item) => (
              <span
                key={item}
                className="inline-flex rounded-full border border-border/50 bg-white/70 px-3 py-1.5 text-xs font-semibold text-foreground/80 dark:bg-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={pricingSectionRef}
        data-testid="landing-pricing-teaser"
        onViewportEnter={handlePricingVisible}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              What you get
            </p>
            <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              What you get when you start.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Start with the reveal, get one clear read, and only then decide whether you want Ju to stay close.
            </p>
          </div>

          <div data-testid="landing-what-you-get" className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whatYouGetItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Plans after the reveal</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              If the reveal feels right, choose how Ju stays with you.
            </h3>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Pricing is here for clarity, not pressure. The job of the page is still to get you into the reveal first.
            </p>
            {geoPricingNote ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                {geoPricingNote}
              </div>
            ) : null}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {pricingCards.map((displayPlan, index) => {
              const isLifetime = displayPlan.name === "Lifetime";
              const isThreeMonth = displayPlan.name === "3 Month";
              const isFree = displayPlan.name === "Start free";
              return (
                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  key={displayPlan.name}
                  className={`relative rounded-[2rem] border p-8 flex flex-col transition-all ${
                    isLifetime
                      ? "border-primary/35 bg-[linear-gradient(180deg,rgba(245,241,255,0.96),rgba(255,255,255,0.99))] shadow-[0_20px_50px_-24px_rgba(124,110,219,0.38)] hover:shadow-[0_28px_60px_-24px_rgba(124,110,219,0.55)] dark:border-[#9385F6]/45 dark:bg-[radial-gradient(circle_at_top,rgba(156,137,255,0.22),transparent_45%),linear-gradient(180deg,#201934_0%,#161124_100%)] dark:shadow-[0_20px_50px_-24px_rgba(86,70,177,0.55)]"
                      : isThreeMonth
                      ? "border-primary/40 bg-card shadow-[0_20px_50px_-24px_rgba(124,110,219,0.35)] ring-1 ring-primary/15 hover:shadow-[0_28px_60px_-24px_rgba(124,110,219,0.5)] dark:border-primary/40 dark:bg-white/[0.04]"
                      : isFree
                      ? "border-[#4ECDC4]/25 bg-[linear-gradient(180deg,rgba(78,205,196,0.08),rgba(255,255,255,0.95))] shadow-sm"
                      : "border-border/60 bg-card shadow-sm hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
                  }`}
                >
                  {isThreeMonth && (
                    <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />
                  )}
                  {displayPlan.badge && (
                    <div
                      className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        isLifetime
                          ? "bg-[#FFD166] text-[#1A1A2E]"
                          : "bg-[#FFD166] text-[#1A1A2E]"
                      }`}
                    >
                      {displayPlan.badge}
                    </div>
                  )}

                  <h3 className={`font-serif text-2xl font-semibold ${isLifetime ? "text-foreground dark:text-white" : "text-foreground"}`}>
                    {displayPlan.name}
                  </h3>
                  <div className="mt-4 flex items-end gap-1">
                    <span className={`text-4xl font-bold ${isLifetime ? "text-foreground dark:text-white" : "text-foreground"}`}>
                      {displayPlan.price}
                    </span>
                    {!isLifetime && displayPlan.unit && (
                      <span className="text-muted-foreground">
                        {displayPlan.unit}
                      </span>
                    )}
                    {isLifetime && (
                      <span className="text-muted-foreground dark:text-white/70">one-time</span>
                    )}
                  </div>
                  <p className={`mt-3 text-sm leading-6 ${
                    isLifetime
                      ? "text-muted-foreground dark:text-white/78"
                      : "text-muted-foreground"
                  }`}>
                    {displayPlan.note}
                  </p>

                  {isLifetime && (
                    <LifetimeScarcityMeter
                      className="mt-4"
                      scarcity={lifetimeScarcity}
                    />
                  )}

                  <ul className="mt-6 mb-8 flex-1 space-y-3">
                    {displayPlan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 text-sm ${
                          isLifetime
                            ? "text-muted-foreground dark:text-white/82"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isLifetime
                              ? "text-primary dark:text-[#B8AEFF]"
                              : "text-primary"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={displayPlan.onClick}
                    className={`mt-auto w-full rounded-2xl py-3.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                      isLifetime
                        ? "bg-[linear-gradient(135deg,#9385F6,#6F5FE8)] text-white hover:shadow-[0_18px_35px_-18px_rgba(124,110,219,0.75)] dark:bg-[linear-gradient(135deg,#9B8FFF,#7767EA)]"
                        : isFree
                          ? "bg-[linear-gradient(135deg,#4ECDC4,#2EB8A6)] text-white hover:shadow-[0_18px_35px_-18px_rgba(46,184,166,0.7)]"
                          : "border border-[#D8D0EE] bg-[#E9E4F6] text-[#2E2550] hover:bg-[#DED6F1] hover:shadow-[0_12px_24px_-18px_rgba(45,37,80,0.35)] dark:border-white/10 dark:bg-white/10 dark:text-white"
                    }`}
                  >
                    {displayPlan.cta}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-comparison"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-border/50 bg-secondary/35 px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Nuju vs. blank-page journaling</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Why Nuju beats journaling alone on hard days.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              When the day is heavy, the difference is how much effort you need before the support starts.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/30 text-left">
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Decision point</th>
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Nuju</th>
                    <th className="px-5 py-4 text-sm font-semibold text-foreground">Journaling alone</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-border/40 last:border-b-0">
                      <th className="px-5 py-5 text-left align-top text-sm font-semibold text-foreground">{row.label}</th>
                      <td className="px-5 py-5 align-top text-sm leading-7 text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
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

          <div
            data-testid="landing-internal-links"
            className="mt-10 rounded-[2rem] border border-border/60 bg-card/80 p-6 shadow-sm sm:p-8"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Keep comparing
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground">
                The pages people read before choosing a journaling app
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                If you want the category view before starting, these honest comparison pages
                are the fastest way to understand where Nuju fits.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {comparisonReadLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group rounded-[1.75rem] border border-border/50 bg-background/85 p-5 transition-all hover:border-primary/35 hover:shadow-md"
                >
                  <span className="inline-flex rounded-full border border-border/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {link.label}
                  </span>
                  <h4 className="mt-4 font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {link.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {link.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read the comparison <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-faq"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-20 bg-background"
        id="faq"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-serif text-center mb-6 font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-sm">
            Quick answers before you begin.
          </p>

          <div className="space-y-4">
            {landingFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-card/50 rounded-xl overflow-hidden border border-border/40 hover:border-border/60 transition-all"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium text-[15px] list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 shrink-0 ml-4" />
                </summary>
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        data-testid="landing-final-cta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative px-4 pb-24 pt-6"
      >
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-[linear-gradient(135deg,#F5F3FF_0%,#FFFFFF_50%,#EEF9F7_100%)] px-6 py-14 text-center shadow-[0_40px_80px_-30px_rgba(124,110,219,0.35)] sm:px-10 dark:border-primary/30 dark:bg-[linear-gradient(135deg,#1E1A34_0%,#191527_55%,#14202A_100%)]">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="aurora-blob animate-aurora-a left-[-10%] top-[-20%] h-72 w-72 bg-[radial-gradient(circle,rgba(124,110,219,0.35),transparent_65%)]" />
            <div className="aurora-blob animate-aurora-b right-[-10%] bottom-[-20%] h-72 w-72 bg-[radial-gradient(circle,rgba(78,205,196,0.3),transparent_65%)]" />
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_-14px_rgba(124,110,219,0.45)] ring-4 ring-primary/15"
          >
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
            <img src={juMain} alt="Ju mascot celebrating - Nuju AI journal companion" className="relative h-16 w-16 animate-ju-float object-contain" width={64} height={64} loading="lazy" />
          </motion.div>

          <h2 className="relative mt-8 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            You don't need perfect words
            <br />
            <span className="text-shimmer italic">to feel understood.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Open Nuju when your thoughts feel crowded. Answer a few quick prompts, see what Ju notices, and keep the support only if the reveal feels right.
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <button
                onClick={() => startOnboarding()}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#8A7CE8_0%,#7C6EDB_45%,#6F5FE8_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_-14px_rgba(124,110,219,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-14px_rgba(124,110,219,0.75)] active:scale-[0.97]"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.4)_50%,transparent_70%)] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[gradient-flow_1.5s_ease]" />
                <span className="relative">Start the Ju Gets You reveal</span>
                <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={scrollToPricing}
                className="rounded-full border border-border/70 bg-white/70 px-6 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white active:scale-[0.97] dark:bg-white/5 dark:hover:bg-white/10"
              >
                See plans
              </button>
            </Magnetic>
          </div>
          <p className="relative mt-5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            60-second reveal - No credit card to start - Private by default
          </p>
        </div>
      </motion.section>

      {/* SEO content section - keyword-rich, indexed by Google */}
      <section className="border-t border-border/40 bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            The AI journal app built for everyday emotional wellness
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nuju is a daily journaling app powered by artificial intelligence that helps you track your mood, understand emotional patterns, and get personalized insights in as little as 30 seconds a day. Whether you want to start a mood journal, develop a daily reflection habit, or get support from an AI coach, Nuju adapts to how you feel right now.
          </p>
          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI mood tracker</h3>
              <p className="text-sm text-muted-foreground">Log your mood daily and see 30-day trends, weekly summaries, and emotional patterns you'd never notice on your own.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Personal AI coach</h3>
              <p className="text-sm text-muted-foreground">Choose from four AI coaching personas - Gentle Guide, Tough Coach, Wise Sage, or Fun Friend - and get responses tailored to your journaling style.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Daily journal prompts</h3>
              <p className="text-sm text-muted-foreground">Stuck on what to write? Nuju surfaces a new journaling prompt each day to help you reflect on what matters - no blank-page anxiety.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Available as a <Link to="/install" state={{ from: "/" }} className="text-primary hover:underline">progressive web app</Link> on iOS, Android, and desktop.
            Read more on our <Link to="/about" state={{ from: "/" }} className="text-primary hover:underline">about page</Link>, or visit the <Link to="/support" state={{ from: "/" }} className="text-primary hover:underline">support center</Link> if you have questions.
            Looking for tips? Read our <Link to="/blog" className="text-primary hover:underline">journaling and wellness blog</Link>.
          </p>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-10 bg-card/50">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <img src={juMain} alt="Nuju logo - Ju the AI journal companion" className="h-8 w-8 object-contain" width={32} height={32} loading="lazy" />
              <div>
                <p className="font-serif text-lg font-bold text-foreground">Nuju</p>
                <p className="text-sm text-muted-foreground">Support that helps you feel understood.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80">Copyright 2026 Nuju. Built for quieter minds and more understood moments.</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs border-t border-border/40 pt-6">
            <Link to="/about" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <span className="text-border/40">-</span>
            <Link to="/support" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Support</Link>
            <span className="text-border/40">-</span>
            <Link to="/contact" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <span className="text-border/40">-</span>
            <Link to="/privacy" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <span className="text-border/40">-</span>
            <Link to="/terms" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <span className="text-border/40">-</span>
            <Link to="/medical-disclaimer" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA - appears after scrolling past the hero */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom,0px),0.75rem)] pt-2 sm:hidden"
          >
            <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-border/60 bg-card/95 p-1.5 pl-4 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <span className="text-xs font-semibold text-foreground">Feel understood in 60s</span>
              <button
                onClick={() => startOnboarding()}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#8A7CE8,#6F5FE8)] px-4 py-2.5 text-xs font-bold text-white shadow-[0_10px_24px_-10px_rgba(124,110,219,0.6)] active:scale-[0.97]"
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

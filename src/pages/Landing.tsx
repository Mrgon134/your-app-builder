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

import AppStoreCta from "@/components/AppStoreCta";
import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import HeroPatternPreview from "@/components/landing/HeroPatternPreview";
import SEOHead from "@/components/SEOHead";
import { Magnetic } from "@/components/ui/Magnetic";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { PRICING_CONFIG } from "@/lib/config";
import { APP_STORE_URL } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import juGood from "@/assets/ju-good.webp";
import juGreat from "@/assets/ju-great.webp";
import juLow from "@/assets/ju-low.webp";
import juMain from "@/assets/ju-main.webp";
import juOkay from "@/assets/ju-okay.webp";
import juRough from "@/assets/ju-rough.webp";

const MOOD_SHOWCASE = [
  { label: "Rough", img: juRough, color: "#E8878C", line: "Chest tight, brain too loud, can't tell why." },
  { label: "Low", img: juLow, color: "#6C9BCF", line: "Functioning on autopilot. Holding it together for everyone but you." },
  { label: "Okay", img: juOkay, color: "#FFB347", line: "The numbness day. Not bad. Not anything." },
  { label: "Good", img: juGood, color: "#95E1D3", line: "First time you've actually exhaled this week." },
  { label: "Great", img: juGreat, color: "#4ECDC4", line: "Brain quiet. You feel like a person again." },
] as const;

const heroSignals = [
  { label: "Private", value: "Encrypted. Never trained on. Never sold.", icon: Lock },
  { label: "30 seconds", value: "Faster than your brain can spiral.", icon: Zap },
  { label: "Free first", value: "No card. No paywall. Reveal first.", icon: Heart },
] as const;

const heroEmotionalArc = [
  { label: "Dump the noise", copy: "Voice or text. Messy is fine.", color: "#6C9BCF" },
  { label: "See yourself", copy: "Ju names the feeling you couldn't.", color: "#7C6EDB" },
  { label: "One next move", copy: "Small enough to actually do tonight.", color: "#4ECDC4" },
] as const;

const benefitRows = [
  {
    eyebrow: "No blank page",
    title: "You don't have to know what's wrong to start.",
    body: "Say it messy. Voice memo, half-sentence, whatever falls out at 11pm. Ju does the sorting so your brain doesn't have to.",
    proof: "Most reveals land in under 60 seconds.",
    accent: "#6C9BCF",
    icon: Mic,
    image: juLow,
    imageAlt: "Ju holding a low mood moment",
  },
  {
    eyebrow: "Finally accurate",
    title: "The read that makes you go 'yeah, that's it.'",
    body: "Ju mirrors back what you actually meant — including the part you couldn't quite say. No vague affirmations. No therapy-speak.",
    proof: "It sounds like you, because it started with your words.",
    accent: "#7C6EDB",
    icon: BrainCircuit,
    image: juMain,
    imageAlt: "Ju mascot giving a gentle reflection",
  },
  {
    eyebrow: "One small move",
    title: "End with one thing you can actually do tonight.",
    body: "Not a 12-step plan. One specific next move, sized for the energy you have right now — even if that's a single breath.",
    proof: "Built for the days you can barely open your phone.",
    accent: "#4ECDC4",
    icon: TrendingUp,
    image: juGreat,
    imageAlt: "Ju feeling great",
  },
] as const;

const storyMoments = [
  {
    phase: "01",
    title: "Type what you'd normally keep inside.",
    body: "Half-sentences. Fragments. A voice memo while you pace the kitchen. Whatever your brain actually sounds like at 11pm — that's the input.",
    sample: "I feel tangled today. Everything feels too loud and I just want to disappear for a bit.",
    signal: "Overstimulated",
    metric: "Low energy, high noise",
    reflection: "Ju hears a nervous system that's been pushed too far — not a person who's failing to cope.",
    action: "Phone face-down. Two minutes of nothing.",
    accent: "#6C9BCF",
    icon: Mic,
    bars: [36, 72, 48, 84, 58, 74],
  },
  {
    phase: "02",
    title: "Ju hands you the word you were chasing.",
    body: "A short read appears. Specific to you, not a wellness quote. It's the moment the feeling finally has a name.",
    sample: "The heaviness isn't 'just sadness.' Your nervous system has been processing too much input for too long and ran out of bandwidth.",
    signal: "Named, not just tagged",
    metric: "The 'oh that's it' moment",
    reflection: "Naming it doesn't fix it. But it stops the loop of 'why do I even feel like this.'",
    action: "Say the loudest feeling out loud, once.",
    accent: "#7C6EDB",
    icon: BrainCircuit,
    bars: [42, 50, 78, 62, 88, 70],
  },
  {
    phase: "03",
    title: "The pattern you keep missing.",
    body: "After a few entries, Ju starts pointing at the loop you're stuck in — the trigger, the day, the person, the time of week.",
    sample: "This fog shows up the day after you say yes to back-to-back plans. Three weeks in a row now.",
    signal: "Recurring arc",
    metric: "Tuesday spikes you didn't notice",
    reflection: "The week stops feeling random once the pattern has a name.",
    action: "Block one low-input hour this week.",
    accent: "#4ECDC4",
    icon: TrendingUp,
    bars: [34, 46, 66, 92, 54, 76],
  },
  {
    phase: "04",
    title: "One move small enough to actually do.",
    body: "No 12-step plan. One specific thing, sized for low-energy you. Something you can finish before bed without negotiating with yourself.",
    sample: "You don't have to solve today. Lower the input first. The story can wait until your nervous system catches up.",
    signal: "Relief direction",
    metric: "One small move",
    reflection: "You don't have to solve the whole day. Start with one breath.",
    action: "Shoulders down. One slow exhale. That counts.",
    accent: "#FFB347",
    icon: Sparkles,
    bars: [48, 58, 64, 74, 86, 92],
  },
] as const;

const quickFeatures = [
  {
    title: "Voice or text. Your call.",
    body: "Talk it out while pacing. Type it in bed. Whatever your brain can manage right now.",
    icon: Mic,
  },
  {
    title: "The 'finally accurate' read",
    body: "A reflection that sounds like you — not a Google search, not a wellness quote. Specific enough to actually land.",
    icon: BrainCircuit,
  },
  {
    title: "Ju shifts with your mood",
    body: "A rough Tuesday doesn't get the same response as a regular one. Four coach personas, picked by you.",
    icon: Heart,
  },
  {
    title: "Private. Yours. Period.",
    body: "Row-level encryption. We don't train on your entries. No selling, no ads, no leaks. Ever.",
    icon: Lock,
  },
  {
    title: "Built for 3am brain",
    body: "Three taps to start. Designed for when you have zero bandwidth and the thoughts still need to go somewhere.",
    icon: Zap,
  },
  {
    title: "One tap from your home screen",
    body: "Install on iOS, Android, or desktop. Opens faster than your spiral can build.",
    icon: Smartphone,
  },
] as const;

const whatYouGetItems = [
  {
    title: "The free Ju Gets You read",
    body: "Get the reveal before you pay anything. Test the fit. If it doesn't land, you owe nothing.",
    icon: Sparkles,
  },
  {
    title: "Private writing, always free",
    body: "A quiet space for the stuff that's not ready for anyone else stays open even without a plan.",
    icon: PenLine,
  },
  {
    title: "A pattern you can actually use",
    body: "Not a diagnosis. The throughline that explains why this week keeps repeating itself.",
    icon: BrainCircuit,
  },
  {
    title: "A next move, not a vibe",
    body: "Know what would actually help first. Stop leaving with 'just breathe' and zero plan.",
    icon: TrendingUp,
  },
] as const;

const testimonials = [
  {
    name: "Lena R.",
    role: "Couldn't sleep at 2am",
    text: "I'd type one messy sentence and Ju would hand me back the word I'd been chasing for three days. That's when I stayed.",
  },
  {
    name: "Marcus T.",
    role: "Bottles everything up",
    text: "First app that didn't try to therapize me. It just told me what I was actually feeling, without dressing it up.",
  },
  {
    name: "Aisha K.",
    role: "Out of words that week",
    text: "I opened it on a day I couldn't even text my best friend. Thirty seconds later I knew what to do next.",
  },
] as const;

const comparisonRows = [
  {
    label: "When your brain is too loud to start",
    nuju: "Three taps. Voice or text. Ju handles the noise from here.",
    journal: "You have to organize your thoughts before you can even begin.",
  },
  {
    label: "Feeling actually understood, fast",
    nuju: "Ju hands you the word you couldn't find — in under a minute.",
    journal: "You write. You re-read. You guess at the meaning yourself.",
  },
  {
    label: "Knowing what would actually help",
    nuju: "One small move at the end, sized for the energy you have tonight.",
    journal: "The notebook closes. You're still alone with the question.",
  },
  {
    label: "Showing up on the bad days",
    nuju: "Zero setup. Built for the days you can barely open your phone.",
    journal: "Every entry starts from scratch. The friction wins on hard days.",
  },
  {
    label: "Not feeling worse after writing",
    nuju: "Ju reflects without judgment. The first line is the hardest — then it gets easier.",
    journal: "Some days the blank page makes the spiral worse, not better.",
  },
] as const;

const comparisonReadLinks = [
  {
    href: "/ai-journal",
    label: "Product overview",
    title: "Nuju as an AI journal",
    body: "Full feature breakdown, free vs paid, coach personas, and exactly how your privacy is handled.",
  },
  {
    href: "/mood-tracker",
    label: "Product overview",
    title: "Nuju as a mood tracker",
    body: "How a 10-second check-in becomes 30-day trends, AI summaries, and the patterns you keep missing.",
  },
  {
    href: "/voice-journaling",
    label: "Product overview",
    title: "Voice journaling in Nuju",
    body: "Talk for a minute. Get a transcript and a real AI reflection. Spoken entries feed your mood patterns.",
  },
  {
    href: "/blog/best-ai-journaling-apps",
    label: "Category guide",
    title: "Best AI journaling apps",
    body: "How Nuju stacks up on privacy, mood tracking, and whether the AI actually understands you.",
  },
  {
    href: "/blog/best-mood-tracker-apps",
    label: "Category guide",
    title: "Best mood tracker apps",
    body: "Eight trackers tested over 30 days. Only three explained patterns — the rest just stored them.",
  },
  {
    href: "/blog/daylio-alternatives",
    label: "Alternative guide",
    title: "Best Daylio alternatives",
    body: "If you've outgrown emoji logs and want a tracker that actually tells you what's going on.",
  },
  {
    href: "/blog/reflectly-alternatives",
    label: "Alternative guide",
    title: "Best Reflectly alternatives",
    body: "When you need more than canned prompts and beginner structure to feel any different.",
  },
  {
    href: "/blog/apple-journal-alternatives",
    label: "Alternative guide",
    title: "Best Apple Journal alternatives",
    body: "Cross-platform options for iPhone users hitting Apple Journal's iOS-only, zero-AI wall.",
  },
  {
    href: "/blog/best-self-reflection-apps",
    label: "Category guide",
    title: "Best self-reflection apps",
    body: "Seven apps tested. Only the ones that read your entries back built any real self-awareness.",
  },
] as const;

const landingFaqs = [
  {
    q: "Do I need to pay before I can use Nuju?",
    a: "No. The Ju Gets You reveal is free — no credit card, no signup paywall. If the read actually lands, you can keep Ju close with weekly, 3-month, or lifetime access. If it doesn't, you owe nothing.",
  },
  {
    q: "What exactly happens in the reveal?",
    a: "A few quick prompts, then Ju hands back the emotional pattern it picked up on, why that read fits you, and the first move that would actually help. Most people finish in under 60 seconds.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Entries are encrypted, locked to your account with row-level security, and never used to train any AI model. We don't sell your data. We don't run ads. That's the whole policy.",
  },
  {
    q: "Why does Nuju ask for my name and email so early?",
    a: "Because a generic read isn't a read. Your name lets the reflection sound like it was written for you, and your email keeps that read attached to the same account if you decide to come back tomorrow.",
  },
  {
    q: "What plans are available if I want Ju to stay with me?",
    a: "Weekly if you want to test the rhythm. 3-month if you're building the habit. Lifetime if you already know this is the support that should stick around — one payment, no renewals.",
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
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (wasDark) root.classList.add("dark");
    };
  }, []);

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
      note: "Get the Ju Gets You read. Keep a private writing space. No card, no gate, no email-required wall.",
      cta: "Start free",
      features: ["Personal reveal", "Private writing stays free"],
      onClick: () => startOnboarding(),
    },
    {
      name: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      unit: "/week",
      badge: "Lowest commitment",
      note: "Cheapest way to test if Ju actually helps your week — not just your one bad night.",
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
        ? `Start free for ${threeMonthTrialDays} days if you qualify, then let Ju become the place you check in.`
        : "Long enough to build the rhythm. Long enough to actually notice the patterns shifting.",
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
      note: "One payment. Never billed again. For people who already know this is the support that should stick around.",
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
    "description": "How Nuju turns a messy 30-second check-in into a read that finally fits, in three steps.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Dump the noise",
        "text": "Type or voice-record whatever your brain actually sounds like right now. Messy is the point — Ju does the sorting.",
      },
      {
        "@type": "HowToStep",
        "name": "See the Ju Gets You reveal",
        "text": "Get one personal read on what Ju notices, why it fits you, and the first move that would actually help.",
      },
      {
        "@type": "HowToStep",
        "name": "Choose whether Ju stays close",
        "text": "Keep going only if the reveal actually landed. No pressure, no card required to find out.",
      },
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nuju",
    alternateName: ["Nuju AI Journal", "Nu Ju", "Nuju Mood Tracker"],
    applicationCategory: "HealthApplication",
    applicationSubCategory: "AI Journaling and Mood Tracking",
    operatingSystem: "Web browser, iOS, Android",
    url: "https://nuju.app/",
    description:
      "Nuju is the AI journal and mood tracker app for racing thoughts and feelings you can't put into words yet. Voice or text check-ins, AI-generated reads, weekly patterns, and one small next move per entry — built for 3am brain.",
    image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
    featureList: [
      "Quick mood and energy check-ins",
      "Written and voice journaling",
      "Free AI journal reveal before payment",
      "Mood tracking apps with AI insights",
      "AI summaries and weekly patterns",
      "30-day mood and energy trend charts",
      "Four coach personas for different reflection styles",
      "Private storage with no AI training on entries",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free Ju Gets You reveal and quick mood check-in flow.",
    },
  };

  const geoPricingNote = geo.hasLocalizedDisplay
    ? `Approximate prices shown in ${geo.displayCurrency} for your region`
    : geo.currency !== geo.displayCurrency
      ? `Prices shown in ${geo.displayCurrency}. Regional checkout in ${geo.currency} may appear later.`
      : null;

  return (
    <div
      className="min-h-screen bg-[#FAF9F6] text-[#3f3a52]"
    >
      <SEOHead
        title="Nuju — AI Journal App for Mood Tracking & Emotional Clarity"
        description="Nuju is the AI journal and mood tracker app for racing thoughts, 3am overthinking, and feelings you can't name yet. Turn 30 seconds of mess into a read that lands. Start the Ju Gets You reveal free."
        canonical="https://nuju.app/"
        noSuffix
      />
      <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => startOnboarding()}
              className="nuju-brand-button h-10 rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Try Nuju free
            </button>
            <AppStoreCta size="sm" className="hidden h-10 px-4 sm:inline-flex" />
          </div>
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
              For the 3am "I don't know what's wrong"
            </div>

            <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-[0.98] text-foreground sm:text-7xl lg:text-[92px]">
              Your brain won't shut up at 3am. Tell Ju, not your screen.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              For the moments you cannot explain cleanly yet — when the noise hits and the words won't come — Nuju turns 30 seconds of mess into a read that finally feels accurate. Voice or text. No blank page. No therapy bill.
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
              <AppStoreCta variant="soft" className="h-14 backdrop-blur-xl" />
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
          {["Free reveal, no card required", "Built for the days you can barely open your phone", "Faster than your brain can spiral"].map((signal) => (
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
                Five moods. Five Jus. Whichever one you are tonight.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Ju isn't a chatbot script on loop. The voice shifts with the state you're actually in — so a rough night doesn't get the same response as a regular Tuesday, and "I'm fine" gets read for what it really is.
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why it actually works</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              The first relief is being read back accurately.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Most journaling apps hand you a blank box and wish you luck. Nuju turns 30 seconds of mess into the sentence you'd been chasing all day.
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
              From "I don't know what's wrong" to "oh — that's what's wrong" in four steps.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Raw words in. A read, a pattern, and one move you can actually take, out.
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
                        Live preview
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground">What Ju actually does with one messy sentence</h3>
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
                          What you typed
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
                              One small next move
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What people say after the first read</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              People stay because the first read actually fits — not because the app is cute.
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What you're getting</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Built for the messy version of you. Not the polished one.
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Start where you are</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Don't wait until you "feel ready." That day rarely shows up.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Three quick prompts. One read. Then you decide if Ju should stay close. The whole thing takes less time than your next scroll session — and you owe nothing if it doesn't land.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-self-end">
            <button
              onClick={() => startOnboarding()}
              className="nuju-brand-button inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start the Ju Gets You reveal
              <ArrowRight className="h-5 w-5" />
            </button>
            <AppStoreCta className="h-14" />
          </div>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Decide after the read</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                If the reveal feels right, choose how Ju stays with you.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                The first read is always free. The plans below are for when "oh that actually helped" kicks in and you want Ju there tomorrow night too.
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
              Why blank-page journaling fails on the days you need it most.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              On a rough night, the friction between "open notebook" and "feel any better" is the whole problem. Nuju collapses that gap.
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Still deciding?</p>
              <h3 className="mt-3 text-3xl font-semibold text-foreground">The pages people read before they commit to a journaling app</h3>
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
            The straight answers, before you start.
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
            Don't wait for the right words. They're not coming tonight.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            One messy sentence is enough. Ju turns it into a read, a pattern, and one thing you can actually do before bed — for free.
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
            <AppStoreCta className="h-14" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            60-second reveal · No card required · Encrypted &amp; never trained on
          </p>
        </div>
      </motion.section>

      <section className="border-t border-black/[0.06] bg-white/58 px-4 py-16 sm:px-6 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            The AI journal app for racing thoughts and feelings that don't fit words yet
          </h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Nuju is an AI journal and mood tracker built for the 30-second moments — when your brain won't slow down, when "I'm fine" isn't quite true, or when you can't pin down what's actually wrong. Track your mood, name what you're feeling, spot the pattern you keep missing, and leave with one move you can actually do. The AI coach adapts to whichever version of you opens the app — gentle when you need it, blunt when you don't.
          </p>
          <div className="mb-8 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-foreground">AI mood tracker</h3>
              <p className="text-sm text-muted-foreground">Log mood and energy in seconds. Get 30-day trends, weekly AI summaries, and the patterns you'd never spot alone — like why every Tuesday feels heavy.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Personal AI coach</h3>
              <p className="text-sm text-muted-foreground">Pick from four coaching personas — gentle, direct, philosophical, or blunt-best-friend — and get a response that matches who you actually trust at 2am.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Daily journal prompts</h3>
              <p className="text-sm text-muted-foreground">Stuck on what to write? Nuju surfaces the prompt that fits the mood you just logged. No blank-page paralysis.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Available as a <Link to="/install" state={{ from: "/" }} className="text-primary hover:underline">progressive web app</Link> on iOS, Android, and desktop, plus a native iPhone app on the{" "}
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">App Store</a>.
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
                <p className="text-sm text-muted-foreground">For the people who think too loud at night.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80">Copyright 2026 Nuju. Built for the brains that won't quiet down at 3am.</p>
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
              <span className="text-xs font-semibold text-foreground">From spiral to clear in 60s</span>
              <button
                onClick={() => startOnboarding()}
              className="nuju-brand-button ml-auto inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-xs font-bold active:scale-[0.98]"
              >
                Start reveal
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <AppStoreCta size="sm" className="h-10 px-3 text-xs" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;

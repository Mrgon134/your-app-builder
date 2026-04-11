import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { ROUTES } from "@/lib/routes";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Flame,
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
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import HeroPatternPreview from "@/components/landing/HeroPatternPreview";
import SEOHead from "@/components/SEOHead";
import { Magnetic } from "@/components/ui/Magnetic";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const geo = useGeoPricing();
  const pricingSectionRef = useRef<HTMLElement>(null);
  const { trackLandingView, trackWaitlistSignup } = usePostHogEvents();
  const ttk = useTikTokPixel();
  const { snapshot: lifetimeScarcity } = useLifetimeScarcity();

  useEffect(() => {
    trackLandingView();
    ttk.trackPageView();
  }, []);

  const scrollToPricing = () =>
    pricingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const startOnboarding = (plan?: "weekly" | "yearly" | "lifetime_one_time") => {
    const params = new URLSearchParams({ source: "landing" });
    if (plan) {
      params.set("plan", plan);
      ttk.trackAddToCart(plan);
    }
    ttk.trackWaitlistSignup();
    navigate(`${ROUTES.ONBOARDING}?${params.toString()}`);
  };

  const emotionalMoments = [
    {
      title: "When your thoughts feel too tangled to explain",
      body: "Nuju starts by helping you put words around what feels blurry, heavy, or too loud to sort out alone.",
      icon: Mic,
    },
    {
      title: "When you want to feel understood, not analyzed",
      body: "Ju is designed to feel emotionally safe first, so you can soften before you start making sense of anything.",
      icon: PenLine,
    },
    {
      title: "When you want proof that it really gets you",
      body: "The Ju Gets You reveal turns a few honest answers into one clear emotional read you can feel immediately.",
      icon: BrainCircuit,
    },
  ];

  const steps = [
    {
      title: "Tell Ju what has been heavy",
      body: "The onboarding stays light on purpose. It is there to understand what feels heavy, not make you do homework.",
      icon: Mic,
    },
    {
      title: "See the Ju Gets You reveal",
      body: "You get one clear read on what Ju notices, why it fits, and what kind of support would help first.",
      icon: Heart,
    },
    {
      title: "Choose how closely Ju stays with you",
      body: "Then choose the way you want Ju to stay close, whether you want to start gently or keep that support with you long term.",
      icon: TrendingUp,
    },
  ];

  const proofCards = [
    {
      title: "Private by default",
      body: "The space belongs to you. Ju is there to reflect, not to turn your inner life into something performative.",
      icon: Shield,
    },
    {
      title: "Fast enough for real life",
      body: "You can check in in under a minute, which matters when your mind is loud and your energy is low.",
      icon: Zap,
    },
    {
      title: "Easy to return to on heavy days",
      body: "Nuju is soft enough to come back to when things feel messy, not just when you are already in a good headspace.",
      icon: Sparkles,
    },
    {
      title: "Support that stays close",
      body: "Keep Nuju on your home screen so the next time things build up, Ju is already there waiting.",
      icon: Smartphone,
    },
  ];

  const differencePoints = [
    {
      title: "Not another self-improvement chore",
      body: "Nuju is for the moments when your mind is loud and you do not have the energy to look polished or insightful first.",
    },
    {
      title: "Not here to optimize you",
      body: "Ju is warm on purpose. Feeling understood comes before advice, because that is what makes the deeper support actually land.",
    },
    {
      title: "Not just a place to vent",
      body: "Ju notices what is really happening underneath the noise, then helps you meet it more clearly over time.",
    },
  ];

  const testimonials = [
    {
      name: "Lena R.",
      role: "Founder",
      text: "It felt like the app noticed what I was carrying before I had fully figured out how to say it.",
    },
    {
      name: "Marcus T.",
      role: "Student",
      text: "The reveal was the moment. It made me think, okay, this actually gets me and I want to keep going.",
    },
    {
      name: "Aisha K.",
      role: "Designer",
      text: "I did not stay because it was a journal. I stayed because it felt like somewhere I could be understood quickly.",
    },
  ];

  const secondaryProofStats = [
    {
      value: "1 clear read",
      title: "An emotional read you can feel fast",
      body: "The first win is not a streak. It is the relief of seeing your inner state reflected back in a way that clicks.",
      icon: PenLine,
    },
    {
      value: "< 1 minute",
      title: "Fast enough for the moment you need it",
      body: "When support starts quickly, it becomes much easier to come back before things spiral into a bigger mess.",
      icon: TrendingUp,
    },
    {
      value: "1 honest next step",
      title: "Support that tells you where to begin",
      body: "After the reveal, Ju keeps helping you name, calm, or stay with what is there instead of leaving you alone with it.",
      icon: BrainCircuit,
    },
  ];

  const pricingPlans = [
    {
      name: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      note: "A gentle start for when you want support now, but still want to keep the commitment light.",
      badge: null as string | null,
      highlight: false,
      cta: "Choose weekly",
      features: [
        "Lightest way to begin",
        "Full support while active",
      ],
      onClick: () => startOnboarding("weekly"),
    },
    {
      name: "Annual",
      price: geo.formatPrice(geo.rates.yearly),
      note: "Best value for people who want this kind of support to stay part of their life.",
      badge: "Best value",
      highlight: false,
      cta: "Choose annual",
      features: [
        "Best long-term value",
        "Made for ongoing support",
      ],
      onClick: () => startOnboarding("yearly"),
    },
    {
      name: "Lifetime",
      price: geo.formatPrice(geo.rates.lifetime),
      note: "One payment for people who already know this is the kind of support they want to keep close.",
      badge: "One-time",
      highlight: false,
      cta: "Choose lifetime",
      features: [
        "One payment, no renewals",
        "Future premium updates included",
      ],
      onClick: () => startOnboarding("lifetime_one_time"),
    },
  ];

  const landingFaqs = [
    {
      q: "Do I need to pay before I can use Nuju?",
      a: "You start with the Ju Gets You reveal, then choose Weekly, Annual, or Lifetime if you want Ju to stay with you beyond that first read."
    },
    {
      q: "How does the AI understand my journal?",
      a: "Ju reads patterns in what you share, like when the weight hits, what makes it harder to say, and what kind of support feels safest for you. The goal is to reflect something emotionally true, not give you a generic summary."
    },
    {
      q: "Is my data private?",
      a: "100% private. Your journal entries are encrypted and only you can access them. We never sell data or share personal information with third parties."
    },
    {
      q: "Why does Nuju ask for my name and email so early?",
      a: "Because the reveal is meant to feel personal. Ju uses your name in the read, and your email lets you keep the support attached to the same account after checkout."
    },
    {
      q: "What's the difference between Weekly, Annual, and Lifetime?",
      a: "Weekly is the lightest way to begin, Annual is the best value if you want Ju in your life consistently, and Lifetime is the one-time choice for people who already know the fit is real."
    }
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
    "name": "How to Start Journaling with Nuju",
    "description": "Learn how to use Nuju's AI journal in 3 simple steps",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Tap your mood",
        "text": "Choose from 5 mood levels in just one tap. Track how you're feeling right now."
      },
      {
        "@type": "HowToStep",
        "name": "Write or speak",
        "text": "Journal for 30 seconds using text or voice. No pressure, just honest reflection."
      },
      {
        "@type": "HowToStep",
        "name": "Get AI insights",
        "text": "Receive personalized patterns and insights about your emotional world."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nuju | Feel Understood Faster"
        description="Nuju helps people feel understood when their mind feels loud, heavy, or hard to explain. Start the Ju Gets You reveal and see what Ju notices."
        canonical="https://nuju.app/"
      />
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(landingFaqSchema)}</script>
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
              <img src={juMain} alt="Ju, the Nuju AI journal companion mascot" className="h-7 w-7 object-contain" width={28} height={28} />
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
              Get started
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-20 pt-12">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/2 top-20 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
          <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-[#4ECDC4]/10 blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="text-left">
            <Magnetic>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => startOnboarding("lifetime_one_time")}
                className="mb-8 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#FFD166]/30 bg-[#FFD166]/10 px-5 py-2 text-sm font-bold text-[#FFD166] shadow-[0_0_20px_rgba(255,209,102,0.15)] transition-all hover:bg-[#FFD166]/20"
              >
                <Flame className="h-4 w-4" />
                Start with the Ju Gets You reveal
              </motion.div>
            </Magnetic>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              When you feel a lot and cannot explain it, Ju helps you feel understood.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              A few quick answers are enough for Ju to notice what is heavy, reflect it back clearly, and make you feel less alone in it.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Magnetic>
                <button
                  onClick={() => startOnboarding()}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
                >
                  See what Ju notices
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.04] hover:shadow-xl hover:shadow-black/5 active:scale-[0.97]"
                >
                  Compare plans
                </button>
              </Magnetic>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {[
                { label: "Feels personal fast", icon: Heart },
                { label: "Ju Gets You reveal", icon: Mic },
                { label: "Private by default", icon: Lock },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={item.label}
                    className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/75 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur-md"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{item.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
             <HeroPatternPreview />
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-border/50 bg-secondary/35 px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Nuju feels different</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Feel understood when what you carry is hard to explain.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The first relief is simple: feeling seen in a moment that usually stays trapped inside you.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {emotionalMoments.map((moment, index) => {
              const Icon = moment.icon;
              return (
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  key={moment.title}
                  className="glass-card rounded-[2rem] p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{moment.title}</h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{moment.body}</p>
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
                className="mt-8 rounded-[1.75rem] border border-border/60 bg-secondary/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Why it lands</p>
                <p className="mt-3 font-serif text-2xl leading-9 text-foreground">
                  Feel understood first.
                  <br />
                  The deeper support can come after.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 100 }}
                    key={step.title}
                    className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#f7f5ff] px-4 py-20 dark:bg-[#18152a]"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why people trust Nuju</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Warm enough to open up. Accurate enough to share.
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Example after a few weeks</p>
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
            {testimonials.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                key={item.name}
                className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm hover:shadow-md"
              >
                <Quote className="h-5 w-5 text-primary/35" />
                <p className="mt-4 text-[15px] leading-7 text-foreground">{item.text}</p>
                <div className="mt-5">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </motion.div>
            ))}
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
        ref={pricingSectionRef}
        onViewportEnter={() => ttk.trackPricingView()}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Choose the pace that fits you</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Choose how closely you want Ju to stay with you.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Start with the plan that matches your level of commitment, whether you want a cautious beginning, steady long-term support,
              or one decision that keeps Ju close for good.
            </p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Weekly is the lightest start, Annual is the best value, and Lifetime is the premium one-time path.
            </p>
            {geo.hasLocalizedDisplay ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                Approximate prices shown in {geo.displayCurrency} for your region
              </div>
            ) : geo.currency !== geo.displayCurrency ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground">
                <Globe className="h-3.5 w-3.5" />
                Prices shown in {geo.displayCurrency}. Regional checkout in {geo.currency} may appear later.
              </div>
            ) : null}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((displayPlan, index) => {
              const isLifetime = displayPlan.name === "Lifetime";
              return (
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  key={displayPlan.name}
                  className={`relative rounded-[2rem] border p-8 flex flex-col hover:shadow-xl ${
                    isLifetime
                      ? "border-primary/35 bg-[linear-gradient(180deg,rgba(245,241,255,0.96),rgba(255,255,255,0.99))] shadow-[0_20px_50px_-24px_rgba(124,110,219,0.38)]"
                      : displayPlan.highlight
                      ? "border-primary/40 bg-primary text-primary-foreground shadow-[0_0_30px_rgba(124,110,219,0.25)]"
                      : "border-border/60 bg-card shadow-sm"
                  }`}
                >
                  {displayPlan.badge && (
                    <div className="absolute -top-3 left-6 rounded-full bg-[#FFD166] px-3 py-1 text-xs font-bold text-[#1A1A2E] shadow-sm">
                      {displayPlan.badge}
                    </div>
                  )}

                  <h3 className="font-serif text-2xl font-semibold">{displayPlan.name}</h3>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-bold">{displayPlan.price}</span>
                    {!isLifetime && (
                      <span className={displayPlan.highlight ? "text-primary-foreground/75" : "text-muted-foreground"}>
                        {displayPlan.name === "Weekly" ? "/week" : "/year"}
                      </span>
                    )}
                    {isLifetime && (
                      <span className="text-muted-foreground">one-time</span>
                    )}
                  </div>
                  <p className={`mt-3 text-sm leading-6 ${displayPlan.highlight ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
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
                        className={`flex items-start gap-2 text-sm ${displayPlan.highlight ? "text-primary-foreground/92" : "text-muted-foreground"}`}
                      >
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${displayPlan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={displayPlan.onClick}
                    className={`mt-auto w-full rounded-2xl py-3.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                      isLifetime
                        ? "bg-[linear-gradient(135deg,#7C6EDB,#6A58D8)] text-white hover:shadow-[0_18px_35px_-18px_rgba(124,110,219,0.75)]"
                      : displayPlan.highlight
                        ? "bg-primary-foreground text-primary hover:shadow-lg"
                        : "border border-[#D8D0EE] bg-[#E9E4F6] text-[#2E2550] hover:bg-[#DED6F1] hover:shadow-[0_12px_24px_-18px_rgba(45,37,80,0.35)]"
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

      {/* FAQ Section */}
      <motion.section
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
            Got questions? We've got answers.
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 pb-20 pt-6"
      >
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-border/60 bg-card px-6 py-12 text-center shadow-xl sm:px-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-inner"
          >
            <img src={juMain} alt="Ju mascot celebrating — Nuju AI journal companion" className="h-14 w-14 animate-ju-float object-contain" width={56} height={56} loading="lazy" />
          </motion.div>
          <h2 className="mt-6 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            You do not need perfect words to feel understood.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Open Nuju when your thoughts feel crowded. Answer a few quick prompts, see what Ju notices, and keep the support that feels right.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm uppercase tracking-[0.22em] text-primary/80">
            Built for the moments you need to feel seen, not polished.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <button
                onClick={() => startOnboarding()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
              >
                See what Ju notices
                <ArrowRight className="h-5 w-5" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={scrollToPricing}
                className="rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.04] hover:shadow-md active:scale-[0.97]"
              >
                See pricing
              </button>
            </Magnetic>
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Start with the reveal, then choose the support level that fits.
          </p>
        </div>
      </motion.section>

      {/* SEO content section — keyword-rich, indexed by Google */}
      <section className="border-t border-border/40 bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            The AI journal app built for everyday emotional wellness
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Nuju is a daily journaling app powered by artificial intelligence that helps you track your mood, understand emotional patterns, and get personalized insights — in as little as 30 seconds a day. Whether you want to start a mood journal, develop a daily reflection habit, or get support from an AI coach, Nuju adapts to how you feel right now.
          </p>
          <div className="grid gap-6 sm:grid-cols-3 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI mood tracker</h3>
              <p className="text-sm text-muted-foreground">Log your mood daily and see 30-day trends, weekly summaries, and emotional patterns you'd never notice on your own.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Personal AI coach</h3>
              <p className="text-sm text-muted-foreground">Choose from four AI coaching personas — Gentle Guide, Tough Coach, Wise Sage, or Fun Friend — and get responses tailored to your journaling style.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Daily journal prompts</h3>
              <p className="text-sm text-muted-foreground">Stuck on what to write? Nuju surfaces a new journaling prompt each day to help you reflect on what matters — no blank-page anxiety.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Available as a <Link to="/install" state={{ from: "/" }} className="text-primary hover:underline">progressive web app</Link> on iOS, Android, and desktop.
            Read more on our <Link to="/about" state={{ from: "/" }} className="text-primary hover:underline">about page</Link>, or visit the <Link to="/support" state={{ from: "/" }} className="text-primary hover:underline">support center</Link> if you have questions.
          </p>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-10 bg-card/50">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <img src={juMain} alt="Nuju logo — Ju the AI journal companion" className="h-8 w-8 object-contain" width={32} height={32} loading="lazy" />
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
            <span className="text-border/40">•</span>
            <Link to="/support" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Support</Link>
            <span className="text-border/40">•</span>
            <Link to="/contact" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <span className="text-border/40">•</span>
            <Link to="/privacy" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <span className="text-border/40">•</span>
            <Link to="/terms" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <span className="text-border/40">•</span>
            <Link to="/medical-disclaimer" state={{ from: "/" }} className="text-muted-foreground hover:text-foreground transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

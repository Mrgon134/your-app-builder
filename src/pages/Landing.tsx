import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { saveAuthIntent } from "@/lib/auth-intent";
import {
  ArrowRight,
  BrainCircuit,
  Check,
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
import { PRICING_CONFIG } from "@/lib/config";
import juMain from "@/assets/ju-main.webp";
import HeroPatternPreview from "@/components/landing/HeroPatternPreview";
import SEOHead from "@/components/SEOHead";

const useReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
};

const revealClass = (visible: boolean) =>
  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const geo = useGeoPricing();
  const pricingSectionRef = useRef<HTMLElement>(null);
  const { trackLandingView, trackWaitlistSignup } = usePostHogEvents();

  useEffect(() => {
    trackLandingView();
  }, []);

  const heroReveal = useReveal();
  const storyReveal = useReveal();
  const stepsReveal = useReveal();
  const proofReveal = useReveal();
  const pricingReveal = useReveal<HTMLElement>();
  const ctaReveal = useReveal();

  const scrollToPricing = () =>
    pricingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const weeklyPrice = (amount: number) => geo.formatPrice(Math.round((amount / 4.345) * 100) / 100);
  const startFreeSignup = () => {
    saveAuthIntent({ source: "landing" });
    navigate("/auth?mode=signup");
  };
  const startPlanSignup = (plan: "plus_monthly" | "pro_monthly", trial = false) => {
    saveAuthIntent({ source: "landing", screen: "pro", plan, trial });
    navigate("/auth?mode=signup");
  };

  const emotionalMoments = [
    {
      title: "When your brain will not slow down",
      body: "Open Nuju, talk for a minute, and let Ju help you turn spiraling thoughts into something gentler.",
      icon: Mic,
    },
    {
      title: "When you do not have the energy to journal perfectly",
      body: "Type one messy paragraph or log your mood fast. You still get the release and the record.",
      icon: PenLine,
    },
    {
      title: "When you want to understand your patterns, not just vent",
      body: "Ju notices the themes, moods, and recurring triggers that are easy to miss on your own.",
      icon: BrainCircuit,
    },
  ];

  const steps = [
    {
      title: "Unload what is sitting on your chest",
      body: "Talk or type without editing yourself. Nuju is built for real feelings, not polished journaling.",
      icon: Mic,
    },
    {
      title: "Feel understood instead of judged",
      body: "Ju reflects back what you are carrying with warmth, clarity, and just enough structure to help.",
      icon: Heart,
    },
    {
      title: "Come back to your life feeling lighter",
      body: "Over time, your moods, habits, and triggers become easier to notice and easier to work with.",
      icon: TrendingUp,
    },
  ];

  const proofCards = [
    {
      title: "Private by default",
      body: "Your journal is for you. Export your entries anytime and keep control of your own data.",
      icon: Shield,
    },
    {
      title: "Fast enough for real life",
      body: "You can log a mood in seconds, write a quick note, or record a voice entry when typing feels heavy.",
      icon: Zap,
    },
    {
      title: "Designed to become a habit",
      body: "Nuju feels soft, low-pressure, and rewarding enough to come back to on hard days and good ones.",
      icon: Sparkles,
    },
    {
      title: "Install and carry it with you",
      body: "Use Nuju like an app on your home screen so support is there exactly when you need it.",
      icon: Smartphone,
    },
  ];

  const differencePoints = [
    {
      title: "Not another wellness chore",
      body: "Nuju is designed for the moments when traditional journaling feels like too much work.",
    },
    {
      title: "Not cold AI productivity language",
      body: "The experience is built to feel gentle, human, and emotionally safe before it feels analytical.",
    },
    {
      title: "Not just a place to vent",
      body: "You still get the release, but over time you also get pattern recognition, perspective, and momentum.",
    },
  ];

  const testimonials = [
    {
      name: "Lena R.",
      role: "Founder",
      text: "I stopped waiting to write the perfect journal entry. I just open Nuju, talk for a minute, and feel noticeably calmer.",
    },
    {
      name: "Marcus T.",
      role: "Student",
      text: "The thing that surprised me most is how understood I feel. Ju does not sound clinical. It sounds like support.",
    },
    {
      name: "Aisha K.",
      role: "Designer",
      text: "Nuju helped me notice that my worst days were not random. Seeing the pattern made me feel less helpless.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: geo.formatPrice(0),
      note: "Start tonight. No credit card required.",
      badge: null as string | null,
      highlight: false,
      cta: "Start free",
      onClick: startFreeSignup,
      features: [
        "Unlimited journal entries",
        "Mood and energy tracking",
        "Gentle coach with weekly limit",
        "7-day history",
      ],
    },
    {
      name: "Plus",
      price: geo.formatPrice(geo.rates.plusMonthly),
      note: `${weeklyPrice(geo.rates.plusMonthly)} per week for deeper reflection.`,
      badge: "Best everyday value",
      highlight: false,
      cta: "Unlock Plus",
      onClick: () => startPlanSignup("plus_monthly"),
      features: [
        "AI insight after every entry",
        "Unlimited history",
        "30-day trends and weekly summaries",
        "All 4 coach personas",
      ],
    },
    {
      name: "Pro",
      price: geo.formatPrice(geo.rates.proMonthly),
      note: `${weeklyPrice(geo.rates.proMonthly)} per week for voice, memory, and deeper support.`,
      badge: "Most loved by active users",
      highlight: false,
      cta: "Start 7-day Pro trial",
      onClick: () => startPlanSignup("pro_monthly", true),
      features: [
        "Everything in Plus",
        "Voice journaling and transcription",
        "AI memory cards and recurring patterns",
        "Relationship mood map and premium features",
      ],
    },
    {
      name: "Lifetime Pro",
      price: geo.formatPrice(geo.rates.lifetime),
      note: "One payment. Full Pro access forever.",
      badge: "Early Access",
      highlight: true,
      cta: `Get Lifetime Pro — ${geo.formatPrice(geo.rates.lifetime)}`,
      onClick: () => {
        saveAuthIntent({ source: "landing", screen: "pro", plan: "lifetime_one_time" });
        navigate("/auth?mode=signup");
      },
      features: [
        "Everything in Pro",
        "One payment, no renewals",
        "Every future Pro upgrade included",
        "Best value for daily journalers",
      ],
    },
  ];

  const secondaryProofStats = [
    {
      value: "28 entries",
      title: "A month of honest check-ins",
      body: "Small, messy reflections build a story you can come back to instead of losing the feeling by tomorrow.",
      icon: PenLine,
    },
    {
      value: "5 day rhythm",
      title: "A ritual that can actually stick",
      body: "Because starting only takes a minute, showing up again feels softer and more realistic on heavy days.",
      icon: TrendingUp,
    },
    {
      value: "3 patterns noticed",
      title: "Insight that feels personal",
      body: "Ju can surface patterns like heavier Fridays or writing longer when your energy is low.",
      icon: BrainCircuit,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Journal That Understands Your Life"
        description="The 30-second AI journal app that actually listens. Track your moods, discover hidden life patterns, and talk to your personal AI coach today. Free to start."
        canonical="https://nuju.app/"
      />
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
              <img src={juMain} alt="Ju" className="h-7 w-7 object-contain" width={28} height={28} />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-foreground">Nuju</p>
              <p className="text-xs font-medium text-muted-foreground">A softer way to journal</p>
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
              onClick={startFreeSignup}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
            >
              Start free
            </button>
          </div>
        </div>
      </nav>

      <section
        ref={heroReveal.ref}
        className={`relative overflow-hidden px-4 pb-20 pt-12 transition-all duration-700 ${revealClass(heroReveal.visible)}`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-20 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/14 blur-[120px]" />
          <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-[#4ECDC4]/12 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FFD166]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Start free in under a minute
            </div>

            <h1 className="max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              When your mind feels loud, Ju helps you hear yourself again.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              Talk or write for a minute, feel understood right away, and watch your messy emotions turn into patterns
              you can finally make sense of.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={startFreeSignup}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
              >
                Start free tonight
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={scrollToPricing}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.04] active:scale-[0.97]"
              >
                Compare plans
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-muted-foreground">
              No credit card required. Start with text or mood check-ins, then upgrade only if it helps.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Private by default", icon: Lock },
                { label: "Voice or text in minutes", icon: Mic },
                { label: "Warm AI reflection", icon: Heart },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/75 px-4 py-3 text-sm text-foreground shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <HeroPatternPreview />
        </div>
      </section>

      <section
        ref={storyReveal.ref}
        className={`border-y border-border/50 bg-secondary/35 px-4 py-20 transition-all duration-700 ${revealClass(storyReveal.visible)}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Built for real emotional moments</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Nuju meets you where you actually are.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Not when you are perfectly focused. Not when you have twenty spare minutes.
              Right when your thoughts feel loud, messy, or hard to explain.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {emotionalMoments.map((moment, index) => {
              const Icon = moment.icon;
              return (
                <div
                  key={moment.title}
                  className="glass-card rounded-[2rem] p-7 transition-all duration-700"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{moment.title}</h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">{moment.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">The real shift</p>
              <h3 className="mt-4 max-w-md font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                You are not being asked to perform self-awareness.
              </h3>
              <p className="mt-4 max-w-md text-base leading-8 text-muted-foreground">
                Nuju removes the pressure to say the perfect thing. It gives you a softer place to land when your
                thoughts feel loud, tangled, or too heavy to carry alone.
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
          </div>
        </div>
      </section>

      <section
        ref={stepsReveal.ref}
        className={`px-4 py-20 transition-all duration-700 ${revealClass(stepsReveal.visible)}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Nuju feels easier to begin</p>
              <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                Less pressure. More relief.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                You should not need your most organized, reflective self to begin.
                Nuju lowers the bar so you can start while you are still overwhelmed,
                then helps you feel clearer from there.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-border/60 bg-secondary/40 p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Editorial cue</p>
                <p className="mt-3 font-serif text-2xl leading-9 text-foreground">
                  Start with relief.
                  <br />
                  Earn the deeper commitment after.
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm transition-all duration-700"
                    style={{ transitionDelay: `${120 + index * 120}ms` }}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={proofReveal.ref}
        className={`bg-[#f7f5ff] px-4 py-20 transition-all duration-700 dark:bg-[#18152a] ${revealClass(proofReveal.visible)}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why people trust Nuju</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Warm enough to open up. Useful enough to come back.
            </h2>
          </div>

          <div className="mt-12 rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Example after a few weeks</p>
                <h3 className="mt-2 font-serif text-3xl font-semibold text-foreground">
                  The soft check-in turns into something you can actually see.
                </h3>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Metrics like entries, streak, and patterns matter more after the emotional trust is there.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {secondaryProofStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.value} className="rounded-[1.6rem] bg-secondary/45 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-5 font-serif text-3xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{stat.title}</p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{stat.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {proofCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm transition-all duration-700"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={item.name}
                className="rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm transition-all duration-700"
                style={{ transitionDelay: `${160 + index * 120}ms` }}
              >
                <Quote className="h-5 w-5 text-primary/35" />
                <p className="mt-4 text-[15px] leading-7 text-foreground">{item.text}</p>
                <div className="mt-5">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-border/60 bg-card px-6 py-7 shadow-sm sm:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What helps people say yes</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground">
                  Emotional safety makes support easier to trust.
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Start free before making any commitment",
                  "Private-first language is visible early",
                  "The product promise sounds supportive, not clinical",
                ].map((line) => (
                  <div key={line} className="rounded-[1.5rem] bg-secondary/45 px-4 py-4 text-sm leading-6 text-foreground">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(node) => {
          pricingReveal.ref.current = node;
          pricingSectionRef.current = node;
        }}
        className={`px-4 py-20 transition-all duration-700 ${revealClass(pricingReveal.visible)}`}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Start free, upgrade only if it helps</p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Choose the level of support you want.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Most people begin free, get a feel for the ritual, and upgrade when they want voice journaling,
              AI memory, and deeper coaching.
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

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, index) => {
              const isLifetime = plan.name === "Lifetime Pro";
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-[2rem] border p-8 transition-all duration-700 ${
                    plan.highlight
                      ? "border-primary/35 bg-primary text-primary-foreground shadow-2xl shadow-primary/20"
                      : "border-border/60 bg-card shadow-sm"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-6 rounded-full bg-[#FFD166] px-3 py-1 text-xs font-bold text-foreground">
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="font-serif text-2xl font-semibold">{plan.name}</h3>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-bold">{plan.price === geo.formatPrice(0) ? "Free" : plan.price}</span>
                    {plan.price !== geo.formatPrice(0) && !isLifetime && (
                      <span className={plan.highlight ? "text-primary-foreground/75" : "text-muted-foreground"}>/month</span>
                    )}
                    {isLifetime && (
                      <span className="text-muted-foreground">one-time</span>
                    )}
                  </div>
                  <p className={`mt-3 text-sm leading-6 ${plan.highlight ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                    {plan.note}
                  </p>

                  {isLifetime && PRICING_CONFIG.lifetimeSlots.left > 0 && (
                    <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/25 px-4 py-2.5">
                      <Flame className="h-5 w-5 text-[#FF6B35] shrink-0" />
                      <span className="text-sm font-bold text-[#FF6B35]">
                        Only {PRICING_CONFIG.lifetimeSlots.left}/{PRICING_CONFIG.lifetimeSlots.total} Early Access slots left
                      </span>
                    </div>
                  )}

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 text-sm ${plan.highlight ? "text-primary-foreground/92" : "text-muted-foreground"}`}
                      >
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={plan.onClick}
                    className={`mt-8 w-full rounded-2xl py-3.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                      plan.highlight
                        ? "bg-primary-foreground text-primary hover:shadow-lg"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={ctaReveal.ref}
        className={`px-4 pb-20 pt-6 transition-all duration-700 ${revealClass(ctaReveal.visible)}`}
      >
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-border/60 bg-card px-6 py-12 text-center shadow-xl sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <img src={juMain} alt="Ju" className="h-14 w-14 animate-ju-float object-contain" />
          </div>
          <h2 className="mt-6 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            You do not need the perfect words to begin.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Open Nuju when your thoughts feel crowded. Talk or write for a minute.
            Let Ju help you feel clearer, calmer, and a little more held.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm uppercase tracking-[0.22em] text-primary/80">
            Built for the nights you need support, not perfection.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={startFreeSignup}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
            >
              Start free tonight
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={scrollToPricing}
              className="rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.04] active:scale-[0.97]"
            >
              See pricing
            </button>
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            No credit card required. Your journal stays yours.
          </p>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-10 bg-card/50">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <img src={juMain} alt="Ju" className="h-8 w-8 object-contain" />
              <div>
                <p className="font-serif text-lg font-bold text-foreground">Nuju</p>
                <p className="text-sm text-muted-foreground">A journal that feels like support.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80">Copyright 2026 Nuju. Built for softer check-ins and steadier days.</p>
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

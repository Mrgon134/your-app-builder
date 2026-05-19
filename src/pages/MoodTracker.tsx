import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Brain, Calendar, Heart, Lock, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AppStoreCta from "@/components/AppStoreCta";
import SEOHead from "@/components/SEOHead";
import juMain from "@/assets/ju-main.webp";
import juGood from "@/assets/ju-good.webp";

const CANONICAL = "https://nuju.app/mood-tracker";

const STEPS = [
  {
    label: "Tap a mood and energy",
    body: "Pick from five moods (Rough to Great) and slide your energy level. The base check-in takes about 10 seconds.",
  },
  {
    label: "Add a sentence if you want",
    body: "Optional written context turns a tap into a real entry the AI can read for trends, themes, and people.",
  },
  {
    label: "Patterns build over weeks",
    body: "30-day mood charts, weekly summaries, and AI-detected cycles show up once you have a few entries logged.",
  },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: "30-day mood and energy trends",
    body: "Visualize how your week-on-week mood is moving, plus where energy and mood diverge.",
  },
  {
    icon: Calendar,
    title: "Pixel calendar of your month",
    body: "See your full month at a glance — every day color-coded by the mood you logged.",
  },
  {
    icon: Brain,
    title: "AI summaries that interpret, not just plot",
    body: "Weekly AI summaries explain what changed and why — not just where the line went up or down. This is the layer missing from most mood tracking apps with AI insights in name only.",
  },
  {
    icon: Sparkles,
    title: "Pattern detection across moods, themes, and people",
    body: "Once you log a few weeks, Ju surfaces what keeps repeating — moods on certain days, recurring themes, even relationships that move your mood.",
  },
  {
    icon: Heart,
    title: "Mood paired with reflection, not just tags",
    body: "Other trackers stop at emoji + activity tags. Nuju pairs mood with optional written reflection so trends carry context.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Encrypted storage, signed media URLs, no mood data sold, no AI training on your entries.",
  },
];

const FREE_VS_PAID = {
  free: [
    "10-second mood and energy check-ins",
    "Five-mood scale plus optional written reflection",
    "Recent mood history at a glance",
    "Basic AI insight on each entry",
  ],
  paid: [
    "30-day mood and energy trend charts",
    "Pixel calendar of your full month",
    "Weekly AI summaries of what changed",
    "Pattern detection across themes and people",
    "Relationship mood map: who shifts your mood",
    "Full mood history, no week cap",
  ],
};

const COMPARISON = [
  {
    name: "Nuju",
    body: "Mood tracking + journaling + AI pattern detection in one app. Built for people who want to understand their mood, not just log it.",
    accent: true,
  },
  {
    name: "Daylio",
    body: "Excellent for fast emoji + activity tagging. No journaling, no AI interpretation, no relationship mapping. Best when speed is the only goal.",
  },
  {
    name: "Bearable",
    body: "Strong if you want mood layered with health, sleep, and medication tracking. Heavier setup. No AI pattern explanations.",
  },
  {
    name: "Apple Health mood",
    body: "Bare-minimum logging built into iOS. Good for a quick reading; no analysis, no journaling, no patterns.",
  },
];

const FAQS = [
  {
    q: "What is a mood tracker app?",
    a: "A mood tracker app is a tool for logging how you feel over time so you can spot patterns, triggers, and trends. The good ones do more than collect data — they pair mood with context (like written reflection or activities) and surface what is actually moving your emotional baseline.",
  },
  {
    q: "What are mood tracking apps with AI insights?",
    a: "Mood tracking apps with AI insights combine a daily mood score with context, such as written reflection, energy, activities, or people. The AI should explain patterns over time, not just label a single mood entry. Nuju does this by pairing quick mood check-ins with written reflection and weekly summaries.",
  },
  {
    q: "Is Nuju free to use as a mood tracker?",
    a: "Yes. The 10-second mood + energy check-in and basic recent insight are free. Paid access unlocks 30-day trend charts, the pixel calendar, weekly AI summaries, pattern detection, and the relationship mood map.",
  },
  {
    q: "How is Nuju different from Daylio?",
    a: "Daylio is fast emoji + activity logging. Nuju adds optional written reflection, AI summaries that interpret what changed, and pattern detection that connects mood to themes and people. Use Daylio if you want pure speed; use Nuju if you want understanding.",
  },
  {
    q: "Will my mood data be private?",
    a: "Yes. Mood entries live in encrypted storage with private access controls, media URLs are signed, mood data is not sold, and your entries are not used to train AI models.",
  },
  {
    q: "Does Nuju replace therapy?",
    a: "No. Nuju is a mood tracking and self-awareness tool, not therapy, crisis care, or medical treatment. Many people use mood data alongside therapy to give sessions more grounded context, but the app itself is not a clinical service.",
  },
  {
    q: "How often should I log my mood?",
    a: "Once a day is enough for most people, ideally at the same time so the data stays comparable. Even logging every other day will start surfacing trends after two to three weeks. The goal is consistency, not perfection.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nuju",
  alternateName: "Nuju Mood Tracker",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Mood Tracking and Emotional Wellness",
  operatingSystem: "Web browser, iOS, Android",
  url: CANONICAL,
  description:
    "Nuju is the mood tracker app that pairs 10-second mood and energy check-ins with optional written reflection, 30-day trend charts, and AI summaries that interpret what changed.",
  image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
  featureList: [
    "10-second mood and energy check-ins",
    "Mood tracking app with AI insights",
    "Best mood tracking apps 2026 comparison support",
    "Five-mood scale with optional written reflection",
    "30-day mood and energy trend charts",
    "Pixel calendar of your month",
    "Weekly AI summaries",
    "Pattern detection across themes and people",
    "Encrypted storage, no AI training on mood data",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free Ju Gets You reveal and 10-second mood check-in flow.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const MoodTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Mood Tracker: 30-Day Trends in 10 Seconds a Day"
        description="Log your mood in 10 seconds. Get 30-day trend charts and AI summaries that explain what is actually moving it. Free, no signup wall."
        canonical={CANONICAL}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Mood Tracker", url: CANONICAL },
        ]}
      />
      <Helmet>
        <html lang="en" />
        <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold text-foreground">
            <img src={juMain} alt="Ju mascot" className="h-7 w-7 object-contain" width={28} height={28} />
            Nuju
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/onboarding?source=mood_tracker_nav"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start free reveal
            </Link>
            <AppStoreCta size="sm" className="hidden sm:inline-flex" />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-14">
        <section className="text-center" data-testid="mood-tracker-hero">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Mood tracker app
          </p>
          <h1 className="mx-auto max-w-2xl font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            The mood tracker that explains what is moving you
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Most mood trackers stop at emoji and activity tags. Nuju pairs a 10-second check-in with optional written
            reflection, then uses AI to surface the patterns underneath — moods, themes, and people that keep moving
            your week.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=mood_tracker_hero"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
            >
              Start the free Ju Gets You reveal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/install"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              See how Nuju installs
            </Link>
            <AppStoreCta />
          </div>

          <img
            src={juGood}
            alt="Ju, the Nuju mood tracking companion mascot"
            className="mx-auto mt-10 h-32 w-32 object-contain"
            width={128}
            height={128}
          />
        </section>

        <section className="mt-16" aria-labelledby="who-its-for">
          <h2 id="who-its-for" className="font-serif text-2xl font-bold text-foreground">
            Who Nuju is for
          </h2>
          <ul className="mt-4 space-y-3 text-foreground/85">
            <li>
              <strong>Self-awareness seekers</strong> who want to understand emotional patterns instead of just logging
              them.
            </li>
            <li>
              <strong>Daylio users</strong> who have outgrown emoji-only logging and want AI that interprets the data.
            </li>
            <li>
              <strong>People between therapy sessions</strong> who want grounded mood data to bring into the next
              appointment.
            </li>
            <li>
              <strong>Anxiety and overthinking patterns</strong> where seeing the rhythm of your week makes the spirals
              less surprising.
            </li>
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="choose-mood-tracker">
          <h2 id="choose-mood-tracker" className="font-serif text-2xl font-bold text-foreground">
            What kind of mood tracking app do you need?
          </h2>
          <p className="mt-3 text-foreground/85">
            If you only need speed, a simple mood tracker app or emoji log can be enough. If you want to understand why
            the pattern keeps happening, choose a mood tracking app with AI insights that also captures written context.
            Nuju sits in that second category: fast enough for daily check-ins, but built to explain trends instead of
            only storing them.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="font-serif text-2xl font-bold text-foreground">
            How Nuju tracks mood in 10 seconds
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.label} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</p>
                <p className="font-serif text-lg font-semibold text-foreground">{step.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="features">
          <h2 id="features" className="font-serif text-2xl font-bold text-foreground">
            What you actually get from Nuju
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                  <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="free-vs-paid">
          <h2 id="free-vs-paid" className="font-serif text-2xl font-bold text-foreground">
            What you get free vs paid
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Free</p>
              <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">Track mood without a credit card</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                {FREE_VS_PAID.free.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Paid</p>
              <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">Unlock the trend and pattern layer</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                {FREE_VS_PAID.paid.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="comparison">
          <h2 id="comparison" className="font-serif text-2xl font-bold text-foreground">
            Nuju vs other mood tracker apps
          </h2>
          <div className="mt-6 space-y-3">
            {COMPARISON.map((row) => (
              <div
                key={row.name}
                className={`rounded-2xl border p-5 ${
                  row.accent ? "border-primary/30 bg-primary/5" : "border-border/60 bg-card/60"
                }`}
              >
                <p className="font-serif text-lg font-semibold text-foreground">{row.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Want a fuller side-by-side?{" "}
            <Link to="/blog/best-mood-tracker-apps" className="text-primary underline-offset-4 hover:underline">
              Read the 8-app mood tracker roundup
            </Link>
            {" "}or{" "}
            <Link to="/blog/daylio-alternatives" className="text-primary underline-offset-4 hover:underline">
              the Daylio alternatives guide
            </Link>
            .
          </p>
        </section>

        <section className="mt-16" aria-labelledby="privacy">
          <h2 id="privacy" className="font-serif text-2xl font-bold text-foreground">
            Mood data is yours, not a product
          </h2>
          <p className="mt-3 text-foreground/85">
            Mood entries live in encrypted storage with private access controls. Media URLs are signed. Mood data is
            not sold and is not used to train AI models. The full handling is documented on our{" "}
            <Link to="/privacy" className="text-primary underline-offset-4 hover:underline">
              privacy page
            </Link>
            .
          </p>
        </section>

        <section className="mt-16" aria-labelledby="faq">
          <h2 id="faq" className="font-serif text-2xl font-bold text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4 transition-colors hover:border-primary/30"
              >
                <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 leading-relaxed text-foreground/85">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-primary/25 bg-primary/5 p-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Ready when you are</p>
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Start tracking mood with context today
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Try the free Ju Gets You reveal. After a few entries, mood patterns start showing up that you would not
            catch yourself.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=mood_tracker_footer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start the free reveal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/ai-journal"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              See the AI journal page
            </Link>
            <AppStoreCta />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-4 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-serif font-bold text-foreground">
            Nuju
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <Link to="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <Link to="/support" className="transition-colors hover:text-foreground">
              Support
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
          </div>
          <p>&copy; 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MoodTracker;

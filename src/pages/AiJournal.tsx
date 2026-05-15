import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Lock, Sparkles, Heart, Mic, LineChart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AppStoreCta from "@/components/AppStoreCta";
import SEOHead from "@/components/SEOHead";
import juMain from "@/assets/ju-main.webp";
import juGreat from "@/assets/ju-great.webp";
import coachGentle from "@/assets/coach-gentle.webp";
import coachTough from "@/assets/coach-tough.webp";
import coachWise from "@/assets/coach-wise.webp";
import coachFun from "@/assets/coach-fun.webp";

const CANONICAL = "https://nuju.app/ai-journal";

const STEPS = [
  {
    label: "Tap your mood",
    body: "Pick a mood, set energy, optionally write a few sentences. The whole entry takes about 30 seconds.",
  },
  {
    label: "Ju reads what you wrote",
    body: "Nuju's AI reflects on your specific words — not a template — and surfaces the feeling underneath.",
  },
  {
    label: "Patterns appear over time",
    body: "After a few entries, Ju connects moods, energy, and themes into trends you would not catch yourself.",
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI reflection on your actual writing",
    body: "Ju responds to what you specifically wrote, not a generic prompt. Four coach personas adjust the tone.",
  },
  {
    icon: LineChart,
    title: "Mood and energy tracking, built in",
    body: "Every entry pairs a mood + energy reading with text, so trends stay grounded in real context.",
  },
  {
    icon: Sparkles,
    title: "Pattern discovery over weeks",
    body: "Weekly summaries surface what kept repeating — moods, themes, even people who shifted your week.",
  },
  {
    icon: Mic,
    title: "Voice journaling when typing is hard",
    body: "Talk for a minute when writing feels heavy. Voice journaling is part of the upper premium tier.",
  },
  {
    icon: Heart,
    title: "Four coach personas",
    body: "Switch between Gentle Guide, Tough Coach, Wise Sage, and Fun Friend depending on what you need that day.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Encrypted storage, signed media URLs, no journal data sold, no AI training on your entries.",
  },
];

const FREE_VS_PAID = {
  free: [
    "30-second mood + energy check-ins",
    "Written journaling with AI reflection on each entry",
    "Recent insights from your last few entries",
    "Limited entry history",
  ],
  paid: [
    "Full journal history, no week-cap",
    "30-day mood and energy trends",
    "Weekly AI summaries of what changed",
    "All four coach personas, unlimited use",
    "Voice journaling and AI memory across weeks",
    "Relationship mood map: who shifts your mood",
  ],
};

const COMPARISON = [
  {
    name: "Nuju",
    body: "AI journaling + mood tracking + multiple coach personas in one low-friction app. Built around what you actually wrote, not generic templates.",
    accent: true,
  },
  {
    name: "Generic AI chatbot",
    body: "Will respond to a single message but does not store mood, build memory, or surface multi-week patterns from your reflection.",
  },
  {
    name: "Pure mood tracker (Daylio, etc.)",
    body: "Fast logging of mood and tags, but no journaling and no AI interpretation of why your mood is moving the way it is.",
  },
  {
    name: "Prompt-only journaling app",
    body: "Helpful for getting started, but stops at the prompt. Less useful once you want patterns instead of more pages.",
  },
];

const FAQS = [
  {
    q: "What is an AI journaling app?",
    a: "An AI journaling app is a journal that combines your writing with mood data and uses AI to reflect on what you wrote. Instead of a blank page, you get a private read on what is happening underneath an entry, plus pattern detection across weeks of entries.",
  },
  {
    q: "Is Nuju free?",
    a: "Yes. The Ju Gets You reveal and core mood + writing flow are free. Paid access unlocks full history, 30-day trends, weekly summaries, voice journaling, AI memory, and the relationship mood map.",
  },
  {
    q: "Is my journal private?",
    a: "Yes. Entries live in encrypted storage with private access controls, media URLs are signed, journal data is not sold, and your writing is not used to train AI models.",
  },
  {
    q: "How is Nuju different from a generic AI chatbot?",
    a: "A chatbot replies to a single message. Nuju is a journaling system: it pairs writing with mood and energy, remembers context across entries, and surfaces trends you cannot see from any one conversation.",
  },
  {
    q: "Does Nuju replace therapy?",
    a: "No. Nuju is a reflection and self-awareness tool, not therapy, crisis care, or medical treatment. It works best alongside real-world support when you need it.",
  },
  {
    q: "Can I journal by voice?",
    a: "Yes. Voice journaling is part of the upper premium tier — useful when typing feels heavy or when you want to capture a thought before it slips.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nuju",
  alternateName: "Nuju AI Journal",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "AI Journaling and Mood Tracking",
  operatingSystem: "Web browser, iOS, Android",
  url: CANONICAL,
  description:
    "Nuju is the AI journaling app that pairs 30-second mood check-ins with written reflection, four coach personas, weekly AI summaries, and pattern discovery across your entries.",
  image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
  featureList: [
    "AI reflection on your actual writing",
    "30-second mood and energy check-ins",
    "Four coach personas",
    "Weekly summaries and 30-day trends",
    "Voice journaling",
    "Relationship mood map",
    "Encrypted storage, no AI training on journal entries",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free Ju Gets You reveal and core mood + journaling flow.",
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

const PERSONA_PILLS = [
  { name: "Gentle Guide", img: coachGentle, body: "Warm, validating, patient." },
  { name: "Tough Coach", img: coachTough, body: "Direct, no excuses, action." },
  { name: "Wise Sage", img: coachWise, body: "Thoughtful, philosophical." },
  { name: "Fun Friend", img: coachFun, body: "Playful, honest, light." },
];

const AiJournal: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Journaling App for Mood Tracking and Pattern Discovery"
        description="Nuju is the AI journaling app that turns 30-second mood check-ins and written reflection into weekly patterns, AI summaries, and a coach that fits your style. Start free."
        canonical={CANONICAL}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "AI Journal", url: CANONICAL },
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
              to="/onboarding?source=ai_journal_nav"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start free reveal
            </Link>
            <AppStoreCta size="sm" className="hidden sm:inline-flex" />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-14">
        <section className="text-center" data-testid="ai-journal-hero">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            AI journaling app
          </p>
          <h1 className="mx-auto max-w-2xl font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            The AI journal that reads what you actually wrote
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Nuju pairs a 30-second mood check-in with written reflection, then uses AI to surface what is repeating
            underneath your entries — moods, themes, even relationships that shift your week.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=ai_journal_hero"
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
            src={juGreat}
            alt="Ju, the Nuju AI journaling companion mascot"
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
              <strong>Overthinkers</strong> who want a fast way to capture a thought before it spirals, without committing
              to long-form journaling.
            </li>
            <li>
              <strong>Mood tracker users</strong> who have outgrown apps that only collect data and want AI that
              interprets what is moving.
            </li>
            <li>
              <strong>People between therapy sessions</strong> who want a private space to track what came up that week,
              with reflection support but no medical claims.
            </li>
            <li>
              <strong>ADHD and low-energy days</strong> where 30 seconds is the only journaling that actually happens.
            </li>
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="font-serif text-2xl font-bold text-foreground">
            How Nuju works in 30 seconds
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.label}
                className="rounded-2xl border border-border/60 bg-card/60 p-5"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  Step {i + 1}
                </p>
                <p className="font-serif text-lg font-semibold text-foreground">{step.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="features">
          <h2 id="features" className="font-serif text-2xl font-bold text-foreground">
            What makes Nuju different
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border/60 bg-card/60 p-5"
                >
                  <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="personas">
          <h2 id="personas" className="font-serif text-2xl font-bold text-foreground">
            Pick the coach that fits your day
          </h2>
          <p className="mt-3 text-foreground/85">
            Most AI journaling apps give you one voice. Nuju gives you four. Switch any time.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONA_PILLS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/60 p-5 text-center"
              >
                <img
                  src={p.img}
                  alt={`Ju as ${p.name}, a Nuju coach persona`}
                  className="mb-3 h-20 w-20 object-contain"
                  width={80}
                  height={80}
                />
                <p className="font-serif text-base font-semibold text-foreground">{p.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="free-vs-paid">
          <h2 id="free-vs-paid" className="font-serif text-2xl font-bold text-foreground">
            What you get free vs paid
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Free</p>
              <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">Start without a credit card</h3>
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
              <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">Unlock the full reflection system</h3>
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
            Nuju vs other ways to journal with AI
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
            Want side-by-side comparisons?{" "}
            <Link to="/blog/best-ai-journaling-apps" className="text-primary underline-offset-4 hover:underline">
              Read the 8-app AI journaling roundup
            </Link>
            {" "}or{" "}
            <Link to="/blog/best-mood-tracker-apps" className="text-primary underline-offset-4 hover:underline">
              the mood tracker comparison
            </Link>
            .
          </p>
        </section>

        <section className="mt-16" aria-labelledby="related-products">
          <h2 id="related-products" className="font-serif text-2xl font-bold text-foreground">
            More on how Nuju works
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              to="/mood-tracker"
              className="rounded-2xl border border-border/60 bg-card/60 p-5 transition-all hover:border-primary/35 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Mood tracking
              </p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">
                Nuju as a mood tracker
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                How the 10-second mood and energy check-in turns into 30-day trends, AI summaries, and pattern
                detection.
              </p>
            </Link>
            <Link
              to="/voice-journaling"
              className="rounded-2xl border border-border/60 bg-card/60 p-5 transition-all hover:border-primary/35 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Voice journaling
              </p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">
                Talk-first journaling in Nuju
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Talk for a minute, get an automatic transcript and AI reflection, and keep mood patterns connected to
                spoken entries.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="privacy">
          <h2 id="privacy" className="font-serif text-2xl font-bold text-foreground">
            Privacy is the default, not an upsell
          </h2>
          <p className="mt-3 text-foreground/85">
            Journal entries live in encrypted storage with private access controls. Media URLs are signed. Journal
            content is not sold and is not used to train AI models. The full handling is documented on our{" "}
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
            Start your first 30-second entry today
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Try the free Ju Gets You reveal. If the reflection style feels right, keep going. If not, you have lost
            nothing — and your data is yours.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=ai_journal_footer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start the free reveal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/install"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Install Nuju
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

export default AiJournal;

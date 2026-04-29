import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Lock, Mic, Pause, Sparkles, Wand2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import juMain from "@/assets/ju-main.webp";
import juGreat from "@/assets/ju-great.webp";

const CANONICAL = "https://nuju.app/voice-journaling";

const STEPS = [
  {
    label: "Tap the mic, talk for a minute",
    body: "Speak the way you actually think. No prompts, no formatting pressure — just say what is on your mind.",
  },
  {
    label: "Get a transcript and AI reflection",
    body: "Nuju turns your voice into a private journal entry, then reflects on what you said with one of the four coach personas.",
  },
  {
    label: "Patterns build alongside text entries",
    body: "Voice and written entries share the same mood, energy, and trend layer — so spoken thoughts feed your weekly summaries too.",
  },
];

const FEATURES = [
  {
    icon: Mic,
    title: "Talk-first journaling",
    body: "Skip the blank page. Voice journaling captures the raw thought before you have to package it into sentences.",
  },
  {
    icon: Wand2,
    title: "Automatic transcription",
    body: "Every voice entry becomes a searchable, editable text journal entry — the spoken version is preserved alongside the transcript.",
  },
  {
    icon: Brain,
    title: "AI reflects on what you said",
    body: "The same AI that responds to written entries reads your transcript, picks up themes, and offers a soft reflection.",
  },
  {
    icon: Sparkles,
    title: "Mood and energy stay paired",
    body: "Voice entries are tagged with your mood and energy reading so trends include spoken reflection, not just typed notes.",
  },
  {
    icon: Pause,
    title: "Designed for low-energy days",
    body: "When typing feels heavy or you have only thirty seconds before bed, talking is the lowest-friction way to capture something.",
  },
  {
    icon: Lock,
    title: "Audio is private by default",
    body: "Recordings are stored with signed media URLs, encrypted at rest, never sold, and never used to train AI models.",
  },
];

const USE_CASES = [
  {
    title: "When typing feels heavy",
    body: "ADHD, low energy, post-therapy decompression, or just a long day — voice journaling removes the friction that kills written habits.",
  },
  {
    title: "Captures emotion the page hides",
    body: "Tone, pace, and pauses carry information words on a page lose. Voice keeps that texture in your reflection.",
  },
  {
    title: "Faster than typing on mobile",
    body: "A minute of speech is several paragraphs of thought. Voice is the fastest way to journal honestly on a phone.",
  },
  {
    title: "Late-night and bedtime entries",
    body: "Talk through what is keeping you up without staring at a bright screen and a blinking cursor.",
  },
];

const FAQS = [
  {
    q: "What is voice journaling?",
    a: "Voice journaling is journaling by speaking instead of typing. You record what you want to reflect on, the app transcribes it into a text entry, and you get a written record plus the original audio. It is faster than typing on a phone and captures the texture of how you actually talk to yourself.",
  },
  {
    q: "Is voice journaling included for free in Nuju?",
    a: "Voice journaling is part of Nuju's premium tier, alongside AI memory, the relationship mood map, and 30-day trend charts. The free tier covers mood and energy check-ins plus written journaling so you can evaluate the reflection style before paying.",
  },
  {
    q: "Where is my voice data stored?",
    a: "Voice recordings are stored with signed media URLs and encrypted at rest. The audio is private to your account, is not sold, and is never used to train AI models. The transcript follows the same privacy rules as written entries.",
  },
  {
    q: "Can I edit a voice transcript after it is created?",
    a: "Yes. After Nuju transcribes your audio, the text becomes a normal journal entry you can edit, search, and add to. The original recording is kept alongside the entry.",
  },
  {
    q: "How long can a voice entry be?",
    a: "Most useful voice entries are a single minute or two — long enough to talk through a thought, short enough to keep the habit sustainable. There is no requirement to fill a quota; the goal is honest capture, not length.",
  },
  {
    q: "Does Nuju voice journaling replace therapy?",
    a: "No. Voice journaling is a self-reflection and pattern-tracking tool, not therapy or crisis care. It is genuinely useful between sessions, but it is not a clinical service.",
  },
];

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nuju",
  alternateName: "Nuju Voice Journaling",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Voice Journaling and Reflection",
  operatingSystem: "Web browser, iOS, Android",
  url: CANONICAL,
  description:
    "Nuju voice journaling lets you talk for a minute, get an automatic transcript and AI reflection, and feed spoken entries into the same mood and pattern layer as your written journal.",
  image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
  featureList: [
    "Voice journaling with automatic transcription",
    "AI reflection on what you said",
    "Mood and energy paired with every voice entry",
    "Original audio preserved with the transcript",
    "Encrypted storage and signed media URLs",
    "No voice data sold or used to train AI",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free Ju Gets You reveal. Voice journaling is part of premium access.",
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

const VoiceJournaling: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Voice Journaling App with AI Transcription and Reflection"
        description="Nuju voice journaling lets you talk for a minute, get an instant transcript with AI reflection, and feed spoken entries into your mood patterns. Try the free reveal."
        canonical={CANONICAL}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Voice Journaling", url: CANONICAL },
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
          <Link
            to="/onboarding?source=voice_journaling_nav"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Start free reveal
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-14">
        <section className="text-center" data-testid="voice-journaling-hero">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Voice journaling app
          </p>
          <h1 className="mx-auto max-w-2xl font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Journal by talking when typing feels heavy
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tap the mic, talk for a minute, and Nuju turns your voice into a private journal entry with an AI
            reflection — so spoken thoughts feed the same mood patterns as your written ones.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=voice_journaling_hero"
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
          </div>

          <img
            src={juGreat}
            alt="Ju, the Nuju voice journaling companion mascot"
            className="mx-auto mt-10 h-32 w-32 object-contain"
            width={128}
            height={128}
          />
        </section>

        <section className="mt-16" aria-labelledby="who-its-for">
          <h2 id="who-its-for" className="font-serif text-2xl font-bold text-foreground">
            When voice journaling actually helps
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {USE_CASES.map((u) => (
              <div key={u.title} className="rounded-2xl border border-border/60 bg-card/60 p-5">
                <h3 className="font-serif text-lg font-semibold text-foreground">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="font-serif text-2xl font-bold text-foreground">
            How voice journaling works in Nuju
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
            What makes Nuju voice journaling different
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

        <section className="mt-16" aria-labelledby="privacy">
          <h2 id="privacy" className="font-serif text-2xl font-bold text-foreground">
            Audio handled like the private data it is
          </h2>
          <p className="mt-3 text-foreground/85">
            Voice recordings are stored with signed media URLs and encrypted at rest. Audio is never sold and never
            used to train AI models. Transcripts follow the same privacy rules as your written entries. Full handling
            is documented on our{" "}
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
            Talk through what is on your mind tonight
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Try the free Ju Gets You reveal first. Voice journaling unlocks with premium once you know the reflection
            style fits.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/onboarding?source=voice_journaling_footer"
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

export default VoiceJournaling;

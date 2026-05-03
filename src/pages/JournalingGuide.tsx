import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen, Brain, Sparkles, Heart, List } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";

const CHAPTERS = [
  { id: "what-is-journaling", label: "1. What is journaling?" },
  { id: "the-science", label: "2. The science: why it works" },
  { id: "getting-started", label: "3. How to start (in 30 seconds)" },
  { id: "what-to-write", label: "4. What to write when you're stuck" },
  { id: "methods", label: "5. Journaling methods (pen, digital, voice, AI)" },
  { id: "mood-tracking", label: "6. Mood tracking & pattern discovery" },
  { id: "tools", label: "7. Best tools & apps" },
  { id: "specific-situations", label: "8. Journaling for specific situations" },
  { id: "common-questions", label: "9. Common questions" },
];

const Chapter: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mt-14 scroll-mt-20">
    <h2 className="font-serif text-3xl font-bold text-foreground mb-4">{title}</h2>
    <div className="space-y-4 text-foreground/85 leading-relaxed">{children}</div>
  </section>
);

const InlineLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-primary font-medium underline-offset-4 hover:underline">
    {children}
  </Link>
);

const JournalingGuide: React.FC = () => {
  const canonical = "https://nuju.app/guides/journaling";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Complete Guide to Journaling: Methods, Science & Tools (2026)",
    description:
      "Everything you need to start, sustain, and get real value from a journaling practice — backed by research and distilled from 20+ in-depth guides.",
    datePublished: "2026-04-18",
    dateModified: "2026-04-18",
    inLanguage: "en",
    articleSection: "Journaling Guide",
    author: { "@type": "Organization", name: "Nuju", url: "https://nuju.app" },
    publisher: {
      "@type": "Organization",
      name: "Nuju",
      url: "https://nuju.app",
      logo: { "@type": "ImageObject", url: "https://nuju.app/pwa-192x192.png" },
    },
    image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Complete Guide to Journaling: Science, Methods, Tools"
        description="Learn how to start journaling, build a habit that lasts, track moods, and choose the right prompts, methods, and tools for 2026."
        canonical={canonical}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Guides", url: "https://nuju.app/guides/journaling" },
          { name: "Journaling", url: canonical },
        ]}
      />
      <Helmet>
        <html lang="en" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            ← Blog
          </Link>
          <Link
            to="/onboarding"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Try Nuju free
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">The Complete Guide</p>
        <h1 className="font-serif text-4xl font-bold text-foreground leading-tight mb-6 sm:text-5xl">
          Journaling: Methods, Science &amp; Tools
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Everything you need to start a journaling practice that actually sticks — backed by research, distilled from
          20+ in-depth guides, and updated for 2026. Read it end-to-end, or jump to the chapter you need.
        </p>
        <div className="mb-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 18 min read</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> 9 chapters</span>
          <time dateTime="2026-04-18">Updated April 2026</time>
        </div>

        <nav
          aria-label="Table of contents"
          className="mb-12 rounded-2xl border border-border/50 bg-card/60 px-5 py-4"
        >
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <List className="h-4 w-4" /> In this guide
          </p>
          <ol className="space-y-1.5 text-sm">
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="text-foreground/80 hover:text-primary transition-colors">
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Chapter id="what-is-journaling" title="What is journaling?">
          <p>
            Journaling is the practice of writing down your thoughts, feelings, and observations on a regular basis. At
            its simplest, it&rsquo;s a private space where you put your inner life into words. That&rsquo;s the whole
            definition — and also why so many people get stuck trying to do it &ldquo;right.&rdquo;
          </p>
          <p>
            A journal can be a paper notebook, a text file, a voice memo, or an app. It can be one sentence a day or
            three pages. The form matters far less than the consistency. A one-line mood rating every night for a year
            teaches you more about yourself than ten brilliant entries scattered across a decade.
          </p>
          <p className="rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 italic text-foreground/90">
            Journaling isn&rsquo;t about beautiful prose. It&rsquo;s a tool for noticing — what you feel, what triggers
            it, and what pattern you&rsquo;d otherwise miss.
          </p>
        </Chapter>

        <Chapter id="the-science" title="The science: why journaling actually works">
          <p>
            The benefits aren&rsquo;t just self-help folklore. Since the 1980s, researchers have measured real,
            replicable effects from expressive writing — James Pennebaker&rsquo;s foundational studies at UT Austin
            showed improvements in immune function, mood, and doctor visits from just 15–20 minutes of writing over four
            days.
          </p>
          <p>
            UCLA&rsquo;s research on <em>affect labeling</em> — the simple act of naming an emotion — shows it reduces
            amygdala activity, which is the brain&rsquo;s threat-detection system. Writing down a worry literally takes
            some of its edge off. A Baylor study found that writing a to-do list 5 minutes before bed helped people fall
            asleep 9 minutes faster than writing about completed tasks.
          </p>
          <p>
            If you want the full research breakdown, read{" "}
            <InlineLink to="/blog/journaling-for-mental-health">
              Why journaling works for mental health (the research)
            </InlineLink>
            . For the specific connection to anxiety, see{" "}
            <InlineLink to="/blog/mood-tracking-for-anxiety">mood tracking for anxiety</InlineLink>.
          </p>
        </Chapter>

        <Chapter id="getting-started" title="How to start a journaling habit (in 30 seconds)">
          <p>
            The single biggest reason people fail at journaling: they try to start too big. A blank page demanding 500
            words of insight at 10pm is a habit killer. The fix is making the minimum so small it feels silly to skip.
          </p>
          <p>The 30-second method:</p>
          <ol className="space-y-2 pl-4">
            <li className="flex gap-3"><span className="font-semibold text-primary">1.</span> Attach it to something you already do daily (morning coffee, brushing teeth).</li>
            <li className="flex gap-3"><span className="font-semibold text-primary">2.</span> Rate your mood — 1 to 5 is enough.</li>
            <li className="flex gap-3"><span className="font-semibold text-primary">3.</span> Write one sentence. Literally one.</li>
            <li className="flex gap-3"><span className="font-semibold text-primary">4.</span> Done. You&rsquo;re journaling.</li>
          </ol>
          <p>
            Full walkthrough:{" "}
            <InlineLink to="/blog/how-to-start-journaling">How to start a journaling habit</InlineLink>. If you want a
            repeatable daily template, see the{" "}
            <InlineLink to="/blog/5-minute-daily-journaling-habit">5-minute daily journaling habit</InlineLink>. Trouble
            sleeping? The{" "}
            <InlineLink to="/blog/bedtime-journaling-routine-for-sleep">bedtime journaling routine</InlineLink> is
            built around the Baylor study.
          </p>
        </Chapter>

        <Chapter id="what-to-write" title="What to write when you have nothing to say">
          <p>
            Blank page anxiety is real. Good prompts don&rsquo;t ask you to perform self-awareness — they give you a
            specific thread to pull. &ldquo;What&rsquo;s one thing that drained me today, and why?&rdquo; beats &ldquo;how
            am I feeling?&rdquo; every time.
          </p>
          <p>
            Depending on what&rsquo;s on your mind, pick the prompt set that fits:
          </p>
          <ul className="space-y-2 pl-4">
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Feeling anxious: <InlineLink to="/blog/journaling-prompts-for-anxiety">journaling prompts for anxiety</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Trying to understand yourself: <InlineLink to="/blog/journaling-for-self-discovery">self-discovery prompts</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Awake at 3am: <InlineLink to="/blog/3am-anxiety-journaling">3am anxiety journaling</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Prepping for therapy: <InlineLink to="/blog/journaling-before-therapy">journaling before therapy</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Working on relationships: <InlineLink to="/blog/journaling-for-relationships">journaling for relationships</InlineLink></li>
          </ul>
        </Chapter>

        <Chapter id="methods" title="Journaling methods: pen, digital, voice, AI">
          <p>
            There&rsquo;s no single &ldquo;right&rdquo; way to journal — different methods solve different problems.
            Here&rsquo;s the honest trade-off:
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-2">Paper journaling</h3>
          <p>
            Tactile, private, no notifications. Slower, harder to search, and you lose pattern visibility over time.
            Great for a morning pages ritual.
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-2">Digital journaling</h3>
          <p>
            Searchable, syncable, backup-able. The risk is it feels like another app. Best digital apps treat journaling
            like a habit, not a document.
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-2">Voice journaling</h3>
          <p>
            Often 3–5× faster than typing, and captures the emotional tone you&rsquo;d filter out when writing. Great
            for people who think out loud. Full deep-dive:{" "}
            <InlineLink to="/blog/voice-journaling-guide">the voice journaling guide</InlineLink>. To see how Nuju
            handles voice capture, visit{" "}
            <InlineLink to="/voice-journaling">voice journaling on Nuju</InlineLink>.
          </p>
          <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-2">AI journaling</h3>
          <p>
            AI journaling apps don&rsquo;t replace the writing — they surface what a human couldn&rsquo;t see across
            hundreds of entries. Pattern recognition, sentiment trends, relationship mapping. More on what it actually
            is: <InlineLink to="/blog/what-is-ai-journaling">What is AI journaling?</InlineLink> and a head-to-head
            comparison: <InlineLink to="/blog/ai-journal-vs-traditional">AI journal vs. traditional</InlineLink>. To
            see Nuju&rsquo;s approach, open{" "}
            <InlineLink to="/ai-journal">the AI journal page</InlineLink>.
          </p>
        </Chapter>

        <Chapter id="mood-tracking" title="Mood tracking & pattern discovery">
          <p>
            A mood journal adds one structured data point to each entry — a rating, a color, or a label. Over weeks,
            that structured data is what lets you <em>see</em> patterns instead of vaguely sensing them.
          </p>
          <p>
            Start with the basics:{" "}
            <InlineLink to="/blog/what-is-a-mood-journal">What is a mood journal?</InlineLink> Then the case for
            tracking: <InlineLink to="/blog/benefits-of-mood-tracking">benefits of mood tracking</InlineLink>. For a
            daily system: <InlineLink to="/blog/how-to-track-emotions-daily">how to track emotions daily</InlineLink>.
            If you want to see what a structured tracker looks like in practice, open{" "}
            <InlineLink to="/mood-tracker">the Nuju mood tracker</InlineLink>.
          </p>
          <p>
            Clinicians also use structured mood data as session prep — see{" "}
            <InlineLink to="/blog/mood-tracking-for-therapists">mood tracking for therapists</InlineLink>.
          </p>
        </Chapter>

        <Chapter id="tools" title="Best journaling & mood tracking tools">
          <p>
            Which app is right for you depends on what you want back from your entries. A quick shortlist by goal:
          </p>
          <ul className="space-y-2 pl-4">
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Overall roundup: <InlineLink to="/blog/best-journaling-apps-2026">best journaling apps 2026</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> AI-specific: <InlineLink to="/blog/best-ai-journaling-apps">best AI journaling apps</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Mood-first tracking: <InlineLink to="/blog/best-mood-tracker-apps">best mood tracker apps</InlineLink></li>
            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" /> Looking for a Daylio replacement: <InlineLink to="/blog/daylio-alternatives">Daylio alternatives</InlineLink></li>
          </ul>
        </Chapter>

        <Chapter id="specific-situations" title="Journaling for specific situations">
          <p>Journaling isn&rsquo;t one-size-fits-all. These guides are tuned for specific contexts:</p>
          <ul className="space-y-2 pl-4">
            <li className="flex gap-2"><Brain className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> <InlineLink to="/blog/journaling-for-adhd">Journaling for ADHD</InlineLink> — low-friction systems built for executive-function reality.</li>
            <li className="flex gap-2"><Heart className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> <InlineLink to="/blog/journaling-for-relationships">Journaling for relationships</InlineLink> — prompts for couples and conflict repair.</li>
            <li className="flex gap-2"><Sparkles className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> <InlineLink to="/blog/mood-tracking-for-anxiety">Mood tracking for anxiety</InlineLink> — turn racing thoughts into data.</li>
            <li className="flex gap-2"><BookOpen className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> <InlineLink to="/blog/journaling-before-therapy">Journaling before therapy</InlineLink> — arrive with clearer notes and patterns.</li>
          </ul>
        </Chapter>

        <Chapter id="common-questions" title="Common questions about journaling">
          <div className="space-y-4">
            <details className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                How often should I journal?
              </summary>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                Daily is ideal, but consistency matters more than frequency. A 30-second entry every day beats a 20-minute
                entry once a week. Research on habit formation suggests attaching journaling to an existing routine
                (coffee, bedtime) works far better than willpower alone.
              </p>
            </details>
            <details className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                How long should each entry be?
              </summary>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                For most people, 1–3 sentences is plenty. Pennebaker&rsquo;s research used 15–20 minute sessions, but
                that was for processing specific traumatic events. For day-to-day emotional tracking, short and
                consistent wins.
              </p>
            </details>
            <details className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                Is AI journaling actually useful, or just a gimmick?
              </summary>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                AI is useful for what a human reader can&rsquo;t do at scale: spot patterns across hundreds of entries,
                extract recurring themes, and map relationships between people and mood. It doesn&rsquo;t replace the
                writing itself — it makes the archive more valuable. See{" "}
                <InlineLink to="/blog/what-is-ai-journaling">What is AI journaling?</InlineLink> for the full case.
              </p>
            </details>
            <details className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4">
              <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                Can journaling replace therapy?
              </summary>
              <p className="mt-3 text-foreground/85 leading-relaxed">
                No. Journaling is a complement, not a substitute — the research itself frames it that way. It&rsquo;s
                excellent session prep and between-session processing. If you&rsquo;re dealing with clinical symptoms,
                work with a licensed professional.
              </p>
            </details>
          </div>
        </Chapter>

        <div className="mt-20 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Try it yourself</p>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Start your first entry in 30 seconds</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Nuju does everything in this guide — mood tracking, prompts, voice entries, and AI pattern discovery — in
            one app. Free to start.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Start journaling free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            ← Back to all articles
          </Link>
        </div>
      </article>

      <footer className="border-t border-border/60 px-4 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <Link to="/" className="font-serif font-bold text-foreground">Nuju</Link>
          <div className="flex flex-wrap gap-4">
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/support" className="hover:text-foreground transition-colors">Support</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p>© 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default JournalingGuide;


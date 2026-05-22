import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, List, Tag } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AppStoreCta from "@/components/AppStoreCta";
import SEOHead from "@/components/SEOHead";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import {
  BlogPost as BlogPostData,
  BlogSection,
  getBlogPost,
  getPostLanguage,
  getPublishedBlogPost,
  getRelatedPosts,
  isPublishedBlogPost,
  LANGUAGE_ALTERNATES,
  slugifyHeading,
} from "@/data/blog-posts";

const RECOMMENDATION_USE_CASE_SLUGS = new Set([
  "mood-tracking-for-anxiety",
  "journaling-for-adhd",
  "ai-journal-for-overthinking",
  "mood-tracker-for-self-awareness",
]);

const getRecommendationPageType = (
  post: BlogPostData,
): "category" | "alternative" | "comparison" | "use_case" | null => {
  if (RECOMMENDATION_USE_CASE_SLUGS.has(post.slug)) return "use_case";
  if (post.category !== "App Comparison") return null;
  if (post.slug.includes("alternative")) return "alternative";
  if (post.slug.startsWith("best-")) return "category";
  return "comparison";
};

type RecommendationSnapshot = {
  eyebrow: string;
  title: string;
  points: Array<{ label: string; body: string }>;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

type InternalLinkRecommendation = {
  slug: string;
  eyebrow: string;
  body: string;
};

type InternalLinkCard = InternalLinkRecommendation & {
  post: BlogPostData;
};

const INTERNAL_LINK_RECOMMENDATIONS: Record<string, InternalLinkRecommendation[]> = {
  "best-ai-journaling-apps": [
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Mood tracker intent",
      body: "Compare the broader mood tracker category before choosing an AI-first journal.",
    },
    {
      slug: "daylio-alternatives",
      eyebrow: "Daylio switchers",
      body: "See what changes when you move from quick mood logging to deeper reflection.",
    },
    {
      slug: "reflectly-alternatives",
      eyebrow: "Prompt app switchers",
      body: "Useful if guided prompts feel helpful but you want stronger pattern recognition.",
    },
    {
      slug: "how-to-start-journaling",
      eyebrow: "Habit setup",
      body: "Start here if the blocker is consistency, not choosing another tool.",
    },
  ],
  "best-mood-tracker-apps": [
    {
      slug: "daylio-alternatives",
      eyebrow: "Alternative query",
      body: "A focused comparison for readers already familiar with Daylio.",
    },
    {
      slug: "emoko-alternatives",
      eyebrow: "Cute mood tracker switch",
      body: "For readers who started with Emoko and want a tracker that actually reads their entries.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "Use case",
      body: "Go deeper on mood tracking when the goal is self-awareness, not just logging.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal intent",
      body: "Compare AI journaling apps if you want mood data plus written reflection.",
    },
  ],
  "daylio-alternatives": [
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Category view",
      body: "Step back and compare the full mood tracker category side by side.",
    },
    {
      slug: "emoko-alternatives",
      eyebrow: "Similar switch",
      body: "Compared Daylio with Emoko already? See how both stack up against deeper AI alternatives.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "Deeper use case",
      body: "Read this if your real goal is understanding emotional patterns, not collecting stats.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI reflection",
      body: "Compare AI journals if Daylio feels too light on interpretation.",
    },
  ],
  "emoko-alternatives": [
    {
      slug: "daylio-alternatives",
      eyebrow: "Compared head-to-head",
      body: "If you searched 'emoko vs daylio', see why people switch from Daylio too once they want depth.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Category view",
      body: "Step back and compare the full mood tracker category before picking a long-term tool.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI reflection",
      body: "Read this if the missing piece in Emoko is the AI that reads your entries back to you.",
    },
  ],
  "reflectly-alternatives": [
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal category",
      body: "Compare the strongest AI journaling apps if prompts are no longer enough.",
    },
    {
      slug: "how-to-start-journaling",
      eyebrow: "Habit setup",
      body: "Use this if you want the simplest possible daily journaling system.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Use case",
      body: "A better next read if your main loop is rumination or nighttime replay.",
    },
  ],
  "how-to-start-journaling": [
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Choose a tool",
      body: "Compare AI journaling apps once you know what kind of habit you want.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Track feelings",
      body: "Review mood tracker options if a quick daily check-in is easier than long entries.",
    },
    {
      slug: "what-is-ai-journaling",
      eyebrow: "Learn the category",
      body: "Understand what AI journaling adds beyond a blank page or notes app.",
    },
  ],
  "apple-journal-alternatives": [
    {
      slug: "day-one-alternative",
      eyebrow: "Premium diary switch",
      body: "Compare Day One if you want a more polished cross-platform diary than Apple Journal.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal category",
      body: "Look at AI journaling apps if you want reflection that Apple Journal does not provide.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Add mood data",
      body: "Read this if the missing piece in Apple Journal is mood and energy tracking.",
    },
  ],
  "day-one-alternative": [
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI insight upgrade",
      body: "Compare AI journaling apps if you have outgrown Day One's writing-only focus.",
    },
    {
      slug: "apple-journal-alternatives",
      eyebrow: "Free iOS option",
      body: "Read this if you want a free Apple-native option before paying Day One's subscription.",
    },
    {
      slug: "best-self-reflection-apps",
      eyebrow: "Reflection category",
      body: "Step back and compare the broader self-reflection app category side by side.",
    },
  ],
  "best-self-reflection-apps": [
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal intent",
      body: "Go deeper on AI journaling apps when reflection means pattern recognition.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Stat-driven reflection",
      body: "Compare mood trackers if your reflection style is data over written entries.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "Use case",
      body: "Read this if your real goal is self-awareness, not collecting reflection stats.",
    },
  ],
  "mood-tracking-for-anxiety": [
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "When anxiety hits at night",
      body: "The 3-step technique for the 3am thought loop that mood tracking alone won't stop.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Overthinking loop",
      body: "Read this if anxiety mostly shows up as rumination rather than a body symptom.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "Use case",
      body: "Go deeper on mood tracking when the goal is understanding triggers, not just logging.",
    },
  ],
  "ai-journal-for-overthinking": [
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Night-time replay",
      body: "Use this exact 3-minute technique when overthinking spikes at 3am.",
    },
    {
      slug: "mood-tracking-for-anxiety",
      eyebrow: "Anxiety patterns",
      body: "Add a mood tracking layer when the rumination is anxiety wearing a thinking costume.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Choose a tool",
      body: "Compare AI journals when guided reflection beats writing into a blank page.",
    },
  ],
  "3am-anxiety-journaling": [
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Same loop, different time",
      body: "Read this when the 3am loop also shows up during the day as overthinking.",
    },
    {
      slug: "mood-tracking-for-anxiety",
      eyebrow: "Anxiety patterns",
      body: "Track mood alongside journaling to see what is actually driving the night-time spikes.",
    },
    {
      slug: "how-to-start-journaling",
      eyebrow: "Habit setup",
      body: "Turn the 3am technique into a daily habit before the next bad night.",
    },
    {
      slug: "sunday-scaries-mood-data",
      eyebrow: "Weekly anxiety pattern",
      body: "See the journal data on why Sunday evenings hit the hardest — and the 3-step reset that works on Sunday too.",
    },
  ],
  "sunday-scaries-mood-data": [
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "When the Scaries hit at night",
      body: "If Sunday anxiety bleeds into 3am wakeups, this 3-minute technique stops the loop in bed.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Sunday overthinking",
      body: "When Sunday Scaries are really Sunday overthinking, this guide breaks the loop pattern.",
    },
    {
      slug: "mood-tracking-for-anxiety",
      eyebrow: "Track the weekly pattern",
      body: "Add mood tracking to see if Sunday is your specific anxiety peak — or if the pattern is different.",
    },
    {
      slug: "what-people-write-in-journal-data",
      eyebrow: "Real journaling data",
      body: "See the patterns from 161 real entries — 87% logged on 'not great' days. The averages your week is being compared to.",
    },
  ],
  "what-people-write-in-journal-data": [
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Build the habit",
      body: "The data says median entries are 31 characters — here's how to make daily journaling that short feel sustainable.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "The 'middle' state",
      body: "Most entries come from the fuzzy middle, which is also where overthinking lives. Here's how AI journaling helps both.",
    },
    {
      slug: "ai-coach-personality-preference-data",
      eyebrow: "More real Nuju data",
      body: "We built 4 AI coach personalities. 50% of real conversations went to the 'Gentle' one. Here's why.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "What to do with the data",
      body: "Once you see your own pattern, this guide covers what to actually do with the insight.",
    },
  ],
  "ai-coach-personality-preference-data": [
    {
      slug: "what-people-write-in-journal-data",
      eyebrow: "More real Nuju data",
      body: "87% of real journal entries are logged on 'not great' days. Here's what 161 entries reveal about why people actually journal.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Soft voice for overthinking",
      body: "Why the Gentle persona wins also explains why AI journaling helps overthinking — both pattern matches: low bandwidth wants validation, not push-back.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Compare AI journal apps",
      body: "Once you know which AI tone you prefer, this guide compares the apps that actually offer multiple personas.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "Self-awareness, not just tracking",
      body: "Persona preference is itself self-awareness data — here's how to read your own mood and tone patterns.",
    },
  ],
  "complete-guide-ai-journaling-2026": [
    {
      slug: "what-is-ai-journaling",
      eyebrow: "Start with the basics",
      body: "What AI journaling actually means in 2026 — a plain-language intro to the category.",
    },
    {
      slug: "what-people-write-in-journal-data",
      eyebrow: "Real usage data",
      body: "161 real journal entries: 87% logged on 'not great' days. Median entry is 31 characters.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Pick your tool",
      body: "Compare the top AI journaling apps in 2026 — free tier, mid tier, premium tier breakdown.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Build the habit",
      body: "Habit-formation science applied to journaling: the 21-day pattern that makes it stick.",
    },
  ],
  "cara-mengatasi-overthinking": [
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Pas overthinking jadi anxiety",
      body: "Saat overthinking memicu kecemasan fisik (sesak, jantung berdebar), prompt khusus anxiety ini lebih cocok.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Cara lain ngeluarin",
      body: "Selain journaling, ada 5 metode curhat ke diri sendiri yang efektif — termasuk voice note dan surat ke diri.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Bagian dari self healing",
      body: "Mengatasi overthinking adalah satu bagian dari self healing yang lebih luas. Panduan lengkap di sini.",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "Pakai AI buat overthinking",
      body: "AI journal yang aman buat overthinker: kriteria privasi, persona AI, dan rekomendasi.",
    },
  ],
  "self-healing-dengan-jurnal": [
    {
      slug: "cara-mulai-journaling",
      eyebrow: "Mulai dari sini",
      body: "Pemula lengkap: cara mulai journaling 5 menit per hari dari nol — bahkan tanpa pengalaman.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Self healing buat overthinker",
      body: "Self healing seringkali butuh memutus loop overthinking — 4 prompt khusus untuk pikiran muter.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Self healing + anxiety",
      body: "Kalau self healing lo melibatkan anxiety, 7 prompt spesifik untuk anxiety ini langsung bisa dipakai.",
    },
    {
      slug: "journaling-untuk-kesehatan-mental",
      eyebrow: "Riset di balik journaling",
      body: "Riset 35 tahun yang mendukung journaling untuk kesehatan mental — dan kapan butuh profesional.",
    },
  ],
  "journaling-untuk-anxiety": [
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Anxiety = sering overthinking",
      body: "Overthinking adalah bentuk anxiety kognitif paling umum. 4 prompt khusus untuk memutus loop.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Anxiety tanpa teman?",
      body: "Saat anxiety muncul dan nggak ada teman bisa diajak ngobrol — 5 metode curhat ke diri sendiri.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Anxiety + self healing",
      body: "Journaling untuk anxiety adalah satu bagian dari self healing yang lebih luas.",
    },
    {
      slug: "manfaat-mood-tracking",
      eyebrow: "Tracking buat anxiety",
      body: "Mood tracking membantu mengidentifikasi pola anxiety dan trigger-nya dari minggu ke minggu.",
    },
  ],
  "cara-curhat-ke-diri-sendiri": [
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "Curhat ke AI",
      body: "Kalau metode ke-5 (AI journal) menarik, panduan lengkap memilih AI journal yang aman dan efektif.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Curhat untuk overthinker",
      body: "Buat overthinker, curhat ke diri sendiri sering butuh struktur. 4 prompt khusus untuk memutus loop.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Curhat sebagai self healing",
      body: "Curhat ke diri sendiri adalah salah satu bentuk paling sederhana dari self healing — panduan lengkap.",
    },
    {
      slug: "cara-mulai-journaling",
      eyebrow: "Curhat lewat journaling",
      body: "Untuk pemula yang baru mau curhat lewat tulisan — cara memulai journaling 5 menit per hari.",
    },
  ],
};

const getInternalLinkCards = (slug: string): InternalLinkCard[] =>
  (INTERNAL_LINK_RECOMMENDATIONS[slug] ?? [])
    .map((link) => {
      const linkedPost = getPublishedBlogPost(link.slug);
      return linkedPost ? { ...link, post: linkedPost } : null;
    })
    .filter((link): link is InternalLinkCard => Boolean(link));

const UnpublishedBlogPostNotice: React.FC<{ post: BlogPostData }> = ({ post }) => {
  const language = getPostLanguage(post);
  const locale = language === "id" ? "id-ID" : "en-US";
  const canonical = `https://nuju.app/blog/${post.slug}`;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} - Scheduled`}
        description={`This Nuju article is scheduled for ${formattedDate}. Browse the published journaling and mood tracking guides while it is being prepared.`}
        canonical={canonical}
        noindex
        language={language}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Blog", url: "https://nuju.app/blog" },
          { name: post.title, url: canonical },
        ]}
      />
      <Helmet>
        <html lang={language} />
      </Helmet>

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Scheduled article
        </p>
        <h1 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          This article is scheduled for {formattedDate}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Google may discover future Nuju article URLs from the app bundle before
          they are published. This page is intentionally marked noindex until the
          article is live.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Read published articles
          </Link>
          <Link
            to="/guides/journaling"
            className="inline-flex items-center justify-center rounded-full border border-border/70 bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Open journaling guide
          </Link>
        </div>
      </main>
    </div>
  );
};

type CommercialDestination = {
  href: string;
  label: string;
};

const COMMERCIAL_DESTINATION_BY_SLUG: Record<string, CommercialDestination> = {
  "best-mood-tracker-apps": { href: "/mood-tracker", label: "See the Nuju mood tracker" },
  "daylio-alternatives": { href: "/mood-tracker", label: "See the Nuju mood tracker" },
  "emoko-alternatives": { href: "/mood-tracker", label: "See the Nuju mood tracker" },
  "mood-tracker-for-self-awareness": { href: "/mood-tracker", label: "See the Nuju mood tracker" },
  "mood-tracking-for-anxiety": { href: "/mood-tracker", label: "See the Nuju mood tracker" },
  "journaling-for-adhd": { href: "/voice-journaling", label: "See voice journaling on Nuju" },
};

const DEFAULT_COMMERCIAL_DESTINATION: CommercialDestination = {
  href: "/ai-journal",
  label: "See how Nuju works",
};

const getCommercialDestination = (slug: string): CommercialDestination =>
  COMMERCIAL_DESTINATION_BY_SLUG[slug] ?? DEFAULT_COMMERCIAL_DESTINATION;

const getRecommendationSnapshot = (
  post: BlogPostData,
  language: "en" | "id",
): RecommendationSnapshot | null => {
  if (language !== "en") return null;

  const commercial = getCommercialDestination(post.slug);

  if (post.category === "App Comparison") {
    return {
      eyebrow: "Nuju snapshot",
      title: "When Nuju is the better fit",
      points: [
        {
          label: "Best for",
          body: "People who want journaling, mood tracking, and AI pattern recognition in one low-friction app.",
        },
        {
          label: "Less ideal if",
          body: "You want a fully offline journal, zero AI involvement, or a pure long-form diary experience.",
        },
        {
          label: "Privacy",
          body: "Entries stay in encrypted storage, Nuju does not sell journal data, and journal content is not used to train models.",
        },
        {
          label: "Start here",
          body: "Take the free Ju Gets You reveal first, then install if the reflection style feels useful for you.",
        },
      ],
      primaryLabel: "Start the free reveal",
      primaryHref: `/onboarding?source=blog_${post.slug}`,
      secondaryLabel: commercial.label,
      secondaryHref: commercial.href,
    };
  }

  if (RECOMMENDATION_USE_CASE_SLUGS.has(post.slug)) {
    return {
      eyebrow: "Nuju snapshot",
      title: "When Nuju fits this use case",
      points: [
        {
          label: "Best for",
          body: "People who need a short daily check-in when anxiety, overthinking, or ADHD make long journaling sessions hard to sustain.",
        },
        {
          label: "Support boundary",
          body: "Nuju is reflection support, not therapy, crisis care, or medical treatment. It works best as a self-awareness tool alongside real-world support when needed.",
        },
        {
          label: "Privacy",
          body: "Journal entries are protected with encrypted storage and private access controls so your reflection data stays yours.",
        },
        {
          label: "Start here",
          body: "Begin with the free reveal, see whether the feedback style lands, then install if you want to keep the practice going.",
        },
      ],
      primaryLabel: "Start the free reveal",
      primaryHref: `/onboarding?source=blog_${post.slug}`,
      secondaryLabel: commercial.label,
      secondaryHref: commercial.href,
    };
  }

  return null;
};

const renderSection = (section: BlogSection, index: number) => {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          id={slugifyHeading(section.content as string)}
          className="mt-10 mb-4 scroll-mt-20 font-serif text-2xl font-bold text-foreground"
        >
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mt-8 mb-3 font-serif text-xl font-semibold text-foreground"
        >
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mb-4 leading-relaxed text-foreground/85">
          {section.content as string}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mb-4 space-y-2 pl-4">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-2 leading-relaxed text-foreground/85">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mb-4 space-y-2 pl-4">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-foreground/85">
              <span className="flex-shrink-0 font-semibold text-primary">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <blockquote
          key={index}
          className="my-6 rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 italic leading-relaxed text-foreground/90"
        >
          {section.content as string}
        </blockquote>
      );
    default:
      return null;
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentSlug = slug ?? "";
  const scheduledPost = getBlogPost(currentSlug);
  const post = getPublishedBlogPost(currentSlug);
  const events = usePostHogEvents();
  const recommendationPageType = post ? getRecommendationPageType(post) : null;

  useEffect(() => {
    if (post && recommendationPageType) {
      events.trackRecommendationPageView(post.slug, post.category, recommendationPageType);
    }
  }, [events, post, recommendationPageType]);

  if (!post) {
    if (scheduledPost && !isPublishedBlogPost(scheduledPost)) {
      return <UnpublishedBlogPostNotice post={scheduledPost} />;
    }

    return <Navigate to="/blog" replace />;
  }

  const language = getPostLanguage(post);
  const locale = language === "id" ? "id-ID" : "en-US";
  const canonical = `https://nuju.app/blog/${post.slug}`;

  const alternateMapping = LANGUAGE_ALTERNATES[post.slug];
  const alternates = alternateMapping
    ? [
        {
          lang: alternateMapping.language === "en" ? "id" : "en",
          url: `https://nuju.app/blog/${alternateMapping.alternateSlug}`,
        },
        { lang: language, url: canonical },
      ]
    : undefined;

  const tocItems = post.sections
    .filter((s): s is BlogSection & { type: "h2"; content: string } => s.type === "h2")
    .map((s) => ({ id: slugifyHeading(s.content), label: s.content }));

  const wordCount = post.sections.reduce((total, s) => {
    const text = Array.isArray(s.content) ? s.content.join(" ") : s.content;
    return total + text.split(/\s+/).length;
  }, 0);

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const recommendationSnapshot = getRecommendationSnapshot(post, language);
  const internalLinkCards = getInternalLinkCards(post.slug);

  const nujuEntity = {
    "@type": "Organization",
    name: "Nuju",
    alternateName: ["Nuju AI Journal", "Nuju App", "Nu Ju"],
    url: "https://nuju.app",
    logo: {
      "@type": "ImageObject",
      url: "https://nuju.app/pwa-192x192.png",
    },
    sameAs: [
      "https://x.com/nujuapp",
      "https://www.instagram.com/nujuapp",
      "https://www.tiktok.com/@nujuappofficial",
      "https://www.youtube.com/@Nujuapp",
      "https://www.producthunt.com/products/nuju",
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: language,
    wordCount,
    articleSection: post.category,
    isAccessibleForFree: true,
    author: nujuEntity,
    publisher: nujuEntity,
    reviewedBy: nujuEntity,
    image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedUpdatedDate =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? new Date(post.updatedAt).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  const copy =
    language === "id"
      ? {
          allArticles: "Semua artikel",
          tryFree: "Coba Nuju gratis",
          minRead: "menit baca",
          onThisPage: "Isi artikel",
          faqTitle: "Pertanyaan yang sering ditanyakan",
          relatedTitle: "Baca juga",
          ctaEyebrow: "Coba sendiri",
          ctaTitle: "Mulai entry jurnal pertamamu hari ini",
          ctaBody: "Nuju cuma butuh 30 detik sehari. Pilih mood, tulis satu kalimat, lalu mulai lihat pola emosimu secara lebih jelas.",
          ctaButton: "Mulai journaling gratis",
          backToBlog: "Kembali ke semua artikel",
          footerAbout: "Tentang",
          footerSupport: "Bantuan",
          footerPrivacy: "Privasi",
        }
      : {
          allArticles: "All articles",
          tryFree: "Try Nuju free",
          minRead: "min read",
          onThisPage: "On this page",
          faqTitle: "Frequently asked questions",
          relatedTitle: "Keep reading",
          ctaEyebrow: "Try it yourself",
          ctaTitle: "Start your first journal entry today",
          ctaBody: "Nuju takes 30 seconds a day. Track your mood, get AI insights, and start understanding your emotional patterns with less friction.",
          ctaButton: "Start journaling free",
          backToBlog: "Back to all articles",
          footerAbout: "About",
          footerSupport: "Support",
          footerPrivacy: "Privacy",
        };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.metaTitle ?? post.title}
        description={post.metaDescription ?? post.description}
        canonical={canonical}
        alternates={alternates}
        language={language}
        breadcrumbs={[
          { name: "Home", url: "https://nuju.app/" },
          { name: "Blog", url: "https://nuju.app/blog" },
          { name: post.title, url: canonical },
        ]}
      />
      <Helmet>
        <html lang={language} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {copy.allArticles}
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to={`/onboarding?source=blog_article_nav_${post.slug}`}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              onClick={() =>
                events.trackRecommendationCtaClick(
                  post.slug,
                  post.category,
                  "blog_article_nav",
                  "reveal",
                )
              }
            >
              {copy.tryFree}
            </Link>
            <AppStoreCta
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() =>
                events.trackRecommendationCtaClick(
                  post.slug,
                  post.category,
                  "blog_article_nav_app_store",
                  "app_store",
                )
              }
            />
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} {copy.minRead}
          </span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          {formattedUpdatedDate && (
            <span className="flex items-center gap-1">
              <span aria-hidden>·</span>
              <span>
                {language === "id" ? "Diperbarui" : "Updated"}{" "}
                <time dateTime={post.updatedAt}>{formattedUpdatedDate}</time>
              </span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <span aria-hidden>·</span>
            <span>
              {language === "id"
                ? "Ditinjau oleh tim editorial Nuju"
                : "Reviewed by the Nuju editorial team"}
            </span>
          </span>
        </div>

        <h1 className="mb-6 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        <p className="mb-10 border-b border-border/40 pb-10 text-lg leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        {tocItems.length >= 3 && (
          <nav
            aria-label={copy.onThisPage}
            className="mb-10 rounded-2xl border border-border/50 bg-card/60 px-5 py-4"
          >
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <List className="h-4 w-4" />
              {copy.onThisPage}
            </p>
            <ol className="space-y-1.5 text-sm">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-foreground/80 transition-colors hover:text-primary"
                  >
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prose-nuju">
          {post.sections.map((section, index) => renderSection(section, index))}
        </div>

        {internalLinkCards.length > 0 && (
          <section
            data-testid="blog-internal-link-cluster"
            className="mt-12 rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-8"
          >
            <div className="mb-6 max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Useful next reads
              </p>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Keep building the full picture
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These are the follow-up pages readers usually need before choosing a
                journaling or mood tracking app.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {internalLinkCards.map((link) => (
                <Link
                  key={link.slug}
                  to={`/blog/${link.post.slug}`}
                  className="group rounded-2xl border border-border/50 bg-background/80 p-5 transition-all hover:border-primary/35 hover:shadow-md"
                  onClick={() =>
                    events.trackRecommendationCtaClick(
                      link.post.slug,
                      link.post.category,
                      "blog_internal_link_cluster",
                      "article",
                    )
                  }
                >
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {link.eyebrow}
                  </p>
                  <h3 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {link.post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {link.body}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {recommendationSnapshot && (
          <section
            data-testid="blog-recommendation-cta"
            className="mt-12 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {recommendationSnapshot.eyebrow}
            </p>
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {recommendationSnapshot.title}
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {recommendationSnapshot.points.map((point) => (
                <div
                  key={point.label}
                  className="rounded-2xl border border-primary/10 bg-background/80 p-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {point.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to={recommendationSnapshot.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                onClick={() =>
                  events.trackRecommendationCtaClick(
                    post.slug,
                    post.category,
                    "blog_recommendation_snapshot_primary",
                    "reveal",
                  )
                }
              >
                {recommendationSnapshot.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={recommendationSnapshot.secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                onClick={() =>
                  events.trackRecommendationCtaClick(
                    post.slug,
                    post.category,
                    "blog_recommendation_snapshot_secondary",
                    "product",
                  )
                }
              >
                {recommendationSnapshot.secondaryLabel}
              </Link>
              <AppStoreCta
                onClick={() =>
                  events.trackRecommendationCtaClick(
                    post.slug,
                    post.category,
                    "blog_recommendation_snapshot_app_store",
                    "app_store",
                  )
                }
              />
            </div>
          </section>
        )}

        {post.faq && post.faq.length > 0 && (
          <section
            aria-labelledby="faq-heading"
            className="mt-14 border-t border-border/40 pt-10"
          >
            <h2
              id="faq-heading"
              className="mb-6 font-serif text-2xl font-bold text-foreground"
            >
              {copy.faqTitle}
            </h2>
            <div className="space-y-4">
              {post.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/50 bg-card/40 px-5 py-4 transition-colors hover:border-primary/30"
                >
                  <summary className="cursor-pointer list-none font-serif text-lg font-semibold text-foreground marker:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-relaxed text-foreground/85">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            {copy.ctaEyebrow}
          </p>
          <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
            {copy.ctaTitle}
          </h2>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">
            {copy.ctaBody}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={`/onboarding?source=blog_article_cta_${post.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              onClick={() =>
                events.trackRecommendationCtaClick(
                  post.slug,
                  post.category,
                  "blog_article_footer_cta",
                  "reveal",
                )
              }
            >
              {copy.ctaButton} <ArrowRight className="h-4 w-4" />
            </Link>
            <AppStoreCta
              onClick={() =>
                events.trackRecommendationCtaClick(
                  post.slug,
                  post.category,
                  "blog_article_footer_app_store",
                  "app_store",
                )
              }
            />
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="mt-16 border-t border-border/40 pt-10"
          >
            <h2
              id="related-heading"
              className="mb-6 font-serif text-2xl font-bold text-foreground"
            >
              {copy.relatedTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related: BlogPostData) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <Tag className="h-3 w-3" />
                    {related.category}
                  </span>
                  <h3 className="mb-2 font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {related.title}
                  </h3>
                  <span className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {related.readingTime} {copy.minRead}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {copy.backToBlog}
          </Link>
        </div>
      </article>

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
              {copy.footerAbout}
            </Link>
            <Link to="/support" className="transition-colors hover:text-foreground">
              {copy.footerSupport}
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              {copy.footerPrivacy}
            </Link>
          </div>
          <p>&copy; 2026 Nuju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;

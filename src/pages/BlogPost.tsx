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
  "daily-reflection-app",
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
      slug: "mood-tracker-app-market-2026",
      eyebrow: "Market signal",
      body: "A data-led look at why mood tracker apps are shifting from emoji logs to AI insight.",
    },
    {
      slug: "daylio-alternatives",
      eyebrow: "Alternative query",
      body: "A focused comparison for readers already familiar with Daylio.",
    },
    {
      slug: "best-mood-tracker-for-bipolar-2026",
      eyebrow: "Clinical tracking intent",
      body: "A safer next read for people comparing mood trackers for bipolar-specific logging.",
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
  "mood-tracker-app-market-2026": [
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "App comparison",
      body: "Compare the consumer mood tracker apps that represent each market segment.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "User need",
      body: "Read why the market shift matters when the real goal is self-awareness.",
    },
    {
      slug: "what-people-write-in-journal-data",
      eyebrow: "Nuju data",
      body: "See the first-cohort usage data behind the low-bandwidth journaling pattern.",
    },
    {
      slug: "ai-coach-personality-preference-data",
      eyebrow: "AI tone data",
      body: "Understand why users choose gentle AI coaching more often than tough-love prompts.",
    },
  ],
  "daylio-alternatives": [
    {
      slug: "nuju-vs-daylio",
      eyebrow: "Head-to-head",
      body: "Compare Nuju and Daylio directly if the real question is logging speed versus AI insight.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Category view",
      body: "Step back and compare the full mood tracker category side by side.",
    },
    {
      slug: "best-mood-tracker-for-bipolar-2026",
      eyebrow: "Bipolar mood tracking",
      body: "Use this if the Daylio switch is really about safer clinical-style mood tracking.",
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
      slug: "daily-reflection-app",
      eyebrow: "Daily habit",
      body: "Use this if you want reflection to become a low-friction daily practice, not a once-in-a-while prompt.",
    },
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
  "daily-reflection-app": [
    {
      slug: "best-self-reflection-apps",
      eyebrow: "Category view",
      body: "Compare the broader self-reflection app category before choosing a daily tool.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal intent",
      body: "See which AI journaling apps actually read your entries and surface patterns.",
    },
    {
      slug: "mood-tracker-for-self-awareness",
      eyebrow: "Mood context",
      body: "Go deeper on mood tracking when the goal is self-awareness, not just a streak.",
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
  "mental-health-awareness-month-2026-journaling": [
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Make it permanent",
      body: "After the 31-day challenge, keep the habit going — the science of making journaling stick past month one.",
    },
    {
      slug: "what-people-write-in-journal-data",
      eyebrow: "What real entries look like",
      body: "87% of real journal entries are logged on 'not great' days, median is 31 characters. Set realistic expectations for your 31 days.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "If AI journaling appeals",
      body: "Complete 2026 guide to AI journaling — what the category is, how to pick a tool, and where to start.",
    },
    {
      slug: "journaling-for-mental-health",
      eyebrow: "The deeper why",
      body: "Why journaling works for mental health — 35 years of research distilled into the core mechanisms.",
    },
  ],
  "digital-fatigue-journaling-reset": [
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Burnout = bigger version",
      body: "Digital fatigue is the daily version; burnout is when it compounds. The 4-prompt protocol for full burnout.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "When screens steal sleep",
      body: "Digital fatigue is one of the biggest sleep-latency drivers. When phone use bleeds into 3am wakeups, this guide helps.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Build the daily window",
      body: "The 5-minute reset works best as a daily habit — here's how to make it automatic.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "When screens trigger overthinking",
      body: "Digital fatigue + overthinking often co-occur. The AI journal angle for both.",
    },
  ],
  "morning-pages-research-explained": [
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "The adapted version",
      body: "The 5-minute alternative to Morning Pages — same expressive-writing mechanism, fraction of the time cost.",
    },
    {
      slug: "what-is-ai-journaling",
      eyebrow: "Modernized Morning Pages",
      body: "AI journaling is the 2026 evolution of stream-of-consciousness writing — what it adds, what it doesn't.",
    },
    {
      slug: "journaling-for-self-discovery",
      eyebrow: "The Cameron intent",
      body: "Morning Pages was originally about creativity and self-discovery. Modern journaling for the same goal.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Make any format stick",
      body: "Whatever format you pick — long or short — habit-formation research applies. Here's the playbook.",
    },
  ],
  "gen-z-burnout-journaling": [
    {
      slug: "digital-fatigue-journaling-reset",
      eyebrow: "Burnout's daily cousin",
      body: "Digital fatigue is the daily-level version of burnout. The 5-minute reset for the smaller daily drain.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Burnout + overthinking",
      body: "Many burned-out workers also overthink chronically. The AI journal angle for the combo.",
    },
    {
      slug: "sunday-scaries-mood-data",
      eyebrow: "Burnout shows on Sundays",
      body: "Sunday Scaries are often the first symptom of work burnout intensifying. Here's the data + the reset.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Make the reset daily",
      body: "The 4-prompt burnout protocol works best daily — here's how to actually build a 5-min daily habit.",
    },
  ],
  "cara-mengatasi-burnout-gen-z": [
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Burnout + overthinking",
      body: "Banyak Gen Z burnout juga overthinking kronis. 4 prompt khusus untuk memutus loop pikiran.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Bagian dari self healing",
      body: "Mengatasi burnout adalah satu bagian dari self healing yang lebih luas — panduan praktis 5 prompt.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Burnout + anxiety",
      body: "Burnout dan anxiety sering muncul bareng. 7 prompt spesifik anxiety yang juga bantuin burnout.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Curhat saat burnout",
      body: "Pas burnout, sering nggak ada energi buat ngomong ke teman. 5 cara curhat ke diri sendiri yang efektif.",
    },
  ],
  "best-ai-journal-apps-for-anxiety-2026": [
    {
      slug: "mood-tracking-for-anxiety",
      eyebrow: "Anxiety + tracking",
      body: "Once you pick an app, mood tracking helps surface specific anxiety triggers over 2-3 weeks.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Anxiety + overthinking",
      body: "Most anxiety is overthinking with a body component. The AI journal angle for the cognitive piece.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Night anxiety",
      body: "When anxiety wakes you at 3am — the specific technique for late-night spirals.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Broader category",
      body: "Compare the full AI journaling category beyond anxiety-specific use.",
    },
  ],
  "ai-journaling-for-loneliness": [
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Loneliness + overthinking",
      body: "Loneliness and overthinking often loop together — here's how AI journaling helps both.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "If loneliness = anxiety",
      body: "When loneliness shows up as anxiety, the anxiety-specific journal app comparison helps narrow the choice.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Indonesian readers",
      body: "Untuk pengguna Indonesia — 5 cara curhat ke diri sendiri saat nggak ada teman.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Why this category exists",
      body: "The full 2026 guide to AI journaling and why the format works for emotional gaps.",
    },
  ],
  "aplikasi-journal-ai-gratis-indonesia": [
    {
      slug: "aplikasi-jurnal-terbaik",
      eyebrow: "Bandingkan lagi",
      body: "Daftar aplikasi jurnal terbaik secara umum — lebih luas dari journal AI gratis.",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "AI buat curhat",
      body: "Khusus AI curhat — kriteria privasi dan rekomendasi spesifik untuk pengguna Indonesia.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing",
      body: "Setelah pilih aplikasi — cara pakainya untuk self healing yang berkelanjutan.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Untuk overthinker",
      body: "Setelah punya aplikasi — 4 prompt khusus untuk memutus loop overthinking.",
    },
  ],
  "journaling-for-anger": [
    {
      slug: "journaling-for-grief",
      eyebrow: "When anger is grief",
      body: "Anger about loss is often grief in disguise — here's how to journal through it.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Workplace anger",
      body: "Chronic workplace anger is often burnout's middle stage. The 4-prompt burnout protocol.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Anger + overthinking",
      body: "Replaying the same anger episode? That's overthinking. The AI journal angle for both.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Anger that wakes you up",
      body: "If anger surfaces at 3am the way anxiety does — the late-night protocol.",
    },
  ],
  "journaling-for-grief": [
    {
      slug: "journaling-for-anger",
      eyebrow: "Anger inside grief",
      body: "Anger is often part of grief. The structured anger journaling protocol.",
    },
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "Grief loneliness",
      body: "Grief loneliness is its own category. The AI journaling angle for solitary grief.",
    },
    {
      slug: "journaling-before-therapy",
      eyebrow: "Pre-grief-therapy",
      body: "If grief journaling surfaces something bigger, this guide helps you prep for a therapist appointment.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Pattern recognition",
      body: "Grief has waves. AI journaling helps surface the waves over weeks and months.",
    },
  ],
  "journaling-for-imposter-syndrome": [
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Imposter + burnout",
      body: "Imposter syndrome and burnout often co-occur. The 4-prompt burnout protocol.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Imposter loops are overthinking",
      body: "The 'I don't belong here' loop IS overthinking. The AI journal angle for the cognitive piece.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "When imposter = anxiety",
      body: "If imposter syndrome shows up as work anxiety, the anxiety-specific app comparison.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Evidence File habit",
      body: "The Evidence File needs to be habitual — here's how to make 5 minutes/day stick.",
    },
  ],
  "nuju-vs-rosebud": [
    {
      slug: "nuju-vs-mindsera",
      eyebrow: "Another comparison",
      body: "How Nuju stacks up against Mindsera — warm AI journal vs cognitive coach.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Broader pick",
      body: "Compare 5 AI journal apps specifically for anxiety — including both Nuju and Rosebud.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Full category",
      body: "Step back and compare the whole AI journaling category side by side.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Complete 2026 guide to AI journaling — what the category is, how to pick a tool.",
    },
  ],
  "nuju-vs-mindsera": [
    {
      slug: "nuju-vs-rosebud",
      eyebrow: "Another comparison",
      body: "How Nuju stacks up against Rosebud — short daily entries vs structured therapy prompts.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety-specific",
      body: "5 AI journal apps compared specifically for anxiety — Nuju, Rosebud, Mindsera, Reflectly, Daylio.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Cognitive work",
      body: "Mindsera's cognitive distortion lens shines for chronic overthinking — this guide goes deeper.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Complete 2026 guide to AI journaling — what the category is, how to pick a tool.",
    },
  ],
  "journaling-for-perfectionism-procrastination": [
    {
      slug: "journaling-for-imposter-syndrome",
      eyebrow: "Often the same loop",
      body: "Perfectionism, procrastination, and imposter syndrome share roots — the Evidence File technique applies here too.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Where this loop leads",
      body: "Untreated perfectionism-procrastination produces burnout. The 4-prompt burnout protocol.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "The cognitive piece",
      body: "Perfectionist procrastination is downstream of overthinking. The AI journal angle.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Make it stick",
      body: "The 6-prompt protocol works best as a 14-21 day practice — here's how to make 5 minutes/day stick.",
    },
  ],
  "digital-wellness-journaling-gen-z-indonesia": [
    {
      slug: "cara-mengatasi-burnout-gen-z",
      eyebrow: "Burnout Gen Z",
      body: "Digital fatigue adalah daily-level version dari burnout. 5 prompt khusus burnout Gen Z Indonesia.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Habis scroll = overthinking",
      body: "Scroll panjang sering memicu overthinking malam. 4 prompt untuk memutus loop pikiran.",
    },
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "Pilih aplikasinya",
      body: "5 aplikasi journal AI gratis Indonesia yang nggak nambah screen time — perbandingan lengkap.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing rutin",
      body: "Protokol reset 5 menit cocok jadi bagian dari self healing harian. Panduan lengkap.",
    },
  ],
  "nuju-vs-reflection": [
    {
      slug: "nuju-vs-rosebud",
      eyebrow: "Other comparisons",
      body: "How Nuju stacks up against Rosebud — short daily entries vs structured therapy prompts.",
    },
    {
      slug: "nuju-vs-mindsera",
      eyebrow: "Other comparisons",
      body: "How Nuju compares to Mindsera — warm AI vs cognitive coach.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Category view",
      body: "Compare the full AI journaling category side by side.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Complete 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "nuju-vs-daylio": [
    {
      slug: "daylio-alternatives",
      eyebrow: "More Daylio alternatives",
      body: "Looking beyond Nuju? Compare Daylio's broader alternatives in the mood tracker category.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Mood tracker category",
      body: "Compare the full mood tracker category — Daylio, Bearable, Moodfit, others.",
    },
    {
      slug: "nuju-vs-rosebud",
      eyebrow: "AI journal vs AI journal",
      body: "How Nuju compares to another AI journal app rather than a mood tracker.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal category",
      body: "If you want AI not just mood data, compare the AI journaling category here.",
    },
  ],
  "journaling-for-depression": [
    {
      slug: "journaling-before-therapy",
      eyebrow: "Prep for therapy",
      body: "If depression journaling surfaces something bigger, this guide helps you prep for a therapist appointment.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "Often co-occurring",
      body: "Depression and grief often co-occur. The grief journaling guide if loss is part of the picture.",
    },
    {
      slug: "journaling-for-anxiety",
      eyebrow: "Frequently overlapping",
      body: "Depression and anxiety frequently co-occur. The anxiety-specific guide and prompts.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tools that fit",
      body: "AI journal apps that work for depression-adjacent journaling. Anxiety-focused comparison applies.",
    },
  ],
  "journaling-for-breakup": [
    {
      slug: "journaling-for-grief",
      eyebrow: "Breakup = grief",
      body: "Breakups activate grief systems. The grief journaling guide applies to relationship endings too.",
    },
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "Post-breakup loneliness",
      body: "Loneliness after a breakup has specific patterns. AI journaling angle for the gap.",
    },
    {
      slug: "journaling-for-relationships",
      eyebrow: "Relationship patterns",
      body: "Looking at recurring relationship patterns — what to carry forward into the next one.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Breakup 3am wakeups",
      body: "Breakups commonly disrupt sleep with 3am wakeups. The technique for late-night spirals.",
    },
  ],
  "journaling-for-social-anxiety": [
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tool selection",
      body: "AI journal apps compared specifically for anxiety — including social anxiety use cases.",
    },
    {
      slug: "journaling-for-imposter-syndrome",
      eyebrow: "Often overlapping",
      body: "Social anxiety and imposter syndrome frequently co-occur. The Evidence File technique applies.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Pre-event overthinking",
      body: "Social anxiety often involves pre-event overthinking. The AI journal angle for the loop.",
    },
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "When SA causes isolation",
      body: "When social anxiety causes isolation and loneliness, this guide bridges the two.",
    },
  ],
  "journaling-untuk-depresi": [
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Depresi + anxiety",
      body: "Depresi dan anxiety sering muncul bareng. 7 prompt khusus anxiety yang juga membantu depresi.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing",
      body: "Self healing dengan jurnal untuk kondisi yang lebih luas — panduan lengkap.",
    },
    {
      slug: "cara-mengatasi-burnout-gen-z",
      eyebrow: "Burnout + depresi",
      body: "Burnout sering jadi pintu masuk depresi. 5 prompt khusus burnout Gen Z Indonesia.",
    },
    {
      slug: "journaling-untuk-kesehatan-mental",
      eyebrow: "Konteks lebih luas",
      body: "Kerangka journaling untuk kesehatan mental secara luas — bagaimana depresi cocok di dalamnya.",
    },
  ],
  "nuju-vs-apple-journal": [
    {
      slug: "apple-journal-alternatives",
      eyebrow: "More alternatives",
      body: "Beyond Nuju — compare other apps that fill Apple Journal's gaps (cross-platform, AI, multi-language).",
    },
    {
      slug: "nuju-vs-daylio",
      eyebrow: "Another comparison",
      body: "How Nuju stacks against Daylio (mood tracker), another iOS-friendly option without AI.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal category",
      body: "Compare the AI journaling category — if you want AI not just notes, start here.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Complete 2026 guide to AI journaling — what the category is, how to pick a tool.",
    },
  ],
  "journaling-for-new-parents": [
    {
      slug: "journaling-for-depression",
      eyebrow: "PPD awareness",
      body: "Postpartum depression is common and treatable. The depression journaling guide complements this.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "Identity grief",
      body: "Becoming a parent involves grief for old identity. The grief journaling guide applies.",
    },
    {
      slug: "journaling-for-relationships",
      eyebrow: "Partner adjustment",
      body: "New parenthood reshapes partnerships. The relationship journaling guide.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Realistic frequency",
      body: "Daily journaling isn't realistic with newborns. Here's how to build a sustainable habit.",
    },
  ],
  "journaling-for-job-loss": [
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Job loss + burnout",
      body: "Layoffs often follow burnout. The burnout journaling protocol still applies.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "Job loss = grief",
      body: "Job loss activates grief systems. The grief journaling guide applies to layoffs too.",
    },
    {
      slug: "journaling-for-imposter-syndrome",
      eyebrow: "Layoff aftermath",
      body: "Layoffs can amplify imposter syndrome. The Evidence File technique applies here.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "Watch for depression",
      body: "Extended job loss can produce depression symptoms. Honest guide on when to escalate.",
    },
  ],
  "journaling-untuk-social-anxiety": [
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety umum",
      body: "Social anxiety adalah jenis anxiety spesifik. 7 prompt untuk anxiety umum juga membantu.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Pre-event overthinking",
      body: "Social anxiety sering melibatkan overthinking pre-event. 4 prompt untuk memutus loop.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Saat nggak bisa curhat",
      body: "Social anxiety sering bikin susah curhat ke teman. 5 cara curhat ke diri sendiri yang efektif.",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "AI sebagai outlet",
      body: "Untuk social anxiety, AI journal sering jadi outlet pertama yang aman — panduan memilih.",
    },
  ],
  "cara-journaling-setelah-putus": [
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthink mantan",
      body: "Putus sering memicu overthinking soal mantan dan apa yang salah. 4 prompt untuk memutus loop.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Saat butuh outlet",
      body: "Saat butuh curhat soal putus tapi nggak mau bebanin teman — 5 metode curhat ke diri sendiri.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing pasca-putus",
      body: "Pemulihan dari putus adalah self healing yang lebih luas — panduan lengkap dengan prompt.",
    },
    {
      slug: "journaling-untuk-depresi",
      eyebrow: "Kalau jadi depresi",
      body: "Kadang putus memicu depresi klinis. Panduan kapan eskalasi ke profesional.",
    },
  ],
  "mengatasi-stres-kerja-journaling": [
    {
      slug: "cara-mengatasi-burnout-gen-z",
      eyebrow: "Stres → burnout",
      body: "Stres kerja yang berkepanjangan jadi burnout. 5 prompt burnout Gen Z Indonesia.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Stres kerja + anxiety",
      body: "Stres kerja sering bikin anxiety. 7 prompt khusus anxiety untuk pekerja Indonesia.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthink kerjaan",
      body: "Overthinking pesan Slack, meeting, atau pekerjaan rumah malam? 4 prompt khusus.",
    },
    {
      slug: "digital-wellness-journaling-gen-z-indonesia",
      eyebrow: "WhatsApp grup kerja",
      body: "Stres dari notifikasi kerja non-stop? Digital wellness untuk Gen Z Indonesia.",
    },
  ],
  "why-do-i-cry-in-the-shower": [
    {
      slug: "journaling-for-depression",
      eyebrow: "When it's more",
      body: "Daily shower crying for weeks may signal something beyond regulatory release. Honest depression guide.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Similar pattern",
      body: "3am wake-ups have a similar 'privacy + permission' shape. The technique for late-night release.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Often connected",
      body: "Shower crying often follows a day of suppressed overthinking. The AI journal angle.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "If processing loss",
      body: "If shower crying is connected to grief, the grief journaling guide goes deeper.",
    },
  ],
  "journaling-for-jealousy-and-comparison": [
    {
      slug: "journaling-for-imposter-syndrome",
      eyebrow: "Comparison + imposter",
      body: "Comparison often fuels imposter syndrome. The Evidence File technique applies.",
    },
    {
      slug: "digital-fatigue-journaling-reset",
      eyebrow: "Social media trigger",
      body: "Most comparison happens on social media. The 5-min digital reset protocol.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Comparison = overthinking",
      body: "Comparison spirals are a form of overthinking. The AI journal angle.",
    },
    {
      slug: "journaling-for-perfectionism-procrastination",
      eyebrow: "Perfectionism root",
      body: "Comparison often feeds perfectionism. The 6-prompt loop-breaking protocol.",
    },
  ],
  "journaling-after-losing-a-pet": [
    {
      slug: "journaling-for-grief",
      eyebrow: "General grief",
      body: "Pet grief is real grief. The broader grief journaling framework applies.",
    },
    {
      slug: "journaling-for-breakup",
      eyebrow: "Similar relational loss",
      body: "Some pet relationships are deeper than human ones. The breakup framework can apply.",
    },
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "Post-pet loneliness",
      body: "Loneliness after losing a pet has specific patterns. AI journaling angle for the gap.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety from loss",
      body: "Grief often surfaces as anxiety. AI journal apps that handle both.",
    },
  ],
  "journaling-untuk-hubungan-toxic": [
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Outlet aman",
      body: "Pas nggak bisa curhat ke siapa-siapa karena diisolasi — 5 cara curhat ke diri sendiri yang aman.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Pemulihan",
      body: "Pemulihan dari hubungan toxic adalah self healing yang lebih luas — panduan lengkap.",
    },
    {
      slug: "journaling-untuk-depresi",
      eyebrow: "Kalau jadi depresi",
      body: "Hubungan toxic sering memicu depresi. Panduan jujur kapan eskalasi ke profesional.",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "AI sebagai dokumentasi",
      body: "AI journal sebagai dokumentasi aman (enkripsi) — kriteria memilih untuk situasi sensitif.",
    },
  ],
  "perfeksionisme-dan-procrastination-indonesia": [
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthink sebelum mulai",
      body: "Procrastination sering dimulai dengan overthinking. 4 prompt untuk memutus loop pikiran.",
    },
    {
      slug: "cara-mengatasi-burnout-gen-z",
      eyebrow: "Burnout downstream",
      body: "Perfeksionisme + procrastination yang berkepanjangan jadi burnout. 5 prompt khusus.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety perfeksionis",
      body: "Anxiety perfeksionis adalah kategori sendiri. 7 prompt khusus anxiety untuk konteks Indonesia.",
    },
    {
      slug: "mengatasi-stres-kerja-journaling",
      eyebrow: "Di tempat kerja",
      body: "Perfeksionisme di tempat kerja jadi stres kerja. 5 prompt khusus untuk pekerja Indonesia.",
    },
  ],
  "why-do-i-overthink-everything": [
    {
      slug: "why-do-i-feel-anxious-for-no-reason",
      eyebrow: "Similar pattern",
      body: "Overthinking often pairs with 'random' anxiety. Here's how to identify the hidden triggers.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "When it hits at night",
      body: "Overthinking that wakes you at 3am needs a slightly different protocol.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Deeper guide",
      body: "Full guide to AI journaling for chronic overthinkers — beyond the 5-minute fix.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tool selection",
      body: "AI journal apps compared for anxiety + overthinking — which to pick.",
    },
  ],
  "why-do-i-feel-anxious-for-no-reason": [
    {
      slug: "why-do-i-overthink-everything",
      eyebrow: "Often co-occur",
      body: "Anxiety 'for no reason' often comes with overthinking. The 5-minute brain dump protocol.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tool selection",
      body: "5 AI journal apps compared specifically for anxiety — Nuju, Rosebud, Mindsera, Reflectly, Daylio.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Night version",
      body: "When 'random' anxiety wakes you at 3am — the specific technique.",
    },
    {
      slug: "mood-tracking-for-anxiety",
      eyebrow: "Pattern tracking",
      body: "Mood tracking helps surface hidden anxiety triggers over 2-3 weeks.",
    },
  ],
  "why-do-i-feel-empty-inside": [
    {
      slug: "journaling-for-depression",
      eyebrow: "When empty = depression",
      body: "When 'empty' includes anhedonia (loss of pleasure), it's worth talking to a doctor. Honest guide.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When empty = burnout",
      body: "Burnout-driven empty responds to rest, not depression treatment. The 4-prompt burnout protocol.",
    },
    {
      slug: "journaling-for-job-loss",
      eyebrow: "When empty = transition",
      body: "Identity diffusion after layoff feels empty. The 90-day post-layoff journaling guide.",
    },
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "When empty = lonely",
      body: "Sometimes 'empty' is loneliness without a name. The AI journaling angle.",
    },
  ],
  "best-journal-app-for-students-2026": [
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "For exam anxiety",
      body: "If exam anxiety is the main driver, this anxiety-specific app comparison goes deeper.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free apps generally",
      body: "Beyond journal apps — 7 truly-free mental wellness apps for the student budget.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Make it stick",
      body: "How to build a 5-minute habit that survives finals week.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "best-free-mental-wellness-apps-2026": [
    {
      slug: "best-journal-app-for-students-2026",
      eyebrow: "Student-specific",
      body: "If you're a student, this picks the strongest free apps for college and high school use.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety-specific",
      body: "If anxiety is the main concern, this compares AI journal apps specifically for that.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "AI journal category",
      body: "Complete 2026 guide to AI journaling — if you want depth on that one category.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Mood tracking",
      body: "If you specifically want mood tracking, this compares the top mood-tracker category.",
    },
  ],
  "aplikasi-journal-untuk-mahasiswa-indonesia": [
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "Versi lebih luas",
      body: "Bukan cuma untuk mahasiswa — 5 aplikasi journal AI gratis untuk semua pengguna Indonesia.",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "AI curhat",
      body: "Khusus AI curhat — kriteria privasi dan rekomendasi spesifik untuk pengguna Indonesia.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing",
      body: "Setelah pilih aplikasi — cara pakainya untuk self healing yang berkelanjutan.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthinking ujian",
      body: "Untuk anxiety ujian dan overthinking — 4 prompt khusus untuk memutus loop pikiran.",
    },
  ],
  "journaling-untuk-overthinking-malam": [
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Versi lebih lengkap",
      body: "Untuk overthinking secara umum (nggak cuma malam) — 4 prompt brain dump yang lebih dalam.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "Kalau bangun jam 3 pagi",
      body: "Kalau overthinking-nya bikin lo bangun jam 3 pagi — protokol khusus untuk itu.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety + overthinking",
      body: "Overthinking malam sering bagian dari anxiety. 7 prompt khusus anxiety untuk konteks Indonesia.",
    },
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "Pilih aplikasinya",
      body: "5 aplikasi journal AI gratis Indonesia yang cocok untuk overthinking malam.",
    },
  ],
  "why-am-i-so-tired-all-the-time": [
    {
      slug: "why-do-i-feel-anxious-for-no-reason",
      eyebrow: "Anxiety + fatigue",
      body: "Fatigue and 'random' anxiety often share hidden triggers. Identify yours with the 5-min diagnostic.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When tired = burnout",
      body: "Burnout-driven fatigue responds to rest, not depression treatment. The 4-prompt burnout protocol.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When tired = depression",
      body: "Low energy and anhedonia are core depression symptoms. Honest framing on when to escalate.",
    },
    {
      slug: "bedtime-journaling-routine-for-sleep",
      eyebrow: "Sleep quality",
      body: "Sleep quality often matters more than quantity. The bedtime journaling routine that works.",
    },
  ],
  "why-do-i-cry-randomly": [
    {
      slug: "why-do-i-cry-in-the-shower",
      eyebrow: "Related pattern",
      body: "Shower crying is a specific case of random crying. The psychology + 5-min journal practice.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "Suppressed grief",
      body: "If random crying is connected to unprocessed loss, the grief journaling guide goes deeper.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When it's depression",
      body: "Random crying with depression symptoms needs professional evaluation. Honest depression guide.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Suppressed emotion",
      body: "Crying often releases suppressed emotion. The AI journal angle for the cognitive piece.",
    },
  ],
  "best-journal-app-for-therapists-2026": [
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety-focused clients",
      body: "For clients specifically managing anxiety — deeper anxiety-focused app comparison.",
    },
    {
      slug: "journaling-before-therapy",
      eyebrow: "Client onboarding",
      body: "Help clients prepare for therapy sessions with structured journaling — the pre-session guide.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free tier options",
      body: "For clients on tight budgets — 7 truly-free mental wellness apps you can recommend.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — useful for client education on the format.",
    },
  ],
  "nuju-vs-day-one": [
    {
      slug: "day-one-alternative",
      eyebrow: "More alternatives",
      body: "Looking beyond Nuju? More Day One alternatives covered separately here.",
    },
    {
      slug: "nuju-vs-apple-journal",
      eyebrow: "Apple ecosystem",
      body: "If you're on iOS — Apple Journal is the free default. How Nuju compares.",
    },
    {
      slug: "nuju-vs-rosebud",
      eyebrow: "AI journal vs AI journal",
      body: "Versus another AI-first journal rather than a heritage diary.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Complete 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "cara-mengatasi-stres-skripsi": [
    {
      slug: "perfeksionisme-dan-procrastination-indonesia",
      eyebrow: "Procrastination skripsi",
      body: "Perfeksionisme + procrastination adalah salah satu sumber stres skripsi terbesar. 6 prompt loop-breaker.",
    },
    {
      slug: "mengatasi-stres-kerja-journaling",
      eyebrow: "Stres umum",
      body: "Untuk stres yang lebih luas — 5 prompt khusus pekerja dan mahasiswa Indonesia.",
    },
    {
      slug: "journaling-untuk-overthinking-malam",
      eyebrow: "Overthink skripsi malam",
      body: "Skripsi yang muter di kepala malam hari? 5 prompt khusus untuk overthinking malam.",
    },
    {
      slug: "aplikasi-journal-untuk-mahasiswa-indonesia",
      eyebrow: "Pilih aplikasinya",
      body: "5 aplikasi journal terbaik untuk mahasiswa Indonesia — termasuk yang cocok untuk stres skripsi.",
    },
  ],
  "persiapan-mental-utbk-sbmptn": [
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety umum",
      body: "Anxiety UTBK adalah jenis anxiety spesifik. 7 prompt untuk anxiety umum juga berlaku.",
    },
    {
      slug: "perfeksionisme-dan-procrastination-indonesia",
      eyebrow: "Perfeksionisme belajar",
      body: "Stres UTBK sering dari perfeksionisme. 6 prompt loop-breaker yang cocok untuk siswa.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthink ujian",
      body: "Overthinking soal hasil UTBK? 4 prompt khusus untuk memutus loop pikiran.",
    },
    {
      slug: "aplikasi-journal-untuk-mahasiswa-indonesia",
      eyebrow: "Aplikasi yang cocok",
      body: "5 aplikasi journal terbaik untuk mahasiswa Indonesia — termasuk untuk siswa persiapan PTN.",
    },
  ],
  "why-do-i-feel-disconnected-from-everyone": [
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "Lonely while connected",
      body: "Disconnection often shows up as loneliness even with friends around. The deeper guide.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When it's depression",
      body: "Depression-driven disconnection needs professional treatment. Honest framing.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When it's burnout",
      body: "Burnout-driven disconnection responds to rest. The 4-prompt protocol.",
    },
    {
      slug: "digital-fatigue-journaling-reset",
      eyebrow: "Social media driver",
      body: "Comparison-driven disconnection often comes from social media. The 5-min reset.",
    },
  ],
  "why-do-i-procrastinate-even-when-i-want-to-do-it": [
    {
      slug: "journaling-for-perfectionism-procrastination",
      eyebrow: "The loop deeper",
      body: "Perfectionism-procrastination loop is often what drives 'want but won't.' Full protocol.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Overthinking root",
      body: "Procrastination often starts with overthinking. The AI journal angle for the loop.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When it's burnout",
      body: "Burnout makes everything you want to do feel impossible. The 4-prompt protocol.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Habit building",
      body: "Build the 5-min unblock protocol into a daily habit that survives.",
    },
  ],
  "best-journal-app-for-entrepreneurs-2026": [
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Founder burnout",
      body: "Founder burnout has specific patterns. The 4-prompt protocol with Maslach framework.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Founder anxiety",
      body: "Founder anxiety = chronic anxiety. Anxiety-specific app comparison.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free toolkit",
      body: "Bootstrap founders — 7 truly-free apps for the founder toolkit.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "best-journal-app-for-couples-2026": [
    {
      slug: "journaling-for-relationships",
      eyebrow: "Relationship journaling deeper",
      body: "Beyond couples apps — how to journal about relationships in general.",
    },
    {
      slug: "journaling-for-breakup",
      eyebrow: "If breakup happens",
      body: "If the relationship ends — the 7-prompt protocol for first 30 days post-breakup.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety affecting relationship",
      body: "When anxiety affects your relationship — the anxiety-specific app comparison.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick a tool.",
    },
  ],
  "cara-move-on-dari-mantan": [
    {
      slug: "cara-journaling-setelah-putus",
      eyebrow: "Versi lebih detail",
      body: "7 prompt detail untuk 30 hari pertama pasca-putus dengan riset attachment UCLA.",
    },
    {
      slug: "journaling-untuk-hubungan-toxic",
      eyebrow: "Kalau hubungan toxic",
      body: "Kalau yang lo putusin adalah hubungan toxic — guide spesifik untuk pemulihan.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing pasca-putus",
      body: "Move on adalah self healing yang lebih luas. Panduan praktis dengan prompt.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Saat butuh outlet",
      body: "Saat butuh curhat tapi nggak mau bebanin teman — 5 metode curhat ke diri sendiri.",
    },
  ],
  "mengatasi-anxiety-wawancara-kerja": [
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety umum",
      body: "Anxiety wawancara adalah jenis anxiety spesifik. 7 prompt untuk anxiety umum berlaku.",
    },
    {
      slug: "perfeksionisme-dan-procrastination-indonesia",
      eyebrow: "Perfeksionisme pre-event",
      body: "Anxiety wawancara sering dari perfeksionisme. 6 prompt loop-breaker.",
    },
    {
      slug: "mengatasi-stres-kerja-journaling",
      eyebrow: "Stres kerja umum",
      body: "Setelah dapet kerja — 5 prompt khusus stres kerja Indonesia.",
    },
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "Aplikasi yang cocok",
      body: "5 aplikasi journal AI gratis Indonesia untuk practice harian sebelum interview.",
    },
  ],
  "why-am-i-always-anxious-before-sleep": [
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "When it bleeds to 3am",
      body: "If pre-sleep anxiety bleeds into 3am wakeups — the specific technique for that.",
    },
    {
      slug: "bedtime-journaling-routine-for-sleep",
      eyebrow: "Full bedtime routine",
      body: "Beyond the 5-min reset — the complete bedtime journaling routine for better sleep.",
    },
    {
      slug: "why-do-i-overthink-everything",
      eyebrow: "Overthinking root",
      body: "Pre-sleep anxiety often = overthinking surfaced. The 5-minute brain dump protocol.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tool selection",
      body: "AI journal apps compared for anxiety + pre-sleep journaling. Which to pick.",
    },
  ],
  "why-do-i-feel-sad-on-sundays": [
    {
      slug: "sunday-scaries-mood-data",
      eyebrow: "Sunday Scaries deeper",
      body: "If your Sunday sadness is anticipatory dread about Monday — the deeper Sunday Scaries guide.",
    },
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "Social withdrawal",
      body: "If Sunday sadness is weekend social withdrawal — the loneliness journaling angle.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When persistent",
      body: "Sunday sadness lasting months might be depression. Honest framing.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Sunday practice",
      body: "Make Sunday journaling a regular practice that addresses the meaning gap.",
    },
  ],
  "best-journal-app-for-adhd-2026": [
    {
      slug: "journaling-for-adhd",
      eyebrow: "ADHD journaling deeper",
      body: "Beyond app comparison — how to journal effectively with ADHD brain patterns.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety comorbid",
      body: "ADHD + anxiety is common. Anxiety-specific app comparison.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free options",
      body: "7 truly-free mental wellness apps — including ADHD-friendly picks.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Make it sustainable",
      body: "How to build a 5-min habit that survives ADHD executive function challenges.",
    },
  ],
  "best-journal-app-with-voice-recording-2026": [
    {
      slug: "voice-journaling-guide",
      eyebrow: "Voice journaling deeper",
      body: "Full guide to voice journaling — technique, benefits, and how to start.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Broader category",
      body: "Compare the full AI journaling category — not just voice-capable ones.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
    {
      slug: "nuju-vs-day-one",
      eyebrow: "Voice comparison",
      body: "Both apps support voice — direct comparison.",
    },
  ],
  "depresi-pasca-lulus-kuliah": [
    {
      slug: "journaling-untuk-depresi",
      eyebrow: "Depresi journaling",
      body: "Untuk depresi spesifik — 5 prompt khusus depresi dengan framing YMYL yang jujur.",
    },
    {
      slug: "cara-mengatasi-stres-keuangan-gen-z",
      eyebrow: "Stres finansial",
      body: "Pasca lulus sering tied to stres keuangan. 5 teknik praktis + prompt journaling.",
    },
    {
      slug: "mengatasi-anxiety-wawancara-kerja",
      eyebrow: "Anxiety job search",
      body: "Pasca lulus = job search. 5 teknik mengatasi anxiety wawancara.",
    },
    {
      slug: "aplikasi-journal-untuk-mahasiswa-indonesia",
      eyebrow: "Aplikasi journal alumni",
      body: "5 aplikasi yang cocok untuk transisi pasca lulus.",
    },
  ],
  "cara-mengatasi-stres-keuangan-gen-z": [
    {
      slug: "depresi-pasca-lulus-kuliah",
      eyebrow: "Depresi pasca lulus",
      body: "Stres finansial sering tied to depresi pasca lulus. Panduan lengkap.",
    },
    {
      slug: "mengatasi-stres-kerja-journaling",
      eyebrow: "Stres kerja Indonesia",
      body: "Stres finansial sering muncul dari stres kerja. 5 prompt khusus pekerja Indonesia.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthink finansial",
      body: "Overthinking soal uang? 4 prompt khusus untuk memutus loop pikiran.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety finansial",
      body: "Stres finansial sering muncul sebagai anxiety. 7 prompt khusus anxiety untuk Indonesia.",
    },
  ],
  "why-do-i-feel-bored-with-everything-i-used-to-love": [
    {
      slug: "why-do-i-feel-empty-inside",
      eyebrow: "Related feeling",
      body: "Bored with everything often overlaps with empty inside. The 5-cause taxonomy.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When it's anhedonia",
      body: "Loss of pleasure (anhedonia) is core depression symptom. Honest guide on what helps.",
    },
    {
      slug: "digital-fatigue-journaling-reset",
      eyebrow: "Dopamine cause",
      body: "Short-form video resets dopamine baseline. The 5-min reset for the over-stimulated brain.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Burnout cause",
      body: "Burnout makes hobbies feel like work. The 4-prompt burnout protocol.",
    },
  ],
  "why-dont-i-want-to-do-anything-anymore": [
    {
      slug: "why-am-i-so-tired-all-the-time",
      eyebrow: "Often overlaps",
      body: "Loss of motivation + persistent fatigue often share causes. The 5-cause fatigue stack.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When it's depression",
      body: "Avolition is core depression symptom. Honest framing on when to escalate.",
    },
    {
      slug: "best-journal-app-for-adhd-2026",
      eyebrow: "When it's ADHD",
      body: "If 'don't want' is really 'can't initiate,' ADHD evaluation is worth pursuing.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When it's burnout",
      body: "Burnout-driven motivation loss responds to rest. The 4-prompt protocol.",
    },
  ],
  "nuju-vs-stoic": [
    {
      slug: "nuju-vs-day-one",
      eyebrow: "Another philosophy comparison",
      body: "Day One is heritage diary. How Nuju compares to that journaling philosophy.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
    {
      slug: "best-journal-app-for-entrepreneurs-2026",
      eyebrow: "Founder comparison",
      body: "Stoic Journal is popular with founders. The 5-pick founder app comparison.",
    },
    {
      slug: "ai-coach-personality-preference-data",
      eyebrow: "Nuju's Wise Sage",
      body: "Real data: Nuju's Stoic-inspired 'Wise Sage' is least picked persona. Why.",
    },
  ],
  "best-journal-app-for-anxiety-and-depression-2026": [
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Anxiety-only deeper",
      body: "Anxiety-only deeper comparison — if depression isn't the dominant concern.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "Depression-only deeper",
      body: "Depression-only deeper guide — honest framing, professional care emphasis.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free toolkit",
      body: "7 truly-free mental wellness apps for tight budgets.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "journaling-untuk-adhd-indonesia": [
    {
      slug: "journaling-for-adhd",
      eyebrow: "ADHD journaling deeper",
      body: "Beyond Indonesian context — full guide to ADHD-friendly journaling.",
    },
    {
      slug: "best-journal-app-for-adhd-2026",
      eyebrow: "Tool selection",
      body: "5 apps tested for ADHD brain — Nuju, Daylio, Reflectly, Stoic, Bearable.",
    },
    {
      slug: "perfeksionisme-dan-procrastination-indonesia",
      eyebrow: "ADHD + procrastination",
      body: "ADHD + procrastination often overlap. The 6-prompt loop-breaker protocol.",
    },
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "Aplikasi ADHD-friendly",
      body: "5 aplikasi journal AI gratis Indonesia — termasuk yang ADHD-friendly.",
    },
  ],
  "mengatasi-anxiety-media-sosial-gen-z": [
    {
      slug: "digital-wellness-journaling-gen-z-indonesia",
      eyebrow: "Digital fatigue Indonesia",
      body: "Anxiety sosmed = bagian dari digital fatigue Gen Z. Protokol 5-menit reset lengkap.",
    },
    {
      slug: "journaling-for-jealousy-and-comparison",
      eyebrow: "Comparison loop",
      body: "Comparison adalah komponen anxiety sosmed terbesar. 6 prompt loop-breaker.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety umum",
      body: "Anxiety sosmed adalah jenis anxiety spesifik. 7 prompt untuk anxiety umum berlaku.",
    },
    {
      slug: "cara-mengatasi-overthinking",
      eyebrow: "Overthink sosmed",
      body: "Overthinking apa yang lo liat di sosmed? 4 prompt untuk memutus loop pikiran.",
    },
  ],
  "why-do-i-feel-numb": [
    {
      slug: "why-do-i-feel-empty-inside",
      eyebrow: "Related state",
      body: "Numbness and emptiness overlap. The 5-cause taxonomy for emptiness.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When depression",
      body: "Numbness as depression symptom. Honest framing on when to escalate.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "When trauma",
      body: "Trauma-related numbness needs trauma-informed therapy — grief journaling guide.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When burnout",
      body: "Severe burnout can produce numbness. The 4-prompt protocol.",
    },
  ],
  "why-am-i-so-irritable-lately": [
    {
      slug: "journaling-for-anger",
      eyebrow: "Anger journaling",
      body: "Irritability is low-grade chronic anger. The 7-prompt structured anger protocol.",
    },
    {
      slug: "why-am-i-so-tired-all-the-time",
      eyebrow: "Sleep connection",
      body: "Sleep debt is #1 cause of irritability. The 5-cause fatigue stack.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Burnout component",
      body: "Burnout produces irritability. The 4-prompt protocol.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tool selection",
      body: "AI journal apps that track mood patterns including irritability over time.",
    },
  ],
  "best-journal-app-for-busy-professionals-2026": [
    {
      slug: "best-journal-app-for-entrepreneurs-2026",
      eyebrow: "Founder version",
      body: "If you're a founder specifically — the entrepreneur-targeted comparison.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "Burnout prevention",
      body: "Professional burnout prevention via journaling. The 4-prompt protocol.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free options",
      body: "7 truly-free mental wellness apps for budget-conscious professionals.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "nuju-vs-five-minute-journal": [
    {
      slug: "nuju-vs-stoic",
      eyebrow: "Philosophy comparison",
      body: "Another philosophy-focused versus — how Nuju compares to Stoic Journal.",
    },
    {
      slug: "nuju-vs-day-one",
      eyebrow: "Long-form comparison",
      body: "Day One = long-form diary. Different angle from gratitude-focused 5MJ.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Category view",
      body: "Compare the broader AI journaling category — beyond gratitude practice.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
  ],
  "cara-mengatasi-trauma-masa-kecil": [
    {
      slug: "journaling-untuk-hubungan-toxic",
      eyebrow: "Trauma + hubungan",
      body: "Trauma childhood sering mempengaruhi hubungan dewasa. Panduan hubungan toxic.",
    },
    {
      slug: "journaling-untuk-depresi",
      eyebrow: "Trauma + depresi",
      body: "Trauma childhood sering memicu depresi dewasa. Panduan honest depresi.",
    },
    {
      slug: "self-healing-dengan-jurnal",
      eyebrow: "Self healing context",
      body: "Self healing untuk yang berproses trauma — dengan caveat profesional.",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "AI sebagai support",
      body: "AI journal untuk daily support sambil therapy — pilihan privasi tinggi.",
    },
  ],
  "journaling-untuk-hubungan-jarak-jauh": [
    {
      slug: "cara-journaling-setelah-putus",
      eyebrow: "Kalau LDR berakhir",
      body: "Kalau LDR berakhir — 7 prompt untuk 30 hari pertama pasca-putus.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety LDR",
      body: "Anxiety LDR adalah jenis anxiety spesifik. 7 prompt anxiety umum berlaku.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Saat partner jauh",
      body: "Saat partner jauh dan lo butuh outlet — 5 metode curhat ke diri sendiri.",
    },
    {
      slug: "mengatasi-anxiety-media-sosial-gen-z",
      eyebrow: "Sosmed stalking",
      body: "Stalking sosmed partner di LDR? 5 strategi mengatasi anxiety sosmed.",
    },
  ],
  "why-cant-i-sleep-when-im-tired": [
    {
      slug: "why-am-i-always-anxious-before-sleep",
      eyebrow: "Pre-sleep anxiety",
      body: "If tired-wired is anxiety-driven — the specific pre-sleep anxiety protocol.",
    },
    {
      slug: "3am-anxiety-journaling",
      eyebrow: "3am wakeups",
      body: "If tired-wired turns into 3am wakeups — the technique for late-night spirals.",
    },
    {
      slug: "bedtime-journaling-routine-for-sleep",
      eyebrow: "Full bedtime routine",
      body: "Beyond the 5-min reset — the complete bedtime journaling routine.",
    },
    {
      slug: "why-am-i-so-tired-all-the-time",
      eyebrow: "If tired persists",
      body: "If tiredness persists despite good sleep, see the 5-cause fatigue diagnostic.",
    },
  ],
  "why-do-i-overthink-text-messages": [
    {
      slug: "why-do-i-overthink-everything",
      eyebrow: "Broader overthinking",
      body: "Text overthinking is one form. The broader overthinking pattern + 5-min brain dump.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "Tool selection",
      body: "AI journal apps for chronic anxiety + overthinking — including text anxiety.",
    },
    {
      slug: "journaling-for-imposter-syndrome",
      eyebrow: "Related pattern",
      body: "Text anxiety often overlaps with imposter syndrome. Evidence file technique applies.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Overthinking deeper",
      body: "Full guide to AI journaling for chronic overthinkers.",
    },
  ],
  "best-mood-tracker-for-bipolar-2026": [
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "If anxiety comorbid",
      body: "Bipolar + anxiety is common — anxiety-specific app comparison.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free options",
      body: "Free options that work alongside professional bipolar treatment.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "Depression component",
      body: "Bipolar depression episodes — honest framing on what helps and when to escalate.",
    },
    {
      slug: "best-mood-tracker-apps",
      eyebrow: "Mood tracker category",
      body: "Broader mood tracker category — beyond bipolar-specific picks.",
    },
  ],
  "nuju-vs-penzu": [
    {
      slug: "nuju-vs-day-one",
      eyebrow: "Other long-form comparison",
      body: "Day One = polished long-form diary. Different angle from Penzu's privacy-first focus.",
    },
    {
      slug: "nuju-vs-stoic",
      eyebrow: "Philosophy comparison",
      body: "Stoic = philosophical practice. Another versus with distinct journaling philosophy.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "AI journal category",
      body: "Compare the full AI journaling category if Penzu's no-AI approach feels too limiting.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, privacy considerations.",
    },
  ],
  "mengatasi-anxiety-pertama-kerja": [
    {
      slug: "mengatasi-anxiety-wawancara-kerja",
      eyebrow: "Pre-job anxiety",
      body: "Sebelum dapet first job — strategi mengatasi anxiety wawancara kerja.",
    },
    {
      slug: "mengatasi-stres-kerja-journaling",
      eyebrow: "Stres kerja umum",
      body: "Setelah adjust di first job — 5 prompt khusus stres kerja Indonesia.",
    },
    {
      slug: "perfeksionisme-dan-procrastination-indonesia",
      eyebrow: "Perfeksionisme first jobber",
      body: "Imposter syndrome + perfeksionisme di first job — 6 prompt loop-breaker.",
    },
    {
      slug: "cara-mengatasi-burnout-gen-z",
      eyebrow: "Burnout prevention",
      body: "Pencegahan burnout untuk first jobber — 4 prompt khusus Gen Z Indonesia.",
    },
  ],
  "journaling-untuk-stress-keuangan-mahasiswa": [
    {
      slug: "cara-mengatasi-stres-keuangan-gen-z",
      eyebrow: "Versi lebih luas",
      body: "Stress keuangan Gen Z secara umum — 5 strategi praktis + 4 prompt.",
    },
    {
      slug: "aplikasi-journal-untuk-mahasiswa-indonesia",
      eyebrow: "Aplikasi journal",
      body: "5 aplikasi journal terbaik untuk mahasiswa Indonesia — termasuk yang gratis.",
    },
    {
      slug: "cara-mengatasi-stres-skripsi",
      eyebrow: "Stress lain mahasiswa",
      body: "Stress skripsi juga sering memperburuk stress finansial. 6 prompt khusus.",
    },
    {
      slug: "depresi-pasca-lulus-kuliah",
      eyebrow: "Setelah lulus",
      body: "Setelah lulus stress finansial sering berlanjut — panduan depresi pasca lulus.",
    },
  ],
  "5-hidden-reasons-your-journaling-habit-keeps-failing": [
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Build the habit",
      body: "Practical 5-minute daily habit framework — beyond just identifying failures.",
    },
    {
      slug: "31-character-journal-entry-outperforms-long-pages",
      eyebrow: "Format fix",
      body: "Short-entry format that addresses Reason 1 (wrong format) with real data.",
    },
    {
      slug: "how-to-start-journaling",
      eyebrow: "Start fresh",
      body: "Complete beginner guide for restarting with the right format from day one.",
    },
    {
      slug: "i-tested-8-ai-journal-apps-for-30-days",
      eyebrow: "Tool selection",
      body: "Pick the right tool — 8 AI journal apps honestly tested for 30 days.",
    },
  ],
  "i-tested-8-ai-journal-apps-for-30-days": [
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — what the category is, how to pick.",
    },
    {
      slug: "best-ai-journaling-apps",
      eyebrow: "Best of category",
      body: "Standard best-of list with deeper feature comparison.",
    },
    {
      slug: "31-character-journal-entry-outperforms-long-pages",
      eyebrow: "Why short wins",
      body: "Real data on why short entries beat long-form — explains the ranking.",
    },
    {
      slug: "5-hidden-reasons-your-journaling-habit-keeps-failing",
      eyebrow: "Habit factors",
      body: "Why most journaling habits fail — affects which app actually sustains for you.",
    },
  ],
  "31-character-journal-entry-outperforms-long-pages": [
    {
      slug: "what-people-write-in-journal-data",
      eyebrow: "Source data",
      body: "The original analysis of 161 real journal entries with full data breakdown.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Apply the data",
      body: "How to actually build a 5-minute daily habit using short-entry format.",
    },
    {
      slug: "5-hidden-reasons-your-journaling-habit-keeps-failing",
      eyebrow: "Why short works",
      body: "Reason 1: wrong format kills journaling. The 31-character pattern is the fix.",
    },
    {
      slug: "i-tested-8-ai-journal-apps-for-30-days",
      eyebrow: "Best short-entry app",
      body: "30-day test ranking — which AI journal app best supports short entries.",
    },
  ],
  "why-i-stopped-gratitude-journaling-and-what-works": [
    {
      slug: "nuju-vs-five-minute-journal",
      eyebrow: "Gratitude vs reflection",
      body: "Five Minute Journal is gratitude-focused — when it fits vs when it backfires.",
    },
    {
      slug: "journaling-for-depression",
      eyebrow: "When depression",
      body: "Gratitude backfires during depression. Honest depression journaling guide.",
    },
    {
      slug: "journaling-for-grief",
      eyebrow: "When grief",
      body: "Gratitude backfires during grief. The grief journaling alternative.",
    },
    {
      slug: "gen-z-burnout-journaling",
      eyebrow: "When burnout",
      body: "Gratitude backfires during burnout. The 4-prompt burnout protocol instead.",
    },
  ],
  "5-aplikasi-mental-health-indonesia-mahasiswa-wajib-tahu": [
    {
      slug: "aplikasi-journal-untuk-mahasiswa-indonesia",
      eyebrow: "Aplikasi journal specifik",
      body: "Versi spesifik untuk journal apps mahasiswa — 5 picks dengan kriteria student.",
    },
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "AI journal gratis",
      body: "Versi spesifik untuk AI journal apps gratis — 5 picks dengan kriteria privacy.",
    },
    {
      slug: "aplikasi-journal-ai-tested-30-hari-indonesia",
      eyebrow: "30-day test",
      body: "Honest ranking 6 aplikasi journal AI tested 30 hari di Indonesia.",
    },
    {
      slug: "depresi-pasca-lulus-kuliah",
      eyebrow: "Setelah lulus",
      body: "Setelah lulus mental health stack tetap penting — guide depresi pasca lulus.",
    },
  ],
  "aplikasi-journal-ai-tested-30-hari-indonesia": [
    {
      slug: "5-aplikasi-mental-health-indonesia-mahasiswa-wajib-tahu",
      eyebrow: "Stack untuk mahasiswa",
      body: "5 aplikasi mental health Indonesia wajib install untuk mahasiswa.",
    },
    {
      slug: "aplikasi-journal-ai-gratis-indonesia",
      eyebrow: "Free apps focus",
      body: "Versi yang fokus pada aplikasi journal AI gratis untuk pengguna Indonesia.",
    },
    {
      slug: "i-tested-8-ai-journal-apps-for-30-days",
      eyebrow: "English version",
      body: "8 AI journal apps tested 30 hari (English-language version).",
    },
    {
      slug: "aplikasi-curhat-ai",
      eyebrow: "AI curhat specific",
      body: "AI curhat — kriteria privasi dan rekomendasi spesifik pengguna Indonesia.",
    },
  ],
  "why-do-i-keep-self-sabotaging": [
    {
      slug: "journaling-for-imposter-syndrome",
      eyebrow: "Imposter pattern",
      body: "Imposter protection is #1 cause of self-sabotage. Evidence File technique.",
    },
    {
      slug: "journaling-for-perfectionism-procrastination",
      eyebrow: "Perfectionism pattern",
      body: "Perfectionism-driven self-sabotage. The 6-prompt loop-breaker.",
    },
    {
      slug: "ai-journal-for-overthinking",
      eyebrow: "Overthinking driver",
      body: "Self-sabotage often paired with overthinking. AI journal angle.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Build the practice",
      body: "Full 2026 guide to AI journaling — what helps long-term pattern work.",
    },
  ],
  "i-deleted-instagram-for-30-days-here-is-what-happened-to-my-mood": [
    {
      slug: "digital-fatigue-journaling-reset",
      eyebrow: "Digital fatigue science",
      body: "The 5-min reset protocol that pairs well with detox or limit strategy.",
    },
    {
      slug: "journaling-for-jealousy-and-comparison",
      eyebrow: "Comparison root",
      body: "Most Instagram anxiety = comparison loop. The 6-prompt break protocol.",
    },
    {
      slug: "why-am-i-always-anxious-before-sleep",
      eyebrow: "Sleep connection",
      body: "Instagram pre-bed is major sleep killer. The 5-min reset protocol.",
    },
    {
      slug: "mengatasi-anxiety-media-sosial-gen-z",
      eyebrow: "Indonesian version",
      body: "Indonesian Gen Z social media anxiety — 5 strategies tanpa detox total.",
    },
  ],
  "5-things-therapists-actually-recommend-that-arent-medication": [
    {
      slug: "journaling-before-therapy",
      eyebrow: "Pre-therapy prep",
      body: "If thinking about starting therapy — how to prep with journaling first.",
    },
    {
      slug: "best-journal-app-for-therapists-2026",
      eyebrow: "Therapist-recommended apps",
      body: "5 apps specifically recommended by therapists for daily client tracking.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Build the habit",
      body: "How to build the 5-10 min expressive writing habit therapists recommend.",
    },
    {
      slug: "complete-guide-ai-journaling-2026",
      eyebrow: "Category guide",
      body: "Full 2026 guide to AI journaling — for the tracking + writing components.",
    },
  ],
  "best-mental-health-app-for-busy-moms-2026": [
    {
      slug: "journaling-for-new-parents",
      eyebrow: "New parent journaling",
      body: "Beyond app selection — how to actually journal as a new parent.",
    },
    {
      slug: "best-free-mental-wellness-apps-2026",
      eyebrow: "Free options",
      body: "7 truly-free mental wellness apps — covers busy mom budget reality.",
    },
    {
      slug: "best-ai-journal-apps-for-anxiety-2026",
      eyebrow: "If anxiety dominant",
      body: "If mom anxiety is dominant concern — anxiety-specific app comparison.",
    },
    {
      slug: "5-minute-daily-journaling-habit",
      eyebrow: "Build sustainable habit",
      body: "How to build 5-minute habit that survives nap schedules.",
    },
  ],
  "kenapa-gue-merasa-kesepian-padahal-banyak-teman": [
    {
      slug: "ai-journaling-for-loneliness",
      eyebrow: "Versi English deeper",
      body: "Loneliness yang nggak terselesaikan — full guide dengan Vivek Murthy research.",
    },
    {
      slug: "cara-curhat-ke-diri-sendiri",
      eyebrow: "Saat nggak ada outlet",
      body: "Saat lo butuh outlet tapi nggak ada yang really listen — 5 metode self-outlet.",
    },
    {
      slug: "mengatasi-anxiety-media-sosial-gen-z",
      eyebrow: "Sosmed loneliness",
      body: "Banyak teman di sosmed tapi tetap kesepian — 5 strategi sosmed yang membantu.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety + loneliness",
      body: "Loneliness sering paired dengan social anxiety — 7 prompt khusus anxiety.",
    },
  ],
  "5-tanda-burnout-yang-sering-disepelekan-gen-z-indonesia": [
    {
      slug: "cara-mengatasi-burnout-gen-z",
      eyebrow: "Treatment burnout",
      body: "Setelah identify tanda — 5 prompt khusus untuk treatment burnout Gen Z Indonesia.",
    },
    {
      slug: "mengatasi-stres-kerja-journaling",
      eyebrow: "Stres kerja umum",
      body: "Stres kerja yang berkepanjangan jadi burnout. 5 prompt khusus pekerja Indonesia.",
    },
    {
      slug: "journaling-untuk-anxiety",
      eyebrow: "Anxiety + burnout",
      body: "Burnout sering paired dengan anxiety. 7 prompt khusus anxiety Indonesia.",
    },
    {
      slug: "journaling-untuk-depresi",
      eyebrow: "Burnout → depresi",
      body: "Burnout untreated bisa jadi depresi. Panduan honest depresi Indonesia.",
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
    knowsAbout: [
      "AI journaling",
      "mood tracking",
      "expressive writing",
      "mental wellness",
      "anxiety management",
      "burnout recovery",
      "self-reflection",
      "habit formation",
    ],
  };

  const editorialTeam = {
    "@type": "Person",
    name: "Nuju Editorial Team",
    description:
      "Nuju's editorial team curates research-backed content on AI journaling, mood tracking, and mental wellness. All claims are sourced from public peer-reviewed research and Nuju's own anonymized usage data, with mental health disclaimers and professional-care references where applicable.",
    worksFor: nujuEntity,
    url: "https://nuju.app/blog",
  };

  const isYMYL = post.category === "Mental Wellness" || post.category === "AI & Tech";

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
    author: editorialTeam,
    editor: editorialTeam,
    publisher: nujuEntity,
    reviewedBy: editorialTeam,
    sourceOrganization: nujuEntity,
    image: "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    ...(isYMYL && {
      about: {
        "@type": "Thing",
        name: post.category === "Mental Wellness" ? "Mental wellness" : "AI journaling",
      },
    }),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable-title=\"true\"]", "[data-speakable-bluf=\"true\"]"],
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

        <h1
          data-speakable-title="true"
          className="mb-6 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl"
        >
          {post.title}
        </h1>

        <p
          data-speakable-bluf="true"
          className="mb-10 border-b border-border/40 pb-10 text-lg leading-relaxed text-muted-foreground"
        >
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Clock, Heart, HelpCircle, Lock, ShieldCheck, Sparkles, Users, Activity, Zap, Headphones, ShieldAlert, Compass, Briefcase, Wind, Eye, Shield, Feather, Moon, Hand, BedDouble, Smartphone, HeartHandshake, Waves, Award, Anchor, Radio, Volume2, VolumeX, Battery, HeartPulse, GitMerge, EyeOff, Hourglass, Snowflake, Smile, Coins, HeartCrack, GitFork, Flame, Scale } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { getAllQuizzes, QuizMeta } from "@/data/quizzes";
import juMain from "@/assets/ju-main.webp";

const QuizHub: React.FC = () => {
  const quizzes = getAllQuizzes();
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const countries = [
    { id: "ALL", label: "All Countries 🌍" },
    { id: "US", label: "🇺🇸 United States" },
    { id: "ID", label: "🇮🇩 Indonesia" },
    { id: "DE", label: "🇩🇪🇨🇭 Deutschland / Schweiz" },
    { id: "FR", label: "🇫🇷 France" },
    { id: "ES", label: "🇪🇸 España" },
    { id: "NO", label: "🇳🇴 Norge" },
    { id: "NL", label: "🇳🇱 Nederland" },
    { id: "JP", label: "🇯🇵 日本" },
    { id: "KR", label: "🇰🇷 대한민국" },
  ];

  const categories = [
    { id: "ALL", label: "All Categories", match: [] },
    { id: "vitality", label: "Mental Vitality", match: ["vitalitas", "mental", "vitality", "stress", "depression"] },
    { id: "mindset", label: "Mindset & Sleep", match: ["pola pikir", "tidur", "mindset", "sleep", "overthinking"] },
    { id: "career", label: "Career & Productivity", match: ["karir", "produktivitas", "career", "burnout", "productivity"] },
    { id: "relationships", label: "Relationship Psychology", match: ["hubungan", "relasi", "relationship", "attachment", "love"] },
  ];

  const filteredQuizzes = quizzes.filter((q) => {
    const matchCountry =
      selectedCountry === "ALL" ||
      q.targetCountry === selectedCountry ||
      (selectedCountry === "DE" && (q.targetCountry === "DE" || q.targetCountry === "CH"));

    if (selectedCategory === "ALL") return matchCountry;
    const catObj = categories.find((c) => c.id === selectedCategory);
    if (!catObj || catObj.match.length === 0) return matchCountry;
    const matchCat = catObj.match.some((kw) =>
      q.category.toLowerCase().includes(kw.toLowerCase())
    );
    return matchCountry && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-amber-200">
      <SEOHead
        title="Free Psychology Tests & Mental Health Screeners | Nuju Quiz"
        description="Take 1-minute interactive psychology tests: Check your emotional battery, late-night overthinking patterns, and burnout levels. 100% free, private, and CBT-based."
        canonical="https://nuju.app/quiz"
        language="en"
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={juMain} alt="Nuju mascot Ju" className="h-8 w-8 rounded-full object-cover shadow-sm transition group-hover:scale-105" />
            <span className="font-semibold text-lg tracking-tight text-neutral-900">nuju<span className="text-amber-600 font-bold">.quiz</span></span>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <Link to="/ebook" className="hidden text-amber-700 hover:text-amber-800 sm:inline-block font-semibold">
              Ebook & Workbook
            </Link>
            <Link to="/blog" className="hidden text-neutral-600 hover:text-neutral-900 sm:inline-block font-medium">
              Articles & Guides
            </Link>
            <Link to="/app" className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition">
              Open Web App
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-900 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Quick 45–60s Reflection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            How Is Your Inner World <span className="text-amber-600 underline decoration-amber-300 decoration-wavy">Today?</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Identify fatigue signals, late-night overthinking patterns, and emotional coping styles with interactive psychology & CBT screeners. Free, no login required, and 100% private.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> 100% Private & No Data Stored
            </span>
            <span className="flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-indigo-600" /> CBT & Emotion Science Validated
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-amber-600" /> Taken by 130,000+ People
            </span>
          </div>
        </section>

        {/* Top Google AdSense Banner */}
        <div className="mb-8">
          <AdSenseBanner slot="quiz-hub-top" format="auto" />
        </div>

        {/* Flagship DASS-21 Mental Health Test Banner */}
        <div className="mb-10 overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-orange-100/30 p-6 sm:p-8 shadow-md relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  FLAGSHIP ASSESSMENT
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700 border border-neutral-200 shadow-2xs">
                  🇬🇧 Global EN · 🇮🇩 ID
                </span>
                <span className="text-xs font-medium text-neutral-500">21 Items · ~2 Mins</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Mental Health & Stress Screener (DASS-21)
              </h2>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Scientifically validated clinical screening measuring <strong className="text-neutral-900">Depression (💙)</strong>, <strong className="text-neutral-900">Anxiety (⚡)</strong>, and <strong className="text-neutral-900">Stress (🔥)</strong>. Includes custom 3-pillar breakdown, CBT insights, and a personalized reflection prompt.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 pt-1">
                <span>✓ Lovibond & Lovibond Standard</span>
                <span>✓ 100% Private & No Login Needed</span>
                <span>✓ Instagram Story Card Export</span>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3 w-full md:w-auto">
              <Link
                to="/quiz/mental-health-test"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-neutral-800 transition hover:scale-102"
              >
                <Activity className="h-4 w-4 text-amber-400" />
                <span>Start Free DASS-21 Test</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-[11px] text-neutral-400">Available in English (Primary) & Indonesian</span>
            </div>
          </div>
        </div>

        {/* Six-Item Flagship Tools & Games Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* Card 1: Adult ADHD Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Zap className="h-3 w-3" />
                  WHO ASRS v1.1
                </span>
                <span className="text-xs font-semibold text-neutral-500">🇬🇧 🇩🇪 🇫🇷 🇪🇸 🇮🇩</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Adult ADHD & Dopamine Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Assess attention regulation, executive delay, and digital dopamine burnout with evidence-based WHO ASRS v1.1 criteria.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/adhd-screener"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Take ADHD Test</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Attachment Style Test */}
          <div className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Heart className="h-3 w-3" />
                  ECR-R MODEL
                </span>
                <span className="text-xs font-semibold text-neutral-500">🇬🇧 🇩🇪 🇫🇷 🇪🇸 🇮🇩</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Attachment Style Assessment
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Discover whether you are Secure, Anxious, Avoidant, or Disorganized. Learn triggers and communication scripts.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 6 Scenarios</span>
              <Link
                to="/quiz/attachment-style"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Check Attachment</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Ju Sound Sanctuary */}
          <div className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-500/10 via-blue-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Headphones className="h-3 w-3" />
                  WEB AUDIO SYNTH
                </span>
                <span className="text-xs font-semibold text-cyan-700">Brown Noise • 528Hz</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Ju's Sound Sanctuary
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Pure in-browser synthesized brown noise, rain, fireplace, and 528Hz Alpha waves. Built-in Pomodoro timer with zero audio loading lag.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Deep Work & ADHD Focus</span>
              <Link
                to="/soundscapes"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-800 transition shadow-xs"
              >
                <span>Open Sanctuary</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Daily Mood Oracle */}
          <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-500/10 via-purple-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Compass className="h-3 w-3" />
                  DAILY ARCHETYPES
                </span>
                <span className="text-xs font-semibold text-neutral-500">3D Card Pull</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Daily Mood Oracle
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Draw your daily archetype card. Receive custom affirmations, grounding wisdom, and a 60-second micro-ritual for calm clarity.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Daily Wisdom Pull</span>
              <Link
                to="/game/oracle"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Draw Your Card</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: Panic SOS Lab */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-rose-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-700 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <ShieldAlert className="h-3 w-3" />
                  EMERGENCY CALM
                </span>
                <span className="text-xs font-semibold text-rose-700">24/7 Helplines</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Panic Attack SOS (3 Mins)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Immediate parasympathetic vagus nerve pacer, 5-4-3-2-1 sensory grounding sequence, and direct toll-free crisis hotlines.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Immediate Relief</span>
              <Link
                to="/emergency"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800 transition shadow-xs"
              >
                <span>Open SOS Lab</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 6: Zen Bubble Popper Mini-Game */}
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-500/10 via-purple-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  🎮 MINDFUL GAME
                </span>
                <span className="text-xs font-semibold text-indigo-700">Crystal Chimes 🫧</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Ju's Zen Bubble Popper
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Feeling overwhelmed? Pop floating stress bubbles or type your specific intrusive thought to shatter it into starlight.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">CBT & ACT Therapy · 60 Secs</span>
              <Link
                to="/game/zen-pop"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Play Zen Pop</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 7: Inner Child Wound Test */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  🧸 VIRAL PSYCHOLOGY
                </span>
                <span className="text-xs font-semibold text-neutral-500">4 Archetypes</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Inner Child Wound Test
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Discover your childhood emotional wound (Abandonment, Achievement, Guilt, or Invisibility) and actionable reparenting rituals.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 6 Scenarios</span>
              <Link
                to="/quiz/inner-child"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Take Inner Child Test</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 8: Workplace Burnout Screener */}
          <div className="rounded-3xl border border-orange-300 bg-gradient-to-br from-orange-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Briefcase className="h-3 w-3" />
                  MASLACH MBI
                </span>
                <span className="text-xs font-semibold text-neutral-500">Exhaustion & Cynicism</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Workplace Burnout Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Assess chronic work fatigue, emotional exhaustion, and depersonalization. Get customized corporate recovery protocols.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-orange-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/burnout"
                className="inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition shadow-xs"
              >
                <span>Check Burnout Risk</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 9: Stanford Breathwork Lab */}
          <div className="rounded-3xl border border-cyan-300 bg-gradient-to-br from-cyan-500/10 via-cyan-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Wind className="h-3 w-3" />
                  STANFORD MEDICINE
                </span>
                <span className="text-xs font-semibold text-cyan-700">Physiological Sigh</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Physiological Sigh Pacer
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Dr. Huberman's fastest somatic reset to reduce acute stress and heart rate in 2 breaths with real-time 528Hz acoustic chimes.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">60-Sec Reset</span>
              <Link
                to="/tools/breathwork"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-800 transition shadow-xs"
              >
                <span>Start Breathing</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 10: 5 Love Languages Profiler */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Heart className="h-3 w-3" />
                  5 LOVE LANGUAGES
                </span>
                <span className="text-xs font-semibold text-neutral-500">🇬🇧 🇩🇪 🇫🇷 🇪🇸 🇮🇩</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                5 Love Languages Profiler
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Discover your primary and secondary love languages. Learn how your nervous system receives affection and download your personal cheatsheet.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 10 Scenarios</span>
              <Link
                to="/quiz/love-languages"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Find Love Language</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 11: People-Pleasing & Boundaries Screener */}
          <div className="rounded-3xl border border-teal-300 bg-gradient-to-br from-teal-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Shield className="h-3 w-3" />
                  FAWN RESPONSE
                </span>
                <span className="text-xs font-semibold text-neutral-500">Boundaries & Guilt</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                People-Pleaser & Fawn Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you struggle to say 'No'? Measure your fawn trauma response, boundary overcommitment, and get word-for-word scripts to refuse without guilt.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/people-pleasing"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Check People-Pleasing</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 12: EMDR Bilateral Stimulation Lab */}
          <div className="rounded-3xl border border-cyan-300 bg-gradient-to-br from-cyan-500/10 via-sky-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Eye className="h-3 w-3" />
                  EMDR NEUROSCIENCE
                </span>
                <span className="text-xs font-semibold text-cyan-700">Visual & Audio Panning</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                EMDR Bilateral Stimulation Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Dual-attention bilateral light orb and alternating 432Hz stereo audio pings to rapidly soothe amygdala panic and discharge traumatic tension.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Immediate Calming</span>
              <Link
                to="/tools/bilateral"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-800 transition shadow-xs"
              >
                <span>Launch EMDR Tool</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 13: Highly Sensitive Person (HSP) Screener */}
          <div className="rounded-3xl border border-pink-300 bg-gradient-to-br from-pink-500/10 via-rose-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Feather className="h-3 w-3" />
                  HSP & SENSORY
                </span>
                <span className="text-xs font-semibold text-neutral-500">Dr. Elaine Aron Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Highly Sensitive Person (HSP)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you absorb energy like a sponge? Test your sensory overload thresholds, emotional depth, and get your custom Sensory Sanctuary Blueprint.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-pink-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 15 Items</span>
              <Link
                to="/quiz/hsp"
                className="inline-flex items-center gap-1.5 rounded-full bg-pink-600 px-4 py-2 text-xs font-bold text-white hover:bg-pink-700 transition shadow-xs"
              >
                <span>Take HSP Test</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 14: Jungian Shadow Work Mirror */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Moon className="h-3 w-3" />
                  SHADOW WORK
                </span>
                <span className="text-xs font-semibold text-neutral-500">Carl Jung Archetypes</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Jungian Shadow Work Mirror
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Unmask what your ego represses. Discover your primary shadow archetype (The Tyrant, The Martyr, The Ice Wall, The Rebel) and deep journal prompts.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Dilemmas</span>
              <Link
                to="/quiz/shadow-work"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Explore Shadow</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 15: 5-4-3-2-1 Sensory Grounding Lab */}
          <div className="rounded-3xl border border-teal-300 bg-gradient-to-br from-teal-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Hand className="h-3 w-3" />
                  SOMATIC ANCHOR
                </span>
                <span className="text-xs font-semibold text-teal-700">Polyvagal Chimes 🔔</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                5-4-3-2-1 Sensory Grounding Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Feeling detached, panicked, or overstimulated? Guide your 5 senses back to safety with interactive step anchors and calming solfeggio chimes.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Immediate Reset · 2 Mins</span>
              <Link
                to="/tools/grounding"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Start Grounding</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 16: Dopamine Detox & Screen Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Zap className="h-3 w-3" />
                  DR. ANNA LEMBKE
                </span>
                <span className="text-xs font-semibold text-neutral-500">Dopamine Fasting</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Dopamine Detox & Screen Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Assess compulsive scrolling, phantom phone checks, and boredom intolerance. Unlock custom 24-hour and 7-day fasting protocols.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/dopamine-detox"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Screen Dopamine</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 17: Polyvagal Nervous System State */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Activity className="h-3 w-3" />
                  POLYVAGAL METER
                </span>
                <span className="text-xs font-semibold text-neutral-500">Dr. Stephen Porges</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Polyvagal Nervous System State
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Map whether you are in Ventral Safety, Sympathetic Fight/Flight, or Dorsal Freeze shutdown. Access instant somatic regulation drills.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/nervous-system"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <span>Scan Nervous State</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 18: 4-7-8 Deep Sleep Pacer */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <BedDouble className="h-3 w-3" />
                  SLEEP LAB 432Hz
                </span>
                <span className="text-xs font-semibold text-indigo-700">Dr. Andrew Weil</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                4-7-8 Deep Sleep Pacer & Sound Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Fall asleep in under 3 minutes. Natural nervous system sedative pacer paired with pure Web Audio 432Hz delta drone and Tibetan singing bowls.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Insomnia Relief · 3 Mins</span>
              <Link
                to="/tools/sleep"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Launch Sleep Lab</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 19: Rejection Sensitive Dysphoria (RSD) */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-rose-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartHandshake className="h-3 w-3" />
                  RSD SCREENER
                </span>
                <span className="text-xs font-semibold text-rose-700">Dr. William Dodson</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Rejection Sensitive Dysphoria (RSD)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do small criticisms feel like physical blows? Assess social vigilance, criticism pain, and learn somatic de-escalation drills.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/rsd"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen RSD</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 20: Cognitive Distortions Spotter (CBT) */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Brain className="h-3 w-3" />
                  CBT THOUGHT SPOTTER
                </span>
                <span className="text-xs font-semibold text-indigo-700">Beck & Burns CBT</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Cognitive Distortions & Thought Spotter
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Catch catastrophizing, mind-reading, and irrational loops in 10 realistic scenarios. Get custom CBT thought record reframe formulas.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 10 Scenarios</span>
              <Link
                to="/quiz/cognitive-distortions"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Spot Distortions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 21: Stanford NSDR & Yoga Nidra Somatic Lab */}
          <div className="rounded-3xl border border-cyan-300 bg-gradient-to-br from-cyan-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Waves className="h-3 w-3" />
                  STANFORD PROTOCOL
                </span>
                <span className="text-xs font-semibold text-cyan-700">Dr. Andrew Huberman</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Stanford NSDR & Yoga Nidra Audio Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Restore striatal dopamine and clear brain fog in 10-20 minutes. Pure Web Audio 6Hz Theta frequency generator and guided somatic body scan.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Pure Web Audio · 10-20 Mins</span>
              <Link
                to="/tools/nsdr"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-700 transition shadow-xs"
              >
                <span>Launch NSDR Lab</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 22: Somatic Dissociation & DPDR Screener */}
          <div className="rounded-3xl border border-violet-300 bg-gradient-to-br from-violet-500/10 via-purple-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Anchor className="h-3 w-3" />
                  DES-II SCALE
                </span>
                <span className="text-xs font-semibold text-violet-700">Dr. Bessel van der Kolk</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Dissociation & DPDR Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you feel detached from your body, numb, or like life is a movie? Assess depersonalization and learn somatic re-embodiment drills.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-violet-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/dissociation"
                className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-700 transition shadow-xs"
              >
                <span>Screen Dissociation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 23: Imposter Syndrome Diagnostic (Clance CIPS) */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Award className="h-3 w-3" />
                  CLANCE CIPS
                </span>
                <span className="text-xs font-semibold text-amber-700">Dr. Pauline Clance</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Imposter Syndrome & Fraud Fear
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Secretly terrified you will be exposed as a fake? Discover your dominant archetype (Perfectionist, Superhero, Expert) and reframe your success.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/imposter-syndrome"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Diagnose Imposter</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 24: Solfeggio Harmonics & Brainwave Lab */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Radio className="h-3 w-3" />
                  528Hz & 432Hz LAB
                </span>
                <span className="text-xs font-semibold text-emerald-700">Neuro-Acoustics</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Solfeggio Harmonics & Brainwaves
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Lower salivary cortisol and dissolve anxiety with pure Web Audio harmonic tones (528Hz, 432Hz) paired with isochronic Alpha/Theta pulses.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Pure Web Audio · 5-30 Mins</span>
              <Link
                to="/tools/solfeggio"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <span>Launch Solfeggio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 25: Emotional Agility Screener */}
          <div className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Wind className="h-3 w-3" />
                  DR. SUSAN DAVID
                </span>
                <span className="text-xs font-semibold text-teal-700">Harvard AAQ-2</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Emotional Agility & Avoidance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Assess whether you bottle emotions under stoic armor or spiral in brooding overthinking. Unlock the 4-step values-aligned action protocol.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/emotional-agility"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Take Agility Test</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 26: High-Functioning Anxiety Mask Diagnostic */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Activity className="h-3 w-3" />
                  OVERTHINKING MASK
                </span>
                <span className="text-xs font-semibold text-amber-700">GAD-7 Matrix</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                High-Functioning Anxiety Test
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Flawless external composure masking silent biological dread and fear of inadequacy? Diagnose your high-functioning anxiety score.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/high-functioning-anxiety"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Diagnose Mask</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 27: Navy SEAL Box Breathing Lab */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <ShieldCheck className="h-3 w-3" />
                  TACTICAL PACER
                </span>
                <span className="text-xs font-semibold text-emerald-700">Navy SEALs</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Navy SEAL Box Breathing Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Override acute panic and activate your vagal brake in 2 minutes with pure Web Audio tone synthesis, Tibetan bell chimes, and an animated square pacer.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Pure Web Audio · 2-5 Mins</span>
              <Link
                to="/tools/box-breathing"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <span>Start Box Breathing</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 28: Parentification & Eldest Child Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Users className="h-3 w-3" />
                  FAMILY SYSTEMS
                </span>
                <span className="text-xs font-semibold text-rose-700">Dr. Salvador Minuchin</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Parentification & Eldest Child Test
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Were you forced to grow up too early and parent your parents or siblings? Assess childhood emotional parentification and compulsive hyper-responsibility.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/parentification"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Parentification</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 29: Alexithymia & Emotional Numbing Diagnostic */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-violet-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Eye className="h-3 w-3" />
                  TAS-20 SCALE
                </span>
                <span className="text-xs font-semibold text-purple-700">Toronto Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Alexithymia & Emotional Numbing
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you struggle to identify what you feel or experience emotions only as physical fatigue and somatic tension? Screen alexithymia and somatic blindness.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/alexithymia"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen Alexithymia</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 30: Autonomic Vagal Humming & Bhramari Resonance Lab */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-blue-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Volume2 className="h-3 w-3" />
                  POLYVAGAL RESONANCE
                </span>
                <span className="text-xs font-semibold text-indigo-700">Dr. Stephen Porges</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Vagal Humming & Bhramari Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Stimulate the auricular and recurrent laryngeal branches of your Vagus nerve with pure Web Audio harmonic humming (136.1Hz Om, 128Hz C3) and mandala pacer.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Pure Web Audio · 2-5 Mins</span>
              <Link
                to="/tools/vocal-toning"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Launch Vagal Humming</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 31: Limerence & Romantic Obsession Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Heart className="h-3 w-3" />
                  LIMERENCE SCALE
                </span>
                <span className="text-xs font-semibold text-rose-700">Dr. Dorothy Tennov</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Limerence & Romantic Obsession Test
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Is it genuine connection or an involuntary dopaminergic loop? Assess intrusive daydreams, rejection panic, and obstacle-driven pedestalization.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/limerence"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Limerence</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 32: Sensory Overload & Empathy Burnout Diagnostic */}
          <div className="rounded-3xl border border-teal-300 bg-gradient-to-br from-teal-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Activity className="h-3 w-3" />
                  HSP / SPS MODEL
                </span>
                <span className="text-xs font-semibold text-teal-700">Dr. Elaine Aron</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Sensory Overload & Empathy Burnout
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do loud noises, harsh lights, and other people's negative emotional states exhaust your body? Measure sensory threshold and SPS overload.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/sensory-overload"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Screen Sensory Overload</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 33: Stanford Physiological Sigh & Cyclic Sighing Lab */}
          <div className="rounded-3xl border border-cyan-300 bg-gradient-to-br from-cyan-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Wind className="h-3 w-3" />
                  STANFORD PROTOCOL
                </span>
                <span className="text-xs font-semibold text-cyan-700">Dr. Andrew Huberman</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Stanford Physiological Sigh Lab
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The fastest scientifically proven breathwork technique to lower heart rate and disarm acute panic in 2 minutes with pure Web Audio dual-inhale pacing.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Pure Web Audio · 2-5 Mins</span>
              <Link
                to="/tools/physiological-sigh"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-700 transition shadow-xs"
              >
                <span>Launch Sigh Lab</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 34: Clinical Perfectionism & Fear of Failure Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Award className="h-3 w-3" />
                  FMPS MODEL
                </span>
                <span className="text-xs font-semibold text-amber-700">Frost & Hewitt MPS</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Clinical Perfectionism & Fear of Failure Test
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do your high standards fuel excellence or paralyzing procrastination? Discover whether you are an Adaptive Striver or caught in fear-of-mistakes freeze.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/perfectionism"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Screen Perfectionism</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 35: Social Battery & Introvert Hangover Screener */}
          <div className="rounded-3xl border border-blue-300 bg-gradient-to-br from-blue-500/10 via-sky-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Battery className="h-3 w-3" />
                  ENERGY & SENSORY INDEX
                </span>
                <span className="text-xs font-semibold text-blue-700">Introvert Hangover</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Social Battery & Masking Fatigue Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Measure your remaining social battery, emotional labor masking strain, and how many hours of quiet solitude your nervous system needs to recharge.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 10 Items</span>
              <Link
                to="/quiz/social-battery"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs"
              >
                <span>Check Social Battery</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 36: Gaslighting & Emotional Manipulation Radar */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-rose-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <ShieldAlert className="h-3 w-3" />
                  REALITY CHECK
                </span>
                <span className="text-xs font-semibold text-rose-700">Manipulation Scale</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Gaslighting & Emotional Manipulation Radar
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Determine if covert manipulation, reality distortion, or chronic self-doubt are eroding your perception and sense of truth.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/gaslighting"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Verify Reality</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 37: Cortisol & Somatic Stress Body Screener */}
          <div className="rounded-3xl border border-teal-300 bg-gradient-to-br from-teal-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartPulse className="h-3 w-3" />
                  SOMATIC HPA-AXIS
                </span>
                <span className="text-xs font-semibold text-teal-700">Nervous System Load</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Cortisol & Somatic Stress Body Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Identify how chronic autonomic overdrive and cortisol dysregulation manifest physically — from 3 AM insomnia to muscular armor and adrenal crashes.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/cortisol-stress"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Screen Somatic Stress</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 38: Emotional Availability & Vulnerability Radar */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartHandshake className="h-3 w-3" />
                  INTIMACY DEFENSE
                </span>
                <span className="text-xs font-semibold text-indigo-700">Gottman & EFT</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Emotional Availability & Vulnerability Test
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Are your relationship walls protecting you or keeping true connection out? Discover if you are securely open, a cautious pragmatist, or counter-dependent.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~2 Mins · 12 Items</span>
              <Link
                to="/quiz/emotional-availability"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Check Availability</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 39: Revenge Bedtime Procrastination Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-purple-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Moon className="h-3 w-3" />
                  SLEEP DREAD INDEX
                </span>
                <span className="text-xs font-semibold text-amber-700">Kroese BPS Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Revenge Bedtime Procrastination Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Why can't you put your phone down at midnight even when exhausted? Measure your daytime autonomy deficit and nocturnal dopamine scrolling loop.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/revenge-bedtime-procrastination"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Screen Bedtime Habits</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 40: Chronic Guilt & Self-Sabotage Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <ShieldAlert className="h-3 w-3" />
                  TOXIC REMORSE INDEX
                </span>
                <span className="text-xs font-semibold text-rose-700">Kugel-Jones GIC Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Chronic Guilt & Self-Sabotage Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you constantly feel responsible for other people's moods or sabotage your happiness? Differentiate healthy remorse from subconscious penance.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/chronic-guilt"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Guilt Levels</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 41: Hyper-Independence Diagnostic */}
          <div className="rounded-3xl border border-sky-300 bg-gradient-to-br from-sky-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Shield className="h-3 w-3" />
                  TRAUMA ARMOR INDEX
                </span>
                <span className="text-xs font-semibold text-sky-700">Attachment Defense Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Hyper-Independence Diagnostic
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you refuse to ask for help even when burning out? Decode whether extreme self-reliance is a superpower or an emotional fortress guarding old wounds.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/hyper-independence"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition shadow-xs"
              >
                <span>Screen Trauma Armor</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 42: Emotional Enmeshment & Family Boundaries Screener */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <GitMerge className="h-3 w-3" />
                  FAMILY BOUNDARY FUSION
                </span>
                <span className="text-xs font-semibold text-purple-700">Minuchin Systems Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Emotional Enmeshment & Boundary Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you feel guilty having a separate life or saying no to family? Screen for psychological control, guilt manipulation, and parentified identity loss.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/emotional-enmeshment"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen Family Fusion</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 43: Fear of Being Perceived Screener */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <EyeOff className="h-3 w-3" />
                  SPOTLIGHT ANXIETY INDEX
                </span>
                <span className="text-xs font-semibold text-emerald-700">Gilovich Social Model</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Fear of Being Perceived Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Does existing in public, being looked at, or speaking in meetings trigger panic? Decode your social masking, visibility dread, and covert camouflage.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/fear-of-being-perceived"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <span>Screen Spotlight Load</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 44: Decision Fatigue & Brain Fog Screener */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-sky-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Brain className="h-3 w-3" />
                  EGO DEPLETION MODEL
                </span>
                <span className="text-xs font-semibold text-indigo-700">Roy Baumeister</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Decision Fatigue & Brain Fog Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Paralyzed by simple choices or mentally exhausted by midday? Screen your cognitive saturation, trivial choice paralysis, and willpower depletion.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/decision-fatigue"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Screen Cognitive Load</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 45: FOMO & Digital Dopamine Trapping Screener */}
          <div className="rounded-3xl border border-fuchsia-300 bg-gradient-to-br from-fuchsia-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Radio className="h-3 w-3" />
                  PRZYBYLSKI FOMO SCALE
                </span>
                <span className="text-xs font-semibold text-fuchsia-700">Social Comparison</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                FOMO & Digital Dopamine Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Constantly checking feeds, comparing milestones, or terrified of missing out? Screen your status anxiety, compulsive monitoring, and embrace JOMO.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-fuchsia-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/fomo"
                className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-600 px-4 py-2 text-xs font-bold text-white hover:bg-fuchsia-700 transition shadow-xs"
              >
                <span>Screen FOMO Index</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 46: Attachment Compatibility & Relational Dynamics Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartHandshake className="h-3 w-3" />
                  LEVINE & JOHNSON EFT
                </span>
                <span className="text-xs font-semibold text-rose-700">Relational Harmony</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Attachment Compatibility Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Caught in an anxious-avoidant trap or seeking earned security? Screen your protest behaviors, deactivating strategies, and emotional responsiveness.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/attachment-compatibility"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Compatibility</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 47: Existential Dread & Purpose Alignment Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Hourglass className="h-3 w-3" />
                  FRANKL LOGOTHERAPY
                </span>
                <span className="text-xs font-semibold text-amber-700">Quarter-Life Meaning</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Existential Dread & Purpose Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Paralyzed by cosmic nihilism, time slipping away, or lack of agency? Screen your meaning vacuum, finitude anxiety, and re-anchor your inner compass.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/existential-dread"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Screen Existential Dread</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 48: Emotional Numbness & Dissociative Blunting Screener */}
          <div className="rounded-3xl border border-sky-300 bg-gradient-to-br from-sky-500/10 via-blue-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Snowflake className="h-3 w-3" />
                  POLYVAGAL FREEZE
                </span>
                <span className="text-xs font-semibold text-sky-700">Stephen Porges</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Emotional Numbness Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Feeling hollow, detached like a spectator behind glass, or unable to cry? Screen your affective flatness, dorsal vagal shutdown, and begin somatic thawing.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/emotional-numbness"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition shadow-xs"
              >
                <span>Screen Numbness</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 49: Toxic Independence & Counter-Dependency Screener */}
          <div className="rounded-3xl border border-orange-300 bg-gradient-to-br from-orange-500/10 via-amber-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Shield className="h-3 w-3" />
                  GABOR MATÉ MODEL
                </span>
                <span className="text-xs font-semibold text-orange-700">Interdependence</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Toxic Independence Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Refuse to ask for help, push through illness, or carry everyone else's burden? Screen your help phobia, somatic martyrdom, and cultivate safe vulnerability.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-orange-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/toxic-independence"
                className="inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold text-white hover:bg-orange-700 transition shadow-xs"
              >
                <span>Screen Independence</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 50: Compassion Fatigue & Empathic Burnout Screener */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartHandshake className="h-3 w-3" />
                  FIGLEY & MASLACH
                </span>
                <span className="text-xs font-semibold text-purple-700">Empathy Burnout</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Compassion Fatigue Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Drained by listening to others, emotionally blunted, or feeling cynical towards those you love? Screen empathic depletion and secondary traumatic burden.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/compassion-fatigue"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen Compassion</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 51: Intimacy Anorexia & Emotional Guarding Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-red-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Lock className="h-3 w-3" />
                  DOUG WEISS MODEL
                </span>
                <span className="text-xs font-semibold text-rose-700">Relational Guarding</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Intimacy Avoidance Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Suffocate when someone gets close, hide behind busyness, or find flaws to keep emotional distance? Unpack your intimacy defense armor and expand relational safety.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/intimacy-avoidance"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Intimacy</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 52: People-Pleaser & Fawn Response Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Smile className="h-3 w-3" />
                  PETE WALKER C-PTSD
                </span>
                <span className="text-xs font-semibold text-amber-700">Appeasement Trauma</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Fawn Response Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Smile when you're furious, erase your desires to appease others, or feel terror when saying 'No'? Unpack your trauma fawn reflex and reclaim your sovereign voice.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/fawn-response"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Screen Fawn</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 53: Financial Anxiety & Scarcity Mindset Screener */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Coins className="h-3 w-3" />
                  MULLAINATHAN & SHAFIR
                </span>
                <span className="text-xs font-semibold text-emerald-700">Scarcity Bandwidth</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Financial Anxiety Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Nauseous when checking bank balances, terrified of destitution despite savings, or drowning in guilt when spending on yourself? Measure your cognitive bandwidth tax.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/financial-anxiety"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <span>Screen Scarcity</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 54: Rejection Sensitive Dysphoria (RSD) Screener */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartCrack className="h-3 w-3" />
                  DR. WILLIAM DODSON
                </span>
                <span className="text-xs font-semibold text-purple-700">ADHD & Sensitivity</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Rejection Sensitivity (RSD)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Does a change in texting tone feel like an unbearable physical punch to the chest? Measure your rejection dysphoria, visceral shame spirals, and defensive cutoff habits.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/rsd-rejection-sensitivity"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen RSD</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 55: Dopamine Burnout & Digital Overstimulation Screener */}
          <div className="rounded-3xl border border-cyan-300 bg-gradient-to-br from-cyan-500/10 via-blue-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Smartphone className="h-3 w-3" />
                  STANFORD DOPAMINE
                </span>
                <span className="text-xs font-semibold text-cyan-700">Receptor Burnout</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Dopamine Burnout Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Real life feels painfully boring, trapped in mindless feed-scrolling, or irritable when offline? Unpack receptor downregulation and reset your biological motivation baseline.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cyan-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/dopamine-burnout"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-700 transition shadow-xs"
              >
                <span>Screen Dopamine</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 56: Splitting & Black-and-White Polarization Screener */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-slate-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <GitFork className="h-3 w-3" />
                  KERNBERG & LINEHAN DBT
                </span>
                <span className="text-xs font-semibold text-indigo-700">Ego Defense & Binaries</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Splitting & Polarization
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Do you swing between intense idolization and sudden bitter contempt? Evaluate all-or-nothing cognitive filters, relational whiplash, and cultivate grey-area psychological integration.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/splitting-polarization"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Screen Splitting</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 57: Toxic Shame & Defectiveness Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <EyeOff className="h-3 w-3" />
                  JOHN BRADSHAW
                </span>
                <span className="text-xs font-semibold text-rose-700">Identity & Defectiveness</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Toxic Shame & Defectiveness
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Guilt says 'I made a mistake'; toxic shame says 'I am a mistake'. Measure core defectiveness beliefs, persecutory self-contempt, and visceral somatic hiding reflexes.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/toxic-shame"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Toxic Shame</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 58: Betrayal Trauma & Betrayal Blindness Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartCrack className="h-3 w-3" />
                  DR. JENNIFER FREYD
                </span>
                <span className="text-xs font-semibold text-rose-700">Attachment & Deceit</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Betrayal Trauma & Blindness
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Did you overlook obvious signs of deceit to keep your relationship intact? Screen betrayal blindness, gaslighting self-doubt, and visceral gut-brain shock.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/betrayal-trauma"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Betrayal Trauma</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 59: Pathological Demand Avoidance (PDA) Screener */}
          <div className="rounded-3xl border border-teal-300 bg-gradient-to-br from-teal-500/10 via-emerald-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Flame className="h-3 w-3" />
                  ELIZABETH NEWSON PDA
                </span>
                <span className="text-xs font-semibold text-teal-700">Autonomy & Demands</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Demand Avoidance (PDA)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Does being told what to do trigger immediate fight-or-flight panic or task paralysis? Screen pervasive drive for autonomy, internal avoidance, and masking.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/pda-demand-avoidance"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Screen PDA</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 60: Functional Freeze & Somatic State Screener */}
          <div className="rounded-3xl border border-sky-300 bg-gradient-to-br from-sky-500/10 via-blue-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Snowflake className="h-3 w-3" />
                  POLYVAGAL FREEZE
                </span>
                <span className="text-xs font-semibold text-sky-700">Dr. Stephen Porges</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Functional Freeze Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Working and answering emails while feeling completely hollow, numb, and paralyzed inside? Screen dorsal vagal freeze and somatic shutdown.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/functional-freeze"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition shadow-xs"
              >
                <span>Screen Freeze</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 61: Somatic Armoring & Muscular Tension Diagnostic */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Shield className="h-3 w-3" />
                  REICHIAN SEGMENTS
                </span>
                <span className="text-xs font-semibold text-amber-700">Wilhelm Reich & Somatics</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Somatic Armoring Diagnostic
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Does your body carry chronic clenched jaws, locked diaphragms, or rigid psoas muscles? Map where emotional defense is frozen in your physical frame.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/somatic-armoring"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Diagnose Armor</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 62: Depersonalization & Derealization (DPDR) Screener */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Eye className="h-3 w-3" />
                  CAMBRIDGE SCALE (CDS)
                </span>
                <span className="text-xs font-semibold text-purple-700">Sensory Reality State</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                DPDR & Reality Fog Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Feeling detached from your physical body, seeing the world behind a glass wall, or experiencing severe brain fog? Screen depersonalization & derealization safely.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/dpdr"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen DPDR</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 63: Filial Piety Guilt & Enmeshment Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartHandshake className="h-3 w-3" />
                  BOWEN DIFFERENTIATION
                </span>
                <span className="text-xs font-semibold text-rose-700">Family Systems & Guilt</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Filial Piety Guilt Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Struggling with unpayable sacrifice guilt, fear of saying 'no' to parents, or lost identity in family expectations? Assess emotional enmeshment & boundaries.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/filial-guilt"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Assess Guilt</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 64: Autistic & ADHD Masking Screener (CAT-Q) */}
          <div className="rounded-3xl border border-teal-300 bg-gradient-to-br from-teal-500/10 via-cyan-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Smile className="h-3 w-3" />
                  CAT-Q METRIC
                </span>
                <span className="text-xs font-semibold text-teal-700">Social Camouflage</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                CAT-Q Masking Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Exhausted from constantly monitoring eye contact, suppressing stims, and rehearsing scripts to fit in? Measure social compensation & masking burnout.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/cat-q"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-xs"
              >
                <span>Screen Masking</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 65: Pure O & Intrusive Thoughts Screener */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Zap className="h-3 w-3" />
                  PURE O & COGNITIVE ERP
                </span>
                <span className="text-xs font-semibold text-purple-700">Intrusive Thoughts</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Pure O & Intrusive Thoughts
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Terrified by horrifying 'what if' taboo thoughts, mental checking, or false moral guilt? Screen egodystonic intrusions & internal OCD rituals safely.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/pure-o"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen Pure O</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 66: Somatic Rage & Repressed Anger Screener */}
          <div className="rounded-3xl border border-red-300 bg-gradient-to-br from-red-500/10 via-rose-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Flame className="h-3 w-3" />
                  SOMATIC RAGE
                </span>
                <span className="text-xs font-semibold text-red-700">Gabor Maté & Reich</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Repressed Anger & Somatic Rage
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Always smiling on the outside but clenching your jaw, holding shoulder spasms, and silently burning with resentment? Measure somatic rage & anger inversion.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-red-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/repressed-anger"
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition shadow-xs"
              >
                <span>Screen Anger</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 67: Emotional Flashback & C-PTSD Somatic Trigger Screener */}
          <div className="rounded-3xl border border-sky-300 bg-gradient-to-br from-sky-500/10 via-indigo-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartHandshake className="h-3 w-3" />
                  PETE WALKER MODEL
                </span>
                <span className="text-xs font-semibold text-sky-700">C-PTSD Flashbacks</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Emotional Flashback Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Suddenly overwhelmed by visceral dread, feeling tiny, helpless, or under attack by brutal toxic shame? Screen implicit trauma triggers without visual memories.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/emotional-flashback"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition shadow-xs"
              >
                <span>Screen Flashback</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 68: Maladaptive Daydreaming Screener (MDS-16) */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-fuchsia-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Compass className="h-3 w-3" />
                  ELI SOMER MODEL
                </span>
                <span className="text-xs font-semibold text-purple-700">MDS-16 Scale</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Maladaptive Daydreaming Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Pacing in circles, looping epic music tracks, and living in cinematic paracosms for hours while real life slips away? Measure compulsive fantasy immersion.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/maladaptive-daydreaming"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen Daydreaming</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 69: Trauma Bonding & Intermittent Reinforcement Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-red-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartCrack className="h-3 w-3" />
                  BETRAYAL BOND MODEL
                </span>
                <span className="text-xs font-semibold text-rose-700">Patrick Carnes</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Trauma Bonding Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Can't break free from someone who hurts you? Experiencing severe physical withdrawal panic during silence? Screen intermittent reinforcement addiction.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/trauma-bond"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Trauma Bond</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 70: Echoism & Fear of Taking Up Space Screener */}
          <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <VolumeX className="h-3 w-3" />
                  ECHOISM SPECTRUM
                </span>
                <span className="text-xs font-semibold text-emerald-700">Dr. Craig Malkin</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Echoism & Self-Erasure Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Dread taking up space, hate receiving compliments, and feel guilty just having personal needs? Measure echoistic self-erasure and narcissistic partner attraction.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/echoism"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <span>Screen Echoism</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 71: Window of Tolerance & Nervous System Capacity Screener */}
          <div className="rounded-3xl border border-sky-300 bg-gradient-to-br from-sky-500/10 via-cyan-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Activity className="h-3 w-3" />
                  POLYVAGAL MODEL
                </span>
                <span className="text-xs font-semibold text-sky-700">Dr. Dan Siegel</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Window of Tolerance Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Swinging between racing panic/rage (hyperarousal) and sudden brain fog or numbness (hypoarousal)? Assess your autonomic nervous system capacity.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-sky-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/window-of-tolerance"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition shadow-xs"
              >
                <span>Screen Window</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 72: Relationship OCD (ROCD) Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-pink-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Heart className="h-3 w-3" />
                  ROCD MODEL
                </span>
                <span className="text-xs font-semibold text-rose-700">Prof. Guy Doron</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Relationship OCD (ROCD) Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Obsessing over whether your partner is "the one", hyper-fixating on partner flaws, or compulsively checking your feelings? Screen relationship-centered OCD obsessions.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/rocd"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen ROCD</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 73: Gottman Stonewalling & Silent Treatment Screener */}
          <div className="rounded-3xl border border-indigo-300 bg-gradient-to-br from-indigo-500/10 via-slate-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <ShieldAlert className="h-3 w-3" />
                  GOTTMAN MODEL
                </span>
                <span className="text-xs font-semibold text-indigo-700">Dr. John Gottman</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Stonewalling & Silent Treatment Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Does relational conflict trigger overwhelming physiological flooding (over 100 bpm), leading you or your partner to shut down, wall off, or weaponize cold silence?
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/stonewalling"
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
              >
                <span>Screen Stonewalling</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 74: Autistic Burnout & Masking Exhaustion Screener */}
          <div className="rounded-3xl border border-purple-300 bg-gradient-to-br from-purple-500/10 via-violet-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Brain className="h-3 w-3" />
                  AASPIRE MODEL
                </span>
                <span className="text-xs font-semibold text-purple-700">Dr. Dora Raymaker</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Autistic Burnout & Masking Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Experiencing bone-deep exhaustion, sudden speech loss (situational mutism), executive function collapse, or extreme sensory agony? Screen AASPIRE autistic burnout.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/autistic-burnout"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition shadow-xs"
              >
                <span>Screen Burnout</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 75: Anxious-Avoidant Trap & Pursue-Withdraw Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <HeartCrack className="h-3 w-3" />
                  EFT ATTACHMENT
                </span>
                <span className="text-xs font-semibold text-amber-700">Dr. Sue Johnson</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Anxious-Avoidant Trap Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Trapped in the push-pull relationship rollercoaster? Does one partner panic and chase while the other feels suffocated and withdraws? Assess your cycle.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/anxious-avoidant-trap"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs"
              >
                <span>Screen Trap</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 76: Moral Injury & Ethical Betrayal Screener */}
          <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-700 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <ShieldAlert className="h-3 w-3" />
                  MORAL INJURY
                </span>
                <span className="text-xs font-semibold text-amber-800">Dr. Brett Litz &amp; Dr. Jonathan Shay</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Moral Injury &amp; Institutional Betrayal Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Suffering from soul-wounds, institutional betrayal, or forced violation of conscience? Differentiate moral injury and transgression guilt from classic fear-based PTSD.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/moral-injury"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-700 px-4 py-2 text-xs font-bold text-white hover:bg-amber-800 transition shadow-xs"
              >
                <span>Screen Moral Injury</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 77: Weaponized Incompetence & Mental Load Screener */}
          <div className="rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-500/10 via-rose-50 to-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                  <Scale className="h-3 w-3" />
                  FAIR PLAY MODEL
                </span>
                <span className="text-xs font-semibold text-rose-700">Eve Rodsky</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                Weaponized Incompetence &amp; Mental Load Screener
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Does your partner feign helplessness, botch chores on purpose, or ask endless trivial questions until you do it yourself? Measure your labor disparity and cognitive overload.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">~90 Secs · 12 Items</span>
              <Link
                to="/quiz/weaponized-incompetence"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-xs"
              >
                <span>Screen Mental Load</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Country Filter Pills */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-neutral-400 mb-2 text-center uppercase tracking-wider">Select Region / Language:</div>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                  selectedCountry === c.id
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 my-8">
            <p className="text-neutral-500 text-sm">No quizzes found for this filter combination.</p>
            <button
              onClick={() => { setSelectedCountry("ALL"); setSelectedCategory("ALL"); }}
              className="mt-3 text-xs font-semibold text-amber-700 underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredQuizzes.map((quiz: QuizMeta, idx: number) => (
            <React.Fragment key={quiz.id}>
              <div
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5">
                      {quiz.countryFlag && (
                        <span className="text-base">{quiz.countryFlag}</span>
                      )}
                      <span className="inline-block rounded-full bg-amber-100/70 px-3 py-0.5 text-xs font-bold text-amber-900">
                        {quiz.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{quiz.estimatedTime}</span>
                      <span>•</span>
                      <Users className="h-3.5 w-3.5 ml-1" />
                      <span>{quiz.takersCount}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                      <img
                        src={quiz.mascotImage}
                        alt={quiz.shortTitle}
                        className="h-16 w-16 rounded-2xl object-cover border border-amber-100 bg-amber-50/50 p-1 shadow-xs transition group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-amber-700 transition">
                        {quiz.title}
                      </h2>
                      <p className="text-xs font-semibold text-neutral-400 mt-0.5 uppercase tracking-wider">
                        {quiz.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-6">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium">
                    {quiz.questions.length} Quick Questions
                  </span>
                  <Link
                    to={`/quiz/${quiz.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition group-hover:bg-amber-600 shadow-sm"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {idx === 1 && (
                <div className="col-span-1 md:col-span-2 my-1">
                  <AdSenseBanner slot="quiz-hub-feed" format="horizontal" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* In-Feed Google AdSense Banner */}
        <div className="my-8">
          <AdSenseBanner format="auto" />
        </div>

        {/* Why Self-Reflection Quizzes Work */}
        <section className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-amber-50/40 p-8 sm:p-12 mb-16 shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Why Knowing Your Mental State Matters
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              You can't heal wounds you refuse to acknowledge. Nuju's reflection quizzes are designed to help you recognize emotional burdens before they escalate into crisis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Affect Labeling</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                UCLA neuroscience research proves that specifically naming feelings of exhaustion or anxiety instantly reduces amygdala reactivity by up to 40%.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Cognitive Reframing (CBT)</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Test results identify cognitive distortions like catastrophizing or perfectionism, then guide you toward realistic recovery perspectives.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="font-bold text-neutral-900 text-base mb-2">Actionable Next Steps</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Not just meaningless scores. You get 3 micro-recommendations and voice/text journaling templates you can practice immediately in Nuju.
              </p>
            </div>
          </div>
        </section>

        {/* Global Conversion CTA */}
        <section className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-lg mb-16">
          <div className="relative z-10 max-w-xl mx-auto">
            <img src={juMain} alt="Ju mascot" className="h-16 w-16 mx-auto mb-4 rounded-full border-2 border-white/20" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Need a Safe Space to Vent & Release Emotions Daily?
            </h2>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Meet Ju in the Nuju app. Just record your voice for 30 seconds when you're exhausted, and let Ju organize your thoughts with a judgment-free embrace.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <AppStoreCta label="Download Nuju on App Store" />
              <Link to="/app" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition">
                Try Free Web Version
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom Google AdSense Banner */}
        <div className="my-8">
          <AdSenseBanner format="auto" />
        </div>

        {/* Medical & Ethical Disclaimer */}
        <footer className="border-t border-neutral-200 pt-8 pb-12 text-center text-xs text-neutral-400 max-w-2xl mx-auto space-y-2">
          <p className="font-medium text-neutral-500">
            ⚠️ <strong>Ethics & Medical Disclaimer:</strong> Mini tests and quizzes on nuju.app are psychoeducational and self-reflection instruments, not clinical diagnoses or substitutes for professional consultation with a psychologist or psychiatrist.
          </p>
          <p>
            If you are experiencing a mental health crisis, thoughts of self-harm, or severe depression, please contact your nearest emergency mental health service immediately.
          </p>
          <p className="pt-4">
            &copy; {new Date().getFullYear()} Nuju (nuju.app) • All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default QuizHub;

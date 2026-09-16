import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  RotateCcw,
  Sparkles,
  Heart,
  Brain,
  ShieldCheck,
  Copy,
  ChevronRight,
  HelpCircle,
  Download,
  BookOpen,
  PhoneCall,
  AlertTriangle,
  Flame,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import DassShareCardModal from "@/components/DassShareCardModal";
import {
  DASS21_ITEMS,
  DASS21_OPTIONS,
  calculateDass21Result,
  DassEvaluationResult,
  CRISIS_RESOURCES,
  SupportedLang,
} from "@/data/dass21";
import juMain from "@/assets/ju-main.webp";
import { toast } from "sonner";

interface MentalHealthTestProps {
  defaultLang?: SupportedLang;
}

const MentalHealthTest: React.FC<MentalHealthTestProps> = ({ defaultLang = "en" }) => {
  const navigate = useNavigate();

  // Language state: defaults to English (Primary), with instant toggle to DE, FR, ES, ID
  const [lang, setLang] = useState<SupportedLang>(() => {
    if (defaultLang && ["en", "de", "fr", "es", "id"].includes(defaultLang)) return defaultLang;
    try {
      const saved = localStorage.getItem("nuju-dass21-lang") as SupportedLang | null;
      if (saved && ["en", "de", "fr", "es", "id"].includes(saved)) return saved;
      const searchParam = new URLSearchParams(window.location.search).get("lang") as SupportedLang | null;
      if (searchParam && ["en", "de", "fr", "es", "id"].includes(searchParam)) return searchParam;
    } catch {
      // ignore
    }
    return "en";
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<DassEvaluationResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [showCrisisHelp, setShowCrisisHelp] = useState<boolean>(false);

  const handleToggleLang = (newLang: SupportedLang) => {
    setLang(newLang);
    try {
      localStorage.setItem("nuju-dass21-lang", newLang);
    } catch {
      // ignore
    }
    if (result && Object.keys(answers).length === DASS21_ITEMS.length) {
      setResult(calculateDass21Result(answers, newLang));
    }
  };

  const currentQuestion = DASS21_ITEMS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / DASS21_ITEMS.length) * 100);

  const handleSelectScore = (score: number) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(updatedAnswers);

    // If last question, calculate and display results
    if (currentIndex === DASS21_ITEMS.length - 1) {
      finishAssessment(updatedAnswers);
    } else {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        window.scrollTo({ top: 80, behavior: "smooth" });
      }, 220);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 80, behavior: "smooth" });
    }
  };

  const finishAssessment = (finalAnswers: Record<number, number>) => {
    setIsAnalyzing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      const evaluation = calculateDass21Result(finalAnswers, lang);
      setResult(evaluation);
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setIsAnalyzing(false);
    setShowCrisisHelp(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    toast.success(
      lang === "en"
        ? "Journal prompt copied to clipboard! Ready to paste into Nuju."
        : "Prompt journaling berhasil disalin! Siap ditempel ke Nuju."
    );
  };

  const handleOpenJournalWithPrompt = (promptText: string) => {
    try {
      sessionStorage.setItem("nuju-prefilled-prompt", promptText);
    } catch {
      // ignore
    }
    navigate("/app");
  };

  const getPillarLabel = (pillar: "depression" | "anxiety" | "stress") => {
    if (lang === "en") {
      if (pillar === "depression") return "💙 Mood & Emotional Energy";
      if (pillar === "anxiety") return "⚡ Nervous System & Somatic Alarm";
      return "🔥 Cognitive Load & Stress Tension";
    } else {
      if (pillar === "depression") return "💙 Suasana Hati & Energi Emosi";
      if (pillar === "anxiety") return "⚡ Sistem Saraf & Alarm Cemas";
      return "🔥 Beban Kognitif & Ketegangan Stres";
    }
  };

  const crisisList = CRISIS_RESOURCES[lang];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-amber-200">
      <SEOHead
        title={
          lang === "en"
            ? "Free DASS-21 Mental Health Test | Depression, Anxiety, Stress Assessment"
            : "Tes Kesehatan Mental Online Gratis (DASS-21) | Skrining Depresi, Cemas, Stres"
        }
        description={
          lang === "en"
            ? "Evaluate your emotional wellbeing with the validated DASS-21 psychological assessment. 21 questions measuring depression, anxiety, and stress levels with instant CBT insights and Ju mascot feedback."
            : "Ikuti tes kesehatan mental DASS-21 terstandar ilmiah secara gratis. 21 pertanyaan mengukur tingkat depresi, kecemasan, dan stres dengan insight CBT dan rekomendasi pemulihan batin."
        }
        canonical="https://nuju.app/quiz/mental-health-test"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name:
              lang === "en"
                ? "DASS-21 Clinical Mental Health Screener"
                : "Tes Kesehatan Mental DASS-21 Terstandar",
            description:
              lang === "en"
                ? "21-item scientifically validated assessment measuring depression, anxiety, and stress."
                : "Skrining psikologis 21 pertanyaan mengukur depresi, kecemasan, dan stres.",
            about: {
              "@type": "Thing",
              name: "Mental Health & Clinical Psychology",
            },
            provider: {
              "@type": "Organization",
              name: "Nuju",
              url: "https://nuju.app",
            },
            typicalAgeRange: "16-65",
            inLanguage: lang,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is DASS-21?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Depression, Anxiety, and Stress Scale (DASS-21) is a 21-item psychometric instrument developed by Lovibond & Lovibond at the University of New South Wales to measure the dimensional emotional states of depression, anxiety, and tension/stress.",
                },
              },
              {
                "@type": "Question",
                name: "Is DASS-21 a diagnostic tool?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DASS-21 is a validated self-report screening measure rather than a clinical diagnostic tool. It provides insight into severity levels of distress, which can guide self-care, lifestyle adjustments, or professional consultation.",
                },
              },
            ],
          },
        ]}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{lang === "en" ? "All Quizzes" : "Semua Kuis"}</span>
            <span className="sm:hidden">{lang === "en" ? "Back" : "Kembali"}</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <img
              src={juMain}
              alt="Ju mascot"
              className="h-7 w-7 rounded-full object-cover shadow-xs"
            />
            <span className="font-bold text-sm text-neutral-900">
              nuju<span className="text-amber-600">.quiz</span>
            </span>
          </Link>

          {/* Bilingual Language Switcher + App CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-full border border-neutral-300/80 bg-white p-0.5 shadow-xs overflow-x-auto">
              {[
                { code: "en" as const, label: "EN", flag: "🇬🇧", title: "English (Primary)" },
                { code: "de" as const, label: "DE", flag: "🇩🇪", title: "Deutsch" },
                { code: "fr" as const, label: "FR", flag: "🇫🇷", title: "Français" },
                { code: "es" as const, label: "ES", flag: "🇪🇸", title: "Español" },
                { code: "id" as const, label: "ID", flag: "🇮🇩", title: "Bahasa Indonesia" },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleToggleLang(l.code)}
                  className={`rounded-full px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold transition ${
                    lang === l.code
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                  title={l.title}
                >
                  <span className="hidden sm:inline mr-1">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            <Link
              to="/app"
              className="rounded-full bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 transition shadow-xs"
            >
              {lang === "en" ? "Open App" : "Buka App"}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ========================================================= */}
        {/* STATE 1: ANALYZING SPINNER */}
        {/* ========================================================= */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <img
                src={juMain}
                alt="Ju analyzing"
                className="h-24 w-24 rounded-full border-4 border-amber-200 object-cover animate-bounce shadow-md"
              />
              <Sparkles className="absolute -top-2 -right-2 h-7 w-7 text-amber-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {lang === "en"
                ? "Ju is Reading Your Emotional Vital Signs..."
                : "Ju Sedang Membaca Ritme Emosimu..."}
            </h2>
            <p className="mt-2 text-sm text-neutral-500 max-w-md">
              {lang === "en"
                ? "Mapping your responses across the 3 DASS-21 dimensions (Depression, Anxiety, Stress) and crafting your personalized CBT reflection."
                : "Menghubungkan pola jawabanmu dengan skala DASS-21 (Depresi, Kecemasan, Stres) dan menyiapkan panduan refleksi terbaik."}
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* STATE 2: RESULT VIEW */}
        {/* ========================================================= */}
        {!isAnalyzing && result && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Top Scorecard Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-lg">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative z-10">
                {/* Header Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-900">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    {lang === "en"
                      ? "DASS-21 Scientific Screening"
                      : "Skrining Ilmiah DASS-21"}
                  </span>
                  <span className="text-xs font-medium text-neutral-400">
                    {lang === "en" ? "Private • Calculated Locally" : "Privat • Dihitung Lokal"}
                  </span>
                </div>

                {/* Score & Mascot Display */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={result.mascotImage}
                      alt="Ju mood"
                      className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-amber-100 object-cover shadow-md"
                    />
                    <span className="absolute -bottom-2 -right-2 rounded-full bg-white px-2.5 py-1 text-xs font-extrabold shadow-sm border border-neutral-200">
                      {result.wellnessIndex}/100
                    </span>
                  </div>

                  <div className="text-center sm:text-left space-y-2">
                    <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                      {lang === "en"
                        ? "Overall Mental Wellness Index"
                        : "Indeks Kesehatan Mental Nuju"}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                      {result.title}
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                      {result.tagline}
                    </p>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="rounded-2xl bg-[#FAF9F6] p-4 sm:p-5 border border-neutral-200/80 text-sm text-neutral-700 leading-relaxed mb-6">
                  {result.summary}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 transition"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>
                      {lang === "en"
                        ? "Share Story Card"
                        : "Bagikan Kartu Hasil"}
                    </span>
                  </button>

                  <button
                    onClick={handleRetake}
                    className="flex items-center justify-center gap-2 rounded-full border border-neutral-300/80 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{lang === "en" ? "Retake" : "Ulangi"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3-PILLAR SCORE BREAKDOWN */}
            {/* ========================================================= */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    {lang === "en"
                      ? "Your 3-Pillar Breakdown"
                      : "Detail 3 Pilar Kesehatan Mental"}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {lang === "en"
                      ? "Standardized subscale scores (0–42 each) according to clinical DASS-21 criteria."
                      : "Skor subskala terstandar (0–42) berdasarkan kriteria klinis DASS-21."}
                  </p>
                </div>
                <span className="text-xs font-medium text-neutral-400">
                  {lang === "en" ? "Lovibond & Lovibond (1995)" : "Validasi DASS-21"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Depression */}
                <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">💙</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${result.depression.badgeBgClass}`}
                      >
                        {result.depression.severityLabel}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      {lang === "en" ? "Depression Scale" : "Pilar Depresi"}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-neutral-900">
                        {result.depression.score}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">/ 42</span>
                    </div>
                    <div className="mt-3 w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${result.depression.colorClass}`}
                        style={{ width: `${Math.max(8, result.depression.percentage)}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                      {result.depression.description}
                    </p>
                  </div>
                </div>

                {/* 2. Anxiety */}
                <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">⚡</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${result.anxiety.badgeBgClass}`}
                      >
                        {result.anxiety.severityLabel}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      {lang === "en" ? "Anxiety Scale" : "Pilar Kecemasan"}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-neutral-900">
                        {result.anxiety.score}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">/ 42</span>
                    </div>
                    <div className="mt-3 w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${result.anxiety.colorClass}`}
                        style={{ width: `${Math.max(8, result.anxiety.percentage)}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                      {result.anxiety.description}
                    </p>
                  </div>
                </div>

                {/* 3. Stress */}
                <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">🔥</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${result.stress.badgeBgClass}`}
                      >
                        {result.stress.severityLabel}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      {lang === "en" ? "Stress Scale" : "Pilar Stres"}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-neutral-900">
                        {result.stress.score}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">/ 42</span>
                    </div>
                    <div className="mt-3 w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${result.stress.colorClass}`}
                        style={{ width: `${Math.max(8, result.stress.percentage)}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                      {result.stress.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mid-results AdSense Banner */}
            <div className="my-6">
              <AdSenseBanner slot="quiz-dass-result-mid" format="auto" />
            </div>

            {/* ========================================================= */}
            {/* CBT PSYCHOLOGICAL INSIGHTS */}
            {/* ========================================================= */}
            <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  {lang === "en"
                    ? "Cognitive Behavioral Insights (CBT)"
                    : "Wawasan Psikologi Kognitif (CBT)"}
                </h2>
              </div>

              <div className="space-y-3">
                {result.cbtInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-100/60 text-sm text-neutral-700 leading-relaxed"
                  >
                    <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================= */}
            {/* ACTIONABLE STEPS */}
            {/* ========================================================= */}
            <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  {lang === "en"
                    ? "Actionable Micro-Steps for Today"
                    : "Langkah Praktis Pemulihan Hari Ini"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {result.actionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#FAF9F6] p-4 border border-neutral-200/80 text-xs sm:text-sm text-neutral-700 leading-relaxed flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-bold text-emerald-700 mb-1">
                        {lang === "en" ? `Action ${idx + 1}` : `Langkah ${idx + 1}`}
                      </div>
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================= */}
            {/* GUIDED JOURNALING WITH JU (BRIDGE TO NUJU APP) */}
            {/* ========================================================= */}
            <section className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-orange-100/30 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={juMain}
                    alt="Ju prompt"
                    className="h-10 w-10 rounded-full object-cover shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                      {lang === "en"
                        ? "Process This in Your Nuju Journal"
                        : "Rilis Beban Ini Lewat Jurnal Nuju"}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {lang === "en"
                        ? "A personalized reflection prompt crafted for your current state."
                        : "Prompt refleksi terpandu yang disesuaikan khusus untuk kondisimu."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyPrompt(result.recommendedJournalPrompt)}
                  className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-xs"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{lang === "en" ? "Copy Prompt" : "Salin Prompt"}</span>
                </button>
              </div>

              <blockquote className="rounded-2xl bg-white/90 p-4 sm:p-5 border border-amber-200/80 text-sm sm:text-base italic text-neutral-800 font-serif leading-relaxed mb-5 shadow-xs">
                "{result.recommendedJournalPrompt}"
              </blockquote>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenJournalWithPrompt(result.recommendedJournalPrompt)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition shadow-xs"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {lang === "en" ? "Open Nuju App to Reflect" : "Tulis Refleksi di Nuju App"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            {/* Interactive Follow-up Game Card */}
            <section className="overflow-hidden rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1.5 max-w-md">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                    🎮 Mindful Mini-Game
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900">
                    {lang === "en" ? "Need Immediate Relief? Pop Your Stress Bubbles" :
                     lang === "de" ? "Brauchst du sofortige Entlastung? Lass deine Sorgenblasen platzen" :
                     lang === "fr" ? "Besoin d'un apaisement immédiat ? Éclatez vos bulles de stress" :
                     lang === "es" ? "¿Necesitas alivio inmediato? Revienta tus burbujas de estrés" :
                     "Butuh Pelepasan Stres Instan? Letupkan Gelembung Bebanmu"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {lang === "en" ? "Play Ju's Zen Bubble Popper: A 60-second interactive game to shatter mental tension, accompanied by soothing chime acoustics." :
                     lang === "de" ? "Spiele Jus Zen Bubble Popper: Ein 60-Sekunden-Spiel, um mentale Anspannung mit beruhigenden Klängen zu lösen." :
                     lang === "fr" ? "Jouez à Zen Bubble Popper de Ju : 60 secondes pour dissoudre vos tensions mentales avec des sons relaxants." :
                     lang === "es" ? "Juega a Zen Bubble Popper de Ju: Un juego de 60 segundos para liberar tensión mental con sonidos relajantes." :
                     "Mainkan Zen Bubble Popper Ju: Mini-game 60 detik untuk meletupkan uneg-uneg dengan efek suara kristal yang menenangkan."}
                  </p>
                </div>

                <Link
                  to="/game/zen-pop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition flex-shrink-0"
                >
                  <span>
                    {lang === "en" ? "Play Zen Pop (Free)" :
                     lang === "de" ? "Jetzt spielen (Gratis)" :
                     lang === "fr" ? "Jouer gratuitement" :
                     lang === "es" ? "Jugar gratis" :
                     "Mainkan Zen Pop (Gratis)"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* ========================================================= */}
            {/* EMERGENCY HELPLINE & CRISIS DRAWER */}
            {/* ========================================================= */}
            <section className="rounded-2xl border border-neutral-200/80 bg-white p-5 text-neutral-700">
              <button
                type="button"
                onClick={() => setShowCrisisHelp((prev) => !prev)}
                className="w-full flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="h-4 w-4 text-rose-600" />
                  <span className="font-semibold text-sm text-neutral-900 group-hover:text-rose-600 transition">
                    {lang === "en"
                      ? "Need Urgent Support? Free 24/7 Helplines & Crisis Directory"
                      : "Butuh Bantuan Mendesak? Layanan Hotline Darurat 24 Jam Gratis"}
                  </span>
                </div>
                {showCrisisHelp ? (
                  <ChevronUp className="h-4 w-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                )}
              </button>

              {showCrisisHelp && (
                <div className="mt-4 pt-4 border-t border-neutral-200/60 space-y-3">
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {lang === "en"
                      ? "If you or someone you know is in acute emotional distress, having thoughts of self-harm, or in danger, please reach out immediately. You do not have to carry this alone."
                      : "Jika kamu atau kerabatmu sedang mengalami krisis emosional akut, keputusasaan mendalam, atau butuh teman bicara darurat, jangan ragu untuk menghubungi layanan resmi berikut:"}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {crisisList.map((c, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-3.5 text-xs space-y-1"
                      >
                        <div className="font-bold text-neutral-900">{c.name}</div>
                        <div className="font-semibold text-rose-600">{c.contact}</div>
                        <p className="text-neutral-500 leading-snug">{c.description}</p>
                        <span className="inline-block font-medium text-[11px] text-neutral-400 pt-1">
                          ⏰ {c.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Medical Disclaimer */}
            <div className="rounded-2xl border border-neutral-200/60 bg-neutral-100/60 p-4 text-center text-xs text-neutral-400 leading-relaxed">
              <ShieldCheck className="h-4 w-4 inline-block mr-1.5 text-neutral-400" />
              <strong>{lang === "en" ? "Medical Disclaimer: " : "Disclaimer Medis: "}</strong>
              {lang === "en"
                ? "The DASS-21 is a psychological screening instrument intended for personal self-reflection and educational awareness. It is not a clinical diagnosis or a substitute for professional mental health evaluation, medical advice, or psychiatric treatment."
                : "Skrining DASS-21 ini ditujukan untuk sarana refleksi diri dan kesadaran emosional mandiri. Hasil tes ini bukan merupakan diagnosis medis dan tidak menggantikan konsultasi dengan psikolog klinis, psikiater, atau tenaga medis profesional."}
            </div>

            {/* App Store CTA */}
            <AppStoreCta />

            {/* AdSense Banner */}
            <div className="my-6">
              <AdSenseBanner slot="quiz-result-bottom" format="auto" />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STATE 3: QUESTION RUNNER */}
        {/* ========================================================= */}
        {!isAnalyzing && !result && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Info Banner */}
            <div className="text-center max-w-xl mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-900 mb-3 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>
                  {lang === "en"
                    ? "DASS-21 Evidence-Based Checkup"
                    : "Skrining Kesehatan Mental Terstandar"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                {lang === "en"
                  ? "Mental Health & Stress Screener (DASS-21)"
                  : "Tes Skrining Kesehatan Mental (DASS-21)"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                {lang === "en"
                  ? "Please read each statement and select how much it applied to you over the past week. There are no right or wrong answers."
                  : "Baca setiap pernyataan dan pilih seberapa sering hal tersebut terjadi padamu selama 7 hari terakhir. Tidak ada jawaban yang salah."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                <span>
                  {lang === "en"
                    ? `Question ${currentIndex + 1} of ${DASS21_ITEMS.length}`
                    : `Pertanyaan ${currentIndex + 1} dari ${DASS21_ITEMS.length}`}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200/70">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="mb-2">
                <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-600 mb-2">
                  {getPillarLabel(currentQuestion.pillar)}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 leading-snug">
                  {currentQuestion.prompt[lang]}
                </h2>
                {currentQuestion.subprompt && (
                  <p className="mt-2 text-xs sm:text-sm text-neutral-500">
                    {currentQuestion.subprompt[lang]}
                  </p>
                )}
              </div>

              {/* 4 Likert Options */}
              <div className="mt-6 space-y-3">
                {DASS21_OPTIONS.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.score;
                  return (
                    <button
                      key={opt.score}
                      type="button"
                      onClick={() => handleSelectScore(opt.score)}
                      className={`w-full text-left rounded-2xl p-4 sm:p-4.5 border transition-all duration-150 flex items-center justify-between group ${
                        isSelected
                          ? "border-amber-500 bg-amber-50/70 shadow-xs ring-2 ring-amber-400/30"
                          : "border-neutral-200/90 bg-[#FAF9F6]/60 hover:border-neutral-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 pr-2">
                        <span className="text-lg select-none">{opt.icon}</span>
                        <div>
                          <div className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-amber-950">
                            {opt.label[lang]}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {opt.sublabel[lang]}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                          isSelected
                            ? "border-amber-600 bg-amber-600 text-white"
                            : "border-neutral-300 group-hover:border-neutral-400"
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer (Previous Button) */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <button
                  type="button"
                  onClick={handlePreviousQuestion}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 font-semibold text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>{lang === "en" ? "Previous Question" : "Pertanyaan Sebelumnya"}</span>
                </button>

                <span>
                  {lang === "en"
                    ? "Time: ~2 minutes"
                    : "Waktu: ~2 menit"}
                </span>
              </div>
            </div>

            {/* Privacy note */}
            <div className="text-center text-xs text-neutral-400">
              🔒{" "}
              {lang === "en"
                ? "100% Anonymous & Private. No answers are stored on any server."
                : "100% Anonim & Privat. Tidak ada jawaban yang disimpan ke server."}
            </div>

            {/* Question Screen AdSense Banner */}
            <div className="mt-4">
              <AdSenseBanner slot="quiz-question-bottom" format="horizontal" />
            </div>
          </div>
        )}
      </main>

      {/* Share Modal */}
      {result && (
        <DassShareCardModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default MentalHealthTest;

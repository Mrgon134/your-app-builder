import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  BookOpen,
  Brain,
  ShieldAlert,
  Activity,
  HelpCircle,
  Zap,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  WINDOW_OF_TOLERANCE_QUESTIONS,
  WINDOW_OF_TOLERANCE_RESULTS,
  WINDOW_OF_TOLERANCE_OPTIONS,
  WINDOW_OF_TOLERANCE_SUBSCALE_INFO,
  getWindowOfToleranceResult,
  calculateWindowOfToleranceSubscales,
  WindowOfToleranceLang,
} from "@/data/window-of-tolerance";
import { WindowOfToleranceShareCardModal } from "@/components/WindowOfToleranceShareCardModal";
import { WindowOfToleranceScoreResult } from "@/lib/generate-quiz-card";

export default function WindowOfToleranceTest() {
  const [lang, setLang] = useState<WindowOfToleranceLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = WINDOW_OF_TOLERANCE_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return WINDOW_OF_TOLERANCE_OPTIONS.map((opt) => ({
      val: opt.value,
      text: opt.label[lang] || opt.label.en,
    }));
  }, [lang]);

  const handleSelectAnswer = (score: number) => {
    const updated = { ...answers, [currentQuestion.id]: score };
    setAnswers(updated);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const scoreResult: WindowOfToleranceScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getWindowOfToleranceResult(total);
    const rawSubscales = calculateWindowOfToleranceSubscales(answers);

    return {
      score: total,
      percentage,
      level: levelObj.level,
      profile: {
        title: levelObj.title,
        badge: levelObj.badge,
        summary: levelObj.summary,
        neurobiology: levelObj.neurobiology,
        actionProtocol: levelObj.actionProtocol,
      },
      subscales: {
        hyperarousal: {
          score: rawSubscales.hyperarousal,
          percentage: Math.round((rawSubscales.hyperarousal / 16) * 100),
        },
        hypoarousal: {
          score: rawSubscales.hypoarousal,
          percentage: Math.round((rawSubscales.hypoarousal / 16) * 100),
        },
        narrow_capacity: {
          score: rawSubscales.narrow_capacity,
          percentage: Math.round((rawSubscales.narrow_capacity / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel = useMemo(() => {
    return getWindowOfToleranceResult(scoreResult.score);
  }, [scoreResult.score]);

  // Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Window of Tolerance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Window of Tolerance, developed by Dr. Dan Siegel, describes the optimal zone of nervous system arousal where a person can process life, experience emotions, and cope with stressors effectively without exploding into panic or collapsing into numbness.",
        },
      },
      {
        "@type": "Question",
        name: "What happens when you go above or below the window?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Going above the window pushes you into sympathetic hyperarousal (anxiety, racing heartbeat, panic, rage, sensory overload). Dropping below the window triggers dorsal vagal hypoarousal (freeze, brain fog, apathy, depression, and emotional dissociation).",
        },
      },
      {
        "@type": "Question",
        name: "How can you widen your Window of Tolerance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Widening your window involves bottom-up somatic nervous system regulation: physiological sighs (double inhale, long exhale), somatic pendulation, vocal humming/toning to activate the vagus brake, gentle progressive movement, and daily audio journaling to process feelings before overload occurs.",
        },
      },
    ],
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Autonomic Nervous System Window of Tolerance Screener",
    description:
      "A clinical 12-question screener measuring sympathetic hyperarousal, dorsal hypoarousal, and autonomic window constriction based on Dr. Dan Siegel's model.",
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Polyvagal Theory and Somatic Psychology",
    },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Self-assessed frequency rating on a 5-point clinical scale.",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Window of Tolerance: Kapasitas Sistem Saraf Otonom | Nuju"
            : "Window of Tolerance Test: Nervous System Capacity Screener | Nuju"
        }
        description={
          lang === "id"
            ? "Ikuti tes skrining Window of Tolerance 12 pertanyaan (Dr. Dan Siegel & Polyvagal). Ketahui apakah sistem saraf Anda rentan panik hiperarousal atau beku mati rasa."
            : "Evaluate your autonomic nervous system capacity with this 12-item screener based on Dr. Dan Siegel's Window of Tolerance and Polyvagal Theory. Screen hyperarousal, hypoarousal, and vagal resilience."
        }
        canonical="https://nuju.app/quiz/window-of-tolerance"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="min-h-screen bg-[#060D17] text-stone-100 selection:bg-sky-500 selection:text-white pb-20">
        {/* Navigation Bar */}
        <header className="border-b border-sky-950/40 bg-[#0B1525]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes Psikologi" : "All Psychology Tests"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-sky-950/40 p-1 rounded-full border border-sky-900/40 text-xs">
              {(["en", "id", "de", "fr", "es"] as WindowOfToleranceLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition ${
                    lang === l
                      ? "bg-sky-600 text-white shadow-xs"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Top AdSense Banner */}
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <AdSenseBanner slot="quiz-top-banner" format="auto" />
        </div>

        <main className="max-w-3xl mx-auto px-4 pt-6 sm:pt-10">
          {!isCompleted ? (
            /* Quiz Questions Container */
            <div className="space-y-6">
              {/* Header Badge & Title */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
                  <Activity className="h-3.5 w-3.5 text-sky-400" />
                  <span>Dr. Dan Siegel Model · Polyvagal Autonomic Screener</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Window of Tolerance Sistem Saraf"
                    : "Window of Tolerance Screener"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                  {lang === "id"
                    ? "Apakah Anda mudah terlempar antara panik berdebar (hiperarousal) dan otak membeku mati rasa (hipoarousal)? Ukur kapasitas toleransi stres sistem saraf Anda."
                    : "Assess whether your nervous system operates in a resilient wide zone or gets easily thrown into fight-or-flight panic or dorsal freeze collapse."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-400 font-medium">
                  <span>
                    {lang === "id" ? "Pertanyaan" : "Question"} {currentQuestionIndex + 1} /{" "}
                    {questions.length}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-900 border border-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-sky-900/40 bg-gradient-to-b from-[#0F1B2F] to-[#08111F] p-6 sm:p-8 shadow-xl">
                <div className="mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400">
                    {
                      WINDOW_OF_TOLERANCE_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      WINDOW_OF_TOLERANCE_SUBSCALE_INFO[currentQuestion.subscale].name.en
                    }
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-semibold text-white leading-relaxed mb-6">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`group relative flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-medium transition-all ${
                          isSelected
                            ? "border-sky-500 bg-sky-500/20 text-white shadow-lg shadow-sky-950/50"
                            : "border-sky-950/60 bg-sky-950/20 text-stone-300 hover:border-sky-700/50 hover:bg-sky-900/20 hover:text-white"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-sky-400 bg-sky-500 text-white"
                              : "border-stone-700 group-hover:border-stone-500"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back Button */}
                {currentQuestionIndex > 0 && (
                  <div className="mt-6 flex justify-start">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>{lang === "id" ? "Kembali ke soal sebelumnya" : "Previous Question"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Top Result Card */}
              <div className="rounded-3xl border border-sky-500/40 bg-gradient-to-b from-[#0E1A2D] to-[#07101C] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-300">
                      <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                      <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-bold text-black hover:bg-sky-400 transition shadow-md"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{lang === "id" ? "Bagikan Hasil" : "Share Story Card"}</span>
                      </button>

                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 rounded-full border border-stone-800 bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:bg-white/10 transition"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>{lang === "id" ? "Ulangi" : "Retake"}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                      {lang === "id" ? "Hasil Analisis Window of Tolerance" : "Your Autonomic Nervous Profile"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                      {activeLevel.title[lang] || activeLevel.title.en}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
                      {activeLevel.summary[lang] || activeLevel.summary.en}
                    </p>
                  </div>

                  {/* Score Meter Bar */}
                  <div className="rounded-2xl bg-black/40 border border-sky-950 p-4 space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-stone-300">
                        {lang === "id" ? "Beban Disregulasi Otonom" : "Autonomic Dysregulation Score"}
                      </span>
                      <span className="text-lg font-black text-sky-400">
                        {scoreResult.score} / 48 ({scoreResult.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-stone-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400 rounded-full"
                        style={{ width: `${scoreResult.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Subscale Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Subscale 1: Hyperarousal */}
                    <div className="rounded-2xl border border-sky-950 bg-sky-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-amber-400 uppercase">
                        {lang === "id" ? "Hiperarousal (Fight/Flight)" : "Hyperarousal (Sympathetic)"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.hyperarousal.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Jantung berdebar, otot tegang, ledakan amarah, dan overload sensorik."
                          : "Racing thoughts, irritability, adrenaline spikes, and sensory overload."}
                      </p>
                    </div>

                    {/* Subscale 2: Hypoarousal */}
                    <div className="rounded-2xl border border-sky-950 bg-sky-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-cyan-400 uppercase">
                        {lang === "id" ? "Hipoarousal (Freeze/Shutdown)" : "Hypoarousal (Dorsal)"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.hypoarousal.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Mati rasa, otak buntu (brain fog), kelumpuhan prokrastinasi, dan disosiasi."
                          : "Spaced out, numbness, brain fog, couch lock, and emotional paralysis."}
                      </p>
                    </div>

                    {/* Subscale 3: Narrow Capacity */}
                    <div className="rounded-2xl border border-sky-950 bg-sky-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-purple-400 uppercase">
                        {lang === "id" ? "Kerapuhan Kapasitas" : "Micro-Window Fragility"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.narrow_capacity.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Batas toleransi tipis, mudah terpicu, dan ayunan ekstrem antara panik & beku."
                          : "Thin margins of calm, rapid trigger cycling, and slow recovery."}
                      </p>
                    </div>
                  </div>

                  {/* Neurobiology Card */}
                  <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wide">
                      <Brain className="h-4 w-4" />
                      <span>{lang === "id" ? "Wawasan Neurobiologis & Rem Vagus" : "Neurobiology & Polyvagal Circuitry"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                    </p>
                  </div>

                  {/* Action Protocol */}
                  <div className="rounded-2xl border border-sky-950 bg-black/40 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wide">
                      <ShieldAlert className="h-4 w-4 text-sky-400" />
                      <span>{lang === "id" ? "Protokol Regulasi Somatik Harian" : "Somatic Regulation Action Steps"}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                      {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-[11px] font-bold text-sky-300 border border-sky-500/30">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA to Nuju App Voice Journal */}
                  <div className="rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-700 p-6 text-white space-y-4 shadow-xl">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">
                        <Sparkles className="h-3 w-3" />
                        <span>Nuju Voice Journal</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        {lang === "id"
                          ? "Perluas Window of Tolerance Anda Melalui Suara"
                          : "Widen Your Window of Tolerance Through Somatic Audio Journaling"}
                      </h3>
                      <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                        {lang === "id"
                          ? "Berbicara dengan suara sendiri merangsang saraf vagus melalui getaran pita suara. Gunakan Nuju setiap hari untuk meluapkan beban emosional secara teratur sebelum sistem saraf Anda terlempar ke panik atau mati rasa."
                          : "Vocalizing activates the vagus nerve brake through vocal cord vibration and diaphragmatic breath. Use Nuju daily for gentle, unpressured audio reflections to discharge autonomic stress before overflow occurs."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to="/auth"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-extrabold text-sky-950 hover:bg-sky-50 transition shadow"
                      >
                        <span>{lang === "id" ? "Mulai Jurnal Suara Gratis" : "Start Voice Journaling Free"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-black/20 px-4 py-2 text-xs font-semibold text-white hover:bg-black/30 transition"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{lang === "id" ? "Simpan / Share Hasil" : "Save / Share Card"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mid-Page AdSense Banner */}
              <div className="my-6">
                <AdSenseBanner slot="quiz-result-banner" format="auto" />
              </div>

              {/* Clinical Educational Section / FAQ */}
              <div className="rounded-3xl border border-sky-950/60 bg-sky-950/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-5 w-5 text-sky-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {lang === "id"
                      ? "Pertanyaan Umum Mengenai Window of Tolerance"
                      : "Frequently Asked Questions About the Window of Tolerance"}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-sky-950">
                    <h4 className="font-bold text-sky-300">
                      {lang === "id"
                        ? "Kenapa Saya Bisa Merasa Sangat Cemas Tapi Sekaligus Mati Rasa?"
                        : "Why do I feel anxious and numb at the exact same time?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Ini disebut kondisi 'Freeze' atau co-kontraksi otonom. Sistem saraf simpatis Anda menginjak pedal gas (adrenalin, cemas, jantung berdegup), sementara sistem dorsal vagal menginjak rem tangan darurat (kelumpuhan otot, kabut otak). Ini adalah respon protektif tubuh saat stres terasa meluap tanpa jalan keluar."
                        : "This is known as the high-arousal freeze or autonomic co-contraction. The sympathetic fight/flight system presses the gas pedal, while the dorsal vagal circuit slams on the emergency brake simultaneously. It produces intense internal turmoil trapped behind an external mask of paralysis."}
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-sky-950">
                    <h4 className="font-bold text-cyan-300">
                      {lang === "id"
                        ? "Berapa lama waktu yang dibutuhkan untuk memperluas Window of Tolerance?"
                        : "How long does it take to widen your Window of Tolerance?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Neuroplastisitas sistem saraf membutuhkan waktu berminggu-minggu hingga berbulan-bulan melalui pengulangan rasa aman somatik yang konsisten (micro-moments of ventral safety). Praktik reguler seperti voice journaling, orientasi sensorik, dan physiological sigh membantu mielinisasi rem vagus."
                        : "Nervous system neuroplasticity takes consistent practice over weeks and months through micro-moments of safety. Regular somatic practices like physiological sighs, bilateral grounding, and expressive voice reflection gradually build autonomic flexibility."}
                    </p>
                  </div>
                </div>

                {/* Related Tests & Guides */}
                <div className="pt-4 border-t border-sky-950/60">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">
                    {lang === "id" ? "Tes Terkait" : "Related Psychological Screeners"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to="/quiz/nervous-system"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Polyvagal Nervous System State Screener</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/cortisol"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Chronic Cortisol & Adrenal Fatigue Screener</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/sensory-overload"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Sensory Overload & Neurodivergent Burnout</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/echoism"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Echoism & Fear of Taking Up Space</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Card Modal */}
      <WindowOfToleranceShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

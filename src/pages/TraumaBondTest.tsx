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
  HeartCrack,
  HelpCircle,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  TRAUMA_BOND_QUESTIONS,
  TRAUMA_BOND_RESULTS,
  TRAUMA_BOND_OPTIONS,
  TRAUMA_BOND_SUBSCALE_INFO,
  getTraumaBondResult,
  calculateTraumaBondSubscales,
  TraumaBondCardLang,
} from "@/data/trauma-bond";
import { TraumaBondShareCardModal } from "@/components/TraumaBondShareCardModal";
import { TraumaBondScoreResult } from "@/lib/generate-quiz-card";

export default function TraumaBondTest() {
  const [lang, setLang] = useState<TraumaBondCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = TRAUMA_BOND_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return TRAUMA_BOND_OPTIONS.map((opt) => ({
      val: opt.score,
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

  const scoreResult: TraumaBondScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3;
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getTraumaBondResult(total);
    const rawSubscales = calculateTraumaBondSubscales(answers);

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
        intermittent_addiction: {
          score: rawSubscales.intermittent_addiction,
          percentage: Math.round((rawSubscales.intermittent_addiction / 12) * 100),
        },
        cognitive_dissonance_defense: {
          score: rawSubscales.cognitive_dissonance_defense,
          percentage: Math.round((rawSubscales.cognitive_dissonance_defense / 12) * 100),
        },
        identity_erosion: {
          score: rawSubscales.identity_erosion,
          percentage: Math.round((rawSubscales.identity_erosion / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel = useMemo(() => {
    return getTraumaBondResult(scoreResult.score);
  }, [scoreResult.score]);

  // Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Trauma Bond?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A trauma bond is a deep psychological and neurochemical attachment formed between an abused person and their abuser, forged through unpredictable cycles of intense affection, devaluation, and intermittent reinforcement.",
        },
      },
      {
        "@type": "Question",
        name: "Why does breaking up with a toxic person feel like drug withdrawal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Intermittent reinforcement creates massive dopamine spikes when reconciliation happens after danger. During silence or separation, the brain suffers a sharp dopamine and oxytocin crash, triggering physical withdrawal symptoms including insomnia, shaking, nausea, and obsessive craving.",
        },
      },
      {
        "@type": "Question",
        name: "How can I break a trauma bond safely?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Breaking a trauma bond requires radical Zero Contact, shattering the illusion of their 'potential', building an external reality-testing support network, and treating the first 30 to 90 days as biological chemical detoxification.",
        },
      },
    ],
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Trauma Bonding & Intermittent Reinforcement Screener",
    description:
      "A clinical 12-question screener evaluating betrayal bonds, intermittent addiction, cognitive dissonance, and identity erosion.",
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Trauma Psychology and Attachment Theory",
    },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Self-assessed frequency rating on a 4-point clinical scale.",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Trauma Bonding & Hubungan Toksik Indonesia | Nuju"
            : "Trauma Bond Test & Intermittent Reinforcement Screener | Nuju"
        }
        description={
          lang === "id"
            ? "Ikuti tes skrining trauma bonding 12 pertanyaan. Ketahui apakah Anda terikat secara biokimiawi pada pasangan toksik akibat siklus intermittent reinforcement."
            : "Identify trauma bonds, biochemical addiction, and intermittent reinforcement with this 12-question clinical screener based on Dr. Patrick Carnes' model."
        }
        canonical="https://nuju.app/quiz/trauma-bond"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="min-h-screen bg-[#0B0205] text-stone-100 selection:bg-rose-500 selection:text-white pb-20">
        {/* Navigation Bar */}
        <header className="border-b border-rose-950/40 bg-[#14050A]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes Psikologi" : "All Psychology Tests"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-rose-950/40 p-1 rounded-full border border-rose-900/40 text-xs">
              {(["en", "id", "de", "fr", "es"] as TraumaBondCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition ${
                    lang === l
                      ? "bg-rose-600 text-white shadow-xs"
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
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300">
                  <HeartCrack className="h-3.5 w-3.5 text-rose-400" />
                  <span>Dr. Patrick Carnes Model · Betrayal Bond Evaluation</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Trauma Bonding & Hubungan Toksik"
                    : "Trauma Bonding Screener"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                  {lang === "id"
                    ? "Mengapa begitu menyiksa meninggalkan pasangan yang jelas-jelas menyakiti Anda? Evaluasi jeratan biokimiawi dan penguatan intermiten dalam 90 detik."
                    : "Determine if intermittent reinforcement, dopamine-driven withdrawal, and cognitive dissonance have locked you into a trauma bond."}
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
                    className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-rose-950/80 bg-[#16050A]/90 p-6 sm:p-10 shadow-2xl backdrop-blur relative">
                <div className="mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                    {TRAUMA_BOND_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      TRAUMA_BOND_SUBSCALE_INFO[currentQuestion.subscale].name.en}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed min-h-[4rem]">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </h2>

                {/* Option Buttons */}
                <div className="mt-8 space-y-3">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between group ${
                          isSelected
                            ? "border-rose-500 bg-rose-600/20 text-white shadow-md"
                            : "border-rose-950/60 bg-rose-950/20 text-stone-300 hover:border-rose-800/60 hover:bg-rose-900/20 hover:text-white"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium pr-4">{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? "border-rose-400 bg-rose-500 text-white"
                              : "border-stone-700 group-hover:border-rose-500"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back / Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>{lang === "id" ? "Kembali" : "Previous"}</span>
                  </button>
                  <span className="text-stone-500 text-[11px]">100% Private · Zero Data Saved</span>
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Results Top Hero */}
              <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-b from-[#250A14] to-[#120308] p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/20 px-4 py-1 text-xs font-bold text-rose-200 mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-rose-300" />
                  <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {activeLevel.title[lang] || activeLevel.title.en}
                </h2>

                <div className="my-6 inline-flex items-center justify-center gap-3">
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-amber-300">
                    {scoreResult.percentage}%
                  </div>
                  <div className="text-left text-xs sm:text-sm text-stone-300 leading-tight">
                    <div className="font-bold text-white">
                      {lang === "id" ? "Intensitas Trauma Bond" : "Trauma Bond Load"}
                    </div>
                    <div className="text-stone-400">
                      {scoreResult.score} / {questions.length * 3} {lang === "id" ? "poin" : "points"}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
                  {activeLevel.summary[lang] || activeLevel.summary.en}
                </p>

                {/* Share Button & Retake */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:opacity-90 transition"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>
                      {lang === "id"
                        ? "Bagikan Kartu Hasil (Story / Status)"
                        : "Generate Story Share Card"}
                    </span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full border border-rose-800/60 bg-rose-950/40 px-5 py-3 text-xs font-semibold text-stone-300 hover:text-white hover:bg-rose-900/40 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{lang === "id" ? "Ulangi Tes" : "Retake Screener"}</span>
                  </button>
                </div>
              </div>

              {/* Subscales Metric Breakdown */}
              <div className="rounded-3xl border border-rose-950/80 bg-[#16050A]/90 p-6 sm:p-8 backdrop-blur shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <span>
                    {lang === "id"
                      ? "Profil Rincian Subskala Trauma Bonding"
                      : "Trauma Bond Subscale Breakdown"}
                  </span>
                </h3>

                <div className="space-y-6">
                  {/* Intermittent Addiction */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {TRAUMA_BOND_SUBSCALE_INFO.intermittent_addiction.name[lang] ||
                          TRAUMA_BOND_SUBSCALE_INFO.intermittent_addiction.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.intermittent_addiction.score} / 12 (
                        {scoreResult.subscales.intermittent_addiction.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${scoreResult.subscales.intermittent_addiction.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {TRAUMA_BOND_SUBSCALE_INFO.intermittent_addiction.description[lang] ||
                        TRAUMA_BOND_SUBSCALE_INFO.intermittent_addiction.description.en}
                    </p>
                  </div>

                  {/* Cognitive Dissonance & Partner Defense */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {TRAUMA_BOND_SUBSCALE_INFO.cognitive_dissonance_defense.name[lang] ||
                          TRAUMA_BOND_SUBSCALE_INFO.cognitive_dissonance_defense.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.cognitive_dissonance_defense.score} / 12 (
                        {scoreResult.subscales.cognitive_dissonance_defense.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${scoreResult.subscales.cognitive_dissonance_defense.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {TRAUMA_BOND_SUBSCALE_INFO.cognitive_dissonance_defense.description[lang] ||
                        TRAUMA_BOND_SUBSCALE_INFO.cognitive_dissonance_defense.description.en}
                    </p>
                  </div>

                  {/* Identity Erosion & Eggshells */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {TRAUMA_BOND_SUBSCALE_INFO.identity_erosion.name[lang] ||
                          TRAUMA_BOND_SUBSCALE_INFO.identity_erosion.name.en}
                      </span>
                      <span className="text-red-500">
                        {scoreResult.subscales.identity_erosion.score} / 12 (
                        {scoreResult.subscales.identity_erosion.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${scoreResult.subscales.identity_erosion.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {TRAUMA_BOND_SUBSCALE_INFO.identity_erosion.description[lang] ||
                        TRAUMA_BOND_SUBSCALE_INFO.identity_erosion.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Insight */}
              <div className="rounded-3xl border border-rose-950/80 bg-[#16050A]/80 p-6 sm:p-8 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">
                  <Brain className="h-4 w-4" />
                  <span>
                    {lang === "id"
                      ? "Mekanisme Neurobiologi Intermittent Reinforcement"
                      : "Neurobiology & Biochemical Addiction Mechanism"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === "id"
                    ? "Kenapa Putus dari Pasangan Toksik Rasanya Seperti Sakaw?"
                    : "Why Does Separation Feel Like Severe Drug Withdrawal?"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                </p>
              </div>

              {/* Clinical Action Protocols */}
              <div className="rounded-3xl border border-rose-950/80 bg-[#16050A]/80 p-6 sm:p-8 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {lang === "id"
                      ? "Protokol Detoksifikasi & Pemulihan Diri"
                      : "Evidence-Based Somatic Detachment Protocol"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {lang === "id"
                    ? "Langkah Memutus Ikatan Trauma dan Menyelamatkan Diri"
                    : "Steps to Break the Trauma Bond & Reclaim Autonomy"}
                </h3>
                <div className="space-y-3">
                  {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                    (step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* In-App Audio Journaling CTA */}
              <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/60 via-[#230812] to-[#100307] p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Nuju Uncensored Reality Log</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {lang === "id"
                      ? "Kunci Kebenaran Anda di Jurnal Suara Nuju"
                      : "Record Your Truth in Nuju's Voice Journal"}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-lg">
                    {lang === "id"
                      ? "Gunakan jurnal audio Nuju untuk merekam kenyataan pahit tanpa sensor sebelum disonansi kognitif menipu Anda kembali."
                      : "Speak the raw truth out loud into your private Nuju journal. Don't let traumatic amnesia talk you back into the cage."}
                  </p>
                </div>
                <Link
                  to="/app"
                  className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-rose-950 hover:bg-stone-200 transition shadow-md shrink-0"
                >
                  {lang === "id" ? "Coba Jurnal Suara Nuju" : "Open Nuju Voice Journal"}
                </Link>
              </div>

              {/* Bottom AdSense Banner */}
              <div className="mt-8">
                <AdSenseBanner slot="quiz-result-banner" format="auto" />
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <TraumaBondShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

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
  Compass,
  HelpCircle,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  MALADAPTIVE_DAYDREAMING_QUESTIONS,
  MALADAPTIVE_DAYDREAMING_RESULTS,
  MALADAPTIVE_DAYDREAMING_OPTIONS,
  MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO,
  getMaladaptiveDaydreamingResult,
  calculateMaladaptiveDaydreamingSubscales,
  MaladaptiveDaydreamingCardLang,
} from "@/data/maladaptive-daydreaming";
import { MaladaptiveDaydreamingShareCardModal } from "@/components/MaladaptiveDaydreamingShareCardModal";
import { MaladaptiveDaydreamingScoreResult } from "@/lib/generate-quiz-card";

export default function MaladaptiveDaydreamingTest() {
  const [lang, setLang] = useState<MaladaptiveDaydreamingCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = MALADAPTIVE_DAYDREAMING_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return MALADAPTIVE_DAYDREAMING_OPTIONS.map((opt) => ({
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

  const scoreResult: MaladaptiveDaydreamingScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3;
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getMaladaptiveDaydreamingResult(total);
    const rawSubscales = calculateMaladaptiveDaydreamingSubscales(answers);

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
        kinesthetic_pacing: {
          score: rawSubscales.kinesthetic_pacing,
          percentage: Math.round((rawSubscales.kinesthetic_pacing / 12) * 100),
        },
        paracosm_immersion: {
          score: rawSubscales.paracosm_immersion,
          percentage: Math.round((rawSubscales.paracosm_immersion / 12) * 100),
        },
        vocational_distress: {
          score: rawSubscales.vocational_distress,
          percentage: Math.round((rawSubscales.vocational_distress / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel = useMemo(() => {
    return getMaladaptiveDaydreamingResult(scoreResult.score);
  }, [scoreResult.score]);

  // Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Maladaptive Daydreaming (MDS)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maladaptive Daydreaming is a condition characterized by extensive, compulsive fantasy immersion that replaces real human interaction, lasts for hours daily, and interferes with academic, vocational, and personal life, often accompanied by repetitive kinesthetic movements like pacing.",
        },
      },
      {
        "@type": "Question",
        name: "Why do I pace or listen to music while daydreaming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Repetitive physical movement (pacing, rocking, gesturing) and looped music act as sensory catalysts, stimulating the brain's Default Mode Network and motor cortex to generate vivid, highly stimulating cinematic internal worlds.",
        },
      },
      {
        "@type": "Question",
        name: "How can I regain control over excessive daydreaming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Effective grounding techniques include identifying emotional triggers (loneliness, boredom, stress), breaking music loops, working in public spaces to introduce physical friction against pacing, and using audio journaling to unpack unmet needs in reality.",
        },
      },
    ],
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Maladaptive Daydreaming Screener (MDS-16)",
    description:
      "A clinical 12-question screener evaluating immersive daydreaming, kinesthetic pacing, paracosms, and vocational distress.",
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Psychology and Behavioral Science",
    },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Self-assessed rating on a 4-point clinical frequency scale.",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Maladaptive Daydreaming Indonesia (MDS-16) | Nuju"
            : "Maladaptive Daydreaming Test (MDS-16 Scale) | Nuju"
        }
        description={
          lang === "id"
            ? "Ikuti tes skrining maladaptive daydreaming 12 pertanyaan. Ukur tingkat melamun berlebihan, mondar-mandir dengan musik, dan kecanduan dunia fantasi secara gratis."
            : "Assess compulsive fantasy immersion, kinesthetic pacing, and paracosm attachment with this 12-question Maladaptive Daydreaming screener."
        }
        canonical="https://nuju.app/quiz/maladaptive-daydreaming"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="min-h-screen bg-[#070414] text-stone-100 selection:bg-purple-500 selection:text-white pb-20">
        {/* Navigation Bar */}
        <header className="border-b border-purple-900/30 bg-[#0A071E]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes Psikologi" : "All Psychology Tests"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-purple-950/40 p-1 rounded-full border border-purple-800/40 text-xs">
              {(["en", "id", "de", "fr", "es"] as MaladaptiveDaydreamingCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition ${
                    lang === l
                      ? "bg-purple-600 text-white shadow-xs"
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
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
                  <Compass className="h-3.5 w-3.5 text-purple-400" />
                  <span>MDS-16 Clinical Adaptation · Eli Somer Framework</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Maladaptive Daydreaming"
                    : "Maladaptive Daydreaming Screener"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                  {lang === "id"
                    ? "Apakah Anda sering mondar-mandir sambil mendengarkan musik, tenggelam berjam-jam dalam dunia fantasi, dan kesulitan kembali ke dunia nyata?"
                    : "Evaluate the intensity of your fantasy immersion, kinesthetic pacing, music triggers, and real-life vocational impairment in 90 seconds."}
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
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-purple-900/40 bg-[#0F0A28]/80 p-6 sm:p-10 shadow-2xl backdrop-blur relative">
                <div className="mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "border-purple-500 bg-purple-600/20 text-white shadow-md"
                            : "border-purple-950/60 bg-purple-950/20 text-stone-300 hover:border-purple-700/60 hover:bg-purple-900/20 hover:text-white"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-medium pr-4">{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? "border-purple-400 bg-purple-500 text-white"
                              : "border-stone-700 group-hover:border-purple-500"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back / Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-purple-950/60 flex items-center justify-between text-xs">
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
              <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#180F3B] to-[#0D0822] p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/20 px-4 py-1 text-xs font-bold text-purple-200 mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-purple-300" />
                  <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {activeLevel.title[lang] || activeLevel.title.en}
                </h2>

                <div className="my-6 inline-flex items-center justify-center gap-3">
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                    {scoreResult.percentage}%
                  </div>
                  <div className="text-left text-xs sm:text-sm text-stone-300 leading-tight">
                    <div className="font-bold text-white">
                      {lang === "id" ? "Tingkat Beban Fantasi" : "Daydreaming Load"}
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
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:opacity-90 transition"
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
                    className="inline-flex items-center gap-2 rounded-full border border-purple-800/60 bg-purple-950/40 px-5 py-3 text-xs font-semibold text-stone-300 hover:text-white hover:bg-purple-900/40 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{lang === "id" ? "Ulangi Tes" : "Retake Screener"}</span>
                  </button>
                </div>
              </div>

              {/* Subscales Metric Breakdown */}
              <div className="rounded-3xl border border-purple-950/80 bg-[#0F0A28]/90 p-6 sm:p-8 backdrop-blur shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span>
                    {lang === "id"
                      ? "Profil Rincian Subskala Maladaptive Daydreaming"
                      : "Daydreaming Subscale Breakdown"}
                  </span>
                </h3>

                <div className="space-y-6">
                  {/* Kinesthetic Movement & Pacing */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.kinesthetic_pacing.name[lang] ||
                          MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.kinesthetic_pacing.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.kinesthetic_pacing.score} / 12 (
                        {scoreResult.subscales.kinesthetic_pacing.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${scoreResult.subscales.kinesthetic_pacing.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.kinesthetic_pacing.description[lang] ||
                        MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.kinesthetic_pacing.description.en}
                    </p>
                  </div>

                  {/* Paracosm Immersion */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.paracosm_immersion.name[lang] ||
                          MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.paracosm_immersion.name.en}
                      </span>
                      <span className="text-fuchsia-400">
                        {scoreResult.subscales.paracosm_immersion.score} / 12 (
                        {scoreResult.subscales.paracosm_immersion.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-fuchsia-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${scoreResult.subscales.paracosm_immersion.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.paracosm_immersion.description[lang] ||
                        MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.paracosm_immersion.description.en}
                    </p>
                  </div>

                  {/* Vocational Distress */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.vocational_distress.name[lang] ||
                          MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.vocational_distress.name.en}
                      </span>
                      <span className="text-pink-400">
                        {scoreResult.subscales.vocational_distress.score} / 12 (
                        {scoreResult.subscales.vocational_distress.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${scoreResult.subscales.vocational_distress.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.vocational_distress.description[lang] ||
                        MALADAPTIVE_DAYDREAMING_SUBSCALE_INFO.vocational_distress.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Insight */}
              <div className="rounded-3xl border border-purple-900/50 bg-[#0F0A28]/80 p-6 sm:p-8 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">
                  <Brain className="h-4 w-4" />
                  <span>
                    {lang === "id"
                      ? "Mekanisme Neurobiologi Otak"
                      : "Neurobiology & Default Mode Network Mechanism"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === "id"
                    ? "Mengapa Otak Anda Sangat Mengidamkan Melamun?"
                    : "Why Does Your Brain Crave Fantasy Immersion?"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                </p>
              </div>

              {/* Clinical Action Protocols */}
              <div className="rounded-3xl border border-purple-900/50 bg-[#0F0A28]/80 p-6 sm:p-8 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider mb-3">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {lang === "id"
                      ? "Protokol Pemulihan & Grounding Sensori"
                      : "Evidence-Based Grounding Protocol"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {lang === "id"
                    ? "Langkah Efektif Mengendalikan Tarikan Melamun"
                    : "Actionable Steps to Re-Anchor in Physical Reality"}
                </h3>
                <div className="space-y-3">
                  {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                    (step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* In-App Audio Journaling CTA */}
              <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/60 via-[#160B36] to-[#0A051B] p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Nuju Reality Sanctuary</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {lang === "id"
                      ? "Jadikan Suara Anda Sebagai Jangkar ke Dunia Nyata"
                      : "Anchor Your Mind Through Voice Journaling"}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-lg">
                    {lang === "id"
                      ? "Ketika dunia fantasi begitu kuat menarik Anda, bicaralah ke jurnal audio Nuju untuk menguraikan rasa sepi dan stres yang mendasarinya."
                      : "When internal fantasies try to pull you under, speak freely into Nuju's voice journal. Turn compensatory dreams into authentic reality."}
                  </p>
                </div>
                <Link
                  to="/app"
                  className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-purple-950 hover:bg-stone-200 transition shadow-md shrink-0"
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
        <MaladaptiveDaydreamingShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

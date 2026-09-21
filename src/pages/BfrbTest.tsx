import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Share2,
  Layers,
  Heart,
  Hand,
  Activity,
  ShieldAlert,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  BFRB_QUESTIONS,
  BFRB_RESULTS,
  BFRB_OPTIONS,
  BFRB_SUBSCALE_INFO,
  getBfrbResult,
  calculateBfrbSubscales,
  BfrbCardLang,
} from "@/data/bfrb";
import { BfrbShareCardModal } from "@/components/BfrbShareCardModal";
import { BfrbScoreResult } from "@/lib/generate-quiz-card";

export default function BfrbTest() {
  const [lang, setLang] = useState<BfrbCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = BFRB_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return BFRB_OPTIONS.map((opt) => ({
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

  const scoreResult: BfrbScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getBfrbResult(total);
    const rawSubscales = calculateBfrbSubscales(answers);

    return {
      score: total,
      percentage,
      level: levelObj.level,
      profile: {
        title: levelObj.title,
        badge: levelObj.badge,
        summary: levelObj.summary,
        psychology: levelObj.psychology,
        actionProtocol: levelObj.actionProtocol,
      },
      subscales: {
        sensory_urge_tension: {
          score: rawSubscales.sensory_urge_tension,
          percentage: Math.round((rawSubscales.sensory_urge_tension / 12) * 100),
        },
        automatic_vs_focused_compulsion: {
          score: rawSubscales.automatic_vs_focused_compulsion,
          percentage: Math.round((rawSubscales.automatic_vs_focused_compulsion / 12) * 100),
        },
        shame_tissue_damage_concealment: {
          score: rawSubscales.shame_tissue_damage_concealment,
          percentage: Math.round((rawSubscales.shame_tissue_damage_concealment / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getBfrbResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Body-Focused Repetitive Behaviors (BFRB) Screener (MGH-SPS / HRT Model)",
    headline: "BFRB Test: Measure Skin Picking (Excoriation) & Hair Pulling (Trichotillomania)",
    description:
      "Assess sensory urges, tactile scanning, automatic vs. focused compulsions, and tissue damage concealment using validated clinical models by Keuthen and Azrin.",
    url: "https://nuju.app/quiz/bfrb",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Body-Focused Repetitive Behaviors, Dermatillomania, Trichotillomania, Onychophagia",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Habit Reversal Training (HRT)" },
        { "@type": "MedicalTherapy", name: "Comprehensive Behavioral (ComB) Model" },
        { "@type": "MedicalTherapy", name: "Stimulus Control & Competing Responses" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Not at all) to 3 (Constantly / Severe Compulsion)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="BFRB Test: Skin Picking & Hair Pulling Screener (Dermatillomania & Trichotillomania) | Nuju"
        description="Do you compulsively pick your skin, pull hair, or bite nails? Measure your BFRB sensory urges, trance rituals, and tissue damage based on the MGH & HRT models."
        canonicalUrl="https://nuju.app/quiz/bfrb"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-300 shadow-xs">
          <Hand className="w-3.5 h-3.5 text-rose-600" />
          <span>Card #106 Clinical Screener · MGH-SPS & HRT Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Body-Focused Repetitive Behaviors Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Do you struggle with compulsive skin picking (dermatillomania), hair pulling (trichotillomania), or severe nail biting? Assess your sensory urges, trance sessions, and discover practical habit-reversal tools.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as BfrbCardLang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wide transition ${
                lang === l
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-white text-neutral-600 hover:bg-neutral-200/80 border border-neutral-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4">
        {!isCompleted ? (
          /* Quiz Question Flow */
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 transition-all">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>{progressPercent}% completed</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                <Hand className="w-3 h-3 text-rose-600" />
                {BFRB_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  BFRB_SUBSCALE_INFO[currentQuestion.subscale].name.en}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug mb-6">
              {currentQuestion.text[lang] || currentQuestion.text.en}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {answerLabels.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.val;
                return (
                  <button
                    key={opt.val}
                    onClick={() => handleSelectAnswer(opt.val)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-rose-600 bg-rose-50/70 text-rose-950 shadow-xs"
                        : "border-neutral-200 hover:border-rose-300 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-rose-600 bg-rose-600 text-white"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Back */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-semibold transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous question</span>
              </button>
            )}
          </div>
        ) : (
          /* Results Presentation Screen */
          <div className="space-y-6">
            {/* Hero Result Banner */}
            <div className="bg-gradient-to-br from-neutral-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                    <span>Card #106 Diagnostic Result</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    MGH Score: {scoreResult.score} / 36 pts
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {activeProfile.title[lang] || activeProfile.title.en}
                  </h2>
                  <p className="text-rose-300 font-semibold text-sm">
                    {activeProfile.badge[lang] || activeProfile.badge.en} · BFRB Compulsion Burden:{" "}
                    {scoreResult.percentage}%
                  </p>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed pt-1">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Actions: Share High-Res Story Card & Retake */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold text-xs sm:text-sm transition shadow-lg"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share 1080x1350 Story Card</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition border border-white/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Screener</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mid Result Banner Ad */}
            <div className="w-full bg-white rounded-2xl p-2 border border-neutral-200">
              <AdSenseBanner slot="quiz-mid" format="horizontal" />
            </div>

            {/* Subscales Breakdown */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Clinical BFRB Subscales
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Sensory Urge & Tactile Tension */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {BFRB_SUBSCALE_INFO.sensory_urge_tension.name[lang] ||
                        BFRB_SUBSCALE_INFO.sensory_urge_tension.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.sensory_urge_tension.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.sensory_urge_tension.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {BFRB_SUBSCALE_INFO.sensory_urge_tension.description[lang] ||
                      BFRB_SUBSCALE_INFO.sensory_urge_tension.description.en}
                  </p>
                </div>

                {/* 2. Automatic vs. Focused Compulsion */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {BFRB_SUBSCALE_INFO.automatic_vs_focused_compulsion.name[lang] ||
                        BFRB_SUBSCALE_INFO.automatic_vs_focused_compulsion.name.en}
                    </span>
                    <span className="text-orange-600 font-bold">
                      {scoreResult.subscales.automatic_vs_focused_compulsion.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.automatic_vs_focused_compulsion.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {BFRB_SUBSCALE_INFO.automatic_vs_focused_compulsion.description[lang] ||
                      BFRB_SUBSCALE_INFO.automatic_vs_focused_compulsion.description.en}
                  </p>
                </div>

                {/* 3. Shame, Tissue Damage & Concealment */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {BFRB_SUBSCALE_INFO.shame_tissue_damage_concealment.name[lang] ||
                        BFRB_SUBSCALE_INFO.shame_tissue_damage_concealment.name.en}
                    </span>
                    <span className="text-purple-600 font-bold">
                      {scoreResult.subscales.shame_tissue_damage_concealment.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.shame_tissue_damage_concealment.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {BFRB_SUBSCALE_INFO.shame_tissue_damage_concealment.description[lang] ||
                      BFRB_SUBSCALE_INFO.shame_tissue_damage_concealment.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Keuthen MGH Scales & Azrin Habit Reversal Training (HRT)
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Evidence-Based Sensory Substitution & HRT Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-neutral-700 leading-relaxed">{action}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Mascot Ju Safe Sanctuary Box */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    You Don't Have to Hide Behind Shame Anymore
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    BFRBs thrive in isolation and self-disgust. When your hands feel restless and the mirror feels magnetic, open Nuju, do a quick voice check-in, and let Ju guide your nervous system back into somatic calm without self-harm.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition shadow-sm"
                    >
                      <span>Find Safe Grounding on Nuju</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Medical & Clinical Disclaimer:</strong> This screener is an educational self-reflection instrument derived from the Massachusetts General Hospital Skin Picking & Hairpulling Scales and Habit Reversal Training (HRT) literature. It does not replace a formal medical or psychiatric evaluation. If picking or pulling causes severe open wounds, infections, or extreme distress, please seek medical care from a dermatologist or licensed OCD-spectrum therapist.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <BfrbShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

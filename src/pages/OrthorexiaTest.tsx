import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Share2,
  Layers,
  Heart,
  Scale,
  Activity,
  ShieldAlert,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  ORTHOREXIA_QUESTIONS,
  ORTHOREXIA_RESULTS,
  ORTHOREXIA_OPTIONS,
  ORTHOREXIA_SUBSCALE_INFO,
  getOrthorexiaResult,
  calculateOrthorexiaSubscales,
  OrthorexiaCardLang,
} from "@/data/orthorexia";
import { OrthorexiaShareCardModal } from "@/components/OrthorexiaShareCardModal";
import { OrthorexiaScoreResult } from "@/lib/generate-quiz-card";

export default function OrthorexiaTest() {
  const [lang, setLang] = useState<OrthorexiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = ORTHOREXIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return ORTHOREXIA_OPTIONS.map((opt) => ({
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

  const scoreResult: OrthorexiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getOrthorexiaResult(total);
    const rawSubscales = calculateOrthorexiaSubscales(answers);

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
        dietary_moralization_guilt: {
          score: rawSubscales.dietary_moralization_guilt,
          percentage: Math.round((rawSubscales.dietary_moralization_guilt / 12) * 100),
        },
        obsessive_ingredient_vigilance: {
          score: rawSubscales.obsessive_ingredient_vigilance,
          percentage: Math.round((rawSubscales.obsessive_ingredient_vigilance / 12) * 100),
        },
        nutritional_social_isolation: {
          score: rawSubscales.nutritional_social_isolation,
          percentage: Math.round((rawSubscales.nutritional_social_isolation / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getOrthorexiaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Orthorexia Nervosa & Clean Eating Obsession Screener (Bratman ORTO-15 Model)",
    headline: "Orthorexia Test: Measure Healthy Eating Obsession & Food Moralization",
    description:
      "Assess food moralization, obsessive ingredient scrutiny, social eating avoidance, and purity anxiety using the clinical framework by Dr. Steven Bratman and Donini et al.",
    url: "https://nuju.app/quiz/orthorexia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Orthorexia Nervosa, Clean Eating Obsession, Restrictive Eating Disorder",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Eating Disorders (CBT-E)" },
        { "@type": "MedicalTherapy", name: "Intuitive Eating & Food Neutrality Exposure" },
        { "@type": "MedicalTherapy", name: "Nutritional Rehabilitation & Medical Workup" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Flexible Eating) to 3 (Constantly / Severe Obsession)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Orthorexia Test: Clean Eating Obsession & Food Guilt Screener | Nuju"
        description="Has clean eating become a rigid obsession? Measure dietary moralization, ingredient anxiety, and social isolation based on the Bratman ORTO-15 model."
        canonicalUrl="https://nuju.app/quiz/orthorexia"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-300 shadow-xs">
          <Scale className="w-3.5 h-3.5 text-emerald-600" />
          <span>Card #107 Clinical Screener · Bratman ORTO-15 Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Orthorexia Nervosa &amp; Clean Eating Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Has healthy eating turned into a prison of anxiety, ingredient scrutiny, and social isolation? Evaluate your food moralization, dietary rigidity, and relationship with nourishment.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as OrthorexiaCardLang[]).map((l) => (
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
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                <Scale className="w-3 h-3 text-emerald-600" />
                {ORTHOREXIA_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  ORTHOREXIA_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                        ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs"
                        : "border-neutral-200 hover:border-emerald-300 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white"
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
            <div className="bg-gradient-to-br from-neutral-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Card #107 Diagnostic Result</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    ORTO Score: {scoreResult.score} / 36 pts
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {activeProfile.title[lang] || activeProfile.title.en}
                  </h2>
                  <p className="text-emerald-300 font-semibold text-sm">
                    {activeProfile.badge[lang] || activeProfile.badge.en} · Orthorexic Fixation:{" "}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm transition shadow-lg"
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
                <Layers className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Clinical Orthorexia Subscales
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Dietary Moralization & Guilt */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {ORTHOREXIA_SUBSCALE_INFO.dietary_moralization_guilt.name[lang] ||
                        ORTHOREXIA_SUBSCALE_INFO.dietary_moralization_guilt.name.en}
                    </span>
                    <span className="text-emerald-600 font-bold">
                      {scoreResult.subscales.dietary_moralization_guilt.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.dietary_moralization_guilt.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {ORTHOREXIA_SUBSCALE_INFO.dietary_moralization_guilt.description[lang] ||
                      ORTHOREXIA_SUBSCALE_INFO.dietary_moralization_guilt.description.en}
                  </p>
                </div>

                {/* 2. Obsessive Ingredient Vigilance */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {ORTHOREXIA_SUBSCALE_INFO.obsessive_ingredient_vigilance.name[lang] ||
                        ORTHOREXIA_SUBSCALE_INFO.obsessive_ingredient_vigilance.name.en}
                    </span>
                    <span className="text-cyan-600 font-bold">
                      {scoreResult.subscales.obsessive_ingredient_vigilance.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-cyan-600 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.obsessive_ingredient_vigilance.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {ORTHOREXIA_SUBSCALE_INFO.obsessive_ingredient_vigilance.description[lang] ||
                      ORTHOREXIA_SUBSCALE_INFO.obsessive_ingredient_vigilance.description.en}
                  </p>
                </div>

                {/* 3. Nutritional Social Isolation */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {ORTHOREXIA_SUBSCALE_INFO.nutritional_social_isolation.name[lang] ||
                        ORTHOREXIA_SUBSCALE_INFO.nutritional_social_isolation.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.nutritional_social_isolation.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.nutritional_social_isolation.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {ORTHOREXIA_SUBSCALE_INFO.nutritional_social_isolation.description[lang] ||
                      ORTHOREXIA_SUBSCALE_INFO.nutritional_social_isolation.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Dr. Steven Bratman &amp; ORTO-15 Orthorexia Formulation
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Evidence-Based Food Neutrality &amp; CBT-E Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-neutral-700 leading-relaxed">{action}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Mascot Ju Safe Nourishment Box */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Food Should Nourish Your Life, Not Control It
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    When every meal feels like a moral examination and cooking oils trigger panic, you don't have to battle alone. On Nuju, voice-journal your unspoken food anxieties, release perfectionist pressure, and rediscover true emotional peace.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition shadow-sm"
                    >
                      <span>Find Food Peace on Nuju</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Medical &amp; Clinical Disclaimer:</strong> This screener is an educational and self-reflection instrument derived from Dr. Steven Bratman's orthorexia formulation and the ORTO-15 questionnaire. It does not replace a clinical eating disorder diagnosis. If restrictive eating causes significant weight loss, amenorrhea, fatigue, or extreme anxiety, please consult a physician or registered eating disorder specialist immediately.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <OrthorexiaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

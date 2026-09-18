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
  HelpCircle,
  Activity,
  Zap,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  AUTISTIC_BURNOUT_QUESTIONS,
  AUTISTIC_BURNOUT_RESULTS,
  AUTISTIC_BURNOUT_OPTIONS,
  AUTISTIC_BURNOUT_SUBSCALE_INFO,
  getAutisticBurnoutResult,
  calculateAutisticBurnoutSubscales,
  AutisticBurnoutCardLang,
} from "@/data/autistic-burnout";
import { AutisticBurnoutShareCardModal } from "@/components/AutisticBurnoutShareCardModal";
import { AutisticBurnoutScoreResult } from "@/lib/generate-quiz-card";

export default function AutisticBurnoutTest() {
  const [lang, setLang] = useState<AutisticBurnoutCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = AUTISTIC_BURNOUT_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return AUTISTIC_BURNOUT_OPTIONS.map((opt) => ({
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

  const scoreResult: AutisticBurnoutScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getAutisticBurnoutResult(total);
    const rawSubscales = calculateAutisticBurnoutSubscales(answers);

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
        pervasive_exhaustion: {
          score: rawSubscales.pervasive_exhaustion,
          percentage: Math.round((rawSubscales.pervasive_exhaustion / 16) * 100),
        },
        skill_regression: {
          score: rawSubscales.skill_regression,
          percentage: Math.round((rawSubscales.skill_regression / 16) * 100),
        },
        sensory_intolerance: {
          score: rawSubscales.sensory_intolerance,
          percentage: Math.round((rawSubscales.sensory_intolerance / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getAutisticBurnoutResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Autistic Burnout & Masking Exhaustion Screener (AASPIRE Model)",
    headline: "Autistic Burnout Test: Measure Neurodivergent Masking Fatigue & Skill Loss",
    description:
      "Assess whether chronic fatigue, loss of speech/executive function, and sensory overload are signs of autistic burnout using clinical AASPIRE research criteria.",
    url: "https://nuju.app/quiz/autistic-burnout",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Autistic Burnout",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Sensory Deprivation & Radical Rest" },
        { "@type": "MedicalTherapy", name: "Neurodiversity-Affirming Unmasking Protocols" },
        { "@type": "MedicalTherapy", name: "Low-Demand Executive Accommodations" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never) to 4 (Constantly)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Autistic Burnout Test: Screen Masking Exhaustion & Skill Loss (AASPIRE Model)"
        description="Take the evidence-based 12-item Autistic Burnout Screener (Dr. Dora Raymaker model). Measure pervasive exhaustion, executive skill regression, and sensory overload."
        canonical="https://nuju.app/quiz/autistic-burnout"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-purple-500/30">
        {/* Header Navigation */}
        <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              to="/test-psikologi"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Psychology Tests</span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-neutral-800/80 p-1 rounded-full border border-neutral-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as AutisticBurnoutCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-purple-600 text-white shadow-xs"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {/* Top Banner AdSlot */}
          <div className="mb-8">
            <AdSenseBanner slot="quiz-top-banner" format="auto" />
          </div>

          {!isCompleted ? (
            /* Test Question Runner */
            <div className="space-y-6">
              {/* Introduction Banner */}
              <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Brain className="w-3.5 h-3.5" />
                    AASPIRE CLINICAL MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Dora Raymaker & Christina Nicolaidis</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Autistic Burnout & Masking Exhaustion Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Autistic burnout is a pervasive state of profound physical and mental depletion, loss of daily living skills, and heightened sensory intolerance caused by chronic neurotypical camouflaging. Differentiate burnout from standard depression and identify your autonomic state.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-purple-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    {AUTISTIC_BURNOUT_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      AUTISTIC_BURNOUT_SUBSCALE_INFO[currentQuestion.subscale].name.en}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </h2>

                {/* Option Buttons */}
                <div className="space-y-2.5">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between group ${
                          isSelected
                            ? "bg-purple-600/20 border-purple-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-purple-400 bg-purple-500 text-white"
                              : "border-neutral-600 group-hover:border-neutral-400"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-rose-400 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in-50 duration-500">
              {/* Primary Score Banner */}
              <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500 text-white shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-purple-300">
                    Score: {scoreResult.score} / 48 ({scoreResult.percentage}%)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Share Card Modal Trigger */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-purple-600/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Generate Share Card (Story / TikTok)</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Screener</span>
                  </button>
                </div>
              </div>

              {/* Subscale Radar Breakdown */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Neurodivergent Burnout Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Autistic burnout manifests across three distinct dimensions. Review your burden distribution:
                </p>

                <div className="space-y-5">
                  {/* Pervasive Exhaustion */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {AUTISTIC_BURNOUT_SUBSCALE_INFO.pervasive_exhaustion.name[lang] ||
                          AUTISTIC_BURNOUT_SUBSCALE_INFO.pervasive_exhaustion.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.pervasive_exhaustion.score} / 16 (
                        {scoreResult.subscales.pervasive_exhaustion.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.pervasive_exhaustion.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {AUTISTIC_BURNOUT_SUBSCALE_INFO.pervasive_exhaustion.description[lang] ||
                        AUTISTIC_BURNOUT_SUBSCALE_INFO.pervasive_exhaustion.description.en}
                    </p>
                  </div>

                  {/* Skill Regression */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {AUTISTIC_BURNOUT_SUBSCALE_INFO.skill_regression.name[lang] ||
                          AUTISTIC_BURNOUT_SUBSCALE_INFO.skill_regression.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.skill_regression.score} / 16 (
                        {scoreResult.subscales.skill_regression.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.skill_regression.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {AUTISTIC_BURNOUT_SUBSCALE_INFO.skill_regression.description[lang] ||
                        AUTISTIC_BURNOUT_SUBSCALE_INFO.skill_regression.description.en}
                    </p>
                  </div>

                  {/* Sensory Intolerance */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {AUTISTIC_BURNOUT_SUBSCALE_INFO.sensory_intolerance.name[lang] ||
                          AUTISTIC_BURNOUT_SUBSCALE_INFO.sensory_intolerance.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.sensory_intolerance.score} / 16 (
                        {scoreResult.subscales.sensory_intolerance.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.sensory_intolerance.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {AUTISTIC_BURNOUT_SUBSCALE_INFO.sensory_intolerance.description[lang] ||
                        AUTISTIC_BURNOUT_SUBSCALE_INFO.sensory_intolerance.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>The Neurobiology of Autistic Burnout</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-purple-300">Clinical Distinction: </span>
                  Unlike clinical depression (which is characterized by anhedonia and a loss of interest that improves with behavioral activation and socialization), autistic burnout is exacerbated by pushing through or socializing. Recovery requires radical withdrawal of masking and total sensory downtime.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  <span>Radical Rest & Sensory Recovery Steps</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  ZERO-DEMAND UNMASKING
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  When Talking to People Hurts, Talk to Yourself Without Censorship
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  During autistic burnout, eye contact, tone management, and conversational etiquette cause physical agony. Nuju provides an end-to-end encrypted voice sanctuary where you can whisper, stutter, vent, or hum without social performance.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition shadow-lg shadow-purple-600/25"
                >
                  <span>Experience Encrypted Voice Journaling Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* AdSense Result Banner */}
              <div className="pt-2">
                <AdSenseBanner slot="quiz-result-banner" format="auto" />
              </div>

              {/* Related Mental Health Tests */}
              <div className="pt-4 border-t border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">
                  Explore Complementary Screeners
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to="/quiz/cat-q"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-purple-400 mb-1 block">CAT-Q Test</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition">
                      Autistic Camouflaging & Masking Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/window-of-tolerance"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-sky-400 mb-1 block">Polyvagal Model</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
                      Window of Tolerance Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/sensory"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-amber-400 mb-1 block">HSP / SPS Model</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      Sensory Processing Sensitivity Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/functional-freeze"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-emerald-400 mb-1 block">Polyvagal Freeze</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                      Functional Freeze & Collapse Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <AutisticBurnoutShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

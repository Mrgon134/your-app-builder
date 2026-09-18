import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Brain,
  ShieldAlert,
  Activity,
  HeartOff,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  DATING_FATIGUE_QUESTIONS,
  DATING_FATIGUE_RESULTS,
  DATING_FATIGUE_OPTIONS,
  DATING_FATIGUE_SUBSCALE_INFO,
  getDatingFatigueResult,
  calculateDatingFatigueSubscales,
  DatingFatigueCardLang,
} from "@/data/dating-fatigue";
import { DatingFatigueShareCardModal } from "@/components/DatingFatigueShareCardModal";
import { DatingFatigueScoreResult } from "@/lib/generate-quiz-card";

export default function DatingFatigueTest() {
  const [lang, setLang] = useState<DatingFatigueCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = DATING_FATIGUE_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return DATING_FATIGUE_OPTIONS.map((opt) => ({
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

  const scoreResult: DatingFatigueScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getDatingFatigueResult(total);
    const rawSubscales = calculateDatingFatigueSubscales(answers);

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
        swipe_apathy: {
          score: rawSubscales.swipe_apathy,
          percentage: Math.round((rawSubscales.swipe_apathy / 16) * 100),
        },
        paradox_of_choice: {
          score: rawSubscales.paradox_of_choice,
          percentage: Math.round((rawSubscales.paradox_of_choice / 16) * 100),
        },
        rejection_desensitization: {
          score: rawSubscales.rejection_desensitization,
          percentage: Math.round((rawSubscales.rejection_desensitization / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getDatingFatigueResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Dating Fatigue & Paradox of Choice Screener (Dr. Barry Schwartz Model)",
    headline: "Dating Fatigue Test: Measure Swipe Burnout, Choice Paradox & Romantic Numbness",
    description:
      "Assess whether dating apps, ghosting weariness, and the illusion of infinite choice are causing romantic burnout, emotional numbing, and analysis paralysis.",
    url: "https://nuju.app/quiz/dating-fatigue",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Dating App Burnout & Romantic Desensitization",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Dopamine App Detox & Slow Dating Protocols" },
        { "@type": "MedicalTherapy", name: "Acceptance of Relational Imperfection (Barry Schwartz Model)" },
        { "@type": "MedicalTherapy", name: "Somatic Emotional Re-sensitization" },
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
        title="Dating Fatigue Test: Screen Dating App Burnout & The Paradox of Choice"
        description="Take the evidence-based 12-item Dating Fatigue Screener (Dr. Barry Schwartz & Dr. Eli Finkel model). Measure swipe apathy, choice paralysis, and romantic cynicism."
        canonical="https://nuju.app/quiz/dating-fatigue"
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
              {(["en", "id", "de", "fr", "es"] as DatingFatigueCardLang[]).map((l) => (
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
                    <HeartOff className="w-3.5 h-3.5" />
                    PARADOX OF CHOICE MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Barry Schwartz &amp; Dr. Eli Finkel</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Dating Fatigue &amp; Paradox of Choice Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Modern dating apps promised infinite romantic abundance, but instead delivered swipe apathy, checklist perfectionism, and emotional numbing. Assess whether digital dating algorithms have compromised your capacity for genuine romantic connection and vulnerability.
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
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    {DATING_FATIGUE_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      DATING_FATIGUE_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                    <span>Generate Share Card (Story / Social)</span>
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

              {/* Subscale Breakdown */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Dating App Burnout Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Dating fatigue is driven by three distinct algorithmic dynamics. Review your burden distribution:
                </p>

                <div className="space-y-5">
                  {/* Swipe Apathy */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {DATING_FATIGUE_SUBSCALE_INFO.swipe_apathy.name[lang] ||
                          DATING_FATIGUE_SUBSCALE_INFO.swipe_apathy.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.swipe_apathy.score} / 16 (
                        {scoreResult.subscales.swipe_apathy.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.swipe_apathy.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {DATING_FATIGUE_SUBSCALE_INFO.swipe_apathy.description[lang] ||
                        DATING_FATIGUE_SUBSCALE_INFO.swipe_apathy.description.en}
                    </p>
                  </div>

                  {/* Paradox of Choice */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {DATING_FATIGUE_SUBSCALE_INFO.paradox_of_choice.name[lang] ||
                          DATING_FATIGUE_SUBSCALE_INFO.paradox_of_choice.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.paradox_of_choice.score} / 16 (
                        {scoreResult.subscales.paradox_of_choice.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.paradox_of_choice.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {DATING_FATIGUE_SUBSCALE_INFO.paradox_of_choice.description[lang] ||
                        DATING_FATIGUE_SUBSCALE_INFO.paradox_of_choice.description.en}
                    </p>
                  </div>

                  {/* Rejection Desensitization */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {DATING_FATIGUE_SUBSCALE_INFO.rejection_desensitization.name[lang] ||
                          DATING_FATIGUE_SUBSCALE_INFO.rejection_desensitization.name.en}
                      </span>
                      <span className="text-purple-400">
                        {scoreResult.subscales.rejection_desensitization.score} / 16 (
                        {scoreResult.subscales.rejection_desensitization.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.rejection_desensitization.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {DATING_FATIGUE_SUBSCALE_INFO.rejection_desensitization.description[lang] ||
                        DATING_FATIGUE_SUBSCALE_INFO.rejection_desensitization.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>The Neurobiology of the Variable-Reward Swiping Loop</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-purple-300">Clinical Psychology Insight: </span>
                  Dating applications are intentionally designed using B.F. Skinner&apos;s operant conditioning variable-ratio reward schedules—the exact mechanism behind Las Vegas slot machines. You are not addicted to the people; you are addicted to the anticipation of the next match notification. Recovery requires re-sensitizing dopamine pathways and returning to embodied human presence.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  <span>Slow Dating &amp; Dopamine Reset Protocol</span>
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
                  UNCENSORED DATING DETOX
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Vent the Post-Date Emptiness Without Masking or Self-Judgment
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  After another sterile dinner, sudden ghosting, or swiping marathon, your nervous system feels drained. Nuju gives you an end-to-end encrypted audio haven where you can whisper your loneliness, deconstruct your dating boundaries, and reconnect with your authentic worth without performing for an algorithm.
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
                    to="/quiz/anxious-avoidant-trap"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Attachment Dance</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Anxious-Avoidant Trap Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/limerence"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-pink-400 mb-1 block">Obsessive Crush</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-pink-300 transition">
                      Limerence vs Authentic Love Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/dopamine-burnout"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-amber-400 mb-1 block">Dopamine Balance</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      Dopamine Burnout &amp; Anhedonia Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/fear-of-being-perceived"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-indigo-400 mb-1 block">Social Vulnerability</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">
                      Fear of Being Perceived Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <DatingFatigueShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

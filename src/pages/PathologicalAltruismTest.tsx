import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  HeartHandshake,
  ShieldAlert,
  BatteryWarning,
  Activity,
  UserCheck,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  PATHOLOGICAL_ALTRUISM_QUESTIONS,
  PATHOLOGICAL_ALTRUISM_RESULTS,
  PATHOLOGICAL_ALTRUISM_OPTIONS,
  PATHOLOGICAL_ALTRUISM_SUBSCALE_INFO,
  getPathologicalAltruismResult,
  calculatePathologicalAltruismSubscales,
  PathologicalAltruismCardLang,
} from "@/data/pathological-altruism";
import { PathologicalAltruismShareCardModal } from "@/components/PathologicalAltruismShareCardModal";
import { PathologicalAltruismScoreResult } from "@/lib/generate-quiz-card";

export default function PathologicalAltruismTest() {
  const [lang, setLang] = useState<PathologicalAltruismCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = PATHOLOGICAL_ALTRUISM_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return PATHOLOGICAL_ALTRUISM_OPTIONS.map((opt) => ({
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

  const scoreResult: PathologicalAltruismScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getPathologicalAltruismResult(total);
    const rawSubscales = calculatePathologicalAltruismSubscales(answers);

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
        destructive_rescuing_compulsion: {
          score: rawSubscales.destructive_rescuing_compulsion,
          percentage: Math.round((rawSubscales.destructive_rescuing_compulsion / 12) * 100),
        },
        enabler_boundary_erosion: {
          score: rawSubscales.enabler_boundary_erosion,
          percentage: Math.round((rawSubscales.enabler_boundary_erosion / 12) * 100),
        },
        martyrdom_depletion: {
          score: rawSubscales.martyrdom_depletion,
          percentage: Math.round((rawSubscales.martyrdom_depletion / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getPathologicalAltruismResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Pathological Altruism & Savior Complex Screener (Dr. Barbara Oakley Model)",
    headline: "Pathological Altruism Test: Measure Destructive Rescuing, Enabler Erosion & Martyrdom Burnout",
    description:
      "Evaluate whether your urge to help, fix, and rescue others is actually harming them and depleting your nervous system according to Dr. Barbara Oakley and Dr. Rachel Naomi Remen.",
    url: "https://nuju.app/quiz/pathological-altruism",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Pathological Altruism & Compulsive Savior Complex",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Somatic Guilt Tolerance & Boundary Setting" },
        { "@type": "MedicalTherapy", name: "Karpman Drama Triangle Decoupling" },
        { "@type": "MedicalTherapy", name: "Private Voice Boundary Check-ins" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Rarely) to 3 (Almost Always / Constant)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Pathological Altruism Test: Screen Savior Complex & Destructive Rescuing"
        description="Take the evidence-based 12-item Pathological Altruism & Savior Complex Screener (Dr. Barbara Oakley model). Free, anonymous, and instant clinical clarity."
        canonical="https://nuju.app/quiz/pathological-altruism"
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
              {(["en", "id", "de", "fr", "es"] as PathologicalAltruismCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-purple-600 text-white shadow-xs font-bold"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Top AdSense Banner */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <AdSenseBanner slot="quiz-top-banner" />
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {!isCompleted ? (
            <div>
              {/* Screener Header Card */}
              <div className="mb-8 p-6 rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-950 shadow-xl">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Dr. Barbara Oakley &amp; Dr. Rachel Naomi Remen Model</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Pathological Altruism &amp; Savior Complex Screener
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Does saying "no" induce unbearable bodily guilt? Do you rescue people from natural consequences until you collapse?
                  This 12-item screener assesses destructive rescuing, enabler boundary erosion, and martyrdom burnout.
                </p>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="font-semibold text-purple-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Question Box */}
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-xl backdrop-blur-sm">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                  Dimension: {PATHOLOGICAL_ALTRUISM_SUBSCALE_INFO[currentQuestion.subscale].name[lang] || PATHOLOGICAL_ALTRUISM_SUBSCALE_INFO[currentQuestion.subscale].name.en}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3">
                  {answerLabels.map((option) => (
                    <button
                      key={option.val}
                      onClick={() => handleSelectAnswer(option.val)}
                      className={`w-full p-4 rounded-2xl border text-left font-medium transition flex items-center justify-between group ${
                        answers[currentQuestion.id] === option.val
                          ? "border-purple-500 bg-purple-500/10 text-white"
                          : "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                      }`}
                    >
                      <span className="text-sm sm:text-base">{option.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                          answers[currentQuestion.id] === option.val
                            ? "border-purple-500 bg-purple-500 text-white"
                            : "border-neutral-700 group-hover:border-neutral-500"
                        }`}
                      >
                        {answers[currentQuestion.id] === option.val && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Back Button */}
                {currentQuestionIndex > 0 && (
                  <div className="mt-6 flex justify-start">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition px-3 py-2 rounded-xl hover:bg-neutral-800"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Question</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Primary Score Overview */}
              <div className="p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-neutral-900 to-neutral-950 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-xs"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Story Card</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h2>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-purple-400">{scoreResult.score}</span>
                  <span className="text-neutral-500 font-semibold text-lg">/ 36 pts</span>
                  <span className="text-xs font-bold text-purple-300/80 ml-2">
                    ({scoreResult.percentage}% Savior Dynamic Load)
                  </span>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Subscales Matrix */}
                <div className="pt-6 border-t border-neutral-800/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                    Subscale Intensity Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Subscale 1 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Compulsive Rescuing
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.destructive_rescuing_compulsion.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${scoreResult.subscales.destructive_rescuing_compulsion.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 2 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Enabling &amp; Boundary Erosion
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.enabler_boundary_erosion.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${scoreResult.subscales.enabler_boundary_erosion.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 3 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Martyrdom &amp; Depletion
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.martyrdom_depletion.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${scoreResult.subscales.martyrdom_depletion.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AdSense In-Result Slot */}
              <AdSenseBanner slot="quiz-result-banner" />

              {/* Clinical Architecture Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-lg">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Psychology of Harmful Helping</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Helping vs. Fixing: Why Unconscious Rescuing Disempowers Others
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.psychology[lang] || activeProfile.psychology.en}
                </p>
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 text-xs text-purple-200 leading-relaxed">
                  <strong>Dr. Rachel Naomi Remen Insight:</strong> "Helping, fixing, and serving represent three different ways of seeing life.
                  When you help, you see life as weak. When you fix, you see life as broken. When you serve, you see life as whole."
                  Pathological altruism is often an unconscious attempt to fix your own disowned vulnerability through other people.
                </div>
              </div>

              {/* Action Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Sovereign Boundary Protocol</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  3 Clinical Practices to Reclaim Your Sovereignty
                </h3>
                <ul className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Nuju Voice Journaling CTA */}
              <div className="p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/30 via-neutral-900 to-neutral-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
                    Zero-Knowledge Encrypted Self-Reclamation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Drop the Savior Armor in Nuju's Private Vault
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                    Who takes care of the person who takes care of everyone else? Speak your exhausted truths, unspoken resentment,
                    and boundaries into Nuju's zero-knowledge encrypted voice diary. Give yourself the care you always shower on others.
                  </p>
                </div>
                <a
                  href="https://nuju.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition shadow-lg shrink-0"
                >
                  Start Reclaiming Yourself
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <PathologicalAltruismShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

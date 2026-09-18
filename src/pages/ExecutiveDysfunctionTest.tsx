import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Zap,
  Clock,
  Layers,
  Brain,
  ShieldAlert,
  Activity,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  EXECUTIVE_DYSFUNCTION_QUESTIONS,
  EXECUTIVE_DYSFUNCTION_RESULTS,
  EXECUTIVE_DYSFUNCTION_OPTIONS,
  EXECUTIVE_DYSFUNCTION_SUBSCALE_INFO,
  getExecutiveDysfunctionResult,
  calculateExecutiveDysfunctionSubscales,
  ExecutiveDysfunctionCardLang,
} from "@/data/executive-dysfunction";
import { ExecutiveDysfunctionShareCardModal } from "@/components/ExecutiveDysfunctionShareCardModal";
import { ExecutiveDysfunctionScoreResult } from "@/lib/generate-quiz-card";

export default function ExecutiveDysfunctionTest() {
  const [lang, setLang] = useState<ExecutiveDysfunctionCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = EXECUTIVE_DYSFUNCTION_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return EXECUTIVE_DYSFUNCTION_OPTIONS.map((opt) => ({
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

  const scoreResult: ExecutiveDysfunctionScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getExecutiveDysfunctionResult(total);
    const rawSubscales = calculateExecutiveDysfunctionSubscales(answers);

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
        task_initiation_activation_barrier: {
          score: rawSubscales.task_initiation_activation_barrier,
          percentage: Math.round((rawSubscales.task_initiation_activation_barrier / 12) * 100),
        },
        working_memory_object_impermanence: {
          score: rawSubscales.working_memory_object_impermanence,
          percentage: Math.round((rawSubscales.working_memory_object_impermanence / 12) * 100),
        },
        time_blindness_urgency_dependence: {
          score: rawSubscales.time_blindness_urgency_dependence,
          percentage: Math.round((rawSubscales.time_blindness_urgency_dependence / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getExecutiveDysfunctionResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Executive Dysfunction & Task Paralysis Screener (Dr. Russell Barkley ADHD Model)",
    headline: "Executive Dysfunction Test: Measure Task Paralysis, Working Memory & Time Blindness",
    description:
      "Assess whether intention-to-action gaps, cognitive paralysis, and urgency-dependent motivation reflect prefrontal executive dysfunction using Dr. Russell Barkley and Dr. Thomas Brown's clinical framework.",
    url: "https://nuju.app/quiz/executive-dysfunction",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Executive Dysfunction & ADHD Task Paralysis",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Externalized Working Memory & Audio Brain Dumps" },
        { "@type": "MedicalTherapy", name: "Micro-Activation 2-Minute Dopamine Ramp" },
        { "@type": "MedicalTherapy", name: "Point-of-Performance Scaffolding" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Rarely) to 3 (Almost Constantly / Severely Impaired)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Executive Dysfunction Test: Screen Task Paralysis, ADHD & Time Blindness"
        description="Take the clinically referenced 12-item Executive Dysfunction Screener (Dr. Russell Barkley ADHD model). Free, anonymous, and instant insight into task paralysis and working memory barriers."
        canonical="https://nuju.app/quiz/executive-dysfunction"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-sky-500/30">
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
              {(["en", "id", "de", "fr", "es"] as ExecutiveDysfunctionCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-sky-500 text-neutral-950 shadow-xs font-bold"
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
              <div className="mb-8 p-6 rounded-3xl border border-neutral-800 bg-gradient-to-br from-sky-950/25 via-neutral-900/50 to-neutral-950 shadow-xl">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Brain className="w-4 h-4" />
                  <span>Dr. Russell Barkley &amp; Dr. Thomas Brown ADHD Model</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Executive Dysfunction &amp; Task Paralysis Screener
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Do you stare at your screen for hours screaming internally to start, yet feel physically glued to your seat?
                  Executive dysfunction is not laziness—it is a neurochemical initiation barrier. This 12-item screener assesses activation friction, working memory impermanence, and time blindness.
                </p>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="font-semibold text-sky-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Question Box */}
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-xl backdrop-blur-sm">
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3">
                  Dimension: {EXECUTIVE_DYSFUNCTION_SUBSCALE_INFO[currentQuestion.subscale].name[lang] || EXECUTIVE_DYSFUNCTION_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                          ? "border-sky-500 bg-sky-500/15 text-white"
                          : "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                      }`}
                    >
                      <span className="text-sm sm:text-base">{option.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                          answers[currentQuestion.id] === option.val
                            ? "border-sky-400 bg-sky-500 text-neutral-950"
                            : "border-neutral-700 group-hover:border-neutral-500"
                        }`}
                      >
                        {answers[currentQuestion.id] === option.val && (
                          <div className="w-2 h-2 rounded-full bg-neutral-950" />
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
              <div className="p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-sky-950/40 via-neutral-900 to-neutral-950 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-neutral-950 text-xs font-bold transition shadow-xs"
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
                  <span className="text-5xl font-black text-sky-400">{scoreResult.score}</span>
                  <span className="text-neutral-500 font-semibold text-lg">/ 36 pts</span>
                  <span className="text-xs font-bold text-sky-300/80 ml-2">
                    ({scoreResult.percentage}% Executive Friction Load)
                  </span>
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Subscales Matrix */}
                <div className="pt-6 border-t border-neutral-800/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                    Prefrontal Dimension Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Subscale 1 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Task Initiation Barrier
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.task_initiation_activation_barrier.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.task_initiation_activation_barrier.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 2 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Working Memory
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.working_memory_object_impermanence.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.working_memory_object_impermanence.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 3 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Time Blindness &amp; Urgency
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.time_blindness_urgency_dependence.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.time_blindness_urgency_dependence.percentage}%` }}
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
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Dr. Russell Barkley Neuroscience Insight</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Why Executive Dysfunction Is an Intention-to-Action Breakdown
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.psychology[lang] || activeProfile.psychology.en}
                </p>
                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-800/30 text-xs text-sky-200 leading-relaxed">
                  <strong>The Barkley Rule:</strong> Executive dysfunction is not an issue of knowing what to do, but of doing what you know at the point of performance. Moralizing inability to start as laziness generates toxic guilt that raises cortisol and further locks prefrontal dopamine pathways.
                </div>
              </div>

              {/* Action Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Executive Activation Protocol</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  3 Prefrontal Hacks to Bypass Cognitive Paralysis
                </h3>
                <ul className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Nuju Voice Journaling CTA */}
              <div className="p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-sky-900/20 via-neutral-900 to-neutral-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
                    Zero-Friction External Working Memory
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Unclog Your Prefrontal Brain in Nuju
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                    When tasks pile up and typing or organizing feels like climbing an impossible mountain, tap record and dump your unfiltered thoughts into Nuju&apos;s zero-knowledge encrypted audio sanctuary. Externalize cognitive load instantly and dissolve task paralysis without shame.
                  </p>
                </div>
                <a
                  href="https://nuju.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold text-sm transition shadow-lg shrink-0"
                >
                  Bypass Paralysis with Audio in Nuju
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <ExecutiveDysfunctionShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

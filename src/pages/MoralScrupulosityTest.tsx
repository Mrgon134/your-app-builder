import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Scale,
  Brain,
  Activity,
  HeartCrack,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  MORAL_SCRUPULOSITY_QUESTIONS,
  MORAL_SCRUPULOSITY_RESULTS,
  MORAL_SCRUPULOSITY_OPTIONS,
  MORAL_SCRUPULOSITY_SUBSCALE_INFO,
  getMoralScrupulosityResult,
  calculateMoralScrupulositySubscales,
  MoralScrupulosityCardLang,
} from "@/data/moral-scrupulosity";
import { MoralScrupulosityShareCardModal } from "@/components/MoralScrupulosityShareCardModal";
import { MoralScrupulosityScoreResult } from "@/lib/generate-quiz-card";

export default function MoralScrupulosityTest() {
  const [lang, setLang] = useState<MoralScrupulosityCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = MORAL_SCRUPULOSITY_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return MORAL_SCRUPULOSITY_OPTIONS.map((opt) => ({
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

  const scoreResult: MoralScrupulosityScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getMoralScrupulosityResult(total);
    const rawSubscales = calculateMoralScrupulositySubscales(answers);

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
        moral_purity_hypervigilance: {
          score: rawSubscales.moral_purity_hypervigilance,
          percentage: Math.round((rawSubscales.moral_purity_hypervigilance / 12) * 100),
        },
        guilt_magnification_confession: {
          score: rawSubscales.guilt_magnification_confession,
          percentage: Math.round((rawSubscales.guilt_magnification_confession / 12) * 100),
        },
        ethical_perfectionism_paralysis: {
          score: rawSubscales.ethical_perfectionism_paralysis,
          percentage: Math.round((rawSubscales.ethical_perfectionism_paralysis / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getMoralScrupulosityResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Moral Scrupulosity & Pure OCD Screener (Dr. Ian Osborn & Dr. Jonathan Grayson Model)",
    headline: "Moral Scrupulosity Test: Screen 'Am I a Bad Person?' Guilt & Moral OCD",
    description:
      "Assess whether intrusive thoughts, excessive guilt, and obsessive reassurance-seeking are driven by moral scrupulosity OCD according to Dr. Ian Osborn and Dr. Jonathan Grayson.",
    url: "https://nuju.app/quiz/moral-scrupulosity",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Moral Scrupulosity & Pure-O OCD",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Exposure and Response Prevention (ERP)" },
        { "@type": "MedicalTherapy", name: "Ethical Uncertainty Tolerance Training" },
        { "@type": "MedicalTherapy", name: "Uncensored Private Audio Catharsis" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Rarely) to 3 (Almost Constantly / Severely)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Moral Scrupulosity Test: Am I a Bad Person? Screen Moral OCD & Guilt"
        description="Take the evidence-based 12-item Moral Scrupulosity & Pure OCD Screener (Dr. Ian Osborn model). Assess moral purity terror, confession urges, and ethical paralysis free & anonymously."
        canonical="https://nuju.app/quiz/moral-scrupulosity"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-slate-400/30">
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
              {(["en", "id", "de", "fr", "es"] as MoralScrupulosityCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-slate-600 text-white shadow-xs font-bold"
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
                <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Scale className="w-4 h-4" />
                  <span>Dr. Ian Osborn &amp; Dr. Jonathan Grayson Model</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Moral Scrupulosity &amp; Pure OCD Screener
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Do you obsess over whether you are secretly evil? Do you feel compelled to confess minor thoughts or over-apologize?
                  This 12-item screener benchmarks moral purity dread, guilt magnification, and ethical decision paralysis.
                </p>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="font-semibold text-slate-300">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-slate-400 to-zinc-200 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Question Box */}
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-xl backdrop-blur-sm">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Dimension: {MORAL_SCRUPULOSITY_SUBSCALE_INFO[currentQuestion.subscale].name[lang] || MORAL_SCRUPULOSITY_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                          ? "border-slate-400 bg-slate-500/15 text-white"
                          : "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                      }`}
                    >
                      <span className="text-sm sm:text-base">{option.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                          answers[currentQuestion.id] === option.val
                            ? "border-slate-300 bg-slate-300 text-neutral-950"
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
              <div className="p-8 rounded-3xl border border-slate-500/30 bg-gradient-to-br from-slate-950/50 via-neutral-900 to-neutral-950 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-slate-500/20 border border-slate-500/30 text-slate-200 text-xs font-bold uppercase tracking-wider">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition shadow-xs"
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
                  <span className="text-5xl font-black text-slate-200">{scoreResult.score}</span>
                  <span className="text-neutral-500 font-semibold text-lg">/ 36 pts</span>
                  <span className="text-xs font-bold text-slate-300/80 ml-2">
                    ({scoreResult.percentage}% Scrupulosity Index)
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
                        Moral Purity Dread
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.moral_purity_hypervigilance.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-300 rounded-full"
                          style={{ width: `${scoreResult.subscales.moral_purity_hypervigilance.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 2 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Guilt &amp; Confession
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.guilt_magnification_confession.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zinc-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.guilt_magnification_confession.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 3 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Ethical Paralysis
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.ethical_perfectionism_paralysis.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.ethical_perfectionism_paralysis.percentage}%` }}
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
                <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Brain className="w-4 h-4" />
                  <span>The Neurobiology of Scrupulosity &amp; Pure OCD</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Why Thoughts Are Not Sins: Breaking Thought-Action Fusion
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.psychology[lang] || activeProfile.psychology.en}
                </p>
                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-700/30 text-xs text-slate-300 leading-relaxed">
                  <strong>Clinical Truth:</strong> Bad people do not spend their days terrified of being bad. Narcissists and sociopaths never lose sleep agonizing over whether their motives were 100% pure. The very fact that you are suffering from moral anxiety proves that your ethical integrity is intact.
                </div>
              </div>

              {/* Action Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-lg">
                <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Uncertainty Tolerance Protocol</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  3 Evidence-Based ERP Steps to Disarm False Guilt
                </h3>
                <ul className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Nuju Voice Journaling CTA */}
              <div className="p-8 rounded-3xl border border-slate-500/30 bg-gradient-to-br from-slate-900/30 via-neutral-900 to-neutral-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full bg-slate-500/20 text-slate-200 text-xs font-bold uppercase tracking-wider">
                    Zero-Knowledge Encrypted Confession Vault
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Discharge Your Taboo Thoughts in Complete Privacy
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                    When you speak your most terrifying intrusive thoughts into Nuju's zero-knowledge encrypted voice diary,
                    no human eye or algorithm can ever judge you. Hear the thoughts out loud and watch their imaginary power evaporate.
                  </p>
                </div>
                <a
                  href="https://nuju.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition shadow-lg shrink-0"
                >
                  Enter Private Voice Sanctuary
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <MoralScrupulosityShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

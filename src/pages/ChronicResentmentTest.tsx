import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Flame,
  ShieldAlert,
  Scale,
  Activity,
  HeartCrack,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  CHRONIC_RESENTMENT_QUESTIONS,
  CHRONIC_RESENTMENT_RESULTS,
  CHRONIC_RESENTMENT_OPTIONS,
  CHRONIC_RESENTMENT_SUBSCALE_INFO,
  getChronicResentmentResult,
  calculateChronicResentmentSubscales,
  ChronicResentmentCardLang,
} from "@/data/chronic-resentment";
import { ChronicResentmentShareCardModal } from "@/components/ChronicResentmentShareCardModal";
import { ChronicResentmentScoreResult } from "@/lib/generate-quiz-card";

export default function ChronicResentmentTest() {
  const [lang, setLang] = useState<ChronicResentmentCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = CHRONIC_RESENTMENT_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return CHRONIC_RESENTMENT_OPTIONS.map((opt) => ({
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

  const scoreResult: ChronicResentmentScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getChronicResentmentResult(total);
    const rawSubscales = calculateChronicResentmentSubscales(answers);

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
        injustice_rumination_replay: {
          score: rawSubscales.injustice_rumination_replay,
          percentage: Math.round((rawSubscales.injustice_rumination_replay / 12) * 100),
        },
        somatic_bitterness_poisoning: {
          score: rawSubscales.somatic_bitterness_poisoning,
          percentage: Math.round((rawSubscales.somatic_bitterness_poisoning / 12) * 100),
        },
        hostility_defense_hardening: {
          score: rawSubscales.hostility_defense_hardening,
          percentage: Math.round((rawSubscales.hostility_defense_hardening / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getChronicResentmentResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Chronic Resentment & Grudge Holding Screener (Stanford Forgiveness Project Model)",
    headline: "Chronic Resentment Test: Measure Grudge Rumination, Somatic Bitterness & Defense Hardening",
    description:
      "Assess whether unresolved betrayal, unexpressed rage, and injustice loops are keeping your nervous system in chronic allostatic strain according to Dr. Fred Luskin and Dr. Robert Enright.",
    url: "https://nuju.app/quiz/chronic-resentment",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Chronic Resentment & Embitterment Syndrome",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Somatic Vagus Nerve Down-Regulation" },
        { "@type": "MedicalTherapy", name: "Stanford Forgiveness Grievance Decoupling" },
        { "@type": "MedicalTherapy", name: "Uncensored Rage Voice Discharge Journaling" },
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
        title="Chronic Resentment Test: Screen Grudges, Bitterness & Injustice Loops"
        description="Take the evidence-based 12-item Chronic Resentment Screener (Stanford Forgiveness Project & Dr. Robert Enright model). Free, private, and instant clinical insights."
        canonical="https://nuju.app/quiz/chronic-resentment"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-rose-500/30">
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
              {(["en", "id", "de", "fr", "es"] as ChronicResentmentCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-rose-600 text-white shadow-xs font-bold"
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
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Scale className="w-4 h-4" />
                  <span>Stanford Forgiveness Project &amp; Dr. Robert Enright Model</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Chronic Resentment &amp; Grudge Screener
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Do imaginary arguments replay in your head years later? Does seeing someone's success ignite a visceral bitter burn?
                  This 12-item screener evaluates injustice rumination, somatic bitterness, and defensive hostility.
                </p>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="font-semibold text-rose-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 to-red-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Question Box */}
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-xl backdrop-blur-sm">
                <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-3">
                  Dimension: {CHRONIC_RESENTMENT_SUBSCALE_INFO[currentQuestion.subscale].name[lang] || CHRONIC_RESENTMENT_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                          ? "border-rose-500 bg-rose-500/10 text-white"
                          : "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                      }`}
                    >
                      <span className="text-sm sm:text-base">{option.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                          answers[currentQuestion.id] === option.val
                            ? "border-rose-500 bg-rose-500 text-white"
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
              <div className="p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-neutral-900 to-neutral-950 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-xs"
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
                  <span className="text-5xl font-black text-rose-400">{scoreResult.score}</span>
                  <span className="text-neutral-500 font-semibold text-lg">/ 36 pts</span>
                  <span className="text-xs font-bold text-rose-300/80 ml-2">
                    ({scoreResult.percentage}% Resentment Load)
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
                        Injustice Rumination
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.injustice_rumination_replay.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${scoreResult.subscales.injustice_rumination_replay.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 2 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Somatic Bitterness
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.somatic_bitterness_poisoning.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${scoreResult.subscales.somatic_bitterness_poisoning.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 3 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Defensive Hostility
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.hostility_defense_hardening.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${scoreResult.subscales.hostility_defense_hardening.percentage}%` }}
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
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Flame className="w-4 h-4" />
                  <span>The Neurobiology of Toxic Bitterness</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Why Resentment Is the Poison You Drink Hoping the Other Dies
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 text-xs text-rose-200 leading-relaxed">
                  <strong>Stanford Forgiveness Insight:</strong> Dr. Fred Luskin notes that holding a grievance is like
                  renting out prime real estate in your mind to someone you dislike for free. Forgiveness does not mean
                  excusing cruelty or reconciling; it means evicting the perpetrator from your vascular system.
                </div>
              </div>

              {/* Action Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-lg">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Grievance Discharge Protocol</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  3 Clinical Interventions to Discharge Bitterness
                </h3>
                <ul className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Nuju Voice Journaling CTA */}
              <div className="p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-900/30 via-neutral-900 to-neutral-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
                    Zero-Knowledge Encrypted Catharsis
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Discharge Your Secret Rage Safely in Nuju
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                    You cannot heal what you are too afraid to say out loud. Voice the uncensored venom, betrayal, and
                    frustrations into Nuju's zero-knowledge encrypted vault. Drain the emotional battery without destroying relationships.
                  </p>
                </div>
                <a
                  href="https://nuju.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition shadow-lg shrink-0"
                >
                  Start Private Audio Catharsis
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <ChronicResentmentShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

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
  Users,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  COMPARISON_TRAP_QUESTIONS,
  COMPARISON_TRAP_RESULTS,
  COMPARISON_TRAP_OPTIONS,
  COMPARISON_TRAP_SUBSCALE_INFO,
  getComparisonTrapResult,
  calculateComparisonTrapSubscales,
  ComparisonTrapCardLang,
} from "@/data/comparison-trap";
import { ComparisonTrapShareCardModal } from "@/components/ComparisonTrapShareCardModal";
import { ComparisonTrapScoreResult } from "@/lib/generate-quiz-card";

export default function ComparisonTrapTest() {
  const [lang, setLang] = useState<ComparisonTrapCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = COMPARISON_TRAP_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return COMPARISON_TRAP_OPTIONS.map((opt) => ({
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

  const scoreResult: ComparisonTrapScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getComparisonTrapResult(total);
    const rawSubscales = calculateComparisonTrapSubscales(answers);

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
        upward_comparison: {
          score: rawSubscales.upward_comparison,
          percentage: Math.round((rawSubscales.upward_comparison / 16) * 100),
        },
        foster_envy_resentment: {
          score: rawSubscales.foster_envy_resentment,
          percentage: Math.round((rawSubscales.foster_envy_resentment / 16) * 100),
        },
        identity_erosion: {
          score: rawSubscales.identity_erosion,
          percentage: Math.round((rawSubscales.identity_erosion / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getComparisonTrapResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Comparison Trap & Social Media Envy Screener (Festinger & Ethan Kross Model)",
    headline: "Comparison Trap Test: Measure Upward Comparison & Social Media Envy",
    description:
      "Assess whether toxic upward comparison, chronic envy, and algorithmic identity erosion are poisoning your self-esteem and authentic fulfillment.",
    url: "https://nuju.app/quiz/comparison-trap",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Social Comparison Envy & Algorithmic Dysphoria",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Social Comparison De-escalation (Leon Festinger Model)" },
        { "@type": "MedicalTherapy", name: "Digital Fasting & Dopaminergic Baseline Reset" },
        { "@type": "MedicalTherapy", name: "Authentic Identity Reconstruction & Uncensored Journaling" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never) to 4 (Almost Always)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Comparison Trap Test: Screen Social Media Envy & Upward Comparison"
        description="Take the 12-item Comparison Trap Screener (Leon Festinger & Dr. Ethan Kross model). Measure upward comparison, resentment, and identity erosion free on Nuju."
        canonical="https://nuju.app/quiz/comparison-trap"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-cyan-500/30">
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
              {(["en", "id", "de", "fr", "es"] as ComparisonTrapCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-cyan-500 text-neutral-950 shadow-xs font-bold"
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
              <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <Users className="w-3.5 h-3.5" />
                    SOCIAL PSYCHOLOGY MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Leon Festinger &amp; Dr. Ethan Kross</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  The Comparison Trap &amp; Social Media Envy Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Comparing your messy internal reality with someone else&apos;s filtered highlight reel triggers neurochemical distress. When upward comparison turns into passive consumption, the dorsal anterior cingulate cortex activates pain pathways, cultivating silent bitterness, impostor agony, and profound identity erosion.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-cyan-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {COMPARISON_TRAP_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      COMPARISON_TRAP_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "bg-cyan-600/20 border-cyan-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-cyan-400 bg-cyan-500 text-neutral-950"
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
              <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500 text-neutral-950 shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-cyan-300">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-cyan-500/20"
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
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Comparison Trap Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Social comparison syndrome exerts distinct pressures across three core dimensions:
                </p>

                <div className="space-y-5">
                  {/* Upward Comparison */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {COMPARISON_TRAP_SUBSCALE_INFO.upward_comparison.name[lang] ||
                          COMPARISON_TRAP_SUBSCALE_INFO.upward_comparison.name.en}
                      </span>
                      <span className="text-cyan-400">
                        {scoreResult.subscales.upward_comparison.score} / 16 (
                        {scoreResult.subscales.upward_comparison.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.upward_comparison.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {COMPARISON_TRAP_SUBSCALE_INFO.upward_comparison.description[lang] ||
                        COMPARISON_TRAP_SUBSCALE_INFO.upward_comparison.description.en}
                    </p>
                  </div>

                  {/* Foster Envy & Resentment */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {COMPARISON_TRAP_SUBSCALE_INFO.foster_envy_resentment.name[lang] ||
                          COMPARISON_TRAP_SUBSCALE_INFO.foster_envy_resentment.name.en}
                      </span>
                      <span className="text-cyan-400">
                        {scoreResult.subscales.foster_envy_resentment.score} / 16 (
                        {scoreResult.subscales.foster_envy_resentment.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.foster_envy_resentment.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {COMPARISON_TRAP_SUBSCALE_INFO.foster_envy_resentment.description[lang] ||
                        COMPARISON_TRAP_SUBSCALE_INFO.foster_envy_resentment.description.en}
                    </p>
                  </div>

                  {/* Identity Erosion */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {COMPARISON_TRAP_SUBSCALE_INFO.identity_erosion.name[lang] ||
                          COMPARISON_TRAP_SUBSCALE_INFO.identity_erosion.name.en}
                      </span>
                      <span className="text-cyan-400">
                        {scoreResult.subscales.identity_erosion.score} / 16 (
                        {scoreResult.subscales.identity_erosion.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.identity_erosion.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {COMPARISON_TRAP_SUBSCALE_INFO.identity_erosion.description[lang] ||
                        COMPARISON_TRAP_SUBSCALE_INFO.identity_erosion.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span>The Neurobiology of Social Comparison</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-cyan-300">Leon Festinger Social Psychology Law: </span>
                  When objective standards are removed, humans default to comparing themselves with peers. In the algorithmic era, comparing against millions of curated highlights paralyzes self-worth.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  <span>Detox &amp; Re-Centering Protocol</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  NO AUDIENCE. ZERO HIGHLIGHTS.
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Reclaim Your Raw Identity in a Private Audio Vault
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  You don&apos;t have to stage your life for an audience or prove you are ahead. Nuju gives you an encrypted voice journal where no algorithms judge your pace. Speak your envy, celebrate your quiet steps, and reconnect with who you are behind the screen.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-cyan-500/25"
                >
                  <span>Start Private Journaling on Nuju</span>
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
                    to="/quiz/fomo"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-cyan-400 mb-1 block">Digital Anxiety</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                      FOMO &amp; Social Media Urgency Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/imposter-syndrome"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-purple-400 mb-1 block">Self-Doubt</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition">
                      Imposter Syndrome Archetype Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/toxic-shame"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Core Inadequacy</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Toxic Shame &amp; Self-Worth Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/dopamine-burnout"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-amber-400 mb-1 block">Algorithmic Burnout</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      Dopamine Burnout &amp; Stimulation Fatigue Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <ComparisonTrapShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

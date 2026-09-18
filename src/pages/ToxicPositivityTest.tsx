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
  Smile,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  TOXIC_POSITIVITY_QUESTIONS,
  TOXIC_POSITIVITY_RESULTS,
  TOXIC_POSITIVITY_OPTIONS,
  TOXIC_POSITIVITY_SUBSCALE_INFO,
  getToxicPositivityResult,
  calculateToxicPositivitySubscales,
  ToxicPositivityCardLang,
} from "@/data/toxic-positivity";
import { ToxicPositivityShareCardModal } from "@/components/ToxicPositivityShareCardModal";
import { ToxicPositivityScoreResult } from "@/lib/generate-quiz-card";

export default function ToxicPositivityTest() {
  const [lang, setLang] = useState<ToxicPositivityCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = TOXIC_POSITIVITY_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return TOXIC_POSITIVITY_OPTIONS.map((opt) => ({
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

  const scoreResult: ToxicPositivityScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getToxicPositivityResult(total);
    const rawSubscales = calculateToxicPositivitySubscales(answers);

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
        suppression_shaming: {
          score: rawSubscales.suppression_shaming,
          percentage: Math.round((rawSubscales.suppression_shaming / 16) * 100),
        },
        spiritual_bypassing: {
          score: rawSubscales.spiritual_bypassing,
          percentage: Math.round((rawSubscales.spiritual_bypassing / 16) * 100),
        },
        emotional_isolation: {
          score: rawSubscales.emotional_isolation,
          percentage: Math.round((rawSubscales.emotional_isolation / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getToxicPositivityResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Toxic Positivity & Emotional Invalidation Screener (Dr. Susan David Model)",
    headline: "Toxic Positivity Test: Measure Emotional Suppression & Spiritual Bypassing",
    description:
      "Assess whether forced cheerfulness, guilt for negative emotions, and 'Good Vibes Only' spiritual bypassing are causing chronic emotional isolation and physical tension.",
    url: "https://nuju.app/quiz/toxic-positivity",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Emotional Suppression & Toxic Positivity Trauma",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Emotional Agility Frameworks (Dr. Susan David)" },
        { "@type": "MedicalTherapy", name: "Somatic Emotional Release & Uncensored Validation" },
        { "@type": "MedicalTherapy", name: "Boundary De-escalation with Spiritual Bypassing Enablers" },
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
        title="Toxic Positivity Test: Screen Emotional Invalidation & Spiritual Bypassing"
        description="Take the evidence-based 12-item Toxic Positivity Screener (Dr. Susan David & Whitney Goodman model). Measure suppression shaming, spiritual bypassing, and emotional isolation."
        canonical="https://nuju.app/quiz/toxic-positivity"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-lime-500/30">
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
              {(["en", "id", "de", "fr", "es"] as ToxicPositivityCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-lime-600 text-neutral-950 shadow-xs font-bold"
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
              <div className="rounded-3xl border border-lime-500/30 bg-gradient-to-br from-lime-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-lime-500/20 text-lime-300 border border-lime-500/30">
                    <Smile className="w-3.5 h-3.5" />
                    EMOTIONAL AGILITY MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Susan David &amp; Whitney Goodman</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Toxic Positivity &amp; Emotional Invalidation Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Toxic positivity is the compulsive imposition of a happy, optimistic facade over legitimate suffering, grief, and anger. When difficult emotions are silenced with cliches like &quot;Good Vibes Only&quot; or &quot;Everything happens for a reason,&quot; the nervous system internalizes shame, triggering chronic isolation and somatic pain.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-lime-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                    {TOXIC_POSITIVITY_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      TOXIC_POSITIVITY_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "bg-lime-600/20 border-lime-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-lime-400 bg-lime-500 text-neutral-950"
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
              <div className="rounded-3xl border border-lime-500/40 bg-gradient-to-br from-lime-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-lime-500 text-neutral-950 shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-lime-300">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-lime-600 hover:bg-lime-500 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-lime-600/20"
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
                  <Activity className="w-4 h-4 text-lime-400" />
                  <span>Toxic Positivity Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Emotional invalidation operates across three distinct psychological dimensions. Review your burden distribution:
                </p>

                <div className="space-y-5">
                  {/* Suppression Shaming */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {TOXIC_POSITIVITY_SUBSCALE_INFO.suppression_shaming.name[lang] ||
                          TOXIC_POSITIVITY_SUBSCALE_INFO.suppression_shaming.name.en}
                      </span>
                      <span className="text-lime-400">
                        {scoreResult.subscales.suppression_shaming.score} / 16 (
                        {scoreResult.subscales.suppression_shaming.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-lime-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.suppression_shaming.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {TOXIC_POSITIVITY_SUBSCALE_INFO.suppression_shaming.description[lang] ||
                        TOXIC_POSITIVITY_SUBSCALE_INFO.suppression_shaming.description.en}
                    </p>
                  </div>

                  {/* Spiritual Bypassing */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {TOXIC_POSITIVITY_SUBSCALE_INFO.spiritual_bypassing.name[lang] ||
                          TOXIC_POSITIVITY_SUBSCALE_INFO.spiritual_bypassing.name.en}
                      </span>
                      <span className="text-lime-400">
                        {scoreResult.subscales.spiritual_bypassing.score} / 16 (
                        {scoreResult.subscales.spiritual_bypassing.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.spiritual_bypassing.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {TOXIC_POSITIVITY_SUBSCALE_INFO.spiritual_bypassing.description[lang] ||
                        TOXIC_POSITIVITY_SUBSCALE_INFO.spiritual_bypassing.description.en}
                    </p>
                  </div>

                  {/* Emotional Isolation */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {TOXIC_POSITIVITY_SUBSCALE_INFO.emotional_isolation.name[lang] ||
                          TOXIC_POSITIVITY_SUBSCALE_INFO.emotional_isolation.name.en}
                      </span>
                      <span className="text-lime-400">
                        {scoreResult.subscales.emotional_isolation.score} / 16 (
                        {scoreResult.subscales.emotional_isolation.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.emotional_isolation.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {TOXIC_POSITIVITY_SUBSCALE_INFO.emotional_isolation.description[lang] ||
                        TOXIC_POSITIVITY_SUBSCALE_INFO.emotional_isolation.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-lime-400" />
                  <span>The Neurobiology of Emotion Suppression</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-lime-300">Dr. Susan David Law: </span>
                  When you push away difficult emotions, they don&apos;t disappear—they somatize. Emotional agility is not about fixing or replacing dark feelings with positive affirmations; it is about stepping into your discomfort with self-compassion and curiosity.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-lime-400" />
                  <span>Authentic Feeling &amp; De-Bypassing Steps</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-lime-500/40 bg-gradient-to-br from-lime-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lime-500/20 text-lime-300 border border-lime-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  NO GOOD VIBES REQUIRED
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  A Safe Dark Haven Where You Never Have to Smile
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  When everyone around you demands gratitude and silver linings, keeping up the act breaks your spirit. Nuju is your private, zero-knowledge encrypted voice sanctuary where you can cry, curse, grieve, or articulate your rawest truth without advice or toxic positivity.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-lime-600 hover:bg-lime-500 text-neutral-950 font-bold text-sm transition shadow-lg shadow-lime-600/25"
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
                    to="/quiz/fawn-response"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-lime-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-lime-400 mb-1 block">People-Pleasing</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-lime-300 transition">
                      Fawn Response &amp; People Pleasing Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/emotional-numbness"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-lime-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-sky-400 mb-1 block">Affective Blunting</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
                      Emotional Numbness &amp; Blunting Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/gaslighting"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-lime-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-amber-400 mb-1 block">Reality Distortion</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      Gaslighting &amp; Reality Invalidation Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/toxic-shame"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-lime-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Inner Critic</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Toxic Shame &amp; Self-Worth Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <ToxicPositivityShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

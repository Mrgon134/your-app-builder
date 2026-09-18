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
  Crown,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  SPIRITUAL_NARCISSISM_QUESTIONS,
  SPIRITUAL_NARCISSISM_RESULTS,
  SPIRITUAL_NARCISSISM_OPTIONS,
  SPIRITUAL_NARCISSISM_SUBSCALE_INFO,
  getSpiritualNarcissismResult,
  calculateSpiritualNarcissismSubscales,
  SpiritualNarcissismCardLang,
} from "@/data/spiritual-narcissism";
import { SpiritualNarcissismShareCardModal } from "@/components/SpiritualNarcissismShareCardModal";
import { SpiritualNarcissismScoreResult } from "@/lib/generate-quiz-card";

export default function SpiritualNarcissismTest() {
  const [lang, setLang] = useState<SpiritualNarcissismCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = SPIRITUAL_NARCISSISM_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return SPIRITUAL_NARCISSISM_OPTIONS.map((opt) => ({
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

  const scoreResult: SpiritualNarcissismScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getSpiritualNarcissismResult(total);
    const rawSubscales = calculateSpiritualNarcissismSubscales(answers);

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
        holier_than_thou_elitism: {
          score: rawSubscales.holier_than_thou_elitism,
          percentage: Math.round((rawSubscales.holier_than_thou_elitism / 16) * 100),
        },
        enlightened_gaslighting: {
          score: rawSubscales.enlightened_gaslighting,
          percentage: Math.round((rawSubscales.enlightened_gaslighting / 16) * 100),
        },
        performance_asceticism: {
          score: rawSubscales.performance_asceticism,
          percentage: Math.round((rawSubscales.performance_asceticism / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getSpiritualNarcissismResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Spiritual Narcissism & Superiority Screener (Dr. Craig Malkin & Kaufman Model)",
    headline: "Spiritual Narcissism Test: Measure Holier-Than-Thou Elitism & Enlightened Gaslighting",
    description:
      "Evaluate whether spiritual doctrines, karma blaming, performative mindfulness, and high-vibration elitism are acting as defensive shields for grandiosity.",
    url: "https://nuju.app/quiz/spiritual-narcissism",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Spiritual Narcissism & Weaponized Enlightenment",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Clinical Shadow Integration & Humility Grounding" },
        { "@type": "MedicalTherapy", name: "Spiritual Bypassing Interruption (John Welwood Model)" },
        { "@type": "MedicalTherapy", name: "Uncensored Private Audio Confession & Emotional Vulnerability" },
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
        title="Spiritual Narcissism Test: Screen Superiority Complex & Enlightened Gaslighting"
        description="Take the 12-item Spiritual Narcissism Screener (Dr. Craig Malkin & Scott Barry Kaufman model). Unmask high-vibration elitism, karma invalidation, and guru persona."
        canonical="https://nuju.app/quiz/spiritual-narcissism"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/30">
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
              {(["en", "id", "de", "fr", "es"] as SpiritualNarcissismCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-amber-500 text-neutral-950 shadow-xs font-bold"
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
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Crown className="w-3.5 h-3.5" />
                    SPIRITUAL EGO ARCHITECTURE
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Craig Malkin &amp; Scott Barry Kaufman</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Spiritual Narcissism &amp; Superiority Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  When spiritual wisdom is co-opted by the ego, it manifests as moral superiority, feeling &quot;more evolved&quot; or higher frequency than others, and weaponizing karma to evade human accountability. This assessment measures whether holistic practices have become an omnipotent defense mechanism.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-amber-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {SPIRITUAL_NARCISSISM_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      SPIRITUAL_NARCISSISM_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "bg-amber-600/20 border-amber-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-amber-400 bg-amber-500 text-neutral-950"
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
              <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-neutral-950 shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/20"
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
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Spiritual Superiority Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Spiritual ego inflation expresses itself across three distinct sub-patterns:
                </p>

                <div className="space-y-5">
                  {/* Holier-Than-Thou Elitism */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {SPIRITUAL_NARCISSISM_SUBSCALE_INFO.holier_than_thou_elitism.name[lang] ||
                          SPIRITUAL_NARCISSISM_SUBSCALE_INFO.holier_than_thou_elitism.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.holier_than_thou_elitism.score} / 16 (
                        {scoreResult.subscales.holier_than_thou_elitism.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.holier_than_thou_elitism.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {SPIRITUAL_NARCISSISM_SUBSCALE_INFO.holier_than_thou_elitism.description[lang] ||
                        SPIRITUAL_NARCISSISM_SUBSCALE_INFO.holier_than_thou_elitism.description.en}
                    </p>
                  </div>

                  {/* Enlightened Gaslighting */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {SPIRITUAL_NARCISSISM_SUBSCALE_INFO.enlightened_gaslighting.name[lang] ||
                          SPIRITUAL_NARCISSISM_SUBSCALE_INFO.enlightened_gaslighting.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.enlightened_gaslighting.score} / 16 (
                        {scoreResult.subscales.enlightened_gaslighting.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.enlightened_gaslighting.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {SPIRITUAL_NARCISSISM_SUBSCALE_INFO.enlightened_gaslighting.description[lang] ||
                        SPIRITUAL_NARCISSISM_SUBSCALE_INFO.enlightened_gaslighting.description.en}
                    </p>
                  </div>

                  {/* Performance Asceticism */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {SPIRITUAL_NARCISSISM_SUBSCALE_INFO.performance_asceticism.name[lang] ||
                          SPIRITUAL_NARCISSISM_SUBSCALE_INFO.performance_asceticism.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.performance_asceticism.score} / 16 (
                        {scoreResult.subscales.performance_asceticism.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.performance_asceticism.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {SPIRITUAL_NARCISSISM_SUBSCALE_INFO.performance_asceticism.description[lang] ||
                        SPIRITUAL_NARCISSISM_SUBSCALE_INFO.performance_asceticism.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span>The Neurobiology of Spiritual Grandiosity</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-amber-300">Dr. Craig Malkin Narcissism Law: </span>
                  True spirituality dissolves self-importance. When enlightenment is used to rank yourself above fellow humans, the ego has simply switched from gold chains to prayer beads.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Grounded Shadow Integration Protocol</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  DROP THE GURU MASK
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  A Confidential Space for Your Messy, Unglamorous Truth
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Real healing starts when you stop performing peace and admit your ordinary human dread, jealousy, and exhaustion. Nuju provides an anonymous, encrypted voice journal where you can unload your shadow side without audience, followers, or pretension.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-amber-500/25"
                >
                  <span>Experience Encrypted Audio Shadow Work</span>
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
                    to="/quiz/toxic-positivity"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-lime-400 mb-1 block">Emotional Suppression</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-lime-300 transition">
                      Toxic Positivity &amp; Spiritual Bypassing Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/gaslighting"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-cyan-400 mb-1 block">Reality Distortion</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                      Gaslighting &amp; Reality Invalidation Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/shadow-work"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-purple-400 mb-1 block">Jungian Shadow</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition">
                      Jungian Shadow Archetype Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/moral-injury"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Ethical Trauma</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Moral Injury &amp; Betrayal of Trust Test →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <SpiritualNarcissismShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

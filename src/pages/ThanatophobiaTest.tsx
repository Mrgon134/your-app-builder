import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Compass,
  Moon,
  Clock,
  ShieldAlert,
  Flame,
  Activity,
  Heart,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  THANATOPHOBIA_QUESTIONS,
  THANATOPHOBIA_RESULTS,
  THANATOPHOBIA_OPTIONS,
  THANATOPHOBIA_SUBSCALE_INFO,
  getThanatophobiaResult,
  calculateThanatophobiaSubscales,
  ThanatophobiaCardLang,
} from "@/data/thanatophobia";
import { ThanatophobiaShareCardModal } from "@/components/ThanatophobiaShareCardModal";
import { ThanatophobiaScoreResult } from "@/lib/generate-quiz-card";

export default function ThanatophobiaTest() {
  const [lang, setLang] = useState<ThanatophobiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = THANATOPHOBIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return THANATOPHOBIA_OPTIONS.map((opt) => ({
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

  const scoreResult: ThanatophobiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getThanatophobiaResult(total);
    const rawSubscales = calculateThanatophobiaSubscales(answers);

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
        existential_annihilation_dread: {
          score: rawSubscales.existential_annihilation_dread,
          percentage: Math.round((rawSubscales.existential_annihilation_dread / 12) * 100),
        },
        symbolic_immortality_striving: {
          score: rawSubscales.symbolic_immortality_striving,
          percentage: Math.round((rawSubscales.symbolic_immortality_striving / 12) * 100),
        },
        mortality_salience_paralysis: {
          score: rawSubscales.mortality_salience_paralysis,
          percentage: Math.round((rawSubscales.mortality_salience_paralysis / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getThanatophobiaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Thanatophobia & Existential Death Anxiety Screener (Dr. Irvin D. Yalom & TMT Model)",
    headline: "Thanatophobia Test: Measure Sleep-Onset Death Anxiety, Annihilation Dread & Mortality Salience",
    description:
      "Assess whether thoughts of mortality, eternity, and non-existence trigger heart palpitations, nocturnal dread, or existential paralysis using Dr. Irvin Yalom's clinical framework and Terror Management Theory.",
    url: "https://nuju.app/quiz/thanatophobia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Thanatophobia & Existential Mortality Dread",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Existential Psychotherapy & Meaning Construction" },
        { "@type": "MedicalTherapy", name: "Terror Management Cognitive Restructuring" },
        { "@type": "MedicalTherapy", name: "Nocturnal Audio Journal Somatic Grounding" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Rarely) to 3 (Almost Constantly / Paralyzing)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Thanatophobia Test: Screen Death Anxiety & Existential Mortality Dread"
        description="Take the clinically referenced 12-item Thanatophobia Screener (Dr. Irvin Yalom & Terror Management Theory). Free, anonymous, and instant insight into sleep-onset death anxiety and mortality salience."
        canonical="https://nuju.app/quiz/thanatophobia"
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
              {(["en", "id", "de", "fr", "es"] as ThanatophobiaCardLang[]).map((l) => (
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

        {/* Top AdSense Banner */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <AdSenseBanner slot="quiz-top-banner" />
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {!isCompleted ? (
            <div>
              {/* Screener Header Card */}
              <div className="mb-8 p-6 rounded-3xl border border-neutral-800 bg-gradient-to-br from-amber-950/20 via-neutral-900/50 to-neutral-950 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Dr. Irvin D. Yalom Existential Psychotherapy Model</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Thanatophobia &amp; Existential Death Anxiety Screener
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Do quiet moments or lying in bed provoke a sudden vertigo of non-existence? Do you obsessively check your pulse or strive frantically to leave a permanent mark on the world?
                  This 12-item screener measures your existential annihilation dread, symbolic immortality strivings, and mortality salience paralysis.
                </p>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span className="font-semibold text-amber-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-purple-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Active Question Box */}
              <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-xl backdrop-blur-sm">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                  Dimension: {THANATOPHOBIA_SUBSCALE_INFO[currentQuestion.subscale].name[lang] || THANATOPHOBIA_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                          ? "border-amber-500 bg-amber-500/15 text-white"
                          : "border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                      }`}
                    >
                      <span className="text-sm sm:text-base">{option.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                          answers[currentQuestion.id] === option.val
                            ? "border-amber-400 bg-amber-500 text-neutral-950"
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
              <div className="p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-950 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition shadow-xs"
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
                  <span className="text-5xl font-black text-amber-400">{scoreResult.score}</span>
                  <span className="text-neutral-500 font-semibold text-lg">/ 36 pts</span>
                  <span className="text-xs font-bold text-amber-300/80 ml-2">
                    ({scoreResult.percentage}% Mortality Salience Load)
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
                        Annihilation Dread
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.existential_annihilation_dread.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.existential_annihilation_dread.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 2 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Immortality Striving
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.symbolic_immortality_striving.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.symbolic_immortality_striving.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Subscale 3 */}
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <div className="text-xs font-semibold text-neutral-400 mb-1">
                        Mortality Paralysis
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        {scoreResult.subscales.mortality_salience_paralysis.score}/12 pts
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${scoreResult.subscales.mortality_salience_paralysis.percentage}%` }}
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
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Dr. Irvin D. Yalom Clinical Insight</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Why Death Anxiety Is the Hidden Engine of Existential Panic
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.psychology[lang] || activeProfile.psychology.en}
                </p>
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 text-xs text-amber-200 leading-relaxed">
                  <strong>The Yalom Awakening Principle:</strong> As Dr. Irvin Yalom wrote in <em>Staring at the Sun</em>: &ldquo;Though the physicality of death destroys man, the idea of death saves him.&rdquo; Confronting finitude strips away petty trivialities and urges us toward authentic, courageously committed living today.
                </div>
              </div>

              {/* Action Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl border border-neutral-800 bg-neutral-900/70 shadow-lg">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Existential Grounding Protocol</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  3 Evidence-Based Practices for Mortality Peace
                </h3>
                <ul className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Nuju Nocturnal Voice Journaling CTA */}
              <div className="p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 via-neutral-900 to-neutral-950 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    Zero-Knowledge Encrypted Nocturnal Sanctuary
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Unburden Nocturnal Mortality Panic in Nuju
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                    When the lights turn off and thoughts of the infinite abyss begin racing through your mind, speak freely into Nuju&apos;s end-to-end encrypted audio journal. Transform existential terror into peaceful presence without fear of judgment or exposure.
                  </p>
                </div>
                <a
                  href="https://nuju.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition shadow-lg shrink-0"
                >
                  Soothe Nighttime Anxiety in Nuju
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <ThanatophobiaShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

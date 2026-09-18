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
  HeartCrack,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  CHILDHOOD_EMOTIONAL_NEGLECT_QUESTIONS,
  CHILDHOOD_EMOTIONAL_NEGLECT_RESULTS,
  CHILDHOOD_EMOTIONAL_NEGLECT_OPTIONS,
  CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO,
  getChildhoodEmotionalNeglectResult,
  calculateChildhoodEmotionalNeglectSubscales,
  ChildhoodEmotionalNeglectCardLang,
} from "@/data/childhood-emotional-neglect";
import { ChildhoodEmotionalNeglectShareCardModal } from "@/components/ChildhoodEmotionalNeglectShareCardModal";
import { ChildhoodEmotionalNeglectScoreResult } from "@/lib/generate-quiz-card";

export default function ChildhoodEmotionalNeglectTest() {
  const [lang, setLang] = useState<ChildhoodEmotionalNeglectCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = CHILDHOOD_EMOTIONAL_NEGLECT_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return CHILDHOOD_EMOTIONAL_NEGLECT_OPTIONS.map((opt) => ({
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

  const scoreResult: ChildhoodEmotionalNeglectScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getChildhoodEmotionalNeglectResult(total);
    const rawSubscales = calculateChildhoodEmotionalNeglectSubscales(answers);

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
        emotional_invisibility: {
          score: rawSubscales.emotional_invisibility,
          percentage: Math.round((rawSubscales.emotional_invisibility / 16) * 100),
        },
        alexithymic_disconnection: {
          score: rawSubscales.alexithymic_disconnection,
          percentage: Math.round((rawSubscales.alexithymic_disconnection / 16) * 100),
        },
        fatal_flaw_shame: {
          score: rawSubscales.fatal_flaw_shame,
          percentage: Math.round((rawSubscales.fatal_flaw_shame / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getChildhoodEmotionalNeglectResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Childhood Emotional Neglect (CEN) Screener (Dr. Jonice Webb Model)",
    headline: "Childhood Emotional Neglect Test: Measure Emotional Invisibility & Alexithymia",
    description:
      "Assess whether subtle emotional neglect in childhood has left an invisible void, chronic self-reliance, and an unshakeable feeling of being defective.",
    url: "https://nuju.app/quiz/childhood-emotional-neglect",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Childhood Emotional Neglect & Developmental Affective Void",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Emotion-Focused Reparenting (Dr. Jonice Webb Model)" },
        { "@type": "MedicalTherapy", name: "Somatic Interoception & Affect Naming Training" },
        { "@type": "MedicalTherapy", name: "Zero-Knowledge Encrypted Audio Journaling for Voice Restoration" },
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
        title="Childhood Emotional Neglect Test: Screen CEN & Emotional Invisibility"
        description="Take the 12-item Childhood Emotional Neglect Screener (Dr. Jonice Webb model). Identify emotional invisibility, alexithymia, and fatal flaw shame free on Nuju."
        canonical="https://nuju.app/quiz/childhood-emotional-neglect"
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
              {(["en", "id", "de", "fr", "es"] as ChildhoodEmotionalNeglectCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-rose-500 text-neutral-950 shadow-xs font-bold"
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
              <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    <HeartCrack className="w-3.5 h-3.5" />
                    DEVELOPMENTAL CEN ARCHITECTURE
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Jonice Webb (Running on Empty)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Childhood Emotional Neglect (CEN) Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Childhood Emotional Neglect is what did NOT happen: your feelings were not mirrored, your tears were swallowed in silence, and you were treated as invisible. When emotional needs are dismissed as a child, you grow into an adult who feels secretly defective, hyper-independent, and numb inside.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-rose-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "bg-rose-600/20 border-rose-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-rose-400 bg-rose-500 text-neutral-950"
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
              <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-neutral-950 shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-rose-300">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-rose-500/20"
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
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>CEN Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Childhood emotional neglect imprints across three psychological dimensions:
                </p>

                <div className="space-y-5">
                  {/* Emotional Invisibility */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.emotional_invisibility.name[lang] ||
                          CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.emotional_invisibility.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.emotional_invisibility.score} / 16 (
                        {scoreResult.subscales.emotional_invisibility.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.emotional_invisibility.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.emotional_invisibility.description[lang] ||
                        CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.emotional_invisibility.description.en}
                    </p>
                  </div>

                  {/* Alexithymic Disconnection */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.alexithymic_disconnection.name[lang] ||
                          CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.alexithymic_disconnection.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.alexithymic_disconnection.score} / 16 (
                        {scoreResult.subscales.alexithymic_disconnection.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.alexithymic_disconnection.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.alexithymic_disconnection.description[lang] ||
                        CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.alexithymic_disconnection.description.en}
                    </p>
                  </div>

                  {/* Fatal Flaw Shame */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.fatal_flaw_shame.name[lang] ||
                          CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.fatal_flaw_shame.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.fatal_flaw_shame.score} / 16 (
                        {scoreResult.subscales.fatal_flaw_shame.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.fatal_flaw_shame.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.fatal_flaw_shame.description[lang] ||
                        CHILDHOOD_EMOTIONAL_NEGLECT_SUBSCALE_INFO.fatal_flaw_shame.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-rose-400" />
                  <span>The Neurobiology of Unmirrored Feelings</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-rose-300">Dr. Jonice Webb CEN Law: </span>
                  When children are emotionally neglected, they do not stop loving their parents; they stop loving themselves. They assume that since their emotions are treated as invisible, their true self must be fundamentally flawed.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Somatic Reparenting Protocol</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  YOU WERE NEVER DEFECTIVE
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Give Voice to the Child Nobody Asked About
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  You spent your entire life swallowing your tears and pretending you had no needs. Nuju is an encrypted, zero-knowledge audio journal where no one interrupts you, shames you, or looks away. Speak the pain you kept secret for decades and let yourself be heard.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-rose-500/25"
                >
                  <span>Begin Encrypted Voice Reparenting Free</span>
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
                    to="/quiz/inner-child"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Developmental Archetypes</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Inner Child Wounds &amp; Archetypes Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/alexithymia"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-sky-400 mb-1 block">Emotional Blindness</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
                      Alexithymia &amp; Emotional Blindness Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/toxic-shame"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-red-400 mb-1 block">Defectiveness Belief</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-red-300 transition">
                      Toxic Shame &amp; Self-Worth Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/hyper-independence"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-amber-400 mb-1 block">Trauma Defense</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      Hyper-Independence &amp; Need-Avoidance Test →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <ChildhoodEmotionalNeglectShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

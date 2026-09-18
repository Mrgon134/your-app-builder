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
  Activity,
  Layers,
  Heart,
  Sun,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  ANHEDONIA_QUESTIONS,
  ANHEDONIA_RESULTS,
  ANHEDONIA_OPTIONS,
  ANHEDONIA_SUBSCALE_INFO,
  getAnhedoniaResult,
  calculateAnhedoniaSubscales,
  AnhedoniaCardLang,
} from "@/data/anhedonia";
import { AnhedoniaShareCardModal } from "@/components/AnhedoniaShareCardModal";
import { AnhedoniaScoreResult } from "@/lib/generate-quiz-card";

export default function AnhedoniaTest() {
  const [lang, setLang] = useState<AnhedoniaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = ANHEDONIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return ANHEDONIA_OPTIONS.map((opt) => ({
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

  const scoreResult: AnhedoniaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getAnhedoniaResult(total);
    const rawSubscales = calculateAnhedoniaSubscales(answers);

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
        consummatory_pleasure_deficit: {
          score: rawSubscales.consummatory_pleasure_deficit,
          percentage: Math.round((rawSubscales.consummatory_pleasure_deficit / 12) * 100),
        },
        anticipatory_pleasure_deficit: {
          score: rawSubscales.anticipatory_pleasure_deficit,
          percentage: Math.round((rawSubscales.anticipatory_pleasure_deficit / 12) * 100),
        },
        social_anhedonia_detachment: {
          score: rawSubscales.social_anhedonia_detachment,
          percentage: Math.round((rawSubscales.social_anhedonia_detachment / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getAnhedoniaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Anhedonia & Reward Deficiency Screener (SHAPS Model)",
    headline: "Anhedonia Test: Screen Loss of Pleasure, Dopamine Flatline & Emotional Numbness",
    description:
      "Assess whether your capacity for joy, sensory savoring, future anticipation, and social warmth has become blunted using the Snaith-Hamilton Pleasure Scale (SHAPS) model.",
    url: "https://nuju.app/quiz/anhedonia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Anhedonia, Reward Deficiency Syndrome & Dopamine Downregulation",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Behavioral Activation Therapy (BAT)" },
        { "@type": "MedicalTherapy", name: "Dopamine Receptor Recalibration" },
        { "@type": "MedicalTherapy", name: "Micro-Sensory Savoring Protocol" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Disagree Strongly / Normal Pleasure) to 3 (Agree Strongly / Complete Hedonic Flatline)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-purple-200">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Anhedonia Online Gratis | Cek Kehilangan Rasa Senang & Dopamin Hambar"
            : lang === "de"
            ? "Anhedonie Selbsttest (SHAPS) | Verlust von Freude & Gefühlsleere"
            : lang === "fr"
            ? "Test d'Anhédonie Gratuit | Perte de Plaisir & Émoussement Émotionnel"
            : lang === "es"
            ? "Test de Anhedonia Gratis | Pérdida de Placer & Desconexión Afectiva"
            : "Anhedonia & Loss of Pleasure Test: Free Clinical SHAPS Screener"
        }
        description={
          lang === "id"
            ? "Kenapa hobi, musik, dan makanan favoritmu terasa hambar dan tidak memicu rasa senang lagi? Ukur tingkat anhedonia dan reward deficiency dengan skala klinis SHAPS."
            : "Discover whether chronic burnout or dopamine exhaustion has silenced your capacity for sensory savoring, future anticipation, and social joy."
        }
        canonical="https://nuju.app/quiz/anhedonia"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full bg-neutral-100 py-2 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4">
          <AdSenseBanner slot="quiz-top" format="horizontal" />
        </div>
      </div>

      <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/quiz" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition">
              Ju
            </span>
            <span className="font-semibold text-neutral-900 tracking-tight">
              nuju<span className="text-purple-600 font-bold">.quiz</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            {(["en", "id", "de", "fr", "es"] as AnhedoniaCardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg transition uppercase ${
                  lang === l
                    ? "bg-white text-purple-700 shadow-2xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {!isCompleted ? (
          <div>
            {/* Screener Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-200">
                <Sun className="w-3.5 h-3.5 text-purple-600" />
                <span>Dr. R. Philip Snaith SHAPS Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {lang === "id"
                  ? "Tes Anhedonia & Kehilangan Rasa Senang"
                  : lang === "de"
                  ? "Anhedonie- & Belohnungsdefizit-Test (SHAPS)"
                  : lang === "fr"
                  ? "Test d'Anhédonie & Perte de Plaisir"
                  : lang === "es"
                  ? "Test de Anhedonia & Pérdida de Placer"
                  : "Anhedonia & Reward Deficiency Screener"}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                {lang === "id"
                  ? "Ukur seberapa dalam kapasitas hedonikmu meredup—mulai dari hambar menikmati makanan dan musik, lenyapnya antusiasme masa depan, hingga dinginnya koneksi sosial."
                  : "Measure whether neurobiological reward exhaustion has blunted your capacity to savor sensory experiences, anticipate future rewards, and feel social warmth."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-purple-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                  {currentQuestion.subscale === "consummatory_pleasure_deficit"
                    ? "Subscale: Consummatory Sensory Savoring"
                    : currentQuestion.subscale === "anticipatory_pleasure_deficit"
                    ? "Subscale: Anticipatory Dopamine Drive"
                    : "Subscale: Social Hedonic Resonance"}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug mb-6">
                {currentQuestion.text[lang] || currentQuestion.text.en}
              </h2>

              {/* Likert Options */}
              <div className="flex flex-col gap-3">
                {answerLabels.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.val;
                  return (
                    <button
                      key={opt.val}
                      onClick={() => handleSelectAnswer(opt.val)}
                      className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between group ${
                        isSelected
                          ? "bg-purple-50 border-purple-400 text-purple-950 font-semibold shadow-2xs"
                          : "bg-neutral-50/60 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition ${
                          isSelected
                            ? "border-purple-600 bg-purple-600 text-white"
                            : "border-neutral-300 group-hover:border-purple-400"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Back Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 disabled:opacity-40 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>
              <button
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-neutral-600 transition"
              >
                Reset Test
              </button>
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="space-y-8 animate-fade-in">
            {/* Result Header Hero */}
            <div className="bg-gradient-to-br from-purple-950 via-slate-950 to-neutral-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-purple-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-5xl sm:text-6xl font-black text-purple-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-medium">
                    Hedonic Blunting Index ({scoreResult.score}/36 pts)
                  </span>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500 hover:bg-purple-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Story Card</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition border border-white/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Screener</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mid Result Banner Ad */}
            <div className="w-full bg-white rounded-2xl p-2 border border-neutral-200">
              <AdSenseBanner slot="quiz-mid" format="horizontal" />
            </div>

            {/* Subscales Breakdown */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Hedonic Capacities Breakdown
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Consummatory Sensory Savoring */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {ANHEDONIA_SUBSCALE_INFO.consummatory_pleasure_deficit.name[lang] ||
                        ANHEDONIA_SUBSCALE_INFO.consummatory_pleasure_deficit.name.en}
                    </span>
                    <span className="text-purple-600 font-bold">
                      {scoreResult.subscales.consummatory_pleasure_deficit.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.consummatory_pleasure_deficit.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {ANHEDONIA_SUBSCALE_INFO.consummatory_pleasure_deficit.description[lang] ||
                      ANHEDONIA_SUBSCALE_INFO.consummatory_pleasure_deficit.description.en}
                  </p>
                </div>

                {/* 2. Anticipatory Dopamine Drive */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {ANHEDONIA_SUBSCALE_INFO.anticipatory_pleasure_deficit.name[lang] ||
                        ANHEDONIA_SUBSCALE_INFO.anticipatory_pleasure_deficit.name.en}
                    </span>
                    <span className="text-fuchsia-600 font-bold">
                      {scoreResult.subscales.anticipatory_pleasure_deficit.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-fuchsia-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.anticipatory_pleasure_deficit.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {ANHEDONIA_SUBSCALE_INFO.anticipatory_pleasure_deficit.description[lang] ||
                      ANHEDONIA_SUBSCALE_INFO.anticipatory_pleasure_deficit.description.en}
                  </p>
                </div>

                {/* 3. Social Hedonic Resonance */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {ANHEDONIA_SUBSCALE_INFO.social_anhedonia_detachment.name[lang] ||
                        ANHEDONIA_SUBSCALE_INFO.social_anhedonia_detachment.name.en}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {scoreResult.subscales.social_anhedonia_detachment.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.social_anhedonia_detachment.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {ANHEDONIA_SUBSCALE_INFO.social_anhedonia_detachment.description[lang] ||
                      ANHEDONIA_SUBSCALE_INFO.social_anhedonia_detachment.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Neuroscience: Dr. R. Philip Snaith & Dr. Kenneth Blum
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Behavioral Activation & Dopamine Re-Sensitization Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-neutral-700 leading-relaxed">{action}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Mascot Ju Voice Sanctuary Box */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Exhausted from pretending to feel happy or excited?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    When you're experiencing anhedonia, forcing smiles and faking enthusiasm burns through the last of your energy reserves. In Nuju, speak the unvarnished grayness aloud into an encrypted sanctuary. No cheerleading, no toxic optimism—just pure, neutral acceptance to give your dopamine circuits a genuine rest.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-400 hover:text-purple-300 transition"
                    >
                      <span>Open Free Nuju Voice Sanctuary</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Quizzes Navigation */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8">
              <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wider mb-4">
                Explore Related Clinical Screeners
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/quiz/dopamine-burnout"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-violet-400 hover:bg-violet-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Dopamine Burnout Test</h5>
                    <p className="text-xs text-neutral-500">Digital overstimulation & attention exhaustion</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-violet-600 transition" />
                </Link>

                <Link
                  to="/quiz/emotional-numbness"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-slate-400 hover:bg-slate-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Emotional Numbness (Blunting)</h5>
                    <p className="text-xs text-neutral-500">Dissociative defense & suppressed feelings</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-slate-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This screener is an interactive self-assessment based on clinical dimensions of the Snaith-Hamilton Pleasure Scale (SHAPS). It does not provide medical diagnosis. Severe, prolonged anhedonia can be a core symptom of clinical depression or medical illness. If loss of pleasure persists and impacts your safety or ability to function, please reach out to a licensed psychiatrist or healthcare professional.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <AnhedoniaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

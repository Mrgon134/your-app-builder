import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Wind,
  Activity,
  Layers,
  Heart,
  Eye,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  SENSORIMOTOR_QUESTIONS,
  SENSORIMOTOR_RESULTS,
  SENSORIMOTOR_OPTIONS,
  SENSORIMOTOR_SUBSCALE_INFO,
  getSensorimotorResult,
  calculateSensorimotorSubscales,
  SensorimotorCardLang,
} from "@/data/sensorimotor-ocd";
import { SensorimotorShareCardModal } from "@/components/SensorimotorShareCardModal";
import { SensorimotorScoreResult } from "@/lib/generate-quiz-card";

export default function SensorimotorTest() {
  const [lang, setLang] = useState<SensorimotorCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = SENSORIMOTOR_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return SENSORIMOTOR_OPTIONS.map((opt) => ({
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

  const scoreResult: SensorimotorScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getSensorimotorResult(total);
    const rawSubscales = calculateSensorimotorSubscales(answers);

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
        sensorimotor_fixation: {
          score: rawSubscales.sensorimotor_fixation,
          percentage: Math.round((rawSubscales.sensorimotor_fixation / 12) * 100),
        },
        loss_of_autopilot_dread: {
          score: rawSubscales.loss_of_autopilot_dread,
          percentage: Math.round((rawSubscales.loss_of_autopilot_dread / 12) * 100),
        },
        compulsive_distraction_strain: {
          score: rawSubscales.compulsive_distraction_strain,
          percentage: Math.round((rawSubscales.compulsive_distraction_strain / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getSensorimotorResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Sensorimotor OCD & Somatic Hyperawareness Screener (Dr. David Veale Model)",
    headline: "Sensorimotor OCD Test: Screen Manual Breathing, Swallowing & Somatic Fixation",
    description:
      "Assess whether your conscious attention is obsessively trapped on manual breathing, swallowing, blinking, or bodily sensations with fear of permanent autopilot loss.",
    url: "https://nuju.app/quiz/sensorimotor-ocd",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Sensorimotor OCD, Somatic Obsessions & Body-Focused Hyperawareness",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Exposure and Response Prevention (ERP) for Somatic Obsessions" },
        { "@type": "MedicalTherapy", name: "Inhibitory Learning & Attention Training" },
        { "@type": "MedicalTherapy", name: "Radical Acceptance & Morita Therapy" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Calm Autopilot) to 3 (Constant Somatic Lock-in / Severe)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-cyan-200">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Sensorimotor OCD & Hipersensitivitas Tubuh | Cek Napas Manual & Menelan"
            : lang === "de"
            ? "Sensorimotorische Zwangsstörung Selbsttest | Atmen & Schlucken Hyperfokus"
            : lang === "fr"
            ? "Test TOC Sensorimoteur & Hyperconscience Corporelle | Déglutition & Souffle"
            : lang === "es"
            ? "Test TOC Sensorimotor & Hiperconciencia Corporal | Respiración & Deglución"
            : "Sensorimotor OCD & Somatic Hyperawareness Test: Free Clinical Screener"
        }
        description={
          lang === "id"
            ? "Pikiran mendadak terkunci pada tarikan napas atau cara menelan sampai panik kehilangan autopilot tubuh? Ikuti tes klinis 12 pertanyaan model Dr. David Veale."
            : "Evaluate whether hyperawareness of breathing, swallowing, blinking, or internal body sensations has trapped you in manual biological anxiety loops."
        }
        canonical="https://nuju.app/quiz/sensorimotor-ocd"
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
            <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition">
              Ju
            </span>
            <span className="font-semibold text-neutral-900 tracking-tight">
              nuju<span className="text-cyan-600 font-bold">.quiz</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            {(["en", "id", "de", "fr", "es"] as SensorimotorCardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg transition uppercase ${
                  lang === l
                    ? "bg-white text-cyan-700 shadow-2xs font-bold"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-200">
                <Wind className="w-3.5 h-3.5 text-cyan-600" />
                <span>Dr. David Veale & Dr. Steven Phillipson Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {lang === "id"
                  ? "Tes Sensorimotor OCD & Hipersensitivitas Somatik"
                  : lang === "de"
                  ? "Sensorimotorische Zwangsstörung & Somatischer Hyperfokus Test"
                  : lang === "fr"
                  ? "Test TOC Sensorimoteur & Hyperconscience Corporelle"
                  : lang === "es"
                  ? "Test TOC Sensorimotor & Hiperconciencia Somática"
                  : "Sensorimotor OCD & Somatic Hyperawareness Screener"}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                {lang === "id"
                  ? "Ukur seberapa dalam pikiranmu terjebak memperhatikan tarikan napas, kedipan mata, atau saliva, serta ketakutan kehilangan kontrol autopilot tubuh selamanya."
                  : "Measure whether your attention is locked into manual bodily functions—breathing, swallowing, blinking—and evaluate the anxiety of losing biological autopilot."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-cyan-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-100">
                  {currentQuestion.subscale === "sensorimotor_fixation"
                    ? "Subscale: Somatic Fixation Lock-In"
                    : currentQuestion.subscale === "loss_of_autopilot_dread"
                    ? "Subscale: Loss of Autopilot Dread"
                    : "Subscale: Compulsive Distraction Strain"}
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
                          ? "bg-cyan-50 border-cyan-400 text-cyan-950 font-semibold shadow-2xs"
                          : "bg-neutral-50/60 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition ${
                          isSelected
                            ? "border-cyan-600 bg-cyan-600 text-white"
                            : "border-neutral-300 group-hover:border-cyan-400"
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
            <div className="bg-gradient-to-br from-cyan-950 via-teal-950 to-neutral-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-cyan-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-5xl sm:text-6xl font-black text-cyan-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-medium">
                    Somatic Hyperawareness Index ({scoreResult.score}/36 pts)
                  </span>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition"
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
                <Layers className="w-5 h-5 text-cyan-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Sensorimotor Clinical Dimensions
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Sensorimotor Fixation */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {SENSORIMOTOR_SUBSCALE_INFO.sensorimotor_fixation.name[lang] ||
                        SENSORIMOTOR_SUBSCALE_INFO.sensorimotor_fixation.name.en}
                    </span>
                    <span className="text-cyan-600 font-bold">
                      {scoreResult.subscales.sensorimotor_fixation.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.sensorimotor_fixation.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {SENSORIMOTOR_SUBSCALE_INFO.sensorimotor_fixation.description[lang] ||
                      SENSORIMOTOR_SUBSCALE_INFO.sensorimotor_fixation.description.en}
                  </p>
                </div>

                {/* 2. Loss of Autopilot Dread */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {SENSORIMOTOR_SUBSCALE_INFO.loss_of_autopilot_dread.name[lang] ||
                        SENSORIMOTOR_SUBSCALE_INFO.loss_of_autopilot_dread.name.en}
                    </span>
                    <span className="text-teal-600 font-bold">
                      {scoreResult.subscales.loss_of_autopilot_dread.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.loss_of_autopilot_dread.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {SENSORIMOTOR_SUBSCALE_INFO.loss_of_autopilot_dread.description[lang] ||
                      SENSORIMOTOR_SUBSCALE_INFO.loss_of_autopilot_dread.description.en}
                  </p>
                </div>

                {/* 3. Compulsive Distraction Strain */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {SENSORIMOTOR_SUBSCALE_INFO.compulsive_distraction_strain.name[lang] ||
                        SENSORIMOTOR_SUBSCALE_INFO.compulsive_distraction_strain.name.en}
                    </span>
                    <span className="text-blue-600 font-bold">
                      {scoreResult.subscales.compulsive_distraction_strain.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.compulsive_distraction_strain.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {SENSORIMOTOR_SUBSCALE_INFO.compulsive_distraction_strain.description[lang] ||
                      SENSORIMOTOR_SUBSCALE_INFO.compulsive_distraction_strain.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Neuropsychology: Dr. David Veale & Steven Phillipson
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Somatic ERP & Brain Autopilot Re-Regulation Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Tired of fighting your own breathing and swallowing?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    The more you force yourself NOT to think about your breath, the tighter your brain grips it. In Nuju, vent your somatic frustration out loud into an encrypted voice sanctuary. Speaking anchors your prefrontal cortex in external auditory resonance, letting the brainstem reclaim natural autopilot.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition"
                    >
                      <span>Try Free Nuju Voice Journal</span>
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
                  to="/quiz/health-anxiety"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Health Anxiety (SHAI)</h5>
                    <p className="text-xs text-neutral-500">Symptom googling & bodily catastrophe dread</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 transition" />
                </Link>

                <Link
                  to="/quiz/body-dysmorphia"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Body Dysmorphia (BDD)</h5>
                    <p className="text-xs text-neutral-500">Perceived flaws, mirror checking & social avoidance</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This screener is an interactive educational tool based on clinical paradigms developed by Dr. David Veale and Dr. Steven Phillipson for somatic and sensorimotor obsessive-compulsive themes. It does not constitute medical diagnosis. If hyperawareness or compulsive distress impairs your daily functioning, seek guidance from a licensed therapist specializing in Exposure and Response Prevention (ERP).
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <SensorimotorShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

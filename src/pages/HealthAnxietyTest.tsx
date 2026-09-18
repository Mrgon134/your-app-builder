import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  HeartPulse,
  Activity,
  Layers,
  ShieldAlert,
  Search,
  Heart,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  HEALTH_ANXIETY_QUESTIONS,
  HEALTH_ANXIETY_RESULTS,
  HEALTH_ANXIETY_OPTIONS,
  HEALTH_ANXIETY_SUBSCALE_INFO,
  getHealthAnxietyResult,
  calculateHealthAnxietySubscales,
  HealthAnxietyCardLang,
} from "@/data/health-anxiety";
import { HealthAnxietyShareCardModal } from "@/components/HealthAnxietyShareCardModal";
import { HealthAnxietyScoreResult } from "@/lib/generate-quiz-card";

export default function HealthAnxietyTest() {
  const [lang, setLang] = useState<HealthAnxietyCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = HEALTH_ANXIETY_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return HEALTH_ANXIETY_OPTIONS.map((opt) => ({
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

  const scoreResult: HealthAnxietyScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getHealthAnxietyResult(total);
    const rawSubscales = calculateHealthAnxietySubscales(answers);

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
        somatic_catastrophizing: {
          score: rawSubscales.somatic_catastrophizing,
          percentage: Math.round((rawSubscales.somatic_catastrophizing / 12) * 100),
        },
        cyberchondria_reassurance: {
          score: rawSubscales.cyberchondria_reassurance,
          percentage: Math.round((rawSubscales.cyberchondria_reassurance / 12) * 100),
        },
        body_checking_hypervigilance: {
          score: rawSubscales.body_checking_hypervigilance,
          percentage: Math.round((rawSubscales.body_checking_hypervigilance / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getHealthAnxietyResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Health Anxiety & Cyberchondria Screener (Dr. Paul Salkovskis SHAI Model)",
    headline: "Health Anxiety Test: Screen Cyberchondria, Somatic Catastrophizing & Pulse Checking Loops",
    description:
      "Assess whether harmless bodily sensations trigger catastrophic medical fears, symptom googling spirals, and compulsive reassurance seeking using the Short Health Anxiety Inventory (SHAI) model.",
    url: "https://nuju.app/quiz/health-anxiety",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Illness Anxiety Disorder, Hypochondria & Cyberchondria",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Health Anxiety (CBT-HA)" },
        { "@type": "MedicalTherapy", name: "Interoceptive Exposure & Response Prevention" },
        { "@type": "MedicalTherapy", name: "Vagus Nerve Somatic Down-Regulation" },
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
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-emerald-200">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Health Anxiety & Hipokondria Online Gratis | Cek Panik Penyakit & Cyberchondria"
            : lang === "de"
            ? "Krankheitsangst-Test (SHAI) | Kostenloser Cyberchondrie-Selbsttest"
            : lang === "fr"
            ? "Test Anxiété de Santé & Cybercondrie Gratuit | Peur de la Maladie"
            : lang === "es"
            ? "Test de Ansiedad por la Salud & Hipocondría Gratis | Cibercondría"
            : "Health Anxiety & Cyberchondria Test: Free Clinical SHAI Screener"
        }
        description={
          lang === "id"
            ? "Sering panik takut sakit parah tiap jantung berdebar atau pusing? Ikuti tes klinis 12 pertanyaan skala SHAI Salkovskis untuk mendeteksi hipokondria dan cyberchondria."
            : "Screen symptom googling spirals, body-checking compulsions, and catastrophic medical misinterpretations with our free 12-item clinical Health Anxiety (SHAI) screener."
        }
        canonical="https://nuju.app/quiz/health-anxiety"
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
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition">
              Ju
            </span>
            <span className="font-semibold text-neutral-900 tracking-tight">
              nuju<span className="text-emerald-600 font-bold">.quiz</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            {(["en", "id", "de", "fr", "es"] as HealthAnxietyCardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg transition uppercase ${
                  lang === l
                    ? "bg-white text-emerald-700 shadow-2xs font-bold"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dr. Paul Salkovskis Clinical SHAI Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {lang === "id"
                  ? "Tes Health Anxiety, Hipokondria & Cyberchondria"
                  : lang === "de"
                  ? "Krankheitsangst- & Cyberchondrie-Test (SHAI)"
                  : lang === "fr"
                  ? "Test d'Anxiété de Santé & Cybercondrie"
                  : lang === "es"
                  ? "Test de Ansiedad por la Salud & Cibercondría"
                  : "Health Anxiety & Cyberchondria Screener"}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                {lang === "id"
                  ? "Cek apakah kebiasaan mencari gejala di Google dan ketakutan penyakit fatal adalah bentuk gangguan kecemasan kesehatan yang bisa dipulihkan."
                  : "Differentiate healthy bodily awareness from clinical illness anxiety disorder, catastrophic symptom googling, and compulsive pulse checking loops."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-emerald-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                  {currentQuestion.subscale === "somatic_catastrophizing"
                    ? "Subscale: Somatic Catastrophizing"
                    : currentQuestion.subscale === "cyberchondria_reassurance"
                    ? "Subscale: Cyberchondria Googling"
                    : "Subscale: Body Checking & Probing"}
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
                          ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-2xs"
                          : "bg-neutral-50/60 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-neutral-300 group-hover:border-emerald-400"
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
            <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-neutral-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-5xl sm:text-6xl font-black text-emerald-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-medium">
                    Interoceptive Alarm Load ({scoreResult.score}/36 pts)
                  </span>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition"
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
                <Layers className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Clinical Dimensions Breakdown
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Somatic Catastrophizing */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {HEALTH_ANXIETY_SUBSCALE_INFO.somatic_catastrophizing.name[lang] ||
                        HEALTH_ANXIETY_SUBSCALE_INFO.somatic_catastrophizing.name.en}
                    </span>
                    <span className="text-emerald-600 font-bold">
                      {scoreResult.subscales.somatic_catastrophizing.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.somatic_catastrophizing.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {HEALTH_ANXIETY_SUBSCALE_INFO.somatic_catastrophizing.description[lang] ||
                      HEALTH_ANXIETY_SUBSCALE_INFO.somatic_catastrophizing.description.en}
                  </p>
                </div>

                {/* 2. Cyberchondria Googling */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {HEALTH_ANXIETY_SUBSCALE_INFO.cyberchondria_reassurance.name[lang] ||
                        HEALTH_ANXIETY_SUBSCALE_INFO.cyberchondria_reassurance.name.en}
                    </span>
                    <span className="text-teal-600 font-bold">
                      {scoreResult.subscales.cyberchondria_reassurance.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.cyberchondria_reassurance.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {HEALTH_ANXIETY_SUBSCALE_INFO.cyberchondria_reassurance.description[lang] ||
                      HEALTH_ANXIETY_SUBSCALE_INFO.cyberchondria_reassurance.description.en}
                  </p>
                </div>

                {/* 3. Body Checking & Probing */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {HEALTH_ANXIETY_SUBSCALE_INFO.body_checking_hypervigilance.name[lang] ||
                        HEALTH_ANXIETY_SUBSCALE_INFO.body_checking_hypervigilance.name.en}
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {scoreResult.subscales.body_checking_hypervigilance.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-emerald-700 rounded-full"
                      style={{ width: `${scoreResult.subscales.body_checking_hypervigilance.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {HEALTH_ANXIETY_SUBSCALE_INFO.body_checking_hypervigilance.description[lang] ||
                      HEALTH_ANXIETY_SUBSCALE_INFO.body_checking_hypervigilance.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Dr. Paul Salkovskis Cognitive Model
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  72-Hour Moratorium & Interoceptive Reset Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Need to discharge health panic without feeding the algorithm?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Searching symptoms online floods your limbic system with fatal edge-cases. In Nuju, speak your raw health worries into an encrypted voice journal. Discharge adrenaline as raw sound waves and let Ju hold your fear with gentle neutrality.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition"
                    >
                      <span>Open Free Nuju Web Sanctuary</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Quizzes Navigation */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8">
              <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wider mb-4">
                Recommended Screeners For You
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/quiz/thanatophobia"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 hover:bg-amber-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Thanatophobia Test</h5>
                    <p className="text-xs text-neutral-500">Sleep-onset death anxiety & mortality dread</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-600 transition" />
                </Link>

                <Link
                  to="/quiz/body-dysmorphia"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Body Dysmorphia (BDD) Test</h5>
                    <p className="text-xs text-neutral-500">Mirror checking & bodily defect fixation</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This screener is an interactive self-awareness instrument adapted from clinical research on the Short Health Anxiety Inventory (SHAI) by Dr. Paul Salkovskis. It is not a clinical medical diagnosis or a substitute for medical examination. If you experience severe, persistent, or worsening physical symptoms, always consult a qualified medical doctor.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <HealthAnxietyShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Volume2,
  Activity,
  Layers,
  Heart,
  VolumeX,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  MISOPHONIA_QUESTIONS,
  MISOPHONIA_RESULTS,
  MISOPHONIA_OPTIONS,
  MISOPHONIA_SUBSCALE_INFO,
  getMisophoniaResult,
  calculateMisophoniaSubscales,
  MisophoniaCardLang,
} from "@/data/misophonia";
import { MisophoniaShareCardModal } from "@/components/MisophoniaShareCardModal";
import { MisophoniaScoreResult } from "@/lib/generate-quiz-card";

export default function MisophoniaTest() {
  const [lang, setLang] = useState<MisophoniaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = MISOPHONIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return MISOPHONIA_OPTIONS.map((opt) => ({
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

  const scoreResult: MisophoniaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getMisophoniaResult(total);
    const rawSubscales = calculateMisophoniaSubscales(answers);

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
        orofacial_trigger_reactivity: {
          score: rawSubscales.orofacial_trigger_reactivity,
          percentage: Math.round((rawSubscales.orofacial_trigger_reactivity / 12) * 100),
        },
        autonomic_rage_panic_surge: {
          score: rawSubscales.autonomic_rage_panic_surge,
          percentage: Math.round((rawSubscales.autonomic_rage_panic_surge / 12) * 100),
        },
        anticipatory_social_avoidance: {
          score: rawSubscales.anticipatory_social_avoidance,
          percentage: Math.round((rawSubscales.anticipatory_social_avoidance / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getMisophoniaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Misophonia & Sound Sensitivity Screener (Amsterdam Misophonia Scale A-MISO-S)",
    headline: "Misophonia Test: Screen Chewing Sound Rage, Autonomic Fury & Sensory Overload",
    description:
      "Assess whether eating, chewing, breathing, or repetitive clicking sounds trigger involuntary rage, fight-or-flight panics, and social avoidance using the clinical A-MISO-S model.",
    url: "https://nuju.app/quiz/misophonia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Misophonia, Selective Sound Sensitivity Syndrome (4S) & Auditory Hyper-Reactivity",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Misophonia (CBT-M)" },
        { "@type": "MedicalTherapy", name: "Acoustic Counter-Conditioning & Attenuation" },
        { "@type": "MedicalTherapy", name: "Vagus Nerve Somatic Down-Regulation" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / No Reaction) to 3 (Severe / Explosive Rage)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-rose-200">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Misofonia Online Gratis | Cek Emosi & Benci Suara Kunyahan Orang (A-MISO-S)"
            : lang === "de"
            ? "Misophonie Selbsttest (A-MISO-S) | Wut auf Kaugeräusche & Geräuschempfindlichkeit"
            : lang === "fr"
            ? "Test de Misophonie Gratuit | Rage Face aux Bruits de Mastication (A-MISO-S)"
            : lang === "es"
            ? "Test de Misofonía Gratis | Furia por Masticar & Sensibilidad Sonora"
            : "Misophonia & Sound Rage Test: Free Clinical A-MISO-S Screener"
        }
        description={
          lang === "id"
            ? "Kenapa suara orang makan keripik, bernapas keras, atau mengecap bibir membuatmu mendadak marah hebat dan ingin kabur? Ukur tingkat misofonia klinis dengan skala A-MISO-S."
            : "Find out if chewing, breathing, or typing sounds trigger involuntary neurological fight-or-flight rage with the free clinical Amsterdam Misophonia Screener (A-MISO-S)."
        }
        canonical="https://nuju.app/quiz/misophonia"
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
            <span className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition">
              Ju
            </span>
            <span className="font-semibold text-neutral-900 tracking-tight">
              nuju<span className="text-rose-600 font-bold">.quiz</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            {(["en", "id", "de", "fr", "es"] as MisophoniaCardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg transition uppercase ${
                  lang === l
                    ? "bg-white text-rose-700 shadow-2xs font-bold"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200">
                <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Amsterdam Misophonia Scale (A-MISO-S) Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {lang === "id"
                  ? "Tes Misofonia & Kemarahan Terhadap Suara"
                  : lang === "de"
                  ? "Misophonie- & Lärmwut-Test (A-MISO-S)"
                  : lang === "fr"
                  ? "Test de Misophonie & Fureur Sonore"
                  : lang === "es"
                  ? "Test de Misofonía & Furia por Sonidos"
                  : "Misophonia & Sound Rage Screener"}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                {lang === "id"
                  ? "Cek apakah suara kunyahan, embusan napas, decapan bibir, atau klik pulpen menyalakan alarm amarah fisik dan keinginan kabur di sistem sarafmu."
                  : "Measure whether everyday mouth, breathing, and repetitive kinetic sounds trigger involuntary neurological fight-or-flight rage and social avoidance."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-rose-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                  {currentQuestion.subscale === "orofacial_trigger_reactivity"
                    ? "Subscale: Orofacial Sound Trigger Reactivity"
                    : currentQuestion.subscale === "autonomic_rage_panic_surge"
                    ? "Subscale: Autonomic Fight-or-Flight Surge"
                    : "Subscale: Anticipatory Avoidance & Strain"}
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
                          ? "bg-rose-50 border-rose-400 text-rose-950 font-semibold shadow-2xs"
                          : "bg-neutral-50/60 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition ${
                          isSelected
                            ? "border-rose-600 bg-rose-600 text-white"
                            : "border-neutral-300 group-hover:border-rose-400"
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
            <div className="bg-gradient-to-br from-rose-950 via-neutral-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-5xl sm:text-6xl font-black text-rose-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-medium">
                    Misophonic Reactivity Load ({scoreResult.score}/36 pts)
                  </span>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition"
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
                <Layers className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Acoustic & Autonomic Breakdown
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Orofacial Trigger Reactivity */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {MISOPHONIA_SUBSCALE_INFO.orofacial_trigger_reactivity.name[lang] ||
                        MISOPHONIA_SUBSCALE_INFO.orofacial_trigger_reactivity.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.orofacial_trigger_reactivity.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.orofacial_trigger_reactivity.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {MISOPHONIA_SUBSCALE_INFO.orofacial_trigger_reactivity.description[lang] ||
                      MISOPHONIA_SUBSCALE_INFO.orofacial_trigger_reactivity.description.en}
                  </p>
                </div>

                {/* 2. Autonomic Rage & Panic Surge */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {MISOPHONIA_SUBSCALE_INFO.autonomic_rage_panic_surge.name[lang] ||
                        MISOPHONIA_SUBSCALE_INFO.autonomic_rage_panic_surge.name.en}
                    </span>
                    <span className="text-red-600 font-bold">
                      {scoreResult.subscales.autonomic_rage_panic_surge.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-red-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.autonomic_rage_panic_surge.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {MISOPHONIA_SUBSCALE_INFO.autonomic_rage_panic_surge.description[lang] ||
                      MISOPHONIA_SUBSCALE_INFO.autonomic_rage_panic_surge.description.en}
                  </p>
                </div>

                {/* 3. Anticipatory Avoidance & Strain */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {MISOPHONIA_SUBSCALE_INFO.anticipatory_social_avoidance.name[lang] ||
                        MISOPHONIA_SUBSCALE_INFO.anticipatory_social_avoidance.name.en}
                    </span>
                    <span className="text-amber-700 font-bold">
                      {scoreResult.subscales.anticipatory_social_avoidance.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.anticipatory_social_avoidance.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {MISOPHONIA_SUBSCALE_INFO.anticipatory_social_avoidance.description[lang] ||
                      MISOPHONIA_SUBSCALE_INFO.anticipatory_social_avoidance.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Auditory Neuroscience: Dr. Damiaan Denys & Dr. Sukhbinder Kumar
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Acoustic Sanctuary & Autonomic Down-Regulation Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Need a safe space to vent the sound rage without hurting loved ones?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Snapping at your partner or family member for chewing makes you feel awful and misunderstood. In Nuju, vent your raw, uncensored frustration into an encrypted voice sanctuary. Speaking aloud releases the motor tension in your jaw and down-regulates the amygdala without sparking relationship conflict.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-400 hover:text-rose-300 transition"
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
                  to="/quiz/sensory-overload"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 hover:bg-amber-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Sensory Overload Test</h5>
                    <p className="text-xs text-neutral-500">HSP, neurodivergent sensory exhaustion & burnout</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-600 transition" />
                </Link>

                <Link
                  to="/quiz/repressed-anger"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Repressed Anger & Somatic Rage</h5>
                    <p className="text-xs text-neutral-500">Internalized fury, jaw clenching & unexpressed anger</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This screener is an interactive psychoeducational assessment based on research criteria from the Amsterdam Misophonia Scale (A-MISO-S). It does not constitute an official audiological or psychiatric diagnosis. If sound sensitivity causes severe distress, interpersonal conflict, or social isolation, consider consulting an audiologist and mental health professional specialized in sensory gating disorders.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <MisophoniaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

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
  Activity,
  Layers,
  Heart,
  ShieldAlert,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  AGORAPHOBIA_QUESTIONS,
  AGORAPHOBIA_RESULTS,
  AGORAPHOBIA_OPTIONS,
  AGORAPHOBIA_SUBSCALE_INFO,
  getAgoraphobiaResult,
  calculateAgoraphobiaSubscales,
  AgoraphobiaCardLang,
} from "@/data/agoraphobia";
import { AgoraphobiaShareCardModal } from "@/components/AgoraphobiaShareCardModal";
import { AgoraphobiaScoreResult } from "@/lib/generate-quiz-card";

export default function AgoraphobiaTest() {
  const [lang, setLang] = useState<AgoraphobiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = AGORAPHOBIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return AGORAPHOBIA_OPTIONS.map((opt) => ({
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

  const scoreResult: AgoraphobiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getAgoraphobiaResult(total);
    const rawSubscales = calculateAgoraphobiaSubscales(answers);

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
        spatial_escape_entrapment: {
          score: rawSubscales.spatial_escape_entrapment,
          percentage: Math.round((rawSubscales.spatial_escape_entrapment / 12) * 100),
        },
        fear_of_fear_interoception: {
          score: rawSubscales.fear_of_fear_interoception,
          percentage: Math.round((rawSubscales.fear_of_fear_interoception / 12) * 100),
        },
        safety_tether_constriction: {
          score: rawSubscales.safety_tether_constriction,
          percentage: Math.round((rawSubscales.safety_tether_constriction / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getAgoraphobiaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Agoraphobia & Panic Escape Dread Screener (Dr. Borwin Bandelow PAS Model)",
    headline: "Agoraphobia Test: Screen Fear of Crowds, Panic Entrapment & Comfort Zone Constriction",
    description:
      "Assess whether public transit, open spaces, traffic jams, or leaving home trigger overwhelming panic and avoidance using the clinical Panic and Agoraphobia Scale (PAS) framework.",
    url: "https://nuju.app/quiz/agoraphobia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Agoraphobia, Panic Disorder with Avoidance & Interoceptive Conditioning",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "In Vivo Gradual Exposure Therapy" },
        { "@type": "MedicalTherapy", name: "Interoceptive Exposure (Barlow Protocol)" },
        { "@type": "MedicalTherapy", name: "Safety Tether Attenuation" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / No Avoidance) to 3 (Constantly / Severe Entrapment)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-amber-200">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Agorafobia Online Gratis | Cek Rasa Takut Keluar Rumah & Tempat Ramai (PAS)"
            : lang === "de"
            ? "Agoraphobie Selbsttest (PAS) | Angst vor Menschenmengen, Stau & weiten Wegen"
            : lang === "fr"
            ? "Test d'Agoraphobie Gratuit | Peur de Sortir, Foules & Attaques de Panique (PAS)"
            : lang === "es"
            ? "Test de Agorafobia Gratis | Miedo a Salir, Espacios Abiertos & Pánico"
            : "Agoraphobia Test: Free Clinical Panic Escape & Avoidance Screener (PAS)"
        }
        description={
          lang === "id"
            ? "Apakah kamu takut keluar rumah, berada di keramaian, atau terjebak macet karena cemas mengalami serangan panik tanpa ada jalan kabur? Cek tingkat agorafobia klinis dengan model PAS."
            : "Discover whether public spaces, traffic gridlocks, transit, or being far from home trigger severe panic and avoidance with the free clinical Panic and Agoraphobia Scale (PAS) screener."
        }
        canonical="https://nuju.app/quiz/agoraphobia"
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
            <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition">
              Ju
            </span>
            <span className="font-semibold text-neutral-900 tracking-tight">
              nuju<span className="text-amber-600 font-bold">.quiz</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            {(["en", "id", "de", "fr", "es"] as AgoraphobiaCardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg transition uppercase ${
                  lang === l
                    ? "bg-white text-amber-700 shadow-2xs font-bold"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>Panic and Agoraphobia Scale (PAS) & Barlow Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {lang === "id"
                  ? "Tes Agorafobia & Kecemasan Ruang Terbuka"
                  : lang === "de"
                  ? "Agoraphobie & Panikvermeidung Selbsttest (PAS)"
                  : lang === "fr"
                  ? "Test d'Agoraphobie & Évitement Panique"
                  : lang === "es"
                  ? "Test de Agorafobia & Miedo al Atrapamiento"
                  : "Agoraphobia & Panic Escape Screener"}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                {lang === "id"
                  ? "Ukur apakah rasa takut mengalami panik tanpa jalan kabur membuat zona nyaman geografismu menyusut, mengurungmu di rumah, atau bergantung pada 'safe person'."
                  : "Evaluate whether the terror of having a panic attack in places where escape feels difficult is shrinking your geographic comfort zone and confining your daily autonomy."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-amber-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
                  {currentQuestion.subscale === "spatial_escape_entrapment"
                    ? "Subscale: Spatial Escape & Entrapment Dread"
                    : currentQuestion.subscale === "fear_of_fear_interoception"
                    ? "Subscale: Fear of Fear & Interoceptive Panic"
                    : "Subscale: Safety Tether & Territorial Constriction"}
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
                          ? "bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-2xs"
                          : "bg-neutral-50/60 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition ${
                          isSelected
                            ? "border-amber-600 bg-amber-600 text-white"
                            : "border-neutral-300 group-hover:border-amber-400"
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
            <div className="bg-gradient-to-br from-amber-950 via-neutral-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-5xl sm:text-6xl font-black text-amber-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-medium">
                    Agoraphobic Avoidance Index ({scoreResult.score}/36 pts)
                  </span>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition"
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
                <Layers className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Spatial Entrapment & Interoception Breakdown
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Spatial Escape & Entrapment Dread */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {AGORAPHOBIA_SUBSCALE_INFO.spatial_escape_entrapment.name[lang] ||
                        AGORAPHOBIA_SUBSCALE_INFO.spatial_escape_entrapment.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.spatial_escape_entrapment.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.spatial_escape_entrapment.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {AGORAPHOBIA_SUBSCALE_INFO.spatial_escape_entrapment.description[lang] ||
                      AGORAPHOBIA_SUBSCALE_INFO.spatial_escape_entrapment.description.en}
                  </p>
                </div>

                {/* 2. Fear of Fear & Interoceptive Panic */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {AGORAPHOBIA_SUBSCALE_INFO.fear_of_fear_interoception.name[lang] ||
                        AGORAPHOBIA_SUBSCALE_INFO.fear_of_fear_interoception.name.en}
                    </span>
                    <span className="text-orange-600 font-bold">
                      {scoreResult.subscales.fear_of_fear_interoception.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-orange-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.fear_of_fear_interoception.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {AGORAPHOBIA_SUBSCALE_INFO.fear_of_fear_interoception.description[lang] ||
                      AGORAPHOBIA_SUBSCALE_INFO.fear_of_fear_interoception.description.en}
                  </p>
                </div>

                {/* 3. Safety Tether & Territorial Constriction */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {AGORAPHOBIA_SUBSCALE_INFO.safety_tether_constriction.name[lang] ||
                        AGORAPHOBIA_SUBSCALE_INFO.safety_tether_constriction.name.en}
                    </span>
                    <span className="text-red-600 font-bold">
                      {scoreResult.subscales.safety_tether_constriction.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-red-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.safety_tether_constriction.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {AGORAPHOBIA_SUBSCALE_INFO.safety_tether_constriction.description[lang] ||
                      AGORAPHOBIA_SUBSCALE_INFO.safety_tether_constriction.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Dr. David H. Barlow & Dr. Borwin Bandelow (PAS Model)
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Evidence-Based Exposure & Territorial Expansion Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Trapped inside while feeling ashamed that you couldn't leave the house?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Feeling panicked in supermarket aisles or having to turn back from a road trip triggers intense self-criticism. In Nuju, express the raw terror and isolation into an encrypted voice diary directly from your room. Vocalizing bodily sensations breaks the internal alarm feedback loop without having to force immediate outdoor exposure.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition"
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
                  to="/quiz/panic"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-amber-400 hover:bg-amber-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Panic Attack Screener</h5>
                    <p className="text-xs text-neutral-500">Adrenaline surges, chest tightness & racing heart</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-600 transition" />
                </Link>

                <Link
                  to="/quiz/social-anxiety"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-orange-400 hover:bg-orange-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Social Anxiety Screener (LSAS)</h5>
                    <p className="text-xs text-neutral-500">Public humiliation fear & social evaluation dread</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-orange-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This assessment is an interactive screening tool based on the Panic and Agoraphobia Scale (PAS) by Dr. Borwin Bandelow and interoceptive cognitive models by Dr. David H. Barlow. It is not an official medical or psychiatric diagnosis. If panic symptoms or spatial avoidance hinder your work, relationships, or ability to leave home, please consult a licensed psychiatrist, clinical psychologist, or primary physician.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <AgoraphobiaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

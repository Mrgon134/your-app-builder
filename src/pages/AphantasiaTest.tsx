import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Shield,
  Activity,
  Layers,
  Heart,
  Eye,
  Award,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  APHANTASIA_QUESTIONS,
  APHANTASIA_RESULTS,
  APHANTASIA_OPTIONS,
  APHANTASIA_SUBSCALE_INFO,
  getAphantasiaResult,
  calculateAphantasiaSubscales,
  AphantasiaCardLang,
} from "@/data/aphantasia";
import { AphantasiaShareCardModal } from "@/components/AphantasiaShareCardModal";
import { AphantasiaScoreResult } from "@/lib/generate-quiz-card";

export default function AphantasiaTest() {
  const [lang, setLang] = useState<AphantasiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = APHANTASIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return APHANTASIA_OPTIONS.map((opt) => ({
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

  const scoreResult: AphantasiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getAphantasiaResult(total);
    const rawSubscales = calculateAphantasiaSubscales(answers);

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
        visual_scene_vividness: {
          score: rawSubscales.visual_scene_vividness,
          percentage: Math.round((rawSubscales.visual_scene_vividness / 12) * 100),
        },
        facial_object_precision: {
          score: rawSubscales.facial_object_precision,
          percentage: Math.round((rawSubscales.facial_object_precision / 12) * 100),
        },
        multisensory_inner_simulation: {
          score: rawSubscales.multisensory_inner_simulation,
          percentage: Math.round((rawSubscales.multisensory_inner_simulation / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getAphantasiaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Aphantasia & Mind's Eye Blindness Screener (VVIQ Marks & Prof. Adam Zeman Model)",
    headline: "Aphantasia Test: Measure Your Mind's Eye Visual Imagery Vividness",
    description:
      "Assess mental visual imagery vividness, total aphantasia (blind mind's eye), hypophantasia, or hyperphantasia using the validated VVIQ model by Dr. David Marks and Prof. Adam Zeman.",
    url: "https://nuju.app/quiz/aphantasia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Aphantasia, Mental Imagery Variations & Hyperphantasia",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Semantic & Conceptual Cognitive Mapping" },
        { "@type": "MedicalTherapy", name: "Externalized Journaling & Audio Anchors" },
        { "@type": "MedicalTherapy", name: "Multisensory Memory Architecture" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (No Image at All / Pitch Black) to 3 (Vivid & Photorealistic)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Aphantasia Test: Mind's Eye & Visual Imagery Screener (VVIQ Model) | Nuju"
        description="Do you have a blind mind's eye? Take the #100 Milestone clinical Aphantasia screener based on the VVIQ model by Dr. David Marks and Prof. Adam Zeman to discover your mental imagery score."
        canonicalUrl="https://nuju.app/quiz/aphantasia"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        {/* Historic #100 Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-300 shadow-xs">
          <Award className="w-3.5 h-3.5 text-sky-600" />
          <span>Card #100 Historic Milestone · VVIQ Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Aphantasia & Mind's Eye Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Can you see an apple when you close your eyes? Assess whether you experience total visual blindness of the mind's eye (Aphantasia), moderate visualization, or photorealistic inner cinema (Hyperphantasia) based on the VVIQ model by Dr. David Marks & Prof. Adam Zeman.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as AphantasiaCardLang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wide transition ${
                lang === l
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-white text-neutral-600 hover:bg-neutral-200/80 border border-neutral-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4">
        {!isCompleted ? (
          /* Quiz Question Flow */
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 transition-all">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>{progressPercent}% completed</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                <Eye className="w-3 h-3 text-sky-600" />
                {APHANTASIA_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  APHANTASIA_SUBSCALE_INFO[currentQuestion.subscale].name.en}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug mb-6">
              {currentQuestion.text[lang] || currentQuestion.text.en}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {answerLabels.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.val;
                return (
                  <button
                    key={opt.val}
                    onClick={() => handleSelectAnswer(opt.val)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-sky-600 bg-sky-50/70 text-sky-950 shadow-xs"
                        : "border-neutral-200 hover:border-sky-300 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-sky-600 bg-sky-600 text-white"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Back */}
            {currentQuestionIndex > 0 && (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-semibold transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous question</span>
              </button>
            )}
          </div>
        ) : (
          /* Results Presentation Screen */
          <div className="space-y-6">
            {/* Hero Result Banner */}
            <div className="bg-gradient-to-br from-neutral-950 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                    <span>#100 Milestone Result</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    VVIQ Score: {scoreResult.score} / 36 pts
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {activeProfile.title[lang] || activeProfile.title.en}
                  </h2>
                  <p className="text-sky-300 font-semibold text-sm">
                    {activeProfile.badge[lang] || activeProfile.badge.en} · Mental Imagery Vividness:{" "}
                    {scoreResult.percentage}%
                  </p>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed pt-1">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Actions: Share High-Res Story Card & Retake */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share 1080x1350 Story Card</span>
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
                <Layers className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Visual & Multisensory Subscale Vividness
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Visual Scene Vividness */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {APHANTASIA_SUBSCALE_INFO.visual_scene_vividness.name[lang] ||
                        APHANTASIA_SUBSCALE_INFO.visual_scene_vividness.name.en}
                    </span>
                    <span className="text-sky-600 font-bold">
                      {scoreResult.subscales.visual_scene_vividness.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-sky-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.visual_scene_vividness.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {APHANTASIA_SUBSCALE_INFO.visual_scene_vividness.description[lang] ||
                      APHANTASIA_SUBSCALE_INFO.visual_scene_vividness.description.en}
                  </p>
                </div>

                {/* 2. Facial & Object Precision */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {APHANTASIA_SUBSCALE_INFO.facial_object_precision.name[lang] ||
                        APHANTASIA_SUBSCALE_INFO.facial_object_precision.name.en}
                    </span>
                    <span className="text-cyan-600 font-bold">
                      {scoreResult.subscales.facial_object_precision.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-cyan-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.facial_object_precision.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {APHANTASIA_SUBSCALE_INFO.facial_object_precision.description[lang] ||
                      APHANTASIA_SUBSCALE_INFO.facial_object_precision.description.en}
                  </p>
                </div>

                {/* 3. Multisensory Inner Simulation */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {APHANTASIA_SUBSCALE_INFO.multisensory_inner_simulation.name[lang] ||
                        APHANTASIA_SUBSCALE_INFO.multisensory_inner_simulation.name.en}
                    </span>
                    <span className="text-blue-600 font-bold">
                      {scoreResult.subscales.multisensory_inner_simulation.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.multisensory_inner_simulation.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {APHANTASIA_SUBSCALE_INFO.multisensory_inner_simulation.description[lang] ||
                      APHANTASIA_SUBSCALE_INFO.multisensory_inner_simulation.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Neurobiology Science: Prof. Adam Zeman & Dr. David Marks (VVIQ Model)
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Cognitive Optimization & Life Strategy Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Need an external anchor for your memories and inner reflections?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Whether you have total aphantasia (relying on words, concepts, and spatial logic rather than pictures) or hyperphantasia (overwhelmed by hyper-vivid mental movies), your internal world deserves an external voice. In Nuju, speak your unfiltered stories, daydreams, or logical deductions into an encrypted sanctuary. Externalizing thoughts bridges the gap between consciousness and memory.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-400 hover:text-sky-300 transition"
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
                Explore Related Cognitive & Neurodivergent Screeners
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/quiz/alexithymia"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-sky-400 hover:bg-sky-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Alexithymia & Emotional Blindness</h5>
                    <p className="text-xs text-neutral-500">TAS-20 clinical scale for identifying feelings</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-600 transition" />
                </Link>

                <Link
                  to="/quiz/sensory-overload"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-teal-400 hover:bg-teal-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Sensory Overload & Stimulus Burnout</h5>
                    <p className="text-xs text-neutral-500">HSP sensitivity, light/sound filters & sensory fatigue</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-teal-600 transition" />
                </Link>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Neurodiversity Disclaimer:</strong> This screener is an interactive psychoeducational tool adapted from the Vividness of Visual Imagery Questionnaire (VVIQ) developed by Dr. David Marks and researched extensively by Prof. Adam Zeman. Aphantasia is recognized as a natural cognitive variation of the human mind, not a neurological disability or disease. If you have questions about neurological conditions or sudden changes in your visual imagery, consult a medical neurologist or psychologist.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <AphantasiaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

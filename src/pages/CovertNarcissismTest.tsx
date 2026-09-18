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
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  COVERT_NARCISSISM_QUESTIONS,
  COVERT_NARCISSISM_RESULTS,
  COVERT_NARCISSISM_OPTIONS,
  COVERT_NARCISSISM_SUBSCALE_INFO,
  getCovertNarcissismResult,
  calculateCovertNarcissismSubscales,
  CovertNarcissismCardLang,
} from "@/data/covert-narcissism";
import { CovertNarcissismShareCardModal } from "@/components/CovertNarcissismShareCardModal";
import { CovertNarcissismScoreResult } from "@/lib/generate-quiz-card";

export default function CovertNarcissismTest() {
  const [lang, setLang] = useState<CovertNarcissismCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = COVERT_NARCISSISM_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return COVERT_NARCISSISM_OPTIONS.map((opt) => ({
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

  const scoreResult: CovertNarcissismScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getCovertNarcissismResult(total);
    const rawSubscales = calculateCovertNarcissismSubscales(answers);

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
        defensive_hypersensitivity: {
          score: rawSubscales.defensive_hypersensitivity,
          percentage: Math.round((rawSubscales.defensive_hypersensitivity / 12) * 100),
        },
        covert_entitlement_grievance: {
          score: rawSubscales.covert_entitlement_grievance,
          percentage: Math.round((rawSubscales.covert_entitlement_grievance / 12) * 100),
        },
        martyrdom_victim_blame: {
          score: rawSubscales.martyrdom_victim_blame,
          percentage: Math.round((rawSubscales.martyrdom_victim_blame / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getCovertNarcissismResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Covert Narcissism & Vulnerable Self-Absorption Screener (Cheek HSNS Model)",
    headline: "Covert Narcissism Test: Screen Vulnerable Entitlement, Thin Skin & Silent Grievance",
    description:
      "Assess hypersensitive narcissism, covert superiority fantasies, silent resentment, and weaponized victimhood using the clinical Hypersensitive Narcissism Scale (HSNS) by Dr. Jonathan Cheek.",
    url: "https://nuju.app/quiz/covert-narcissism",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Covert Narcissism, Vulnerable Narcissistic Traits & Hypersensitivity",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Mentalization-Based Therapy (MBT)" },
        { "@type": "MedicalTherapy", name: "Schema Therapy for Vulnerable Narcissism" },
        { "@type": "MedicalTherapy", name: "Radical Acceptance & Humility Cultivation" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Very Characteristic of Humility) to 3 (Constantly / Severe Entrapment)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-indigo-200">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Narsisisme Terselubung Gratis | Cek Covert Narcissism & Mudah Tersinggung (HSNS)"
            : lang === "de"
            ? "Verdeckter Narzissmus Test (HSNS) | Vulnerabler Narzissmus & Kränkbarkeit"
            : lang === "fr"
            ? "Test de Narcissisme Vulnérable Gratuit | Échelle HSNS de Cheek & Hypersensibilité"
            : lang === "es"
            ? "Test de Narcisismo Encubierto Gratis | Escala HSNS de Cheek & Susceptibilidad"
            : "Covert Narcissism Test: Free Hypersensitive Narcissism Scale (HSNS)"
        }
        description={
          lang === "id"
            ? "Apakah kamu pendiam namun mudah tersinggung, merasa jenius tapi disalahpahami dunia, atau iri melihat orang lain dipuji? Ukur tingkat narsisisme terselubung dengan skala HSNS Dr. Jonathan Cheek."
            : "Discover whether quiet introversion masks fragile superiority, hyper-defensiveness, and bitter grievance with the free clinical Hypersensitive Narcissism Scale (HSNS) screener."
        }
        canonical="https://nuju.app/quiz/covert-narcissism"
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
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition">
              Ju
            </span>
            <span className="font-semibold text-neutral-900 tracking-tight">
              nuju<span className="text-indigo-600 font-bold">.quiz</span>
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
            {(["en", "id", "de", "fr", "es"] as CovertNarcissismCardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-lg transition uppercase ${
                  lang === l
                    ? "bg-white text-indigo-700 shadow-2xs font-bold"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-200">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span>Hypersensitive Narcissism Scale (HSNS) - Cheek & Hendin</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {lang === "id"
                  ? "Tes Narsisisme Terselubung (Covert Narcissism)"
                  : lang === "de"
                  ? "Verdeckter Narzissmus Selbsttest (HSNS)"
                  : lang === "fr"
                  ? "Test du Narcissisme Vulnérable & Caché"
                  : lang === "es"
                  ? "Test de Narcisismo Encubierto & Vulnerable"
                  : "Covert Narcissism & Vulnerability Screener"}
              </h1>
              <p className="mt-2 text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                {lang === "id"
                  ? "Berbeda dengan narsis flamboyan yang pamer, narsisisme terselubung tersembunyi dalam rasa malu, mudah tersinggung oleh kritik kecil, dan merasa jadi korban yang paling menderita."
                  : "Unlike grandiose narcissism, covert narcissism is quiet, hypersensitive to slights, resentful of others' recognition, and convinced of unappreciated uniqueness."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-semibold text-neutral-500 mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-indigo-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                  {currentQuestion.subscale === "defensive_hypersensitivity"
                    ? "Subscale: Defensive Hypersensitivity & Thin Skin"
                    : currentQuestion.subscale === "covert_entitlement_grievance"
                    ? "Subscale: Covert Entitlement & Resentful Grievance"
                    : "Subscale: Martyrdom & Weaponized Victimhood"}
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
                          ? "bg-indigo-50 border-indigo-400 text-indigo-950 font-semibold shadow-2xs"
                          : "bg-neutral-50/60 hover:bg-neutral-100/80 border-neutral-200 text-neutral-800"
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-relaxed">{opt.text}</span>
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-neutral-300 group-hover:border-indigo-400"
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
            <div className="bg-gradient-to-br from-indigo-950 via-neutral-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-2 text-white">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-5xl sm:text-6xl font-black text-indigo-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-neutral-300 text-sm sm:text-base font-medium">
                    Vulnerable Narcissism Load ({scoreResult.score}/36 pts)
                  </span>
                </div>

                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition"
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
                <Layers className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Hypersensitivity & Entitlement Subscales
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Defensive Hypersensitivity */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {COVERT_NARCISSISM_SUBSCALE_INFO.defensive_hypersensitivity.name[lang] ||
                        COVERT_NARCISSISM_SUBSCALE_INFO.defensive_hypersensitivity.name.en}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {scoreResult.subscales.defensive_hypersensitivity.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.defensive_hypersensitivity.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {COVERT_NARCISSISM_SUBSCALE_INFO.defensive_hypersensitivity.description[lang] ||
                      COVERT_NARCISSISM_SUBSCALE_INFO.defensive_hypersensitivity.description.en}
                  </p>
                </div>

                {/* 2. Covert Entitlement & Resentful Grievance */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {COVERT_NARCISSISM_SUBSCALE_INFO.covert_entitlement_grievance.name[lang] ||
                        COVERT_NARCISSISM_SUBSCALE_INFO.covert_entitlement_grievance.name.en}
                    </span>
                    <span className="text-purple-600 font-bold">
                      {scoreResult.subscales.covert_entitlement_grievance.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.covert_entitlement_grievance.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {COVERT_NARCISSISM_SUBSCALE_INFO.covert_entitlement_grievance.description[lang] ||
                      COVERT_NARCISSISM_SUBSCALE_INFO.covert_entitlement_grievance.description.en}
                  </p>
                </div>

                {/* 3. Martyrdom & Weaponized Victimhood */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {COVERT_NARCISSISM_SUBSCALE_INFO.martyrdom_victim_blame.name[lang] ||
                        COVERT_NARCISSISM_SUBSCALE_INFO.martyrdom_victim_blame.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.martyrdom_victim_blame.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.martyrdom_victim_blame.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {COVERT_NARCISSISM_SUBSCALE_INFO.martyrdom_victim_blame.description[lang] ||
                      COVERT_NARCISSISM_SUBSCALE_INFO.martyrdom_victim_blame.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Dr. Jonathan Cheek & Dr. Frank Hendin (HSNS Model)
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Grounded Security & Empathy Cultivation Protocol
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Exhausted by secret jealousy, quiet resentment, or feeling misunderstood?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Carrying silent envy or feeling deeply hurt by innocent comments is an exhausting burden to hide. In Nuju, speak your unfiltered hurt, anger, and feelings of unappreciated uniqueness into an encrypted sanctuary. Naming the shame openly helps dissolve the fragile defensive armor, allowing genuine peace and authentic self-esteem to take root.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition"
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
                  to="/quiz/comparison-trap"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Comparison Trap & Social Envy</h5>
                    <p className="text-xs text-neutral-500">Upward social comparison & status anxiety</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 transition" />
                </Link>

                <Link
                  to="/quiz/repressed-anger"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Repressed Anger & Somatic Fury</h5>
                    <p className="text-xs text-neutral-500">Silent resentment, emotional suppression & bitterness</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This screener is an interactive psychoeducational tool based on the Hypersensitive Narcissism Scale (HSNS) by Dr. Jonathan M. Cheek and Dr. Frank G. Hendin. It does not replace a formal psychological or psychiatric evaluation for Narcissistic Personality Disorder (NPD). If hypersensitivity, chronic envy, or resentment cause significant suffering in your personal or professional life, consider working with a licensed psychotherapist.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <CovertNarcissismShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

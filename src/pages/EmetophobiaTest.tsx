import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Share2,
  Layers,
  Heart,
  Activity,
  ShieldAlert,
  Shield,
  AlertCircle,
  Wind,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import {
  EMETOPHOBIA_QUESTIONS,
  EMETOPHOBIA_RESULTS,
  EMETOPHOBIA_OPTIONS,
  EMETOPHOBIA_SUBSCALE_INFO,
  getEmetophobiaResult,
  calculateEmetophobiaSubscales,
  EmetophobiaCardLang,
} from "@/data/emetophobia";
import { EmetophobiaShareCardModal } from "@/components/EmetophobiaShareCardModal";
import { EmetophobiaScoreResult } from "@/lib/generate-quiz-card";

export default function EmetophobiaTest() {
  const [lang, setLang] = useState<EmetophobiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = EMETOPHOBIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return EMETOPHOBIA_OPTIONS.map((opt) => ({
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

  const scoreResult: EmetophobiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getEmetophobiaResult(total);
    const rawSubscales = calculateEmetophobiaSubscales(answers);

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
        visceral_hypervigilance_nausea_panic: {
          score: rawSubscales.visceral_hypervigilance_nausea_panic,
          percentage: Math.round((rawSubscales.visceral_hypervigilance_nausea_panic / 12) * 100),
        },
        contamination_safety_checking_rituals: {
          score: rawSubscales.contamination_safety_checking_rituals,
          percentage: Math.round((rawSubscales.contamination_safety_checking_rituals / 12) * 100),
        },
        interpersonal_travel_avoidance_control: {
          score: rawSubscales.interpersonal_travel_avoidance_control,
          percentage: Math.round((rawSubscales.interpersonal_travel_avoidance_control / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getEmetophobiaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Emetophobia & Specific Phobia of Vomiting Screener (Veale SPOVI Model)",
    headline: "Emetophobia Test: Measure Fear of Vomiting, Nausea Hypervigilance & Safety Rituals",
    description:
      "Assess gastrointestinal panic, food contamination checking, and travel avoidance using the clinical SPOVI inventory by Prof. David Veale and Boschen.",
    url: "https://nuju.app/quiz/emetophobia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Emetophobia, Specific Phobia of Vomiting, SPOV, Visceral Anxiety",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Exposure and Response Prevention (ERP)" },
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Emetophobia" },
        { "@type": "MedicalTherapy", name: "Interoceptive Nausea Habituation" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Not at all / Never) to 3 (Severe / Daily Obsession)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Emetophobia Test: Fear of Vomiting & Nausea Panic Screener | Nuju"
        description="Do you live in terror of feeling nauseous, avoid restaurants, or check expiration dates compulsively? Screen emetophobia based on the Veale SPOVI model."
        canonicalUrl="https://nuju.app/quiz/emetophobia"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold uppercase tracking-wider mb-4 border border-sky-300 shadow-xs">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-600" />
          <span>Card #110 Clinical Screener · Veale SPOVI Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Emetophobia (Fear of Vomiting) Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Does the thought of nausea trigger intense panic? Do you wash your hands repeatedly, avoid sick people, and carry anti-nausea kits everywhere? Measure your phobic avoidance.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as EmetophobiaCardLang[]).map((l) => (
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
                  className="h-full bg-gradient-to-r from-sky-500 to-teal-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="min-h-[140px] flex flex-col justify-center mb-6">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-2">
                {EMETOPHOBIA_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  EMETOPHOBIA_SUBSCALE_INFO[currentQuestion.subscale].name.en}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
                {currentQuestion.text[lang] || currentQuestion.text.en}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {answerLabels.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelectAnswer(opt.val)}
                  className={`w-full text-left p-4 rounded-2xl border transition text-sm font-medium flex items-center justify-between ${
                    answers[currentQuestion.id] === opt.val
                      ? "border-sky-500 bg-sky-50/80 text-sky-950 font-semibold"
                      : "border-neutral-200 hover:border-sky-300 hover:bg-neutral-50 text-neutral-700"
                  }`}
                >
                  <span>{opt.text}</span>
                  <span className="text-xs text-neutral-400 font-mono ml-2">+{opt.val}</span>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <span className="text-neutral-400 font-medium">
                {questions.length - currentQuestionIndex - 1} questions remaining
              </span>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6 animate-fade-in">
            {/* Hero Result Banner */}
            <div className="bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Score Hero Stats */}
                <div className="grid grid-cols-2 gap-3 bg-white/5 backdrop-blur-xs rounded-2xl p-4 border border-white/10 mb-6">
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">
                      Emetophobia Phobia Index
                    </span>
                    <span className="text-3xl font-black text-sky-400">
                      {scoreResult.percentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">
                      SPOVI Raw Score
                    </span>
                    <span className="text-3xl font-black text-white">
                      {scoreResult.score}{" "}
                      <span className="text-sm font-normal text-neutral-400">/ 36 pts</span>
                    </span>
                  </div>
                </div>

                {/* Share Action */}
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-neutral-950 font-bold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>
                    {lang === "id"
                      ? "Lihat & Bagikan Story Card (1080x1350)"
                      : "Generate Aesthetic Story Card (1080x1350)"}
                  </span>
                </button>
              </div>
            </div>

            {/* Subscales Breakdown Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id" ? "Rincian Subskala Emetofobia" : "Emetophobia Subscale Breakdown"}
                </h3>
              </div>

              <div className="space-y-5">
                {/* Subscale 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {EMETOPHOBIA_SUBSCALE_INFO.visceral_hypervigilance_nausea_panic.name[lang] ||
                        EMETOPHOBIA_SUBSCALE_INFO.visceral_hypervigilance_nausea_panic.name.en}
                    </span>
                    <span className="text-sky-600 font-bold">
                      {scoreResult.subscales.visceral_hypervigilance_nausea_panic.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-sky-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.visceral_hypervigilance_nausea_panic.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {EMETOPHOBIA_SUBSCALE_INFO.visceral_hypervigilance_nausea_panic.description[lang] ||
                      EMETOPHOBIA_SUBSCALE_INFO.visceral_hypervigilance_nausea_panic.description.en}
                  </p>
                </div>

                {/* Subscale 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {EMETOPHOBIA_SUBSCALE_INFO.contamination_safety_checking_rituals.name[lang] ||
                        EMETOPHOBIA_SUBSCALE_INFO.contamination_safety_checking_rituals.name.en}
                    </span>
                    <span className="text-teal-600 font-bold">
                      {scoreResult.subscales.contamination_safety_checking_rituals.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.contamination_safety_checking_rituals.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {EMETOPHOBIA_SUBSCALE_INFO.contamination_safety_checking_rituals.description[lang] ||
                      EMETOPHOBIA_SUBSCALE_INFO.contamination_safety_checking_rituals.description.en}
                  </p>
                </div>

                {/* Subscale 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {EMETOPHOBIA_SUBSCALE_INFO.interpersonal_travel_avoidance_control.name[lang] ||
                        EMETOPHOBIA_SUBSCALE_INFO.interpersonal_travel_avoidance_control.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.interpersonal_travel_avoidance_control.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.interpersonal_travel_avoidance_control.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {EMETOPHOBIA_SUBSCALE_INFO.interpersonal_travel_avoidance_control.description[lang] ||
                      EMETOPHOBIA_SUBSCALE_INFO.interpersonal_travel_avoidance_control.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Neurobiology Box */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-bold text-sky-950">
                  {lang === "id"
                    ? "Neurobiologi Emetofobia: Mual Psikogenik vs Nyata"
                    : "Emetophobia Neurobiology: Psychogenic vs. Organic Nausea"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
              <div className="text-xs text-sky-900 bg-sky-100/70 rounded-2xl p-4 border border-sky-200">
                🧠 <strong>The Adrenaline-Nausea Loop:</strong> When panic surges, sympathetic adrenaline diverts blood away from the stomach. Gastric motility halts, creating a hollow, fluttering sensation in your throat and gut. Your brain misinterprets this anxiety flutter as "I am about to throw up," triggering more adrenaline. Recognizing that your nausea is created by fear—not a pathogen—is the core turning point in recovery.
              </div>
            </div>

            {/* Action Protocol Checklist */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id"
                    ? "Protokol Pemulihan & Melepas Ritual Penyelamat"
                    : "Recovery Protocol & Safety Behavior Fading"}
                </h3>
              </div>
              <ul className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Nuju App Somatic Grounding CTA */}
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                  Somatic Vagus Regulation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {lang === "id"
                    ? "Merasa Mual Saat Panik? Regulasi Sarafmu dengan Suara."
                    : "Feeling Nauseous From Panic? Regulate Your Vagus Nerve With Voice."}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Saat tenggorokan terasa tercekat dan lambung bergejolak karena cemas, buka Nuju. Bicara perlahan atau gunakan latihan napas di aplikasi untuk menstimulasi saraf vagus dan menurunkan alarm panik tubuh."
                    : "When interoceptive gastric panic flares, ground your autonomic nervous system. Soft vocal phonation directly stimulates the vagus nerve, calming digestive peristalsis within 60 seconds."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/app"
                    className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-md"
                  >
                    {lang === "id" ? "Buka Nuju Gratis" : "Open Nuju Free Web App"}
                  </Link>
                  <button
                    onClick={handleReset}
                    className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition border border-white/20 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{lang === "id" ? "Ulangi Tes" : "Retake Screener"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* In-Feed Google AdSense Banner */}
            <div className="my-8">
              <AdSenseBanner slot="quiz-hub-feed" format="horizontal" />
            </div>

            {/* Medical Disclaimer */}
            <footer className="border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400 space-y-2">
              <p className="font-medium text-neutral-500">
                ⚠️ <strong>Clinical Disclaimer:</strong> This screener is based on the Veale SPOVI
                framework for educational screening. It is not an official medical or psychiatric diagnosis.
                If emetophobia is severely impairing your nutrition, body weight, or daily functioning,
                please seek assistance from a licensed mental health professional.
              </p>
              <p>
                &copy; {new Date().getFullYear()} Nuju (nuju.app) · Visceral &amp; Phobia Screening Lab
              </p>
            </footer>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <EmetophobiaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

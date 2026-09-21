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
  Smartphone,
  Wifi,
  BatteryCharging,
  Eye,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import {
  NOMOPHOBIA_QUESTIONS,
  NOMOPHOBIA_RESULTS,
  NOMOPHOBIA_OPTIONS,
  NOMOPHOBIA_SUBSCALE_INFO,
  getNomophobiaResult,
  calculateNomophobiaSubscales,
  NomophobiaCardLang,
} from "@/data/nomophobia";
import { NomophobiaShareCardModal } from "@/components/NomophobiaShareCardModal";
import { NomophobiaScoreResult } from "@/lib/generate-quiz-card";

export default function NomophobiaTest() {
  const [lang, setLang] = useState<NomophobiaCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = NOMOPHOBIA_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return NOMOPHOBIA_OPTIONS.map((opt) => ({
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

  const scoreResult: NomophobiaScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getNomophobiaResult(total);
    const rawSubscales = calculateNomophobiaSubscales(answers);

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
        device_separation_panic_disconnect: {
          score: rawSubscales.device_separation_panic_disconnect,
          percentage: Math.round((rawSubscales.device_separation_panic_disconnect / 12) * 100),
        },
        compulsive_checking_phantom_vibrations: {
          score: rawSubscales.compulsive_checking_phantom_vibrations,
          percentage: Math.round((rawSubscales.compulsive_checking_phantom_vibrations / 12) * 100),
        },
        interpersonal_disconnection_fomo: {
          score: rawSubscales.interpersonal_disconnection_fomo,
          percentage: Math.round((rawSubscales.interpersonal_disconnection_fomo / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getNomophobiaResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Nomophobia & Smartphone Separation Anxiety Screener (Yildirim NMP-Q Model)",
    headline: "Nomophobia Test: Measure Smartphone Dependency, Phantom Vibrations & FOMO",
    description:
      "Assess smartphone separation anxiety, phantom vibration syndrome, and compulsive device checking using the clinical NMP-Q framework by Dr. Çağan Yıldırım and Correia.",
    url: "https://nuju.app/quiz/nomophobia",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Nomophobia, Smartphone Addiction, Digital Dependency, Separation Anxiety Disorder",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Digital Detox Architecture & Grayscale Friction" },
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Digital Addiction" },
        { "@type": "MedicalTherapy", name: "Attentional Mindfulness & Somatic Reconnection" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Disagree Completely / Never) to 3 (Strongly Agree / Severe Panic)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Nomophobia Test: Smartphone Addiction & Separation Anxiety Screener | Nuju"
        description="Do you panic when your phone battery drops below 15% or experience phantom vibrations? Screen nomophobia and smartphone dependency based on the NMP-Q model."
        canonicalUrl="https://nuju.app/quiz/nomophobia"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-300 shadow-xs">
          <Smartphone className="w-3.5 h-3.5 text-cyan-600" />
          <span>Card #111 Clinical Screener · Yildirim NMP-Q Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Nomophobia (Smartphone Separation Anxiety) Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Do you feel naked, panicked, or disoriented without your phone? Screen your device dependency, phantom vibration frequency, and reclaim your mental freedom.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as NomophobiaCardLang[]).map((l) => (
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
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="min-h-[140px] flex flex-col justify-center mb-6">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-2">
                {NOMOPHOBIA_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  NOMOPHOBIA_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                      ? "border-cyan-500 bg-cyan-50/80 text-cyan-950 font-semibold"
                      : "border-neutral-200 hover:border-cyan-300 hover:bg-neutral-50 text-neutral-700"
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
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
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
                      Nomophobia Index
                    </span>
                    <span className="text-3xl font-black text-cyan-400">
                      {scoreResult.percentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">
                      NMP-Q Raw Score
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
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-neutral-950 font-bold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
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
                <Layers className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id" ? "Rincian Subskala Nomofobia" : "Nomophobia Subscale Breakdown"}
                </h3>
              </div>

              <div className="space-y-5">
                {/* Subscale 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {NOMOPHOBIA_SUBSCALE_INFO.device_separation_panic_disconnect.name[lang] ||
                        NOMOPHOBIA_SUBSCALE_INFO.device_separation_panic_disconnect.name.en}
                    </span>
                    <span className="text-cyan-600 font-bold">
                      {scoreResult.subscales.device_separation_panic_disconnect.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.device_separation_panic_disconnect.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {NOMOPHOBIA_SUBSCALE_INFO.device_separation_panic_disconnect.description[lang] ||
                      NOMOPHOBIA_SUBSCALE_INFO.device_separation_panic_disconnect.description.en}
                  </p>
                </div>

                {/* Subscale 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {NOMOPHOBIA_SUBSCALE_INFO.compulsive_checking_phantom_vibrations.name[lang] ||
                        NOMOPHOBIA_SUBSCALE_INFO.compulsive_checking_phantom_vibrations.name.en}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {scoreResult.subscales.compulsive_checking_phantom_vibrations.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.compulsive_checking_phantom_vibrations.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {NOMOPHOBIA_SUBSCALE_INFO.compulsive_checking_phantom_vibrations.description[lang] ||
                      NOMOPHOBIA_SUBSCALE_INFO.compulsive_checking_phantom_vibrations.description.en}
                  </p>
                </div>

                {/* Subscale 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {NOMOPHOBIA_SUBSCALE_INFO.interpersonal_disconnection_fomo.name[lang] ||
                        NOMOPHOBIA_SUBSCALE_INFO.interpersonal_disconnection_fomo.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.interpersonal_disconnection_fomo.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.interpersonal_disconnection_fomo.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {NOMOPHOBIA_SUBSCALE_INFO.interpersonal_disconnection_fomo.description[lang] ||
                      NOMOPHOBIA_SUBSCALE_INFO.interpersonal_disconnection_fomo.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Neurobiology Box */}
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="w-5 h-5 text-cyan-700" />
                <h3 className="text-lg font-bold text-cyan-950">
                  {lang === "id"
                    ? "Neurobiologi Nomofobia: Jebakan Dopamin Variabel"
                    : "Nomophobia Neurobiology: Variable Ratio Dopamine Traps"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
              <div className="text-xs text-cyan-900 bg-cyan-100/70 rounded-2xl p-4 border border-cyan-200">
                📱 <strong>B.F. Skinner Intermittent Reinforcement:</strong> Every time you pull down to refresh a feed or unlock your phone, your brain's nucleus accumbens treats it like a slot machine. You don't know whether you will receive an exciting text, an alarming email, or nothing at all. This unpredictability floods your neural pathways with anticipatory dopamine, creating severe separation anxiety when the device is absent.
              </div>
            </div>

            {/* Action Protocol Checklist */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id"
                    ? "Protokol Pemulihan Kedaulatan Digital"
                    : "Digital Sovereignty Recovery Protocol"}
                </h3>
              </div>
              <ul className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                      <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Nuju Voice Journaling as Screen Detox CTA */}
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                  Screen-Free Vocal Expression
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {lang === "id"
                    ? "Tutup Matamu. Bicara Tanpa Menatap Layar."
                    : "Close Your Eyes. Speak Without Staring at a Screen."}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Saat tanganmu gatal ingin scrolling tanpa tujuan, buka Nuju. Cukup tekan tombol rekam sekali, letakkan ponselmu terbalik di meja, dan lepaskan isi kepalamu lewat suara tanpa radiasi cahaya biru."
                    : "Break the doomscroll cycle. Tap record on Nuju once, lay your phone face-down on the table, and vent your thoughts out loud into the dark without blue-light visual overstimulation."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/app"
                    className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-md"
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
                ⚠️ <strong>Clinical Disclaimer:</strong> This screener is based on the Yildirim &amp;
                Correia NMP-Q framework for personal self-reflection. It is not an official psychiatric
                diagnosis. If smartphone dependency is causing severe insomnia, relationship breakdowns,
                or clinical depression, consider consulting a behavioral health professional.
              </p>
              <p>
                &copy; {new Date().getFullYear()} Nuju (nuju.app) · Digital Psychology &amp; Behavioral Lab
              </p>
            </footer>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <NomophobiaShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

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
  Calendar,
  AlertTriangle,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  PMDD_QUESTIONS,
  PMDD_RESULTS,
  PMDD_OPTIONS,
  PMDD_SUBSCALE_INFO,
  getPmddResult,
  calculatePmddSubscales,
  PmddCardLang,
} from "@/data/pmdd";
import { PmddShareCardModal } from "@/components/PmddShareCardModal";
import { PmddScoreResult } from "@/lib/generate-quiz-card";

export default function PmddTest() {
  const [lang, setLang] = useState<PmddCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = PMDD_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return PMDD_OPTIONS.map((opt) => ({
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

  const scoreResult: PmddScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getPmddResult(total);
    const rawSubscales = calculatePmddSubscales(answers);

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
        luteal_affective_lability_rage: {
          score: rawSubscales.luteal_affective_lability_rage,
          percentage: Math.round((rawSubscales.luteal_affective_lability_rage / 12) * 100),
        },
        interpersonal_friction_rejection_pain: {
          score: rawSubscales.interpersonal_friction_rejection_pain,
          percentage: Math.round((rawSubscales.interpersonal_friction_rejection_pain / 12) * 100),
        },
        somatic_cognitive_exhaustion_rapid_remission: {
          score: rawSubscales.somatic_cognitive_exhaustion_rapid_remission,
          percentage: Math.round((rawSubscales.somatic_cognitive_exhaustion_rapid_remission / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getPmddResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Premenstrual Dysphoric Disorder (PMDD) Screener (Steiner DRSP & DSM-5 Model)",
    headline: "PMDD Test: Screen Premenstrual Dysphoria, Luteal Rage & Rapid Remission",
    description:
      "Assess premenstrual affective lability, luteal rage, rejection sensitivity, and rapid flow remission using the clinical DRSP framework by Dr. Meir Steiner & Dr. Teri Pearlstein.",
    url: "https://nuju.app/quiz/pmdd",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Premenstrual Dysphoric Disorder, PMDD, Severe PMS, Luteal Phase Dysphoria",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Luteal-Phase Intermittent SSRI Pharmacotherapy" },
        { "@type": "MedicalTherapy", name: "Ovulation Suppression via Monophasic Contraception" },
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy & Cycle Boundary Mapping" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Not at all / Normal) to 3 (Severe / Incapacitating)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="PMDD Test: Premenstrual Dysphoric Disorder & Luteal Rage Screener | Nuju"
        description="Do you experience uncontrollable rage, sudden despair, or extreme brain fog 7-10 days before your period? Screen PMDD symptoms based on the Steiner DRSP model."
        canonicalUrl="https://nuju.app/quiz/pmdd"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-900 text-xs font-bold uppercase tracking-wider mb-4 border border-fuchsia-300 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>Card #109 Clinical Screener · Steiner DRSP &amp; DSM-5 Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Premenstrual Dysphoric Disorder (PMDD) Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Do you feel like an unrecognizable person takes over your emotions before your period—only for the darkness to vanish within 48 hours of bleeding? Screen your luteal phase vulnerability.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as PmddCardLang[]).map((l) => (
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
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-rose-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="min-h-[140px] flex flex-col justify-center mb-6">
              <span className="text-xs font-bold text-fuchsia-700 uppercase tracking-wider mb-2">
                {PMDD_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  PMDD_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                      ? "border-fuchsia-500 bg-fuchsia-50/80 text-fuchsia-950 font-semibold"
                      : "border-neutral-200 hover:border-fuchsia-300 hover:bg-neutral-50 text-neutral-700"
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
            <div className="bg-gradient-to-br from-neutral-950 via-fuchsia-950 to-neutral-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-400/20 text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-3">
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
                      PMDD Vulnerability Index
                    </span>
                    <span className="text-3xl font-black text-fuchsia-400">
                      {scoreResult.percentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">
                      DRSP Score
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
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 text-white font-bold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
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
                <Layers className="w-5 h-5 text-fuchsia-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id" ? "Rincian Subskala Luteal" : "Luteal Phase Subscale Breakdown"}
                </h3>
              </div>

              <div className="space-y-5">
                {/* Subscale 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {PMDD_SUBSCALE_INFO.luteal_affective_lability_rage.name[lang] ||
                        PMDD_SUBSCALE_INFO.luteal_affective_lability_rage.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.luteal_affective_lability_rage.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.luteal_affective_lability_rage.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {PMDD_SUBSCALE_INFO.luteal_affective_lability_rage.description[lang] ||
                      PMDD_SUBSCALE_INFO.luteal_affective_lability_rage.description.en}
                  </p>
                </div>

                {/* Subscale 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {PMDD_SUBSCALE_INFO.interpersonal_friction_rejection_pain.name[lang] ||
                        PMDD_SUBSCALE_INFO.interpersonal_friction_rejection_pain.name.en}
                    </span>
                    <span className="text-purple-600 font-bold">
                      {scoreResult.subscales.interpersonal_friction_rejection_pain.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.interpersonal_friction_rejection_pain.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {PMDD_SUBSCALE_INFO.interpersonal_friction_rejection_pain.description[lang] ||
                      PMDD_SUBSCALE_INFO.interpersonal_friction_rejection_pain.description.en}
                  </p>
                </div>

                {/* Subscale 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {PMDD_SUBSCALE_INFO.somatic_cognitive_exhaustion_rapid_remission.name[lang] ||
                        PMDD_SUBSCALE_INFO.somatic_cognitive_exhaustion_rapid_remission.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.somatic_cognitive_exhaustion_rapid_remission.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.somatic_cognitive_exhaustion_rapid_remission.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {PMDD_SUBSCALE_INFO.somatic_cognitive_exhaustion_rapid_remission.description[lang] ||
                      PMDD_SUBSCALE_INFO.somatic_cognitive_exhaustion_rapid_remission.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Neurobiology Box */}
            <div className="bg-fuchsia-50/70 border border-fuchsia-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-fuchsia-700" />
                <h3 className="text-lg font-bold text-fuchsia-950">
                  {lang === "id"
                    ? "Neurobiologi PMDD: Bukan 'Kekurangan Hormon'"
                    : "PMDD Neurobiology: Not a 'Hormone Imbalance'"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
              <div className="text-xs text-fuchsia-900 bg-fuchsia-100/70 rounded-2xl p-4 border border-fuchsia-200">
                🧬 <strong>NIH Neurogenetics Landmark Finding:</strong> In 2017, the National
                Institutes of Health (NIH) proved that individuals with PMDD possess an altered
                ESC/E(Z) gene complex. Your brain cells have a heightened sensitivity to normal
                post-ovulation neurosteroid shifts. You are not "crazy" or weak—your GABA-A receptors
                experience cyclical neurochemical shock.
              </div>
            </div>

            {/* Action Protocol Checklist */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-fuchsia-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id"
                    ? "Protokol Pemulihan & Batasan Luteal"
                    : "Luteal Boundary & Recovery Protocol"}
                </h3>
              </div>
              <ul className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                      <span className="w-5 h-5 rounded-full bg-fuchsia-100 text-fuchsia-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Nuju Private Emotional Venting CTA */}
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-wider mb-3">
                  Non-Judgmental Luteal Venting
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {lang === "id"
                    ? "Jangan Kirim Pesan Marah ke Pasangan. Curhatkan ke Nuju."
                    : "Don't Send That Breakup Text. Vent to Nuju Instead."}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Saat amarah luteal membakar dadamu dan kamu ingin merusak segalanya, buka Nuju. Lepaskan kemarahanmu secara aman lewat rekaman suara pribadi tanpa risiko melukai hubungan yang kamu cintai."
                    : "When cyclical luteal rage hijacks your nervous system, discharge the heat safely. Speak your raw emotions into Nuju's zero-judgment private voice space before making life-altering decisions."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/app"
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm transition shadow-md"
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
                ⚠️ <strong>Clinical & Safety Disclaimer:</strong> This screener is based on the Steiner &
                Pearlstein DRSP criteria for educational screening. It does not replace a clinical
                evaluation by a gynecologist or psychiatrist. If you experience active suicidal ideation
                or severe depression during your luteal phase, please reach out to emergency mental health
                services immediately (US: 988, UK: 111, ID: 119 ext 8).
              </p>
              <p>
                &copy; {new Date().getFullYear()} Nuju (nuju.app) · Women's Reproductive Neurobiology Lab
              </p>
            </footer>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <PmddShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

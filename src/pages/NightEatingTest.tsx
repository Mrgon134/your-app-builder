import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Share2,
  Layers,
  Heart,
  Moon,
  Activity,
  ShieldAlert,
  Clock,
  Coffee,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  NIGHT_EATING_QUESTIONS,
  NIGHT_EATING_RESULTS,
  NIGHT_EATING_OPTIONS,
  NIGHT_EATING_SUBSCALE_INFO,
  getNightEatingResult,
  calculateNightEatingSubscales,
  NightEatingCardLang,
} from "@/data/night-eating";
import { NightEatingShareCardModal } from "@/components/NightEatingShareCardModal";
import { NightEatingScoreResult } from "@/lib/generate-quiz-card";

export default function NightEatingTest() {
  const [lang, setLang] = useState<NightEatingCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = NIGHT_EATING_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return NIGHT_EATING_OPTIONS.map((opt) => ({
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

  const scoreResult: NightEatingScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getNightEatingResult(total);
    const rawSubscales = calculateNightEatingSubscales(answers);

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
        circadian_delay_morning_anorexia: {
          score: rawSubscales.circadian_delay_morning_anorexia,
          percentage: Math.round((rawSubscales.circadian_delay_morning_anorexia / 12) * 100),
        },
        nocturnal_awakenings_ingestion_urge: {
          score: rawSubscales.nocturnal_awakenings_ingestion_urge,
          percentage: Math.round((rawSubscales.nocturnal_awakenings_ingestion_urge / 12) * 100),
        },
        evening_dysphoria_sleep_fragmentation: {
          score: rawSubscales.evening_dysphoria_sleep_fragmentation,
          percentage: Math.round((rawSubscales.evening_dysphoria_sleep_fragmentation / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getNightEatingResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Night Eating Syndrome (NES) Screener (Stunkard & Allison NEQ Model)",
    headline: "Night Eating Syndrome Test: Assess Midnight Cravings, Morning Anorexia & Circadian Delay",
    description:
      "Assess late-night hyperphagia, nocturnal awakenings to eat, and circadian phase delay using the clinical framework by Dr. Albert Stunkard and Dr. Kelly Allison.",
    url: "https://nuju.app/quiz/night-eating",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Night Eating Syndrome, Circadian Eating Disorder, Nocturnal Hyperphagia",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Circadian Bright Light Therapy" },
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Night Eating (CBT-NES)" },
        { "@type": "MedicalTherapy", name: "Chronobiological Nutritional Re-timing & SSRI Pharmacotherapy" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Synchronized) to 3 (Almost Nightly / Severe Compulsion)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Night Eating Syndrome Test: Midnight Cravings & Circadian Screener | Nuju"
        description="Do you raid the fridge late at night and skip breakfast? Measure nocturnal eating urges and circadian delay based on the Stunkard NEQ model."
        canonicalUrl="https://nuju.app/quiz/night-eating"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-300 shadow-xs">
          <Moon className="w-3.5 h-3.5 text-amber-600" />
          <span>Card #108 Clinical Screener · Stunkard NEQ Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Night Eating Syndrome &amp; Circadian Delay Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Do you struggle with morning appetite suppression, evening calorie backloading, and waking at night with an uncontrollable urge to eat carbohydrates? Evaluate your biological clock.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as NightEatingCardLang[]).map((l) => (
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
                  className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="min-h-[140px] flex flex-col justify-center mb-6">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                {NIGHT_EATING_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  NIGHT_EATING_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                      ? "border-amber-500 bg-amber-50/80 text-amber-950 font-semibold"
                      : "border-neutral-200 hover:border-amber-300 hover:bg-neutral-50 text-neutral-700"
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
            <div className="bg-gradient-to-br from-neutral-900 via-indigo-950 to-neutral-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
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
                      Night Eating Index
                    </span>
                    <span className="text-3xl font-black text-amber-400">
                      {scoreResult.percentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-medium block">
                      NEQ Raw Score
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
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-bold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
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
                <Layers className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id" ? "Rincian Subskala Sirkadian" : "Circadian Subscale Breakdown"}
                </h3>
              </div>

              <div className="space-y-5">
                {/* Subscale 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {NIGHT_EATING_SUBSCALE_INFO.circadian_delay_morning_anorexia.name[lang] ||
                        NIGHT_EATING_SUBSCALE_INFO.circadian_delay_morning_anorexia.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.circadian_delay_morning_anorexia.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.circadian_delay_morning_anorexia.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {NIGHT_EATING_SUBSCALE_INFO.circadian_delay_morning_anorexia.description[lang] ||
                      NIGHT_EATING_SUBSCALE_INFO.circadian_delay_morning_anorexia.description.en}
                  </p>
                </div>

                {/* Subscale 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {NIGHT_EATING_SUBSCALE_INFO.nocturnal_awakenings_ingestion_urge.name[lang] ||
                        NIGHT_EATING_SUBSCALE_INFO.nocturnal_awakenings_ingestion_urge.name.en}
                    </span>
                    <span className="text-indigo-600 font-bold">
                      {scoreResult.subscales.nocturnal_awakenings_ingestion_urge.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.nocturnal_awakenings_ingestion_urge.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {NIGHT_EATING_SUBSCALE_INFO.nocturnal_awakenings_ingestion_urge.description[lang] ||
                      NIGHT_EATING_SUBSCALE_INFO.nocturnal_awakenings_ingestion_urge.description.en}
                  </p>
                </div>

                {/* Subscale 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-neutral-700">
                      {NIGHT_EATING_SUBSCALE_INFO.evening_dysphoria_sleep_fragmentation.name[lang] ||
                        NIGHT_EATING_SUBSCALE_INFO.evening_dysphoria_sleep_fragmentation.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.evening_dysphoria_sleep_fragmentation.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.evening_dysphoria_sleep_fragmentation.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {NIGHT_EATING_SUBSCALE_INFO.evening_dysphoria_sleep_fragmentation.description[lang] ||
                      NIGHT_EATING_SUBSCALE_INFO.evening_dysphoria_sleep_fragmentation.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Neurobiology & Chronobiology Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-amber-700" />
                <h3 className="text-lg font-bold text-amber-950">
                  {lang === "id"
                    ? "Neurobiologi Sirkadian: Mengapa Ini Terjadi?"
                    : "Circadian Neurobiology: Why Does This Happen?"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
              <div className="text-xs text-amber-900 bg-amber-100/70 rounded-2xl p-4 border border-amber-200">
                💡 <strong>Clinical Chronotherapy Insight:</strong> Night eating is rarely about
                "gluttony" or "lack of discipline." It represents an inverted circadian phase delay
                where the brain requires carbohydrates to spark nocturnal tryptophan-serotonin
                synthesis. Recovery requires synchronizing the suprachiasmatic nucleus (SCN) rather
                than restrictive dieting.
              </div>
            </div>

            {/* Action Protocol Checklist */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-neutral-900">
                  {lang === "id"
                    ? "Protokol Pemulihan Ritme Sirkadian"
                    : "Circadian Rhythm Recovery Protocol"}
                </h3>
              </div>
              <ul className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Nuju App Bedtime Voice Journaling CTA */}
            <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                  Bedside Somatic Journaling
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {lang === "id"
                    ? "Terbangun Jam 2 Dini Hari? Bicara pada Nuju, Jangan ke Kulkas."
                    : "Waking Up at 2 AM? Whisper to Nuju Instead of Raiding the Fridge."}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                  {lang === "id"
                    ? "Saat dorongan lapar palsu datang karena kesepian atau kecemasan, buka Nuju dalam mode gelap dan rekam bisikan hatimu selama 30 detik untuk menurunkan hormon kortisol secara alami."
                    : "When midnight restlessness hits, soothe your nervous system with private voice venting. Lower autonomic cortisol without reaching for processed snacks."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/app"
                    className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-md"
                  >
                    {lang === "id" ? "Coba Nuju Gratis" : "Open Nuju Free Web App"}
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
                ⚠️ <strong>Clinical Disclaimer:</strong> This screener is for educational and
                self-reflection purposes based on the Stunkard & Allison NEQ criteria. It is not an
                official clinical psychiatric diagnosis. If you suffer from chronic insomnia, severe
                metabolic distress, or rapid weight fluctuations, please consult a physician or sleep
                specialist.
              </p>
              <p>
                &copy; {new Date().getFullYear()} Nuju (nuju.app) · Circadian Mental Vitality Lab
              </p>
            </footer>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <NightEatingShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

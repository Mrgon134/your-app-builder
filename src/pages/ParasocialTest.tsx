import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Share2,
  Layers,
  Heart,
  Radio,
  Activity,
  ShieldAlert,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  PARASOCIAL_QUESTIONS,
  PARASOCIAL_RESULTS,
  PARASOCIAL_OPTIONS,
  PARASOCIAL_SUBSCALE_INFO,
  getParasocialResult,
  calculateParasocialSubscales,
  ParasocialCardLang,
} from "@/data/parasocial";
import { ParasocialShareCardModal } from "@/components/ParasocialShareCardModal";
import { ParasocialScoreResult } from "@/lib/generate-quiz-card";

export default function ParasocialTest() {
  const [lang, setLang] = useState<ParasocialCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = PARASOCIAL_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return PARASOCIAL_OPTIONS.map((opt) => ({
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

  const scoreResult: ParasocialScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getParasocialResult(total);
    const rawSubscales = calculateParasocialSubscales(answers);

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
        perceived_two_way_illusion: {
          score: rawSubscales.perceived_two_way_illusion,
          percentage: Math.round((rawSubscales.perceived_two_way_illusion / 12) * 100),
        },
        emotional_dependency_consolation: {
          score: rawSubscales.emotional_dependency_consolation,
          percentage: Math.round((rawSubscales.emotional_dependency_consolation / 12) * 100),
        },
        reality_social_substitution: {
          score: rawSubscales.reality_social_substitution,
          percentage: Math.round((rawSubscales.reality_social_substitution / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getParasocialResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Parasocial Attachment & Digital Intimacy Screener (Horton & Wohl PSI Model)",
    headline: "Parasocial Relationship Test: Measure Streamer Attachment & Virtual Intimacy",
    description:
      "Assess one-sided emotional bonding, two-way friendship illusions, streamer emotional dependency, and social reality substitution using the Horton & Wohl Parasocial Interaction model.",
    url: "https://nuju.app/quiz/parasocial-relationship",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Parasocial Attachment, Digital Intimacy Illusion, Social Isolation",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Reciprocal Social Re-engagement" },
        { "@type": "MedicalTherapy", name: "Digital Detox & Boundary Reconstruction" },
        { "@type": "MedicalTherapy", name: "Attachment-Informed Psychotherapy" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Clear Boundaries) to 3 (Constantly / Severe Enmeshment)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Parasocial Relationship Test: Streamer & Influencer Attachment Screener | Nuju"
        description="Are you emotionally attached to a streamer, VTuber, or creator? Measure one-sided digital intimacy, emotional dependency, and social substitution."
        canonicalUrl="https://nuju.app/quiz/parasocial-relationship"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-4 border border-cyan-300 shadow-xs">
          <Radio className="w-3.5 h-3.5 text-cyan-600" />
          <span>Card #105 Clinical Screener · Horton & Wohl PSI Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Parasocial Attachment & Digital Intimacy Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Do you feel a personal connection with a streamer or influencer that replaces real-world companionship? Evaluate your parasocial bond, emotional reliance, and reality substitution levels.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as ParasocialCardLang[]).map((l) => (
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
                  className="h-full bg-cyan-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-md border border-cyan-200">
                <Radio className="w-3 h-3 text-cyan-600" />
                {PARASOCIAL_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  PARASOCIAL_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                        ? "border-cyan-600 bg-cyan-50/70 text-cyan-950 shadow-xs"
                        : "border-neutral-200 hover:border-cyan-300 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-cyan-600 bg-cyan-600 text-white"
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
            <div className="bg-gradient-to-br from-neutral-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cyan-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Card #105 Diagnostic Result</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    PSI Score: {scoreResult.score} / 36 pts
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {activeProfile.title[lang] || activeProfile.title.en}
                  </h2>
                  <p className="text-cyan-300 font-semibold text-sm">
                    {activeProfile.badge[lang] || activeProfile.badge.en} · Parasocial Intensity:{" "}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-xs sm:text-sm transition shadow-lg"
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
                <Layers className="w-5 h-5 text-cyan-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Clinical Parasocial Subscales
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Perceived Two-Way Illusion */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {PARASOCIAL_SUBSCALE_INFO.perceived_two_way_illusion.name[lang] ||
                        PARASOCIAL_SUBSCALE_INFO.perceived_two_way_illusion.name.en}
                    </span>
                    <span className="text-cyan-600 font-bold">
                      {scoreResult.subscales.perceived_two_way_illusion.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.perceived_two_way_illusion.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {PARASOCIAL_SUBSCALE_INFO.perceived_two_way_illusion.description[lang] ||
                      PARASOCIAL_SUBSCALE_INFO.perceived_two_way_illusion.description.en}
                  </p>
                </div>

                {/* 2. Emotional Dependency & Consolation */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {PARASOCIAL_SUBSCALE_INFO.emotional_dependency_consolation.name[lang] ||
                        PARASOCIAL_SUBSCALE_INFO.emotional_dependency_consolation.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.emotional_dependency_consolation.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.emotional_dependency_consolation.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {PARASOCIAL_SUBSCALE_INFO.emotional_dependency_consolation.description[lang] ||
                      PARASOCIAL_SUBSCALE_INFO.emotional_dependency_consolation.description.en}
                  </p>
                </div>

                {/* 3. Reality & Social Substitution */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {PARASOCIAL_SUBSCALE_INFO.reality_social_substitution.name[lang] ||
                        PARASOCIAL_SUBSCALE_INFO.reality_social_substitution.name.en}
                    </span>
                    <span className="text-purple-600 font-bold">
                      {scoreResult.subscales.reality_social_substitution.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.reality_social_substitution.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {PARASOCIAL_SUBSCALE_INFO.reality_social_substitution.description[lang] ||
                      PARASOCIAL_SUBSCALE_INFO.reality_social_substitution.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Horton & Wohl (1956) & Rubin-Perse Parasocial Interaction Theory
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
                  Evidence-Based Parasocial Boundary Protocol
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

            {/* Mascot Ju Real-Life Connection Box */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Craving Real Connection Without Performance Pressure?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    It's easy to turn streamers into surrogate companions when offline socialization feels terrifying or hollow. On Nuju, explore your relational boundaries, journal your unspoken feelings, and rebuild genuine human connection.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition shadow-sm"
                    >
                      <span>Explore Grounded Connection on Nuju</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Medical & Clinical Disclaimer:</strong> This screener is an educational self-reflection instrument derived from Donald Horton, Richard Wohl, and Alan Rubin's media psychology research. It does not constitute a psychiatric diagnosis. If virtual attachments cause profound social avoidance or financial distress, please consult a licensed counselor or mental health professional.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <ParasocialShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

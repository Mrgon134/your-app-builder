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
  Flame,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  FAMILY_SCAPEGOAT_QUESTIONS,
  FAMILY_SCAPEGOAT_RESULTS,
  FAMILY_SCAPEGOAT_OPTIONS,
  FAMILY_SCAPEGOAT_SUBSCALE_INFO,
  getFamilyScapegoatResult,
  calculateFamilyScapegoatSubscales,
  FamilyScapegoatCardLang,
} from "@/data/family-scapegoat";
import { FamilyScapegoatShareCardModal } from "@/components/FamilyScapegoatShareCardModal";
import { FamilyScapegoatScoreResult } from "@/lib/generate-quiz-card";

export default function FamilyScapegoatTest() {
  const [lang, setLang] = useState<FamilyScapegoatCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = FAMILY_SCAPEGOAT_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return FAMILY_SCAPEGOAT_OPTIONS.map((opt) => ({
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

  const scoreResult: FamilyScapegoatScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getFamilyScapegoatResult(total);
    const rawSubscales = calculateFamilyScapegoatSubscales(answers);

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
        systemic_blame_projection: {
          score: rawSubscales.systemic_blame_projection,
          percentage: Math.round((rawSubscales.systemic_blame_projection / 12) * 100),
        },
        smear_campaign_gaslighting: {
          score: rawSubscales.smear_campaign_gaslighting,
          percentage: Math.round((rawSubscales.smear_campaign_gaslighting / 12) * 100),
        },
        internalized_defective_identity: {
          score: rawSubscales.internalized_defective_identity,
          percentage: Math.round((rawSubscales.internalized_defective_identity / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getFamilyScapegoatResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Family Scapegoat Syndrome Screener (Mandeville FSA & Bowen Systems Model)",
    headline: "Family Scapegoat Test: Measure Systemic Blame, Smear Campaigns & Black Sheep Trauma",
    description:
      "Assess whether you were chosen as the family scapegoat in a dysfunctional or narcissistic family system using Rebecca Mandeville's FSA model and Murray Bowen's family systems theory.",
    url: "https://nuju.app/quiz/family-scapegoat",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Family Scapegoat Abuse (FSA), Complex Relational Trauma, Narcissistic Family Systems",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Strategic Low-Contact / Boundary Differentiation" },
        { "@type": "MedicalTherapy", name: "Trauma-Informed Shame Deconstruction (IFS/EMDR)" },
        { "@type": "MedicalTherapy", name: "Chosen Family Cultivation & Sovereignty" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Fair Family) to 3 (Always / Severe Systemic Abuse)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Family Scapegoat Test: Black Sheep Trauma & Blame Dynamics Screener | Nuju"
        description="Were you assigned the scapegoat role in your family? Measure systemic blame projection, smear campaigns, and internalized defective identity based on Rebecca Mandeville's FSA model."
        canonicalUrl="https://nuju.app/quiz/family-scapegoat"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-300 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-orange-600" />
          <span>Card #103 Clinical Screener · Mandeville FSA Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Family Scapegoat Syndrome Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Were you automatically blamed for family problems while siblings were excused? Unpack systemic blame projection, character assassination smear campaigns, and unlearn the belief that you are broken.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as FamilyScapegoatCardLang[]).map((l) => (
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
                  className="h-full bg-orange-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                <Flame className="w-3 h-3 text-orange-600" />
                {FAMILY_SCAPEGOAT_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  FAMILY_SCAPEGOAT_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                        ? "border-orange-600 bg-orange-50/70 text-orange-950 shadow-xs"
                        : "border-neutral-200 hover:border-orange-300 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-orange-600 bg-orange-600 text-white"
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
            <div className="bg-gradient-to-br from-neutral-950 via-stone-900 to-orange-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                    <span>Card #103 Diagnostic Result</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    FSA Score: {scoreResult.score} / 36 pts
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {activeProfile.title[lang] || activeProfile.title.en}
                  </h2>
                  <p className="text-orange-300 font-semibold text-sm">
                    {activeProfile.badge[lang] || activeProfile.badge.en} · Scapegoat Burden Index:{" "}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm transition shadow-lg"
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
                <Layers className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Family Scapegoat Subscale Breakdown
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Systemic Blame Projection */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {FAMILY_SCAPEGOAT_SUBSCALE_INFO.systemic_blame_projection.name[lang] ||
                        FAMILY_SCAPEGOAT_SUBSCALE_INFO.systemic_blame_projection.name.en}
                    </span>
                    <span className="text-orange-600 font-bold">
                      {scoreResult.subscales.systemic_blame_projection.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.systemic_blame_projection.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {FAMILY_SCAPEGOAT_SUBSCALE_INFO.systemic_blame_projection.description[lang] ||
                      FAMILY_SCAPEGOAT_SUBSCALE_INFO.systemic_blame_projection.description.en}
                  </p>
                </div>

                {/* 2. Smear Campaign Gaslighting */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {FAMILY_SCAPEGOAT_SUBSCALE_INFO.smear_campaign_gaslighting.name[lang] ||
                        FAMILY_SCAPEGOAT_SUBSCALE_INFO.smear_campaign_gaslighting.name.en}
                    </span>
                    <span className="text-red-600 font-bold">
                      {scoreResult.subscales.smear_campaign_gaslighting.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.smear_campaign_gaslighting.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {FAMILY_SCAPEGOAT_SUBSCALE_INFO.smear_campaign_gaslighting.description[lang] ||
                      FAMILY_SCAPEGOAT_SUBSCALE_INFO.smear_campaign_gaslighting.description.en}
                  </p>
                </div>

                {/* 3. Internalized Defective Identity */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {FAMILY_SCAPEGOAT_SUBSCALE_INFO.internalized_defective_identity.name[lang] ||
                        FAMILY_SCAPEGOAT_SUBSCALE_INFO.internalized_defective_identity.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.internalized_defective_identity.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${scoreResult.subscales.internalized_defective_identity.percentage}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {FAMILY_SCAPEGOAT_SUBSCALE_INFO.internalized_defective_identity.description[lang] ||
                      FAMILY_SCAPEGOAT_SUBSCALE_INFO.internalized_defective_identity.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-orange-50/70 border border-orange-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Rebecca Mandeville (FSA) & Dr. Murray Bowen Family Systems Theory
                </h3>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {activeProfile.psychology[lang] || activeProfile.psychology.en}
              </p>
            </div>

            {/* Action Protocol */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Recovery & Sovereignty Protocol for the Black Sheep
                </h3>
              </div>

              <div className="space-y-3">
                {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60"
                    >
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-neutral-700 leading-relaxed">{action}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Mascot Ju Safe Sanctuary Box */}
            <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  Ju
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Need a Space Where Your Truth Is Never Denied?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Growing up as the family scapegoat trains you to silence your voice and expect betrayal. In Nuju, you have an unbreachable private sanctuary. Record your rawest feelings, vent without fear of being gaslighted, and reclaim your inherent worth.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-100 transition shadow-sm"
                    >
                      <span>Reclaim Your Voice on Nuju</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Medical & Clinical Disclaimer:</strong> This screener is an educational and self-reflection tool inspired by Rebecca Mandeville's Family Scapegoat Abuse model and Murray Bowen's family systems theory. It does not replace professional therapy. If you are struggling with severe relational trauma or depression, consider working with a trauma-informed psychologist.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <FamilyScapegoatShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

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
  Flame,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  RETROSPECTIVE_JEALOUSY_QUESTIONS,
  RETROSPECTIVE_JEALOUSY_RESULTS,
  RETROSPECTIVE_JEALOUSY_OPTIONS,
  RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO,
  getRetrospectiveJealousyResult,
  calculateRetrospectiveJealousySubscales,
  RetrospectiveJealousyCardLang,
} from "@/data/retrospective-jealousy";
import { RetrospectiveJealousyShareCardModal } from "@/components/RetrospectiveJealousyShareCardModal";
import { RetrospectiveJealousyScoreResult } from "@/lib/generate-quiz-card";

export default function RetrospectiveJealousyTest() {
  const [lang, setLang] = useState<RetrospectiveJealousyCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = RETROSPECTIVE_JEALOUSY_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return RETROSPECTIVE_JEALOUSY_OPTIONS.map((opt) => ({
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

  const scoreResult: RetrospectiveJealousyScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3; // 12 * 3 = 36
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getRetrospectiveJealousyResult(total);
    const rawSubscales = calculateRetrospectiveJealousySubscales(answers);

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
        intrusive_mental_movies: {
          score: rawSubscales.intrusive_mental_movies,
          percentage: Math.round((rawSubscales.intrusive_mental_movies / 12) * 100),
        },
        compulsive_investigative_checking: {
          score: rawSubscales.compulsive_investigative_checking,
          percentage: Math.round((rawSubscales.compulsive_investigative_checking / 12) * 100),
        },
        moral_contamination_fear: {
          score: rawSubscales.moral_contamination_fear,
          percentage: Math.round((rawSubscales.moral_contamination_fear / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getRetrospectiveJealousyResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Retrospective Jealousy & Romantic Past Screener (Dr. Robert L. Leahy Model)",
    headline: "Retrospective Jealousy Test: Screen Partner Past Obsession & Retroactive OCD",
    description:
      "Assess retroactive jealousy, intrusive mental movies of partner's past intimacy, compulsive interrogation, and moral contamination anxiety using the cognitive model by Dr. Robert L. Leahy and Zachary Stockill.",
    url: "https://nuju.app/quiz/retrospective-jealousy",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Retroactive Jealousy, Relationship OCD (ROCD) & Partner Past Ruminations",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy for Jealousy (CBT)" },
        { "@type": "MedicalTherapy", name: "Exposure and Response Prevention (ERP)" },
        { "@type": "MedicalTherapy", name: "Acceptance and Commitment Therapy (ACT)" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Present-grounded security) to 3 (Constantly / Debilitating mental movies & interrogation)",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      <SEOHead
        title="Retrospective Jealousy Test: Partner's Past & Retroactive OCD Screener | Nuju"
        description="Are you tormented by your partner's romantic or sexual history? Take our clinically grounded Retrospective Jealousy Screener based on Dr. Robert L. Leahy's cognitive model to measure intrusive mental movies and reassurance compulsions."
        canonicalUrl="https://nuju.app/quiz/retrospective-jealousy"
        jsonLd={jsonLdData}
      />

      {/* Top Banner Ad */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-4">
        <AdSenseBanner slot="quiz-top" format="horizontal" />
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-300 shadow-xs">
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          <span>Clinical Relationship Screener · Leahy Cognitive Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Retrospective Jealousy Screener
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Do involuntary mental movies of your partner's romantic past flash through your mind? Measure intrusive imagery, compulsive interrogation of their exes, and moral contamination fear using the cognitive framework of Dr. Robert L. Leahy and Zachary Stockill.
        </p>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {(["en", "id", "de", "fr", "es"] as RetrospectiveJealousyCardLang[]).map((l) => (
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
                  className="h-full bg-rose-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Subscale Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                <Eye className="w-3 h-3 text-rose-600" />
                {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                  RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                        ? "border-rose-600 bg-rose-50/70 text-rose-950 shadow-xs"
                        : "border-neutral-200 hover:border-rose-300 hover:bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-rose-600 bg-rose-600 text-white"
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
            <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-800/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                    <span>Clinical Profile Assessment</span>
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    RJ Score: {scoreResult.score} / 36 pts
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                    {activeProfile.title[lang] || activeProfile.title.en}
                  </h2>
                  <p className="text-rose-300 font-semibold text-sm">
                    {activeProfile.badge[lang] || activeProfile.badge.en} · Retroactive OCD Burden:{" "}
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition shadow-lg"
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
                <Layers className="w-5 h-5 text-rose-600" />
                <h2 className="text-lg font-bold text-neutral-900">
                  Retroactive Obsession & Compulsion Subscales
                </h2>
              </div>

              <div className="space-y-6">
                {/* 1. Intrusive Mental Movies */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.intrusive_mental_movies.name[lang] ||
                        RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.intrusive_mental_movies.name.en}
                    </span>
                    <span className="text-rose-600 font-bold">
                      {scoreResult.subscales.intrusive_mental_movies.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${scoreResult.subscales.intrusive_mental_movies.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.intrusive_mental_movies.description[lang] ||
                      RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.intrusive_mental_movies.description.en}
                  </p>
                </div>

                {/* 2. Compulsive Checking & Interrogation */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.compulsive_investigative_checking.name[lang] ||
                        RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.compulsive_investigative_checking.name.en}
                    </span>
                    <span className="text-pink-600 font-bold">
                      {scoreResult.subscales.compulsive_investigative_checking.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-pink-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.compulsive_investigative_checking.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.compulsive_investigative_checking.description[lang] ||
                      RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.compulsive_investigative_checking.description.en}
                  </p>
                </div>

                {/* 3. Moral Contamination Fear */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="text-neutral-800">
                      {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.moral_contamination_fear.name[lang] ||
                        RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.moral_contamination_fear.name.en}
                    </span>
                    <span className="text-amber-600 font-bold">
                      {scoreResult.subscales.moral_contamination_fear.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${scoreResult.subscales.moral_contamination_fear.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.moral_contamination_fear.description[lang] ||
                      RETROSPECTIVE_JEALOUSY_SUBSCALE_INFO.moral_contamination_fear.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Psychological Analysis & Science */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                  Clinical Science: Dr. Robert L. Leahy & Zachary Stockill (RJ Model)
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
                  Reassurance Ceasefire & Defusion Protocol
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
                    Need to discharge jealousy and rage without interrogating your partner?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Interrogating your partner late at night will never cure retrospective jealousy; it only feeds the OCD loop. In Nuju, speak your unfiltered hurt, vivid mental movies, and irrational anger into a completely private, encrypted voice sanctuary. Venting your panic to Ju allows your nervous system to down-regulate, protecting your relationship from destructive confrontations.
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
                Explore Related Relationship & Attachment Screeners
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/quiz/limerence"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-rose-400 hover:bg-rose-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Limerence & Obsessive Love Screener</h5>
                    <p className="text-xs text-neutral-500">Dr. Dorothy Tennov scale for intrusive infatuation</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 transition" />
                </Link>

                <Link
                  to="/quiz/attachment"
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900 text-sm">Attachment Style Screener</h5>
                    <p className="text-xs text-neutral-500">Anxious, Avoidant, or Secure romantic attachment</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 transition" />
                </Link>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed">
              <p>
                <strong>Educational & Psychoeducational Disclaimer:</strong> This screener is an interactive psychoeducational tool based on the cognitive models of Dr. Robert L. Leahy and Zachary Stockill. It does not replace a formal clinical evaluation for Obsessive-Compulsive Disorder (OCD) or Relationship OCD (ROCD). If intrusive thoughts or compulsions cause severe distress or relationship dysfunction, please seek guidance from a licensed psychotherapist trained in ERP and CBT.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Share Card Modal */}
      <RetrospectiveJealousyShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </div>
  );
}

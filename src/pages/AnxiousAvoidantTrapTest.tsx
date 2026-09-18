import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  Brain,
  ShieldAlert,
  Activity,
  HeartCrack,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  ANXIOUS_AVOIDANT_QUESTIONS,
  ANXIOUS_AVOIDANT_RESULTS,
  ANXIOUS_AVOIDANT_OPTIONS,
  ANXIOUS_AVOIDANT_SUBSCALE_INFO,
  getAnxiousAvoidantResult,
  calculateAnxiousAvoidantSubscales,
  AnxiousAvoidantCardLang,
} from "@/data/anxious-avoidant-trap";
import { AnxiousAvoidantTrapShareCardModal } from "@/components/AnxiousAvoidantTrapShareCardModal";
import { AnxiousAvoidantScoreResult } from "@/lib/generate-quiz-card";

export default function AnxiousAvoidantTrapTest() {
  const [lang, setLang] = useState<AnxiousAvoidantCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = ANXIOUS_AVOIDANT_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return ANXIOUS_AVOIDANT_OPTIONS.map((opt) => ({
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

  const scoreResult: AnxiousAvoidantScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getAnxiousAvoidantResult(total);
    const rawSubscales = calculateAnxiousAvoidantSubscales(answers);

    return {
      score: total,
      percentage,
      level: levelObj.level,
      profile: {
        title: levelObj.title,
        badge: levelObj.badge,
        summary: levelObj.summary,
        neurobiology: levelObj.neurobiology,
        actionProtocol: levelObj.actionProtocol,
      },
      subscales: {
        anxious_pursuit: {
          score: rawSubscales.anxious_pursuit,
          percentage: Math.round((rawSubscales.anxious_pursuit / 16) * 100),
        },
        avoidant_distancing: {
          score: rawSubscales.avoidant_distancing,
          percentage: Math.round((rawSubscales.avoidant_distancing / 16) * 100),
        },
        cycle_dysregulation: {
          score: rawSubscales.cycle_dysregulation,
          percentage: Math.round((rawSubscales.cycle_dysregulation / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getAnxiousAvoidantResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Anxious-Avoidant Trap & Pursue-Withdraw Screener (EFT Model)",
    headline: "Anxious Avoidant Trap Test: Screen Relationship Push-Pull Whiplash & Dysregulation",
    description:
      "Assess whether relational distress, frantic protest behaviors, and cold emotional withdrawal are signs of the clinical anxious-avoidant attachment trap.",
    url: "https://nuju.app/quiz/anxious-avoidant-trap",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Pursue-Withdraw Attachment Trap",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Emotionally Focused Therapy (EFT)" },
        { "@type": "MedicalTherapy", name: "Attachment De-escalation Protocol" },
        { "@type": "MedicalTherapy", name: "Somatic Vagal Co-regulation" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never) to 4 (Constantly)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Anxious-Avoidant Trap Test: Pursue-Withdraw Dynamic Screener (EFT Model)"
        description="Take the 12-item clinical Anxious-Avoidant Trap Screener (Dr. Sue Johnson EFT model). Measure anxious pursuit, avoidant distancing, and push-pull whiplash."
        canonical="https://nuju.app/quiz/anxious-avoidant-trap"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/30">
        {/* Header Navigation */}
        <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              to="/test-psikologi"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Psychology Tests</span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-neutral-800/80 p-1 rounded-full border border-neutral-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as AnxiousAvoidantCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {/* Top Banner AdSlot */}
          <div className="mb-8">
            <AdSenseBanner slot="quiz-top-banner" format="auto" />
          </div>

          {!isCompleted ? (
            /* Test Question Runner */
            <div className="space-y-6">
              {/* Introduction Banner */}
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <HeartCrack className="w-3.5 h-3.5" />
                    EFT ATTACHMENT MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Sue Johnson & Dr. Amir Levine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Anxious-Avoidant Trap & Pursue-Withdraw Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  The anxious-avoidant trap is the most common and destructive relational dynamic. One partner chases and demands reassurance; the other feels suffocated and withdraws, triggering an escalating cycle of abandonment panic, cold stonewalling, and nervous system whiplash.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-amber-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {ANXIOUS_AVOIDANT_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      ANXIOUS_AVOIDANT_SUBSCALE_INFO[currentQuestion.subscale].name.en}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </h2>

                {/* Option Buttons */}
                <div className="space-y-2.5">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between group ${
                          isSelected
                            ? "bg-amber-600/20 border-amber-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-amber-400 bg-amber-500 text-white"
                              : "border-neutral-600 group-hover:border-neutral-400"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-rose-400 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in-50 duration-500">
              {/* Primary Score Banner */}
              <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    Score: {scoreResult.score} / 48 ({scoreResult.percentage}%)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white mb-3">
                  {activeProfile.title[lang] || activeProfile.title.en}
                </h1>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {activeProfile.summary[lang] || activeProfile.summary.en}
                </p>

                {/* Share Card Modal Trigger */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-600/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Generate Share Card (Story / TikTok)</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Screener</span>
                  </button>
                </div>
              </div>

              {/* Subscale Radar Breakdown */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Pursue-Withdraw Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Review the balance between anxious pursuit, avoidant withdrawal, and overall cycle whiplash:
                </p>

                <div className="space-y-5">
                  {/* Anxious Pursuit */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {ANXIOUS_AVOIDANT_SUBSCALE_INFO.anxious_pursuit.name[lang] ||
                          ANXIOUS_AVOIDANT_SUBSCALE_INFO.anxious_pursuit.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.anxious_pursuit.score} / 16 (
                        {scoreResult.subscales.anxious_pursuit.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.anxious_pursuit.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {ANXIOUS_AVOIDANT_SUBSCALE_INFO.anxious_pursuit.description[lang] ||
                        ANXIOUS_AVOIDANT_SUBSCALE_INFO.anxious_pursuit.description.en}
                    </p>
                  </div>

                  {/* Avoidant Distancing */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {ANXIOUS_AVOIDANT_SUBSCALE_INFO.avoidant_distancing.name[lang] ||
                          ANXIOUS_AVOIDANT_SUBSCALE_INFO.avoidant_distancing.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.avoidant_distancing.score} / 16 (
                        {scoreResult.subscales.avoidant_distancing.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.avoidant_distancing.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {ANXIOUS_AVOIDANT_SUBSCALE_INFO.avoidant_distancing.description[lang] ||
                        ANXIOUS_AVOIDANT_SUBSCALE_INFO.avoidant_distancing.description.en}
                    </p>
                  </div>

                  {/* Cycle Dysregulation */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {ANXIOUS_AVOIDANT_SUBSCALE_INFO.cycle_dysregulation.name[lang] ||
                          ANXIOUS_AVOIDANT_SUBSCALE_INFO.cycle_dysregulation.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.cycle_dysregulation.score} / 16 (
                        {scoreResult.subscales.cycle_dysregulation.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.cycle_dysregulation.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {ANXIOUS_AVOIDANT_SUBSCALE_INFO.cycle_dysregulation.description[lang] ||
                        ANXIOUS_AVOIDANT_SUBSCALE_INFO.cycle_dysregulation.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span>The Neurobiology of the Pursue-Withdraw Trap</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-amber-300">Attachment Science: </span>
                  Attachment distress triggers the same neurobiological pain pathways (dorsal anterior cingulate cortex) as severe physical burns. To break the trap, partners must recognize that protest behaviors (pursuit) and deactivating strategies (withdrawal) are desperate attempts to manage visceral nervous system agony.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>EFT De-escalation & Cycle-Breaking Protocol</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  EMOTIONAL DE-ESCALATION
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Stop Texting in Panic. Vent to Nuju First.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Before sending walls of furious texts or disappearing for three days in silence, open Nuju. Speaking your raw, uncensored abandonment panic or feelings of suffocation into an encrypted private audio journal burns off acute cortisol and preserves your relationship.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition shadow-lg shadow-amber-600/25"
                >
                  <span>Experience Encrypted Voice Journaling Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* AdSense Result Banner */}
              <div className="pt-2">
                <AdSenseBanner slot="quiz-result-banner" format="auto" />
              </div>

              {/* Related Mental Health Tests */}
              <div className="pt-4 border-t border-neutral-800">
                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">
                  Explore Complementary Screeners
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to="/quiz/stonewalling"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-indigo-400 mb-1 block">Gottman Model</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">
                      Stonewalling & Silent Treatment Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/attachment-style"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-emerald-400 mb-1 block">Attachment Theory</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                      Adult Attachment Style Assessment →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/trauma-bond"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Intermittent Reinforcement</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Trauma Bond & Toxic Attraction Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/rocd"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-pink-400 mb-1 block">Prof. Guy Doron</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-pink-300 transition">
                      Relationship OCD (ROCD) Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <AnxiousAvoidantTrapShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

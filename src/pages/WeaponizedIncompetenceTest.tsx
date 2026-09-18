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
  Scale,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  WEAPONIZED_INCOMPETENCE_QUESTIONS,
  WEAPONIZED_INCOMPETENCE_RESULTS,
  WEAPONIZED_INCOMPETENCE_OPTIONS,
  WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO,
  getWeaponizedIncompetenceResult,
  calculateWeaponizedIncompetenceSubscales,
  WeaponizedIncompetenceCardLang,
} from "@/data/weaponized-incompetence";
import { WeaponizedIncompetenceShareCardModal } from "@/components/WeaponizedIncompetenceShareCardModal";
import { WeaponizedIncompetenceScoreResult } from "@/lib/generate-quiz-card";

export default function WeaponizedIncompetenceTest() {
  const [lang, setLang] = useState<WeaponizedIncompetenceCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = WEAPONIZED_INCOMPETENCE_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return WEAPONIZED_INCOMPETENCE_OPTIONS.map((opt) => ({
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

  const scoreResult: WeaponizedIncompetenceScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getWeaponizedIncompetenceResult(total);
    const rawSubscales = calculateWeaponizedIncompetenceSubscales(answers);

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
        strategic_helplessness: {
          score: rawSubscales.strategic_helplessness,
          percentage: Math.round((rawSubscales.strategic_helplessness / 16) * 100),
        },
        mental_load_disparity: {
          score: rawSubscales.mental_load_disparity,
          percentage: Math.round((rawSubscales.mental_load_disparity / 16) * 100),
        },
        parent_child_exhaustion: {
          score: rawSubscales.parent_child_exhaustion,
          percentage: Math.round((rawSubscales.parent_child_exhaustion / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getWeaponizedIncompetenceResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Weaponized Incompetence & Mental Load Screener (Fair Play & Strategic Helplessness Model)",
    headline: "Weaponized Incompetence Test: Measure Strategic Helplessness & Domestic Labor Disparity",
    description:
      "Assess whether your partner or coworker uses feigned incompetence, strategic botching, and cognitive offloading to dump domestic and mental labor onto you.",
    url: "https://nuju.app/quiz/weaponized-incompetence",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Domestic Labor Exhaustion & Relationship Resentment",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Eve Rodsky Fair Play Card Deck Negotiation" },
        { "@type": "MedicalTherapy", name: "Non-Violent Direct Confrontation & Zero-Rescue Boundaries" },
        { "@type": "MedicalTherapy", name: "Couples Therapy for Resentment and Emotional Parentification" },
      ],
    },
    hasPart: questions.map((q, idx) => ({
      "@type": "Question",
      name: `Item ${idx + 1}`,
      text: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rated from 0 (Never / Completely False) to 4 (Always / Daily Agony)",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Weaponized Incompetence Test: Screen Mental Load Disparity & Feigned Helplessness"
        description="Take the evidence-based 12-item Weaponized Incompetence Screener (Fair Play model). Measure strategic helplessness, domestic cognitive overload, and parent-child relationship erosion."
        canonical="https://nuju.app/quiz/weaponized-incompetence"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-rose-500/30">
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
              {(["en", "id", "de", "fr", "es"] as WeaponizedIncompetenceCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-rose-600 text-white shadow-xs"
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
              <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    <Scale className="w-3.5 h-3.5" />
                    FAIR PLAY &amp; COGNITIVE LOAD MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Eve Rodsky &amp; Dr. Arlie Hochschild</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Weaponized Incompetence &amp; Mental Load Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Weaponized incompetence (strategic helplessness) is a covert manipulation tactic where a partner or colleague intentionally botches tasks, acts clueless, or asks endless trivial questions until you give up and do it yourself. Screen your domestic inequality and emotional parentification.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-rose-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "bg-rose-600/20 border-rose-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-rose-400 bg-rose-500 text-white"
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
              <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-rose-300">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-rose-600/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Generate Share Card (Story / Partner Talk)</span>
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

              {/* Subscale Breakdown */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>Labor Disparity Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Weaponized incompetence operates across three destructive dimensions. Review your burden distribution:
                </p>

                <div className="space-y-5">
                  {/* Strategic Helplessness */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.strategic_helplessness.name[lang] ||
                          WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.strategic_helplessness.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.strategic_helplessness.score} / 16 (
                        {scoreResult.subscales.strategic_helplessness.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.strategic_helplessness.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.strategic_helplessness.description[lang] ||
                        WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.strategic_helplessness.description.en}
                    </p>
                  </div>

                  {/* Mental Load Disparity */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.mental_load_disparity.name[lang] ||
                          WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.mental_load_disparity.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.mental_load_disparity.score} / 16 (
                        {scoreResult.subscales.mental_load_disparity.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.mental_load_disparity.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.mental_load_disparity.description[lang] ||
                        WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.mental_load_disparity.description.en}
                    </p>
                  </div>

                  {/* Parent-Child Exhaustion */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.parent_child_exhaustion.name[lang] ||
                          WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.parent_child_exhaustion.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.parent_child_exhaustion.score} / 16 (
                        {scoreResult.subscales.parent_child_exhaustion.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.parent_child_exhaustion.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.parent_child_exhaustion.description[lang] ||
                        WEAPONIZED_INCOMPETENCE_SUBSCALE_INFO.parent_child_exhaustion.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-rose-400" />
                  <span>The Psychology &amp; Erotic Toll of Unequal Labor</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-rose-300">Crucial Relational Law: </span>
                  Resentment is the absolute antidote to sexual desire and emotional safety. You cannot feel romantic attraction toward someone you have to parent, monitor, or clean up after. Rebalancing requires ending the &quot;manager-intern&quot; dynamic and establishing Full Task Conception, Planning, and Execution (CPE).
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Fair Play Boundary &amp; Labor Reclamation Steps</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  ZERO RESCUE SANCTUARY
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Vent the Rage You Cannot Share at the Dinner Table
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Suppressing domestic frustration leads to somatic chronic illness, jaw clenching, and explosive fights. Nuju gives you an encrypted audio space to articulate the raw truth about your mental load, release resentment safely, and clarify your non-negotiable boundaries before speaking.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition shadow-lg shadow-rose-600/25"
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
                    to="/quiz/anxious-avoidant-trap"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Attachment Dance</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Anxious-Avoidant Trap Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/toxic-relationship"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-amber-400 mb-1 block">Relational Health</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                      Toxic Relationship Index →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/codependency"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-pink-400 mb-1 block">Boundary Dynamics</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-pink-300 transition">
                      Codependency &amp; Self-Silencing Screener →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/functional-freeze"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-emerald-400 mb-1 block">Polyvagal Freeze</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                      Functional Freeze &amp; Collapse Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <WeaponizedIncompetenceShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

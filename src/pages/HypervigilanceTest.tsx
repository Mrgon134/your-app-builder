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
  Eye,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  HYPERVIGILANCE_QUESTIONS,
  HYPERVIGILANCE_RESULTS,
  HYPERVIGILANCE_OPTIONS,
  HYPERVIGILANCE_SUBSCALE_INFO,
  getHypervigilanceResult,
  calculateHypervigilanceSubscales,
  HypervigilanceCardLang,
} from "@/data/hypervigilance";
import { HypervigilanceShareCardModal } from "@/components/HypervigilanceShareCardModal";
import { HypervigilanceScoreResult } from "@/lib/generate-quiz-card";

export default function HypervigilanceTest() {
  const [lang, setLang] = useState<HypervigilanceCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = HYPERVIGILANCE_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return HYPERVIGILANCE_OPTIONS.map((opt) => ({
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

  const scoreResult: HypervigilanceScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getHypervigilanceResult(total);
    const rawSubscales = calculateHypervigilanceSubscales(answers);

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
        environmental_threat_scanning: {
          score: rawSubscales.environmental_threat_scanning,
          percentage: Math.round((rawSubscales.environmental_threat_scanning / 16) * 100),
        },
        interpersonal_micro_attunement: {
          score: rawSubscales.interpersonal_micro_attunement,
          percentage: Math.round((rawSubscales.interpersonal_micro_attunement / 16) * 100),
        },
        autonomic_exhaustion: {
          score: rawSubscales.autonomic_exhaustion,
          percentage: Math.round((rawSubscales.autonomic_exhaustion / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeProfile = getHypervigilanceResult(scoreResult.score);

  // Schema.org Structured Data
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Quiz"],
    name: "Hypervigilance & Chronic Threat Scanning Screener (Stephen Porges Polyvagal Model)",
    headline: "Hypervigilance Test: Measure Autonomic Threat Scanning & Startle Reactivity",
    description:
      "Assess whether chronic nervous system alertness, walking on eggshells, and sensory threat scanning are depleting your physical energy and preventing restorative rest.",
    url: "https://nuju.app/quiz/hypervigilance",
    medicalAudience: "Patient",
    about: {
      "@type": "MedicalCondition",
      name: "Traumatic Hypervigilance & Sympathetic Nervous System Overdrive",
      possibleTreatment: [
        { "@type": "MedicalTherapy", name: "Polyvagal Somatic Grounding (Dr. Stephen Porges Model)" },
        { "@type": "MedicalTherapy", name: "Bilateral Stimulation & Vagal Nerve Re-regulation" },
        { "@type": "MedicalTherapy", name: "Uncensored Audio Decompression & Safe Interoceptive Venting" },
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
        title="Hypervigilance Test: Screen Chronic Threat Scanning & Nervous Alertness"
        description="Take the evidence-based 12-item Hypervigilance Screener (Dr. Stephen Porges & Peter Levine model). Measure environmental scanning, eggshell walking, and autonomic exhaustion."
        canonical="https://nuju.app/quiz/hypervigilance"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30">
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
              {(["en", "id", "de", "fr", "es"] as HypervigilanceCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-medium transition ${
                    lang === l
                      ? "bg-emerald-500 text-neutral-950 shadow-xs font-bold"
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
              <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Eye className="w-3.5 h-3.5" />
                    POLYVAGAL NEUROCEPTION MODEL
                  </span>
                  <span className="text-xs text-neutral-400">Dr. Stephen Porges &amp; Dr. Peter Levine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Hypervigilance &amp; Chronic Threat Scanning Screener
                </h1>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Hypervigilance is the state of relentless nervous system alertness where the brain treats everyday environments and conversations as active combat zones. Sitting with your back against walls, jumping at sudden noises, and scanning tone shifts for rejection are biological survival defenses that slowly exhaust adrenal reserves and body armor.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-emerald-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-neutral-400">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Current Question Card */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {HYPERVIGILANCE_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      HYPERVIGILANCE_SUBSCALE_INFO[currentQuestion.subscale].name.en}
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
                            ? "bg-emerald-600/20 border-emerald-500 text-white"
                            : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-emerald-400 bg-emerald-500 text-neutral-950"
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
              <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-neutral-950 shadow-xs">
                    {activeProfile.badge[lang] || activeProfile.badge.en}
                  </span>
                  <span className="text-xs font-bold text-emerald-300">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-emerald-500/20"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Generate Share Card (Story / Social)</span>
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
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Hypervigilance Subscale Breakdown</span>
                </h2>
                <p className="text-xs text-neutral-400 mb-6">
                  Autonomic threat scanning operates across three distinct biological dimensions:
                </p>

                <div className="space-y-5">
                  {/* Environmental Threat Scanning */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {HYPERVIGILANCE_SUBSCALE_INFO.environmental_threat_scanning.name[lang] ||
                          HYPERVIGILANCE_SUBSCALE_INFO.environmental_threat_scanning.name.en}
                      </span>
                      <span className="text-emerald-400">
                        {scoreResult.subscales.environmental_threat_scanning.score} / 16 (
                        {scoreResult.subscales.environmental_threat_scanning.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.environmental_threat_scanning.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {HYPERVIGILANCE_SUBSCALE_INFO.environmental_threat_scanning.description[lang] ||
                        HYPERVIGILANCE_SUBSCALE_INFO.environmental_threat_scanning.description.en}
                    </p>
                  </div>

                  {/* Interpersonal Micro-Attunement */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {HYPERVIGILANCE_SUBSCALE_INFO.interpersonal_micro_attunement.name[lang] ||
                          HYPERVIGILANCE_SUBSCALE_INFO.interpersonal_micro_attunement.name.en}
                      </span>
                      <span className="text-emerald-400">
                        {scoreResult.subscales.interpersonal_micro_attunement.score} / 16 (
                        {scoreResult.subscales.interpersonal_micro_attunement.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.interpersonal_micro_attunement.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {HYPERVIGILANCE_SUBSCALE_INFO.interpersonal_micro_attunement.description[lang] ||
                        HYPERVIGILANCE_SUBSCALE_INFO.interpersonal_micro_attunement.description.en}
                    </p>
                  </div>

                  {/* Autonomic Exhaustion */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-neutral-200">
                        {HYPERVIGILANCE_SUBSCALE_INFO.autonomic_exhaustion.name[lang] ||
                          HYPERVIGILANCE_SUBSCALE_INFO.autonomic_exhaustion.name.en}
                      </span>
                      <span className="text-emerald-400">
                        {scoreResult.subscales.autonomic_exhaustion.score} / 16 (
                        {scoreResult.subscales.autonomic_exhaustion.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.autonomic_exhaustion.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      {HYPERVIGILANCE_SUBSCALE_INFO.autonomic_exhaustion.description[lang] ||
                        HYPERVIGILANCE_SUBSCALE_INFO.autonomic_exhaustion.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <span>The Neurobiology of Threat Neuroception</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {activeProfile.neurobiology[lang] || activeProfile.neurobiology.en}
                </p>
                <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed">
                  <span className="font-semibold text-emerald-300">Dr. Stephen Porges Polyvagal Law: </span>
                  Neuroception evaluates risk in the environment without awareness of conscious thought. If your nervous system feels unsafe, no amount of positive thinking can force your muscles to drop their armor.
                </div>
              </div>

              {/* Action Protocol Recommendations */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Somatic Grounding &amp; Safety Protocol</span>
                </h2>
                <div className="space-y-3">
                  {(activeProfile.actionProtocol[lang] || activeProfile.actionProtocol.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nuju Private Voice Journal Funnel CTA */}
              <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/70 via-neutral-900 to-neutral-900 p-6 sm:p-8 shadow-xl text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  DROP YOUR WEAPONS &amp; ARMOR
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  A Safe Sanctuary Where You Finally Can Stand Down
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Your nervous system has been standing guard for years, scanning every horizon for betrayal. In Nuju, there are no audiences, no eyes, and no threat. Speak your rawest panic, tremble, sigh, and teach your body that you are finally out of harm&apos;s way.
                </p>
                <Link
                  to="/install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-emerald-500/25"
                >
                  <span>Experience Somatic Voice Grounding Free</span>
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
                    to="/quiz/window-of-tolerance"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-emerald-400 mb-1 block">Nervous Capacity</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                      Window of Tolerance &amp; Dysregulation Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/somatic-armoring"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-cyan-400 mb-1 block">Body Tension</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                      Somatic Armoring &amp; Chronic Muscular Armor Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/emotional-flashback"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-purple-400 mb-1 block">CPTSD Triggers</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition">
                      Emotional Flashback &amp; Amygdala Hijack Test →
                    </h4>
                  </Link>

                  <Link
                    to="/quiz/betrayal-trauma"
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition group"
                  >
                    <span className="text-xs font-bold text-rose-400 mb-1 block">Relational Mistrust</span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                      Betrayal Trauma &amp; Blindness Screener →
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Modal */}
      <HypervigilanceShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Share2,
  BookOpen,
  Activity,
  ShieldAlert,
  Brain,
  Wind,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  FUNCTIONAL_FREEZE_QUESTIONS,
  FUNCTIONAL_FREEZE_LEVELS,
  FunctionalFreezeResultLevel,
} from "@/data/functional-freeze";
import { FunctionalFreezeShareCardModal } from "@/components/FunctionalFreezeShareCardModal";
import { FunctionalFreezeScoreResult, FunctionalFreezeLang } from "@/lib/generate-quiz-card";

export default function FunctionalFreezeTest() {
  const [lang, setLang] = useState<FunctionalFreezeLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = FUNCTIONAL_FREEZE_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    switch (lang) {
      case "id":
        return [
          { val: 0, text: "Sangat Jarang / Tidak Pernah" },
          { val: 1, text: "Kadang-kadang / Ringan" },
          { val: 2, text: "Sering / Nyata" },
          { val: 3, text: "Hampir Selalu / Sangat Dominan" },
        ];
      case "de":
        return [
          { val: 0, text: "Fast nie / Überhaupt nicht" },
          { val: 1, text: "Gelegentlich / Leicht" },
          { val: 2, text: "Häufig / Deutlich spürbar" },
          { val: 3, text: "Fast ständig / Sehr stark" },
        ];
      case "fr":
        return [
          { val: 0, text: "Presque jamais / Pas du tout" },
          { val: 1, text: "Parfois / Léger" },
          { val: 2, text: "Souvent / Marqué" },
          { val: 3, text: "Presque toujours / Très intense" },
        ];
      case "es":
        return [
          { val: 0, text: "Casi nunca / En absoluto" },
          { val: 1, text: "A veces / Leve" },
          { val: 2, text: "Frecuentemente / Notorio" },
          { val: 3, text: "Casi siempre / Muy severo" },
        ];
      default:
        return [
          { val: 0, text: "Rarely / Never" },
          { val: 1, text: "Sometimes / Mild" },
          { val: 2, text: "Often / Substantial" },
          { val: 3, text: "Almost Always / Severe" },
        ];
    }
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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Calculate Result
  const scoreResult: FunctionalFreezeScoreResult = useMemo(() => {
    let total = 0;
    let dorsalVagal = 0;
    let somaticArmoring = 0;
    let interoceptiveDissociation = 0;

    questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      total += val;
      if (q.subscale === "dorsal_vagal") dorsalVagal += val;
      if (q.subscale === "somatic_armoring") somaticArmoring += val;
      if (q.subscale === "interoceptive_dissociation") interoceptiveDissociation += val;
    });

    const maxTotal = questions.length * 3; // 36
    const percentage = Math.round((total / maxTotal) * 100);

    const levelObj =
      FUNCTIONAL_FREEZE_LEVELS.find(
        (lvl) => total >= lvl.scoreRange[0] && total <= lvl.scoreRange[1]
      ) || FUNCTIONAL_FREEZE_LEVELS[FUNCTIONAL_FREEZE_LEVELS.length - 1];

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
        dorsal_vagal: {
          score: dorsalVagal,
          percentage: Math.round((dorsalVagal / 12) * 100),
        },
        somatic_armoring: {
          score: somaticArmoring,
          percentage: Math.round((somaticArmoring / 12) * 100),
        },
        interoceptive_dissociation: {
          score: interoceptiveDissociation,
          percentage: Math.round((interoceptiveDissociation / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel: FunctionalFreezeResultLevel = useMemo(() => {
    return (
      FUNCTIONAL_FREEZE_LEVELS.find((l) => l.level === scoreResult.level) ||
      FUNCTIONAL_FREEZE_LEVELS[0]
    );
  }, [scoreResult.level]);

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Functional Freeze & Sistem Saraf Somatis • Nuju"
            : lang === "de"
            ? "Funktionaler Freeze Zustand Test • Somatic Screener • Nuju"
            : lang === "fr"
            ? "Test Figement Fonctionnel & État Somatique • Nuju"
            : lang === "es"
            ? "Test de Congelación Funcional y Nervio Vago • Nuju"
            : "Functional Freeze & Somatic Nervous System Screener • Nuju"
        }
        description={
          lang === "id"
            ? "Skrining mandiri respon dorsal vagal freeze: kenali penyebab rasa hampa, tubuh kaku tanpa sadar, dan kelumpuhan eksekutif di balik produktivitas semu."
            : "Clinical self-assessment for functional freeze, dorsal vagal immobility, somatic armoring, and high-functioning nervous system shutdown."
        }
        canonical="https://www.nuju.app/quiz/functional-freeze"
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-sky-500/30 selection:text-sky-200">
        {/* Navigation Bar */}
        <header className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Nuju</span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            </Link>

            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as FunctionalFreezeLang)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-sky-500 transition-colors"
              >
                <option value="en">English (US)</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="de">Deutsch (DE)</option>
                <option value="fr">Français (FR)</option>
                <option value="es">Español (ES)</option>
              </select>

              <Link
                to="/quiz"
                className="text-xs text-stone-400 hover:text-stone-200 font-medium transition-colors"
              >
                All Screeners
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          {/* Top Monetization Ad */}
          <div className="mb-8">
            <AdSenseBanner slot="quiz-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* Quiz Progression Container */
            <div className="space-y-8">
              {/* Title & Badge */}
              <div className="space-y-3 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono uppercase tracking-wider">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Polyvagal & Somatic Diagnostic</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {lang === "id"
                    ? "Tes Respon Functional Freeze"
                    : lang === "de"
                    ? "Funktionaler Freeze Zustand Test"
                    : lang === "fr"
                    ? "Test du Figement Fonctionnel"
                    : lang === "es"
                    ? "Test de Congelación Funcional"
                    : "Functional Freeze Diagnostic"}
                </h1>
                <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
                  {lang === "id"
                    ? "Skrining apakah tubuh Anda diam-diam terjebak dalam respon dorsal vagal freeze meskipun Anda tetap bekerja normal."
                    : "Measure dorsal vagal shutdown, bodily armoring, and interoceptive numbness beneath your day-to-day high functioning."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-400 font-mono">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{progressPercent}% Completed</span>
                </div>
                <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 shadow-xl space-y-6">
                <div className="flex items-center gap-2 text-sky-400/80 text-xs font-mono uppercase">
                  <Activity className="w-4 h-4" />
                  <span>
                    Subscale: {currentQuestion.subscale.replace("_", " ")}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-medium text-stone-100 leading-relaxed">
                  "{currentQuestion.text[lang] || currentQuestion.text.en}"
                </h2>

                {/* Answer Options */}
                <div className="grid gap-3 pt-2">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`w-full p-4 rounded-2xl text-left text-sm sm:text-base font-medium transition-all duration-150 border flex items-center justify-between ${
                          isSelected
                            ? "bg-sky-500/20 border-sky-500 text-white shadow-lg shadow-sky-500/10"
                            : "bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                            isSelected
                              ? "border-sky-400 bg-sky-500 text-white"
                              : "border-stone-700"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-stone-800/80">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-xs text-stone-500 font-mono">
                    Item {currentQuestion.id} / 12
                  </span>
                </div>
              </div>

              {/* Mid-Test Ad Placement */}
              {currentQuestionIndex >= 5 && (
                <div className="pt-2">
                  <AdSenseBanner slot="quiz-mid" format="auto" />
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Top Result Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-sky-500/30 shadow-2xl relative overflow-hidden text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-mono uppercase tracking-wider border border-sky-500/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {activeLevel.title[lang] || activeLevel.title.en}
                </h2>

                <div className="flex items-baseline justify-center gap-2 font-mono">
                  <span className="text-5xl sm:text-6xl font-black text-sky-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-stone-400 text-sm">Freeze Index ({scoreResult.score}/36)</span>
                </div>

                <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto pt-2">
                  {activeLevel.summary[lang] || activeLevel.summary.en}
                </p>

                {/* Share Button CTA */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all duration-150 active:scale-95"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Download Story Share Card</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium text-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Screener</span>
                  </button>
                </div>
              </div>

              {/* Ad between Score Banner & Subscale Breakdown */}
              <div>
                <AdSenseBanner slot="quiz-result" format="auto" />
              </div>

              {/* Subscales 3 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-sky-400 font-mono">
                    <span>DORSAL VAGAL SHUTDOWN</span>
                    <span className="font-bold">{scoreResult.subscales.dorsal_vagal.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${scoreResult.subscales.dorsal_vagal.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 pt-1">
                    Immobility, visceral lethargy, staring into blank space, endless doomscrolling.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-indigo-400 font-mono">
                    <span>SOMATIC ARMORING</span>
                    <span className="font-bold">{scoreResult.subscales.somatic_armoring.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: `${scoreResult.subscales.somatic_armoring.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 pt-1">
                    Unconscious clenched jaw, held breath, tight psoas, hypervigilant muscular tone.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-pink-400 font-mono">
                    <span>INTEROCEPTIVE DISSOCIATION</span>
                    <span className="font-bold">{scoreResult.subscales.interoceptive_dissociation.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500"
                      style={{ width: `${scoreResult.subscales.interoceptive_dissociation.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 pt-1">
                    Emotional numbing, difficulty locating feelings, experiencing life behind thick glass.
                  </p>
                </div>
              </div>

              {/* Neurobiology Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/70 border border-stone-800 space-y-4">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase">
                  <Brain className="w-4 h-4" />
                  <span>Polyvagal Neurobiology Breakdown</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === "id" ? "Apa yang Terjadi di Sistem Saraf Anda?" : "What Is Happening in Your Nervous System?"}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                </p>
              </div>

              {/* Somatic Action Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recommended Somatic Regulation Protocols</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === "id" ? "Protokol Pemulihan Bertahap" : "Step-by-Step Somatic De-Escalation"}
                </h3>

                <ul className="space-y-3 pt-2">
                  {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-stone-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Voice Journaling Conversion Funnel */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-stone-900 border border-sky-500/30 text-center space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-mono">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Vocal Vagus Nerve Stimulation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {lang === "id"
                    ? "Aktifkan Cabang Vagus Laringeal Lewat Suara"
                    : "Reset the Dorsal Freeze via Gentle Voice Journaling"}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
                  {lang === "id"
                    ? "Menulis teks saat freeze sering memicu kram mental. Berbicara bebas tanpa penghakiman di Nuju merangsang saraf vagus melalui getaran pita suara."
                    : "Typing while in dorsal freeze triggers cognitive friction. Speaking out loud into Nuju's voice journal stimulates your laryngeal vagus branch and restores ventral flow."}
                </p>

                <div className="pt-3">
                  <Link
                    to="/app"
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-white text-stone-950 hover:bg-stone-100 font-bold text-sm shadow-xl transition-all duration-150 active:scale-95"
                  >
                    <span>Try Nuju Voice Journal Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Related Blog Posts Links */}
              <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 font-mono">
                <Link to="/quiz" className="hover:text-stone-200 underline">
                  ← Back to All Clinical Diagnostics
                </Link>
                <Link to="/blog/somatic-voice-journaling-polyvagal-nervous-system" className="hover:text-stone-200 underline">
                  Read Guide: Somatic Voice Journaling & Polyvagal Nervous System →
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      <FunctionalFreezeShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

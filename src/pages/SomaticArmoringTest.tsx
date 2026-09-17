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
  Brain,
  Layers,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  SOMATIC_ARMORING_QUESTIONS,
  SOMATIC_ARMORING_LEVELS,
  SomaticArmoringResultLevel,
} from "@/data/somatic-armoring";
import { SomaticArmoringShareCardModal } from "@/components/SomaticArmoringShareCardModal";
import { SomaticArmoringScoreResult, SomaticArmoringLang } from "@/lib/generate-quiz-card";

export default function SomaticArmoringTest() {
  const [lang, setLang] = useState<SomaticArmoringLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = SOMATIC_ARMORING_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    switch (lang) {
      case "id":
        return [
          { val: 0, text: "Tidak Pernah / Bebas Tegangan" },
          { val: 1, text: "Jarang / Sedikit Terasa" },
          { val: 2, text: "Sering / Kaku Terasa" },
          { val: 3, text: "Hampir Selalu / Terkunci Sangat Keras" },
        ];
      case "de":
        return [
          { val: 0, text: "Nie / Vollkommen entspannt" },
          { val: 1, text: "Selten / Leicht spürbar" },
          { val: 2, text: "Häufig / Deutlich verhärtet" },
          { val: 3, text: "Fast ständig / Bretthart blockiert" },
        ];
      case "fr":
        return [
          { val: 0, text: "Jamais / Totalement détendu" },
          { val: 1, text: "Rarement / Légèrement perceptible" },
          { val: 2, text: "Souvent / Tension marquée" },
          { val: 3, text: "Presque toujours / Complètement verrouillé" },
        ];
      case "es":
        return [
          { val: 0, text: "Nunca / Completamente relajado" },
          { val: 1, text: "Rara vez / Levemente" },
          { val: 2, text: "Frecuentemente / Rigidez notoria" },
          { val: 3, text: "Casi siempre / Totalmente contracturado" },
        ];
      default:
        return [
          { val: 0, text: "Never / Fully Relaxed" },
          { val: 1, text: "Rarely / Mildly" },
          { val: 2, text: "Frequently / Noticeably Rigid" },
          { val: 3, text: "Almost Always / Severely Locked" },
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
  const scoreResult: SomaticArmoringScoreResult = useMemo(() => {
    let total = 0;
    let cervicalOral = 0;
    let thoracicDiaphragm = 0;
    let pelvicPsoas = 0;

    questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      total += val;
      if (q.segment === "cervical_oral") cervicalOral += val;
      if (q.segment === "thoracic_diaphragm") thoracicDiaphragm += val;
      if (q.segment === "pelvic_psoas") pelvicPsoas += val;
    });

    const maxTotal = questions.length * 3; // 36
    const percentage = Math.round((total / maxTotal) * 100);

    const levelObj =
      SOMATIC_ARMORING_LEVELS.find(
        (lvl) => total >= lvl.scoreRange[0] && total <= lvl.scoreRange[1]
      ) || SOMATIC_ARMORING_LEVELS[SOMATIC_ARMORING_LEVELS.length - 1];

    return {
      score: total,
      percentage,
      level: levelObj.level,
      profile: {
        title: levelObj.title,
        badge: levelObj.badge,
        summary: levelObj.summary,
        somaticMechanisms: levelObj.somaticMechanisms,
        releaseProtocols: levelObj.releaseProtocols,
      },
      segments: {
        cervical_oral: {
          score: cervicalOral,
          percentage: Math.round((cervicalOral / 12) * 100),
        },
        thoracic_diaphragm: {
          score: thoracicDiaphragm,
          percentage: Math.round((thoracicDiaphragm / 12) * 100),
        },
        pelvic_psoas: {
          score: pelvicPsoas,
          percentage: Math.round((pelvicPsoas / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel: SomaticArmoringResultLevel = useMemo(() => {
    return (
      SOMATIC_ARMORING_LEVELS.find((l) => l.level === scoreResult.level) ||
      SOMATIC_ARMORING_LEVELS[0]
    );
  }, [scoreResult.level]);

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Somatic Body Armoring & Ketegangan Otot Trauma • Nuju"
            : lang === "de"
            ? "Körperpanzerung & Muskelpanzer Test • Somatic Screener • Nuju"
            : lang === "fr"
            ? "Test Cuirasse Musculaire & Armure Somatique • Nuju"
            : lang === "es"
            ? "Test de Coraza Muscular Somática y Tensión Traumática • Nuju"
            : "Somatic Armoring & Muscular Tension Diagnostic • Nuju"
        }
        description={
          lang === "id"
            ? "Skrining klinis zirah tubuh somatis: kenali di mana trauma dan stres menahun membekukan otot leher, rahang, diafragma, dan pinggul Anda."
            : "Clinical self-assessment for Reichian somatic armoring, chronic muscle tension, held breath, and fascial holding patterns."
        }
        canonical="https://www.nuju.app/quiz/somatic-armoring"
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200">
        {/* Navigation Bar */}
        <header className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Nuju</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            </Link>

            <div className="flex items-center gap-3">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as SomaticArmoringLang)}
                className="bg-stone-900 border border-stone-800 text-stone-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 transition-colors"
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Reichian Somatic Diagnostic</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {lang === "id"
                    ? "Tes Zirah Somatis & Ketegangan Otot Tubuh"
                    : lang === "de"
                    ? "Körperpanzerung & Muskelpanzer Test"
                    : lang === "fr"
                    ? "Test de Cuirasse Somatique"
                    : lang === "es"
                    ? "Test de Coraza Muscular Somática"
                    : "Somatic Armoring Diagnostic"}
                </h1>
                <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
                  {lang === "id"
                    ? "Petakan di segmen mana tubuh Anda menahan emosi terpendam: rahang terkunci, napas tertahan di dada, atau pinggul kaku."
                    : "Map where your body unconsciously armors against stress: clenched jaw, locked diaphragm, or tight psoas muscles."}
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
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800/80 shadow-xl space-y-6">
                <div className="flex items-center gap-2 text-amber-400/80 text-xs font-mono uppercase">
                  <Activity className="w-4 h-4" />
                  <span>
                    Segment: {currentQuestion.segment.replace("_", " ")}
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
                            ? "bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                            : "bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                            isSelected
                              ? "border-amber-400 bg-amber-500 text-white"
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
              <div className="p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-amber-500/30 shadow-2xl relative overflow-hidden text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono uppercase tracking-wider border border-amber-500/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {activeLevel.title[lang] || activeLevel.title.en}
                </h2>

                <div className="flex items-baseline justify-center gap-2 font-mono">
                  <span className="text-5xl sm:text-6xl font-black text-amber-400">
                    {scoreResult.percentage}%
                  </span>
                  <span className="text-stone-400 text-sm">Armoring Index ({scoreResult.score}/36)</span>
                </div>

                <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto pt-2">
                  {activeLevel.summary[lang] || activeLevel.summary.en}
                </p>

                {/* Share Button CTA */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-150 active:scale-95"
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

              {/* Ad between Score Banner & Segment Breakdown */}
              <div>
                <AdSenseBanner slot="quiz-result" format="auto" />
              </div>

              {/* 3 Reichian Segments Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                    <span>CERVICAL & ORAL</span>
                    <span className="font-bold">{scoreResult.segments.cervical_oral.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500"
                      style={{ width: `${scoreResult.segments.cervical_oral.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 pt-1">
                    Clenched jaw, tongue pressing palate, throat lump, suppressed vocal boundary.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-orange-400 font-mono">
                    <span>THORACIC & DIAPHRAGM</span>
                    <span className="font-bold">{scoreResult.segments.thoracic_diaphragm.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${scoreResult.segments.thoracic_diaphragm.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 pt-1">
                    Held breath, shallow chest respiration, tight rib cage, panic during deep breathing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-red-400 font-mono">
                    <span>PELVIC & PSOAS</span>
                    <span className="font-bold">{scoreResult.segments.pelvic_psoas.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${scoreResult.segments.pelvic_psoas.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400 pt-1">
                    Locked hips, lower back tension, inability to surrender into mattress, stomach knots.
                  </p>
                </div>
              </div>

              {/* Somatic Mechanisms Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/70 border border-stone-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase">
                  <Brain className="w-4 h-4" />
                  <span>Somatic & Fascial Mechanism Analysis</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === "id" ? "Bagaimana Tubuh Anda Membangun Zirah Ini?" : "How Your Body Built This Armor"}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {activeLevel.somaticMechanisms[lang] || activeLevel.somaticMechanisms.en}
                </p>
              </div>

              {/* De-Armoring Protocol */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Targeted Somatic De-Armoring Roadmap</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === "id" ? "Langkah Melepaskan Zirah Otot Tubuh" : "Step-by-Step De-Armoring Roadmap"}
                </h3>

                <ul className="space-y-3 pt-2">
                  {(activeLevel.releaseProtocols[lang] || activeLevel.releaseProtocols.en).map((item, idx) => (
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
              <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-orange-950/40 to-stone-900 border border-amber-500/30 text-center space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Release Throat & Diaphragm Bracing</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {lang === "id"
                    ? "Lepaskan Beban di Tenggorokan & Dada Lewat Suara"
                    : "Melt the Armor via Somatic Voice Journaling"}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
                  {lang === "id"
                    ? "Otot rahang dan leher mengunci ketika emosi ditelan paksa. Berbicara bebas tanpa beban di Nuju menggetarkan jaringan fasia dan mengembalikan aliran napas lega."
                    : "The jaw and throat lock when feelings are swallowed in silence. Speaking freely into Nuju's voice journal vibrates the fascia, releasing the somatic armor from within."}
                </p>

                <div className="pt-3">
                  <Link
                    to="/app"
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-white text-stone-950 hover:bg-stone-100 font-bold text-sm shadow-xl transition-all duration-150 active:scale-95"
                  >
                    <span>Start Voice Release on Nuju</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Related Blog Posts */}
              <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 font-mono">
                <Link to="/quiz" className="hover:text-stone-200 underline">
                  ← Back to All Clinical Diagnostics
                </Link>
                <Link to="/blog/somatic-trauma-release-nervous-system-reset-exercises" className="hover:text-stone-200 underline">
                  Read Guide: Somatic Trauma Release & Nervous System Exercises →
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      <SomaticArmoringShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

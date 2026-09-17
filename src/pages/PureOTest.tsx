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
  Zap,
  HelpCircle,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  PURE_O_QUESTIONS,
  PURE_O_LEVELS,
  PureOResultLevel,
} from "@/data/pure-o";
import { PureOShareCardModal } from "@/components/PureOShareCardModal";
import { PureOScoreResult, PureOCardLang } from "@/lib/generate-quiz-card";

export default function PureOTest() {
  const [lang, setLang] = useState<PureOCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = PURE_O_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    switch (lang) {
      case "id":
        return [
          { val: 0, text: "Tidak Pernah / Tidak Terganggu" },
          { val: 1, text: "Kadang-kadang / Ringan" },
          { val: 2, text: "Sering / Nyata Mengganggu" },
          { val: 3, text: "Hampir Selalu / Sangat Menyiksa" },
        ];
      case "de":
        return [
          { val: 0, text: "Nie / Keine Belastung" },
          { val: 1, text: "Manchmal / Leicht" },
          { val: 2, text: "Häufig / Spürbare Belastung" },
          { val: 3, text: "Fast ständig / Sehr quälend" },
        ];
      case "fr":
        return [
          { val: 0, text: "Jamais / Aucune gêne" },
          { val: 1, text: "Parfois / Léger" },
          { val: 2, text: "Souvent / Très gênant" },
          { val: 3, text: "Presque constamment / Angoissant" },
        ];
      case "es":
        return [
          { val: 0, text: "Nunca / Sin malestar" },
          { val: 1, text: "A veces / Leve" },
          { val: 2, text: "A menudo / Notorio" },
          { val: 3, text: "Casi siempre / Muy angustioso" },
        ];
      default:
        return [
          { val: 0, text: "Never / Not Distressed" },
          { val: 1, text: "Sometimes / Mild" },
          { val: 2, text: "Often / Distinct Distress" },
          { val: 3, text: "Almost Always / Severe Agony" },
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

  const scoreResult: PureOScoreResult = useMemo(() => {
    let total = 0;
    let taboo = 0;
    let compulsions = 0;
    let fusion = 0;

    questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      total += val;
      if (q.category === "taboo_intrusions") taboo += val;
      if (q.category === "mental_compulsions") compulsions += val;
      if (q.category === "thought_action_fusion") fusion += val;
    });

    const maxScore = questions.length * 3;
    const percentage = Math.round((total / maxScore) * 100);

    let levelKey: "transient" | "mild_sticky" | "moderate_pure_o" | "severe_ocd_distress" =
      "transient";
    if (total >= 27) levelKey = "severe_ocd_distress";
    else if (total >= 17) levelKey = "moderate_pure_o";
    else if (total >= 9) levelKey = "mild_sticky";

    const levelObj =
      PURE_O_LEVELS.find((l) => l.level === levelKey) || PURE_O_LEVELS[0];

    return {
      score: total,
      percentage,
      level: levelKey,
      profile: {
        title: levelObj.title,
        badge: levelObj.badge,
        summary: levelObj.summary,
        neurobiology: levelObj.neurobiology,
        actionProtocol: levelObj.actionProtocol,
      },
      subscales: {
        taboo_intrusions: {
          score: taboo,
          percentage: Math.round((taboo / 12) * 100),
        },
        mental_compulsions: {
          score: compulsions,
          percentage: Math.round((compulsions / 12) * 100),
        },
        thought_action_fusion: {
          score: fusion,
          percentage: Math.round((fusion / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel: PureOResultLevel = useMemo(() => {
    return (
      PURE_O_LEVELS.find((l) => l.level === scoreResult.level) ||
      PURE_O_LEVELS[0]
    );
  }, [scoreResult.level]);

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Pure O & Pikiran Intrusif Online • Nuju"
            : lang === "de"
            ? "Pure O Test: Zwangsgedanken & Mentale Rituale • Nuju"
            : lang === "fr"
            ? "Test TOC Pure O & Pensées Intrusives Gratuit • Nuju"
            : lang === "es"
            ? "Test de TOC Pure O y Pensamientos Intrusivos • Nuju"
            : "Pure O Test: Unwanted Intrusive Thoughts Screener • Nuju"
        }
        description={
          lang === "id"
            ? "Skrining klinis 12 pertanyaan untuk mengukur pikiran intrusif tabu, kompulsi mental (mental reviewing), dan jebakan thought-action fusion."
            : "Clinical 12-item self-assessment for Pure O (Purely Obsessional OCD), unwanted taboo intrusions, mental checking rituals, and thought-action fusion."
        }
        canonical="https://www.nuju.app/quiz/pure-o"
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-purple-500/30 selection:text-purple-200">
        {/* Navigation Bar */}
        <header className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Nuju</span>
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            </Link>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 rounded-full border border-stone-800 bg-stone-900 p-1">
                {(["en", "id", "de", "fr", "es"] as PureOCardLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                      lang === l
                        ? "bg-purple-600 text-white shadow-sm"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <Link
                to="/quiz"
                className="text-xs font-medium text-stone-400 hover:text-white transition hidden sm:inline"
              >
                {lang === "id" ? "Semua Tes" : "All Quizzes"}
              </Link>
            </div>
          </div>
        </header>

        {/* Top AdSense Banner */}
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <AdSenseBanner slot="quiz-pureo-top" format="auto" />
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Progress & Breadcrumbs */}
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-purple-400 border border-purple-500/20 font-mono">
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span className="uppercase tracking-wider">
                    {currentQuestion.category.replace(/_/g, " ")}
                  </span>
                </div>
                <span>{progressPercent}% completed</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 backdrop-blur shadow-xl space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-relaxed">
                    {currentQuestion.prompt[lang]}
                  </h1>
                  {currentQuestion.subtext && (
                    <p className="mt-2 text-xs sm:text-sm text-stone-400 leading-relaxed italic">
                      {currentQuestion.subtext[lang]}
                    </p>
                  )}
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 gap-3">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-purple-500 bg-purple-500/10 text-white shadow-md shadow-purple-500/10"
                            : "border-stone-800/80 bg-stone-950/40 text-stone-300 hover:border-stone-700 hover:bg-stone-900"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium group-hover:text-white">
                          {opt.text}
                        </span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-purple-400 bg-purple-500 text-white"
                              : "border-stone-700 group-hover:border-stone-500"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Mid-Quiz In-Article AdSense Banner (appears at question 6) */}
                {currentQuestionIndex === 5 && (
                  <div className="pt-2">
                    <AdSenseBanner slot="quiz-pureo-mid" format="horizontal" />
                  </div>
                )}

                {/* Back button */}
                {currentQuestionIndex > 0 && (
                  <div className="pt-2">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>{lang === "id" ? "Pertanyaan Sebelumnya" : "Previous Question"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Top Result Card */}
              <div
                className={`rounded-3xl border bg-gradient-to-br p-6 sm:p-10 shadow-2xl ${activeLevel.colorScheme.border} ${activeLevel.colorScheme.bg}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${activeLevel.colorScheme.badge}`}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {activeLevel.badge[lang]}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    Score: {scoreResult.score} / {questions.length * 3} ({scoreResult.percentage}%)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                  {activeLevel.title[lang]}
                </h1>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-6">
                  {activeLevel.summary[lang]}
                </p>

                {/* Subscales Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800/80">
                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-3.5">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                      Taboo Intrusions
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">
                        {scoreResult.subscales.taboo_intrusions.percentage}%
                      </span>
                      <span className="text-2xs text-stone-400 font-mono">
                        {scoreResult.subscales.taboo_intrusions.score}/12
                      </span>
                    </div>
                    <span className="text-2xs text-stone-400">Egodystonic 'what ifs'</span>
                  </div>

                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-3.5">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                      Mental Compulsions
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">
                        {scoreResult.subscales.mental_compulsions.percentage}%
                      </span>
                      <span className="text-2xs text-stone-400 font-mono">
                        {scoreResult.subscales.mental_compulsions.score}/12
                      </span>
                    </div>
                    <span className="text-2xs text-stone-400">Reviewing & analyzing</span>
                  </div>

                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-3.5">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      Fusion & Guilt
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">
                        {scoreResult.subscales.thought_action_fusion.percentage}%
                      </span>
                      <span className="text-2xs text-stone-400 font-mono">
                        {scoreResult.subscales.thought_action_fusion.score}/12
                      </span>
                    </div>
                    <span className="text-2xs text-stone-400">False moral guilt</span>
                  </div>
                </div>

                {/* Share Card Trigger CTA */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-purple-500 transition shadow-sm"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{lang === "id" ? "Buat Story Instagram" : "Generate Share Card"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-300 hover:text-white transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{lang === "id" ? "Ulangi Tes" : "Retake"}</span>
                  </button>
                </div>
              </div>

              {/* Result In-Feed AdSense Banner */}
              <AdSenseBanner slot="quiz-pureo-result" format="rectangle" />

              {/* Neurobiology Breakdown */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-purple-400">
                  <Brain className="h-5 w-5" />
                  <h2 className="text-base font-bold uppercase tracking-wider">
                    {lang === "id" ? "Neurobiologi Pure O" : "Neurobiology of Pure O & CSTC Loops"}
                  </h2>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activeLevel.neurobiology[lang]}
                </p>
              </div>

              {/* Action Protocol */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <HelpCircle className="h-5 w-5" />
                  <h2 className="text-base font-bold uppercase tracking-wider">
                    {lang === "id" ? "Protokol Defusi Kognitif ERP" : "ERP Cognitive Defusion Protocol"}
                  </h2>
                </div>
                <ul className="space-y-2.5 text-sm text-stone-300">
                  {activeLevel.actionProtocol[lang].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nuju Voice Journal Integration CTA */}
              <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-stone-900 to-stone-950 p-6 sm:p-8 text-center space-y-4">
                <Sparkles className="h-8 w-8 text-purple-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">
                  {lang === "id"
                    ? "Keluarkan Pikiran Tabu Tanpa Dihakimi di Nuju"
                    : "Defuse Taboo Thoughts Without Judgment in Nuju"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
                  {lang === "id"
                    ? "Takut mencurahkan isi kepala Anda karena takut dianggap jahat? Di Nuju, jurnal Anda 100% privat dan terenkripsi. Bicarakan kecemasan Anda dengan bebas dan biarkan Ju membantu memutus siklus overthinking Anda."
                    : "Terrified of telling anyone what pops into your head for fear of being condemned? In Nuju, your thoughts are 100% private and encrypted. Speak freely, break the taboo of silence, and let Ju help defuse obsessive anxiety."}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/app"
                    className="rounded-full bg-purple-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-600/20"
                  >
                    {lang === "id" ? "Buka Nuju Web App" : "Open Nuju Web App"}
                  </Link>
                  <Link
                    to="/blog"
                    className="rounded-full border border-stone-700 bg-stone-800/80 px-6 py-3 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white transition"
                  >
                    {lang === "id" ? "Baca Artikel Pure O & OCD" : "Read Articles on Pure O"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <PureOShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

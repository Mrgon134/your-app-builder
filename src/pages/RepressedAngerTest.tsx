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
  Flame,
  HelpCircle,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  REPRESSED_ANGER_QUESTIONS,
  REPRESSED_ANGER_RESULTS,
  REPRESSED_ANGER_OPTIONS,
  REPRESSED_ANGER_SUBSCALE_INFO,
  getRepressedAngerResult,
  calculateRepressedAngerSubscales,
  RepressedAngerResultLevel,
} from "@/data/repressed-anger";
import { RepressedAngerShareCardModal } from "@/components/RepressedAngerShareCardModal";
import { RepressedAngerScoreResult, RepressedAngerCardLang } from "@/lib/generate-quiz-card";

export default function RepressedAngerTest() {
  const [lang, setLang] = useState<RepressedAngerCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = REPRESSED_ANGER_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return REPRESSED_ANGER_OPTIONS.map((opt) => ({
      val: opt.score,
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

  const scoreResult: RepressedAngerScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 3;
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getRepressedAngerResult(total);
    const rawSubscales = calculateRepressedAngerSubscales(answers);

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
        somatic_rage: {
          score: rawSubscales.somatic_rage,
          percentage: Math.round((rawSubscales.somatic_rage / 12) * 100),
        },
        fawn_resentment: {
          score: rawSubscales.fawn_resentment,
          percentage: Math.round((rawSubscales.fawn_resentment / 12) * 100),
        },
        anger_inversion: {
          score: rawSubscales.anger_inversion,
          percentage: Math.round((rawSubscales.anger_inversion / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel: RepressedAngerResultLevel = useMemo(() => {
    return (
      REPRESSED_ANGER_RESULTS.find((l) => l.level === scoreResult.level) ||
      REPRESSED_ANGER_RESULTS[0]
    );
  }, [scoreResult.level]);

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Amarah Terpendam & Somatic Rage • Nuju"
            : lang === "de"
            ? "Unterdrückte Wut Test: Somatische Rage & Good Girl Syndrom • Nuju"
            : lang === "fr"
            ? "Test Colère Refoulée & Rage Somatique Gratuit • Nuju"
            : lang === "es"
            ? "Test de Ira Reprimida y Rabia Somática • Nuju"
            : "Repressed Anger Test: Somatic Rage & Good Girl/Nice Guy Screener • Nuju"
        }
        description={
          lang === "id"
            ? "Skrining klinis 12 pertanyaan untuk mengukur amarah terpendam, rahang mengatup kencang, bahu kaku, respons fawn, dan retrofleksi amarah menjadi rasa bersalah."
            : "Clinical 12-item self-assessment for repressed anger, somatic rage, bruxism/jaw clenching, people-pleaser resentment, and inverted anger."
        }
        canonical="https://www.nuju.app/quiz/repressed-anger"
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-red-500/30 selection:text-red-200">
        {/* Navigation Bar */}
        <header className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Nuju</span>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </Link>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 rounded-full border border-stone-800 bg-stone-900 p-1">
                {(["en", "id", "de", "fr", "es"] as RepressedAngerCardLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                      lang === l
                        ? "bg-red-600 text-white shadow-sm"
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
          <AdSenseBanner slot="quiz-top-banner" format="auto" />
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          {!isCompleted ? (
            <div>
              {/* Header Info */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-400 mb-3">
                  <Flame className="h-3.5 w-3.5 text-red-400" />
                  <span>
                    {lang === "id"
                      ? "Wilhelm Reich & Dr. Gabor Maté Framework"
                      : "Somatic Rage & Boundary Defense Metric"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Amarah Terpendam & Somatic Rage"
                    : lang === "de"
                    ? "Unterdrückte Wut & Somatische Rage Test"
                    : lang === "fr"
                    ? "Test de Colère Refoulée & Rage Somatique"
                    : lang === "es"
                    ? "Test de Ira Reprimida y Rabia Somática"
                    : "Repressed Anger & Somatic Rage Screener"}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-stone-400 max-w-lg mx-auto">
                  {lang === "id"
                    ? "Ukur ketegangan rahang (bruxism), respons menyenangkan orang lain yang berujung dendam, dan konversi amarah menjadi kelelahan fisik."
                    : "Discover whether your chronic headaches, jaw clenching, and people-pleasing fatigue are unexpressed protective rage."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-medium text-stone-400 mb-2">
                  <span>
                    {lang === "id"
                      ? `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`
                      : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
                  </span>
                  <span className="text-red-400 font-semibold">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-900 border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 backdrop-blur shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-4">
                  <Activity className="h-4 w-4" />
                  <span>
                    {REPRESSED_ANGER_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      REPRESSED_ANGER_SUBSCALE_INFO[currentQuestion.subscale].name.en}
                  </span>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-snug min-h-[4rem]">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </p>

                {/* Options Grid */}
                <div className="mt-8 grid grid-cols-1 gap-3">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`group flex items-center justify-between rounded-2xl border p-4 text-left font-medium transition ${
                          isSelected
                            ? "border-red-500 bg-red-950/40 text-white shadow-md shadow-red-950/40"
                            : "border-stone-800 bg-stone-950/40 text-stone-300 hover:border-stone-700 hover:bg-stone-800/40 hover:text-white"
                        }`}
                      >
                        <span className="text-sm sm:text-base">{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-red-500 bg-red-600 text-white"
                              : "border-stone-700 group-hover:border-stone-500"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back Button */}
                {currentQuestionIndex > 0 && (
                  <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>{lang === "id" ? "Kembali ke sebelumnya" : "Back to previous"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mid-Test AdSense Banner */}
              <div className="mt-8">
                <AdSenseBanner slot="quiz-mid-banner" format="auto" />
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-fadeIn">
              {/* Primary Score Card */}
              <div className="rounded-3xl border border-red-800/40 bg-gradient-to-b from-stone-900/90 to-stone-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/30 px-3.5 py-1 text-xs font-bold text-red-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      {activeLevel.badge[lang] || activeLevel.badge.en}
                    </span>
                    <span className="text-xs font-semibold text-stone-400">
                      Total Score: {scoreResult.score} / 36 ({scoreResult.percentage}%)
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    {activeLevel.title[lang] || activeLevel.title.en}
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed">
                    {activeLevel.summary[lang] || activeLevel.summary.en}
                  </p>

                  {/* Share Card CTA */}
                  <div className="mt-6 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/50 hover:bg-red-500 transition"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>
                        {lang === "id"
                          ? "Bagikan Hasil (Story Card)"
                          : "Generate Story Share Card"}
                      </span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-800/80 px-4 py-3 text-sm font-semibold text-stone-300 hover:bg-stone-700 hover:text-white transition"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>{lang === "id" ? "Ulangi Tes" : "Retake Test"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Subscale Breakdown */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 backdrop-blur">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-400" />
                  <span>
                    {lang === "id"
                      ? "Profil Rincian Subskala Amarah"
                      : "Repressed Anger Subscale Breakdown"}
                  </span>
                </h3>

                <div className="space-y-6">
                  {/* Somatic Rage */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {REPRESSED_ANGER_SUBSCALE_INFO.somatic_rage.name[lang] ||
                          REPRESSED_ANGER_SUBSCALE_INFO.somatic_rage.name.en}
                      </span>
                      <span className="text-red-400">
                        {scoreResult.subscales.somatic_rage.score} / 12 (
                        {scoreResult.subscales.somatic_rage.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.somatic_rage.percentage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {REPRESSED_ANGER_SUBSCALE_INFO.somatic_rage.description[lang] ||
                        REPRESSED_ANGER_SUBSCALE_INFO.somatic_rage.description.en}
                    </p>
                  </div>

                  {/* Fawn Resentment */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {REPRESSED_ANGER_SUBSCALE_INFO.fawn_resentment.name[lang] ||
                          REPRESSED_ANGER_SUBSCALE_INFO.fawn_resentment.name.en}
                      </span>
                      <span className="text-amber-400">
                        {scoreResult.subscales.fawn_resentment.score} / 12 (
                        {scoreResult.subscales.fawn_resentment.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.fawn_resentment.percentage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {REPRESSED_ANGER_SUBSCALE_INFO.fawn_resentment.description[lang] ||
                        REPRESSED_ANGER_SUBSCALE_INFO.fawn_resentment.description.en}
                    </p>
                  </div>

                  {/* Anger Inversion */}
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-stone-200">
                        {REPRESSED_ANGER_SUBSCALE_INFO.anger_inversion.name[lang] ||
                          REPRESSED_ANGER_SUBSCALE_INFO.anger_inversion.name.en}
                      </span>
                      <span className="text-rose-400">
                        {scoreResult.subscales.anger_inversion.score} / 12 (
                        {scoreResult.subscales.anger_inversion.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${scoreResult.subscales.anger_inversion.percentage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-stone-400">
                      {REPRESSED_ANGER_SUBSCALE_INFO.anger_inversion.description[lang] ||
                        REPRESSED_ANGER_SUBSCALE_INFO.anger_inversion.description.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Neurobiology & Somatic Mechanism */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
                  <Brain className="h-4 w-4" />
                  <span>
                    {lang === "id"
                      ? "Mekanisme Neurobiologi & Tubuh"
                      : "Neurobiology & Somatic Mechanism"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === "id"
                    ? "Kenapa Amarah Berubah Jadi Nyeri Fisik?"
                    : "Why Stifled Anger Converts into Muscle Armor"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                </p>
              </div>

              {/* Clinical Action Protocols */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {lang === "id"
                      ? "Protokol Pemulihan & Pelepasan Somatik"
                      : "Clinical De-Armoring Action Protocol"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {lang === "id"
                    ? "Langkah Aman Melepaskan Amarah Tanpa Merusak Hubungan"
                    : "Evidence-Based Steps to Release Held Rage Safely"}
                </h3>
                <div className="space-y-3">
                  {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                    (step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* In-App Journaling Reassurance CTA */}
              <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-stone-900 to-stone-950 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Ju Private Venting Sanctuary</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {lang === "id"
                      ? "Keluarkan Amarah Mentah Anda Tanpa Takut Dihakimi"
                      : "Express Your Raw, Uncensored Anger in Safety"}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-lg">
                    {lang === "id"
                      ? "Gunakan jurnal suara Nuju untuk menyuarakan rasa kesal, lelah, dan batas yang dilanggar tanpa sensor."
                      : "Talk freely into Nuju's encrypted voice journal. Release trapped vocal tension and reclaim your boundaries."}
                  </p>
                </div>
                <Link
                  to="/app"
                  className="rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold text-stone-950 hover:bg-stone-200 transition shadow-md shrink-0"
                >
                  {lang === "id" ? "Coba Jurnal Suara Nuju" : "Open Nuju Voice Journal"}
                </Link>
              </div>

              {/* Bottom AdSense Banner */}
              <div className="mt-8">
                <AdSenseBanner slot="quiz-result-banner" format="auto" />
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <RepressedAngerShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

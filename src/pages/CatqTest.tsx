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
  UserCheck,
  Brain,
  Shield,
  Smile,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  CATQ_QUESTIONS,
  CATQ_LEVELS,
  CatqResultLevel,
} from "@/data/catq-screener";
import { CatqShareCardModal } from "@/components/CatqShareCardModal";
import { CatqScoreResult, CatqCardLang } from "@/lib/generate-quiz-card";

export default function CatqTest() {
  const [lang, setLang] = useState<CatqCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = CATQ_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    switch (lang) {
      case "id":
        return [
          { val: 0, text: "Sangat Jarang / Tidak Pernah" },
          { val: 1, text: "Kadang-kadang / Sedikit" },
          { val: 2, text: "Sering / Nyata Dilakukan" },
          { val: 3, text: "Hampir Selalu / Sangat Intensif" },
        ];
      case "de":
        return [
          { val: 0, text: "Sehr selten / Nie" },
          { val: 1, text: "Manchmal / Leicht" },
          { val: 2, text: "Häufig / Deutlich" },
          { val: 3, text: "Fast ständig / Intensiv" },
        ];
      case "fr":
        return [
          { val: 0, text: "Rarement ou Jamais" },
          { val: 1, text: "Parfois / Léger" },
          { val: 2, text: "Souvent / Marqué" },
          { val: 3, text: "Presque constamment" },
        ];
      case "es":
        return [
          { val: 0, text: "Rara vez o Nunca" },
          { val: 1, text: "A veces / Leve" },
          { val: 2, text: "A menudo / Notorio" },
          { val: 3, text: "Casi siempre / Intenso" },
        ];
      default:
        return [
          { val: 0, text: "Rarely or Never" },
          { val: 1, text: "Sometimes / Mild" },
          { val: 2, text: "Often / Distinct Effort" },
          { val: 3, text: "Almost Always / High Effort" },
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

  const scoreResult: CatqScoreResult = useMemo(() => {
    let total = 0;
    let compensation = 0;
    let masking = 0;
    let assimilation = 0;

    questions.forEach((q) => {
      const val = answers[q.id] ?? 0;
      total += val;
      if (q.category === "compensation") compensation += val;
      if (q.category === "masking") masking += val;
      if (q.category === "assimilation") assimilation += val;
    });

    const maxScore = questions.length * 3;
    const percentage = Math.round((total / maxScore) * 100);

    let levelKey: "authentic" | "adaptive" | "high_burden" | "burnout_risk" = "authentic";
    if (total >= 27) levelKey = "burnout_risk";
    else if (total >= 17) levelKey = "high_burden";
    else if (total >= 9) levelKey = "adaptive";

    const levelObj =
      CATQ_LEVELS.find((l) => l.level === levelKey) || CATQ_LEVELS[0];

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
        compensation: {
          score: compensation,
          percentage: Math.round((compensation / 12) * 100),
        },
        masking: {
          score: masking,
          percentage: Math.round((masking / 12) * 100),
        },
        assimilation: {
          score: assimilation,
          percentage: Math.round((assimilation / 12) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel: CatqResultLevel = useMemo(() => {
    return (
      CATQ_LEVELS.find((l) => l.level === scoreResult.level) ||
      CATQ_LEVELS[0]
    );
  }, [scoreResult.level]);

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes CAT-Q Masking Autisme & ADHD Online • Nuju"
            : lang === "de"
            ? "CAT-Q Test: Autistisches Masking & Camouflage • Nuju"
            : lang === "fr"
            ? "Test CAT-Q Masquage Autistique & TDAH Gratuit • Nuju"
            : lang === "es"
            ? "Test CAT-Q Enmascaramiento Autista y TDAH • Nuju"
            : "CAT-Q Test: Autistic & ADHD Masking Screener • Nuju"
        }
        description={
          lang === "id"
            ? "Skrining klinis 12 pertanyaan CAT-Q untuk mengukur tingkat kompensasi sosial, penahanan stimming, dan kelelahan bersandiwara (autistic masking burnout)."
            : "Clinical 12-item Camouflaging Autistic Traits Questionnaire (CAT-Q) screener. Measure social compensation, stim suppression, and neurodivergent masking burnout."
        }
        canonical="https://www.nuju.app/quiz/cat-q"
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-teal-500/30 selection:text-teal-200">
        {/* Navigation Bar */}
        <header className="border-b border-stone-800/80 bg-stone-950/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Nuju</span>
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            </Link>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 rounded-full border border-stone-800 bg-stone-900 p-1">
                {(["en", "id", "de", "fr", "es"] as CatqCardLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
                      lang === l
                        ? "bg-teal-600 text-white shadow-sm"
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
          <AdSenseBanner slot="quiz-catq-top" format="auto" />
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Progress & Breadcrumbs */}
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-teal-500/10 px-2 py-0.5 text-teal-400 border border-teal-500/20 font-mono">
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span className="uppercase tracking-wider">
                    {currentQuestion.category}
                  </span>
                </div>
                <span>{progressPercent}% completed</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 rounded-full"
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
                            ? "border-teal-500 bg-teal-500/10 text-white shadow-md shadow-teal-500/10"
                            : "border-stone-800/80 bg-stone-950/40 text-stone-300 hover:border-stone-700 hover:bg-stone-900"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium group-hover:text-white">
                          {opt.text}
                        </span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-teal-400 bg-teal-500 text-white"
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
                    <AdSenseBanner slot="quiz-catq-mid" format="horizontal" />
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
                    <UserCheck className="h-3.5 w-3.5" />
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
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                      Compensation
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">
                        {scoreResult.subscales.compensation.percentage}%
                      </span>
                      <span className="text-2xs text-stone-400 font-mono">
                        {scoreResult.subscales.compensation.score}/12
                      </span>
                    </div>
                    <span className="text-2xs text-stone-400">Scripts & copying others</span>
                  </div>

                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-3.5">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Masking
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">
                        {scoreResult.subscales.masking.percentage}%
                      </span>
                      <span className="text-2xs text-stone-400 font-mono">
                        {scoreResult.subscales.masking.score}/12
                      </span>
                    </div>
                    <span className="text-2xs text-stone-400">Suppressing natural stims</span>
                  </div>

                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-3.5">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                      Assimilation
                    </span>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-lg font-black text-white">
                        {scoreResult.subscales.assimilation.percentage}%
                      </span>
                      <span className="text-2xs text-stone-400 font-mono">
                        {scoreResult.subscales.assimilation.score}/12
                      </span>
                    </div>
                    <span className="text-2xs text-stone-400">Forced social performance</span>
                  </div>
                </div>

                {/* Share Card Trigger CTA */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-teal-500 transition shadow-sm"
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
              <AdSenseBanner slot="quiz-catq-result" format="rectangle" />

              {/* Neurobiology Breakdown */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-teal-400">
                  <Brain className="h-5 w-5" />
                  <h2 className="text-base font-bold uppercase tracking-wider">
                    {lang === "id" ? "Neurobiologi Beban Masking" : "The Cognitive Cost of Social Camouflage"}
                  </h2>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activeLevel.neurobiology[lang]}
                </p>
              </div>

              {/* Action Protocol */}
              <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Shield className="h-5 w-5" />
                  <h2 className="text-base font-bold uppercase tracking-wider">
                    {lang === "id" ? "Protokol Pemulihan Sensoris" : "Sensory Unmasking & Recovery Protocol"}
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
              <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-950/50 via-stone-900 to-stone-950 p-6 sm:p-8 text-center space-y-4">
                <Sparkles className="h-8 w-8 text-teal-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">
                  {lang === "id"
                    ? "Lepas Topeng Sosial Anda di Nuju"
                    : "Unmask Safely in Private with Nuju"}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
                  {lang === "id"
                    ? "Lelah harus selalu tersenyum dan memilih kata-kata sempurna? Di Nuju, Anda tidak perlu bersandiwara. Bicaralah apa adanya dengan intonasi bebas, dan biarkan Ju merangkul diri autentik Anda tanpa penghakiman."
                    : "Exhausted from calculating eye contact and filtering every sentence? In Nuju, you never have to perform. Speak unfiltered with your natural cadence, and let Ju validate your authentic self without judgment."}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/app"
                    className="rounded-full bg-teal-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-teal-500 transition shadow-lg shadow-teal-600/20"
                  >
                    {lang === "id" ? "Buka Nuju Web App" : "Open Nuju Web App"}
                  </Link>
                  <Link
                    to="/blog"
                    className="rounded-full border border-stone-700 bg-stone-800/80 px-6 py-3 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white transition"
                  >
                    {lang === "id" ? "Baca Artikel Neurodiversitas" : "Read Neurodiversity Articles"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Share Card Modal */}
        <CatqShareCardModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          result={scoreResult}
          lang={lang}
        />
      </div>
    </>
  );
}

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
  Brain,
  ShieldAlert,
  HeartCrack,
  HelpCircle,
  Search,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  ROCD_QUESTIONS,
  ROCD_RESULTS,
  ROCD_OPTIONS,
  ROCD_SUBSCALE_INFO,
  getRocdResult,
  calculateRocdSubscales,
  RocdCardLang,
} from "@/data/rocd";
import { RocdShareCardModal } from "@/components/RocdShareCardModal";
import { RocdScoreResult } from "@/lib/generate-quiz-card";

export default function RocdTest() {
  const [lang, setLang] = useState<RocdCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = ROCD_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return ROCD_OPTIONS.map((opt) => ({
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

  const scoreResult: RocdScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getRocdResult(total);
    const rawSubscales = calculateRocdSubscales(answers);

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
        feelings_and_rightness: {
          score: rawSubscales.feelings_and_rightness,
          percentage: Math.round((rawSubscales.feelings_and_rightness / 16) * 100),
        },
        partner_flaw_scrutiny: {
          score: rawSubscales.partner_flaw_scrutiny,
          percentage: Math.round((rawSubscales.partner_flaw_scrutiny / 16) * 100),
        },
        compulsive_checking: {
          score: rawSubscales.compulsive_checking,
          percentage: Math.round((rawSubscales.compulsive_checking / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel = useMemo(() => {
    return getRocdResult(scoreResult.score);
  }, [scoreResult.score]);

  // Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Relationship OCD (ROCD)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Relationship OCD (ROCD) is a presentation of Obsessive-Compulsive Disorder characterized by intrusive, distressing, and continuous doubts regarding one's feelings toward their partner, the partner's feelings, and the 'rightness' of the relationship, accompanied by compulsive checking and reassurance seeking.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if it's ROCD or true incompatibility?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "True incompatibility is usually marked by quiet disappointment, differing core values, or objective mistreatment, without urgency. ROCD is characterized by urgent, panicky spikes of anxiety, continuous hyper-scrutiny of tiny physical or intellectual flaws, and an exhausting addiction to finding 100% certainty.",
        },
      },
      {
        "@type": "Question",
        name: "How is Relationship OCD treated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The gold standard treatment is Exposure and Response Prevention (ERP) and Acceptance and Commitment Therapy (ACT). Sufferers learn to sit with emotional ambiguity, stop checking rituals and confessions, and practice unedited private voice journaling in Nuju to tolerate relational uncertainty.",
        },
      },
    ],
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Relationship OCD (ROCD) Screener",
    description:
      "A clinical 12-question screener evaluating relationship-centered obsessions, partner flaw scrutiny, and compulsive checking based on Prof. Guy Doron's ROCI/PROCSI model.",
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Clinical Psychology and Obsessive-Compulsive Spectrum",
    },
    hasPart: questions.map((q) => ({
      "@type": "Question",
      name: q.text.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Self-assessed frequency rating on a 5-point clinical scale.",
      },
    })),
  };

  return (
    <>
      <SEOHead
        title={
          lang === "id"
            ? "Tes Relationship OCD (ROCD) Indonesia: Ragukan Cinta Pasangan | Nuju"
            : "Relationship OCD (ROCD) Test: Obsessive Love Doubts Screener | Nuju"
        }
        description={
          lang === "id"
            ? "Ikuti tes ROCD 12 pertanyaan (Model Prof. Guy Doron). Ketahui apakah Anda terperangkap obsesi meragukan cinta, meneliti kekurangan fisik pasangan, dan mencari kepastian semu."
            : "Screen for Relationship OCD (ROCD) with this 12-item clinical assessment based on Prof. Guy Doron's ROCI & PROCSI framework. Measure feelings doubt, partner scrutiny, and checking compulsions."
        }
        canonical="https://nuju.app/quiz/rocd"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="min-h-screen bg-[#0A0311] text-stone-100 selection:bg-purple-500 selection:text-white pb-20">
        {/* Navigation Bar */}
        <header className="border-b border-purple-950/40 bg-[#160625]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes Psikologi" : "All Psychology Tests"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-purple-950/40 p-1 rounded-full border border-purple-900/40 text-xs">
              {(["en", "id", "de", "fr", "es"] as RocdCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition ${
                    lang === l
                      ? "bg-purple-600 text-white shadow-xs"
                      : "text-stone-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Top AdSense Banner */}
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <AdSenseBanner slot="quiz-top-banner" format="auto" />
        </div>

        <main className="max-w-3xl mx-auto px-4 pt-6 sm:pt-10">
          {!isCompleted ? (
            /* Quiz Questions Container */
            <div className="space-y-6">
              {/* Header Badge & Title */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
                  <Search className="h-3.5 w-3.5 text-purple-400" />
                  <span>Prof. Guy Doron Model · ROCI & PROCSI Framework</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Relationship OCD (ROCD)"
                    : "Relationship OCD (ROCD) Screener"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                  {lang === "id"
                    ? "Apakah Anda terus-menerus bertanya 'Apakah aku benar-benar cinta?' dan terobsesi memeriksa kekurangan pasangan? Ukur intensitas obsesi relasi Anda."
                    : "Do you obsessively doubt your feelings, hyper-scrutinize your partner's flaws, or compulsively search for relationship certainty? Measure your ROCD index."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-400 font-medium">
                  <span>
                    {lang === "id" ? "Pertanyaan" : "Question"} {currentQuestionIndex + 1} /{" "}
                    {questions.length}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-900 border border-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-purple-900/40 bg-gradient-to-b from-[#1C092E] to-[#0D0316] p-6 sm:p-8 shadow-xl">
                <div className="mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-purple-400">
                    {
                      ROCD_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      ROCD_SUBSCALE_INFO[currentQuestion.subscale].name.en
                    }
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-semibold text-white leading-relaxed mb-6">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {answerLabels.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAnswer(opt.val)}
                        className={`group relative flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-medium transition-all ${
                          isSelected
                            ? "border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-950/50"
                            : "border-purple-950/60 bg-purple-950/20 text-stone-300 hover:border-purple-700/50 hover:bg-purple-900/20 hover:text-white"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-purple-400 bg-purple-500 text-white"
                              : "border-stone-700 group-hover:border-stone-500"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back Button */}
                {currentQuestionIndex > 0 && (
                  <div className="mt-6 flex justify-start">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>{lang === "id" ? "Kembali ke soal sebelumnya" : "Previous Question"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Top Result Card */}
              <div className="rounded-3xl border border-purple-500/40 bg-gradient-to-b from-[#210D34] to-[#0C0415] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-purple-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-purple-400 transition shadow-md"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{lang === "id" ? "Bagikan Hasil" : "Share Story Card"}</span>
                      </button>

                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 rounded-full border border-stone-800 bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:bg-white/10 transition"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>{lang === "id" ? "Ulangi" : "Retake"}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      {lang === "id" ? "Hasil Analisis ROCD Anda" : "Your ROCD Evaluation"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                      {activeLevel.title[lang] || activeLevel.title.en}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
                      {activeLevel.summary[lang] || activeLevel.summary.en}
                    </p>
                  </div>

                  {/* Score Meter Bar */}
                  <div className="rounded-2xl bg-black/40 border border-purple-950 p-4 space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-stone-300">
                        {lang === "id" ? "Indeks Intensitas Obsesi ROCD" : "ROCD Obsession Index"}
                      </span>
                      <span className="text-lg font-black text-purple-400">
                        {scoreResult.score} / 48 ({scoreResult.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-stone-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300 rounded-full"
                        style={{ width: `${scoreResult.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Subscale Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Subscale 1: Feelings Doubt */}
                    <div className="rounded-2xl border border-purple-950 bg-purple-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-purple-300 uppercase">
                        {lang === "id" ? "Keraguan Perasaan" : "Feelings & Rightness"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.feelings_and_rightness.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Panik mempertanyakan apakah ini cinta sejati atau sekadar kebohongan."
                          : "Panic questioning if you feel 'enough' or if they are the 'One'."}
                      </p>
                    </div>

                    {/* Subscale 2: Flaw Scrutiny */}
                    <div className="rounded-2xl border border-purple-950 bg-purple-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-fuchsia-300 uppercase">
                        {lang === "id" ? "Pemeriksaan Kekurangan" : "Flaw Scrutiny"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.partner_flaw_scrutiny.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Fokus berlebihan pada fisik, kecerdasan, dan kebiasaan pasangan."
                          : "Hyper-fixation on partner's physical appearance, intelligence, and habits."}
                      </p>
                    </div>

                    {/* Subscale 3: Compulsive Checking */}
                    <div className="rounded-2xl border border-purple-950 bg-purple-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-purple-300 uppercase">
                        {lang === "id" ? "Pengecekan Kompulsif" : "Compulsive Checking"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.compulsive_checking.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Membuka Google berjam-jam, membandingkan dengan mantan, menuntut kepastian."
                          : "Endless Googling, comparison with exes, and seeking relationship reassurance."}
                      </p>
                    </div>
                  </div>

                  {/* Neurobiology Card */}
                  <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wide">
                      <Brain className="h-4 w-4" />
                      <span>{lang === "id" ? "Wawasan Neurobiologis & Sirkuit OCD" : "Neurobiology & CSTC Loop"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                    </p>
                  </div>

                  {/* Action Protocol */}
                  <div className="rounded-2xl border border-purple-950 bg-black/40 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wide">
                      <ShieldAlert className="h-4 w-4 text-purple-400" />
                      <span>{lang === "id" ? "Protokol ERP Mentoleransi Ketidakpastian" : "ERP Uncertainty Protocol"}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                      {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-[11px] font-bold text-purple-300 border border-purple-500/30">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA to Nuju App Voice Journal */}
                  <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 p-6 text-white space-y-4 shadow-xl">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">
                        <Sparkles className="h-3 w-3" />
                        <span>Nuju Voice Journal</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        {lang === "id"
                          ? "Keluarkan Keraguan Batin Anda Tanpa Merusak Pasangan"
                          : "Process Intrusive Doubts in Total Safety with Nuju"}
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                        {lang === "id"
                          ? "Mengakui keraguan obsesif kepada pasangan hanya akan menyakiti hatinya dan memperparah siklus OCD. Gunakan jurnal suara terenkripsi Nuju untuk meluapkan kepanikan, belajar duduk bersama ketidakpastian, dan menjaga hubungan Anda tetap utuh."
                          : "Confessing intrusive doubts to your partner damages trust and fuels the OCD monster. Nuju provides an unedited, encrypted audio haven to discharge relationship anxiety, practice ERP tolerance, and protect your love."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to="/auth"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-extrabold text-purple-950 hover:bg-purple-50 transition shadow"
                      >
                        <span>{lang === "id" ? "Coba Jurnal Suara Nuju Gratis" : "Start Voice Journaling Free"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-black/20 px-4 py-2 text-xs font-semibold text-white hover:bg-black/30 transition"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{lang === "id" ? "Simpan / Share Hasil" : "Save / Share Card"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mid-Page AdSense Banner */}
              <div className="my-6">
                <AdSenseBanner slot="quiz-result-banner" format="auto" />
              </div>

              {/* Clinical Educational Section / FAQ */}
              <div className="rounded-3xl border border-purple-950/60 bg-purple-950/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {lang === "id"
                      ? "Pertanyaan Umum Seputar Relationship OCD (ROCD)"
                      : "Frequently Asked Questions About ROCD"}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-purple-950">
                    <h4 className="font-bold text-purple-300">
                      {lang === "id"
                        ? "Apakah Normal Meragukan Pasangan Sesekali?"
                        : "Is it normal to doubt your relationship sometimes?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Sangat normal! Keraguan sesekali adalah bagian dari kemanusiaan. Perbedaannya: orang tanpa ROCD membiarkan keraguan berlalu tanpa panik. Penderita ROCD memperlakukan keraguan sebagai keadaan darurat yang harus diselesaikan 100% detik itu juga, memicu kompulsi pengecekan berjam-jam."
                        : "Completely normal. The difference lies in the response: healthy doubt feels neutral and passes quickly. ROCD treats doubt as a life-or-death crisis, demanding immediate 100% certainty through exhaustive checking, comparing, and testing."}
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-purple-950">
                    <h4 className="font-bold text-fuchsia-300">
                      {lang === "id"
                        ? "Kenapa Mengaku ke Pasangan Malah Bikin Tambah Cemas?"
                        : "Why does confessing my doubts make anxiety worse?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Mengaku adalah bentuk kompulsi pencarian kepastian. Setelah Anda mengaku, rasa lega hanya bertahan 10-15 menit. Setelah itu, otak OCD Anda akan menuntut pengakuan baru untuk keraguan berikutnya, sambil merusak rasa aman pasangan."
                        : "Confessing is an OCD reassurance ritual. It grants 15 minutes of temporary relief, but it trains the brain that doubt was indeed dangerous, causing anxiety to roar back twice as strong while eroding your partner's emotional safety."}
                    </p>
                  </div>
                </div>

                {/* Related Tests & Guides */}
                <div className="pt-4 border-t border-purple-950/60">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">
                    {lang === "id" ? "Tes Psikologi Terkait" : "Related Psychological Screeners"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to="/quiz/attachment-style"
                      className="group flex items-center justify-between rounded-xl border border-purple-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-purple-700 hover:text-white transition"
                    >
                      <span>Attachment Style & Insecurity Screener</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-purple-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/stonewalling"
                      className="group flex items-center justify-between rounded-xl border border-purple-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-purple-700 hover:text-white transition"
                    >
                      <span>Gottman Stonewalling & Silent Treatment</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-purple-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/limerence"
                      className="group flex items-center justify-between rounded-xl border border-purple-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-purple-700 hover:text-white transition"
                    >
                      <span>Limerence & Romantic Obsession Screener</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-purple-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/trauma-bond"
                      className="group flex items-center justify-between rounded-xl border border-purple-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-purple-700 hover:text-white transition"
                    >
                      <span>Trauma Bonding & Intermittent Reinforcement</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-purple-400 transition" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Card Modal */}
      <RocdShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

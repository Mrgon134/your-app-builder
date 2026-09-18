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
  VolumeX,
  HelpCircle,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  ECHOISM_QUESTIONS,
  ECHOISM_RESULTS,
  ECHOISM_OPTIONS,
  ECHOISM_SUBSCALE_INFO,
  getEchoismResult,
  calculateEchoismSubscales,
  EchoismCardLang,
} from "@/data/echoism";
import { EchoismShareCardModal } from "@/components/EchoismShareCardModal";
import { EchoismScoreResult } from "@/lib/generate-quiz-card";

export default function EchoismTest() {
  const [lang, setLang] = useState<EchoismCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = ECHOISM_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return ECHOISM_OPTIONS.map((opt) => ({
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

  const scoreResult: EchoismScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getEchoismResult(total);
    const rawSubscales = calculateEchoismSubscales(answers);

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
        self_erasure: {
          score: rawSubscales.self_erasure,
          percentage: Math.round((rawSubscales.self_erasure / 16) * 100),
        },
        praise_aversion: {
          score: rawSubscales.praise_aversion,
          percentage: Math.round((rawSubscales.praise_aversion / 16) * 100),
        },
        narcissist_magnet: {
          score: rawSubscales.narcissist_magnet,
          percentage: Math.round((rawSubscales.narcissist_magnet / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel = useMemo(() => {
    return getEchoismResult(scoreResult.score);
  }, [scoreResult.score]);

  // Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Echoism in psychology?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Echoism, coined by Harvard psychologist Dr. Craig Malkin, describes the psychological opposite of narcissism. Named after the mythical nymph Echo who lost her voice and could only repeat others, echoists suffer from a visceral dread of seeming narcissistic, taking up space, or having needs.",
        },
      },
      {
        "@type": "Question",
        name: "How is Echoism different from People Pleasing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While people pleasers often seek approval and validation through generosity, echoists specifically survive by self-erasure. They actively despise being praised or noticed, feel guilty whenever attention is on them, and frequently pair with narcissistic or domineering partners whom they can serve.",
        },
      },
      {
        "@type": "Question",
        name: "How can someone heal from Echoism?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Healing from echoism requires developing 'healthy narcissism'—recognizing that having preferences and emotional needs does not make one abusive. Somatic voice journaling, boundary assertion drills, and desensitization to receiving compliments help reclaim selfhood.",
        },
      },
    ],
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Echoism & Fear of Taking Up Space Screener",
    description:
      "A clinical 12-question screener evaluating echoistic traits, self-erasure, praise aversion, and narcissistic partner attraction based on Dr. Craig Malkin's model.",
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Clinical Psychology and Narcissism Spectrum",
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
            ? "Tes Echoism Indonesia: Takut Jadi Beban & Benci Dipuji | Nuju"
            : "Echoism Test & Fear of Taking Up Space Screener | Nuju"
        }
        description={
          lang === "id"
            ? "Ikuti tes echoism 12 pertanyaan berdasarkan model Dr. Craig Malkin. Ketahui mengapa Anda takut memiliki kebutuhan, benci sorotan, dan selalu mengalah demi orang lain."
            : "Assess your echoism traits, self-erasure, compliment dread, and fear of burdening others with this 12-question screener based on Dr. Craig Malkin's Harvard research."
        }
        canonical="https://nuju.app/quiz/echoism"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="min-h-screen bg-[#030A08] text-stone-100 selection:bg-emerald-500 selection:text-white pb-20">
        {/* Navigation Bar */}
        <header className="border-b border-emerald-950/40 bg-[#071713]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes Psikologi" : "All Psychology Tests"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-emerald-950/40 p-1 rounded-full border border-emerald-900/40 text-xs">
              {(["en", "id", "de", "fr", "es"] as EchoismCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition ${
                    lang === l
                      ? "bg-emerald-600 text-white shadow-xs"
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
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                  <VolumeX className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Dr. Craig Malkin Harvard Model · Echoism Spectrum</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Echoism & Ketakutan Menjadi Beban"
                    : "Echoism Screener & Self-Erasure Test"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                  {lang === "id"
                    ? "Apakah Anda merasa bersalah setiap kali memiliki keinginan pribadi dan merasa risih saat dipuji? Temukan apakah Anda berada pada spektrum echoism dalam 90 detik."
                    : "Do you dread taking up space, hate being celebrated, and feel like a burden whenever you have needs? Discover your echoism profile."}
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
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-[#091D17] to-[#040F0C] p-6 sm:p-8 shadow-xl">
                <div className="mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400">
                    {
                      ECHOISM_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      ECHOISM_SUBSCALE_INFO[currentQuestion.subscale].name.en
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
                            ? "border-emerald-500 bg-emerald-500/20 text-white shadow-lg shadow-emerald-950/50"
                            : "border-emerald-950/60 bg-emerald-950/20 text-stone-300 hover:border-emerald-700/50 hover:bg-emerald-900/20 hover:text-white"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-emerald-400 bg-emerald-500 text-black"
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
              <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#0A221C] to-[#040E0C] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-black hover:bg-emerald-400 transition shadow-md"
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
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {lang === "id" ? "Hasil Analisis Echoism Anda" : "Your Echoism Evaluation"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                      {activeLevel.title[lang] || activeLevel.title.en}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
                      {activeLevel.summary[lang] || activeLevel.summary.en}
                    </p>
                  </div>

                  {/* Score Meter Bar */}
                  <div className="rounded-2xl bg-black/40 border border-emerald-950 p-4 space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-stone-300">
                        {lang === "id" ? "Tingkat Keparahan Echoism" : "Echoism Severity Score"}
                      </span>
                      <span className="text-lg font-black text-emerald-400">
                        {scoreResult.score} / 48 ({scoreResult.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-stone-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full"
                        style={{ width: `${scoreResult.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Subscale Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Subscale 1: Self Erasure */}
                    <div className="rounded-2xl border border-emerald-950 bg-emerald-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-emerald-300 uppercase">
                        {lang === "id" ? "Self-Erasure" : "Self-Erasure"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.self_erasure.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Takut jadi beban, otomatis mengalah, dan rasa bersalah saat memiliki kebutuhan."
                          : "Dread of being a burden and guilt around having basic desires."}
                      </p>
                    </div>

                    {/* Subscale 2: Praise Aversion */}
                    <div className="rounded-2xl border border-emerald-950 bg-emerald-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-teal-300 uppercase">
                        {lang === "id" ? "Praise Aversion" : "Praise Aversion"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.praise_aversion.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Sangat risih saat dipuji, menepis prestasi, dan takut sorotan."
                          : "Visceral discomfort with compliments and downplaying accomplishments."}
                      </p>
                    </div>

                    {/* Subscale 3: Narcissist Attraction */}
                    <div className="rounded-2xl border border-emerald-950 bg-emerald-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-emerald-300 uppercase">
                        {lang === "id" ? "Magnet Narsisis" : "Mirror Dynamic"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.narcissist_magnet.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Tertarik pada pasangan dominan dan merasa nyaman hanya saat menjadi pendukung."
                          : "Attraction to domineering personalities and feeling safe only in supporting roles."}
                      </p>
                    </div>
                  </div>

                  {/* Neurobiology Card */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      <Brain className="h-4 w-4" />
                      <span>{lang === "id" ? "Wawasan Neurobiologis" : "Neurobiology & Conditioning"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                    </p>
                  </div>

                  {/* Action Protocol */}
                  <div className="rounded-2xl border border-emerald-950 bg-black/40 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wide">
                      <ShieldAlert className="h-4 w-4 text-emerald-400" />
                      <span>{lang === "id" ? "Protokol Pemulihan Suara & Batasan" : "Voice Reclaiming Action Steps"}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                      {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA to Nuju App Voice Journal */}
                  <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-white space-y-4 shadow-xl">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">
                        <Sparkles className="h-3 w-3" />
                        <span>Nuju Voice Journal</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        {lang === "id"
                          ? "Latih Kembali Suara Anda Tanpa Takut Menjadi Beban"
                          : "Reclaim Your Voice in Total Privacy with Nuju"}
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                        {lang === "id"
                          ? "Orang dengan echoism sering membisu di depan orang lain. Nuju menyediakan jurnal suara pribadi terenkripsi di mana Anda bebas meluapkan keinginan, kemarahan, dan emosi tanpa takut dinilai atau dicap egois."
                          : "Echoists suppress their inner world until their own voice disappears. Nuju provides a zero-judgment encrypted audio journal to practice voicing your authentic needs, boundaries, and emotional truth."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to="/auth"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-extrabold text-emerald-950 hover:bg-emerald-50 transition shadow"
                      >
                        <span>{lang === "id" ? "Coba Nuju Gratis Sekarang" : "Start Voice Journaling Free"}</span>
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
              <div className="rounded-3xl border border-emerald-950/60 bg-emerald-950/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {lang === "id"
                      ? "Pertanyaan yang Sering Diajukan (FAQ) Mengenai Echoism"
                      : "Frequently Asked Questions About Echoism"}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-emerald-950">
                    <h4 className="font-bold text-emerald-300">
                      {lang === "id"
                        ? "Apa bedanya Echoism dengan Sifat Pemalu atau Rendah Hati?"
                        : "What is the difference between Echoism and healthy modesty?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Rendah hati yang sehat adalah menyadari kelebihan diri tanpa harus menyombongkannya. Echoism adalah ketakutan patologis terhadap kepemilikan kebutuhan dasar: echoist merasa dirinya adalah beban beracun jika meminta bantuan atau menunjukkan jati dirinya."
                        : "Healthy modesty acknowledges strengths without arrogance. Echoism is an active terror of mattering: echoists feel toxic guilt just for occupying emotional space, asking for basic support, or receiving gratitude."}
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-emerald-950">
                    <h4 className="font-bold text-teal-300">
                      {lang === "id"
                        ? "Mengapa Echoist Sangat Rentan Menjadi Korban Pasangan Narsis?"
                        : "Why do echoists attract narcissistic partners?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Dalam mitologi Yunani, Echo mencintai Narcissus karena dia tidak memiliki suara sendiri dan Narcissus hanya ingin mendengar pantulan dirinya. Di dunia nyata, individu narsistik menyukai echoist karena kebutuhan narsisis tidak pernah disaingi, sementara echoist merasa aman karena sorotan tidak tertuju pada dirinya."
                        : "Echoists and narcissists fit like puzzle pieces: the narcissist demands all the admiration and space, while the echoist craves complete invisibility and service. The echoist feels safe from criticism by surrendering their entire identity."}
                    </p>
                  </div>
                </div>

                {/* Related Tests & Guides */}
                <div className="pt-4 border-t border-emerald-950/60">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">
                    {lang === "id" ? "Tes Psikologi Terkait" : "Related Psychological Screeners"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to="/quiz/fawn-response"
                      className="group flex items-center justify-between rounded-xl border border-emerald-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-emerald-700 hover:text-white transition"
                    >
                      <span>Fawn Response & Trauma People-Pleasing</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-emerald-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/window-of-tolerance"
                      className="group flex items-center justify-between rounded-xl border border-emerald-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-emerald-700 hover:text-white transition"
                    >
                      <span>Window of Tolerance & Nervous System Capacity</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-emerald-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/trauma-bond"
                      className="group flex items-center justify-between rounded-xl border border-emerald-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-emerald-700 hover:text-white transition"
                    >
                      <span>Trauma Bonding & Intermittent Reinforcement</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-emerald-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/people-pleaser"
                      className="group flex items-center justify-between rounded-xl border border-emerald-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-emerald-700 hover:text-white transition"
                    >
                      <span>People Pleaser & Boundary Deficit Test</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-emerald-400 transition" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Card Modal */}
      <EchoismShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

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
  Flame,
  VolumeX,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { AdSenseBanner } from "@/components/AdSenseBanner";
import {
  STONEWALLING_QUESTIONS,
  STONEWALLING_RESULTS,
  STONEWALLING_OPTIONS,
  STONEWALLING_SUBSCALE_INFO,
  getStonewallingResult,
  calculateStonewallingSubscales,
  StonewallingCardLang,
} from "@/data/stonewalling";
import { StonewallingShareCardModal } from "@/components/StonewallingShareCardModal";
import { StonewallingScoreResult } from "@/lib/generate-quiz-card";

export default function StonewallingTest() {
  const [lang, setLang] = useState<StonewallingCardLang>("en");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const questions = STONEWALLING_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  const answerLabels = useMemo(() => {
    return STONEWALLING_OPTIONS.map((opt) => ({
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

  const scoreResult: StonewallingScoreResult = useMemo(() => {
    let total = 0;
    questions.forEach((q) => {
      total += answers[q.id] ?? 0;
    });

    const maxScore = questions.length * 4; // 12 * 4 = 48
    const percentage = Math.round((total / maxScore) * 100);

    const levelObj = getStonewallingResult(total);
    const rawSubscales = calculateStonewallingSubscales(answers);

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
        autonomic_flooding: {
          score: rawSubscales.autonomic_flooding,
          percentage: Math.round((rawSubscales.autonomic_flooding / 16) * 100),
        },
        shutdown_and_withdrawal: {
          score: rawSubscales.shutdown_and_withdrawal,
          percentage: Math.round((rawSubscales.shutdown_and_withdrawal / 16) * 100),
        },
        punitive_silence: {
          score: rawSubscales.punitive_silence,
          percentage: Math.round((rawSubscales.punitive_silence / 16) * 100),
        },
      },
    };
  }, [answers, questions]);

  const activeLevel = useMemo(() => {
    return getStonewallingResult(scoreResult.score);
  }, [scoreResult.score]);

  // Structured Data (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Stonewalling in relationship psychology?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stonewalling, identified by Dr. John Gottman as one of the Four Horsemen predicting divorce, occurs when a listener withdraws from an interaction, shuts down, becomes non-responsive, and puts up an emotional brick wall during conflict.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between taking space and the silent treatment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Taking a healthy space involves communicating that you are overwhelmed, specifying an exact return time (typically 20 to 60 minutes), and returning to repair. The silent treatment is unannounced, indefinite, and weaponized to punish, control, or induce panic in the partner.",
        },
      },
      {
        "@type": "Question",
        name: "What is the antidote to stonewalling?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Gottman antidote is physiological self-soothing. When heart rate exceeds 100 BPM, partners must call a 20-minute timeout, disengage from conflict thoughts, use somatic breathing, and vent unedited feelings into private voice journals like Nuju before re-engaging.",
        },
      },
    ],
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Gottman Stonewalling & Silent Treatment Screener",
    description:
      "A clinical 12-question screener evaluating autonomic flooding, stone wall shutdown, and weaponized silent treatment based on Dr. John Gottman's research.",
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: "Relationship Psychology and Gottman Method",
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
            ? "Tes Stonewalling & Silent Treatment Indonesia (Dr. John Gottman) | Nuju"
            : "Gottman Stonewalling & Silent Treatment Test: Conflict Shutdown Screener | Nuju"
        }
        description={
          lang === "id"
            ? "Ikuti tes stonewalling 12 pertanyaan berdasarkan riset Dr. John Gottman. Ukur autonomic flooding (detak jantung >100 BPM), kebiasaan membisu, dan trauma silent treatment."
            : "Assess relationship stonewalling, autonomic flooding (>100 BPM), and weaponized silent treatment with this 12-item clinical screener based on Dr. John Gottman's Four Horsemen model."
        }
        canonical="https://nuju.app/quiz/stonewalling"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="min-h-screen bg-[#070D14] text-stone-100 selection:bg-sky-500 selection:text-white pb-20">
        {/* Navigation Bar */}
        <header className="border-b border-sky-950/40 bg-[#0E1A29]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
            <Link
              to="/quiz"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition text-xs sm:text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes Psikologi" : "All Psychology Tests"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-sky-950/40 p-1 rounded-full border border-sky-900/40 text-xs">
              {(["en", "id", "de", "fr", "es"] as StonewallingCardLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] transition ${
                    lang === l
                      ? "bg-sky-600 text-white shadow-xs"
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
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
                  <Flame className="h-3.5 w-3.5 text-sky-400" />
                  <span>Dr. John Gottman Model · Four Horsemen Assessment</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {lang === "id"
                    ? "Tes Stonewalling & Silent Treatment"
                    : "Gottman Stonewalling Screener"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
                  {lang === "id"
                    ? "Apakah perdebatan selalu berakhir dengan salah satu pihak membisu dingin, kabur, atau mendiamkan berhari-hari? Evaluasi tingkat keparahan stonewalling hubungan Anda."
                    : "Determine if autonomic flooding (>100 BPM), non-verbal shutdown, or weaponized silent treatment are sabotaging your relationship."}
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
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-sky-900/40 bg-gradient-to-b from-[#112235] to-[#08121D] p-6 sm:p-8 shadow-xl">
                <div className="mb-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400">
                    {
                      STONEWALLING_SUBSCALE_INFO[currentQuestion.subscale].name[lang] ||
                      STONEWALLING_SUBSCALE_INFO[currentQuestion.subscale].name.en
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
                            ? "border-sky-500 bg-sky-500/20 text-white shadow-lg shadow-sky-950/50"
                            : "border-sky-950/60 bg-sky-950/20 text-stone-300 hover:border-sky-700/50 hover:bg-sky-900/20 hover:text-white"
                        }`}
                      >
                        <span>{opt.text}</span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-sky-400 bg-sky-500 text-white"
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
              <div className="rounded-3xl border border-sky-500/40 bg-gradient-to-b from-[#102235] to-[#07111C] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-300">
                      <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                      <span>{activeLevel.badge[lang] || activeLevel.badge.en}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-bold text-black hover:bg-sky-400 transition shadow-md"
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
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                      {lang === "id" ? "Hasil Analisis Stonewalling" : "Your Stonewalling Evaluation"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                      {activeLevel.title[lang] || activeLevel.title.en}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
                      {activeLevel.summary[lang] || activeLevel.summary.en}
                    </p>
                  </div>

                  {/* Score Meter Bar */}
                  <div className="rounded-2xl bg-black/40 border border-sky-950 p-4 space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-semibold">
                      <span className="text-stone-300">
                        {lang === "id" ? "Tingkat Keparahan Stonewalling" : "Stonewalling Severity Score"}
                      </span>
                      <span className="text-lg font-black text-sky-400">
                        {scoreResult.score} / 48 ({scoreResult.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-stone-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 via-blue-400 to-sky-300 rounded-full"
                        style={{ width: `${scoreResult.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Subscale Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Subscale 1: Autonomic Flooding */}
                    <div className="rounded-2xl border border-sky-950 bg-sky-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-rose-400 uppercase">
                        {lang === "id" ? "Flooding >100 BPM" : "Autonomic Flooding"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.autonomic_flooding.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Jantung berdegup liar, dada sesak, dan otak mengalami overload kognitif."
                          : "Racing pulse, sensory overload, and fight/flight survival freeze."}
                      </p>
                    </div>

                    {/* Subscale 2: Stone Wall Shutdown */}
                    <div className="rounded-2xl border border-sky-950 bg-sky-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-sky-300 uppercase">
                        {lang === "id" ? "Membisu Dinding Batu" : "Stone Wall Shutdown"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.shutdown_and_withdrawal.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Wajah beku, menolak kontak mata, jawaban ketus, atau pergi tanpa pamit."
                          : "Blank stare, non-verbal mutism, and walking away abruptly."}
                      </p>
                    </div>

                    {/* Subscale 3: Punitive Silence */}
                    <div className="rounded-2xl border border-sky-950 bg-sky-950/20 p-4 space-y-2">
                      <div className="text-xs font-bold text-slate-300 uppercase">
                        {lang === "id" ? "Silent Treatment" : "Punitive Silence"}
                      </div>
                      <div className="text-2xl font-black text-white">
                        {scoreResult.subscales.punitive_silence.percentage}%
                      </div>
                      <p className="text-[11px] text-stone-400 leading-tight">
                        {lang === "id"
                          ? "Aksi diam berhari-hari untuk menghukum dan memaksa pasangan menyerah."
                          : "Weaponized cold silence used to punish, control, and force surrender."}
                      </p>
                    </div>
                  </div>

                  {/* Neurobiology Card */}
                  <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wide">
                      <Brain className="h-4 w-4" />
                      <span>{lang === "id" ? "Wawasan Neurobiologis & dACC Pain" : "Neurobiology & dACC Pain"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {activeLevel.neurobiology[lang] || activeLevel.neurobiology.en}
                    </p>
                  </div>

                  {/* Action Protocol */}
                  <div className="rounded-2xl border border-sky-950 bg-black/40 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wide">
                      <ShieldAlert className="h-4 w-4 text-sky-400" />
                      <span>{lang === "id" ? "Protokol De-eskalasi 20 Menit Gottman" : "Gottman 20-Min Protocol"}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                      {(activeLevel.actionProtocol[lang] || activeLevel.actionProtocol.en).map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-[11px] font-bold text-sky-300 border border-sky-500/30">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA to Nuju App Voice Journal */}
                  <div className="rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 p-6 text-white space-y-4 shadow-xl">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">
                        <Sparkles className="h-3 w-3" />
                        <span>Nuju Voice Journal</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        {lang === "id"
                          ? "Lepaskan Beban 'Flooding' Anda Sebelum Berbicara Lagi"
                          : "Discharge Conflict Flooding in Private with Nuju"}
                      </h3>
                      <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                        {lang === "id"
                          ? "Saat detak jantung melonjak >100 BPM, berbicara dengan pasangan hanya akan memperkeruh situasi. Gunakan jeda 20 menit bersama Nuju: rekam kemarahan dan frustrasi Anda secara bebas dalam jurnal suara terenkripsi untuk menurunkan kortisol sebelum melakukan rekonsiliasi."
                          : "When pulse exceeds 100 BPM, trying to force communication only leads to screaming or stonewalling. Take a 20-minute timeout with Nuju: vent your unedited thoughts safely into an encrypted audio journal to lower heart rate and restore prefrontal empathy before returning to your partner."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        to="/auth"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-extrabold text-sky-950 hover:bg-sky-50 transition shadow"
                      >
                        <span>{lang === "id" ? "Mulai Jurnal Suara Nuju Gratis" : "Start Voice Journaling Free"}</span>
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
              <div className="rounded-3xl border border-sky-950/60 bg-sky-950/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-5 w-5 text-sky-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {lang === "id"
                      ? "Pertanyaan Umum Seputar Stonewalling & Silent Treatment"
                      : "Frequently Asked Questions About Stonewalling"}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-sky-950">
                    <h4 className="font-bold text-sky-300">
                      {lang === "id"
                        ? "Kenapa Pasangan Saya Membisu Padahal Masalahnya Sepele?"
                        : "Why does my partner stonewall over minor issues?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Bagi orang yang rentan stonewalling, masalahnya bukan topik perdebatan, melainkan respon fisiologis tubuhnya ('Flooding'). Nada bicara yang sedikit meninggi langsung memicu lonjakan detak jantung di atas 100 BPM, membuat sistem sarafnya lumpuh dan memilih mati rasa sebagai mekanisme bertahan hidup."
                        : "It is rarely about the topic itself; it is about biological flooding. A minor change in tone triggers an autonomic threat response, pushing their heart rate above 100 BPM. Their nervous system shuts down speech to prevent an explosive physical collapse."}
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-2xl bg-black/30 p-4 border border-sky-950">
                    <h4 className="font-bold text-blue-300">
                      {lang === "id"
                        ? "Apakah Silent Treatment Termasuk Kekerasan Emosional?"
                        : "Is the silent treatment considered emotional abuse?"}
                    </h4>
                    <p className="text-stone-300 leading-relaxed">
                      {lang === "id"
                        ? "Ya, jika dilakukan secara sengaja berhari-hari untuk menghukum atau mendominasi. Riset neurologis membuktikan bahwa didiamkan pasangan mengaktifkan area otak yang sama persis dengan luka bakar fisik, menimbulkan trauma penolakan dan kecemasan abandonment yang parah."
                        : "Yes, when weaponized to punish, control, or induce panic. Neuroimaging confirms that social exclusion and silent treatment trigger the same dorsal anterior cingulate cortex pain receptors as severe physical burns, causing profound relational trauma."}
                    </p>
                  </div>
                </div>

                {/* Related Tests & Guides */}
                <div className="pt-4 border-t border-sky-950/60">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">
                    {lang === "id" ? "Tes Psikologi Terkait" : "Related Psychological Screeners"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      to="/quiz/window-of-tolerance"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Window of Tolerance & Nervous System Capacity</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/trauma-bond"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Trauma Bonding & Intermittent Reinforcement</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/rocd"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Relationship OCD (ROCD) & Doubt Screener</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                    <Link
                      to="/quiz/repressed-anger"
                      className="group flex items-center justify-between rounded-xl border border-sky-950 bg-black/30 p-3 text-xs font-medium text-stone-300 hover:border-sky-700 hover:text-white transition"
                    >
                      <span>Repressed Anger & Somatic Rage Screener</span>
                      <ArrowRight className="h-3.5 w-3.5 text-stone-500 group-hover:text-sky-400 transition" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Share Card Modal */}
      <StonewallingShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        result={scoreResult}
        lang={lang}
      />
    </>
  );
}

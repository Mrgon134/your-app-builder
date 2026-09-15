import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  RotateCcw,
  Sparkles,
  Heart,
  Brain,
  ShieldCheck,
  Copy,
  ChevronRight,
  HelpCircle,
  Download,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import QuizShareCardModal from "@/components/QuizShareCardModal";
import QuizLeadCapture from "@/components/QuizLeadCapture";
import { getQuizBySlug, getAllQuizzes, QuizMeta, QuizOption, QuizResult } from "@/data/quizzes";
import juMain from "@/assets/ju-main.webp";
import { toast } from "sonner";

const QuizRunner: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const quiz = quizId ? getQuizBySlug(quizId) : undefined;
  const allQuizzes = getAllQuizzes();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Reset state on quizId change
    setCurrentIndex(0);
    setAnswers({});
    setIsAnalyzing(false);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [quizId]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 text-center">
        <img src={juMain} alt="Ju mascot" className="h-20 w-20 mb-4 rounded-full" />
        <h1 className="text-2xl font-bold text-neutral-900">Kuis Tidak Ditemukan</h1>
        <p className="mt-2 text-neutral-600 max-w-md">
          Maaf, tautan kuis yang kamu tuju belum tersedia atau telah berpindah alamat.
        </p>
        <Link
          to="/quiz"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Kuis</span>
        </Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / quiz.questions.length) * 100);

  const handleSelectOption = (option: QuizOption) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(updatedAnswers);

    // If last question, calculate result
    if (currentIndex === quiz.questions.length - 1) {
      finishQuiz(updatedAnswers);
    } else {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        window.scrollTo({ top: 120, behavior: "smooth" });
      }, 250);
    }
  };

  const finishQuiz = (finalAnswers: Record<number, QuizOption>) => {
    setIsAnalyzing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      let evaluatedResult: QuizResult | undefined;

      if (quiz.type === "numeric_score") {
        // Sum total scores
        const totalScore = Object.values(finalAnswers).reduce((acc, opt) => acc + (opt.score ?? 0), 0);
        evaluatedResult = quiz.results.find((r) => {
          if (!r.scoreRange) return false;
          return totalScore >= r.scoreRange[0] && totalScore <= r.scoreRange[1];
        }) || quiz.results[0];
      } else {
        // Count archetype occurrences
        const archetypeCounts: Record<string, number> = {};
        Object.values(finalAnswers).forEach((opt) => {
          if (opt.archetypeId) {
            archetypeCounts[opt.archetypeId] = (archetypeCounts[opt.archetypeId] || 0) + 1;
          }
        });

        let highestArchetype = "";
        let maxCount = -1;
        Object.entries(archetypeCounts).forEach(([arch, count]) => {
          if (count > maxCount) {
            maxCount = count;
            highestArchetype = arch;
          }
        });

        evaluatedResult = quiz.results.find((r) => r.archetypeId === highestArchetype) || quiz.results[0];
      }

      setResult(evaluatedResult);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    if (!result) return;
    const shareData = {
      title: `${quiz.title} - nuju.app`,
      text: result.shareSummaryText,
      url: `https://nuju.app/quiz/${quiz.slug}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to clipboard
        copyToClipboard(result.shareSummaryText);
      }
    } else {
      copyToClipboard(result.shareSummaryText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Hasil tes berhasil disalin ke clipboard! Siap dibagikan.");
  };

  const copyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    toast.success("Prompt journaling berhasil disalin!");
  };

  const otherQuizzes = allQuizzes.filter((q) => q.id !== quiz.id);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-amber-200">
      <SEOHead
        title={`${quiz.title} | Nuju Quiz`}
        description={quiz.description}
        canonical={`https://nuju.app/quiz/${quiz.slug}`}
        language={(quiz.language as "id" | "en" | "de" | "ja" | "ko") || "id"}
        image={result ? result.mascotImage : quiz.mascotImage}
        imageAlt={`${quiz.title} - Nuju Self-Reflection Lab`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: quiz.title,
          description: quiz.description,
          about: {
            "@type": "Thing",
            name: quiz.category,
          },
          provider: {
            "@type": "Organization",
            name: "Nuju",
            url: "https://nuju.app",
          },
          typicalAgeRange: "16-65",
          inLanguage: quiz.language || "id",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/quiz" className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition">
            <ArrowLeft className="h-4 w-4" />
            <span>Semua Kuis</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <img src={juMain} alt="Ju mascot" className="h-7 w-7 rounded-full object-cover" />
            <span className="font-bold text-sm text-neutral-900">nuju<span className="text-amber-600">.quiz</span></span>
          </Link>

          <Link to="/app" className="rounded-full bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 transition">
            Buka App
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ========================================================= */}
        {/* STATE 1: LOADING ANALYZING */}
        {/* ========================================================= */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <img
                src={juMain}
                alt="Ju analyzing"
                className="h-24 w-24 rounded-full border-4 border-amber-200 object-cover animate-bounce shadow-md"
              />
              <Sparkles className="absolute -top-2 -right-2 h-7 w-7 text-amber-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Ju Sedang Membaca Ritme Emosimu...</h2>
            <p className="mt-2 text-sm text-neutral-500 max-w-md">
              Menghubungkan pola jawabanmu dengan kerangka sains kognitif dan menyiapkan panduan refleksi terbaik.
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* STATE 2: RESULT VIEW */}
        {/* ========================================================= */}
        {!isAnalyzing && result && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Result Top Card */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/70 px-3.5 py-1 text-xs font-bold text-amber-900 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Hasil Diagnosis Refleksimu</span>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={result.mascotImage}
                    alt="Mascot reaction"
                    className="h-28 w-28 rounded-3xl object-cover border-2 border-amber-200 bg-amber-50/50 p-1.5 shadow-md"
                  />
                  <span className="absolute -bottom-2 -right-2 rounded-full bg-neutral-900 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                    {result.badge}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {result.title}
              </h1>

              {result.percentageDisplay && (
                <div className="mt-2 inline-block font-mono text-sm font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                  {result.percentageDisplay}
                </div>
              )}

              <p className="mt-4 text-base sm:text-lg font-medium text-neutral-700 italic max-w-xl mx-auto">
                "{result.tagline}"
              </p>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed text-left max-w-xl mx-auto bg-neutral-50/80 p-5 rounded-2xl border border-neutral-200/70">
                {result.description}
              </p>

              {/* Share & Retake CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:from-amber-700 hover:to-amber-800 active:scale-95 transition"
                >
                  <Download className="h-4 w-4" />
                  <span>Simpan Gambar Hasil (HD)</span>
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/80 px-6 py-3.5 text-sm font-semibold text-amber-900 shadow-xs hover:bg-amber-100/80 active:scale-95 transition"
                >
                  <Share2 className="h-4 w-4 text-amber-700" />
                  <span>Bagikan Link Hasil</span>
                </button>

                <button
                  onClick={handleRetake}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-95 transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Ulangi Tes</span>
                </button>
              </div>

              {/* Story / Status Card Quick Teaser */}
              <div
                onClick={() => setIsShareModalOpen(true)}
                className="mt-6 mx-auto max-w-md cursor-pointer rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/80 to-orange-50/50 p-4 transition hover:border-amber-400 hover:shadow-xs flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Kartu Hasil Siap Instagram &amp; WA Story
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Klik untuk preview &amp; download kartu 4:5 resolusi tinggi (1080×1350)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-700 whitespace-nowrap">
                  Buka →
                </span>
              </div>
            </div>

            {/* In-Feed Google AdSense Banner */}
            <div className="my-6">
              <AdSenseBanner format="auto" />
            </div>

            {/* Deep Insight & Actionable Steps */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-bold text-neutral-900">Wawasan Sains & Psikologi Emosi</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100">
                  {result.psychologicalInsight}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-neutral-900">3 Langkah Pemulihan Malam Ini</h3>
                </div>
                <div className="space-y-2.5">
                  {result.actionableSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-neutral-700 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/60">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Journaling Prompt */}
              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    <h3 className="text-base font-bold text-neutral-900">Prompt Curhat Nuju Malam Ini</h3>
                  </div>
                  <button
                    onClick={() => copyPrompt(result.recommendedPrompt)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin Prompt</span>
                  </button>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 font-mono text-xs sm:text-sm text-neutral-800 leading-relaxed">
                  "{result.recommendedPrompt}"
                </div>
                <div className="mt-3.5 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/app?screen=journal&prompt=${encodeURIComponent(result.recommendedPrompt)}&mood=${result.mascotMood}&fromQuiz=${quiz.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-amber-700 active:scale-95 transition"
                  >
                    <Sparkles className="h-4 w-4 text-amber-200" />
                    <span>Curhatkan Prompt Ini ke Ju (Mulai Gratis) →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Email Lead Magnet: Save Diagnostic & 7-Day Recovery Guide */}
            <QuizLeadCapture quiz={quiz} result={result} className="my-8" />

            {/* Direct App Conversion Box */}
            <div className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-10 relative overflow-hidden shadow-md text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
              <img src={juMain} alt="Ju" className="h-20 w-20 rounded-full border-2 border-white/20 shrink-0" />
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Pulihkan Bateraimu Bersama Ju di Nuju
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Jangan simpan beban ini sendirian. Buka aplikasi Nuju, rekam suaramu selama 30 detik sebelum tidur, dan rasakan ketenangan tanpa rasa cemas.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <AppStoreCta label="Unduh Nuju (Gratis)" />
                  <Link
                    to={`/app?screen=journal&prompt=${encodeURIComponent(result.recommendedPrompt)}&mood=${result.mascotMood}&fromQuiz=${quiz.slug}`}
                    className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition flex items-center gap-2"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Buka Jurnal Web (Prompt Terisi)</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Explore Other Quizzes */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-bold text-neutral-900">Coba Kuis Refleksi Lainnya:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherQuizzes.slice(0, 3).map((oq) => (
                  <Link
                    key={oq.id}
                    to={`/quiz/${oq.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xs hover:border-neutral-300 hover:shadow-xs transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img src={oq.mascotImage} alt={oq.shortTitle} className="h-10 w-10 rounded-xl object-cover bg-amber-50 p-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-700 transition">
                          {oq.shortTitle}
                        </h4>
                        <span className="text-[11px] text-neutral-400">{oq.estimatedTime}</span>
                      </div>
                    </div>
                    <span className="text-xs text-amber-700 font-semibold flex items-center justify-end gap-1 mt-2">
                      Mulai <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Google AdSense Banner on Result View */}
            <div className="my-8">
              <AdSenseBanner format="auto" />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STATE 3: QUESTION RUNNER */}
        {/* ========================================================= */}
        {!isAnalyzing && !result && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Quiz Info & Progress */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
                <span>{quiz.shortTitle}</span>
                <span>Pertanyaan {currentIndex + 1} dari {quiz.questions.length} ({progressPercent}%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-200/80 overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs">
              <span className="inline-block rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-xs font-bold mb-4">
                Pertanyaan #{currentIndex + 1}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
                {currentQuestion.prompt}
              </h2>

              {currentQuestion.subprompt && (
                <p className="mt-2 text-xs sm:text-sm text-neutral-500">
                  {currentQuestion.subprompt}
                </p>
              )}

              {/* Options */}
              <div className="mt-8 space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id]?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-150 flex items-start gap-4 ${
                        isSelected
                          ? "border-amber-600 bg-amber-50/70 shadow-xs ring-1 ring-amber-600"
                          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/70"
                      }`}
                    >
                      {opt.icon && (
                        <span className="text-2xl shrink-0 mt-0.5">{opt.icon}</span>
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-sm sm:text-base text-neutral-900">
                          {opt.label}
                        </div>
                        {opt.sublabel && (
                          <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
                            {opt.sublabel}
                          </div>
                        )}
                      </div>
                      <div className={`mt-1 h-5 w-5 shrink-0 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-amber-600 bg-amber-600 text-white" : "border-neutral-300"
                      }`}>
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Back Button */}
            {currentIndex > 0 && (
              <div className="flex items-center justify-start">
                <button
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Kembali ke Pertanyaan Sebelumnya</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* FAQs Accordion */}
        <section className="mt-16 border-t border-neutral-200 pt-10">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-bold text-neutral-900">Pertanyaan yang Sering Diajukan</h3>
          </div>
          <div className="space-y-4">
            {quiz.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
                <h4 className="font-semibold text-sm text-neutral-900 mb-2">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Viral Share Card Preview & Download Modal */}
        {quiz && result && (
          <QuizShareCardModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            quiz={quiz}
            result={result}
          />
        )}
      </main>
    </div>
  );
};

export default QuizRunner;

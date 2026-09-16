import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  Copy,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Shield,
  HelpCircle,
  AlertCircle,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  LOVE_LANGUAGE_QUESTIONS,
  LOVE_LANGUAGE_PROFILES,
  calculateLoveLanguageResult,
  LoveLang,
  LoveLanguageType,
} from "@/data/love-languages";
import LoveLanguageShareCardModal from "@/components/LoveLanguageShareCardModal";
import { toast } from "sonner";

interface LoveLanguagesTestProps {
  defaultLang?: LoveLang;
}

const LoveLanguagesTest: React.FC<LoveLanguagesTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<LoveLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, LoveLanguageType>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = LOVE_LANGUAGE_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / LOVE_LANGUAGE_QUESTIONS.length) * 100);

  const handleSelectOption = (chosenLang: LoveLanguageType) => {
    const updated = { ...answers, [currentQ.id]: chosenLang };
    setAnswers(updated);

    if (currentIndex < LOVE_LANGUAGE_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const result = isCompleted ? calculateLoveLanguageResult(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const title = (result.primary.title as any)[lang] || result.primary.title.en;
    const secondaryTitle = (result.secondary.title as any)[lang] || result.secondary.title.en;
    const text =
      lang === "id"
        ? `Hasil Tes Bahasa Cinta (Love Languages):
Bahasa Utama: ${title} (${result.percentages[result.primary.id]}%)
Bahasa Kedua: ${secondaryTitle} (${result.percentages[result.secondary.id]}%)
Cari tahu bahasa cintamu gratis di: ${window.location.origin}/quiz/love-languages`
        : `My Love Language Profile:
Primary: ${title} (${result.percentages[result.primary.id]}%)
Secondary: ${secondaryTitle} (${result.percentages[result.secondary.id]}%)
Take the free quiz at: ${window.location.origin}/quiz/love-languages`;

    navigator.clipboard.writeText(text);
    toast.success(lang === "id" ? "Hasil disalin ke papan klip!" : "Results copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Bahasa Cinta Online Gratis: Temukan 5 Love Languages Kamu"
            : lang === "de"
            ? "Kostenloser 5 Sprachen der Liebe Test: Entdecken Sie Ihr Beziehungsprofil"
            : lang === "fr"
            ? "Test des 5 Langages de l'Amour Gratuit en Ligne : Profil Relationnel"
            : lang === "es"
            ? "Test de los 5 Lenguajes del Amor Gratis Online: Tu Perfil de Pareja"
            : "Free 5 Love Languages Quiz: Discover Your Relational Needs Profile"
        }
        description={
          lang === "id"
            ? "Ikuti tes 5 love languages online gratis dan privat. Ketahui bahasa cintamu (Words, Time, Acts, Gifts, Touch) serta panduan cara mencintaimu secara tepat."
            : "Discover your primary and secondary love languages with our evidence-based relationship screener. Instant percentage breakdown and communication guide."
        }
        canonical="https://nuju.app/quiz/love-languages"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name:
              lang === "id"
                ? "Tes 5 Bahasa Cinta (5 Love Languages Quiz)"
                : "5 Love Languages & Relational Needs Profiler",
            description:
              "Standardized relationship assessment measuring Words of Affirmation, Quality Time, Acts of Service, Receiving Gifts, and Physical Touch.",
            provider: {
              "@type": "Organization",
              name: "Nuju",
              url: "https://nuju.app",
            },
            inLanguage: lang,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What are the 5 love languages?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The five love languages identified by Dr. Gary Chapman are: 1) Words of Affirmation (verbal praise and encouragement), 2) Quality Time (undivided presence), 3) Receiving Gifts (thoughtful visual tokens), 4) Acts of Service (practical helpfulness), and 5) Physical Touch (somatic warmth and hugs).",
                },
              },
              {
                "@type": "Question",
                name: "Can someone have more than one love language?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Most people have a distinct primary love language and a strong secondary language, with the remaining three contributing to their overall emotional fulfillment.",
                },
              },
            ],
          },
        ]}
      />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "id" ? "Semua Tes & Game" : "All Tests & Tools"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-slate-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as LoveLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l === "en"
                    ? "🇬🇧 EN"
                    : l === "id"
                    ? "🇮🇩 ID"
                    : l === "de"
                    ? "🇩🇪 DE"
                    : l === "fr"
                    ? "🇫🇷 FR"
                    : "🇪🇸 ES"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 md:py-12">
        {/* Top AdSense Banner */}
        <div className="mb-6">
          <AdSenseBanner slot="love-lang-top" format="horizontal" />
        </div>

        {!isCompleted ? (
          /* QUESTION FLOW */
          <div>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-3">
                <Heart className="w-3.5 h-3.5" />
                <span>
                  {lang === "id" ? "Profil Hubungan & Bahasa Cinta" : "5 Love Languages Screener"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                {lang === "id" ? "Temukan Bahasa Cintamu" : "Discover Your Primary Love Language"}
              </h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
                {lang === "id"
                  ? "Pahami cara kamu memberi dan menerima kasih sayang agar hubunganmu lebih harmonis dan minim salah paham."
                  : "Uncover how your nervous system receives and communicates affection to build deeper relational security."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>
                  {lang === "id"
                    ? `Pertanyaan ${currentIndex + 1} dari ${LOVE_LANGUAGE_QUESTIONS.length}`
                    : `Scenario ${currentIndex + 1} of ${LOVE_LANGUAGE_QUESTIONS.length}`}
                </span>
                <span className="text-rose-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative backdrop-blur-sm"
              >
                <h2 className="text-lg md:text-xl font-semibold text-slate-100 mb-6 leading-relaxed">
                  {currentQ.scenario[lang]}
                </h2>

                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === opt.language;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt.language)}
                        className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        <span className="pr-4">{opt.text[lang]}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                            isSelected
                              ? "border-rose-500 bg-rose-500 text-white"
                              : "border-slate-600 group-hover:border-slate-400"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {currentIndex > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-start">
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Kembali ke sebelumnya" : "Previous scenario"}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <AdSenseBanner slot="love-lang-mid" format="horizontal" />
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Primary Profile Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                    <span>{result.primary.emoji}</span>
                    <span>Primary Love Language</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-rose-500/20"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Bagikan Kartu Story" : "Share Story Card"}</span>
                    </button>
                    <button
                      onClick={copyResults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Salin Hasil" : "Copy Result"}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Ulangi" : "Retake"}</span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
                  {result.primary.title[lang]}
                </h1>
                <p className="text-sm md:text-base text-rose-300/90 font-medium mb-4 italic">
                  "{result.primary.tagline[lang]}"
                </p>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                  {result.primary.description[lang]}
                </p>

                {/* 5 Languages Progress Bar Distribution */}
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === "id" ? "Distribusi 5 Bahasa Cinta Kamu:" : "Your Full 5 Love Languages Breakdown:"}
                  </div>

                  {(
                    [
                      { id: "words", color: "from-rose-500 to-red-500" },
                      { id: "time", color: "from-pink-500 to-fuchsia-500" },
                      { id: "acts", color: "from-purple-500 to-indigo-500" },
                      { id: "gifts", color: "from-amber-500 to-orange-500" },
                      { id: "touch", color: "from-cyan-500 to-teal-500" },
                    ] as const
                  ).map((item) => {
                    const prof = LOVE_LANGUAGE_PROFILES[item.id];
                    const pct = result.percentages[item.id];
                    return (
                      <div key={item.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-slate-200">
                            <span>{prof.emoji}</span>
                            <span>{prof.title[lang]}</span>
                          </span>
                          <span className="text-rose-400 font-bold">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.max(pct, 3)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Secondary Profile Badge */}
                <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {lang === "id" ? "Bahasa Cinta Kedua Kamu:" : "Your Secondary Love Language:"}
                    </div>
                    <div className="text-sm md:text-base font-bold text-white flex items-center gap-2 mt-0.5">
                      <span>{result.secondary.emoji}</span>
                      <span>{result.secondary.title[lang]}</span>
                      <span className="text-xs text-rose-400 font-normal">
                        ({result.percentages[result.secondary.id]}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* How to Love Me Checklist */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>{lang === "id" ? "Panduan Menyayangiku (How to Love Me):" : "How to Nurture & Love Me:"}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {result.primary.howToLoveMe[lang].map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conflict Trigger */}
                <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs md:text-sm text-rose-200/90 leading-relaxed">
                  <span className="font-bold text-rose-300">
                    {lang === "id" ? "Pemicu Sakit Hati Terbesarmu: " : "Core Relational Trigger: "}
                  </span>
                  <span>{result.primary.conflictTrigger[lang]}</span>
                </div>

                {/* Direct CTA */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {lang === "id" ? "Eksplorasi Langkah Selanjutnya:" : "Explore Next Tool:"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === "id"
                        ? "Ketahui gaya kelekatanmu atau latih pernapasan untuk menenangkan pikiran."
                        : "Discover your attachment style or restore calm with our sound sanctuary."}
                    </p>
                  </div>
                  <Link
                    to="/quiz/attachment-style"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm hover:from-rose-400 hover:to-pink-500 transition-all shadow-lg text-center flex items-center justify-center gap-2"
                  >
                    <span>{lang === "id" ? "Cek Attachment Style" : "Attachment Style Test"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* AdSense Mid Banner */}
              <AdSenseBanner slot="love-lang-result" format="horizontal" />

              {/* Cross Promo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/quiz/inner-child"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Sparkles className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Inner Child Wound</h4>
                  <p className="text-xs text-slate-400">
                    Uncover the childhood wound shaping your adult needs.
                  </p>
                </Link>

                <Link
                  to="/quiz/burnout"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <AlertCircle className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Workplace Burnout</h4>
                  <p className="text-xs text-slate-400">
                    Assess emotional exhaustion and cognitive burnout.
                  </p>
                </Link>

                <Link
                  to="/tools/breathwork"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Heart className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Physiological Sigh</h4>
                  <p className="text-xs text-slate-400">
                    Stanford 2-breath reset to rapidly calm anxiety.
                  </p>
                </Link>
              </div>

              <AppStoreCta />

              <LoveLanguageShareCardModal
                isOpen={isShareCardOpen}
                onClose={() => setIsShareCardOpen(false)}
                result={result}
                lang={lang}
              />
            </motion.div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Relational psychology & healthy love.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy" className="hover:text-slate-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-200">
              Terms
            </Link>
            <Link to="/medical-disclaimer" className="hover:text-slate-200">
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoveLanguagesTest;

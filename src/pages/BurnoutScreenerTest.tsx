import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Flame,
  BatteryCharging,
  ShieldCheck,
  RotateCcw,
  Copy,
  ChevronRight,
  Brain,
  AlertCircle,
  Activity,
  CheckCircle2,
  Briefcase,
  Headphones,
  Share2,
} from "lucide-react";
import BurnoutShareCardModal from "@/components/BurnoutShareCardModal";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  BURNOUT_QUESTIONS,
  BURNOUT_OPTIONS,
  calculateBurnoutScore,
  BurnoutLang,
} from "@/data/burnout-screener";
import { toast } from "sonner";

interface BurnoutScreenerTestProps {
  defaultLang?: BurnoutLang;
}

const BurnoutScreenerTest: React.FC<BurnoutScreenerTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<BurnoutLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = BURNOUT_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / BURNOUT_QUESTIONS.length) * 100);

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < BURNOUT_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const result = isCompleted ? calculateBurnoutScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🔥 Workplace Burnout Screener Result:\nStatus: ${result.title[lang]}\nOverall Burnout Score: ${result.totalScore}/${result.maxScore} (${result.percentage}%)\nExhaustion: ${result.exhaustionScore}/16 | Cynicism: ${result.cynicismScore}/16 | Inefficacy: ${result.inefficacyScore}/16\nTake the free test here: ${window.location.origin}/quiz/burnout`;
    navigator.clipboard.writeText(text);
    toast.success(
      lang === "id"
        ? "Hasil tes burnout berhasil disalin!"
        : "Burnout result copied to clipboard!"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Burnout Kerja Online Gratis: Cek Tingkat Kelelahan Mental (Maslach MBI)"
            : lang === "de"
            ? "Burnout Test Online Kostenlos: Erschöpfung & Belastungsgrenze messen (MBI)"
            : lang === "fr"
            ? "Test de Burnout Professionnel Gratuit en Ligne (Modèle Maslach MBI)"
            : lang === "es"
            ? "Test de Burnout Laboral Online Gratis: Medir Agotamiento y Estrés (MBI)"
            : "Free Workplace Burnout Test: Maslach Burnout Inventory (MBI) Screener"
        }
        description={
          lang === "id"
            ? "Skrining burnout profesional mandiri berdasarkan model Maslach Burnout Inventory. Evaluasi kelelahan emosional, sikap sinis, dan penurunan efikasi kerja."
            : "Free evidence-based workplace burnout assessment adapted from the Maslach Burnout Inventory. Instant evaluation of emotional exhaustion and cynicism."
        }
        canonical="https://nuju.app/quiz/burnout"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name:
              lang === "id"
                ? "Tes Burnout Kerja Maslach (MBI Screener)"
                : "Maslach Workplace Burnout Screener (MBI)",
            description:
              "Standardized self-assessment measuring emotional exhaustion, depersonalization/cynicism, and reduced personal accomplishment.",
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
                name: "What are the 3 dimensions of burnout?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "According to the Maslach Burnout Inventory (MBI), burnout consists of three core dimensions: 1) Emotional Exhaustion (chronic depletion of emotional resources), 2) Depersonalization/Cynicism (negative or detached attitude toward work and colleagues), and 3) Reduced Personal Accomplishment / Inefficacy (feeling incompetent or unproductive).",
                },
              },
              {
                "@type": "Question",
                name: "How can I recover from severe occupational burnout?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Effective burnout recovery requires biological nervous system down-regulation (vagus nerve activation, sleep prioritization), assertive boundary renegotiation at work, daily mental detox (digital curfew), and cognitive emotional debriefing via daily journaling.",
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
              {(["en", "id", "de", "fr", "es"] as BurnoutLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-orange-500 text-slate-950 shadow-sm font-black"
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

      {/* Top Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <AdSenseBanner slot="burnout-top" format="horizontal" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        {!isCompleted ? (
          <div>
            {/* Title Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Maslach Burnout Inventory (MBI) Framework</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                {lang === "id"
                  ? "Tes Tingkat Burnout & Kelelahan Kerja"
                  : lang === "de"
                  ? "Burnout & Erschöpfungs-Selbsttest"
                  : lang === "fr"
                  ? "Test d'Épuisement Professionnel (Burnout)"
                  : lang === "es"
                  ? "Test de Burnout y Fatiga Laboral"
                  : "Workplace Burnout & Fatigue Screener"}
              </h1>
              <p className="text-sm md:text-base text-slate-400">
                {lang === "id"
                  ? "Ukur tingkat kelelahan emosional, sikap sinis (depersonalisasi), dan penurunan efikasi kerja secara objektif dalam 2 menit."
                  : "Assess emotional exhaustion, cynicism, and reduced professional efficacy in 2 minutes."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>
                  {lang === "id"
                    ? `Pertanyaan ${currentIndex + 1} dari ${BURNOUT_QUESTIONS.length}`
                    : `Question ${currentIndex + 1} of ${BURNOUT_QUESTIONS.length}`}
                </span>
                <span className="text-orange-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 rounded-full"
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
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-orange-500/10 border-orange-500/30 text-orange-300">
                    Dimension: {currentQ.dimension}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-semibold text-slate-100 mb-6 leading-relaxed">
                  {currentQ.text[lang]}
                </h2>

                <div className="space-y-3">
                  {BURNOUT_OPTIONS.map((opt) => {
                    const isSelected = answers[currentQ.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-orange-500/20 border-orange-500 text-orange-200 shadow-md shadow-orange-500/10"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        <span>{opt.label[lang]}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-orange-500 bg-orange-500 text-slate-950 font-bold"
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
                      <span>{lang === "id" ? "Kembali ke sebelumnya" : "Previous question"}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <AdSenseBanner slot="burnout-mid" format="horizontal" />
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
              {/* Profile Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                    <Flame className="w-4 h-4" />
                    <span>Maslach Burnout Evaluation</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-md shadow-orange-500/20"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Bagikan Kartu Story" : "Share Story Card"}</span>
                    </button>
                    <button
                      onClick={copyResults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Salin Ringkasan" : "Copy Summary"}</span>
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
                  {result.title[lang]}
                </h1>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                  {result.description[lang]}
                </p>

                {/* Score breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Emotional Exhaustion</span>
                      <span className="text-white font-bold">{result.exhaustionScore} / 16</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${(result.exhaustionScore / 16) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Cynicism & Detachment</span>
                      <span className="text-white font-bold">{result.cynicismScore} / 16</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${(result.cynicismScore / 16) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Reduced Efficacy</span>
                      <span className="text-white font-bold">{result.inefficacyScore} / 16</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(result.inefficacyScore / 16) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Strategies */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>
                    {lang === "id"
                      ? "Protokol Pemulihan Burnout Mandiri"
                      : "Evidence-Based Burnout Recovery Plan"}
                  </span>
                </h3>

                <ul className="space-y-3">
                  {result.recoveryStrategy[lang].map((strat: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-slate-300 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60"
                    >
                      <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {lang === "id" ? "Tenangkan Sistem Sarafmu:" : "Recommended Next Tool:"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === "id"
                        ? "Dengarkan Brown Noise di Sound Sanctuary untuk meredakan kelelahan kognitif."
                        : "Listen to pure synthesized Brown Noise to decompress your auditory cortex."}
                    </p>
                  </div>
                  <Link
                    to="/soundscapes"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg text-center flex items-center justify-center gap-2"
                  >
                    <span>{lang === "id" ? "Buka Sound Sanctuary" : "Open Sound Sanctuary"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* AdSense Mid Banner */}
              <AdSenseBanner slot="burnout-result" format="horizontal" />

              <AppStoreCta />

              <BurnoutShareCardModal
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
          <p>© {new Date().getFullYear()} Ju Journal. Workplace wellbeing.</p>
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

export default BurnoutScreenerTest;

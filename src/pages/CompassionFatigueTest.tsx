import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Copy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Activity,
  BatteryCharging,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  COMPASSION_FATIGUE_QUESTIONS,
  calculateCompassionFatigueScore,
  CompassionFatigueLang,
} from "@/data/compassion-fatigue";
import { CompassionFatigueShareCardModal } from "@/components/CompassionFatigueShareCardModal";
import { toast } from "sonner";

interface CompassionFatigueTestProps {
  defaultLang?: CompassionFatigueLang;
}

const CompassionFatigueTest: React.FC<CompassionFatigueTestProps> = ({
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState<CompassionFatigueLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = COMPASSION_FATIGUE_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / COMPASSION_FATIGUE_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < COMPASSION_FATIGUE_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateCompassionFatigueScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My Compassion Fatigue & Empathy Burnout Score: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% drain load - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your empathic battery free: https://nuju.app/quiz/compassion-fatigue`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0E0A16] text-neutral-100 selection:bg-purple-500/30">
      <SEOHead
        title="Compassion Fatigue Test: Free Empathic Burnout & Emotional Exhaustion Screener"
        description="Drained by everyone else's pain, emotionally numb, or irritable towards those you love? Take our free 12-item clinical screener based on Charles Figley's Compassion Fatigue Model and Christina Maslach's Burnout Inventory."
        canonical="https://nuju.app/quiz/compassion-fatigue"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#0E0A16]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Psychology Diagnostics</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-xs">
            {(["en", "id", "de", "fr", "es"] as CompassionFatigueLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md font-bold transition uppercase ${
                  lang === l
                    ? "bg-purple-500 text-neutral-950 shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {!isCompleted ? (
          <div>
            {/* Hero / Intro Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold text-purple-400 mb-4">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>Charles Figley & Christina Maslach Empathy Metric</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                {lang === "id"
                  ? "Tes Kelelahan Empati & Kejenuhan Welas Asih"
                  : lang === "de"
                  ? "Empathie-Erschöpfung & Compassion Fatigue Test"
                  : lang === "fr"
                  ? "Test de Fatigue de Compassion & Épuisement Empathique"
                  : lang === "es"
                  ? "Test de Fatiga por Compasión y Desgaste Empático"
                  : "Emotional Exhaustion & Compassion Fatigue Screener"}
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                {lang === "id"
                  ? "Apakah mendengarkan keluhan orang lain membuatmu muak, hampa, atau merasa dingin tanpa perasaan? Evaluasi penipisan empati, sinisme defensif, dan trauma vikarius."
                  : lang === "de"
                  ? "Fühlen Sie sich innerlich leer, abgestumpft oder zynisch gegenüber den Problemen anderer Menschen? Messen Sie sekundäre Traumatisierung und emotionale Überlastung."
                  : lang === "fr"
                  ? "Êtes-vous à bout de souffle émotionnellement ou devenu insensible à la détresse de vos proches ? Évaluez l'usure de compassion et la protection par le cynisme."
                  : lang === "es"
                  ? "¿Te sientes saturado por el sufrimiento ajeno, irritable o emocionalmente congelado? Evalúa el agotamiento por empatía y la carga vicaria en 12 reactivos."
                  : "Measure empathic depletion, secondary traumatic burden, and callous detachment through 12 validated clinical psychometric items."}
              </p>
            </div>

            {/* Real Data Callout */}
            <div className="mb-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 text-xs text-purple-200/90 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-purple-400 shrink-0" />
              <span>
                <strong>Nuju Data Lab (2026):</strong> Over 68% of users in high emotional support roles report sudden severe numbness, irritability towards close friends, and unrefreshing sleep after 12+ months of boundaryless empathy.
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-medium text-neutral-400 mb-2">
                <span>
                  Question {currentIndex + 1} of {COMPASSION_FATIGUE_QUESTIONS.length}
                </span>
                <span>{progressPercent}% completed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl"
              >
                <div className="mb-2 inline-block text-xs font-bold uppercase tracking-wider text-purple-400/90">
                  {currentQ.subscale === "empathic_depletion" && "Subscale: Empathic Depletion & Resonance Drain"}
                  {currentQ.subscale === "cynicism_callousness" && "Subscale: Cynicism & Protective Callousness"}
                  {currentQ.subscale === "vicarious_trauma" && "Subscale: Vicarious Trauma & Secondhand Pain"}
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 leading-snug">
                  {currentQ.prompt[lang] || currentQ.prompt.en}
                </h2>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === opt.score;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt.score)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3.5 group ${
                          isSelected
                            ? "border-purple-500 bg-purple-500/10 text-white"
                            : "border-neutral-800 bg-neutral-950/50 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? "border-purple-400 bg-purple-500 text-neutral-950"
                              : "border-neutral-700 group-hover:border-neutral-500"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-neutral-950" />}
                        </div>
                        <span className="text-sm sm:text-base leading-relaxed">
                          {opt.label[lang] || opt.label.en}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom navigation */}
                <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition ${
                      currentIndex === 0
                        ? "text-neutral-600 cursor-not-allowed"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Previous</span>
                  </button>
                  <span className="text-xs text-neutral-500">
                    Auto-advances upon selection
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
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
              {/* Header Result Card */}
              <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-[#0E0A16] p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-400 mb-4">
                  <BatteryCharging className="h-3.5 w-3.5" />
                  <span>{result.profile.badge[lang] || result.profile.badge.en}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                  {result.profile.title[lang] || result.profile.title.en}
                </h1>
                <p className="text-sm sm:text-lg text-purple-300 font-medium mb-6">
                  {result.profile.tagline[lang] || result.profile.tagline.en}
                </p>

                {/* Score Gauge */}
                <div className="mx-auto my-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-purple-500/40 bg-neutral-950/80 shadow-inner">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-white block">
                      {result.percentage}%
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      Compassion Drain
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed mb-6">
                  {result.profile.description[lang] || result.profile.description.en}
                </p>

                {/* Subscale Meters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto mb-8">
                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">
                      Empathic Depletion
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.empathic_depletion.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-purple-400"
                        style={{ width: `${result.subscales.empathic_depletion.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
                      Cynicism Shield
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.cynicism_callousness.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-indigo-400"
                        style={{ width: `${result.subscales.cynicism_callousness.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-pink-400 mb-1">
                      Vicarious Burden
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.vicarious_trauma.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-pink-400"
                        style={{ width: `${result.subscales.vicarious_trauma.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* CTAs: Share Story Card & Retake */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 active:scale-[0.98] text-neutral-950 font-bold text-sm shadow-lg shadow-purple-500/20 transition cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Download 1080x1350 Story Card</span>
                  </button>

                  <button
                    onClick={copyResults}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] text-white font-semibold text-sm transition"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Summary</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] text-neutral-300 font-medium text-sm transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Retake Screener</span>
                  </button>
                </div>
              </div>

              {/* Psychology Deep Dive Card */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <Activity className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Charles Figley 'The Cost of Caring' & Somatic Burnout
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {result.profile.psychologyInsight[lang] || result.profile.psychologyInsight.en}
                </p>
              </div>

              {/* Action Protocol Steps */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <HeartHandshake className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Somatic Reset & Compassion Boundary Protocol
                  </h2>
                </div>
                <div className="space-y-3">
                  {(result.profile.actionProtocols[lang] || result.profile.actionProtocols.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl bg-neutral-950/50 border border-neutral-800/80 p-4"
                      >
                        <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                          {step}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Daily Affirmation Card */}
              <div className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6 sm:p-8 text-center space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-purple-400 block">
                  Daily Boundary Anchor
                </span>
                <p className="text-lg sm:text-xl font-serif italic text-purple-200 max-w-xl mx-auto">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </p>
              </div>

              {/* Middle AdSense Banner */}
              <AdSenseBanner slot="compassion-fatigue-mid" className="my-4" />

              {/* App Store CTA */}
              <AppStoreCta />

              {/* Related Diagnostics & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                <Link
                  to="/quiz/emotional-numbness"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 text-neutral-200 text-sm font-semibold transition"
                >
                  <span>Explore Emotional Numbness</span>
                  <ArrowRight className="h-4 w-4 text-purple-400" />
                </Link>
                <Link
                  to="/quiz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
                >
                  <span>View All 50+ Diagnostics</span>
                </Link>
              </div>
            </motion.div>
          )
        )}
      </main>

      {/* Share Card Modal */}
      {result && (
        <CompassionFatigueShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default CompassionFatigueTest;

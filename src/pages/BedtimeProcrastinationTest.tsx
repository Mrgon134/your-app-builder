import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Copy,
  RotateCcw,
  ChevronRight,
  Moon,
  Compass,
  ArrowRight,
  CheckCircle2,
  Award,
  Zap,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  BEDTIME_PROCRASTINATION_QUESTIONS,
  calculateBedtimeProcrastinationScore,
  BedtimeProcrastinationLang,
} from "@/data/bedtime-procrastination";
import { BedtimeProcrastinationShareCardModal } from "@/components/BedtimeProcrastinationShareCardModal";
import { toast } from "sonner";

interface BedtimeProcrastinationTestProps {
  defaultLang?: BedtimeProcrastinationLang;
}

const BedtimeProcrastinationTest: React.FC<BedtimeProcrastinationTestProps> = ({
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState<BedtimeProcrastinationLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = BEDTIME_PROCRASTINATION_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / BEDTIME_PROCRASTINATION_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < BEDTIME_PROCRASTINATION_QUESTIONS.length - 1) {
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

  const result = isCompleted
    ? calculateBedtimeProcrastinationScore(answers)
    : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My Revenge Bedtime Procrastination Profile: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% sleep procrastination load - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Assess your midnight revenge cycle free: https://nuju.app/quiz/revenge-bedtime-procrastination`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0C0817] text-neutral-100 selection:bg-amber-500/30">
      <SEOHead
        title="Revenge Bedtime Procrastination Test: Free 12-Item Sleep Dread Screener"
        description="Why can't you put your phone down at night even when exhausted? Take our free 12-item clinical screener based on the Kroese Bedtime Procrastination Scale (BPS)."
        canonical="https://nuju.app/quiz/revenge-bedtime-procrastination"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#0C0817]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Psychology Diagnostics</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-xs">
            {(["en", "id", "de", "fr", "es"] as BedtimeProcrastinationLang[]).map(
              (l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-md font-bold transition uppercase ${
                    lang === l
                      ? "bg-amber-500 text-neutral-950 shadow-xs"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                  }`}
                >
                  {l}
                </button>
              )
            )}
          </div>
        </div>
      </header>

      {/* Top Google AdSense Banner */}
      <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
        <AdSenseBanner slot="bedtime-procrastination-top" className="my-2" />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {!isCompleted ? (
          /* ========================================================================= */
          /* QUESTION WIZARD STEP                                                      */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Header / Intro Card */}
            <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-neutral-900/40 to-neutral-950 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-300">
                  <Moon className="h-3.5 w-3.5" />
                  KROESE BPS & AUTONOMY MODEL
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {currentIndex + 1} / {BEDTIME_PROCRASTINATION_QUESTIONS.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                Revenge Bedtime Procrastination Screener
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Discover why your brain steals sleep from midnight hours, measures your daytime autonomy deficit, and decodes your evening dopamine scrolling loop.
              </p>

              {/* Progress Bar */}
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Current Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-neutral-800 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Item {currentIndex + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-400/80 uppercase">
                    {currentQ.subscale.replace("_", " ")}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mb-6">
                  {currentQ.prompt[lang] || currentQ.prompt.en}
                </h2>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = answers[currentQ.id] === option.score;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option.score)}
                        className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between group ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/10 text-white shadow-sm"
                            : "border-neutral-800 bg-neutral-950/40 hover:border-amber-500/50 hover:bg-neutral-800/40 text-neutral-300"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium pr-4 leading-relaxed">
                          {option.label[lang] || option.label.en}
                        </span>
                        <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-amber-400 shrink-0 transition" />
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                {currentIndex > 0 && (
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-start">
                    <button
                      onClick={handlePrevious}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Previous Question</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* ========================================================================= */
          /* RESULTS STEP                                                              */
          /* ========================================================================= */
          result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Primary Result Banner */}
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-neutral-900 to-neutral-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 text-xs font-bold text-amber-300 shadow-sm">
                    <Award className="h-3.5 w-3.5" />
                    {result.profile.badge[lang] || result.profile.badge.en}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 block font-medium">Sleep Procrastination Burden</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">{result.percentage}%</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                  {result.profile.title[lang] || result.profile.title.en}
                </h1>

                <p className="text-base sm:text-lg font-medium text-amber-200/90 leading-relaxed mb-6">
                  {result.profile.tagline[lang] || result.profile.tagline.en}
                </p>

                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {result.profile.description[lang] || result.profile.description.en}
                </p>

                {/* Subscales Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-neutral-800">
                  <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <span className="text-xs font-bold text-amber-400 block mb-1 uppercase">Autonomy Deficit</span>
                    <span className="text-2xl font-black text-white">{result.subscales.autonomy_deficit.percentage}%</span>
                    <p className="text-[11px] text-neutral-400 mt-1">Daytime Freedom Hunger</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <span className="text-xs font-bold text-purple-400 block mb-1 uppercase">Dopamine Chase</span>
                    <span className="text-2xl font-black text-white">{result.subscales.dopamine_chasing.percentage}%</span>
                    <p className="text-[11px] text-neutral-400 mt-1">Midnight Screen Trance</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <span className="text-xs font-bold text-rose-400 block mb-1 uppercase">Morning Regret</span>
                    <span className="text-2xl font-black text-white">{result.subscales.morning_regret.percentage}%</span>
                    <p className="text-[11px] text-neutral-400 mt-1">Guilt & Circadian Sleep Debt</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsShareCardOpen(true)}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-purple-600 hover:opacity-95 px-6 py-3.5 text-sm font-bold text-neutral-950 transition shadow-lg shadow-amber-500/20"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Export Instagram Story Card</span>
                </button>
                <button
                  onClick={copyResults}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-800 hover:bg-neutral-700 px-5 py-3.5 text-sm font-semibold text-white border border-neutral-700 transition"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 hover:bg-neutral-800 px-4 py-3.5 text-sm font-semibold text-neutral-400 hover:text-white border border-neutral-800 transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Retake</span>
                </button>
              </div>

              {/* Psychological Mechanism Insight */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
                  <Compass className="h-4 w-4" />
                  <span>BEHAVIORAL NEUROSCIENCE & REVENGE SLEEP CYCLE</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {result.profile.psychologyInsight[lang] || result.profile.psychologyInsight.en}
                </p>
              </div>

              {/* Protocols / Action Steps */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-4">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>CIRCADIAN RESTORATION PROTOCOLS</span>
                </div>
                <div className="space-y-3">
                  {(result.profile.actionProtocols[lang] || result.profile.actionProtocols.en).map(
                    (protocol, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-950/40 border border-neutral-800/80"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                          {i + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-0.5">
                          {protocol}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Daily Affirmation Card */}
              <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent p-6 sm:p-8 text-center">
                <span className="text-xs font-bold text-amber-400/80 uppercase tracking-widest block mb-2">
                  Nocturnal Peace Affirmation
                </span>
                <blockquote className="text-base sm:text-lg font-bold text-white italic max-w-xl mx-auto">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </blockquote>
              </div>

              {/* CTA to Nuju Soundscapes and Private Journal */}
              <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 sm:p-8 text-center space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Break the Midnight Scroll Loop with Ambient Sleep Sounds
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Instead of feeding your brain blinding blue light and endless TikTok feeds, unwind with scientifically-tuned Brown Noise and binaural sleep frequencies.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/tools/soundscapes"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 shadow-md hover:bg-amber-300 transition"
                  >
                    <Moon className="h-4 w-4" />
                    <span>Open Sleep Soundscapes</span>
                  </Link>
                  <Link
                    to="/app"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-200 hover:bg-neutral-700 transition"
                  >
                    <span>Free Private Voice Journal</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* AppStore CTA Component */}
              <AppStoreCta />

              {/* Bottom Google AdSense Banner */}
              <div className="my-6">
                <AdSenseBanner slot="bedtime-procrastination-bottom" className="my-2" />
              </div>
            </motion.div>
          )
        )}
      </main>

      {/* Share Card Modal */}
      {result && (
        <BedtimeProcrastinationShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default BedtimeProcrastinationTest;

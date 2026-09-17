import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Copy,
  RotateCcw,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  SmartphoneNfc,
  Radio,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  FOMO_QUESTIONS,
  calculateFomoScore,
  FomoLang,
} from "@/data/fomo";
import { FomoShareCardModal } from "@/components/FomoShareCardModal";
import { toast } from "sonner";

interface FomoTestProps {
  defaultLang?: FomoLang;
}

const FomoTest: React.FC<FomoTestProps> = ({
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState<FomoLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = FOMO_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / FOMO_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < FOMO_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateFomoScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My FOMO & Dopamine Profile: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% FOMO index - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your digital comparison and JOMO score free: https://nuju.app/quiz/fomo`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0B0411] text-neutral-100 selection:bg-fuchsia-500/30">
      <SEOHead
        title="FOMO & Digital Dopamine Test: Free Social Comparison Screener"
        description="Constantly checking feeds, comparing milestones, or terrified of missing out? Take our free 12-item clinical screener based on Przybylski's FOMO scale and Festinger's Social Comparison Theory."
        canonical="https://nuju.app/quiz/fomo"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#0B0411]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Psychology Diagnostics</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-xs">
            {(["en", "id", "de", "fr", "es"] as FomoLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md font-bold transition uppercase ${
                  lang === l
                    ? "bg-fuchsia-500 text-neutral-950 shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Top Google AdSense Banner */}
      <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
        <AdSenseBanner slot="fomo-top" className="my-2" />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {!isCompleted ? (
          /* ========================================================================= */
          /* QUESTION WIZARD STEP                                                      */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Header / Intro Card */}
            <div className="rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/10 via-neutral-900/40 to-neutral-950 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 px-3 py-1 text-xs font-bold text-fuchsia-300">
                  <Radio className="h-3.5 w-3.5" />
                  PRZYBYLSKI FOMO SCALE & FESTINGER COMPARISON
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {currentIndex + 1} / {FOMO_QUESTIONS.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                FOMO & Digital Dopamine Screener
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Assess whether compulsive feed monitoring, peer milestone anxiety, or phantom notifications are dysregulating your nervous system and stealing real-world peace.
              </p>

              {/* Progress Bar */}
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400"
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
                  <span className="text-[11px] font-semibold text-fuchsia-400/80 uppercase">
                    {currentQ.subscale.replace(/_/g, " ")}
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
                            ? "border-fuchsia-400 bg-fuchsia-500/10 text-white shadow-sm"
                            : "border-neutral-800 bg-neutral-950/40 hover:border-fuchsia-500/50 hover:bg-neutral-800/40 text-neutral-300"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium pr-4 leading-relaxed">
                          {option.label[lang] || option.label.en}
                        </span>
                        <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-fuchsia-400 shrink-0 transition" />
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
              <div className="rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/15 via-neutral-900 to-neutral-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 px-3.5 py-1 text-xs font-bold text-fuchsia-300 shadow-sm">
                    <Award className="h-3.5 w-3.5" />
                    {result.profile.badge[lang] || result.profile.badge.en}
                  </span>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                      FOMO Index
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-fuchsia-400">
                      {result.percentage}%
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                  {result.profile.title[lang] || result.profile.title.en}
                </h1>
                <p className="text-base sm:text-lg italic text-fuchsia-200/90 font-serif mb-6">
                  "{result.profile.tagline[lang] || result.profile.tagline.en}"
                </p>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {result.profile.description[lang] || result.profile.description.en}
                </p>

                {/* Subscales Tri-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-fuchsia-500/20">
                  <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
                    <span className="text-[11px] font-bold text-fuchsia-400 uppercase tracking-wider block mb-1">
                      Peer Comparison
                    </span>
                    <div className="text-2xl font-black text-white mb-1">
                      {result.subscales.social_comparison_anxiety.percentage}%
                    </div>
                    <span className="text-xs text-neutral-400">
                      Upward Comparison & Envy
                    </span>
                  </div>

                  <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                      Monitoring
                    </span>
                    <div className="text-2xl font-black text-white mb-1">
                      {result.subscales.compulsive_monitoring.percentage}%
                    </div>
                    <span className="text-xs text-neutral-400">
                      Notification Reflex & Scans
                    </span>
                  </div>

                  <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                      Presence Deficit
                    </span>
                    <div className="text-2xl font-black text-white mb-1">
                      {result.subscales.presence_deficit.percentage}%
                    </div>
                    <span className="text-xs text-neutral-400">
                      Second-Screening & Grounding Loss
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-rose-600 hover:opacity-90 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-fuchsia-500/20 transition"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Export Story Card</span>
                  </button>

                  <button
                    onClick={copyResults}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-medium text-sm transition"
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
                <div className="flex items-center gap-2 text-fuchsia-400">
                  <SmartphoneNfc className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Leon Festinger Social Comparison & Przybylski Dopamine Loop
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {result.profile.psychologyInsight[lang] || result.profile.psychologyInsight.en}
                </p>
              </div>

              {/* Action Protocol Steps */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-rose-400">
                  <Eye className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Digital Sovereignty & JOMO (Joy of Missing Out) Protocol
                  </h2>
                </div>
                <div className="space-y-3">
                  {(result.profile.actionProtocols[lang] || result.profile.actionProtocols.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl bg-neutral-950/50 border border-neutral-800/80 p-4"
                      >
                        <CheckCircle2 className="h-5 w-5 text-fuchsia-400 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                          {step}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Daily Affirmation Card */}
              <div className="rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-6 sm:p-8 text-center space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-fuchsia-400 block">
                  Daily Grounding Affirmation
                </span>
                <p className="text-lg sm:text-xl font-serif italic text-fuchsia-200 max-w-xl mx-auto">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </p>
              </div>

              {/* Middle AdSense Banner */}
              <AdSenseBanner slot="fomo-mid" className="my-4" />

              {/* App Store CTA */}
              <AppStoreCta />

              {/* Related Diagnostics & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                <Link
                  to="/quiz/dopamine-detox"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-fuchsia-500/50 text-neutral-200 text-sm font-semibold transition"
                >
                  <span>Explore Dopamine Detox Test</span>
                  <ArrowRight className="h-4 w-4 text-fuchsia-400" />
                </Link>
                <Link
                  to="/quiz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
                >
                  <span>View All 44+ Diagnostics</span>
                </Link>
              </div>
            </motion.div>
          )
        )}
      </main>

      {/* Share Card Modal */}
      {result && (
        <FomoShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default FomoTest;

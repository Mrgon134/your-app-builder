import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Share2,
  ChevronRight,
  Shield,
  Compass,
  ArrowRight,
  Zap,
  CheckCircle2,
  Eye,
  Activity,
  Wind,
  Volume2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  SENSORY_QUESTIONS,
  calculateSensoryOverloadScore,
  SensoryLang,
} from "@/data/sensory-overload";
import { SensoryShareCardModal } from "@/components/SensoryShareCardModal";
import { toast } from "sonner";

interface SensoryTestProps {
  defaultLang?: SensoryLang;
}

const SensoryTest: React.FC<SensoryTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<SensoryLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = SENSORY_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / SENSORY_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < SENSORY_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateSensoryOverloadScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My Sensory Overload & Empathy Burnout Profile: ${result.profile.title[lang] || result.profile.title.en} (${result.percentage}% - ${result.profile.badge[lang] || result.profile.badge.en}). Screen your sensory processing sensitivity free: https://nuju.app/quiz/sensory-overload`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#041517] text-neutral-100 selection:bg-teal-500/30">
      <SEOHead
        title="Sensory Overload & Empathy Burnout Test: Free HSP Diagnostic"
        description="Are fluorescent lights, loud noise, and others' stress exhausting your nervous system? Free 12-item screener based on Dr. Elaine Aron's HSP model. Get your 1080x1350 Story card."
        canonical="https://nuju.app/quiz/sensory-overload"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-teal-950/40 bg-[#041517]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Psychology Diagnostics</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-xs">
            {(["en", "id", "de", "fr", "es"] as SensoryLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md font-bold transition uppercase ${
                  lang === l
                    ? "bg-teal-600 text-white shadow-xs"
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
        <AdSenseBanner slot="sensory-top" className="my-2" />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {!isCompleted ? (
          /* ========================================================================= */
          /* QUESTION WIZARD STEP                                                      */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Header / Intro Card */}
            <div className="rounded-3xl border border-teal-900/40 bg-gradient-to-br from-teal-950/30 via-neutral-900/50 to-neutral-950 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 px-3 py-1 text-xs font-bold text-teal-300">
                  <Activity className="h-3.5 w-3.5" />
                  DR. ELAINE ARON MODEL (HSP / SPS)
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {currentIndex + 1} / {SENSORY_QUESTIONS.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                Sensory Overload & Empathy Burnout Diagnostic
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Assess your sensory threshold, empathic absorption of others' tension, and cognitive depletion.
                Discover customized sensory decompression chambers and Teflon boundary drills.
              </p>

              {/* Progress Bar */}
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-teal-900/30 bg-neutral-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-xs"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
                  Question {currentIndex + 1} • {currentQ.subscale.replace(/_/g, " ")}
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                  {currentQ.prompt[lang] || currentQ.prompt.en}
                </h2>

                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = answers[currentQ.id] === option.score;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option.score)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                          isSelected
                            ? "border-teal-500 bg-teal-950/40 text-white shadow-md shadow-teal-950/50"
                            : "border-neutral-800 bg-neutral-950/40 text-neutral-300 hover:border-teal-800/60 hover:bg-neutral-800/40"
                        }`}
                      >
                        <span className="text-sm font-medium pr-4">
                          {option.label[lang] || option.label.en}
                        </span>
                        <div
                          className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center transition ${
                            isSelected
                              ? "border-teal-500 bg-teal-500 text-white"
                              : "border-neutral-700 group-hover:border-teal-400"
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back Button */}
                {currentIndex > 0 && (
                  <div className="mt-6 pt-4 border-t border-neutral-800/60 flex justify-start">
                    <button
                      onClick={handlePrevious}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Question</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Middle Google AdSense Banner */}
            <AdSenseBanner slot="sensory-mid" className="my-4" />
          </div>
        ) : (
          /* ========================================================================= */
          /* RESULTS PROFILE DISPLAY                                                   */
          /* ========================================================================= */
          result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Primary Score Hero */}
              <div className="rounded-3xl border border-teal-900/50 bg-gradient-to-br from-teal-950/40 via-neutral-900 to-neutral-950 p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/30 px-3.5 py-1 text-xs font-bold text-teal-300 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>{result.profile.badge[lang] || result.profile.badge.en}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                  {result.profile.title[lang] || result.profile.title.en}
                </h1>
                <p className="text-sm sm:text-base text-teal-200/80 max-w-xl mx-auto italic mb-6">
                  "{result.profile.tagline[lang] || result.profile.tagline.en}"
                </p>

                {/* Gauge Ring / Score Badge */}
                <div className="flex flex-col items-center justify-center my-6">
                  <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-4 border-teal-900/40 bg-neutral-950 shadow-inner">
                    <div className="text-center">
                      <span className="text-4xl font-black text-white">{result.percentage}%</span>
                      <span className="block text-[11px] font-bold text-teal-400 uppercase tracking-widest mt-0.5">
                        Overload Index
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 mt-2">
                    Score: {result.totalScore} / {result.maxScore} points
                  </span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl mx-auto text-left sm:text-center mt-4">
                  {result.profile.description[lang] || result.profile.description.en}
                </p>

                {/* Share Card & Copy Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-teal-900/40 hover:from-teal-500 hover:to-emerald-500 transition active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate 1080x1350 Story Card</span>
                  </button>

                  <button
                    onClick={copyResults}
                    className="flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 px-5 py-3 text-xs font-bold text-neutral-200 border border-neutral-700 transition active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Summary</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-4 py-3 text-xs font-semibold text-neutral-400 border border-neutral-800 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>

              {/* 3 Core Dimensions Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Subscale 1: Sensory Threshold */}
                <div className="rounded-2xl border border-teal-900/30 bg-neutral-900/40 p-5 shadow-sm">
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                    Sensory Threshold
                  </div>
                  <div className="text-2xl font-black text-white mb-2">
                    {result.subscales.sensory_threshold.percentage}%
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${result.subscales.sensory_threshold.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 leading-snug">
                    Vulnerability to harsh light, sudden loud noise, rough textures, and caffeine.
                  </p>
                </div>

                {/* Subscale 2: Empathic Absorption */}
                <div className="rounded-2xl border border-amber-900/30 bg-neutral-900/40 p-5 shadow-sm">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Empathic Absorption
                  </div>
                  <div className="text-2xl font-black text-white mb-2">
                    {result.subscales.empathic_absorption.percentage}%
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${result.subscales.empathic_absorption.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 leading-snug">
                    Porosity of boundaries; absorbing roommates', colleagues', or news trauma into the chest.
                  </p>
                </div>

                {/* Subscale 3: Overstimulation Exhaustion */}
                <div className="rounded-2xl border border-cyan-900/30 bg-neutral-900/40 p-5 shadow-sm">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    Cognitive Overload
                  </div>
                  <div className="text-2xl font-black text-white mb-2">
                    {result.subscales.overstimulation_exhaustion.percentage}%
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${result.subscales.overstimulation_exhaustion.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 leading-snug">
                    Depletion rate under observation and the biological mandate for dark quiet retreats.
                  </p>
                </div>
              </div>

              {/* Neurobiology SPS Insight Box */}
              <div className="rounded-3xl border border-teal-900/40 bg-gradient-to-br from-teal-950/30 to-neutral-900 p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-3 text-teal-300 font-bold text-sm">
                  <Activity className="w-4 h-4 text-teal-400" />
                  <span>Dr. Elaine Aron's Sensory Processing Sensitivity Findings</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {result.profile.sensoryInsight[lang] || result.profile.sensoryInsight.en}
                </p>
              </div>

              {/* Decompression Protocols */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-4 text-white font-bold text-base">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span>Sensory Decompression Protocols</span>
                </div>
                <div className="space-y-3">
                  {(
                    result.profile.decompressionProtocols[lang] ||
                    result.profile.decompressionProtocols.en
                  ).map((protocol, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {protocol}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Somatic Daily Affirmation */}
              <div className="rounded-2xl border border-teal-950/60 bg-teal-950/20 p-5 text-center">
                <div className="text-xs uppercase font-bold text-teal-400 tracking-wider mb-1">
                  Daily Grounding Affirmation
                </div>
                <div className="text-sm sm:text-base font-semibold text-white italic">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </div>
              </div>

              {/* Result Google AdSense Banner */}
              <AdSenseBanner slot="sensory-result" className="my-6" />

              {/* Related Tools Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Link
                  to="/tools/soundscapes"
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-cyan-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Sensory Sanctuary
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-cyan-300 transition">
                      Pure Synthesized Brown Noise & Rain
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Screen out auditory clutter with in-browser brown noise and 528Hz Alpha waves.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-cyan-400">
                    <span>Open Sound Sanctuary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                <Link
                  to="/tools/box-breathing"
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-emerald-700/60 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Vagal Reset
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                      Navy SEAL Box Breathing Lab
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Reset overstimulated fight-or-flight states in 2 minutes with audio-guided 4-4-4-4 pacing.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-400">
                    <span>Start Box Breathing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>

              {/* Native App CTA */}
              <AppStoreCta />
            </motion.div>
          )
        )}
      </main>

      {/* 1080x1350 Canvas Modal */}
      {result && (
        <SensoryShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default SensoryTest;

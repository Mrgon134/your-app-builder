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
  HeartHandshake,
  Compass,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  ATTACHMENT_COMPATIBILITY_QUESTIONS,
  calculateAttachmentCompatibilityScore,
  AttachmentCompatibilityLang,
} from "@/data/attachment-compatibility";
import { AttachmentCompatibilityShareCardModal } from "@/components/AttachmentCompatibilityShareCardModal";
import { toast } from "sonner";

interface AttachmentCompatibilityTestProps {
  defaultLang?: AttachmentCompatibilityLang;
}

const AttachmentCompatibilityTest: React.FC<AttachmentCompatibilityTestProps> = ({
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState<AttachmentCompatibilityLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = ATTACHMENT_COMPATIBILITY_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / ATTACHMENT_COMPATIBILITY_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < ATTACHMENT_COMPATIBILITY_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateAttachmentCompatibilityScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My Attachment Compatibility Profile: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% relational index - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your attachment dynamic free: https://nuju.app/quiz/attachment-compatibility`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0C0612] text-neutral-100 selection:bg-rose-500/30">
      <SEOHead
        title="Attachment Compatibility Test: Free Relationship Dynamics & Anxious-Avoidant Screener"
        description="Trapped in an anxious-avoidant push-pull cycle or craving security? Take our free 12-item clinical screener based on Amir Levine's Attached and Sue Johnson's EFT."
        canonical="https://nuju.app/quiz/attachment-compatibility"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#0C0612]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Psychology Diagnostics</span>
          </Link>

          {/* Language Selector */}
          <div className="flex items-center gap-1 text-xs">
            {(["en", "id", "de", "fr", "es"] as AttachmentCompatibilityLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-md font-bold transition uppercase ${
                  lang === l
                    ? "bg-rose-500 text-neutral-950 shadow-xs"
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
        <AdSenseBanner slot="attachment-compatibility-top" className="my-2" />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {!isCompleted ? (
          /* ========================================================================= */
          /* QUESTION WIZARD STEP                                                      */
          /* ========================================================================= */
          <div className="space-y-6">
            {/* Header / Intro Card */}
            <div className="rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-neutral-900/40 to-neutral-950 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-bold text-rose-300">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  LEVINE ATTACHED & JOHNSON EFT MODEL
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {currentIndex + 1} / {ATTACHMENT_COMPATIBILITY_QUESTIONS.length}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                Attachment Compatibility & Dynamics Test
              </h1>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Decode your relational trigger map: whether you chase when anxious, shut down when overwhelmed, or get pulled into toxic push-pull rollercoaster dynamics.
              </p>

              {/* Progress Bar */}
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-400"
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
                  <span className="text-[11px] font-semibold text-rose-400/80 uppercase">
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
                            ? "border-rose-400 bg-rose-500/10 text-white shadow-sm"
                            : "border-neutral-800 bg-neutral-950/40 hover:border-rose-500/50 hover:bg-neutral-800/40 text-neutral-300"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium pr-4 leading-relaxed">
                          {option.label[lang] || option.label.en}
                        </span>
                        <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-rose-400 shrink-0 transition" />
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
              <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/15 via-neutral-900 to-neutral-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-xs font-bold text-rose-300 shadow-sm">
                    <Award className="h-3.5 w-3.5" />
                    {result.profile.badge[lang] || result.profile.badge.en}
                  </span>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                      Relational Index
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-rose-400">
                      {result.percentage}%
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                  {result.profile.title[lang] || result.profile.title.en}
                </h1>
                <p className="text-base sm:text-lg italic text-rose-200/90 font-serif mb-6">
                  "{result.profile.tagline[lang] || result.profile.tagline.en}"
                </p>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {result.profile.description[lang] || result.profile.description.en}
                </p>

                {/* Subscales Tri-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-rose-500/20">
                  <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                      Anxious Pursuit
                    </span>
                    <div className="text-2xl font-black text-white mb-1">
                      {result.subscales.anxious_pursuit.percentage}%
                    </div>
                    <span className="text-xs text-neutral-400">
                      Abandonment Panic & Chasing
                    </span>
                  </div>

                  <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      Deactivation
                    </span>
                    <div className="text-2xl font-black text-white mb-1">
                      {result.subscales.avoidant_deactivation.percentage}%
                    </div>
                    <span className="text-xs text-neutral-400">
                      Stonewalling & Emotional Walls
                    </span>
                  </div>

                  <div className="rounded-2xl bg-neutral-900/80 border border-neutral-800 p-4">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Protest Behavior
                    </span>
                    <div className="text-2xl font-black text-white mb-1">
                      {result.subscales.protest_behavior.percentage}%
                    </div>
                    <span className="text-xs text-neutral-400">
                      Passive Aggression & Covert Tests
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-90 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-rose-500/20 transition"
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
                <div className="flex items-center gap-2 text-rose-400">
                  <Compass className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Sue Johnson EFT & The Anxious-Avoidant Dance
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {result.profile.psychologyInsight[lang] || result.profile.psychologyInsight.en}
                </p>
              </div>

              {/* Action Protocol Steps */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Flame className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    De-Escalation & Earned Security Protocol
                  </h2>
                </div>
                <div className="space-y-3">
                  {(result.profile.actionProtocols[lang] || result.profile.actionProtocols.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl bg-neutral-950/50 border border-neutral-800/80 p-4"
                      >
                        <CheckCircle2 className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                          {step}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Daily Affirmation Card */}
              <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-8 text-center space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-rose-400 block">
                  Daily Intimacy Affirmation
                </span>
                <p className="text-lg sm:text-xl font-serif italic text-rose-200 max-w-xl mx-auto">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </p>
              </div>

              {/* Middle AdSense Banner */}
              <AdSenseBanner slot="attachment-compatibility-mid" className="my-4" />

              {/* App Store CTA */}
              <AppStoreCta />

              {/* Related Diagnostics & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                <Link
                  to="/quiz/emotional-availability"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 text-neutral-200 text-sm font-semibold transition"
                >
                  <span>Explore Emotional Availability</span>
                  <ArrowRight className="h-4 w-4 text-rose-400" />
                </Link>
                <Link
                  to="/quiz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
                >
                  <span>View All 46+ Diagnostics</span>
                </Link>
              </div>
            </motion.div>
          )
        )}
      </main>

      {/* Share Card Modal */}
      {result && (
        <AttachmentCompatibilityShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default AttachmentCompatibilityTest;

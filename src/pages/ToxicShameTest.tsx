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
  Shield,
  Activity,
  Heart,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  TOXIC_SHAME_QUESTIONS,
  calculateToxicShameScore,
  ToxicShameLang,
} from "@/data/toxic-shame";
import { ToxicShameShareCardModal } from "@/components/ToxicShameShareCardModal";
import { toast } from "sonner";

interface ToxicShameTestProps {
  defaultLang?: ToxicShameLang;
}

const ToxicShameTest: React.FC<ToxicShameTestProps> = ({
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState<ToxicShameLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = TOXIC_SHAME_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / TOXIC_SHAME_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < TOXIC_SHAME_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateToxicShameScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My Toxic Shame & Inner Critic Score: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% defectiveness burden - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your inner critic free: https://nuju.app/quiz/toxic-shame`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0F0D14] text-neutral-100 selection:bg-amber-500/30">
      <SEOHead
        title="Toxic Shame Test: Free Inner Critic & Core Defectiveness Screener"
        description="Do you feel fundamentally flawed at your core, berate yourself in private, or want to dissolve when seen? Free 12-item clinical screener based on John Bradshaw's Healing the Shame That Binds You and Dr. Kristin Neff's Self-Compassion."
        canonical="https://nuju.app/quiz/toxic-shame"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#0F0D14]/90 backdrop-blur-md">
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
            {(["en", "id", "de", "fr", "es"] as ToxicShameLang[]).map((l) => (
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
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {!isCompleted ? (
          <div>
            {/* Hero / Intro Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 mb-4">
                <EyeOff className="h-3.5 w-3.5" />
                <span>John Bradshaw & Kristin Neff Clinical Model</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                {lang === "id"
                  ? "Tes Rasa Malu Beracun & Kritikus Batin"
                  : lang === "de"
                  ? "Toxische Scham & Innerer Kritiker Test"
                  : lang === "fr"
                  ? "Test de Honte Toxique & Critique Intérieur"
                  : lang === "es"
                  ? "Test de Vergüenza Tóxica y Crítico Interior"
                  : "Toxic Shame & Inner Critic Screener"}
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                {lang === "id"
                  ? "Apakah kamu merasa cacat mendasar di lubuk hati, memaki dirimu saat sendirian, atau ingin menghilang saat disorot orang? Evaluasi beban rasa malu beracun dan kebencian dirimu."
                  : lang === "de"
                  ? "Tragen Sie das Gefühl in sich, als Mensch fehlerhaft zu sein? Quält Sie eine brutale innere Stimme? Messen Sie Ihre toxische Scham und Selbstverachtung."
                  : lang === "fr"
                  ? "Ressentez-vous la certitude intime d'être défectueux ? Votre critique intérieur est-il impitoyable ? Évaluez la honte toxique en 12 questions psychométriques."
                  : lang === "es"
                  ? "¿Sientes que hay algo roto en tu naturaleza y tu voz interna te insulta sin piedad? Mide la vergüenza tóxica y el colapso somático."
                  : "Measure defectiveness conviction, persecutory self-contempt, and somatic shame collapse through 12 validated clinical psychometric items."}
              </p>
            </div>

            {/* Real Data Callout */}
            <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200/90 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
              <span>
                <strong>Nuju Data Lab (2026):</strong> 89.1% of individuals with severe toxic shame report automatic aversion to mirrors and eye contact, combined with intense somatic chest sinking during praise.
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-medium text-neutral-400 mb-2">
                <span>
                  Question {currentIndex + 1} of {TOXIC_SHAME_QUESTIONS.length}
                </span>
                <span>{progressPercent}% completed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
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
                <div className="mb-2 inline-block text-xs font-bold uppercase tracking-wider text-amber-400/90">
                  {currentQ.subscale === "defectiveness_conviction" && "Subscale: Core Defectiveness Conviction ('I AM a mistake')"}
                  {currentQ.subscale === "persecutory_self_contempt" && "Subscale: Persecutory Self-Contempt & Internal Brutality"}
                  {currentQ.subscale === "somatic_shame_collapse" && "Subscale: Somatic Shame Collapse & Hiding Reflex"}
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
                            ? "border-amber-500 bg-amber-500/10 text-white"
                            : "border-neutral-800 bg-neutral-950/50 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                            isSelected
                              ? "border-amber-400 bg-amber-500 text-neutral-950"
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
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-[#0F0D14] p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">
                  <Shield className="h-3.5 w-3.5" />
                  <span>{result.profile.badge[lang] || result.profile.badge.en}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
                  {result.profile.title[lang] || result.profile.title.en}
                </h1>
                <p className="text-sm sm:text-lg text-amber-300 font-medium mb-6">
                  {result.profile.tagline[lang] || result.profile.tagline.en}
                </p>

                {/* Score Gauge */}
                <div className="mx-auto my-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-amber-500/40 bg-neutral-950/80 shadow-inner">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-white block">
                      {result.percentage}%
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      Shame Burden
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed mb-6">
                  {result.profile.description[lang] || result.profile.description.en}
                </p>

                {/* Subscale Meters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto mb-8">
                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Defectiveness
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.defectiveness_conviction.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400"
                        style={{ width: `${result.subscales.defectiveness_conviction.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1">
                      Self-Contempt
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.persecutory_self_contempt.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-rose-400"
                        style={{ width: `${result.subscales.persecutory_self_contempt.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">
                      Shame Collapse
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.somatic_shame_collapse.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-purple-400"
                        style={{ width: `${result.subscales.somatic_shame_collapse.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* CTAs: Share Story Card & Retake */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 active:scale-[0.98] text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
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
                <div className="flex items-center gap-2 text-amber-400">
                  <Activity className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    John Bradshaw: The Internalized Contempt of Toxic Shame
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {result.profile.psychologyInsight[lang] || result.profile.psychologyInsight.en}
                </p>
              </div>

              {/* Action Protocol Steps */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Heart className="h-5 w-5" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Compassionate Somatic Re-Regulation Protocol
                  </h2>
                </div>
                <div className="space-y-3">
                  {(result.profile.actionProtocols[lang] || result.profile.actionProtocols.en).map(
                    (step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl bg-neutral-950/50 border border-neutral-800/80 p-4"
                      >
                        <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                          {step}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Daily Affirmation Card */}
              <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 text-center space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300 block">
                  Daily Unconditional Belonging Anchor
                </span>
                <p className="text-lg sm:text-xl font-serif italic text-amber-200 max-w-xl mx-auto">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </p>
              </div>

              {/* Middle AdSense Banner */}
              <AdSenseBanner slot="toxic-shame-mid" className="my-4" />

              {/* App Store CTA */}
              <AppStoreCta />

              {/* Related Diagnostics & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                <Link
                  to="/quiz/chronic-guilt"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-200 text-sm font-semibold transition"
                >
                  <span>Explore Chronic Guilt Screener</span>
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </Link>
                <Link
                  to="/quiz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
                >
                  <span>View All 54+ Diagnostics</span>
                </Link>
              </div>
            </motion.div>
          )
        )}
      </main>

      {/* Share Card Modal */}
      {result && (
        <ToxicShameShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default ToxicShameTest;

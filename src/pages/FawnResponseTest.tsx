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
  Smile,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  FAWN_RESPONSE_QUESTIONS,
  calculateFawnResponseScore,
  FawnResponseLang,
} from "@/data/fawn-response";
import { FawnResponseShareCardModal } from "@/components/FawnResponseShareCardModal";
import { toast } from "sonner";

interface FawnResponseTestProps {
  defaultLang?: FawnResponseLang;
}

const FawnResponseTest: React.FC<FawnResponseTestProps> = ({
  defaultLang = "en",
}) => {
  const [lang, setLang] = useState<FawnResponseLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = FAWN_RESPONSE_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / FAWN_RESPONSE_QUESTIONS.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQ.id]: score };
    setAnswers(updated);

    if (currentIndex < FAWN_RESPONSE_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateFawnResponseScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `My People-Pleasing & Fawn Response Score: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% appeasement load - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your trauma fawn reflex free: https://nuju.app/quiz/fawn-response`;
    navigator.clipboard.writeText(text);
    toast.success("Result summary copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0C120C] text-neutral-100 selection:bg-amber-500/30">
      <SEOHead
        title="Fawn Response Test: Free People-Pleaser & Trauma Appeasement Screener"
        description="Do you automatically smile, apologize, or erase your own desires when conflict arises? Take our free 12-item clinical screener based on Pete Walker's Complex PTSD Fawn Model and Harriet Braiker's Disease to Please."
        canonical="https://nuju.app/quiz/fawn-response"
        language={lang}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#0C120C]/90 backdrop-blur-md">
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
            {(["en", "id", "de", "fr", "es"] as FawnResponseLang[]).map((l) => (
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
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 mb-4">
                <Smile className="h-3.5 w-3.5" />
                <span>Pete Walker C-PTSD & Harriet Braiker Model</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                {lang === "id"
                  ? "Tes Refleks Fawn & People-Pleasing Kronis"
                  : lang === "de"
                  ? "Fawn-Response & People-Pleasing Test"
                  : lang === "fr"
                  ? "Test du Réflexe de Soumission (Fawn) & People-Pleasing"
                  : lang === "es"
                  ? "Test de Respuesta Fawn y Complacencia Traumática"
                  : "People-Pleaser & Fawn Response Screener"}
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
                {lang === "id"
                  ? "Apakah kamu otomatis tersenyum dan meminta maaf saat orang lain marah, menelan opini sendiri, atau merasa bersalah saat berkata 'Tidak'? Evaluasi refleks trauma kepatuhanmu."
                  : lang === "de"
                  ? "Lächeln Sie automatisch bei Aggressionen und geben eigene Wünsche auf, um geliebt zu werden? Messen Sie Fawning, Identitätsverlust und passive Wut."
                  : lang === "fr"
                  ? "Effacez-vous vos désirs pour plaire et éviter tout conflit ? Évaluez l'apaisement compulsif, la perte d'identité et la rancœur secrète en 12 questions."
                  : lang === "es"
                  ? "¿Te sometes o sonríes por miedo al conflicto mientras te consumes de amargura por dentro? Mide la sumisión complaciente y el autoboicot relacional."
                  : "Measure compulsive appeasement, identity erasure, and post-fawn resentment through 12 validated clinical psychometric items."}
              </p>
            </div>

            {/* Real Data Callout */}
            <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-200/90 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
              <span>
                <strong>Nuju Data Lab (2026):</strong> Over 83% of users with high fawn scores report acute throat constriction, chest pressure, and visceral guilt when attempting to state an uncompromised boundary.
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-medium text-neutral-400 mb-2">
                <span>
                  Question {currentIndex + 1} of {FAWN_RESPONSE_QUESTIONS.length}
                </span>
                <span>{progressPercent}% completed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
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
                  {currentQ.subscale === "compulsive_appeasement" && "Subscale: Compulsive Appeasement & Conflict De-escalation"}
                  {currentQ.subscale === "identity_erasure" && "Subscale: Identity Erasure & Boundary Surrender"}
                  {currentQ.subscale === "post_fawn_resentment" && "Subscale: Post-Fawn Resentment & Secret Rage"}
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
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-[#0C120C] p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
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
                      Fawn Load
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
                      Appeasement
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.compulsive_appeasement.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400"
                        style={{ width: `${result.subscales.compulsive_appeasement.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Identity Erasure
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.identity_erasure.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-400"
                        style={{ width: `${result.subscales.identity_erasure.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1">
                      Secret Resentment
                    </div>
                    <div className="text-xl font-black text-white">
                      {result.subscales.post_fawn_resentment.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-rose-400"
                        style={{ width: `${result.subscales.post_fawn_resentment.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* CTAs: Share Story Card & Retake */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 active:scale-[0.98] text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
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
                    Pete Walker 'Complex PTSD: From Surviving to Thriving'
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
                    Sovereign Boundary & Fight Recovery Protocol
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
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                  Daily Boundary Anchor
                </span>
                <p className="text-lg sm:text-xl font-serif italic text-amber-200 max-w-xl mx-auto">
                  "{result.profile.dailyAffirmation[lang] || result.profile.dailyAffirmation.en}"
                </p>
              </div>

              {/* Middle AdSense Banner */}
              <AdSenseBanner slot="fawn-response-mid" className="my-4" />

              {/* App Store CTA */}
              <AppStoreCta />

              {/* Related Diagnostics & Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800">
                <Link
                  to="/quiz/people-pleasing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-200 text-sm font-semibold transition"
                >
                  <span>Explore People-Pleaser Archetypes</span>
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </Link>
                <Link
                  to="/quiz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
                >
                  <span>View All 52+ Diagnostics</span>
                </Link>
              </div>
            </motion.div>
          )
        )}
      </main>

      {/* Share Card Modal */}
      {result && (
        <FawnResponseShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </div>
  );
};

export default FawnResponseTest;

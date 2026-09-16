import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  RotateCcw,
  Copy,
  Sparkles,
  ChevronRight,
  Share2,
  CheckCircle2,
  Flame,
  Lightbulb,
  BookOpen,
  Compass,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  CBT_SCENARIOS,
  CBT_OPTIONS,
  CBT_DISTORTIONS,
  calculateCbtScore,
  CbtLang,
  DistortionType,
} from "@/data/cognitive-distortions";
import { CbtShareCardModal } from "@/components/CbtShareCardModal";
import { toast } from "sonner";

interface CognitiveDistortionsTestProps {
  defaultLang?: CbtLang;
}

const CognitiveDistortionsTest: React.FC<CognitiveDistortionsTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<CbtLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentScenario = CBT_SCENARIOS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / CBT_SCENARIOS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentScenario.id]: value };
    setAnswers(updated);

    if (currentIndex < CBT_SCENARIOS.length - 1) {
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

  const result = isCompleted ? calculateCbtScore(answers) : null;

  // Ranked distortions
  const rankedDistortions = result
    ? (Object.keys(result.frequency) as DistortionType[])
        .map((type) => {
          const score = result.frequency[type];
          return {
            distortion: CBT_DISTORTIONS[type],
            score,
            percentage: Math.round((score / 3) * 100),
          };
        })
        .sort((a, b) => b.score - a.score)
    : [];

  const copyResults = () => {
    if (!result) return;
    const text = `🧠 Cognitive Distortions & Thought Spotter:
Dominant Bias: ${result.profile.title[lang]} (${result.profile.badge[lang]})
• Reframe Formula: "${result.profile.reframeFormula[lang]}"
• Rational Alternative: "${result.profile.cbtThoughtRecord[lang].rationalAlternative}"

Spot your automatic negative thoughts & cognitive loops free at: https://www.nuju.app/quiz/cognitive-distortions`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes kognitif berhasil disalin!"
          : "CBT assessment results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<CbtLang, string> = {
    en: "Cognitive Distortions Test: Free CBT Automatic Thoughts Spotter | Ju",
    id: "Tes Distorsi Kognitif & Overthinking Online Gratis (CBT) | Ju",
    de: "Kognitive Verzerrungen Test: Kostenloser CBT Gedanken-Checker | Ju",
    fr: "Test Distorsions Cognitives Gratuit en Ligne (TCC) | Ju",
    es: "Test de Distorsiones Cognitivas Gratis Online (TCC) | Ju",
  };

  const metaDescriptions: Record<CbtLang, string> = {
    en: "Identify your dominant cognitive distortions, automatic negative thoughts (ANTs), and catastrophic overthinking patterns based on Dr. Aaron Beck and David Burns' CBT model.",
    id: "Kenali pola distorsi kognitif, pikiran otomatis negatif, dan spiral overthinking dengan tes 10 skenario realistis berbasis CBT Dr. Aaron Beck & David Burns.",
    de: "Identifizieren Sie Ihre dominanten kognitiven Denkfehler wie Katastrophisieren, Schwarz-Weiß-Denken oder Gedankenlesen nach dem KVT-Modell von Dr. Aaron Beck.",
    fr: "Détectez vos pensées automatiques négatives et distorsions cognitives grâce à notre test interactif basé sur la thérapie comportementale et cognitive (TCC).",
    es: "Descubra sus distorsiones cognitivas dominantes y patrones de sobrepensamiento con este test interactivo basado en la TCC del Dr. Aaron Beck y David Burns.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/cognitive-distortions"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: metaTitles[lang],
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            description: metaDescriptions[lang],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "Ju Mental Health Assessments",
              url: "https://www.nuju.app",
            },
          },
        ]}
      />

      <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-950/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-violet-950/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "id" ? "Semua Tes" : "All Quizzes"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900/80 border border-indigo-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as CbtLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* AdSense Top Banner */}
          <div className="mb-6">
            <AdSenseBanner slot="cbt-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="flex-1 flex flex-col justify-center">
              {/* Progress Header */}
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider">
                    <Brain className="w-4 h-4" />
                    <span>CBT Thought Record Model (Beck & Burns)</span>
                  </span>
                  <span>
                    {currentIndex + 1} / {CBT_SCENARIOS.length}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-indigo-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Scenario Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScenario.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-500/20">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                    <span>
                      {lang === "id"
                        ? `Skenario ${currentIndex + 1} dari 10`
                        : `Scenario ${currentIndex + 1} of 10`}
                    </span>
                  </div>

                  {/* Real-life trigger context */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {lang === "id" ? "Situasi / Pemicu Realistis:" : "Real-life Trigger Situation:"}
                    </h3>
                    <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed">
                      {currentScenario.scenario[lang]}
                    </p>
                  </div>

                  {/* Automatic Thought Callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1.5">
                      {lang === "id"
                        ? "Pikiran Otomatis Spontan (ANT):"
                        : "Spontaneous Automatic Thought (ANT):"}
                    </h4>
                    <p className="text-base sm:text-lg font-semibold italic text-white">
                      {currentScenario.thought[lang]}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {lang === "id"
                        ? "Seberapa mirip reaksi pikiran spontan Anda?"
                        : "How closely does your brain instinctively react this way?"}
                    </h4>
                    {CBT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="w-full text-left p-4 sm:p-4.5 rounded-2xl bg-white/[0.03] hover:bg-indigo-600/15 border border-white/5 hover:border-indigo-500/40 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center justify-between group"
                      >
                        <span>{opt.label[lang]}</span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1 shrink-0" />
                      </button>
                    ))}
                  </div>

                  {currentIndex > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={handlePrevious}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{lang === "id" ? "Kembali ke skenario sebelumnya" : "Previous scenario"}</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* AdSense Mid Banner during test */}
              <div className="mt-8">
                <AdSenseBanner slot="cbt-mid" format="auto" />
              </div>
            </div>
          ) : (
            /* ================= RESULTS VIEW ================= */
            result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Result Card */}
                <div className="rounded-3xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                      {result.profile.badge[lang]}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {lang === "id" ? "Hasil Diagnostik Kognitif CBT" : "CBT Diagnostic Profile"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                    {result.profile.title[lang]}
                  </h1>

                  <p className="text-base sm:text-lg italic text-indigo-200/90 mb-6">
                    &ldquo;{result.profile.tagline[lang]}&rdquo;
                  </p>

                  {/* Top 3 Breakdown */}
                  <div className="bg-slate-950/60 rounded-2xl p-5 border border-indigo-500/20 mb-6 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-indigo-400" />
                      <span>{lang === "id" ? "Distorsi Kognitif Paling Dominan" : "Your Dominant Cognitive Distortions"}</span>
                    </h3>
                    <div className="space-y-3">
                      {rankedDistortions.slice(0, 3).map((item) => (
                        <div key={item.distortion.id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-200">{item.distortion.title[lang]}</span>
                            <span className="text-indigo-400">{item.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.max(item.percentage, 8)}%`,
                                backgroundColor: item.distortion.color || "#6366F1",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scientific Mechanism */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>{lang === "id" ? "Mekanisme Neurokognitif (CBT)" : "Cognitive Mechanism"}</span>
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {result.profile.definition[lang]}
                    </p>
                  </div>

                  {/* Thought Record & Reframe Formula */}
                  <div className="p-6 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {lang === "id"
                          ? "Rumus Restrukturisasi Kognitif (Cognitive Reframe Formula)"
                          : "Evidence-Based Cognitive Reframe Formula"}
                      </span>
                    </h3>
                    <p className="text-base sm:text-lg font-semibold italic text-sky-100">
                      &ldquo;{result.profile.reframeFormula[lang]}&rdquo;
                    </p>

                    <div className="pt-2 border-t border-indigo-500/20 space-y-2 text-xs sm:text-sm">
                      <div className="text-slate-400">
                        <span className="font-bold text-slate-300">
                          {lang === "id" ? "Pemicu Contoh: " : "Trigger Example: "}
                        </span>
                        {result.profile.cbtThoughtRecord[lang].trigger}
                      </div>
                      <div className="text-rose-300/90">
                        <span className="font-bold text-rose-300">
                          {lang === "id" ? "Pikiran Otomatis: " : "Automatic Thought: "}
                        </span>
                        &ldquo;{result.profile.cbtThoughtRecord[lang].automaticThought}&rdquo;
                      </div>
                      <div className="text-emerald-300">
                        <span className="font-bold text-emerald-400">
                          {lang === "id" ? "Alternatif Rasional: " : "Rational Alternative: "}
                        </span>
                        &ldquo;{result.profile.cbtThoughtRecord[lang].rationalAlternative}&rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Actions (Share, Copy, Retake) */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{lang === "id" ? "Bagikan Story Card" : "Share Story Card"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={copyResults}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700 active:scale-[0.98]"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{lang === "id" ? "Salin Ringkasan" : "Copy Summary"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all border border-slate-700/60 active:scale-[0.98]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{lang === "id" ? "Ulangi Tes" : "Retake Test"}</span>
                    </button>
                  </div>
                </div>

                {/* AdSense Result Slot */}
                <div>
                  <AdSenseBanner slot="cbt-result" format="auto" />
                </div>

                {/* Recommended Neuroscience Pairing */}
                <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>{lang === "id" ? "Langkah Lanjutan Pemulihan Sistem Saraf" : "Next Recommended Somatic Steps"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "id"
                      ? "Tenangkan Overthinking dengan Protokol Somatik Stanford NSDR"
                      : "Regulate Cognitive Overthinking with Stanford NSDR Protocol"}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === "id"
                      ? "Ketika pikiran Anda terjebak dalam distorsi kognitif, amigdala mengirimkan sinyal bahaya ke seluruh tubuh. Dengarkan gelombang suara Theta 6Hz kami di NSDR Lab untuk merestart sistem saraf dalam 10 menit."
                      : "When your prefrontal cortex is hijacked by cognitive distortions, your nervous system remains in hyper-arousal. Experience our 6Hz Theta frequency audio lab to down-regulate within 10 minutes."}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to="/tools/nsdr"
                      className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-all shadow-lg shadow-cyan-600/30"
                    >
                      <span>{lang === "id" ? "Buka Stanford NSDR Lab" : "Open Stanford NSDR Lab"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/quiz/rsd"
                      className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700"
                    >
                      <span>{lang === "id" ? "Tes Rejection Sensitivity (RSD)" : "RSD Sensitivity Screener"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* App Download Call to Action */}
                <AppStoreCta />

                {/* Share Card Modal */}
                <CbtShareCardModal
                  isOpen={isShareCardOpen}
                  onClose={() => setIsShareCardOpen(false)}
                  result={{
                    primaryDistortion: result.profile,
                    topDistortions: rankedDistortions,
                    totalScore: result.totalReactivityScore,
                    dominantPercentage: rankedDistortions[0]?.percentage || 100,
                  }}
                  lang={lang}
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CognitiveDistortionsTest;

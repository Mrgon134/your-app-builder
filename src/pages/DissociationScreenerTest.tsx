import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Share2,
  ChevronRight,
  Eye,
  Shield,
  Activity,
  Compass,
  ArrowRight,
  Heart,
  Anchor,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  DISSOCIATION_QUESTIONS,
  DISSOCIATION_OPTIONS,
  calculateDissociationScore,
  DissociationLang,
} from "@/data/dissociation-screener";
import { DissociationShareCardModal } from "@/components/DissociationShareCardModal";
import { toast } from "sonner";

interface DissociationScreenerTestProps {
  defaultLang?: DissociationLang;
}

const DissociationScreenerTest: React.FC<DissociationScreenerTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<DissociationLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = DISSOCIATION_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / DISSOCIATION_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < DISSOCIATION_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateDissociationScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🌫️ Somatic Dissociation & DPDR Screener:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Depersonalization: ${result.subscales.depersonalization.percentage}%
• Derealization: ${result.subscales.derealization.percentage}%
• Absorption & Numbing: ${result.subscales.absorption.percentage}%

Somatic Drill:
"${result.profile.somaticReconnection[lang][0]}"

Screen your dissociation level free at: https://www.nuju.app/quiz/dissociation`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes disosiasi berhasil disalin!"
          : "Dissociation results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<DissociationLang, string> = {
    en: "Somatic Dissociation & DPDR Test: Free Clinical Screener | Ju",
    id: "Tes Disosiasi & Derealisasi (DPDR) Online Gratis | Ju",
    de: "Dissoziation & Depersonalisation Test: Kostenloser Screener | Ju",
    fr: "Test Dissociation et Dépersonnalisation (DP/DR) Gratuit | Ju",
    es: "Test de Disociación y Despersonalización Gratis Online | Ju",
  };

  const metaDescriptions: Record<DissociationLang, string> = {
    en: "Assess depersonalization, derealization, and emotional numbing with our 12-item screener based on the DES-II and Dr. Bessel van der Kolk's somatic trauma framework.",
    id: "Ukur tingkat depersonalisasi, derealisasi, dan mati rasa emosional dengan 12 pertanyaan berbasis skala DES-II dan kerangka trauma somatik Dr. Bessel van der Kolk.",
    de: "Messen Sie Depersonalisation, Derealisation und emotionales Taubheitsgefühl nach DES-II und Dr. Bessel van der Kolk. 12 Fragen mit somatischen Erdungsübungen.",
    fr: "Évaluez vos épisodes de dépersonnalisation, déréalisation et anesthésie émotionnelle selon l'échelle DES-II et les travaux du Dr Bessel van der Kolk.",
    es: "Mida la despersonalización, desrealización y anestesia emocional con este test de 12 preguntas basado en la escala DES-II y el Dr. Bessel van der Kolk.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/dissociation"
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

      <div className="min-h-screen bg-[#06040A] text-slate-100 flex flex-col selection:bg-violet-500 selection:text-white relative overflow-hidden">
        {/* Mystical Ethereal Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-950/25 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-purple-950/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

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
            <div className="flex items-center gap-1 bg-slate-900/80 border border-violet-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as DissociationLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
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
            <AdSenseBanner slot="dissociation-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="flex-1 flex flex-col justify-center">
              {/* Progress Header */}
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-violet-400 font-bold uppercase tracking-wider">
                    <Anchor className="w-4 h-4" />
                    <span>DES-II & Somatic Trauma Scale</span>
                  </span>
                  <span>
                    {currentIndex + 1} / {DISSOCIATION_QUESTIONS.length}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-violet-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"
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
                  className="rounded-3xl bg-slate-900/80 border border-violet-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider border border-violet-500/20">
                    {currentQ.dimension === "depersonalization" && (lang === "id" ? "Depersonalisasi (Terputus dari Tubuh)" : "Depersonalization (Detached Self)")}
                    {currentQ.dimension === "derealization" && (lang === "id" ? "Derealisasi (Lingkungan Seperti Mimpi)" : "Derealization (Surreal Environment)")}
                    {currentQ.dimension === "absorption" && (lang === "id" ? "Absorpsi & Mati Rasa Emosional" : "Absorption & Emotional Numbing")}
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid gap-3 pt-2">
                    {DISSOCIATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="w-full text-left p-4 sm:p-4.5 rounded-2xl bg-white/[0.03] hover:bg-violet-600/15 border border-white/5 hover:border-violet-500/40 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center justify-between group"
                      >
                        <span>{opt.label[lang]}</span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 transition-transform group-hover:translate-x-1 shrink-0" />
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
                        <span>{lang === "id" ? "Kembali ke pertanyaan sebelumnya" : "Previous question"}</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* AdSense Mid Banner */}
              <div className="mt-8">
                <AdSenseBanner slot="dissociation-mid" format="auto" />
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
                {/* Result Hero Card */}
                <div className="rounded-3xl bg-slate-900/90 border border-violet-500/30 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-violet-500/15 text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-500/30">
                      {result.profile.badge[lang]}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {lang === "id" ? "Skor Disosiasi: " : "Dissociation Index: "}
                      <strong className="text-white">{result.totalScore} / {result.maxScore} ({result.percentage}%)</strong>
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                    {result.profile.title[lang]}
                  </h1>

                  <p className="text-base sm:text-lg italic text-violet-200/90 mb-6">
                    &ldquo;{result.profile.tagline[lang]}&rdquo;
                  </p>

                  {/* 3 Pillar Progress Bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-violet-300 uppercase">
                        {lang === "id" ? "Depersonalisasi" : "Depersonalization"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {result.subscales.depersonalization.percentage}%
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-400 rounded-full"
                          style={{ width: `${Math.max(result.subscales.depersonalization.percentage, 5)}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-purple-300 uppercase">
                        {lang === "id" ? "Derealisasi" : "Derealization"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {result.subscales.derealization.percentage}%
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 rounded-full"
                          style={{ width: `${Math.max(result.subscales.derealization.percentage, 5)}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-indigo-300 uppercase">
                        {lang === "id" ? "Absorpsi & Baal" : "Absorption & Numbing"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {result.subscales.absorption.percentage}%
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400 rounded-full"
                          style={{ width: `${Math.max(result.subscales.absorption.percentage, 5)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scientific Evaluation */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-violet-400" />
                      <span>{lang === "id" ? "Diagnosis Neurobiologis Trauma Somatik" : "Somatic Neurobiology Evaluation"}</span>
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {result.profile.description[lang]}
                    </p>
                  </div>

                  {/* Somatic Re-connection Drills */}
                  <div className="p-6 rounded-2xl bg-violet-950/40 border border-violet-500/40 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span>
                        {lang === "id"
                          ? "Protokol Re-asosiasi Tubuh & Grounding Segera"
                          : "Immediate Somatic Re-embodiment Drills"}
                      </span>
                    </h3>
                    <ul className="space-y-2.5">
                      {result.profile.somaticReconnection[lang].map((drill, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-300 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{drill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions (Share, Copy, Retake) */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-lg shadow-violet-600/30 active:scale-[0.98]"
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
                  <AdSenseBanner slot="dissociation-result" format="auto" />
                </div>

                {/* Recommended Neuro-Somatic Tools */}
                <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>{lang === "id" ? "Langkah Pemulihan Sensorik Rekomendasi" : "Recommended Somatic Anchors"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "id"
                      ? "Latih Hadir Kembali ke Tubuh Anda Secara Lembut"
                      : "Gently Anchor Your Sensory Consciousness"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/tools/grounding"
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-violet-500/20 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                          5-4-3-2-1 Sensory Grounding Lab
                        </h4>
                        <p className="text-xs text-slate-400">Step-by-step interactive sensory anchor</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to="/tools/nsdr"
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-500/20 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          Stanford NSDR Audio Lab
                        </h4>
                        <p className="text-xs text-slate-400">Pure 6Hz Theta audio & body scan</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* App CTA */}
                <AppStoreCta />

                {/* Share Card Modal */}
                <DissociationShareCardModal
                  isOpen={isShareCardOpen}
                  onClose={() => setIsShareCardOpen(false)}
                  result={{
                    level: result.level,
                    profile: result.profile,
                    subscales: result.subscales,
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

export default DissociationScreenerTest;

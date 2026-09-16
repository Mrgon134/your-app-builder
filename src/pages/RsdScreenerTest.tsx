import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  HeartHandshake,
  RotateCcw,
  Copy,
  Sparkles,
  ChevronRight,
  Share2,
  Shield,
  Heart,
  Wind,
  Zap,
  Activity,
  AlertCircle,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  RSD_QUESTIONS,
  RSD_OPTIONS,
  calculateRsdScore,
  RsdLang,
} from "@/data/rsd-screener";
import RsdShareCardModal from "@/components/RsdShareCardModal";
import { toast } from "sonner";

interface RsdScreenerTestProps {
  defaultLang?: RsdLang;
}

const RsdScreenerTest: React.FC<RsdScreenerTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<RsdLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = RSD_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / RSD_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < RSD_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateRsdScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `💔 Rejection Sensitive Dysphoria (RSD) Screener:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Social Vigilance: ${result.subscales.vigilance.percentage}%
• Criticism Sensitivity: ${result.subscales.criticism.percentage}%
• Catastrophic Rumination: ${result.subscales.catastrophizing.percentage}%

De-escalation Drill:
"${result.profile.deescalationKit[lang][0]}"

Screen your rejection sensitivity free at: https://www.nuju.app/quiz/rsd`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes RSD berhasil disalin!"
          : "RSD assessment results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<RsdLang, string> = {
    en: "Rejection Sensitive Dysphoria (RSD) Test: Free Clinical Screener | Ju",
    id: "Tes Rejection Sensitive Dysphoria (RSD) Online Gratis | Ju",
    de: "Rejection Sensitive Dysphoria (RSD) Test: Kostenloser Screener | Ju",
    fr: "Test Dysphorie Sensible au Rejet (RSD) Gratuit en Ligne | Ju",
    es: "Test Disforia Sensible al Rechazo (RSD) Gratis Online | Ju",
  };

  const metaDescriptions: Record<RsdLang, string> = {
    en: "Assess rejection sensitivity, emotional dysregulation, and criticism vulnerability with our free 12-question screener based on Dr. William Dodson's ADHD & neurodivergent framework.",
    id: "Ukur sensitivitas penolakan, luka kritik, dan disregulasi emosional dengan tes gratis 12 pertanyaan berbasis model klinis Dr. William Dodson.",
    de: "Messen Sie Ihre Zurückweisungssensibilität und emotionale Reaktivität nach Dr. William Dodson. 12 wissenschaftliche Fragen mit somatischen Übungen.",
    fr: "Évaluez votre vulnérabilité au rejet et aux critiques avec notre test de 12 questions inspiré des travaux du Dr William Dodson.",
    es: "Mida su sensibilidad al rechazo, dolor ante la crítica y desregulación emocional con este test de 12 preguntas basado en el Dr. William Dodson.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/rsd"
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

      <div className="min-h-screen bg-[#0A0310] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-rose-950/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-pink-950/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[130px] pointer-events-none" />

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
            <div className="flex items-center gap-1 bg-slate-900/80 border border-rose-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as RsdLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
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
            <AdSenseBanner slot="rsd-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="flex-1 flex flex-col justify-center">
              {/* Progress Header */}
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Dr. William Dodson RSD Model</span>
                  </span>
                  <span>
                    {currentIndex + 1} / {RSD_QUESTIONS.length}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-rose-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
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
                  className="rounded-3xl bg-slate-900/80 border border-rose-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                    {currentQ.dimension === "vigilance" && (lang === "id" ? "Kewaspadaan Sosial" : "Social Vigilance")}
                    {currentQ.dimension === "criticism" && (lang === "id" ? "Sensitivitas Kritik" : "Criticism Sensitivity")}
                    {currentQ.dimension === "catastrophizing" && (lang === "id" ? "Ruminasi Katastropik" : "Catastrophic Rumination")}
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid gap-3 pt-2">
                    {RSD_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-rose-500/15 border border-white/5 hover:border-rose-500/40 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center justify-between group"
                      >
                        <span>{opt.label[lang]}</span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-rose-400 transition-transform group-hover:translate-x-1 shrink-0" />
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
                        <span>{lang === "id" ? "Kembali" : "Previous question"}</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* ================= COMPLETED RESULT ================= */
            result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Result Card */}
                <div className="rounded-3xl bg-slate-900/90 border border-rose-500/30 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
                    style={{ background: result.profile.color }}
                  />

                  {/* Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span
                      className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md"
                      style={{ background: result.profile.color }}
                    >
                      {result.profile.badge[lang]}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsShareCardOpen(true)}
                        className="px-4 py-1.5 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{lang === "id" ? "Buat Story IG" : "Story Card (1080x1350)"}</span>
                      </button>

                      <button
                        onClick={copyResults}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                        title={lang === "id" ? "Salin Hasil" : "Copy Results"}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                    {result.profile.title[lang]}
                  </h2>

                  <p className="text-base text-rose-300/90 font-serif italic mb-6">
                    &ldquo;{result.profile.tagline[lang]}&rdquo;
                  </p>

                  {/* Score Metre */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        {lang === "id" ? "Total Skor RSD" : "Total RSD Score"}
                      </div>
                      <div className="text-3xl font-black text-white font-mono mt-0.5">
                        {result.totalScore}{" "}
                        <span className="text-sm font-normal text-slate-400">
                          / {result.maxScore} ({result.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-slate-950"
                      style={{ background: result.profile.color }}
                    >
                      {result.percentage}%
                    </div>
                  </div>

                  {/* 3 Pillar Breakdown */}
                  <div className="grid sm:grid-cols-3 gap-3 mb-8">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                        {lang === "id" ? "Kewaspadaan Sosial" : "Social Vigilance"}
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.subscales.vigilance.percentage}%
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full"
                          style={{ width: `${result.subscales.vigilance.percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {lang === "id" ? "Membaca nada chat & gesture" : "Scanning tone & micro-expressions"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                        {lang === "id" ? "Sensitivitas Kritik" : "Criticism Sensitivity"}
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.subscales.criticism.percentage}%
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-500 rounded-full"
                          style={{ width: `${result.subscales.criticism.percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {lang === "id" ? "Rasa sakit fisik akibat teguran" : "Physical pain from evaluation"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                        {lang === "id" ? "Ruminasi Katastropik" : "Catastrophic Rumination"}
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.subscales.catastrophizing.percentage}%
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${result.subscales.catastrophizing.percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {lang === "id" ? "Memutar ulang rasa malu berhari-hari" : "Replaying awkwardness for days"}
                      </p>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{lang === "id" ? "Diagnosis Neurobiologis" : "Neurobiological Diagnosis"}</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {result.profile.description[lang]}
                    </p>
                  </div>

                  {/* De-escalation Protocol Box */}
                  <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3 mb-6">
                    <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <span>{lang === "id" ? "Protokol Pemulihan Somatik Instan" : "Immediate De-escalation Rituals"}</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {result.profile.deescalationKit[lang].map((kit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold shrink-0">•</span>
                          <span>{kit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/30"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{lang === "id" ? "Unduh Kartu Instagram Story" : "Download 1080x1350 Story Graphic"}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm border border-white/10 flex items-center gap-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{lang === "id" ? "Ulangi Tes" : "Retake Screener"}</span>
                    </button>
                  </div>
                </div>

                {/* AdSense Mid Banner */}
                <div className="my-6">
                  <AdSenseBanner slot="rsd-mid" format="auto" />
                </div>

                {/* Cross-linking Somatic Tools */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span>
                      {lang === "id"
                        ? "Alat Somatik Penenang Disregulasi Emosi"
                        : "Somatic Labs Tailored for Emotional Dysregulation"}
                    </span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link
                      to="/tools/bilateral"
                      className="p-4 rounded-2xl bg-card/60 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-purple-400 transition-colors">
                          EMDR Bilateral Tapping Lab
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Discharge the acute somatic panic of perceived rejection.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/tools/grounding"
                      className="p-4 rounded-2xl bg-card/60 border border-teal-500/20 hover:border-teal-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-teal-400 transition-colors">
                          5-4-3-2-1 Sensory Grounding
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Anchor catastrophic rumination back into present reality.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* AdSense Result Banner */}
                <div className="my-6">
                  <AdSenseBanner slot="rsd-result" format="auto" />
                </div>

                {/* App CTA */}
                <AppStoreCta />
              </motion.div>
            )
          )}
        </div>

        {/* Story Card Modal */}
        {result && (
          <RsdShareCardModal
            isOpen={isShareCardOpen}
            onClose={() => setIsShareCardOpen(false)}
            result={result}
            lang={lang}
          />
        )}
      </div>
    </>
  );
};

export default RsdScreenerTest;

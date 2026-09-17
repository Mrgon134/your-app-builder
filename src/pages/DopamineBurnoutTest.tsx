import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Zap,
  RotateCcw,
  Copy,
  Sparkles,
  ChevronRight,
  Share2,
  Brain,
  Monitor,
  BatteryLow,
  Wifi,
  AlertCircle,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  DOPAMINE_BURNOUT_QUESTIONS,
  DOPAMINE_BURNOUT_OPTIONS,
  calculateDopamineBurnoutScore,
  DopamineBurnoutLang,
} from "@/data/dopamine-burnout";
import DopamineBurnoutShareCardModal from "@/components/DopamineBurnoutShareCardModal";
import { toast } from "sonner";

interface DopamineBurnoutTestProps {
  defaultLang?: DopamineBurnoutLang;
}

const DopamineBurnoutTest: React.FC<DopamineBurnoutTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<DopamineBurnoutLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = DOPAMINE_BURNOUT_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / DOPAMINE_BURNOUT_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < DOPAMINE_BURNOUT_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateDopamineBurnoutScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `⚡ Dopamine Burnout & Digital Overstimulation Screener:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Anhedonia / Pleasure Flatline: ${result.subscales.anhedonia.percentage}%
• Compulsive Digital Tunnelling: ${result.subscales.compulsive_tunnelling.percentage}%
• Restless Withdrawal / Neurochemical Debt: ${result.subscales.restless_withdrawal.percentage}%

Recovery Protocol:
"${result.profile.recoveryProtocol[lang][0]}"

Screen your dopamine burnout level free at: https://www.nuju.app/quiz/dopamine-burnout`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes kejenuhan dopamin berhasil disalin!"
          : "Dopamine burnout assessment results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<DopamineBurnoutLang, string> = {
    en: "Dopamine Burnout & Digital Overstimulation Test: Free Screener | Ju",
    id: "Tes Kejenuhan Dopamin & Overstimulasi Digital Gratis | Ju",
    de: "Dopamin-Burnout & Digitale Überstimulation: Kostenloser Test | Ju",
    fr: "Test d'Épuisement Dopaminergique & Surstimulation Numérique | Ju",
    es: "Test de Agotamiento Dopamínico y Sobreestimulación Digital | Ju",
  };

  const metaDescriptions: Record<DopamineBurnoutLang, string> = {
    en: "Assess your dopamine receptor desensitization, digital addiction severity, and neurochemical exhaustion with our free 12-question clinical screener.",
    id: "Ukur desensitisasi reseptor dopamin, kecanduan digital, dan kelelahan neurokimia Anda dengan tes klinis gratis 12 pertanyaan.",
    de: "Messen Sie Ihre Dopaminrezeptor-Desensibilisierung und digitale Suchtintensität mit unserem kostenlosen 12-Fragen-Screener.",
    fr: "Évaluez votre désensibilisation dopaminergique et votre niveau d'addiction numérique avec notre test clinique gratuit de 12 questions.",
    es: "Evalúe la desensibilización de sus receptores de dopamina y la severidad de su adicción digital con nuestro test clínico gratuito.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/dopamine-burnout"
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

      <div className="min-h-screen bg-[#060610] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-950/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-violet-950/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[130px] pointer-events-none" />

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
            <div className="flex items-center gap-1 bg-slate-900/80 border border-cyan-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as DopamineBurnoutLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
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
            <AdSenseBanner slot="dopamine-burnout-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="flex-1 flex flex-col justify-center">
              {/* Progress Header */}
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Dopamine Receptor Sensitivity Model</span>
                  </span>
                  <span>
                    {currentIndex + 1} / {DOPAMINE_BURNOUT_QUESTIONS.length}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
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
                  className="rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                    {currentQ.dimension === "anhedonia" && (lang === "id" ? "Anhedonia / Flatline Kesenangan" : "Anhedonia / Pleasure Flatline")}
                    {currentQ.dimension === "compulsive_tunnelling" && (lang === "id" ? "Tunnelling Digital Kompulsif" : "Compulsive Digital Tunnelling")}
                    {currentQ.dimension === "restless_withdrawal" && (lang === "id" ? "Withdrawal Gelisah / Hutang Neurokimia" : "Restless Withdrawal / Neurochemical Debt")}
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid gap-3 pt-2">
                    {DOPAMINE_BURNOUT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/40 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center justify-between group"
                      >
                        <span>{opt.label[lang]}</span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1 shrink-0" />
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
                <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
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
                        className="px-4 py-1.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
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

                  <p className="text-base text-cyan-300/90 font-serif italic mb-6">
                    &ldquo;{result.profile.tagline[lang]}&rdquo;
                  </p>

                  {/* Score Metre */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        {lang === "id" ? "Total Skor Kejenuhan Dopamin" : "Total Dopamine Burnout Score"}
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
                      <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                        {lang === "id" ? "Anhedonia / Flatline" : "Anhedonia / Pleasure Flatline"}
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.subscales.anhedonia.percentage}%
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${result.subscales.anhedonia.percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {lang === "id" ? "Kemampuan merasakan kesenangan murni" : "Capacity for genuine pleasure"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                        {lang === "id" ? "Tunnelling Kompulsif" : "Compulsive Tunnelling"}
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.subscales.compulsive_tunnelling.percentage}%
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${result.subscales.compulsive_tunnelling.percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {lang === "id" ? "Kecanduan scroll & app-switching" : "Scroll addiction & app-switching"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        {lang === "id" ? "Withdrawal Gelisah" : "Restless Withdrawal"}
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.subscales.restless_withdrawal.percentage}%
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${result.subscales.restless_withdrawal.percentage}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {lang === "id" ? "Brain fog & ketidaknyamanan saat offline" : "Brain fog & offline discomfort"}
                      </p>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{lang === "id" ? "Diagnosis Neurokimia" : "Neurochemical Diagnosis"}</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {result.profile.description[lang]}
                    </p>
                  </div>

                  {/* Recovery Protocol Box */}
                  <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-3 mb-6">
                    <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>{lang === "id" ? "Protokol Pemulihan Reseptor Dopamin" : "Dopamine Receptor Recovery Protocol"}</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-200">
                      {result.profile.recoveryProtocol[lang].map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold shrink-0">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex-1 min-w-[200px] py-3.5 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/30"
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
                  <AdSenseBanner slot="dopamine-burnout-mid" format="auto" />
                </div>

                {/* Cross-linking Somatic Tools */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>
                      {lang === "id"
                        ? "Lab Somatik untuk Pemulihan Dopamin"
                        : "Somatic Labs Tailored for Dopamine Recovery"}
                    </span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link
                      to="/tools/breathwork"
                      className="p-4 rounded-2xl bg-card/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                          NSDR / Non-Sleep Deep Rest
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Reset dopamine baseline through yoga nidra protocols.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/tools/grounding"
                      className="p-4 rounded-2xl bg-card/60 border border-violet-500/20 hover:border-violet-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-violet-400 transition-colors">
                          Sensory Grounding Lab
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Reconnect with offline sensation to rebuild receptor sensitivity.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* AdSense Result Banner */}
                <div className="my-6">
                  <AdSenseBanner slot="dopamine-burnout-result" format="auto" />
                </div>

                {/* App CTA */}
                <AppStoreCta />
              </motion.div>
            )
          )}
        </div>

        {/* Story Card Modal */}
        {result && (
          <DopamineBurnoutShareCardModal
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

export default DopamineBurnoutTest;

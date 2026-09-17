import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Flame,
  RotateCcw,
  Copy,
  Sparkles,
  ChevronRight,
  Share2,
  Compass,
  AlertOctagon,
  Clock,
  Battery,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  PDA_QUESTIONS,
  PDA_OPTIONS,
  calculatePdaScore,
  PdaLang,
} from "@/data/pda-screener";
import { PdaShareCardModal } from "@/components/PdaShareCardModal";
import { toast } from "sonner";

interface PdaTestProps {
  defaultLang?: PdaLang;
}

const PdaTest: React.FC<PdaTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<PdaLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = PDA_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / PDA_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < PDA_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculatePdaScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `⚡ Pathological Demand Avoidance (PDA) Screener:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Autonomy Threat Panic: ${result.subscales.autonomy_threat_panic.percentage}%
• Internal Demand Paralysis: ${result.subscales.internal_demand_paralysis.percentage}%
• Social Masking & Deflection: ${result.subscales.social_masking_distraction.percentage}%

Recovery Protocol:
"${result.profile.recoveryProtocols[lang][0]}"

Screen your PDA demand avoidance free at: https://www.nuju.app/quiz/pda-demand-avoidance`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes PDA berhasil disalin!"
          : "PDA assessment results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<PdaLang, string> = {
    en: "Pathological Demand Avoidance (PDA) Test: Free Autonomy Screener | Nuju",
    id: "Tes PDA (Pathological Demand Avoidance) Online Gratis | Nuju",
    de: "Pathologische Anforderungsvermeidung (PDA) Test: Autonomie Screener kostenlos | Nuju",
    fr: "Test PDA (Besoin Pervasif d'Autonomie) : Évaluation en Ligne Gratuite | Nuju",
    es: "Test de Evitación Patológica de Demandas (PDA): Screener de Autonomía | Nuju",
  };

  const metaDescriptions: Record<PdaLang, string> = {
    en: "Take our free 12-item Pathological Demand Avoidance (PDA) / Pervasive Drive for Autonomy screener. Measure demand avoidance, internal task paralysis, and nervous system threat reactions.",
    id: "Ukur kecenderungan Pathological Demand Avoidance (PDA) dan alergi tuntutan pada otak neurodivergen dengan asesmen klinis 12 pertanyaan. Dilengkapi panduan gaya hidup low-demand.",
    de: "Kostenloser 12-Fragen-Screener zu Pathologischer Anforderungsvermeidung (PDA) bei Erwachsenen. Messen Sie Autonomie-Panik und deklarative Lösungswege.",
    fr: "Évaluez votre besoin pervasif d'autonomie (profil PDA) face aux contraintes du quotidien. Diagnostic gratuit et conseils de vie low demand.",
    es: "Descubre si tu resistencia a las exigencias corresponde al perfil PDA (Evitación Patológica de la Demanda). Test de 12 preguntas con pautas de lenguaje declarativo.",
  };

  const levelColorMap: Record<string, { badge: string; text: string; bg: string; border: string }> = {
    flexible_autonomy: {
      badge: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
      text: "text-emerald-700",
      bg: "from-emerald-500/10 to-transparent",
      border: "border-emerald-200",
    },
    mild_demand_sensitivity: {
      badge: "bg-teal-500/10 text-teal-800 border-teal-300",
      text: "text-teal-800",
      bg: "from-teal-500/10 to-transparent",
      border: "border-teal-200",
    },
    moderate_pda_profile: {
      badge: "bg-amber-500/10 text-amber-800 border-amber-300",
      text: "text-amber-800",
      bg: "from-amber-500/10 to-transparent",
      border: "border-amber-200",
    },
    severe_autonomy_burnout: {
      badge: "bg-red-900/15 text-red-900 border-red-300",
      text: "text-red-900",
      bg: "from-red-600/15 to-transparent",
      border: "border-red-300",
    },
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/pda-demand-avoidance"
      />

      <div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-white to-stone-50 text-neutral-900 py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/test-psikologi"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{lang === "id" ? "Semua Tes" : "All Screeners"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-full p-1 shadow-xs">
              {(["en", "id", "de", "fr", "es"] as PdaLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition uppercase ${
                    lang === l
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* AdSense Top Placement */}
          <div className="mb-6">
            <AdSenseBanner slot="pda-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* Active Quiz Question Card */
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-200">
                  <Flame className="h-3.5 w-3.5 text-teal-600" />
                  PERVASIVE DRIVE FOR AUTONOMY
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {currentIndex + 1} / {PDA_QUESTIONS.length}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mb-2">
                {lang === "id"
                  ? "Tes Pathological Demand Avoidance (PDA)"
                  : "Pathological Demand Avoidance (PDA) Screener"}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mb-6">
                {lang === "id"
                  ? "Pilihlah respon yang paling menggambarkan reaksi saraf dan tubuhmu saat menghadapi perintah atau tuntutan harian."
                  : "Select the option that most honestly reflects your autonomic reaction to daily demands and expectations."}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-100 rounded-full h-2 mb-8 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-teal-500 to-indigo-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question Statement */}
              <div className="min-h-[100px] mb-8 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentQ.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-base sm:text-lg font-bold text-neutral-800 leading-relaxed"
                  >
                    {currentQ.text[lang]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 mb-6">
                {PDA_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className="w-full text-left p-4 rounded-2xl border border-neutral-200 hover:border-teal-300 hover:bg-teal-50/50 transition font-semibold text-sm text-neutral-800 flex items-center justify-between group active:scale-[0.99]"
                  >
                    <span>{opt.label[lang]}</span>
                    <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-teal-500 transition" />
                  </button>
                ))}
              </div>

              {/* Previous Button */}
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 transition"
                >
                  ← {lang === "id" ? "Kembali ke soal sebelumnya" : "Previous question"}
                </button>
              )}
            </div>
          ) : result ? (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div
                className={`bg-white border ${
                  levelColorMap[result.level].border
                } rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden`}
              >
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${
                    levelColorMap[result.level].bg
                  } rounded-bl-full pointer-events-none`}
                />

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                      levelColorMap[result.level].badge
                    }`}
                  >
                    <AlertOctagon className="h-3.5 w-3.5" />
                    {result.profile.badge[lang].toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    SCORE: {result.totalScore} / {result.maxScore} ({result.percentage}%)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-2">
                  {result.profile.title[lang]}
                </h2>
                <p className="text-sm font-semibold text-teal-700 italic mb-4">
                  "{result.profile.tagline[lang]}"
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  {result.profile.description[lang]}
                </p>

                {/* Subscale Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {lang === "id" ? "Panik Ancaman Otonomi" : "Autonomy Threat"}
                    </span>
                    <span className="text-xl font-black text-teal-600">
                      {result.subscales.autonomy_threat_panic.percentage}%
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {lang === "id" ? "Respon Fight/Flight" : "Coercion Panic"}
                    </span>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {lang === "id" ? "Kelumpuhan Tuntutan Diri" : "Internal Paralysis"}
                    </span>
                    <span className="text-xl font-black text-indigo-600">
                      {result.subscales.internal_demand_paralysis.percentage}%
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {lang === "id" ? "Macet Perawatan Diri" : "Self-Care Freeze"}
                    </span>
                  </div>

                  <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                      {lang === "id" ? "Pengalihan & Masking" : "Masking & Deflection"}
                    </span>
                    <span className="text-xl font-black text-amber-600">
                      {result.subscales.social_masking_distraction.percentage}%
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {lang === "id" ? "Taktik Mengulur Waktu" : "Social Deflection"}
                    </span>
                  </div>
                </div>

                {/* Clinical Insight */}
                <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-4 mb-6">
                  <h4 className="text-xs font-bold text-teal-900 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                    {lang === "id" ? "Wawasan Neurobiologi PDA" : "Clinical Neurodiversity Insight"}
                  </h4>
                  <p className="text-xs text-teal-950/80 leading-relaxed">
                    {result.profile.clinicalInsight[lang]}
                  </p>
                </div>

                {/* Recovery Protocols */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-3">
                    {lang === "id" ? "Protokol Otonomi Rendah Tuntutan" : "Low-Demand Living Protocols"}
                  </h4>
                  <ul className="space-y-2">
                    {result.profile.recoveryProtocols[lang].map((step, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-neutral-700 flex items-start gap-2.5 bg-neutral-50 p-3 rounded-xl border border-neutral-100"
                      >
                        <span className="h-5 w-5 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AdSense Mid Placement */}
                <div className="my-6">
                  <AdSenseBanner slot="pda-mid" format="auto" />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{lang === "id" ? "Bagikan Kartu" : "Share Story Card"}</span>
                  </button>

                  <button
                    onClick={copyResults}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition"
                  >
                    <Copy className="h-4 w-4" />
                    <span>{lang === "id" ? "Salin Hasil" : "Copy Results"}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 font-semibold text-xs transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{lang === "id" ? "Ulangi Tes" : "Retake Screener"}</span>
                  </button>
                </div>
              </div>

              {/* Native App CTA */}
              <AppStoreCta source="pda_quiz" />

              {/* AdSense Result Placement */}
              <div className="mt-6">
                <AdSenseBanner slot="pda-result" format="auto" />
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>

      {result && (
        <PdaShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          result={result}
          lang={lang}
        />
      )}
    </>
  );
};

export default PdaTest;

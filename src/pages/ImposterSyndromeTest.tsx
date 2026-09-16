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
  Briefcase,
  Compass,
  ArrowRight,
  Award,
  Zap,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  IMPOSTER_QUESTIONS,
  IMPOSTER_OPTIONS,
  calculateImposterScore,
  ImposterLang,
} from "@/data/imposter-syndrome";
import { ImposterShareCardModal } from "@/components/ImposterShareCardModal";
import { toast } from "sonner";

interface ImposterSyndromeTestProps {
  defaultLang?: ImposterLang;
}

const ImposterSyndromeTest: React.FC<ImposterSyndromeTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<ImposterLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = IMPOSTER_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / IMPOSTER_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < IMPOSTER_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateImposterScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🎭 Clance Imposter Syndrome Diagnostic:
Dominant Archetype: ${result.dominantArchetype.name[lang]} (${result.profile.title[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Fraud Terror: ${result.subscales.fraud_terror.percentage}%
• Luck Attribution: ${result.subscales.luck_attribution.percentage}%
• Overworking Exhaustion: ${result.subscales.overworking.percentage}%

Cognitive Mantra:
"${result.dominantArchetype.mantra[lang]}"

Diagnose your imposter syndrome free at: https://www.nuju.app/quiz/imposter-syndrome`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes sindrom imposter berhasil disalin!"
          : "Imposter syndrome results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<ImposterLang, string> = {
    en: "Imposter Syndrome Test: Free Clance CIPS Archetype Diagnostic | Ju",
    id: "Tes Imposter Syndrome & Rasa Takut Ketahuan (Clance CIPS) | Ju",
    de: "Imposter-Syndrom Test: Kostenloser Clance CIPS Selbsttest | Ju",
    fr: "Test Syndrome de l'Imposteur Gratuit en Ligne (Échelle CIPS) | Ju",
    es: "Test Síndrome del Impostor Gratis Online (Escala CIPS) | Ju",
  };

  const metaDescriptions: Record<ImposterLang, string> = {
    en: "Diagnose your imposter syndrome archetype (Perfectionist, Superhero, Natural Genius, Soloist, Expert) based on Dr. Pauline Clance's CIPS model with evidence-based reframing drills.",
    id: "Ukur sindrom imposter dan rasa takut dianggap penipu dengan tes 12 pertanyaan berbasis skala Clance CIPS. Kenali 5 arketipe imposter dan dapatkan latihan internalisasi prestasi.",
    de: "Finden Sie Ihren Imposter-Archetyp (Perfektionist, Superheld, Naturtalent, Einzelkämpfer, Experte) nach Dr. Pauline Clance mit konkreten Coaching-Tools.",
    fr: "Identifiez votre profil d'imposteur selon l'échelle CIPS du Dr Pauline Clance et découvrez comment vous réapproprier légitimement vos réussites.",
    es: "Descubra su arquetipo del síndrome del impostor según la escala CIPS de la Dra. Pauline Clance con ejercicios cognitivos de internalización de logros.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/imposter-syndrome"
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

      <div className="min-h-screen bg-[#090A10] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-white relative overflow-hidden">
        {/* Warm Golden / Amber Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-950/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-orange-950/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-yellow-950/15 rounded-full blur-[140px] pointer-events-none" />

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
            <div className="flex items-center gap-1 bg-slate-900/80 border border-amber-500/20 rounded-full p-1 text-xs">
              {(["en", "id", "de", "fr", "es"] as ImposterLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
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
            <AdSenseBanner slot="imposter-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="flex-1 flex flex-col justify-center">
              {/* Progress Header */}
              <div className="space-y-2 mb-8 text-center sm:text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Dr. Pauline Clance CIPS Model</span>
                  </span>
                  <span>
                    {currentIndex + 1} / {IMPOSTER_QUESTIONS.length}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-amber-500/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500"
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
                  className="rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-6"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
                    {currentQ.dimension === "fraud_terror" && (lang === "id" ? "Ketakutan Ketahuan (Fraud Terror)" : "Fraud Terror & Exposure Fear")}
                    {currentQ.dimension === "luck_attribution" && (lang === "id" ? "Atribusi Keberuntungan (Meremehkan Prestasi)" : "Luck Attribution (Discounting Skill)")}
                    {currentQ.dimension === "overworking" && (lang === "id" ? "Lembur Berlebihan & Prokrastinasi" : "Overworking & Perfectionism")}
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid gap-3 pt-2">
                    {IMPOSTER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="w-full text-left p-4 sm:p-4.5 rounded-2xl bg-white/[0.03] hover:bg-amber-600/15 border border-white/5 hover:border-amber-500/40 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all flex items-center justify-between group"
                      >
                        <span>{opt.label[lang]}</span>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1 shrink-0" />
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
                <AdSenseBanner slot="imposter-mid" format="auto" />
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
                <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                      {result.profile.badge[lang]}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {lang === "id" ? "Skor CIPS: " : "CIPS Imposter Index: "}
                      <strong className="text-white">{result.totalScore} / {result.maxScore} ({result.percentage}%)</strong>
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                    {result.profile.title[lang]}
                  </h1>

                  {/* Dominant Archetype Badge */}
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 my-5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        {lang === "id" ? "Arketipe Imposter Dominan Anda:" : "Your Dominant Imposter Archetype:"}
                      </span>
                      <div className="text-lg sm:text-xl font-black text-amber-200">
                        {result.dominantArchetype.name[lang]}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {result.dominantArchetype.tagline[lang]}
                      </div>
                    </div>
                    <Flame className="w-8 h-8 text-amber-400 shrink-0" />
                  </div>

                  {/* 3 Pillar Progress Bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-amber-300 uppercase">
                        {lang === "id" ? "Ketakutan Ketahuan" : "Fraud Exposure"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {result.subscales.fraud_terror.percentage}%
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${Math.max(result.subscales.fraud_terror.percentage, 5)}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-yellow-300 uppercase">
                        {lang === "id" ? "Meremehkan Prestasi" : "Luck Attribution"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {result.subscales.luck_attribution.percentage}%
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${Math.max(result.subscales.luck_attribution.percentage, 5)}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-orange-300 uppercase">
                        {lang === "id" ? "Lembur Berlebihan" : "Overworking"}
                      </span>
                      <div className="text-2xl font-black text-white">
                        {result.subscales.overworking.percentage}%
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full"
                          style={{ width: `${Math.max(result.subscales.overworking.percentage, 5)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cognitive Evidence-Based Mantra */}
                  <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{lang === "id" ? "Mantra Restrukturisasi Kognitif" : "Cognitive Reframing Mantra"}</span>
                    </h3>
                    <p className="text-base sm:text-lg font-bold italic text-amber-100">
                      &ldquo;{result.dominantArchetype.mantra[lang]}&rdquo;
                    </p>
                  </div>

                  {/* Clinical Description */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-amber-400" />
                      <span>{lang === "id" ? "Evaluasi Psikologis Clance CIPS" : "Clinical Psychological Evaluation"}</span>
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {result.profile.description[lang]}
                    </p>
                  </div>

                  {/* Success Internalization Drills */}
                  <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>
                        {lang === "id"
                          ? "Latihan Menginternalisasi Keberhasilan Sendiri"
                          : "Actionable Success Internalization Drills"}
                      </span>
                    </h3>
                    <ul className="space-y-2.5">
                      {result.profile.internalizationDrill[lang].map((drill, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
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
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm transition-all shadow-lg shadow-amber-600/30 active:scale-[0.98]"
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
                  <AdSenseBanner slot="imposter-result" format="auto" />
                </div>

                {/* Related Assessments */}
                <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>{lang === "id" ? "Langkah Lanjutan Pemulihan Performa" : "Pair With Clinical Assessments"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === "id"
                      ? "Cegah Burnout & Kenali Pola Pikir Anda"
                      : "Prevent Burnout & Reframe Automatic Negative Loops"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/quiz/burnout"
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-orange-500/20 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-orange-300 transition-colors">
                          Workplace Burnout Screener
                        </h4>
                        <p className="text-xs text-slate-400">Maslach MBI emotional exhaustion</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to="/quiz/cognitive-distortions"
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-indigo-500/20 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                          Cognitive Distortions Test
                        </h4>
                        <p className="text-xs text-slate-400">Spot catastrophizing & irrational ANTs</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* App Store CTA */}
                <AppStoreCta />

                {/* Share Card Modal */}
                <ImposterShareCardModal
                  isOpen={isShareCardOpen}
                  onClose={() => setIsShareCardOpen(false)}
                  result={{
                    level: result.level,
                    profile: result.profile,
                    dominantArchetype: result.dominantArchetype,
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

export default ImposterSyndromeTest;

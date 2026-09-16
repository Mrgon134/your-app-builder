import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  RotateCcw,
  Copy,
  Sparkles,
  ChevronRight,
  Share2,
  Shield,
  Heart,
  Wind,
  Flame,
  Snowflake,
  Headphones,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  VAGAL_QUESTIONS,
  calculateVagalScore,
  VagalLang,
  VagalDimension,
} from "@/data/nervous-system";
import NervousSystemShareCardModal from "@/components/NervousSystemShareCardModal";
import { toast } from "sonner";

interface NervousSystemTestProps {
  defaultLang?: VagalLang;
}

const NervousSystemTest: React.FC<NervousSystemTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<VagalLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, VagalDimension>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = VAGAL_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / VAGAL_QUESTIONS.length) * 100
  );

  const handleSelectOption = (state: VagalDimension) => {
    const updated = { ...answers, [currentQ.id]: state };
    setAnswers(updated);

    if (currentIndex < VAGAL_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateVagalScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🫀 Polyvagal Nervous System State Result:
State: ${result.profile.title[lang]} (${result.profile.badge[lang]})
• Ventral Vagal (Safety): ${result.percentages.ventral}%
• Sympathetic (Fight/Flight): ${result.percentages.sympathetic}%
• Dorsal Vagal (Freeze/Shutdown): ${result.percentages.dorsal}%

Immediate Regulation Drill:
"${result.profile.regulationDrill[lang]}"

Check your nervous system state free at: https://www.nuju.app/quiz/nervous-system`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes status sistem saraf berhasil disalin!"
          : "Nervous system results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<VagalLang, string> = {
    en: "Nervous System State Test | Free Polyvagal Fight, Flight, Freeze Screener",
    id: "Tes Status Sistem Saraf Polivagal | Cek Fight, Flight, atau Freeze Gratis",
    de: "Nervensystem Test Deutsch | Polyvagaltheorie: Kampf, Flucht oder Starre",
    fr: "Test Système Nerveux Polyvagal Gratuit | Combat, Fuite ou Figement",
    es: "Test del Sistema Nervioso Polivagal | Lucha, Huida o Congelación Gratis",
  };

  const metaDescriptions: Record<VagalLang, string> = {
    en: "Assess your autonomic nervous system state right now based on Dr. Stephen Porges' Polyvagal Theory. Determine whether you are in Ventral Safety, Sympathetic Fight/Flight, or Dorsal Freeze.",
    id: "Uji status sistem saraf otonom Anda saat ini berdasarkan Teori Polivagal Dr. Stephen Porges. Ketahui apakah Anda berada dalam zona Ventral Aman, Simpatik Panik, atau Dorsal Freeze.",
    de: "Ermittle deinen aktuellen Zustand im Nervensystem nach der Polyvagal-Theorie von Dr. Stephen Porges. Mit konkreten somatischen Regulierungsübungen.",
    fr: "Identifiez l'état de votre système nerveux autonome selon la théorie polyvagale du Dr Stephen Porges : sécurité ventrale, alerte sympathique ou figement dorsal.",
    es: "Evalúa el estado de tu sistema nervioso autónomo según la Teoría Polivagal del Dr. Stephen Porges. Descubre si estás en calma ventral, alerta simpática o bloqueo dorsal.",
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: metaTitles[lang],
    description: metaDescriptions[lang],
    educationalLevel: "All",
    hasPart: VAGAL_QUESTIONS.map((q) => ({
      "@type": "Question",
      name: q.text[lang],
      suggestedAnswer: q.options.map((opt) => ({
        "@type": "Answer",
        text: opt.text[lang],
      })),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Polyvagal Theory by Dr. Stephen Porges?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Polyvagal Theory explains how the autonomic nervous system navigates risk and safety through three evolutionary circuits: Ventral Vagal (social engagement and calm), Sympathetic (mobilized fight-or-flight), and Dorsal Vagal (immobilization, freeze, and shutdown).",
        },
      },
      {
        "@type": "Question",
        name: "How can I shift out of a freeze or panic state?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You cannot reason your way out of autonomic dysregulation with logic alone. Somatic inputs such as the Stanford Physiological Sigh, bilateral stimulation, tactile grounding, and humming phonation directly signal safety to the vagus nerve.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        keywords={[
          "nervous system test",
          "polyvagal theory quiz",
          "fight flight freeze test",
          "dorsal vagal shutdown test",
          "tes sistem saraf polivagal",
          "nervensystem test deutsch",
          "test système nerveux polyvagal",
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 md:py-12 selection:bg-emerald-500/20">
        <div className="w-full max-w-2xl">
          {/* Top Nav */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "id" ? "Semua Tes" : "All Quizzes"}</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/40 backdrop-blur-sm text-xs font-semibold">
              {(["en", "id", "de", "fr", "es"] as VagalLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                    lang === l
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "en"
                    ? "EN 🇬🇧"
                    : l === "id"
                    ? "ID 🇮🇩"
                    : l === "de"
                    ? "DE 🇩🇪"
                    : l === "fr"
                    ? "FR 🇫🇷"
                    : "ES 🇪🇸"}
                </button>
              ))}
            </div>
          </div>

          {/* AdSense Top Banner */}
          <div className="mb-6">
            <AdSenseBanner slot="nervous-system-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>
                    {lang === "id"
                      ? `Indikator Somatik ${currentIndex + 1} dari ${VAGAL_QUESTIONS.length}`
                      : `Somatic Indicator ${currentIndex + 1} of ${VAGAL_QUESTIONS.length}`}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-indigo-500 rounded-full"
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
                  className="p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-emerald-500/20 shadow-xl shadow-emerald-950/15 space-y-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>
                        {lang === "id"
                          ? "Pemindaian Saraf Real-Time"
                          : "Real-Time Autonomic Scan"}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-foreground">
                    {currentQ.text[lang]}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options.map((opt, i) => {
                      const isSelected = answers[currentQ.id] === opt.state;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt.state)}
                          className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-start justify-between gap-3 border ${
                            isSelected
                              ? "bg-emerald-500/15 border-emerald-500/50 text-foreground shadow-sm"
                              : "bg-muted/15 border-border/40 hover:bg-muted/30 hover:border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="text-sm md:text-base leading-relaxed">
                            {opt.text[lang]}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                              isSelected
                                ? "text-emerald-400 translate-x-1"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Back button */}
                  {currentIndex > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={handlePrevious}
                        className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← {lang === "id" ? "Kembali" : "Previous Indicator"}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mid banner */}
              <div className="pt-4">
                <AdSenseBanner slot="nervous-system-mid" format="auto" />
              </div>
            </div>
          ) : (
            /* ================= RESULT SCREEN ================= */
            result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Result Card */}
                <div className="p-6 md:p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/20 space-y-6 relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-20"
                    style={{ backgroundColor: result.profile.color }}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                        {result.profile.badge[lang]}
                      </span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      Polyvagal Theory Model
                    </span>
                  </div>

                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                      {result.profile.title[lang]}
                    </h1>
                    <p className="text-sm md:text-base font-medium mt-2 leading-relaxed text-emerald-300/90 italic">
                      "{result.profile.tagline[lang]}"
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {result.profile.description[lang]}
                  </p>

                  {/* 3 Zones Progress Bars */}
                  <div className="p-4 md:p-5 rounded-2xl bg-muted/20 border border-border/40 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "id"
                        ? "Distribusi Sistem Saraf Anda"
                        : "Autonomic Nervous System Distribution"}
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Ventral Vagal (Safety & Social Calm)</span>
                          </span>
                          <span className="text-emerald-400">
                            {result.percentages.ventral}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.ventral}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-amber-400" />
                            <span>Sympathetic (Fight-or-Flight / Anxiety)</span>
                          </span>
                          <span className="text-amber-400">
                            {result.percentages.sympathetic}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.sympathetic}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center gap-1.5">
                            <Snowflake className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Dorsal Vagal (Freeze / Shutdown / Numb)</span>
                          </span>
                          <span className="text-indigo-400">
                            {result.percentages.dorsal}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.dorsal}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Somatic Symptoms List */}
                  <div className="p-4 rounded-2xl bg-card/40 border border-border/40 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "id"
                        ? "Sinyal Somatik yang Teramati"
                        : "Observed Somatic Markers"}
                    </h4>
                    <ul className="space-y-1.5 text-xs md:text-sm text-foreground/90 list-disc pl-4 leading-relaxed">
                      {result.profile.somaticSymptoms[lang].map((sym, i) => (
                        <li key={i}>{sym}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Immediate Regulation Drill Box */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Shield className="w-4 h-4" />
                      <span>
                        {lang === "id"
                          ? "Latihan Regulasi Somatik Seketika"
                          : "Immediate Somatic Regulation Drill"}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-medium">
                      {result.profile.regulationDrill[lang]}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/40">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>
                        {lang === "id"
                          ? "Download Kartu Story (1080x1350)"
                          : "Share Story Card"}
                      </span>
                    </button>

                    <button
                      onClick={copyResults}
                      className="py-3 px-4 rounded-xl bg-muted/40 hover:bg-muted/70 text-foreground font-semibold text-sm border border-border/50 flex items-center gap-2 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-muted-foreground" />
                      <span>{lang === "id" ? "Salin Hasil" : "Copy"}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="py-3 px-4 rounded-xl bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground text-sm border border-border/30 flex items-center gap-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{lang === "id" ? "Ulangi" : "Retake"}</span>
                    </button>
                  </div>
                </div>

                {/* AdSense Result Slot */}
                <AdSenseBanner slot="nervous-system-result" format="auto" />

                {/* Targeted Somatic Tool Routing */}
                <div className="p-6 rounded-3xl bg-muted/20 border border-border/40 space-y-4">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>
                      {lang === "id"
                        ? "Alat Somatik Khusus Status Saraf Anda"
                        : "Tools Tailored for Your Nervous State"}
                    </span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
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
                          Gentle tactile & audio anchors for freeze and dissociation.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/tools/bilateral"
                      className="p-4 rounded-2xl bg-card/60 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-purple-400 transition-colors">
                          EMDR Bilateral Lab
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Dual-attention audio & visual pacer to discharge fight-or-flight.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* App CTA */}
                <AppStoreCta />
              </motion.div>
            )
          )}
        </div>

        {/* Story Card Modal */}
        {result && (
          <NervousSystemShareCardModal
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

export default NervousSystemTest;

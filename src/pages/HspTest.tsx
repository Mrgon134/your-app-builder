import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Feather,
  RotateCcw,
  Copy,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Share2,
  Shield,
  Headphones,
  Eye,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  HSP_QUESTIONS,
  HSP_OPTIONS,
  calculateHspScore,
  HspLang,
} from "@/data/hsp";
import HspShareCardModal from "@/components/HspShareCardModal";
import { toast } from "sonner";

interface HspTestProps {
  defaultLang?: HspLang;
}

const HspTest: React.FC<HspTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<HspLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = HSP_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / HSP_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < HSP_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateHspScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🧠 Highly Sensitive Person (HSP) Screener Result:
Level: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore}
• Sensory Overload Sensitivity: ${result.percentages.sensory}%
• Emotional Empathy & Absorption: ${result.percentages.empathy}%
• Subtle Environmental Perception: ${result.percentages.subtlety}%

Take the test at: https://www.nuju.app/quiz/hsp`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes berhasil disalin ke clipboard!"
          : "Results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<HspLang, string> = {
    en: "Highly Sensitive Person (HSP) Test | Free Sensory Overload Screener",
    id: "Tes HSP Indonesia | Tes Orang Sangat Sensitif & Sensory Overload Gratis",
    de: "HSP Test Deutsch | Hochsensibilität & Reizüberflutung Fragebogen",
    fr: "Test Hypersensibilité Gratuit | Êtes-vous une Personne Hautement Sensible ?",
    es: "Test PAS Online Gratis | Persona Altamente Sensible & Sobrecarga Sensorial",
  };

  const metaDescriptions: Record<HspLang, string> = {
    en: "Clinically adapted 15-question Highly Sensitive Person (HSP) test based on Dr. Elaine Aron's DOESTM model. Assess sensory overload, empathy depth, and subtle perception.",
    id: "Tes 15 pertanyaan Highly Sensitive Person (HSP) berdasarkan riset Dr. Elaine Aron. Ukur sensory overload, kedalaman empati, dan sensitivitas sistem saraf Anda.",
    de: "Wissenschaftlich fundierter HSP-Selbsttest nach Dr. Elaine Aron. Erfahre deinen Grad an Hochsensibilität, Reizüberflutung und intuitiver Empathie.",
    fr: "Évaluez votre niveau de sensibilité et de saturation sensorielle avec ce test HSP inspiré des travaux de la Dre Elaine Aron. 15 questions rapides.",
    es: "Descubre si eres una Persona Altamente Sensible (PAS) con este test clínico de 15 preguntas basado en el modelo de la Dra. Elaine Aron.",
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: metaTitles[lang],
    description: metaDescriptions[lang],
    educationalLevel: "All",
    hasPart: HSP_QUESTIONS.map((q) => ({
      "@type": "Question",
      name: q.text[lang],
      suggestedAnswer: HSP_OPTIONS.map((opt) => ({
        "@type": "Answer",
        text: opt.label[lang],
      })),
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Highly Sensitive Person (HSP)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Highly Sensitive Person (HSP) has a genetically determined trait called Sensory Processing Sensitivity (SPS), identified by Dr. Elaine Aron. Approximately 20% of the global population processes sensory data, emotions, and environmental cues much more deeply than average.",
        },
      },
      {
        "@type": "Question",
        name: "Is High Sensitivity a mental illness or disorder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. High sensitivity is an innate, evolutionarily conserved neurological trait, not a pathology. However, without intentional boundaries and sensory management, HSPs are more vulnerable to burnout, anxiety, and sensory overload.",
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
          "hsp test",
          "highly sensitive person test",
          "sensory overload quiz",
          "tes hsp indonesia",
          "hochsensibilität test",
          "test hypersensibilité gratuit",
          "test persona altamente sensible",
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

      <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 md:py-12 selection:bg-pink-500/20">
        <div className="w-full max-w-2xl">
          {/* Top Header / Nav */}
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
              {(["en", "id", "de", "fr", "es"] as HspLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                    lang === l
                      ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
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
            <AdSenseBanner slot="hsp-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>
                    {lang === "id"
                      ? `Pertanyaan ${currentIndex + 1} dari ${HSP_QUESTIONS.length}`
                      : `Question ${currentIndex + 1} of ${HSP_QUESTIONS.length}`}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 rounded-full"
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
                  className="p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-pink-500/20 shadow-xl shadow-pink-950/10 space-y-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      {currentQ.dimension === "sensory"
                        ? lang === "id"
                          ? "Sensory Overload"
                          : "Sensory Processing"
                        : currentQ.dimension === "empathy"
                        ? lang === "id"
                          ? "Kedalaman Empati"
                          : "Emotional Empathy"
                        : lang === "id"
                        ? "Kepekaan Lingkungan"
                        : "Subtle Perception"}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold leading-snug tracking-tight">
                    {currentQ.text[lang]}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {HSP_OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? "bg-pink-500/15 border-pink-500/50 text-foreground shadow-sm"
                              : "bg-muted/15 border-border/40 hover:bg-muted/30 hover:border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="text-sm md:text-base">
                            {opt.label[lang]}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected
                                ? "text-pink-400 translate-x-1"
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
                        ← {lang === "id" ? "Kembali" : "Previous Question"}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mid banner during test */}
              <div className="pt-4">
                <AdSenseBanner slot="hsp-mid" format="auto" />
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
                <div className="p-6 md:p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-pink-500/30 shadow-2xl shadow-pink-950/20 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Feather className="w-5 h-5 text-pink-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                        {result.profile.badge[lang]}
                      </span>
                    </div>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300">
                      Score: {result.totalScore} / {result.maxScore}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                      {result.profile.title[lang]}
                    </h1>
                    <p className="text-sm md:text-base text-pink-300/90 font-medium mt-2 leading-relaxed">
                      "{result.profile.tagline[lang]}"
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {result.profile.description[lang]}
                  </p>

                  {/* Subscale Progress Meters */}
                  <div className="p-4 md:p-5 rounded-2xl bg-muted/20 border border-border/40 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "id"
                        ? "Dimensi Sensitivitas Anda"
                        : "Your Sensitivity Dimensions"}
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>
                            {lang === "id"
                              ? "Sensory Overload & Stimulasi Lingkungan"
                              : "Sensory Overload & Environmental Stimuli"}
                          </span>
                          <span className="text-pink-400">
                            {result.percentages.sensory}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.sensory}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>
                            {lang === "id"
                              ? "Kedalaman Empati & Penyerapan Emosi"
                              : "Emotional Empathy & Absorption"}
                          </span>
                          <span className="text-rose-400">
                            {result.percentages.empathy}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-400 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.empathy}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>
                            {lang === "id"
                              ? "Persepsi Nuansa & Detail Halus"
                              : "Subtle Environmental Perception"}
                          </span>
                          <span className="text-amber-400">
                            {result.percentages.subtlety}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.subtlety}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Superpowers & Vulnerabilities */}
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {lang === "id"
                            ? "Kekuatan Batin (Superpowers)"
                            : "Your Innate Superpowers"}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground list-disc pl-4 leading-relaxed">
                        {result.profile.superpowers[lang].map((sp, i) => (
                          <li key={i}>{sp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          {lang === "id"
                            ? "Titik Rawan (Vulnerabilities)"
                            : "Vulnerabilities & Triggers"}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground list-disc pl-4 leading-relaxed">
                        {result.profile.vulnerabilities[lang].map((vuln, i) => (
                          <li key={i}>{vuln}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sensory Sanctuary Blueprint */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/10 via-background to-purple-500/10 border border-pink-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                      <Shield className="w-4 h-4" />
                      <span>
                        {lang === "id"
                          ? "Protokol Perlindungan Sensorik (Sanctuary Blueprint)"
                          : "Sensory Sanctuary Protocol"}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm text-foreground/90 list-disc pl-4 leading-relaxed">
                      {result.profile.sanctuaryBlueprint[lang].map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/40">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all"
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
                <AdSenseBanner slot="hsp-result" format="auto" />

                {/* Somatic Decompression Hub CTAs */}
                <div className="p-6 rounded-3xl bg-muted/20 border border-border/40 space-y-4">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>
                      {lang === "id"
                        ? "Alat Pemulihan Khusus Sensory Overload"
                        : "Tools to Decompress Sensory Overload"}
                    </span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Link
                      to="/soundscapes"
                      className="p-4 rounded-2xl bg-card/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                          Ju Sound Sanctuary
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Brown noise, rainfall & 528Hz calming alpha beats.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/tools/breathwork"
                      className="p-4 rounded-2xl bg-card/60 border border-pink-500/20 hover:border-pink-500/40 transition-all flex items-start gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                        <Wind className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm group-hover:text-pink-400 transition-colors">
                          Stanford Physiological Sigh
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Fast 60-second vagus nerve reset to calm racing heart.
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

        {/* Story Card Share Modal */}
        {result && (
          <HspShareCardModal
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

export default HspTest;

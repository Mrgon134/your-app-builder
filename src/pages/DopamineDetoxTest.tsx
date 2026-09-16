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
  Shield,
  Smartphone,
  CheckCircle2,
  Clock,
  Headphones,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  DOPAMINE_QUESTIONS,
  DOPAMINE_OPTIONS,
  calculateDopamineScore,
  DopamineLang,
} from "@/data/dopamine-detox";
import DopamineShareCardModal from "@/components/DopamineShareCardModal";
import { toast } from "sonner";

interface DopamineDetoxTestProps {
  defaultLang?: DopamineLang;
}

const DopamineDetoxTest: React.FC<DopamineDetoxTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<DopamineLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = DOPAMINE_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / DOPAMINE_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < DOPAMINE_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateDopamineScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `⚡ Dopamine Detox & Digital Addiction Screener Result:
Level: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore}
• Screen Compulsion & Doomscrolling: ${result.percentages.compulsion}%
• Hedonic Depletion & Brain Fog: ${result.percentages.hedonic}%
• Boredom Intolerance: ${result.percentages.boredom}%

Screen your dopamine resistance free at: https://www.nuju.app/quiz/dopamine-detox`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes dopamin berhasil disalin!"
          : "Dopamine results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<DopamineLang, string> = {
    en: "Dopamine Detox Test | Free Digital Addiction & Screen Fatigue Screener",
    id: "Tes Dopamin Detox Indonesia | Tes Kecanduan HP & Doomscrolling Gratis",
    de: "Dopamin Detox Test Deutsch | Bildschirmzeit & Reizüberflutung Selbsttest",
    fr: "Test Détox Dopamine Gratuit | Addiction aux Écrans & Fatigue Numérique",
    es: "Test de Desintoxicación de Dopamina | Adicción Digital & Fatiga del Scroll",
  };

  const metaDescriptions: Record<DopamineLang, string> = {
    en: "Clinically adapted 12-item Dopamine Detox screener based on Dr. Anna Lembke's Stanford model. Measure screen addiction, reward resistance, and unlock your 7-day dopamine fast protocol.",
    id: "Uji 12 pertanyaan kecanduan dopamin dan HP berdasarkan riset Stanford Dr. Anna Lembke. Ukur resistensi dopamin, doomscrolling fatigue, dan dapatkan protokol puasa dopamin.",
    de: "Wissenschaftlicher Dopamin-Detox-Fragebogen. Ermittle deine Reizschwelle, Smartphone-Abhängigkeit und erhalte deinen 7-Tage Fastenplan.",
    fr: "Évaluez votre dépendance aux écrans et votre saturation dopaminergique avec ce test gratuit en 12 questions inspiré des travaux de la Dre Anna Lembke.",
    es: "Descubre tu nivel de tolerancia a la dopamina y fatiga digital con este test clínico de 12 preguntas. Obtén tu protocolo de ayuno digital de 7 días.",
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: metaTitles[lang],
    description: metaDescriptions[lang],
    educationalLevel: "All",
    hasPart: DOPAMINE_QUESTIONS.map((q) => ({
      "@type": "Question",
      name: q.text[lang],
      suggestedAnswer: DOPAMINE_OPTIONS.map((opt) => ({
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
        name: "What is a Dopamine Detox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Dopamine Detox is an intentional period of abstaining from hyper-stimulating artificial rewards (short-form videos, endless social feeds, video games, constant notifications) to reset the brain's dopamine receptor sensitivity, alleviate brain fog, and restore deep focus.",
        },
      },
      {
        "@type": "Question",
        name: "How long should a Dopamine Fast last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Research by Dr. Anna Lembke indicates that 24 hours of mini-fasting provides noticeable relief, while a full 7 to 14-day protocol produces substantial neural reset and restorative neuroplasticity.",
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
          "dopamine detox test",
          "dopamine fasting quiz",
          "digital addiction screener",
          "doomscrolling fatigue test",
          "tes dopamin indonesia",
          "dopamin detox test deutsch",
          "test detox dopamine",
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

      <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 md:py-12 selection:bg-amber-500/20">
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
              {(["en", "id", "de", "fr", "es"] as DopamineLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                    lang === l
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
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
            <AdSenseBanner slot="dopamine-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>
                    {lang === "id"
                      ? `Pertanyaan ${currentIndex + 1} dari ${DOPAMINE_QUESTIONS.length}`
                      : `Question ${currentIndex + 1} of ${DOPAMINE_QUESTIONS.length}`}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-400 rounded-full"
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
                  className="p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-amber-500/20 shadow-xl shadow-amber-950/15 space-y-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>
                        {currentQ.dimension === "compulsion"
                          ? lang === "id"
                            ? "Kompulsi Layar & Scrolling"
                            : "Screen Compulsion"
                          : currentQ.dimension === "hedonic"
                          ? lang === "id"
                            ? "Resistensi Reseptor & Brain Fog"
                            : "Reward Depletion"
                          : lang === "id"
                          ? "Intoleransi Kebosanan"
                          : "Boredom Intolerance"}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-foreground">
                    {currentQ.text[lang]}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {DOPAMINE_OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? "bg-amber-500/15 border-amber-500/50 text-foreground shadow-sm"
                              : "bg-muted/15 border-border/40 hover:bg-muted/30 hover:border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="text-sm md:text-base">
                            {opt.label[lang]}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected
                                ? "text-amber-400 translate-x-1"
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

              {/* Mid banner */}
              <div className="pt-4">
                <AdSenseBanner slot="dopamine-mid" format="auto" />
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
                <div className="p-6 md:p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-amber-950/20 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        {result.profile.badge[lang]}
                      </span>
                    </div>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
                      Score: {result.totalScore} / {result.maxScore}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                      {result.profile.title[lang]}
                    </h1>
                    <p className="text-sm md:text-base text-amber-300/90 font-medium mt-2 leading-relaxed">
                      "{result.profile.tagline[lang]}"
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {result.profile.description[lang]}
                  </p>

                  {/* Subscale Meters */}
                  <div className="p-4 md:p-5 rounded-2xl bg-muted/20 border border-border/40 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "id"
                        ? "Dimensi Resistensi Dopamin"
                        : "Dopamine Resistance Dimensions"}
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>
                            {lang === "id"
                              ? "Kompulsi Layar & Doomscrolling"
                              : "Screen Compulsion & Doomscrolling"}
                          </span>
                          <span className="text-amber-400">
                            {result.percentages.compulsion}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.compulsion}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>
                            {lang === "id"
                              ? "Penurunan Reseptor & Brain Fog"
                              : "Reward Depletion & Brain Fog"}
                          </span>
                          <span className="text-orange-400">
                            {result.percentages.hedonic}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-400 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.hedonic}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>
                            {lang === "id"
                              ? "Intoleransi Kebosanan & Jeda Waktu"
                              : "Boredom Intolerance & Pause Phobia"}
                          </span>
                          <span className="text-rose-400">
                            {result.percentages.boredom}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-400 rounded-full transition-all duration-500"
                            style={{ width: `${result.percentages.boredom}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fasting Protocol */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-background to-orange-500/10 border border-amber-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Shield className="w-4 h-4" />
                      <span>
                        {lang === "id"
                          ? "Protokol Puasa Dopamin yang Direkomendasikan"
                          : "Your Recommended Dopamine Fasting Protocol"}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs md:text-sm text-foreground/90 list-disc pl-4 leading-relaxed">
                      {result.profile.fastingProtocol[lang].map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Recovery Rituals */}
                  <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 space-y-2">
                    <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>
                        {lang === "id"
                          ? "Ritual Pemulihan Reseptor Harian"
                          : "Daily Receptor Recovery Rituals"}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs md:text-sm text-muted-foreground list-disc pl-4 leading-relaxed">
                      {result.profile.recoveryRituals[lang].map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/40">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
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
                <AdSenseBanner slot="dopamine-result" format="auto" />

                {/* Somatic Reset Tools CTAs */}
                <div className="p-6 rounded-3xl bg-muted/20 border border-border/40 space-y-4">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>
                      {lang === "id"
                        ? "Alat Somatik Reset Dopamin Anda"
                        : "Tools to Reset Your Dopamine Sensitivity"}
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
                          Brown noise & 528Hz alpha wave flow for stochastic resonance.
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
                          Fast 60-second neural interrupt whenever phone cravings strike.
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
          <DopamineShareCardModal
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

export default DopamineDetoxTest;

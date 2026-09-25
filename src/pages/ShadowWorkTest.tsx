import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Moon,
  RotateCcw,
  Copy,
  Sparkles,
  ChevronRight,
  Share2,
  BookOpen,
  Flame,
  Eye,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  SHADOW_QUESTIONS,
  calculateShadowScore,
  ShadowLang,
  ShadowArchetype,
  SHADOW_PROFILES,
} from "@/data/shadow-work";
import ShadowShareCardModal from "@/components/ShadowShareCardModal";
import { toast } from "sonner";

interface ShadowWorkTestProps {
  defaultLang?: ShadowLang;
}

const ShadowWorkTest: React.FC<ShadowWorkTestProps> = ({ defaultLang = "en" }) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<ShadowLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ShadowArchetype>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = SHADOW_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / SHADOW_QUESTIONS.length) * 100
  );

  const handleSelectOption = (archetype: ShadowArchetype) => {
    const updated = { ...answers, [currentQ.id]: archetype };
    setAnswers(updated);

    if (currentIndex < SHADOW_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateShadowScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🌑 Jungian Shadow Work Test Result:
Primary Shadow: ${result.primary.name[lang]} (${result.primary.archetypeBadge[lang]})
Secondary Shadow: ${result.secondary.name[lang]}

Disowned Trait: ${result.primary.disownedTrait[lang]}
Gold in the Shadow: ${result.primary.goldInTheShadow[lang]}

Uncover your repressed shadow archetype free at: https://www.nuju.app/quiz/shadow-work`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil Shadow Work berhasil disalin!"
          : "Shadow results copied to clipboard!"
      );
    }
  };

  const startJournalingPrompt = (promptText: string) => {
    // Store selected prompt in session storage and navigate to journal write screen
    sessionStorage.setItem("nuju_initial_prompt", promptText);
    toast.success(
      lang === "id"
        ? "Prompt shadow journaling dimuat ke jurnal!"
        : "Shadow prompt loaded into journal!"
    );
    navigate("/app");
  };

  const metaTitles: Record<ShadowLang, string> = {
    en: "Jungian Shadow Work Test | Free Repressed Archetype Mirror Quiz",
    id: "Tes Shadow Work Carl Jung Indonesia | Tes Karakter Bawah Sadar Gratis",
    de: "Schattenarbeit Test Deutsch | Jungsche Archetypen & Schatten-Selbsttest",
    fr: "Test Shadow Work Français Gratuit | Découvrez Votre Ombre Selon Carl Jung",
    es: "Test del Trabajo de la Sombra Online Gratis | Arquetipos Ocultos de Jung",
  };

  const metaDescriptions: Record<ShadowLang, string> = {
    en: "Uncover your repressed subconscious archetype with this 12-dilemma Jungian Shadow Work assessment. Identify your disowned traits, projection triggers, and shadow journal prompts.",
    id: "Uji 12 dilema psikologi Carl Jung untuk membongkar arketipe bawah sadar yang ditekan (The Tyrant, The Martyr, The Ice Wall, The Rebel). Temukan luka batin tersembunyi Anda.",
    de: "Entdecke deinen verdrängten Schatten nach C.G. Jung mit diesem 12-Fragen-Test. Erkenne unbewusste Projektionen, Groll und vergrabene Stärken.",
    fr: "Explorez votre ombre psychologique selon Carl Jung à travers 12 dilemmes profonds. Identifiez vos mécanismes de défense refoulés et libérez votre potentiel.",
    es: "Descubre tu arquetipo de sombra reprimido según la psicología de Carl Jung. Analiza tus proyecciones inconscientes y preguntas profundas de journaling.",
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: metaTitles[lang],
    description: metaDescriptions[lang],
    educationalLevel: "All",
    hasPart: SHADOW_QUESTIONS.map((q) => ({
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
        name: "What is Shadow Work according to Carl Jung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Analytical Psychology, the Shadow represents the unconscious parts of our personality that our conscious ego rejects, suppresses, or denies due to shame or societal conditioning. Shadow work is the practice of recognizing, accepting, and integrating these disowned traits.",
        },
      },
      {
        "@type": "Question",
        name: "What happens when you ignore your psychological shadow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When unexamined, the shadow projects itself onto others in the form of irrational anger, moral superiority, toxic perfectionism, or chronic resentment, often leading to unexplained burnout and relationship sabotage.",
        },
      },
      {
        "@type": "Question",
        name: "Can I take a shadow work test online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Nuju provides a free, instant 12-dilemma Jungian shadow work test online. You receive your primary shadow archetype, disowned traits, and personalized journal prompts with zero account creation required.",
        },
      },
      {
        "@type": "Question",
        name: "What are shadow work prompts and how do they help?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shadow work prompts are targeted self-reflection questions that guide you to examine hidden jealousy, resentment, and boundary patterns. Writing down uncensored reflections dissolves unconscious defense mechanisms.",
        },
      },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nuju Shadow Work Test & Archetype Screener",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "135",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        keywords={[
          "shadow work test",
          "shadow work quiz",
          "shadow work prompts",
          "free shadow work test",
          "jungian shadow test",
          "repressed archetype quiz",
          "tes shadow work indonesia",
          "schattenarbeit test deutsch",
          "test shadow work francais",
          "test trabajo de la sombra jung",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 md:py-12 selection:bg-purple-500/20">
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
              {(["en", "id", "de", "fr", "es"] as ShadowLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                    lang === l
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
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
            <AdSenseBanner slot="shadow-top" format="auto" />
          </div>

          {!isCompleted ? (
            /* ================= QUESTION FLOW ================= */
            <div className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>
                    {lang === "id"
                      ? `Dilema ${currentIndex + 1} dari ${SHADOW_QUESTIONS.length}`
                      : `Dilemma ${currentIndex + 1} of ${SHADOW_QUESTIONS.length}`}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-rose-400 rounded-full"
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
                  className="p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-purple-500/20 shadow-xl shadow-purple-950/15 space-y-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5" />
                      <span>
                        {lang === "id"
                          ? "Cermin Bawah Sadar"
                          : "Subconscious Mirror"}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-foreground">
                    {currentQ.text[lang]}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options.map((opt, i) => {
                      const isSelected = answers[currentQ.id] === opt.archetype;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt.archetype)}
                          className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-start justify-between gap-3 border ${
                            isSelected
                              ? "bg-purple-500/15 border-purple-500/50 text-foreground shadow-sm"
                              : "bg-muted/15 border-border/40 hover:bg-muted/30 hover:border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="text-sm md:text-base leading-relaxed">
                            {opt.text[lang]}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                              isSelected
                                ? "text-purple-400 translate-x-1"
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
                <AdSenseBanner slot="shadow-mid" format="auto" />
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
                <div className="p-6 md:p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/25 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Moon className="w-5 h-5 text-purple-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
                        {result.primary.archetypeBadge[lang]}
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
                      Secondary: {result.secondary.name[lang]}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                      {result.primary.name[lang]}
                    </h1>
                    <p className="text-sm md:text-base text-purple-300/90 font-medium mt-2 leading-relaxed italic">
                      "{result.primary.tagline[lang]}"
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {result.primary.description[lang]}
                  </p>

                  {/* Archetype Breakdown Bars */}
                  <div className="p-4 md:p-5 rounded-2xl bg-muted/20 border border-border/40 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "id"
                        ? "Peta Bayangan Bawah Sadar Anda"
                        : "Subconscious Shadow Breakdown"}
                    </h3>

                    <div className="space-y-2.5">
                      {(
                        [
                          { id: "tyrant", label: "The Tyrant / Perfectionist", color: "bg-purple-500" },
                          { id: "martyr", label: "The Martyr / Fawn", color: "bg-rose-500" },
                          { id: "ice_wall", label: "The Ice Wall / Detached", color: "bg-cyan-500" },
                          { id: "chaos_rebel", label: "The Chaos Rebel", color: "bg-amber-500" },
                        ] as const
                      ).map((item) => (
                        <div key={item.id}>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span>{item.label}</span>
                            <span className="text-muted-foreground">
                              {result.percentages[item.id]}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full transition-all duration-500`}
                              style={{ width: `${result.percentages[item.id]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disowned Trait & Gold in Shadow */}
                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                        <Eye className="w-4 h-4" />
                        <span>
                          {lang === "id"
                            ? "Sisi yang Anda Sangkal (Disowned Trait)"
                            : "Disowned Subconscious Trait"}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {result.primary.disownedTrait[lang]}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>
                          {lang === "id"
                            ? "Emas Tersembunyi (Gold in the Shadow)"
                            : "The Gold in the Shadow"}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {result.primary.goldInTheShadow[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Projection Trigger */}
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <Flame className="w-4 h-4" />
                      <span>
                        {lang === "id"
                          ? "Pemicu Proyeksi Bayangan"
                          : "Primary Projection Trigger"}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {result.primary.projectionTrigger[lang]}
                    </p>
                  </div>

                  {/* Shadow Journal Prompts Box */}
                  <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-purple-500/15 via-background to-indigo-500/15 border border-purple-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {lang === "id"
                            ? "Prompt Jurnal Integrasi Shadow Work"
                            : "Deep Shadow Journal Prompts"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {result.primary.shadowJournalPrompts[lang].map((prompt, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-card/60 border border-border/40 hover:border-purple-500/40 transition-colors flex items-start justify-between gap-3 group"
                        >
                          <p className="text-xs md:text-sm text-foreground/90 leading-relaxed font-medium">
                            "{prompt}"
                          </p>
                          <button
                            onClick={() => startJournalingPrompt(prompt)}
                            className="shrink-0 p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors text-xs font-semibold flex items-center gap-1"
                            title="Tulis di Ju"
                          >
                            <span>{lang === "id" ? "Tulis" : "Journal"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Integration Ritual */}
                  <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 space-y-1.5">
                    <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>
                        {lang === "id"
                          ? "Ritual Integrasi 7 Hari"
                          : "7-Day Integration Micro-Ritual"}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {result.primary.integrationRitual[lang]}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/40">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
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
                <AdSenseBanner slot="shadow-result" format="auto" />

                {/* Self-Reflection & Ethical Disclaimer */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-4 text-center text-xs text-muted-foreground leading-relaxed">
                  <ShieldCheck className="h-4 w-4 inline-block mr-1.5 text-muted-foreground" />
                  <strong>{lang === "id" ? "Catatan Refleksi: " : "Self-Reflection Note: "}</strong>
                  {lang === "id"
                    ? "Tes shadow work ini diadaptasi dari psikologi analitis Jungian untuk sarana refleksi mandiri dan mengenali bagian bawah sadar. Tes ini bukan diagnosis klinis. "
                    : "This shadow work assessment is adapted from Jungian analytical concepts for self-reflection and subconscious integration. It is not a clinical psychological diagnosis. "}
                  <Link to="/medical-disclaimer" className="underline text-primary hover:opacity-80 font-medium">
                    {lang === "id" ? "Baca disclaimer medis" : "Read medical disclaimer"}
                  </Link>
                </div>

                {/* App CTA */}
                <AppStoreCta />
              </motion.div>
            )
          )}
        </div>

        {/* Trust & Legal Footer */}
        <footer className="border-t border-border/50 bg-card/40 py-8 text-center text-xs text-muted-foreground mt-12">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Nuju. Depth psychology & conscious reflection.</p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link to="/quiz" className="hover:text-foreground">
                All Quizzes
              </Link>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link to="/medical-disclaimer" className="hover:text-foreground font-medium">
                Medical Disclaimer
              </Link>
            </div>
          </div>
        </footer>

        {/* Share Card Modal */}
        {result && (
          <ShadowShareCardModal
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

export default ShadowWorkTest;

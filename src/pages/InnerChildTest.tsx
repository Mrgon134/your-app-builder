import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Heart,
  Shield,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  INNER_CHILD_QUESTIONS,
  INNER_CHILD_PROFILES,
  calculateInnerChildResult,
  InnerChildLang,
  InnerChildWoundType,
} from "@/data/inner-child";
import InnerChildShareCardModal from "@/components/InnerChildShareCardModal";
import { toast } from "sonner";

interface InnerChildTestProps {
  defaultLang?: InnerChildLang;
}

const InnerChildTest: React.FC<InnerChildTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<InnerChildLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, InnerChildWoundType>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = INNER_CHILD_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / INNER_CHILD_QUESTIONS.length) * 100);

  const handleSelectOption = (wound: InnerChildWoundType) => {
    const updated = { ...answers, [currentQ.id]: wound };
    setAnswers(updated);

    if (currentIndex < INNER_CHILD_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const result = isCompleted ? calculateInnerChildResult(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🧸 My Inner Child Wound Archetype:\nPrimary: ${result.primary.title[lang]} (${result.primary.archetype[lang]})\nInsight: "${result.primary.tagline[lang]}"\nHealing Action: ${result.primary.reparentingAction[lang]}\nDiscover your inner child wound here: ${window.location.origin}/quiz/inner-child`;
    navigator.clipboard.writeText(text);
    toast.success(
      lang === "id"
        ? "Ringkasan luka inner child berhasil disalin!"
        : "Inner child summary copied to clipboard!"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      <SEOHead
        title={
          lang === "id"
            ? "Tes Luka Inner Child Online Gratis: Kenali Luka Batin Masa Kecilmu"
            : lang === "de"
            ? "Kostenloser Inner Child Test: Welches Kindheitsmuster prägt Sie?"
            : lang === "fr"
            ? "Test de l'Enfant Intérieur Gratuit : Identifiez vos Blessures d'Enfance"
            : lang === "es"
            ? "Test del Niño Interior Gratis: Descubra sus Heridas Emocionales de Infancia"
            : "Free Inner Child Wound Test: Discover Your Childhood Emotional Archetype"
        }
        description={
          lang === "id"
            ? "Cari tahu luka batin masa kecilmu: Pengabaian, Tuntutan Sukses, Rasa Bersalah, atau Kebutuhan Terabaikan. Gratis, privat, dan tanpa registrasi."
            : "Discover your core inner child emotional wound (Abandonment, Achievement, Guilt, or Invisibility). Free, evidence-based psychological screening."
        }
        canonical="https://nuju.app/quiz/inner-child"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name:
              lang === "id"
                ? "Tes Luka Batin Masa Kecil (Inner Child Wound Test)"
                : "Inner Child Wound Archetype Test",
            description:
              "Identify your subconscious childhood emotional wound: Abandonment, Achievement, Guilt, or Invisibility.",
            provider: {
              "@type": "Organization",
              name: "Nuju",
              url: "https://nuju.app",
            },
            inLanguage: lang,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an inner child wound?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An inner child wound is a subconscious emotional pattern formed in early development that persists into adulthood, shaping relationship reactions, boundary setting, and self-esteem.",
                },
              },
              {
                "@type": "Question",
                name: "What are the 4 core inner child wound archetypes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 4 archetypes are: The Abandoned Child (fear of desertion and intense hypervigilance), The Overachiever Child (conditional worth through perfectionism), The Guilt-Bearer Child (chronic shame and people-pleasing), and The Invisible Child (emotional withdrawal and quiet neglect).",
                },
              },
            ],
          },
        ]}
      />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "id" ? "Semua Tes & Game" : "All Tests & Tools"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-slate-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as InnerChildLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l === "en"
                    ? "🇬🇧 EN"
                    : l === "id"
                    ? "🇮🇩 ID"
                    : l === "de"
                    ? "🇩🇪 DE"
                    : l === "fr"
                    ? "🇫🇷 FR"
                    : "🇪🇸 ES"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Top Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <AdSenseBanner slot="inner-child-top" format="horizontal" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        {!isCompleted ? (
          <div>
            {/* Title Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-3">
                <Heart className="w-3.5 h-3.5" />
                <span>Subconscious Emotional Archetypes</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                {lang === "id"
                  ? "Tes Luka Inner Child: Kenali Suara Masa Kecilmu"
                  : lang === "de"
                  ? "Inner Child Selbsttest"
                  : lang === "fr"
                  ? "Test de l'Enfant Intérieur"
                  : lang === "es"
                  ? "Test del Niño Interior"
                  : "Inner Child Wound Assessment"}
              </h1>
              <p className="text-sm md:text-base text-slate-400">
                {lang === "id"
                  ? "Kenali luka emosional masa kecil yang masih diam-diam mengendalikan caramu merespons cinta, pekerjaan, dan batasan diri hari ini."
                  : "Uncover the subconscious childhood wound shaping your adult relationships, self-worth, and fear responses."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>
                  {lang === "id"
                    ? `Skenario ${currentIndex + 1} dari ${INNER_CHILD_QUESTIONS.length}`
                    : `Scenario ${currentIndex + 1} of ${INNER_CHILD_QUESTIONS.length}`}
                </span>
                <span className="text-rose-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative backdrop-blur-sm"
              >
                <h2 className="text-lg md:text-xl font-semibold text-slate-100 mb-6 leading-relaxed">
                  {currentQ.text[lang]}
                </h2>

                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = answers[currentQ.id] === opt.wound;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt.wound)}
                        className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        <span className="pr-4">{opt.text[lang]}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                            isSelected
                              ? "border-rose-500 bg-rose-500 text-white"
                              : "border-slate-600 group-hover:border-slate-400"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {currentIndex > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-start">
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Kembali ke sebelumnya" : "Previous scenario"}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <AdSenseBanner slot="inner-child-mid" format="horizontal" />
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Primary Profile Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                    <span>{result.primary.emoji}</span>
                    <span>Primary Inner Child Archetype</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-rose-500/20"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Bagikan Kartu Story" : "Share Story Card"}</span>
                    </button>
                    <button
                      onClick={copyResults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Salin Hasil" : "Copy Result"}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Ulangi" : "Retake"}</span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
                  {result.primary.title[lang]}
                </h1>
                <p className="text-base md:text-lg text-rose-300/90 font-medium mb-4 italic">
                  "{result.primary.tagline[lang]}"
                </p>

                {/* Wound Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-xs font-bold uppercase text-rose-400 mb-1">
                      {lang === "id" ? "Asal Muasal Luka:" : "Root Origin:"}
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {result.primary.origin[lang]}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-xs font-bold uppercase text-amber-400 mb-1">
                      {lang === "id" ? "Pemicu Reaksi di Usia Dewasa:" : "Adult Life Triggers:"}
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {result.primary.trigger[lang]}
                    </p>
                  </div>
                </div>

                {/* Core Healing Truth */}
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs md:text-sm text-rose-200/90 leading-relaxed">
                  <span className="font-bold text-rose-300">
                    {lang === "id" ? "Kebenaran Penyembuh Jiwamu: " : "Core Healing Truth: "}
                  </span>
                  <span>{result.primary.healingTruth[lang]}</span>
                </div>
              </div>

              {/* Reparenting & Journaling Section */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>
                    {lang === "id"
                      ? "Langkah Reparenting (Mengasuh Ulang Diri)"
                      : "Daily Reparenting Action"}
                  </span>
                </h3>

                <div className="space-y-4">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      {lang === "id" ? "Tindakan Kasih Sayang Mandiri:" : "Self-Compassion Ritual:"}
                    </div>
                    <p className="text-sm text-slate-200">
                      {result.primary.reparentingAction[lang]}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                      {lang === "id" ? "Pertanyaan Refleksi Journaling:" : "Journaling Reflection Prompt:"}
                    </div>
                    <p className="text-sm text-slate-200">
                      {result.primary.journalPrompt[lang]}
                    </p>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {lang === "id" ? "Mulai Refleksi Hari Ini:" : "Explore Next Tool:"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === "id"
                        ? "Tuliskan perasaanmu dengan aman di Nuju atau dengarkan audio fokus."
                        : "Journal your reflection or restore calm with our sound sanctuary."}
                    </p>
                  </div>
                  <Link
                    to="/soundscapes"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm hover:from-rose-400 hover:to-pink-400 transition-all shadow-lg text-center flex items-center justify-center gap-2"
                  >
                    <span>{lang === "id" ? "Dengarkan Audio Penenang" : "Open Sound Sanctuary"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* AdSense Mid Banner */}
              <AdSenseBanner slot="inner-child-result" format="horizontal" />

              {/* Cross Promo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/quiz/attachment-style"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Heart className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Attachment Style</h4>
                  <p className="text-xs text-slate-400">
                    Discover your relationship attachment pattern.
                  </p>
                </Link>

                <Link
                  to="/game/oracle"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Sparkles className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Daily Mood Oracle</h4>
                  <p className="text-xs text-slate-400">
                    Draw your daily archetype card and mindful ritual.
                  </p>
                </Link>

                <Link
                  to="/quiz/mental-health-test"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <AlertCircle className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">DASS-21 Checkup</h4>
                  <p className="text-xs text-slate-400">
                    Assess depression, anxiety, and stress levels.
                  </p>
                </Link>
              </div>

              <AppStoreCta />

              <InnerChildShareCardModal
                isOpen={isShareCardOpen}
                onClose={() => setIsShareCardOpen(false)}
                profile={result.primary}
                woundType={result.primary.id}
                lang={lang}
              />
            </motion.div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Inner child healing.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy" className="hover:text-slate-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-200">
              Terms
            </Link>
            <Link to="/medical-disclaimer" className="hover:text-slate-200">
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InnerChildTest;

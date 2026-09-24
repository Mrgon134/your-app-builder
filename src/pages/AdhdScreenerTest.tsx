import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  RotateCcw,
  Sparkles,
  Zap,
  Brain,
  ShieldCheck,
  Copy,
  ChevronRight,
  BatteryCharging,
  Flame,
  Activity,
  AlertCircle,
  Headphones,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  ADHD_QUESTIONS,
  ADHD_OPTIONS,
  calculateAdhdScore,
  AdhdLanguage,
} from "@/data/adhd-screener";
import juMain from "@/assets/ju-main.webp";
import AdhdShareCardModal from "@/components/AdhdShareCardModal";
import { toast } from "sonner";

interface AdhdScreenerTestProps {
  defaultLang?: AdhdLanguage;
}

const AdhdScreenerTest: React.FC<AdhdScreenerTestProps> = ({ defaultLang = "en" }) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<AdhdLanguage>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQuestion = ADHD_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / ADHD_QUESTIONS.length) * 100);

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (currentIndex < ADHD_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateAdhdScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🧠 ADHD & Dopamine Fatigue Assessment Result:\nProfile: ${result.profile.title[lang]}\nOverall Score: ${result.totalScore}/${result.maxScore} (${result.percentage}%)\nInattention: ${result.inattentionScore}/20 | Hyperactivity: ${result.hyperactivityScore}/12 | Dopamine Fatigue: ${result.dopamineScore}/16\nTake the free test here: ${window.location.origin}/quiz/adhd-screener`;
    navigator.clipboard.writeText(text);
    toast.success(
      lang === "id"
        ? "Hasil tes berhasil disalin ke clipboard!"
        : lang === "de"
        ? "Ergebnis in Zwischenablage kopiert!"
        : lang === "fr"
        ? "Résultat copié dans le presse-papier !"
        : lang === "es"
        ? "¡Resultado copiado al portapapeles!"
        : "Assessment summary copied to clipboard!"
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <SEOHead
        title={
          lang === "id"
            ? "Tes ADHD Dewasa & Dopamine Burnout Online Gratis (WHO ASRS v1.1)"
            : lang === "de"
            ? "Kostenloser ADHS Test Erwachsene & Dopamin-Burnout (WHO ASRS v1.1)"
            : lang === "fr"
            ? "Test TDAH Adulte & Épuisement Dopaminergique Gratuit en Ligne"
            : lang === "es"
            ? "Test TDAH Adultos y Fatiga Dopaminérgica Online Gratis"
            : "Free ADHD Test Online: Adult ADHD Screener (WHO ASRS v1.1) | Nuju"
        }
        description={
          lang === "id"
            ? "Skrining mandiri ADHD dewasa berdasarkan WHO ASRS v1.1 dan skala kelelahan dopamin digital. Gratis, privat, dan tanpa registrasi."
            : lang === "de"
            ? "Wissenschaftlich fundierter ADHS-Selbsttest für Erwachsene basierend auf WHO ASRS v1.1. Messen Sie Aufmerksamkeit und Dopamin-Ermüdung."
            : lang === "fr"
            ? "Dépistage du TDAH chez l'adulte et de la fatigue attentionnelle numérique. Basé sur l'échelle OMS ASRS v1.1."
            : lang === "es"
            ? "Cribado de TDAH en adultos y sobrecarga dopaminérgica basado en el modelo OMS ASRS v1.1. Rápido, confidencial y sin registro."
            : "Take the free adult ADHD test online based on WHO ASRS v1.1. Screen for inattention, hyperactivity, executive dysfunction, and dopamine fatigue with instant results."
        }
        canonical="https://nuju.app/quiz/adhd-screener"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name:
              lang === "id"
                ? "Tes Skrining ADHD Dewasa & Fatigue Dopamin (WHO ASRS v1.1)"
                : "Adult ADHD & Dopamine Fatigue Screener (WHO ASRS v1.1)",
            description:
              "Standardized self-assessment for adult Attention-Deficit/Hyperactivity Disorder and digital dopamine depletion.",
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
                name: "Can I take an adult ADHD test online for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Nuju provides the 18-question WHO ASRS v1.1 adult ADHD screener online for free with no account or credit card required. Results include inattention, hyperactivity, and dopamine fatigue breakdowns.",
                },
              },
              {
                "@type": "Question",
                name: "What is the WHO ASRS v1.1?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The World Health Organization Adult ADHD Self-Report Scale (ASRS v1.1) is an instrument developed in conjunction with WHO and the Workgroup on Adult ADHD to screen for symptoms of attention-deficit/hyperactivity disorder in adults.",
                },
              },
              {
                "@type": "Question",
                name: "What is dopamine fatigue or ADHD paralysis?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ADHD paralysis occurs when the prefrontal cortex experiences severe cognitive friction or dopamine deficit, causing an inability to initiate, prioritize, or complete tasks despite high motivation to do so.",
                },
              },
            ],
          },
        ]}
      />

      {/* Top Navigation */}
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
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-slate-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as AdhdLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-amber-500 text-slate-950 shadow-sm"
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

      {/* AdSense Top Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <AdSenseBanner slot="adhd-quiz-top" format="horizontal" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        {!isCompleted ? (
          <div>
            {/* Intro Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                <Brain className="w-3.5 h-3.5" />
                <span>WHO ASRS v1.1 & Executive Function Scale</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                {lang === "id"
                  ? "Tes ADHD Dewasa & Dopamine Burnout"
                  : lang === "de"
                  ? "ADHS & Dopamin-Burnout Selbsttest"
                  : lang === "fr"
                  ? "Test TDAH Adulte & Fatigue Dopaminergique"
                  : lang === "es"
                  ? "Test TDAH Adultos y Fatiga Dopaminérgica"
                  : "Adult ADHD & Dopamine Fatigue Screener"}
              </h1>
              <p className="text-sm md:text-base text-slate-400">
                {lang === "id"
                  ? "Evaluasi tingkat atensi, hiperaktivitas/impulsivitas, dan desensitisasi dopamin akibat kelelahan digital dalam 3 menit."
                  : lang === "de"
                  ? "Bewerten Sie Aufmerksamkeitsschwächen, innere Unruhe und digitale Dopamin-Erschöpfung in 3 Minuten."
                  : lang === "fr"
                  ? "Évaluez vos capacités attentionnelles, votre agitation mentale et votre surcharge numérique en 3 minutes."
                  : lang === "es"
                  ? "Evalúe su nivel de atención, inquietud mental y sobrecarga dopaminérgica en 3 minutos."
                  : "Assess attention regulation, executive friction, and digital dopamine burnout in 3 minutes."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>
                  {lang === "id"
                    ? `Pertanyaan ${currentIndex + 1} dari ${ADHD_QUESTIONS.length}`
                    : `Question ${currentIndex + 1} of ${ADHD_QUESTIONS.length}`}
                </span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
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
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      currentQuestion.part === "A"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                    }`}
                  >
                    {currentQuestion.part === "A" ? "Part A: Core ASRS" : "Part B: Dopamine & Burnout"}
                  </span>
                  <span className="text-xs text-slate-500 capitalize">
                    • {currentQuestion.category.replace("_", " ")}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-semibold text-slate-100 mb-6 leading-relaxed">
                  {currentQuestion.text[lang]}
                </h2>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {ADHD_OPTIONS.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        <span>{opt.label[lang]}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-amber-500 bg-amber-500 text-slate-950"
                              : "border-slate-600 group-hover:border-slate-400"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Back */}
                {currentIndex > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-start">
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Kembali ke sebelumnya" : "Previous question"}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* In-quiz AdSense Banner */}
            <div className="mt-8">
              <AdSenseBanner slot="adhd-quiz-mid" format="horizontal" />
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
              {/* Header Badge & Profile Title */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>WHO ASRS Evaluation Profile</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Bagikan Kartu Story" : "Share Story Card"}</span>
                    </button>
                    <button
                      onClick={copyResults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-750 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Salin" : "Copy"}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-750 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Ulangi" : "Retake"}</span>
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
                  {result.profile.title[lang]}
                </h1>
                <p className="text-base md:text-lg text-amber-300/90 font-medium mb-4">
                  {result.profile.headline[lang]}
                </p>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                  {result.profile.description[lang]}
                </p>

                {/* Score meters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                  {/* Inattention */}
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-blue-400" />
                        Inattention
                      </span>
                      <span className="text-slate-200 font-bold">{result.inattentionScore} / 20</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(result.inattentionScore / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Hyperactivity / Restlessness */}
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-orange-400" />
                        Restlessness & Impulsivity
                      </span>
                      <span className="text-slate-200 font-bold">{result.hyperactivityScore} / 12</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${(result.hyperactivityScore / 12) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Dopamine Fatigue */}
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Dopamine Friction
                      </span>
                      <span className="text-slate-200 font-bold">{result.dopamineScore} / 16</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(result.dopamineScore / 16) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dopamine state indicator */}
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs md:text-sm text-amber-200/90 flex items-start gap-3">
                  <BatteryCharging className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">
                      {lang === "id" ? "Status Reseptor Dopamin: " : "Dopamine Receptor Status: "}
                    </span>
                    <span>{result.profile.dopamineState[lang]}</span>
                  </div>
                </div>
              </div>

              {/* Actionable Strategies */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>
                    {lang === "id"
                      ? "Rekomendasi Tindakan Berbasis Neurosains"
                      : lang === "de"
                      ? "Neurowissenschaftlich fundierte Handlungsempfehlungen"
                      : lang === "fr"
                      ? "Recommandations d'action neuroscientifiques"
                      : lang === "es"
                      ? "Estrategias de acción basadas en neurociencia"
                      : "Evidence-Based Action Strategies"}
                  </span>
                </h3>

                <ul className="space-y-3">
                  {result.profile.strategies[lang].map((strategy, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-slate-300 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>

                {/* Direct CTA to Next Tool */}
                <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {lang === "id" ? "Rekomendasi Alat Selanjutnya:" : "Recommended Next Tool:"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === "id"
                        ? "Manfaatkan alat berbasis sains kami untuk mempercepat pemulihan fokus Anda."
                        : "Use our science-backed tools to reset and sharpen your mental clarity."}
                    </p>
                  </div>
                  <Link
                    to={result.profile.recommendedTool.path}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-2"
                  >
                    <span>{result.profile.recommendedTool.actionText[lang]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* AdSense Mid Banner on Result */}
              <AdSenseBanner slot="adhd-result-mid" format="horizontal" />

              {/* Cross-Promo Hub Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/quiz/mental-health-test"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Brain className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">DASS-21 Mental Health</h4>
                  <p className="text-xs text-slate-400">
                    Depression, anxiety, and stress clinical assessment.
                  </p>
                </Link>

                <Link
                  to="/soundscapes"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Headphones className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Sound Sanctuary</h4>
                  <p className="text-xs text-slate-400">
                    Pure Web Audio brown noise, rain & 528Hz Solfeggio tones.
                  </p>
                </Link>

                <Link
                  to="/game/zen-pop"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Sparkles className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Zen Bubble Game</h4>
                  <p className="text-xs text-slate-400">
                    Pop worries and restore calm with crystal chime synthesis.
                  </p>
                </Link>
              </div>

              {/* Medical Disclaimer */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-500 leading-relaxed">
                <p className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>
                      {lang === "id" ? "Catatan Medis:" : "Clinical Screening Disclaimer:"}
                    </strong>{" "}
                    {lang === "id"
                      ? "Skrining ini dirancang sebagai instrumen edukasi dan kesadaran diri mandiri berdasarkan WHO ASRS v1.1. Hasil ini bukan merupakan diagnosis medis atau psikiatris resmi. Jika Anda mengalami gangguan fungsi harian yang signifikan, konsultasikan dengan psikiater atau psikolog berlisensi."
                      : "This self-assessment is designed for psychoeducational awareness based on the WHO Adult ADHD Self-Report Scale (ASRS v1.1). It is not a formal psychiatric diagnosis. If you experience significant impairment in academic, occupational, or social functioning, seek consultation with a licensed mental health professional."}
                  </span>
                </p>
              </div>

              {/* Ju Mobile App CTA */}
              <div className="pt-4">
                <AppStoreCta />
              </div>

              {/* Viral Story Card Modal */}
              <AdhdShareCardModal
                isOpen={isShareCardOpen}
                onClose={() => setIsShareCardOpen(false)}
                profile={result.profile}
                totalScore={result.totalScore}
                inattentionScore={result.inattentionScore}
                hyperactivityScore={result.hyperactivityScore}
                dopamineScore={result.dopamineScore}
                lang={lang}
              />
            </motion.div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Science-backed mental wellness.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/privacy" className="hover:text-slate-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-200">
              Terms
            </Link>
            <Link to="/medical-disclaimer" className="hover:text-slate-200">
              Medical Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdhdScreenerTest;

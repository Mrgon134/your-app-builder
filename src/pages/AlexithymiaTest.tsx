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
  Compass,
  ArrowRight,
  Award,
  Zap,
  CheckCircle2,
  Activity,
  HeartPulse,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  ALEXITHYMIA_QUESTIONS,
  ALEXITHYMIA_OPTIONS,
  calculateAlexithymiaScore,
  AlexithymiaLang,
} from "@/data/alexithymia";
import { AlexithymiaShareCardModal } from "@/components/AlexithymiaShareCardModal";
import { toast } from "sonner";

interface AlexithymiaTestProps {
  defaultLang?: AlexithymiaLang;
}

const AlexithymiaTest: React.FC<AlexithymiaTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<AlexithymiaLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = ALEXITHYMIA_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / ALEXITHYMIA_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < ALEXITHYMIA_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateAlexithymiaScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🧊 Toronto Alexithymia Scale (TAS-20) Diagnostic:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Identifying Feelings (DIF): ${result.subscales.identifying_feelings.percentage}%
• Describing Feelings (DDF): ${result.subscales.describing_feelings.percentage}%
• Externally-Oriented Thinking (EOT): ${result.subscales.external_thinking.percentage}%

Somatic Interoception Drills:
${result.profile.interoceptionDrills[lang].map((d, i) => `${i + 1}. ${d}`).join("\n")}

Screen emotional numbing & alexithymia free at: https://www.nuju.app/quiz/alexithymia`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes alexithymia berhasil disalin!"
          : "Alexithymia results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<AlexithymiaLang, string> = {
    en: "Alexithymia Test: Free Toronto Alexithymia Scale (TAS-20) Screener | Ju",
    id: "Tes Alexithymia & Mati Rasa Emosi Online Gratis (Skala TAS-20) | Ju",
    de: "Alexithymie Test: Kostenloser TAS-20 Fragebogen Gefühlstaubheit | Ju",
    fr: "Test d'Alexithymie Gratuit : Échelle de Toronto TAS-20 en Ligne | Ju",
    es: "Test de Alexitimia Gratis: Escala de Toronto TAS-20 Online | Ju",
  };

  const metaDescriptions: Record<AlexithymiaLang, string> = {
    en: "Take our free 12-item Alexithymia Test based on the Toronto Alexithymia Scale (TAS-20). Measure emotional numbing, difficulty identifying feelings, and somatosensory disconnect.",
    id: "Ukur tingkat kesulitan mengenali dan mengungkapkan emosi (alexithymia) dengan tes klinis skala TAS-20. Dilengkapi latihan interosepsi sensasi tubuh.",
    de: "Erfahren Sie, ob Sie unter Alexithymie (Gefühlsblindheit) leiden. Kostenloser 12-Fragen-Selbsttest nach der wissenschaftlichen TAS-20 Skala.",
    fr: "Découvrez si vous souffrez d'alexithymie (difficulté à identifier et exprimer ses émotions) avec notre test en ligne inspiré de l'échelle de Toronto TAS-20.",
    es: "¿Te cuesta poner palabras a lo que sientes o experimentas entumecimiento emocional? Realiza el test de alexitimia basado en la escala TAS-20.",
  };

  const t = {
    heroKicker: {
      en: "CLINICAL PSYCHOLOGY • TORONTO ALEXITHYMIA SCALE (TAS-20)",
      id: "PSIKOLOGI KLINIS • SKALA TORONTO ALEXITHYMIA (TAS-20)",
      de: "KLINISCHE PSYCHOLOGIE • TORONTO ALEXITHYMIE SKALA",
      fr: "PSYCHOLOGIE CLINIQUE • ÉCHELLE DE TORONTO (TAS-20)",
      es: "PSICOLOGÍA CLÍNICA • ESCALA DE TORONTO (TAS-20)",
    },
    heroTitle: {
      en: "Alexithymia & Emotional Numbing Diagnostic",
      id: "Tes Alexithymia & Mati Rasa Emosional (Gefühlsblindheit)",
      de: "Test für Alexithymie & Emotionale Taubheit",
      fr: "Diagnostic d'Alexithymie & Engourdissement Émotionnel",
      es: "Diagnóstico de Alexitimia & Desconexión Emocional",
    },
    heroDesc: {
      en: "Does your mind go blank when asked how you feel? Do you experience emotions mainly as unexplained bodily aches or knots? Assess your emotional granularity and interoceptive bridge.",
      id: "Apakah kepala Anda mendadak kosong saat ditanya apa yang sedang Anda rasakan? Apakah emosi Anda hanya terwujud sebagai nyeri fisik tanpa nama? Ukur kepekaan interosepsi batin Anda.",
      de: "Fehlen Ihnen oft die Worte für Ihre Gefühle? Erleben Sie seelische Zustände primär als körperliche Symptome? Messen Sie Ihre emotionale Sprachfähigkeit.",
      fr: "Votre esprit est-il vide quand on vous interroge sur vos émotions ? Ne ressentez-vous vos affects que sous forme de tensions corporelles ? Mesurez votre lucidité intéroceptive.",
      es: "¿Te quedas en blanco cuando te preguntan cómo estás? ¿Tus emociones solo se manifiestan como dolor físico o pesadez? Mide tu grado de conexión afectiva.",
    },
    questionOf: {
      en: "Question",
      id: "Pertanyaan",
      de: "Frage",
      fr: "Question",
      es: "Pregunta",
    },
    prev: {
      en: "Previous",
      id: "Sebelumnya",
      de: "Zurück",
      fr: "Précédent",
      es: "Anterior",
    },
    yourResult: {
      en: "Your Alexithymia Diagnostic Breakdown",
      id: "Hasil Analisis Spektrum Alexithymia",
      de: "Ihr Alexithymie-Profil",
      fr: "Votre Profil d'Alexithymie",
      es: "Tu Perfil de Alexitimia",
    },
    shareStoryCard: {
      en: "Generate Story Card",
      id: "Buat Kartu Story Estetik",
      de: "Story-Karte Erstellen",
      fr: "Générer la Story 9:16",
      es: "Crear Tarjeta Story 9:16",
    },
    copySummary: {
      en: "Copy Clinical Summary",
      id: "Salin Ringkasan",
      de: "Zusammenfassung kopieren",
      fr: "Copier le Résumé",
      es: "Copiar Resumen",
    },
    retake: {
      en: "Retake Diagnostic",
      id: "Ulangi Tes",
      de: "Test wiederholen",
      fr: "Refaire le test",
      es: "Repetir test",
    },
    subscalesTitle: {
      en: "3 Subscales of the TAS-20 Model",
      id: "3 Subskala Model TAS-20",
      de: "3 Skalen des TAS-20 Modells",
      fr: "3 Sous-Échelles du Modèle TAS-20",
      es: "3 Subescalas del Modelo TAS-20",
    },
    protocolTitle: {
      en: "Somatic Interoception Drills & Word Expansion",
      id: "Latihan Interosepsi Somatik & Kosakata Emosi",
      de: "Interozeptive Übungen & Sprachförderung",
      fr: "Entraînement Intéroceptif & Vocabulaire",
      es: "Entrenamiento Interoceptivo & Riqueza Verbal",
    },
    relatedTools: {
      en: "Related Diagnostic & Somatic Labs",
      id: "Tes Psikologi & Alat Somatik Terkait",
      de: "Verwandte Somatische Werkzeuge",
      fr: "Outils Somatiques Associés",
      es: "Herramientas Somáticas Relacionadas",
    },
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/alexithymia"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Top navigation & Language switch */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-sky-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Quizzes</span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["en", "id", "de", "fr", "es"] as AlexithymiaLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg font-bold uppercase transition ${
                    lang === l
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* AdSense Top */}
          <div className="my-4">
            <AdSenseBanner slot="alexithymia-top" format="auto" />
          </div>

          {!isCompleted ? (
            <div>
              {/* Hero Banner */}
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-wider mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{t.heroKicker[lang]}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">
                  {t.heroTitle[lang]}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {t.heroDesc[lang]}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>
                    {t.questionOf[lang]} {currentIndex + 1} / {ALEXITHYMIA_QUESTIONS.length}
                  </span>
                  <span className="text-sky-400">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* AdSense Mid */}
              {currentIndex === 5 && (
                <div className="my-6">
                  <AdSenseBanner slot="alexithymia-mid" format="auto" />
                </div>
              )}

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl shadow-black/40 mb-6"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-3">
                    {currentQ.dimension === "identifying_feelings" && (lang === "id" ? "Mengenali Emosi vs Sensasi Tubuh (DIF)" : "Difficulty Identifying Feelings (DIF)")}
                    {currentQ.dimension === "describing_feelings" && (lang === "id" ? "Mengungkapkan Emosi ke Orang Lain (DDF)" : "Difficulty Describing Feelings (DDF)")}
                    {currentQ.dimension === "external_thinking" && (lang === "id" ? "Pikiran Berorientasi Luar/Teknis (EOT)" : "Externally-Oriented Thinking (EOT)")}
                  </span>

                  <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {ALEXITHYMIA_OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg shadow-sky-500/10"
                              : "bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                          }`}
                        >
                          <span>{opt.label[lang]}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition ${
                              isSelected ? "text-sky-400 translate-x-1" : "text-slate-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {currentIndex > 0 && (
                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-start">
                      <button
                        onClick={handlePrevious}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
                      >
                        ← {t.prev[lang]}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Result Card */}
                <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                  <div
                    className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: result.profile.color }}
                  />

                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${result.profile.color}20`,
                        color: result.profile.color,
                        borderColor: `${result.profile.color}40`,
                      }}
                    >
                      {result.profile.badge[lang]}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    {result.profile.title[lang]}
                  </h2>
                  <p className="text-sm sm:text-base font-medium text-slate-300 italic mb-4">
                    "{result.profile.tagline[lang]}"
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {result.profile.description[lang]}
                  </p>

                  {/* 3 Pillars Matrix */}
                  <div className="mb-6 pt-6 border-t border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4 flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      <span>{t.subscalesTitle[lang]}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-rose-400 font-bold block mb-1">
                          {lang === "id" ? "Mengenali Emosi (DIF)" : "Identifying Feelings"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.identifying_feelings.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.identifying_feelings.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${result.subscales.identifying_feelings.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-amber-400 font-bold block mb-1">
                          {lang === "id" ? "Menjelaskan Emosi (DDF)" : "Describing Feelings"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.describing_feelings.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.describing_feelings.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${result.subscales.describing_feelings.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-sky-400 font-bold block mb-1">
                          {lang === "id" ? "Pola Berpikir Luar (EOT)" : "External Thinking"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.external_thinking.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.external_thinking.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${result.subscales.external_thinking.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interoception Protocols */}
                  <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-sky-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>{t.protocolTitle[lang]}</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {result.profile.interoceptionDrills[lang].map((drill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span>{drill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Sharing */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t.shareStoryCard[lang]}</span>
                    </button>

                    <button
                      onClick={copyResults}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs transition"
                    >
                      <Copy className="w-4 h-4 text-sky-400" />
                      <span>{t.copySummary[lang]}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 font-semibold text-xs transition"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-400" />
                      <span>{t.retake[lang]}</span>
                    </button>
                  </div>
                </div>

                {/* AdSense Result Slot */}
                <div className="my-6">
                  <AdSenseBanner slot="alexithymia-result" format="auto" />
                </div>

                {/* Ju App Conversion CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-sky-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="max-w-md">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                      {lang === "id" ? "Latih Otot Rasa Anda" : "Build Your Interoceptive Fluency"}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {lang === "id"
                        ? "Bicara Bebas ke Ju & Temukan Kata untuk Rasa Anda"
                        : "Somatic Voice Journaling with Empathetic AI"}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === "id"
                        ? "Saat mulut sulit merangkai kata, curahkan apa pun ke Ju. AI Ju mendengarkan intonasi dan membantu Anda memetakan emosi tanpa menghakimi."
                        : "When words fail, simply speak what you feel physically. Ju's somatic voice journal detects vocal patterns and helps you decode subconscious tension."}
                    </p>
                  </div>
                  <AppStoreCta source="alexithymia_quiz" />
                </div>

                {/* Related Tools */}
                <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    {t.relatedTools[lang]}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link
                      to="/quiz/dissociation"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-sky-400 block mb-0.5">
                          {lang === "id" ? "Tes Disosiasi & DPDR" : "Dissociation & DPDR Screener"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Deteksi sensasi melayang" : "Somatic numbness & fog"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/quiz/emotional-agility"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-teal-400 block mb-0.5">
                          {lang === "id" ? "Tes Emotional Agility" : "Emotional Agility Screener"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Pola bottling & brooding" : "Dr. Susan David Harvard model"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/tools/vocal-toning"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-indigo-400 block mb-0.5">
                          {lang === "id" ? "Vagal Humming Lab" : "Vagal Humming & Resonance"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Olah suara stimulasi vagus" : "Polyvagal vocal toning synth"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>

                {/* Story Card Modal */}
                <AlexithymiaShareCardModal
                  isOpen={isShareCardOpen}
                  onClose={() => setIsShareCardOpen(false)}
                  result={result}
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

export default AlexithymiaTest;

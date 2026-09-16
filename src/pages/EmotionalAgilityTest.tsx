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
  Anchor,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  AGILITY_QUESTIONS,
  AGILITY_OPTIONS,
  calculateAgilityScore,
  AgilityLang,
} from "@/data/emotional-agility";
import { EmotionalAgilityShareCardModal } from "@/components/EmotionalAgilityShareCardModal";
import { toast } from "sonner";

interface EmotionalAgilityTestProps {
  defaultLang?: AgilityLang;
}

const EmotionalAgilityTest: React.FC<EmotionalAgilityTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<AgilityLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = AGILITY_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / AGILITY_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < AGILITY_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateAgilityScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🌿 Emotional Agility & Experiential Avoidance Screener:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Total Index: ${result.percentage}%
• Bottling (Suppression): ${result.subscales.bottling.percentage}%
• Brooding (Rumination): ${result.subscales.brooding.percentage}%
• Values-Aligned Action: ${result.subscales.values.percentage}%

Dr. Susan David 4-Step Protocol:
${result.profile.protocolDrills[lang].map((d, i) => `${i + 1}. ${d}`).join("\n")}

Screen your emotional agility free at: https://www.nuju.app/quiz/emotional-agility`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes kelincahan emosi berhasil disalin!"
          : "Emotional agility results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<AgilityLang, string> = {
    en: "Emotional Agility Test: Dr. Susan David AAQ-2 Psychological Screener | Ju",
    id: "Tes Emotional Agility & Kelincahan Emosi Online Gratis | Ju",
    de: "Emotional Agility Test: Kostenloser Selbsttest nach Dr. Susan David | Ju",
    fr: "Test d'Agilité Émotionnelle Gratuit en Ligne (Méthode Susan David) | Ju",
    es: "Test de Agilidad Emocional Gratis Online (Dr. Susan David) | Ju",
  };

  const metaDescriptions: Record<AgilityLang, string> = {
    en: "Assess your experiential avoidance, emotional bottling, and values-aligned action with our 12-item screener based on Dr. Susan David's Harvard research and the AAQ-2 model.",
    id: "Ukur tingkat penekanan emosi (bottling), overthinking (brooding), dan keselarasan nilai hidup dengan tes kelincahan emosi berbasis riset Harvard.",
    de: "Messen Sie Ihre emotionale Beweglichkeit, Grübelmuster und werteorientiertes Handeln mit dem 12-Fragen-Test nach dem Harvard-Modell von Dr. Susan David.",
    fr: "Évaluez votre flexibilité psychologique face aux ruminations et au refoulement grâce au test d'agilité émotionnelle inspiré des travaux de Harvard.",
    es: "Mide tu flexibilidad psicológica, patrones de rumiación y acción guiada por valores con el test de agilidad emocional basado en el modelo de Harvard.",
  };

  const t = {
    heroKicker: {
      en: "CLINICAL PSYCHOLOGY • DR. SUSAN DAVID & AAQ-2 MODEL",
      id: "PSIKOLOGI KLINIS • RISET HARVARD & MODEL AAQ-2",
      de: "KLINISCHE PSYCHOLOGIE • DR. SUSAN DAVID & AAQ-2",
      fr: "PSYCHOLOGIE CLINIQUE • MODÈLE HARVARD & AAQ-2",
      es: "PSICOLOGÍA CLÍNICA • MODELO HARVARD & AAQ-2",
    },
    heroTitle: {
      en: "Emotional Agility & Experiential Avoidance Diagnostic",
      id: "Tes Kelincahan Emosi & Pola Hindaran Rasa (Emotional Agility)",
      de: "Test für Emotionale Agilität & Psychologische Flexibilität",
      fr: "Diagnostic d'Agilité Émotionnelle & Évitement Expérientiel",
      es: "Diagnóstico de Agilidad Emocional & Evitación Experiencial",
    },
    heroDesc: {
      en: "Do you bottle up difficult feelings until you explode, or brood obsessively over past mistakes? Discover your agility score and unlock the 4-step protocol for un-hooking from destructive mental loops.",
      id: "Apakah Anda memendam emosi hingga meledak (bottling), atau justru tenggelam dalam overthinking tiada henti (brooding)? Temukan profil kelincahan emosi Anda dan latih protokol un-hooking dari pusaran pikiran negatif.",
      de: "Verschließen Sie schwierige Gefühle wie ein Stoiker, oder versinken Sie in endlosen Grübelschleifen? Ermitteln Sie Ihre seelische Beweglichkeit und befreien Sie sich von mentalen Fesseln.",
      fr: "Refoulez-vous vos émotions jusqu'à l'explosion, ou ruminez-vous sans fin ? Découvrez votre niveau d'agilité émotionnelle et apprenez à vous détacher des pièges mentaux.",
      es: "¿Te tragas las emociones difíciles hasta estallar o te ahogas en bucles de rumiación? Conoce tu grado de agilidad emocional y el método para desengancharte de pensamientos limitantes.",
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
      en: "Your Emotional Agility Breakdown",
      id: "Hasil Analisis Kelincahan Emosi Anda",
      de: "Ihr Emotionales Agilitäts-Ergebnis",
      fr: "Votre Bilan d'Agilité Émotionnelle",
      es: "Tu Resultado de Agilidad Emocional",
    },
    shareStoryCard: {
      en: "Generate Aesthetic Story Card",
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
      en: "Retake Screener",
      id: "Ulangi Tes",
      de: "Test wiederholen",
      fr: "Refaire le test",
      es: "Repetir test",
    },
    subscalesTitle: {
      en: "3 Pillars of Psychological Flexibility",
      id: "3 Pilar Fleksibilitas Psikologis",
      de: "3 Säulen der seelischen Beweglichkeit",
      fr: "Les 3 Piliers de la Flexibilité Psychologique",
      es: "3 Pilares de la Flexibilidad Psicológica",
    },
    protocolTitle: {
      en: "Evidence-Based Agility Protocols (Dr. Susan David)",
      id: "Protokol Kelincahan Emosi Berbasis Sains (Dr. Susan David)",
      de: "Wissenschaftliche Agilitäts-Übungen",
      fr: "Protocoles d'Agilité Validés Scientifiquement",
      es: "Protocolos de Agilidad Validados Científicamente",
    },
    relatedTools: {
      en: "Related Neurological & Somatic Tools",
      id: "Alat Somatik & Regulasi Saraf Terkait",
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
        canonical="https://www.nuju.app/quiz/emotional-agility"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header navigation & Language selector */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Quizzes</span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["en", "id", "de", "fr", "es"] as AgilityLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg font-bold uppercase transition ${
                    lang === l
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
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
            <AdSenseBanner slot="agility-top" format="auto" />
          </div>

          {!isCompleted ? (
            <div>
              {/* Hero Banner */}
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider mb-3">
                  <Wind className="w-3.5 h-3.5" />
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
                    {t.questionOf[lang]} {currentIndex + 1} / {AGILITY_QUESTIONS.length}
                  </span>
                  <span className="text-emerald-400">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* AdSense Mid */}
              {currentIndex === 5 && (
                <div className="my-6">
                  <AdSenseBanner slot="agility-mid" format="auto" />
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
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3">
                    {currentQ.dimension === "bottling" && (lang === "id" ? "Pola Penekanan Emosi" : "Bottling & Avoidance")}
                    {currentQ.dimension === "brooding" && (lang === "id" ? "Pusaran Ruminasi" : "Brooding & Fusion")}
                    {currentQ.dimension === "values" && (lang === "id" ? "Tindakan Selaras Nilai" : "Values-Aligned Action")}
                  </span>

                  <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {AGILITY_OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10"
                              : "bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                          }`}
                        >
                          <span>{opt.label[lang]}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition ${
                              isSelected ? "text-emerald-400 translate-x-1" : "text-slate-500"
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
                    <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                      <Compass className="w-4 h-4" />
                      <span>{t.subscalesTitle[lang]}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-rose-400 font-bold block mb-1">
                          {lang === "id" ? "Pola Bottling" : "Bottling (Suppression)"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.bottling.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.bottling.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${result.subscales.bottling.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-amber-400 font-bold block mb-1">
                          {lang === "id" ? "Pola Brooding" : "Brooding (Rumination)"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.brooding.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.brooding.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${result.subscales.brooding.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-emerald-400 font-bold block mb-1">
                          {lang === "id" ? "Aksi Selaras Nilai" : "Values-Aligned Action"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.values.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.values.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${result.subscales.values.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dr. Susan David 4-Step Protocols */}
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>{t.protocolTitle[lang]}</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {result.profile.protocolDrills[lang].map((drill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{drill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Sharing */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-teal-500/20 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t.shareStoryCard[lang]}</span>
                    </button>

                    <button
                      onClick={copyResults}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs transition"
                    >
                      <Copy className="w-4 h-4 text-emerald-400" />
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
                  <AdSenseBanner slot="agility-result" format="auto" />
                </div>

                {/* Ju App Conversion CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="max-w-md">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                      {lang === "id" ? "Terapkan Kelincahan Emosi Harian" : "Practice Daily Emotional Agility"}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {lang === "id"
                        ? "Curhat ke AI Ju & Pecahkan Pusaran Ruminasi Anda"
                        : "Venting & Value-Aligned Defusion in Ju AI Journal"}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === "id"
                        ? "Lepaskan emosi terpendam tanpa takut dihakimi. Ju mendengarkan dengan penuh empati dan membimbing Anda mengambil tindakan bermakna."
                        : "Un-hook from toxic mental chatter with private, safe somatic voice journaling powered by empathetic AI."}
                    </p>
                  </div>
                  <AppStoreCta source="agility_quiz" />
                </div>

                {/* Related Somatic & Nervous System Tools */}
                <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    {t.relatedTools[lang]}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link
                      to="/tools/box-breathing"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                          {lang === "id" ? "Napas Kotak Navy SEAL" : "Navy SEAL Box Breathing"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Reset otonom dalam 2 menit" : "2-min tactical vagus reset"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/quiz/high-functioning-anxiety"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-amber-400 block mb-0.5">
                          {lang === "id" ? "Tes Anxiety Tersembunyi" : "High-Functioning Anxiety"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Diagnosa topeng ketabahan" : "Overthinking mask diagnostic"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/quiz/cognitive-distortions"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-teal-400 block mb-0.5">
                          {lang === "id" ? "Distorsi Kognitif (CBT)" : "Cognitive Distortions"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Deteksi jebakan overthinking" : "Spot 10 thinking traps"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>

                {/* Story Card Modal */}
                <EmotionalAgilityShareCardModal
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

export default EmotionalAgilityTest;

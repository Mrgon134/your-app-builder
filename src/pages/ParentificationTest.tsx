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
  HeartHandshake,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  PARENTIFICATION_QUESTIONS,
  PARENTIFICATION_OPTIONS,
  calculateParentificationScore,
  ParentificationLang,
} from "@/data/parentification";
import { ParentificationShareCardModal } from "@/components/ParentificationShareCardModal";
import { toast } from "sonner";

interface ParentificationTestProps {
  defaultLang?: ParentificationLang;
}

const ParentificationTest: React.FC<ParentificationTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<ParentificationLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = PARENTIFICATION_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / PARENTIFICATION_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < PARENTIFICATION_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateParentificationScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🏡 Parentification & Eldest Child Syndrome Diagnostic:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Emotional Parentification: ${result.subscales.emotional_parentification.percentage}%
• Instrumental Burden: ${result.subscales.instrumental_burden.percentage}%
• Compulsive Hyper-Duty: ${result.subscales.hyper_responsibility.percentage}%

Reparenting & Boundary Protocols:
${result.profile.reparentingDrills[lang].map((d, i) => `${i + 1}. ${d}`).join("\n")}

Screen your eldest child syndrome free at: https://www.nuju.app/quiz/parentification`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes parentifikasi berhasil disalin!"
          : "Parentification results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<ParentificationLang, string> = {
    en: "Parentification Test: Eldest Child Syndrome Screener | Ju",
    id: "Tes Parentifikasi & Sindrom Anak Pertama Online Gratis | Ju",
    de: "Parentifizierungs-Test: Erstgeborenen-Syndrom Selbsttest | Ju",
    fr: "Test de Parentification Gratuit : Syndrome de l'Enfant Aîné | Ju",
    es: "Test de Parentificación Gratis: Síndrome del Hijo Mayor | Ju",
  };

  const metaDescriptions: Record<ParentificationLang, string> = {
    en: "Did you grow up as your family's emotional therapist or caretaker? Take our free 12-item Parentification and Eldest Child Syndrome diagnostic with reparenting drills.",
    id: "Apakah masa kecil Anda terampas karena harus menjadi pengasuh emosional orang tua atau adik? Ukur tingkat parentifikasi batin dan pelajari batasan diri yang sehat.",
    de: "Mussten Sie als Kind zu früh Erwachsenenlasten tragen? Machen Sie unseren 12-Fragen-Selbsttest für Parentifizierung und Erstgeborenen-Syndrom.",
    fr: "Avez-vous été le confident ou le parent de vos propres parents ? Évaluez l'impact de la parentification avec notre test clinique de 12 questions.",
    es: "¿Asumiste el rol de protector o terapeuta de tu familia desde niño? Mide la huella de la parentificación y recupera tu espacio propio con este test de 12 preguntas.",
  };

  const t = {
    heroKicker: {
      en: "FAMILY SYSTEMS PSYCHOLOGY • DR. SALVADOR MINUCHIN MODEL",
      id: "PSIKOLOGI SISTEM KELUARGA • MODEL DR. SALVADOR MINUCHIN",
      de: "FAMILIENSYSTEME • NACH DR. SALVADOR MINUCHIN",
      fr: "PSYCHOLOGIE FAMILIALE • MODÈLE MINUCHIN & GIBSON",
      es: "PSICOLOGÍA SISTÉMICA • MODELO SALVADOR MINUCHIN",
    },
    heroTitle: {
      en: "Parentification & Eldest Child Syndrome Diagnostic",
      id: "Tes Parentifikasi & Sindrom Beban Anak Pertama (Eldest Child)",
      de: "Test für Parentifizierung & Erstgeborenen-Syndrom",
      fr: "Diagnostic de Parentification & Syndrome de l'Aîné",
      es: "Diagnóstico de Parentificación & Síndrome del Hijo Mayor",
    },
    heroDesc: {
      en: "Did you forfeit your childhood to soothe your parents' emotional storms or manage adult family crises? Unpack the hidden psychological toll of chronic hyper-responsibility.",
      id: "Apakah masa kecil Anda terampas karena harus menenangkan badai emosi orang tua atau memikul beban krisis keluarga? Kenali akar rasa bersalah dan kelelahan batin Anda.",
      de: "Wurden Sie als Kind zum Vertrauten oder Retter Ihrer Eltern gemacht? Erkennen Sie die verborgenen Spuren chronischer Überverantwortung und finden Sie zu sich selbst.",
      fr: "Avez-vous sacrifié votre insouciance pour apaiser les drames familiaux ? Évaluez la charge invisible de l'hyper-responsabilité et réapprenez à vous choisir.",
      es: "¿Tuviste que madurar a la fuerza para sostener a tus padres o salvar a tu familia? Descubre el coste invisible de la hiperresponsabilidad y sana tus límites.",
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
      en: "Your Family System Assessment",
      id: "Hasil Analisis Beban Parentifikasi",
      de: "Ihr Parentifizierungs-Ergebnis",
      fr: "Votre Bilan Systémique Familial",
      es: "Tu Diagnóstico Familiar",
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
      en: "Retake Diagnostic",
      id: "Ulangi Tes",
      de: "Test wiederholen",
      fr: "Refaire le test",
      es: "Repetir test",
    },
    subscalesTitle: {
      en: "3 Dimensions of Parentification",
      id: "3 Dimensi Beban Parentifikasi",
      de: "3 Säulen der Rollenumkehr",
      fr: "3 Dimensions de la Parentification",
      es: "3 Dimensiones de la Parentificación",
    },
    protocolTitle: {
      en: "Reparenting & Inner-Child Boundary Drills",
      id: "Protokol Reparenting & Penegakan Batasan Batin",
      de: "Übungen zur Nachbeelterung & Grenzziehung",
      fr: "Exercices de Reparentage & Pose de Limites",
      es: "Ejercicios de Reparentalización & Límites Sanos",
    },
    relatedTools: {
      en: "Recommended Diagnostics & Somatic Labs",
      id: "Tes Psikologi & Alat Somatik Terkait",
      de: "Verwandte Psychologische Werkzeuge",
      fr: "Diagnostics et Outils Recommandés",
      es: "Herramientas Somáticas Recomendadas",
    },
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/parentification"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Top navigation & Language switch */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Quizzes</span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["en", "id", "de", "fr", "es"] as ParentificationLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg font-bold uppercase transition ${
                    lang === l
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
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
            <AdSenseBanner slot="parentification-top" format="auto" />
          </div>

          {!isCompleted ? (
            <div>
              {/* Hero Banner */}
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-wider mb-3">
                  <HeartHandshake className="w-3.5 h-3.5" />
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
                    {t.questionOf[lang]} {currentIndex + 1} / {PARENTIFICATION_QUESTIONS.length}
                  </span>
                  <span className="text-rose-400">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* AdSense Mid */}
              {currentIndex === 5 && (
                <div className="my-6">
                  <AdSenseBanner slot="parentification-mid" format="auto" />
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
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-400 block mb-3">
                    {currentQ.dimension === "emotional_parentification" && (lang === "id" ? "Parentifikasi Emosional (Tempat Curhat Orang Tua)" : "Emotional Parentification")}
                    {currentQ.dimension === "instrumental_burden" && (lang === "id" ? "Beban Tanggung Jawab Dewasa Terlalu Dini" : "Instrumental Role Burden")}
                    {currentQ.dimension === "hyper_responsibility" && (lang === "id" ? "Kewajiban Menolong Kompulsif & Rasa Bersalah" : "Compulsive Hyper-Responsibility")}
                  </span>

                  <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {PARENTIFICATION_OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/10"
                              : "bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                          }`}
                        >
                          <span>{opt.label[lang]}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition ${
                              isSelected ? "text-rose-400 translate-x-1" : "text-slate-500"
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
                    <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{t.subscalesTitle[lang]}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-rose-400 font-bold block mb-1">
                          {lang === "id" ? "Parentifikasi Emosional" : "Emotional Confidant"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.emotional_parentification.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.emotional_parentification.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${result.subscales.emotional_parentification.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-amber-400 font-bold block mb-1">
                          {lang === "id" ? "Beban Tugas Dewasa" : "Instrumental Burden"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.instrumental_burden.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.instrumental_burden.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${result.subscales.instrumental_burden.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-indigo-400 font-bold block mb-1">
                          {lang === "id" ? "Tanggung Jawab Kompulsif" : "Hyper-Responsibility"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.hyper_responsibility.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.hyper_responsibility.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${result.subscales.hyper_responsibility.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reparenting Protocols */}
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-rose-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>{t.protocolTitle[lang]}</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {result.profile.reparentingDrills[lang].map((drill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{drill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Sharing */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-semibold text-xs shadow-lg shadow-rose-500/20 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t.shareStoryCard[lang]}</span>
                    </button>

                    <button
                      onClick={copyResults}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs transition"
                    >
                      <Copy className="w-4 h-4 text-rose-400" />
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
                  <AdSenseBanner slot="parentification-result" format="auto" />
                </div>

                {/* Ju App Conversion CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-rose-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="max-w-md">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-1">
                      {lang === "id" ? "Beri Ruang untuk Diri Anda" : "Reclaim Your Sovereign Self"}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {lang === "id"
                        ? "Curhat Tanpa Beban Merawat Orang Lain di Ju AI Journal"
                        : "Private Inner Child & Boundary Journaling in Ju"}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === "id"
                        ? "Anda tidak harus selalu menjadi sosok kuat yang membereskan masalah keluarga. Ungkapkan kelelahan batin Anda secara aman dan privat."
                        : "Release the chronic burden of caretaking. Ju provides an empathetic, confidential space to unpack family guilt and set liberating boundaries."}
                    </p>
                  </div>
                  <AppStoreCta source="parentification_quiz" />
                </div>

                {/* Related Tools */}
                <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    {t.relatedTools[lang]}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link
                      to="/quiz/inner-child"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-rose-400 block mb-0.5">
                          {lang === "id" ? "Tes Luka Inner Child" : "Inner Child Wound Screener"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Kenali luka masa kecil" : "Identify childhood wounds"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/quiz/people-pleasing"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-amber-400 block mb-0.5">
                          {lang === "id" ? "Tes People Pleaser" : "People-Pleasing Screener"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Sulit berkata tidak" : "Boundary guilt assessment"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/tools/box-breathing"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                          {lang === "id" ? "Napas Kotak Navy SEAL" : "Navy SEAL Box Breathing"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Reset otonom dalam 2 menit" : "Instant vagal de-escalation"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>

                {/* Story Card Modal */}
                <ParentificationShareCardModal
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

export default ParentificationTest;

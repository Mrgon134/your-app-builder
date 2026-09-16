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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  HFA_QUESTIONS,
  HFA_OPTIONS,
  calculateHfaScore,
  HfaLang,
} from "@/data/high-functioning-anxiety";
import { HfaShareCardModal } from "@/components/HfaShareCardModal";
import { toast } from "sonner";

interface HighFunctioningAnxietyTestProps {
  defaultLang?: HfaLang;
}

const HighFunctioningAnxietyTest: React.FC<HighFunctioningAnxietyTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<HfaLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = HFA_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / HFA_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < HFA_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculateHfaScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const text = `🎭 High-Functioning Anxiety & Overthinking Mask Diagnostic:
Profile: ${result.profile.title[lang]} (${result.profile.badge[lang]})
Total Burden Score: ${result.totalScore} / ${result.maxScore} (${result.percentage}%)
• Internal Turmoil (Dread): ${result.subscales.internal_turmoil.percentage}%
• Hyper-Performance (Over-Functioning): ${result.subscales.hyper_performance.percentage}%
• Composure Mask (Facade): ${result.subscales.composure_mask.percentage}%

Vagal Reset & De-Masking Drills:
${result.profile.demaskingDrills[lang].map((d, i) => `${i + 1}. ${d}`).join("\n")}

Screen your anxiety mask free at: https://www.nuju.app/quiz/high-functioning-anxiety`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(
        lang === "id"
          ? "Hasil tes anxiety tersembunyi berhasil disalin!"
          : "High-functioning anxiety results copied to clipboard!"
      );
    }
  };

  const metaTitles: Record<HfaLang, string> = {
    en: "High-Functioning Anxiety Test: Overthinking Mask Diagnostic | Ju",
    id: "Tes High-Functioning Anxiety & Kecemasan Tersembunyi Online | Ju",
    de: "Hochfunktionale Angst Test: GAD-7 & Maskierungs-Selbsttest | Ju",
    fr: "Test Anxiété de Haute Performance & Masque de Réussite Gratuit | Ju",
    es: "Test de Ansiedad Funcional & Máscara de Rendimiento Online | Ju",
  };

  const metaDescriptions: Record<HfaLang, string> = {
    en: "Take our clinical 12-item high-functioning anxiety test. Uncover whether your perfectionism, hyper-performance, and calm facade are masking silent biological dread and burnout.",
    id: "Ukur tingkat kecemasan tersembunyi (high-functioning anxiety), dorongan perfeksionisme berlebihan, dan topeng ketabahan semu dengan tes klinis 12 pertanyaan.",
    de: "Machen Sie den 12-Fragen-Test für hochfunktionale Angst. Erkennen Sie, ob Perfektionismus und scheinbare Gelassenheit ein erschöpftes Nervensystem überdecken.",
    fr: "Découvrez si votre quête d'excellence et votre calme apparent cachent une anxiété de performance sévère grâce à notre test somatique de 12 questions.",
    es: "Descubre si tu perfeccionismo y aparente control esconden una ansiedad de alto rendimiento con este test clínico de 12 preguntas.",
  };

  const t = {
    heroKicker: {
      en: "CLINICAL DIAGNOSTICS • GAD-7 & MASKING MATRIX",
      id: "DIAGNOSTIK KLINIS • GAD-7 & MATRIKS TOPENG CEMAS",
      de: "KLINISCHE DIAGNOSTIK • GAD-7 & MASKIERUNGSMATRIX",
      fr: "DIAGNOSTIC CLINIQUE • GAD-7 & MATRICE DE MASQUAGE",
      es: "DIAGNÓSTICO CLÍNICO • GAD-7 & MATRIZ DE MÁSCARA",
    },
    heroTitle: {
      en: "High-Functioning Anxiety & Overthinking Mask Diagnostic",
      id: "Tes High-Functioning Anxiety & Topeng Ketabahan Semu",
      de: "Selbsttest für Hochfunktionale Angst & Maskierung",
      fr: "Diagnostic d'Anxiété de Performance & Masque Social",
      es: "Diagnóstico de Ansiedad de Alto Rendimiento & Máscara",
    },
    heroDesc: {
      en: "Do people see you as calm, capable, and hyper-organized, while you are secretly drowning in gastrointestinal knots and racing midnight thoughts? Assess your true biological load and de-mask safely.",
      id: "Apakah orang lain menganggap Anda tenang, sukses, dan selalu bisa diandalkan, padahal di dalam dada Anda merasa sesak, cemas, dan kelelahan menahan topeng? Ukur beban biologis Anda dan pelajari teknik regulasi saraf.",
      de: "Gelten Sie nach außen als unverwüstlicher Leistungsträger, während innerlich ständige Alarmbereitschaft herrscht? Enttarnen Sie Ihre funktionale Angst und schützen Sie sich vor dem Kollaps.",
      fr: "Passez-vous pour un pilier imperturbable alors que vous luttez en secret contre la boule au ventre et les insomnies ? Mesurez votre charge anxieuse invisible et apprenez à désamorcer la tension.",
      es: "¿Te ven como alguien exitoso e imperturbable mientras por dentro batallas contra la opresión en el pecho y el insomnio? Mide tu nivel real de ansiedad funcional y desmonta la coraza.",
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
      en: "Your Diagnostic Breakdown",
      id: "Hasil Diagnostik Anxiety Tersembunyi",
      de: "Ihr Diagnostisches Ergebnis",
      fr: "Votre Bilan Clinique",
      es: "Tu Desglose Diagnóstico",
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
      en: "3 Dimensions of High-Functioning Anxiety",
      id: "3 Dimensi High-Functioning Anxiety",
      de: "3 Dimensionen der Hochfunktionalen Angst",
      fr: "3 Dimensions de l'Anxiété Masquée",
      es: "3 Dimensiones de la Ansiedad Funcional",
    },
    protocolTitle: {
      en: "Somatic De-Masking & Vagal Recovery Drills",
      id: "Latihan Somatik Pelepasan Topeng & Regulasi Vagus",
      de: "Somatische Entlastungs- & Vagus-Übungen",
      fr: "Exercices Somatiques & Régulation Vagale",
      es: "Ejercicios Somáticos de Regulación Vagal",
    },
    relatedTools: {
      en: "Recommended Autonomic & Somatic Tools",
      id: "Alat Somatik & Regulasi Terkait",
      de: "Empfohlene Somatische Werkzeuge",
      fr: "Outils Somatiques Recommandés",
      es: "Herramientas Somáticas Recomendadas",
    },
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/quiz/high-functioning-anxiety"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header navigation & Language selector */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Quizzes</span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["en", "id", "de", "fr", "es"] as HfaLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg font-bold uppercase transition ${
                    lang === l
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
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
            <AdSenseBanner slot="hfa-top" format="auto" />
          </div>

          {!isCompleted ? (
            <div>
              {/* Hero Banner */}
              <div className="mb-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wider mb-3">
                  <HeartPulse className="w-3.5 h-3.5" />
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
                    {t.questionOf[lang]} {currentIndex + 1} / {HFA_QUESTIONS.length}
                  </span>
                  <span className="text-amber-400">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* AdSense Mid */}
              {currentIndex === 5 && (
                <div className="my-6">
                  <AdSenseBanner slot="hfa-mid" format="auto" />
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
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-3">
                    {currentQ.dimension === "internal_turmoil" && (lang === "id" ? "Kegelisahan Batin Tersembunyi" : "Internal Biological Turmoil")}
                    {currentQ.dimension === "hyper_performance" && (lang === "id" ? "Hiper-Produktivitas & Cemas Gagal" : "Hyper-Performance Defense")}
                    {currentQ.dimension === "composure_mask" && (lang === "id" ? "Topeng Ketenangan Semu" : "Composure Mask")}
                  </span>

                  <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                    {currentQ.text[lang]}
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {HFA_OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`flex items-center justify-between p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-200 ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10"
                              : "bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                          }`}
                        >
                          <span>{opt.label[lang]}</span>
                          <ChevronRight
                            className={`w-4 h-4 transition ${
                              isSelected ? "text-amber-400 translate-x-1" : "text-slate-500"
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
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>{t.subscalesTitle[lang]}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-rose-400 font-bold block mb-1">
                          {lang === "id" ? "Kegelisahan Batin" : "Internal Turmoil"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.internal_turmoil.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.internal_turmoil.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${result.subscales.internal_turmoil.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-amber-400 font-bold block mb-1">
                          {lang === "id" ? "Hiper-Produktivitas" : "Hyper-Performance"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.hyper_performance.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.hyper_performance.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${result.subscales.hyper_performance.percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                        <span className="text-xs text-sky-400 font-bold block mb-1">
                          {lang === "id" ? "Topeng Ketenangan" : "Composure Mask"}
                        </span>
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-2xl font-black text-white">
                            {result.subscales.composure_mask.percentage}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {result.subscales.composure_mask.score}/12
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${result.subscales.composure_mask.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Somatic De-Masking Drills */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{t.protocolTitle[lang]}</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {result.profile.demaskingDrills[lang].map((drill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{drill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions & Sharing */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold text-xs shadow-lg shadow-amber-500/20 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{t.shareStoryCard[lang]}</span>
                    </button>

                    <button
                      onClick={copyResults}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-xs transition"
                    >
                      <Copy className="w-4 h-4 text-amber-400" />
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
                  <AdSenseBanner slot="hfa-result" format="auto" />
                </div>

                {/* Ju App Conversion CTA */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="max-w-md">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      {lang === "id" ? "Lepas Beban Topeng Anda" : "Drop the Exhausting Mask"}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {lang === "id"
                        ? "Curhat Aman Tanpa Filter ke Ju AI Journal"
                        : "Private Voice Venting in Ju AI Journal"}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === "id"
                        ? "Anda tidak perlu selalu kuat di hadapan Ju. Bicarakan kecemasan dan kepenatan Anda kapan saja dengan privasi terenkripsi."
                        : "You don't need to stay composed here. Release unspoken anxiety, track autonomic triggers, and regain true calm."}
                    </p>
                  </div>
                  <AppStoreCta source="hfa_quiz" />
                </div>

                {/* Related Tools */}
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
                          {lang === "id" ? "Turunkan kortisol instan" : "Instant tactical vagal reset"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/quiz/imposter-syndrome"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-amber-400 block mb-0.5">
                          {lang === "id" ? "Tes Imposter Syndrome" : "Imposter Syndrome Test"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "5 arketipe rasa takut gagal" : "5 archetypes of fraud terror"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                    </Link>

                    <Link
                      to="/tools/nsdr"
                      className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-xs font-bold text-teal-400 block mb-0.5">
                          {lang === "id" ? "Stanford NSDR Lab" : "Stanford NSDR Audio Lab"}
                        </span>
                        <p className="text-xs text-slate-400">
                          {lang === "id" ? "Pemulihan dopamin & tidur" : "Dopamine & parasympathetic reset"}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>

                {/* Story Card Modal */}
                <HfaShareCardModal
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

export default HighFunctioningAnxietyTest;

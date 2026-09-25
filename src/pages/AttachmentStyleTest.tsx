import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  Brain,
  Share2,
  RotateCcw,
  Copy,
  BookOpen,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  ATTACHMENT_QUESTIONS,
  ATTACHMENT_RESULTS,
  evaluateAttachmentStyle,
  AttachmentResult,
} from "@/data/attachment-style";
import AttachmentShareCardModal from "@/components/AttachmentShareCardModal";
import { SupportedLang } from "@/data/dass21";
import juMain from "@/assets/ju-main.webp";
import { toast } from "sonner";

interface AttachmentStyleTestProps {
  defaultLang?: SupportedLang;
}

const AttachmentStyleTest: React.FC<AttachmentStyleTestProps> = ({ defaultLang = "en" }) => {
  const navigate = useNavigate();

  const [lang, setLang] = useState<SupportedLang>(() => {
    if (defaultLang && ["en", "de", "fr", "es", "id"].includes(defaultLang)) return defaultLang;
    try {
      const saved = localStorage.getItem("nuju-attachment-lang") as SupportedLang | null;
      if (saved && ["en", "de", "fr", "es", "id"].includes(saved)) return saved;
      const searchParam = new URLSearchParams(window.location.search).get("lang") as SupportedLang | null;
      if (searchParam && ["en", "de", "fr", "es", "id"].includes(searchParam)) return searchParam;
    } catch {
      // ignore
    }
    return "en";
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<{
    style: AttachmentResult;
    anxietyScore: number;
    avoidanceScore: number;
  } | null>(null);
  const [isShareCardOpen, setIsShareCardOpen] = useState<boolean>(false);

  const handleToggleLang = (newLang: SupportedLang) => {
    setLang(newLang);
    try {
      localStorage.setItem("nuju-attachment-lang", newLang);
    } catch {
      // ignore
    }
  };

  const currentQ = ATTACHMENT_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / ATTACHMENT_QUESTIONS.length) * 100);

  const handleSelectOption = (optionId: string) => {
    const updated = { ...answers, [currentQ.id]: optionId };
    setAnswers(updated);

    if (currentIndex === ATTACHMENT_QUESTIONS.length - 1) {
      finishAssessment(updated);
    } else {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        window.scrollTo({ top: 80, behavior: "smooth" });
      }, 220);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 80, behavior: "smooth" });
    }
  };

  const finishAssessment = (finalAnswers: Record<number, string>) => {
    setIsAnalyzing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      const res = evaluateAttachmentStyle(finalAnswers);
      setEvaluation(res);
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setEvaluation(null);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    toast.success(
      lang === "en" ? "Prompt copied to clipboard!" :
      lang === "de" ? "Prompt in die Zwischenablage kopiert!" :
      lang === "fr" ? "Prompt copié dans le presse-papiers !" :
      lang === "es" ? "¡Prompt copiado al portapapeles!" :
      "Prompt berhasil disalin ke clipboard!"
    );
  };

  const copyShareText = () => {
    if (!evaluation) return;
    const shareText = `${evaluation.style.title[lang]} - Attachment Style Checkup on Nuju: ${evaluation.style.subtitle[lang]}\n\nhttps://nuju.app/quiz/attachment-style`;
    navigator.clipboard.writeText(shareText);
    toast.success(
      lang === "en" ? "Result copied to clipboard!" :
      lang === "de" ? "Ergebnis kopiert!" :
      lang === "fr" ? "Résultat copié !" :
      lang === "es" ? "¡Resultado copiado!" :
      "Hasil tes berhasil disalin!"
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-rose-200">
      <SEOHead
        title={
          lang === "en" ? "Free Attachment Style Quiz Online (ECR-R): Secure, Anxious, Avoidant | Nuju" :
          lang === "de" ? "Bindungsstil Test (Wissenschaftlich) | Sicher, Ängstlich, Vermeidend" :
          lang === "fr" ? "Test de Style d'Attachement (ECR-R) | Sécurisant, Anxieux, Évitant" :
          lang === "es" ? "Test de Estilo de Apego (ECR-R) | Seguro, Ansioso, Evitativo" :
          "Tes Gaya Kelekatan Hubungan (Attachment Style) | Secure, Anxious, Avoidant"
        }
        description={
          lang === "en" ? "Take our free attachment style quiz online based on the scientific ECR-R model. Discover whether you are Secure, Anxious-Preoccupied, Dismissive-Avoidant, or Fearful." :
          lang === "de" ? "Finde deinen Beziehungstyp heraus mit dem wissenschaftlichen ECR-R Modell. Erfahre deine Muster bei Nähe und Bindungsangst." :
          lang === "fr" ? "Découvrez votre profil relationnel avec le modèle ECR-R. Comprenez vos réactions émotionnelles en amour." :
          lang === "es" ? "Descubre tu estilo de apego en las relaciones con el modelo ECR-R. Comprende tus patrones de cercanía e intimidad." :
          "Ketahui gaya kelekatan hubunganmu (Secure, Anxious, Avoidant, atau Fearful) berdasarkan psikologi ECR-R. Gratis dan privat."
        }
        canonical="https://nuju.app/quiz/attachment-style"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: lang === "en" ? "Relationship Attachment Style Quiz (ECR-R)" : "Tes Gaya Kelekatan Hubungan (ECR-R)",
            description: "Evidence-based adult attachment screener based on Experiences in Close Relationships-Revised (ECR-R).",
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
                name: "Can I take the attachment style quiz for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Nuju offers the validated ECR-R relationship attachment style quiz 100% free with no sign-up or credit card required. Receive instant feedback and tailored reflection prompts.",
                },
              },
              {
                "@type": "Question",
                name: "What are the 4 attachment styles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The 4 attachment styles are Secure (comfortable with intimacy and autonomy), Anxious-Preoccupied (fears abandonment, craves constant closeness), Dismissive-Avoidant (equates intimacy with loss of independence), and Fearful-Avoidant / Disorganized (craves closeness but fears getting hurt).",
                },
              },
              {
                "@type": "Question",
                name: "Can my attachment style change over time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Attachment styles are dynamic emotional adaptations, not permanent life sentences. Through somatic awareness, honest communication, therapy, and secure relationships, you can develop earned security.",
                },
              },
              {
                "@type": "Question",
                name: "How is the Nuju attachment style test scored?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nuju uses continuous dimensional scoring based on the scientific ECR-R model, measuring Attachment Anxiety and Attachment Avoidance independently along two spectrums rather than forcing you into a single rigid label.",
                },
              },
              {
                "@type": "Question",
                name: "What is the rarest attachment style?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fearful-Avoidant (also called Disorganized) attachment is the rarest style, observed in approximately 3% to 5% of the general population. It is characterized by high anxiety and high avoidance simultaneously.",
                },
              },
            ],
          },
        ]}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{lang === "en" ? "All Quizzes" : "Semua Kuis"}</span>
            <span className="sm:hidden">{lang === "en" ? "Back" : "Kembali"}</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <img src={juMain} alt="Ju mascot" className="h-7 w-7 rounded-full object-cover shadow-xs" />
            <span className="font-bold text-sm text-neutral-900">
              nuju<span className="text-rose-600">.quiz</span>
            </span>
          </Link>

          {/* 5-Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-full border border-neutral-300/80 bg-white p-0.5 shadow-xs overflow-x-auto">
              {[
                { code: "en" as const, label: "EN", flag: "🇬🇧", title: "English (Primary)" },
                { code: "de" as const, label: "DE", flag: "🇩🇪", title: "Deutsch" },
                { code: "fr" as const, label: "FR", flag: "🇫🇷", title: "Français" },
                { code: "es" as const, label: "ES", flag: "🇪🇸", title: "Español" },
                { code: "id" as const, label: "ID", flag: "🇮🇩", title: "Bahasa Indonesia" },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleToggleLang(l.code)}
                  className={`rounded-full px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold transition ${
                    lang === l.code ? "bg-neutral-900 text-white shadow-xs" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                  title={l.title}
                >
                  <span className="hidden sm:inline mr-1">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>

            <Link
              to="/app"
              className="rounded-full bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 transition shadow-xs"
            >
              {lang === "en" ? "App" : "Buka App"}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* State 1: Analyzing */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <img
                src={juMain}
                alt="Ju analyzing"
                className="h-24 w-24 rounded-full border-4 border-rose-200 object-cover animate-bounce shadow-md"
              />
              <Sparkles className="absolute -top-2 -right-2 h-7 w-7 text-rose-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {lang === "en" ? "Mapping Your Relationship Archetype..." :
               lang === "de" ? "Analysiere dein Beziehungsmuster..." :
               lang === "fr" ? "Cartographie de votre profil d'attachement..." :
               lang === "es" ? "Mapeando tu estilo de vinculación..." :
               "Ju Sedang Memetakan Gaya Kelekatanmu..."}
            </h2>
            <p className="mt-2 text-sm text-neutral-500 max-w-md">
              {lang === "en" ? "Calculating Attachment Anxiety vs. Attachment Avoidance across relational scenarios." :
               lang === "de" ? "Berechnung von Bindungsangst und Vermeidungsverhalten nach dem ECR-R Modell." :
               lang === "fr" ? "Calcul des dimensions d'anxiété et d'évitement selon le modèle scientifique." :
               lang === "es" ? "Calculando dimensiones de ansiedad y aislamiento interpersonal." :
               "Menghitung skor kecemasan dan penghindaran emosional berdasarkan sains kelekatan ECR-R."}
            </p>
          </div>
        )}

        {/* State 2: Result */}
        {!isAnalyzing && evaluation && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Top Archetype Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-lg">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-400/10 blur-3xl" />
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-purple-400/10 blur-3xl" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-semibold text-rose-900">
                    <Heart className="h-3.5 w-3.5 text-rose-600" />
                    {lang === "en" ? "Relationship Psychology (ECR-R)" : "Psikologi Hubungan (ECR-R)"}
                  </span>
                  <span className="text-xs font-medium text-neutral-400">
                    {evaluation.style.badge[lang]}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6">
                  <img
                    src={evaluation.style.mascotImage}
                    alt="Ju mood"
                    className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-rose-100 object-cover shadow-md flex-shrink-0"
                  />
                  <div className="text-center sm:text-left space-y-2">
                    <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                      {lang === "en" ? "Your Dominant Attachment Style" : "Gaya Kelekatan Dominan Kamu"}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                      {evaluation.style.title[lang]}
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                      {evaluation.style.subtitle[lang]}
                    </p>
                  </div>
                </div>

                {/* 2D Coordinates Meter */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80">
                  <div>
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                      {lang === "en" ? "Attachment Anxiety" : "Kecemasan Kelekatan"}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-rose-600">{evaluation.anxietyScore}%</span>
                      <span className="text-[11px] text-neutral-400">({evaluation.anxietyScore > 50 ? "High" : "Low"})</span>
                    </div>
                    <div className="w-full bg-neutral-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: `${evaluation.anxietyScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                      {lang === "en" ? "Attachment Avoidance" : "Penghindaran Kelekatan"}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-purple-600">{evaluation.avoidanceScore}%</span>
                      <span className="text-[11px] text-neutral-400">({evaluation.avoidanceScore > 50 ? "High" : "Low"})</span>
                    </div>
                    <div className="w-full bg-neutral-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${evaluation.avoidanceScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* Core Trait Description */}
                <div className="rounded-2xl bg-[#FAF9F6] p-4 sm:p-5 border border-neutral-200/80 text-sm text-neutral-700 leading-relaxed mb-6">
                  <p className="mb-2 font-medium">{evaluation.style.coreTrait[lang]}</p>
                  <p className="text-xs sm:text-sm text-neutral-600">{evaluation.style.description[lang]}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsShareCardOpen(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{lang === "en" ? "Share Story Card" : "Bagikan Kartu Story"}</span>
                  </button>

                  <button
                    onClick={handleRetake}
                    className="flex items-center justify-center gap-2 rounded-full border border-neutral-300/80 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{lang === "en" ? "Retake" : "Ulangi"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Strategic AdSense Placement */}
            <div className="my-6">
              <AdSenseBanner slot="quiz-attachment-result-mid" format="auto" />
            </div>

            {/* Relationship Trigger & Communication Script */}
            <section className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-bold text-neutral-900 text-base mb-1 flex items-center gap-2">
                  <span>⚡</span>
                  <span>{lang === "en" ? "Your Primary Relationship Trigger" : "Pemicu Utama Keteganganmu"}</span>
                </h3>
                <p className="text-sm text-neutral-600 bg-rose-50/60 border border-rose-100 p-3.5 rounded-xl">
                  {evaluation.style.triggerText[lang]}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 text-base mb-1 flex items-center gap-2">
                  <span>💬</span>
                  <span>{lang === "en" ? "Healthy Communication Script to De-escalate" : "Contoh Kalimat Komunikasi Sehat"}</span>
                </h3>
                <blockquote className="text-sm italic font-serif text-neutral-800 bg-neutral-50 border border-neutral-200/80 p-4 rounded-xl leading-relaxed">
                  "{evaluation.style.communicationScript[lang]}"
                </blockquote>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 text-base mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{lang === "en" ? "Action Steps to Move Toward Secure Attachment" : "Langkah Menuju Kelekatan Aman"}</span>
                </h3>
                <div className="space-y-2">
                  {evaluation.style.actionSteps[lang].map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <span className="flex-shrink-0 text-emerald-600 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bridge to Nuju Journaling */}
            <section className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-orange-100/30 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img src={juMain} alt="Ju prompt" className="h-10 w-10 rounded-full object-cover shadow-xs" />
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base sm:text-lg">
                      {lang === "en" ? "Heal Insecure Attachment in Your Journal" : "Pulihkan Gaya Kelekatan Lewat Jurnal"}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {lang === "en" ? "Expressive writing reprograms unconscious relationship triggers." : "Menulis ekspresif melatih sistem saraf menjadi lebih tenang."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyPrompt(evaluation.style.recommendedJournalPrompt[lang])}
                  className="flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition shadow-xs"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{lang === "en" ? "Copy Prompt" : "Salin Prompt"}</span>
                </button>
              </div>

              <blockquote className="rounded-2xl bg-white/90 p-4 sm:p-5 border border-amber-200/80 text-sm sm:text-base italic text-neutral-800 font-serif leading-relaxed mb-5 shadow-xs">
                "{evaluation.style.recommendedJournalPrompt[lang]}"
              </blockquote>

              <button
                type="button"
                onClick={() => {
                  try {
                    sessionStorage.setItem("nuju-prefilled-prompt", evaluation.style.recommendedJournalPrompt[lang]);
                  } catch {
                    // ignore
                  }
                  navigate("/app");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition shadow-xs"
              >
                <BookOpen className="h-4 w-4" />
                <span>{lang === "en" ? "Write in Nuju Journal" : "Tulis di Jurnal Nuju"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </section>

            {/* Follow-up Game Promo */}
            <section className="overflow-hidden rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1.5 max-w-md">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                    🎮 Mindful Mini-Game
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900">
                    {lang === "en" ? "Anxious or Overstimulated? Pop Your Worry Bubbles" :
                     lang === "de" ? "Beziehungsunruhe? Lass deine Sorgenblasen platzen" :
                     lang === "fr" ? "Stress relationnel ? Éclatez vos bulles de tension" :
                     lang === "es" ? "¿Ansiedad en tus vínculos? Revienta las burbujas de estrés" :
                     "Cemas Memikirkan Hubungan? Letupkan Bebanmu di Zen Pop"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {lang === "en" ? "Play Ju's Zen Bubble Popper to shatter intrusive overthinking with crystal audio chimes." :
                     "Mainkan Zen Bubble Popper Ju untuk menenangkan sistem sarafmu selama 60 detik."}
                  </p>
                </div>

                <Link
                  to="/game/zen-pop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition flex-shrink-0"
                >
                  <span>{lang === "en" ? "Play Zen Pop (Free)" : "Mainkan Zen Pop (Gratis)"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Ju App Conversion CTA */}
            <div className="pt-6">
              <AppStoreCta />
            </div>

            {/* Viral Story Card Modal */}
            <AttachmentShareCardModal
              isOpen={isShareCardOpen}
              onClose={() => setIsShareCardOpen(false)}
              profile={evaluation.style}
              anxietyScore={evaluation.anxietyScore}
              avoidanceScore={evaluation.avoidanceScore}
              lang={lang}
            />

            <div className="my-6">
              <AdSenseBanner slot="quiz-attachment-result-bottom" format="auto" />
            </div>
          </div>
        )}

        {/* State 3: Questions */}
        {!isAnalyzing && !evaluation && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center max-w-xl mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/80 px-3.5 py-1 text-xs font-semibold text-rose-900 mb-3 shadow-xs">
                <Heart className="h-3.5 w-3.5 text-rose-600" />
                <span>{lang === "en" ? "ECR-R Relationship Model" : "Model Sains Hubungan ECR-R"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                {lang === "en" ? "Attachment Style Assessment" : "Tes Gaya Kelekatan Hubungan"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                {lang === "en" ? "Answer honestly based on how you genuinely experience intimacy, boundaries, and conflict." :
                 "Jawab dengan jujur berdasarkan apa yang benar-benar kamu rasakan dalam hubungan interpersonal."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                <span>
                  {lang === "en" ? `Question ${currentIndex + 1} of ${ATTACHMENT_QUESTIONS.length}` :
                   `Pertanyaan ${currentIndex + 1} dari ${ATTACHMENT_QUESTIONS.length}`}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200/70">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="mb-6">
                <h2 className="text-lg sm:text-2xl font-bold text-neutral-900 leading-snug">
                  {currentQ.prompt[lang]}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500">
                  {currentQ.subprompt[lang]}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left rounded-2xl p-4 sm:p-4.5 border transition-all duration-150 flex items-center justify-between group ${
                        isSelected
                          ? "border-rose-500 bg-rose-50/70 shadow-xs ring-2 ring-rose-400/30"
                          : "border-neutral-200/90 bg-[#FAF9F6]/60 hover:border-neutral-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 pr-2">
                        <span className="text-lg select-none">{opt.icon}</span>
                        <div className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-rose-950">
                          {opt.label[lang]}
                        </div>
                      </div>

                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                          isSelected ? "border-rose-600 bg-rose-600 text-white" : "border-neutral-300 group-hover:border-neutral-400"
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 font-semibold text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>{lang === "en" ? "Previous" : "Sebelumnya"}</span>
                </button>
                <span>~90 seconds</span>
              </div>
            </div>

            <div className="mt-4">
              <AdSenseBanner slot="quiz-attachment-question-bottom" format="horizontal" />
            </div>
          </div>
        )}
      </main>

      {evaluation && (
        <AttachmentShareCardModal
          isOpen={isShareCardOpen}
          onClose={() => setIsShareCardOpen(false)}
          profile={evaluation.style}
          anxietyScore={evaluation.anxietyScore}
          avoidanceScore={evaluation.avoidanceScore}
          lang={lang}
        />
      )}
    </div>
  );
};

export default AttachmentStyleTest;

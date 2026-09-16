import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  RotateCcw,
  Copy,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Share2,
  Lock,
  HeartHandshake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import {
  PEOPLE_PLEASER_QUESTIONS,
  PEOPLE_PLEASER_OPTIONS,
  calculatePeoplePleaserScore,
  PeoplePleaserLang,
} from "@/data/people-pleasing";
import PeoplePleaserShareCardModal from "@/components/PeoplePleaserShareCardModal";
import { toast } from "sonner";

interface PeoplePleaserTestProps {
  defaultLang?: PeoplePleaserLang;
}

const PeoplePleaserTest: React.FC<PeoplePleaserTestProps> = ({ defaultLang = "en" }) => {
  const [lang, setLang] = useState<PeoplePleaserLang>(defaultLang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShareCardOpen, setIsShareCardOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex, isCompleted]);

  const currentQ = PEOPLE_PLEASER_QUESTIONS[currentIndex];
  const progressPercent = Math.round(
    ((currentIndex + 1) / PEOPLE_PLEASER_QUESTIONS.length) * 100
  );

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);

    if (currentIndex < PEOPLE_PLEASER_QUESTIONS.length - 1) {
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

  const result = isCompleted ? calculatePeoplePleaserScore(answers) : null;

  const copyResults = () => {
    if (!result) return;
    const title = (result.title as any)[lang] || result.title.en;
    const text =
      lang === "id"
        ? `Hasil Tes People-Pleaser & Batas Diri:
Tingkat Fawn Response: ${title} (${result.totalScore}/${result.maxScore} - ${result.percentage}%)
Skrip Batas Diri: "${(result.boundaryScript as any)[lang] || result.boundaryScript.en}"
Ikuti tes mandiri gratis di: ${window.location.origin}/quiz/people-pleasing`
        : `People-Pleaser & Boundaries Screener Result:
Profile: ${title} (${result.totalScore}/${result.maxScore} - ${result.percentage}%)
Boundary Script: "${(result.boundaryScript as any)[lang] || result.boundaryScript.en}"
Check your boundaries free at: ${window.location.origin}/quiz/people-pleasing`;

    navigator.clipboard.writeText(text);
    toast.success(lang === "id" ? "Hasil disalin ke papan klip!" : "Results copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-slate-950">
      <SEOHead
        title={
          lang === "id"
            ? "Tes People Pleaser Online Gratis: Cek Batas Diri & Fawn Response"
            : lang === "de"
            ? "People Pleaser Test Kostenlos: Fawn-Response & Grenzen setzen"
            : lang === "fr"
            ? "Test People Pleaser Gratuit en Ligne : Syndrome de Complaisance & Limites"
            : lang === "es"
            ? "Test de People Pleaser Gratis: Respuesta de Complacencia y Límites"
            : "Free People-Pleaser Test: Fawn Response & Healthy Boundaries Screener"
        }
        description={
          lang === "id"
            ? "Skrining people-pleasing dan respon penurut (fawn response) gratis dan privat. Ukur tingkat kesulitan berkata 'tidak' dan dapatkan skrip batas diri nyata."
            : "Free evidence-based assessment of people-pleasing habits, codependency, and the fawn response. Discover tailored assertive scripts to say no without guilt."
        }
        canonical="https://nuju.app/quiz/people-pleasing"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name:
              lang === "id"
                ? "Tes People-Pleaser & Fawn Response"
                : "People-Pleaser & Boundaries Assessment",
            description:
              "Clinical psychological screener measuring conflict appeasement, overcommitment, and codependent guilt.",
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
                name: "What is the 'fawn' trauma response in people-pleasing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Coined by psychotherapist Pete Walker, the 'fawn' response is an instinctual survival mechanism where a person responds to threat, conflict, or fear of rejection by appeasing, placating, and preemptively merging with the needs of others.",
                },
              },
              {
                "@type": "Question",
                name: "How can I stop feeling guilty when saying no?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Guilt is a biological alarm habituated from childhood that equating boundaries with danger. Practicing the '24-hour buffer rule' and short, unapologetic boundary scripts re-wires the nervous system to recognize that setting limits is safe and healthy.",
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
              {(["en", "id", "de", "fr", "es"] as PeoplePleaserLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-teal-600 text-white shadow-sm"
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

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 md:py-12">
        {/* Top AdSense Banner */}
        <div className="mb-6">
          <AdSenseBanner slot="people-pleaser-top" format="horizontal" />
        </div>

        {!isCompleted ? (
          /* QUESTION FLOW */
          <div>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
                <Shield className="w-3.5 h-3.5" />
                <span>
                  {lang === "id" ? "Evaluasi Batas Diri & Asertivitas" : "Boundaries & Fawn Response Screener"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                {lang === "id"
                  ? "Apakah Kamu Seorang People-Pleaser?"
                  : "Are You a Chronic People-Pleaser?"}
              </h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
                {lang === "id"
                  ? "Cek apakah kebiasaanmu selalu mendahulukan orang lain merupakan bentuk fawn response dari trauma masa lalu atau kelelahan emosional."
                  : "Discover whether your tendency to please others is a protective fawn response draining your vital life force."}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>
                  {lang === "id"
                    ? `Pernyataan ${currentIndex + 1} dari ${PEOPLE_PLEASER_QUESTIONS.length}`
                    : `Question ${currentIndex + 1} of ${PEOPLE_PLEASER_QUESTIONS.length}`}
                </span>
                <span className="text-teal-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 rounded-full"
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
                  {PEOPLE_PLEASER_OPTIONS.map((opt) => {
                    const isSelected = answers[currentQ.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-teal-500/20 border-teal-500 text-teal-200 shadow-md shadow-teal-500/10"
                            : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                        }`}
                      >
                        <span>{opt.label[lang]}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                            isSelected
                              ? "border-teal-500 bg-teal-500 text-slate-950"
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
                      <span>{lang === "id" ? "Kembali ke sebelumnya" : "Previous question"}</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <AdSenseBanner slot="people-pleaser-mid" format="horizontal" />
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
              {/* Profile Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
                    <Shield className="w-4 h-4" />
                    <span>Fawn Response Assessment</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsShareCardOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-md shadow-teal-500/20"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Bagikan Kartu Story" : "Share Story Card"}</span>
                    </button>
                    <button
                      onClick={copyResults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === "id" ? "Salin Ringkasan" : "Copy Summary"}</span>
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

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-teal-400">
                    {result.totalScore}/{result.maxScore}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ({result.percentage}% Fawn Tendency)
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                  {result.title[lang]}
                </h1>
                <p className="text-sm md:text-base text-teal-300/90 font-medium mb-4">
                  {result.headline[lang]}
                </p>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                  {result.description[lang]}
                </p>

                {/* 3 Pillars Subscores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-[11px] font-bold uppercase text-teal-400 mb-1">
                      Appeasement & Fawning
                    </div>
                    <div className="text-2xl font-black text-white">{result.fawnScore}/12</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full"
                        style={{ width: `${(result.fawnScore / 12) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-[11px] font-bold uppercase text-emerald-400 mb-1">
                      Overcommitment
                    </div>
                    <div className="text-2xl font-black text-white">
                      {result.overcommitmentScore}/12
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${(result.overcommitmentScore / 12) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                    <div className="text-[11px] font-bold uppercase text-purple-400 mb-1">
                      Guilt Sponge
                    </div>
                    <div className="text-2xl font-black text-white">{result.guiltScore}/12</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-purple-500 h-full rounded-full"
                        style={{ width: `${(result.guiltScore / 12) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Zero-Guilt Boundary Script Box */}
                <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/25 my-6">
                  <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Lock className="w-4 h-4" />
                    <span>
                      {lang === "id" ? "Skrip Batas Diri Tanpa Rasa Bersalah:" : "Your Zero-Guilt Boundary Script:"}
                    </span>
                  </div>
                  <blockquote className="text-sm md:text-base font-serif italic text-teal-100 leading-relaxed">
                    "{result.boundaryScript[lang]}"
                  </blockquote>
                </div>

                {/* Recovery Action Rituals */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>
                      {lang === "id"
                        ? "3 Latihan Memulihkan Kedaulatan Diri:"
                        : "3 Sovereign Boundary Rituals:"}
                    </span>
                  </h3>
                  <div className="space-y-2.5">
                    {result.actionRituals[lang].map((ritual, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{ritual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {lang === "id" ? "Tenangkan Sistem Sarafmu:" : "Decompress Your Nervous System:"}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === "id"
                        ? "Latih pernapasan Stanford Physiological Sigh untuk meredakan kecemasan sosial."
                        : "Use the Stanford Physiological Sigh to rapidly discharge relational tension."}
                    </p>
                  </div>
                  <Link
                    to="/tools/breathwork"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 font-bold text-sm hover:from-teal-400 hover:to-emerald-500 transition-all shadow-lg text-center flex items-center justify-center gap-2"
                  >
                    <span>{lang === "id" ? "Buka Latihan Napas" : "Open Breathwork Lab"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* AdSense Mid Banner */}
              <AdSenseBanner slot="people-pleaser-result" format="horizontal" />

              {/* Cross Promo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/quiz/inner-child"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <Sparkles className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Inner Child Wound</h4>
                  <p className="text-xs text-slate-400">
                    Find the childhood root behind your people-pleasing.
                  </p>
                </Link>

                <Link
                  to="/quiz/love-languages"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <HeartHandshake className="w-6 h-6 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">5 Love Languages</h4>
                  <p className="text-xs text-slate-400">
                    Understand your relational needs and how to love you.
                  </p>
                </Link>

                <Link
                  to="/quiz/burnout"
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
                >
                  <AlertCircle className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-sm font-bold text-white mb-1">Burnout Screener</h4>
                  <p className="text-xs text-slate-400">
                    Check if overgiving has depleted your energy reserve.
                  </p>
                </Link>
              </div>

              <AppStoreCta />

              <PeoplePleaserShareCardModal
                isOpen={isShareCardOpen}
                onClose={() => setIsShareCardOpen(false)}
                result={result}
                lang={lang}
              />
            </motion.div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Boundaries & sovereign self-worth.</p>
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

export default PeoplePleaserTest;

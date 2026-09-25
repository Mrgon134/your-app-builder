import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  PhoneCall,
  ShieldAlert,
  Wind,
  Eye,
  Hand,
  Volume2,
  Smile,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";

type SosLang = "en" | "id" | "de" | "fr" | "es";

interface HotlineInfo {
  country: string;
  flag: string;
  name: string;
  number: string;
  desc: string;
}

const CRISIS_HOTLINES: HotlineInfo[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    name: "988 Suicide & Crisis Lifeline",
    number: "tel:988",
    desc: "Free, confidential 24/7 call & text support",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    name: "Samaritans & NHS 111",
    number: "tel:116123",
    desc: "Free 24/7 call on 116 123 or dial 111",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    name: "TelefonSeelsorge",
    number: "tel:08001110111",
    desc: "Kostenfreie 24/7 Krisenberatung (0800 111 0 111)",
  },
  {
    country: "France",
    flag: "🇫🇷",
    name: "Numéro National Prévention Suicide",
    number: "tel:3114",
    desc: "Ligne d'écoute gratuite 24/7 au 3114",
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    name: "Línea de Atención a la Conducta Suicida",
    number: "tel:024",
    desc: "Línea pública y gratuita 24h al 024",
  },
  {
    country: "Indonesia",
    flag: "🇮🇩",
    name: "Layanan Sejiwa Kemenkes",
    number: "tel:119,8",
    desc: "Hubungi hotline darurat 119 ekstensi 8",
  },
];

const GROUNDING_STEPS = [
  {
    count: 5,
    icon: Eye,
    title: {
      en: "5 Things You Can SEE",
      id: "5 Hal yang Bisa Anda LIHAT",
      de: "5 Dinge, die Sie SEHEN",
      fr: "5 Choses que vous pouvez VOIR",
      es: "5 Cosas que puede VER",
    },
    instruction: {
      en: "Look around you right now. Spot 5 distinct objects (a lamp, a picture, your shoes, a pattern on the wall).",
      id: "Lihat sekeliling Anda saat ini. Temukan 5 benda berbeda (lampu, foto, sepatu, atau pola di dinding).",
      de: "Blicken Sie um sich. Benennen Sie 5 Gegenstände im Raum (Lampe, Schuhe, Muster).",
      fr: "Regardez autour de vous. Identifiez 5 objets précis (une lampe, vos mains, une texture).",
      es: "Mire a su alrededor. Localice 5 objetos concretos (una lámpara, sus zapatos, una pared).",
    },
  },
  {
    count: 4,
    icon: Hand,
    title: {
      en: "4 Things You Can TOUCH",
      id: "4 Hal yang Bisa Anda SENTUH",
      de: "4 Dinge, die Sie ERFÜHLEN",
      fr: "4 Choses que vous pouvez TOUCHER",
      es: "4 Cosas que puede TOCAR",
    },
    instruction: {
      en: "Feel the texture of your clothing, the cool table surface, or touch your own fingers together.",
      id: "Rasakan tekstur kain baju Anda, dinginnya meja, atau sentuh ujung jari-jemari Anda.",
      de: "Fühlen Sie den Stoff Ihrer Kleidung oder die kühle Oberfläche des Tisches.",
      fr: "Ressentez la texture de vos vêtements ou la surface de la table sous vos doigts.",
      es: "Sienta la textura de su ropa, el frío de una mesa o frote sus manos suavemente.",
    },
  },
  {
    count: 3,
    icon: Volume2,
    title: {
      en: "3 Things You Can HEAR",
      id: "3 Hal yang Bisa Anda DENGAR",
      de: "3 Dinge, die Sie HÖREN",
      fr: "3 Choses que vous pouvez ENTENDRE",
      es: "3 Cosas que puede ESCUCHAR",
    },
    instruction: {
      en: "Listen closely. Is there a distant car, humming fan, or the sound of your own quiet breath?",
      id: "Dengarkan dengan saksama. Deru AC, hembusan angin luar, atau suara napas Anda sendiri.",
      de: "Lauschen Sie. Hören Sie ein Summen, Schritte oder Ihren eigenen Atem?",
      fr: "Écoutez attentivement : le bruit du vent, un bourdonnement ou votre souffle.",
      es: "Preste atención a los sonidos: el aire, un electrodoméstico o su propia respiración.",
    },
  },
  {
    count: 2,
    icon: Sparkles,
    title: {
      en: "2 Things You Can SMELL",
      id: "2 Hal yang Bisa Anda CIUM",
      de: "2 Dinge, die Sie RIECHEN",
      fr: "2 Choses que vous pouvez SENTIR",
      es: "2 Cosas que puede OLER",
    },
    instruction: {
      en: "Notice the scent in the air, your coffee, or your jacket sleeves.",
      id: "Sadari aroma di sekitar Anda, aroma kopi, atau wangi sabun pada pakaian.",
      de: "Achten Sie auf Gerüche in der Luft, Seife oder frischen Kaffee.",
      fr: "Percevez l'odeur ambiante, celle d'une boisson ou de votre peau.",
      es: "Perciba algún aroma en el aire, de su ropa o de una taza de infusión.",
    },
  },
  {
    count: 1,
    icon: Smile,
    title: {
      en: "1 Thing You Can TASTE / Affirmatory Truth",
      id: "1 Hal yang Anda KECAP / Kebenaran Menenangkan",
      de: "1 Geschmack / Beruhigende Gewissheit",
      fr: "1 Goût / Vérité Réconfortante",
      es: "1 Sabor / Certeza Reconfortante",
    },
    instruction: {
      en: "Notice the taste in your mouth, take a sip of water, and remind yourself: 'I am completely safe right now.'",
      id: "Rasakan cecapan di mulut Anda, minum seteguk air, dan ingatkan diri: 'Aku aman saat ini.'",
      de: "Nehmen Sie einen Schluck Wasser und sagen Sie sich: 'Ich bin in diesem Augenblick sicher.'",
      fr: "Buvez une gorgée d'eau et répétez-vous : 'Je suis en parfaite sécurité en cet instant.'",
      es: "Tome un sorbo de agua y recuerde firmemente: 'Estoy a salvo en este instante.'",
    },
  },
];

const PanicSosScreen: React.FC = () => {
  const [lang, setLang] = useState<SosLang>("en");
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [activeGroundingStep, setActiveGroundingStep] = useState(0);

  // Box Breathing cycle (4-4-4-4)
  useEffect(() => {
    const timer = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          setBreathPhase((currentPhase) => {
            if (currentPhase === "inhale") return "hold1";
            if (currentPhase === "hold1") return "exhale";
            if (currentPhase === "exhale") return "hold2";
            return "inhale";
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getBreathLabel = () => {
    if (breathPhase === "inhale") {
      return lang === "id"
        ? "Tarik Napas Perlahan..."
        : lang === "de"
        ? "Sanft einatmen..."
        : lang === "fr"
        ? "Inspirez lentement..."
        : lang === "es"
        ? "Inhale suavemente..."
        : "Inhale Slowly...";
    }
    if (breathPhase === "hold1" || breathPhase === "hold2") {
      return lang === "id"
        ? "Tahan Napas Tenang..."
        : lang === "de"
        ? "Atem anhalten..."
        : lang === "fr"
        ? "Retenez votre souffle..."
        : lang === "es"
        ? "Mantenga la calma..."
        : "Hold Gently...";
    }
    return lang === "id"
      ? "Hembuskan Napas Panjang..."
      : lang === "de"
      ? "Langsam ausatmen..."
      : lang === "fr"
      ? "Expirez profondément..."
      : lang === "es"
      ? "Exhale profundamente..."
      : "Exhale Fully...";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      <SEOHead
        title={
          lang === "id"
            ? "SOS Serangan Panik: Redakan Panic Attack dalam 3 Menit (Metode 5-4-3-2-1)"
            : lang === "de"
            ? "Panikattacke SOS: Soforthilfe in 3 Minuten (5-4-3-2-1 Methode)"
            : lang === "fr"
            ? "SOS Crise d'Angoisse : Calmer une Attaque de Panique en 3 Minutes"
            : lang === "es"
            ? "SOS Ataque de Pánico: Calmar la Ansiedad en 3 Minutos (Técnica 5-4-3-2-1)"
            : "Panic Attack Emergency SOS: 3-Minute Grounding & Vagus Nerve Pacer"
        }
        description={
          lang === "id"
            ? "Alat darurat gratis untuk meredakan serangan panik, kecemasan akut, dan hiperventilasi. Latihan napas parasimpatis dan teknik grounding 5-4-3-2-1."
            : lang === "de"
            ? "Kostenlose Soforthilfe bei Panikattacken und akuter Angst. Box-Breathing-Taktgeber und 5-4-3-2-1 Erdungsübung für das Nervensystem."
            : lang === "fr"
            ? "Guide d'urgence immédiat contre les crises d'angoisse. Régulateur respiratoire et exercice d'ancrage sensoriel 5-4-3-2-1."
            : lang === "es"
            ? "Herramienta de emergencia para calmar ataques de pánico y ansiedad severa. Respiración guiada y anclaje 5-4-3-2-1 inmediato."
            : "Immediate emergency panic attack relief. Box breathing vagus nerve pacer, 5-4-3-2-1 sensory grounding, and 24/7 crisis hotline access."
        }
        canonicalUrl="https://nuju.app/emergency"
      />

      {/* Header */}
      <header className="border-b border-rose-950/60 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Tools"}</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-slate-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as SosLang[]).map((l) => (
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

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Urgent Calming Reassurance Banner */}
        <div className="bg-rose-950/30 border border-rose-800/40 rounded-3xl p-6 text-center max-w-2xl mx-auto mb-8 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>
              {lang === "id" ? "Anda Aman • Ini Akan Berlalu" : "You Are Safe • This Will Pass"}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            {lang === "id"
              ? "Tarik Napas Bersamaku. Anda Tidak Sendirian."
              : lang === "de"
              ? "Atmen Sie mit mir. Sie sind in Sicherheit."
              : lang === "fr"
              ? "Respirez avec moi. Vous êtes en sécurité."
              : lang === "es"
              ? "Respire conmigo. Está a salvo."
              : "Breathe With Me. You Are In Total Safety."}
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {lang === "id"
              ? "Sensasi panik di tubuh Anda hanyalah respons sistem saraf yang sedang keliru membunyikan alarm darurat. Jantung Anda kuat, paru-paru Anda sehat. Ini bukan serangan jantung. Gejala ini akan mereda dalam beberapa menit."
              : "What you feel in your body right now is an adrenaline surge, not physical danger. Your heart is strong, your lungs are functioning normally. This sensation will peak and dissolve. Follow the rhythm below."}
          </p>
        </div>

        {/* SECTION 1: Vagus Nerve Breathing Circle */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>
              {lang === "id"
                ? "Ritme Napas Penenang Saraf Vagus (4-4-4-4)"
                : "Vagus Nerve Parasympathetic Reset (Box Breathing)"}
            </span>
          </h2>

          <div className="relative w-56 h-56 flex items-center justify-center my-4">
            {/* Glowing Pulse Ring */}
            <motion.div
              animate={{
                scale: breathPhase === "inhale" ? 1.35 : breathPhase === "exhale" ? 0.85 : 1.1,
                opacity: breathPhase === "inhale" ? 0.9 : 0.4,
              }}
              transition={{ duration: 3.8, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl pointer-events-none"
            />

            {/* Main Orb */}
            <motion.div
              animate={{
                scale: breathPhase === "inhale" ? 1.25 : breathPhase === "exhale" ? 0.8 : 1.05,
              }}
              transition={{ duration: 3.8, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 shadow-2xl flex flex-col items-center justify-center text-slate-950 font-black"
            >
              <span className="text-4xl font-mono">{breathSeconds}</span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold opacity-90 mt-0.5">
                {breathPhase === "inhale" ? "IN" : breathPhase === "exhale" ? "OUT" : "HOLD"}
              </span>
            </motion.div>
          </div>

          <p className="text-lg font-bold text-cyan-300 mt-4 animate-pulse">
            {getBreathLabel()}
          </p>
        </div>

        {/* SECTION 2: 5-4-3-2-1 Sensory Grounding Tool */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>
                {lang === "id"
                  ? "Metode Grounding Sensorik 5-4-3-2-1"
                  : "5-4-3-2-1 Sensory Grounding Sequence"}
              </span>
            </h2>
            <button
              onClick={() => setActiveGroundingStep(0)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Ulangi Langkah" : "Restart"}</span>
            </button>
          </div>

          {/* Stepper Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {GROUNDING_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveGroundingStep(idx)}
                  className={`flex-1 min-w-[70px] p-2.5 rounded-xl border text-center transition-all ${
                    activeGroundingStep === idx
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                      : idx < activeGroundingStep
                      ? "bg-slate-800/80 border-slate-700 text-slate-300"
                      : "bg-slate-950/40 border-slate-800 text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <StepIcon className="w-3.5 h-3.5" />
                    <span>{step.count}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroundingStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800"
            >
              <h3 className="text-base md:text-lg font-bold text-white mb-2">
                {GROUNDING_STEPS[activeGroundingStep].title[lang]}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                {GROUNDING_STEPS[activeGroundingStep].instruction[lang]}
              </p>

              <button
                onClick={() =>
                  setActiveGroundingStep((prev) =>
                    prev < GROUNDING_STEPS.length - 1 ? prev + 1 : 0
                  )
                }
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs md:text-sm hover:from-amber-400 hover:to-orange-400 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {activeGroundingStep < GROUNDING_STEPS.length - 1
                    ? lang === "id"
                      ? "Lanjut ke Langkah Berikutnya"
                      : "Next Grounding Step"
                    : lang === "id"
                    ? "Selesai: Tarik Napas Lega"
                    : "Complete: Breathe & Release"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SECTION 3: 24/7 Crisis Helplines Directory */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
          <h2 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-rose-400" />
            <span>
              {lang === "id"
                ? "Saluran Bantuan Darurat 24/7 (Bebas Pulsa)"
                : "24/7 Free Crisis Helplines"}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            {lang === "id"
              ? "Jika Anda membutuhkan teman bicara sekarang juga, tenaga profesional terlatih siap mendengarkan tanpa menghakimi."
              : "If you feel unsafe or need someone to listen, trained counselors are waiting right now."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {CRISIS_HOTLINES.map((hotline, idx) => (
              <a
                key={idx}
                href={hotline.number}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-900 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span>{hotline.flag}</span>
                    <span>{hotline.country}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-rose-400">{hotline.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{hotline.desc}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* AdSense Non-Intrusive Bottom Banner */}
        <div className="my-8">
          <AdSenseBanner slot="sos-bottom-support" format="horizontal" />
        </div>

        {/* Cross Promotion to Sound Sanctuary & Zen Game */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/soundscapes"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                Ju Sound Sanctuary
              </h4>
              <p className="text-xs text-slate-400">
                Listen to 528Hz calming frequencies & gentle rain.
              </p>
            </div>
          </Link>

          <Link
            to="/game/zen-pop"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Zen Bubble Shatter
              </h4>
              <p className="text-xs text-slate-400">
                Pop stress bubbles with soothing crystal chimes.
              </p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Crisis support & sensory grounding.</p>
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

export default PanicSosScreen;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Wind,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";

type BreathLang = "en" | "id" | "de" | "fr" | "es";
type BreathMode = "sigh" | "box" | "relax";

interface BreathPhaseConfig {
  name: string;
  duration: number; // in seconds
  label: Record<BreathLang, string>;
  instruction: Record<BreathLang, string>;
  scale: number;
}

const BREATH_MODES: Record<BreathMode, { title: string; phases: BreathPhaseConfig[] }> = {
  sigh: {
    title: "Stanford Physiological Sigh (Fastest Calm)",
    phases: [
      {
        name: "inhale1",
        duration: 3,
        scale: 1.2,
        label: {
          en: "Deep Inhale (Nose)",
          id: "Tarik Napas Dalam (Hidung)",
          de: "Tief einatmen (Nase)",
          fr: "Inspiration profonde (Nez)",
          es: "Inhalación profunda (Nariz)",
        },
        instruction: {
          en: "Inhale smoothly through your nose, filling your lower belly.",
          id: "Hirup udara dalam-dalam melalui hidung, isi rongga perut bawah.",
          de: "Atmen Sie sanft durch die Nase ein.",
          fr: "Inspirez calmement par le nez en gonflant le ventre.",
          es: "Inhale suavemente por la nariz llenando el abdomen.",
        },
      },
      {
        name: "inhale2",
        duration: 1.5,
        scale: 1.35,
        label: {
          en: "Top-Up Sniff (Nose)",
          id: "Hirup Tambahan Sedikit (Hidung)",
          de: "Zweiter kurzer Atemzug",
          fr: "Deuxième inspiration brève",
          es: "Segunda inhalación corta",
        },
        instruction: {
          en: "Take a second sharp sniff to pop open your lung alveoli.",
          id: "Tarik sedikit napas tambahan lewat hidung untuk membuka alveolus paru-paru.",
          de: "Ein kurzer Extra-Atemzug, um die Lungenbläschen voll zu entfalten.",
          fr: "Une petite inspiration supplémentaire pour ouvrir les alvéoles pulmonaires.",
          es: "Una pequeña inhalación extra para abrir los alvéolos pulmonares.",
        },
      },
      {
        name: "exhale",
        duration: 6.5,
        scale: 0.85,
        label: {
          en: "Long Extended Sigh (Mouth)",
          id: "Hembuskan Panjang Perlahan (Mulut)",
          de: "Langer beruhigender Seufzer (Mund)",
          fr: "Longue expiration lente (Bouche)",
          es: "Exhalación larga y lenta (Boca)",
        },
        instruction: {
          en: "Slowly release all air through your mouth like a gentle sigh.",
          id: "Keluarkan seluruh udara perlahan melalui mulut seperti helaan napas lega.",
          de: "Lassen Sie die Luft langsam und vollständig durch den Mund entweichen.",
          fr: "Expirez lentement tout l'air par la bouche dans un soupir d'apaisement.",
          es: "Suelte todo el aire lentamente por la boca como un suspiro liberador.",
        },
      },
    ],
  },
  box: {
    title: "Box Breathing (4-4-4-4 Navy SEAL Focus)",
    phases: [
      {
        name: "inhale",
        duration: 4,
        scale: 1.25,
        label: { en: "Inhale (4s)", id: "Tarik Napas (4d)", de: "Einatmen (4s)", fr: "Inspiration (4s)", es: "Inhalar (4s)" },
        instruction: { en: "Breathe in through nose", id: "Hirup via hidung", de: "Durch die Nase einatmen", fr: "Inspirez par le nez", es: "Inhale por la nariz" },
      },
      {
        name: "hold1",
        duration: 4,
        scale: 1.25,
        label: { en: "Hold Full (4s)", id: "Tahan Penuh (4d)", de: "Atem anhalten (4s)", fr: "Poumons pleins (4s)", es: "Retener (4s)" },
        instruction: { en: "Hold lungs full and calm", id: "Tahan dengan tenang", de: "Sanft anhalten", fr: "Retenez calmement", es: "Mantenga la calma" },
      },
      {
        name: "exhale",
        duration: 4,
        scale: 0.85,
        label: { en: "Exhale (4s)", id: "Hembuskan (4d)", de: "Ausatmen (4s)", fr: "Expiration (4s)", es: "Exhalar (4s)" },
        instruction: { en: "Smoothly blow out air", id: "Keluarkan napas halus", de: "Gleichmäßig ausatmen", fr: "Expirez doucement", es: "Exhale suavemente" },
      },
      {
        name: "hold2",
        duration: 4,
        scale: 0.85,
        label: { en: "Hold Empty (4s)", id: "Tahan Kosong (4d)", de: "Atempause (4s)", fr: "Poumons vides (4s)", es: "Pausa vacío (4s)" },
        instruction: { en: "Rest in the empty stillness", id: "Istirahat dalam hening", de: "In der Stille verweilen", fr: "Demeurez dans le calme", es: "Permanezca en calma" },
      },
    ],
  },
  relax: {
    title: "4-7-8 Parasympathetic Deep Sleep Pacer",
    phases: [
      {
        name: "inhale",
        duration: 4,
        scale: 1.25,
        label: { en: "Inhale (4s)", id: "Tarik (4d)", de: "Einatmen (4s)", fr: "Inspiration (4s)", es: "Inhalar (4s)" },
        instruction: { en: "Quiet inhale through nose", id: "Hirup tenang lewat hidung", de: "Ruhig durch die Nase", fr: "Inspiration douce", es: "Inhalación suave" },
      },
      {
        name: "hold",
        duration: 7,
        scale: 1.25,
        label: { en: "Hold (7s)", id: "Tahan (7d)", de: "Halten (7s)", fr: "Rétention (7s)", es: "Retener (7s)" },
        instruction: { en: "Oxygenate your bloodstream", id: "Beri ruang oksigen di tubuh", de: "Sauerstoff wirken lassen", fr: "Oxygénez vos tissus", es: "Oxigene su cuerpo" },
      },
      {
        name: "exhale",
        duration: 8,
        scale: 0.8,
        label: { en: "Long Exhale (8s)", id: "Buang Panjang (8d)", de: "Langes Ausatmen (8s)", fr: "Expiration longue (8s)", es: "Exhalar largo (8s)" },
        instruction: { en: "Slow mouth whoosh", id: "Hembuskan panjang lewat bibir", de: "Vollständig ausatmen", fr: "Expirez jusqu'au bout", es: "Exhale lentamente" },
      },
    ],
  },
};

const BreathworkLab: React.FC = () => {
  const [lang, setLang] = useState<BreathLang>("en");
  const [mode, setMode] = useState<BreathMode>("sigh");
  const [isActive, setIsActive] = useState(true);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(BREATH_MODES["sigh"].phases[0].duration);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const currentConfig = BREATH_MODES[mode];
  const activePhase = currentConfig.phases[currentPhaseIndex];

  // Play soft chime on phase shift
  const playPhaseChime = () => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch {}
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Switch to next phase
          setCurrentPhaseIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % currentConfig.phases.length;
            setSecondsLeft(currentConfig.phases[nextIndex].duration);
            playPhaseChime();
            return nextIndex;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, mode, currentConfig, audioEnabled]);

  const switchMode = (newMode: BreathMode) => {
    setMode(newMode);
    setCurrentPhaseIndex(0);
    setSecondsLeft(BREATH_MODES[newMode].phases[0].duration);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title={
          lang === "id"
            ? "Stanford Physiological Sigh & Pacer Latihan Napas Interaktif"
            : lang === "de"
            ? "Physiologischer Seufzer (Stanford) & Interaktives Atemtool"
            : lang === "fr"
            ? "Soupir Physiologique de Stanford & Exercice de Respiration Guidé"
            : lang === "es"
            ? "Suspiro Fisiológico de Stanford y Respiración Guiada"
            : "Stanford Physiological Sigh & Somatic Breathwork Pacer"
        }
        description={
          lang === "id"
            ? "Latihan napas tercepat di dunia untuk meredakan kecemasan dalam 2 tarikan napas (Riset Stanford Dr. Huberman). Mode Physiological Sigh, Box Breathing, dan 4-7-8."
            : "The fastest evidence-based technique to reduce anxiety in 2 breaths (Stanford Neurobiology Huberman Lab). Interactive visual pacer for Physiological Sigh, Box Breathing, and 4-7-8."
        }
        canonical="https://nuju.app/tools/breathwork"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name:
              lang === "id"
                ? "Stanford Physiological Sigh & Somatic Breathwork Pacer"
                : "Stanford Physiological Sigh & Somatic Breathwork Pacer",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            description:
              "Interactive visual somatic breathwork pacer with 528Hz acoustic guidance featuring the Stanford Physiological Sigh, Box Breathing, and 4-7-8.",
            provider: {
              "@type": "Organization",
              name: "Nuju",
              url: "https://nuju.app",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the Stanford Physiological Sigh?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The physiological sigh, studied extensively by Dr. Andrew Huberman and Dr. Jack Feldman at Stanford Neurobiology, is a double-inhalation followed by an extended exhalation. It is the fastest known autonomic method to rapidly pop collapsed lung alveoli, dump excess carbon dioxide, and bring heart rate and autonomic arousal down within seconds.",
                },
              },
              {
                "@type": "Question",
                name: "How many breaths are needed to feel calm?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Just two to three rounds of physiological sighs are sufficient to significantly lower physiological arousal and activate the parasympathetic nervous system via the vagus nerve.",
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
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              title="Toggle Chimes"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <div className="flex items-center bg-slate-800/80 rounded-full p-0.5 border border-slate-700/60 text-xs">
              {(["en", "id", "de", "fr", "es"] as BreathLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-cyan-500 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l === "en" ? "🇬🇧 EN" : l === "id" ? "🇮🇩 ID" : l === "de" ? "🇩🇪 DE" : l === "fr" ? "🇫🇷 FR" : "🇪🇸 ES"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Top Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <AdSenseBanner slot="breathwork-top" format="horizontal" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: "sigh", label: "Physiological Sigh (Stanford)", badge: "⚡ Fastest Calm" },
            { id: "box", label: "Box Breathing (4-4-4-4)", badge: "🎯 Navy SEAL Focus" },
            { id: "relax", label: "4-7-8 Deep Sleep", badge: "🌙 Parasympathetic" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => switchMode(t.id as BreathMode)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === t.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Big Animated Breathing Orb */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-6">
          <motion.div
            animate={{
              scale: activePhase.scale * 1.15,
              opacity: activePhase.name.includes("inhale") ? 0.8 : 0.35,
            }}
            transition={{ duration: activePhase.duration, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/25 to-emerald-500/25 blur-2xl pointer-events-none"
          />

          <motion.div
            animate={{
              scale: activePhase.scale,
            }}
            transition={{ duration: activePhase.duration, ease: "easeInOut" }}
            className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-2xl flex flex-col items-center justify-center text-slate-950 p-6 text-center font-black relative"
          >
            <span className="text-5xl font-mono">{secondsLeft}</span>
            <span className="text-xs uppercase tracking-widest font-extrabold mt-1">
              {activePhase.label[lang]}
            </span>
          </motion.div>
        </div>

        {/* Phase Instruction */}
        <div className="text-center max-w-md mx-auto my-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
            {activePhase.label[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activePhase.instruction[lang]}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 my-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              isActive
                ? "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-750"
                : "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isActive ? "Pause Pacer" : "Resume Pacer"}</span>
          </button>
          <button
            onClick={() => {
              setCurrentPhaseIndex(0);
              setSecondsLeft(currentConfig.phases[0].duration);
            }}
            className="p-2.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200"
            title="Reset Pacer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Science Behind Physiological Sigh */}
        <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 mt-6 text-left shadow-xl">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>
              {lang === "id"
                ? "Neurosains di Balik 'Physiological Sigh' (Riset Stanford)"
                : "The Stanford Neurobiology of the Physiological Sigh"}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === "id"
              ? "Diteliti oleh Dr. Andrew Huberman di Stanford University School of Medicine, tarikan napas ganda (2x hirup via hidung) memaksa jutaan kantung udara paru-paru (alveoli) yang sempat kolaps akibat stres untuk terbuka kembali. Hembusan napas panjang lewat mulut kemudian mengaktifkan simpul sinoatrial jantung lewat saraf vagus, menurunkan detak jantung secara instan dalam 2 hingga 3 siklus napas."
              : "Discovered and popularized by Dr. Andrew Huberman's lab at Stanford Medicine, the double inhale pops open collapsed lung alveoli, increasing surface area to offload carbon dioxide. The subsequent long exhale triggers the vagus nerve to slow down the heart rate almost immediately."}
          </p>
        </div>

        {/* AdSense Mid Banner */}
        <div className="w-full max-w-2xl my-8">
          <AdSenseBanner slot="breathwork-mid" format="horizontal" />
        </div>

        <AppStoreCta />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Somatic breathwork.</p>
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

export default BreathworkLab;

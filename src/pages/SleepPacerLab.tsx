import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Moon,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Heart,
  Wind,
  BedDouble,
  Clock,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Headphones,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";

type SleepLang = "en" | "id" | "de" | "fr" | "es";

interface PhaseDetail {
  name: "inhale" | "hold" | "exhale";
  duration: number; // in seconds
  scale: number;
  label: Record<SleepLang, string>;
  cue: Record<SleepLang, string>;
  subtext: Record<SleepLang, string>;
}

const PHASES: PhaseDetail[] = [
  {
    name: "inhale",
    duration: 4,
    scale: 1.28,
    label: {
      en: "Inhale Calm (4s)",
      id: "Tarik Napas Tenang (4d)",
      de: "Ruhig Einatmen (4s)",
      fr: "Inspirer doucement (4s)",
      es: "Inhalar calma (4s)",
    },
    cue: {
      en: "Breathe quietly through your nose into lower belly",
      id: "Tarik napas perlahan lewat hidung hingga ke rongga perut",
      de: "Sanft und geräuschlos durch die Nase einatmen",
      fr: "Inspirez lentement et silencieusement par le nez",
      es: "Inhale suavemente por la nariz llenando el abdomen",
    },
    subtext: {
      en: "Diaphragm descends · Heart rate matches cadence",
      id: "Diafragma turun · Ritme jantung menyesuaikan",
      de: "Zwerchfell sinkt · Puls passt sich an",
      fr: "Le diaphragme s'abaisse · Le pouls ralentit",
      es: "El diafragma desciende · El pulso se armoniza",
    },
  },
  {
    name: "hold",
    duration: 7,
    scale: 1.28,
    label: {
      en: "Retain & Settle (7s)",
      id: "Tahan Napas Nyaman (7d)",
      de: "Atem sanft anhalten (7s)",
      fr: "Retenir sans forcer (7s)",
      es: "Retener con calma (7s)",
    },
    cue: {
      en: "Gently hold your breath without tension in throat or chest",
      id: "Tahan napas rileks tanpa ketegangan di tenggorokan atau dada",
      de: "Halten Sie den Atem ohne Druck im Brustkorb",
      fr: "Maintenez l'air sans crisper la gorge",
      es: "Mantenga el aire sin tensión en pecho ni garganta",
    },
    subtext: {
      en: "Oxygen saturates bloodstream · Bradycardia triggers parasympathetic shift",
      id: "Oksigen mengalir ke darah · Bradikardia memicu dominasi parasimpatik",
      de: "Sauerstoffsättigung steigt · Bradykardie leitet Entspannung ein",
      fr: "Oxygénation du sang · La bradycardie active la détente",
      es: "Oxigenación celular · La bradicardia activa el descanso",
    },
  },
  {
    name: "exhale",
    duration: 8,
    scale: 0.82,
    label: {
      en: "Release Whoosh (8s)",
      id: "Hembuskan Panjang (8d)",
      de: "Langsam Ausatmen (8s)",
      fr: "Longue expiration (8s)",
      es: "Exhalación profunda (8s)",
    },
    cue: {
      en: "Make a soft 'whoosh' sound releasing all air through mouth",
      id: "Buang seluruh napas perlahan dengan suara desis lembut lewat mulut",
      de: "Mit einem sanften Hauchgeräusch vollständig durch den Mund ausatmen",
      fr: "Expirez complètement par la bouche dans un doux souffle",
      es: "Suelte todo el aire lentamente por la boca con un suave silbido",
    },
    subtext: {
      en: "Vagus nerve discharges acetylcholine · Melatonin release prepares body for sleep",
      id: "Saraf vagus melepas asetilkolin · Tubuh bersiap memproduksi melatonin",
      de: "Vagusnerv schüttet Acetylcholin aus · Körper bereitet Schlaf vor",
      fr: "Le nerf vague libère de l'acétylcholine · Le corps s'endort",
      es: "El nervio vago libera acetilcolina · El cuerpo se rinde al sueño",
    },
  },
];

const SleepPacerLab: React.FC = () => {
  const [lang, setLang] = useState<SleepLang>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(PHASES[0].duration);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [audioDrone, setAudioDrone] = useState(true);
  const [audioChime, setAudioChime] = useState(true);
  const [targetCycles, setTargetCycles] = useState<number>(8); // default 8 cycles (~2.5 mins)

  // Web Audio Context & Node Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneOscSubRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  const activePhase = PHASES[phaseIndex];

  // Initialize or resume AudioContext
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 432 Hz Drone Controller
  const startDrone = () => {
    if (!audioDrone) return;
    try {
      const ctx = getAudioContext();
      if (droneOscRef.current) return; // already active

      const osc = ctx.createOscillator();
      const oscSub = ctx.createOscillator();
      const gain = ctx.createGain();

      // 432 Hz root + 216 Hz sub-octave (ultra warm delta drone)
      osc.type = "sine";
      osc.frequency.setValueAtTime(432, ctx.currentTime);

      oscSub.type = "sine";
      oscSub.frequency.setValueAtTime(216, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3);

      osc.connect(gain);
      oscSub.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscSub.start();

      droneOscRef.current = osc;
      droneOscSubRef.current = oscSub;
      droneGainRef.current = gain;
    } catch (e) {
      console.warn("Web Audio drone failed:", e);
    }
  };

  const stopDrone = () => {
    try {
      if (droneGainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        droneGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        setTimeout(() => {
          if (droneOscRef.current) {
            droneOscRef.current.stop();
            droneOscRef.current.disconnect();
            droneOscRef.current = null;
          }
          if (droneOscSubRef.current) {
            droneOscSubRef.current.stop();
            droneOscSubRef.current.disconnect();
            droneOscSubRef.current = null;
          }
          if (droneGainRef.current) {
            droneGainRef.current.disconnect();
            droneGainRef.current = null;
          }
        }, 1600);
      }
    } catch (e) {
      droneOscRef.current = null;
      droneOscSubRef.current = null;
      droneGainRef.current = null;
    }
  };

  // Sing a gentle Tibetan singing bowl chime on phase transition
  const playPhaseChime = (phase: "inhale" | "hold" | "exhale") => {
    if (!audioChime) return;
    try {
      const ctx = getAudioContext();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // Gentle tuned chords: Inhale = 432 Hz, Hold = 324 Hz, Exhale = 216 Hz
      let freq1 = 432;
      let freq2 = 864;
      if (phase === "hold") {
        freq1 = 324;
        freq2 = 648;
      } else if (phase === "exhale") {
        freq1 = 216;
        freq2 = 432;
      }

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime);

      // Warm acoustic envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.3);
      osc2.stop(ctx.currentTime + 3.3);
    } catch (e) {
      console.warn("Chime failed", e);
    }
  };

  // Toggle playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopDrone();
    } else {
      setIsPlaying(true);
      startDrone();
      playPhaseChime(activePhase.name);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    stopDrone();
    setPhaseIndex(0);
    setSecondsRemaining(PHASES[0].duration);
    setCompletedCycles(0);
  };

  // Master Timer Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Transition phase
          setPhaseIndex((currIdx) => {
            const nextIdx = (currIdx + 1) % PHASES.length;
            const nextPhase = PHASES[nextIdx];
            setSecondsRemaining(nextPhase.duration);
            playPhaseChime(nextPhase.name);

            // If we just finished exhale (index 2), cycle increments
            if (currIdx === 2) {
              setCompletedCycles((c) => {
                const newTotal = c + 1;
                if (targetCycles > 0 && newTotal >= targetCycles) {
                  // Reached session goal
                  setIsPlaying(false);
                  stopDrone();
                }
                return newTotal;
              });
            }
            return nextIdx;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, targetCycles, audioChime]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopDrone();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const metaTitles: Record<SleepLang, string> = {
    en: "4-7-8 Deep Sleep Breathing Pacer & 432Hz Sound Lab | Ju",
    id: "Pacer Latihan Napas 4-7-8 untuk Tidur Cepat & Audio 432Hz | Ju",
    de: "4-7-8 Atemübung zum Einschlafen & 432Hz Sound Lab | Ju",
    fr: "Respiration 4-7-8 pour Dormir & Fréquence 432Hz | Ju",
    es: "Respiración 4-7-8 para Conciliar el Sueño y 432Hz | Ju",
  };

  const metaDescriptions: Record<SleepLang, string> = {
    en: "Fall asleep faster in under 3 minutes with Dr. Andrew Weil's 4-7-8 sedative autonomic breathing pacer paired with pure Web Audio 432Hz delta drone and harmonic nocturnal chimes.",
    id: "Atasi insomnia dan tidur nyenyak dalam 3 menit dengan pacer latihan napas 4-7-8 Dr. Andrew Weil, dilengkapi drone delta murni 432Hz Web Audio.",
    de: "Schneller einschlafen mit der 4-7-8 Atemtechnik von Dr. Andrew Weil, kombiniert mit beruhigenden 432Hz Delta-Klangwellen und sanfter visueller Führung.",
    fr: "Endormez-vous en moins de 3 minutes avec le pacer 4-7-8 du Dr Andrew Weil et des ondes delta pures 432Hz générées en direct.",
    es: "Concilie el sueño más rápido con la respiración 4-7-8 del Dr. Andrew Weil acompañada de tonos delta de 432Hz y campanas nocturnas relajantes.",
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/tools/sleep"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: metaTitles[lang],
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            description: metaDescriptions[lang],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "Ju Mental Health & Somatic Tools",
              url: "https://www.nuju.app",
            },
          },
        ]}
      />

      {/* Ambient Celestial Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-900/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-purple-950/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-blue-950/20 rounded-full blur-[130px]" />

        {/* Dynamic Stars */}
        <div className="absolute top-12 left-10 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
        <div className="absolute top-36 right-1/4 w-1.5 h-1.5 bg-indigo-300/40 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-amber-100/50 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-sky-200/50 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 w-full flex-1 flex flex-col">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "id" ? "Semua Alat" : "All Tools"}</span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-indigo-500/20 rounded-full p-1 text-xs">
            {(["en", "id", "de", "fr", "es"] as SleepLang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full font-bold uppercase transition-all ${
                  lang === l
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* AdSense Top */}
        <div className="mb-6">
          <AdSenseBanner slot="sleep-top" format="auto" />
        </div>

        {/* Hero Title */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5" />
            <span>Dr. Andrew Weil 4-7-8 Sleep Method</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {lang === "id" ? "Pacer Napas 4-7-8 & Gelombang 432Hz" : "4-7-8 Deep Sleep Pacer & Nocturnal Lab"}
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            {lang === "id"
              ? "Relaksasi autonomik alami paling ampuh di dunia. Memperlambat denyut nadi, melepas hormon melatonin, dan menuntun otak ke gelombang delta dalam hitungan menit."
              : "The natural nervous system sedative. Synchronizes respiration, triggers acetylcholine release, and eases racing nocturnal thoughts into deep delta slumber."}
          </p>
        </div>

        {/* Main Interactive Sleep Stage */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-indigo-500/20 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-center min-h-[460px] overflow-hidden mb-8">
          {/* Subtle Ambient Outer Ring */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/15 via-slate-950/0 to-transparent pointer-events-none" />

          {/* Phase Indicators */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-sm mb-8 z-10">
            {PHASES.map((p, idx) => {
              const isCurrent = idx === phaseIndex;
              return (
                <div
                  key={p.name}
                  className={`py-2 px-3 rounded-xl text-center border transition-all ${
                    isCurrent
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-bold shadow-lg shadow-indigo-500/10"
                      : "bg-white/[0.03] border-white/5 text-slate-500 font-medium"
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-wider">{p.name}</div>
                  <div className="text-xs font-extrabold text-white mt-0.5">{p.duration}s</div>
                </div>
              );
            })}
          </div>

          {/* Glowing Animated Breathing Orb */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
            {/* Outer Pulsing Glow */}
            <motion.div
              animate={{
                scale: isPlaying ? activePhase.scale * 1.15 : 1,
                opacity: isPlaying ? (activePhase.name === "hold" ? 0.6 : 0.35) : 0.2,
              }}
              transition={{
                duration: activePhase.duration,
                ease: activePhase.name === "hold" ? "linear" : "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 blur-2xl"
            />

            {/* Inner Spherical Body */}
            <motion.div
              animate={{
                scale: isPlaying ? activePhase.scale : 1,
              }}
              transition={{
                duration: activePhase.duration,
                ease: activePhase.name === "hold" ? "linear" : "easeInOut",
              }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-indigo-500/40 via-purple-600/30 to-slate-900 border border-indigo-400/50 shadow-inner flex flex-col items-center justify-center text-center p-6 backdrop-blur-md"
            >
              {/* Dynamic Phase Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">
                    {activePhase.label[lang]}
                  </span>
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-white font-mono">
                    {isPlaying ? secondsRemaining : activePhase.duration}
                  </span>
                  <span className="text-[11px] text-slate-300 mt-2 font-medium px-2 text-center line-clamp-2">
                    {activePhase.cue[lang]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Cycle Counter & Subtitle */}
          <div className="mt-4 text-center z-10">
            <p className="text-xs text-indigo-200/70 font-medium">
              {activePhase.subtext[lang]}
            </p>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {lang === "id" ? "Siklus Selesai:" : "Completed Cycles:"}{" "}
                <strong className="text-white font-bold">{completedCycles}</strong>{" "}
                {targetCycles > 0 ? `/ ${targetCycles}` : ""}
              </span>
            </div>
          </div>

          {/* Controls Dock */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full z-10">
            <button
              onClick={handleTogglePlay}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all shadow-xl ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/25"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/35"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>{lang === "id" ? "Jeda" : "Pause"}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{lang === "id" ? "Mulai Latihan Tidur" : "Begin Sleep Pacing"}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title={lang === "id" ? "Reset siklus" : "Reset session"}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Drone Toggle */}
            <button
              onClick={() => {
                if (audioDrone) {
                  stopDrone();
                  setAudioDrone(false);
                } else {
                  setAudioDrone(true);
                  if (isPlaying) startDrone();
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                audioDrone
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                  : "bg-white/5 border-white/10 text-slate-500 line-through"
              }`}
            >
              {audioDrone ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>432Hz Drone</span>
            </button>

            {/* Chime Toggle */}
            <button
              onClick={() => setAudioChime(!audioChime)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                audioChime
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                  : "bg-white/5 border-white/10 text-slate-500 line-through"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chime</span>
            </button>
          </div>

          {/* Target Cycle Selector */}
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 z-10">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === "id" ? "Target Sesi:" : "Target Session:"}</span>
            {[4, 8, 12, 0].map((t) => (
              <button
                key={t}
                onClick={() => setTargetCycles(t)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  targetCycles === t
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-white/5 hover:bg-white/10 text-slate-400"
                }`}
              >
                {t === 0 ? (lang === "id" ? "Bebas" : "Loop") : `${t} ${lang === "id" ? "kali" : "cycles"}`}
              </button>
            ))}
          </div>
        </div>

        {/* AdSense Mid */}
        <div className="my-6">
          <AdSenseBanner slot="sleep-mid" format="auto" />
        </div>

        {/* Neuroscience & Medical Foundation */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              4s
            </div>
            <h3 className="font-bold text-sm text-foreground">
              {lang === "id" ? "1. Tarik Napas Tenang (Hidung)" : "1. Silent Nasal Inhale"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "id"
                ? "Menghirup udara tenang melalui hidung menstimulasi produksi oksida nitrat (NO), membuka saluran bronkus, dan menyiapkan paru-paru untuk pertukaran gas optimal."
                : "Breathing softly through the nose stimulates nitric oxide synthesis, opening bronchial passages and setting the rhythm for cardiovascular deceleration."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              7s
            </div>
            <h3 className="font-bold text-sm text-foreground">
              {lang === "id" ? "2. Tahan Napas (Oksigenasi)" : "2. Oxygen Retention"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "id"
                ? "Menahan napas selama 7 detik memungkinkan alveolus mendistribusikan oksigen murni ke seluruh sel saraf otak. Tekanan karbondioksida yang terkontrol memicu respon relaksasi cepat."
                : "Retaining air allows hemoglobin to fully oxygenate tissues while blood carbon dioxide builds gently, initiating immediate parasympathetic vagal braking."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              8s
            </div>
            <h3 className="font-bold text-sm text-foreground">
              {lang === "id" ? "3. Hembusan Panjang (Vagal Brake)" : "3. Prolonged Vagal Exhale"}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "id"
                ? "Ekshalasi berdurasi 8 detik merangsang saraf vagus untuk membanjiri jantung dengan asetilkolin, menurunkan detak jantung (HRV naik), dan memberi sinyal bahwa tubuh aman untuk tidur."
                : "Exhaling twice as long as the inhale triggers the vagal brake, releasing acetylcholine to reduce cardiac output and clear pre-sleep cortisol."}
            </p>
          </div>
        </div>

        {/* Pre-Sleep Bedtime Checklist */}
        <div className="p-6 rounded-3xl bg-card/30 border border-indigo-500/20 backdrop-blur-md mb-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <BedDouble className="w-4 h-4" />
            <span>
              {lang === "id" ? "Protokol Kebersihan Tidur (Sleep Hygiene)" : "Dr. Weil Bedtime Sleep Hygiene Checklist"}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {lang === "id"
                  ? "Ujung lidah menempel di langit-langit mulut tepat di belakang gigi seri atas selama latihan napas."
                  : "Keep the tip of your tongue against the ridge behind your upper front teeth throughout the cycle."}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {lang === "id"
                  ? "Redupkan lampu kamar tidur dan matikan semua layar biru minimal 45 menit sebelum berbaring."
                  : "Dim bedroom lights and extinguish blue screens at least 45 minutes prior to getting into bed."}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {lang === "id"
                  ? "Lakukan minimal 4 hingga 8 siklus saat berbaring telentang di kasur dalam posisi nyaman."
                  : "Perform between 4 to 8 cycles while lying flat in bed with shoulders relaxed."}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {lang === "id"
                  ? "Fokuskan seluruh perhatian sensorik pada sensasi aliran udara di bibir saat menghembuskan napas."
                  : "Anchor your sensory attention on the warm rush of air passing your lips during the 8-second exhale."}
              </span>
            </div>
          </div>
        </div>

        {/* Cross-linking other tools */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>
              {lang === "id" ? "Eksplorasi Alat Somatik Lainnya" : "Explore More Somatic Nervous System Labs"}
            </span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link
              to="/quiz/nervous-system"
              className="p-4 rounded-2xl bg-card/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Quiz</span>
                <h4 className="font-semibold text-sm group-hover:text-emerald-400 transition-colors mt-1">
                  Polyvagal Nervous System
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Assess Ventral safety vs Sympathetic fight/flight vs Dorsal freeze.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <span>Start Test</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/tools/breathwork"
              className="p-4 rounded-2xl bg-card/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Somatic</span>
                <h4 className="font-semibold text-sm group-hover:text-cyan-400 transition-colors mt-1">
                  Stanford Physiological Sigh
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Fastest anxiety relief in 2 breaths (Dr. Andrew Huberman Lab).
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-cyan-400 font-medium">
                <span>Open Pacer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/quiz/dopamine-detox"
              className="p-4 rounded-2xl bg-card/60 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Quiz</span>
                <h4 className="font-semibold text-sm group-hover:text-amber-400 transition-colors mt-1">
                  Dopamine Detox & Screen Test
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Screen tolerance, compulsive scrolling & boredom tolerance.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-amber-400 font-medium">
                <span>Start Screener</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Ju App CTA */}
        <AppStoreCta />
      </div>
    </div>
  );
};

export default SleepPacerLab;

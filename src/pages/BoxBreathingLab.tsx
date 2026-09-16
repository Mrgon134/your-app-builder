import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Clock,
  Wind,
  Activity,
  Heart,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

export type BoxBreathingLang = "en" | "id" | "de" | "fr" | "es";
export type BreathingMode = "tactical" | "resonant" | "sedative";
export type BreathPhase = "inhale" | "hold_in" | "exhale" | "hold_out";

interface ModeConfig {
  id: BreathingMode;
  name: Record<BoxBreathingLang, string>;
  tagline: Record<BoxBreathingLang, string>;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  color: string;
}

const BREATHING_MODES: Record<BreathingMode, ModeConfig> = {
  tactical: {
    id: "tactical",
    name: {
      en: "Tactical Box (4-4-4-4)",
      id: "Napas Kotak Taktis (4-4-4-4)",
      de: "Taktische Box (4-4-4-4)",
      fr: "Boîte Tactique (4-4-4-4)",
      es: "Caja Táctica (4-4-4-4)",
    },
    tagline: {
      en: "Standard Navy SEAL combat stress reset. Equalized autonomic regulation.",
      id: "Protokol standar Navy SEAL untuk redam stres tempur dan tenangkan kortisol.",
      de: "Der offizielle Navy-SEAL-Standard zur sofortigen vegetativen Beruhigung.",
      fr: "Protocole d'élite des Navy SEALs pour neutraliser le stress de combat.",
      es: "El estándar de los Navy SEALs para desarmar el pánico y recuperar el foco.",
    },
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    color: "#10B981", // Emerald
  },
  resonant: {
    id: "resonant",
    name: {
      en: "Vagal Resonant (5-5-5-5)",
      id: "Resonansi Vagus (5-5-5-5)",
      de: "Vagale Resonanz (5-5-5-5)",
      fr: "Résonance Vagale (5-5-5-5)",
      es: "Resonancia Vagal (5-5-5-5)",
    },
    tagline: {
      en: "3 cycles per minute deep vagal brake. Maximizes heart rate variability (HRV).",
      id: "3 siklus per menit rem vagus mendalam. Maksimalkan Heart Rate Variability (HRV).",
      de: "3 Atemzüge pro Minute. Maximiert die Herzratenvariabilität (HRV).",
      fr: "3 cycles par minute pour activer le frein vagal et optimiser la VRC.",
      es: "3 respiraciones por minuto. Maximiza la variabilidad cardíaca y la calma.",
    },
    inhale: 5,
    holdIn: 5,
    exhale: 5,
    holdOut: 5,
    color: "#06B6D4", // Cyan
  },
  sedative: {
    id: "sedative",
    name: {
      en: "Sedative 4-7-8",
      id: "Sedatif Relaksasi (4-7-8)",
      de: "Sedierende 4-7-8",
      fr: "Sédatif 4-7-8",
      es: "Sedante 4-7-8",
    },
    tagline: {
      en: "Dr. Andrew Weil's natural nervous system tranquilizer for sleep and panic.",
      id: "Obat penenang alami sistem saraf untuk mengatasi insomnia dan serangan panik.",
      de: "Dr. Andrew Weils natürliche Beruhigungsmethode für Schlaf und Panik.",
      fr: "Le tranquillisant naturel du système nerveux pour le sommeil et les angoisses.",
      es: "El sedante natural de Dr. Andrew Weil para combatir el insomnio y la ansiedad.",
    },
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    holdOut: 1,
    color: "#8B5CF6", // Purple
  },
};

const BoxBreathingLab: React.FC = () => {
  const [lang, setLang] = useState<BoxBreathingLang>("en");
  const [mode, setMode] = useState<BreathingMode>("tactical");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  // Audio Context and Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  const currentConfig = BREATHING_MODES[mode];

  // Initialize Web Audio safely on user click
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // Soft base drone
      const osc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(droneGain);
      droneGain.connect(master);
      osc.start();

      oscRef.current = osc;
      droneGainRef.current = droneGain;
    } catch (e) {
      console.error("Failed to initialize Web Audio API:", e);
    }
  };

  // Play Tibetan Singing Bowl bell chime at phase turns
  const playPhaseBell = (freq: number = 528) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || isMuted) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Dual harmonic bell synthesis
    const fundamental = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const bellGain = ctx.createGain();

    fundamental.type = "sine";
    fundamental.frequency.setValueAtTime(freq, now);

    overtone.type = "sine";
    overtone.frequency.setValueAtTime(freq * 2.756, now); // Metallic overtone

    bellGain.gain.setValueAtTime(0.12, now);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    fundamental.connect(bellGain);
    overtone.connect(bellGain);
    bellGain.connect(master);

    fundamental.start(now);
    overtone.start(now);
    fundamental.stop(now + 2.3);
    overtone.stop(now + 2.3);
  };

  // Smooth tone pitch glides for breathing guidance
  const updateSynthPhase = (targetPhase: BreathPhase, duration: number) => {
    const ctx = audioCtxRef.current;
    const osc = oscRef.current;
    const droneGain = droneGainRef.current;
    if (!ctx || !osc || !droneGain) return;

    const now = ctx.currentTime;

    if (targetPhase === "inhale") {
      playPhaseBell(432);
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + duration);
      droneGain.gain.setValueAtTime(0.04, now);
      droneGain.gain.linearRampToValueAtTime(0.08, now + duration);
    } else if (targetPhase === "hold_in") {
      playPhaseBell(660);
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setValueAtTime(330, now);
      droneGain.gain.setValueAtTime(0.06, now);
    } else if (targetPhase === "exhale") {
      playPhaseBell(528);
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + duration);
      droneGain.gain.setValueAtTime(0.08, now);
      droneGain.gain.linearRampToValueAtTime(0.03, now + duration);
    } else if (targetPhase === "hold_out") {
      playPhaseBell(396);
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setValueAtTime(220, now);
      droneGain.gain.setValueAtTime(0.04, now);
    }
  };

  // Breathing Loop Timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setTotalSecondsElapsed((prev) => prev + 1);

      setPhaseSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase Transition
        let nextPhase: BreathPhase = "inhale";
        let nextDuration = currentConfig.inhale;

        if (phase === "inhale") {
          nextPhase = "hold_in";
          nextDuration = currentConfig.holdIn;
        } else if (phase === "hold_in") {
          nextPhase = "exhale";
          nextDuration = currentConfig.exhale;
        } else if (phase === "exhale") {
          if (currentConfig.holdOut > 0) {
            nextPhase = "hold_out";
            nextDuration = currentConfig.holdOut;
          } else {
            nextPhase = "inhale";
            nextDuration = currentConfig.inhale;
            setCyclesCompleted((c) => c + 1);
          }
        } else if (phase === "hold_out") {
          nextPhase = "inhale";
          nextDuration = currentConfig.inhale;
          setCyclesCompleted((c) => c + 1);
        }

        setPhase(nextPhase);
        updateSynthPhase(nextPhase, nextDuration);
        return nextDuration;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, phase, currentConfig]);

  // Volume synchronization
  useEffect(() => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    masterGainRef.current.gain.setTargetAtTime(
      isMuted ? 0 : volume,
      audioCtxRef.current.currentTime,
      0.05
    );
  }, [volume, isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
      updateSynthPhase(phase, phaseSecondsLeft);
      toast.success(
        lang === "id"
          ? "Sesi latihan napas dimulai. Ikuti pacer kotak."
          : "Breathing session started. Follow the square pacer."
      );
    } else {
      setIsPlaying(false);
    }
  };

  const handleResetSession = () => {
    setIsPlaying(false);
    setPhase("inhale");
    setPhaseSecondsLeft(currentConfig.inhale);
    setCyclesCompleted(0);
    setTotalSecondsElapsed(0);
    toast.info(lang === "id" ? "Sesi direset." : "Session reset.");
  };

  const handleModeChange = (newMode: BreathingMode) => {
    setMode(newMode);
    setPhase("inhale");
    setPhaseSecondsLeft(BREATHING_MODES[newMode].inhale);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Phase translation helpers
  const getPhaseName = (p: BreathPhase): string => {
    const names: Record<BreathPhase, Record<BoxBreathingLang, string>> = {
      inhale: {
        en: "INHALE",
        id: "TARIK NAPAS",
        de: "EINATMEN",
        fr: "INSPIREZ",
        es: "INHALAR",
      },
      hold_in: {
        en: "HOLD (FULL)",
        id: "TAHAN NAPAS",
        de: "HALTEN (VOLL)",
        fr: "BLOQUEZ (PLEIN)",
        es: "RETENER (LLENO)",
      },
      exhale: {
        en: "EXHALE",
        id: "HEMBUSKAN",
        de: "AUSATMEN",
        fr: "EXPIREZ",
        es: "EXHALAR",
      },
      hold_out: {
        en: "HOLD (EMPTY)",
        id: "TAHAN KOSONG",
        de: "HALTEN (LEER)",
        fr: "BLOQUEZ (VIDE)",
        es: "RETENER (VACÍO)",
      },
    };
    return names[p][lang];
  };

  const getPhaseTip = (p: BreathPhase): string => {
    const tips: Record<BreathPhase, Record<BoxBreathingLang, string>> = {
      inhale: {
        en: "Slow diaphragmatic expansion through the nose",
        id: "Tarik napas perut perlahan lewat hidung",
        de: "Langsame Zwerchfellatmung durch die Nase",
        fr: "Expansion abdominale lente par le nez",
        es: "Inhalación diafragmática lenta por la nariz",
      },
      hold_in: {
        en: "Relax shoulders, jaw, and throat without strain",
        id: "Rilekskan bahu, rahang, dan tenggorokan",
        de: "Schultern und Kiefer ohne Druck entspannt lassen",
        fr: "Relâchez les épaules et la mâchoire sans forcer",
        es: "Relaja hombros y mandíbula sin forzar el cuello",
      },
      exhale: {
        en: "Smooth, unforced release through nose or lips",
        id: "Hembuskan halus dan tuntas lewat bibir atau hidung",
        de: "Sanftes, gleichmäßiges Ausströmenlassen",
        fr: "Expiration fluide et totale par la bouche ou le nez",
        es: "Exhalación suave y completa sin tensión",
      },
      hold_out: {
        en: "Rest peacefully in the quiet somatic emptiness",
        id: "Istirahatkan tubuh dalam keheningan jeda",
        de: "Verweilen Sie gelassen in der stillen Leere",
        fr: "Reposez-vous paisiblement dans ce vide apaisé",
        es: "Descansa en la quietud del vacío corporal",
      },
    };
    return tips[p][lang];
  };

  const metaTitles: Record<BoxBreathingLang, string> = {
    en: "Navy SEAL Box Breathing Lab: Free Resonant Vagal Pacer & Audio Synth | Ju",
    id: "Napas Kotak Navy SEAL (Box Breathing) Online & Pacer Vagus | Ju",
    de: "Navy SEAL Box Breathing: Kostenloser Taktischer Atem-Pacer | Ju",
    fr: "Respiration Carrée Navy SEAL en Ligne (Box Breathing) | Ju",
    es: "Respiración Cuadrada Navy SEAL Online (Box Breathing) | Ju",
  };

  const metaDescriptions: Record<BoxBreathingLang, string> = {
    en: "Practice authentic Navy SEAL Box Breathing (4-4-4-4, 5-5-5-5, and 4-7-8) with real-time browser Web Audio tone synthesis, harmonic Tibetan chimes, and an animated visual pacer.",
    id: "Latih teknik napas kotak Navy SEAL (4-4-4-4) dengan audio sintetis nada penenang, lonceng Tibet, dan visual pacer kotak untuk redakan kecemasan instan.",
    de: "Meistern Sie die taktische Navy-SEAL-Viereckatmung mit reiner Web-Audio-Synthese, tibetischen Klangschalen und dynamischem Taktgeber.",
    fr: "Pratiquez la respiration en boîte tactique avec générateur sonore Web Audio, bols tibétains et pacer visuel pour abaisser le cortisol en 2 minutes.",
    es: "Entrena la respiración cuadrada táctica de los Navy SEALs con sintetizador de audio en tiempo real y cuencos tibetanos para regular el sistema nervioso.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/tools/box-breathing"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Top navigation & Language switch */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Labs & Tests</span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["en", "id", "de", "fr", "es"] as BoxBreathingLang[]).map((l) => (
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
            <AdSenseBanner slot="box-top" format="auto" />
          </div>

          {/* Hero Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TACTICAL AUTONOMIC REGULATION • COMMANDER MARK DIVINE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Navy SEAL Box Breathing Lab
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Activate your parasympathetic vagal brake in 2 minutes. Synchronize heart rate variability (HRV) with pure Web Audio harmonic cues and dynamic square pacing.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
            {(Object.keys(BREATHING_MODES) as BreathingMode[]).map((mKey) => {
              const cfg = BREATHING_MODES[mKey];
              const isSelected = mode === mKey;
              return (
                <button
                  key={mKey}
                  onClick={() => handleModeChange(mKey)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-800 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-bold"
                      style={{ color: isSelected ? cfg.color : undefined }}
                    >
                      {cfg.name[lang]}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {cfg.tagline[lang]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Visual Square Breathing Pacer Container */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden mb-6 flex flex-col items-center justify-center min-h-[440px]">
            {/* Ambient background glow orb */}
            <motion.div
              className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
              animate={{
                scale: phase === "inhale" || phase === "hold_in" ? 1.25 : 0.85,
                opacity: isPlaying ? 0.35 : 0.15,
              }}
              transition={{ duration: 3, ease: "easeInOut" }}
              style={{ backgroundColor: currentConfig.color }}
            />

            {/* Central Animated SVG Square Pacer */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                {/* Background Box Track */}
                <rect
                  x="20"
                  y="20"
                  width="200"
                  height="200"
                  rx="36"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="8"
                />

                {/* Animated Glowing Active Stroke */}
                <rect
                  x="20"
                  y="20"
                  width="200"
                  height="200"
                  rx="36"
                  fill="none"
                  stroke={currentConfig.color}
                  strokeWidth="8"
                  strokeDasharray="800"
                  strokeDashoffset={
                    phase === "inhale"
                      ? 600
                      : phase === "hold_in"
                      ? 400
                      : phase === "exhale"
                      ? 200
                      : 0
                  }
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              {/* Inside Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <span
                  className="text-xs font-black tracking-widest uppercase mb-1"
                  style={{ color: currentConfig.color }}
                >
                  {getPhaseName(phase)}
                </span>
                <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter mb-2">
                  {isPlaying ? phaseSecondsLeft : currentConfig.inhale}
                </span>
                <span className="text-xs text-slate-400 max-w-[170px] leading-tight">
                  {getPhaseTip(phase)}
                </span>
              </div>
            </div>

            {/* Primary Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handleTogglePlay}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl transition-all duration-300 transform active:scale-95"
                style={{
                  backgroundColor: isPlaying ? "#ef4444" : currentConfig.color,
                  boxShadow: `0 10px 25px -5px ${isPlaying ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.3)"}`,
                }}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pause Pacer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                    <span>Start Breathing</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetSession}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 transition"
                title="Reset Session"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 transition"
                title={isMuted ? "Unmute Audio Synthesis" : "Mute Audio Synthesis"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-rose-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-emerald-400" />
                )}
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm pt-6 border-t border-slate-800/80">
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Cycles Completed
                </span>
                <span className="text-2xl font-black text-white">{cyclesCompleted}</span>
              </div>
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Time Elapsed
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatTime(totalSecondsElapsed)}
                </span>
              </div>
            </div>
          </div>

          {/* AdSense Mid */}
          <div className="my-6">
            <AdSenseBanner slot="box-mid" format="auto" />
          </div>

          {/* Clinical Neurobiology & Tactical Science Accordion */}
          <div className="bg-slate-900/70 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>The Neurobiology of Box Breathing</span>
              </h3>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Why Special Operations Warriors & Trauma Surgeons Rely on Square Pacing
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When your amygdala senses high stakes, your sympathetic nervous system increases respiratory rate and restricts carbon dioxide (CO2) tolerance. This produces panic, tunnel vision, and cognitive paralysis. Box breathing equalizes the four breath segments to stimulate the baroreceptors in your carotid sinus, physically commanding your vagus nerve to slow the sinoatrial node of your heart.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-xs font-bold text-emerald-400 mb-1">1. Vagal Nerve Stimulation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Slow exhalations trigger acetylcholine release, slowing heart contractions and blood pressure spikes.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-xs font-bold text-cyan-400 mb-1">2. CO2 Tolerance Training</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The dual 4-second breath holds safely elevate blood carbon dioxide, resetting your respiratory chemoreceptors.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-xs font-bold text-purple-400 mb-1">3. Cognitive Focus Lock</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Counting the 4-phase geometric loop occupies the default mode network (DMN), terminating toxic overthinking loops.
                </p>
              </div>
            </div>
          </div>

          {/* Ju App Conversion Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div className="max-w-md">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                Deepen Your Somatic Practice
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Pair Breathwork with Guided AI Voice Journaling in Ju
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                After centering your nervous system with box breathing, speak what remains in your heart. Ju captures your reflections and detects subtle autonomic mood shifts over time.
              </p>
            </div>
            <AppStoreCta source="box_breathing" />
          </div>

          {/* Related Psychological Tools */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Explore More Somatic Diagnostics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                to="/quiz/emotional-agility"
                className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                    Emotional Agility Screener
                  </span>
                  <p className="text-xs text-slate-400">Dr. Susan David AAQ-2 model</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/quiz/high-functioning-anxiety"
                className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-amber-400 block mb-0.5">
                    Anxiety Mask Diagnostic
                  </span>
                  <p className="text-xs text-slate-400">Overthinking & hidden fear</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/tools/nsdr"
                className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-teal-400 block mb-0.5">
                    Stanford NSDR Lab
                  </span>
                  <p className="text-xs text-slate-400">Dopamine & sleep recovery</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoxBreathingLab;

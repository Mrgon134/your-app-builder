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
  Mic,
  Waves,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

export type VocalLang = "en" | "id" | "de" | "fr" | "es";
export type VagalTonePreset = "om" | "somatic" | "throat";

interface TonePresetConfig {
  id: VagalTonePreset;
  baseFreq: number;
  name: Record<VocalLang, string>;
  subtitle: Record<VocalLang, string>;
  description: Record<VocalLang, string>;
  color: string;
}

const TONE_PRESETS: Record<VagalTonePreset, TonePresetConfig> = {
  om: {
    id: "om",
    baseFreq: 136.1,
    name: {
      en: "136.1 Hz · Om Resonance",
      id: "136.1 Hz · Resonansi Om Alami",
      de: "136,1 Hz · Ur-Klang Om",
      fr: "136,1 Hz · Résonance Primordiale Om",
      es: "136.1 Hz · Resonancia Sagrada Om",
    },
    subtitle: {
      en: "Earth year frequency. Grounding, heart-opening, and deep vagal brake.",
      id: "Frekuensi organik bumi. Grounding batin, membuka dada, dan rem vagus kuat.",
      de: "Erdenjahr-Frequenz für Herzöffnung und tiefe vegetative Entlastung.",
      fr: "Fréquence de l'année terrestre. Ancrage profond et frein vagal puissant.",
      es: "Frecuencia de la órbita terrestre. Enraizamiento y freno vagal profundo.",
    },
    description: {
      en: "Synthesized at the exact astronomical frequency of the Earth's orbit around the sun. Humming along at 136.1Hz stimulates the laryngeal vagus branch and triggers immediate nitric oxide release in the nasal cavity.",
      id: "Disintesis pada frekuensi astronomis perputaran bumi. Bergumam (humming) pada nada 136.1Hz merangsang percabangan saraf vagus di tenggorokan dan melipatgandakan gas nitric oxide pelega pembuluh darah.",
      de: "Entspannt die Kehlkopfmuskulatur, aktiviert den Vagusnerv und regt die Freisetzung von gefäßerweiterndem Stickstoffmonoxid in den Nasennebenhöhlen an.",
      fr: "Stimule la branche laryngée du nerf vague et multiplie par 15 la production d'oxyde nitrique dans les voies respiratoires.",
      es: "Estimula las ramas laríngeas del nervio vago y multiplica la liberación de óxido nítrico en las fosas nasales.",
    },
    color: "#6366F1", // Indigo
  },
  somatic: {
    id: "somatic",
    baseFreq: 128,
    name: {
      en: "128 Hz · C3 Bone Conduction",
      id: "128 Hz · Konduksi Tulang C3",
      de: "128 Hz · C3 Knochenresonanz",
      fr: "128 Hz · Conduction Osseuse C3",
      es: "128 Hz · Conducción Ósea C3",
    },
    subtitle: {
      en: "Scientific therapeutic tuning. Deep somatic bone and tissue relaxation.",
      id: "Frekuensi medis standar. Relaksasi mendalam pada tulang dan jaringan tubuh.",
      de: "Wissenschaftliche Stimmgabel-Frequenz zur myofaszialen Tiefenentspannung.",
      fr: "Fréquence thérapeutique standard pour détendre les fascias et le squelette.",
      es: "Frecuencia terapéutica médica para relajar fascias y musculatura profunda.",
    },
    description: {
      en: "Used in neurological tuning forks. 128Hz creates osteophonic resonance through the sternum, cervical spine, and skull, melting chronic frozen trauma reflexes.",
      id: "Digunakan pada garpu tala medis saraf. Frekuensi 128Hz menciptakan getaran osteofonik melalui tulang dada, leher, dan tengkorak, melarutkan respons trauma yang membeku.",
      de: "Erzeugt spürbare Schwingungen durch Brustbein und Halswirbelsäule, wodurch chronische Stressblockaden sanft gelöst werden.",
      fr: "Fait vibrer le sternum et la colonne cervicale pour dissoudre les tensions somatiques chroniques.",
      es: "Provoca resonancia ósea en el esternón y la columna cervical, desactivando patrones de estrés congelados.",
    },
    color: "#10B981", // Emerald
  },
  throat: {
    id: "throat",
    baseFreq: 216,
    name: {
      en: "216 Hz · Vagal Harmonics",
      id: "216 Hz · Harmoni Saraf Vagus",
      de: "216 Hz · Vagale Harmonik",
      fr: "216 Hz · Harmonique Vagale",
      es: "216 Hz · Armónico Vagal",
    },
    subtitle: {
      en: "Third octave of 27Hz. Unblocks suppressed emotional vocal expressions.",
      id: "Oktaf ketiga 27Hz. Membuka sumbatan emosi dan rasa tercekat di tenggorokan.",
      de: "Löst den sprichwörtlichen Kloß im Hals und befreit ungesagte Emotionen.",
      fr: "Dénoue la gorge serrée et libère les émotions inexprimées.",
      es: "Desbloquea el nudo en la garganta y libera emociones reprimidas.",
    },
    description: {
      en: "Targets the pharyngeal plexus and recurrent laryngeal nerve to dissolve the psychosomatic 'lump in the throat' (globus sensation) caused by unspoken grief and unexpressed anger.",
      id: "Menargetkan pleksus faringeal untuk meredakan sensasi 'tercekat di tenggorokan' (globus sensation) yang kerap dipicu oleh duka atau amarah yang tertahan.",
      de: "Entspannt die Rachenmuskulatur und befreit die Stimme von emotionaler Enge.",
      fr: "Cible le plexus pharyngé pour effacer la sensation de gorge nouée liée au chagrin refoulé.",
      es: "Actúa sobre el plexo faríngeo para disolver la sensación de garganta cerrada por dolor contenido.",
    },
    color: "#EC4899", // Pink
  },
};

const VocalToningLab: React.FC = () => {
  const [lang, setLang] = useState<VocalLang>("en");
  const [preset, setPreset] = useState<VagalTonePreset>("om");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [phase, setPhase] = useState<"inhale" | "hum">("inhale");
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);

  // Audio Context and Synth nodes
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const toneGainRef = useRef<GainNode | null>(null);

  const currentPreset = TONE_PRESETS[preset];

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

      // Dual Carrier Oscillator with slight binaural detune for alpha/theta entrainment
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const toneGain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(currentPreset.baseFreq, ctx.currentTime);
      osc2.frequency.setValueAtTime(currentPreset.baseFreq + 4.5, ctx.currentTime); // 4.5Hz Theta Beat

      toneGain.gain.setValueAtTime(0.03, ctx.currentTime);

      osc1.connect(toneGain);
      osc2.connect(toneGain);
      toneGain.connect(master);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      toneGainRef.current = toneGain;
    } catch (e) {
      console.error("Failed to initialize Web Audio API:", e);
    }
  };

  // Play Tibetan Singing Bowl chime at transitions
  const playTransitionChime = (freq: number = 432) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || isMuted) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();

    bellOsc.type = "sine";
    bellOsc.frequency.setValueAtTime(freq, now);

    bellGain.gain.setValueAtTime(0.14, now);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    bellOsc.connect(bellGain);
    bellGain.connect(master);

    bellOsc.start(now);
    bellOsc.stop(now + 2.6);
  };

  // Tone swell for inhalation vs humming
  const updateSynthPhase = (targetPhase: "inhale" | "hum", duration: number) => {
    const ctx = audioCtxRef.current;
    const toneGain = toneGainRef.current;
    if (!ctx || !toneGain) return;

    const now = ctx.currentTime;

    if (targetPhase === "inhale") {
      playTransitionChime(currentPreset.baseFreq * 2);
      toneGain.gain.cancelScheduledValues(now);
      toneGain.gain.linearRampToValueAtTime(0.025, now + 0.5);
    } else {
      playTransitionChime(currentPreset.baseFreq * 3);
      toneGain.gain.cancelScheduledValues(now);
      toneGain.gain.linearRampToValueAtTime(0.09, now + 1.0);
    }
  };

  // Cycle pacing timer (4s Inhale -> 8s Hum Exhale = 12s per cycle)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setTotalSecondsElapsed((prev) => prev + 1);

      setPhaseSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        if (phase === "inhale") {
          setPhase("hum");
          updateSynthPhase("hum", 8);
          return 8;
        } else {
          setPhase("inhale");
          setCyclesCompleted((c) => c + 1);
          updateSynthPhase("inhale", 4);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, phase, currentPreset]);

  // Handle Preset Switching
  const handlePresetChange = (newPreset: VagalTonePreset) => {
    setPreset(newPreset);
    const cfg = TONE_PRESETS[newPreset];
    const ctx = audioCtxRef.current;
    if (ctx && osc1Ref.current && osc2Ref.current) {
      const now = ctx.currentTime;
      osc1Ref.current.frequency.cancelScheduledValues(now);
      osc2Ref.current.frequency.cancelScheduledValues(now);
      osc1Ref.current.frequency.setValueAtTime(cfg.baseFreq, now);
      osc2Ref.current.frequency.setValueAtTime(cfg.baseFreq + 4.5, now);
    }
  };

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
          ? "Sesi Vagal Humming dimulai. Tarik napas lewat hidung dan bergumamlah saat lingkaran membesar."
          : "Vocal Toning session started. Inhale gently, then hum aloud with the tone."
      );
    } else {
      setIsPlaying(false);
    }
  };

  const handleResetSession = () => {
    setIsPlaying(false);
    setPhase("inhale");
    setPhaseSecondsLeft(4);
    setCyclesCompleted(0);
    setTotalSecondsElapsed(0);
    toast.info(lang === "id" ? "Sesi direset." : "Session reset.");
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const metaTitles: Record<VocalLang, string> = {
    en: "Vagal Humming Lab: Polyvagal Vocal Toning & Resonance Synthesizer | Ju",
    id: "Vagal Humming Lab: Latihan Olah Suara Stimulasi Saraf Vagus Online | Ju",
    de: "Vagusnerv Toning Lab: Polyvagales Summen & Klang-Synthesizer | Ju",
    fr: "Laboratoire de Bourdonnement Vagal : Toning Vocal & Nerf Vague | Ju",
    es: "Laboratorio de Tonificación Vagal: Zumbido Polivagal & Sintetizador | Ju",
  };

  const metaDescriptions: Record<VocalLang, string> = {
    en: "Stimulate your wandering vagus nerve in real-time with browser Web Audio harmonic carrier tones (136.1Hz Om, 128Hz C3) and a guided 4-8 Bhramari humming pacer.",
    id: "Latih stimulasi saraf vagus dengan olah suara (vocal toning) dan gumaman Bhramari pada frekuensi 136.1Hz & 128Hz untuk meredakan trauma dan cemas seketika.",
    de: "Aktivieren Sie Ihren Vagusnerv durch gezieltes Summen (Bhramari). Reine Web-Audio-Frequenzen bei 136,1 Hz und 128 Hz für sofortige innere Ruhe.",
    fr: "Activez le nerf vague par la vibration vocale (Bhramari Pranayama) grâce à notre synthétiseur d'harmoniques pures à 136,1 Hz et 128 Hz.",
    es: "Estimula el nervio vago con la vibración de tu propia voz y frecuencias armónicas puras de 136.1 Hz y 128 Hz para disolver el estrés somático.",
  };

  return (
    <>
      <SEOHead
        title={metaTitles[lang]}
        description={metaDescriptions[lang]}
        canonical="https://www.nuju.app/tools/vocal-toning"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Navigation & Language Switch */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Labs & Tools</span>
            </Link>

            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {(["en", "id", "de", "fr", "es"] as VocalLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg font-bold uppercase transition ${
                    lang === l
                      ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
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
            <AdSenseBanner slot="vocal-top" format="auto" />
          </div>

          {/* Hero Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider mb-3">
              <Waves className="w-3.5 h-3.5" />
              <span>POLYVAGAL THEORY • DR. STEPHEN PORGES & BHRAMARI RESONANCE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Vagal Humming & Vocal Toning Lab
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Vibrate your vocal folds and pharyngeal plexus. Send direct mechanical soothing signals through the recurrent laryngeal nerve into your cardiac pacemaker.
            </p>
          </div>

          {/* Preset Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
            {(Object.keys(TONE_PRESETS) as VagalTonePreset[]).map((pKey) => {
              const cfg = TONE_PRESETS[pKey];
              const isSelected = preset === pKey;
              return (
                <button
                  key={pKey}
                  onClick={() => handlePresetChange(pKey)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-800 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
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
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {cfg.subtitle[lang]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Central Resonant Flower Mandala Visualizer */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden mb-6 flex flex-col items-center justify-center min-h-[460px]">
            {/* Ambient Background Glow Orb */}
            <motion.div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
              animate={{
                scale: phase === "hum" ? 1.35 : 0.9,
                opacity: isPlaying ? 0.4 : 0.15,
              }}
              transition={{ duration: phase === "hum" ? 8 : 4, ease: "easeInOut" }}
              style={{ backgroundColor: currentPreset.color }}
            />

            {/* Sacred Geometry Pulsing Mandala */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10"
                animate={{
                  scale: phase === "hum" ? [1, 1.08, 1] : 1,
                  rotate: phase === "hum" ? 360 : 0,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-dashed"
                style={{ borderColor: `${currentPreset.color}60` }}
                animate={{
                  scale: phase === "hum" ? 1.2 : 0.85,
                  rotate: -180,
                }}
                transition={{ duration: phase === "hum" ? 8 : 4, ease: "easeInOut" }}
              />

              {/* Center Breathing / Humming Instruction Orb */}
              <motion.div
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl border backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  borderColor: currentPreset.color,
                  boxShadow: `0 0 50px -10px ${currentPreset.color}40`,
                }}
                animate={{
                  scale: phase === "hum" ? 1.15 : 0.9,
                }}
                transition={{ duration: phase === "hum" ? 8 : 4, ease: "easeInOut" }}
              >
                <span
                  className="text-xs font-black tracking-widest uppercase mb-1"
                  style={{ color: currentPreset.color }}
                >
                  {phase === "inhale"
                    ? lang === "id"
                      ? "TARIK NAPAS HIDUNG"
                      : "GENTLE NOSE INHALE"
                    : lang === "id"
                    ? "BERGUMAMLAH 'MMMMM'"
                    : "HUM ALOUD 'MMMMM'"}
                </span>

                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter mb-1">
                  {isPlaying ? phaseSecondsLeft : 4}s
                </span>

                <span className="text-[11px] text-slate-400 max-w-[140px] leading-tight">
                  {phase === "inhale"
                    ? lang === "id"
                      ? "Isi perut perlahan (4s)"
                      : "Expand belly gently (4s)"
                    : lang === "id"
                    ? "Keluarkan suara getar (8s)"
                    : "Vocalize steady hum (8s)"}
                </span>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handleTogglePlay}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl transition-all duration-300 transform active:scale-95"
                style={{
                  backgroundColor: isPlaying ? "#ef4444" : currentPreset.color,
                  boxShadow: `0 10px 25px -5px ${isPlaying ? "rgba(239,68,68,0.4)" : "rgba(99,102,241,0.3)"}`,
                }}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pause Toning</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                    <span>Start Vagal Humming</span>
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
                  <Volume2 className="w-5 h-5 text-indigo-400" />
                )}
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm pt-6 border-t border-slate-800/80">
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Humming Cycles
                </span>
                <span className="text-2xl font-black text-white">{cyclesCompleted}</span>
              </div>
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Resonance Time
                </span>
                <span className="text-2xl font-black text-indigo-400">
                  {formatTime(totalSecondsElapsed)}
                </span>
              </div>
            </div>
          </div>

          {/* AdSense Mid */}
          <div className="my-6">
            <AdSenseBanner slot="vocal-mid" format="auto" />
          </div>

          {/* Neurobiology Accordion */}
          <div className="bg-slate-900/70 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>The Neuroscience of Phonation & The Vagus Nerve</span>
              </h3>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
                Why Humming Out Loud Drops Heart Rate Faster than Silent Sitting
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Silent meditation requires high cognitive effort that can often backfire for anxious, overthinking brains. In contrast, vocal humming (Bhramari Pranayama) creates direct mechanical vibration against the pharyngeal wall and thyroid cartilage, physically massaging the recurrent laryngeal nerve. Clinical Karolinska Institute studies confirmed that humming creates a 15-fold surge in endogenous nitric oxide (NO) while dramatically boosting heart rate variability (HRV).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-xs font-bold text-indigo-400 mb-1">1. Laryngeal Vagal Massage</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vocal cord vibration sends afferent sensory spikes to the nucleus tractus solitarius in your brainstem.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-xs font-bold text-emerald-400 mb-1">2. 15x Nitric Oxide Surge</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Oscillating air waves in the paranasal sinuses dilate pulmonary blood vessels and ease oxygen transport.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <h4 className="text-xs font-bold text-pink-400 mb-1">3. Ventral Vagal Anchor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The soothing low-frequency drone mimics mammalian maternal cooing, signaling undeniable biological safety.
                </p>
              </div>
            </div>
          </div>

          {/* Ju App Conversion CTA */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-indigo-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div className="max-w-md">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                Voice Your Emotional Truth
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Transition from Humming to Somatic Voice Journaling in Ju
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Once your throat and chest are open and grounded, speak freely. Ju's encrypted voice journal listens to your unedited thoughts and reflects back emotional patterns with deep empathy.
              </p>
            </div>
            <AppStoreCta source="vocal_lab" />
          </div>

          {/* Related Psychological Tools */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Explore More Somatic Labs & Quizzes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                to="/tools/box-breathing"
                className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                    Navy SEAL Box Breathing
                  </span>
                  <p className="text-xs text-slate-400">Tactical 4-4-4-4 vagal reset</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/quiz/alexithymia"
                className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-sky-400 block mb-0.5">
                    Alexithymia Diagnostic
                  </span>
                  <p className="text-xs text-slate-400">Toronto TAS-20 emotional scale</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/quiz/parentification"
                className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-bold text-rose-400 block mb-0.5">
                    Parentification Screener
                  </span>
                  <p className="text-xs text-slate-400">Eldest child syndrome & boundaries</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VocalToningLab;

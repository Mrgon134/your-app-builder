import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Activity,
  Heart,
  Wind,
  CheckCircle2,
  Brain,
  Waves,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";

type BreathPhase = "inhale1" | "inhale2" | "exhale";

interface SighMode {
  id: "stanford" | "quick_reset" | "deep_sleep";
  name: string;
  subtitle: string;
  inhale1Sec: number;
  inhale2Sec: number;
  exhaleSec: number;
  targetCycles: number;
}

const SIGH_MODES: SighMode[] = [
  {
    id: "stanford",
    name: "Stanford Cyclic Sighing",
    subtitle: "Dr. Huberman & Dr. Spiegel 2023 Cell Protocol",
    inhale1Sec: 2.5,
    inhale2Sec: 1.0,
    exhaleSec: 6.5,
    targetCycles: 15, // ~2.5 minutes
  },
  {
    id: "quick_reset",
    name: "Acute Panic De-Escalator",
    subtitle: "Rapid 3-Cycle Alveolar Re-inflation",
    inhale1Sec: 2.0,
    inhale2Sec: 0.8,
    exhaleSec: 5.2,
    targetCycles: 5,
  },
  {
    id: "deep_sleep",
    name: "Bedtime Vagal Sedative",
    subtitle: "Extended 8s Exhale for Melatonin Sync",
    inhale1Sec: 3.0,
    inhale2Sec: 1.2,
    exhaleSec: 8.0,
    targetCycles: 10,
  },
];

const PhysiologicalSighLab: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<SighMode>(SIGH_MODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>("inhale1");
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(SIGH_MODES[0].inhale1Sec);
  const [completedCycles, setCompletedCycles] = useState(0);

  // Web Audio Context & Node References
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize or resume Web Audio
  const initAudio = () => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.35, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  };

  // Synthesize bell chime with exponential decay
  const playBellChime = (freq: number = 528) => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(masterGainRef.current);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch (e) {
      // safe fallback
    }
  };

  // Play tone for specific breathing phase
  const triggerPhaseAcoustics = (phase: BreathPhase) => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;

    try {
      if (phase === "inhale1") {
        // Deep belly rise: smooth warm upward glide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + selectedMode.inhale1Sec);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + selectedMode.inhale1Sec * 0.8);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + selectedMode.inhale1Sec);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start();
        osc.stop(ctx.currentTime + selectedMode.inhale1Sec);
      } else if (phase === "inhale2") {
        // Snappy top-off inhale: sharp upward breath sweep popping open alveoli
        playBellChime(660);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + selectedMode.inhale2Sec);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + selectedMode.inhale2Sec * 0.6);
        gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + selectedMode.inhale2Sec);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start();
        osc.stop(ctx.currentTime + selectedMode.inhale2Sec);
      } else if (phase === "exhale") {
        // Long extended sigh: gentle descending drone with warm release
        playBellChime(440);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + selectedMode.exhaleSec);

        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + selectedMode.exhaleSec);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start();
        osc.stop(ctx.currentTime + selectedMode.exhaleSec);
      }
    } catch (e) {
      // safe fallback
    }
  };

  // Breathing loop timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 100;
    timerRef.current = window.setInterval(() => {
      setPhaseSecondsLeft((prev) => {
        const next = Math.max(0, +(prev - 0.1).toFixed(1));

        if (next <= 0.05) {
          // Transition to next phase
          if (currentPhase === "inhale1") {
            setCurrentPhase("inhale2");
            triggerPhaseAcoustics("inhale2");
            return selectedMode.inhale2Sec;
          } else if (currentPhase === "inhale2") {
            setCurrentPhase("exhale");
            triggerPhaseAcoustics("exhale");
            return selectedMode.exhaleSec;
          } else {
            // Exhale finished -> new cycle
            setCompletedCycles((c) => c + 1);
            setCurrentPhase("inhale1");
            triggerPhaseAcoustics("inhale1");
            return selectedMode.inhale1Sec;
          }
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentPhase, selectedMode, isMuted]);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      initAudio();
      setIsPlaying(true);
      setCurrentPhase("inhale1");
      setPhaseSecondsLeft(selectedMode.inhale1Sec);
      triggerPhaseAcoustics("inhale1");
    } else {
      setIsPlaying(false);
    }
  };

  const handleModeChange = (mode: SighMode) => {
    setSelectedMode(mode);
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentPhase("inhale1");
      setPhaseSecondsLeft(mode.inhale1Sec);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCompletedCycles(0);
    setCurrentPhase("inhale1");
    setPhaseSecondsLeft(selectedMode.inhale1Sec);
  };

  // Text description of current action
  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case "inhale1":
        return {
          title: "1. Deep Belly Inhale",
          action: "Inhale deeply through your nose, filling your diaphragm...",
          color: "text-emerald-400",
          ringColor: "#10B981",
        };
      case "inhale2":
        return {
          title: "2. Snappy Top-Off Inhale",
          action: "Quick sharp second inhale through the nose to snap alveoli open!",
          color: "text-teal-300",
          ringColor: "#14B8A6",
        };
      case "exhale":
        return {
          title: "3. Long Gentle Sigh",
          action: "Slowly exhale through your mouth with a relaxing sigh...",
          color: "text-cyan-400",
          ringColor: "#06B6D4",
        };
    }
  };

  const phaseInfo = getPhaseInstruction();

  return (
    <div className="min-h-screen bg-[#061118] text-neutral-100 selection:bg-cyan-500/30">
      <SEOHead
        title="Stanford Physiological Sigh & Cyclic Sighing Lab: Free Vagal Reset"
        description="The fastest scientifically-proven way to reduce autonomic arousal in real-time. Pure Web Audio dual-inhale acoustic pacing based on Dr. Andrew Huberman & Dr. David Spiegel Stanford research."
        canonical="https://nuju.app/tools/physiological-sigh"
        language="en"
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 border-b border-cyan-950/40 bg-[#061118]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Psychology & Somatic Tools</span>
          </Link>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-900/40 bg-neutral-900/60 text-xs font-semibold text-cyan-300 hover:text-white transition"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isMuted ? "Audio Off" : "Web Audio Active"}</span>
          </button>
        </div>
      </header>

      {/* Top Google AdSense Banner */}
      <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
        <AdSenseBanner slot="sigh-top" className="my-2" />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 space-y-8">
        {/* Hero Card */}
        <div className="rounded-3xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/30 via-neutral-900/50 to-neutral-950 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-bold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>STANFORD MEDICINE NEUROBIOLOGY PROTOCOL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
            Stanford Physiological Sigh Lab
          </h1>
          <p className="text-sm sm:text-base text-cyan-200/80 max-w-xl mx-auto mb-6">
            In Dr. Andrew Huberman & Dr. David Spiegel's 2023 Cell Reports Medicine trial,
            5 minutes of cyclic sighing produced the fastest reduction in heart rate, respiratory rate, and autonomic anxiety.
          </p>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {SIGH_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  selectedMode.id === mode.id
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                    : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {mode.name}
              </button>
            ))}
          </div>

          {/* Dynamic Expanding Ring / Torus Visualizer */}
          <div className="relative my-8 flex items-center justify-center w-72 h-72 mx-auto">
            {/* Ambient Background Glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
              style={{
                backgroundColor: isPlaying ? phaseInfo.ringColor : "#0E7490",
              }}
            />

            {/* Outer Concentric Breathing Rings */}
            <motion.div
              animate={{
                scale: isPlaying
                  ? currentPhase === "inhale1"
                    ? 1.25
                    : currentPhase === "inhale2"
                    ? 1.45
                    : 0.95
                  : 1,
                opacity: isPlaying ? 0.8 : 0.3,
              }}
              transition={{
                duration:
                  currentPhase === "inhale1"
                    ? selectedMode.inhale1Sec
                    : currentPhase === "inhale2"
                    ? selectedMode.inhale2Sec
                    : selectedMode.exhaleSec,
                ease: currentPhase === "inhale2" ? "easeOut" : "easeInOut",
              }}
              className="absolute inset-2 rounded-full border-2 border-cyan-500/30"
            />

            <motion.div
              animate={{
                scale: isPlaying
                  ? currentPhase === "inhale1"
                    ? 1.15
                    : currentPhase === "inhale2"
                    ? 1.3
                    : 0.9
                  : 1,
              }}
              transition={{
                duration:
                  currentPhase === "inhale1"
                    ? selectedMode.inhale1Sec
                    : currentPhase === "inhale2"
                    ? selectedMode.inhale2Sec
                    : selectedMode.exhaleSec,
                ease: currentPhase === "inhale2" ? "easeOut" : "easeInOut",
              }}
              className="absolute inset-8 rounded-full border border-teal-400/40"
            />

            {/* Center Breathing Orb */}
            <div className="relative z-10 flex flex-col items-center justify-center w-48 h-48 rounded-full border-4 border-cyan-500/40 bg-neutral-950/90 shadow-2xl backdrop-blur-md">
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${phaseInfo.color}`}>
                {currentPhase.toUpperCase()}
              </span>

              <span className="text-4xl font-black text-white font-mono tracking-tight">
                {isPlaying ? `${phaseSecondsLeft}s` : `${selectedMode.inhale1Sec}s`}
              </span>

              <span className="text-[11px] text-neutral-400 font-medium mt-1">
                {isPlaying ? `Cycle #${completedCycles + 1}` : "Ready to breathe"}
              </span>
            </div>
          </div>

          {/* Phase Instruction Card */}
          <div className="max-w-md mx-auto p-4 rounded-2xl border border-cyan-900/30 bg-neutral-950/60 mb-6">
            <h3 className={`text-base font-black ${phaseInfo.color} mb-1`}>
              {phaseInfo.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {phaseInfo.action}
            </p>
          </div>

          {/* Play / Pause / Reset Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-sm font-black text-white shadow-xl shadow-cyan-950 transition active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Pause Lab</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Cyclic Sighing</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-4 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
              title="Reset Cycles"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Google AdSense Banner */}
        <AdSenseBanner slot="sigh-mid" className="my-4" />

        {/* Clinical Neurobiology Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-cyan-900/30 bg-neutral-900/40 p-5 shadow-sm">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span>Alveoli Re-inflation</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mt-2">
              Under chronic stress, the millions of tiny air sacs (alveoli) in your lungs collapse like deflated balloons. The quick second inhale pops them back open, maximizing oxygen-CO2 exchange.
            </p>
          </div>

          <div className="rounded-2xl border border-teal-900/30 bg-neutral-900/40 p-5 shadow-sm">
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" />
              <span>Baroreflex & HRV</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mt-2">
              The long extended exhalation causes the diaphragm to move upward, giving the heart more physical space. The brain signals the sinoatrial node via the vagus nerve to slow heart rate immediately.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-900/30 bg-neutral-900/40 p-5 shadow-sm">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5" />
              <span>Superior to Meditation</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mt-2">
              Stanford's 2023 head-to-head trial proved that 5 minutes of cyclic sighing produced significantly greater daily positive mood and lower resting heart rate than 5 minutes of mindfulness meditation.
            </p>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4 text-white font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>How to Perform the Physiological Sigh</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-600/30 text-xs font-bold text-cyan-300">
                1
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">First Deep Inhale (2.5s)</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Inhale quietly through your nose into the bottom of your belly until lungs feel 80% full.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/30 text-xs font-bold text-teal-300">
                2
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Sharp Top-Off Inhale (1.0s)</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Without exhaling, inhale one more quick, sharp sip of air through your nose to reach 100% lung capacity and pop open collapsed alveoli.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 flex items-start gap-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600/30 text-xs font-bold text-emerald-300">
                3
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Long Relaxing Sigh Exhale (6.5s)</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Slowly and fully release all the air through your mouth with a soft, audible sigh. Repeat for 15-20 cycles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Diagnostics Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Link
            to="/tools/box-breathing"
            className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-emerald-700/60 transition group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Tactical Pacer
              </span>
              <h3 className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                Navy SEAL Box Breathing Lab
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Combat stress de-escalation with equal 4-4-4-4 phase pacing and Tibetan bell acoustics.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-400">
              <span>Launch Box Breathing</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </div>
          </Link>

          <Link
            to="/tools/vocal-toning"
            className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-indigo-700/60 transition group flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Acoustic Vagal Lab
              </span>
              <h3 className="text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition">
                Vagal Humming & Bhramari Lab
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Pure in-browser synthesized 136.1Hz Om and 128Hz bone conduction tones for autonomic calm.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-400">
              <span>Launch Vagal Humming</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </div>
          </Link>
        </div>

        {/* Native App CTA */}
        <AppStoreCta />
      </main>
    </div>
  );
};

export default PhysiologicalSighLab;

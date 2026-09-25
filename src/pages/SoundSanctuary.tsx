import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  Flame,
  CloudRain,
  Radio,
  RotateCcw,
  Headphones,
  Sliders,
  Moon,
  Zap,
  CheckCircle2,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import { toast } from "sonner";

type SanctuaryLang = "en" | "id" | "de" | "fr" | "es";

interface TrackState {
  id: string;
  name: Record<SanctuaryLang, string>;
  icon: any;
  volume: number; // 0 - 1
  enabled: boolean;
  color: string;
}

const SoundSanctuary: React.FC = () => {
  const [lang, setLang] = useState<SanctuaryLang>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(25);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(25 * 60);
  const [activePreset, setActivePreset] = useState<string>("adhd");

  // Track settings
  const [tracks, setTracks] = useState<TrackState[]>([
    {
      id: "brown_noise",
      name: {
        en: "Brown Noise (ADHD Focus)",
        id: "Brown Noise (Fokus ADHD)",
        de: "Brown Noise (ADHS-Fokus)",
        fr: "Bruit Brun (Focus TDAH)",
        es: "Ruido Marrón (Foco TDAH)",
      },
      icon: Radio,
      volume: 0.75,
      enabled: true,
      color: "from-amber-600 to-amber-800",
    },
    {
      id: "rain",
      name: {
        en: "Gentle Rainfall",
        id: "Hujan Lembut",
        de: "Sanfter Regen",
        fr: "Pluie Douce",
        es: "Lluvia Suave",
      },
      icon: CloudRain,
      volume: 0.4,
      enabled: false,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "fireplace",
      name: {
        en: "Campfire Crackle",
        id: "Kayu Api Hangat",
        de: "Kaminfeuer Knacken",
        fr: "Feu de Bois",
        es: "Fuego de Chimenea",
      },
      icon: Flame,
      volume: 0.35,
      enabled: false,
      color: "from-orange-500 to-red-600",
    },
    {
      id: "crickets",
      name: {
        en: "Night Garden Crickets",
        id: "Jangkrik Malam Hening",
        de: "Nachtgrillen",
        fr: "Grillons Nocturnes",
        es: "Grillos Nocturnos",
      },
      icon: Moon,
      volume: 0.3,
      enabled: false,
      color: "from-emerald-500 to-teal-700",
    },
    {
      id: "solfeggio_528",
      name: {
        en: "528Hz Alpha Wave (Calm & Clarity)",
        id: "Gelombang Alpha 528Hz (Ketenangan)",
        de: "528Hz Alpha-Welle (Ruhe & Klarheit)",
        fr: "Onde Alpha 528Hz (Sérénité)",
        es: "Onda Alfa 528Hz (Calma y Claridad)",
      },
      icon: Sparkles,
      volume: 0.35,
      enabled: true,
      color: "from-purple-500 to-indigo-600",
    },
  ]);

  // Web Audio Context References
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const trackGainsRef = useRef<Record<string, GainNode>>({});
  const activeNodesRef = useRef<Record<string, { stop: () => void }>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Audio Context
  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(masterVolume, ctx.currentTime);
      master.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Sound Synthesizers (100% pure Web Audio API)
  const startBrownNoise = (ctx: AudioContext, dest: GainNode) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian walk
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Gentle low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    noise.connect(filter);
    filter.connect(dest);
    noise.start();

    return {
      stop: () => {
        try {
          noise.stop();
          noise.disconnect();
          filter.disconnect();
        } catch {}
      },
    };
  };

  const startRain = (ctx: AudioContext, dest: GainNode) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pinkish/Rain noise
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);

    noise.connect(filter);
    filter.connect(dest);
    noise.start();

    return {
      stop: () => {
        try {
          noise.stop();
          noise.disconnect();
          filter.disconnect();
        } catch {}
      },
    };
  };

  const startFireplace = (ctx: AudioContext, dest: GainNode) => {
    // Low rumble + randomized pops
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const isPop = Math.random() < 0.0015;
      data[i] = isPop ? (Math.random() * 2 - 1) * 0.8 : (Math.random() * 2 - 1) * 0.03;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    source.connect(filter);
    filter.connect(dest);
    source.start();

    return {
      stop: () => {
        try {
          source.stop();
          source.disconnect();
          filter.disconnect();
        } catch {}
      },
    };
  };

  const startCrickets = (ctx: AudioContext, dest: GainNode) => {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(4600, ctx.currentTime);

    // LFO for rhythmic chirping
    lfo.type = "sawtooth";
    lfo.frequency.setValueAtTime(4, ctx.currentTime); // 4 chirps / sec
    lfoGain.gain.setValueAtTime(120, ctx.currentTime);

    lfo.connect(osc.frequency);

    const gate = ctx.createGain();
    gate.gain.setValueAtTime(0.2, ctx.currentTime);

    osc.connect(gate);
    gate.connect(dest);

    osc.start();
    lfo.start();

    return {
      stop: () => {
        try {
          osc.stop();
          lfo.stop();
          osc.disconnect();
          lfo.disconnect();
          gate.disconnect();
        } catch {}
      },
    };
  };

  const startSolfeggio528 = (ctx: AudioContext, dest: GainNode) => {
    // Left ear 528Hz, Right ear 538Hz -> 10Hz Alpha binaural beat
    const merger = ctx.createChannelMerger(2);

    const oscL = ctx.createOscillator();
    oscL.type = "sine";
    oscL.frequency.setValueAtTime(528, ctx.currentTime);

    const oscR = ctx.createOscillator();
    oscR.type = "sine";
    oscR.frequency.setValueAtTime(538, ctx.currentTime);

    const gainL = ctx.createGain();
    gainL.gain.setValueAtTime(0.3, ctx.currentTime);

    const gainR = ctx.createGain();
    gainR.gain.setValueAtTime(0.3, ctx.currentTime);

    oscL.connect(gainL);
    oscR.connect(gainR);

    gainL.connect(merger, 0, 0); // Left channel
    gainR.connect(merger, 0, 1); // Right channel

    merger.connect(dest);

    oscL.start();
    oscR.start();

    return {
      stop: () => {
        try {
          oscL.stop();
          oscR.stop();
          oscL.disconnect();
          oscR.disconnect();
          merger.disconnect();
        } catch {}
      },
    };
  };

  // Play / Stop Soundscape Engine
  const startAllActiveTracks = () => {
    ensureAudioContext();
    const ctx = audioCtxRef.current!;
    const master = masterGainRef.current!;

    // Stop existing
    stopAllActiveTracks();

    tracks.forEach((track) => {
      if (track.enabled) {
        let gain = trackGainsRef.current[track.id];
        if (!gain) {
          gain = ctx.createGain();
          gain.connect(master);
          trackGainsRef.current[track.id] = gain;
        }
        gain.gain.setValueAtTime(track.volume, ctx.currentTime);

        let nodeHandle: { stop: () => void } | null = null;
        if (track.id === "brown_noise") nodeHandle = startBrownNoise(ctx, gain);
        else if (track.id === "rain") nodeHandle = startRain(ctx, gain);
        else if (track.id === "fireplace") nodeHandle = startFireplace(ctx, gain);
        else if (track.id === "crickets") nodeHandle = startCrickets(ctx, gain);
        else if (track.id === "solfeggio_528") nodeHandle = startSolfeggio528(ctx, gain);

        if (nodeHandle) {
          activeNodesRef.current[track.id] = nodeHandle;
        }
      }
    });

    setIsPlaying(true);
    startVisualizer();
  };

  const stopAllActiveTracks = () => {
    Object.values(activeNodesRef.current).forEach((handle) => {
      try {
        handle.stop();
      } catch {}
    });
    activeNodesRef.current = {};
    setIsPlaying(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
  };

  const toggleMasterPlay = () => {
    if (isPlaying) {
      stopAllActiveTracks();
    } else {
      startAllActiveTracks();
    }
  };

  const updateTrackVolume = (id: string, vol: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, volume: vol, enabled: vol > 0 ? true : t.enabled } : t))
    );

    if (audioCtxRef.current && trackGainsRef.current[id]) {
      trackGainsRef.current[id].gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
    }
  };

  const toggleTrack = (id: string) => {
    const updated = tracks.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t));
    setTracks(updated);

    if (isPlaying) {
      // Re-evaluate audio nodes
      const target = updated.find((t) => t.id === id);
      const ctx = audioCtxRef.current!;
      const master = masterGainRef.current!;

      if (target?.enabled) {
        let gain = trackGainsRef.current[id];
        if (!gain) {
          gain = ctx.createGain();
          gain.connect(master);
          trackGainsRef.current[id] = gain;
        }
        gain.gain.setValueAtTime(target.volume, ctx.currentTime);

        let nodeHandle: { stop: () => void } | null = null;
        if (id === "brown_noise") nodeHandle = startBrownNoise(ctx, gain);
        else if (id === "rain") nodeHandle = startRain(ctx, gain);
        else if (id === "fireplace") nodeHandle = startFireplace(ctx, gain);
        else if (id === "crickets") nodeHandle = startCrickets(ctx, gain);
        else if (id === "solfeggio_528") nodeHandle = startSolfeggio528(ctx, gain);

        if (nodeHandle) activeNodesRef.current[id] = nodeHandle;
      } else {
        if (activeNodesRef.current[id]) {
          activeNodesRef.current[id].stop();
          delete activeNodesRef.current[id];
        }
      }
    }
  };

  // Presets
  const applyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    let newTracks = [...tracks];

    if (presetKey === "adhd") {
      newTracks = newTracks.map((t) => ({
        ...t,
        enabled: t.id === "brown_noise" || t.id === "solfeggio_528",
        volume: t.id === "brown_noise" ? 0.85 : t.id === "solfeggio_528" ? 0.4 : 0.3,
      }));
    } else if (presetKey === "cabin") {
      newTracks = newTracks.map((t) => ({
        ...t,
        enabled: t.id === "rain" || t.id === "fireplace",
        volume: t.id === "rain" ? 0.75 : t.id === "fireplace" ? 0.5 : 0.3,
      }));
    } else if (presetKey === "deep_calm") {
      newTracks = newTracks.map((t) => ({
        ...t,
        enabled: t.id === "solfeggio_528" || t.id === "brown_noise" || t.id === "rain",
        volume: t.id === "solfeggio_528" ? 0.6 : t.id === "brown_noise" ? 0.4 : 0.3,
      }));
    } else if (presetKey === "night_sleep") {
      newTracks = newTracks.map((t) => ({
        ...t,
        enabled: t.id === "crickets" || t.id === "rain",
        volume: t.id === "crickets" ? 0.6 : t.id === "rain" ? 0.4 : 0.3,
      }));
    }

    setTracks(newTracks);
    if (isPlaying) {
      setTimeout(() => startAllActiveTracks(), 50);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || secondsRemaining === null) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          stopAllActiveTracks();
          playGentleBell();
          toast.success(lang === "id" ? "Sesi fokus selesai! Istirahat sejenak." : "Focus session complete! Take a mindful breath.");
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, secondsRemaining]);

  const playGentleBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 chime
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.0);
    } catch {}
  };

  // Ambient Canvas Visualizer
  const startVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw subtle orbital glowing rings
      for (let r = 40; r <= 140; r += 25) {
        ctx.beginPath();
        ctx.arc(
          centerX + Math.sin(angle * 0.5 + r) * 2,
          centerY + Math.cos(angle * 0.5 + r) * 2,
          r + Math.sin(angle + r) * 3,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(245, 158, 11, ${0.12 - r * 0.0007})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      angle += 0.02;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number | null) => {
    if (secs === null) return "∞";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <SEOHead
        title={
          lang === "id"
            ? "Sound Sanctuary: Brown Noise, Rain & Gelombang 528Hz untuk ADHD & Fokus"
            : lang === "de"
            ? "Sound Sanctuary: Brown Noise, Regen & 528Hz Binaural Beats für Fokus"
            : lang === "fr"
            ? "Sanctuaire Sonore : Bruit Brun, Pluie & Ondes 528Hz pour Concentration"
            : lang === "es"
            ? "Santuario Sonoro: Ruido Marrón, Lluvia y Ondas 528Hz para Enfoque TDAH"
            : "Ju Sound Sanctuary: Brown Noise, Rain & 528Hz Binaural Beats for Focus"
        }
        description={
          lang === "id"
            ? "Generator suara ambient sintetis Web Audio API gratis tanpa unduhan MP3. Brown noise murni untuk ADHD, hujan lembut, dan gelombang alpha 528Hz."
            : lang === "de"
            ? "Kostenloser Web-Audio-Generator für Brown Noise, Regengeräusche und 528Hz Alpha-Wellen. Ideal für Deep Work und ADHS-Fokus."
            : lang === "fr"
            ? "Générateur audio en direct pour la concentration TDAH, le travail profond et le sommeil. Bruit brun pur et sons de pluie."
            : lang === "es"
            ? "Generador de sonido ambiental para concentración profunda y TDAH. Ruido marrón puro, lluvia relajante y frecuencias 528Hz."
            : "Free in-browser ambient soundscape and 528Hz Solfeggio generator. Pure synthesized brown noise for ADHD focus, rain, and deep work."
        }
        canonicalUrl="https://nuju.app/soundscapes"
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
              {(["en", "id", "de", "fr", "es"] as SanctuaryLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-amber-500 text-slate-950 shadow-sm"
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

      {/* Top AdSense Banner */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-4">
        <AdSenseBanner slot="soundscapes-top" format="horizontal" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Headphones className="w-3.5 h-3.5" />
            <span>Pure Synthesized Audio • Zero Latency • Infinite Play</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {lang === "id"
              ? "Ju's Sound Sanctuary: Audio Fokus & Brown Noise"
              : lang === "de"
              ? "Ju's Sound Sanctuary: Fokus & Brown Noise"
              : lang === "fr"
              ? "Sanctuaire Sonore : Focus & Bruit Brun"
              : lang === "es"
              ? "Santuario Sonoro: Ruido Marrón y Foco"
              : "Ju's Sound Sanctuary: ADHD Focus & Binaural Beats"}
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            {lang === "id"
              ? "Kombinasikan gelombang frekuensi Brown Noise, Hujan Lembut, dan 528Hz Alpha Waves untuk menenangkan pikiran dan memperdalam fokus kerja Anda."
              : lang === "de"
              ? "Mischen Sie Brown Noise, Regen und 528Hz Alpha-Wellen für störungsfreie Konzentration und tiefen Arbeitsfokus."
              : lang === "fr"
              ? "Mixez bruit brun pur, pluie apaisante et battements binauraux 528Hz pour éliminer les distractions et canaliser votre esprit."
              : lang === "es"
              ? "Combine ruido marrón puro, lluvia serena y ondas 528Hz para silenciar el ruido mental y entrar en foco profundo."
              : "Curate your mental sanctuary with pure synthesized Brown Noise, rain, and 528Hz Solfeggio Alpha waves to eliminate digital distraction."}
          </p>
        </div>

        {/* Master Control Board */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md mb-8">
          {/* Canvas Pulse Visualizer in Center */}
          <div className="flex flex-col items-center justify-center mb-8 relative">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="absolute pointer-events-none opacity-80"
            />

            {/* Master Play Button */}
            <button
              onClick={toggleMasterPlay}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                isPlaying
                  ? "bg-amber-500 text-slate-950 shadow-amber-500/30 scale-105"
                  : "bg-slate-800 border-2 border-amber-500/60 text-amber-400 hover:bg-slate-750 hover:scale-105"
              }`}
            >
              {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-1" />}
            </button>

            {/* Timer & Status Label */}
            <div className="mt-4 text-center z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
                {isPlaying
                  ? lang === "id"
                    ? "Sedang Memutar"
                    : "Soundscape Active"
                  : lang === "id"
                  ? "Tekan untuk Memulai"
                  : "Press to Immerse"}
              </span>
              <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                {formatTime(secondsRemaining)}
              </div>
            </div>
          </div>

          {/* Quick Preset Badges */}
          <div className="border-t border-slate-800/80 pt-6 mb-6">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400">
              <span>{lang === "id" ? "Preset Suasana:" : "Quick Presets:"}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "adhd", label: "ADHD Deep Work", desc: "Brown Noise + 528Hz" },
                { id: "cabin", label: "Rainy Cabin", desc: "Rain + Fireplace" },
                { id: "deep_calm", label: "Alpha Calm", desc: "528Hz + Rain" },
                { id: "night_sleep", label: "Forest Night", desc: "Crickets + Rain" },
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activePreset === preset.id
                      ? "bg-amber-500/20 border-amber-500/80 text-amber-200 shadow-sm shadow-amber-500/10"
                      : "bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="text-xs font-bold">{preset.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timer Selector */}
          <div className="border-t border-slate-800/80 pt-6 mb-6">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === "id" ? "Pewaktu Sesi Fokus:" : "Session Focus Timer:"}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[15, 25, 45, 60, null].map((mins, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTimerMinutes(mins);
                    setSecondsRemaining(mins ? mins * 60 : null);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    timerMinutes === mins
                      ? "bg-amber-500 text-slate-950 border-amber-500"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750 hover:text-white"
                  }`}
                >
                  {mins ? `${mins} min` : "∞ Infinite"}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Sound Mixer */}
          <div className="border-t border-slate-800/80 pt-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>{lang === "id" ? "Mixer Instrumen Mandiri:" : "Instrument Sound Mixer:"}</span>
            </h3>

            <div className="space-y-4">
              {tracks.map((track) => {
                const IconComponent = track.icon;
                return (
                  <div
                    key={track.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      track.enabled
                        ? "bg-slate-800/60 border-slate-700"
                        : "bg-slate-900/40 border-slate-800/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() => toggleTrack(track.id)}
                        className="flex items-center gap-3 text-left group"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-gradient-to-br ${
                            track.color
                          } text-white shadow-md`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs md:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {track.name[lang]}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {track.enabled
                              ? `${Math.round(track.volume * 100)}% Volume`
                              : lang === "id"
                              ? "Nonaktif (Klik untuk menyalakan)"
                              : "Muted (Click to enable)"}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => toggleTrack(track.id)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          track.enabled
                            ? "bg-amber-500/10 border-amber-500/40 text-amber-300"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                      >
                        {track.enabled ? "Active" : "Off"}
                      </button>
                    </div>

                    {/* Volume Slider */}
                    {track.enabled && (
                      <div className="flex items-center gap-3 mt-3">
                        <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={track.volume}
                          onChange={(e) => updateTrackVolume(track.id, parseFloat(e.target.value))}
                          className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                        />
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AdSense Mid Banner */}
        <div className="my-8">
          <AdSenseBanner slot="soundscapes-mid" format="horizontal" />
        </div>

        {/* Science & Explanation Section */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>
              {lang === "id"
                ? "Mengapa Brown Noise Efektif untuk ADHD & Fokus Mendalam?"
                : lang === "de"
                ? "Warum Brown Noise bei ADHS und Fokus funktioniert"
                : lang === "fr"
                ? "Pourquoi le Bruit Brun est efficace contre le TDAH et la dispersion"
                : lang === "es"
                ? "¿Por qué el Ruido Marrón potencia la concentración en el TDAH?"
                : "The Neuroscience of Brown Noise & 528Hz Binaural Beats"}
            </span>
          </h3>

          <div className="space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed">
            <p>
              {lang === "id"
                ? "Brown Noise (Brownian Noise) memiliki penurunan spektral 6 dB per oktaf, menghasilkan frekuensi rendah yang hangat mirip deru air terjun atau angin kencang. Berbeda dengan White Noise yang bernada tinggi dan tajam, Brown Noise memberikan 'selimut akustik' yang menutupi suara mendadak di sekitar tanpa memicu kelelahan sensorik."
                : "Brown noise (Brownian noise) decreases in power by 6 dB per octave, producing a deep, warm low-frequency rumble similar to heavy rainfall or a distant waterfall. Unlike harsh white noise, it masks intrusive environmental sounds and smooths cortical hyperactivity without sensory fatigue."}
            </p>
            <p>
              {lang === "id"
                ? "Untuk individu dengan neurodivergensi (ADHD) atau kelelahan dopamin, Brown Noise memicu fenomena 'Stochastic Resonance' — sedikit derau latar yang teratur membantu neuron otak mentransmisikan sinyal fokus dengan lebih jernih."
                : "For individuals with ADHD or executive fatigue, brown noise provides 'stochastic resonance' — optimal background auditory noise that paradoxically helps neural circuits synchronize and maintain executive attention."}
            </p>
          </div>
        </div>

        {/* Cross Promotion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/quiz/adhd-screener"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
          >
            <Zap className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Adult ADHD Screener</h4>
            <p className="text-xs text-slate-400">
              WHO ASRS v1.1 evaluation of inattention and dopamine fatigue.
            </p>
          </Link>

          <Link
            to="/game/zen-pop"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
          >
            <Sparkles className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Zen Bubble Game</h4>
            <p className="text-xs text-slate-400">
              Pop bubble worries and restore inner calm with crystal chimes.
            </p>
          </Link>

          <Link
            to="/quiz/mental-health-test"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group"
          >
            <Headphones className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">DASS-21 Checkup</h4>
            <p className="text-xs text-slate-400">
              Comprehensive 21-item depression, anxiety, and stress scale.
            </p>
          </Link>
        </div>

        {/* Ju Mobile App CTA */}
        <AppStoreCta />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Mindful focus & sound therapy.</p>
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

export default SoundSanctuary;

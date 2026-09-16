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
  Shield,
  Eye,
  Activity,
  Sliders,
  Timer,
  ChevronRight,
  Info,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";

export type BilateralLang = "en" | "id" | "de" | "fr" | "es";

interface ColorTheme {
  name: string;
  primary: string;
  glow: string;
  label: Record<BilateralLang, string>;
}

const THEMES: ColorTheme[] = [
  {
    name: "cyan",
    primary: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.4)",
    label: { en: "Oceanic Cyan", id: "Sian Samudra", de: "Ozeanblau", fr: "Cyan Océan", es: "Cian Oceánico" },
  },
  {
    name: "amethyst",
    primary: "#A855F7",
    glow: "rgba(168, 85, 247, 0.4)",
    label: { en: "Mystic Amethyst", id: "Ametis Mistik", de: "Amethyst", fr: "Améthyste", es: "Amatista Mística" },
  },
  {
    name: "rose",
    primary: "#F43F5E",
    glow: "rgba(244, 63, 94, 0.4)",
    label: { en: "Warm Rose", id: "Mawar Hangat", de: "Warmes Rosa", fr: "Rose Chaud", es: "Rosa Cálido" },
  },
  {
    name: "emerald",
    primary: "#10B981",
    glow: "rgba(16, 185, 129, 0.4)",
    label: { en: "Forest Emerald", id: "Zamrud Hutan", de: "Smaragdgrün", fr: "Émeraude", es: "Esmeralda Bosque" },
  },
];

const BilateralStimulationLab: React.FC = () => {
  const [lang, setLang] = useState<BilateralLang>("en");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedHz, setSpeedHz] = useState<number>(1.0); // cycles per second (back and forth)
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(THEMES[0]);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [sessionSeconds, setSessionSeconds] = useState<number>(120); // 2 minutes default
  const [remainingSeconds, setRemainingSeconds] = useState<number>(120);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastPanDirectionRef = useRef<-1 | 1>(-1);

  // Initialize Web Audio
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize gentle bilateral tone ping
  const playStereoPing = (pan: -1 | 1) => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Check StereoPannerNode support
      if (typeof ctx.createStereoPanner === "function") {
        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(pan, ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }

      // 432Hz harmonic soothing pitch
      const freq = pan === -1 ? 432 : 486;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Envelope
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  };

  // Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();
    let currentXPercent = 0.5;

    const render = (now: number) => {
      // Resize dynamically
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw subtle horizontal guide track
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, height / 2);
      ctx.lineTo(width - 40, height / 2);
      ctx.stroke();

      // Ping-pong oscillator calculation using cosine wave
      if (isPlaying) {
        const elapsedSec = (now - startTime) / 1000;
        // Cosine wave oscillates between -1 and +1
        const wave = Math.cos(2 * Math.PI * (speedHz / 2) * elapsedSec);
        // Map wave to 0 .. 1 range
        currentXPercent = (wave + 1) / 2;

        // Detect edge hit to trigger bilateral audio ping
        if (currentXPercent <= 0.04 && lastPanDirectionRef.current !== -1) {
          playStereoPing(-1); // Left ear
          lastPanDirectionRef.current = -1;
        } else if (currentXPercent >= 0.96 && lastPanDirectionRef.current !== 1) {
          playStereoPing(1); // Right ear
          lastPanDirectionRef.current = 1;
        }
      }

      const orbRadius = Math.min(24, Math.max(16, height * 0.15));
      const minX = 40 + orbRadius;
      const maxX = width - 40 - orbRadius;
      const orbX = minX + currentXPercent * (maxX - minX);
      const orbY = height / 2;

      // Outer Glow
      const glowGrad = ctx.createRadialGradient(orbX, orbY, orbRadius * 0.2, orbX, orbY, orbRadius * 3.5);
      glowGrad.addColorStop(0, selectedTheme.glow);
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Main Core Orb
      ctx.fillStyle = selectedTheme.primary;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner Hotspot
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbRadius * 0.35, 0, Math.PI * 2);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, speedHz, selectedTheme, audioEnabled]);

  // Session countdown timer
  useEffect(() => {
    if (!isPlaying) return;
    if (sessionSeconds === 0) return; // infinite

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          return sessionSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, sessionSeconds]);

  const togglePlay = () => {
    if (!isPlaying) {
      getAudioContext();
    }
    setIsPlaying(!isPlaying);
  };

  const handleResetSession = () => {
    setIsPlaying(false);
    setRemainingSeconds(sessionSeconds);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title={
          lang === "id"
            ? "EMDR Stimulasi Bilateral Online: Alat Penenang Amygdala & Trauma"
            : lang === "de"
            ? "Kostenlose EMDR Bilaterale Stimulation Online: Angst & Stress abbauen"
            : lang === "fr"
            ? "Stimulation Bilatérale EMDR Gratuite en Ligne : Outil de Désensibilisation"
            : lang === "es"
            ? "Estimulación Bilateral EMDR Online Gratis: Alivio de Estrés y Ansiedad"
            : "Free Online EMDR Bilateral Stimulation Tool: Dual-Attention Anxiety De-Escalator"
        }
        description={
          lang === "id"
            ? "Latihan stimulasi bilateral audio-visual terstandar EMDR untuk menenangkan sistem saraf, meredakan lonjakan cemas, dan memproses emosi traumatik secara mandiri."
            : "Evidence-based dual-attention visual and auditory bilateral stimulation tool used in EMDR therapy to rapidly calm amygdala hyper-arousal and distress."
        }
        canonical="https://nuju.app/tools/bilateral"
        language={lang}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Online EMDR Bilateral Stimulation Tool",
            applicationCategory: "HealthApplication",
            operatingSystem: "All",
            description:
              "Interactive dual-attention audio-visual bilateral stimulation tool based on EMDR therapy for stress desensitization.",
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
                name: "What is bilateral stimulation in EMDR therapy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bilateral stimulation (BLS) is the rhythmic alternation of sensory stimuli across the left and right hemispheres of the brain (via horizontal eye movements, alternating auditory tones, or tactile taps). It facilitates memory reconsolidation and down-regulates the sympathetic nervous system.",
                },
              },
              {
                "@type": "Question",
                name: "How should I use this bilateral stimulation tool?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Put on stereo headphones for the alternating audio pings. Keep your head still and track the glowing light orb smoothly with your eyes as it oscillates horizontally. Breathe steadily and let emotional tension release.",
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
              {(["en", "id", "de", "fr", "es"] as BilateralLang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full uppercase font-bold text-[10px] md:text-xs transition-all ${
                    lang === l
                      ? "bg-cyan-600 text-white shadow-sm"
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

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-10 flex flex-col items-center">
        {/* AdSense Top Banner */}
        <div className="w-full mb-6">
          <AdSenseBanner slot="bilateral-top" format="horizontal" />
        </div>

        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>
              {lang === "id"
                ? "Stimulasi Bilateral Audio-Visual (EMDR)"
                : "Dual-Attention Bilateral Stimulation"}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            {lang === "id" ? "EMDR Bilateral Stimulation Lab" : "EMDR Bilateral Stimulation Lab"}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
            {lang === "id"
              ? "Gunakan headphone untuk efek audio stereo kiri-kanan. Ikuti bola cahaya yang bergerak hanya dengan matamu tanpa menggerakkan kepala."
              : "Put on stereo headphones. Keep your head still and follow the moving orb with only your eyes to rapidly soothe autonomic hyper-arousal."}
          </p>
        </div>

        {/* Canvas Screen */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-sm mb-6">
          <div className="relative w-full h-[220px] md:h-[300px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform hover:scale-105 active:scale-95 mb-3"
                >
                  <Play className="w-7 h-7 ml-1" />
                </button>
                <p className="text-xs text-slate-300 font-medium">
                  {lang === "id" ? "Klik untuk memulai sesi" : "Click to start session"}
                </p>
              </div>
            )}

            {/* Eye Tracking Instruction Overlay */}
            {isPlaying && (
              <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400">
                <Eye className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>{lang === "id" ? "Fokus pada bola cahaya" : "Track orb with eyes only"}</span>
              </div>
            )}

            {/* Timer Badge */}
            {isPlaying && sessionSeconds > 0 && (
              <div className="absolute top-3 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-300">
                <Timer className="w-3 h-3" />
                <span>{formatTime(remainingSeconds)}</span>
              </div>
            )}
          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isPlaying
                    ? "bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                <span>{isPlaying ? "Pause" : "Start"}</span>
              </button>

              <button
                onClick={handleResetSession}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition"
                title="Reset session"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
                  audioEnabled
                    ? "bg-slate-800/80 border-slate-700 text-cyan-300"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{audioEnabled ? "Stereo Audio On" : "Muted"}</span>
              </button>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-3 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400">
                {lang === "id" ? "Kecepatan:" : "Speed:"} {speedHz.toFixed(1)} Hz
              </span>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={speedHz}
                onChange={(e) => setSpeedHz(parseFloat(e.target.value))}
                className="w-24 accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Customization Settings */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Color Palettes */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === "id" ? "Warna Bola Cahaya:" : "Orb Color Theme:"}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
                    selectedTheme.name === theme.name
                      ? "bg-slate-800 border-cyan-500/80 text-white"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{theme.label[lang]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Session Duration */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === "id" ? "Durasi Sesi:" : "Session Length:"}</span>
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {[
                { sec: 60, label: "1 min" },
                { sec: 120, label: "2 min" },
                { sec: 300, label: "5 min" },
                { sec: 0, label: "∞ Nonstop" },
              ].map((item) => (
                <button
                  key={item.sec}
                  onClick={() => {
                    setSessionSeconds(item.sec);
                    setRemainingSeconds(item.sec);
                  }}
                  className={`py-2 px-1 rounded-xl border text-xs font-medium transition text-center ${
                    sessionSeconds === item.sec
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Science Behind Bilateral Stimulation */}
        <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-xs md:text-sm text-slate-300 leading-relaxed mb-6 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>
              {lang === "id"
                ? "Sains di Balik Terapi Stimulasi Bilateral (EMDR):"
                : "The Science of EMDR Bilateral Dual-Attention:"}
            </span>
          </div>
          <p>
            {lang === "id"
              ? "Eye Movement Desensitization and Reprocessing (EMDR) menggunakan stimulasi sensorik bolak-balik antara otak kiri dan kanan. Gerakan mata horizontal ini meniru fase tidur REM alami, secara efektif menurunkan aktivitas hiperaktif amygdala (pusat rasa takut), serta membantu otak mencerna dan meredakan trauma atau kecemasan yang macet."
              : "Eye Movement Desensitization and Reprocessing (EMDR) employs rhythmic alternating sensory input across both brain hemispheres. This horizontal eye movement mimics natural REM sleep, down-regulating amygdala reactivity and allowing the prefrontal cortex to process emotional overwhelm without entering a fight-or-flight panic."}
          </p>
        </div>

        {/* AdSense Mid Banner */}
        <div className="w-full mb-6">
          <AdSenseBanner slot="bilateral-mid" format="horizontal" />
        </div>

        {/* Cross Promo to Breathwork & Sound Sanctuary */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/tools/breathwork"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group flex items-center justify-between"
          >
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Stanford Physiological Sigh</h4>
              <p className="text-xs text-slate-400">
                Combine with 2-breath somatic resets for instant relief.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/soundscapes"
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all group flex items-center justify-between"
          >
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Ju Sound Sanctuary</h4>
              <p className="text-xs text-slate-400">
                Brown noise and 528Hz Alpha wave audio synthesis.
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="w-full mt-6">
          <AppStoreCta />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ju Journal. Somatic grounding & emotional health.</p>
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

export default BilateralStimulationLab;

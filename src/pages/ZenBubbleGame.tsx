import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Heart,
  ShieldCheck,
  Flame,
  Activity,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AdSenseBanner from "@/components/AdSenseBanner";
import AppStoreCta from "@/components/AppStoreCta";
import juMain from "@/assets/ju-main.webp";
import juGreat from "@/assets/ju-great.webp";
import juGood from "@/assets/ju-good.webp";
import { toast } from "sonner";

interface Bubble {
  id: number;
  text: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
  color: string;
  speed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

const STRESSOR_WORDS = [
  "Overthinking",
  "Imposter Syndrome",
  "Perfectionism",
  "People Pleasing",
  "Fear of Failure",
  "Burnout",
  "Comparison",
  "Sleep Anxiety",
  "Social Dread",
  "Self-Criticism",
  "Deadline Panic",
  "Catastrophizing",
];

const AFFIRMATIONS = [
  "Breathe. You are safe.",
  "That thought is not a fact.",
  "Releasing internal tension.",
  "You are doing enough.",
  "Peace is available right now.",
  "One moment at a time.",
  "Softening into the present.",
];

export const ZenBubbleGame: React.FC = () => {
  const navigate = useNavigate();

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"bubbles" | "shatter">("bubbles");
  const [customWorry, setCustomWorry] = useState<string>("");
  const [customWorryBubble, setCustomWorryBubble] = useState<{ text: string; hp: number } | null>(null);
  const [lastAffirmation, setLastAffirmation] = useState<string>("");

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nextBubbleId = useRef<number>(1);
  const nextParticleId = useRef<number>(1);

  // Initialize Web Audio API synthesizer for crystal chimes
  const playChime = useCallback((frequency = 528) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      // Gentle harmonic overtone
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.95);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled]);

  const playShatterSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      // Cord of 3 uplifting frequencies (528, 660, 792 Hz)
      [528, 660, 792, 1056].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.05);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2 + i * 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + 1.3 + i * 0.05);
      });
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  // Initial bubble spawn
  useEffect(() => {
    const initial: Bubble[] = [];
    const colors = [
      "from-rose-400/40 to-pink-500/20 border-rose-300",
      "from-amber-400/40 to-orange-500/20 border-amber-300",
      "from-teal-400/40 to-emerald-500/20 border-teal-300",
      "from-blue-400/40 to-indigo-500/20 border-blue-300",
      "from-purple-400/40 to-violet-500/20 border-purple-300",
    ];

    for (let i = 0; i < 6; i++) {
      initial.push({
        id: nextBubbleId.current++,
        text: STRESSOR_WORDS[Math.floor(Math.random() * STRESSOR_WORDS.length)],
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
        size: 90 + Math.random() * 30,
        color: colors[i % colors.length],
        speed: 0.2 + Math.random() * 0.3,
      });
    }
    setBubbles(initial);
  }, []);

  // Float animation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev.map((b) => {
          let newY = b.y - b.speed;
          if (newY < -15) {
            newY = 105;
            return {
              ...b,
              y: newY,
              x: 10 + Math.random() * 80,
              text: STRESSOR_WORDS[Math.floor(Math.random() * STRESSOR_WORDS.length)],
            };
          }
          return { ...b, y: newY };
        })
      );

      // Particle physics decay
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.06,
          }))
          .filter((p) => p.life > 0)
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const spawnParticlesAt = (x: number, y: number, color = "#F59E0B") => {
    const count = 12;
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 4;
      newParticles.push({
        id: nextParticleId.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 4,
        color,
        life: 1,
      });
    }
    setParticles((prev) => [...prev.slice(-40), ...newParticles]);
  };

  const handlePopBubble = (bubble: Bubble, e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const clickX = e.clientX - (rect?.left || 0);
    const clickY = e.clientY - (rect?.top || 0);

    // Play tuned chime (pentatonic scale notes: 528, 594, 660, 792, 880)
    const notes = [528, 594, 660, 792, 880];
    const note = notes[poppedCount % notes.length];
    playChime(note);

    spawnParticlesAt(clickX, clickY, "#FB7185");

    if (navigator.vibrate) {
      try {
        navigator.vibrate(20);
      } catch {
        // ignore
      }
    }

    setPoppedCount((prev) => prev + 1);
    setLastAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);

    // Respawn bubble at bottom
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? {
              ...b,
              y: 110,
              x: 10 + Math.random() * 80,
              text: STRESSOR_WORDS[Math.floor(Math.random() * STRESSOR_WORDS.length)],
            }
          : b
      )
    );
  };

  const handleCreateCustomWorry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWorry.trim()) return;
    setCustomWorryBubble({
      text: customWorry.trim(),
      hp: 5,
    });
    setCustomWorry("");
    playChime(440);
  };

  const handleStrikeCustomWorry = (e: React.MouseEvent) => {
    if (!customWorryBubble) return;

    const rect = containerRef.current?.getBoundingClientRect();
    const clickX = e.clientX - (rect?.left || 0);
    const clickY = e.clientY - (rect?.top || 0);

    const newHp = customWorryBubble.hp - 1;

    if (newHp <= 0) {
      // Explosion!
      playShatterSound();
      spawnParticlesAt(clickX, clickY, "#E11D48");
      setCustomWorryBubble(null);
      setPoppedCount((prev) => prev + 5);
      setLastAffirmation("Worry Shattered! That thought has no power over you.");
      toast.success("Beban pikiran berhasil dihancurkan! Bernapaslah dengan lega.");
    } else {
      playChime(440 + (5 - newHp) * 80);
      spawnParticlesAt(clickX, clickY, "#94A3B8");
      setCustomWorryBubble({ ...customWorryBubble, hp: newHp });
    }
  };

  const handleJournalClarity = () => {
    try {
      sessionStorage.setItem(
        "nuju-prefilled-prompt",
        "I just released tension in the Zen Bubble game. What feels lighter right now, and what gentle intention will I carry forward?"
      );
    } catch {
      // ignore
    }
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-indigo-200">
      <SEOHead
        title="Zen Bubble Popper | Interactive Stress & Overthinking Release Game"
        description="Release mental tension with Ju's Zen Bubble Popper. Pop intrusive thoughts and shatter personal worries with calming crystal chimes and therapeutic cognitive defusion."
        canonical="https://nuju.app/game/zen-pop"
        language="en"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/quiz"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quizzes & Tools</span>
          </Link>

          <div className="flex items-center gap-2">
            <img src={juMain} alt="Ju" className="h-7 w-7 rounded-full object-cover shadow-xs" />
            <span className="font-bold text-sm text-neutral-900">
              ju<span className="text-indigo-600">.zen</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="rounded-full p-2 text-neutral-600 hover:bg-neutral-200/60 transition shadow-2xs"
              title={soundEnabled ? "Mute audio" : "Enable sound"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <Link
              to="/app"
              className="rounded-full bg-neutral-900 px-3.5 py-1 text-xs font-semibold text-white hover:bg-neutral-800 transition shadow-xs"
            >
              Open App
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Game Title & Mode Switcher */}
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-900 mb-2 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>ACT Cognitive Defusion Therapy</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Zen Bubble Popper 🫧
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            Pop floating cognitive stressors or type your personal worry to shatter it into starlight.
          </p>

          <div className="mt-4 inline-flex rounded-full bg-neutral-200/80 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("bubbles")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeTab === "bubbles" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
              }`}
            >
              Pop Stressors ({poppedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("shatter")}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeTab === "shatter" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-600"
              }`}
            >
              Shatter Your Worry
            </button>
          </div>
        </div>

        {/* Top AdSense Slot */}
        <div className="mb-4">
          <AdSenseBanner slot="game-zen-top" format="horizontal" />
        </div>

        {/* Game Canvas Container */}
        <div
          ref={containerRef}
          className="relative h-[480px] w-full overflow-hidden rounded-3xl border-2 border-neutral-200/80 bg-gradient-to-b from-sky-50/50 via-white to-amber-50/40 p-4 shadow-inner select-none cursor-pointer"
        >
          {/* Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: p.life,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Mode 1: Floating Stress Bubbles */}
          {activeTab === "bubbles" &&
            bubbles.map((b) => (
              <div
                key={b.id}
                onClick={(e) => handlePopBubble(b, e)}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute rounded-full border bg-gradient-to-br backdrop-blur-xs flex items-center justify-center p-2 text-center text-xs font-bold text-neutral-800 shadow-sm transition-transform active:scale-90 hover:scale-105 ${b.color}`}
              >
                <span className="leading-tight drop-shadow-xs select-none">{b.text}</span>
              </div>
            ))}

          {/* Mode 2: Shatter Custom Worry */}
          {activeTab === "shatter" && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              {!customWorryBubble ? (
                <form onSubmit={handleCreateCustomWorry} className="max-w-md w-full space-y-3 z-10">
                  <div className="text-sm font-semibold text-neutral-700">
                    What intrusive worry is cycling in your head?
                  </div>
                  <input
                    type="text"
                    value={customWorry}
                    onChange={(e) => setCustomWorry(e.target.value)}
                    placeholder="e.g. Afraid I will fail my upcoming review..."
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none shadow-xs"
                    maxLength={80}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-neutral-900 px-5 py-3 text-xs font-bold text-white hover:bg-neutral-800 transition shadow-xs"
                  >
                    Manifest into Thought Bubble →
                  </button>
                </form>
              ) : (
                <div
                  onClick={handleStrikeCustomWorry}
                  className="relative h-48 w-48 rounded-full border-4 border-rose-400 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white flex flex-col items-center justify-center p-4 shadow-xl active:scale-95 transition-transform animate-pulse"
                >
                  <span className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">
                    Tap {customWorryBubble.hp}x to Shatter
                  </span>
                  <span className="text-sm font-semibold leading-snug line-clamp-3">
                    "{customWorryBubble.text}"
                  </span>
                  <span className="mt-2 text-lg">🔨</span>
                </div>
              )}
            </div>
          )}

          {/* Floating Affirmation Banner */}
          {lastAffirmation && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-md border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
              ✨ {lastAffirmation}
            </div>
          )}
        </div>

        {/* Calm Scorecard & Journal CTA */}
        <div className="mt-6 rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img src={juGood} alt="Ju happy" className="h-16 w-16 rounded-full object-cover shadow-xs" />
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Mindful Release Counter
              </div>
              <div className="text-2xl font-black text-neutral-900">
                {poppedCount} Stressors Dissolved
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Notice the quiet space left behind in your chest.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleJournalClarity}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-neutral-800 transition shadow-xs"
          >
            <BookOpen className="h-4 w-4" />
            <span>Journal Your Clarity in Nuju</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom AdSense */}
        <div className="my-6">
          <AdSenseBanner slot="game-zen-bottom" format="auto" />
        </div>

        <AppStoreCta />
      </main>
    </div>
  );
};

export default ZenBubbleGame;

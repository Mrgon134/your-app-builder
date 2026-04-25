import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

type BreathingPattern = {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfter: number;
  color: string;
};

const PATTERNS: BreathingPattern[] = [
  {
    name: "Box Breathing",
    description: "4-4-4-4 · Used by Navy SEALs for calm focus",
    inhale: 4, hold: 4, exhale: 4, holdAfter: 4,
    color: "rgb(99,102,241)",
  },
  {
    name: "4-7-8 Relaxing",
    description: "Deep relaxation · Best before sleep",
    inhale: 4, hold: 7, exhale: 8, holdAfter: 0,
    color: "rgb(129,140,248)",
  },
  {
    name: "Calming Breath",
    description: "4-2-6 · Quick anxiety relief",
    inhale: 4, hold: 2, exhale: 6, holdAfter: 0,
    color: "rgb(20,184,166)",
  },
];

const DURATIONS = [
  { label: "1 min", seconds: 60 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
];

type Phase = "inhale" | "hold" | "exhale" | "holdAfter";

const BreathingExercise: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [phaseTime, setPhaseTime] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [moodBefore, setMoodBefore] = useState<number | null>(null);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pattern = PATTERNS[selectedPattern];
  const duration = DURATIONS[selectedDuration].seconds;

  const phaseSeconds: Record<Phase, number> = useMemo(() => ({
    inhale: pattern.inhale,
    hold: pattern.hold,
    exhale: pattern.exhale,
    holdAfter: pattern.holdAfter,
  }), [pattern]);

  const phaseLabels: Record<Phase, string> = {
    inhale: "Breathe in",
    hold: "Hold",
    exhale: "Breathe out",
    holdAfter: "Hold",
  };

  const phaseOrder: Phase[] = useMemo(() => (
    pattern.holdAfter > 0
      ? ["inhale", "hold", "exhale", "holdAfter"]
      : ["inhale", "hold", "exhale"]
  ), [pattern]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setPhaseTime((pt) => {
        const currentPhaseIdx = phaseOrder.indexOf(phase);
        const currentPhaseDuration = phaseSeconds[phase];

        if (pt + 1 >= currentPhaseDuration) {
          // Move to next phase
          const nextIdx = (currentPhaseIdx + 1) % phaseOrder.length;
          if (nextIdx === 0) setCycleCount((c) => c + 1);
          setPhase(phaseOrder[nextIdx]);
          return 0;
        }
        return pt + 1;
      });

      setTotalElapsed((te) => {
        if (te + 1 >= duration) {
          setIsActive(false);
          if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
          setShowMoodPrompt(true); // Show mood after prompt
          return 0;
        }
        return te + 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, phase, duration, phaseOrder, phaseSeconds]);

  const handleStart = () => {
    if (moodBefore === null) {
      setShowMoodPrompt(true);
      return;
    }
    setIsActive(true);
    setPhase("inhale");
    setPhaseTime(0);
    setTotalElapsed(0);
    setCycleCount(0);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handlePause = () => {
    setIsActive(!isActive);
    if (navigator.vibrate) navigator.vibrate(8);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setPhaseTime(0);
    setTotalElapsed(0);
    setCycleCount(0);
  };

  // Circle animation scale based on phase
  const getCircleScale = () => {
    if (!isActive) return 1;
    const progress = phaseTime / phaseSeconds[phase];
    if (phase === "inhale") return 1 + progress * 0.5;
    if (phase === "exhale") return 1.5 - progress * 0.5;
    return phase === "hold" ? 1.5 : 1;
  };

  const getCircleOpacity = () => {
    if (!isActive) return 0.3;
    if (phase === "inhale" || phase === "hold") return 0.5;
    return 0.25;
  };

  const remainingSeconds = Math.max(0, duration - totalElapsed);
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  // Show mood impact when both before and after are set
  const moodImprovement = moodAfter && moodBefore ? moodAfter - moodBefore : null;

  return (
    <div className="space-y-6">
      {/* Mood Prompt Modal */}
      {showMoodPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card rounded-3xl p-6 w-full max-w-xs shadow-2xl border border-border/50 animate-spring-in">
            <h3 className="text-lg font-bold text-foreground mb-1 text-center">
              {moodBefore === null ? "How's your mood right now?" : "How do you feel after?"}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {moodBefore === null ? "Rate it before breathing" : "Let's see the impact"}
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((mood) => (
                <button
                  key={mood}
                  onClick={() => {
                    if (moodBefore === null) {
                      setMoodBefore(mood);
                      setShowMoodPrompt(false);
                    } else {
                      setMoodAfter(mood);
                      setShowMoodPrompt(false);
                    }
                  }}
                  className="w-10 h-10 rounded-full font-bold text-sm transition-all press-spring"
                  style={{
                    background: ["#E8878C", "#6C9BCF", "#FFB347", "#95E1D3", "#4ECDC4"][mood - 1],
                    color: "white",
                  }}
                >
                  {mood}
                </button>
              ))}
            </div>
            {moodBefore === null && (
              <button
                onClick={() => {
                  setShowMoodPrompt(false);
                  handleStart();
                }}
                className="w-full py-2 text-sm text-muted-foreground text-center"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mood Impact Display */}
      {moodImprovement !== null && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center animate-fade-in">
          <p className="text-sm font-semibold text-foreground">
            {moodImprovement > 0
              ? `✨ You improved by ${moodImprovement} point${moodImprovement !== 1 ? 's' : ''}`
              : moodImprovement < 0
                ? `Breath work in progress (${Math.abs(moodImprovement)} point adjustment)`
                : "Same vibe, different energy"}
          </p>
          {moodImprovement > 0 && (
            <p className="text-xs text-muted-foreground mt-1">Keep these patterns in mind for future calm</p>
          )}
        </div>
      )}

      {/* Pattern selector */}
      {!isActive && totalElapsed === 0 && moodBefore === null && (
        <div className="space-y-3">
          {PATTERNS.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelectedPattern(i)}
              className="w-full rounded-2xl p-4 text-left press-spring transition-all"
              style={{
                background: i === selectedPattern
                  ? `linear-gradient(135deg, ${p.color}15 0%, ${p.color}08 100%)`
                  : "hsl(var(--foreground)/0.03)",
                border: `1.5px solid ${i === selectedPattern ? `${p.color}40` : "transparent"}`,
              }}
            >
              <p className="text-[14px] font-semibold text-foreground">{p.name}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{p.description}</p>
            </button>
          ))}

          {/* Duration selector */}
          <div className="flex gap-2 mt-4">
            {DURATIONS.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDuration(i)}
                className="flex-1 py-3 rounded-xl text-[13px] font-semibold transition-all press-spring"
                style={{
                  background: i === selectedDuration ? `${pattern.color}15` : "hsl(var(--foreground)/0.04)",
                  color: i === selectedDuration ? pattern.color : "hsl(var(--muted-foreground))",
                  border: `1.5px solid ${i === selectedDuration ? `${pattern.color}40` : "transparent"}`,
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Breathing circle */}
      <div className="flex flex-col items-center py-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: getCircleScale(),
              opacity: getCircleOpacity(),
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle, ${pattern.color}30 0%, transparent 70%)`,
            }}
          />
          {/* Main circle */}
          <motion.div
            className="absolute inset-4 rounded-full"
            animate={{
              scale: getCircleScale(),
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              background: `radial-gradient(circle, ${pattern.color}20 0%, ${pattern.color}08 100%)`,
              border: `2px solid ${pattern.color}40`,
              boxShadow: isActive ? `0 0 40px ${pattern.color}25` : "none",
            }}
          />
          {/* Center text */}
          <div className="relative z-10 flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-[18px] font-bold text-foreground"
              >
                {isActive ? phaseLabels[phase] : "Ready"}
              </motion.p>
            </AnimatePresence>
            {isActive && (
              <p className="text-[32px] font-bold tabular-nums mt-1" style={{ color: pattern.color }}>
                {phaseSeconds[phase] - phaseTime}
              </p>
            )}
          </div>
        </div>

        {/* Timer */}
        {isActive && (
          <p className="text-[13px] text-muted-foreground mt-4 font-medium tabular-nums">
            {mins}:{secs.toString().padStart(2, "0")} remaining · {cycleCount} cycles
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isActive && totalElapsed === 0 ? (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white font-semibold text-[15px] press-spring"
            style={{ background: pattern.color, boxShadow: `0 4px 20px -4px ${pattern.color}50` }}
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Begin
          </button>
        ) : (
          <>
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-[14px] press-spring"
              style={{
                background: `${pattern.color}15`,
                color: pattern.color,
                border: `1.5px solid ${pattern.color}30`,
              }}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" fill="currentColor" />}
              {isActive ? "Pause" : "Resume"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-[14px] text-muted-foreground press-spring"
              style={{ background: "hsl(var(--foreground)/0.05)" }}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;

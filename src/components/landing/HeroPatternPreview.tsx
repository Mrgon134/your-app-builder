import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, BrainCircuit, HeartPulse, Mic, Sparkles } from "lucide-react";

import juMain from "@/assets/ju-main.webp";

const demoStates = [
  {
    label: "Heavy",
    prompt: "I keep saying I am fine, but I feel incredibly blank.",
    tone: "high emotional load",
    reflection:
      "That blankness sounds less like nothing and more like your system has been carrying too much for too long.",
    nextStep: "Rest for ten minutes without trying to earn it.",
    accent: "#6C9BCF",
    bars: [28, 44, 36, 58, 48, 72, 62],
  },
  {
    label: "Foggy",
    prompt: "I cannot tell what I feel. Everything is just blurred.",
    tone: "pattern detected",
    reflection:
      "There may be too many feelings arriving at once. You do not need the whole answer yet. Start with the loudest one.",
    nextStep: "Choose one feeling word and let it be enough.",
    accent: "#7C6EDB",
    bars: [34, 42, 54, 50, 66, 58, 76],
  },
  {
    label: "Softer",
    prompt: "I think I am finally okay enough to be honest.",
    tone: "space opening",
    reflection:
      "A softer truth is starting to show up. You do not have to fix the whole story today, just protect the honest part.",
    nextStep: "Write the sentence you would say to a friend.",
    accent: "#4ECDC4",
    bars: [40, 50, 56, 62, 68, 76, 84],
  },
] as const;

const HeroPatternPreview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = demoStates[activeIndex];

  const visualStyle = useMemo(
    () => ({
      background: `linear-gradient(145deg, rgba(255,255,255,0.74), ${active.accent}10 46%, rgba(250,249,246,0.86))`,
      borderColor: `${active.accent}30`,
    }),
    [active],
  );

  return (
    <div data-testid="hero-pattern-preview" className="relative">
      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.84, 1, 0.84] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-8 top-44 z-10 hidden rounded-full border border-white/70 bg-white/82 px-4 py-2 text-sm font-semibold text-stone-500 shadow-[0_18px_44px_-30px_rgba(28,25,23,0.5)] backdrop-blur-2xl md:flex"
      >
        <HeartPulse className="mr-2 h-4 w-4 text-[#E8878C]" />
        {active.tone}
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0], opacity: [0.78, 1, 0.78] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -right-10 top-20 z-10 hidden rounded-full border border-white/70 bg-white/82 px-4 py-2 text-sm font-semibold text-stone-500 shadow-[0_18px_44px_-30px_rgba(28,25,23,0.5)] backdrop-blur-2xl md:flex"
      >
        <Sparkles className="mr-2 h-4 w-4 text-primary" />
        Ju noticed a pattern
      </motion.div>

      <div
        className="relative overflow-hidden rounded-[32px] border bg-white/70 p-4 shadow-[0_44px_120px_-74px_rgba(28,25,23,0.74)] backdrop-blur-2xl sm:p-5"
        style={visualStyle}
      >
        <div className="absolute inset-0 hero-demo-field" aria-hidden="true" />

        <div className="relative overflow-hidden rounded-[26px] border border-white/80 bg-white/72 p-4 backdrop-blur-2xl dark:border-white/10 dark:bg-background/60 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6F2FF]">
                <img src={juMain} alt="Ju mascot" className="h-7 w-7 animate-ju-float object-contain" width={28} height={28} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Ju live reveal</p>
                <p className="text-xs text-muted-foreground">Tap a feeling to see the read shift</p>
              </div>
            </div>
            <span className="rounded-full border border-black/[0.06] bg-white/76 px-3 py-1 text-xs font-semibold text-muted-foreground">
              Private
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 rounded-full border border-black/[0.06] bg-[#FAF9F6]/78 p-1.5">
            {demoStates.map((state, index) => (
              <button
                key={state.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-full px-3 py-2.5 text-sm font-semibold transition ${
                  activeIndex === index
                    ? "bg-white text-foreground shadow-[0_14px_34px_-26px_rgba(28,25,23,0.56)]"
                    : "text-muted-foreground hover:bg-white/62 hover:text-foreground"
                }`}
                aria-pressed={activeIndex === index}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: state.accent }} />
                  {state.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-y border-black/[0.06] py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span>Today, 10:42 AM</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ECDC4] shadow-[0_0_0_5px_rgba(78,205,196,0.12)]" />
              Live read
            </span>
          </div>

          <div className="mt-5 min-h-[312px] space-y-5 sm:min-h-[286px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.label}-prompt`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md border border-black/[0.06] bg-[#F7F7F5] px-4 py-3 text-base leading-7 text-foreground shadow-sm"
              >
                {active.prompt}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.label}-reply`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-3"
              >
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Sparkles className="h-4 w-4" style={{ color: active.accent }} />
                </div>
                <div className="nuju-neu-surface rounded-2xl rounded-tl-md px-4 py-4 text-[#4c4569]">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C6EDB]/70">
                    <BrainCircuit className="h-4 w-4 text-[#4ECDC4]" />
                    Ju noticed
                  </div>
                  <p className="text-sm leading-7 text-[#4c4569]/88 sm:text-base sm:leading-8">
                    {active.reflection}
                  </p>
                  <div className="nuju-neu-pressed mt-4 rounded-[18px] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7C6EDB]/60">Next gentle move</p>
                    <p className="mt-2 text-sm leading-6 text-[#4c4569]/78">{active.nextStep}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex h-12 items-end gap-1.5">
              {active.bars.map((height, index) => (
                <motion.span
                  key={`${active.label}-${index}`}
                  initial={{ height: 10 }}
                  animate={{ height: [Math.max(18, height - 20), height, Math.max(22, height - 10)] }}
                  transition={{
                    duration: 1.35,
                    delay: index * 0.08,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  className="w-full rounded-full"
                  style={{ background: `linear-gradient(180deg, ${active.accent}, rgba(28,25,23,0.14))` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-full border border-black/[0.06] bg-white/82 p-2 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F1EC] text-muted-foreground">
              <Mic className="h-4 w-4" />
            </div>
            <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">Type or speak the messy version...</p>
            <button
              type="button"
              className="nuju-brand-button flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:-translate-y-0.5 active:scale-[0.96]"
              aria-label="Submit demo message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPatternPreview;

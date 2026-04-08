import React from "react";
import { BrainCircuit, Mic, Sparkles, TrendingUp } from "lucide-react";
import juMain from "@/assets/ju-main.webp";

const moodBars = [28, 44, 38, 58, 66, 62, 78];

const patternChips = ["Overwhelmed", "Most honest", "Trying to cope"];

const HeroPatternPreview: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-x-8 top-6 h-72 rounded-full bg-primary/15 blur-[100px]" />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-border/60 bg-card/85 p-5 shadow-2xl backdrop-blur-2xl sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
              <img src={juMain} alt="Ju mascot" className="h-7 w-7 animate-ju-float object-contain" width={28} height={28} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Ju is listening</p>
              <p className="text-xs font-medium text-muted-foreground">From messy feelings to gentle clarity</p>
            </div>
          </div>

          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Safe and private
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-[1.6rem] border border-primary/15 bg-primary/[0.06] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">One-minute check-in</span>
            </div>

            <div className="mb-4 flex h-8 items-end gap-[3px]">
              {moodBars.map((height, index) => (
                <span
                  key={index}
                  className="w-[4px] rounded-full bg-primary/40"
                  style={{
                    height: `${height}%`,
                    animation: "typing-dots 1.6s ease-in-out infinite alternate",
                    animationDelay: `${index * 0.08}s`,
                  }}
                />
              ))}
            </div>

            <p className="text-sm leading-7 text-foreground/85">
              "I keep acting like I'm fine, but I think I'm mostly just tired and trying not to fall apart."
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-[#4ECDC4]/20 bg-gradient-to-br from-[#4ECDC4]/10 via-primary/[0.05] to-transparent p-5">
            <div className="mb-3 flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-[#4ECDC4]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#4ECDC4]">Ju noticed</span>
            </div>

            <p className="text-[15px] leading-7 text-foreground">
              "You open up most honestly when you're overwhelmed. That's not failure. It's you trying to take care of yourself."
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {patternChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#4ECDC4]/20 bg-white/70 px-3 py-1 text-[11px] font-semibold text-foreground/80 dark:bg-card/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] border border-border/60 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Mood trend</p>
                <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Steadier
                </div>
              </div>

              <div className="mt-4 flex items-end gap-2">
                {[34, 48, 44, 60, 72, 68, 82].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-[#4ECDC4]"
                    style={{ height: `${height}px`, opacity: 0.88 - index * 0.05 }}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                This week feels steadier than the last one.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-border/60 bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Hidden pattern</p>
              </div>

              <p className="text-sm leading-7 text-foreground">
                You tend to write more on the days you feel low. That's a healthy outlet, not something to hide.
              </p>

              <div className="mt-4 rounded-[1.2rem] bg-secondary/50 px-3 py-3 text-xs leading-6 text-foreground">
                The product starts as relief, then becomes a clearer map of your inner world.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPatternPreview;

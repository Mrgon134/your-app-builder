import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";

interface GuidedTourProps {
  onDone: () => void;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ onDone, currentScreen, onNavigate }) => {
  const { t } = useLang();
  const [step, setStep] = useState(0);

  const steps = [
    {
      screen: "home",
      icon: "😊",
      title: t.tour_step1_title || "Tap your mood",
      desc: t.tour_step1_desc || "Start by telling Ju how you feel right now. Takes 2 seconds.",
      arrowDir: "up" as const,
      arrowPos: "center",
    },
    {
      screen: "home",
      icon: "✍️",
      title: t.tour_step2_title || "Write or talk",
      desc: t.tour_step2_desc || "Tap Write to journal. Even just one sentence — Ju will analyze it.",
      arrowDir: "up" as const,
      arrowPos: "center",
    },
    {
      screen: "insights",
      icon: "📊",
      title: t.tour_step3_title || "See your patterns",
      desc: t.tour_step3_desc || "After a few entries, Insights shows mood trends and what Ju noticed about you.",
      arrowDir: "down" as const,
      arrowPos: "left-1/4",
    },
    {
      screen: "coach",
      icon: "💬",
      title: t.tour_step4_title || "Chat with your Coach",
      desc: t.tour_step4_desc || "Ju can be gentle, tough, wise, or fun. 5 free messages per week.",
      arrowDir: "down" as const,
      arrowPos: "center",
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onDone();
      return;
    }
    const nextStep = steps[step + 1];
    if (nextStep.screen !== currentScreen) {
      onNavigate(nextStep.screen);
    }
    setStep(step + 1);
  };

  // Navigate to the step's screen if needed
  React.useEffect(() => {
    if (current.screen !== currentScreen) {
      onNavigate(current.screen);
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card container — above nav for steps 2+, middle for steps 0-1 */}
      <div
        className="absolute left-0 right-0 pointer-events-auto px-4"
        style={
          current.arrowDir === "down"
            ? { bottom: "90px" }
            : { top: "50%", transform: "translateY(-50%)" }
        }
      >
        {/* Arrow pointing down to nav */}
        {current.arrowDir === "down" && (
          <div className={`flex ${current.arrowPos === "left-1/4" ? "justify-start pl-[25%]" : "justify-center"} mb-0`}>
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid hsl(var(--card))",
                marginBottom: "-1px",
              }}
            />
          </div>
        )}

        {/* Card */}
        <div
          className="bg-card rounded-3xl p-5 shadow-2xl border border-border/30"
          style={{ animation: "spring-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {/* Header row */}
          <div className="flex items-start gap-3 mb-3">
            <img src={JU_STICKERS.hi} alt="Ju" className="w-12 h-12 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[16px] font-bold text-foreground">{current.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed mt-0.5">{current.desc}</p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? "18px" : "6px",
                    height: "6px",
                    background: i === step ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.3)",
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onDone}
                className="text-[12px] text-muted-foreground"
              >
                {t.tour_skip || "Skip tour"}
              </button>
              <button
                onClick={handleNext}
                className="px-5 h-[36px] rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold press-spring shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.4)]"
              >
                {isLast ? (t.tour_done || "Got it!") : (t.tour_next || "Next")}
              </button>
            </div>
          </div>
        </div>

        {/* Arrow pointing up (for mood/write steps) */}
        {current.arrowDir === "up" && (
          <div className="flex justify-center mt-0">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid hsl(var(--card))",
                marginTop: "-1px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidedTour;

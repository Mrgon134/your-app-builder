import React, { useState, useEffect } from "react";
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
  const [rect, setRect] = useState<DOMRect | null>(null);

  const steps = [
    {
      screen: "home",
      targetId: "tour-mood-selector",
      title: t.tour_step1_title || "Tap your mood",
      desc: t.tour_step1_desc || "Start by telling Ju how you feel right now. Tap a mood to continue.",
      arrowDir: "up" as const,
    },
    {
      screen: "home",
      targetId: "tour-action-buttons",
      title: t.tour_step2_title || "Write or talk",
      desc: t.tour_step2_desc || "Tap Write to journal or Talk to speak. Tap one to continue.",
      arrowDir: "up" as const,
    },
    {
      screen: "insights",
      targetId: "tour-nav-insights",
      title: t.tour_step3_title || "See your patterns",
      desc: t.tour_step3_desc || "Insights shows your mood trends. Tap the Insights tab below.",
      arrowDir: "down" as const,
    },
    {
      screen: "coach",
      targetId: "tour-nav-coach",
      title: t.tour_step4_title || "Chat with your Coach",
      desc: t.tour_step4_desc || "Ju can be gentle, tough, wise, or fun. Tap the Coach tab below.",
      arrowDir: "down" as const,
    },
  ];

  const current = steps[step];
  
  // Continuously update target rect to handle animations and scrolling
  useEffect(() => {
    let animationFrameId: number;
    const updateRect = () => {
      const el = document.getElementById(current.targetId);
      if (el) {
        setRect(el.getBoundingClientRect());
      } else {
        setRect(null);
      }
      animationFrameId = requestAnimationFrame(updateRect);
    };
    updateRect();
    return () => cancelAnimationFrame(animationFrameId);
  }, [current.targetId, currentScreen]);

  // Enforce screen navigation
  useEffect(() => {
    if (current.screen !== currentScreen) {
      onNavigate(current.screen);
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Global click interception
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!rect) return;
      
      // If user clicked the "Skip" button inside the tooltip, don't intercept
      const target = e.target as HTMLElement;
      if (target.closest("#tour-skip-btn")) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const isInsideHole = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      
      if (isInsideHole) {
        // Let the click happen naturally, then advance step
        setTimeout(() => {
          if (step === steps.length - 1) {
            onDone();
          } else {
            setStep(s => s + 1);
          }
        }, 150);
      } else {
        // User clicked outside the hole, block the event!
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [rect, step, steps.length, onDone]);

  if (!rect) return null;

  const PADDING = 8;
  const holeTop = rect.top - PADDING;
  const holeBottom = rect.bottom + PADDING;
  const holeLeft = rect.left - PADDING;
  const holeRight = rect.right + PADDING;
  
  const isDown = current.arrowDir === "down";

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-none">
      {/* 4 Blockers with dark overlay and pointer-events-auto to catch all fake clicks */}
      <div 
        className="absolute top-0 left-0 right-0 bg-background/85 backdrop-blur-sm pointer-events-auto transition-all duration-300" 
        style={{ height: holeTop }} 
      />
      <div 
        className="absolute left-0 right-0 bottom-0 bg-background/85 backdrop-blur-sm pointer-events-auto transition-all duration-300" 
        style={{ top: holeBottom }} 
      />
      <div 
        className="absolute bg-background/85 backdrop-blur-sm pointer-events-auto transition-all duration-300" 
        style={{ top: holeTop, bottom: `calc(100vh - ${holeBottom}px)`, left: 0, width: holeLeft }} 
      />
      <div 
        className="absolute bg-background/85 backdrop-blur-sm pointer-events-auto transition-all duration-300" 
        style={{ top: holeTop, bottom: `calc(100vh - ${holeBottom}px)`, left: holeRight, right: 0 }} 
      />
      
      {/* The Transparent Hole (pointer-events-none so click falls into real UI) */}
      <div 
        className="absolute rounded-3xl ring-2 ring-primary shadow-[0_0_30px_hsl(var(--primary)/0.4)_inset] pointer-events-none transition-all duration-300"
        style={{ 
          top: holeTop, left: holeLeft, width: holeRight - holeLeft, height: holeBottom - holeTop,
          boxShadow: "0 0 0 4px hsl(var(--background)/0.5), 0 0 30px hsl(var(--primary)/0.4) inset"
        }}
      />
      
      {/* Floating Guidance Card */}
      <div 
        className="absolute left-4 right-4 max-w-sm mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] animate-spring-in"
        style={{
          top: isDown ? undefined : holeBottom + 16,
          bottom: isDown ? `calc(100vh - ${holeTop}px + 16px)` : undefined,
        }}
      >
        <div className="bg-card rounded-3xl p-5 shadow-2xl border border-primary/30 relative">
          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
            <img src={JU_STICKERS.hi} alt="Ju" className="w-[52px] h-[52px] object-contain flex-shrink-0 animate-ju-float" />
            <div className="flex-1 mt-0.5">
              <p className="text-[16px] font-bold text-foreground mb-0.5">{current.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">{current.desc}</p>
            </div>
          </div>
          
          {/* Progress & Skip */}
          <div className="flex items-center justify-between mt-3 pt-4 border-t border-border/40">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? "20px" : "6px",
                    height: "6px",
                    background: i === step ? "hsl(var(--primary))" : "hsl(var(--muted-foreground)/0.3)",
                  }}
                />
              ))}
            </div>
            <button
              id="tour-skip-btn"
              onClick={onDone}
              className="text-[13px] font-semibold text-muted-foreground press-spring hover:text-foreground transition-colors"
            >
              {t.tour_skip || "Skip tutorial"}
            </button>
          </div>
        </div>
        
        {/* Pointer Triangle */}
        <div className={`absolute left-1/2 -translate-x-1/2 ${isDown ? "-bottom-[9px]" : "-top-[9px]"}`}>
          <div 
            className="w-0 h-0"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              [isDown ? "borderTop" : "borderBottom"]: "10px solid hsl(var(--card))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;

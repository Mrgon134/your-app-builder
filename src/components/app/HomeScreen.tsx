import React, { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS, getGreeting, getRandomPrompt } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { JU_STICKERS, getMascotForState } from "@/lib/stickers";
import SignupPrompt from "@/components/app/SignupPrompt";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import { Settings, Flame, PenLine, Mic, RefreshCw } from "lucide-react";
import HabitSection from "@/components/app/HabitSection";

// Preload all sticker images in memory on mount
const preloadedImages: HTMLImageElement[] = [];
const preloadStickers = () => {
  if (preloadedImages.length > 0) return;
  Object.values(JU_STICKERS).forEach((src) => {
    const img = new Image();
    img.src = src;
    preloadedImages.push(img);
  });
};
preloadStickers();

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onSettings: () => void;
  onUpgrade: () => void;
  streak: number;
  entries: Array<{ mood: number; date: string; text: string }>;
  selectedMood?: number;
  onMoodSelect?: (mood: number) => void;
  energy?: number;
  onEnergyChange?: (val: number) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onSettings, onUpgrade, streak, entries, selectedMood: controlledMood, onMoodSelect: controlledMoodSelect, energy: controlledEnergy, onEnergyChange: controlledEnergyChange, plan, trialStartedAt }) => {
  const { t } = useLang();
  const [localMood, setLocalMood] = useState<number | null>(null);
  const [prompt, setPrompt] = useState(getRandomPrompt);
  const [localEnergy, setLocalEnergy] = useState(50);
  const [moodAnimating, setMoodAnimating] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const selectedMood = controlledMood ?? localMood;
  const energy = controlledEnergy ?? localEnergy;

  const greeting = getGreeting(t);
  const isNight = new Date().getHours() >= 21;
  const stickerKey = getMascotForState({ selectedMood, isNight });
  const juImg = JU_STICKERS[stickerKey];

  // Parallax scroll tracking
  useEffect(() => {
    const el = scrollRef.current?.closest('.flex-1.overflow-y-auto') || window;
    const handleScroll = () => {
      if (scrollRef.current) {
        const parent = scrollRef.current.closest('[class*="overflow"]');
        setScrollY(parent ? parent.scrollTop : window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMoodSelect = (value: number) => {
    if (controlledMoodSelect) controlledMoodSelect(value);
    else setLocalMood(value);
    setMoodAnimating(value);
    setTimeout(() => setMoodAnimating(null), 400);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  // Dynamic title size based on scroll
  const titleScale = Math.max(0.82, 1 - scrollY * 0.002);
  const titleOpacity = Math.max(0.6, 1 - scrollY * 0.003);

  return (
    <div ref={scrollRef} className="animate-page-slide-in space-y-6">
      {/* Animated gradient mesh header */}
      <div className="gradient-mesh -mx-4 -mt-6 px-4 pt-6 pb-4 rounded-b-[28px]">
        {/* Header — Apple Large Title style */}
        <div className="flex items-center justify-between mb-1">
          <div style={{ transform: `scale(${titleScale})`, opacity: titleOpacity, transformOrigin: 'left center', transition: 'transform 0.1s ease-out, opacity 0.1s ease-out' }}>
            <h1 className="text-[34px] font-bold text-foreground tracking-tight leading-tight">{greeting}</h1>
            <p className="text-[15px] text-muted-foreground mt-0.5">{t.how_feeling}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Dynamic Island-style streak badge */}
            {streak > 0 && (
              <div className="animate-dynamic-island flex items-center gap-1.5 h-10 px-4 rounded-full bg-foreground/[0.06] dark:bg-foreground/[0.08] backdrop-blur-sm">
                <Flame className={`w-[15px] h-[15px] text-mood-okay ${streak >= 7 ? "animate-streak-fire" : ""}`} />
                <span className="text-[14px] font-bold text-foreground tabular-nums">{streak}</span>
              </div>
            )}
            <button
              onClick={onSettings}
              className="w-10 h-10 rounded-full bg-foreground/[0.06] dark:bg-foreground/[0.08] backdrop-blur-sm flex items-center justify-center press-spring"
            >
              <Settings className="w-[18px] h-[18px] text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Mascot — parallax effect */}
      <div className="relative w-28 h-28 mx-auto" style={{ transform: `translateY(${-scrollY * 0.15}px)`, transition: 'transform 0.05s linear' }}>
        <div className="absolute inset-[-12px] rounded-full bg-primary/8 animate-glow-pulse" />
        <img
          src={juImg}
          alt="Ju"
          className="relative w-full h-full object-contain animate-parallax-float"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Mood selector — Apple-style horizontal carousel cards */}
      <div className="flex justify-center gap-2.5 px-1">
        {MOODS.map((mood, index) => {
          const isSelected = selectedMood === mood.value;
          const isAnimating = moodAnimating === mood.value;
          return (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className={`flex flex-col items-center gap-1.5 flex-1 py-3 rounded-2xl transition-all duration-300 ${
                isSelected
                  ? "shadow-lg"
                  : "hover:bg-foreground/[0.03] active:scale-[0.94]"
              }`}
              style={{
                background: isSelected ? `${mood.color}18` : undefined,
                boxShadow: isSelected ? `0 4px 20px ${mood.color}25, 0 1px 3px ${mood.color}15` : undefined,
                border: isSelected ? `1.5px solid ${mood.color}40` : '1.5px solid transparent',
                animation: isAnimating ? 'mood-card-select 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
                animationDelay: `${index * 0.02}s`,
              }}
            >
              <div className={`transition-transform duration-300 ${isSelected ? "scale-110" : ""}`}>
                <MoodIcon value={mood.value} color={mood.color} size={32} />
              </div>
              <span className={`text-[11px] font-semibold tracking-wide transition-all duration-200 ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                {t[mood.key] || mood.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Retention: Signup prompt after 3 entries */}
      <SignupPrompt
        entriesCount={entries.length}
        onDismiss={() => {}}
        onUpgrade={onUpgrade}
        plan={plan}
        trialStartedAt={trialStartedAt}
      />

      {/* Retention: Ju Remembers card */}
      <AiMemoryCard entries={entries} />

      {/* Prompt card — glassmorphic */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.12em]">{t.todays_prompt}</p>
          <button
            onClick={() => setPrompt(getRandomPrompt())}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all press-spring"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[16px] text-foreground leading-relaxed font-medium">{prompt}</p>
      </div>

      {/* Energy slider — glassmorphic */}
      <div className="glass-card rounded-2xl p-5">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-4">{t.energy}</p>
        <input
          type="range"
          min={0}
          max={100}
          value={energy}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (controlledEnergyChange) controlledEnergyChange(val);
            else setLocalEnergy(val);
          }}
          className="w-full"
          style={{ background: `linear-gradient(to right, hsl(var(--primary)) ${energy}%, hsl(var(--border)) ${energy}%)` }}
        />
        <div className="flex justify-between text-[11px] text-muted-foreground mt-2.5 font-medium">
          <span>{t.drained}</span>
          <span>{t.energized}</span>
        </div>
      </div>

      {/* Action buttons — Apple-style with spring press */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("journal")}
          className="flex items-center justify-center gap-2.5 h-[54px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
        >
          <PenLine className="w-[18px] h-[18px]" />
          {t.write}
        </button>
        <button
          onClick={() => onNavigate("journal")}
          className="flex items-center justify-center gap-2.5 h-[54px] rounded-2xl bg-foreground/[0.06] dark:bg-foreground/[0.08] text-foreground font-semibold text-[15px] press-spring backdrop-blur-sm"
        >
          <Mic className="w-[18px] h-[18px]" />
          {t.talk}
        </button>
      </div>

      {/* Daily Habits */}
      <HabitSection plan={plan} onUpgrade={onUpgrade} />

      {/* Spacer for bottom nav */}
      <div className="h-2" />
    </div>
  );
};

export default HomeScreen;

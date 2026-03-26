import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS, getGreeting, getRandomPrompt } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { JU_STICKERS, getMascotForState } from "@/lib/stickers";
import SignupPrompt from "@/components/app/SignupPrompt";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import { Settings, Flame, PenLine, Mic, RefreshCw } from "lucide-react";

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

  const selectedMood = controlledMood ?? localMood;
  const energy = controlledEnergy ?? localEnergy;

  const greeting = getGreeting(t);
  const isNight = new Date().getHours() >= 21;
  const stickerKey = getMascotForState({ selectedMood, isNight });
  const juImg = JU_STICKERS[stickerKey];

  const handleMoodSelect = (value: number) => {
    if (controlledMoodSelect) controlledMoodSelect(value);
    else setLocalMood(value);
    // Subtle haptic
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <div className="animate-fade-up space-y-5">
      {/* Header — Apple-clean */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-foreground tracking-tight leading-tight">{greeting}</h1>
          <p className="text-[15px] text-muted-foreground mt-0.5">{t.how_feeling}</p>
        </div>
        <div className="flex items-center gap-2.5">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-mood-okay/12">
              <Flame className={`w-4 h-4 text-mood-okay ${streak >= 7 ? "animate-streak-fire" : ""}`} />
              <span className="text-[13px] font-semibold text-mood-okay">{streak}</span>
            </div>
          )}
          <button
            onClick={onSettings}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center transition-all active:scale-[0.92]"
          >
            <Settings className="w-[18px] h-[18px] text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Mascot — refined glow */}
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-[-8px] rounded-full bg-primary/8 animate-glow-pulse" />
        <img
          src={juImg}
          alt="Ju"
          className="relative w-full h-full object-contain animate-ju-float"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Mood selector — Apple-clean pills */}
      <div className="flex justify-center gap-2">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.value;
          return (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
                isSelected
                  ? "bg-card shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)] scale-[1.05]"
                  : "active:scale-[0.94]"
              }`}
            >
              <MoodIcon value={mood.value} color={mood.color} size={30} />
              <span className={`text-[11px] font-medium transition-colors ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
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

      {/* Prompt card — clean, spacious */}
      <div className="bg-card rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-border/40">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">{t.todays_prompt}</p>
          <button
            onClick={() => setPrompt(getRandomPrompt())}
            className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all active:scale-[0.9]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[15px] text-foreground leading-relaxed">{prompt}</p>
      </div>

      {/* Energy slider — Apple-style */}
      <div className="bg-card rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-border/40">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-4">{t.energy}</p>
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

      {/* Action buttons — iOS-style */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("journal")}
          className="flex items-center justify-center gap-2.5 h-[52px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] transition-all active:scale-[0.97] shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)]"
        >
          <PenLine className="w-[18px] h-[18px]" />
          {t.write}
        </button>
        <button
          onClick={() => onNavigate("journal")}
          className="flex items-center justify-center gap-2.5 h-[52px] rounded-2xl bg-secondary text-foreground font-semibold text-[15px] transition-all active:scale-[0.97]"
        >
          <Mic className="w-[18px] h-[18px]" />
          {t.talk}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS, getGreeting, getRandomPrompt } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { JU_STICKERS, getMascotForState } from "@/lib/stickers";
import SignupPrompt from "@/components/app/SignupPrompt";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import { Settings, Flame, PenLine, Mic } from "lucide-react";

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
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onSettings, onUpgrade, streak, entries }) => {
  const { t } = useLang();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [prompt] = useState(getRandomPrompt);
  const [energy, setEnergy] = useState(50);

  const greeting = getGreeting(t);
  const isNight = new Date().getHours() >= 21;
  const stickerKey = getMascotForState({ selectedMood, isNight });
  const juImg = JU_STICKERS[stickerKey];

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{greeting}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.how_feeling}</p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-mood-okay/15 text-mood-okay">
              <Flame className={`w-4 h-4 ${streak >= 7 ? "animate-streak-fire" : ""}`} />
              <span className="text-sm font-bold">{streak}</span>
            </div>
          )}
          <button
            onClick={onSettings}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all active:scale-[0.95]"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Mascot - sticker based on state */}
      <div className="relative w-28 h-28 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/15 animate-glow-pulse" />
        <img
          src={juImg}
          alt="Ju"
          className="relative w-full h-full object-contain transition-all duration-150 ease-out"
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Mood selector */}
      <div className="flex justify-center gap-3 mb-8">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all active:scale-[0.95] ${
              selectedMood === mood.value
                ? "bg-card shadow-lg scale-105"
                : "hover:bg-secondary/50"
            }`}
          >
            <MoodIcon value={mood.value} color={mood.color} size={32} />
            <span className="text-[11px] font-medium text-muted-foreground">
              {t[mood.key] || mood.label}
            </span>
          </button>
        ))}
      </div>

      {/* Retention: Signup prompt after 3 entries */}
      <SignupPrompt
        entriesCount={entries.length}
        onDismiss={() => {}}
        onUpgrade={onUpgrade}
      />

      {/* Retention: Ju Remembers card */}
      <AiMemoryCard entries={entries} />

      {/* Prompt card */}
      <div className="bg-card rounded-3xl p-5 mb-4 shadow-sm border border-border/50">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">{t.todays_prompt}</p>
        <p className="font-writing text-base italic text-foreground leading-relaxed">{prompt}</p>
      </div>

      {/* Energy slider */}
      <div className="bg-card rounded-3xl p-5 mb-6 shadow-sm border border-border/50">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{t.energy}</p>
        <input
          type="range"
          min={0}
          max={100}
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer accent-primary"
          style={{ background: `linear-gradient(to right, #7C6EDB ${energy}%, hsl(var(--border)) ${energy}%)` }}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{t.drained}</span>
          <span>{t.energized}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("journal")}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
        >
          <PenLine className="w-5 h-5" />
          {t.write}
        </button>
        <button
          onClick={() => onNavigate("journal")}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-foreground font-semibold text-base transition-all active:scale-[0.97]"
        >
          <Mic className="w-5 h-5" />
          {t.talk}
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;

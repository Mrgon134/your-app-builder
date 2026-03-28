import React, { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS, getGreeting, getRandomPrompt } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { JU_STICKERS, getMascotForState } from "@/lib/stickers";
import SignupPrompt from "@/components/app/SignupPrompt";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import {
  Settings, Flame, PenLine, Mic, RefreshCw,
  BedDouble, BatteryLow, Zap, Sparkles, Check,
  Dumbbell, Moon, Utensils, Briefcase, Users, Gamepad2,
} from "lucide-react";
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

// 5-segment energy levels (lucide icons only, no emoji)
const ENERGY_LEVELS = [
  { value: 20, icon: BedDouble,  label: "Drained", color: "#9B93C0" },
  { value: 40, icon: BatteryLow, label: "Low",     color: "#7C6EDB" },
  { value: 60, icon: Zap,        label: "Okay",    color: "#7C6EDB" },
  { value: 80, icon: Sparkles,   label: "Good",    color: "#7C6EDB" },
  { value: 100, icon: Flame,     label: "Full",    color: "#FFB347" },
] as const;

// Activity tags (lucide icons, no emoji)
const ACTIVITY_TAGS = [
  { id: "move",   icon: Dumbbell,  label: "Move"   },
  { id: "sleep",  icon: Moon,      label: "Sleep"  },
  { id: "food",   icon: Utensils,  label: "Food"   },
  { id: "work",   icon: Briefcase, label: "Work"   },
  { id: "social", icon: Users,     label: "Social" },
  { id: "fun",    icon: Gamepad2,  label: "Fun"    },
] as const;

// Mood-reactive speech bubble messages
const JU_BUBBLE: Record<string, string> = {
  "1": "I'm right here with you",
  "2": "Let's take this one step at a time",
  "3": "A steady day has its own beauty",
  "4": "You're doing well today",
  "5": "What a wonderful feeling",
  default: "How are you today?",
};

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onWrite?: () => void;
  onTalk?: () => void;
  onSettings: () => void;
  onUpgrade: () => void;
  onQuickLog?: () => void;
  streak: number;
  entries: Array<{ mood: number; date: string; text: string }>;
  selectedMood?: number;
  onMoodSelect?: (mood: number) => void;
  energy?: number;
  onEnergyChange?: (val: number) => void;
  selectedActivities?: string[];
  onActivitiesChange?: (activities: string[]) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
  hasBanner?: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate, onWrite, onTalk, onSettings, onUpgrade, onQuickLog,
  streak, entries,
  selectedMood: controlledMood, onMoodSelect: controlledMoodSelect,
  energy: controlledEnergy, onEnergyChange: controlledEnergyChange,
  selectedActivities: controlledActivities, onActivitiesChange,
  plan, trialStartedAt, hasBanner,
}) => {
  const { t } = useLang();
  const [localMood, setLocalMood] = useState<number | null>(null);
  const [prompt, setPrompt] = useState(getRandomPrompt);
  const [localEnergy, setLocalEnergy] = useState(60);
  const [moodAnimating, setMoodAnimating] = useState<number | null>(null);
  const [localActivities, setLocalActivities] = useState<string[]>([]);
  const selectedActivities = controlledActivities ?? localActivities;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const selectedMood = controlledMood ?? localMood;
  const energy = controlledEnergy ?? localEnergy;
  const selectedMoodData = MOODS.find((m) => m.value === selectedMood);

  const greeting = getGreeting(t);
  const isNight = new Date().getHours() >= 21;
  const stickerKey = getMascotForState({ selectedMood, isNight });
  const juImg = JU_STICKERS[stickerKey];

  // Today's date string — clean, no emoji
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const parent = scrollRef.current.closest('[class*="overflow"]') as HTMLElement | null;
        setScrollY(parent ? parent.scrollTop : window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMoodSelect = (value: number) => {
    if (controlledMoodSelect) controlledMoodSelect(value);
    else setLocalMood(value);
    setMoodAnimating(value);
    setTimeout(() => setMoodAnimating(null), 400);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleEnergySelect = (value: number) => {
    if (controlledEnergyChange) controlledEnergyChange(value);
    else setLocalEnergy(value);
    if (navigator.vibrate) navigator.vibrate(6);
  };

  const toggleActivity = (id: string) => {
    const next = selectedActivities.includes(id)
      ? selectedActivities.filter((a) => a !== id)
      : [...selectedActivities, id];
    if (onActivitiesChange) onActivitiesChange(next);
    else setLocalActivities(next);
    if (navigator.vibrate) navigator.vibrate(6);
  };

  // Dynamic title size based on scroll
  const titleScale = Math.max(0.82, 1 - scrollY * 0.002);
  const titleOpacity = Math.max(0.6, 1 - scrollY * 0.003);

  // Nearest energy level for display label
  const nearestEnergy = ENERGY_LEVELS.reduce((prev, curr) =>
    Math.abs(curr.value - energy) < Math.abs(prev.value - energy) ? curr : prev
  );

  return (
    <div ref={scrollRef} className="animate-page-slide-in space-y-5">
      {/* Animated gradient mesh header — reacts to selected mood color */}
      <div className={`gradient-mesh relative -mx-4 px-4 pt-6 pb-5 rounded-b-[28px] ${hasBanner ? "mt-0" : "-mt-6"}`}>
        {/* Mood color overlay — child div so it doesn't conflict with gradient-mesh background */}
        {selectedMoodData && (
          <div
            className="absolute inset-0 rounded-b-[28px] pointer-events-none"
            style={{
              background: `linear-gradient(160deg, ${selectedMoodData.color}1A 0%, transparent 65%)`,
              transition: "background 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        )}
        {/* Header — Apple Large Title */}
        <div className="flex items-center justify-between mb-1">
          <div
            style={{
              transform: `scale(${titleScale})`,
              opacity: titleOpacity,
              transformOrigin: "left center",
              transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            }}
          >
            <h1 className="text-[34px] font-bold text-foreground tracking-tight leading-tight">{greeting}</h1>
            <p className="text-[13px] text-muted-foreground/70 font-medium mt-0.5">{dateStr}</p>
          </div>
          <div className="flex items-center gap-2">
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

      {/* Mascot + speech bubble */}
      <div className="flex flex-col items-center gap-2.5">
        <div
          className="relative w-28 h-28"
          style={{ transform: `translateY(${-scrollY * 0.12}px)`, transition: "transform 0.05s linear" }}
        >
          <div className="absolute inset-[-12px] rounded-full bg-primary/8 animate-glow-pulse" />
          <img
            src={juImg}
            alt="Ju"
            className="relative w-full h-full object-contain animate-parallax-float"
            style={{ willChange: "transform" }}
          />
        </div>
        {/* Mood-reactive speech bubble — pure text, no emoji */}
        <div
          key={String(selectedMood)}
          className="glass-card rounded-full px-4 py-1.5 animate-fade-up"
        >
          <p className="text-[13px] text-foreground/80 font-medium">
            {JU_BUBBLE[String(selectedMood)] ?? JU_BUBBLE.default}
          </p>
        </div>
      </div>

      {/* Mood selector — taller gradient cards with glow ring */}
      <div>
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-3 px-0.5">
          {t.how_feeling}
        </p>
        <div className="flex justify-center gap-2 px-0.5">
          {MOODS.map((mood, index) => {
            const isSelected = selectedMood === mood.value;
            const isAnimating = moodAnimating === mood.value;
            return (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className="flex flex-col items-center gap-2 flex-1 pt-4 pb-3 rounded-2xl transition-all duration-300"
                style={{
                  background: isSelected
                    ? `linear-gradient(160deg, ${mood.color}28 0%, ${mood.color}12 100%)`
                    : "transparent",
                  boxShadow: isSelected
                    ? `0 0 0 1.5px ${mood.color}70, 0 6px 24px ${mood.color}25, inset 0 1px 0 rgba(255,255,255,0.12)`
                    : "0 0 0 1.5px transparent",
                  animation: isAnimating
                    ? "mood-card-select 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : undefined,
                  animationDelay: `${index * 0.02}s`,
                }}
              >
                <div
                  className="transition-transform duration-300"
                  style={{ transform: isSelected ? "scale(1.12)" : "scale(1)" }}
                >
                  <MoodIcon value={mood.value} color={mood.color} size={38} />
                </div>
                <span
                  className="text-[10px] font-semibold tracking-wide transition-all duration-200"
                  style={{ color: isSelected ? mood.color : "hsl(var(--muted-foreground))" }}
                >
                  {t[mood.key] || mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity tags row */}
      <div className="flex gap-2 flex-wrap px-0.5">
        {ACTIVITY_TAGS.map(({ id, icon: Icon, label }) => {
          const active = selectedActivities.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleActivity(id)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-full transition-all duration-200 press-spring"
              style={{
                background: active ? "hsl(var(--primary)/0.1)" : "hsl(var(--foreground)/0.04)",
                border: `1px solid ${active ? "hsl(var(--primary)/0.35)" : "transparent"}`,
              }}
            >
              <Icon
                className="w-3.5 h-3.5"
                style={{ color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                strokeWidth={active ? 2.2 : 1.6}
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Retention */}
      <SignupPrompt
        entriesCount={entries.length}
        onDismiss={() => {}}
        onUpgrade={onUpgrade}
        plan={plan}
        trialStartedAt={trialStartedAt}
      />
      <AiMemoryCard entries={entries} />

      {/* Prompt card */}
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

      {/* Energy — 5-segment icon picker */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">{t.energy}</p>
          <span className="text-[11px] font-medium text-muted-foreground">{nearestEnergy.label}</span>
        </div>
        <div className="flex gap-2">
          {ENERGY_LEVELS.map((lvl) => {
            const active = energy >= lvl.value;
            const isNearest = nearestEnergy.value === lvl.value;
            const Icon = lvl.icon;
            return (
              <button
                key={lvl.value}
                onClick={() => handleEnergySelect(lvl.value)}
                className="flex-1 flex flex-col items-center gap-2 py-3.5 rounded-xl transition-all duration-200 press-spring"
                style={{
                  background: active ? `${lvl.color}14` : "transparent",
                  border: `1.5px solid ${isNearest ? lvl.color + "80" : active ? lvl.color + "30" : "transparent"}`,
                }}
              >
                <Icon
                  className="w-5 h-5 transition-all duration-200"
                  style={{
                    color: active ? lvl.color : "hsl(var(--muted-foreground)/0.3)",
                    strokeWidth: active ? 2.2 : 1.5,
                  }}
                />
                {isNearest && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: lvl.color }} />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-2.5 font-medium px-1">
          <span>{t.drained}</span>
          <span>{t.energized}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2.5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onWrite ? onWrite() : onNavigate("journal")}
            className="flex items-center justify-center gap-2.5 h-[54px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
          >
            <PenLine className="w-[18px] h-[18px]" />
            {t.write}
          </button>
          <button
            onClick={() => onTalk ? onTalk() : onNavigate("journal")}
            className="flex items-center justify-center gap-2.5 h-[54px] rounded-2xl bg-foreground/[0.06] dark:bg-foreground/[0.08] text-foreground font-semibold text-[15px] press-spring backdrop-blur-sm"
          >
            <Mic className="w-[18px] h-[18px]" />
            {t.talk}
          </button>
        </div>
        {/* Quick log — appears when mood is selected */}
        {selectedMood && onQuickLog && (
          <button
            onClick={onQuickLog}
            className="w-full flex items-center justify-center gap-2 h-[44px] rounded-2xl border border-border/50 text-muted-foreground font-medium text-[13px] press-spring animate-fade-up transition-all hover:border-border hover:text-foreground"
          >
            <Check className="w-3.5 h-3.5" />
            Log mood only
          </button>
        )}
      </div>

      {/* Recent entries — clean iOS-list style, no cards */}
      {entries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 px-0.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">Recent</p>
            <button
              onClick={() => onNavigate("insights")}
              className="text-[11px] text-primary font-medium press-spring"
            >
              See all
            </button>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            {entries.slice(0, 3).map((entry, i) => {
              const moodData = MOODS.find((m) => m.value === entry.mood);
              const relativeDate = (() => {
                const d = new Date(entry.date);
                const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
                if (diff === 0) return "Today";
                if (diff === 1) return "Yesterday";
                return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              })();
              return (
                <button
                  key={i}
                  onClick={() => onNavigate("insights")}
                  className="w-full flex items-center gap-3 px-4 py-3.5 press-spring text-left"
                  style={i > 0 ? { boxShadow: "inset 0 0.5px 0 hsl(var(--border)/0.5)" } : {}}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: moodData?.color ?? "#7C6EDB" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground font-medium truncate">
                      {entry.text ? entry.text.slice(0, 44) + (entry.text.length > 44 ? "…" : "") : moodData?.label ?? "Mood logged"}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{relativeDate}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Daily Habits */}
      <HabitSection plan={plan} onUpgrade={onUpgrade} />

      {/* Spacer for bottom nav */}
      <div className="h-2" />
    </div>
  );
};

export default HomeScreen;

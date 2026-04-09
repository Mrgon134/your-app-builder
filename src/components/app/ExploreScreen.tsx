import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, Mail, Compass, Heart, Wind, BookOpen,
  TrendingUp, ChevronLeft, Flame, Star,
  Lock, Check, Sparkles,
} from "lucide-react";
import {
  type Achievement,
  getAllAchievementsWithStatus,
  getUnlockedCount,
} from "@/lib/achievements";
import LetterToFutureSelf from "@/components/app/LetterToFutureSelf";
import BreathingExercise from "@/components/app/BreathingExercise";
import PromptPacksScreen from "@/components/app/PromptPacksScreen";
import ProgressDashboard from "@/components/app/ProgressDashboard";
import { type EntryRow } from "@/lib/api";

type SubScreen = "main" | "achievements" | "letters" | "breathing" | "prompts" | "progress";

interface ExploreScreenProps {
  entries: EntryRow[];
  streak: number;
  onWritePrompt?: (prompt: string) => void;
  onNavigate?: (screen: string) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
  onUpgrade?: () => void;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({
  entries,
  streak,
  onWritePrompt,
  onNavigate,
  plan,
  trialStartedAt,
  onUpgrade,
}) => {
  const [subScreen, setSubScreen] = useState<SubScreen>("main");

  const allAchievements = getAllAchievementsWithStatus();
  const unlockedCount = getUnlockedCount();

  if (subScreen === "achievements") {
    return (
      <div className="animate-page-slide-in space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setSubScreen("main")} className="press-spring">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-[22px] font-bold text-foreground">Achievements</h2>
          <span className="text-[13px] text-muted-foreground ml-auto">{unlockedCount}/{allAchievements.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {allAchievements.map((ach) => {
            const isUnlocked = !ach.locked;
            return (
              <motion.div
                key={ach.id}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl p-4 relative overflow-hidden"
                style={{
                  background: isUnlocked
                    ? "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%)"
                    : "hsl(var(--foreground)/0.03)",
                  border: `1px solid ${isUnlocked ? "rgba(251,191,36,0.2)" : "hsl(var(--border)/0.3)"}`,
                }}
              >
                <div className="text-2xl mb-2">{ach.icon}</div>
                <p className="text-[13px] font-semibold text-foreground leading-tight">{ach.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{ach.description}</p>
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-2xl">
                    <Lock className="w-5 h-5 text-muted-foreground/30" />
                  </div>
                )}
                {isUnlocked && (
                  <div className="absolute top-3 right-3">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  if (subScreen === "letters") {
    return (
      <div className="animate-page-slide-in space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setSubScreen("main")} className="press-spring">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-[22px] font-bold text-foreground">Letters to Future Self</h2>
        </div>
        <LetterToFutureSelf />
      </div>
    );
  }

  if (subScreen === "breathing") {
    return (
      <div className="animate-page-slide-in space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setSubScreen("main")} className="press-spring">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-[22px] font-bold text-foreground">Breathing Exercise</h2>
        </div>
        <BreathingExercise />
      </div>
    );
  }

  if (subScreen === "prompts") {
    return (
      <div className="animate-page-slide-in space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setSubScreen("main")} className="press-spring">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-[22px] font-bold text-foreground">Prompt Packs</h2>
        </div>
        <PromptPacksScreen onWritePrompt={onWritePrompt} />
      </div>
    );
  }

  if (subScreen === "progress") {
    return (
      <div className="animate-page-slide-in space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setSubScreen("main")} className="press-spring">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-[22px] font-bold text-foreground">Your Progress</h2>
        </div>
        <ProgressDashboard entries={entries} streak={streak} />
      </div>
    );
  }

  // Main explore grid
  const cards = [
    {
      id: "progress",
      icon: TrendingUp,
      title: "Your Progress",
      subtitle: `${entries.length} entries · ${streak} day streak`,
      color: "rgb(99,102,241)",
      bg: "rgba(99,102,241,0.08)",
      border: "rgba(99,102,241,0.15)",
    },
    {
      id: "achievements",
      icon: Trophy,
      title: "Achievements",
      subtitle: `${unlockedCount}/${allAchievements.length} unlocked`,
      color: "rgb(245,158,11)",
      bg: "rgba(245,158,11,0.08)",
      border: "rgba(245,158,11,0.15)",
    },
    {
      id: "prompts",
      icon: BookOpen,
      title: "Prompt Packs",
      subtitle: "Themed journaling",
      color: "rgb(236,72,153)",
      bg: "rgba(236,72,153,0.08)",
      border: "rgba(236,72,153,0.15)",
    },
    {
      id: "breathing",
      icon: Wind,
      title: "Breathing",
      subtitle: "Quick calm exercise",
      color: "rgb(20,184,166)",
      bg: "rgba(20,184,166,0.08)",
      border: "rgba(20,184,166,0.15)",
    },
    {
      id: "letters",
      icon: Mail,
      title: "Future Letters",
      subtitle: "Write to future you",
      color: "rgb(251,191,36)",
      bg: "rgba(251,191,36,0.08)",
      border: "rgba(251,191,36,0.15)",
    },
    {
      id: "programs",
      icon: Sparkles,
      title: "Programs",
      subtitle: "Guided programs",
      color: "rgb(168,85,247)",
      bg: "rgba(168,85,247,0.08)",
      border: "rgba(168,85,247,0.15)",
    },
  ];

  return (
    <div className="animate-page-slide-in space-y-5">
      {/* Header */}
      <div className="-mx-4 px-4 pt-2 pb-4">
        <h1 className="text-[34px] font-bold text-foreground tracking-tight leading-tight">Explore</h1>
        <p className="text-[13px] text-muted-foreground/70 font-medium mt-0.5">
          Discover tools for your journey
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, i) => (
          <motion.button
            key={card.id}
            onClick={() => {
              if (card.id === "programs") {
                onNavigate?.("programs");
              } else {
                setSubScreen(card.id as SubScreen);
              }
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-start p-4 rounded-2xl text-left press-spring"
            style={{ background: card.bg, border: `1px solid ${card.border}` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${card.color}18` }}>
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <p className="text-[14px] font-semibold text-foreground">{card.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{card.subtitle}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;

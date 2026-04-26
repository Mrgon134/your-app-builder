import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, PenLine, TrendingUp, Star, Trophy, Calendar } from "lucide-react";
import { type EntryRow } from "@/lib/api";
import { MOODS } from "@/lib/constants";
import { getUnlockedCount } from "@/lib/achievements";
import { getRitualStreak } from "@/lib/daily-ritual";

interface ProgressDashboardProps {
  entries: EntryRow[];
  streak: number;
  userId?: string | null;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ entries, streak, userId }) => {
  const [animatedValues, setAnimatedValues] = useState({
    entries: 0,
    streak: 0,
    achievements: 0,
    ritualStreak: 0,
  });

  const achievementsCount = getUnlockedCount(userId);
  const ritualStreak = getRitualStreak();

  // Find most common mood
  const moodCounts: Record<number, number> = {};
  entries.forEach((e) => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });
  const topMoodValue = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topMood = MOODS.find((m) => m.value === Number(topMoodValue));

  // Entries this month
  const now = new Date();
  const thisMonth = entries.filter((e) => {
    const d = new Date(e.entry_date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  // Days journaled this month
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const journaledDays = new Set(thisMonth.map((e) => new Date(e.entry_date).getDate())).size;

  // Animate counters
  useEffect(() => {
    const targets = {
      entries: entries.length,
      streak,
      achievements: achievementsCount,
      ritualStreak,
    };

    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setAnimatedValues({
        entries: Math.round(targets.entries * eased),
        streak: Math.round(targets.streak * eased),
        achievements: Math.round(targets.achievements * eased),
        ritualStreak: Math.round(targets.ritualStreak * eased),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [entries.length, streak, achievementsCount, ritualStreak]);

  const stats = [
    {
      icon: PenLine,
      label: "Total Entries",
      value: animatedValues.entries,
      color: "rgb(99,102,241)",
      bg: "rgba(99,102,241,0.1)",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${animatedValues.streak}d`,
      color: "rgb(245,158,11)",
      bg: "rgba(245,158,11,0.1)",
    },
    {
      icon: Trophy,
      label: "Achievements",
      value: animatedValues.achievements,
      color: "rgb(236,72,153)",
      bg: "rgba(236,72,153,0.1)",
    },
    {
      icon: Star,
      label: "Ritual Streak",
      value: `${animatedValues.ritualStreak}d`,
      color: "rgb(20,184,166)",
      bg: "rgba(20,184,166,0.1)",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-4"
            style={{
              background: `linear-gradient(135deg, ${stat.bg} 0%, transparent 80%)`,
              border: `1px solid ${stat.color}15`,
            }}
          >
            <stat.icon className="w-5 h-5 mb-3" style={{ color: stat.color }} />
            <p className="text-[28px] font-bold text-foreground tabular-nums leading-none">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly progress ring */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl p-5 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.04) 100%)",
          border: "1px solid rgba(99,102,241,0.12)",
        }}
      >
        <div className="flex items-center justify-center gap-6">
          {/* SVG ring */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" strokeWidth="6" fill="none" stroke="hsl(var(--foreground)/0.05)" />
              <circle
                cx="48" cy="48" r="40"
                strokeWidth="6"
                fill="none"
                stroke="rgb(99,102,241)"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - journaledDays / daysInMonth)}`}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-bold text-foreground tabular-nums">{journaledDays}</span>
              <span className="text-[9px] text-muted-foreground font-medium">/{daysInMonth} days</span>
            </div>
          </div>

          <div className="text-left">
            <p className="text-[14px] font-semibold text-foreground">
              {now.toLocaleDateString("en-US", { month: "long" })}
            </p>
            <p className="text-[12px] text-muted-foreground mt-1">
              {journaledDays > 0
                ? `${thisMonth.length} entries on ${journaledDays} days`
                : "Start with one honest check-in this month."}
            </p>
            {topMood && (
              <p className="text-[12px] mt-2" style={{ color: topMood.color }}>
                Most common: {topMood.label}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressDashboard;

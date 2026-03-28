import React, { useState, useEffect } from "react";
import { hasPlusAccess } from "@/lib/trial";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { Lock, Loader2, CalendarDays, Flame, Target } from "lucide-react";
import HistoryLock from "@/components/app/HistoryLock";
import MoodTrendChart from "@/components/app/MoodTrendChart";
import MonthPixelGrid from "@/components/app/MonthPixelGrid";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import ShareMenu from "@/components/app/ShareMenu";
import { JU_STICKERS } from "@/lib/stickers";

interface InsightsScreenProps {
  entries: Array<{ mood: number; date: string; text: string }>;
  streak?: number;
  onUpgrade: () => void;
  onNavigate?: (screen: string) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ entries, streak = 0, onUpgrade, onNavigate, plan = "free", trialStartedAt = null }) => {
  const { t, lang } = useLang();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (entries.length < 2) return;
    const fetchSummary = async () => {
      setSummaryLoading(true);
      try {
        const resp = await fetch(
          `https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/ai-weekly-summary`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z21sbmxxbWRqamZtY3lwaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTEyNDYsImV4cCI6MjA4OTU4NzI0Nn0.kUM2J00vmkRd55MmQw5AAadS8XGZKeLY0mgGg8aAVFg`,
            },
            body: JSON.stringify({ entries: entries.slice(0, 7), lang }),
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data.summary) setAiSummary(data.summary);
        }
      } catch (e) {
        console.error("Weekly summary failed:", e);
      } finally {
        setSummaryLoading(false);
      }
    };
    fetchSummary();
  }, [entries.length, lang]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekMoods = entries.length > 0
    ? entries.slice(0, 7).map((e) => e.mood)
    : [3, 4, 3, 2, 4, 5, 4];

  const avgMood = weekMoods.length > 0
    ? (weekMoods.reduce((a, b) => a + b, 0) / weekMoods.length).toFixed(1)
    : "0";

  // Compute mood trend from recent entries (last 7 vs previous 7)
  const getMoodTrend = (): { direction: "up" | "down" | "stable"; message: string } => {
    if (entries.length < 3) return { direction: "stable", message: "Keep writing and I'll spot patterns in your mood." };
    const recent = entries.slice(0, Math.min(7, entries.length)).map((e) => e.mood);
    const older = entries.slice(Math.min(7, entries.length), Math.min(14, entries.length)).map((e) => e.mood);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    if (older.length === 0) return { direction: "stable", message: "You've been showing up consistently. That's already a win." };
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    const diff = recentAvg - olderAvg;
    if (diff >= 0.5) return { direction: "up", message: "Your mood has been climbing this week. Something's working — what is it?" };
    if (diff <= -0.5) return { direction: "down", message: "Things have been heavier lately. That's okay — I'm noticing it so you don't have to carry it alone." };
    return { direction: "stable", message: "Your mood has been steady. Consistency is underrated — it's a kind of strength." };
  };
  const moodTrend = getMoodTrend();

  // Empty state — no entries yet
  if (entries.length === 0) {
    return (
      <div className="animate-page-slide-in flex flex-col items-center justify-center py-16 text-center px-6">
        <div className="relative w-28 h-28 mb-6">
          <div className="absolute inset-[-12px] rounded-full bg-primary/8 animate-glow-pulse" />
          <img src={JU_STICKERS.diary} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
        </div>
        <h2 className="font-serif text-[22px] font-bold text-foreground mb-2">Your story starts here</h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-[260px]">
          Write your first entry and Ju will start discovering patterns in your mood and energy.
        </p>
        {onNavigate && (
          <button
            onClick={() => onNavigate("home")}
            className="h-[52px] px-8 rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
          >
            Write first entry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="animate-page-slide-in space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[34px] font-bold text-foreground tracking-tight">{t.mind_gallery}</h1>
        <div className="flex gap-2">
          {entries.length > 0 && (
            <ShareMenu
              type="daily"
              data={{ mood: entries[0].mood, date: entries[0].date, text: entries[0].text }}
              label={t.share_mood || "Share"}
            />
          )}
        </div>
      </div>

      {/* 30-Day Mood Trend Chart */}
      <MoodTrendChart entries={entries} />

      {/* Weekly mood wave */}
      <div className="glass-card rounded-2xl p-5">
        <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-4">{t.weekly_mood}</p>
        <div className="flex items-end justify-between gap-2 h-28">
          {weekMoods.map((mood, i) => {
            const moodData = MOODS.find((m) => m.value === mood) || MOODS[2];
            const barHeight = Math.max(mood * 16, 10);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-lg transition-all duration-500"
                  style={{
                    height: `${barHeight}px`,
                    background: moodData.color,
                    opacity: 0.85,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
                <span className="text-[10px] text-muted-foreground font-medium">{weekDays[i]}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-3">
          <ShareMenu
            type="weekly"
            data={{ moods: weekMoods, avgMood: parseFloat(avgMood), totalEntries: entries.length }}
            label={t.share_week || "Share week"}
            className="text-xs"
          />
        </div>
      </div>

      {/* Ju mood trend narration */}
      {entries.length >= 3 && (
        <div className="glass-card rounded-2xl p-5 flex items-start gap-3">
          <img
            src={moodTrend.direction === "up" ? JU_STICKERS.yay : moodTrend.direction === "down" ? JU_STICKERS.zen : JU_STICKERS.goodjob}
            alt="Ju"
            className="w-9 h-9 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1.5">I noticed...</p>
            <p className="text-[14px] text-foreground leading-relaxed">{moodTrend.message}</p>
          </div>
        </div>
      )}

      <MonthPixelGrid entries={entries} />

      {/* Stats row — Apple-style metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-2xl p-4 text-center">
          <p className="text-[22px] font-bold text-foreground tracking-tight">{avgMood}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{t.mood_avg}</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <p className="text-[22px] font-bold text-foreground tracking-tight">{entries.length}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{t.entries_total}</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <MoodIcon value={5} color="#4ECDC4" size={26} />
          <p className="text-[10px] text-muted-foreground mt-1 font-medium">{t.mood_best}</p>
        </div>
      </div>

      {/* Streak milestone */}
      {streak >= 7 && (
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-0.5 flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {t.streak_milestone || "Streak Milestone"}</p>
            <p className="text-[22px] font-bold text-foreground tracking-tight">{streak} {t.days_streak || "days"}</p>
          </div>
          <ShareMenu type="streak" data={{ streak }} label={t.share_streak || "Share"} />
        </div>
      )}

      {/* AI Weekly Summary */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <img src={JU_STICKERS.goodjob} alt="Ju" className="w-8 h-8" />
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">{t.weekly_summary}</p>
        </div>
        {summaryLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-[13px]">Analyzing your week...</span>
          </div>
        ) : (
          <p className="text-[14px] text-foreground leading-relaxed">
            {aiSummary || (entries.length > 0 ? t.summary_has_entries : t.summary_no_entries)}
          </p>
        )}
      </div>

      <AiMemoryCard entries={entries} />

      {/* Quick links — Programs + Year in Review */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate?.("programs")}
          className="glass-card rounded-2xl p-4 flex flex-col items-start gap-2 press-spring text-left"
        >
          <Target className="w-6 h-6 text-primary" />
          <div>
            <p className="text-[14px] font-semibold text-foreground">Guided Programs</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Structured challenges</p>
          </div>
        </button>
        <button
          onClick={() => onNavigate?.("year-review")}
          className="glass-card rounded-2xl p-4 flex flex-col items-start gap-2 press-spring text-left"
        >
          <CalendarDays className="w-6 h-6 text-primary" />
          <div>
            <p className="text-[14px] font-semibold text-foreground">Year in Review</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{new Date().getFullYear()} recap</p>
          </div>
        </button>
      </div>

      <HistoryLock onUpgrade={onUpgrade} plan={plan} trialStartedAt={trialStartedAt} />

      {/* Relationship map locked */}
      {!hasPlusAccess(plan, trialStartedAt) && (
        <div className="glass-card rounded-2xl p-6 text-center">
          <Lock className="w-7 h-7 mx-auto text-muted-foreground/30 mb-3" />
          <p className="font-semibold text-foreground text-[17px] mb-1">{t.relationship_map}</p>
          <p className="text-[13px] text-muted-foreground mb-4">{t.rel_desc}</p>
          <button
            onClick={onUpgrade}
            className="px-5 py-2.5 rounded-xl bg-primary/8 text-primary font-semibold text-[13px] transition-all active:scale-[0.97]"
          >
            {t.unlock_pro}
          </button>
        </div>
      )}
    </div>
  );
};

export default InsightsScreen;
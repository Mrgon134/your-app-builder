import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { Lock, Loader2 } from "lucide-react";
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
  plan?: string | null;
  trialStartedAt?: string | null;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ entries, streak = 0, onUpgrade, plan = "free", trialStartedAt = null }) => {
  const { t, lang } = useLang();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Fetch AI weekly summary
  useEffect(() => {
    if (entries.length < 2) return;
    const fetchSummary = async () => {
      setSummaryLoading(true);
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-weekly-summary`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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

  // Week data
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekMoods = entries.length > 0
    ? entries.slice(0, 7).map((e) => e.mood)
    : [3, 4, 3, 2, 4, 5, 4];

  const avgMood = weekMoods.length > 0
    ? (weekMoods.reduce((a, b) => a + b, 0) / weekMoods.length).toFixed(1)
    : "0";

  return (
    <div className="animate-fade-up space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">{t.mind_gallery}</h1>
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
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">{t.weekly_mood}</p>
        <div className="flex items-end justify-between gap-2 h-32">
          {weekMoods.map((mood, i) => {
            const moodData = MOODS.find((m) => m.value === mood) || MOODS[2];
            const barHeight = Math.max(mood * 18, 12);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-xl transition-all duration-500"
                  style={{
                    height: `${barHeight}px`,
                    background: moodData.color,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
                <span className="text-[10px] text-muted-foreground">{weekDays[i]}</span>
              </div>
            );
          })}
        </div>
        {/* Share weekly mood */}
        <div className="flex justify-end mt-3">
          <ShareMenu
            type="weekly"
            data={{ moods: weekMoods, avgMood: parseFloat(avgMood), totalEntries: entries.length }}
            label={t.share_week || "Share week"}
            className="text-xs"
          />
        </div>
      </div>

      {/* Month Pixel Grid */}
      <MonthPixelGrid entries={entries} />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border/50">
          <p className="text-2xl font-bold text-foreground">{avgMood}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{t.mood_avg}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border/50">
          <p className="text-2xl font-bold text-foreground">{entries.length}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{t.entries_total}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center shadow-sm border border-border/50">
          <MoodIcon value={5} color="#4ECDC4" size={28} />
          <p className="text-[10px] text-muted-foreground mt-1">{t.mood_best}</p>
        </div>
      </div>

      {/* Streak milestone share */}
      {streak >= 7 && (
        <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">🔥 {t.streak_milestone || "Streak Milestone"}</p>
            <p className="text-2xl font-bold text-foreground">{streak} {t.days_streak || "days"}</p>
          </div>
          <ShareMenu
            type="streak"
            data={{ streak }}
            label={t.share_streak || "Share"}
          />
        </div>
      )}

      {/* AI Weekly Summary */}
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50">
        <div className="flex items-center gap-2.5 mb-3">
          <img src={JU_STICKERS.goodjob} alt="Ju" className="w-8 h-8" />
          <p className="text-xs font-medium text-primary uppercase tracking-wider">{t.weekly_summary}</p>
        </div>
        {summaryLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing your week...</span>
          </div>
        ) : (
          <p className="text-sm text-foreground leading-relaxed">
            {aiSummary || (entries.length > 0 ? t.summary_has_entries : t.summary_no_entries)}
          </p>
        )}
      </div>

      {/* Ju Remembers — AI Memory Card */}
      <AiMemoryCard entries={entries} />

      {/* History lock for free users */}
      <HistoryLock onUpgrade={onUpgrade} plan={plan} trialStartedAt={trialStartedAt} />

      {/* Relationship map locked */}
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 text-center">
        <Lock className="w-8 h-8 mx-auto text-muted-foreground/40 mb-3" />
        <p className="font-serif text-lg font-semibold mb-1">{t.relationship_map}</p>
        <p className="text-sm text-muted-foreground mb-4">{t.rel_desc}</p>
        <button
          onClick={onUpgrade}
          className="px-5 py-2.5 rounded-2xl bg-primary/10 text-primary font-semibold text-sm transition-all active:scale-[0.97]"
        >
          {t.unlock_pro}
        </button>
      </div>
    </div>
  );
};

export default InsightsScreen;

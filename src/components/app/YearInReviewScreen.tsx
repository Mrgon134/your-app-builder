import React, { useMemo } from "react";
import { ArrowLeft, Share2, Trophy, Flame, BookOpen, TrendingUp } from "lucide-react";
import MoodIcon from "@/components/MoodIcon";
import { MOODS } from "@/lib/constants";
import { generateShareCard } from "@/lib/share-card";
import { toast } from "sonner";

interface Entry {
  mood: number;
  date: string;
  text: string;
}

interface YearInReviewScreenProps {
  entries: Entry[];
  streak: number;
  onBack: () => void;
}

const YearInReviewScreen: React.FC<YearInReviewScreenProps> = ({ entries, streak, onBack }) => {
  const year = new Date().getFullYear();

  const stats = useMemo(() => {
    const thisYear = entries.filter((e) => e.date?.startsWith(String(year)));
    if (thisYear.length === 0) return null;

    const avgMood = thisYear.reduce((s, e) => s + e.mood, 0) / thisYear.length;

    // Best month
    const byMonth: Record<number, number[]> = {};
    thisYear.forEach((e) => {
      const month = new Date(e.date).getMonth();
      if (!byMonth[month]) byMonth[month] = [];
      byMonth[month].push(e.mood);
    });
    let bestMonth = 0, bestAvg = 0;
    Object.entries(byMonth).forEach(([m, moods]) => {
      const avg = moods.reduce((a, b) => a + b, 0) / moods.length;
      if (avg > bestAvg) { bestAvg = avg; bestMonth = Number(m); }
    });

    // Mood distribution
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    thisYear.forEach((e) => { dist[e.mood] = (dist[e.mood] || 0) + 1; });

    // Monthly entry count for heatmap
    const monthCounts = Array.from({ length: 12 }, (_, m) => byMonth[m]?.length || 0);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return { total: thisYear.length, avgMood, bestMonth, bestAvg, dist, monthCounts, monthNames };
  }, [entries, year]);

  const handleShare = async () => {
    try {
      await generateShareCard("streak", { streak, year: String(year) } as any);
    } catch (e) {
      toast.error("Could not generate share card");
    }
  };

  return (
    <div className="animate-page-slide-in">
      <button onClick={onBack} className="flex items-center gap-1 text-primary mb-5 press-spring">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-[15px] font-medium">Back</span>
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[34px] font-bold text-foreground tracking-tight">{year}</h1>
          <p className="text-[15px] text-muted-foreground">Your Year in Review</p>
        </div>
        <button onClick={handleShare} className="flex items-center gap-1.5 px-3 h-9 rounded-xl bg-primary/10 text-primary text-[13px] font-medium press-spring">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
      </div>

      {!stats ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-[15px] text-muted-foreground">Start journaling to see your {year} in review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Hero stat */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-[64px] font-bold text-primary leading-none">{stats.total}</p>
            <p className="text-[15px] text-muted-foreground mt-1">journal entries in {year}</p>
            <p className="text-[13px] text-muted-foreground mt-0.5">That's {Math.round(stats.total / 365 * 100)}% of days journaled 🎉</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card rounded-2xl p-4 text-center">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-[22px] font-bold text-foreground">{stats.avgMood.toFixed(1)}</p>
              <p className="text-[11px] text-muted-foreground">Avg mood</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
              <p className="text-[22px] font-bold text-foreground">{streak}</p>
              <p className="text-[11px] text-muted-foreground">Day streak</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-[22px] font-bold text-foreground">{stats.monthNames[stats.bestMonth]}</p>
              <p className="text-[11px] text-muted-foreground">Best month</p>
            </div>
          </div>

          {/* Mood distribution */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-4">Mood Distribution</p>
            <div className="space-y-2.5">
              {MOODS.slice().reverse().map((mood) => {
                const count = stats.dist[mood.value] || 0;
                const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={mood.value} className="flex items-center gap-3">
                    <MoodIcon value={mood.value} color={mood.color} size={20} />
                    <div className="flex-1 h-5 bg-border/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                        style={{ width: `${Math.max(pct, pct > 0 ? 8 : 0)}%`, background: mood.color }}
                      >
                        {pct > 12 && <span className="text-white text-[10px] font-bold">{count}</span>}
                      </div>
                    </div>
                    <span className="text-[12px] text-muted-foreground w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly heatmap */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-4">Monthly Activity</p>
            <div className="grid grid-cols-6 gap-2">
              {stats.monthCounts.map((count, i) => {
                const intensity = Math.min(count / 20, 1);
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold"
                      style={{
                        background: count > 0 ? `hsl(var(--primary) / ${0.15 + intensity * 0.7})` : "hsl(var(--border) / 0.5)",
                        color: intensity > 0.5 ? "white" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {count || ""}
                    </div>
                    <span className="text-[9px] text-muted-foreground">{stats.monthNames[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational closing */}
          <div className="glass-card rounded-2xl p-5 text-center">
            <p className="text-[17px] font-semibold text-foreground mb-1">
              {stats.total >= 100 ? "You're a journaling champion 🏆" :
               stats.total >= 50 ? "Incredible consistency 🔥" :
               stats.total >= 20 ? "Great progress this year 💪" :
               "Every entry counts ✨"}
            </p>
            <p className="text-[13px] text-muted-foreground">
              {stats.total} moments captured. Keep going in {year + 1}.
            </p>
          </div>
        </div>
      )}

      <div className="h-8" />
    </div>
  );
};

export default YearInReviewScreen;

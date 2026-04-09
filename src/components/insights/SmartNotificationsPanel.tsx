"use client";

import React, { useMemo } from "react";
import { EntryRow } from "@/lib/api";
import { Lock, Zap, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { JU_STICKERS } from "@/lib/stickers";

interface SmartNotificationsPanelProps {
  entries: EntryRow[];
  onUpgrade: () => void;
  hasProAccess: boolean;
}

interface DetectedPattern {
  type: "emotion" | "activity" | "time" | "improvement";
  text: string;
  icon: React.ReactNode;
  confidence: number;
}

const SmartNotificationsPanel: React.FC<SmartNotificationsPanelProps> = ({
  entries,
  onUpgrade,
  hasProAccess,
}) => {
  const patterns = useMemo(() => {
    const detected: DetectedPattern[] = [];

    if (entries.length < 3) return detected;

    // Pattern 1: Stress trend
    const stressKeywords = [
      "stress",
      "anxious",
      "worried",
      "overwhelmed",
      "panic",
      "nervous",
      "afraid",
      "scared",
      "pressure",
    ];
    const recentEntries = entries.slice(0, 7);
    const stressMentions = recentEntries.filter((e) =>
      stressKeywords.some((w) => e.text.toLowerCase().includes(w))
    ).length;

    if (stressMentions >= 3) {
      const percentage = Math.round((stressMentions / recentEntries.length) * 100);
      detected.push({
        type: "emotion",
        text: `Stress mentions ↑ ${percentage}% (vs baseline)`,
        icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
        confidence: 0.85,
      });
    }

    // Pattern 2: Mood improvement
    if (entries.length >= 7) {
      const recentMoods = entries.slice(0, 3).map((e) => e.mood);
      const olderMoods = entries.slice(3, 7).map((e) => e.mood);
      const recentAvg =
        recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;
      const olderAvg =
        olderMoods.reduce((a, b) => a + b, 0) / olderMoods.length;

      if (recentAvg > olderAvg + 0.5 && recentAvg >= 3.2) {
        detected.push({
          type: "improvement",
          text: `Mood trending ↑ +${(recentAvg - olderAvg).toFixed(1)} pts`,
          icon: <TrendingUp className="w-4 h-4 text-green-500" />,
          confidence: 0.9,
        });
      }
    }

    // Pattern 3: Best day of week
    if (entries.length >= 5) {
      const dayScores: Record<number, number[]> = {};
      entries.forEach((e) => {
        const d = new Date(e.entry_date).getDay();
        if (!dayScores[d]) dayScores[d] = [];
        dayScores[d].push(e.mood);
      });

      let bestDayIdx = -1;
      let maxAvg = 0;
      Object.entries(dayScores).forEach(([dayStr, scores]) => {
        if (scores.length >= 2) {
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          if (avg > maxAvg) {
            maxAvg = avg;
            bestDayIdx = Number(dayStr);
          }
        }
      });

      if (bestDayIdx !== -1 && maxAvg >= 4) {
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        detected.push({
          type: "time",
          text: `${dayNames[bestDayIdx]}s are your best days (avg ${maxAvg.toFixed(1)}/5)`,
          icon: <Calendar className="w-4 h-4 text-blue-500" />,
          confidence: 0.8,
        });
      }
    }

    // Pattern 4: Activity correlation (detect mentions of exercise, sleep, etc.)
    const activityKeywords: Record<string, string[]> = {
      exercise: ["workout", "exercise", "gym", "run", "walk", "yoga", "train"],
      sleep: ["sleep", "slept", "rest", "tired", "exhausted", "nap"],
      social: ["friend", "family", "talk", "hangout", "meet", "party"],
      work: ["work", "project", "deadline", "office", "meeting", "boss"],
    };

    const activityMoods: Record<string, number[]> = {};
    entries.forEach((e) => {
      Object.entries(activityKeywords).forEach(([activity, keywords]) => {
        if (keywords.some((w) => e.text.toLowerCase().includes(w))) {
          if (!activityMoods[activity]) activityMoods[activity] = [];
          activityMoods[activity].push(e.mood);
        }
      });
    });

    // Find best activity correlation
    let bestActivity: { name: string; avgMood: number } | null = null;
    Object.entries(activityMoods).forEach(([activity, moods]) => {
      if (moods.length >= 2) {
        const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length;
        if (!bestActivity || avgMood > bestActivity.avgMood) {
          bestActivity = { name: activity, avgMood };
        }
      }
    });

    if (bestActivity && bestActivity.avgMood >= 4) {
      detected.push({
        type: "activity",
        text: `You feel better after ${bestActivity.name} (avg ${bestActivity.avgMood.toFixed(1)}/5)`,
        icon: <Zap className="w-4 h-4 text-yellow-500" />,
        confidence: 0.75,
      });
    }

    // Return top 3 patterns
    return detected
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  }, [entries]);

  // Pro gating
  if (!hasProAccess) {
    return (
      <div className="relative rounded-2xl overflow-hidden">
        <div className="glass-card rounded-2xl p-5 space-y-3 opacity-30 blur-[4px]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20" />
            <div className="text-[11px] font-semibold text-primary uppercase tracking-widest">
              Smart Notifications
            </div>
          </div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-4 bg-foreground/10 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/85 backdrop-blur-sm rounded-2xl gap-3">
          <Lock className="w-5 h-5 text-primary" />
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">
              Smart Notifications
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Detect patterns & get alerts
            </p>
          </div>
          <button
            onClick={onUpgrade}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-transform active:scale-95"
          >
            Start trial
          </button>
        </div>
      </div>
    );
  }

  // No patterns yet
  if (patterns.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-5 text-center">
        <img src={JU_STICKERS.goodjob} alt="Ju" className="w-8 h-8 mx-auto mb-2" />
        <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-2">
          Smart Notifications
        </p>
        <p className="text-[13px] text-muted-foreground">
          Keep writing and I'll detect your patterns
        </p>
      </div>
    );
  }

  // Display detected patterns
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2.5 mb-3">
        <img src={JU_STICKERS.goodjob} alt="Ju" className="w-8 h-8" />
        <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">
          Ju Noticed...
        </p>
      </div>

      {patterns.map((pattern, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 p-3 rounded-xl bg-foreground/3"
        >
          <div className="flex-shrink-0 mt-0.5">{pattern.icon}</div>
          <div className="flex-1">
            <p className="text-[14px] text-foreground leading-relaxed">
              {pattern.text}
            </p>
            {pattern.type === "time" && (
              <p className="text-[12px] text-muted-foreground mt-1">
                💡 Journal on these days for better insights
              </p>
            )}
            {pattern.type === "activity" && (
              <p className="text-[12px] text-muted-foreground mt-1">
                💡 Try this more often when you need a lift
              </p>
            )}
            {pattern.type === "emotion" && (
              <p className="text-[12px] text-muted-foreground mt-1">
                💡 Consider a quick meditation or talk to Ju
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="pt-2 border-t border-border/20 mt-4">
        <p className="text-[12px] text-muted-foreground">
          💡 These patterns update as you journal. Keep writing for more insights!
        </p>
      </div>
    </div>
  );
};

export default SmartNotificationsPanel;

import React from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { Lock } from "lucide-react";
import HistoryLock from "@/components/app/HistoryLock";

interface InsightsScreenProps {
  entries: Array<{ mood: number; date: string; text: string }>;
  onUpgrade: () => void;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ entries, onUpgrade }) => {
  const { t } = useLang();

  // Generate mock week data
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekMoods = entries.length > 0
    ? entries.slice(0, 7).map((e) => e.mood)
    : [3, 4, 3, 2, 4, 5, 4];

  const avgMood = weekMoods.length > 0
    ? (weekMoods.reduce((a, b) => a + b, 0) / weekMoods.length).toFixed(1)
    : "0";

  return (
    <div className="animate-fade-up space-y-4">
      <h1 className="font-serif text-2xl font-bold text-foreground mb-6">{t.mind_gallery}</h1>

      {/* Weekly mood wave */}
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">{t.weekly_mood}</p>
        <div className="flex items-end justify-between gap-1 h-24">
          {weekMoods.map((mood, i) => {
            const moodData = MOODS.find((m) => m.value === mood) || MOODS[2];
            const height = (mood / 5) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-xl transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    background: moodData.color,
                    opacity: 0.7,
                  }}
                />
                <span className="text-[10px] text-muted-foreground">{weekDays[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

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

      {/* Weekly summary */}
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">{t.weekly_summary}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {entries.length > 0 ? t.summary_has_entries : t.summary_no_entries}
        </p>
      </div>

      {/* Relationship map locked */}
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50 text-center">
        <Lock className="w-8 h-8 mx-auto text-muted-foreground/40 mb-3" />
        <p className="font-serif text-lg font-semibold mb-1">{t.relationship_map}</p>
        <p className="text-sm text-muted-foreground mb-4">{t.rel_desc}</p>
        <button className="px-5 py-2.5 rounded-2xl bg-primary/10 text-primary font-semibold text-sm transition-all active:scale-[0.97]">
          {t.unlock_pro}
        </button>
      </div>
    </div>
  );
};

export default InsightsScreen;

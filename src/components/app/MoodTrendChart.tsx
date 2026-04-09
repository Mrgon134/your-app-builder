import React from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import { EntryRow } from "@/lib/api";
import { getMoodHighlight } from "@/lib/mood-highlights";

interface MoodTrendChartProps {
  entries: EntryRow[];
}

const MoodTrendChart: React.FC<MoodTrendChartProps> = ({ entries }) => {
  const { t } = useLang();

  // Take up to 30 most recent entries, reverse so oldest first
  const data = entries.slice(0, 30).reverse();

  if (data.length < 2) {
    return (
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50 text-center">
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
          {t.mood_trend}
        </p>
        <p className="text-sm text-muted-foreground">
          {t.summary_no_entries}
        </p>
      </div>
    );
  }

  const W = 320;
  const H = 140;
  const padX = 20;
  const padTop = 16;
  const padBot = 24;
  const chartW = W - padX * 2;
  const chartH = H - padTop - padBot;

  const points = data.map((e, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padTop + chartH - ((e.mood - 1) / 4) * chartH;
    return { x, y, mood: e.mood };
  });

  // Build smooth curve path
  const linePath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpx = (prev.x + p.x) / 2;
      return `C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H - padBot} L ${points[0].x} ${H - padBot} Z`;

  // Stats
  const avgMood = (data.reduce((s, e) => s + e.mood, 0) / data.length).toFixed(1);
  const moodHighlight = getMoodHighlight(data, t);
  const highlightMoodData = MOODS.find((m) => m.value === moodHighlight.mood) || MOODS[2];

  return (
    <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50">
      <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">
        {t.mood_trend}
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 160 }}>
        <defs>
          <linearGradient id="mood-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(248 62% 64%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(248 62% 64%)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[1, 2, 3, 4, 5].map((v) => {
          const y = padTop + chartH - ((v - 1) / 4) * chartH;
          return (
            <line
              key={v}
              x1={padX}
              y1={y}
              x2={W - padX}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Gradient area */}
        <path d={areaPath} fill="url(#mood-gradient)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="hsl(248 62% 64%)" strokeWidth="2" strokeLinecap="round" />

        {/* Dots */}
        {points.map((p, i) => {
          const moodData = MOODS.find((m) => m.value === p.mood) || MOODS[2];
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3.5}
              fill={moodData.color}
              stroke="hsl(var(--card))"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{avgMood}</p>
          <p className="text-[10px] text-muted-foreground">{t.mood_avg}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{data.length}</p>
          <p className="text-[10px] text-muted-foreground">{t.entries_total}</p>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="w-5 h-5 rounded-full" style={{ background: highlightMoodData.color }} />
          <p className="text-[10px] text-muted-foreground mt-1">{moodHighlight.label}</p>
        </div>
      </div>
    </div>
  );
};

export default MoodTrendChart;

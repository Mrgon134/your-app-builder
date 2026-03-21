import React from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";

interface MonthPixelGridProps {
  entries: Array<{ mood: number; date: string }>;
}

const MonthPixelGrid: React.FC<MonthPixelGridProps> = ({ entries }) => {
  const { t } = useLang();

  // Build a map of date → mood for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const moodMap = new Map<number, number>();
  entries.forEach((e) => {
    const d = new Date(e.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      moodMap.set(d.getDate(), e.mood);
    }
  });

  // First day of month (0=Sun)
  const firstDow = new Date(year, month, 1).getDay();
  // Shift so Monday=0
  const offset = firstDow === 0 ? 6 : firstDow - 1;

  const cells: Array<{ day: number | null; mood: number | null }> = [];
  // Empty cells before first day
  for (let i = 0; i < offset; i++) cells.push({ day: null, mood: null });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, mood: moodMap.get(d) ?? null });
  }

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="bg-card rounded-3xl p-5 shadow-sm border border-border/50">
      <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">
        {t.month_glance}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {dayLabels.map((label, i) => (
          <div key={i} className="text-center text-[9px] text-muted-foreground font-medium">
            {label}
          </div>
        ))}
      </div>

      {/* Pixel grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell, i) => {
          if (cell.day === null) {
            return <div key={i} className="aspect-square" />;
          }

          const moodData = cell.mood ? MOODS.find((m) => m.value === cell.mood) : null;
          const isToday = cell.day === now.getDate();

          return (
            <div
              key={i}
              className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-medium transition-all ${
                isToday ? "ring-1.5 ring-primary ring-offset-1 ring-offset-card" : ""
              }`}
              style={{
                background: moodData ? moodData.color : "hsl(var(--muted))",
                opacity: moodData ? 0.85 : 0.3,
              }}
              title={`Day ${cell.day}${moodData ? ` — ${moodData.label}` : ""}`}
            >
              <span
                className={moodData ? "text-white/90 drop-shadow-sm" : "text-muted-foreground"}
                style={{ fontSize: "9px" }}
              >
                {cell.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {MOODS.map((m) => (
          <div key={m.value} className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: m.color }} />
            <span className="text-[9px] text-muted-foreground">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPixelGrid;

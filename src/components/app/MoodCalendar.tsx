import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type EntryRow } from "@/lib/api";
import { MOODS } from "@/lib/constants";

interface MoodCalendarProps {
  entries: EntryRow[];
  onDayClick?: (entry: EntryRow) => void;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ entries, onDayClick }) => {
  const [monthOffset, setMonthOffset] = useState(0);

  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday

  // Map entries by date string for quick lookup
  const entryMap = useMemo(() => {
    const map: Record<string, EntryRow> = {};
    entries.forEach((e) => {
      const d = new Date(e.entry_date);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      // Keep latest entry for each day
      if (!map[key] || new Date(e.created_at) > new Date(map[key].created_at)) {
        map[key] = e;
      }
    });
    return map;
  }, [entries]);

  const isToday = (day: number) => {
    return year === now.getFullYear() && month === now.getMonth() && day === now.getDate();
  };

  const isFuture = (day: number) => {
    return new Date(year, month, day) > now;
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  // Create grid cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-2xl p-5" style={{
      background: "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(168,85,247,0.03) 100%)",
      border: "1px solid rgba(99,102,241,0.1)",
    }}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonthOffset((o) => o - 1)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all press-spring"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-[14px] font-semibold text-foreground">{monthLabel}</p>
        <button
          onClick={() => setMonthOffset((o) => Math.min(o + 1, 0))}
          disabled={monthOffset >= 0}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all press-spring disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-semibold text-muted-foreground/50 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} className="aspect-square" />;
          }

          const key = `${year}-${month}-${day}`;
          const entry = entryMap[key];
          const moodData = entry ? MOODS.find((m) => m.value === entry.mood) : null;
          const future = isFuture(day);
          const today = isToday(day);

          return (
            <motion.button
              key={i}
              whileTap={entry ? { scale: 0.85 } : {}}
              onClick={() => entry && onDayClick?.(entry)}
              disabled={!entry}
              className="aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all"
              style={{
                background: entry
                  ? `${moodData?.color || "#7C6EDB"}15`
                  : "transparent",
              }}
            >
              {/* Day number */}
              <span
                className="text-[11px] font-medium"
                style={{
                  color: today
                    ? "hsl(var(--primary))"
                    : future
                    ? "hsl(var(--muted-foreground)/0.25)"
                    : entry
                    ? moodData?.color
                    : "hsl(var(--muted-foreground)/0.5)",
                }}
              >
                {day}
              </span>

              {/* Mood dot */}
              {entry && (
                <div
                  className="w-[6px] h-[6px] rounded-full mt-0.5"
                  style={{ background: moodData?.color || "#7C6EDB" }}
                />
              )}

              {/* Today indicator ring */}
              {today && (
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ border: "1.5px solid hsl(var(--primary)/0.4)" }}
                />
              )}

              {/* Empty day (past, no entry) — subtle hollow dot */}
              {!entry && !future && !today && (
                <div className="w-[4px] h-[4px] rounded-full mt-0.5 bg-foreground/[0.06]" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {MOODS.map((mood) => (
          <div key={mood.value} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: mood.color }} />
            <span className="text-[9px] text-muted-foreground font-medium">{mood.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodCalendar;

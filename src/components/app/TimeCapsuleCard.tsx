import React, { useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import { EntryRow } from "@/lib/api";
import { History, Quote } from "lucide-react";
import MoodIcon from "@/components/MoodIcon";

interface TimeCapsuleCardProps {
  entries: EntryRow[];
  onClick: (entry: EntryRow) => void;
}

const TimeCapsuleCard: React.FC<TimeCapsuleCardProps> = ({ entries, onClick }) => {
  const { t, lang } = useLang();

  // Find an entry from deeply in the past (e.g. 7 days, 30 days, or 1 year +- 1 day)
  const capsuleEntry = useMemo(() => {
    if (!entries || entries.length === 0) return null;
    
    const now = Date.now();
    const DAY_MS = 86400000;
    
    // Look for major milestones in order of priority
    const milestones = [
      { label: "1 year", days: 365 },
      { label: "1 month", days: 30 },
      { label: "1 week", days: 7 }
    ];

    for (const milestone of milestones) {
      const targetTime = now - (milestone.days * DAY_MS);
      // Find an entry within a 48 hour window of that milestone
      const entry = entries.find(e => {
        const entryTime = new Date(e.entry_date).getTime();
        return Math.abs(entryTime - targetTime) <= DAY_MS * 1.5;
      });
      
      if (entry && entry.text && entry.text.length > 10) {
        return { entry, milestone: milestone.label, days: milestone.days };
      }
    }
    
    return null;
  }, [entries]);

  if (!capsuleEntry) return null;

  const { entry, milestone } = capsuleEntry;
  const moodData = MOODS.find(m => m.value === entry.mood);
  
  // Truncate text beautifully
  const previewText = entry.text!.slice(0, 80) + (entry.text!.length > 80 ? "..." : "");

  return (
    <button 
      onClick={() => onClick(entry)}
      className="w-full text-left glass-card rounded-3xl p-5 mb-5 overflow-hidden relative group press-spring"
    >
      {/* Soft gradient background tied to mood */}
      <div 
        className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-15"
        style={{ background: `linear-gradient(135deg, ${moodData?.color || "var(--primary)"}, transparent)` }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary animate-pulse-scale" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {t.time_capsule || "Echoes of the Past"}
            </p>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground bg-foreground/[0.04] px-2 py-0.5 rounded-full">
            {milestone} ago
          </span>
        </div>

        <div className="flex gap-3 items-start">
          <div className="mt-1">
            <Quote className="w-6 h-6 text-muted-foreground/30" />
          </div>
          <p className="text-[14px] text-foreground font-medium leading-relaxed italic pr-2">
            "{previewText}"
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 opacity-80">
             <div className="w-1.5 h-1.5 rounded-full" style={{ background: moodData?.color || "hsl(var(--primary))" }} />
             <span className="text-[11px] font-medium text-muted-foreground">
               {moodData?.label || "Mood"}
             </span>
          </div>
          <span className="text-[11px] text-primary font-medium group-hover:underline underline-offset-2">
            {t.read_entry || "Read to reflect"} &rarr;
          </span>
        </div>
      </div>
    </button>
  );
};

export default TimeCapsuleCard;

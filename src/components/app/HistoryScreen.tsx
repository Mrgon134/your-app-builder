'use client';

import React, { useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { EntryRow } from "@/lib/api";
import { motion } from "framer-motion";
import { Mic, Camera, MapPin, Calendar } from "lucide-react";
import EntryDetailModal from "@/components/app/EntryDetailModal";

interface HistoryScreenProps {
  entries: EntryRow[];
  onNavigate: (screen: string) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ entries, onNavigate }) => {
  const { t, lang } = useLang();
  const [selectedEntry, setSelectedEntry] = React.useState<EntryRow | null>(null);

  // Group entries by month for better organization
  const groupedEntries = useMemo(() => {
    const grouped: Record<string, EntryRow[]> = {};

    entries.forEach((entry) => {
      const date = new Date(entry.entry_date);
      const monthKey = date.toLocaleDateString(lang || "en", { year: "numeric", month: "long" });
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(entry);
    });

    return grouped;
  }, [entries, lang]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang || "en", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8"
      >
        <p className="text-muted-foreground text-center">{t.no_entries || "No entries yet. Start journaling to build your history!"}</p>
        <button
          onClick={() => onNavigate("journal")}
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          {t.write || "Write"}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t.history_label || "Your History"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {entries.length} {entries.length === 1 ? "entry" : "entries"} total
        </p>

        <div className="space-y-8">
          {Object.entries(groupedEntries).map(([monthKey, monthEntries]) => (
            <motion.div
              key={monthKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-3 px-0.5">
                {monthKey}
              </h2>
              <div className="glass-card rounded-2xl overflow-hidden">
                {monthEntries.map((entry, idx) => {
                  const moodData = MOODS.find((m) => m.value === entry.mood);
                  const textPreview = (entry.text || entry.prompt_text || "").substring(0, 60);

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedEntry(entry)}
                      className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors press-spring"
                      style={idx > 0 ? { boxShadow: "inset 0 0.5px 0 hsl(var(--border)/0.5)" } : {}}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <MoodIcon value={entry.mood} size={20} color={moodData?.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {textPreview || "(No text)"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(entry.entry_date)}
                          </span>
                          {entry.audio_url && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                              <Mic className="w-2.5 h-2.5" />
                            </span>
                          )}
                          {entry.photo_url && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600">
                              <Camera className="w-2.5 h-2.5" />
                            </span>
                          )}
                          {entry.location_lat != null && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500">
                              <MapPin className="w-2.5 h-2.5" />
                            </span>
                          )}
                          {entry.capture_type === "calendar" && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                              <Calendar className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-2"
                        style={{ background: moodData?.color ?? "#7C6EDB" }}
                        title={moodData?.label}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </motion.div>
  );
};

export default HistoryScreen;

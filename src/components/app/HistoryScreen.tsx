'use client';

import React, { useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { EntryRow } from "@/lib/api";
import { motion } from "framer-motion";
import { Mic, Camera, MapPin, Calendar, Lock, Sparkles } from "lucide-react";
import EntryDetailModal from "@/components/app/EntryDetailModal";
import { hasPlusAccess } from "@/lib/trial";

interface HistoryScreenProps {
  entries: EntryRow[];
  onNavigate: (screen: string) => void;
  onUpgrade?: () => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const FREE_HISTORY_DAYS = 7;

const HistoryScreen: React.FC<HistoryScreenProps> = ({
  entries,
  onNavigate,
  onUpgrade,
  plan = "free",
  trialStartedAt = null,
}) => {
  const { t, lang } = useLang();
  const [selectedEntry, setSelectedEntry] = React.useState<EntryRow | null>(null);
  const hasUnlockedHistory = hasPlusAccess(plan, trialStartedAt);

  const visibleEntries = useMemo(() => {
    if (hasUnlockedHistory) return entries;
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - (FREE_HISTORY_DAYS - 1));

    return entries.filter((entry) => {
      const entryDate = new Date(entry.entry_date);
      return entryDate >= cutoff;
    });
  }, [entries, hasUnlockedHistory]);

  const hiddenCount = Math.max(0, entries.length - visibleEntries.length);

  // Group entries by month for better organization
  const groupedEntries = useMemo(() => {
    const grouped: Record<string, EntryRow[]> = {};

    visibleEntries.forEach((entry) => {
      const date = new Date(entry.entry_date);
      const monthKey = date.toLocaleDateString(lang || "en", { year: "numeric", month: "long" });
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(entry);
    });

    return grouped;
  }, [lang, visibleEntries]);

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

  if (visibleEntries.length === 0 && !hasUnlockedHistory) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <p className="text-foreground font-semibold text-center">
          {t.history_locked || "Full history locked"}
        </p>
        <p className="text-muted-foreground text-center mt-2 max-w-[280px]">
          {t.history_locked_desc || "Free plan shows 7 days. Upgrade to see all your entries."}
        </p>
        {onUpgrade && (
          <button
            onClick={onUpgrade}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            {t.unlock_plus || t.unlock_ju || "Unlock with Plus"}
          </button>
        )}
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
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">{t.history_label || "Your History"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {visibleEntries.length} {visibleEntries.length === 1 ? "entry" : "entries"} visible
        </p>

        {!hasUnlockedHistory && hiddenCount > 0 && (
          <div className="mb-6 rounded-2xl border border-primary/15 bg-primary/6 px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {t.history_locked || "Full history locked"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.history_locked_desc || "Free plan shows 7 days. Upgrade to see all your entries."}
                </p>
              </div>
              {onUpgrade && (
                <button
                  onClick={onUpgrade}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold transition-transform active:scale-[0.98]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.upgrade || "Upgrade"}
                </button>
              )}
            </div>
          </div>
        )}

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

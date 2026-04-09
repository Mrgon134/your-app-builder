import { type EntryRow } from "@/lib/api";

export interface MoodHighlight {
  label: string;
  mood: number;
  tone: "positive" | "neutral" | "negative";
}

export function getMoodHighlight(
  entries: EntryRow[],
  t: Record<string, string>
): MoodHighlight {
  if (entries.length === 0) {
    return {
      label: t.mood_best || "Best day",
      mood: 3,
      tone: "neutral",
    };
  }

  const highestMood = entries.reduce((max, entry) => Math.max(max, entry.mood), 1);
  const avgMood = entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length;

  if (highestMood >= 4) {
    return {
      label: t.mood_best || "Best day",
      mood: highestMood,
      tone: "positive",
    };
  }

  if (highestMood >= 3 && avgMood >= 2.5) {
    return {
      label: t.mood_steady_day || "Steady day",
      mood: 3,
      tone: "neutral",
    };
  }

  return {
    label: t.mood_tough_day || "Tough day",
    mood: Math.max(1, Math.min(2, Math.round(avgMood) || 1)),
    tone: "negative",
  };
}

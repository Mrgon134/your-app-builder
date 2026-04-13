// Weekly Review — data aggregation for "Your week in review" card
// Inspired by Rosebud weekly review + Day One "On This Day"

import { type EntryRow } from "@/lib/api";
import { MOODS } from "@/lib/constants";

const STORAGE_KEY = "nuju-weekly-review-dismissed";

export interface WeeklyReview {
  weekStart: string;
  weekEnd: string;
  entryCount: number;
  moodTrend: "up" | "down" | "stable";
  avgMood: number;
  topMood: { label: string; color: string; count: number } | null;
  topActivities: string[];
  gratitudeCount: number;
}

function getWeekBounds(): { start: Date; end: Date } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const start = new Date(now);
  start.setDate(now.getDate() - day - 7); // Last Sunday
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Last Saturday
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function shouldShowWeeklyReview(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday
  if (day !== 0 && day !== 1) return false; // Only show on Sun/Mon

  const { start } = getWeekBounds();
  const weekKey = start.toISOString().split("T")[0];

  try {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed === weekKey) return false;
  } catch {}

  return true;
}

export function dismissWeeklyReview() {
  const { start } = getWeekBounds();
  const weekKey = start.toISOString().split("T")[0];
  localStorage.setItem(STORAGE_KEY, weekKey);
}

export function generateWeeklyReview(entries: EntryRow[]): WeeklyReview | null {
  const { start, end } = getWeekBounds();

  const weekEntries = entries.filter((e) => {
    const d = new Date(e.entry_date);
    return d >= start && d <= end;
  });

  if (weekEntries.length === 0) return null;

  // Mood count
  const moodCounts: Record<number, number> = {};
  let moodSum = 0;
  weekEntries.forEach((e) => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    moodSum += e.mood;
  });
  const avgMood = moodSum / weekEntries.length;

  // Top mood
  const topMoodEntry = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  const topMoodData = topMoodEntry ? MOODS.find((m) => m.value === Number(topMoodEntry[0])) : null;
  const topMood = topMoodData
    ? { label: topMoodData.label, color: topMoodData.color, count: Number(topMoodEntry[1]) }
    : null;

  // Mood trend (compare first half vs second half of week)
  // Sort oldest→newest first so firstHalf = start of week, secondHalf = end of week
  const chronological = [...weekEntries].sort(
    (a, b) => new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime()
  );
  const mid = Math.floor(chronological.length / 2) || 1;
  const firstHalf = chronological.slice(0, mid);
  const secondHalf = chronological.slice(mid);
  const firstAvg = firstHalf.reduce((s, e) => s + e.mood, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((s, e) => s + e.mood, 0) / secondHalf.length;
  const moodTrend: "up" | "down" | "stable" =
    secondAvg - firstAvg > 0.3 ? "up" : firstAvg - secondAvg > 0.3 ? "down" : "stable";

  // Top activities (from entries that have activities field)
  const activityCounts: Record<string, number> = {};
  weekEntries.forEach((e) => {
    if ((e as any).activities) {
      const acts = (e as any).activities as string[];
      acts.forEach((a) => { activityCounts[a] = (activityCounts[a] || 0) + 1; });
    }
  });
  const topActivities = Object.entries(activityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);

  // Gratitude count
  let gratitudeCount = 0;
  try {
    const gratRaw = localStorage.getItem("nuju-gratitude");
    if (gratRaw) {
      const gratData = JSON.parse(gratRaw);
      Object.keys(gratData).forEach((dateKey) => {
        const d = new Date(dateKey);
        if (d >= start && d <= end) gratitudeCount++;
      });
    }
  } catch {}

  return {
    weekStart: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weekEnd: end.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    entryCount: weekEntries.length,
    moodTrend,
    avgMood: Math.round(avgMood * 10) / 10,
    topMood,
    topActivities,
    gratitudeCount,
  };
}

// Daily Ritual — Morning Intention + Evening Reflection
// Inspired by 5 Minute Journal + Rosebud (4.9★)
// The #1 proven pattern for 2x daily retention

const STORAGE_KEY = "nuju-daily-ritual";

export type RitualType = "morning" | "evening";

export interface MorningRitual {
  type: "morning";
  date: string; // YYYY-MM-DD
  gratitude: string[]; // 3 items
  intention: string; // "What will I make great today?"
  savedAt: string;
}

export interface EveningRitual {
  type: "evening";
  date: string;
  highlight: string; // "Best thing that happened today"
  learned: string; // "What did I learn?"
  savedAt: string;
}

export type DailyRitual = MorningRitual | EveningRitual;

interface DailyRitualStore {
  [date: string]: {
    morning?: MorningRitual;
    evening?: EveningRitual;
  };
}

function loadStore(): DailyRitualStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStore(store: DailyRitualStore) {
  // Keep last 90 days only
  const entries = Object.entries(store);
  if (entries.length > 90) {
    const sorted = entries.sort((a, b) => b[0].localeCompare(a[0]));
    const trimmed = Object.fromEntries(sorted.slice(0, 90));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

/** Determine which ritual to show based on time of day */
export function getCurrentRitualType(): RitualType {
  const hour = new Date().getHours();
  // Morning: 4am - 2pm, Evening: 2pm - 4am
  return hour >= 4 && hour < 14 ? "morning" : "evening";
}

/** Get today's rituals */
export function getTodayRituals(): { morning?: MorningRitual; evening?: EveningRitual } {
  const store = loadStore();
  return store[getToday()] || {};
}

/** Save morning ritual */
export function saveMorningRitual(gratitude: string[], intention: string): MorningRitual {
  const store = loadStore();
  const today = getToday();
  if (!store[today]) store[today] = {};

  const ritual: MorningRitual = {
    type: "morning",
    date: today,
    gratitude: gratitude.filter(g => g.trim().length > 0).slice(0, 3),
    intention: intention.trim(),
    savedAt: new Date().toISOString(),
  };

  store[today].morning = ritual;
  saveStore(store);
  return ritual;
}

/** Save evening ritual */
export function saveEveningRitual(highlight: string, learned: string): EveningRitual {
  const store = loadStore();
  const today = getToday();
  if (!store[today]) store[today] = {};

  const ritual: EveningRitual = {
    type: "evening",
    date: today,
    highlight: highlight.trim(),
    learned: learned.trim(),
    savedAt: new Date().toISOString(),
  };

  store[today].evening = ritual;
  saveStore(store);
  return ritual;
}

/** Get ritual completion streak */
export function getRitualStreak(): number {
  const store = loadStore();
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const day = store[dateStr];

    if (day && (day.morning || day.evening)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

/** Get recent ritual data for insights */
export function getRecentRituals(limit = 7): { date: string; morning?: MorningRitual; evening?: EveningRitual }[] {
  const store = loadStore();
  return Object.entries(store)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, limit)
    .map(([date, rituals]) => ({ date, ...rituals }));
}

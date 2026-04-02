// Daily Gratitude — inspired by Gratitude app (4.9★)
// "3 things you're thankful for" — proven to increase happiness by 25% in 10 weeks

const STORAGE_KEY = "nuju-gratitude";

export interface GratitudeEntry {
  date: string; // YYYY-MM-DD
  items: string[]; // up to 3
  savedAt: string; // ISO
}

function loadAll(): GratitudeEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(entries: GratitudeEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getTodayGratitude(): GratitudeEntry | null {
  const today = new Date().toISOString().split("T")[0];
  return loadAll().find((e) => e.date === today) || null;
}

export function saveGratitude(items: string[]): GratitudeEntry {
  const all = loadAll();
  const today = new Date().toISOString().split("T")[0];
  const existing = all.findIndex((e) => e.date === today);

  const entry: GratitudeEntry = {
    date: today,
    items: items.filter((i) => i.trim().length > 0).slice(0, 3),
    savedAt: new Date().toISOString(),
  };

  if (existing >= 0) {
    all[existing] = entry;
  } else {
    all.unshift(entry);
  }

  // Keep max 90 days
  saveAll(all.slice(0, 90));
  return entry;
}

export function getGratitudeStreak(): number {
  const all = loadAll();
  if (all.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    
    if (all.some((e) => e.date === dateStr && e.items.length > 0)) {
      streak++;
    } else if (i > 0) {
      break; // streak broken
    }
  }

  return streak;
}

export function getRecentGratitude(limit = 7): GratitudeEntry[] {
  return loadAll().slice(0, limit);
}

export function getGratitudeWordFrequency(): { word: string; count: number }[] {
  const all = loadAll();
  const freq: Record<string, number> = {};

  all.forEach((entry) => {
    entry.items.forEach((item) => {
      const words = item.toLowerCase().split(/\s+/);
      words.forEach((w) => {
        if (w.length > 3) {
          freq[w] = (freq[w] || 0) + 1;
        }
      });
    });
  });

  return Object.entries(freq)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

// Achievement & milestone system for emotional retention
// Inspired by Daylio badges + 365 Gratitude medallions

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  unlockedAt?: string; // ISO date
  condition: (ctx: AchievementContext) => boolean;
}

export interface AchievementContext {
  totalEntries: number;
  streak: number;
  currentMood: number;
  hour: number; // 0-23
  consecutiveDays5Mood: number;
  hasUsedVoice: boolean;
  hasUsedCoach: boolean;
}

const STORAGE_KEY = "nuju-achievements";

export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, "unlockedAt">[] = [
  {
    id: "first_entry",
    title: "First Step 🌱",
    description: "You wrote your very first journal entry.",
    icon: "🌱",
    condition: (ctx) => ctx.totalEntries >= 1,
  },
  {
    id: "streak_3",
    title: "On Fire 🔥",
    description: "3 days in a row. You're building something real.",
    icon: "🔥",
    condition: (ctx) => ctx.streak >= 3,
  },
  {
    id: "streak_7",
    title: "Week Warrior ⚡",
    description: "7-day streak! Consistency is a superpower.",
    icon: "⚡",
    condition: (ctx) => ctx.streak >= 7,
  },
  {
    id: "streak_30",
    title: "Monthly Legend 👑",
    description: "30 days. You've made journaling a part of who you are.",
    icon: "👑",
    condition: (ctx) => ctx.streak >= 30,
  },
  {
    id: "entries_10",
    title: "Storyteller 📖",
    description: "10 entries — your journal is starting to tell a story.",
    icon: "📖",
    condition: (ctx) => ctx.totalEntries >= 10,
  },
  {
    id: "entries_50",
    title: "Deep Diver 🌊",
    description: "50 entries. Ju knows you deeply now.",
    icon: "🌊",
    condition: (ctx) => ctx.totalEntries >= 50,
  },
  {
    id: "entries_100",
    title: "Century Club 💎",
    description: "100 entries. You're in the top 1% of journalers.",
    icon: "💎",
    condition: (ctx) => ctx.totalEntries >= 100,
  },
  {
    id: "night_owl",
    title: "Night Owl 🦉",
    description: "You journaled past midnight. Some thoughts need the quiet.",
    icon: "🦉",
    condition: (ctx) => ctx.hour >= 0 && ctx.hour < 5 && ctx.totalEntries >= 1,
  },
  {
    id: "early_bird",
    title: "Early Bird 🐦",
    description: "Journaling before 7am. Starting the day with intention.",
    icon: "🐦",
    condition: (ctx) => ctx.hour >= 5 && ctx.hour < 7 && ctx.totalEntries >= 1,
  },
  {
    id: "joy_streak",
    title: "Joy Wave 🌈",
    description: "3 consecutive days of feeling Great. Something wonderful is happening.",
    icon: "🌈",
    condition: (ctx) => ctx.consecutiveDays5Mood >= 3,
  },
  {
    id: "voice_first",
    title: "Voice Unlocked 🎙️",
    description: "You used your voice to journal for the first time.",
    icon: "🎙️",
    condition: (ctx) => ctx.hasUsedVoice,
  },
  {
    id: "coach_first",
    title: "Asked for Help 💬",
    description: "You talked to Ju. That takes courage.",
    icon: "💬",
    condition: (ctx) => ctx.hasUsedCoach,
  },
];

export function getUnlockedAchievements(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function checkAndUnlockAchievements(
  ctx: AchievementContext
): Achievement | null {
  const unlocked = getUnlockedAchievements();
  
  for (const def of ACHIEVEMENT_DEFINITIONS) {
    if (unlocked[def.id]) continue; // already unlocked
    
    if (def.condition(ctx)) {
      // Unlock it!
      unlocked[def.id] = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
      return { ...def, unlockedAt: unlocked[def.id] };
    }
  }
  
  return null; // no new achievement
}

export function getAllAchievementsWithStatus(): (Achievement & { locked: boolean })[] {
  const unlocked = getUnlockedAchievements();
  
  return ACHIEVEMENT_DEFINITIONS.map((def) => ({
    ...def,
    unlockedAt: unlocked[def.id] || undefined,
    locked: !unlocked[def.id],
  }));
}

export function getUnlockedCount(): number {
  return Object.keys(getUnlockedAchievements()).length;
}

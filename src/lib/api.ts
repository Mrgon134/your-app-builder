import { supabase } from "@/integrations/supabase/client";

export interface EntryRow {
  id: string;
  mood: number;
  text_content: string;
  energy_level: number | null;
  entry_date: string;
  created_at: string;
}

export interface StreakRow {
  current_streak: number;
  longest_streak: number;
  last_entry_date: string | null;
}

export const fetchEntries = async (userId: string): Promise<EntryRow[]> => {
  const { data, error } = await supabase
    .from("entries")
    .select("id, mood, text_content, energy_level, entry_date, created_at")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createEntry = async (
  userId: string,
  mood: number,
  text: string,
  energyLevel: number
): Promise<EntryRow> => {
  const { data, error } = await supabase
    .from("entries")
    .insert({
      user_id: userId,
      mood,
      text_content: text,
      energy_level: energyLevel,
    })
    .select("id, mood, text_content, energy_level, entry_date, created_at")
    .single();
  if (error) throw error;
  return data;
};

export const fetchStreak = async (userId: string): Promise<StreakRow | null> => {
  const { data, error } = await supabase
    .from("streaks")
    .select("current_streak, longest_streak, last_entry_date")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const updateStreak = async (userId: string): Promise<StreakRow> => {
  const streak = await fetchStreak(userId);
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  let currentStreak = 1;
  let longestStreak = streak?.longest_streak || 0;

  if (streak?.last_entry_date === today) {
    // Already logged today
    return streak;
  } else if (streak?.last_entry_date === yesterday) {
    currentStreak = (streak.current_streak || 0) + 1;
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  const { data, error } = await supabase
    .from("streaks")
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_entry_date: today,
    })
    .eq("user_id", userId)
    .select("current_streak, longest_streak, last_entry_date")
    .single();
  if (error) throw error;
  return data;
};

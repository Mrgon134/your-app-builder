import { supabase } from "@/integrations/supabase/client";

// Types matching the new spec schema
export interface EntryRow {
  id: string;
  mood: number;
  text: string;
  energy: number | null;
  entry_date: string;
  created_at: string;
}

export interface ProfileRow {
  id: string;
  display_name: string | null;
  language: string | null;
  plan: string | null;
  streak_current: number;
  streak_longest: number;
  streak_last_date: string | null;
  total_entries: number;
  coach_persona: string | null;
  onboarded: boolean | null;
}

// Fetch user profile
export const fetchProfile = async (userId: string): Promise<ProfileRow | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, language, plan, streak_current, streak_longest, streak_last_date, total_entries, coach_persona, onboarded")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

// Fetch entries
export const fetchEntries = async (userId: string): Promise<EntryRow[]> => {
  const { data, error } = await supabase
    .from("entries")
    .select("id, mood, text, energy, entry_date, created_at")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false });
  if (error) throw error;
  return data || [];
};

// Check entry limit (free = 3/week)
export const checkEntryLimit = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc("check_entry_limit", { p_user_id: userId });
  if (error) throw error;
  return data as boolean;
};

// Create entry + update streak
export const createEntry = async (
  userId: string,
  mood: number,
  text: string,
  energy: number,
  promptText?: string
): Promise<EntryRow> => {
  const { data, error } = await supabase
    .from("entries")
    .insert({
      user_id: userId,
      mood,
      text,
      energy,
      prompt_text: promptText || null,
    })
    .select("id, mood, text, energy, entry_date, created_at")
    .single();
  if (error) throw error;

  // Update streak via DB function
  await supabase.rpc("update_streak", { p_user_id: userId });

  return data;
};

// Update profile
export const updateProfile = async (userId: string, updates: Partial<ProfileRow>) => {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  if (error) throw error;
};

// Add to waitlist
export const addToWaitlist = async (email: string, source = "landing") => {
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source });
  if (error && error.code === "23505") return { alreadyExists: true };
  if (error) throw error;
  return { alreadyExists: false };
};

// Save coach message
export const saveCoachMessage = async (
  userId: string,
  role: "user" | "assistant",
  content: string,
  persona: string
) => {
  const { error } = await supabase
    .from("coach_messages")
    .insert({ user_id: userId, role, content, persona });
  if (error) throw error;
};

// Fetch coach messages
export const fetchCoachMessages = async (userId: string, limit = 50) => {
  const { data, error } = await supabase
    .from("coach_messages")
    .select("role, content, persona, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data || [];
};

// Check coach message limit (free = 5/week)
export const checkCoachLimit = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc("check_coach_limit", { p_user_id: userId });
  if (error) throw error;
  return data as boolean;
};

// Count coach messages sent this week (user messages only)
export const countCoachMessagesThisWeek = async (userId: string): Promise<number> => {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("coach_messages")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("role", "user")
    .gte("created_at", weekStart.toISOString());
  if (error) throw error;
  return count || 0;
};

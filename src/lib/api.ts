import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

// Types matching the new spec schema
export interface EntryRow {
  id: string;
  mood: number;
  text: string;
  energy: number | null;
  prompt_text: string | null;
  entry_date: string;
  created_at: string;
  ai_summary: string | null;
  audio_url: string | null;
  transcript_segments: { start: number; end: number; text: string }[] | null;
  photo_url: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_name: string | null;
  capture_type: string | null;
}

type TranscriptSegment = EntryRow["transcript_segments"] extends (infer T)[] | null ? T : never;
type JournalMediaBucket = "voice-entries" | "photo-entries";

const SIGNED_MEDIA_URL_TTL_SECONDS = 60 * 60;

const storagePathFromUrl = (value: string | null, bucket: JournalMediaBucket): string | null => {
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) return value;

  try {
    const url = new URL(value);
    const markers = [
      `/storage/v1/object/public/${bucket}/`,
      `/storage/v1/object/sign/${bucket}/`,
    ];
    const marker = markers.find((candidate) => url.pathname.includes(candidate));
    if (!marker) return value;
    const [, path] = url.pathname.split(marker);
    return path ? decodeURIComponent(path) : value;
  } catch {
    return value;
  }
};

export const getSignedMediaUrl = async (
  bucket: JournalMediaBucket,
  pathOrUrl: string | null
): Promise<string | null> => {
  const path = storagePathFromUrl(pathOrUrl, bucket);
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_MEDIA_URL_TTL_SECONDS);

  if (error) {
    console.error(`Failed to sign ${bucket} media URL:`, error);
    return null;
  }

  return data.signedUrl;
};

const hydrateEntryMediaUrls = async (entry: EntryRow): Promise<EntryRow> => {
  const [audioUrl, photoUrl] = await Promise.all([
    getSignedMediaUrl("voice-entries", entry.audio_url),
    getSignedMediaUrl("photo-entries", entry.photo_url),
  ]);

  return {
    ...entry,
    audio_url: audioUrl,
    photo_url: photoUrl,
  };
};

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
  trial_started_at: string | null;
  dark_mode: boolean | null;
}

// Fetch user profile
export const fetchProfile = async (userId: string): Promise<ProfileRow | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, language, plan, streak_current, streak_longest, streak_last_date, total_entries, coach_persona, onboarded, trial_started_at, dark_mode")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

// Fetch entries
export const fetchEntries = async (userId: string): Promise<EntryRow[]> => {
  const { data, error } = await supabase
    .from("entries")
    .select("id, mood, text, energy, prompt_text, entry_date, created_at, ai_summary, audio_url, transcript_segments, photo_url, location_lat, location_lng, location_name, capture_type")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  const entries = (data as unknown as EntryRow[]) || [];
  return Promise.all(entries.map(hydrateEntryMediaUrls));
};

// Legacy compatibility: journal and quick mood entries stay open on the free plan.
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
  promptText?: string,
  captureType?: string,
  locationData?: { lat: number; lng: number; name?: string }
): Promise<EntryRow> => {
  const insertData: Record<string, unknown> = {
    user_id: userId,
    mood,
    text,
    energy,
    prompt_text: promptText || null,
    capture_type: captureType || "journal",
  };
  if (locationData) {
    insertData.location_lat = locationData.lat;
    insertData.location_lng = locationData.lng;
    insertData.location_name = locationData.name || null;
  }
  const { data, error } = await supabase
    .from("entries")
    .insert(insertData)
    .select("id, mood, text, energy, prompt_text, entry_date, created_at, ai_summary, audio_url, transcript_segments, photo_url, location_lat, location_lng, location_name, capture_type")
    .single();
  if (error) throw error;

  // Update streak via DB function
  await supabase.rpc("update_streak", { p_user_id: userId });

  return data as unknown as EntryRow;
};

// Update an entry with its AI insight/summary
export const updateEntryInsight = async (entryId: string, insight: string) => {
  const { error } = await supabase
    .from("entries")
    .update({ ai_summary: insight })
    .eq("id", entryId);
  if (error) throw error;
};

// Upload voice audio to Supabase Storage
export const uploadVoiceAudio = async (
  userId: string,
  entryId: string,
  audioBlob: Blob
): Promise<string> => {
  const ext = audioBlob.type.includes("webm") ? "webm" : audioBlob.type.includes("ogg") ? "ogg" : "webm";
  const filePath = `${userId}/${entryId}.${ext}`;
  const { error } = await supabase.storage
    .from("voice-entries")
    .upload(filePath, audioBlob, {
      contentType: audioBlob.type,
      upsert: true,
    });
  if (error) throw error;
  return filePath;
};

// Update entry with voice data (audio URL + transcript segments)
export const updateEntryVoice = async (
  entryId: string,
  audioUrl: string,
  transcriptSegments: TranscriptSegment[]
) => {
  const { error } = await supabase
    .from("entries")
    .update({
      audio_url: storagePathFromUrl(audioUrl, "voice-entries"),
      transcript_segments: transcriptSegments as Json,
    })
    .eq("id", entryId);
  if (error) throw error;
};

// Upload photo to Supabase Storage
export const uploadPhoto = async (
  userId: string,
  entryId: string,
  file: File
): Promise<string> => {
  const ext = file.name.split(".").pop() || "jpg";
  const filePath = `${userId}/${entryId}.${ext}`;
  const { error } = await supabase.storage
    .from("photo-entries")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });
  if (error) throw error;
  return filePath;
};

// Update entry with photo URL
export const updateEntryPhoto = async (entryId: string, photoUrl: string) => {
  const { error } = await supabase
    .from("entries")
    .update({ photo_url: storagePathFromUrl(photoUrl, "photo-entries") })
    .eq("id", entryId);
  if (error) throw error;
};

// Upload selfie photo to Supabase Storage (post-entry emotional journey)
export const uploadSelfiePhoto = async (
  userId: string,
  entryId: string,
  blob: Blob
): Promise<string> => {
  const filePath = `${userId}/${entryId}_selfie.jpg`;
  const { error } = await supabase.storage
    .from("photo-entries")
    .upload(filePath, blob, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) throw error;
  return filePath;
};

// Quick entry (mood-only, no writing)
export const createQuickEntry = async (
  userId: string,
  mood: number,
  energy: number
): Promise<EntryRow> => {
  const { data, error } = await supabase
    .from("entries")
    .insert({ user_id: userId, mood, text: "", energy })
    .select("id, mood, text, energy, prompt_text, entry_date, created_at, ai_summary, audio_url, transcript_segments, photo_url, location_lat, location_lng, location_name, capture_type")
    .single();
  if (error) throw error;
  await supabase.rpc("update_streak", { p_user_id: userId });
  return data as unknown as EntryRow;
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

// ── Habits ──────────────────────────────────────────────────────────────────

export interface HabitRow {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  emoji: string;
  color: string;
  frequency: 'daily' | 'weekly';
  reminder_time?: string;
  is_active: boolean;
  created_at: string;
}

export const fetchHabits = async (userId: string): Promise<HabitRow[]> => {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createHabit = async (userId: string, name: string, emoji: string = "sparkles", color: string = "#7C6EDB"): Promise<HabitRow> => {
  const { data, error } = await supabase
    .from("habits")
    .insert([{ user_id: userId, name, emoji, color, frequency: "daily", is_active: true }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  const { error } = await supabase
    .from("habits")
    .update({ is_active: false })
    .eq("id", habitId);
  if (error) throw error;
};

export const toggleHabitLog = async (userId: string, habitId: string, date: string, completed: boolean): Promise<void> => {
  const { error } = await supabase
    .from("habit_logs")
    .upsert({
      user_id: userId,
      habit_id: habitId,
      logged_date: date,
      completed,
    }, { onConflict: "habit_id,logged_date" });
  if (error) throw error;
};

export const fetchHabitLogsToday = async (userId: string, date: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from("habit_logs")
    .select("habit_id")
    .eq("user_id", userId)
    .eq("logged_date", date)
    .eq("completed", true);
  if (error) throw error;
  return (data || []).map(row => row.habit_id);
};

// ── Programs ────────────────────────────────────────────────────────────────

export interface UserProgramRow {
  user_id: string;
  program_id: string;
  current_day: number;
  completed: boolean;
  started_at: string;
}

export const fetchUserPrograms = async (userId: string): Promise<UserProgramRow[]> => {
  const { data, error } = await supabase
    .from("user_programs")
    .select("*")
    .eq("user_id", userId)
    .order("started_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

export const upsertUserProgram = async (userId: string, program: UserProgramRow): Promise<void> => {
  const { error } = await supabase
    .from("user_programs")
    .upsert({
      user_id: userId,
      program_id: program.program_id,
      current_day: program.current_day,
      completed: program.completed,
      started_at: program.started_at,
    }, { onConflict: "user_id,program_id" });
  if (error) throw error;
};

export const fetchAiMemoryLines = async ({
  entries,
  lang,
  userName,
}: {
  entries: EntryRow[];
  lang: string;
  userName?: string | null;
}): Promise<string[]> => {
  const payload = {
    lang,
    userName: userName || null,
    entries: entries.slice(0, 12).map((entry) => ({
      mood: entry.mood,
      text: entry.text || "",
      date: entry.entry_date,
      kind: entry.capture_type || "journal",
    })),
  };

  const { data, error } = await supabase.functions.invoke<{ memories?: string[] }>(
    "ai-memory-card",
    { body: payload }
  );

  if (error) throw error;
  return Array.isArray(data?.memories)
    ? data.memories.filter((line): line is string => typeof line === "string" && line.trim().length > 0)
    : [];
};

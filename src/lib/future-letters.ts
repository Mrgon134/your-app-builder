// Letter to Future Self — strongest emotional lock-in feature
// Inspired by Tangerine + Gratitude (4.9★)
// Users won't delete the app because their sealed letters live inside it

import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "nuju-future-letters";

export interface FutureLetter {
  id: string;
  text: string;
  writtenAt: string; // ISO
  openDate: string; // YYYY-MM-DD — when the letter can be opened
  opened: boolean;
  openedAt?: string; // ISO — when it was actually opened
}

type FutureLetterRow = {
  id: string;
  user_id: string;
  deliver_at: string;
  body: string;
  created_at: string;
  updated_at: string;
};

const createFutureLetterId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) =>
    (Number(char) ^ (Math.random() * 16 >> (Number(char) / 4))).toString(16)
  );
};

const dateOnly = (value: string) => value.slice(0, 10);

const toFutureLetter = (row: FutureLetterRow): FutureLetter => ({
  id: row.id,
  text: row.body,
  writtenAt: row.created_at,
  openDate: dateOnly(row.deliver_at),
  opened: false,
});

function loadAll(): FutureLetter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(letters: FutureLetter[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
}

export function createLetter(text: string, openDate: string, id = createFutureLetterId()): FutureLetter {
  const letter: FutureLetter = {
    id,
    text,
    writtenAt: new Date().toISOString(),
    openDate,
    opened: false,
  };

  const all = loadAll();
  all.unshift(letter);
  saveAll(all);
  return letter;
}

export function getReadyToOpenLetters(): FutureLetter[] {
  const today = new Date().toISOString().split("T")[0];
  return loadAll().filter((l) => !l.opened && l.openDate <= today);
}

export function getSealedLetters(): FutureLetter[] {
  const today = new Date().toISOString().split("T")[0];
  return loadAll().filter((l) => !l.opened && l.openDate > today);
}

export function getOpenedLetters(): FutureLetter[] {
  return loadAll().filter((l) => l.opened);
}

export function openLetter(id: string): FutureLetter | null {
  const all = loadAll();
  const letter = all.find((l) => l.id === id);
  if (!letter) return null;

  letter.opened = true;
  letter.openedAt = new Date().toISOString();
  saveAll(all);
  return letter;
}

export function getAllLetters(): FutureLetter[] {
  return loadAll();
}

export function saveLocalLetter(letter: FutureLetter): void {
  const all = loadAll();
  const index = all.findIndex((item) => item.id === letter.id);
  if (index >= 0) {
    all[index] = letter;
  } else {
    all.unshift(letter);
  }
  saveAll(all);
}

export function mergeFutureLetters(localLetters: FutureLetter[], remoteLetters: FutureLetter[]): FutureLetter[] {
  const byId = new Map<string, FutureLetter>();

  for (const letter of remoteLetters) {
    byId.set(letter.id, letter);
  }

  for (const letter of localLetters) {
    const remote = byId.get(letter.id);
    byId.set(letter.id, remote ? { ...remote, ...letter } : letter);
  }

  return [...byId.values()].sort((a, b) => b.writtenAt.localeCompare(a.writtenAt));
}

export async function fetchRemoteLetters(userId: string): Promise<FutureLetter[]> {
  const { data, error } = await supabase
    .from("future_letters")
    .select("id,user_id,deliver_at,body,created_at,updated_at")
    .eq("user_id", userId)
    .order("deliver_at", { ascending: true });

  if (error) throw error;
  return ((data || []) as FutureLetterRow[]).map(toFutureLetter);
}

export async function createRemoteLetter(userId: string, letter: FutureLetter): Promise<void> {
  const { error } = await supabase
    .from("future_letters")
    .upsert({
      id: letter.id,
      user_id: userId,
      body: letter.text,
      deliver_at: new Date(`${letter.openDate}T12:00:00`).toISOString(),
    }, { onConflict: "id" });

  if (error) throw error;
}

export function getLetterCount(): {
  sealed: number;
  ready: number;
  opened: number;
} {
  const today = new Date().toISOString().split("T")[0];
  const all = loadAll();
  return {
    sealed: all.filter((l) => !l.opened && l.openDate > today).length,
    ready: all.filter((l) => !l.opened && l.openDate <= today).length,
    opened: all.filter((l) => l.opened).length,
  };
}

/** Helper: get preset open dates */
export function getOpenDateOptions(): { label: string; date: string }[] {
  const d = (days: number) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + days);
    return dt.toISOString().split("T")[0];
  };
  return [
    { label: "1 week", date: d(7) },
    { label: "1 month", date: d(30) },
    { label: "3 months", date: d(90) },
    { label: "6 months", date: d(180) },
    { label: "1 year", date: d(365) },
  ];
}

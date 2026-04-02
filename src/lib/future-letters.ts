// Letter to Future Self — strongest emotional lock-in feature
// Inspired by Tangerine + Gratitude (4.9★)
// Users won't delete the app because their sealed letters live inside it

const STORAGE_KEY = "nuju-future-letters";

export interface FutureLetter {
  id: string;
  text: string;
  writtenAt: string; // ISO
  openDate: string; // YYYY-MM-DD — when the letter can be opened
  opened: boolean;
  openedAt?: string; // ISO — when it was actually opened
}

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

export function createLetter(text: string, openDate: string): FutureLetter {
  const letter: FutureLetter = {
    id: `letter-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
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

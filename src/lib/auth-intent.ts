export const AUTH_INTENT_STORAGE_KEY = "nuju-auth-intent";

export type PendingAuthIntent = {
  source?: "landing";
  screen?: "pro";
  plan?: "plus_monthly" | "pro_monthly";
  trial?: boolean;
};

export const saveAuthIntent = (intent: PendingAuthIntent) => {
  try {
    localStorage.setItem(AUTH_INTENT_STORAGE_KEY, JSON.stringify(intent));
  } catch {
    // Ignore storage errors so auth flow still works.
  }
};

export const consumeAuthIntent = (): PendingAuthIntent | null => {
  try {
    const raw = localStorage.getItem(AUTH_INTENT_STORAGE_KEY);
    if (!raw) return null;
    localStorage.removeItem(AUTH_INTENT_STORAGE_KEY);
    return JSON.parse(raw) as PendingAuthIntent;
  } catch {
    return null;
  }
};

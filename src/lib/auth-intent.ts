export const AUTH_INTENT_STORAGE_KEY = "nuju-auth-intent";

export type PendingAuthIntent = {
  source?: "landing" | "onboarding";
  screen?: "pro";
  plan?: "plus_monthly" | "pro_monthly" | "lifetime_one_time" | "weekly" | "three_month" | "yearly";
  trial?: boolean;
  resumePath?: string;
  checkoutIntentId?: string;
  checkoutEmail?: string;
  checkoutName?: string;
};

export const saveAuthIntent = (intent: PendingAuthIntent) => {
  try {
    localStorage.setItem(AUTH_INTENT_STORAGE_KEY, JSON.stringify(intent));
  } catch {
    // Ignore storage errors so auth flow still works.
  }
};

export const peekAuthIntent = (): PendingAuthIntent | null => {
  try {
    const raw = localStorage.getItem(AUTH_INTENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingAuthIntent;
  } catch {
    return null;
  }
};

export const clearAuthIntent = () => {
  try {
    localStorage.removeItem(AUTH_INTENT_STORAGE_KEY);
  } catch {
    // Ignore storage errors so auth flow still works.
  }
};

export const consumeAuthIntent = (): PendingAuthIntent | null => {
  const intent = peekAuthIntent();
  clearAuthIntent();
  return intent;
};

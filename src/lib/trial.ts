// 7-day free trial logic
// Data: 7-day trials convert 2-3x better than 14-day for wellness apps
// (urgency + enough time to build journaling habit)

export const TRIAL_DAYS = 7;

export function getTrialStatus(trialStartedAt: string | null): {
  isActive: boolean;
  daysLeft: number;
  daysUsed: number;
  expiresAt: Date | null;
  expired: boolean;
  notStarted: boolean;
} {
  if (!trialStartedAt) {
    return { isActive: false, daysLeft: TRIAL_DAYS, daysUsed: 0, expiresAt: null, expired: false, notStarted: true };
  }

  const start = new Date(trialStartedAt);
  const expires = new Date(start.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  const now = new Date();
  const msLeft = expires.getTime() - now.getTime();
  const daysLeft = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
  const daysUsed = TRIAL_DAYS - daysLeft;

  return {
    isActive: msLeft > 0,
    daysLeft,
    daysUsed,
    expiresAt: expires,
    expired: msLeft <= 0,
    notStarted: false,
  };
}

export function formatTrialCountdown(
  daysLeft: number,
  t?: { trial_expired_label?: string; trial_last_day?: string; trial_days_left?: string }
): string {
  if (daysLeft <= 0) return t?.trial_expired_label || "Trial expired";
  if (daysLeft === 1) return t?.trial_last_day || "Last day!";
  return (t?.trial_days_left || "{n} days left").replace("{n}", String(daysLeft));
}

// Check if user has "plus-level" access: paid plan OR active trial
export function hasPlusAccess(plan: string | null, trialStartedAt: string | null): boolean {
  if (plan === "plus" || plan === "pro" || plan === "lifetime") return true;
  const trial = getTrialStatus(trialStartedAt);
  return trial.isActive;
}

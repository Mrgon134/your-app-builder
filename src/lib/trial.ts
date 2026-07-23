// Trial and premium access helpers.
// Nuju has one premium access level: any paid plan or active trial.

export const TRIAL_DAYS = 7;

// plus/pro/yearly are kept as legacy aliases for existing subscriptions.
const PAID_PLANS = new Set([
  "plus",
  "pro",
  "weekly",
  "three_month",
  "yearly",
  "lifetime",
  "lifetime_one_time",
]);

export function hasActivePremiumPlan(plan: string | null): boolean {
  return PAID_PLANS.has(plan ?? "");
}

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

// hasPlusAccess / hasProAccess are aliases kept for component compatibility.
// They now both mean "has any premium access (paid plan or active trial)."
export function hasPlusAccess(plan: string | null, trialStartedAt: string | null): boolean {
  if (hasActivePremiumPlan(plan)) return true;
  const trial = getTrialStatus(trialStartedAt);
  return trial.isActive;
}

export function hasProAccess(plan: string | null, trialStartedAt: string | null): boolean {
  return hasPlusAccess(plan, trialStartedAt);
}

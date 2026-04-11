import { PRICING_CONFIG } from "@/lib/config";

export const LIFETIME_BATCH_TOTAL = 25;
export const LIFETIME_BATCH_RESET_TO = 10;
const LIFETIME_BATCH_SPAN = LIFETIME_BATCH_TOTAL - LIFETIME_BATCH_RESET_TO + 1;

export type LifetimeScarcityUrgency = "calm" | "warm" | "hot";

export interface LifetimeScarcitySnapshot {
  actualCount: number;
  batch: number;
  claimed: number;
  remaining: number;
  total: number;
  progressPercent: number;
  urgency: LifetimeScarcityUrgency;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const deriveLifetimeScarcity = (actualCount: number): LifetimeScarcitySnapshot => {
  const safeActualCount = Math.max(0, Math.floor(actualCount));
  const claimed = LIFETIME_BATCH_RESET_TO + (safeActualCount % LIFETIME_BATCH_SPAN);
  const remaining = Math.max(LIFETIME_BATCH_TOTAL - claimed, 0);

  return {
    actualCount: safeActualCount,
    batch: Math.floor(safeActualCount / LIFETIME_BATCH_SPAN) + 1,
    claimed,
    remaining,
    total: LIFETIME_BATCH_TOTAL,
    progressPercent: (claimed / LIFETIME_BATCH_TOTAL) * 100,
    urgency: remaining <= 3 ? "hot" : remaining <= 8 ? "warm" : "calm",
  };
};

export const getFallbackLifetimeScarcity = () => {
  const claimedFromLegacyConfig = clamp(
    LIFETIME_BATCH_TOTAL - PRICING_CONFIG.lifetimeSlots.left,
    LIFETIME_BATCH_RESET_TO,
    LIFETIME_BATCH_TOTAL,
  );

  return deriveLifetimeScarcity(claimedFromLegacyConfig - LIFETIME_BATCH_RESET_TO);
};

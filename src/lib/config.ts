/**
 * Pricing configurations and identifiers.
 * Nuju currently offers three paid options: Weekly, 3 Month, and Lifetime.
 * Set real product IDs via environment variables (VITE_DODO_*).
 */
const readNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const PRICING_CONFIG = {
  // Base display prices before PPP / regional discounts are applied.
  baseRates: {
    weekly: readNumber(import.meta.env.VITE_WEEKLY_PRICE, 2.99),
    threeMonth: readNumber(import.meta.env.VITE_THREE_MONTH_PRICE, 15.99),
  },
  // Lifetime flat price in USD.
  lifetime: {
    flatPrice: readNumber(import.meta.env.VITE_LIFETIME_FLAT_PRICE, 12.99),
  },
  trial: {
    threeMonthDays: readNumber(import.meta.env.VITE_THREE_MONTH_TRIAL_DAYS, 7),
    threeMonthIntroOfferEnabled: import.meta.env.VITE_THREE_MONTH_INTRO_TRIAL_ENABLED === "true",
  },
  // Legacy scarcity fallback if live purchase count is unavailable.
  lifetimeSlots: {
    total: 25,
    left: readNumber(import.meta.env.VITE_LIFETIME_SLOTS_LEFT, 14),
  },
  // Dodo Payments Product Identifiers (Test environment by default)
  products: {
    weekly: import.meta.env.VITE_DODO_WEEKLY || "pdt_0NbhHW3W4gTSSif6PbYb8",
    three_month: import.meta.env.VITE_DODO_THREE_MONTH || import.meta.env.VITE_DODO_3_MONTH || "pdt_0NdPqMYke9uZ1USDhjfvq",
    lifetime_one_time: import.meta.env.VITE_DODO_LIFETIME || "pdt_0NbhHzl2NQ8Dx0ntZsPQs",
  },
};

export const getLifetimePrice = (currencyMultiplier: number) => {
  return round2(PRICING_CONFIG.lifetime.flatPrice * currencyMultiplier);
};

const round2 = (amount: number) => Math.round(amount * 100) / 100;

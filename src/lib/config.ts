/**
 * Pricing configurations and identifiers.
 * Extracted from app code so they can be managed in one place.
 * Eventually, these should move to .env (e.g., VITE_DODO_PLUS_MONTHLY)
 * so test and live environments can be easily swapped.
 */
const readNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const PRICING_CONFIG = {
  // Base display prices before PPP / regional discounts are applied.
  baseRates: {
    weekly: readNumber(import.meta.env.VITE_WEEKLY_PRICE, 4.99),
    threeMonth: readNumber(import.meta.env.VITE_THREE_MONTH_PRICE, 19.99),
    yearly: readNumber(import.meta.env.VITE_YEARLY_PRICE, 59.99),
    plusMonthly: readNumber(import.meta.env.VITE_PLUS_MONTHLY_PRICE, 4.99),
    plusAnnual: readNumber(import.meta.env.VITE_PLUS_ANNUAL_PRICE, 39.99),
    proMonthly: readNumber(import.meta.env.VITE_PRO_MONTHLY_PRICE, 9.99),
    proAnnual: readNumber(import.meta.env.VITE_PRO_ANNUAL_PRICE, 79.99),
  },
  // Lifetime flat price in USD. Set via env or defaults to $49.99.
  lifetime: {
    flatPrice: readNumber(import.meta.env.VITE_LIFETIME_FLAT_PRICE, 49.99),
  },
  trial: {
    annualDays: readNumber(import.meta.env.VITE_ANNUAL_TRIAL_DAYS, 7),
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
    yearly: import.meta.env.VITE_DODO_YEARLY || "pdt_0NbhHexts6edZvPqDnoqt",
    plus_monthly: import.meta.env.VITE_DODO_PLUS_MONTHLY || "pdt_0NbhFlXcexmMdlcYFUaYb",
    plus_annual: import.meta.env.VITE_DODO_PLUS_ANNUAL || "pdt_0NbhG9cZxUlLissUYnKkm",
    pro_monthly: import.meta.env.VITE_DODO_PRO_MONTHLY || "pdt_0NbhHW3W4gTSSif6PbYb8",
    pro_annual: import.meta.env.VITE_DODO_PRO_ANNUAL || "pdt_0NbhHexts6edZvPqDnoqt",
    lifetime_one_time: import.meta.env.VITE_DODO_LIFETIME || "pdt_0NbhHzl2NQ8Dx0ntZsPQs",
  },
};

export const getLifetimePrice = (currencyMultiplier: number) => {
  return round2(PRICING_CONFIG.lifetime.flatPrice * currencyMultiplier);
};

const round2 = (amount: number) => Math.round(amount * 100) / 100;

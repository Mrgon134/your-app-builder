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
    plusMonthly: readNumber(import.meta.env.VITE_PLUS_MONTHLY_PRICE, 4.99),
    plusAnnual: readNumber(import.meta.env.VITE_PLUS_ANNUAL_PRICE, 39.99),
    proMonthly: readNumber(import.meta.env.VITE_PRO_MONTHLY_PRICE, 9.99),
    proAnnual: readNumber(import.meta.env.VITE_PRO_ANNUAL_PRICE, 79.99),
  },
  // Lifetime price is derived from the annual Pro price so it stays aligned with the flagship plan.
  // Keep the Dodo lifetime product price aligned with this formula.
  lifetime: {
    annualMultiplier: readNumber(import.meta.env.VITE_LIFETIME_ANNUAL_MULTIPLIER, 1.75),
    charmEnding: readNumber(import.meta.env.VITE_LIFETIME_CHARM_ENDING, 0.99),
  },
  // Dodo Payments Product Identifiers (Test environment by default)
  products: {
    plus_monthly: import.meta.env.VITE_DODO_PLUS_MONTHLY || "pdt_0NbhFlXcexmMdlcYFUaYb",
    plus_annual: import.meta.env.VITE_DODO_PLUS_ANNUAL || "pdt_0NbhG9cZxUlLissUYnKkm",
    pro_monthly: import.meta.env.VITE_DODO_PRO_MONTHLY || "pdt_0NbhHW3W4gTSSif6PbYb8",
    pro_annual: import.meta.env.VITE_DODO_PRO_ANNUAL || "pdt_0NbhHexts6edZvPqDnoqt",
    lifetime_one_time: import.meta.env.VITE_DODO_LIFETIME || "pdt_0NbhHzl2NQ8Dx0ntZsPQs",
  },
};

export const getLifetimePriceFromAnnual = (proAnnualPrice: number) => {
  const rawLifetime = proAnnualPrice * PRICING_CONFIG.lifetime.annualMultiplier;
  return roundToCharmPrice(rawLifetime, PRICING_CONFIG.lifetime.charmEnding);
};

const roundToCharmPrice = (amount: number, charmEnding: number) => {
  const safeEnding = Math.min(Math.max(charmEnding, 0), 0.99);
  if (safeEnding === 0) return round2(Math.round(amount));

  const roundedWhole = Math.max(1, Math.round(amount));
  return round2(roundedWhole - (1 - safeEnding));
};

const round2 = (amount: number) => Math.round(amount * 100) / 100;

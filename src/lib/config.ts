/**
 * Pricing configurations and identifiers.
 * Extracted from app code so they can be managed in one place.
 * Eventually, these should move to .env (e.g., VITE_DODO_PLUS_MONTHLY)
 * so test and live environments can be easily swapped.
 */
export const PRICING_CONFIG = {
  // Dodo Payments Product Identifiers (Test environment by default)
  products: {
    plus_monthly: import.meta.env.VITE_DODO_PLUS_MONTHLY || "pdt_0NbhFlXcexmMdlcYFUaYb",
    plus_annual: import.meta.env.VITE_DODO_PLUS_ANNUAL || "pdt_0NbhG9cZxUlLissUYnKkm",
    pro_monthly: import.meta.env.VITE_DODO_PRO_MONTHLY || "pdt_0NbhHW3W4gTSSif6PbYb8",
    pro_annual: import.meta.env.VITE_DODO_PRO_ANNUAL || "pdt_0NbhHexts6edZvPqDnoqt",
    lifetime_one_time: import.meta.env.VITE_DODO_LIFETIME || "pdt_0NbhHzl2NQ8Dx0ntZsPQs",
  }
};

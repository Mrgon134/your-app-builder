import { describe, expect, it } from "vitest";
import { getDisplayPricingContext, getFractionDigits, roundCurrency } from "@/hooks/use-geo-pricing";

describe("geo pricing helpers", () => {
  it("falls back to USD display when no conversion rate exists", () => {
    expect(getDisplayPricingContext("IDR", null)).toEqual({
      hasLocalizedDisplay: false,
      displayCurrency: "USD",
      currencyMultiplier: 1,
    });
  });

  it("switches to localized display when parity provides a valid usdConversionRate", () => {
    expect(getDisplayPricingContext("IDR", 15625)).toEqual({
      hasLocalizedDisplay: true,
      displayCurrency: "IDR",
      currencyMultiplier: 15625,
    });
  });

  it("rounds zero-decimal currencies cleanly", () => {
    expect(getFractionDigits("IDR")).toBe(0);
    expect(roundCurrency(50622.49, "IDR")).toBe(50622);
  });

  it("keeps cents for two-decimal currencies", () => {
    expect(getFractionDigits("USD")).toBe(2);
    expect(roundCurrency(3.241, "USD")).toBe(3.24);
  });
});

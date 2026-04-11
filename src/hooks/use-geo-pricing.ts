import { useState, useEffect } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";
import { PRICING_CONFIG, getLifetimePrice } from "@/lib/config";

interface GeoPricing {
  country: string;
  displayCurrency: string;
  currency: string;
  symbol: string;
  hasLocalizedDisplay: boolean;
  usdConversionRate: number | null;
  rates: {
    weekly: number;
    yearly: number;
    plusMonthly: number;
    plusAnnual: number;
    proMonthly: number;
    proAnnual: number;
    lifetime: number;
  };
  isLoading: boolean;
  couponCode: string | null;
  discountPct: number;
}

export function useGeoPricing(): GeoPricing & { formatPrice: (amount: number) => string } {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [country, setCountry] = useState("US");
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [usdConversionRate, setUsdConversionRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParity = async () => {
      try {
        // Call our server-side edge function (keeps pd_identifier secure)
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/parity-lookup`, {
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          signal: AbortSignal.timeout(5000),
        });

        if (resp.ok) {
          const data = await resp.json();
          if (data.discountPercentage > 0) {
            setDiscountPct(data.discountPercentage);
            setCouponCode(data.couponCode);
          }
          if (data.countryCode) {
            setCountry(data.countryCode);
          }
          if (data.currencyCode) {
            setCurrency(data.currencyCode);
          }
          if (data.currencySymbol) {
            setSymbol(data.currencySymbol);
          }
          const parsedUsdRate = Number(data.usdConversionRate);
          if (Number.isFinite(parsedUsdRate) && parsedUsdRate > 0) {
            setUsdConversionRate(parsedUsdRate);
          }
        }
      } catch (e) {
        // PPP lookup not available, using default USD pricing
      } finally {
        setIsLoading(false);
      }
    };

    fetchParity();
  }, []);

  const multiplier = 1 - discountPct / 100;
  const { hasLocalizedDisplay, displayCurrency, currencyMultiplier } = getDisplayPricingContext(currency, usdConversionRate);

  // Apply PPP discount to base rates
  const weekly = roundCurrency(PRICING_CONFIG.baseRates.weekly * multiplier * currencyMultiplier, displayCurrency);
  const yearly = roundCurrency(PRICING_CONFIG.baseRates.yearly * multiplier * currencyMultiplier, displayCurrency);
  const plusMonthly = roundCurrency(PRICING_CONFIG.baseRates.plusMonthly * multiplier * currencyMultiplier, displayCurrency);
  const plusAnnual = roundCurrency(PRICING_CONFIG.baseRates.plusAnnual * multiplier * currencyMultiplier, displayCurrency);
  const proMonthly = roundCurrency(PRICING_CONFIG.baseRates.proMonthly * multiplier * currencyMultiplier, displayCurrency);
  const proAnnual = roundCurrency(PRICING_CONFIG.baseRates.proAnnual * multiplier * currencyMultiplier, displayCurrency);
  const lifetime = roundCurrency(PRICING_CONFIG.lifetime.flatPrice * multiplier * currencyMultiplier, displayCurrency);

  const rates = {
    weekly,
    yearly,
    plusMonthly,
    plusAnnual,
    proMonthly,
    proAnnual,
    lifetime,
  };

  return {
    country,
    displayCurrency,
    currency,
    symbol,
    hasLocalizedDisplay,
    usdConversionRate,
    rates,
    isLoading,
    couponCode,
    discountPct,
    formatPrice: (amount: number) => {
      const rounded = roundCurrency(amount, displayCurrency);
      const fractionDigits = getFractionDigits(displayCurrency);

      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: displayCurrency,
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }).format(rounded);
      } catch {
        return `${symbol}${rounded.toFixed(fractionDigits)}`;
      }
    },
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getDisplayPricingContext(currencyCode: string, usdConversionRate: number | null) {
  const hasLocalizedDisplay = Boolean(
    usdConversionRate &&
    usdConversionRate > 0 &&
    currencyCode &&
    currencyCode !== "USD"
  );

  return {
    hasLocalizedDisplay,
    displayCurrency: hasLocalizedDisplay ? currencyCode : "USD",
    currencyMultiplier: hasLocalizedDisplay ? usdConversionRate! : 1,
  };
}

export function getFractionDigits(currencyCode: string): number {
  return ["IDR", "JPY", "KRW", "VND"].includes(currencyCode) ? 0 : 2;
}

export function roundCurrency(amount: number, currencyCode: string): number {
  const fractionDigits = getFractionDigits(currencyCode);
  const factor = 10 ** fractionDigits;
  return Math.round(amount * factor) / factor;
}

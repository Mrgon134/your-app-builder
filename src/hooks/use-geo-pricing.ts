import { useState, useEffect } from "react";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";
import { PRICING_CONFIG, getLifetimePriceFromAnnual } from "@/lib/config";

interface GeoPricing {
  country: string;
  currency: string;
  symbol: string;
  rates: {
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
        }
      } catch (e) {
        console.log("PPP lookup not available, using default USD pricing");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParity();
  }, []);

  const multiplier = 1 - discountPct / 100;

  // Apply PPP discount to base rates
  const plusMonthly = round2(PRICING_CONFIG.baseRates.plusMonthly * multiplier);
  const plusAnnual = round2(PRICING_CONFIG.baseRates.plusAnnual * multiplier);
  const proMonthly = round2(PRICING_CONFIG.baseRates.proMonthly * multiplier);
  const proAnnual = round2(PRICING_CONFIG.baseRates.proAnnual * multiplier);

  const rates = {
    plusMonthly,
    plusAnnual,
    proMonthly,
    proAnnual,
    lifetime: getLifetimePriceFromAnnual(proAnnual),
  };

  return {
    country,
    currency,
    symbol,
    rates,
    isLoading,
    couponCode,
    discountPct,
    formatPrice: (amount: number) => {
      const rounded = ["IDR", "JPY", "KRW", "VND"].includes(currency)
        ? Math.round(amount)
        : amount.toFixed(2);
      return `${symbol}${rounded}`;
    },
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

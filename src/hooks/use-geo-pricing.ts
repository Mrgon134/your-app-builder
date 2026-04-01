import { useState, useEffect } from "react";

interface ParityDeal {
  couponCode: string | null;
  discountPercentage: number;
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
  country: string;
}

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

// Base USD prices (before any PPP discount)
const BASE_RATES = {
  plusMonthly: 4.99,
  plusAnnual: 39.99,
  proMonthly: 9.99,
  proAnnual: 79.99,
  lifetime: 99.00,
};

export function useGeoPricing(): GeoPricing & { formatPrice: (amount: number) => string } {
  const [parityDeal, setParityDeal] = useState<ParityDeal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Call ParityDeals API (client-side, uses URL for domain verification)
    const fetchParity = async () => {
      try {
        const resp = await fetch(
          `https://api.paritydeals.com/api/v1/deals/discount/?url=${encodeURIComponent(window.location.href)}`,
          { signal: AbortSignal.timeout(4000) }
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data && data.countryCode) {
            setParityDeal({
              couponCode: data.couponCode || null,
              discountPercentage: parseFloat(data.discountPercentage) || 0,
              countryCode: data.countryCode || "US",
              currencyCode: data.currencyCode || "USD",
              currencySymbol: data.currencySymbol || "$",
              country: data.country || "United States",
            });
          }
        }
      } catch (e) {
        console.log("ParityDeals not available, using default USD pricing");
      } finally {
        setIsLoading(false);
      }
    };

    fetchParity();
  }, []);

  const discountPct = parityDeal?.discountPercentage || 0;
  const multiplier = 1 - discountPct / 100;

  // Apply PPP discount to base rates
  const rates = {
    plusMonthly: round2(BASE_RATES.plusMonthly * multiplier),
    plusAnnual: round2(BASE_RATES.plusAnnual * multiplier),
    proMonthly: round2(BASE_RATES.proMonthly * multiplier),
    proAnnual: round2(BASE_RATES.proAnnual * multiplier),
    lifetime: round2(BASE_RATES.lifetime * multiplier),
  };

  // Always show in USD since Dodo handles currency conversion at checkout
  return {
    country: parityDeal?.countryCode || "US",
    currency: "USD",
    symbol: "$",
    rates,
    isLoading,
    couponCode: parityDeal?.couponCode || null,
    discountPct,
    formatPrice: (amount: number) => `$${amount.toFixed(2)}`,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

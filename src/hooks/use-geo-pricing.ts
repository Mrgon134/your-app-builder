import { useState, useEffect } from "react";

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

const SUPABASE_URL = "https://sxgmlnlqmdjjfmcypivi.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z21sbmxxbWRqamZtY3lwaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTEyNDYsImV4cCI6MjA4OTU4NzI0Nn0.kUM2J00vmkRd55MmQw5AAadS8XGZKeLY0mgGg8aAVFg";

export function useGeoPricing(): GeoPricing & { formatPrice: (amount: number) => string } {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPct, setDiscountPct] = useState(0);
  const [country, setCountry] = useState("US");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParity = async () => {
      try {
        // Call our server-side edge function (keeps pd_identifier secure)
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/parity-lookup`, {
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON}`,
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
  const rates = {
    plusMonthly: round2(BASE_RATES.plusMonthly * multiplier),
    plusAnnual: round2(BASE_RATES.plusAnnual * multiplier),
    proMonthly: round2(BASE_RATES.proMonthly * multiplier),
    proAnnual: round2(BASE_RATES.proAnnual * multiplier),
    lifetime: round2(BASE_RATES.lifetime * multiplier),
  };

  return {
    country,
    currency: "USD",
    symbol: "$",
    rates,
    isLoading,
    couponCode,
    discountPct,
    formatPrice: (amount: number) => `$${amount.toFixed(2)}`,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

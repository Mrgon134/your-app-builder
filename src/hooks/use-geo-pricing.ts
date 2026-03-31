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
}

// All prices in USD — Dodo Payments handles currency conversion at checkout
const USD_PRICING = {
  currency: "USD",
  symbol: "$",
  rates: {
    plusMonthly: 4.99,
    plusAnnual: 39.99,
    proMonthly: 9.99,
    proAnnual: 79.99,
    lifetime: 99.00,
  },
};

export function useGeoPricing(): GeoPricing & { formatPrice: (amount: number) => string } {
  const [country, setCountry] = useState("US");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect country for analytics/metadata only (not for pricing)
    const detected = detectCountryFromTimezone();
    if (detected) {
      setCountry(detected);
      setIsLoading(false);
      return;
    }

    fetch("https://ipapi.co/country/", { signal: AbortSignal.timeout(3000) })
      .then((r) => r.text())
      .then((code) => {
        if (code && code.length === 2) setCountry(code.trim());
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return {
    country,
    currency: USD_PRICING.currency,
    symbol: USD_PRICING.symbol,
    rates: USD_PRICING.rates,
    isLoading,
    formatPrice: (amount: number) => `$${amount.toFixed(2)}`,
  };
}

function detectCountryFromTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzMap: Record<string, string> = {
      "Asia/Jakarta": "ID", "Asia/Makassar": "ID", "Asia/Jayapura": "ID", "Asia/Pontianak": "ID",
      "Asia/Kolkata": "IN", "Asia/Calcutta": "IN",
      "America/Sao_Paulo": "BR", "America/Fortaleza": "BR", "America/Manaus": "BR",
      "Asia/Tokyo": "JP",
      "Asia/Seoul": "KR",
      "Asia/Kuala_Lumpur": "MY",
      "Asia/Bangkok": "TH",
      "Asia/Manila": "PH",
      "Asia/Ho_Chi_Minh": "VN", "Asia/Saigon": "VN",
    };
    return tzMap[tz] || null;
  } catch {
    return null;
  }
}

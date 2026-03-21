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
  };
  isLoading: boolean;
}

// Pricing tiers per region
const PRICING_MAP: Record<string, { currency: string; symbol: string; rates: GeoPricing["rates"] }> = {
  ID: {
    currency: "IDR",
    symbol: "Rp",
    rates: { plusMonthly: 29900, plusAnnual: 239000, proMonthly: 59900, proAnnual: 479000 },
  },
  IN: {
    currency: "INR",
    symbol: "₹",
    rates: { plusMonthly: 149, plusAnnual: 1199, proMonthly: 299, proAnnual: 2399 },
  },
  BR: {
    currency: "BRL",
    symbol: "R$",
    rates: { plusMonthly: 14.90, plusAnnual: 119.90, proMonthly: 29.90, proAnnual: 239.90 },
  },
  JP: {
    currency: "JPY",
    symbol: "¥",
    rates: { plusMonthly: 480, plusAnnual: 3800, proMonthly: 980, proAnnual: 7800 },
  },
  KR: {
    currency: "KRW",
    symbol: "₩",
    rates: { plusMonthly: 4900, plusAnnual: 39000, proMonthly: 9900, proAnnual: 79000 },
  },
  MY: {
    currency: "MYR",
    symbol: "RM",
    rates: { plusMonthly: 14.90, plusAnnual: 119.90, proMonthly: 29.90, proAnnual: 239.90 },
  },
  TH: {
    currency: "THB",
    symbol: "฿",
    rates: { plusMonthly: 129, plusAnnual: 990, proMonthly: 259, proAnnual: 1990 },
  },
  PH: {
    currency: "PHP",
    symbol: "₱",
    rates: { plusMonthly: 199, plusAnnual: 1590, proMonthly: 399, proAnnual: 3190 },
  },
  VN: {
    currency: "VND",
    symbol: "₫",
    rates: { plusMonthly: 79000, plusAnnual: 629000, proMonthly: 159000, proAnnual: 1269000 },
  },
};

const DEFAULT_PRICING = {
  currency: "USD",
  symbol: "$",
  rates: { plusMonthly: 4.99, plusAnnual: 39.99, proMonthly: 9.99, proAnnual: 79.99 },
};

function formatPrice(amount: number, currency: string): string {
  // No decimals for whole-number currencies
  if (["IDR", "JPY", "KRW", "VND"].includes(currency)) {
    return amount.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return amount.toFixed(2);
}

export function useGeoPricing(): GeoPricing & { formatPrice: (amount: number) => string } {
  const [country, setCountry] = useState("US");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to detect country via timezone first (free, instant, no API call)
    const detected = detectCountryFromTimezone();
    if (detected) {
      setCountry(detected);
      setIsLoading(false);
      return;
    }

    // Fallback: free IP geolocation
    fetch("https://ipapi.co/country/", { signal: AbortSignal.timeout(3000) })
      .then((r) => r.text())
      .then((code) => {
        if (code && code.length === 2) setCountry(code.trim());
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const pricing = PRICING_MAP[country] || DEFAULT_PRICING;

  return {
    country,
    currency: pricing.currency,
    symbol: pricing.symbol,
    rates: pricing.rates,
    isLoading,
    formatPrice: (amount: number) => `${pricing.symbol}${formatPrice(amount, pricing.currency)}`,
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

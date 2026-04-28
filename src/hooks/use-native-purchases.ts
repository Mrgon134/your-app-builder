import { useState, useEffect, useCallback } from "react";
import type { PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { isNative } from "@/lib/platform";
import {
  initRevenueCat,
  fetchOfferings,
  purchasePackage,
  restorePurchases,
  getPlanFromCustomerInfo,
  getPlanFromEntitlements,
  hasRevenueCatApiKey,
  PRODUCT_IDS,
} from "@/lib/revenueCat";

export type NativePackage = PurchasesPackage;

// Map RevenueCat product ID to plan display name (for pricing screen)
const getDisplayName = (productId: string): string => {
  const map: Record<string, string> = {
    [PRODUCT_IDS.weekly]: "weekly",
    [PRODUCT_IDS.three_month]: "three_month",
    [PRODUCT_IDS.plus_monthly]: "plus_monthly",
    [PRODUCT_IDS.plus_annual]: "plus_annual",
    [PRODUCT_IDS.pro_lifetime]: "lifetime_one_time",
  };
  return map[productId] || productId;
};

interface UseNativePurchasesResult {
  isNativeApp: boolean;
  packages: NativePackage[];
  loading: boolean;
  purchasing: boolean;
  error: string | null;
  nativePlan: string;
  purchase: (pkg: NativePackage) => Promise<string | null>;
  restore: () => Promise<string>;
  refresh: () => Promise<void>;
}

export function useNativePurchases(userId?: string): UseNativePurchasesResult {
  const [packages, setPackages] = useState<NativePackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nativePlan, setNativePlan] = useState("free");
  const native = isNative();

  const loadPurchases = useCallback(async () => {
    if (!native) return;

    setLoading(true);
    setError(null);
    try {
      if (!hasRevenueCatApiKey()) {
        setPackages([]);
        setError("App Store purchases are not configured in this build yet.");
        return;
      }

      await initRevenueCat(userId);

      const offering = await fetchOfferings();
      const nextPackages = offering?.availablePackages ?? [];
      setPackages(nextPackages);

      if (!offering) {
        setError("Could not reach App Store products. Please try again.");
      } else if (nextPackages.length === 0) {
        setError("App Store products are not attached to the current offering yet.");
      }

      const plan = await getPlanFromEntitlements();
      setNativePlan(plan);
    } catch (err) {
      console.error("[useNativePurchases] init error:", err);
      setPackages([]);
      setError("Could not load App Store products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [native, userId]);

  // Initialize RevenueCat + fetch offerings
  useEffect(() => {
    void loadPurchases();
  }, [loadPurchases]);

  const purchase = useCallback(async (pkg: NativePackage): Promise<string | null> => {
    if (!native) return null;
    setPurchasing(true);
    try {
      const info = await purchasePackage(pkg);
      if (info) {
        const plan = getPlanFromCustomerInfo(info);
        setNativePlan(plan);
        return plan;
      }
      return null; // user cancelled
    } catch {
      return null;
    } finally {
      setPurchasing(false);
    }
  }, [native]);

  const restore = useCallback(async (): Promise<string> => {
    if (!native) return "free";
    setLoading(true);
    try {
      const info = await restorePurchases();
      const plan = getPlanFromCustomerInfo(info);
      setNativePlan(plan);
      return plan;
    } finally {
      setLoading(false);
    }
  }, [native]);

  const refresh = useCallback(async () => {
    await loadPurchases();
  }, [loadPurchases]);

  return {
    isNativeApp: native,
    packages,
    loading,
    purchasing,
    error,
    nativePlan,
    purchase,
    restore,
    refresh,
  };
}

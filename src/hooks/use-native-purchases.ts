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
  nativePlan: string;
  purchase: (pkg: NativePackage) => Promise<string | null>;
  restore: () => Promise<string>;
  refresh: () => Promise<void>;
}

export function useNativePurchases(userId?: string): UseNativePurchasesResult {
  const [packages, setPackages] = useState<NativePackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [nativePlan, setNativePlan] = useState("free");
  const native = isNative();

  // Initialize RevenueCat + fetch offerings
  useEffect(() => {
    if (!native) return;

    const init = async () => {
      setLoading(true);
      try {
        await initRevenueCat(userId);

        const offering = await fetchOfferings();
        if (offering?.availablePackages) {
          setPackages(offering.availablePackages);
        }

        const plan = await getPlanFromEntitlements();
        setNativePlan(plan);
      } catch (err) {
        console.error("[useNativePurchases] init error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [native, userId]);

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
    if (!native) return;
    const plan = await getPlanFromEntitlements();
    setNativePlan(plan);
  }, [native]);

  return {
    isNativeApp: native,
    packages,
    loading,
    purchasing,
    nativePlan,
    purchase,
    restore,
    refresh,
  };
}

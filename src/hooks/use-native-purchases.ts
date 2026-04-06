import { useState, useEffect, useCallback } from "react";
import { isNative } from "@/lib/platform";
import {
  initRevenueCat,
  identifyUser,
  fetchOfferings,
  purchasePackage,
  restorePurchases,
  getPlanFromEntitlements,
  PRODUCT_IDS,
} from "@/lib/revenueCat";

export interface NativePackage {
  identifier: string;
  offeringIdentifier: string;
  product: {
    identifier: string;
    title: string;
    description: string;
    priceString: string;
    price: number;
    currencyCode: string;
  };
}

// Map RevenueCat product ID to plan display name (for pricing screen)
const getDisplayName = (productId: string): string => {
  const map: Record<string, string> = {
    [PRODUCT_IDS.plus_monthly]: "plus_monthly",
    [PRODUCT_IDS.plus_annual]: "plus_annual",
    [PRODUCT_IDS.pro_monthly]: "pro_monthly",
    [PRODUCT_IDS.pro_annual]: "pro_annual",
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
  purchase: (pkg: NativePackage) => Promise<boolean>;
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
        if (userId) await identifyUser(userId);

        const offering = await fetchOfferings();
        if (offering?.availablePackages) {
          setPackages(offering.availablePackages as NativePackage[]);
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

  const purchase = useCallback(async (pkg: NativePackage): Promise<boolean> => {
    if (!native) return false;
    setPurchasing(true);
    try {
      const info = await purchasePackage(pkg as any);
      if (info) {
        const plan = await getPlanFromEntitlements();
        setNativePlan(plan);
        return true;
      }
      return false; // user cancelled
    } catch {
      return false;
    } finally {
      setPurchasing(false);
    }
  }, [native]);

  const restore = useCallback(async (): Promise<string> => {
    if (!native) return "free";
    setLoading(true);
    try {
      await restorePurchases();
      const plan = await getPlanFromEntitlements();
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

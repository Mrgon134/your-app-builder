import { useState, useEffect, useCallback } from "react";
import type { PurchasesPackage, PurchasesStoreProduct } from "@revenuecat/purchases-capacitor";
import { isNative } from "@/lib/platform";
import {
  initRevenueCat,
  fetchOfferings,
  fetchReviewStoreProducts,
  purchasePackage,
  purchaseStoreProduct,
  restorePurchases,
  getPlanFromCustomerInfo,
  getPlanFromEntitlements,
  hasRevenueCatApiKey,
  PRODUCT_IDS,
  PRODUCT_ID_GROUPS,
  isReviewProductId,
} from "@/lib/revenueCat";

export interface NativePackage {
  identifier: string;
  product: PurchasesStoreProduct;
  revenueCatPackage?: PurchasesPackage;
  source: "offering" | "store_product_fallback";
}

// Map RevenueCat product ID to plan display name (for pricing screen)
const getDisplayName = (productId: string): string => {
  if (PRODUCT_ID_GROUPS.weekly.includes(productId)) return "weekly";
  if (PRODUCT_ID_GROUPS.three_month.includes(productId)) return "three_month";
  if (PRODUCT_ID_GROUPS.pro_lifetime.includes(productId)) return "lifetime_one_time";
  if (productId === PRODUCT_IDS.plus_monthly) return "plus_monthly";
  if (productId === PRODUCT_IDS.plus_annual) return "plus_annual";
  return productId;
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
      let nextPackages: NativePackage[] = (offering?.availablePackages ?? [])
        .filter((pkg) => isReviewProductId(pkg.product.identifier))
        .map((pkg) => ({
          identifier: pkg.identifier,
          product: pkg.product,
          revenueCatPackage: pkg,
          source: "offering",
        }));

      if (nextPackages.length === 0) {
        const directProducts = await fetchReviewStoreProducts();
        nextPackages = directProducts.map((product) => ({
          identifier: product.identifier,
          product,
          source: "store_product_fallback",
        }));
      }

      setPackages(nextPackages);

      if (nextPackages.length === 0) {
        setError(
          offering
            ? "App Store products are not attached to the current offering yet."
            : "Could not reach App Store products. Please try again.",
        );
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
      const info = pkg.revenueCatPackage
        ? await purchasePackage(pkg.revenueCatPackage)
        : await purchaseStoreProduct(pkg.product);
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

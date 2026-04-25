import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import type { CustomerInfo, PurchasesOffering, PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { isNative } from "./platform";

// RevenueCat API key (from https://app.revenuecat.com)
const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY || "";

// RevenueCat entitlement identifiers
export const ENTITLEMENTS = {
  plus: import.meta.env.VITE_REVENUECAT_PLUS_ENTITLEMENT_ID || "plus",
  pro: import.meta.env.VITE_REVENUECAT_ENTITLEMENT_ID || "entlf84d73930a",
} as const;

// RevenueCat product identifiers (must match RevenueCat dashboard)
export const PRODUCT_IDS = {
  weekly: "nuju_weekly",
  three_month: "3_month",
  plus_monthly: "prodd12cd5056a",
  plus_annual: "prodde2def8f68",
  pro_monthly: "nuju_weekly",
  pro_annual: "3_month",
  pro_lifetime: "lifetime",
} as const;

export const initRevenueCat = async (appUserID?: string) => {
  if (!isNative()) return;
  if (!REVENUECAT_API_KEY) {
    console.warn("[RevenueCat] No API key configured. Set VITE_REVENUECAT_API_KEY.");
    return;
  }

  await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
  await Purchases.configure({
    apiKey: REVENUECAT_API_KEY,
    appUserID: appUserID ?? undefined,
  });
};

// Link Supabase user ID to RevenueCat after login
export const identifyUser = async (userId: string) => {
  if (!isNative()) return;
  try {
    await Purchases.logIn({ appUserID: userId });
  } catch (err) {
    console.error("[RevenueCat] identify error:", err);
  }
};

// Reset RevenueCat user on logout
export const resetUser = async () => {
  if (!isNative()) return;
  try {
    await Purchases.logOut();
  } catch (err) {
    console.error("[RevenueCat] logout error:", err);
  }
};

// Fetch available subscription offerings
export const fetchOfferings = async (): Promise<PurchasesOffering | null> => {
  if (!isNative()) return null;
  try {
    const { offerings } = await Purchases.getOfferings();
    return offerings?.current ?? null;
  } catch (err) {
    console.error("[RevenueCat] offerings error:", err);
    return null;
  }
};

// Purchase a package
const isPurchaseCancelled = (err: unknown) => {
  if (!err || typeof err !== "object") return false;
  const maybeError = err as { code?: unknown; userCancelled?: unknown };
  return maybeError.code === "1" || maybeError.code === 1 || maybeError.userCancelled === true;
};

export const purchasePackage = async (pkg: PurchasesPackage): Promise<CustomerInfo | null> => {
  if (!isNative()) return null;
  try {
    const result = await Purchases.purchasePackage({
      aPackage: pkg,
    });
    return result.customerInfo;
  } catch (err: unknown) {
    if (isPurchaseCancelled(err)) {
      // User cancelled - not an error
      return null;
    }
    console.error("[RevenueCat] purchase error:", err);
    throw err;
  }
};

// Restore previous purchases (e.g. after reinstall)
export const restorePurchases = async () => {
  if (!isNative()) return null;
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    return customerInfo;
  } catch (err) {
    console.error("[RevenueCat] restore error:", err);
    return null;
  }
};

// Get current subscription status
export const getCustomerInfo = async () => {
  if (!isNative()) return null;
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (err) {
    console.error("[RevenueCat] customer info error:", err);
    return null;
  }
};

// Check if user has active entitlement
export const hasActiveEntitlement = async (entitlementId: string): Promise<boolean> => {
  const info = await getCustomerInfo();
  if (!info) return false;
  return info.entitlements.active[entitlementId]?.isActive === true;
};

// Derive plan name from RevenueCat entitlements
export const getPlanFromEntitlements = async (): Promise<string> => {
  const info = await getCustomerInfo();
  if (!info) return "free";
  if (info.entitlements.active[ENTITLEMENTS.pro]?.isActive) return "pro";
  if (info.entitlements.active[ENTITLEMENTS.plus]?.isActive) return "plus";
  return "free";
};

// Map Dodo plan IDs to RevenueCat product IDs
// Usage: when user clicks checkout on web (Dodo), or on iOS we directly use RevenueCat
export const getDodoToRevenueCatMap = (): Record<string, string> => ({
  "weekly": PRODUCT_IDS.weekly,
  "three_month": PRODUCT_IDS.three_month,
  "yearly": PRODUCT_IDS.three_month,
  "plus_monthly": PRODUCT_IDS.plus_monthly,
  "plus_annual": PRODUCT_IDS.plus_annual,
  "pro_monthly": PRODUCT_IDS.pro_monthly,
  "pro_annual": PRODUCT_IDS.three_month,
  "lifetime_one_time": PRODUCT_IDS.pro_lifetime,
});

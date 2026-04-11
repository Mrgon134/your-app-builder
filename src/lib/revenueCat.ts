import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { isNative } from "./platform";

// RevenueCat API key (from https://app.revenuecat.com)
const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY || "";

// RevenueCat entitlement identifiers
export const ENTITLEMENTS = {
  plus: "plus",
  pro: "pro",
} as const;

// RevenueCat product identifiers (must match RevenueCat dashboard)
export const PRODUCT_IDS = {
  weekly: "prod7fb30aa1d7",
  yearly: "prod4a76c3112a",
  plus_monthly: "prodd12cd5056a",
  plus_annual: "prodde2def8f68",
  pro_monthly: "prod7fb30aa1d7",
  pro_annual: "prod4a76c3112a",
  pro_lifetime: "prodeae2f54491",
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
export const fetchOfferings = async () => {
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
export const purchasePackage = async (pkg: { identifier: string; offeringIdentifier: string; product: { identifier: string } }) => {
  if (!isNative()) return null;
  try {
    const result = await Purchases.purchasePackage({
      aPackage: pkg as any,
    });
    return result.customerInfo;
  } catch (err: any) {
    if (err?.code === "1" || err?.userCancelled) {
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
  "yearly": PRODUCT_IDS.yearly,
  "plus_monthly": PRODUCT_IDS.plus_monthly,
  "plus_annual": PRODUCT_IDS.plus_annual,
  "pro_monthly": PRODUCT_IDS.pro_monthly,
  "pro_annual": PRODUCT_IDS.pro_annual,
  "lifetime_one_time": PRODUCT_IDS.pro_lifetime,
});

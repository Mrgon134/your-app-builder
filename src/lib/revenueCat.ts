import { PRODUCT_CATEGORY, Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import type { CustomerInfo, PurchasesOffering, PurchasesPackage, PurchasesStoreProduct } from "@revenuecat/purchases-capacitor";
import { isNative } from "./platform";

// RevenueCat API key (from https://app.revenuecat.com)
const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY || "";

export const hasRevenueCatApiKey = () => Boolean(REVENUECAT_API_KEY);

// RevenueCat entitlement identifiers
export const ENTITLEMENTS = {
  plus: import.meta.env.VITE_REVENUECAT_PLUS_ENTITLEMENT_ID || "plus",
  pro: import.meta.env.VITE_REVENUECAT_ENTITLEMENT_ID || "entlf84d73930a",
} as const;

const uniqueIds = (...groups: readonly string[][]) =>
  Array.from(new Set(groups.flat().map((id) => id.trim()).filter(Boolean)));

const configuredWeeklyProductId =
  import.meta.env.VITE_REVENUECAT_WEEKLY_PRODUCT_ID ||
  import.meta.env.VITE_APP_STORE_WEEKLY_PRODUCT_ID ||
  "nuju_weekly_v3";

const configuredThreeMonthProductId =
  import.meta.env.VITE_REVENUECAT_THREE_MONTH_PRODUCT_ID ||
  import.meta.env.VITE_APP_STORE_THREE_MONTH_PRODUCT_ID ||
  "nuju_3_month_v3";

// RevenueCat product identifiers (must match RevenueCat dashboard)
export const PRODUCT_IDS = {
  weekly: configuredWeeklyProductId,
  three_month: configuredThreeMonthProductId,
  plus_monthly: "prodd12cd5056a",
  plus_annual: "prodde2def8f68",
  pro_monthly: configuredWeeklyProductId,
  pro_annual: configuredThreeMonthProductId,
  pro_lifetime: "lifetime",
} as const;

const LEGACY_PRODUCT_IDS = {
  weekly: ["nuju_weekly_v3", "nuju_weekly_v2", "nuju_weekly"],
  three_month: ["nuju_3_month_v3", "nuju_3_month_v2", "3_month"],
} as const;

export const PRODUCT_ID_GROUPS = {
  weekly: uniqueIds([PRODUCT_IDS.weekly], LEGACY_PRODUCT_IDS.weekly),
  three_month: uniqueIds([PRODUCT_IDS.three_month], LEGACY_PRODUCT_IDS.three_month),
  pro_lifetime: [PRODUCT_IDS.pro_lifetime],
} as const;

const productIdMatches = (productId: string, candidates: readonly string[]) =>
  candidates.includes(productId);

let revenueCatConfigured = false;
let revenueCatAppUserID: string | undefined;

const revenueCatLogLevel = import.meta.env.DEV ? LOG_LEVEL.DEBUG : LOG_LEVEL.WARN;

export const initRevenueCat = async (appUserID?: string) => {
  if (!isNative()) return;
  if (!REVENUECAT_API_KEY) {
    console.warn("[RevenueCat] No API key configured. Set VITE_REVENUECAT_API_KEY.");
    return;
  }

  if (!revenueCatConfigured) {
    await Purchases.setLogLevel({ level: revenueCatLogLevel });
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: appUserID ?? undefined,
    });
    revenueCatConfigured = true;
    revenueCatAppUserID = appUserID;
    return;
  }

  if (appUserID && revenueCatAppUserID !== appUserID) {
    await identifyUser(appUserID);
  }
};

// Link Supabase user ID to RevenueCat after login
export const identifyUser = async (userId: string) => {
  if (!isNative()) return;
  if (revenueCatAppUserID === userId) return;
  try {
    await Purchases.logIn({ appUserID: userId });
    revenueCatAppUserID = userId;
  } catch (err) {
    console.error("[RevenueCat] identify error:", err);
  }
};

// Reset RevenueCat user on logout
export const resetUser = async () => {
  if (!isNative()) return;
  try {
    await Purchases.logOut();
    revenueCatAppUserID = undefined;
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

export const fetchReviewStoreProducts = async (): Promise<PurchasesStoreProduct[]> => {
  if (!isNative()) return [];
  try {
    const { products } = await Purchases.getProducts({
      productIdentifiers: uniqueIds(PRODUCT_ID_GROUPS.weekly, PRODUCT_ID_GROUPS.three_month),
      type: PRODUCT_CATEGORY.SUBSCRIPTION,
    });
    return products ?? [];
  } catch (err) {
    console.error("[RevenueCat] direct products error:", err);
    return [];
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

export const purchaseStoreProduct = async (product: PurchasesStoreProduct): Promise<CustomerInfo | null> => {
  if (!isNative()) return null;
  try {
    const result = await Purchases.purchaseStoreProduct({ product });
    return result.customerInfo;
  } catch (err: unknown) {
    if (isPurchaseCancelled(err)) {
      return null;
    }
    console.error("[RevenueCat] purchase product error:", err);
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

const planFromProductId = (productId: string): string | null => {
  if (productIdMatches(productId, PRODUCT_ID_GROUPS.pro_lifetime)) return "lifetime";
  if (productIdMatches(productId, PRODUCT_ID_GROUPS.three_month)) return "three_month";
  if (productIdMatches(productId, PRODUCT_ID_GROUPS.weekly)) return "weekly";
  if (productId === PRODUCT_IDS.plus_monthly || productId === PRODUCT_IDS.plus_annual) return "plus";
  if (productId === PRODUCT_IDS.pro_monthly || productId === PRODUCT_IDS.pro_annual) return "pro";
  return null;
};

export const getPlanFromCustomerInfo = (info: CustomerInfo | null): string => {
  if (!info) return "free";

  const hasLifetimePurchase =
    info.allPurchasedProductIdentifiers?.some((productId) =>
      productIdMatches(productId, PRODUCT_ID_GROUPS.pro_lifetime),
    ) ||
    info.nonSubscriptionTransactions?.some((transaction) =>
      productIdMatches(transaction.productIdentifier, PRODUCT_ID_GROUPS.pro_lifetime),
    );

  if (hasLifetimePurchase) return "lifetime";

  const activeSubscriptionPlan = info.activeSubscriptions
    ?.map(planFromProductId)
    .find((plan): plan is string => Boolean(plan));

  if (activeSubscriptionPlan) return activeSubscriptionPlan;
  if (info.entitlements.active[ENTITLEMENTS.pro]?.isActive) return "pro";
  if (info.entitlements.active[ENTITLEMENTS.plus]?.isActive) return "plus";
  return "free";
};

// Derive plan name from RevenueCat entitlements
export const getPlanFromEntitlements = async (): Promise<string> => {
  const info = await getCustomerInfo();
  return getPlanFromCustomerInfo(info);
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

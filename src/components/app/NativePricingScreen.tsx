import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { INTRO_ELIGIBILITY_STATUS, Purchases } from "@revenuecat/purchases-capacitor";
import { AlertCircle, ArrowLeft, Check, Loader2, RefreshCw } from "lucide-react";

import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useNativePurchases } from "@/hooks/use-native-purchases";
import type { NativePackage } from "@/hooks/use-native-purchases";
import { useLang } from "@/lib/i18n";
import { PRODUCT_ID_GROUPS } from "@/lib/revenueCat";
import { ROUTES } from "@/lib/routes";
import { formatTrialCountdown, getTrialStatus, TRIAL_DAYS } from "@/lib/trial";
import juGreat from "@/assets/ju-great.webp";

interface NativePricingScreenProps {
  currentPlan?: string;
  trialStartedAt?: string | null;
  userId?: string;
  presentation?: "modal" | "page";
  onClose: () => void;
  onPurchaseStart?: (plan: string) => void;
  onSuccess: (plan: string) => void;
}

const planIdForPackage = (pkg: NativePackage) => {
  if (PRODUCT_ID_GROUPS.weekly.includes(pkg.product.identifier)) return "weekly";
  if (PRODUCT_ID_GROUPS.three_month.includes(pkg.product.identifier)) return "three_month";
  if (PRODUCT_ID_GROUPS.pro_lifetime.includes(pkg.product.identifier)) return "lifetime_one_time";
  return pkg.identifier;
};

const labelForPackage = (pkg: NativePackage) => {
  const planId = planIdForPackage(pkg);
  if (planId === "weekly") return "Weekly";
  if (planId === "three_month") return "3 Month";
  if (planId === "lifetime_one_time") return "Lifetime";
  return pkg.product.title || pkg.identifier;
};

const unitForPackage = (pkg: NativePackage) => {
  const planId = planIdForPackage(pkg);
  if (planId === "weekly") return "per week";
  if (planId === "three_month") return "every 3 months";
  if (planId === "lifetime_one_time") return "one-time";
  return pkg.product.subscriptionPeriod ? "subscription" : "one-time";
};

const hasFreeIntroTrial = (pkg: NativePackage) => Boolean(pkg.product.introPrice && pkg.product.introPrice.price === 0);

const NativePricingScreen: React.FC<NativePricingScreenProps> = ({
  trialStartedAt = null,
  userId,
  presentation = "modal",
  onClose,
  onPurchaseStart,
  onSuccess,
}) => {
  const { t } = useLang();
  const geo = useGeoPricing();
  const { packages, loading, purchasing, error: productsError, purchase, restore, refresh } = useNativePurchases(userId);
  const trial = getTrialStatus(trialStartedAt);
  const [selectedPackage, setSelectedPackage] = useState<NativePackage | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [introEligibility, setIntroEligibility] = useState<Record<string, INTRO_ELIGIBILITY_STATUS>>({});
  const isPage = presentation === "page";
  const nativeBenefits = [
    "Your private Ju Gets You read stays open",
    "Premium voice notes, AI memory, and deeper coach support",
    "Older patterns, relationship maps, and weekly reports",
  ];

  const preferredPackage = useMemo(
    () =>
      packages.find((pkg) => PRODUCT_ID_GROUPS.three_month.includes(pkg.product.identifier)) ||
      packages.find((pkg) => PRODUCT_ID_GROUPS.weekly.includes(pkg.product.identifier)) ||
      packages[0] ||
      null,
    [packages],
  );
  const displayPackages = useMemo(
    () =>
      [...packages].sort((a, b) => {
        const order = (identifier: string) => {
          if (PRODUCT_ID_GROUPS.weekly.includes(identifier)) return 0;
          if (PRODUCT_ID_GROUPS.three_month.includes(identifier)) return 1;
          if (PRODUCT_ID_GROUPS.pro_lifetime.includes(identifier)) return 2;
          return 9;
        };
        return order(a.product.identifier) - order(b.product.identifier);
      }),
    [packages],
  );

  useEffect(() => {
    if (preferredPackage && !selectedPackage) {
      setSelectedPackage(preferredPackage);
    }
  }, [preferredPackage, selectedPackage]);

  useEffect(() => {
    const productIdentifiers = packages
      .filter((pkg) => pkg.product.subscriptionPeriod)
      .map((pkg) => pkg.product.identifier);

    if (productIdentifiers.length === 0) {
      setIntroEligibility({});
      return;
    }

    let cancelled = false;

    Purchases.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers })
      .then((eligibility) => {
        if (cancelled) return;
        setIntroEligibility(
          Object.fromEntries(
            Object.entries(eligibility).map(([productId, info]) => [productId, info.status]),
          ) as Record<string, INTRO_ELIGIBILITY_STATUS>,
        );
      })
      .catch(() => {
        if (!cancelled) {
          setIntroEligibility({});
        }
      });

    return () => {
      cancelled = true;
    };
  }, [packages]);

  const selectedPlanId = selectedPackage ? planIdForPackage(selectedPackage) : "";
  const selectedHasTrial = selectedPackage
    ? hasFreeIntroTrial(selectedPackage) &&
      introEligibility[selectedPackage.product.identifier] === INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE
    : false;
  const selectedTitle = selectedPackage ? labelForPackage(selectedPackage) : "3 Month";
  const selectedUnit = selectedPackage ? unitForPackage(selectedPackage) : "every 3 months";
  const selectedPrice = selectedPackage?.product.priceString || geo.formatPrice(geo.rates.threeMonth);
  const selectedTrialCopy =
    selectedPlanId === "three_month"
      ? selectedHasTrial
        ? `7 days free, then ${selectedPrice} every 3 months. Cancel anytime in Apple Subscriptions.`
        : `${selectedPrice} every 3 months. Cancel anytime in Apple Subscriptions.`
      : selectedPlanId === "weekly"
        ? `${selectedPrice} billed weekly. Cancel anytime.`
        : `${selectedPrice} one-time purchase. No renewal.`;

  const handlePurchase = async (pkg: NativePackage) => {
    setActionError(null);
    onPurchaseStart?.(planIdForPackage(pkg));
    const purchasedPlan = await purchase(pkg);
    if (purchasedPlan) {
      setShowSuccess(true);
      window.setTimeout(() => {
        onSuccess(purchasedPlan);
      }, 1200);
    } else {
      setActionError(t.purchase_failed || "Purchase failed. Please try again.");
    }
  };

  const handleRestore = async () => {
    setActionError(null);
    setRestoring(true);
    try {
      const restoredPlan = await restore();
      if (restoredPlan && restoredPlan !== "free") {
        onSuccess(restoredPlan);
      } else {
        setActionError("No previous purchase was found for this Apple ID.");
      }
    } catch {
      setActionError("Restore failed. Please try again.");
    } finally {
      setRestoring(false);
    }
  };

  const shellClass = isPage
    ? "mx-auto flex min-h-[calc(100dvh-8rem)] w-full items-start justify-center px-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
    : "fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-sm sm:items-center";
  const cardClass = isPage
    ? "w-full max-w-2xl overflow-hidden rounded-[1.9rem] border border-border/50 bg-card shadow-[0_24px_70px_-38px_rgba(15,23,42,0.35)]"
    : "w-full max-w-md overflow-hidden rounded-[1.9rem] border border-border/50 bg-card shadow-2xl animate-spring-up";
  const scrollClass = isPage
    ? "overflow-visible"
    : "max-h-[calc(100dvh_-_1.5rem_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] overflow-y-auto";

  if (loading) {
    return (
      <div className={isPage ? shellClass : "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"}>
        <div className="rounded-3xl border border-border/60 bg-card px-6 py-5 text-center shadow-2xl">
          <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{t.loading || "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <div className={cardClass}>
        <div className={scrollClass}>
          <div className="relative h-36 overflow-hidden bg-[linear-gradient(135deg,#211D34_0%,#443B72_48%,#95E1D3_130%)]">
            <button
              onClick={onClose}
              className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all active:scale-[0.97]"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.92))]" />
            <div className="absolute left-5 top-16 max-w-[12rem]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Apple secure checkout</p>
              <p className="mt-2 text-xl font-semibold leading-tight text-white">Begin the place that feels like yours.</p>
            </div>
            <img src={juGreat} alt="" className="absolute bottom-2 right-7 h-24 w-24 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)]" />
          </div>

          <div className="px-4 pb-4 pt-3">
          <h1 className="text-center font-serif text-[1.55rem] font-bold leading-tight text-foreground">
            Keep Ju close when the next heavy moment starts.
          </h1>
          <p className="mx-auto mt-1 max-w-[19rem] text-center text-xs leading-5 text-muted-foreground">
            Start with the plan that gives Ju time to learn your rhythm. Cancel anytime in Apple Subscriptions.
          </p>

          {trial.isActive ? (
            <div className="mt-3 rounded-2xl border border-primary/15 bg-primary/[0.06] px-3 py-2">
              <p className="text-xs font-semibold text-primary">
                {(t.pro_trial_days_left || "{time} left in your Pro trial").replace(
                  "{time}",
                  formatTrialCountdown(trial.daysLeft, t),
                )}
              </p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(trial.daysUsed / TRIAL_DAYS) * 100}%` }} />
              </div>
            </div>
          ) : null}

          {actionError ? (
            <div className="mt-3 flex gap-2 rounded-2xl border border-destructive/20 bg-destructive/10 p-3">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
              <p className="text-xs text-destructive">{actionError}</p>
            </div>
          ) : null}

          {showSuccess ? (
            <div className="mt-3 flex gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 p-3 animate-fade-in">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
              <p className="text-xs text-green-700">{t.payment_successful || "Payment successful!"}</p>
            </div>
          ) : null}

          <div className="mt-3 space-y-2">
            {nativeBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-xs leading-5 text-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {selectedPackage ? (
            <>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {displayPackages.slice(0, 3).map((pkg) => {
                  const selected = pkg.identifier === selectedPackage.identifier;
                  const planId = planIdForPackage(pkg);
                  const trialEligible =
                    hasFreeIntroTrial(pkg) &&
                    introEligibility[pkg.product.identifier] === INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE;
                  return (
                    <button
                      key={pkg.identifier}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative min-h-[76px] rounded-xl border px-1.5 py-2 text-center transition-all active:scale-[0.98] ${
                        selected
                          ? "border-primary bg-primary/[0.08] shadow-[0_14px_28px_-22px_hsl(var(--primary)/0.75)]"
                          : "border-border/70 bg-background"
                        }`}
                    >
                      {planId === "three_month" && trialEligible ? (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFD166] px-2 py-0.5 text-[8px] font-bold uppercase text-[#1A1A2E]">
                          Trial
                        </span>
                      ) : null}
                      <span className="block text-[11px] font-bold text-foreground">{labelForPackage(pkg)}</span>
                      <span className="mt-1 block text-xs font-semibold text-foreground">{pkg.product.priceString}</span>
                      <span className="mt-0.5 block text-[9px] leading-3 text-muted-foreground">
                        {planId === "lifetime_one_time" ? "once" : unitForPackage(pkg)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-2xl border border-primary/15 bg-primary/[0.06] px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-foreground">{selectedTitle}</span>
                  <span className="text-xs font-semibold text-primary">{selectedHasTrial ? "7-day free trial" : selectedUnit}</span>
                </div>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{selectedTrialCopy}</p>
              </div>

              <button
                disabled={purchasing}
                onClick={() => handlePurchase(selectedPackage)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {purchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {selectedHasTrial && selectedPlanId === "three_month" ? "Start 7-day free trial" : `Choose ${selectedTitle}`}
              </button>
            </>
          ) : (
            <div className="mt-4 rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
              <p>{productsError || "No App Store products loaded yet. Try again in a moment."}</p>
              <button
                type="button"
                onClick={() => void refresh()}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 text-xs font-semibold text-foreground transition-all active:scale-[0.98]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try again
              </button>
            </div>
          )}

          <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-medium text-muted-foreground">
            <button
              type="button"
              onClick={handleRestore}
              disabled={restoring || purchasing}
              className="underline-offset-4 hover:text-foreground hover:underline disabled:opacity-50"
            >
              {restoring ? "Restoring..." : "Restore"}
            </button>
            <span aria-hidden="true">-</span>
            <Link to={ROUTES.TERMS} className="underline-offset-4 hover:text-foreground hover:underline">Terms</Link>
            <span aria-hidden="true">-</span>
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              EULA
            </a>
            <span aria-hidden="true">-</span>
            <Link to={ROUTES.PRIVACY} className="underline-offset-4 hover:text-foreground hover:underline">Privacy</Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NativePricingScreen;

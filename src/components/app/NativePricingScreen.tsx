import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { Check, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useNativePurchases } from "@/hooks/use-native-purchases";
import type { NativePackage } from "@/hooks/use-native-purchases";
import { getTrialStatus, formatTrialCountdown, TRIAL_DAYS } from "@/lib/trial";

interface NativePricingScreenProps {
  currentPlan?: string;
  trialStartedAt?: string | null;
  userId?: string;
  onClose: () => void;
  onSuccess: (plan: string) => void;
}

const NativePricingScreen: React.FC<NativePricingScreenProps> = ({
  currentPlan = "free",
  trialStartedAt = null,
  userId,
  onClose,
  onSuccess,
}) => {
  const { t } = useLang();
  const geo = useGeoPricing();
  const { packages, loading, purchasing, purchase } = useNativePurchases(userId);
  const trial = getTrialStatus(trialStartedAt);
  const [selectedPackage, setSelectedPackage] = useState<NativePackage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-select first package on load
  useEffect(() => {
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0]);
    }
  }, [packages, selectedPackage]);

  const handlePurchase = async (pkg: NativePackage) => {
    setError(null);
    const purchasedPlan = await purchase(pkg);
    if (purchasedPlan) {
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess(purchasedPlan);
      }, 1500);
    } else {
      setError(t.purchase_failed || "Purchase failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{t.loading || "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm p-4 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="w-full max-w-md bg-card rounded-3xl p-6 shadow-2xl border border-border/50 max-h-[90vh] overflow-y-auto animate-spring-up">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onClose} className="text-muted-foreground transition-all active:scale-[0.97]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-serif text-xl font-bold flex-1">{t.unlock_ju}</h1>
        </div>

        {/* Trial Status */}
        {trial.isActive && (
          <div className="bg-primary/[0.06] border border-primary/15 rounded-2xl p-3 mb-5">
            <p className="text-xs font-semibold text-primary mb-1">
              {(t.pro_trial_days_left || "{time} left in your Pro trial").replace(
                "{time}",
                formatTrialCountdown(trial.daysLeft, t)
              )}
            </p>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(trial.daysUsed / TRIAL_DAYS) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3 mb-4 flex gap-2">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3 mb-4 flex gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-600">{t.payment_successful || "Payment successful!"}</p>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-3 mb-6">
          {packages.map((pkg) => (
            <div
              key={pkg.identifier}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPackage?.identifier === pkg.identifier
                  ? "border-primary bg-primary/5"
                  : "border-border/50 bg-muted/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{pkg.product.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{pkg.product.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">{pkg.product.priceString}</p>
                  <p className="text-[10px] text-muted-foreground">per {pkg.product.currencyCode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        {selectedPackage && (
          <button
            disabled={purchasing}
            onClick={() => handlePurchase(selectedPackage)}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.45)] disabled:opacity-50"
          >
            {purchasing ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              `Get ${selectedPackage.product.title}`
            )}
          </button>
        )}

        {/* Footer Text */}
        <p className="text-center text-[11px] text-muted-foreground mt-4">
          {t.no_payment_today || "No payment due today. Cancel anytime."}
        </p>
      </div>
    </div>
  );
};

export default NativePricingScreen;

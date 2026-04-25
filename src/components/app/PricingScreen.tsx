import React from "react";
import { ArrowLeft, Check, Globe } from "lucide-react";

import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { useLang } from "@/lib/i18n";
import { getTrialStatus, formatTrialCountdown, hasActivePremiumPlan } from "@/lib/trial";

interface PricingScreenProps {
  currentPlan?: string;
  trialStartedAt?: string | null;
  onCheckout: (plan: string) => void;
  onBack: () => void;
}

const PricingScreen: React.FC<PricingScreenProps> = ({
  currentPlan = "free",
  trialStartedAt = null,
  onCheckout,
  onBack,
}) => {
  const { t } = useLang();
  const geo = useGeoPricing();
  const trial = getTrialStatus(trialStartedAt);
  const threeMonthSavings = Math.max(0, Math.round((1 - geo.rates.threeMonth / (geo.rates.weekly * 13)) * 100));
  const hasPremium = hasActivePremiumPlan(currentPlan);
  const { snapshot: lifetimeScarcity } = useLifetimeScarcity();

  const plans = [
    {
      id: "weekly",
      title: "Weekly",
      price: geo.formatPrice(geo.rates.weekly),
      unit: "/week",
      description: "Start with the lightest commitment if you want support now and still want to stay cautious.",
      features: [
        "Lightest way to begin",
        "Full premium access while active",
      ],
    },
    {
      id: "three_month",
      title: "3 Month",
      price: geo.formatPrice(geo.rates.threeMonth),
      unit: "/3 months",
      badge: threeMonthSavings > 0 ? `Save ${threeMonthSavings}%` : "Most popular",
      highlight: true,
      description: "A calmer commitment window for seeing whether Ju becomes part of your real emotional routine.",
      features: [
        "Best balance of price and commitment",
        "Made for building the habit",
      ],
    },
    {
      id: "lifetime_one_time",
      title: "Lifetime",
      price: geo.formatPrice(geo.rates.lifetime),
      unit: "one-time",
      badge: "One-time",
      highlight: false,
      description: "One payment for people who already know this kind of support feels right for them.",
      features: [
        "One payment, no renewals",
        "Future premium updates included",
      ],
    },
  ] as const;

  const getCurrentState = (planId: string) => {
    if (planId === "lifetime_one_time") return currentPlan === "lifetime";
    if (planId === "three_month") return currentPlan === "three_month";
    if (planId === "weekly") return currentPlan === "weekly";
    return false;
  };

  return (
    <div className="animate-fade-up mx-auto max-w-app-content pb-8">
      <div className="mb-1 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground transition-all active:scale-[0.97]">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-serif text-xl font-bold">{t.unlock_ju}</h1>
      </div>
      <p className="mb-6 ml-8 text-[13px] text-muted-foreground">
        Choose how closely you want Ju to stay with you after the reveal.
      </p>
      <p className="mb-6 ml-8 text-[13px] text-muted-foreground">
        Weekly is the cautious start, 3 Month is the balanced commitment, and Lifetime is the one-time path.
      </p>

      {trial.isActive && !hasPremium && (
        <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/[0.06] p-4 animate-fade-in">
          <p className="text-sm font-semibold text-foreground">
            {(t.pro_trial_days_left || "{time} left in your Pro trial").replace(
              "{time}",
              formatTrialCountdown(trial.daysLeft, t),
            )}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose weekly, 3 month, or lifetime if you want Ju to keep supporting you without interruption.
          </p>
        </div>
      )}

      {trial.expired && !hasPremium && (
        <div className="mb-5 rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
          <p className="text-sm font-semibold text-foreground">{t.pro_trial_ended_title || "Your Pro trial ended"}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pick weekly, 3 month, or lifetime if you want to reopen full support.
          </p>
        </div>
      )}

      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {geo.hasLocalizedDisplay
              ? `Approximate prices shown in ${geo.displayCurrency} for your region.`
              : geo.currency !== geo.displayCurrency
                ? `Prices shown in ${geo.displayCurrency}. Local currency may appear later at checkout.`
                : (t.pricing_checkout_note || "Prices shown in USD. Local currency appears at checkout.")}
          </span>
        </div>
        {geo.discountPct > 0 && (
          <div className="rounded-full border border-[#4ECDC4]/20 bg-[#4ECDC4]/10 px-3 py-1">
            <span className="text-[11px] font-semibold text-[#4ECDC4]">
              {(t.ppp_discount_applied || "{n}% PPP discount applied for your region").replace("{n}", String(geo.discountPct))}
            </span>
          </div>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = getCurrentState(plan.id);

          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-5 transition-all ${
                plan.id === "lifetime_one_time"
                  ? "border-primary/35 bg-[linear-gradient(180deg,rgba(245,241,255,0.96),rgba(255,255,255,0.99))] shadow-[0_20px_50px_-24px_rgba(124,110,219,0.38)] dark:border-[#9385F6]/45 dark:bg-[radial-gradient(circle_at_top,rgba(156,137,255,0.22),transparent_45%),linear-gradient(180deg,#201934_0%,#161124_100%)] dark:shadow-[0_20px_50px_-24px_rgba(86,70,177,0.55)]"
                  : plan.highlight
                    ? "border-primary/30 bg-primary/5 shadow-md shadow-primary/10"
                    : "border-border/50 bg-card"
              }`}
            >
              {plan.badge && (
                <span className="mb-3 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.unit}</span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-foreground">{plan.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{plan.description}</p>

              {plan.id === "lifetime_one_time" && (
                <LifetimeScarcityMeter
                  className="mt-4"
                  scarcity={lifetimeScarcity}
                />
              )}

              <ul className="mb-5 mt-4 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div className="w-full rounded-2xl bg-muted py-3 text-center text-sm font-medium text-muted-foreground">
                  {t.current_plan}
                </div>
              ) : (
                <button
                    onClick={() => onCheckout(plan.id)}
                    className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                      plan.id === "lifetime_one_time"
                        ? "bg-[linear-gradient(135deg,#7C6EDB,#6A58D8)] text-white shadow-[0_18px_35px_-18px_rgba(124,110,219,0.75)]"
                      : "border border-[#D8D0EE] bg-[#E9E4F6] text-[#2E2550] hover:bg-[#DED6F1] hover:shadow-[0_12px_24px_-18px_rgba(45,37,80,0.35)]"
                  }`}
                >
                  {plan.id === "lifetime_one_time" ? `Choose ${plan.title}` : `Choose ${plan.title}`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingScreen;

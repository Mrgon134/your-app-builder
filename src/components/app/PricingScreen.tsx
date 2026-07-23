import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { Link } from "react-router-dom";

import LifetimeScarcityMeter from "@/components/app/LifetimeScarcityMeter";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLifetimeScarcity } from "@/hooks/use-lifetime-scarcity";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { PRICING_CONFIG } from "@/lib/config";
import { useLang } from "@/lib/i18n";
import { ROUTES } from "@/lib/routes";
import { formatTrialCountdown, getTrialStatus, hasActivePremiumPlan } from "@/lib/trial";
import juGreat from "@/assets/ju-great.webp";

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
  const tiktok = useTikTokPixel();
  const trial = getTrialStatus(trialStartedAt);
  const threeMonthSavings = Math.max(0, Math.round((1 - geo.rates.threeMonth / (geo.rates.weekly * 13)) * 100));
  const hasPremium = hasActivePremiumPlan(currentPlan);
  const { snapshot: lifetimeScarcity } = useLifetimeScarcity();
  const [selectedPlanId, setSelectedPlanId] = useState("three_month");
  const paywallTrackedRef = useRef(false);
  const threeMonthTrialEnabled = PRICING_CONFIG.trial.threeMonthIntroOfferEnabled;
  const threeMonthTrialDays = PRICING_CONFIG.trial.threeMonthDays;
  const paywallBenefits = [
    "Your private Ju Gets You read stays open",
    "Premium voice notes, AI memory, and deeper coach support",
    "Older patterns, relationship maps, and weekly reports",
  ];

  const plans = useMemo(
    () =>
      [
        {
          id: "weekly",
          title: "Weekly",
          price: geo.formatPrice(geo.rates.weekly),
          unit: "per week",
          badge: "Flexible",
          description: "A lighter way to keep Ju nearby for the week ahead.",
          terms: `${geo.formatPrice(geo.rates.weekly)} billed weekly. Cancel anytime.`,
          features: ["Voice, memory, coach, and full history", "Lightest commitment"],
        },
        {
          id: "three_month",
          title: "3 Month",
          price: geo.formatPrice(geo.rates.threeMonth),
          unit: "every 3 months",
          badge: threeMonthTrialEnabled ? `${threeMonthTrialDays}-day trial` : "Recommended",
          description: "The calmer commitment window for seeing whether Ju becomes part of your real emotional routine.",
          terms: threeMonthTrialEnabled
            ? `${threeMonthTrialDays} days free for eligible users, then ${geo.formatPrice(geo.rates.threeMonth)} every 3 months. Cancel anytime.`
            : `${geo.formatPrice(geo.rates.threeMonth)} every 3 months. Cancel anytime.`,
          features: ["Voice, memory, coach, and full history", threeMonthSavings > 0 ? `About ${threeMonthSavings}% below weekly` : "Balanced price"],
        },
        {
          id: "lifetime_one_time",
          title: "Lifetime",
          price: geo.formatPrice(geo.rates.lifetime),
          unit: "one-time",
          badge: "No renewal",
          description: "One payment for people who already know this kind of support feels right.",
          terms: `${geo.formatPrice(geo.rates.lifetime)} one-time purchase. No subscription renewal.`,
          features: ["No renewals", "Future premium updates"],
        },
      ] as const,
    [geo, threeMonthSavings, threeMonthTrialDays, threeMonthTrialEnabled],
  );

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) || plans[1];

  useEffect(() => {
    if (paywallTrackedRef.current) return;
    paywallTrackedRef.current = true;
    tiktok.trackPaywallView("app_pricing", selectedPlan.id);
  }, [selectedPlan.id, tiktok]);

  const getCurrentState = (planId: string) => {
    if (planId === "lifetime_one_time") return currentPlan === "lifetime" || currentPlan === "lifetime_one_time";
    if (planId === "three_month") return currentPlan === "three_month";
    if (planId === "weekly") return currentPlan === "weekly";
    return false;
  };

  return (
    <div className="animate-fade-up mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-md flex-col justify-center pb-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-all active:scale-[0.97]"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">
            {geo.hasLocalizedDisplay
              ? `${geo.displayCurrency} estimate`
              : geo.currency !== geo.displayCurrency
                ? `${geo.displayCurrency} shown`
                : t.pricing_checkout_note || "USD shown"}
          </span>
        </div>
      </div>

      <section className="overflow-hidden rounded-[1.9rem] border border-border/60 bg-card shadow-[0_24px_70px_-42px_rgba(80,63,153,0.5)]">
        <div className="relative h-36 overflow-hidden bg-[linear-gradient(135deg,#211D34_0%,#443B72_48%,#95E1D3_130%)]">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.92))]" />
          <div className="absolute left-5 top-5 max-w-[12rem]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Keep Ju open</p>
            <p className="mt-2 text-xl font-semibold leading-tight text-white">Begin the place that feels like yours.</p>
          </div>
          <img src={juGreat} alt="" className="absolute bottom-2 right-7 h-24 w-24 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)]" />
        </div>

        <div className="px-4 pb-4 pt-3">
          <h1 className="text-center font-serif text-[1.55rem] font-bold leading-tight text-foreground">{t.unlock_ju}</h1>
          <p className="mx-auto mt-1 max-w-[18rem] text-center text-xs leading-5 text-muted-foreground">
            Keep the support that already understands your patterns, without turning it into homework.
          </p>

          {trial.isActive && !hasPremium ? (
            <div className="mt-3 rounded-2xl border border-primary/15 bg-primary/[0.06] px-3 py-2 animate-fade-in">
              <p className="text-xs font-semibold text-foreground">
                {(t.pro_trial_days_left || "{time} left in your Pro trial").replace(
                  "{time}",
                  formatTrialCountdown(trial.daysLeft, t),
                )}
              </p>
            </div>
          ) : null}

          {trial.expired && !hasPremium ? (
            <div className="mt-3 rounded-2xl border border-destructive/20 bg-destructive/10 px-3 py-2">
              <p className="text-xs font-semibold text-foreground">{t.pro_trial_ended_title || "Your Pro trial ended"}</p>
            </div>
          ) : null}

          <div className="mt-3 space-y-2">
            {paywallBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-xs leading-5 text-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {plans.map((plan) => {
              const selected = plan.id === selectedPlan.id;
              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  whileTap={{ scale: 0.96 }}
                  className={`relative min-h-[76px] rounded-xl border px-1.5 py-2 text-center transition-all ${
                    selected
                      ? "border-primary bg-primary/[0.08] shadow-[0_14px_28px_-22px_hsl(var(--primary)/0.75)]"
                      : "border-border/70 bg-background hover:border-primary/30"
                  }`}
                >
                  {"recommended" in plan && plan.recommended ? (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFD166] px-2 py-0.5 text-[8px] font-bold uppercase text-[#1A1A2E]">
                      Trial
                    </span>
                  ) : null}
                  <span className="block text-[11px] font-bold text-foreground">{plan.title}</span>
                  <motion.span
                    className="mt-1 block text-xs font-semibold text-foreground"
                    animate={{ scale: selected ? 1.08 : 1, color: selected ? "hsl(var(--primary))" : "inherit" }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    {plan.price}
                  </motion.span>
                  <span className="mt-0.5 block text-[9px] leading-3 text-muted-foreground">
                    {plan.id === "lifetime_one_time" ? "once" : plan.unit}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlan.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >

          {selectedPlan.id === "lifetime_one_time" ? (
            <LifetimeScarcityMeter className="mt-3" scarcity={lifetimeScarcity} />
          ) : null}

          {getCurrentState(selectedPlan.id) ? (
            <div className="mt-3 w-full rounded-2xl bg-muted py-3 text-center text-sm font-medium text-muted-foreground">
              {t.current_plan}
            </div>
          ) : (
            <button
              onClick={() => onCheckout(selectedPlan.id)}
              className="mt-3 w-full rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98]"
            >
              {selectedPlan.id === "three_month" && threeMonthTrialEnabled
                ? `Start ${threeMonthTrialDays}-day free trial`
                : `Choose ${selectedPlan.title}`}
            </button>
          )}

          <p className="mt-2 text-center text-[10px] leading-4 text-muted-foreground">{selectedPlan.terms}</p>
          {geo.discountPct > 0 ? (
            <p className="mt-1 text-center text-[10px] font-semibold text-[#2A9D94]">
              {(t.ppp_discount_applied || "{n}% PPP discount applied for your region").replace("{n}", String(geo.discountPct))}
            </p>
          ) : null}

          <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-medium text-muted-foreground">
            <Link to={ROUTES.TERMS} className="underline-offset-4 hover:text-foreground hover:underline">Terms</Link>
            <span aria-hidden="true">-</span>
            <Link to={ROUTES.PRIVACY} className="underline-offset-4 hover:text-foreground hover:underline">Privacy</Link>
          </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default PricingScreen;

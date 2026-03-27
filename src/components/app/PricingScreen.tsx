import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Check, ArrowLeft, Globe, Clock, Sparkles } from "lucide-react";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { getTrialStatus, formatTrialCountdown, TRIAL_DAYS } from "@/lib/trial";

interface PricingScreenProps {
  currentPlan?: string;
  trialStartedAt?: string | null;
  onCheckout: (plan: string) => void;
  onStartTrial: () => void;
  onBack: () => void;
}

const PricingScreen: React.FC<PricingScreenProps> = ({ currentPlan = "free", trialStartedAt = null, onCheckout, onStartTrial, onBack }) => {
  const { t } = useLang();
  const [annual, setAnnual] = useState(false);
  const geo = useGeoPricing();
  const trial = getTrialStatus(trialStartedAt);

  const tiers = [
    {
      id: "free",
      name: "Free",
      getPrice: () => 0,
      features: [
        "3 entries per week",
        "Basic mood tracking",
        "7-day history",
      ],
    },
    {
      id: "plus",
      name: "Plus",
      popular: true,
      getPrice: () => annual ? geo.rates.plusAnnual : geo.rates.plusMonthly,
      features: [
        "Unlimited entries",
        "Full history",
        "AI insights",
        "Mood trends & analytics",
        "All coach personas",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      getPrice: () => annual ? geo.rates.proAnnual : geo.rates.proMonthly,
      features: [
        "Everything in Plus",
        "Voice journaling",
        "Relationship mood map",
        "AI memory & patterns",
        "Priority support",
      ],
    },
  ];

  const period = annual ? "/year" : "/month";

  return (
    <div className="animate-fade-up pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-muted-foreground transition-all active:scale-[0.97]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-xl font-bold">{t.unlock_ju}</h1>
      </div>

      {/* Trial status banner */}
      {trial.isActive && (
        <div className="bg-primary/[0.06] border border-primary/15 rounded-2xl p-4 mb-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {formatTrialCountdown(trial.daysLeft)}
              </p>
              <p className="text-xs text-muted-foreground">Subscribe now to keep your access</p>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${trial.daysLeft <= 2 ? "bg-[#FFB347]" : "bg-primary"}`}
              style={{ width: `${(trial.daysUsed / TRIAL_DAYS) * 100}%` }}
            />
          </div>
        </div>
      )}

      {trial.expired && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-sm font-semibold text-foreground">Trial ended</p>
              <p className="text-xs text-muted-foreground">Subscribe to keep unlimited access</p>
            </div>
          </div>
        </div>
      )}

      {/* Currency badge */}
      {geo.currency !== "USD" && (
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Prices shown in {geo.currency}
          </span>
        </div>
      )}

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
          {t.monthly}
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-12 h-7 rounded-full transition-colors ${annual ? "bg-primary" : "bg-muted"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
              annual ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
          {t.annual}
        </span>
      </div>

      {/* Tier cards */}
      <div className="space-y-4">
        {tiers.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          const price = tier.getPrice();

          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-5 border transition-all ${
                tier.popular
                  ? "bg-primary/5 border-primary/30 shadow-md shadow-primary/10"
                  : "bg-card border-border/50"
              }`}
            >
              {tier.popular && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                  Most popular
                </span>
              )}

              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-serif text-2xl font-bold text-foreground">
                  {price === 0 ? "Free" : geo.formatPrice(price)}
                </span>
                {price > 0 && (
                  <span className="text-sm text-muted-foreground">{period}</span>
                )}
              </div>

              <h3 className="font-semibold text-base text-foreground mb-3">{tier.name}</h3>

              <ul className="space-y-2.5 mb-5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div className="w-full py-3 rounded-2xl bg-muted text-center text-sm font-medium text-muted-foreground">
                  {t.current_plan}
                </div>
              ) : tier.id === "free" ? null : (
                <div className="space-y-2">
                  {trial.notStarted && tier.id === "plus" && (
                    <button
                      onClick={onStartTrial}
                      className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                    >
                      Start {TRIAL_DAYS}-day free trial
                    </button>
                  )}
                  <button
                    onClick={() => onCheckout(`${tier.id}_${annual ? "annual" : "monthly"}`)}
                    className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${
                      tier.popular && trial.notStarted
                        ? "bg-primary/10 text-primary"
                        : tier.popular
                          ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {trial.isActive || trial.expired ? "Subscribe" : t.start_trial}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingScreen;

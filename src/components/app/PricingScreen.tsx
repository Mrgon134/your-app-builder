import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Check, ArrowLeft, Globe } from "lucide-react";
import { useGeoPricing } from "@/hooks/use-geo-pricing";

interface PricingScreenProps {
  currentPlan?: string;
  onCheckout: (plan: string) => void;
  onBack: () => void;
}

const PricingScreen: React.FC<PricingScreenProps> = ({ currentPlan = "free", onCheckout, onBack }) => {
  const { t } = useLang();
  const [annual, setAnnual] = useState(false);
  const geo = useGeoPricing();

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
                <button
                  onClick={() => onCheckout(`${tier.id}_${annual ? "annual" : "monthly"}`)}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${
                    tier.popular
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t.start_trial}
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

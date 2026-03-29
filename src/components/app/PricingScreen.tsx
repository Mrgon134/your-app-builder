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
  const [annual, setAnnual] = useState(true);
  const geo = useGeoPricing();
  const trial = getTrialStatus(trialStartedAt);

  // Dynamic savings % based on actual rates
  const savingsPct = Math.round((1 - (geo.rates.plusAnnual / 12) / geo.rates.plusMonthly) * 100);

  // Per-day price helper — only for annual, null for free
  const getPricePerDay = (annualPrice: number): string | null => {
    if (annualPrice === 0) return null;
    const perDay = annualPrice / 365;
    const rounded = ["IDR", "JPY", "KRW", "VND"].includes(geo.currency)
      ? Math.round(perDay)
      : Math.round(perDay * 100) / 100;
    return geo.formatPrice(rounded);
  };

  const tiers = [
    {
      id: "free",
      name: t.free || "Free",
      tagline: null as string | null,
      getPrice: () => 0,
      features: [
        t.free_feature_1 || "Unlimited journal entries",
        t.free_feature_2 || "Mood tracking & streaks",
        t.free_feature_3 || "7-day history",
        t.free_feature_4 || "Basic AI coach (5 msgs/week)",
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: t.plus_tagline || "Remember everything. Understand yourself.",
      popular: true,
      getPrice: () => annual ? geo.rates.plusAnnual : geo.rates.plusMonthly,
      features: [
        t.plus_feature_1 || "AI insight after every entry",
        t.plus_feature_2 || "Unlimited history",
        t.plus_feature_3 || "See your mood patterns over 30 days",
        t.plus_feature_4 || "4 different coaching styles",
        t.plus_feature_5 || "Monthly mood reports",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: t.pro_tagline || "Everything, unlocked.",
      getPrice: () => annual ? geo.rates.proAnnual : geo.rates.proMonthly,
      features: [
        t.pro_feature_1 || "Everything in Plus",
        t.pro_feature_2 || "Voice journaling",
        t.pro_feature_3 || "Relationship mood map",
        t.pro_feature_4 || "AI memory & patterns",
        t.pro_feature_5 || "Priority support",
      ],
    },
  ];

  // Monthly-equivalent display when annual
  const getPriceDisplay = (price: number) => {
    if (!annual || price === 0) return geo.formatPrice(price);
    return geo.formatPrice(Math.round(price / 12 * 100) / 100);
  };
  const periodDisplay = annual ? (t.mo_billed_yearly || "/mo, billed yearly") : `/${t.month || "month"}`;

  return (
    <div className="animate-fade-up pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <button onClick={onBack} className="text-muted-foreground transition-all active:scale-[0.97]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-xl font-bold">{t.unlock_ju}</h1>
      </div>
      <p className="text-[13px] text-muted-foreground mb-6 ml-8">
        {t.pricing_social_proof || "Join 10,000+ journalers worldwide"}
      </p>

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
              <p className="text-xs text-muted-foreground">{t.trial_subscribe_now || "Subscribe now to keep your access"}</p>
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
              <p className="text-sm font-semibold text-foreground">{t.trial_ended || "Trial ended"}</p>
              <p className="text-xs text-muted-foreground">{t.trial_subscribe_now || "Subscribe now to keep your access"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Currency badge */}
      {geo.currency !== "USD" && (
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {(t.prices_in_currency || "Prices shown in {currency}").replace("{currency}", geo.currency)}
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
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            {t.annual || "Annual"}
          </span>
          {annual && savingsPct > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#4ECDC4]/15 text-[#4ECDC4] uppercase tracking-wide">
              {(t.save_pct || "Save {n}%").replace("{n}", String(savingsPct))}
            </span>
          )}
        </div>
      </div>

      {/* Tier cards */}
      <div className="space-y-4">
        {tiers.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          const price = tier.getPrice();
          const perDay = annual ? getPricePerDay(price) : null;

          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-5 border transition-all ${
                (tier as { popular?: boolean }).popular
                  ? "bg-primary/5 border-primary/30 shadow-md shadow-primary/10"
                  : "bg-card border-border/50"
              }`}
            >
              {(tier as { popular?: boolean }).popular && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                  {t.most_popular || "Most popular"}
                </span>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="font-serif text-2xl font-bold text-foreground">
                  {price === 0 ? (t.free || "Free") : getPriceDisplay(price)}
                </span>
                {price > 0 && (
                  <span className="text-sm text-muted-foreground">{periodDisplay}</span>
                )}
              </div>

              {/* Per-day & billed-yearly line */}
              {price > 0 && annual && (
                <div className="flex items-center gap-2 mt-0.5 mb-1">
                  {perDay && (
                    <span className="text-[11px] font-medium text-primary/70">
                      {(t.per_day || "~{price}/day").replace("{price}", perDay)}
                    </span>
                  )}
                  {perDay && <span className="text-[10px] text-muted-foreground/40">·</span>}
                  <span className="text-[11px] text-muted-foreground">
                    {(t.billed_yearly || "Billed {price} once per year").replace("{price}", geo.formatPrice(price))}
                  </span>
                </div>
              )}

              {/* Tier name + tagline */}
              <h3 className="font-semibold text-base text-foreground mt-3 mb-0.5">{tier.name}</h3>
              {tier.tagline && (
                <p className="text-[12px] text-muted-foreground mb-3 leading-snug">{tier.tagline}</p>
              )}
              {!tier.tagline && <div className="mb-3" />}

              {/* Feature list */}
              <ul className="space-y-2.5 mb-5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isCurrent ? (
                <div className="w-full py-3 rounded-2xl bg-muted text-center text-sm font-medium text-muted-foreground">
                  {t.current_plan}
                </div>
              ) : tier.id === "free" ? null : (
                <div className="space-y-2">
                  {/* Trial CTA — Plus only, trial not yet started */}
                  {trial.notStarted && tier.id === "plus" && (
                    <button
                      onClick={onStartTrial}
                      className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.45)]"
                    >
                      {(t.start_trial_n_days || "Try {plan} free for {n} days")
                        .replace("{plan}", tier.name)
                        .replace("{n}", String(TRIAL_DAYS))}
                    </button>
                  )}

                  {/* Subscribe / Get plan button */}
                  <button
                    onClick={() => onCheckout(`${tier.id}_${annual ? "annual" : "monthly"}`)}
                    className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${
                      (tier as { popular?: boolean }).popular && trial.notStarted
                        ? "bg-primary/10 text-primary"
                        : (tier as { popular?: boolean }).popular
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.45)]"
                          : "bg-secondary text-foreground"
                    }`}
                  >
                    {trial.isActive || trial.expired
                      ? (t.subscribe_to || "Subscribe to {name}").replace("{name}", tier.name)
                      : trial.notStarted && tier.id === "plus"
                        ? `${(t.subscribe_to || "Subscribe to {name}").replace("{name}", tier.name)} — ${geo.formatPrice(tier.getPrice())}${annual ? "/yr" : "/mo"}`
                        : (t.get_plan || "Get {name}").replace("{name}", tier.name)}
                  </button>

                  {(tier as { popular?: boolean }).popular && (
                    <p className="text-center text-[11px] text-muted-foreground">
                      {t.no_payment_today || "No payment due today. Cancel anytime."}
                    </p>
                  )}
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

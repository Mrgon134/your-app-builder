import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Check, ArrowLeft, Globe, Clock, Sparkles, Loader2, X, Flame } from "lucide-react";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { getTrialStatus, formatTrialCountdown, TRIAL_DAYS } from "@/lib/trial";
import { PRICING_CONFIG } from "@/lib/config";

interface PricingScreenProps {
  currentPlan?: string;
  trialStartedAt?: string | null;
  onCheckout: (plan: string) => void;
  onStartTrial: () => void;
  onBack: () => void;
}

const PricingScreen: React.FC<PricingScreenProps> = ({
  currentPlan = "free",
  trialStartedAt = null,
  onCheckout,
  onStartTrial,
  onBack,
}) => {
  const { t } = useLang();
  const [annual, setAnnual] = useState(true);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);
  const geo = useGeoPricing();
  const trial = getTrialStatus(trialStartedAt);

  const savingsPct = Math.round((1 - (geo.rates.plusAnnual / 12) / geo.rates.plusMonthly) * 100);

  const getPricePerWeek = (amount: number, billedAnnually: boolean): string | null => {
    if (amount === 0) return null;
    const perWeek = billedAnnually ? amount / 52 : amount / 4.345;
    return geo.formatPrice(Math.round(perWeek * 100) / 100);
  };

  const lifetimeBreakEvenMonths = 0;

  const tiers = [
    {
      id: "free",
      name: t.free || "Free",
      tagline: null as string | null,
      badge: null as string | null,
      highlight: false,
      getPrice: () => 0,
      features: [
        t.free_feature_1 || "Unlimited journal entries",
        t.free_feature_2_v2 || "Mood + energy tracking",
        t.free_feature_3 || "7-day history",
        t.free_feature_4_v2 || "Gentle coach (5 msgs/week)",
      ],
    },
    {
      id: "plus",
      name: "Plus",
      tagline: t.plus_tagline_v2 || "Keep every entry, insight, and coaching thread in one calm place.",
      badge: t.plus_badge || "Best everyday value",
      highlight: false,
      getPrice: () => annual ? geo.rates.plusAnnual : geo.rates.plusMonthly,
      features: [
        t.plus_feature_1_v2 || "AI insight after every entry",
        t.plus_feature_2_v2 || "Unlimited history",
        t.plus_feature_3_v2 || "30-day mood trends + weekly summaries",
        t.plus_feature_4_v2 || "All 4 coach personas",
        t.plus_feature_5_v2 || "Unlimited AI coach chats",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: t.pro_tagline_v2 || "Full Ju experience with voice, memory, and deeper pattern spotting.",
      badge: trial.notStarted
        ? (t.pro_trial_badge || "Includes 7-day free trial")
        : (t.most_popular || "Most popular"),
      highlight: false,
      getPrice: () => annual ? geo.rates.proAnnual : geo.rates.proMonthly,
      features: [
        t.pro_feature_1_v2 || "Everything in Plus",
        t.pro_feature_2_v2 || "Voice journaling + transcription",
        t.pro_feature_3_v2 || "AI memory + recurring pattern cards",
        t.pro_feature_4_v2 || "Relationship mood map",
        t.pro_feature_5_v2 || "Priority access to new premium features",
      ],
    },
    {
      id: "lifetime",
      name: "Lifetime Pro",
      tagline: t.lifetime_tagline_v2 || "One payment, full access forever.",
      badge: "Early Access",
      highlight: true,
      getPrice: () => geo.rates.lifetime,
      features: [
        t.lifetime_feature_1 || "Everything in Pro",
        t.lifetime_feature_2 || "One payment, no renewals",
        t.lifetime_feature_3 || "Keep every future Pro upgrade",
        t.lifetime_feature_4 || "Best value if Nuju becomes your daily habit",
        t.lifetime_feature_5 || "Forever access to the premium stack",
      ],
    },
  ];

  const getPriceDisplay = (price: number) => {
    if (!annual || price === 0) return geo.formatPrice(price);
    return geo.formatPrice(Math.round(price / 12 * 100) / 100);
  };

  const periodDisplay = annual ? (t.mo_billed_yearly || "/mo, billed yearly") : `/${t.month || "month"}`;

  return (
    <div className="animate-fade-up mx-auto max-w-app-content pb-8">
      <div className="flex items-center gap-3 mb-1">
        <button onClick={onBack} className="text-muted-foreground transition-all active:scale-[0.97]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-xl font-bold">{t.unlock_ju}</h1>
      </div>
      <p className="text-[13px] text-muted-foreground mb-6 ml-8">
        {t.pricing_social_proof || "Join 10,000+ journalers worldwide"}
      </p>

      {trial.isActive && (
        <div className="bg-primary/[0.06] border border-primary/15 rounded-2xl p-4 mb-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {(t.pro_trial_days_left || "{time} left in your Pro trial").replace("{time}", formatTrialCountdown(trial.daysLeft, t))}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.pro_trial_pricing_sub || "You have full Pro access right now. Choose the plan you want to keep after the trial."}
              </p>
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
              <p className="text-sm font-semibold text-foreground">{t.pro_trial_ended_title || "Your Pro trial ended"}</p>
              <p className="text-xs text-muted-foreground">
                {t.pro_trial_ended_sub || "Choose Plus to keep the essentials, or Pro to keep voice, memory, and deeper AI features."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {geo.hasLocalizedDisplay
              ? `Approximate prices shown in ${geo.displayCurrency} for your region. Checkout may vary slightly with taxes or processor rounding.`
              : geo.currency !== geo.displayCurrency
                ? `Prices shown in ${geo.displayCurrency}. Local currency may appear later at checkout.`
              : (t.pricing_checkout_note || "Prices shown in USD. Local currency appears at checkout.")}
          </span>
        </div>
        {geo.discountPct > 0 && (
          <div className="flex items-center gap-1.5 bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 rounded-full px-3 py-1">
            <span className="text-[11px] font-semibold text-[#4ECDC4]">
              {(t.ppp_discount_applied || "{n}% PPP discount applied for your region").replace("{n}", String(geo.discountPct))}
            </span>
          </div>
        )}
      </div>

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

      <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-4">
        {tiers.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          const price = tier.getPrice();
          const perWeek = tier.id === "lifetime" ? null : getPricePerWeek(price, annual);

          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-5 border transition-all ${
                tier.highlight
                  ? "bg-primary/5 border-primary/30 shadow-md shadow-primary/10"
                  : "bg-card border-border/50"
              }`}
            >
              {tier.badge && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                  {tier.badge}
                </span>
              )}

              {tier.id === "lifetime" && PRICING_CONFIG.lifetimeSlots.left > 0 && (
                <div className="flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/25 rounded-2xl px-4 py-2.5 mb-3">
                  <Flame className="w-5 h-5 text-[#FF6B35] shrink-0" />
                  <span className="text-sm font-bold text-[#FF6B35]">
                    Only {PRICING_CONFIG.lifetimeSlots.left}/{PRICING_CONFIG.lifetimeSlots.total} Early Access slots left
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="font-serif text-2xl font-bold text-foreground">
                  {price === 0 ? (t.free || "Free") : tier.id === "lifetime" ? geo.formatPrice(price) : getPriceDisplay(price)}
                </span>
                {price > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {tier.id === "lifetime" ? " one-time" : periodDisplay}
                  </span>
                )}
              </div>

              {price > 0 && annual && tier.id !== "lifetime" && (
                <div className="flex items-center gap-2 mt-0.5 mb-1">
                  {perWeek && (
                    <span className="text-[11px] font-medium text-primary/70">
                      {(t.per_week || "~{price}/week").replace("{price}", perWeek)}
                    </span>
                  )}
                  {perWeek && <span className="text-[10px] text-muted-foreground/40">|</span>}
                  <span className="text-[11px] text-muted-foreground">
                    {(t.billed_yearly || "Billed {price} once per year").replace("{price}", geo.formatPrice(price))}
                  </span>
                </div>
              )}

              {tier.id === "lifetime" && lifetimeBreakEvenMonths > 0 && (
                <div className="mt-1 mb-1">
                  <span className="text-[11px] font-medium text-primary/75">
                    {(t.lifetime_break_even || "Break-even in ~{months} months vs Pro annual").replace("{months}", String(lifetimeBreakEvenMonths))}
                  </span>
                </div>
              )}

              <h3 className="font-semibold text-base text-foreground mt-3 mb-0.5">{tier.name}</h3>
              {tier.tagline && (
                <p className="text-[12px] text-muted-foreground mb-3 leading-snug">{tier.tagline}</p>
              )}
              {!tier.tagline && <div className="mb-3" />}

              <ul className="space-y-2.5 mb-5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div className="w-full py-3 rounded-2xl bg-muted text-center text-sm font-medium text-muted-foreground">
                  {t.current_plan}
                </div>
              ) : tier.id === "free" ? null : (
                <div className="space-y-2">
                  {trial.notStarted && tier.id === "pro" && (
                    <button
                      onClick={() => setShowTrialModal(true)}
                      className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.45)]"
                    >
                      {(t.start_pro_trial_n_days || "Try Pro free for {n} days").replace("{n}", String(TRIAL_DAYS))}
                    </button>
                  )}

                  <button
                    onClick={() => onCheckout(tier.id === "lifetime" ? "lifetime_one_time" : `${tier.id}_${annual ? "annual" : "monthly"}`)}
                    className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.97] ${
                      tier.highlight && trial.notStarted
                        ? "bg-primary/10 text-primary"
                        : tier.highlight
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.45)]"
                          : "bg-secondary text-foreground"
                    }`}
                  >
                    {tier.id === "lifetime"
                      ? (t.get_lifetime_cta || "Get Lifetime Pro - {price}").replace("{price}", geo.formatPrice(tier.getPrice()))
                      : trial.isActive || trial.expired
                        ? (t.subscribe_to || "Subscribe to {name}").replace("{name}", tier.name)
                        : trial.notStarted && tier.id === "pro"
                          ? `${(t.subscribe_to || "Subscribe to {name}").replace("{name}", tier.name)} - ${geo.formatPrice(tier.getPrice())}${annual ? "/yr" : "/mo"}`
                          : (t.get_plan || "Get {name}").replace("{name}", tier.name)}
                  </button>

                  {tier.highlight && (
                    <p className="text-center text-[11px] text-muted-foreground">
                      {trial.notStarted
                        ? (t.pro_trial_no_charge_today || "No payment due today. Start with full Pro access first.")
                        : (t.no_payment_today || "No payment due today. Cancel anytime.")}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showTrialModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/30 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowTrialModal(false)}
        >
          <div
            className="w-full max-w-sm bg-card rounded-[32px] p-6 shadow-2xl border border-border/50 animate-spring-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center animate-ju-float">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <button
                onClick={() => setShowTrialModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              {t.pro_trial_modal_title || "Start 7-Day Pro Trial"}
            </h3>
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
              {t.pro_trial_modal_body || "Unlock full Pro access: voice journaling, unlimited AI coach, AI memory, deeper insights, and your full history."}
              <br />
              <br />
              <span className="font-medium text-foreground">{t.pro_trial_modal_subhead || "No payment required right now."}</span>{" "}
              {t.pro_trial_modal_footer || "Start with the trial, then choose Plus, Pro, or Lifetime later if Nuju becomes part of your weekly routine."}
            </p>

            <div className="space-y-2.5">
              <button
                disabled={trialLoading}
                onClick={() => {
                  setTrialLoading(true);
                  setTimeout(() => {
                    onStartTrial();
                    setShowTrialModal(false);
                  }, 800);
                }}
                className="w-full h-14 rounded-2xl font-semibold text-[15px] bg-primary text-primary-foreground transition-transform active:scale-[0.98] flex items-center justify-center"
              >
                {trialLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (t.confirm_pro_trial || "Confirm My Pro Trial")}
              </button>
              <p className="text-center text-[11px] text-muted-foreground/60 w-full mb-2">
                {t.pro_trial_cancel_copy || "Cancel anytime before standard terms apply."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingScreen;

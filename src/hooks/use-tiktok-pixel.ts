import { useMemo } from "react";
import { isNative } from "@/lib/platform";
import { PRICING_CONFIG } from "@/lib/config";

const ttq = () => (isNative() || typeof window === "undefined" ? undefined : window.ttq);

const PIXEL_ID = "nuju_app";

const PLAN_LABELS: Record<string, string> = {
  weekly: "Weekly",
  three_month: "3 Month",
  lifetime_one_time: "Lifetime",
};

const PLAN_VALUES: Record<string, number> = {
  weekly: PRICING_CONFIG.baseRates.weekly,
  three_month: PRICING_CONFIG.baseRates.threeMonth,
  lifetime_one_time: PRICING_CONFIG.lifetime.flatPrice,
};

const planName = (plan: string) => PLAN_LABELS[plan] || plan;
const planValue = (plan: string) => PLAN_VALUES[plan] ?? 0;
const planContentType = (plan: string) => plan === "lifetime_one_time" ? "product" : "subscription";

const planPayload = (plan: string, source?: string, value = planValue(plan)) => ({
  content_id: plan,
  content_ids: [plan],
  content_name: planName(plan),
  content_type: planContentType(plan),
  currency: "USD",
  value,
  ...(source ? { description: source } : {}),
});

export const useTikTokPixel = () => useMemo(() => ({
  // Landing page view -> ViewContent
  trackPageView: () => {
    ttq()?.track("ViewContent", {
      content_id: PIXEL_ID,
      content_ids: [PIXEL_ID],
      content_name: "Landing Page",
      content_type: "product",
    });
  },

  // Paid plan CTA click before the paywall -> AddToCart
  trackAddToCart: (plan: string) => {
    ttq()?.track("AddToCart", planPayload(plan, "landing_plan_cta"));
  },

  // Pricing/paywall section visible -> ViewContent, not checkout intent
  trackPricingView: () => {
    ttq()?.track("ViewContent", {
      content_id: PIXEL_ID,
      content_ids: [PIXEL_ID],
      content_name: "Pricing Teaser",
      content_category: "pricing",
      content_type: "product",
    });
  },

  // Real paywall visible -> ViewContent with paywall context
  trackPaywallView: (source: string, selectedPlan?: string | null) => {
    ttq()?.track("ViewContent", {
      content_id: selectedPlan || "nuju_paywall",
      content_ids: [selectedPlan || "nuju_paywall"],
      content_name: selectedPlan ? `${planName(selectedPlan)} Paywall` : "Nuju Paywall",
      content_category: "paywall",
      content_type: selectedPlan ? planContentType(selectedPlan) : "product",
      ...(selectedPlan ? { value: planValue(selectedPlan), currency: "USD" } : {}),
      description: source,
    });
  },

  // Checkout button click / Dodo checkout start -> InitiateCheckout
  trackCheckoutStarted: (plan: string, source: string) => {
    ttq()?.track("InitiateCheckout", planPayload(plan, source));
  },

  // Waitlist/free signup -> CompleteRegistration
  trackWaitlistSignup: (email?: string) => {
    ttq()?.track("CompleteRegistration", {
      content_id: PIXEL_ID,
      content_ids: [PIXEL_ID],
      content_name: "Waitlist Signup",
      ...(email && { email }),
    });
  },

  // Dodo checkout confirmed -> Subscribe
  trackSubscribe: (plan: string, value?: number) => {
    ttq()?.track("Subscribe", planPayload(plan, "dodo_checkout_complete", value ?? planValue(plan)));
  },

  // Auth signup -> CompleteRegistration
  trackSignup: () => {
    ttq()?.track("CompleteRegistration", {
      content_id: PIXEL_ID,
      content_ids: [PIXEL_ID],
      content_name: "Account Signup",
    });
  },
}), []);

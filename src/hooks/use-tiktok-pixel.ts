import { isNative } from "@/lib/platform";

const ttq = () => (isNative() ? undefined : window.ttq);

const PIXEL_ID = "nuju_app";

export const useTikTokPixel = () => ({
  // Landing page view -> ViewContent
  trackPageView: () => {
    ttq()?.track("ViewContent", {
      content_id: PIXEL_ID,
      content_name: "Landing Page",
      content_type: "product",
    });
  },

  // Paid plan CTA click -> AddToCart (completes the funnel gap)
  trackAddToCart: (plan: string) => {
    ttq()?.track("AddToCart", {
      content_id: plan,
      content_name: plan,
      content_type: "product",
    });
  },

  // Pricing section visible -> InitiateCheckout
  trackPricingView: () => {
    ttq()?.track("InitiateCheckout", {
      content_id: PIXEL_ID,
      content_name: "Pricing",
      content_type: "product",
    });
  },

  // Waitlist/free signup -> CompleteRegistration
  trackWaitlistSignup: (email?: string) => {
    ttq()?.track("CompleteRegistration", {
      content_id: PIXEL_ID,
      content_name: "Waitlist Signup",
      ...(email && { email }),
    });
  },

  // Subscription confirmed -> Subscribe
  trackSubscribe: (plan: string, value: number) => {
    ttq()?.track("Subscribe", {
      content_id: plan,
      content_name: plan,
      value,
      currency: "USD",
    });
  },

  // Auth signup -> CompleteRegistration
  trackSignup: () => {
    ttq()?.track("CompleteRegistration", {
      content_id: PIXEL_ID,
      content_name: "Account Signup",
    });
  },
});

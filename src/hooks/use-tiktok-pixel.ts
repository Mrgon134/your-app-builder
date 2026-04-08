const ttq = () => window.ttq;

export const useTikTokPixel = () => {
  return {
    // Landing page view → ViewContent
    trackPageView: () => {
      ttq()?.track("ViewContent", {
        content_name: "Landing Page",
        content_type: "product",
      });
    },

    // Waitlist signup → CompleteRegistration
    trackWaitlistSignup: (email?: string) => {
      ttq()?.track("CompleteRegistration", {
        content_name: "Waitlist Signup",
        ...(email && { email }),
      });
    },

    // Pricing section visible → InitiateCheckout
    trackPricingView: () => {
      ttq()?.track("InitiateCheckout", {
        content_name: "Pricing",
        content_type: "product",
      });
    },

    // Subscription confirmed → Subscribe
    trackSubscribe: (plan: string, value: number) => {
      ttq()?.track("Subscribe", {
        content_name: plan,
        value,
        currency: "USD",
      });
    },

    // Auth signup → CompleteRegistration
    trackSignup: () => {
      ttq()?.track("CompleteRegistration", {
        content_name: "Account Signup",
      });
    },
  };
};

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const navigateMock = vi.fn();
const seoHeadProps = vi.fn();
const posthogEvents = {
  trackLandingView: vi.fn(),
  trackFunnelStart: vi.fn(),
  trackPricingView: vi.fn(),
};
const tiktokEvents = {
  trackPageView: vi.fn(),
  trackWaitlistSignup: vi.fn(),
  trackAddToCart: vi.fn(),
  trackPricingView: vi.fn(),
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("framer-motion", async () => {
  const ReactModule = await vi.importActual<typeof import("react")>("react");

  type MotionMockProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
    onViewportEnter?: () => void;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
    whileInView?: unknown;
    whileHover?: unknown;
    viewport?: unknown;
  };

  const createMotionComponent = (tag: string) => {
    const MotionComponent = ReactModule.forwardRef<HTMLElement, MotionMockProps>(function MotionComponent(
      { children, onViewportEnter, initial, animate, exit, transition, whileInView, whileHover, viewport, ...rest },
      ref,
    ) {
      ReactModule.useEffect(() => {
        onViewportEnter?.();
      }, [onViewportEnter]);

      return ReactModule.createElement(tag, { ...rest, ref }, children);
    });

    MotionComponent.displayName = `Motion(${tag})`;
    return MotionComponent;
  };

  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) => createMotionComponent(tag),
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("@/hooks/use-geo-pricing", () => ({
  useGeoPricing: () => ({
    country: "US",
    displayCurrency: "USD",
    currency: "USD",
    symbol: "$",
    hasLocalizedDisplay: false,
    usdConversionRate: null,
    rates: {
      weekly: 4.99,
      threeMonth: 19.99,
      yearly: 59.99,
      plusMonthly: 4.99,
      plusAnnual: 39.99,
      proMonthly: 9.99,
      proAnnual: 79.99,
      lifetime: 49.99,
    },
    isLoading: false,
    couponCode: null,
    discountPct: 0,
    formatPrice: (amount: number) => `$${amount.toFixed(2)}`,
  }),
}));

vi.mock("@/hooks/use-posthog-events", () => ({
  usePostHogEvents: () => posthogEvents,
}));

vi.mock("@/hooks/use-tiktok-pixel", () => ({
  useTikTokPixel: () => tiktokEvents,
}));

vi.mock("@/hooks/use-lifetime-scarcity", () => ({
  useLifetimeScarcity: () => ({
    snapshot: {
      sold: 11,
      left: 14,
      total: 25,
      percentageClaimed: 44,
    },
  }),
}));

vi.mock("@/components/landing/HeroPatternPreview", () => ({
  default: () => <div data-testid="hero-pattern-preview" />,
}));

vi.mock("@/components/app/LifetimeScarcityMeter", () => ({
  default: () => <div data-testid="lifetime-scarcity-meter" />,
}));

vi.mock("@/components/SEOHead", () => ({
  default: (props: unknown) => {
    seoHeadProps(props);
    return null;
  },
}));

vi.mock("@/components/ui/Magnetic", () => ({
  Magnetic: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import Landing from "@/pages/Landing";

const renderLanding = () =>
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>,
  );

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Landing page anatomy", () => {
  it("sets homepage metadata with brand-led title for branded SERP CTR and category relevance", () => {
    renderLanding();

    expect(seoHeadProps).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Nuju - AI Journal App for Mood Tracking & Emotional Clarity",
        description:
          "Nuju is the AI journal and mood tracker app for racing thoughts, 3am overthinking, and feelings you can't name yet. Turn 30 seconds of mess into a read that lands. Start the Ju Gets You reveal free.",
        canonical: "https://nuju.app/",
        noSuffix: true,
      }),
    );
  });

  it("fires landing view analytics on render", () => {
    renderLanding();

    expect(posthogEvents.trackLandingView).toHaveBeenCalledTimes(1);
    expect(tiktokEvents.trackPageView).toHaveBeenCalledTimes(1);
  });
});

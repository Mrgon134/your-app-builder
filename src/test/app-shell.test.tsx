import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const profile = {
  onboarded: true,
  plan: "free",
  streak_current: 3,
  trial_started_at: null,
  dark_mode: false,
};

vi.mock("@/lib/i18n", () => ({
  useLang: () => ({
    t: {
      home: "Home",
      insights_label: "Insights",
      coach_label: "Coach",
      write: "Write",
      unlock_ju: "Unlock Ju",
      settings: "Settings",
      history_label: "History",
      pro_trial_started_toast: "",
      pro_trial_error_toast: "",
      checkout_error: "",
      checkout_failed: "",
      payments_coming_soon: "",
      signup_title: "Ju knows you now",
      signup_desc: "Create an account",
      signup_btn: "Save my journal",
      signup_later: "Maybe later",
      subscription_updated: "Subscription updated",
    },
    lang: "en",
  }),
}));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({
    user: {
      id: "user-1",
      email: "user@example.com",
      user_metadata: { full_name: "Test User" },
    },
  }),
}));

vi.mock("@/hooks/use-geo-pricing", () => ({
  useGeoPricing: () => ({ country: "US", couponCode: null }),
}));

vi.mock("@/hooks/use-posthog-events", () => ({
  usePostHogEvents: () => ({
    trackAppOpen: vi.fn(),
    trackScreenView: vi.fn(),
    trackMoodSelected: vi.fn(),
    trackEntryCreated: vi.fn(),
  }),
}));

vi.mock("@/lib/trial", () => ({
  hasActivePremiumPlan: () => false,
  hasPlusAccess: () => false,
  hasProAccess: () => false,
  getTrialStatus: () => ({ notStarted: true, isActive: false, expired: false, daysLeft: 0, daysUsed: 0 }),
}));

vi.mock("@/lib/platform", () => ({
  isNative: () => false,
  isIOS: () => false,
  isAndroid: () => false,
}));

vi.mock("@/integrations/supabase/client", () => ({
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_ANON_KEY: "anon-key",
}));

vi.mock("@/lib/api", () => ({
  fetchProfile: vi.fn(async () => profile),
  fetchEntries: vi.fn(async () => []),
  updateProfile: vi.fn(),
  checkEntryLimit: vi.fn(async () => true),
  createEntry: vi.fn(),
  createQuickEntry: vi.fn(),
  updateEntryInsight: vi.fn(),
  uploadVoiceAudio: vi.fn(),
  updateEntryVoice: vi.fn(),
  uploadPhoto: vi.fn(),
  updateEntryPhoto: vi.fn(),
}));

vi.mock("@/components/app/OnboardingScreen", () => ({ default: () => <div data-testid="onboarding-screen" /> }));
vi.mock("@/components/app/HomeScreen", () => ({ default: () => <div data-testid="home-screen" /> }));
vi.mock("@/components/app/JournalScreen", () => ({ default: () => <div data-testid="journal-screen" /> }));
vi.mock("@/components/app/InsightsScreen", () => ({ default: () => <div data-testid="insights-screen" /> }));
vi.mock("@/components/app/CoachScreen", () => ({ default: () => <div data-testid="coach-screen" /> }));
vi.mock("@/components/app/SettingsScreen", () => ({ default: () => <div data-testid="settings-screen" /> }));
vi.mock("@/components/app/PricingScreen", () => ({ default: () => <div data-testid="pricing-screen" /> }));
vi.mock("@/components/app/NativePricingScreen", () => ({ default: () => <div data-testid="native-pricing-screen" /> }));
vi.mock("@/components/app/GuidedProgramsScreen", () => ({ default: () => <div data-testid="programs-screen" /> }));
vi.mock("@/components/app/YearInReviewScreen", () => ({ default: () => <div data-testid="year-review-screen" /> }));
vi.mock("@/components/app/ExploreScreen", () => ({ default: () => <div data-testid="explore-screen" /> }));
vi.mock("@/components/app/HistoryScreen", () => ({ default: () => <div data-testid="history-screen" /> }));
vi.mock("@/components/app/TrialBanner", () => ({ default: () => <div data-testid="trial-banner" /> }));
vi.mock("@/components/moments/MomentCaptureModal", () => ({ default: () => null }));
vi.mock("@/components/app/GuidedTour", () => ({ default: () => null }));
vi.mock("@/components/app/Confetti", () => ({ default: () => null }));
vi.mock("@/components/app/AchievementPopup", () => ({ default: () => null }));
vi.mock("@/components/moments/MomentCaptureButton", () => ({ default: () => null }));
vi.mock("@/components/app/PinLockScreen", () => ({ default: () => null }));
vi.mock("@/lib/notifications", () => ({ initReminders: vi.fn() }));
vi.mock("@/lib/auth-intent", () => ({ consumeAuthIntent: vi.fn(() => null) }));
vi.mock("@/lib/achievements", () => ({
  checkAndUnlockAchievements: vi.fn(() => null),
}));

import AppPage from "@/pages/AppPage";

const setViewport = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
};

describe("AppPage responsive shell", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the phone bottom navigation on small screens", async () => {
    setViewport(390);
    render(<AppPage />);

    expect(await screen.findByTestId("home-screen")).toBeInTheDocument();
    expect(screen.getByTestId("app-bottom-nav")).toBeInTheDocument();
    expect(screen.queryByTestId("app-shell-sidebar")).not.toBeInTheDocument();
  });

  it("shows the sidebar shell on tablet widths", async () => {
    setViewport(834);
    render(<AppPage />);

    expect(await screen.findByTestId("home-screen")).toBeInTheDocument();
    expect(screen.getByTestId("app-shell-sidebar")).toBeInTheDocument();
    expect(screen.queryByTestId("app-shell-topbar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("app-bottom-nav")).not.toBeInTheDocument();
  });

  it("uses the desktop top navbar and widened content container on large screens", async () => {
    setViewport(1440);
    render(<AppPage />);

    expect(await screen.findByTestId("home-screen")).toBeInTheDocument();
    expect(screen.getByTestId("app-shell-topbar")).toBeInTheDocument();
    expect(screen.getByTestId("app-shell-desktop-nav")).toBeInTheDocument();
    expect(screen.queryByTestId("app-shell-sidebar")).not.toBeInTheDocument();
    expect(screen.getByTestId("app-shell-content").className).toContain("max-w-app-content");
    expect(screen.queryByTestId("app-bottom-nav")).not.toBeInTheDocument();
  });
});

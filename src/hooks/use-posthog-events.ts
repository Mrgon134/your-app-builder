import { usePostHog } from "posthog-js/react";

export const usePostHogEvents = () => {
  const posthog = usePostHog();

  return {
    // Landing page events
    trackLandingView: () => {
      posthog?.capture("landing_view", {
        timestamp: new Date().toISOString(),
      });
    },
    trackWaitlistSignup: (email: string) => {
      posthog?.capture("waitlist_signup", {
        email,
        timestamp: new Date().toISOString(),
      });
    },

    // App events
    trackAppOpen: (userId: string | null) => {
      posthog?.capture("app_opened", {
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackMoodSelected: (mood: number, userId: string | null) => {
      posthog?.capture("mood_selected", {
        mood,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackEntryCreated: (mood: number, textLength: number, userId: string | null) => {
      posthog?.capture("entry_created", {
        mood,
        text_length: textLength,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackScreenView: (screen: string, userId: string | null) => {
      posthog?.capture("screen_view", {
        screen,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackCoachChat: (persona: string, userId: string | null) => {
      posthog?.capture("coach_chat", {
        persona,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackPricingView: (userId: string | null) => {
      posthog?.capture("pricing_view", {
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackUpgradeAttempt: (plan: string, userId: string | null) => {
      posthog?.capture("upgrade_attempt", {
        plan,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackLogin: (userId: string) => {
      posthog?.capture("user_login", {
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
  };
};

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

    // Voice & Media events
    trackVoiceUpload: (success: boolean, duration: number, userId: string | null) => {
      posthog?.capture("voice_upload", {
        success,
        duration_seconds: duration,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },

    // Coach events
    trackCoachLimitHit: (userId: string | null) => {
      posthog?.capture("coach_limit_hit", {
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },

    // Subscription events
    trackTrialStarted: (plan: string, userId: string | null) => {
      posthog?.capture("trial_started", {
        plan,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackUpgradeSuccess: (plan: string, userId: string | null) => {
      posthog?.capture("upgrade_success", {
        plan,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },

    // Feature engagement
    trackBreathingComplete: (pattern: string, duration: number, moodImprovement: number, userId: string | null) => {
      posthog?.capture("breathing_complete", {
        pattern,
        duration_seconds: duration,
        mood_improvement: moodImprovement,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackRitualComplete: (type: string, userId: string | null) => {
      posthog?.capture("ritual_complete", {
        ritual_type: type,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackProgramProgress: (programId: string, currentDay: number, userId: string | null) => {
      posthog?.capture("program_progress", {
        program_id: programId,
        current_day: currentDay,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackProgramComplete: (programId: string, userId: string | null) => {
      posthog?.capture("program_complete", {
        program_id: programId,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },

    // Engagement events
    trackAchievementUnlocked: (achievementId: string, userId: string | null) => {
      posthog?.capture("achievement_unlocked", {
        achievement_id: achievementId,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
    trackQuickLogEntry: (mood: number, userId: string | null) => {
      posthog?.capture("quick_log_entry", {
        mood,
        user_id: userId,
        timestamp: new Date().toISOString(),
      });
    },
  };
};

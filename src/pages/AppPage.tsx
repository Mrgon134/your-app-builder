import React, { useState, useEffect, useCallback } from "react";
import { initReminders } from "@/lib/notifications";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";
import { hasActivePremiumPlan, hasPlusAccess, hasProAccess } from "@/lib/trial";
import { PRICING_CONFIG } from "@/lib/config";
import { isNative, isIOS } from "@/lib/platform";
import { SUPABASE_URL } from "@/integrations/supabase/client";
import { getJsonFunctionHeaders } from "@/lib/function-auth";
import { fetchEntries, createEntry, createQuickEntry, fetchProfile, updateProfile, updateEntryInsight, uploadVoiceAudio, updateEntryVoice, uploadPhoto, updateEntryPhoto, uploadSelfiePhoto, fetchCoachMessages, getSignedMediaUrl, EntryRow, ProfileRow } from "@/lib/api";
import HomeScreen from "@/components/app/HomeScreen";
import JournalScreen from "@/components/app/JournalScreen";
import InsightsScreen from "@/components/app/InsightsScreen";
import CoachScreen from "@/components/app/CoachScreen";
import SettingsScreen from "@/components/app/SettingsScreen";
import PricingScreen from "@/components/app/PricingScreen";
import NativePricingScreen from "@/components/app/NativePricingScreen";
import GuidedProgramsScreen from "@/components/app/GuidedProgramsScreen";
import GuidedTour from "@/components/app/GuidedTour";
import YearInReviewScreen from "@/components/app/YearInReviewScreen";
import ExploreScreen from "@/components/app/ExploreScreen";
import HistoryScreen from "@/components/app/HistoryScreen";
import TrialBanner from "@/components/app/TrialBanner";
import MomentCaptureButton from "@/components/moments/MomentCaptureButton";
import MomentCaptureModal from "@/components/moments/MomentCaptureModal";
import { getTrialStatus } from "@/lib/trial";
import Confetti from "@/components/app/Confetti";
import AchievementPopup from "@/components/app/AchievementPopup";
import { checkAndUnlockAchievements, syncAchievementsFromHistory, type Achievement } from "@/lib/achievements";
import { consumeAuthIntent } from "@/lib/auth-intent";
import { claimPendingCheckoutForCurrentUser } from "@/lib/checkout-flow";
import { clearFunnelState } from "@/lib/onboarding-funnel";
import { getPlanFromEntitlements, initRevenueCat } from "@/lib/revenueCat";
import { Home, BarChart3, MessageCircle, Compass, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { LocalNotifications } from "@capacitor/local-notifications";
import PinLockScreen from "@/components/app/PinLockScreen";
import { useShellMode } from "@/hooks/use-shell-mode";
import { resolveDisplayName } from "@/lib/profile-name";
import { lightImpact, successFeedback } from "@/lib/native-feedback";
import juMain from "@/assets/ju-main.webp";

type Screen = "home" | "journal" | "insights" | "coach" | "explore" | "pro" | "settings" | "programs" | "year-review" | "history";

const SCREEN_TITLES: Record<Screen, string> = {
  home: "Home",
  journal: "Journal",
  insights: "Insights",
  coach: "Coach",
  explore: "Explore",
  pro: "Pricing",
  settings: "Settings",
  programs: "Programs",
  "year-review": "Year in Review",
  history: "History",
};

const SCREEN_ORDER: Screen[] = ["home", "insights", "coach", "explore"];

const normalizeNativeProfilePlan = (plan: string) =>
  plan === "lifetime_one_time" ? "lifetime" : plan;

const AppPage: React.FC = () => {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const { country, couponCode } = useGeoPricing();
  const events = usePostHogEvents();
  const tiktok = useTikTokPixel();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [screen, setScreen] = useState<Screen>(() => {
    try {
      const allScreens: Screen[] = ["home", "journal", "insights", "coach", "explore", "pro", "settings", "programs", "year-review", "history"];
      const urlScreen = new URLSearchParams(window.location.search).get("screen") as Screen | null;
      if (urlScreen && allScreens.includes(urlScreen)) {
        // Clear the URL param so it doesn't stick on future refreshes
        window.history.replaceState({}, "", window.location.pathname);
        return urlScreen;
      }
      const saved = localStorage.getItem("nuju-screen") as Screen | null;
      const mainTabs: Screen[] = ["home", "insights", "coach", "explore"];
      return saved && mainTabs.includes(saved) ? saved : "home";
    } catch {
      return "home";
    }
  });
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [navDirection, setNavDirection] = useState<1 | -1>(1);
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energy, setEnergy] = useState(50);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [journalAutoRecord, setJournalAutoRecord] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSignupAfterSave, setShowSignupAfterSave] = useState(false);
  const [journalPrompt, setJournalPrompt] = useState<string>("");
  const [showTour, setShowTour] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  const [hasCoachHistory, setHasCoachHistory] = useState(false);
  const [appLocked, setAppLocked] = useState(() => !!localStorage.getItem("nuju-pin-hash"));
  const [showMomentCapture, setShowMomentCapture] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState<File | null>(null);
  const [pendingLocation, setPendingLocation] = useState<{ lat: number; lng: number; name?: string } | null>(null);
  const [pendingCaptureType, setPendingCaptureType] = useState<string>("journal");
  const [lastSavedEntryId, setLastSavedEntryId] = useState<string | null>(null);
  const biometricEnabled = localStorage.getItem("nuju-biometric") === "1";
  const biometricSupported = typeof window !== "undefined" && window.PublicKeyCredential !== undefined;
  const { shellMode, isPhone, isDesktop } = useShellMode();
  const effectiveProfile = profile;
  const displayName = resolveDisplayName(effectiveProfile, user);
  const getEntryTimestamp = useCallback((entry: EntryRow) => {
    const source = entry.created_at || entry.entry_date;
    return new Date(source);
  }, []);

  const getHistoricalGreatMoodStreak = useCallback((sourceEntries: EntryRow[]) => {
    const dailyMood = new Map<string, number>();

    sourceEntries.forEach((entry) => {
      const dayKey = entry.entry_date.slice(0, 10);
      const currentValue = dailyMood.get(dayKey) ?? 0;
      dailyMood.set(dayKey, Math.max(currentValue, entry.mood));
    });

    const sortedDays = [...dailyMood.entries()].sort((a, b) =>
      new Date(`${a[0]}T00:00:00`).getTime() - new Date(`${b[0]}T00:00:00`).getTime()
    );

    let best = 0;
    let current = 0;
    let previousDay: string | null = null;

    for (const [dayKey, mood] of sortedDays) {
      const isNextDay = previousDay
        ? new Date(`${dayKey}T00:00:00`).getTime() - new Date(`${previousDay}T00:00:00`).getTime() === 86_400_000
        : false;

      if (mood === 5) {
        current = isNextDay ? current + 1 : 1;
        best = Math.max(best, current);
      } else {
        current = 0;
      }

      previousDay = dayKey;
    }

    return best;
  }, []);

  const buildAchievementContext = useCallback((
    sourceEntries: EntryRow[],
    options?: {
      streak?: number;
      currentMood?: number;
      hour?: number;
      hasUsedVoice?: boolean;
      hasUsedCoach?: boolean;
      consecutiveDays5Mood?: number;
    }
  ) => ({
    totalEntries: sourceEntries.length,
    streak: options?.streak ?? streak,
    currentMood: options?.currentMood ?? selectedMood,
    hour: options?.hour ?? new Date().getHours(),
    consecutiveDays5Mood: options?.consecutiveDays5Mood ?? getHistoricalGreatMoodStreak(sourceEntries),
    hasUsedVoice: options?.hasUsedVoice ?? sourceEntries.some(
      (entry) => !!entry.audio_url || (entry.transcript_segments?.length || 0) > 0
    ),
    hasUsedCoach: options?.hasUsedCoach ?? hasCoachHistory,
  }), [getHistoricalGreatMoodStreak, hasCoachHistory, selectedMood, streak]);

  const syncAchievementState = useCallback((
    sourceEntries: EntryRow[],
    nextProfile: ProfileRow | null,
    coachUsed: boolean
  ) => {
    const historicalStreak = Math.max(nextProfile?.streak_current || 0, nextProfile?.streak_longest || 0);
    const baseContext = {
      totalEntries: sourceEntries.length,
      streak: historicalStreak,
      currentMood: sourceEntries[0]?.mood ?? selectedMood,
      hour: new Date().getHours(),
      consecutiveDays5Mood: getHistoricalGreatMoodStreak(sourceEntries),
      hasUsedVoice: sourceEntries.some(
        (entry) => !!entry.audio_url || (entry.transcript_segments?.length || 0) > 0
      ),
      hasUsedCoach: coachUsed,
    };

    const hasNightOwlEntry = sourceEntries.some((entry) => {
      const hour = getEntryTimestamp(entry).getHours();
      return hour >= 0 && hour < 5;
    });

    const hasEarlyBirdEntry = sourceEntries.some((entry) => {
      const hour = getEntryTimestamp(entry).getHours();
      return hour >= 5 && hour < 7;
    });

    syncAchievementsFromHistory(baseContext, user?.id);

    if (hasNightOwlEntry) {
      syncAchievementsFromHistory({ ...baseContext, hour: 1 }, user?.id);
    }

    if (hasEarlyBirdEntry) {
      syncAchievementsFromHistory({ ...baseContext, hour: 6 }, user?.id);
    }
  }, [getEntryTimestamp, getHistoricalGreatMoodStreak, selectedMood, user?.id]);

  // Initialize notification reminders
  useEffect(() => { initReminders(); }, []);

  // Track app opened
  useEffect(() => {
    if (user) {
      events.trackAppOpen(user.id);
    }
  }, [user, events]);

  useEffect(() => {
    const activeTitle = appLocked ? "Unlock" : SCREEN_TITLES[screen];
    document.title = `${activeTitle} | Nuju`;
  }, [appLocked, screen]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const [dbProfile, dbEntries, coachMessages] = await Promise.all([
          fetchProfile(user.id),
          fetchEntries(user.id),
          fetchCoachMessages(user.id, 1),
        ]);
        let nextProfile = dbProfile;

        if (!hasActivePremiumPlan(nextProfile?.plan || null)) {
          try {
            const pendingClaim = await claimPendingCheckoutForCurrentUser();
            if (pendingClaim.claimed) {
              nextProfile = await fetchProfile(user.id);
              toast.success("Your paid plan is now unlocked.");
            }
          } catch (claimError) {
            console.warn("Pending checkout claim check failed:", claimError);
          }
        }

        const hasCoachMessages = coachMessages.length > 0;
        setProfile(nextProfile);
        setStreak(nextProfile?.streak_current || 0);
        setEntries(dbEntries);
        setHasCoachHistory(hasCoachMessages);
        syncAchievementState(dbEntries, nextProfile, hasCoachMessages);

        if (nextProfile?.onboarded) {
          clearFunnelState();
        } else {
          updateProfile(user.id, { onboarded: true }).catch(() => {
            // Keep the app usable even if the profile sync fails.
          });
        }

        // Sync dark mode: load from profile and update localStorage
        const darkModeEnabled = nextProfile?.dark_mode ?? localStorage.getItem("nuju-dark") === "1";
        if (darkModeEnabled) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("nuju-dark", "1");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("nuju-dark", "0");
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [syncAchievementState, user]);

  useEffect(() => {
    if (!loading && user && !localStorage.getItem("nuju-tour-done-" + user.id)) {
      // Small delay to let app render first
      const timer = setTimeout(() => setShowTour(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  // Navigate with fluid framer-motion transitions
  const navigateTo = useCallback((newScreen: Screen) => {
    if (newScreen === screen) return;

    const oldIdx = SCREEN_ORDER.indexOf(screen);
    const newIdx = SCREEN_ORDER.indexOf(newScreen);
    const isForward = newIdx > oldIdx || newScreen === "journal" || newScreen === "settings" || newScreen === "pro";

    setPrevScreen(screen);
    setNavDirection(isForward ? 1 : -1);
    setScreen(newScreen);

    // Track screen view
    events.trackScreenView(newScreen, user?.id || null);

    // Persist main tab across refresh
    const mainTabs: Screen[] = ["home", "insights", "coach", "explore"];
    if (mainTabs.includes(newScreen)) {
      try {
        localStorage.setItem("nuju-screen", newScreen);
      } catch {
        // Ignore storage errors in private browsing or restricted webviews.
      }
    }

    // Check "coach_first" achievement when user opens coach
    if (newScreen === "coach") {
      setHasCoachHistory(true);
      const achievement = checkAndUnlockAchievements(
        buildAchievementContext(entries, { hasUsedCoach: true }),
        user?.id
      );
      if (achievement) {
        setShowConfetti(true);
        setTimeout(() => setUnlockedAchievement(achievement), 300);
      }
    }

    void lightImpact(6);
  }, [screen, buildAchievementContext, entries, user, events]);

  const openJournalScreen = useCallback((options?: { prompt?: string; autoRecord?: boolean }) => {
    setJournalPrompt(options?.prompt || "");
    setJournalAutoRecord(!!options?.autoRecord);
    navigateTo("journal");

    if (options?.autoRecord) {
      setTimeout(() => setJournalAutoRecord(false), 600);
    }
  }, [navigateTo]);

  useEffect(() => {
    if (!isNative() || !isIOS()) return;

    let listener: { remove: () => Promise<void> } | null = null;
    void LocalNotifications.addListener("localNotificationActionPerformed", (event) => {
      const targetScreen = event.notification.extra?.screen;
      if (targetScreen === "journal") {
        openJournalScreen();
      } else {
        navigateTo("home");
      }
    }).then((handle) => {
      listener = handle;
    });

    return () => {
      void listener?.remove();
    };
  }, [navigateTo, openJournalScreen]);

  // Confetti on mood 5 selection
  const handleMoodSelect = useCallback((mood: number) => {
    setSelectedMood(mood);
    events.trackMoodSelected(mood, user?.id || null);
    if (mood === 5) {
      setShowConfetti(true);
    }
  }, [user, events]);

  const handleDisplayNameSave = async (nextDisplayName: string) => {
    if (!user) return false;

    const normalizedName = nextDisplayName.replace(/\s+/g, " ").trim();

    if (!normalizedName) {
      toast.error("Add a name or nickname first.");
      return false;
    }

    try {
      await updateProfile(user.id, { display_name: normalizedName } as Partial<ProfileRow>);
      const refreshedProfile = await fetchProfile(user.id);
      setProfile((prev) => refreshedProfile || (prev ? { ...prev, display_name: normalizedName } : prev));
      toast.success("Ju will remember your name now.");
      return true;
    } catch (err) {
      console.error("Display name update failed:", err);
      toast.error("Couldn't save your name just yet.");
      return false;
    }
  };

  const persistNativePurchasePlan = useCallback(async (plan: string) => {
    if (!user) return;

    const normalizedPlan = normalizeNativeProfilePlan(plan);
    if (!hasActivePremiumPlan(normalizedPlan)) return;

    setProfile((prev) => prev ? { ...prev, plan: normalizedPlan } : prev);

    try {
      await updateProfile(user.id, { plan: normalizedPlan } as Partial<ProfileRow>);
    } catch (err) {
      console.error("Native purchase profile sync failed:", err);
    }
  }, [user]);

  // Dodo Payments checkout on web; native iOS purchases stay inside StoreKit/RevenueCat.
  const handleCheckout = useCallback(async (plan: string, options?: { couponCode?: string | null }) => {
    if (!user) return;
    if (isNative() && isIOS()) {
      navigateTo("pro");
      toast.info("Choose a plan with Apple in-app purchase.");
      return;
    }

    let checkoutWindow: Window | null = null;
    try {
      const variantMap: Record<string, string> = {
        weekly: PRICING_CONFIG.products.weekly,
        three_month: PRICING_CONFIG.products.three_month,
        yearly: PRICING_CONFIG.products.yearly,
        plus_monthly: PRICING_CONFIG.products.plus_monthly,
        plus_annual: PRICING_CONFIG.products.plus_annual,
        pro_monthly: PRICING_CONFIG.products.pro_monthly,
        pro_annual: PRICING_CONFIG.products.pro_annual,
        lifetime_one_time: PRICING_CONFIG.products.lifetime_one_time,
      };
      const variantId = variantMap[plan];
      if (!variantId || variantId.includes("VARIANT_ID")) {
        toast.info(t.payments_coming_soon || "This plan is not ready yet. Pick another way to keep Ju close for now.");
        return;
      }
      tiktok.trackCheckoutStarted(plan, "app_pricing");

      // Open a temporary window during the click gesture so mobile browsers
      // do not block the checkout tab after the async fetch completes.
      checkoutWindow = window.open("about:blank", "_blank");
      const resp = await fetch(
        `${SUPABASE_URL}/functions/v1/dodo-checkout`,
        {
          method: "POST",
          headers: await getJsonFunctionHeaders(),
          body: JSON.stringify({
            variant_id: variantId,
            user_id: user.id,
            user_email: user.email,
            user_name: displayName || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User",
            plan,
            country,
            coupon_code: options?.couponCode || couponCode || undefined,
          }),
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data.url) {
          if (checkoutWindow) {
            checkoutWindow.location.href = data.url;
          } else {
            window.location.assign(data.url);
          }
        } else {
          checkoutWindow?.close();
          toast.error(t.checkout_error || "Could not start checkout. Try again.");
        }
      } else {
        checkoutWindow?.close();
        toast.error(t.checkout_error || "Could not start checkout. Try again.");
      }
    } catch (err) {
      checkoutWindow?.close();
      console.error("Checkout error:", err);
      toast.error(t.checkout_failed || "Checkout failed. Please try again.");
    }
  }, [couponCode, country, displayName, navigateTo, t, tiktok, user]);

  useEffect(() => {
    if (!user || loading) return;

    const intent = consumeAuthIntent();
    if (!intent) return;

    if (intent.plan === "weekly" || intent.plan === "three_month" || intent.plan === "lifetime_one_time") {
      handleCheckout(intent.plan);
    } else if (intent.screen === "pro") {
      navigateTo("pro");
    }
  }, [handleCheckout, loading, navigateTo, user]);

  useEffect(() => {
    if (!user || loading || !isNative() || !isIOS()) return;

    let cancelled = false;

    const syncNativeEntitlement = async () => {
      try {
        await initRevenueCat(user.id);
        const nativePlan = await getPlanFromEntitlements();
        if (cancelled || !hasActivePremiumPlan(nativePlan)) return;

        const normalizedPlan = normalizeNativeProfilePlan(nativePlan);
        if (effectiveProfile?.plan !== normalizedPlan) {
          await persistNativePurchasePlan(normalizedPlan);
        }
      } catch (err) {
        console.error("Native entitlement refresh failed:", err);
      }
    };

    void syncNativeEntitlement();

    return () => {
      cancelled = true;
    };
  }, [effectiveProfile?.plan, loading, persistNativePurchasePlan, user]);

  const handleQuickLog = async () => {
    if (!user) return;
    try {
      const entry = await createQuickEntry(user.id, selectedMood, energy);
      if (selectedActivities.length > 0) {
        try {
          const stored = JSON.parse(localStorage.getItem("nuju-activity-tags") || "{}");
          stored[entry.id] = selectedActivities;
          localStorage.setItem("nuju-activity-tags", JSON.stringify(stored));
        } catch {
          // Activity tags are optional local-only metadata.
        }
      }
      setSelectedActivities([]);
      const newEntries = [entry, ...entries];
      setEntries(newEntries);
      const updatedProfile = await fetchProfile(user.id);
      if (updatedProfile) { setStreak(updatedProfile.streak_current); setProfile(updatedProfile); }
      toast.success("Mood logged");
      void successFeedback([10, 50, 20]);

      // Check achievements after quick log
      const achievement = checkAndUnlockAchievements(
        buildAchievementContext(newEntries, {
          streak: updatedProfile?.streak_current || streak,
        }),
        user.id
      );
      if (achievement) {
        setShowConfetti(true);
        setTimeout(() => setUnlockedAchievement(achievement), 300);
      }
    } catch (err) {
      console.error("Quick log failed:", err);
    }
  };

  const handleSaveEntry = async (text: string, audioBlob?: Blob | null, segments?: { start: number; end: number; text: string }[] | null): Promise<string | null> => {
    if (!user) return null;
    try {
      // Private writing stays available for every user; premium gates the AI read.
      const entry = await createEntry(
        user.id, selectedMood, text, energy, journalPrompt || undefined,
        pendingCaptureType,
        pendingLocation || undefined
      );

      // Track entry creation
      events.trackEntryCreated(selectedMood, text.length, user.id);
      setLastSavedEntryId(entry.id);

      // Upload photo if present
      if (pendingPhoto) {
        try {
          const photoPath = await uploadPhoto(user.id, entry.id, pendingPhoto);
          await updateEntryPhoto(entry.id, photoPath);
          entry.photo_url = await getSignedMediaUrl("photo-entries", photoPath);
        } catch (photoErr) {
          console.error("Photo upload failed:", photoErr);
        }
      }

      // Carry location data to entry object for immediate UI display
      if (pendingLocation) {
        entry.location_lat = pendingLocation.lat;
        entry.location_lng = pendingLocation.lng;
        entry.location_name = pendingLocation.name || null;
      }
      entry.capture_type = pendingCaptureType;

      // Clear pending capture data
      setPendingPhoto(null);
      setPendingLocation(null);
      setPendingCaptureType("journal");

      // Upload voice audio if present (Pro feature)
      if (audioBlob && audioBlob.size > 1000) {
        try {
          const audioPath = await uploadVoiceAudio(user.id, entry.id, audioBlob);
          await updateEntryVoice(entry.id, audioPath, segments || []);
          entry.audio_url = await getSignedMediaUrl("voice-entries", audioPath);
          entry.transcript_segments = segments || null;
        } catch (voiceErr) {
          console.error("Voice upload failed:", voiceErr);
        }
      }

      // Persist activity tags locally (no DB migration needed)
      if (selectedActivities.length > 0) {
        try {
          const stored = JSON.parse(localStorage.getItem("nuju-activity-tags") || "{}");
          stored[entry.id] = selectedActivities;
          localStorage.setItem("nuju-activity-tags", JSON.stringify(stored));
        } catch {
          // Activity tags are optional local-only metadata.
        }
      }
      setSelectedActivities([]);

      const newEntries = [
        entry,
        ...entries,
      ];
      setEntries(newEntries);

      const updatedProfile = await fetchProfile(user.id);
      if (updatedProfile) {
        setStreak(updatedProfile.streak_current);
        setProfile(updatedProfile);
      }

      if (newEntries.length === 3) {
        setTimeout(() => setShowSignupAfterSave(true), 1500);
      }

      const achievement = checkAndUnlockAchievements(
        buildAchievementContext(newEntries, {
          streak: updatedProfile?.streak_current || streak,
        }),
        user.id
      );
      if (achievement) {
        setShowConfetti(true);
        setTimeout(() => setUnlockedAchievement(achievement), 300);
      }

      void successFeedback([10, 50, 20]);

      // P2: AI insight only for Plus/Pro — free users get no insight card
      const hasPlus = hasPlusAccess(effectiveProfile?.plan || null, effectiveProfile?.trial_started_at || null);
      if (!hasPlus) {
        return null; // Don't show misleading teaser; upgrade prompts in other places
      }

      try {
        const resp = await fetch(
          `${SUPABASE_URL}/functions/v1/ai-insight`,
          {
            method: "POST",
            headers: await getJsonFunctionHeaders(),
            body: JSON.stringify({ text, mood: selectedMood, energy, lang }),
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          const insight = data.insight || null;
          if (insight) {
            await updateEntryInsight(entry.id, insight);
            setEntries(prev => prev.map(e => e.id === entry.id ? { ...e, ai_summary: insight } : e));
          }
          return insight;
        }
      } catch (aiErr) {
        console.error("AI insight failed:", aiErr);
      }
      return null;
    } catch (err) {
      console.error("Failed to save entry:", err);
      return null;
    }
  };

  const handleCalendarCapture = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];

    setPendingCaptureType("calendar");
    openJournalScreen({ prompt: `📅 Moment on ${dateStr} at ${timeStr.slice(0, 5)}\n\nWhat happened?` });
  };

  const handleLocationCapture = async () => {
    if (!user) return;

    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setPendingLocation({ lat: latitude, lng: longitude });
            setPendingCaptureType("location");

            const prompt = `📍 Location: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°\n\nWhat's happening here?`;
            openJournalScreen({ prompt });
          },
          (error) => {
            console.error("Location error:", error);
            setPendingCaptureType("location");
            openJournalScreen({ prompt: "📍 Where are you right now? What's on your mind?" });
          }
        );
      } else {
        setPendingCaptureType("location");
        openJournalScreen({ prompt: "📍 Where are you right now? What's on your mind?" });
      }
    } catch (err) {
      console.error("Location capture failed:", err);
      toast.error("Could not access location");
    }
  };

  const handlePhotoCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !user) return;

      setPendingPhoto(file);
      setPendingCaptureType("photo");
      const prompt = `📷 Photo captured\n\nDescribe what you see or how it makes you feel`;
      openJournalScreen({ prompt });
    };
    input.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // PIN Lock guard — show lock screen before app
  if (appLocked) {
    return (
      <PinLockScreen
        onUnlock={() => setAppLocked(false)}
        biometricAvailable={biometricEnabled && biometricSupported}
        onBiometric={async () => {
          try {
            const cred = await navigator.credentials.get({
              publicKey: {
                challenge: crypto.getRandomValues(new Uint8Array(32)),
                timeout: 60000,
                userVerification: "required",
                rpId: window.location.hostname,
              },
            });
            if (cred) setAppLocked(false);
          } catch {
            // Biometric failed, user stays on PIN
          }
        }}
      />
    );
  }

  const navItems = [
    { id: "home" as const, icon: Home, label: t.home },
    { id: "insights" as const, icon: BarChart3, label: t.insights_label },
    { id: "coach" as const, icon: MessageCircle, label: t.coach_label },
    { id: "explore" as const, icon: Compass, label: "Explore" },
  ];

  const secondaryNavItems = [
    { id: "history" as const, label: t.history_label || "History" },
    { id: "pro" as const, label: t.unlock_ju },
    { id: "settings" as const, label: t.settings },
  ];

  const activeNavId =
    navItems.find((item) => item.id === screen)?.id ||
    navItems.find((item) => item.id === prevScreen)?.id ||
    "home";

  const showTabletSidebar = shellMode === "tablet";
  const showDesktopTopbar = isDesktop;
  const showBottomNav = isPhone && screen !== "journal" && screen !== "settings" && screen !== "pro";
  const showDesktopChrome = !isPhone;
  const isCoachPhone = isPhone && screen === "coach";
  const contentShellClass = screen === "coach"
    ? `max-w-[1400px] ${isCoachPhone ? "h-full" : ""}`
    : screen === "journal"
      ? "max-w-[1100px]"
      : isDesktop
        ? "max-w-app-content"
        : "max-w-[1100px]";
  const surfaceClass = showDesktopChrome
    ? "md:rounded-[2rem] md:border md:border-border/60 md:bg-card/45 md:shadow-[0_20px_60px_-28px_rgba(15,23,42,0.18)] md:backdrop-blur-xl"
    : "";
  const contentPaddingClass = showDesktopChrome
    ? "px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8"
    : isCoachPhone
      ? "h-full px-4 pt-3 pb-0"
      : "px-4 pt-6 pb-24";

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti overlay */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Achievement popup */}
      <AchievementPopup
        achievement={unlockedAchievement}
        onClose={() => setUnlockedAchievement(null)}
      />

      {/* Moment Capture Modal */}
      <MomentCaptureModal
        isOpen={showMomentCapture}
        onClose={() => setShowMomentCapture(false)}
        hasProAccess={hasProAccess(effectiveProfile?.plan || "free", effectiveProfile?.trial_started_at || null)}
        onUpgrade={() => navigateTo("pro")}
        onSelectType={(type) => {
          if (type === "quick") {
            setPendingCaptureType("quick");
            openJournalScreen({ prompt: "📍 Quick Moment Capture" });
          } else if (type === "calendar") {
            handleCalendarCapture();
          } else if (type === "location") {
            handleLocationCapture();
          } else if (type === "photo") {
            handlePhotoCapture();
          }
        }}
      />

      {/* Signup prompt modal after 3rd entry */}
      {showSignupAfterSave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-md p-6 animate-fade-in">
          <div className="bg-card rounded-3xl p-7 max-w-xs w-full shadow-2xl border border-border/30 text-center animate-spring-in">
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              {(t.signup_title || "Ju knows you now").replace("{n}", String(entries.length))}
            </h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {(t.signup_desc || "You've written {n} entries. Create an account to keep your journal safe forever.").replace("{n}", String(entries.length))}
            </p>
            <button
              onClick={() => { setShowSignupAfterSave(false); navigateTo("pro"); }}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm mb-2 press-spring shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
            >
              {t.signup_btn || "Save my journal"}
            </button>
            <button
              onClick={() => setShowSignupAfterSave(false)}
              className="w-full py-2.5 text-sm text-muted-foreground press-spring"
            >
              {t.signup_later || "Maybe later"}
            </button>
          </div>
        </div>
      )}

      <div className={`min-h-screen ${showTabletSidebar ? "md:grid md:grid-cols-[var(--app-shell-sidebar)_minmax(0,1fr)]" : "flex flex-col"}`}>
        {showTabletSidebar && (
          <aside
            data-testid="app-shell-sidebar"
            className="hidden md:flex md:min-h-screen md:flex-col md:justify-between md:border-r md:border-border/60 md:bg-card/70 md:px-4 md:py-6 lg:px-5 lg:py-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 rounded-[1.75rem] bg-background/80 px-3 py-3 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.5)]">
                  <img src={juMain} alt="Nuju mascot" className="h-8 w-8 object-contain" />
                </div>
                <div>
                  <p className="font-serif text-xl font-semibold text-foreground">Nuju</p>
                </div>
              </div>

              <nav className="space-y-2" aria-label="Primary" data-testid="app-shell-nav">
                {[...navItems, ...secondaryNavItems].map((item) => {
                  const active = screen === item.id || activeNavId === item.id;
                  const Icon = "icon" in item ? item.icon : null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-[0_14px_28px_-18px_hsl(var(--primary)/0.85)]"
                          : "bg-transparent text-muted-foreground hover:bg-background/80 hover:text-foreground"
                      }`}
                    >
                      {Icon ? <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.2 : 1.8} /> : <div className="h-5 w-5 shrink-0" />}
                      <span className="text-sm font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div />
          </aside>
        )}

        <div className="flex min-h-screen min-w-0 flex-col">
          {showDesktopTopbar && (
            <header
              data-testid="app-shell-topbar"
              className="sticky top-0 z-30 border-b border-border/60 bg-background/88 backdrop-blur-xl"
            >
              <div className="app-shell">
                <div className="app-shell-content flex items-center gap-6 px-2 py-3">
                  <div className="flex items-center gap-3 rounded-full bg-card/80 px-3 py-2 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_10px_24px_-12px_hsl(var(--primary)/0.5)]">
                      <img src={juMain} alt="Nuju mascot" className="h-7 w-7 object-contain" />
                    </div>
                    <p className="font-serif text-lg font-semibold text-foreground">Nuju</p>
                  </div>

                  <nav
                    aria-label="Desktop"
                    data-testid="app-shell-desktop-nav"
                    className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2"
                  >
                    {[...navItems, ...secondaryNavItems].map((item) => {
                      const active = screen === item.id || activeNavId === item.id;
                      const Icon = "icon" in item ? item.icon : null;
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigateTo(item.id)}
                          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                            active
                              ? "bg-primary text-primary-foreground shadow-[0_14px_28px_-18px_hsl(var(--primary)/0.85)]"
                              : "bg-card/70 text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {Icon ? <Icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2.2 : 1.8} /> : null}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </header>
          )}

          <div
            data-testid="app-shell-main"
            className={`app-shell flex-1 min-h-0 ${isCoachPhone ? "overflow-hidden pb-0" : `app-shell-scroll ${showBottomNav ? "pb-24" : "pb-6 md:pb-8"}`}`}
          >
            <div data-testid="app-shell-content" className={`app-shell-content ${contentShellClass} ${contentPaddingClass}`}>
              <div className={surfaceClass}>
                <div className={showDesktopChrome ? "min-h-full px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8" : ""}>
                  {/* Trial banner on home/insights */}
                  {(screen === "home" || screen === "insights") && (
                    <TrialBanner
                      trialStartedAt={effectiveProfile?.trial_started_at || null}
                      plan={effectiveProfile?.plan || "free"}
                      onUpgrade={() => navigateTo("pro")}
                    />
                  )}

                  {/* Screen content with framer-motion transitions */}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={screen}
                      className={isCoachPhone ? "h-full" : undefined}
                      initial={{ opacity: 0, x: navDirection * 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: navDirection * -30 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 35,
                        mass: 0.8,
                      }}
                      style={{ willChange: "transform, opacity" }}
                    >
                    {screen === "home" && (
                      <HomeScreen
                        shellMode={shellMode}
                        displayName={displayName}
                        onNavigate={(s) => navigateTo(s as Screen)}
                        onWrite={(prompt) => openJournalScreen(prompt ? { prompt } : undefined)}
                        onTalk={(prompt) => openJournalScreen(prompt ? { prompt, autoRecord: true } : { autoRecord: true })}
                        onSettings={() => navigateTo("settings")}
                        onUpgrade={() => navigateTo("pro")}
                        onQuickLog={handleQuickLog}
                        streak={streak}
                        entries={entries}
                        selectedMood={selectedMood}
                        onMoodSelect={handleMoodSelect}
                        energy={energy}
                        onEnergyChange={setEnergy}
                        selectedActivities={selectedActivities}
                        onActivitiesChange={setSelectedActivities}
                        plan={effectiveProfile?.plan}
                        trialStartedAt={effectiveProfile?.trial_started_at}
                        userId={user.id}
                        hasBanner={(() => {
                          const p = effectiveProfile?.plan;
                          if (hasActivePremiumPlan(p || null)) return false;
                          const trial = getTrialStatus(effectiveProfile?.trial_started_at || null);
                          return !trial.notStarted;
                        })()}
                      />
                    )}
                    {screen === "journal" && (
                      <JournalScreen
                        shellMode={shellMode}
                        onBack={() => navigateTo("home")}
                        onSave={handleSaveEntry}
                        initialPrompt={journalPrompt}
                        autoRecord={journalAutoRecord}
                        activities={selectedActivities}
                        mood={selectedMood}
                        hasProAccess={hasProAccess(effectiveProfile?.plan || null, effectiveProfile?.trial_started_at || null)}
                        onUpgrade={() => navigateTo("pro")}
                        onSelfieCapture={async (blob) => {
                          if (!user || !lastSavedEntryId) return;
                          try {
                            await uploadSelfiePhoto(user.id, lastSavedEntryId, blob);
                          } catch (err) {
                            console.error("Selfie upload failed:", err);
                          }
                        }}
                      />
                    )}
                    {screen === "insights" && <InsightsScreen shellMode={shellMode} entries={entries} streak={streak} onUpgrade={() => navigateTo("pro")} onNavigate={(s) => navigateTo(s as Screen)} plan={effectiveProfile?.plan} trialStartedAt={effectiveProfile?.trial_started_at} />}
                    {screen === "history" && (
                      <HistoryScreen
                        entries={entries}
                        onNavigate={(s) => s === "journal" ? openJournalScreen() : navigateTo(s as Screen)}
                        onUpgrade={() => navigateTo("pro")}
                        plan={effectiveProfile?.plan}
                        trialStartedAt={effectiveProfile?.trial_started_at}
                      />
                    )}
                    {screen === "coach" && <CoachScreen shellMode={shellMode} displayName={displayName} onUpgrade={() => navigateTo("pro")} plan={effectiveProfile?.plan} trialStartedAt={effectiveProfile?.trial_started_at} />}
                    {screen === "explore" && (
                      <ExploreScreen
                        entries={entries}
                        streak={streak}
                        userId={user?.id}
                        onWritePrompt={(prompt) => openJournalScreen({ prompt })}
                        onNavigate={(s) => navigateTo(s as Screen)}
                        plan={effectiveProfile?.plan}
                        trialStartedAt={effectiveProfile?.trial_started_at}
                        onUpgrade={() => navigateTo("pro")}
                      />
                    )}
                    {screen === "settings" && (
                      <SettingsScreen
                        onBack={() => navigateTo("home")}
                        onUpgrade={() => navigateTo("pro")}
                        onSaveDisplayName={handleDisplayNameSave}
                        displayName={displayName}
                        plan={effectiveProfile?.plan}
                        trialStartedAt={effectiveProfile?.trial_started_at}
                      />
                    )}
                    {screen === "programs" && (
                      <GuidedProgramsScreen
                        onBack={() => navigateTo("insights")}
                        onWritePrompt={(prompt) => openJournalScreen({ prompt })}
                        plan={effectiveProfile?.plan}
                        trialStartedAt={effectiveProfile?.trial_started_at}
                        onUpgrade={() => navigateTo("pro")}
                      />
                    )}
                    {screen === "year-review" && (
                      <YearInReviewScreen
                        entries={entries}
                        streak={streak}
                        onBack={() => navigateTo("insights")}
                      />
                    )}
                    {screen === "pro" && isNative() && isIOS() ? (
                      <NativePricingScreen
                        currentPlan={effectiveProfile?.plan || "free"}
                        trialStartedAt={effectiveProfile?.trial_started_at || null}
                        userId={user?.id}
                        presentation={shellMode === "phone" ? "modal" : "page"}
                        onClose={() => navigateTo("home")}
                        onSuccess={(plan) => {
                          void persistNativePurchasePlan(plan);
                          toast.success(t.subscription_updated || "Subscription updated!");
                          navigateTo("home");
                        }}
                      />
                    ) : screen === "pro" ? (
                      <PricingScreen
                        currentPlan={effectiveProfile?.plan || "free"}
                        trialStartedAt={effectiveProfile?.trial_started_at || null}
                        onCheckout={handleCheckout}
                        onBack={() => navigateTo("home")}
                      />
                    ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTour && (
        <GuidedTour
          onDone={() => {
            if (user) {
              localStorage.setItem("nuju-tour-done-" + user.id, "1");
            }
            setShowTour(false);
          }}
          currentScreen={screen}
          onNavigate={(s) => navigateTo(s as Screen)}
        />
      )}

      {/* Moment Capture Floating Button (Pro feature) */}
      {screen !== "coach" && screen !== "pro" && (
        <MomentCaptureButton
          onClick={() => setShowMomentCapture(true)}
          hasProAccess={hasProAccess(effectiveProfile?.plan || "free", effectiveProfile?.trial_started_at || null)}
          shellMode={shellMode}
        />
      )}

      {/* Floating glass tab bar with spring animations */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-40" data-testid="app-bottom-nav">
          <div className="mx-auto max-w-app px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <div className="bg-card/60 dark:bg-card/50 backdrop-blur-2xl rounded-2xl border border-border/15 shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.3)] flex overflow-hidden">
              {navItems.map((item) => {
                const active = screen === item.id;
                const Icon = item.icon;
                return (
                  <motion.button
                    id={`tour-nav-${item.id}`}
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors duration-200 ${
                      active ? "text-primary" : "text-muted-foreground/50"
                    }`}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: active ? 1.12 : 1,
                          y: active ? -2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Icon
                          className="w-[22px] h-[22px]"
                          strokeWidth={active ? 2.3 : 1.6}
                        />
                      </motion.div>
                      {/* Active indicator dot */}
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-primary"
                            initial={{ scale: 0, x: "-50%" }}
                            animate={{ scale: 1, x: "-50%" }}
                            exit={{ scale: 0, x: "-50%" }}
                            transition={{ type: "spring", stiffness: 600, damping: 22 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <span className={`text-[10px] transition-all duration-200 ${active ? "font-bold" : "font-medium"}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppPage;

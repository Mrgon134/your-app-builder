import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { initReminders } from "@/lib/notifications";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { hasPlusAccess } from "@/lib/trial";
import { PRICING_CONFIG } from "@/lib/config";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";
import { fetchEntries, createEntry, createQuickEntry, fetchProfile, updateProfile, checkEntryLimit, updateEntryInsight, EntryRow, ProfileRow } from "@/lib/api";
import OnboardingScreen from "@/components/app/OnboardingScreen";
import HomeScreen from "@/components/app/HomeScreen";
import JournalScreen from "@/components/app/JournalScreen";
import InsightsScreen from "@/components/app/InsightsScreen";
import CoachScreen from "@/components/app/CoachScreen";
import SettingsScreen from "@/components/app/SettingsScreen";
import PricingScreen from "@/components/app/PricingScreen";
import GuidedProgramsScreen from "@/components/app/GuidedProgramsScreen";
import GuidedTour from "@/components/app/GuidedTour";
import YearInReviewScreen from "@/components/app/YearInReviewScreen";
import TrialBanner from "@/components/app/TrialBanner";
import { getTrialStatus } from "@/lib/trial";
import Confetti from "@/components/app/Confetti";
import { Home, BarChart3, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

type Screen = "home" | "journal" | "insights" | "coach" | "pro" | "settings" | "programs" | "year-review";

const AppPage: React.FC = () => {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const { country, couponCode } = useGeoPricing();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [screen, setScreen] = useState<Screen>(() => {
    try {
      const saved = localStorage.getItem("nuju-screen") as Screen | null;
      const mainTabs: Screen[] = ["home", "insights", "coach", "pro"];
      return saved && mainTabs.includes(saved) ? saved : "home";
    } catch { return "home"; }
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

  // Screen ordering for directional transitions
  const screenOrder: Screen[] = ["home", "insights", "coach", "pro"];

  // Initialize notification reminders
  useEffect(() => { initReminders(); }, []);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const [dbProfile, dbEntries] = await Promise.all([
          fetchProfile(user.id),
          fetchEntries(user.id),
        ]);
        setProfile(dbProfile);
        setShowOnboarding(!dbProfile?.onboarded);
        setStreak(dbProfile?.streak_current || 0);
        setEntries(dbEntries);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  useEffect(() => {
    if (!loading && !showOnboarding && !localStorage.getItem("nuju-tour-done")) {
      // Small delay to let app render first
      const timer = setTimeout(() => setShowTour(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loading, showOnboarding]);

  const handleOnboardingComplete = async () => {
    if (user) {
      await updateProfile(user.id, { onboarded: true } as any);
    }
    setShowOnboarding(false);
  };

  // Navigate with fluid framer-motion transitions
  const navigateTo = useCallback((newScreen: Screen) => {
    if (newScreen === screen) return;
    
    const oldIdx = screenOrder.indexOf(screen);
    const newIdx = screenOrder.indexOf(newScreen);
    const isForward = newIdx > oldIdx || newScreen === "journal" || newScreen === "settings" || newScreen === "pro";
    
    setPrevScreen(screen);
    setNavDirection(isForward ? 1 : -1);
    setScreen(newScreen);

    // Persist main tab across refresh
    const mainTabs: Screen[] = ["home", "insights", "coach", "pro"];
    if (mainTabs.includes(newScreen)) {
      try { localStorage.setItem("nuju-screen", newScreen); } catch {}
    }
    
    if (navigator.vibrate) navigator.vibrate(6);
  }, [screen]);

  // Confetti on mood 5 selection
  const handleMoodSelect = useCallback((mood: number) => {
    setSelectedMood(mood);
    if (mood === 5) {
      setShowConfetti(true);
    }
  }, []);

  // Start free trial
  const handleStartTrial = async () => {
    if (!user) return;
    try {
      await updateProfile(user.id, { trial_started_at: new Date().toISOString() } as any);
      const updated = await fetchProfile(user.id);
      if (updated) setProfile(updated);
      toast.success(t.trial_started_toast || "Your 7-day free trial has started!");
    } catch (err) {
      console.error("Trial start failed:", err);
      toast.error(t.trial_error_toast || "Could not start trial. Please try again.");
    }
  };

  // Dodo Payments checkout
  const handleCheckout = async (plan: string) => {
    if (!user) return;
    try {
      const variantMap: Record<string, string> = {
        plus_monthly: PRICING_CONFIG.products.plus_monthly,
        plus_annual: PRICING_CONFIG.products.plus_annual,
        pro_monthly: PRICING_CONFIG.products.pro_monthly,
        pro_annual: PRICING_CONFIG.products.pro_annual,
        lifetime_one_time: PRICING_CONFIG.products.lifetime_one_time,
      };
      const variantId = variantMap[plan];
      if (!variantId || variantId.includes("VARIANT_ID")) {
        toast.info(t.payments_coming_soon || "Payments coming soon! Stay tuned.");
        return;
      }
      const resp = await fetch(
        `${SUPABASE_URL}/functions/v1/dodo-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            variant_id: variantId,
            user_id: user.id,
            user_email: user.email,
            user_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User",
            country,
            coupon_code: couponCode || undefined,
          }),
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data.url) window.open(data.url, "_blank");
      } else {
        toast.error(t.checkout_error || "Could not start checkout. Try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(t.checkout_failed || "Checkout failed. Please try again.");
    }
  };

  const handleQuickLog = async () => {
    if (!user) return;
    try {
      const canWrite = await checkEntryLimit(user.id);
      if (!canWrite) { toast.error(t.history_locked || "Entry limit reached."); return; }
      const entry = await createQuickEntry(user.id, selectedMood, energy);
      if (selectedActivities.length > 0) {
        try {
          const stored = JSON.parse(localStorage.getItem("nuju-activity-tags") || "{}");
          stored[entry.id] = selectedActivities;
          localStorage.setItem("nuju-activity-tags", JSON.stringify(stored));
        } catch {}
      }
      setSelectedActivities([]);
      const newEntries = [entry, ...entries];
      setEntries(newEntries);
      const updatedProfile = await fetchProfile(user.id);
      if (updatedProfile) { setStreak(updatedProfile.streak_current); setProfile(updatedProfile); }
      toast.success("Mood logged");
      if (navigator.vibrate) navigator.vibrate([10, 50, 20]);
    } catch (err) {
      console.error("Quick log failed:", err);
    }
  };

  const handleSaveEntry = async (text: string): Promise<string | null> => {
    if (!user) return null;
    try {
      // P2: Unlimited entries for all users — gate AI insight instead of input
      const entry = await createEntry(user.id, selectedMood, text, energy);

      // Persist activity tags locally (no DB migration needed)
      if (selectedActivities.length > 0) {
        try {
          const stored = JSON.parse(localStorage.getItem("nuju-activity-tags") || "{}");
          stored[entry.id] = selectedActivities;
          localStorage.setItem("nuju-activity-tags", JSON.stringify(stored));
        } catch {}
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

      // P2: AI insight only for Plus/Pro — free users see teaser
      const hasPlus = hasPlusAccess(profile?.plan || null, profile?.trial_started_at || null);
      if (!hasPlus) {
        return "Ju noticed something in your journal... Upgrade to Plus to unlock AI insights after every entry.";
      }

      try {
        const resp = await fetch(
          `${SUPABASE_URL}/functions/v1/ai-insight`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
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

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const navItems = [
    { id: "home" as const, icon: Home, label: t.home },
    { id: "insights" as const, icon: BarChart3, label: t.insights_label },
    { id: "coach" as const, icon: MessageCircle, label: t.coach_label },
    { id: "pro" as const, icon: Sparkles, label: t.pro_label },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Confetti overlay */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

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

      <div className="flex-1 w-full max-w-app mx-auto px-4 pt-6 pb-24 overflow-y-auto">
        {/* Trial banner on home/insights */}
        {(screen === "home" || screen === "insights") && (
          <TrialBanner
            trialStartedAt={profile?.trial_started_at || null}
            plan={profile?.plan || "free"}
            onUpgrade={() => navigateTo("pro")}
          />
        )}

        {/* Screen content with framer-motion transitions */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={screen}
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
              onNavigate={(s) => navigateTo(s as Screen)}
              onWrite={() => navigateTo("journal")}
              onTalk={() => {
                setJournalAutoRecord(true);
                navigateTo("journal");
                setTimeout(() => setJournalAutoRecord(false), 600);
              }}
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
              plan={profile?.plan}
              trialStartedAt={profile?.trial_started_at}
              hasBanner={(() => {
                const p = profile?.plan;
                if (p === "plus" || p === "pro") return false;
                const trial = getTrialStatus(profile?.trial_started_at || null);
                return !trial.notStarted;
              })()}
            />
          )}
          {screen === "journal" && (
            <JournalScreen
              onBack={() => navigateTo("home")}
              onSave={handleSaveEntry}
              initialPrompt={journalPrompt}
              autoRecord={journalAutoRecord}
              activities={selectedActivities}
              mood={selectedMood}
            />
          )}
          {screen === "insights" && <InsightsScreen entries={entries} streak={streak} onUpgrade={() => navigateTo("pro")} onNavigate={(s) => navigateTo(s as Screen)} plan={profile?.plan} trialStartedAt={profile?.trial_started_at} />}
          {screen === "coach" && <CoachScreen onUpgrade={() => navigateTo("pro")} plan={profile?.plan} trialStartedAt={profile?.trial_started_at} />}
          {screen === "settings" && <SettingsScreen onBack={() => navigateTo("home")} onUpgrade={() => navigateTo("pro")} plan={profile?.plan} trialStartedAt={profile?.trial_started_at} />}
          {screen === "programs" && (
            <GuidedProgramsScreen
              onBack={() => navigateTo("insights")}
              onWritePrompt={(prompt) => { setJournalPrompt(prompt); navigateTo("journal"); }}
              plan={profile?.plan}
              trialStartedAt={profile?.trial_started_at}
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
          {screen === "pro" && (
            <PricingScreen
              currentPlan={profile?.plan || "free"}
              trialStartedAt={profile?.trial_started_at || null}
              onCheckout={handleCheckout}
              onStartTrial={handleStartTrial}
              onBack={() => navigateTo("home")}
            />
          )}
          </motion.div>
        </AnimatePresence>
        </div>

      {showTour && (
        <GuidedTour
          onDone={() => {
            localStorage.setItem("nuju-tour-done", "1");
            setShowTour(false);
          }}
          currentScreen={screen}
          onNavigate={(s) => navigateTo(s as Screen)}
        />
      )}

      {/* Floating glass tab bar with spring animations */}
      {screen !== "journal" && screen !== "settings" && (
        <nav className="fixed bottom-0 left-0 right-0 z-40">
          <div className="max-w-app mx-auto px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <div className="bg-card/60 dark:bg-card/50 backdrop-blur-2xl rounded-2xl border border-border/15 shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.3)] flex overflow-hidden">
              {navItems.map((item) => {
                const active = screen === item.id;
                const Icon = item.icon;
                return (
                  <motion.button
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

import React, { useState, useEffect, useCallback, useRef } from "react";
import { initReminders } from "@/lib/notifications";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { hasPlusAccess } from "@/lib/trial";
import { fetchEntries, createEntry, createQuickEntry, fetchProfile, updateProfile, checkEntryLimit, EntryRow, ProfileRow } from "@/lib/api";
import OnboardingScreen from "@/components/app/OnboardingScreen";
import HomeScreen from "@/components/app/HomeScreen";
import JournalScreen from "@/components/app/JournalScreen";
import InsightsScreen from "@/components/app/InsightsScreen";
import CoachScreen from "@/components/app/CoachScreen";
import SettingsScreen from "@/components/app/SettingsScreen";
import PricingScreen from "@/components/app/PricingScreen";
import GuidedProgramsScreen from "@/components/app/GuidedProgramsScreen";
import YearInReviewScreen from "@/components/app/YearInReviewScreen";
import TrialBanner from "@/components/app/TrialBanner";
import { getTrialStatus } from "@/lib/trial";
import Confetti from "@/components/app/Confetti";
import { Home, BarChart3, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Screen = "home" | "journal" | "insights" | "coach" | "pro" | "settings" | "programs" | "year-review";

const AppPage: React.FC = () => {
  const { t } = useLang();
  const { user } = useAuth();
  const { country } = useGeoPricing();
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
  const [transitionClass, setTransitionClass] = useState("animate-page-slide-in");
  const [entries, setEntries] = useState<Array<{ mood: number; date: string; text: string }>>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energy, setEnergy] = useState(50);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [journalAutoRecord, setJournalAutoRecord] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSignupAfterSave, setShowSignupAfterSave] = useState(false);
  const [activeTabAnim, setActiveTabAnim] = useState<string | null>(null);
  const [journalPrompt, setJournalPrompt] = useState<string>("");

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
        setEntries(
          dbEntries.map((e) => ({
            mood: e.mood,
            date: e.entry_date,
            text: e.text,
          }))
        );
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleOnboardingComplete = async () => {
    if (user) {
      await updateProfile(user.id, { onboarded: true } as any);
    }
    setShowOnboarding(false);
  };

  // Navigate with iOS-style slide transitions
  const navigateTo = useCallback((newScreen: Screen) => {
    if (newScreen === screen) return;
    
    const oldIdx = screenOrder.indexOf(screen);
    const newIdx = screenOrder.indexOf(newScreen);
    const isForward = newIdx > oldIdx || newScreen === "journal" || newScreen === "settings" || newScreen === "pro";
    
    setPrevScreen(screen);
    setTransitionClass(isForward ? "animate-page-slide-in" : "animate-page-slide-back");
    setScreen(newScreen);

    // Persist main tab across refresh
    const mainTabs: Screen[] = ["home", "insights", "coach", "pro"];
    if (mainTabs.includes(newScreen)) {
      try { localStorage.setItem("nuju-screen", newScreen); } catch {}
    }

    // Tab pop animation
    setActiveTabAnim(newScreen);
    setTimeout(() => setActiveTabAnim(null), 300);
    
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
      toast.success("Your 7-day free trial has started!");
    } catch (err) {
      console.error("Trial start failed:", err);
      toast.error("Could not start trial");
    }
  };

  // Lemon Squeezy checkout
  const handleCheckout = async (plan: string) => {
    if (!user) return;
    try {
      const variantMap: Record<string, string> = {
        plus_monthly: "1428721",
        plus_annual: "1428730",
        pro_monthly: "1428741",
        pro_annual: "1428750",
      };
      const variantId = variantMap[plan];
      if (!variantId || variantId.includes("VARIANT_ID")) {
        toast.info("Payments coming soon! Stay tuned.");
        return;
      }
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lemon-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            variant_id: variantId,
            user_id: user.id,
            user_email: user.email,
            country,
          }),
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data.url) window.open(data.url, "_blank");
      } else {
        toast.error("Could not start checkout. Try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed");
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
      const newEntries = [{ mood: entry.mood, date: entry.entry_date, text: "" }, ...entries];
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
        { mood: entry.mood, date: entry.entry_date, text: entry.text },
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
        const aiUrl = "https://sxgmlnlqmdjjfmcypivi.supabase.co";
        const aiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4Z21sbmxxbWRqamZtY3lwaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTEyNDYsImV4cCI6MjA4OTU4NzI0Nn0.kUM2J00vmkRd55MmQw5AAadS8XGZKeLY0mgGg8aAVFg";
        const resp = await fetch(
          `${aiUrl}/functions/v1/ai-insight`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${aiKey}`,
            },
            body: JSON.stringify({ text, mood: selectedMood, energy }),
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          return data.insight || null;
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

        {/* Screen content with transition */}
        <div key={screen} className={transitionClass}>
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
        </div>
      </div>

      {/* iOS-style tab bar with spring animations */}
      {screen !== "journal" && screen !== "settings" && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/70 backdrop-blur-2xl border-t border-border/20 safe-area-bottom">
          <div className="max-w-app mx-auto flex">
            {navItems.map((item) => {
              const active = screen === item.id;
              const isPopping = activeTabAnim === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2 pt-2.5 transition-all duration-200 ${
                    active ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  <div className={`relative ${isPopping ? "animate-tab-pop" : ""}`}>
                    <Icon
                      className={`w-[22px] h-[22px] transition-all duration-300 ${active ? "scale-[1.08]" : ""}`}
                      strokeWidth={active ? 2.3 : 1.6}
                    />
                    {/* Active indicator dot */}
                    {active && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-spring-in" />
                    )}
                  </div>
                  <span className={`text-[10px] transition-all duration-200 ${active ? "font-bold" : "font-medium"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppPage;

import React, { useState, useEffect, useCallback } from "react";
import { useGeoPricing } from "@/hooks/use-geo-pricing";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { fetchEntries, createEntry, fetchProfile, updateProfile, checkEntryLimit, EntryRow, ProfileRow } from "@/lib/api";
import OnboardingScreen from "@/components/app/OnboardingScreen";
import HomeScreen from "@/components/app/HomeScreen";
import JournalScreen from "@/components/app/JournalScreen";
import InsightsScreen from "@/components/app/InsightsScreen";
import CoachScreen from "@/components/app/CoachScreen";
import SettingsScreen from "@/components/app/SettingsScreen";
import PricingScreen from "@/components/app/PricingScreen";
import Confetti from "@/components/app/Confetti";
import { Home, BarChart3, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Screen = "home" | "journal" | "insights" | "coach" | "pro" | "settings";

const AppPage: React.FC = () => {
  const { t } = useLang();
  const { user } = useAuth();
  const { country } = useGeoPricing();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [entries, setEntries] = useState<Array<{ mood: number; date: string; text: string }>>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energy, setEnergy] = useState(50);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSignupAfterSave, setShowSignupAfterSave] = useState(false);

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

  // Confetti on mood 5 selection
  const handleMoodSelect = useCallback((mood: number) => {
    setSelectedMood(mood);
    if (mood === 5) {
      setShowConfetti(true);
    }
  }, []);
  // Lemon Squeezy checkout
  const handleCheckout = async (plan: string) => {
    if (!user) return;
    try {
      // Variant IDs should be configured in Lemon Squeezy dashboard
      // These are placeholders — replace with real variant IDs
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

  const handleSaveEntry = async (text: string): Promise<string | null> => {
    if (!user) return null;
    try {
      // Check entry limit (free = 3/week)
      const canWrite = await checkEntryLimit(user.id);
      if (!canWrite) {
        toast.error(t.history_locked || "Entry limit reached. Upgrade for unlimited entries.");
        return null;
      }

      const entry = await createEntry(user.id, selectedMood, text, energy);
      const newEntries = [
        { mood: entry.mood, date: entry.entry_date, text: entry.text },
        ...entries,
      ];
      setEntries(newEntries);

      // Refresh profile for updated streak
      const updatedProfile = await fetchProfile(user.id);
      if (updatedProfile) {
        setStreak(updatedProfile.streak_current);
        setProfile(updatedProfile);
      }

      // Show SignupPrompt after 3rd entry (1.5s delay)
      if (newEntries.length === 3) {
        setTimeout(() => setShowSignupAfterSave(true), 1500);
      }

      // Get AI insight
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-insight`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-6 animate-fade-in">
          <div className="bg-card rounded-3xl p-6 max-w-xs w-full shadow-xl border border-border/50 text-center animate-celebrate-pop">
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              {(t.signup_title || "Ju knows you now").replace("{n}", String(entries.length))}
            </h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {(t.signup_desc || "You've written {n} entries. Create an account to keep your journal safe forever.").replace("{n}", String(entries.length))}
            </p>
            <button
              onClick={() => { setShowSignupAfterSave(false); setScreen("pro"); }}
              className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm mb-2 transition-all active:scale-[0.97]"
            >
              {t.signup_btn || "Save my journal"}
            </button>
            <button
              onClick={() => setShowSignupAfterSave(false)}
              className="w-full py-2 text-sm text-muted-foreground transition-all active:scale-[0.97]"
            >
              {t.signup_later || "Maybe later"}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 w-full max-w-app mx-auto px-4 pt-6 pb-24">
        {screen === "home" && (
          <HomeScreen
            onNavigate={(s) => setScreen(s as Screen)}
            onSettings={() => setScreen("settings")}
            onUpgrade={() => setScreen("pro")}
            streak={streak}
            entries={entries}
            selectedMood={selectedMood}
            onMoodSelect={handleMoodSelect}
            energy={energy}
            onEnergyChange={setEnergy}
          />
        )}
        {screen === "journal" && (
          <JournalScreen onBack={() => setScreen("home")} onSave={handleSaveEntry} />
        )}
        {screen === "insights" && <InsightsScreen entries={entries} onUpgrade={() => setScreen("pro")} />}
        {screen === "coach" && <CoachScreen onUpgrade={() => setScreen("pro")} />}
        {screen === "settings" && <SettingsScreen onBack={() => setScreen("home")} onUpgrade={() => setScreen("pro")} />}
        {screen === "pro" && (
          <PricingScreen
            currentPlan={profile?.plan || "free"}
            onCheckout={handleCheckout}
            onBack={() => setScreen("home")}
          />
        )}
      </div>

      {screen !== "journal" && screen !== "settings" && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border/50 safe-area-bottom">
          <div className="max-w-app mx-auto flex">
            {navItems.map((item) => {
              const active = screen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all active:scale-[0.95] ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
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

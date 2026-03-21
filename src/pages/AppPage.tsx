import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { fetchEntries, createEntry, fetchProfile, updateProfile, EntryRow, ProfileRow } from "@/lib/api";
import OnboardingScreen from "@/components/app/OnboardingScreen";
import HomeScreen from "@/components/app/HomeScreen";
import JournalScreen from "@/components/app/JournalScreen";
import InsightsScreen from "@/components/app/InsightsScreen";
import CoachScreen from "@/components/app/CoachScreen";
import SettingsScreen from "@/components/app/SettingsScreen";
import { Home, BarChart3, MessageCircle, Sparkles, Loader2 } from "lucide-react";

type Screen = "home" | "journal" | "insights" | "coach" | "pro" | "settings";

const AppPage: React.FC = () => {
  const { t } = useLang();
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [entries, setEntries] = useState<Array<{ mood: number; date: string; text: string }>>([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [energy, setEnergy] = useState(50);

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

  const handleSaveEntry = async (text: string) => {
    if (!user) return;
    try {
      const entry = await createEntry(user.id, selectedMood, text, energy);
      setEntries((prev) => [
        { mood: entry.mood, date: entry.entry_date, text: entry.text },
        ...prev,
      ]);
      // Refresh profile for updated streak
      const updatedProfile = await fetchProfile(user.id);
      if (updatedProfile) {
        setStreak(updatedProfile.streak_current);
        setProfile(updatedProfile);
      }
    } catch (err) {
      console.error("Failed to save entry:", err);
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
      <div className="flex-1 w-full max-w-app mx-auto px-4 pt-6 pb-24">
        {screen === "home" && (
          <HomeScreen
            onNavigate={(s) => setScreen(s as Screen)}
            onSettings={() => setScreen("settings")}
            onUpgrade={() => setScreen("pro")}
            streak={streak}
            entries={entries}
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
            energy={energy}
            onEnergyChange={setEnergy}
          />
        )}
        {screen === "journal" && (
          <JournalScreen onBack={() => setScreen("home")} onSave={handleSaveEntry} />
        )}
        {screen === "insights" && <InsightsScreen entries={entries} onUpgrade={() => setScreen("pro")} />}
        {screen === "coach" && <CoachScreen />}
        {screen === "settings" && <SettingsScreen onBack={() => setScreen("home")} />}
        {screen === "pro" && (
          <div className="animate-fade-up text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-3">{t.unlock_ju}</h1>
            <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
              Unlimited entries, all 4 coach personas, full history, and AI-powered insights.
            </p>
            <div className="space-y-3 max-w-xs mx-auto">
              <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all active:scale-[0.97]">
                {t.monthly} — $4.99
              </button>
              <button className="w-full py-4 rounded-2xl bg-secondary text-foreground font-semibold transition-all active:scale-[0.97]">
                {t.annual} — $39.99
              </button>
            </div>
          </div>
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

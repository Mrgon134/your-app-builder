import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import OnboardingScreen from "@/components/app/OnboardingScreen";
import HomeScreen from "@/components/app/HomeScreen";
import JournalScreen from "@/components/app/JournalScreen";
import InsightsScreen from "@/components/app/InsightsScreen";
import CoachScreen from "@/components/app/CoachScreen";
import SettingsScreen from "@/components/app/SettingsScreen";
import { Home, BarChart3, MessageCircle, Sparkles } from "lucide-react";

type Screen = "home" | "journal" | "insights" | "coach" | "pro" | "settings";

const AppPage: React.FC = () => {
  const { t } = useLang();
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem("nuju-onboarded"));
  const [screen, setScreen] = useState<Screen>("home");
  const [entries, setEntries] = useState<Array<{ mood: number; date: string; text: string }>>(() => {
    const saved = localStorage.getItem("nuju-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [streak] = useState(() => {
    const saved = localStorage.getItem("nuju-streak");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("nuju-entries", JSON.stringify(entries));
  }, [entries]);

  const handleOnboardingComplete = () => {
    localStorage.setItem("nuju-onboarded", "true");
    setShowOnboarding(false);
  };

  const handleSaveEntry = (text: string) => {
    const newEntry = { mood: 3, date: new Date().toISOString(), text };
    setEntries((prev) => [newEntry, ...prev]);
    const newStreak = streak + 1;
    localStorage.setItem("nuju-streak", String(newStreak));
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const navItems = [
    { id: "home" as const, icon: Home, label: t.home },
    { id: "insights" as const, icon: BarChart3, label: t.insights_label },
    { id: "coach" as const, icon: MessageCircle, label: t.coach_label },
    { id: "pro" as const, icon: Sparkles, label: t.pro_label },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <div className="flex-1 w-full max-w-app mx-auto px-4 pt-6 pb-24">
        {screen === "home" && (
          <HomeScreen
            onNavigate={(s) => setScreen(s as Screen)}
            onSettings={() => setScreen("settings")}
            streak={streak}
          />
        )}
        {screen === "journal" && (
          <JournalScreen
            onBack={() => setScreen("home")}
            onSave={handleSaveEntry}
          />
        )}
        {screen === "insights" && <InsightsScreen entries={entries} />}
        {screen === "coach" && <CoachScreen />}
        {screen === "settings" && <SettingsScreen onBack={() => setScreen("home")} />}
        {screen === "pro" && (
          <div className="animate-fade-up text-center py-12">
            <Crown className="w-12 h-12 mx-auto text-mood-okay mb-4" />
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

      {/* Bottom nav */}
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

import React, { useState } from "react";
import { useLang, LANG_META } from "@/lib/i18n";
import { ArrowLeft, Moon, Globe, Crown } from "lucide-react";

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { t, lang, setLang } = useLang();
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="animate-fade-up">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground mb-6 transition-all active:scale-[0.97]">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">{t.back}</span>
      </button>

      <h1 className="font-serif text-2xl font-bold text-foreground mb-8">{t.settings}</h1>

      <div className="space-y-3">
        {/* Dark mode */}
        <div className="bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm border border-border/50">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">{t.dark_mode}</span>
          </div>
          <button
            onClick={toggleDark}
            className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-border"}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-card shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Language */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">{t.language}</span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {LANG_META.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-[0.95] ${
                  lang === l.code ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pro upsell */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 text-center">
          <Crown className="w-8 h-8 mx-auto text-mood-okay mb-3" />
          <p className="font-serif text-lg font-semibold mb-1">{t.unlock_ju}</p>
          <p className="text-sm text-muted-foreground mb-4">Unlimited entries, all coaches, full history</p>
          <button className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm transition-all active:scale-[0.97]">
            {t.start_trial}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

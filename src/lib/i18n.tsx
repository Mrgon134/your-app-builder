import React, { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations";

type LangContextType = {
  lang: string;
  t: Record<string, string>;
  setLang: (l: string) => void;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  setLang: () => {},
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("nuju-lang");
    if (saved && translations[saved]) return saved;
    // Auto-detect browser language on first load
    const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
    return browserLang && translations[browserLang] ? browserLang : "en";
  });

  const setLang = useCallback((l: string) => {
    if (translations[l]) {
      setLangState(l);
      localStorage.setItem("nuju-lang", l);
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] || translations.en, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);

export const LANG_META = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Melayu", flag: "🇲🇾" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "fil", label: "Filipino", flag: "🇵🇭" },
];

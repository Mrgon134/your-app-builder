import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { translations } from "./translations";
import { useGeoPricing } from "@/hooks/use-geo-pricing";

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

function mapCountryToLang(countryCode: string): string {
  const map: Record<string, string> = {
    ID: "id", MY: "ms", BN: "ms",
    FR: "fr", BE: "fr", CH: "de", CA: "en",
    DE: "de", AT: "de",
    ES: "es", AR: "es", CO: "es", MX: "es", PE: "es", CL: "es", VE: "es",
    JP: "ja", KR: "ko",
    CN: "zh", TW: "zh", HK: "zh",
    IN: "hi",
    SA: "ar", AE: "ar", EG: "ar", MA: "ar",
    TH: "th", VN: "vi", PH: "fil"
  };
  return map[countryCode] || "en";
}

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("nuju-lang");
    if (saved && translations[saved]) return saved;
    // Auto-detect browser language as an immediate fallback before Geo loads
    const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
    return browserLang && translations[browserLang] ? browserLang : "en";
  });

  const geo = useGeoPricing();

  useEffect(() => {
    const saved = localStorage.getItem("nuju-lang");
    if (!saved && geo.country && geo.country !== "US" && !geo.isLoading) {
      const derivedLang = mapCountryToLang(geo.country);
      if (derivedLang !== "en" && derivedLang !== lang && translations[derivedLang]) {
        setLangState(derivedLang);
        // We do NOT save it to localStorage here, so it remains purely auto-detected
        // until the user explicitly changes it via Settings.
      }
    }
  }, [geo.country, geo.isLoading, lang]);

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

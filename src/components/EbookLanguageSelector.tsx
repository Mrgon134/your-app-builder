import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { EBOOK_LANGUAGES, EbookLanguageCode, EbookLanguageMeta } from "@/data/ebook-i18n";

interface EbookLanguageSelectorProps {
  currentLang: string;
  onSelectLang: (langCode: EbookLanguageCode) => void;
  className?: string;
  size?: "sm" | "md";
}

export const EbookLanguageSelector: React.FC<EbookLanguageSelectorProps> = ({
  currentLang,
  onSelectLang,
  className = "",
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeMeta =
    EBOOK_LANGUAGES.find((l) => l.code === currentLang) ||
    EBOOK_LANGUAGES.find((l) => l.code === "id") ||
    EBOOK_LANGUAGES[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (code: EbookLanguageCode) => {
    onSelectLang(code);
    try {
      localStorage.setItem("nuju-ebook-lang", code);
    } catch {
      // safe fallback if storage restricted
    }
    setIsOpen(false);
  };

  const isSmall = size === "sm";

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/95 backdrop-blur-xs font-semibold text-neutral-800 shadow-2xs hover:bg-neutral-50 hover:border-neutral-400 active:scale-95 transition ${
          isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-xs sm:text-sm"
        }`}
      >
        <span className="text-base leading-none">{activeMeta.flag}</span>
        <span className="font-medium truncate max-w-[90px] sm:max-w-[120px]">
          {activeMeta.nativeName}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-64 sm:w-72 max-h-80 overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin scrollbar-thumb-neutral-200"
        >
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-amber-600" />
              15 Bahasa Tersedia
            </span>
            <span className="text-[10px] text-amber-700 font-mono">Global i18n</span>
          </div>

          <div className="py-1 space-y-0.5">
            {EBOOK_LANGUAGES.map((lang: EbookLanguageMeta) => {
              const isSelected = lang.code === activeMeta.code;
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition ${
                    isSelected
                      ? "bg-amber-100/80 text-amber-950 font-bold"
                      : "hover:bg-neutral-50 text-neutral-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg leading-none shrink-0">{lang.flag}</span>
                    <div className="min-w-0">
                      <p className="font-medium leading-tight truncate">{lang.nativeName}</p>
                      <p className="text-[10px] text-neutral-400 leading-tight truncate">{lang.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="font-mono text-[11px] text-neutral-500 font-medium">
                      {lang.basicPrice}
                    </span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-amber-700" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EbookLanguageSelector;

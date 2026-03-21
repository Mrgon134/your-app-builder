import React from "react";
import { useLang } from "@/lib/i18n";
import { Lock, Sparkles } from "lucide-react";

interface HistoryLockProps {
  onUpgrade: () => void;
}

const HistoryLock: React.FC<HistoryLockProps> = ({ onUpgrade }) => {
  const { t } = useLang();

  return (
    <div className="relative rounded-3xl overflow-hidden">
      {/* Blurred preview rows */}
      <div className="space-y-3 p-5 select-none pointer-events-none" aria-hidden>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 opacity-40"
            style={{ filter: `blur(${i * 2}px)` }}
          >
            <div className="w-10 h-10 rounded-xl bg-muted" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-3/4 rounded bg-muted" />
              <div className="h-2.5 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <p className="font-serif text-base font-semibold text-foreground mb-1">
          {t.history_locked || "Full history locked"}
        </p>
        <p className="text-xs text-muted-foreground mb-4 text-center max-w-[200px]">
          {t.history_locked_desc || "Free plan shows 7 days. Upgrade to see all your entries."}
        </p>
        <button
          onClick={onUpgrade}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
        >
          <Sparkles className="w-4 h-4" />
          {t.unlock_pro || "Unlock with Pro"}
        </button>
      </div>
    </div>
  );
};

export default HistoryLock;

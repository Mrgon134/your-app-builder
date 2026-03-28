import React from "react";
import { useLang } from "@/lib/i18n";
import { Lock, Sparkles } from "lucide-react";
import { hasPlusAccess } from "@/lib/trial";

interface HistoryLockProps {
  onUpgrade: () => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const HistoryLock: React.FC<HistoryLockProps> = ({ onUpgrade, plan = "free", trialStartedAt = null }) => {
  const { t } = useLang();

  if (hasPlusAccess(plan, trialStartedAt)) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Blurred preview rows */}
      <div className="space-y-3 p-5 select-none pointer-events-none" aria-hidden>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 opacity-30"
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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/85 backdrop-blur-sm rounded-2xl border border-border/40">
        <div className="w-11 h-11 rounded-2xl bg-primary/8 flex items-center justify-center mb-3">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <p className="font-semibold text-foreground text-[15px] mb-1">
          {t.history_locked || "Full history locked"}
        </p>
        <p className="text-[12px] text-muted-foreground mb-4 text-center max-w-[200px]">
          {t.history_locked_desc || "Free plan shows 7 days. Upgrade to see all your entries."}
        </p>
        <button
          onClick={onUpgrade}
          className="flex items-center gap-2 px-5 h-[40px] rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold transition-all active:scale-[0.97] shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t.unlock_plus || t.unlock_ju || "Unlock with Plus"}
        </button>
      </div>
    </div>
  );
};

export default HistoryLock;
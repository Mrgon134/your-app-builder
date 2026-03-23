import React from "react";
import { Clock, Sparkles } from "lucide-react";
import { getTrialStatus, formatTrialCountdown } from "@/lib/trial";

interface TrialBannerProps {
  trialStartedAt: string | null;
  plan: string;
  onUpgrade: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialStartedAt, plan, onUpgrade }) => {
  // Don't show for paying users
  if (plan === "plus" || plan === "pro") return null;

  const trial = getTrialStatus(trialStartedAt);

  // Not on trial yet
  if (trial.notStarted) return null;

  // Trial expired
  if (trial.expired) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 mb-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Trial ended</p>
            <p className="text-xs text-muted-foreground">Upgrade to keep your AI insights & unlimited entries</p>
          </div>
          <button
            onClick={onUpgrade}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold transition-all active:scale-[0.97] flex-shrink-0"
          >
            Upgrade
          </button>
        </div>
      </div>
    );
  }

  // Active trial — show countdown
  const urgentColor = trial.daysLeft <= 2;

  return (
    <div className={`${urgentColor ? "bg-[#FFB347]/10 border-[#FFB347]/20" : "bg-primary/[0.06] border-primary/15"} border rounded-2xl p-4 mb-4 animate-fade-in`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${urgentColor ? "bg-[#FFB347]/15" : "bg-primary/10"} flex items-center justify-center flex-shrink-0`}>
          {urgentColor ? (
            <Clock className="w-5 h-5 text-[#FFB347]" />
          ) : (
            <Sparkles className="w-5 h-5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {urgentColor ? "⏰ " : "✨ "}
            {formatTrialCountdown(trial.daysLeft)}
          </p>
          <p className="text-xs text-muted-foreground">
            {urgentColor
              ? "Don't lose your AI insights & history"
              : "Enjoying Nuju Plus? Subscribe to keep access"
            }
          </p>
        </div>
        <button
          onClick={onUpgrade}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] flex-shrink-0 ${
            urgentColor
              ? "bg-[#FFB347] text-white"
              : "bg-primary/10 text-primary"
          }`}
        >
          {urgentColor ? "Subscribe now" : "See plans"}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${urgentColor ? "bg-[#FFB347]" : "bg-primary"}`}
          style={{ width: `${(trial.daysUsed / 7) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TrialBanner;

import React from "react";
import { Clock, Sparkles } from "lucide-react";
import { getTrialStatus, formatTrialCountdown } from "@/lib/trial";
import { useLang } from "@/lib/i18n";

interface TrialBannerProps {
  trialStartedAt: string | null;
  plan: string;
  onUpgrade: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialStartedAt, plan, onUpgrade }) => {
  const { t } = useLang();

  if (plan === "plus" || plan === "pro" || plan === "lifetime") return null;

  const trial = getTrialStatus(trialStartedAt);
  if (trial.notStarted) return null;

  if (trial.expired) {
    return (
      <div className="bg-destructive/6 border border-destructive/15 rounded-2xl p-4 mb-5 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-destructive/8 flex items-center justify-center flex-shrink-0">
            <Clock className="w-[18px] h-[18px] text-destructive" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-foreground">{t.pro_trial_ended_title || "Your Pro trial ended"}</p>
            <p className="text-[12px] text-muted-foreground">{t.pro_trial_ended_sub || "Choose Plus to keep the essentials, or Pro to keep voice, memory, and deeper AI features."}</p>
          </div>
          <button
            onClick={onUpgrade}
            className="px-4 h-[34px] rounded-lg bg-primary text-primary-foreground text-[12px] font-semibold transition-all active:scale-[0.97] flex-shrink-0"
          >
            {t.choose_plan || "Choose plan"}
          </button>
        </div>
      </div>
    );
  }

  const urgentColor = trial.daysLeft <= 2;

  return (
    <div className={`${urgentColor ? "bg-mood-okay/6 border-mood-okay/15" : "bg-primary/5 border-primary/10"} border rounded-2xl p-4 mb-5 animate-fade-in`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl ${urgentColor ? "bg-mood-okay/10" : "bg-primary/8"} flex items-center justify-center flex-shrink-0`}>
          {urgentColor ? (
            <Clock className="w-[18px] h-[18px] text-mood-okay" />
          ) : (
            <Sparkles className="w-[18px] h-[18px] text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-foreground">
            {(t.pro_trial_days_left || "{time} left in your Pro trial").replace("{time}", formatTrialCountdown(trial.daysLeft, t))}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {urgentColor
              ? (t.pro_trial_urgent_sub || "Decide soon if you want to keep full Pro access after the trial ends.")
              : (t.pro_trial_active_sub || "You currently have full Pro access: voice journaling, AI memory, all coach personas, and unlimited history.")
            }
          </p>
        </div>
        <button
          onClick={onUpgrade}
          className={`px-4 h-[34px] rounded-lg text-[12px] font-semibold transition-all active:scale-[0.97] flex-shrink-0 ${
            urgentColor
              ? "bg-mood-okay text-white"
              : "bg-primary/8 text-primary"
          }`}
        >
          {urgentColor ? (t.keep_pro || "Keep Pro") : (t.choose_plan || "Choose plan")}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${urgentColor ? "bg-mood-okay" : "bg-primary"}`}
          style={{ width: `${(trial.daysUsed / 7) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TrialBanner;

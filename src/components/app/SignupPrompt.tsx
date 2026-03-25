import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { X, Sparkles } from "lucide-react";

interface SignupPromptProps {
  entriesCount: number;
  onDismiss: () => void;
  onUpgrade: () => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const FREE_ENTRY_LIMIT = 3;

const SignupPrompt: React.FC<SignupPromptProps> = ({ entriesCount, onDismiss, onUpgrade, plan = "free", trialStartedAt = null }) => {
  const { t } = useLang();
  const [dismissed, setDismissed] = useState(false);

  // Hide if user has plus access (paid or active trial)
  const { hasPlusAccess } = require("@/lib/trial");
  if (dismissed || entriesCount < FREE_ENTRY_LIMIT || hasPlusAccess(plan, trialStartedAt)) return null;

  const remaining = Math.max(0, FREE_ENTRY_LIMIT - entriesCount);

  return (
    <div className="relative bg-primary/[0.06] border border-primary/20 rounded-3xl p-5 mb-4 animate-fade-in">
      <button
        onClick={() => { setDismissed(true); onDismiss(); }}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors active:scale-[0.95]"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        <img
          src={JU_STICKERS.love}
          alt="Ju"
          className="w-14 h-14 flex-shrink-0 animate-[ju-float_3s_ease-in-out_infinite]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-base font-bold text-foreground mb-1">
            {t.signup_title || "Ju is getting to know you!"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {t.signup_desc || `You've written ${entriesCount} entries. Unlock unlimited journaling, all coach personas, and full history.`}
          </p>
          <button
            onClick={onUpgrade}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]"
          >
            <Sparkles className="w-4 h-4" />
            {t.signup_cta || "Unlock full access"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { FREE_ENTRY_LIMIT };
export default SignupPrompt;

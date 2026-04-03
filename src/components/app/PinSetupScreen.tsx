import React, { useState, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { ShieldCheck, Delete, ArrowLeft } from "lucide-react";
import { hashPin, PIN_LENGTH } from "@/components/app/PinLockScreen";
import { toast } from "sonner";

interface PinSetupScreenProps {
  onComplete: () => void;
  onSkip?: () => void;
  /** If true, shows as a full-screen onboarding step. Otherwise, inline settings mode */
  isOnboarding?: boolean;
  /** If provided, requires old PIN verification first (for change PIN flow) */
  requireOldPin?: boolean;
}

type SetupStep = "old" | "create" | "confirm";

const PinSetupScreen: React.FC<PinSetupScreenProps> = ({
  onComplete,
  onSkip,
  isOnboarding = false,
  requireOldPin = false,
}) => {
  const { t } = useLang();
  const [step, setStep] = useState<SetupStep>(requireOldPin ? "old" : "create");
  const [pin, setPin] = useState("");
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [success, setSuccess] = useState(false);

  const title = {
    old: t.enter_current_pin || "Enter current PIN",
    create: t.set_pin || "Create a PIN",
    confirm: t.confirm_pin || "Confirm your PIN",
  };

  const subtitle = {
    old: t.verify_identity || "Verify your identity first",
    create: t.set_pin_desc || "Choose a 4-digit PIN to protect your journal",
    confirm: t.confirm_pin_desc || "Enter the same PIN again to confirm",
  };

  const triggerError = () => {
    setError(true);
    setShaking(true);
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
    setTimeout(() => {
      setShaking(false);
      setPin("");
    }, 500);
  };

  const handleDigit = useCallback(
    async (digit: string) => {
      if (pin.length >= PIN_LENGTH || success) return;

      const newPin = pin + digit;
      setPin(newPin);
      setError(false);
      if (navigator.vibrate) navigator.vibrate(6);

      if (newPin.length === PIN_LENGTH) {
        if (step === "old") {
          // Verify old PIN
          const storedHash = localStorage.getItem("nuju-pin-hash");
          const inputHash = await hashPin(newPin);
          if (inputHash === storedHash) {
            setTimeout(() => {
              setPin("");
              setStep("create");
            }, 300);
          } else {
            triggerError();
          }
        } else if (step === "create") {
          setFirstPin(newPin);
          setTimeout(() => {
            setPin("");
            setStep("confirm");
          }, 300);
        } else if (step === "confirm") {
          if (newPin === firstPin) {
            // Save hash
            const hash = await hashPin(newPin);
            localStorage.setItem("nuju-pin-hash", hash);
            setSuccess(true);
            if (navigator.vibrate) navigator.vibrate([10, 50, 20]);
            toast.success(t.pin_enabled || "PIN lock enabled 🔒");
            setTimeout(() => onComplete(), 800);
          } else {
            toast.error(t.pin_mismatch || "PINs don't match. Try again.");
            triggerError();
            setTimeout(() => {
              setStep("create");
              setFirstPin("");
            }, 600);
          }
        }
      }
    },
    [pin, step, firstPin, success, onComplete, t]
  );

  const handleDelete = useCallback(() => {
    if (success) return;
    setPin((prev) => prev.slice(0, -1));
    setError(false);
    if (navigator.vibrate) navigator.vibrate(4);
  }, [success]);

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  const containerClass = isOnboarding
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
    : "flex flex-col items-center justify-center py-6 px-4";

  return (
    <div className={containerClass} style={isOnboarding ? { background: "#F5F3FF" } : {}}>
      {/* Back/Skip for onboarding */}
      {isOnboarding && onSkip && (
        <button
          onClick={onSkip}
          className="absolute top-6 right-6 text-sm font-medium"
          style={{ color: "#777" }}
        >
          {t.pin_skip || "Skip"}
        </button>
      )}

      {/* Back button for settings mode */}
      {!isOnboarding && (
        <button
          onClick={onSkip || onComplete}
          className="self-start flex items-center gap-1 text-primary mb-4 press-spring"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[14px] font-medium">{t.back || "Back"}</span>
        </button>
      )}

      <div className="flex flex-col items-center w-full max-w-xs mx-auto">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
            success ? "bg-green-500/15 scale-110" : "bg-primary/10"
          }`}
        >
          <ShieldCheck
            className={`w-8 h-8 transition-colors duration-500 ${
              success ? "text-green-500" : "text-primary"
            }`}
          />
        </div>

        {/* Title */}
        <h2
          className="text-xl font-bold mb-1 text-center"
          style={isOnboarding ? { color: "#1A1A2E" } : {}}
        >
          {success ? (t.pin_set_success || "PIN set! 🔒") : title[step]}
        </h2>
        <p
          className="text-[13px] text-center mb-8"
          style={isOnboarding ? { color: "#777" } : {}}
        >
          {success
            ? (t.pin_set_success_desc || "Your journal is now protected")
            : subtitle[step]}
        </p>

        {/* Step indicator */}
        {!success && (
          <div className="flex items-center gap-2 mb-6">
            {(requireOldPin ? ["old", "create", "confirm"] as const : ["create", "confirm"] as const).map(
              (s, i) => (
                <div
                  key={s}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: step === s ? 24 : 8,
                    background:
                      step === s
                        ? isOnboarding ? "#7C6EDB" : "hsl(var(--primary))"
                        : isOnboarding ? "#E8E4F8" : "hsl(var(--foreground)/0.1)",
                  }}
                />
              )
            )}
          </div>
        )}

        {/* Dot indicators */}
        {!success && (
          <div
            className={`flex items-center gap-4 mb-8 ${
              shaking ? "animate-pin-shake" : ""
            }`}
          >
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full transition-all duration-200"
                style={{
                  background:
                    i < pin.length
                      ? error
                        ? "#E8878C"
                        : isOnboarding ? "#7C6EDB" : "hsl(var(--primary))"
                      : isOnboarding ? "rgba(124,110,219,0.15)" : "hsl(var(--foreground)/0.12)",
                  transform: i < pin.length ? "scale(1.15)" : "scale(1)",
                  boxShadow:
                    i < pin.length && !error
                      ? isOnboarding ? "0 0 12px rgba(124,110,219,0.4)" : "0 0 12px hsl(var(--primary)/0.4)"
                      : "none",
                }}
              />
            ))}
          </div>
        )}

        {/* Success checkmark */}
        {success && (
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-8 animate-spring-in">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}

        {/* Numeric keypad */}
        {!success && (
          <div className="grid grid-cols-3 gap-3 w-full max-w-[260px] mx-auto">
            {keys.map((key, i) => {
              if (key === "") {
                return <div key={i} className="w-full aspect-square" />;
              }

              if (key === "del") {
                return (
                  <button
                    key={i}
                    onClick={handleDelete}
                    disabled={pin.length === 0}
                    className="w-full aspect-square rounded-2xl flex items-center justify-center transition-all disabled:opacity-30 active:bg-foreground/5"
                    style={isOnboarding ? { color: "#777" } : {}}
                  >
                    <Delete className="w-6 h-6" />
                  </button>
                );
              }

              return (
                <button
                  key={i}
                  onClick={() => handleDigit(key)}
                  className="w-full aspect-square rounded-2xl flex items-center justify-center text-[24px] font-semibold transition-all active:scale-90"
                  style={
                    isOnboarding
                      ? {
                          background: "rgba(124,110,219,0.06)",
                          color: "#1A1A2E",
                        }
                      : {
                          background: "hsl(var(--foreground)/0.04)",
                          color: "hsl(var(--foreground))",
                        }
                  }
                >
                  {key}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Shake animation (shared with PinLockScreen) */}
      <style>{`
        @keyframes pin-shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-8px); }
          30%, 70% { transform: translateX(8px); }
        }
        .animate-pin-shake {
          animation: pin-shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PinSetupScreen;

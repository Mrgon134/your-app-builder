import React, { useState, useCallback, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { Fingerprint, Delete } from "lucide-react";
import juMain from "@/assets/ju-main.webp";

interface PinLockScreenProps {
  onUnlock: () => void;
  onBiometric?: () => void;
  biometricAvailable?: boolean;
}

const PIN_LENGTH = 4;

async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + "nuju-salt-2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const PinLockScreen: React.FC<PinLockScreenProps> = ({
  onUnlock,
  onBiometric,
  biometricAvailable = false,
}) => {
  const { t } = useLang();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Lockout after 5 failed attempts
  useEffect(() => {
    if (locked && lockTimer > 0) {
      const interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [locked, lockTimer]);

  const handleDigit = useCallback(
    async (digit: string) => {
      if (locked) return;
      if (pin.length >= PIN_LENGTH) return;

      const newPin = pin + digit;
      setPin(newPin);
      setError(false);

      if (navigator.vibrate) navigator.vibrate(6);

      if (newPin.length === PIN_LENGTH) {
        // Verify
        const storedHash = localStorage.getItem("nuju-pin-hash");
        if (!storedHash) {
          onUnlock();
          return;
        }

        const inputHash = await hashPin(newPin);
        if (inputHash === storedHash) {
          // Success
          if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
          onUnlock();
        } else {
          // Wrong
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          setError(true);
          setShaking(true);
          if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

          setTimeout(() => {
            setShaking(false);
            setPin("");
          }, 500);

          if (newAttempts >= 5) {
            setLocked(true);
            setLockTimer(30);
          }
        }
      }
    },
    [pin, locked, attempts, onUnlock]
  );

  const handleDelete = useCallback(() => {
    if (locked) return;
    setPin((prev) => prev.slice(0, -1));
    setError(false);
    if (navigator.vibrate) navigator.vibrate(4);
  }, [locked]);

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Gradient background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, hsl(var(--primary)/0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs mx-auto px-6">
        {/* Mascot */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-[-8px] rounded-full bg-primary/10 animate-glow-pulse" />
          <img
            src={juMain}
            alt="Ju"
            className="relative w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground mb-1">
          {t.enter_pin || "Enter your PIN"}
        </h2>
        <p className="text-[13px] text-muted-foreground mb-8">
          {locked
            ? `${t.pin_locked || "Too many attempts. Wait"} ${lockTimer}s`
            : error
            ? t.pin_wrong || "Wrong PIN. Try again."
            : t.protect_journal_desc || "Your journal is protected"}
        </p>

        {/* Dot indicators */}
        <div
          className={`flex items-center gap-4 mb-10 ${
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
                      : "hsl(var(--primary))"
                    : "hsl(var(--foreground)/0.12)",
                transform: i < pin.length ? "scale(1.15)" : "scale(1)",
                boxShadow:
                  i < pin.length && !error
                    ? "0 0 12px hsl(var(--primary)/0.4)"
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Numeric keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px] mx-auto">
          {keys.map((key, i) => {
            if (key === "") {
              return (
                <div key={i} className="w-full aspect-square flex items-center justify-center">
                  {biometricAvailable && onBiometric && (
                    <button
                      onClick={onBiometric}
                      className="w-full h-full rounded-2xl flex items-center justify-center text-primary active:bg-primary/10 transition-colors"
                    >
                      <Fingerprint className="w-7 h-7" />
                    </button>
                  )}
                </div>
              );
            }

            if (key === "del") {
              return (
                <button
                  key={i}
                  onClick={handleDelete}
                  disabled={locked || pin.length === 0}
                  className="w-full aspect-square rounded-2xl flex items-center justify-center text-muted-foreground active:bg-foreground/5 transition-all disabled:opacity-30"
                >
                  <Delete className="w-6 h-6" />
                </button>
              );
            }

            return (
              <button
                key={i}
                onClick={() => handleDigit(key)}
                disabled={locked}
                className="w-full aspect-square rounded-2xl bg-foreground/[0.04] dark:bg-foreground/[0.06] flex items-center justify-center text-[24px] font-semibold text-foreground transition-all active:scale-90 active:bg-foreground/10 disabled:opacity-30 hover:bg-foreground/[0.07]"
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shake animation style */}
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

export { hashPin, PIN_LENGTH };
export default PinLockScreen;

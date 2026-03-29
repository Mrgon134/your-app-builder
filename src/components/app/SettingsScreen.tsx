import React, { useState } from "react";
import { useLang, LANG_META } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { updateProfile } from "@/lib/api";
import { ArrowLeft, Moon, Sun, Globe, Crown, LogOut, Bell, BellOff, ChevronRight, Fingerprint, KeyRound, AtSign } from "lucide-react";
import {
  requestNotificationPermission,
  getNotificationPermission,
  getReminderSettings,
  scheduleLocalReminder,
  disableReminder,
} from "@/lib/notifications";
import { toast } from "sonner";
import { hasPlusAccess } from "@/lib/trial";

interface SettingsScreenProps {
  onBack: () => void;
  onUpgrade?: () => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onUpgrade, plan = "free", trialStartedAt = null }) => {
  const { t, lang, setLang } = useLang();
  const { signOut, user, resetPassword, updateEmail } = useAuth();
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));
  const reminderDefaults = getReminderSettings();
  const [reminderEnabled, setReminderEnabled] = useState(reminderDefaults.enabled);
  const [reminderHour, setReminderHour] = useState(reminderDefaults.hour);
  const notifSupported = getNotificationPermission() !== "unsupported";
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(() => localStorage.getItem("nuju-biometric") === "1");
  const biometricSupported = typeof window !== "undefined" && window.PublicKeyCredential !== undefined;

  const currentLang = LANG_META.find((l) => l.code === lang);

  const toggleDark = async () => {
    const newVal = !darkMode;
    document.documentElement.classList.toggle("dark", newVal);
    setDarkMode(newVal);
    localStorage.setItem("nuju-dark", newVal ? "1" : "0");
    if (user) {
      try {
        await updateProfile(user.id, { dark_mode: newVal } as any);
      } catch (e) {
        console.error("Failed to save dark mode:", e);
      }
    }
  };

  return (
    <div className="animate-page-slide-in">
      {/* iOS-style large title header */}
      <button onClick={onBack} className="flex items-center gap-1 text-primary mb-5 press-spring">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-[15px] font-medium">{t.back}</span>
      </button>

      <h1 className="text-[34px] font-bold text-foreground tracking-tight mb-6">{t.settings}</h1>

      <div className="space-y-6">
        {/* Appearance group */}
        <div>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
            {t.appearance || "Appearance"}
          </p>
          <div className="ios-group">
            {/* Dark mode */}
            <div className="ios-group-item">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? "bg-indigo-500" : "bg-blue-500"}`}>
                  {darkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
                </div>
                <span className="text-[15px] font-normal text-foreground">{t.dark_mode}</span>
              </div>
              <button
                onClick={toggleDark}
                className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 ${darkMode ? "bg-primary" : "bg-border"}`}
              >
                <div className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200 ${darkMode ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications group */}
        {notifSupported && (
          <div>
            <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
              {t.notifications || "Notifications"}
            </p>
            <div className="ios-group">
              <div className="ios-group-item">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${reminderEnabled ? "bg-red-500" : "bg-gray-400"}`}>
                    {reminderEnabled ? <Bell className="w-4 h-4 text-white" /> : <BellOff className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-[15px] font-normal text-foreground">{t.daily_reminder || "Daily reminder"}</span>
                </div>
                <button
                  onClick={async () => {
                    if (!reminderEnabled) {
                      const granted = await requestNotificationPermission();
                      if (!granted) {
                        toast.error(t.notif_denied || "Notifications blocked. Enable in browser settings.");
                        return;
                      }
                      scheduleLocalReminder(reminderHour);
                      setReminderEnabled(true);
                      toast.success(t.notif_enabled || "Reminder set");
                    } else {
                      disableReminder();
                      setReminderEnabled(false);
                    }
                  }}
                  className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 ${reminderEnabled ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200 ${reminderEnabled ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
                </button>
              </div>
              {reminderEnabled && (
                <div className="ios-group-item">
                  <span className="text-[15px] text-foreground">{t.remind_at || "Remind at"}</span>
                  <select
                    value={reminderHour}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      setReminderHour(h);
                      scheduleLocalReminder(h);
                    }}
                    className="text-[15px] text-primary font-medium bg-transparent border-none outline-none cursor-pointer text-right"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}:00
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Privacy / Biometric lock */}
        {biometricSupported && (
          <div>
            <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
              {t.privacy || "Privacy"}
            </p>
            <div className="ios-group">
              <div className="ios-group-item">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                    <Fingerprint className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px] font-normal text-foreground">{t.biometric_lock || "Biometric lock"}</span>
                </div>
                <button
                  onClick={async () => {
                    if (!biometricEnabled) {
                      try {
                        const cred = await navigator.credentials.create({
                          publicKey: {
                            challenge: crypto.getRandomValues(new Uint8Array(32)),
                            rp: { name: "Nuju" },
                            user: { id: new Uint8Array(16), name: user?.email || "nuju", displayName: "Nuju" },
                            pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                            authenticatorSelection: { userVerification: "required" },
                            timeout: 60000,
                          },
                        });
                        if (cred) {
                          localStorage.setItem("nuju-biometric", "1");
                          setBiometricEnabled(true);
                          toast.success(t.biometric_enabled || "Biometric lock enabled");
                        }
                      } catch (e) {
                        toast.error(t.biometric_failed || "Biometric setup failed");
                      }
                    } else {
                      localStorage.removeItem("nuju-biometric");
                      setBiometricEnabled(false);
                      toast.success(t.biometric_disabled || "Biometric lock disabled");
                    }
                  }}
                  className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 ${biometricEnabled ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200 ${biometricEnabled ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Language group */}
        <div>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
            {t.language}
          </p>
          <div className="ios-group">
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px] font-normal text-foreground">{t.language}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] text-muted-foreground">{currentLang?.flag} {currentLang?.label}</span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-200 ${showLangPicker ? "rotate-90" : ""}`} />
              </div>
            </button>
            {showLangPicker && (
              <div className="px-4 py-2 space-y-0.5">
                {LANG_META.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLangPicker(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[15px] transition-colors ${
                      lang === l.code
                        ? "bg-primary/8 text-primary font-medium"
                        : "text-foreground active:bg-secondary"
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                    {lang === l.code && <span className="text-primary text-sm">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pro upsell — hide if user has plus access */}
        {!hasPlusAccess(plan, trialStartedAt) && (
          <div>
            <div className="ios-group">
              <button
                onClick={onUpgrade}
                className="w-full px-4 py-5 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-3 shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.4)]">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground text-[17px] mb-0.5">{t.unlock_ju}</p>
                <p className="text-[13px] text-muted-foreground mb-3">{t.pro_feature_desc || "Unlimited entries, all coaches, full history"}</p>
                <div className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] transition-all active:scale-[0.97]">
                  {t.start_trial}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Account group */}
        {user && (
          <div>
            <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
              {t.account || "Account"}
            </p>
            <div className="ios-group">
              <div className="ios-group-item">
                <span className="text-[15px] text-foreground">Email</span>
                <span className="text-[15px] text-muted-foreground truncate max-w-[180px]">{user.email}</span>
              </div>

              {/* Change Email */}
              <button
                onClick={() => { setShowChangeEmail(!showChangeEmail); setNewEmail(""); }}
                className="ios-group-item w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <AtSign className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[15px] font-normal text-foreground">{t.change_email || "Change email"}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
              </button>
              {showChangeEmail && (
                <div className="px-4 py-3 border-t border-border/40">
                  <input
                    type="email"
                    placeholder={t.new_email || "New email address"}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 h-[44px] rounded-xl bg-background border border-border/60 text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 mb-2"
                  />
                  <button
                    disabled={emailLoading || !newEmail.includes("@")}
                    onClick={async () => {
                      setEmailLoading(true);
                      const { error } = await updateEmail(newEmail);
                      setEmailLoading(false);
                      if (error) { toast.error(error.message); }
                      else { toast.success(t.change_email_sent || "Confirmation sent to new email!"); setShowChangeEmail(false); setNewEmail(""); }
                    }}
                    className="w-full h-[40px] rounded-xl bg-primary text-primary-foreground text-[14px] font-semibold disabled:opacity-40 transition-all active:scale-[0.97]"
                  >
                    {emailLoading ? "..." : (t.save || t.save_changes || "Save")}
                  </button>
                </div>
              )}

              {/* Change Password */}
              {user.app_metadata?.provider === "email" && (
                <button
                  onClick={async () => {
                    if (!user.email) return;
                    const { error } = await resetPassword(user.email);
                    if (error) toast.error(error.message);
                    else toast.success(t.reset_email_sent || "Password reset link sent to your email!");
                  }}
                  className="ios-group-item w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <KeyRound className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[15px] font-normal text-foreground">{t.change_password || "Change password"}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                </button>
              )}

              {/* Sign out */}
              <button
                onClick={signOut}
                className="ios-group-item w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px] font-normal text-red-500">{t.sign_out || "Sign out"}</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Footer spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default SettingsScreen;
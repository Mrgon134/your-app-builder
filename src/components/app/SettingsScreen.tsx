import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang, LANG_META } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { updateProfile, fetchEntries } from "@/lib/api";
import { ArrowLeft, Moon, Sun, Globe, Crown, LogOut, Bell, BellOff, ChevronRight, Fingerprint, KeyRound, AtSign, Trash2, AlertTriangle, Download, HelpCircle, Mail, Info, FileText, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  requestNotificationPermission,
  getNotificationPermission,
  getReminderSettings,
  scheduleLocalReminder,
  disableReminder,
} from "@/lib/notifications";
import { toast } from "sonner";
import { hasPlusAccess } from "@/lib/trial";
import PinSetupScreen from "@/components/app/PinSetupScreen";
import { hashPin } from "@/components/app/PinLockScreen";

interface SettingsScreenProps {
  onBack: () => void;
  onUpgrade?: () => void;
  plan?: string | null;
  trialStartedAt?: string | null;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onUpgrade, plan = "free", trialStartedAt = null }) => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLang();
  const { signOut, user, resetPassword, updateEmail } = useAuth();
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const reminderDefaults = getReminderSettings();
  const [reminderEnabled, setReminderEnabled] = useState(reminderDefaults.enabled);
  const [reminderHour, setReminderHour] = useState(reminderDefaults.hour);
  const notifSupported = getNotificationPermission() !== "unsupported";
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(() => localStorage.getItem("nuju-biometric") === "1");
  const biometricSupported = typeof window !== "undefined" && window.PublicKeyCredential !== undefined;
  const [pinEnabled, setPinEnabled] = useState(() => !!localStorage.getItem("nuju-pin-hash"));
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [showPinChange, setShowPinChange] = useState(false);
  const [showPinDisable, setShowPinDisable] = useState(false);
  const [disablePin, setDisablePin] = useState("");
  const [exporting, setExporting] = useState(false);

  const currentLang = LANG_META.find((l) => l.code === lang);

  const handleSignOut = async () => {
    // Clear PIN hash before signing out (security: prevent PIN lock after logout)
    localStorage.removeItem("nuju-pin-hash");
    localStorage.removeItem("nuju-biometric");
    await signOut();
  };

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

  const handleExportData = async () => {
    if (!user || exporting) return;
    setExporting(true);
    try {
      const allEntries = await fetchEntries(user.id);
      
      let textContent = `Nuju Journal Export\nExport Date: ${new Date().toLocaleDateString()}\nTotal Entries: ${allEntries.length}\n\n`;
      
      allEntries.forEach((entry) => {
        textContent += `=========================================\n`;
        textContent += `Date: ${new Date(entry.entry_date).toLocaleDateString()}\n`;
        textContent += `Mood: ${entry.mood}/5`;
        if (entry.energy) textContent += ` | Energy: ${entry.energy}`;
        if (entry.audio_url) textContent += ` | (Contains Voice Audio in App)`;
        textContent += `\n-----------------------------------------\n`;
        textContent += `${entry.text || "(No text)"}\n`;
        
        if (entry.ai_summary) {
          textContent += `\n-- AI Insight --\n${entry.ai_summary}\n`;
        }
        textContent += `=========================================\n\n`;
      });

      const dataUri = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);
      
      const exportFileDefaultName = `nuju-export-${new Date().toISOString().split('T')[0]}.txt`;
      
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      
      toast.success("Data export downloaded successfully");
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Failed to export data");
    } finally {
      setExporting(false);
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

        {/* Privacy / PIN & Biometric lock */}
        <div>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
            {t.privacy || "Privacy"}
          </p>
          <div className="ios-group">
            {/* PIN Lock */}
            <div className="ios-group-item">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-white" />
                </div>
                <span className="text-[15px] font-normal text-foreground">{t.pin_lock || "PIN lock"}</span>
              </div>
              <button
                onClick={() => {
                  if (!pinEnabled) {
                    setShowPinSetup(true);
                  } else {
                    setShowPinDisable(true);
                  }
                }}
                className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 ${pinEnabled ? "bg-primary" : "bg-border"}`}
              >
                <div className={`absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200 ${pinEnabled ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
              </button>
            </div>

            {/* Change PIN — visible only when PIN is enabled */}
            {pinEnabled && (
              <button
                onClick={() => setShowPinChange(true)}
                className="ios-group-item w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/10 flex items-center justify-center">
                    <KeyRound className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-[15px] font-normal text-foreground">{t.change_pin || "Change PIN"}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
              </button>
            )}

            {/* Biometric Lock */}
            {biometricSupported && (
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
            )}

            {/* Export All Data */}
            <button
              onClick={handleExportData}
              disabled={exporting}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Download className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">
                  {exporting ? (t.exporting || "Exporting...") : (t.export_all_data || "Export all my data")}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
          </div>
        </div>

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

        {/* Help & Legal group */}
        <div>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider px-4 mb-1.5">
            Help & Legal
          </p>
          <div className="ios-group">
            <button
              onClick={() => navigate("/support")}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">Support & FAQ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">Contact Us</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
            <button
              onClick={() => navigate("/medical-disclaimer")}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">Medical Disclaimer</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
            <button
              onClick={() => navigate("/about")}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Info className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">About Nuju</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
            <button
              onClick={() => navigate("/privacy")}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-indigo-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="ios-group-item w-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-[15px] font-normal text-foreground">Terms of Service</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
            </button>
          </div>
        </div>

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
                onClick={handleSignOut}
                className="ios-group-item w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[15px] font-normal text-muted-foreground">{t.sign_out || "Sign out"}</span>
                </div>
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="ios-group-item w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-[15px] font-normal text-red-500">{t.delete_account || "Delete account"}</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Footer spacing */}
        <div className="h-8" />
      </div>

      {/* Account Deletion Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-6 animate-fade-in" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-[320px] shadow-2xl border border-border/50 text-center animate-spring-in" onClick={e => e.stopPropagation()}>
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t.delete_account || "Delete Account?"}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t.delete_account_desc || "This will permanently delete your profile, all journal entries, and settings. This action cannot be undone."}
            </p>
            <div className="space-y-2.5">
              <button
                disabled={deleteLoading}
                onClick={async () => {
                  setDeleteLoading(true);
                  try {
                    const { error } = await supabase.rpc("delete_user" as any);
                    // Ignore fail and sign out if it's a test/mock environment
                    if (error) {
                      toast.error("Contact support to complete account deletion.");
                      console.error(error);
                    } else {
                      await handleSignOut();
                    }
                  } catch (e: any) {
                    toast.error("Contact support to complete account deletion.");
                  } finally {
                    setDeleteLoading(false);
                    setShowDeleteConfirm(false);
                  }
                }}
                className="w-full h-12 rounded-xl bg-red-500 text-white font-semibold text-[15px] transition-transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteLoading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white/50" /> : (t.confirm_delete || "Yes, delete my account")}
              </button>
              <button
                disabled={deleteLoading}
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full h-12 rounded-xl bg-muted text-foreground font-semibold text-[15px] transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                {t.cancel || "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIN Setup Modal */}
      {showPinSetup && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in">
          <PinSetupScreen
            onComplete={() => {
              setShowPinSetup(false);
              setPinEnabled(true);
            }}
            onSkip={() => setShowPinSetup(false)}
          />
        </div>
      )}

      {/* Change PIN Modal */}
      {showPinChange && (
        <div className="fixed inset-0 z-50 bg-background animate-fade-in">
          <PinSetupScreen
            requireOldPin
            onComplete={() => {
              setShowPinChange(false);
              toast.success(t.pin_changed || "PIN changed successfully");
            }}
            onSkip={() => setShowPinChange(false)}
          />
        </div>
      )}

      {/* Disable PIN Confirmation Modal */}
      {showPinDisable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-6 animate-fade-in" onClick={() => { setShowPinDisable(false); setDisablePin(""); }}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-[320px] shadow-2xl border border-border/50 text-center animate-spring-in" onClick={e => e.stopPropagation()}>
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t.disable_pin || "Disable PIN?"}</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {t.disable_pin_desc || "Enter your current PIN to remove it."}
            </p>
            <div className="flex justify-center gap-3 mb-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full transition-all duration-200"
                  style={{
                    background: i < disablePin.length ? "hsl(var(--primary))" : "hsl(var(--foreground)/0.12)",
                    transform: i < disablePin.length ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 max-w-[200px] mx-auto">
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((key, i) => {
                if (key === "") return <div key={i} />;
                if (key === "⌫") return (
                  <button key={i} onClick={() => setDisablePin(p => p.slice(0, -1))} className="py-2.5 rounded-xl text-muted-foreground text-lg active:bg-foreground/5">⌫</button>
                );
                return (
                  <button
                    key={i}
                    onClick={async () => {
                      const newPin = disablePin + key;
                      setDisablePin(newPin);
                      if (newPin.length === 4) {
                        const storedHash = localStorage.getItem("nuju-pin-hash");
                        const inputHash = await hashPin(newPin);
                        if (inputHash === storedHash) {
                          localStorage.removeItem("nuju-pin-hash");
                          setPinEnabled(false);
                          setShowPinDisable(false);
                          setDisablePin("");
                          toast.success(t.pin_disabled || "PIN lock disabled");
                        } else {
                          toast.error(t.pin_wrong || "Wrong PIN");
                          setDisablePin("");
                        }
                      }
                    }}
                    className="py-2.5 rounded-xl bg-foreground/[0.04] text-foreground font-semibold text-lg active:scale-90 transition-transform"
                  >
                    {key}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => { setShowPinDisable(false); setDisablePin(""); }}
              className="text-sm text-muted-foreground font-medium"
            >
              {t.cancel || "Cancel"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
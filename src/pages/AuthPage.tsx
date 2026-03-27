import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { JU_STICKERS } from "@/lib/stickers";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

/** Apple SVG logo */
const AppleLogo: React.FC = () => (
  <svg width="17" height="20" viewBox="0 0 17 20" fill="currentColor">
    <path d="M13.769 10.271c-.022-2.298 1.878-3.411 1.963-3.465-1.071-1.565-2.735-1.778-3.323-1.8-1.408-.143-2.762.833-3.478.833-.727 0-1.838-.815-3.023-.792-1.547.023-2.982.901-3.776 2.277-1.617 2.803-.413 6.943 1.16 9.215.774 1.116 1.694 2.364 2.901 2.319 1.166-.046 1.607-.75 3.016-.75 1.397 0 1.8.75 3.022.725 1.254-.022 2.048-1.133 2.815-2.255a12.14 12.14 0 0 0 1.282-2.605c-.031-.013-2.449-.938-2.56-3.702ZM11.477 3.365C12.11 2.59 12.54 1.527 12.42.447c-.906.038-2.01.605-2.663 1.364-.583.67-1.097 1.749-.96 2.779 1.015.078 2.051-.512 2.68-1.225Z"/>
  </svg>
);

const AuthPage: React.FC = () => {
  const { t } = useLang();
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const callbackUrl = window.location.origin + "/auth/callback";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password, name);
      if (error) setError(error.message);
      else setSuccess(t.check_email || "Check your email to confirm your account!");
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
        queryParams: { access_type: "offline", prompt: "select_account" },
      },
    });
    if (error) {
      setError(error.message || "Google sign-in failed");
      setGoogleLoading(false);
    }
    // if no error, browser redirects — no need to setLoading(false)
  };

  const handleAppleLogin = async () => {
    setAppleLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: callbackUrl },
    });
    if (error) {
      setError(error.message || "Apple sign-in failed");
      setAppleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[340px]">
        {/* Mascot */}
        <div className="flex justify-center mb-6">
          <img src={JU_STICKERS.hi} alt="Ju" className="w-20 h-20 animate-ju-float" />
        </div>

        <h1 className="text-[28px] font-bold text-foreground text-center tracking-tight mb-1">
          {mode === "login" ? (t.welcome_back || "Welcome back") : (t.create_account || "Create account")}
        </h1>
        <p className="text-[15px] text-muted-foreground text-center mb-8">
          {mode === "login"
            ? (t.login_desc || "Sign in to continue your journal")
            : (t.signup_desc_auth || "Start your journaling journey with Ju")}
        </p>

        {/* Social login buttons */}
        <div className="space-y-3 mb-4">
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || appleLoading}
            className="w-full flex items-center justify-center gap-3 h-[52px] rounded-xl bg-card border border-border/60 text-foreground text-[15px] font-medium transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] active:scale-[0.98] disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Apple */}
          <button
            onClick={handleAppleLogin}
            disabled={googleLoading || appleLoading}
            className="w-full flex items-center justify-center gap-3 h-[52px] rounded-xl bg-foreground text-background text-[15px] font-medium transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {appleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <AppleLogo />
                Continue with Apple
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[13px] text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/60" />
              <input
                type="text"
                placeholder={t.your_name || "Your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 h-[52px] rounded-xl bg-card border border-border/60 text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/60" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-11 pr-4 h-[52px] rounded-xl bg-card border border-border/60 text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-muted-foreground/60" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-11 pr-4 h-[52px] rounded-xl bg-card border border-border/60 text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          {error && (
            <p className="text-[13px] text-destructive bg-destructive/8 rounded-xl px-4 py-3">{error}</p>
          )}
          {success && (
            <p className="text-[13px] text-primary bg-primary/8 rounded-xl px-4 py-3">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 h-[52px] rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {mode === "login" ? (t.sign_in || "Sign in") : (t.sign_up || "Sign up")}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
          className="w-full mt-6 text-[15px] text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          {mode === "login"
            ? (t.no_account || "Don't have an account? Sign up")
            : (t.has_account || "Already have an account? Sign in")}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;

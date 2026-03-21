import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { JU_STICKERS } from "@/lib/stickers";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

const AuthPage: React.FC = () => {
  const { t } = useLang();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(t.check_email || "Check your email to confirm your account!");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <img
        src={JU_STICKERS.hello}
        alt="Ju"
        className="w-20 h-20 mb-4 animate-[ju-float_3s_ease-in-out_infinite]"
      />
      <h1 className="font-serif text-2xl font-bold text-foreground mb-1">
        {mode === "login" ? (t.welcome_back || "Welcome back!") : (t.create_account || "Create account")}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        {mode === "login"
          ? (t.login_desc || "Sign in to continue your journal")
          : (t.signup_desc_auth || "Start your journaling journey with Ju")}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
        {mode === "signup" && (
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.your_name || "Your name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {error && (
          <p className="text-xs text-destructive bg-destructive/10 rounded-xl px-4 py-2.5">{error}</p>
        )}
        {success && (
          <p className="text-xs text-primary bg-primary/10 rounded-xl px-4 py-2.5">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97] disabled:opacity-50"
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
        className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {mode === "login"
          ? (t.no_account || "Don't have an account? Sign up")
          : (t.has_account || "Already have an account? Sign in")}
      </button>
    </div>
  );
};

export default AuthPage;

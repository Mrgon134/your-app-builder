import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

/**
 * Handles OAuth redirects (Google, Apple).
 * Supabase PKCE flow redirects here with ?code=xxx after OAuth.
 * We exchange the code for a session, then redirect to /app.
 */
const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const exchange = async () => {
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.slice(1));

      // Handle PKCE code exchange
      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("Auth callback error:", error.message);
          navigate("/auth?error=" + encodeURIComponent(error.message), { replace: true });
          return;
        }
      }

      // Handle implicit flow (access_token in hash)
      const accessToken = hashParams.get("access_token");
      if (accessToken) {
        const refreshToken = hashParams.get("refresh_token") || "";
        await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      }

      // Check final session state
      const { data: { session } } = await supabase.auth.getSession();
      navigate(session ? "/app" : "/auth", { replace: true });
    };

    exchange();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-[15px] text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

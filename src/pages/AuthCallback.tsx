import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { peekAuthIntent } from "@/lib/auth-intent";
import { ROUTES } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";

/**
 * Handles OAuth redirects (Google, Apple) and email confirmation links.
 * Supabase PKCE flow redirects here with ?code=xxx.
 * We exchange the code, then redirect to /app (or /auth?mode=reset for password recovery).
 */
const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let settled = false;
    const getPostAuthPath = () => peekAuthIntent()?.resumePath || ROUTES.APP;

    // Listen to auth state change — catches PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (settled) return;
      if (event === "PASSWORD_RECOVERY") {
        settled = true;
        navigate(`${ROUTES.AUTH}?mode=reset`, { replace: true });
      } else if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session) {
        settled = true;
        navigate(getPostAuthPath(), { replace: true });
      }
    });

    const exchange = async () => {
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.slice(1));

      // Handle PKCE code exchange
      const code = params.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("Auth callback error:", error.message);
          if (!settled) {
            settled = true;
            navigate(`${ROUTES.AUTH}?error=` + encodeURIComponent(error.message), { replace: true });
          }
          return;
        }
        // onAuthStateChange will fire and handle the redirect
        return;
      }

      // Handle implicit flow (access_token in hash)
      const accessToken = hashParams.get("access_token");
      if (accessToken) {
        const refreshToken = hashParams.get("refresh_token") || "";
        const type = hashParams.get("type");
        await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        if (type === "recovery" && !settled) {
          settled = true;
          navigate(`${ROUTES.AUTH}?mode=reset`, { replace: true });
          return;
        }
        // onAuthStateChange handles the rest
        return;
      }

      // No code or token — check existing session
      if (!settled) {
        const { data: { session } } = await supabase.auth.getSession();
        settled = true;
        navigate(session ? getPostAuthPath() : ROUTES.AUTH, { replace: true });
      }
    };

    exchange();

    // Fallback timeout in case events don't fire
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        supabase.auth.getSession().then(({ data: { session } }) => {
          navigate(session ? getPostAuthPath() : ROUTES.AUTH, { replace: true });
        });
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <>
      <SEOHead
        title="Signing In..."
        description="Signing you into your Nuju account."
        noindex
      />
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-[15px] text-muted-foreground">Signing you in...</p>
        </div>
      </div>
    </>
  );
};

export default AuthCallback;

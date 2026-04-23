import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, LogOut, Mail, ShieldCheck } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/lib/auth";
import { saveAuthIntent } from "@/lib/auth-intent";
import { claimCheckoutIntent, fetchCheckoutStatus, isCheckoutFlowError } from "@/lib/checkout-flow";
import { ROUTES } from "@/lib/routes";
import juMain from "@/assets/ju-main.webp";

type FlowStatus = "loading" | "ready" | "claiming" | "error";

const CheckoutComplete: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, session, loading: authLoading, signOut } = useAuth();
  const [screenState, setScreenState] = useState<FlowStatus>("loading");
  const [error, setError] = useState("");
  const [statusPayload, setStatusPayload] = useState<Awaited<ReturnType<typeof fetchCheckoutStatus>> | null>(null);
  const [statusFallbackActive, setStatusFallbackActive] = useState(false);
  const claimStartedRef = useRef(false);

  const intentId = searchParams.get("intent_id") || "";
  const dodoStatus = searchParams.get("status");
  const paymentId = searchParams.get("payment_id");
  const subscriptionId = searchParams.get("subscription_id");
  const returnEmail = searchParams.get("email");
  const normalizedDodoStatus = (dodoStatus || "").trim().toLowerCase();
  const isFailedReturn = ["failed", "cancelled", "canceled"].includes(normalizedDodoStatus);
  const hasSuccessfulReturnSignal = !isFailedReturn && Boolean(
    paymentId ||
    subscriptionId ||
    returnEmail ||
    ["succeeded", "success", "paid", "completed"].includes(normalizedDodoStatus)
  );

  const checkoutEmail = (statusPayload?.email || returnEmail || "").trim().toLowerCase();
  const currentEmail = user?.email?.trim().toLowerCase() || "";
  const emailMismatch = Boolean(user && checkoutEmail && currentEmail && checkoutEmail !== currentEmail);
  const firstName = statusPayload?.name?.trim() || "";

  const heading = useMemo(() => {
    if (statusPayload?.status === "paid" || statusPayload?.status === "claimed") {
      return firstName
        ? `${firstName}, your payment is through. Now let's open Ju for you.`
        : "Payment received. Now let's open Ju for you.";
    }
    if (statusPayload?.status === "failed") {
      return "This checkout was not completed.";
    }
    if (statusFallbackActive) {
      return user
        ? "Let's attach your plan to your Nuju account."
        : "Your payment came through. Let's finish opening Ju.";
    }
    if (isFailedReturn) {
      return "This checkout was not completed.";
    }
    return "Checking your payment...";
  }, [firstName, isFailedReturn, statusFallbackActive, statusPayload?.status, user]);

  const attemptClaim = useCallback(async () => {
    if (!session?.access_token || claimStartedRef.current) return;

    claimStartedRef.current = true;
    setScreenState("claiming");
    setError("");

    try {
      await claimCheckoutIntent(intentId, session.access_token);
      navigate(ROUTES.APP, { replace: true });
    } catch (nextError) {
      claimStartedRef.current = false;

      if (isCheckoutFlowError(nextError) && nextError.statusCode === 409) {
        setScreenState("ready");
        setError(nextError.message);
        return;
      }

      setScreenState("error");
      setError(nextError instanceof Error ? nextError.message : "Could not unlock your plan.");
    }
  }, [intentId, navigate, session?.access_token]);

  useEffect(() => {
    if (!intentId) {
      setScreenState("error");
      setError("This checkout return link is missing its purchase reference.");
      return;
    }

    let cancelled = false;
    let timer: number | null = null;

    const loadStatus = async () => {
      try {
        setStatusFallbackActive(false);
        const payload = await fetchCheckoutStatus({
          intentId,
          status: dodoStatus,
          paymentId,
          subscriptionId,
          email: returnEmail,
        });

        if (cancelled) return;
        setStatusPayload(payload);
        setScreenState("ready");

        if (payload.status === "initiated" || payload.status === "processing") {
          timer = window.setTimeout(loadStatus, 2500);
        }
      } catch (nextError) {
        if (cancelled) return;

        if (isCheckoutFlowError(nextError) && nextError.statusCode === 404 && hasSuccessfulReturnSignal) {
          setStatusFallbackActive(true);
          setScreenState("ready");
          setError(
            checkoutEmail
              ? `We could not live-check Dodo just now. Continue with ${checkoutEmail} and Nuju will attach your plan as soon as payment syncs.`
              : "We could not live-check Dodo just now. Continue with the same email you used at checkout and Nuju will attach your plan as soon as payment syncs."
          );
          return;
        }

        setScreenState("error");
        setError(nextError instanceof Error ? nextError.message : "Could not verify your payment.");
      }
    };

    void loadStatus();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [checkoutEmail, dodoStatus, hasSuccessfulReturnSignal, intentId, paymentId, returnEmail, subscriptionId]);

  useEffect(() => {
    const canClaimFromConfirmedStatus = Boolean(statusPayload && ["paid", "claimed"].includes(statusPayload.status));
    const canClaimFromFallback = statusFallbackActive && hasSuccessfulReturnSignal;

    if (
      authLoading ||
      !user ||
      !session?.access_token ||
      emailMismatch ||
      claimStartedRef.current ||
      (!canClaimFromConfirmedStatus && !canClaimFromFallback)
    ) {
      return;
    }

    void attemptClaim();
  }, [attemptClaim, authLoading, emailMismatch, hasSuccessfulReturnSignal, session?.access_token, statusFallbackActive, statusPayload, user]);

  const continueToAuth = (mode: "signup" | "login") => {
    const authEmail = checkoutEmail;
    const authName = statusPayload?.name?.trim() || "";

    saveAuthIntent({
      source: "onboarding",
      resumePath: `${ROUTES.CHECKOUT_COMPLETE}?intent_id=${encodeURIComponent(intentId)}`,
      checkoutIntentId: intentId,
      checkoutEmail: authEmail || undefined,
      checkoutName: authName || undefined,
      plan: statusPayload?.plan,
    });

    navigate(`${ROUTES.AUTH}?mode=${mode}`);
  };

  const showAuthCtas = !user && (
    (Boolean(statusPayload) && ["paid", "claimed"].includes(statusPayload.status)) ||
    statusFallbackActive
  );
  const showClaimButton = Boolean(
    user &&
    session?.access_token &&
    !emailMismatch &&
    screenState !== "claiming" &&
    ((statusPayload && ["paid", "claimed"].includes(statusPayload.status)) || (statusFallbackActive && hasSuccessfulReturnSignal))
  );

  return (
    <>
      <SEOHead
        title="Complete Your Nuju Access"
        description="Finish setting up your Nuju access after payment."
        noindex
      />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,110,219,0.16),_transparent_38%),linear-gradient(180deg,#f8f6ff_0%,#ffffff_46%,#f6f4ff_100%)] px-4 py-8 dark:bg-background">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center">
          <div className="w-full rounded-[2rem] border border-border/60 bg-card/95 p-6 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-inner">
              <img src={juMain} alt="Ju" className="h-11 w-11 object-contain" />
            </div>

            <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">Checkout complete</p>
            <h1 className="mt-3 text-center font-serif text-4xl font-bold leading-tight text-foreground">{heading}</h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-base leading-8 text-muted-foreground">
              {screenState === "loading" || statusPayload?.status === "initiated" || statusPayload?.status === "processing"
                ? "Dodo is confirming your payment now. This usually takes a moment."
                : statusPayload?.status === "failed"
                  ? "You can go back to the paywall and choose the plan again when you're ready."
                  : statusFallbackActive
                    ? "Nuju could not live-check Dodo right now, but you can keep going with the same email you used at checkout and we will attach the plan as soon as payment syncs."
                  : firstName
                    ? `Keep going with the same email you used to pay, ${firstName}, so Nuju can attach the right plan to you.`
                    : "Use the same email you paid with so Nuju can attach your plan to the right account."}
            </p>

            {checkoutEmail ? (
              <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/6 px-4 py-4">
                <div className="flex items-center gap-3 text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">
                    Checkout email: <span className="font-semibold">{checkoutEmail}</span>
                  </p>
                </div>
              </div>
            ) : null}

            {emailMismatch ? (
              <div className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm leading-7 text-destructive">
                This payment belongs to <span className="font-semibold">{statusPayload?.email}</span>. Sign out, then continue with that email to claim it.
              </div>
            ) : null}

            {error ? (
              <div className="mt-5 rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-4 text-sm leading-7 text-destructive">
                {error}
              </div>
            ) : null}

            {screenState === "loading" || statusPayload?.status === "initiated" || statusPayload?.status === "processing" ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-[1.7rem] border border-border/60 bg-background px-5 py-10 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Waiting for payment confirmation from Dodo...</p>
              </div>
            ) : null}

            {screenState === "claiming" ? (
              <div className="mt-8 flex flex-col items-center gap-4 rounded-[1.7rem] border border-primary/18 bg-primary/6 px-5 py-10 text-center">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <p className="text-sm text-foreground">Attaching your paid plan to your Nuju account...</p>
              </div>
            ) : null}

            {showAuthCtas ? (
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => continueToAuth("signup")}
                  className="w-full rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98]"
                >
                  Create my account
                </button>
                <button
                  onClick={() => continueToAuth("login")}
                  className="w-full rounded-2xl border border-border/70 bg-[#E9E4F6] px-5 py-4 text-sm font-semibold text-[#2E2550] transition-all active:scale-[0.98]"
                >
                  I already have an account
                </button>
                <p className="text-center text-xs leading-6 text-muted-foreground">
                  {checkoutEmail
                    ? <>You will continue with <span className="font-semibold">{checkoutEmail}</span>.</>
                    : "Continue with the same email you used at checkout."}
                </p>
              </div>
            ) : null}

            {showClaimButton ? (
              <div className="mt-6">
                <button
                  onClick={() => void attemptClaim()}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-border/70 bg-background px-5 py-4 text-sm font-semibold text-foreground transition-all active:scale-[0.98]"
                >
                  Try unlocking my plan again
                </button>
              </div>
            ) : null}

            {statusPayload?.status === "failed" ? (
              <div className="mt-8">
                <Link
                  to={ROUTES.ONBOARDING}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98]"
                >
                  Back to plans
                </Link>
              </div>
            ) : null}

            {emailMismatch ? (
              <div className="mt-6">
                <button
                  onClick={() => void signOut()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border/70 bg-background px-5 py-4 text-sm font-semibold text-foreground transition-all active:scale-[0.98]"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out and continue with the checkout email
                </button>
              </div>
            ) : null}

            {!statusPayload && screenState === "error" && !statusFallbackActive ? (
              <div className="mt-8">
                <Link
                  to={ROUTES.ONBOARDING}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98]"
                >
                  Back to onboarding
                </Link>
              </div>
            ) : null}

            <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
              Keep using the same email from checkout so Nuju can unlock the right plan without delay.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutComplete;

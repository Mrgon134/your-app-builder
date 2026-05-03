import { supabase, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { ROUTES } from "@/lib/routes";

export interface CheckoutStatusPayload {
  intentId: string;
  status: "initiated" | "processing" | "paid" | "claimed" | "failed" | "expired";
  email: string;
  name: string | null;
  plan: "weekly" | "three_month" | "yearly" | "lifetime_one_time";
  paymentId: string | null;
  subscriptionId: string | null;
  checkoutSessionId: string | null;
  claimedUserId: string | null;
}

export class CheckoutFlowError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "CheckoutFlowError";
    this.statusCode = statusCode;
  }
}

export const isCheckoutFlowError = (value: unknown): value is CheckoutFlowError =>
  value instanceof CheckoutFlowError;

const jsonHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

const buildCheckoutFlowError = async (response: Response, fallbackMessage: string) => {
  const payload = await response.json().catch(() => null) as { error?: unknown } | null;
  const message = typeof payload?.error === "string" && payload.error.trim()
    ? payload.error.trim()
    : fallbackMessage;

  return new CheckoutFlowError(message, response.status);
};

export const buildCheckoutCompletePath = (intentId: string) =>
  `${ROUTES.CHECKOUT_COMPLETE}?intent_id=${encodeURIComponent(intentId)}`;

export const fetchCheckoutStatus = async ({
  intentId,
  status,
  paymentId,
  subscriptionId,
  email,
}: {
  intentId: string;
  status?: string | null;
  paymentId?: string | null;
  subscriptionId?: string | null;
  email?: string | null;
}) => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/checkout-status`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({
      intentId,
      status: status || null,
      paymentId: paymentId || null,
      subscriptionId: subscriptionId || null,
      email: email || null,
    }),
  });

  if (!response.ok) {
    throw await buildCheckoutFlowError(response, "Could not verify checkout status.");
  }

  return (await response.json()) as CheckoutStatusPayload;
};

export const claimCheckoutIntent = async (intentId: string, accessToken: string) => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/checkout-claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ intentId }),
  });

  if (!response.ok) {
    throw await buildCheckoutFlowError(response, "Could not claim purchase.");
  }

  return (await response.json()) as { claimed: boolean; plan: string | null };
};

export const claimPendingCheckoutForCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;

  if (!accessToken) {
    return { claimed: false, reason: "missing_session" } as const;
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/checkout-claim-pending`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw await buildCheckoutFlowError(response, "Could not claim pending purchase.");
  }

  return (await response.json()) as {
    claimed: boolean;
    reason?: string;
    intentId?: string;
    plan?: string;
  };
};

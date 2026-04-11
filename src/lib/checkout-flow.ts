import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { ROUTES } from "@/lib/routes";

export interface CheckoutStatusPayload {
  intentId: string;
  status: "initiated" | "processing" | "paid" | "claimed" | "failed" | "expired";
  email: string;
  name: string | null;
  plan: "weekly" | "yearly" | "lifetime_one_time";
  paymentId: string | null;
  subscriptionId: string | null;
  checkoutSessionId: string | null;
  claimedUserId: string | null;
}

const jsonHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
    throw new Error("Could not verify checkout status.");
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
    const payload = await response.json().catch(() => ({ error: "Could not claim purchase." }));
    throw new Error(typeof payload?.error === "string" ? payload.error : "Could not claim purchase.");
  }

  return (await response.json()) as { claimed: boolean; plan: string | null };
};

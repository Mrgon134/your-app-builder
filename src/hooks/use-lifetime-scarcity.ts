import { useEffect, useState } from "react";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { deriveLifetimeScarcity, getFallbackLifetimeScarcity, type LifetimeScarcitySnapshot } from "@/lib/lifetime-scarcity";

interface LifetimeOfferResponse {
  actual_count?: number;
}

interface LifetimeScarcityState {
  isLive: boolean;
  isLoading: boolean;
  snapshot: LifetimeScarcitySnapshot;
}

const FALLBACK_STATE: LifetimeScarcityState = {
  isLive: false,
  isLoading: true,
  snapshot: getFallbackLifetimeScarcity(),
};

export const useLifetimeScarcity = () => {
  const [state, setState] = useState<LifetimeScarcityState>(FALLBACK_STATE);

  useEffect(() => {
    let cancelled = false;

    const fetchScarcity = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_lifetime_offer_status`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error(`RPC failed with status ${response.status}`);
        }

        const payload = (await response.json()) as LifetimeOfferResponse;
        const actualCount = Number(payload?.actual_count);

        if (!Number.isFinite(actualCount)) {
          throw new Error("Missing actual_count");
        }

        if (!cancelled) {
          setState({
            isLive: true,
            isLoading: false,
            snapshot: deriveLifetimeScarcity(actualCount),
          });
        }
      } catch {
        if (!cancelled) {
          setState((current) => ({
            ...current,
            isLoading: false,
          }));
        }
      }
    };

    void fetchScarcity();
    const interval = window.setInterval(fetchScarcity, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return state;
};

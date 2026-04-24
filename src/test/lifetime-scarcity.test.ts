import { describe, expect, it } from "vitest";

import { deriveLifetimeScarcity, getFallbackLifetimeScarcity } from "@/lib/lifetime-scarcity";

describe("lifetime scarcity", () => {
  it("starts each scarcity batch at 10 claimed", () => {
    expect(deriveLifetimeScarcity(0)).toMatchObject({
      actualCount: 0,
      batch: 1,
      claimed: 10,
      remaining: 15,
      total: 25,
      urgency: "calm",
    });
  });

  it("increments claimed spots for paid lifetime purchases", () => {
    expect(deriveLifetimeScarcity(1)).toMatchObject({
      actualCount: 1,
      batch: 1,
      claimed: 11,
      remaining: 14,
    });
  });

  it("reaches 25 claimed at the end of a batch", () => {
    expect(deriveLifetimeScarcity(15)).toMatchObject({
      actualCount: 15,
      batch: 1,
      claimed: 25,
      remaining: 0,
      urgency: "hot",
    });
  });

  it("resets back to 10 claimed after a full batch sells through", () => {
    expect(deriveLifetimeScarcity(16)).toMatchObject({
      actualCount: 16,
      batch: 2,
      claimed: 10,
      remaining: 15,
    });
  });

  it("keeps the legacy fallback inside the public 10 to 25 range", () => {
    const fallback = getFallbackLifetimeScarcity();

    expect(fallback.claimed).toBeGreaterThanOrEqual(10);
    expect(fallback.claimed).toBeLessThanOrEqual(25);
    expect(fallback.remaining).toBe(25 - fallback.claimed);
  });
});

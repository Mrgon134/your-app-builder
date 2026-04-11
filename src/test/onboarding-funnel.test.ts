import { describe, expect, it } from "vitest";

import { buildResultTeaser, createDefaultFunnelState } from "@/lib/onboarding-funnel";

describe("onboarding funnel helpers", () => {
  it("creates a default funnel state for the given source", () => {
    const state = createDefaultFunnelState("ad-campaign");

    expect(state.step).toBe(0);
    expect(state.answers.source).toBe("ad-campaign");
    expect(state.answers.selectedPlan).toBeNull();
  });

  it("builds a personalized result teaser from the captured answers", () => {
    const teaser = buildResultTeaser({
      source: "landing",
      goal: "clarity",
      struggles: ["overthinking", "privacy"],
      consistency: "rarely",
      focus: "patterns",
      style: "guided",
      resonance: ["If an app could help me feel seen and also show me my patterns, I would actually use it."],
      name: "Irfan",
      email: "irfan@example.com",
      authCaptured: true,
      baseline: "holding",
      selectedPlan: "yearly",
    });

    expect(teaser.title).toContain("Irfan");
    expect(teaser.profileLabel).toBe("Pattern-finding clarity");
    expect(teaser.profileSummary).toContain("Overthinking");
    expect(teaser.firstWeekSteps).toHaveLength(3);
    expect(teaser.firstWeekSteps.join(" ")).toContain("Track repeating moods");
  });
});

import { describe, expect, it } from "vitest";

import { buildResultTeaser, createDefaultFunnelState } from "@/lib/onboarding-funnel";

describe("onboarding funnel helpers", () => {
  it("creates a default funnel state for the given source", () => {
    const state = createDefaultFunnelState("ad-campaign");

    expect(state.step).toBe(0);
    expect(state.sessionId).toBeTruthy();
    expect(state.answers.source).toBe("ad-campaign");
    expect(state.answers.selectedPlan).toBeNull();
  });

  it("builds a more personal fallback teaser from the captured answers", () => {
    const teaser = buildResultTeaser({
      source: "landing",
      goal: "unseen",
      struggles: ["overthinking", "privacy"],
      consistency: "often",
      hardestMoment: "late_night",
      blocker: "words",
      focus: "show_pattern",
      name: "Irfan",
      email: "irfan@example.com",
      authCaptured: true,
      unseenWish: "help_me_name_it",
      cost: "sleep",
      style: "guided",
      resonance: [
        "Sometimes I do not need advice first. I need to feel like something truly understands what is happening inside me.",
      ],
      baseline: "holding",
      relief: "clearer",
      selectedPlan: "yearly",
    });

    expect(teaser.headline).toContain("Irfan");
    expect(teaser.stateLabel).toBe("Wanting to feel understood");
    expect(teaser.whyItFits).toContain("quiet moments");
    expect(teaser.firstSupportMove).toContain("pattern");
    expect(teaser.supportSignals).toHaveLength(3);
    expect(teaser.continuationLine).toContain("Irfan");
  });
});

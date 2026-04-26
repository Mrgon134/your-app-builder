import { describe, expect, it } from "vitest";

import { hasActivePremiumPlan, hasProAccess, hasPlusAccess } from "@/lib/trial";

describe("trial access helpers", () => {
  it("treats web lifetime plan aliases as paid access", () => {
    expect(hasActivePremiumPlan("lifetime")).toBe(true);
    expect(hasActivePremiumPlan("lifetime_one_time")).toBe(true);
    expect(hasPlusAccess("lifetime_one_time", null)).toBe(true);
    expect(hasProAccess("lifetime_one_time", null)).toBe(true);
  });
});

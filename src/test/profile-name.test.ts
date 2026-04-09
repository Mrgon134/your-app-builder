import { describe, expect, it } from "vitest";

import { getFirstName, resolveDisplayName } from "@/lib/profile-name";

describe("profile name helpers", () => {
  it("prefers the saved profile display name", () => {
    const displayName = resolveDisplayName(
      { display_name: "  Irfan Putra  " },
      { user_metadata: { full_name: "Someone Else" } } as never,
    );

    expect(displayName).toBe("Irfan Putra");
  });

  it("falls back to auth metadata when the profile name is empty", () => {
    const displayName = resolveDisplayName(
      { display_name: "   " },
      { user_metadata: { full_name: "Alya Rahma" } } as never,
    );

    expect(displayName).toBe("Alya Rahma");
  });

  it("returns the first word for warm greetings", () => {
    expect(getFirstName("Alya Rahma")).toBe("Alya");
    expect(getFirstName("   ")).toBeNull();
  });
});

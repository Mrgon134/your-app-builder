import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const platformState = {
  native: false,
  ios: false,
  android: false,
};

vi.mock("@/lib/platform", () => ({
  isNative: () => platformState.native,
  isIOS: () => platformState.ios,
  isAndroid: () => platformState.android,
}));

import { resolveShellMode, useShellMode } from "@/hooks/use-shell-mode";

const setViewport = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
};

describe("useShellMode", () => {
  beforeEach(() => {
    platformState.native = false;
    platformState.ios = false;
    platformState.android = false;
  });

  it("resolves browser widths into phone, tablet, and desktop modes", () => {
    expect(resolveShellMode(390)).toBe("phone");
    expect(resolveShellMode(900)).toBe("tablet");
    expect(resolveShellMode(1440)).toBe("desktop");
  });

  it("forces Android native builds into phone mode", () => {
    platformState.native = true;
    platformState.android = true;

    expect(resolveShellMode(1024)).toBe("phone");
    expect(resolveShellMode(1440)).toBe("phone");
  });

  it("keeps iPad native adaptive while iPhone native stays phone", () => {
    platformState.native = true;
    platformState.ios = true;

    expect(resolveShellMode(430)).toBe("phone");
    expect(resolveShellMode(834)).toBe("tablet");
  });

  it("updates when the viewport changes", () => {
    setViewport(390);
    const { result } = renderHook(() => useShellMode());

    expect(result.current.shellMode).toBe("phone");

    act(() => {
      setViewport(1024);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.shellMode).toBe("tablet");
  });
});

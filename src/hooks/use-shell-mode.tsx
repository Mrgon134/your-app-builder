import * as React from "react";
import { isAndroid, isIOS, isNative } from "@/lib/platform";

export type ShellMode = "phone" | "tablet" | "desktop";

export const SHELL_BREAKPOINTS = {
  phoneMax: 767,
  tabletMax: 1279,
} as const;

const getModeForWidth = (width: number): ShellMode => {
  if (width <= SHELL_BREAKPOINTS.phoneMax) return "phone";
  if (width <= SHELL_BREAKPOINTS.tabletMax) return "tablet";
  return "desktop";
};

const getForcedNativeMode = (width: number): ShellMode | null => {
  if (!isNative()) return null;
  if (isAndroid()) return "phone";
  if (isIOS() && width <= SHELL_BREAKPOINTS.phoneMax) return "phone";
  return null;
};

export const resolveShellMode = (width: number): ShellMode => {
  const forcedMode = getForcedNativeMode(width);
  return forcedMode ?? getModeForWidth(width);
};

export function useShellMode() {
  const [shellMode, setShellMode] = React.useState<ShellMode>(() =>
    typeof window === "undefined" ? "phone" : resolveShellMode(window.innerWidth)
  );

  React.useEffect(() => {
    const onChange = () => {
      setShellMode(resolveShellMode(window.innerWidth));
    };

    const mediaQueries = [
      window.matchMedia(`(max-width: ${SHELL_BREAKPOINTS.phoneMax}px)`),
      window.matchMedia(`(min-width: ${SHELL_BREAKPOINTS.phoneMax + 1}px) and (max-width: ${SHELL_BREAKPOINTS.tabletMax}px)`),
      window.matchMedia(`(min-width: ${SHELL_BREAKPOINTS.tabletMax + 1}px)`),
    ];

    mediaQueries.forEach((mql) => mql.addEventListener("change", onChange));
    window.addEventListener("resize", onChange);
    onChange();

    return () => {
      mediaQueries.forEach((mql) => mql.removeEventListener("change", onChange));
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return {
    shellMode,
    isPhone: shellMode === "phone",
    isTablet: shellMode === "tablet",
    isDesktop: shellMode === "desktop",
  };
}

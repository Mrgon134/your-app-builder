import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

type Pattern = number | number[];

const canUseNativeHaptics = () =>
  Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("Haptics");

function webVibrate(pattern: Pattern) {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(pattern);
  }
}

export async function selectionFeedback(pattern: Pattern = 6) {
  if (!canUseNativeHaptics()) {
    webVibrate(pattern);
    return;
  }

  try {
    await Haptics.selectionChanged();
  } catch {
    webVibrate(pattern);
  }
}

export async function lightImpact(pattern: Pattern = 8) {
  if (!canUseNativeHaptics()) {
    webVibrate(pattern);
    return;
  }

  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    webVibrate(pattern);
  }
}

export async function mediumImpact(pattern: Pattern = [10, 50, 20]) {
  if (!canUseNativeHaptics()) {
    webVibrate(pattern);
    return;
  }

  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch {
    webVibrate(pattern);
  }
}

export async function successFeedback(pattern: Pattern = [10, 30, 10]) {
  if (!canUseNativeHaptics()) {
    webVibrate(pattern);
    return;
  }

  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch {
    webVibrate(pattern);
  }
}

export async function warningFeedback(pattern: Pattern = [50, 30, 50]) {
  if (!canUseNativeHaptics()) {
    webVibrate(pattern);
    return;
  }

  try {
    await Haptics.notification({ type: NotificationType.Warning });
  } catch {
    webVibrate(pattern);
  }
}

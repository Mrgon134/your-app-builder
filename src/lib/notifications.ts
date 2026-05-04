import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

type ReminderPermission = NotificationPermission | "unsupported";

const DAILY_REMINDER_ID = 4201;
const POST_INSTALL_REMINDER_ID = 4202;

const isNativeLocalNotificationsAvailable = () =>
  Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("LocalNotifications");

export function isNotificationSupported(): boolean {
  if (isNativeLocalNotificationsAvailable()) return true;
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (isNativeLocalNotificationsAvailable()) {
    const current = await LocalNotifications.checkPermissions();
    if (current.display === "granted") return true;
    if (current.display === "denied") return false;

    const requested = await LocalNotifications.requestPermissions();
    return requested.display === "granted";
  }

  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const result = await Notification.requestPermission();
  return result === "granted";
}

export function getNotificationPermission(): ReminderPermission {
  if (isNativeLocalNotificationsAvailable()) {
    const enabled = localStorage.getItem("nuju-reminder-enabled") === "1";
    return enabled ? "granted" : "default";
  }

  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export async function scheduleLocalReminder(hour: number, minute: number = 0): Promise<boolean> {
  await cancelScheduledReminder();
  localStorage.setItem("nuju-reminder-hour", String(hour));
  localStorage.setItem("nuju-reminder-minute", String(minute));

  if (isNativeLocalNotificationsAvailable()) {
    const granted = await requestNotificationPermission();
    if (!granted) {
      localStorage.setItem("nuju-reminder-enabled", "0");
      return false;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id: DAILY_REMINDER_ID,
          title: "A small check-in is waiting",
          body: "Take one quiet minute with Ju before the day disappears.",
          schedule: {
            on: { hour, minute },
            repeats: true,
          },
          extra: {
            screen: "journal",
            source: "daily_check_in_reminder",
          },
        },
      ],
    });

    localStorage.setItem("nuju-reminder-enabled", "1");
    return true;
  }

  const granted = await requestNotificationPermission();
  if (!granted) {
    localStorage.setItem("nuju-reminder-enabled", "0");
    return false;
  }

  const checkAndNotify = () => {
    const now = new Date();
    if (now.getHours() === hour && now.getMinutes() === minute) {
      showReminderNotification();
    }
  };

  const intervalId = setInterval(checkAndNotify, 60_000);
  localStorage.setItem("nuju-reminder-interval", String(intervalId));
  localStorage.setItem("nuju-reminder-enabled", "1");
  return true;
}

export async function cancelScheduledReminder() {
  const intervalId = localStorage.getItem("nuju-reminder-interval");
  if (intervalId) {
    clearInterval(Number(intervalId));
    localStorage.removeItem("nuju-reminder-interval");
  }

  if (isNativeLocalNotificationsAvailable()) {
    try {
      await LocalNotifications.cancel({
        notifications: [
          { id: DAILY_REMINDER_ID },
          { id: POST_INSTALL_REMINDER_ID },
        ],
      });
    } catch {
      // The app should stay usable even if iOS has nothing scheduled yet.
    }
  }
}

export function getReminderSettings() {
  return {
    enabled: localStorage.getItem("nuju-reminder-enabled") === "1",
    hour: Number(localStorage.getItem("nuju-reminder-hour") || "20"),
    minute: Number(localStorage.getItem("nuju-reminder-minute") || "0"),
  };
}

export function disableReminder() {
  void cancelScheduledReminder();
  localStorage.setItem("nuju-reminder-enabled", "0");
}

const REMINDER_MESSAGES = [
  { title: "A small check-in is waiting", body: "Take one quiet minute with Ju before the day disappears." },
  { title: "How did today land?", body: "No blank page. Just one honest check-in." },
  { title: "Time to reflect", body: "Name the feeling now so it is not carrying everything alone." },
  { title: "Ju saved you a minute", body: "A quick mood check can make the next step clearer." },
  { title: "One minute for you", body: "Open Nuju and let the day become a little easier to read." },
];

function showReminderNotification() {
  if (getNotificationPermission() !== "granted") return;

  const lastEntry = localStorage.getItem("nuju-last-entry-date");
  const today = new Date().toISOString().split("T")[0];
  if (lastEntry === today) return;

  const msg = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];

  const notification = new Notification(msg.title, {
    body: msg.body,
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
    tag: "nuju-reminder",
  } as NotificationOptions);

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

export function analyzeSmartTiming(entries: Array<{ date: string }>): number {
  if (entries.length < 3) return 20;

  const hours = entries
    .slice(0, 30)
    .map((entry) => {
      try {
        return new Date(entry.date).getHours();
      } catch {
        return null;
      }
    })
    .filter((hour): hour is number => hour !== null);

  if (hours.length === 0) return 20;

  const freq: Record<number, number> = {};
  hours.forEach((hour) => {
    freq[hour] = (freq[hour] || 0) + 1;
  });

  let bestHour = 20;
  let maxCount = 0;
  Object.entries(freq).forEach(([hour, count]) => {
    if (count > maxCount) {
      maxCount = count;
      bestHour = Number(hour);
    }
  });

  return bestHour;
}

export function initReminders() {
  const settings = getReminderSettings();
  if (settings.enabled) {
    void scheduleLocalReminder(settings.hour, settings.minute);
  }

  void checkPostInstallNotification();
}

export async function schedulePostInstallNotification() {
  localStorage.setItem("nuju-install-time", String(Date.now()));

  if (isNativeLocalNotificationsAvailable()) {
    const granted = await requestNotificationPermission();
    if (!granted) return;

    const reminderAt = new Date(Date.now() + 30 * 60 * 1000);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: POST_INSTALL_REMINDER_ID,
          title: "Ju has one question for you",
          body: "It takes about a minute to answer.",
          schedule: { at: reminderAt },
          extra: {
            screen: "journal",
            source: "post_install_reminder",
          },
        },
      ],
    });
    return;
  }

  if (getNotificationPermission() !== "granted") return;
  setTimeout(() => {
    void checkPostInstallNotification();
  }, 30 * 60 * 1000);
}

export async function checkPostInstallNotification() {
  if (isNativeLocalNotificationsAvailable()) return;
  if (getNotificationPermission() !== "granted") return;

  const installTime = localStorage.getItem("nuju-install-time");
  if (!installTime) return;

  const hasJournaled = localStorage.getItem("nuju-last-entry-date");
  if (hasJournaled) return;

  const elapsed = Date.now() - Number(installTime);
  const thirtyMinutes = 30 * 60 * 1000;

  if (elapsed >= thirtyMinutes && !localStorage.getItem("nuju-post-install-shown")) {
    const notification = new Notification("Ju has one question for you", {
      body: "It takes about a minute to answer.",
      icon: "/pwa-192x192.png",
      badge: "/pwa-192x192.png",
      tag: "nuju-post-install",
    } as NotificationOptions);

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    localStorage.setItem("nuju-post-install-shown", "1");
  }
}

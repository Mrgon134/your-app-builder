// Push notification utilities for PWA

export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const result = await Notification.requestPermission();
  return result === "granted";
}

export function getNotificationPermission(): NotificationPermission | "unsupported" {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export function scheduleLocalReminder(hour: number, minute: number = 0) {
  // Cancel any existing scheduled notification
  cancelScheduledReminder();

  const checkAndNotify = () => {
    const now = new Date();
    if (now.getHours() === hour && now.getMinutes() === minute) {
      showReminderNotification();
    }
  };

  // Check every minute
  const intervalId = setInterval(checkAndNotify, 60_000);
  localStorage.setItem("nuju-reminder-interval", String(intervalId));
  localStorage.setItem("nuju-reminder-hour", String(hour));
  localStorage.setItem("nuju-reminder-minute", String(minute));
  localStorage.setItem("nuju-reminder-enabled", "1");
}

export function cancelScheduledReminder() {
  const intervalId = localStorage.getItem("nuju-reminder-interval");
  if (intervalId) {
    clearInterval(Number(intervalId));
    localStorage.removeItem("nuju-reminder-interval");
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
  cancelScheduledReminder();
  localStorage.setItem("nuju-reminder-enabled", "0");
}

const REMINDER_MESSAGES = [
  { title: "Ju misses you! 💜", body: "Take 30 seconds to check in with yourself." },
  { title: "How was your day? ✨", body: "Your journal is waiting. Just one tap to start." },
  { title: "Time to reflect 🌙", body: "A quick mood check can change your whole week." },
  { title: "Hey, you! 📝", body: "Ju noticed you haven't journaled today. Let's fix that!" },
  { title: "30 seconds for you 💭", body: "You deserve a moment of self-reflection." },
];

function showReminderNotification() {
  if (Notification.permission !== "granted") return;

  // Don't notify if already journaled today
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

// Smart timing: analyze past entry times to find best reminder time
export function analyzeSmartTiming(entries: Array<{ date: string }>): number {
  if (entries.length < 3) return 20; // Default 8pm

  // Parse hours from entry dates (assuming ISO strings)
  const hours = entries
    .slice(0, 30)
    .map((e) => {
      try {
        return new Date(e.date).getHours();
      } catch {
        return null;
      }
    })
    .filter((h): h is number => h !== null);

  if (hours.length === 0) return 20;

  // Find most common hour
  const freq: Record<number, number> = {};
  hours.forEach((h) => {
    freq[h] = (freq[h] || 0) + 1;
  });

  let bestHour = 20;
  let maxCount = 0;
  Object.entries(freq).forEach(([h, count]) => {
    if (count > maxCount) {
      maxCount = count;
      bestHour = Number(h);
    }
  });

  return bestHour;
}

// Initialize reminders on app load
export function initReminders() {
  const settings = getReminderSettings();
  if (settings.enabled && Notification.permission === "granted") {
    scheduleLocalReminder(settings.hour, settings.minute);
  }
  
  // Also check if we need to show the post-install notification
  checkPostInstallNotification();
}

// 30-minute post-install retention hook
export function schedulePostInstallNotification() {
  if (Notification.permission !== "granted") return;
  localStorage.setItem("nuju-install-time", String(Date.now()));
  
  setTimeout(() => {
    checkPostInstallNotification();
  }, 30 * 60 * 1000);
}

export function checkPostInstallNotification() {
  if (Notification.permission !== "granted") return;
  const installTime = localStorage.getItem("nuju-install-time");
  if (!installTime) return;
  
  const hasJournaled = localStorage.getItem("nuju-last-entry-date");
  if (hasJournaled) return; // Don't annoy if they already journaled
  
  const elapsed = Date.now() - Number(installTime);
  const THIRTY_MINS = 30 * 60 * 1000;
  
  if (elapsed >= THIRTY_MINS && !localStorage.getItem("nuju-post-install-shown")) {
    const notification = new Notification("Ju has a question for you", {
      body: "Takes 30 seconds to answer.",
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

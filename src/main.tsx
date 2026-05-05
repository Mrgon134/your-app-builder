import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { isNative } from "./lib/platform.ts";

const nativePlatform = isNative();
const posthogKey = import.meta.env.VITE_POSTHOG_KEY || "phc_BfFykDwtfmSnLZ7XFkp3nXk5BkLft2XVd8LsK7rjiC8b";
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";
const localPostHogEnabled = import.meta.env.VITE_POSTHOG_ENABLE_LOCAL === "true";
const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
const posthogCaptureEnabled = Boolean(posthogKey) && (!isLocalhost || localPostHogEnabled);

posthog.init(posthogKey, {
  api_host: posthogHost,
  person_profiles: "identified_only",
  capture_pageview: posthogCaptureEnabled && !nativePlatform,
  autocapture: posthogCaptureEnabled && !nativePlatform,
  opt_out_capturing_by_default: !posthogCaptureEnabled,
  disable_session_recording: nativePlatform,
  loaded: (client) => {
    if (!posthogCaptureEnabled) {
      client.opt_out_capturing();
    }
  },
});

// Restore dark mode from localStorage, but only on in-app routes.
// Public marketing pages (Landing, Onboarding, blog, etc.) are designed
// for the light cream theme only — they share the dark CSS variables
// that the in-app screens use, but their layouts assume light.
if (
  window.location.pathname.startsWith("/app") &&
  localStorage.getItem("nuju-dark") === "1"
) {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </HelmetProvider>
);

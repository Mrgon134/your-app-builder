import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { isNative } from "./lib/platform.ts";

const nativePlatform = isNative();

posthog.init('phc_BfFykDwtfmSnLZ7XFkp3nXk5BkLft2XVd8LsK7rjiC8b', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: !nativePlatform,
  autocapture: !nativePlatform,
  disable_session_recording: nativePlatform,
});

// Restore dark mode from localStorage
if (localStorage.getItem("nuju-dark") === "1") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </HelmetProvider>
);

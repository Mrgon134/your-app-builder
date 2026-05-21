import React, { useEffect } from "react";

import SEOHead from "@/components/SEOHead";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";

const Landing: React.FC = () => {
  const { trackLandingView } = usePostHogEvents();
  const ttk = useTikTokPixel();

  useEffect(() => {
    trackLandingView();
    ttk.trackPageView();
  }, [trackLandingView, ttk]);

  useEffect(() => {
    let cancelled = false;

    fetch("/landing-exact/index.html", { cache: "no-store" })
      .then((response) => response.text())
      .then((html) => {
        if (cancelled) return;

        document.open();
        document.write(html);
        document.close();
      })
      .catch(() => {
        // Keep the fallback visible if the static landing cannot be loaded.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Nuju - AI Journal App for Mood Tracking & Emotional Clarity"
        description="Nuju is the AI journal and mood tracker app for racing thoughts, 3am overthinking, and feelings you can't name yet. Turn 30 seconds of mess into a read that lands. Start the Ju Gets You reveal free."
        canonical="https://nuju.app/"
        noSuffix
      />
      <div className="grid min-h-[100dvh] place-items-center bg-[#FAF9F6] px-6 text-center text-[#1A1726]">
        <p className="text-sm font-semibold text-[#7C6EDB]">Loading Nuju landing...</p>
      </div>
    </>
  );
};

export default Landing;

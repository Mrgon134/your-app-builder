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

  return (
    <>
      <SEOHead
        title="Nuju - AI Journal App for Mood Tracking & Emotional Clarity"
        description="Nuju is the AI journal and mood tracker app for racing thoughts, 3am overthinking, and feelings you can't name yet. Turn 30 seconds of mess into a read that lands. Start the Ju Gets You reveal free."
        canonical="https://nuju.app/"
        noSuffix
      />
      <iframe
        title="Nuju landing"
        src="/landing-exact/index.html"
        className="fixed inset-0 h-[100dvh] w-screen border-0"
      />
    </>
  );
};

export default Landing;

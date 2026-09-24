import React, { useEffect } from "react";

import SEOHead from "@/components/SEOHead";
import { usePostHogEvents } from "@/hooks/use-posthog-events";
import { useTikTokPixel } from "@/hooks/use-tiktok-pixel";

const Landing: React.FC = () => {
  const { trackLandingView } = usePostHogEvents();
  const ttk = useTikTokPixel();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorCode = params.get("error_code");
    const errorDesc = params.get("error_description");
    const error = params.get("error");

    if (errorCode || error) {
      const msg = errorCode === "bad_oauth_state"
        ? "Login session expired or was interrupted. Please try signing in again."
        : (errorDesc || error || "Sign-in failed. Please try again.");
      window.location.replace(`/auth?error=${encodeURIComponent(msg)}`);
      return;
    }

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
        description="Nuju is the AI journal and mood tracker app for racing thoughts, 3am overthinking, and feelings you can't name yet. Get a warm read, a clear mood pattern, and one gentle next step."
        canonical="https://nuju.app/"
        noSuffix
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Nuju",
            alternateName: ["Nuju AI Journal", "Nuju Mood Tracker", "Nu Ju"],
            applicationCategory: "HealthApplication",
            applicationSubCategory: "Emotional Wellness",
            operatingSystem: "iOS, Web",
            url: "https://nuju.app/",
            downloadUrl: "https://apps.apple.com/us/app/nuju/id6763682187",
            installUrl: "https://apps.apple.com/us/app/nuju/id6763682187",
            sameAs: [
              "https://apps.apple.com/us/app/nuju/id6763682187",
              "https://www.producthunt.com/products/nuju"
            ],
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "0",
              highPrice: "15.99",
              priceCurrency: "USD"
            }
          }
        ]}
      />
      <div className="grid min-h-[100dvh] place-items-center bg-[#FAF9F6] px-6 text-center text-[#1A1726]">
        <p className="text-sm font-semibold text-[#7C6EDB]">Loading Nuju landing...</p>
      </div>
    </>
  );
};

export default Landing;

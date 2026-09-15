import React, { useEffect, useRef } from "react";

interface AdSenseBannerProps {
  /** Optional Ad Slot ID created in Google AdSense console */
  slot?: string;
  /** Format of the ad unit (default: 'auto') */
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  /** Optional layout key for In-feed or In-article ads */
  layoutKey?: string;
  /** Optional custom CSS classes */
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slot,
  format = "auto",
  layoutKey,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pushedRef = useRef(false);

  // Validate if slot is purely numeric digits (AdSense standard)
  const numericSlot = slot && /^\d+$/.test(slot.trim()) ? slot.trim() : undefined;

  const isDev =
    typeof window !== "undefined" &&
    (import.meta.env.DEV ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  useEffect(() => {
    // Only execute on browser client
    if (typeof window === "undefined" || pushedRef.current) return;

    // Do not render or initialize inside native mobile containers (Capacitor / iOS wrapper)
    const isNativeMobile =
      window.location.protocol === "capacitor:" ||
      window.location.protocol === "ionic:" ||
      (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();

    if (isNativeMobile) return;

    try {
      // @ts-expect-error - adsbygoogle is provided by external Google AdSense script
      const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
      adsbygoogle.push({});
      pushedRef.current = true;
    } catch (err) {
      // Ignore errors caused by AdBlockers or strict tracking protection
      console.warn("AdSense push ignored:", err);
    }
  }, []);

  // In native app environment, render nothing
  if (
    typeof window !== "undefined" &&
    (window.location.protocol === "capacitor:" ||
      window.location.protocol === "ionic:" ||
      (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.())
  ) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      data-testid="adsense-banner-container"
      ref={containerRef}
      className={`my-8 flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/40 bg-card/30 p-3 text-center text-xs text-muted-foreground transition-all ${className}`}
    >
      <span className="mb-1.5 text-[10px] tracking-wider uppercase opacity-60">
        Advertisement
      </span>
      {isDev && (
        <div className="mb-2 flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
          <span>● Google AdSense Unit (Client: ca-pub-2385213858617155)</span>
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "90px" }}
        data-ad-client="ca-pub-2385213858617155"
        data-ad-slot={numericSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </aside>
  );
};

export default AdSenseBanner;

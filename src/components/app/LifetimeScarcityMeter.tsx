import React from "react";

import type { LifetimeScarcitySnapshot } from "@/lib/lifetime-scarcity";

interface LifetimeScarcityMeterProps {
  scarcity: LifetimeScarcitySnapshot;
  className?: string;
  variant?: "default" | "hero";
}

const urgencyStyles = {
  calm: {
    shell: "border-primary/20 bg-primary/[0.07] text-[#5B4DB5] dark:border-white/15 dark:bg-white/5 dark:text-[#E8E4F8]",
    pill: "bg-white/80 text-[#5B4DB5] dark:bg-white/10 dark:text-white",
    bar: "from-[#8B7AE8] to-[#6F5EE0] dark:from-[#A89AF9] dark:to-[#8E80F4]",
    track: "bg-white/60 dark:bg-white/10",
  },
  warm: {
    shell: "border-primary/28 bg-[rgba(124,110,219,0.1)] text-[#5647B1] dark:border-white/20 dark:bg-white/10 dark:text-white",
    pill: "bg-white text-[#5647B1] dark:bg-white/15 dark:text-white",
    bar: "from-[#8675E5] to-[#6A58D8] dark:from-[#B2A6FB] dark:to-[#9385F6]",
    track: "bg-white/60 dark:bg-white/10",
  },
  hot: {
    shell: "border-primary/35 bg-[rgba(124,110,219,0.14)] text-[#4A3AA6] dark:border-white/25 dark:bg-white/20 dark:text-white",
    pill: "bg-white text-[#4A3AA6] dark:bg-white/25 dark:text-[#5746B8]",
    bar: "from-[#7C6EDB] to-[#5E4FD1] dark:from-[#C5BAFF] dark:to-[#9A8CF7]",
    track: "bg-white/60 dark:bg-white/10",
  },
} as const;

const heroStyles = {
  calm: {
    shell: "border-white/12 bg-white/6 text-white",
    pill: "bg-white/14 text-white",
    bar: "from-[#A89AF9] via-[#8E80F4] to-[#6F5FE8]",
    track: "bg-white/12",
  },
  warm: {
    shell: "border-white/14 bg-white/7 text-white",
    pill: "bg-white/16 text-white",
    bar: "from-[#B2A6FB] via-[#9385F6] to-[#715FE5]",
    track: "bg-white/12",
  },
  hot: {
    shell: "border-white/18 bg-white/8 text-white",
    pill: "bg-white text-[#5746B8]",
    bar: "from-[#C5BAFF] via-[#9A8CF7] to-[#7766E8]",
    track: "bg-white/14",
  },
} as const;

const LifetimeScarcityMeter: React.FC<LifetimeScarcityMeterProps> = ({
  scarcity,
  className = "",
  variant = "default",
}) => {
  const styles = variant === "hero" ? heroStyles[scarcity.urgency] : urgencyStyles[scarcity.urgency];
  const helperCopy =
    scarcity.remaining <= 3
      ? `Only ${scarcity.remaining} lifetime spots are still open right now.`
      : `${scarcity.claimed} people have already taken the lifetime offer.`;

  return (
    <div className={`rounded-2xl border px-4 py-4 ${styles.shell} ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Only 25 lifetime spots</p>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm font-semibold">
        <span>{scarcity.claimed} claimed</span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${styles.pill}`}>
          {scarcity.remaining} left
        </span>
      </div>

      <div className={`mt-3 h-2.5 overflow-hidden rounded-full ${styles.track}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${styles.bar} transition-[width] duration-500`}
          style={{ width: `${scarcity.progressPercent}%` }}
        />
      </div>

      <p className="mt-2 text-xs leading-6">{helperCopy}</p>
    </div>
  );
};

export default LifetimeScarcityMeter;

import React from "react";

import type { LifetimeScarcitySnapshot } from "@/lib/lifetime-scarcity";

interface LifetimeScarcityMeterProps {
  scarcity: LifetimeScarcitySnapshot;
  className?: string;
}

const urgencyStyles = {
  calm: {
    shell: "border-primary/20 bg-primary/[0.07] text-[#5B4DB5]",
    pill: "bg-white/80 text-[#5B4DB5]",
    bar: "from-[#8B7AE8] to-[#6F5EE0]",
  },
  warm: {
    shell: "border-primary/28 bg-[rgba(124,110,219,0.1)] text-[#5647B1]",
    pill: "bg-white text-[#5647B1]",
    bar: "from-[#8675E5] to-[#6A58D8]",
  },
  hot: {
    shell: "border-primary/35 bg-[rgba(124,110,219,0.14)] text-[#4A3AA6]",
    pill: "bg-white text-[#4A3AA6]",
    bar: "from-[#7C6EDB] to-[#5E4FD1]",
  },
} as const;

const LifetimeScarcityMeter: React.FC<LifetimeScarcityMeterProps> = ({ scarcity, className = "" }) => {
  const styles = urgencyStyles[scarcity.urgency];
  const helperCopy =
    scarcity.remaining <= 3
      ? `Only ${scarcity.remaining} lifetime spots are still open right now.`
      : `${scarcity.remaining} of ${scarcity.total} lifetime spots are still open right now.`;

  return (
    <div className={`rounded-2xl border px-4 py-4 ${styles.shell} ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Only 25 lifetime spots</p>
          <p className="mt-1 text-sm font-semibold">{scarcity.claimed}/{scarcity.total} claimed</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${styles.pill}`}>
          {scarcity.remaining} left
        </span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/60">
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

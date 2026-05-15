import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siApple } from "simple-icons";

import { APP_STORE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AppStoreCtaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  size?: "sm" | "md";
  variant?: "outline" | "soft";
}

const AppStoreCta: React.FC<AppStoreCtaProps> = ({
  className,
  label = "Download in App Store",
  size = "md",
  variant = "outline",
  ...props
}) => {
  const toneClass =
    variant === "soft"
      ? "shadow-[0_18px_42px_-24px_rgba(0,0,0,0.72)]"
      : "shadow-[0_14px_34px_-22px_rgba(0,0,0,0.68)]";

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Nuju in App Store"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-black bg-black font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-900 active:scale-[0.98] dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-neutral-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-white/80",
        size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm sm:text-base",
        toneClass,
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        className={size === "sm" ? "h-4 w-4 shrink-0" : "h-[18px] w-[18px] shrink-0"}
        fill="currentColor"
      >
        <path d={siApple.path} />
      </svg>
      <span className="whitespace-nowrap">{label}</span>
      <ArrowUpRight className={size === "sm" ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"} aria-hidden="true" />
    </a>
  );
};

export default AppStoreCta;

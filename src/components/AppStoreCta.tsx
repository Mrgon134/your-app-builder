import React from "react";
import { ArrowUpRight, Smartphone } from "lucide-react";

import { APP_STORE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AppStoreCtaProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  size?: "sm" | "md";
  variant?: "outline" | "soft";
}

const AppStoreCta: React.FC<AppStoreCtaProps> = ({
  className,
  label = "Available on the App Store",
  size = "md",
  variant = "outline",
  ...props
}) => (
  <a
    href={APP_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]",
      size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm sm:text-base",
      variant === "soft"
        ? "border border-primary/20 bg-primary/[0.08] text-primary hover:border-primary/35 hover:bg-primary/[0.12]"
        : "border border-border/70 bg-background text-foreground hover:border-primary/40 hover:text-primary",
      className,
    )}
    {...props}
  >
    <Smartphone className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} aria-hidden="true" />
    <span>{label}</span>
    <ArrowUpRight className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
  </a>
);

export default AppStoreCta;

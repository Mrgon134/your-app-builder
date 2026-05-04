import { siInstagram, siTiktok, siWhatsapp } from "simple-icons";
import type { ShareTarget } from "@/lib/share-card";

const ICONS: Record<ShareTarget, { title: string; path: string }> = {
  tiktok: siTiktok,
  instagram_story: siInstagram,
  instagram_reels: siInstagram,
  whatsapp_status: siWhatsapp,
};

interface SocialBrandIconProps {
  target: ShareTarget;
  className?: string;
  title?: string;
}

export default function SocialBrandIcon({ target, className, title }: SocialBrandIconProps) {
  const icon = ICONS[target];

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={title || icon.title}
      className={className}
      fill="currentColor"
    >
      <title>{title || icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

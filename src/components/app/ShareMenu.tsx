import React, { useState } from "react";
import { Share2, Loader2, X } from "lucide-react";
import { generateShareCard, type ShareCardType } from "@/lib/share-card";
import { toast } from "sonner";

interface ShareMenuProps {
  type: ShareCardType;
  data: any;
  label?: string;
  className?: string;
}

type PlatformId = "twitter" | "instagram" | "tiktok";

const PLATFORMS: Array<{
  id: PlatformId;
  label: string;
  color: string;
  icon: React.ReactNode;
}> = [
  {
    id: "twitter",
    label: "X",
    color: "bg-foreground/10 text-foreground",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "bg-[#E1306C]/10 text-[#E1306C]",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2M12 6.85A5.15 5.15 0 1 1 6.85 12 5.15 5.15 0 0 1 12 6.85m0 1.8A3.35 3.35 0 1 0 15.35 12 3.35 3.35 0 0 0 12 8.65" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    color: "bg-[#010101]/10 text-[#010101] dark:bg-white/10 dark:text-white",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.8a4.84 4.84 0 0 1-1-.11z" />
      </svg>
    ),
  },
];

const getPlatformUrl = (platformId: PlatformId, shareText: string) => {
  if (platformId === "twitter") {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  }

  if (platformId === "instagram") {
    return "https://www.instagram.com/create/select/";
  }

  return "https://www.tiktok.com/upload";
};

const getPlatformToast = (platformId: PlatformId) => {
  if (platformId === "twitter") return "Image saved. X opened - tinggal attach lalu post.";
  if (platformId === "instagram") return "Image saved. Instagram opened - tinggal pilih file lalu post.";
  return "Image saved. TikTok opened - tinggal upload lalu post.";
};

const ShareMenu: React.FC<ShareMenuProps> = ({ type, data, label, className }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<PlatformId | null>(null);

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nuju-${type}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePlatformShare = async (platformId: PlatformId) => {
    const shareText = "Check out my mood on Nuju https://nuju.app";
    const targetUrl = getPlatformUrl(platformId, shareText);
    const popup = window.open("about:blank", "_blank", "noopener,noreferrer");

    setLoading(platformId);
    try {
      const blob = await generateShareCard(type, data);
      downloadBlob(blob);

      if (popup) {
        popup.location.href = targetUrl;
      } else {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      }

      toast.success(getPlatformToast(platformId));
    } catch (err) {
      popup?.close();
      console.error("Share failed:", err);
      toast.error("Share failed");
    } finally {
      setLoading(null);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary/10 text-primary font-semibold text-sm transition-all active:scale-[0.97] ${className || ""}`}
      >
        <Share2 className="w-4 h-4" />
        {label || "Share"}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute bottom-full right-0 mb-2 z-50 bg-card rounded-2xl shadow-xl border border-border/50 p-2 min-w-[200px] animate-fade-in">
            <div className="flex items-center justify-between px-3 py-1.5 mb-1">
              <span className="text-xs font-medium text-muted-foreground">Post to</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground active:scale-[0.95]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformShare(platform.id)}
                disabled={loading !== null}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] hover:bg-muted/50 ${platform.color}`}
              >
                {loading === platform.id ? <Loader2 className="w-4 h-4 animate-spin" /> : platform.icon}
                {platform.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShareMenu;

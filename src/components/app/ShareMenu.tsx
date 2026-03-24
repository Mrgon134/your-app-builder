import React, { useState } from "react";
import { Share2, Download, Loader2, X, MessageCircle, Send } from "lucide-react";
import { generateShareCard, shareImage, ShareCardType } from "@/lib/share-card";
import { toast } from "sonner";

interface ShareMenuProps {
  type: ShareCardType;
  data: any;
  label?: string;
  className?: string;
}

const PLATFORMS = [
  {
    id: "native",
    label: "Share",
    icon: <Share2 className="w-4 h-4" />,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <MessageCircle className="w-4 h-4" />,
    color: "bg-[#25D366]/10 text-[#25D366]",
  },
  {
    id: "twitter",
    label: "X",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "bg-foreground/10 text-foreground",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
      </svg>
    ),
    color: "bg-[#010101]/10 text-[#010101] dark:bg-white/10 dark:text-white",
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: <Send className="w-4 h-4" />,
    color: "bg-[#0088cc]/10 text-[#0088cc]",
  },
  {
    id: "download",
    label: "Save",
    icon: <Download className="w-4 h-4" />,
    color: "bg-muted text-muted-foreground",
  },
];

const ShareMenu: React.FC<ShareMenuProps> = ({ type, data, label, className }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handlePlatformShare = async (platformId: string) => {
    setLoading(platformId);
    try {
      const blob = await generateShareCard(type, data);
      const shareText = "Check out my mood on Nuju 💜 https://nuju.app";

      if (platformId === "native") {
        try {
          await shareImage(blob, `My ${type} mood — Nuju`);
          toast.success("Shared! 💜");
        } catch {
          // Fall through to download
          downloadBlob(blob);
          toast.success("Downloaded! 📥");
        }
      } else if (platformId === "whatsapp") {
        // WhatsApp: share text with link (image via native share on mobile)
        if (navigator.share && navigator.canShare?.({ files: [new File([blob], "nuju.png", { type: "image/png" })] })) {
          await navigator.share({
            text: shareText,
            files: [new File([blob], "nuju-mood.png", { type: "image/png" })],
          });
        } else {
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
        }
        toast.success("Shared to WhatsApp! 💚");
      } else if (platformId === "twitter") {
        // X/Twitter: open tweet compose with text
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent("My mood today with Nuju 💜\n\nTrack your mood & talk to your AI companion\nhttps://nuju.app")}`,
          "_blank"
        );
        // Also try to copy image to clipboard for easy paste
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          toast.success("Image copied! Paste it in your tweet 📋");
        } catch {
          downloadBlob(blob);
          toast.success("Image saved! Attach it to your tweet 🐦");
        }
      } else if (platformId === "tiktok") {
        // TikTok Share Kit: download image + open TikTok
        downloadBlob(blob);
        window.open("https://www.tiktok.com/upload", "_blank");
        toast.success("Image saved! Upload it to TikTok 🎵");
      } else if (platformId === "telegram") {
        if (navigator.share && navigator.canShare?.({ files: [new File([blob], "nuju.png", { type: "image/png" })] })) {
          await navigator.share({
            text: shareText,
            files: [new File([blob], "nuju-mood.png", { type: "image/png" })],
          });
        } else {
          window.open(`https://t.me/share/url?url=${encodeURIComponent("https://nuju.app")}&text=${encodeURIComponent("My mood today with Nuju 💜")}`, "_blank");
        }
        toast.success("Shared to Telegram! 💙");
      } else if (platformId === "download") {
        downloadBlob(blob);
        toast.success("Downloaded! 📥");
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast.error("Share failed");
    } finally {
      setLoading(null);
      setOpen(false);
    }
  };

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nuju-${type}.png`;
    a.click();
    URL.revokeObjectURL(url);
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
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Menu */}
          <div className="absolute bottom-full right-0 mb-2 z-50 bg-card rounded-2xl shadow-xl border border-border/50 p-2 min-w-[180px] animate-fade-in">
            <div className="flex items-center justify-between px-3 py-1.5 mb-1">
              <span className="text-xs font-medium text-muted-foreground">Share to</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground active:scale-[0.95]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePlatformShare(p.id)}
                disabled={loading !== null}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] hover:bg-muted/50 ${p.color}`}
              >
                {loading === p.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  p.icon
                )}
                {p.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShareMenu;

import React, { useState } from "react";
import { Camera, Clapperboard, Loader2, MessageCircle, Music2, Share2, X } from "lucide-react";
import {
  generateShareCard,
  shareToTarget,
  SHARE_TARGETS,
  type ShareCardData,
  type ShareCardType,
  type ShareTarget,
} from "@/lib/share-card";
import { toast } from "sonner";

interface ShareMenuProps {
  type: ShareCardType;
  data: ShareCardData;
  label?: string;
  className?: string;
}

const TARGET_STYLES: Record<ShareTarget, { icon: React.ReactNode; colorClass: string }> = {
  tiktok: {
    icon: <Music2 className="w-4 h-4" />,
    colorClass: "bg-[#010101]/10 text-[#010101] dark:bg-white/10 dark:text-white",
  },
  instagram_story: {
    icon: <Camera className="w-4 h-4" />,
    colorClass: "bg-[#E1306C]/10 text-[#E1306C]",
  },
  instagram_reels: {
    icon: <Clapperboard className="w-4 h-4" />,
    colorClass: "bg-[#C13584]/10 text-[#C13584]",
  },
  whatsapp_status: {
    icon: <MessageCircle className="w-4 h-4" />,
    colorClass: "bg-[#25D366]/10 text-[#128C4A]",
  },
};

const ShareMenu: React.FC<ShareMenuProps> = ({ type, data, label, className }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<ShareTarget | null>(null);

  const handleTargetShare = async (target: ShareTarget) => {
    setLoading(target);
    try {
      const blob = await generateShareCard(type, data);
      await shareToTarget(blob, target, "Check out my mood on Nuju https://nuju.app");
      toast.success("Share composer opened");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        toast.message("Share canceled");
      } else {
        console.error("Share failed:", error);
        toast.error("Could not open share");
      }
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

          <div className="absolute bottom-full right-0 mb-2 z-50 bg-card rounded-2xl shadow-xl border border-border/50 p-2 min-w-[210px] animate-fade-in">
            <div className="flex items-center justify-between px-3 py-1.5 mb-1">
              <span className="text-xs font-medium text-muted-foreground">Post to</span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground active:scale-[0.95]" aria-label="Close share menu">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {SHARE_TARGETS.map((target) => {
              const style = TARGET_STYLES[target.id];
              return (
                <button
                  key={target.id}
                  onClick={() => handleTargetShare(target.id)}
                  disabled={loading !== null}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] hover:bg-muted/50 ${style.colorClass}`}
                >
                  {loading === target.id ? <Loader2 className="w-4 h-4 animate-spin" /> : style.icon}
                  {target.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ShareMenu;

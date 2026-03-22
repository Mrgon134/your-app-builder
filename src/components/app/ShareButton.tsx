import React, { useState } from "react";
import { Share2, Download, Loader2 } from "lucide-react";
import { generateShareCard, shareImage, ShareCardType } from "@/lib/share-card";
import { toast } from "sonner";

interface ShareButtonProps {
  type: ShareCardType;
  data: any;
  label?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ type, data, label, className }) => {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const blob = await generateShareCard(type, data);
      await shareImage(blob, `My ${type} mood — Nuju`);
      toast.success("Shared! 💜");
    } catch (err) {
      console.error("Share failed:", err);
      // Try download as fallback
      try {
        const blob = await generateShareCard(type, data);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nuju-${type}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded! 📥");
      } catch {
        toast.error("Share failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary/10 text-primary font-semibold text-sm transition-all active:scale-[0.97] disabled:opacity-50 ${className || ""}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {label || "Share"}
    </button>
  );
};

export default ShareButton;

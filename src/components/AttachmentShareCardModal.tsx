import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Share2, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AttachmentProfile } from "@/data/attachment-style";
import { generateAttachmentCard } from "@/lib/generate-quiz-card";

interface AttachmentShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AttachmentProfile;
  anxietyScore: number;
  avoidanceScore: number;
  lang: string;
}

export const AttachmentShareCardModal: React.FC<AttachmentShareCardModalProps> = ({
  isOpen,
  onClose,
  profile,
  anxietyScore,
  avoidanceScore,
  lang,
}) => {
  const [cardData, setCardData] = useState<{ dataUrl: string; blob: Blob; file: File } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateAttachmentCard(profile, anxietyScore, avoidanceScore, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Attachment card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error("Failed to generate share image card.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, profile, anxietyScore, avoidanceScore, lang]);

  const handleDownload = () => {
    if (!cardData) return;
    const a = document.createElement("a");
    a.href = cardData.dataUrl;
    a.download = `ju-attachment-${profile.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(lang === "id" ? "Kartu berhasil diunduh!" : "Card downloaded successfully!");
  };

  const handleShare = async () => {
    if (!cardData) return;
    const shareText = `My Attachment Style: ${(profile.title as any)[lang] || profile.title.en} (${(profile.archetype as any)[lang] || profile.archetype.en})\nCheck yours free at: ${window.location.origin}/quiz/attachment-style`;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          title: "My Attachment Style Assessment Result",
          text: shareText,
          files: [cardData.file],
        });
        toast.success("Shared successfully!");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleFallbackCopy(shareText);
        }
      }
    } else {
      handleFallbackCopy(shareText);
    }
  };

  const handleFallbackCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
    toast.success("Result text copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col p-6 bg-slate-900 border-slate-800 text-slate-100 rounded-3xl overflow-hidden">
        <DialogHeader className="text-left space-y-1">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <span>{lang === "id" ? "Bagikan Kartu Hasil" : "Share Your Assessment Card"}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            {lang === "id"
              ? "Kartu estetis format Instagram Story (9:16) siap unduh atau bagikan ke teman."
              : "High-resolution 9:16 Instagram Story card ready to download or share."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 my-3 flex items-center justify-center min-h-[340px] bg-slate-950/60 rounded-2xl border border-slate-800 p-2 overflow-hidden">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-rose-400" />
              <p className="text-xs font-medium">Generating card...</p>
            </div>
          ) : cardData ? (
            <img
              src={cardData.dataUrl}
              alt="Attachment Card"
              className="max-h-[360px] w-auto rounded-xl shadow-2xl border border-slate-800 object-contain"
            />
          ) : null}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleDownload}
            disabled={!cardData || isGenerating}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!cardData || isGenerating}
            className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>{isCopied ? "Link Copied!" : "Share / Story"}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttachmentShareCardModal;

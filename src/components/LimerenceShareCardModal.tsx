import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Share2, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { LimerenceLang, LimerenceScoreResult } from "@/data/limerence";
import { generateLimerenceCard } from "@/lib/generate-quiz-card";

interface LimerenceShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: LimerenceScoreResult;
  lang: LimerenceLang;
}

export const LimerenceShareCardModal: React.FC<LimerenceShareCardModalProps> = ({
  isOpen,
  onClose,
  result,
  lang,
}) => {
  const [cardData, setCardData] = useState<{ dataUrl: string; blob: Blob; file: File } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateLimerenceCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Limerence card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error("Failed to generate story card.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, result, lang]);

  const handleDownload = () => {
    if (!cardData) return;
    const a = document.createElement("a");
    a.href = cardData.dataUrl;
    a.download = `ju-limerence-${result.level}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Story card saved to your device!");
  };

  const handleShare = async () => {
    if (!cardData) return;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          title: "My Limerence & Romantic Obsession Assessment",
          text: `My Limerence Profile: ${result.profile.title[lang] || result.profile.title.en} (${result.percentage}%). Screen your attachment and dopamine loops free:`,
          url: "https://nuju.app/quiz/limerence",
          files: [cardData.file],
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fallbackCopy();
        }
      }
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    navigator.clipboard.writeText("https://nuju.app/quiz/limerence");
    setIsCopied(true);
    toast.success("Assessment link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[92vw] bg-neutral-900 border-neutral-800 text-white p-6 rounded-3xl overflow-hidden shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTAGRAM & TIKTOK STORY</span>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            Share Your Limerence Card
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-xs leading-relaxed">
            Download or share your 1080x1350 HD story card to unpack romantic dopamine loops and heal relational obsession with friends.
          </DialogDescription>
        </DialogHeader>

        {/* Card Preview Area */}
        <div className="relative my-4 aspect-[4/5] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
              <span className="text-xs font-medium tracking-wide">Rendering HD Story Card...</span>
            </div>
          ) : cardData ? (
            <img
              src={cardData.dataUrl}
              alt="Limerence Card Preview"
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          ) : (
            <div className="text-xs text-neutral-500">Failed to render preview.</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleDownload}
            disabled={!cardData || isGenerating}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 active:scale-95 transition text-xs font-bold text-white border border-neutral-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handleShare}
            disabled={!cardData || isGenerating}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 active:scale-95 transition text-xs font-bold text-white shadow-lg shadow-rose-900/40 disabled:opacity-50"
          >
            {isCopied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
            <span>{isCopied ? "Link Copied!" : "Share Story"}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

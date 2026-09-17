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
import {
  ToxicIndependenceLang,
  ToxicIndependenceScoreResult,
} from "@/data/toxic-independence";
import { generateToxicIndependenceCard } from "@/lib/generate-quiz-card";

interface ToxicIndependenceShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ToxicIndependenceScoreResult;
  lang: ToxicIndependenceLang;
}

export const ToxicIndependenceShareCardModal: React.FC<
  ToxicIndependenceShareCardModalProps
> = ({ isOpen, onClose, result, lang }) => {
  const [cardData, setCardData] = useState<{
    dataUrl: string;
    blob: Blob;
    file: File;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateToxicIndependenceCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Toxic Independence card:", err);
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
    const link = document.createElement("a");
    link.download = `nuju-toxic-independence-${result.level}.png`;
    link.href = cardData.dataUrl;
    link.click();
    toast.success("Story card downloaded!");
  };

  const handleNativeShare = async () => {
    if (!cardData) return;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          title: "My Toxic Independence & Self-Reliance Score",
          text: `My Independence Load: ${result.percentage}% (${result.profile.title.en}). Screen your vulnerability avoidant score free on Nuju:`,
          files: [cardData.file],
        });
        toast.success("Shared successfully!");
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Share failed:", error);
          handleDownload();
        }
      }
    } else {
      handleDownload();
    }
  };

  const copyShareText = () => {
    const text = `My Toxic Independence & Counter-Dependency Score: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% self-reliance index - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your vulnerability blocks free at: https://nuju.app/quiz/toxic-independence`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Copied summary text to clipboard!");
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#1C1410] text-neutral-100 border-neutral-800 p-6 sm:p-8 rounded-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>1080 × 1350 Story Card</span>
          </div>
          <DialogTitle className="text-xl font-bold text-white tracking-tight">
            Share Your Independence Profile
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-400">
            Export a high-resolution story card with your counter-dependency level, somatic suppression breakdown, and interdependence protocol.
          </DialogDescription>
        </DialogHeader>

        {/* Card Preview Container */}
        <div className="my-4 flex items-center justify-center min-h-[360px] rounded-2xl bg-neutral-950/80 border border-neutral-800/80 p-2 overflow-hidden shadow-inner">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
              <span className="text-xs font-medium">Generating story card...</span>
            </div>
          ) : cardData ? (
            <img
              src={cardData.dataUrl}
              alt="Toxic Independence Story Card"
              className="max-h-[380px] w-auto rounded-xl object-contain shadow-2xl"
            />
          ) : (
            <div className="text-xs text-neutral-500">Failed to render preview.</div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleNativeShare}
            disabled={!cardData || isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition cursor-pointer disabled:opacity-50"
          >
            <Share2 className="h-4 w-4" />
            <span>Share to Instagram / TikTok Story</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              disabled={!cardData || isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs transition cursor-pointer disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5 text-orange-400" />
              <span>Save Image</span>
            </button>

            <button
              onClick={copyShareText}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs transition cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

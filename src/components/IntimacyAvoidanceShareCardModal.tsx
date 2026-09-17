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
  IntimacyAvoidanceLang,
  IntimacyAvoidanceScoreResult,
} from "@/data/intimacy-avoidance";
import { generateIntimacyAvoidanceCard } from "@/lib/generate-quiz-card";

interface IntimacyAvoidanceShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: IntimacyAvoidanceScoreResult;
  lang: IntimacyAvoidanceLang;
}

export const IntimacyAvoidanceShareCardModal: React.FC<
  IntimacyAvoidanceShareCardModalProps
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

    generateIntimacyAvoidanceCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Intimacy Avoidance card:", err);
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
    link.download = `nuju-intimacy-avoidance-${result.level}.png`;
    link.href = cardData.dataUrl;
    link.click();
    toast.success("Story card downloaded!");
  };

  const handleNativeShare = async () => {
    if (!cardData) return;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          title: "My Intimacy Anorexia & Emotional Guarding Score",
          text: `My Intimacy Resistance: ${result.percentage}% (${result.profile.title.en}). Screen your emotional intimacy blocks free on Nuju:`,
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
    const text = `My Intimacy Anorexia & Relational Guarding Score: ${
      result.profile.title[lang] || result.profile.title.en
    } (${result.percentage}% resistance index - ${
      result.profile.badge[lang] || result.profile.badge.en
    }). Screen your emotional intimacy blocks free at: https://nuju.app/quiz/intimacy-avoidance`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Copied summary text to clipboard!");
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#1C0E14] text-neutral-100 border-neutral-800 p-6 sm:p-8 rounded-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>1080 × 1350 Story Card</span>
          </div>
          <DialogTitle className="text-xl font-bold text-white tracking-tight">
            Share Your Intimacy Profile
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-400">
            Export a high-resolution story card with your affection resistance score, busyness shield index, and micro-vulnerability protocol.
          </DialogDescription>
        </DialogHeader>

        {/* Card Preview Container */}
        <div className="my-4 flex items-center justify-center min-h-[360px] rounded-2xl bg-neutral-950/80 border border-neutral-800/80 p-2 overflow-hidden shadow-inner">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <Loader2 className="h-8 w-8 animate-spin text-rose-400" />
              <span className="text-xs font-medium">Generating story card...</span>
            </div>
          ) : cardData ? (
            <img
              src={cardData.dataUrl}
              alt="Intimacy Avoidance Story Card"
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
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm bg-rose-600 hover:bg-rose-500 text-white transition shadow-lg shadow-rose-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 className="h-4 w-4" />
            <span>Share Story Card (IG / TikTok)</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownload}
              disabled={!cardData || isGenerating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-200 border border-neutral-700/60 transition disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>Save Image</span>
            </button>

            <button
              onClick={copyShareText}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-200 border border-neutral-700/60 transition"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

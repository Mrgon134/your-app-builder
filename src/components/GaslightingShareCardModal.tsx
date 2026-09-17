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
import { GaslightingLang, GaslightingScoreResult } from "@/data/gaslighting";
import { generateGaslightingCard } from "@/lib/generate-quiz-card";

interface GaslightingShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: GaslightingScoreResult;
  lang: GaslightingLang;
}

export const GaslightingShareCardModal: React.FC<GaslightingShareCardModalProps> = ({
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

    generateGaslightingCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Gaslighting card:", err);
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
    a.download = `nuju-gaslighting-${result.level}.png`;
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
          title: "My Psychological Gaslighting & Manipulation Screener Result",
          text: `My Gaslighting Radar Profile: ${result.profile.title[lang] || result.profile.title.en} (${result.percentage}% exposure index). Verify emotional reality free:`,
          url: "https://nuju.app/quiz/gaslighting",
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
    navigator.clipboard.writeText("https://nuju.app/quiz/gaslighting");
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
            <span>Instagram Story Ready (1080x1350)</span>
          </div>
          <DialogTitle className="text-xl font-bold text-white tracking-tight">
            Export Your Reality Check Card
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-400">
            Share your emotional manipulation exposure metrics, reality validation anchor, and boundary action plan.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center justify-center">
          {isGenerating ? (
            <div className="w-full aspect-[4/5] max-h-[380px] rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-rose-400 animate-spin" />
              <p className="text-xs text-neutral-400 font-medium">Synthesizing high-res card...</p>
            </div>
          ) : cardData ? (
            <div className="relative group w-full flex justify-center">
              <img
                src={cardData.dataUrl}
                alt="Gaslighting Profile Story Card"
                className="max-h-[380px] w-auto rounded-2xl shadow-xl border border-neutral-800 object-contain"
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/5] max-h-[380px] rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xs text-neutral-500">
              Card preview unavailable
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            disabled={!cardData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-medium text-sm transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download className="w-4 h-4" />
            <span>Save Image</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!cardData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 hover:opacity-90 active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-rose-500/20 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            <span>{isCopied ? "Link Copied!" : "Share / Story"}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import { SensoryLang, SensoryScoreResult } from "@/data/sensory-overload";
import { generateSensoryCard } from "@/lib/generate-quiz-card";

interface SensoryShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SensoryScoreResult;
  lang: SensoryLang;
}

export const SensoryShareCardModal: React.FC<SensoryShareCardModalProps> = ({
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

    generateSensoryCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Sensory card:", err);
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
    a.download = `ju-sensory-${result.level}.png`;
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
          title: "My Sensory Overload & Empathy Burnout Assessment",
          text: `My HSP Sensory Profile: ${result.profile.title[lang] || result.profile.title.en} (${result.percentage}%). Screen your nervous system sensitivity free:`,
          url: "https://nuju.app/quiz/sensory-overload",
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
    navigator.clipboard.writeText("https://nuju.app/quiz/sensory-overload");
    setIsCopied(true);
    toast.success("Assessment link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[92vw] bg-neutral-900 border-neutral-800 text-white p-6 rounded-3xl overflow-hidden shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTAGRAM & TIKTOK STORY</span>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            Share Your Sensory Profile Card
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-xs leading-relaxed">
            Download or share your 1080x1350 HD story card to unpack sensory processing sensitivity and celebrate healthy nervous system boundaries.
          </DialogDescription>
        </DialogHeader>

        {/* Card Preview Area */}
        <div className="relative my-4 aspect-[4/5] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              <span className="text-xs font-medium tracking-wide">Rendering HD Story Card...</span>
            </div>
          ) : cardData ? (
            <img
              src={cardData.dataUrl}
              alt="Sensory Card Preview"
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
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 active:scale-95 transition text-xs font-bold text-white shadow-lg shadow-teal-900/40 disabled:opacity-50"
          >
            {isCopied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
            <span>{isCopied ? "Link Copied!" : "Share Story"}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

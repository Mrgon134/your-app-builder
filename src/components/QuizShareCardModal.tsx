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
import { QuizMeta, QuizResult } from "@/data/quizzes";
import { generateQuizResultCard, GeneratedCardResult } from "@/lib/generate-quiz-card";

interface QuizShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: QuizMeta;
  result: QuizResult;
}

export const QuizShareCardModal: React.FC<QuizShareCardModalProps> = ({
  isOpen,
  onClose,
  quiz,
  result,
}) => {
  const [cardData, setCardData] = useState<GeneratedCardResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateQuizResultCard(quiz, result)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating share card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error("Gagal membuat gambar kartu hasil. Coba lagi.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, quiz, result]);

  const handleDownload = () => {
    if (!cardData) return;
    const link = document.createElement("a");
    link.href = cardData.dataUrl;
    link.download = `nuju-${quiz.slug}-${result.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Gambar berhasil diunduh! Siap diposting ke Story / Status.");
  };

  const handleNativeShare = async () => {
    if (!cardData) return;

    const shareUrl = `https://nuju.app/quiz/${quiz.slug}`;
    const shareText = `${result.shareSummaryText}\n\nCek kondisi emosimu di: ${shareUrl}`;

    // Check if navigator supports file sharing (iOS Safari, Android Chrome)
    if (
      typeof navigator !== "undefined" &&
      navigator.canShare &&
      navigator.canShare({ files: [cardData.file] })
    ) {
      try {
        await navigator.share({
          title: `Hasil Tes: ${result.title} - Nuju`,
          text: shareText,
          files: [cardData.file],
        });
        toast.success("Berhasil membuka menu bagikan!");
        return;
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.warn("Share failed, falling back to download:", err);
        } else {
          return;
        }
      }
    }

    // Fallback: Download image and copy text
    handleDownload();
    try {
      await navigator.clipboard.writeText(shareText);
      toast.info("Test results text has been automatically copied to clipboard.");
    } catch {
      // ignore clipboard error
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = `https://nuju.app/quiz/${quiz.slug}`;
    const textToCopy = `${result.shareSummaryText}\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success("Link and results summary copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg p-5 sm:p-6 overflow-hidden rounded-3xl bg-[#FAF8F5] border-neutral-200">
        <DialogHeader className="text-center sm:text-center pb-2">
          <div className="mx-auto mb-1 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200/60 w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Your Shareable Results Card</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
            Save Your Test Results Card
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-neutral-500">
            High-resolution aesthetic 4:5 format (1080×1350) perfect for Instagram Story, WhatsApp Status, and Twitter.
          </DialogDescription>
        </DialogHeader>

        {/* Card Image Preview */}
        <div className="relative my-2 flex items-center justify-center">
          {isGenerating ? (
            <div className="flex aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-amber-600 mb-3" />
              <p className="text-xs font-semibold text-neutral-600">
               Crafting your aesthetic results card...
              </p>
            </div>
          ) : cardData ? (
            <div className="group relative w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-2xl border border-neutral-300/80 bg-white shadow-md transition-transform duration-200 hover:scale-[1.01]">
              <img
                src={cardData.dataUrl}
                alt={`Test Results: ${result.title}`}
                className="h-auto w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/5] w-full max-w-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-6">
              <p className="text-xs text-neutral-500">Failed to load image preview</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleNativeShare}
              disabled={isGenerating || !cardData}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-amber-700 active:scale-[0.98] transition disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Share to Story / WhatsApp</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating || !cardData}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-neutral-800 shadow-2xs hover:bg-neutral-50 active:scale-[0.98] transition disabled:opacity-50"
            >
              <Download className="h-4 w-4 text-neutral-600" />
              <span>Download Image (PNG)</span>
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-100/80 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-200/70 transition"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link & Text Copied Successfully!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Text & Results Link</span>
              </>
            )}
          </button>
        </div>

        {/* User Tip */}
        <p className="text-center text-[11px] text-neutral-400 pt-1">
          💡 <em>Tip: On mobile, you can also press & hold the image above to <strong>Save to Photos</strong>.</em>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default QuizShareCardModal;

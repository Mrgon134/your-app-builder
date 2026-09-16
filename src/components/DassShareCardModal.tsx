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
import { DassEvaluationResult, SupportedLang } from "@/data/dass21";
import { generateDass21Card, GeneratedCardResult } from "@/lib/generate-quiz-card";

interface DassShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DassEvaluationResult;
  lang: SupportedLang;
}

export const DassShareCardModal: React.FC<DassShareCardModalProps> = ({
  isOpen,
  onClose,
  result,
  lang,
}) => {
  const [cardData, setCardData] = useState<GeneratedCardResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateDass21Card(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating DASS-21 card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error(
            lang === "en"
              ? "Failed to generate share image card. Please try again."
              : "Gagal membuat gambar kartu hasil. Coba lagi."
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, result, lang]);

  const handleDownload = () => {
    if (!cardData) return;
    const link = document.createElement("a");
    link.href = cardData.dataUrl;
    link.download = `nuju-dass21-${result.wellnessIndex}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(
      lang === "en"
        ? "Scorecard downloaded! Ready for Instagram Story / WhatsApp status."
        : "Gambar berhasil diunduh! Siap diposting ke Story / Status."
    );
  };

  const handleNativeShare = async () => {
    if (!cardData) return;

    const shareUrl = "https://nuju.app/quiz/mental-health-test";
    const shareText = `${result.shareSummaryText}\n\n${shareUrl}`;

    if (
      typeof navigator !== "undefined" &&
      navigator.canShare &&
      navigator.canShare({ files: [cardData.file] })
    ) {
      try {
        await navigator.share({
          title: `DASS-21 Result: ${result.title} - Nuju`,
          text: shareText,
          files: [cardData.file],
        });
        toast.success(lang === "en" ? "Shared successfully!" : "Berhasil membuka menu bagikan!");
        return;
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.warn("Share failed, falling back to download:", err);
        } else {
          return;
        }
      }
    }

    // Fallback: download and copy text
    handleDownload();
    try {
      await navigator.clipboard.writeText(shareText);
      toast.info(
        lang === "en"
          ? "Image downloaded & share summary copied to clipboard!"
          : "Gambar terunduh & teks ringkasan disalin ke clipboard!"
      );
    } catch {
      // ignore
    }
  };

  const handleCopyLink = () => {
    const textToCopy = `${result.shareSummaryText}\n\nhttps://nuju.app/quiz/mental-health-test`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    toast.success(
      lang === "en" ? "Result text copied to clipboard!" : "Teks hasil tes disalin ke clipboard!"
    );
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-[92vw] sm:w-full p-0 overflow-hidden rounded-3xl border border-neutral-200/80 bg-[#FAF9F6] shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-2 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-2">
            <Sparkles className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl font-bold text-neutral-900">
            {lang === "en" ? "Share Your Mental Checkup" : "Bagikan Hasil Tes Kamu"}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            {lang === "en"
              ? "Crisp 1080×1350px scorecard ready for Instagram Story, X, or WhatsApp."
              : "Format kartu 1080×1350px siap diposting ke Instagram Stories, X, atau status."}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-3 flex flex-col items-center">
          {/* Card Preview Container */}
          <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-neutral-200/80 bg-neutral-100 flex items-center justify-center">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-2 text-neutral-500 p-4 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                <span className="text-xs font-medium">
                  {lang === "en" ? "Designing scorecard..." : "Sedang merender kartu grafis..."}
                </span>
              </div>
            ) : cardData ? (
              <img
                src={cardData.dataUrl}
                alt="DASS-21 Result Card"
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <span className="text-xs text-neutral-400">
                {lang === "en" ? "Preview unavailable" : "Gagal memuat pratinjau"}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full mt-5 space-y-2.5">
            <button
              onClick={handleNativeShare}
              disabled={isGenerating || !cardData}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 transition disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span>{lang === "en" ? "Share Image (Story / Status)" : "Bagikan Gambar (Story / Status)"}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownload}
                disabled={isGenerating || !cardData}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300/80 bg-white px-3 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{lang === "en" ? "Download PNG" : "Unduh Gambar"}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-300/80 bg-white px-3 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition"
              >
                {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopied ? (lang === "en" ? "Copied!" : "Tersalin!") : (lang === "en" ? "Copy Text" : "Salin Teks")}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-neutral-50/80 border-t border-neutral-200/60 text-center">
          <p className="text-[11px] text-neutral-400">
            {lang === "en"
              ? "🔒 100% Private. Your answers and scores are calculated locally in your browser."
              : "🔒 100% Privat. Jawaban dan skormu dihitung langsung di peramban tanpa disimpan di server."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DassShareCardModal;

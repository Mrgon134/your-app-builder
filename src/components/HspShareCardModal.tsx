import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Share2, Copy, Check, Sparkles, Loader2, Feather } from "lucide-react";
import { toast } from "sonner";
import { HspLang } from "@/data/hsp";
import { generateHspCard, HspCardInput } from "@/lib/generate-quiz-card";

interface HspShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: HspCardInput;
  lang: HspLang;
}

export const HspShareCardModal: React.FC<HspShareCardModalProps> = ({
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

    generateHspCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating HSP card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error("Failed to generate share image card.");
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
    a.download = `ju-hsp-${result.level}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(lang === "id" ? "Kartu berhasil diunduh!" : "Card downloaded successfully!");
  };

  const handleNativeShare = async () => {
    if (!cardData) return;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          title: "My Highly Sensitive Person (HSP) Screener Result",
          text: `My sensitivity profile: ${result.profile.title[lang]} (${result.profile.badge[lang]}). Screen your sensitivity trait on Ju:`,
          url: "https://www.nuju.app/quiz/hsp",
          files: [cardData.file],
        });
        toast.success(lang === "id" ? "Berhasil dibagikan!" : "Shared successfully!");
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.warn("Share failed, falling back to copy", err);
        } else {
          return;
        }
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText("https://www.nuju.app/quiz/hsp");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
        toast.success(lang === "id" ? "Link berhasil disalin!" : "Link copied to clipboard!");
      } catch (e) {
        toast.error("Could not copy link.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border border-pink-500/30 p-6 rounded-3xl shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Feather className="w-4 h-4" />
            <span>Story Share Card (1080 x 1350)</span>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
            {lang === "id" ? "Bagikan Hasil Tes HSP Anda" : "Share Your HSP Profile"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {lang === "id"
              ? "Kartu visual resolusi tinggi untuk Instagram Story, TikTok, atau WhatsApp."
              : "High-resolution graphic formatted for Instagram Stories, TikTok, or WhatsApp status."}
          </DialogDescription>
        </DialogHeader>

        <div className="my-3 flex flex-col items-center justify-center">
          {isGenerating ? (
            <div className="w-full aspect-[4/5] rounded-2xl bg-muted/20 border border-border/40 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-pink-400 animate-spin" />
              <p className="text-xs font-medium text-muted-foreground animate-pulse">
                {lang === "id" ? "Merender kartu resolusi tinggi..." : "Rendering story graphic..."}
              </p>
            </div>
          ) : cardData ? (
            <div className="w-full relative group rounded-2xl overflow-hidden shadow-xl border border-pink-500/20">
              <img
                src={cardData.dataUrl}
                alt="HSP Story Share Card"
                className="w-full h-auto object-cover max-h-[380px] rounded-2xl"
              />
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-destructive">
              Failed to load card.
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleDownload}
            disabled={!cardData || isGenerating}
            className="w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-pink-500/20 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{lang === "id" ? "Unduh PNG" : "Download PNG"}</span>
          </button>

          <button
            onClick={handleNativeShare}
            disabled={!cardData || isGenerating}
            className="w-full py-3 px-4 rounded-xl bg-muted/40 hover:bg-muted/70 text-foreground font-bold text-xs border border-border/50 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{lang === "id" ? "Disalin!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-pink-400" />
                <span>{lang === "id" ? "Bagikan" : "Share Story"}</span>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HspShareCardModal;

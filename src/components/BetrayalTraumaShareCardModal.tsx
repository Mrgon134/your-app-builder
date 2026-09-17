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
import { BetrayalTraumaLang, BetrayalTraumaScoreResult } from "@/data/betrayal-trauma";
import { generateBetrayalTraumaCard } from "@/lib/generate-quiz-card";

interface BetrayalTraumaShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: BetrayalTraumaScoreResult;
  lang: BetrayalTraumaLang;
}

export const BetrayalTraumaShareCardModal: React.FC<BetrayalTraumaShareCardModalProps> = ({
  isOpen,
  onClose,
  result,
  lang,
}) => {
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

    generateBetrayalTraumaCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Betrayal Trauma card:", err);
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
    link.href = cardData.dataUrl;
    link.download = `nuju-betrayal-trauma-${result.level}.png`;
    link.click();
    toast.success("Card downloaded successfully!");
  };

  const handleShare = async () => {
    if (!cardData) return;

    if (navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          files: [cardData.file],
          title: "My Betrayal Trauma Diagnostic Breakdown",
          text: `I took the Betrayal Trauma & Betrayal Blindness Screener on Nuju. My Profile: ${result.profile.title[lang] || result.profile.title.en} (${result.percentage}% impact).`,
        });
        toast.success("Shared successfully!");
        return;
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.error("Native share failed:", err);
        }
      }
    }

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [cardData.blob.type]: cardData.blob,
        }),
      ]);
      setIsCopied(true);
      toast.success("Card copied to clipboard! Paste it anywhere.");
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      handleDownload();
    }
  };

  const labels = {
    title: {
      en: "Share Your Diagnostic Card",
      id: "Bagikan Kartu Diagnostik",
      de: "Ergebniskarte teilen",
      fr: "Partager votre fiche diagnostic",
      es: "Compartir tu tarjeta de diagnóstico",
    },
    desc: {
      en: "High-resolution 9:16 format designed for Instagram Stories, TikTok, and WhatsApp status.",
      id: "Format 9:16 resolusi tinggi yang dirancang untuk Instagram Story, WhatsApp Status, dan TikTok.",
      de: "Hochauflösendes 9:16-Format für Instagram Stories, WhatsApp und TikTok.",
      fr: "Format 9:16 haute résolution pour vos stories Instagram et statuts WhatsApp.",
      es: "Formato 9:16 de alta resolución para Instagram Stories, WhatsApp y TikTok.",
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-neutral-950 text-white border-neutral-800 p-6 rounded-3xl">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-rose-400" />
            {labels.title[lang] || labels.title.en}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-400">
            {labels.desc[lang] || labels.desc.en}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center min-h-[380px] bg-neutral-900/60 rounded-2xl p-4 border border-neutral-800/80 relative overflow-hidden">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <Loader2 className="h-9 w-9 animate-spin text-rose-400" />
              <span className="text-xs text-neutral-400 tracking-wide font-medium">
                Rendering neuro-metric graphics...
              </span>
            </div>
          ) : cardData ? (
            <div className="relative group max-h-[460px] flex items-center justify-center">
              <img
                src={cardData.dataUrl}
                alt="Betrayal Trauma Assessment Story Card"
                className="max-h-[440px] w-auto rounded-xl shadow-2xl border border-neutral-800 object-contain"
              />
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleDownload}
            disabled={isGenerating || !cardData}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-neutral-300" />
            Download PNG
          </button>
          <button
            onClick={handleShare}
            disabled={isGenerating || !cardData}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition disabled:opacity-50"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-white" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-white" />
                Share to Story
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

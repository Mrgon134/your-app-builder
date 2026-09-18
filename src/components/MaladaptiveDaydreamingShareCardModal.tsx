import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateMaladaptiveDaydreamingCard,
  MaladaptiveDaydreamingScoreResult,
  MaladaptiveDaydreamingCardLang,
} from "@/lib/generate-quiz-card";

interface MaladaptiveDaydreamingShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MaladaptiveDaydreamingScoreResult;
  lang: MaladaptiveDaydreamingCardLang;
}

export const MaladaptiveDaydreamingShareCardModal: React.FC<MaladaptiveDaydreamingShareCardModalProps> = ({
  isOpen,
  onClose,
  result,
  lang,
}) => {
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardPreview, setCardPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setGenerating(true);
      generateMaladaptiveDaydreamingCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Maladaptive Daydreaming card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { file } = await generateMaladaptiveDaydreamingCard(result, lang);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nuju-maladaptive-daydreaming-${result.level}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generateMaladaptiveDaydreamingCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Maladaptive Daydreaming Screener Result | Nuju",
          text: `My Maladaptive Daydreaming Immersion is ${result.percentage}%. Screen your fantasy habits free on Nuju:`,
          url: "https://nuju.app/quiz/maladaptive-daydreaming",
        });
      } else {
        await handleDownload();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://nuju.app/quiz/maladaptive-daydreaming");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#130D2E] to-[#070414] p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:bg-white/10 hover:text-white transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Story Ready · 9:16 Canvas</span>
          </div>
          <h3 className="text-lg font-bold">
            {lang === "id" ? "Bagikan Hasil Daydreaming Anda" : "Share Your Daydreaming Profile"}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            {lang === "id"
              ? "Download kartu estetis ini untuk Instagram Story, TikTok, atau WhatsApp Status."
              : "Download this aesthetic 1080x1350 card for your Instagram Story or TikTok."}
          </p>
        </div>

        {/* Card Preview */}
        <div className="relative mx-auto my-4 aspect-[4/5] max-h-[380px] w-auto overflow-hidden rounded-2xl border border-purple-500/30 shadow-inner bg-black/40 flex items-center justify-center">
          {generating || !cardPreview ? (
            <div className="flex flex-col items-center gap-2 text-xs text-purple-300">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
              <span>Generating card...</span>
            </div>
          ) : (
            <img
              src={cardPreview}
              alt="Maladaptive Daydreaming Result Card"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{lang === "id" ? "Download Kartu Gambar" : "Download Story Card"}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleShare}
              disabled={generating}
              className="flex-1 flex items-center justify-center gap-2 rounded-full border border-purple-500/40 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition disabled:opacity-50"
            >
              <Share2 className="h-3.5 w-3.5 text-purple-400" />
              <span>{lang === "id" ? "Share Langsung" : "Native Share"}</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 rounded-full border border-stone-700 bg-white/5 py-2.5 text-xs font-semibold text-stone-300 hover:bg-white/10 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-stone-400" />}
              <span>{copied ? (lang === "id" ? "Tersalin!" : "Copied!") : (lang === "id" ? "Salin Link" : "Copy Link")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

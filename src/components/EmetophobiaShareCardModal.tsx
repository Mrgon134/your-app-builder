import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateEmetophobiaCard,
  EmetophobiaScoreResult,
  EmetophobiaCardLang,
} from "@/lib/generate-quiz-card";

interface EmetophobiaShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EmetophobiaScoreResult;
  lang: EmetophobiaCardLang;
}

export const EmetophobiaShareCardModal: React.FC<EmetophobiaShareCardModalProps> = ({
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
      generateEmetophobiaCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Emetophobia card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { dataUrl } = await generateEmetophobiaCard(result, lang);
      const link = document.createElement("a");
      link.download = `nuju-emetophobia-${result.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading card:", err);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generateEmetophobiaCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Emetophobia & Visceral Sensitivity Profile (Veale SPOVI)",
          text: `I took the Emetophobia (Specific Phobia of Vomiting) Screener on Nuju. My phobia index is ${result.percentage}%. Screen yours free at:`,
          url: "https://nuju.app/quiz/emetophobia",
          files: [file],
        });
      } else {
        await handleCopyLink();
      }
    } catch (err) {
      console.error("Error sharing card:", err);
      handleDownload();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://nuju.app/quiz/emetophobia");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-sky-800/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
            Share Story Card · Card #110 (1080x1350)
          </span>
        </div>

        <h3 className="text-xl font-bold text-white text-center mb-1">
          {lang === "id" ? "Kartu Hasil Emetofobia" : "Your Emetophobia Story Card"}
        </h3>
        <p className="text-xs text-neutral-400 text-center mb-5 max-w-xs">
          {lang === "id"
            ? "Simpan dan bagikan kartu estetis resolusi tinggi ini ke Instagram Story atau temanmu."
            : "High-resolution story card formatted for Instagram, WhatsApp, or TikTok."}
        </p>

        {/* Card Preview Container */}
        <div className="relative w-full aspect-[4/5] max-h-[380px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner mb-6">
          {generating ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-neutral-400 font-medium">
                {lang === "id" ? "Membuat kartu cerita..." : "Rendering clinical card..."}
              </span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Emetophobia Profile Card"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xs text-neutral-500">Failed to load preview</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-neutral-950 font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{lang === "id" ? "Unduh PNG" : "Download PNG"}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={generating}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white font-semibold text-sm border border-neutral-700 shadow-md transition disabled:opacity-50"
          >
            <Share2 className="w-4 h-4 text-sky-400" />
            <span>{lang === "id" ? "Bagikan" : "Share"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition relative"
            title="Copy test link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {copied && (
          <span className="text-xs text-emerald-400 font-medium mt-3 animate-fade-in">
            {lang === "id" ? "Tautan berhasil disalin ke papan klip!" : "Link copied to clipboard!"}
          </span>
        )}
      </div>
    </div>
  );
};

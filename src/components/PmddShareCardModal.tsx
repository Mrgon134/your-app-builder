import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generatePmddCard,
  PmddScoreResult,
  PmddCardLang,
} from "@/lib/generate-quiz-card";

interface PmddShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PmddScoreResult;
  lang: PmddCardLang;
}

export const PmddShareCardModal: React.FC<PmddShareCardModalProps> = ({
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
      generatePmddCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate PMDD card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { dataUrl } = await generatePmddCard(result, lang);
      const link = document.createElement("a");
      link.download = `nuju-pmdd-${result.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading card:", err);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generatePmddCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Premenstrual Dysphoric Disorder (PMDD) Profile (Steiner DRSP)",
          text: `I took the Premenstrual Dysphoric Disorder (PMDD) Screener on Nuju. My luteal vulnerability index is ${result.percentage}%. Screen yours free at:`,
          url: "https://nuju.app/quiz/pmdd",
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
      await navigator.clipboard.writeText("https://nuju.app/quiz/pmdd");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-fuchsia-800/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
            Share Story Card · Card #109 (1080x1350)
          </span>
        </div>

        <h3 className="text-xl font-bold text-white text-center mb-1">
          {lang === "id" ? "Kartu Hasil PMDD & Disforia Luteal" : "Your PMDD Story Card"}
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
              <div className="w-8 h-8 border-3 border-fuchsia-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-neutral-400 font-medium">
                {lang === "id" ? "Membuat kartu cerita..." : "Rendering clinical card..."}
              </span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Premenstrual Dysphoric Disorder Profile Card"
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
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 active:scale-95 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{lang === "id" ? "Unduh PNG" : "Download PNG"}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={generating}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white font-semibold text-sm border border-neutral-700 shadow-md transition disabled:opacity-50"
          >
            <Share2 className="w-4 h-4 text-fuchsia-400" />
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

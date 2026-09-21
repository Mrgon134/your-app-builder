import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateAcrophobiaCard,
  AcrophobiaScoreResult,
  AcrophobiaCardLang,
} from "@/lib/generate-quiz-card";

interface AcrophobiaShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AcrophobiaScoreResult;
  lang: AcrophobiaCardLang;
}

export const AcrophobiaShareCardModal: React.FC<AcrophobiaShareCardModalProps> = ({
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
      generateAcrophobiaCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Acrophobia card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { dataUrl } = await generateAcrophobiaCard(result, lang);
      const link = document.createElement("a");
      link.download = `nuju-acrophobia-${result.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading card:", err);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generateAcrophobiaCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Acrophobia & Height Vertigo Profile (Cohen AQ Model)",
          text: `I took the Acrophobia Screener on Nuju. My height vertigo vulnerability index is ${result.percentage}%. Screen yours free at:`,
          url: "https://nuju.app/quiz/acrophobia",
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
      await navigator.clipboard.writeText("https://nuju.app/quiz/acrophobia");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-amber-800/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Share Story Card · Card #114 (1080x1350)
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-white text-center mb-1">
          {result.profile.title[lang] || result.profile.title.en}
        </h3>
        <p className="text-xs text-neutral-400 text-center mb-4">
          Visualizing Cohen AQ: Visual Height Intolerance & Postural Ataxia
        </p>

        {/* Card Preview */}
        <div className="relative w-full aspect-[4/5] max-h-[360px] rounded-2xl overflow-hidden bg-neutral-950 border border-amber-900/50 shadow-inner flex items-center justify-center mb-5">
          {generating ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-medium text-amber-300">Rendering 1080x1350 Story Card...</span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Acrophobia Story Card Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xs text-neutral-500">Failed to generate preview</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full mb-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-lg shadow-amber-600/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download Card
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition active:scale-95 border border-white/10"
          >
            <Share2 className="w-4 h-4" />
            Share / Instagram
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition border border-neutral-700/50"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Test URL (nuju.app/quiz/acrophobia)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

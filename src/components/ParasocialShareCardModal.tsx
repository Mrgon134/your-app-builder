import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateParasocialCard,
  ParasocialScoreResult,
  ParasocialCardLang,
} from "@/lib/generate-quiz-card";

interface ParasocialShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ParasocialScoreResult;
  lang: ParasocialCardLang;
}

export const ParasocialShareCardModal: React.FC<ParasocialShareCardModalProps> = ({
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
      generateParasocialCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Parasocial card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { dataUrl } = await generateParasocialCard(result, lang);
      const link = document.createElement("a");
      link.download = `nuju-parasocial-${result.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading card:", err);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generateParasocialCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Parasocial Attachment & Digital Intimacy Profile",
          text: `I took the Parasocial Attachment & Digital Intimacy Screener (Horton & Wohl PSI Model) on Nuju. My parasocial attachment index is ${result.percentage}%. Screen yours free at:`,
          url: "https://nuju.app/quiz/parasocial-relationship",
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
      await navigator.clipboard.writeText("https://nuju.app/quiz/parasocial-relationship");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-cyan-800/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Share Story Card · Card #105 (1080x1350)
          </span>
        </div>

        <h3 className="text-xl font-bold text-white text-center mb-1">
          {lang === "id" ? "Kartu Hubungan Parasosial" : "Your Parasocial Attachment Story Card"}
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
              <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-neutral-400 font-medium">
                {lang === "id" ? "Membuat kartu cerita..." : "Rendering clinical card..."}
              </span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Parasocial Story Card Preview"
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <span className="text-xs text-red-400">Failed to generate preview</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full mb-3">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition border border-neutral-700 disabled:opacity-50 shadow-sm"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{lang === "id" ? "Download PNG" : "Download PNG"}</span>
          </button>

          <button
            onClick={handleShare}
            disabled={generating}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold transition shadow-md disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>{lang === "id" ? "Bagikan Card" : "Share Card"}</span>
          </button>
        </div>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-1.5 py-2 text-xs text-neutral-400 hover:text-neutral-200 transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">
                {lang === "id" ? "Tautan tes tersalin!" : "Quiz link copied!"}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Salin tautan tes" : "Copy quiz link"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateAgoraphobiaCard,
  AgoraphobiaScoreResult,
  AgoraphobiaCardLang,
} from "@/lib/generate-quiz-card";

interface AgoraphobiaShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AgoraphobiaScoreResult;
  lang: AgoraphobiaCardLang;
}

export const AgoraphobiaShareCardModal: React.FC<AgoraphobiaShareCardModalProps> = ({
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
      generateAgoraphobiaCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Agoraphobia card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { dataUrl } = await generateAgoraphobiaCard(result, lang);
      const link = document.createElement("a");
      link.download = `nuju-agoraphobia-${result.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading card:", err);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generateAgoraphobiaCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Agoraphobia & Spatial Anxiety Profile",
          text: `I took the Agoraphobia & Panic Escape Dread Screener on Nuju. My panic avoidance index is ${result.percentage}%. Screen your spatial comfort zone at:`,
          url: "https://nuju.app/quiz/agoraphobia",
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
      await navigator.clipboard.writeText("https://nuju.app/quiz/agoraphobia");
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
            Share Story Card (1080x1350)
          </span>
        </div>

        <h3 className="text-lg font-bold text-white text-center mb-4">
          {result.profile.title[lang] || result.profile.title.en}
        </h3>

        {/* Card Preview */}
        <div className="w-full max-h-[440px] aspect-[4/5] bg-black/50 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center relative mb-6">
          {generating ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-neutral-400">Rendering visual card...</span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Agoraphobia Story Card Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xs text-neutral-500">Failed to load preview</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition shadow-md disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Save Image</span>
          </button>

          <button
            onClick={handleShare}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition border border-white/20 disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Story</span>
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="mt-3 flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition py-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Link Copied to Clipboard!" : "Copy Test Link"}</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateRepressedAngerCard,
  RepressedAngerScoreResult,
  RepressedAngerCardLang,
} from "@/lib/generate-quiz-card";

interface RepressedAngerShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RepressedAngerScoreResult;
  lang: RepressedAngerCardLang;
}

export const RepressedAngerShareCardModal: React.FC<RepressedAngerShareCardModalProps> = ({
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
      generateRepressedAngerCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Repressed Anger card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { file } = await generateRepressedAngerCard(result, lang);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nuju-repressed-anger-${result.level}.png`;
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
      const { file } = await generateRepressedAngerCard(result, lang);
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Repressed Anger Screener Result",
          text: `My Repressed Anger Load: ${result.percentage}% (${result.profile.badge[lang] || result.profile.badge.en}). Screen your somatic rage:`,
          url: "https://nuju.app/quiz/repressed-anger",
          files: [file],
        });
      } else {
        handleDownload();
      }
    } catch (e) {
      console.error(e);
      handleDownload();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://nuju.app/quiz/repressed-anger");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-red-800/40 bg-stone-900 p-6 shadow-2xl text-stone-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-red-400" />
          <h3 className="font-bold text-lg text-white">Your Repressed Anger Share Card</h3>
        </div>

        {/* Card Preview Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 flex items-center justify-center shadow-inner">
          {generating ? (
            <div className="flex flex-col items-center gap-3 text-stone-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              <span className="text-xs tracking-wider uppercase font-medium">
                Rendering Story Card...
              </span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Repressed Anger Share Card"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-xs text-stone-500">Preview not available</span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownload}
              disabled={generating || !cardPreview}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-red-500 disabled:opacity-50 transition"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>

            <button
              onClick={handleShare}
              disabled={generating || !cardPreview}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800 px-4 py-3 text-sm font-semibold text-stone-200 hover:bg-stone-700 hover:text-white disabled:opacity-50 transition"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Story</span>
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-xs font-medium text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Link Copied to Clipboard!" : "Copy Test Link"}</span>
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-stone-500">
          Perfect for Instagram Stories (9:16 / 4:5 format) & private WhatsApp sharing
        </p>
      </div>
    </div>
  );
};

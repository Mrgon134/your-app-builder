import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateDpdrCard,
  DpdrScoreResult,
  DpdrCardLang,
} from "@/lib/generate-quiz-card";

interface DpdrShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DpdrScoreResult;
  lang: DpdrCardLang;
}

export const DpdrShareCardModal: React.FC<DpdrShareCardModalProps> = ({
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
      generateDpdrCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate DPDR card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { file } = await generateDpdrCard(result, lang);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nuju-dpdr-${result.level}.png`;
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
      const { file } = await generateDpdrCard(result, lang);
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My DPDR Reality State Screener Result",
          text: `My DPDR Dissociative Load: ${result.percentage}% (${result.profile.badge[lang] || result.profile.badge.en}). Screen your sensory reality state:`,
          url: "https://nuju.app/quiz/dpdr",
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
    navigator.clipboard.writeText("https://nuju.app/quiz/dpdr");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-purple-800/40 bg-stone-900 p-6 shadow-2xl text-stone-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h3 className="font-bold text-lg text-white">Your DPDR Share Card</h3>
        </div>

        {/* Card preview container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-purple-800/40 bg-stone-950 mb-6 flex items-center justify-center">
          {generating ? (
            <div className="flex flex-col items-center gap-2 text-stone-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
              <span className="text-xs font-medium">Generating high-res card...</span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="DPDR Result Card Preview"
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-xs text-stone-500">Failed to render preview</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition shadow-sm disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Save Image</span>
          </button>

          <button
            onClick={handleShare}
            disabled={generating}
            className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/40 px-4 py-3 text-sm font-semibold text-purple-200 hover:bg-purple-900/50 transition disabled:opacity-50"
          >
            <Share2 className="h-4 w-4" />
            <span>Story Share</span>
          </button>
        </div>

        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-xs font-medium text-stone-300 hover:bg-stone-800 transition"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-stone-400" />}
          <span>{copied ? "Link copied to clipboard!" : "Copy Test Link (nuju.app/quiz/dpdr)"}</span>
        </button>
      </div>
    </div>
  );
};
export default DpdrShareCardModal;

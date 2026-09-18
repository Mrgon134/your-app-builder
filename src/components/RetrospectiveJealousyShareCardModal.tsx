import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateRetrospectiveJealousyCard,
  RetrospectiveJealousyScoreResult,
  RetrospectiveJealousyCardLang,
} from "@/lib/generate-quiz-card";

interface RetrospectiveJealousyShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RetrospectiveJealousyScoreResult;
  lang: RetrospectiveJealousyCardLang;
}

export const RetrospectiveJealousyShareCardModal: React.FC<RetrospectiveJealousyShareCardModalProps> = ({
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
      generateRetrospectiveJealousyCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Retrospective Jealousy card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { dataUrl } = await generateRetrospectiveJealousyCard(result, lang);
      const link = document.createElement("a");
      link.download = `nuju-retrospective-jealousy-${result.level}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading card:", err);
    }
  };

  const handleShare = async () => {
    try {
      const { file } = await generateRetrospectiveJealousyCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Retrospective Jealousy & Romantic Past Profile",
          text: `I took the Retrospective Jealousy & Partner Past Screener on Nuju. My retroactive OCD burden index is ${result.percentage}%. Screen your past triggers at:`,
          url: "https://nuju.app/quiz/retrospective-jealousy",
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
      await navigator.clipboard.writeText("https://nuju.app/quiz/retrospective-jealousy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-neutral-900 border border-rose-800/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
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
              <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-neutral-400">Rendering high-res card...</span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Retrospective Jealousy Story Card Preview"
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
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-md disabled:opacity-50"
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

        {/* Copy Direct Link */}
        <button
          onClick={handleCopyLink}
          className="w-full mt-3 py-2 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition flex items-center justify-center gap-2 border border-white/5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy test link: nuju.app/quiz/retrospective-jealousy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateFunctionalFreezeCard,
  FunctionalFreezeScoreResult,
  FunctionalFreezeLang,
} from "@/lib/generate-quiz-card";

interface FunctionalFreezeShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: FunctionalFreezeScoreResult;
  lang: FunctionalFreezeLang;
}

export const FunctionalFreezeShareCardModal: React.FC<FunctionalFreezeShareCardModalProps> = ({
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
      generateFunctionalFreezeCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate freeze card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { file } = await generateFunctionalFreezeCard(result, lang);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nuju-functional-freeze-${result.level}.png`;
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
      const { file } = await generateFunctionalFreezeCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Functional Freeze Profile • Nuju",
          text: `My Functional Freeze Index is ${result.percentage}% (${result.profile.badge[lang] || result.profile.badge.en}). Screen your somatic nervous system on Nuju: https://nuju.app/quiz/functional-freeze`,
        });
      } else {
        await navigator.clipboard.writeText(
          `My Functional Freeze Index is ${result.percentage}% (${result.profile.badge[lang] || result.profile.badge.en}). Screen your somatic freeze state on Nuju: https://nuju.app/quiz/functional-freeze`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-stone-900 border border-sky-500/30 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 text-stone-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Instagram Story & Social Badge</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-4">
          Share Your Somatic State
        </h3>

        <div className="relative flex-1 min-h-[360px] bg-stone-950 rounded-2xl overflow-hidden flex items-center justify-center border border-stone-800">
          {generating ? (
            <div className="flex flex-col items-center gap-3 text-stone-400">
              <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Rendering high-res somatic card...</p>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Functional Freeze Share Card"
              className="max-h-[60vh] object-contain rounded-xl shadow-lg"
            />
          ) : (
            <p className="text-sm text-stone-500">Failed to render card preview</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-semibold transition-all duration-150 border border-stone-700 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Save Image</span>
          </button>
          <button
            onClick={handleShare}
            disabled={generating}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/20 transition-all duration-150 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Story</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

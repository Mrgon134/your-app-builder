import React, { useState } from "react";
import { Download, Share2, Sparkles, X, Check, Copy } from "lucide-react";
import {
  generateThanatophobiaCard,
  ThanatophobiaScoreResult,
  ThanatophobiaCardLang,
} from "@/lib/generate-quiz-card";

interface ThanatophobiaShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ThanatophobiaScoreResult;
  lang: ThanatophobiaCardLang;
}

export const ThanatophobiaShareCardModal: React.FC<ThanatophobiaShareCardModalProps> = ({
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
      generateThanatophobiaCard(result, lang)
        .then(({ dataUrl }) => {
          setCardPreview(dataUrl);
        })
        .catch((err) => {
          console.error("Failed to generate Thanatophobia card:", err);
        })
        .finally(() => {
          setGenerating(false);
        });
    }
  }, [isOpen, result, lang]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const { file } = await generateThanatophobiaCard(result, lang);
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nuju-thanatophobia-${result.level}.png`;
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
      const { file } = await generateThanatophobiaCard(result, lang);
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Thanatophobia & Death Anxiety Profile | Nuju",
          text: `My Mortality Salience Load is ${result.percentage}%. Screen existential anxiety & Terror Management patterns on Nuju:`,
          url: "https://nuju.app/quiz/thanatophobia",
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
      await navigator.clipboard.writeText("https://nuju.app/quiz/thanatophobia");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Shareable Story Card (1080 × 1350)
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1">Your Mortality Awareness Card</h3>
        <p className="text-xs text-neutral-400 mb-5">
          Download or share your Irvin Yalom existential profile to normalize mortality dread and ground nocturnal panic.
        </p>

        {/* Card Preview Container */}
        <div className="relative w-full aspect-[4/5] max-h-[460px] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 mb-6 flex items-center justify-center">
          {generating ? (
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-medium">Rendering high-res card...</span>
            </div>
          ) : cardPreview ? (
            <img
              src={cardPreview}
              alt="Thanatophobia Card Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xs text-neutral-500">Failed to render card preview</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleShare}
              disabled={generating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 font-semibold text-sm transition disabled:opacity-50 text-neutral-950 shadow-lg shadow-amber-950/40"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Story</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={generating}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-semibold text-sm transition disabled:opacity-50 text-white"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-neutral-800 hover:bg-neutral-800/50 text-neutral-400 hover:text-white text-xs font-medium transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link copied to clipboard!" : "Copy test link to share with others"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Share2, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { DissociationLang } from "@/data/dissociation-screener";
import { generateDissociationCard, DissociationCardInput } from "@/lib/generate-quiz-card";

interface DissociationShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DissociationCardInput;
  lang: DissociationLang;
}

export const DissociationShareCardModal: React.FC<DissociationShareCardModalProps> = ({
  isOpen,
  onClose,
  result,
  lang,
}) => {
  const [cardData, setCardData] = useState<{ dataUrl: string; blob: Blob; file: File } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    generateDissociationCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating Dissociation card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error("Failed to generate share image card.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, result, lang]);

  const handleDownload = () => {
    if (!cardData) return;
    const a = document.createElement("a");
    a.href = cardData.dataUrl;
    a.download = `ju-dissociation-${result.level}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(lang === "id" ? "Kartu berhasil diunduh!" : "Card downloaded successfully!");
  };

  const handleNativeShare = async () => {
    if (!cardData) return;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [cardData.file] })) {
      try {
        await navigator.share({
          title: "My Somatic Dissociation & DPDR Profile",
          text: `My grounding assessment: ${result.profile.title[lang]} (${result.profile.badge[lang]}). Check your somatic connection on Ju:`,
          url: "https://www.nuju.app/quiz/dissociation",
          files: [cardData.file],
        });
        toast.success(lang === "id" ? "Berhasil dibagikan!" : "Shared successfully!");
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.warn("Share failed, falling back to copy", err);
        } else {
          return;
        }
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText("https://www.nuju.app/quiz/dissociation");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
        toast.success(lang === "id" ? "Link berhasil disalin!" : "Link copied to clipboard!");
      } catch {
        toast.error("Could not copy link.");
      }
    }
  };

  const getTexts = () => {
    switch (lang) {
      case "id":
        return {
          title: "Bagikan Profil Disosiasi Somatik",
          subtitle: "Unduh kartu visual resolusi tinggi (1080x1350) untuk Instagram Story atau bagikan ke teman.",
          download: "Unduh PNG HD",
          share: "Bagikan Story / Salin Link",
          copied: "Link Tersalin!",
          generating: "Menyiapkan kartu visual...",
        };
      case "de":
        return {
          title: "Dissoziations-Profil teilen",
          subtitle: "Lade deine hochauflösende Story-Karte (1080x1350) für Instagram herunter.",
          download: "HD PNG herunterladen",
          share: "Teilen / Link kopieren",
          copied: "Link kopiert!",
          generating: "Visualisierung wird erstellt...",
        };
      case "fr":
        return {
          title: "Partager votre profil de dissociation",
          subtitle: "Téléchargez votre carte Story haute résolution (1080x1350) pour Instagram.",
          download: "Télécharger PNG HD",
          share: "Partager / Copier le lien",
          copied: "Lien copié !",
          generating: "Génération de la carte...",
        };
      case "es":
        return {
          title: "Compartir perfil de disociación somática",
          subtitle: "Descarga tu tarjeta Story de alta resolución (1080x1350) para Instagram.",
          download: "Descargar PNG HD",
          share: "Compartir / Copiar enlace",
          copied: "¡Enlace copiado!",
          generating: "Generando tarjeta...",
        };
      default:
        return {
          title: "Share Your Dissociation & DPDR Profile",
          subtitle: "Download a 1080x1350 Story card optimized for Instagram, TikTok, or WhatsApp.",
          download: "Download HD PNG",
          share: "Share Story / Copy Link",
          copied: "Link Copied!",
          generating: "Generating your diagnostic card...",
        };
    }
  };

  const t = getTexts();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full bg-slate-950/95 border-violet-900/50 text-white backdrop-blur-xl p-6 rounded-3xl shadow-2xl">
        <DialogHeader className="text-left space-y-1.5">
          <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DPDR Story Card · 1080 × 1350</span>
          </div>
          <DialogTitle className="text-xl font-bold text-white">{t.title}</DialogTitle>
          <DialogDescription className="text-sm text-slate-400">{t.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-violet-500/20 shadow-xl bg-slate-900 flex items-center justify-center">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                <p className="text-xs text-violet-200/80">{t.generating}</p>
              </div>
            ) : cardData ? (
              <img
                src={cardData.dataUrl}
                alt="Dissociation Profile Story Card"
                className="w-full h-full object-contain"
              />
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating || !cardData}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-lg shadow-violet-600/25 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>{t.download}</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            disabled={isGenerating || !cardData}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-medium text-sm transition-all border border-slate-700 active:scale-[0.98]"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-violet-400" />}
            <span>{isCopied ? t.copied : t.share}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

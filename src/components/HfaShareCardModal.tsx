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
import { HfaLang, HfaScoreResult } from "@/data/high-functioning-anxiety";
import { generateHfaCard } from "@/lib/generate-quiz-card";

interface HfaShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: HfaScoreResult;
  lang: HfaLang;
}

export const HfaShareCardModal: React.FC<HfaShareCardModalProps> = ({
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

    generateHfaCard(result, lang)
      .then((generated) => {
        if (isMounted) {
          setCardData(generated);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generating HFA card:", err);
        if (isMounted) {
          setIsGenerating(false);
          toast.error("Failed to generate story card.");
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
    a.download = `ju-high-functioning-anxiety-${result.level}.png`;
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
          title: "My High-Functioning Anxiety Profile",
          text: `My High-Functioning Anxiety Diagnostic: ${result.profile.title[lang]} (${result.profile.badge[lang]}). Screen your overthinking mask on Ju:`,
          url: "https://www.nuju.app/quiz/high-functioning-anxiety",
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
        await navigator.clipboard.writeText("https://www.nuju.app/quiz/high-functioning-anxiety");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
        toast.success(lang === "id" ? "Link berhasil disalin!" : "Link copied to clipboard!");
      } catch {
        toast.error("Could not copy link.");
      }
    }
  };

  const translations = {
    title: {
      en: "Share Your Anxiety Mask Profile",
      id: "Bagikan Profil Anxiety Tersembunyi Anda",
      de: "Teilen Sie Ihr HFA-Maskierungs-Profil",
      fr: "Partagez Votre Profil d'Anxiété Masquée",
      es: "Comparte Tu Perfil de Ansiedad Funcional",
    },
    desc: {
      en: "Download an aesthetic 9:16 story card formatted for Instagram Story, WhatsApp, or TikTok.",
      id: "Unduh kartu visual estetik format 9:16 untuk Instagram Story, WhatsApp, atau media sosial.",
      de: "Laden Sie eine ästhetische 9:16-Story-Karte für Instagram, WhatsApp oder TikTok herunter.",
      fr: "Téléchargez une story 9:16 optimisée pour Instagram, WhatsApp, TikTok ou LinkedIn.",
      es: "Descarga una tarjeta visual 9:16 para Instagram Story, WhatsApp o redes sociales.",
    },
    download: {
      en: "Download Story Card (PNG)",
      id: "Unduh Kartu Gambar (PNG)",
      de: "Story-Karte Herunterladen (PNG)",
      fr: "Télécharger la Story (PNG)",
      es: "Descargar Imagen Story (PNG)",
    },
    share: {
      en: "Share via Apps",
      id: "Bagikan via Aplikasi",
      de: "Per App Teilen",
      fr: "Partager via les Applis",
      es: "Compartir en Apps",
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-900/95 border-amber-500/20 text-white backdrop-blur-xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <DialogTitle className="text-lg font-bold text-white">
              {translations.title[lang]}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-400">
            {translations.desc[lang]}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center my-4">
          {isGenerating ? (
            <div className="w-full aspect-[4/5] max-w-[280px] rounded-2xl bg-slate-800/60 border border-amber-500/20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-xs text-slate-400 font-medium">
                {lang === "id" ? "Membuat visualisasi kartu..." : "Synthesizing high-res card..."}
              </p>
            </div>
          ) : cardData ? (
            <div className="relative group w-full max-w-[280px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={cardData.dataUrl}
                alt="High-Functioning Anxiety Story Card"
                className="w-full h-auto object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          <button
            onClick={handleDownload}
            disabled={!cardData || isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {translations.download[lang]}
          </button>

          <button
            onClick={handleNativeShare}
            disabled={!cardData || isGenerating}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs transition"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-amber-400" />
                <span>{lang === "id" ? "Link Disalin!" : "Link Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>{translations.share[lang]}</span>
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

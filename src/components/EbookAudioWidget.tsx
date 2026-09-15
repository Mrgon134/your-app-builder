import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Sparkles,
  CloudRain,
  Flame,
  Radio,
  Sliders,
  ChevronUp,
  ChevronDown,
  Gift,
} from "lucide-react";
import { ambientSound, AmbientSoundType } from "@/lib/ambient-sound";
import { EbookLanguageCode } from "@/data/ebook-i18n";
import { toast } from "sonner";

interface EbookAudioWidgetProps {
  currentText: string;
  title: string;
  lang: EbookLanguageCode;
  onOpenVipModal: () => void;
}

export const EbookAudioWidget: React.FC<EbookAudioWidgetProps> = ({
  currentText,
  title,
  lang,
  onOpenVipModal,
}) => {
  const [activeSound, setActiveSound] = useState<AmbientSoundType | null>(null);
  const [volume, setVolume] = useState<number>(0.35);
  const [isPlayingTts, setIsPlayingTts] = useState<boolean>(false);
  const [isPausedTts, setIsPausedTts] = useState<boolean>(false);
  const [ttsRate, setTtsRate] = useState<0.85 | 1.0>(0.85);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Stop TTS when currentText changes
  useEffect(() => {
    if (isPlayingTts && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlayingTts(false);
      setIsPausedTts(false);
    }
  }, [currentText]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      ambientSound.stop();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleAmbient = (type: AmbientSoundType) => {
    if (activeSound === type) {
      ambientSound.stop();
      setActiveSound(null);
    } else {
      ambientSound.play(type, volume);
      setActiveSound(type);
      toast.success(
        type === "drone"
          ? "Gelombang 432 Hz Theta aktif (Relaksasi Mendalam)"
          : type === "rain"
          ? "Suara Hujan Tenang aktif"
          : "Suara Api Unggun Hangat aktif"
      );
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ambientSound.setVolume(newVol);
  };

  const handlePlayTts = () => {
    if (
      !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined"
    ) {
      toast.error("Browser tidak mendukung Speech Synthesis.");
      return;
    }

    if (isPausedTts) {
      window.speechSynthesis.resume();
      setIsPlayingTts(true);
      setIsPausedTts(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown or special characters
    const cleanText = currentText.replace(/[#*_`]/g, " ").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = ttsRate;

    // Resolve native voice
    const voices = window.speechSynthesis.getVoices();
    const langCode = lang.toLowerCase();
    const matchedVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith(langCode)) ||
      voices.find((v) => v.lang.toLowerCase().includes(langCode));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    utterance.lang = lang;

    utterance.onend = () => {
      setIsPlayingTts(false);
      setIsPausedTts(false);
    };

    utterance.onerror = () => {
      setIsPlayingTts(false);
      setIsPausedTts(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingTts(true);
    setIsPausedTts(false);
  };

  const handlePauseTts = () => {
    if ("speechSynthesis" in window && isPlayingTts) {
      window.speechSynthesis.pause();
      setIsPausedTts(true);
      setIsPlayingTts(false);
    }
  };

  const handleStopTts = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlayingTts(false);
      setIsPausedTts(false);
    }
  };

  const isId = lang === "id";

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 print:hidden pointer-events-none">
      <div className="pointer-events-auto rounded-3xl border border-neutral-200/90 bg-white/95 backdrop-blur-md shadow-xl p-3 sm:p-4 transition-all">
        {/* Top Controls Row */}
        <div className="flex items-center justify-between gap-2">
          {/* TTS Narration Controls */}
          <div className="flex items-center gap-2">
            {!isPlayingTts ? (
              <button
                onClick={handlePlayTts}
                className="flex items-center gap-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs active:scale-95 transition"
                title={isId ? "Dengarkan Narasi Suara" : "Listen to Audiobook"}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span className="hidden xs:inline">
                  {isPausedTts ? (isId ? "Lanjut Baca" : "Resume") : (isId ? "Dengarkan" : "Listen")}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePauseTts}
                  className="flex items-center gap-1.5 rounded-full bg-neutral-900 text-white px-3 py-1.5 text-xs font-bold active:scale-95 transition"
                  title="Pause Narasi"
                >
                  <Pause className="h-3.5 w-3.5 fill-current" />
                  <span className="hidden xs:inline">Pause</span>
                </button>
                <button
                  onClick={handleStopTts}
                  className="rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-1.5 transition"
                  title="Stop"
                >
                  <Square className="h-3 w-3 fill-current" />
                </button>
              </div>
            )}

            {/* Speaking animated indicator */}
            {isPlayingTts && (
              <div className="flex items-center gap-0.5 px-2">
                <span className="w-1 h-3 bg-amber-600 rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-amber-500 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-2 bg-amber-400 rounded-full animate-pulse delay-150" />
              </div>
            )}

            {/* Speed Toggle */}
            <button
              onClick={() => setTtsRate((prev) => (prev === 0.85 ? 1.0 : 0.85))}
              className="rounded-lg bg-neutral-100 px-2 py-1 text-[11px] font-bold text-neutral-700 hover:bg-neutral-200 transition"
              title={isId ? "Kecepatan Narasi Suara" : "Speech Rate"}
            >
              {ttsRate === 0.85 ? "0.85x (Calm)" : "1.0x"}
            </button>
          </div>

          {/* Ambient Sounds Quick Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => handleToggleAmbient("rain")}
              className={`p-2 rounded-xl transition flex items-center justify-center ${
                activeSound === "rain"
                  ? "bg-blue-100 text-blue-700 ring-2 ring-blue-400"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
              }`}
              title={isId ? "Suara Hujan Tenang" : "Rain Sound"}
            >
              <CloudRain className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleToggleAmbient("drone")}
              className={`p-2 rounded-xl transition flex items-center justify-center ${
                activeSound === "drone"
                  ? "bg-purple-100 text-purple-700 ring-2 ring-purple-400"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
              }`}
              title="432Hz Calm Theta Drone"
            >
              <Radio className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleToggleAmbient("fire")}
              className={`p-2 rounded-xl transition flex items-center justify-center ${
                activeSound === "fire"
                  ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
              }`}
              title={isId ? "Suara Api Unggun Hangat" : "Campfire Sound"}
            >
              <Flame className="h-4 w-4" />
            </button>

            {/* VIP Resources Trigger */}
            <button
              onClick={onOpenVipModal}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 font-bold transition flex items-center gap-1 ml-1"
              title={isId ? "Buka Bonus VIP & Template Notion" : "VIP Bonus Toolkit"}
            >
              <Gift className="h-4 w-4 text-amber-600" />
              <span className="text-[11px] hidden sm:inline">VIP Hub</span>
            </button>

            {/* Expand / Collapse Volume */}
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 transition"
              title="Pengaturan Suara"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Volume Slider */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-3 text-xs text-neutral-600 px-1">
            <span className="font-semibold">{isId ? "Volume Ambience:" : "Ambience Volume:"}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <span className="font-mono text-[11px] min-w-[32px]">{Math.round(volume * 100)}%</span>
            {activeSound && (
              <button
                onClick={() => {
                  ambientSound.stop();
                  setActiveSound(null);
                }}
                className="text-[10px] font-bold text-rose-600 hover:underline"
              >
                Mute
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EbookAudioWidget;

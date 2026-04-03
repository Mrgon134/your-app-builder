import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { Play, Pause, Download, FileText, Mic } from "lucide-react";
import { TranscriptSegment, downloadSRT, downloadAudio } from "@/lib/srt";

interface VoicePlayerProps {
  audioUrl: string;
  segments: TranscriptSegment[];
  accentColor?: string;
  entryDate?: string;
}

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const VoicePlayer: React.FC<VoicePlayerProps> = ({
  audioUrl,
  segments,
  accentColor = "hsl(var(--primary))",
  entryDate,
}) => {
  const { t } = useLang();
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSegment, setActiveSegment] = useState(-1);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      // Find active segment
      const idx = segments.findIndex(
        (s) => audio.currentTime >= s.start && audio.currentTime < s.end
      );
      if (idx !== activeSegment) setActiveSegment(idx);
    };

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => { setPlaying(false); setActiveSegment(-1); };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [segments, activeSegment]);

  // Auto-scroll to active segment
  useEffect(() => {
    if (activeSegment >= 0 && scrollRef.current) {
      const el = scrollRef.current.children[activeSegment] as HTMLElement;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeSegment]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    if (!playing) {
      audio.play();
      setPlaying(true);
    }
  }, [playing]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const time = pct * duration;
    seekTo(time);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const filename = entryDate ? `nuju-${entryDate}` : "nuju-journal";

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Player controls */}
      <div className="p-4 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
          style={{ background: `${accentColor}15`, color: accentColor }}
        >
          {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          {/* Waveform-style progress bar */}
          <div
            className="h-8 rounded-lg cursor-pointer relative overflow-hidden"
            style={{ background: "hsl(var(--foreground)/0.04)" }}
            onClick={handleProgressClick}
          >
            {/* Filled portion */}
            <div
              className="absolute inset-y-0 left-0 rounded-lg transition-[width] duration-100"
              style={{ width: `${progress}%`, background: `${accentColor}20` }}
            />
            {/* Decorative waveform bars */}
            <div className="absolute inset-0 flex items-center justify-around px-1">
              {Array.from({ length: 40 }).map((_, i) => {
                const barProgress = (i / 40) * 100;
                const isPlayed = barProgress < progress;
                const h = 30 + Math.sin(i * 0.7) * 50 + Math.cos(i * 1.3) * 20;
                return (
                  <div
                    key={i}
                    className="w-[2px] rounded-full transition-colors duration-150"
                    style={{
                      height: `${Math.max(15, Math.min(90, h))}%`,
                      background: isPlayed ? accentColor : "hsl(var(--foreground)/0.12)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Time display */}
          <div className="flex items-center justify-between mt-1.5 px-0.5">
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {formatTime(currentTime)}
            </span>
            <div className="flex items-center gap-1">
              <Mic className="w-3 h-3 text-muted-foreground/50" />
              <span className="text-[11px] text-muted-foreground/50">
                {t.voice_entry || "Voice entry"}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Export button */}
        <button
          onClick={() => setShowExport(!showExport)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all flex-shrink-0"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Export dropdown */}
      {showExport && (
        <div className="px-4 pb-3 flex gap-2 animate-fade-up">
          <button
            onClick={() => { downloadAudio(audioUrl, filename); setShowExport(false); }}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-[12px] font-medium bg-foreground/[0.04] text-foreground active:scale-[0.97] transition-transform"
          >
            <Mic className="w-3.5 h-3.5" />
            {t.export_audio || "Audio"}
          </button>
          {segments.length > 0 && (
            <button
              onClick={() => { downloadSRT(segments, filename); setShowExport(false); }}
              className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-[12px] font-medium bg-foreground/[0.04] text-foreground active:scale-[0.97] transition-transform"
            >
              <FileText className="w-3.5 h-3.5" />
              {t.export_srt || "Transcript (.srt)"}
            </button>
          )}
        </div>
      )}

      {/* Synced transcript */}
      {segments.length > 0 && (
        <div
          ref={scrollRef}
          className="max-h-[200px] overflow-y-auto px-4 pb-4 space-y-1"
        >
          <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-[0.15em] mb-2">
            {t.tap_to_seek || "Tap to seek"} ↓
          </p>
          {segments.map((seg, i) => (
            <button
              key={i}
              onClick={() => seekTo(seg.start)}
              className="w-full text-left flex items-start gap-2 py-1.5 px-2 rounded-lg transition-all active:scale-[0.98]"
              style={{
                background: i === activeSegment ? `${accentColor}12` : "transparent",
              }}
            >
              <span
                className="text-[10px] tabular-nums font-mono mt-0.5 flex-shrink-0 w-8"
                style={{ color: i === activeSegment ? accentColor : "hsl(var(--muted-foreground)/0.5)" }}
              >
                {formatTime(seg.start)}
              </span>
              <span
                className="text-[13px] leading-relaxed transition-colors duration-200"
                style={{
                  color: i === activeSegment ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  fontWeight: i === activeSegment ? 500 : 400,
                }}
              >
                {seg.text}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoicePlayer;

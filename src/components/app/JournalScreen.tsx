import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { MOODS } from "@/lib/constants";
import { ArrowLeft, Mic, Square, Loader2 } from "lucide-react";
import MoodIcon from "@/components/MoodIcon";

const AI_BASE = import.meta.env.VITE_SUPABASE_URL as string;
const AI_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const DRAFT_KEY = "nuju-journal-draft";

const langToLocale: Record<string, string> = {
  id: "id-ID", es: "es-ES", pt: "pt-BR",
  ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", hi: "hi-IN",
};

type RecordState = "idle" | "recording" | "transcribing";

/** Animated waveform bars */
const RecordingWave: React.FC<{ color?: string }> = ({ color = "var(--destructive)" }) => (
  <span className="flex items-end gap-[3px] h-4">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="w-[3px] rounded-full"
        style={{
          background: color,
          animation: `voiceBar 0.85s ease-in-out infinite`,
          animationDelay: `${i * 0.16}s`,
          height: "100%",
          display: "inline-block",
        }}
      />
    ))}
  </span>
);

/** Convert Blob to base64 string (data portion only) */
const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const getMoodPlaceholder = (mood: number | undefined, t: Record<string, string>): string => {
  const map: Record<number, string> = {
    1: t.mood_placeholder_1 || "No filter needed. This is just for you.",
    2: t.mood_placeholder_2 || "Even a few words is enough.",
    3: t.mood_placeholder_3 || "What's been on your mind today?",
    4: t.mood_placeholder_4 || "You seem good — what's making it that way?",
    5: t.mood_placeholder_5 || "Tell me everything — I want to hear it.",
  };
  return mood ? (map[mood] || map[3]) : map[3];
};

interface JournalScreenProps {
  onBack: () => void;
  onSave: (text: string) => Promise<string | null>;
  initialPrompt?: string;
  autoRecord?: boolean;
  activities?: string[];
  mood?: number;
}

const useTypingEffect = (text: string, speed = 22) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { setDone(true); clearInterval(timer); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return { displayed, done };
};

const JournalScreen: React.FC<JournalScreenProps> = ({
  onBack, onSave, initialPrompt, autoRecord = false, activities = [], mood,
}) => {
  const { t, lang } = useLang();
  const moodData = MOODS.find((m) => m.value === mood);
  const [text, setText] = useState(() => {
    try { return localStorage.getItem(DRAFT_KEY) || ""; } catch { return ""; }
  });
  const [saved, setSaved] = useState(false);
  const [insight, setInsight] = useState("");
  const [saving, setSaving] = useState(false);
  const [recordState, setRecordState] = useState<RecordState>("idle");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const textRef = useRef(text);
  useEffect(() => { textRef.current = text; }, [text]);

  // Draft auto-save (2s debounce)
  useEffect(() => {
    if (saved) return;
    const timer = setTimeout(() => {
      try {
        if (text.trim()) localStorage.setItem(DRAFT_KEY, text);
        else localStorage.removeItem(DRAFT_KEY);
      } catch {}
    }, 2000);
    return () => clearTimeout(timer);
  }, [text, saved]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const getMimeType = (): string => {
    const types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return "audio/webm";
  };

  const startRecording = useCallback(async () => {
    if (recordState !== "idle") return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;
      const mimeType = getMimeType();
      const recorder = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size < 1000) {
          setRecordState("idle");
          return;
        }
        setRecordState("transcribing");
        try {
          const base64 = await blobToBase64(audioBlob);
          const resp = await fetch(`${AI_BASE}/functions/v1/ai-transcribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${AI_KEY}` },
            body: JSON.stringify({ audioBase64: base64, mimeType: audioBlob.type.split(";")[0], lang }),
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data.transcript) {
              const base = textRef.current.trim();
              setText((base ? base + " " : "") + data.transcript);
            }
          }
        } catch (err) {
          console.error("Transcription failed:", err);
        } finally {
          setRecordState("idle");
        }
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setRecordState("recording");
      if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
    } catch (err) {
      console.error("Mic access denied:", err);
      setRecordState("idle");
    }
  }, [recordState, lang]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      if (navigator.vibrate) navigator.vibrate([10]);
    }
  }, []);

  // Auto-start recording if opened via Talk button
  useEffect(() => {
    if (autoRecord) {
      const timer = setTimeout(() => startRecording(), 300);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleSave = async () => {
    if (!text.trim() || saving) return;
    setSaving(true);
    if (recordState === "recording") stopRecording();
    try {
      const aiInsight = await onSave(text);
      setInsight(aiInsight || "");
      setSaved(true);
      try { localStorage.removeItem(DRAFT_KEY); } catch {}
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const { displayed: typedInsight, done: insightDone } = useTypingEffect(insight);

  if (saved) {
    return (
      <div className="animate-spring-in text-center py-10">
        <img src={JU_STICKERS.yay} alt="Yay!" className="w-24 h-24 mx-auto mb-5 animate-[mascot-swap_0.3s_ease-out]" />
        <h2 className="text-[24px] font-bold text-foreground tracking-tight mb-6">{t.done}!</h2>
        {insight && (
          <div className="glass-card rounded-2xl p-6 mb-5 text-left">
            <div className="flex items-center gap-2 mb-3">
              <img src={JU_STICKERS.goodjob} alt="" className="w-7 h-7" />
              <p className="text-[11px] font-semibold text-primary uppercase tracking-widest">{t.ju_insight}</p>
            </div>
            <p className="text-[15px] text-foreground leading-relaxed">
              {typedInsight}
              {!insightDone && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse-scale" />}
            </p>
          </div>
        )}
        <button
          onClick={onBack}
          className="px-8 h-[52px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
        >
          {t.done}
        </button>
      </div>
    );
  }

  const isRecording = recordState === "recording";
  const isTranscribing = recordState === "transcribing";
  const canRecord = typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

  return (
    <div className="animate-page-slide-in">
      <style>{`
        @keyframes voiceBar {
          0%, 100% { transform: scaleY(0.25); opacity: 0.45; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-primary press-spring">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">{t.back}</span>
        </button>
        <div className="flex items-center gap-2.5">
          {moodData && (
            <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-full" style={{ background: `${moodData.color}18` }}>
              <MoodIcon value={moodData.value} color={moodData.color} size={16} />
              <span className="text-[11px] font-semibold" style={{ color: moodData.color }}>{moodData.label}</span>
            </div>
          )}
          {wordCount > 0 && (
            <span className="text-[12px] text-muted-foreground/60 tabular-nums">
              {wordCount}w
            </span>
          )}
          <img src={JU_STICKERS.diary} alt="Writing" className="w-9 h-9 animate-ju-float" />
        </div>
      </div>

      {/* Activity tags (read-only, passed from home) */}
      {activities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {activities.map((a) => (
            <span
              key={a}
              className="h-6 px-2.5 rounded-full text-[11px] font-medium capitalize"
              style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Prompt */}
      {initialPrompt && (
        <div className="glass-card rounded-2xl p-4 mb-3">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">{t.todays_prompt}</p>
          <p className="text-[15px] text-foreground leading-relaxed">{initialPrompt}</p>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => { if (!isRecording && !isTranscribing) setText(e.target.value); }}
        readOnly={isRecording || isTranscribing}
        placeholder={
          isRecording
            ? (t.recording_listening || "I'm all ears...")
            : isTranscribing
            ? (t.recording_processing || "Just a moment...")
            : getMoodPlaceholder(mood, t)
        }
        className={`w-full min-h-[260px] p-5 rounded-2xl glass-card text-foreground font-writing text-[17px] leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 resize-none transition-all ${isRecording || isTranscribing ? "cursor-default" : ""}`}
        autoFocus={!autoRecord}
      />

      {/* Status bar */}
      {isRecording && (
        <div className="flex items-center gap-2.5 mt-3 px-1">
          <RecordingWave />
          <span className="text-[13px] text-destructive font-medium">{t.recording_hint || "I'm all ears — speak freely"}</span>
          <span className="ml-auto text-[12px] text-muted-foreground">{t.recording_stop_hint || "Tap Stop when done"}</span>
        </div>
      )}
      {isTranscribing && (
        <div className="flex items-center gap-2.5 mt-3 px-1">
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <span className="text-[13px] text-primary font-medium">{t.recording_processing || "Just a moment..."}</span>
        </div>
      )}

      {/* Bottom actions */}
      <div className="flex items-center gap-3 mt-4">
        {canRecord && (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isTranscribing}
            className={`flex items-center justify-center gap-2 h-[48px] px-5 rounded-xl font-medium text-[14px] transition-all active:scale-[0.97] disabled:opacity-50 ${
              isRecording
                ? "bg-destructive/8 text-destructive border border-destructive/20"
                : isTranscribing
                ? "bg-muted text-muted-foreground"
                : "bg-secondary text-foreground"
            }`}
          >
            {isRecording && (
              <>
                <Square className="w-3.5 h-3.5 fill-destructive text-destructive" />
                <span>Stop</span>
              </>
            )}
            {isTranscribing && (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.recording_processing || "Transcribing..."}</span>
              </>
            )}
            {!isRecording && !isTranscribing && (
              <>
                <Mic className="w-4 h-4" />
                <span>{t.talk}</span>
              </>
            )}
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={!text.trim() || saving || isTranscribing}
          className="flex-1 h-[52px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring disabled:opacity-40 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
        >
          {saving ? "..." : t.save}
        </button>
      </div>
    </div>
  );
};

export default JournalScreen;

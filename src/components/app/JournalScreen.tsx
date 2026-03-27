import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { ArrowLeft, Mic, MicOff, Square } from "lucide-react";

interface JournalScreenProps {
  onBack: () => void;
  onSave: (text: string) => Promise<string | null>;
  initialPrompt?: string;
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

const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

/** Map app language code → BCP-47 locale for SpeechRecognition */
const langToLocale: Record<string, string> = {
  id: "id-ID", es: "es-ES", pt: "pt-BR",
  ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", hi: "hi-IN",
};

/** Capitalise first character of a sentence */
const capitalizeFirst = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

/** Animated waveform bars shown while recording */
const RecordingWave: React.FC = () => (
  <span className="flex items-end gap-[3px] h-4">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="w-[3px] rounded-full bg-destructive"
        style={{
          animation: `voiceBar 0.9s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
          height: "100%",
          display: "inline-block",
        }}
      />
    ))}
  </span>
);

const JournalScreen: React.FC<JournalScreenProps> = ({ onBack, onSave, initialPrompt }) => {
  const { t, lang } = useLang();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [insight, setInsight] = useState("");
  const [saving, setSaving] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState("");

  // Refs to avoid stale closures
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const textBeforeRecordingRef = useRef("");   // snapshot of text when mic started
  const sessionFinalRef = useRef("");          // finals accumulated this session only
  const textRef = useRef(text);
  useEffect(() => { textRef.current = text; }, [text]);

  const locale = langToLocale[lang] || "en-US";

  const createRecognition = useCallback(() => {
    if (!SpeechRecognition) return null;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.lang = locale;
    return recognition;
  }, [locale]);

  const attachHandlers = useCallback(
    (recognition: any) => {
      recognition.onresult = (event: any) => {
        let interimChunk = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          // Pick the alternative with the highest confidence
          let best = event.results[i][0];
          for (let j = 1; j < event.results[i].length; j++) {
            if (event.results[i][j].confidence > best.confidence) best = event.results[i][j];
          }
          const transcript = best.transcript;
          if (event.results[i].isFinal) {
            sessionFinalRef.current += capitalizeFirst(transcript.trimStart()) + " ";
          } else {
            interimChunk = transcript;
          }
        }

        // Always: text = (what was there before recording started) + (this session's finals) + interim
        const base = textBeforeRecordingRef.current;
        const combined =
          (base ? base + " " : "") + sessionFinalRef.current + interimChunk;
        setText(combined.replace(/\s{2,}/g, " ").trim());
        setInterimText(interimChunk);
      };

      recognition.onerror = (e: any) => {
        // 'no-speech' and 'aborted' are non-fatal — let onend handle restart
        if (e.error !== "no-speech" && e.error !== "aborted") {
          isRecordingRef.current = false;
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        // Auto-restart if user hasn't stopped manually (handles Chrome's silence timeout)
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch {
            // Recognition already started (race) — ignore
          }
        } else {
          setInterimText("");
          setIsRecording(false);
        }
      };
    },
    []
  );

  const startRecording = useCallback(() => {
    if (!SpeechRecognition || isRecordingRef.current) return;

    const recognition = createRecognition();
    if (!recognition) return;

    // Snapshot current text so we can anchor session results to it
    textBeforeRecordingRef.current = textRef.current.trim();
    sessionFinalRef.current = "";

    attachHandlers(recognition);
    recognitionRef.current = recognition;
    isRecordingRef.current = true;
    setIsRecording(true);
    setInterimText("");

    try {
      recognition.start();
      if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
    } catch {
      isRecordingRef.current = false;
      setIsRecording(false);
    }
  }, [createRecognition, attachHandlers]);

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setInterimText("");
    setIsRecording(false);
    if (navigator.vibrate) navigator.vibrate([10]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isRecordingRef.current = false;
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const handleSave = async () => {
    if (!text.trim() || saving) return;
    setSaving(true);
    if (isRecording) stopRecording();
    try {
      const aiInsight = await onSave(text);
      setInsight(aiInsight || "");
      setSaved(true);
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
        <img
          src={JU_STICKERS.yay}
          alt="Yay!"
          className="w-24 h-24 mx-auto mb-5 animate-[mascot-swap_0.3s_ease-out]"
        />
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

  return (
    <div className="animate-page-slide-in">
      <style>{`
        @keyframes voiceBar {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-primary press-spring">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">{t.back}</span>
        </button>
        <img
          src={JU_STICKERS.diary}
          alt="Writing"
          className="w-9 h-9 animate-ju-float"
        />
      </div>

      {initialPrompt && (
        <div className="glass-card rounded-2xl p-4 mb-3">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1">{t.todays_prompt}</p>
          <p className="text-[15px] text-foreground leading-relaxed">{initialPrompt}</p>
        </div>
      )}

      {/* Textarea — shows committed text; interim shown as ghost overlay */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => {
            if (!isRecording) setText(e.target.value);
          }}
          readOnly={isRecording}
          placeholder={t.whats_on_mind}
          className={`w-full min-h-[260px] p-5 rounded-2xl glass-card text-foreground font-writing text-[17px] leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 resize-none transition-all ${isRecording ? "cursor-default" : ""}`}
          autoFocus={!isRecording}
        />
        {/* Interim ghost text */}
        {isRecording && interimText && (
          <div
            className="absolute bottom-5 left-5 right-5 pointer-events-none text-[17px] font-writing leading-relaxed text-muted-foreground/50 italic select-none"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {/* spacer to push interim text below committed text */}
            <span className="opacity-0 select-none">{text}{text ? " " : ""}</span>
            <span>{interimText}</span>
          </div>
        )}
      </div>

      {/* Recording status bar */}
      {isRecording && (
        <div className="flex items-center gap-2.5 mt-3 px-1">
          <RecordingWave />
          <span className="text-[13px] text-destructive font-medium">
            {t.recording} — speak naturally, Ju is listening
          </span>
        </div>
      )}

      {/* Bottom actions */}
      <div className="flex items-center gap-3 mt-4">
        {SpeechRecognition && (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center justify-center gap-2 h-[48px] px-5 rounded-xl font-medium text-[14px] transition-all active:scale-[0.97] ${
              isRecording
                ? "bg-destructive/8 text-destructive border border-destructive/20"
                : "bg-secondary text-foreground"
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-3.5 h-3.5 fill-destructive text-destructive" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>{t.talk}</span>
              </>
            )}
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={!text.trim() || saving}
          className="flex-1 h-[52px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring disabled:opacity-40 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
        >
          {saving ? "..." : t.save}
        </button>
      </div>
    </div>
  );
};

export default JournalScreen;

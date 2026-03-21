import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { ArrowLeft, Mic, MicOff } from "lucide-react";

interface JournalScreenProps {
  onBack: () => void;
  onSave: (text: string) => Promise<string | null>;
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

// Check SpeechRecognition support
const SpeechRecognition =
  typeof window !== "undefined"
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

const JournalScreen: React.FC<JournalScreenProps> = ({ onBack, onSave }) => {
  const { t, lang } = useLang();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [insight, setInsight] = useState("");
  const [saving, setSaving] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startRecording = useCallback(() => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === "id" ? "id-ID" : lang === "es" ? "es-ES" : lang === "pt" ? "pt-BR" : lang === "ja" ? "ja-JP" : lang === "ko" ? "ko-KR" : lang === "zh" ? "zh-CN" : lang === "hi" ? "hi-IN" : "en-US";

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interim = transcript;
        }
      }
      setText((prev) => {
        const base = prev.endsWith(" ") ? prev : prev ? prev + " " : "";
        return (base + finalTranscript + interim).replace(/\s+/g, " ").trim();
      });
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
  }, [lang]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    if (navigator.vibrate) navigator.vibrate([10]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
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
      <div className="animate-fade-up text-center py-8">
        <img
          src={JU_STICKERS.yay}
          alt="Yay!"
          className="w-24 h-24 mx-auto mb-4 animate-[mascot-swap_0.3s_ease-out]"
        />
        <h2 className="font-serif text-2xl font-bold mb-6">{t.done}!</h2>
        {insight && (
          <div className="bg-card rounded-3xl p-6 mb-4 text-left shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <img src={JU_STICKERS.goodjob} alt="" className="w-8 h-8" />
              <p className="text-xs font-medium text-primary uppercase tracking-wider">{t.ju_insight}</p>
            </div>
            <p className="font-writing text-base italic text-foreground leading-relaxed">
              {typedInsight}
              {!insightDone && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse-scale" />}
            </p>
          </div>
        )}
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all active:scale-[0.97]"
        >
          {t.done}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground transition-all active:scale-[0.97]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">{t.back}</span>
        </button>
        <img
          src={JU_STICKERS.diary}
          alt="Writing"
          className="w-10 h-10 animate-[ju-float_3s_ease-in-out_infinite]"
        />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.whats_on_mind}
        className="w-full min-h-[280px] p-5 rounded-3xl bg-card border border-border/50 text-foreground font-writing text-lg leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        autoFocus
      />

      {/* Voice recording button */}
      <div className="flex items-center gap-3 mt-4">
        {SpeechRecognition && (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm transition-all active:scale-[0.97] ${
              isRecording
                ? "bg-destructive/10 text-destructive border border-destructive/30"
                : "bg-secondary text-foreground border border-border/50"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="animate-pulse">{t.recording}</span>
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
          className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97] disabled:opacity-40 disabled:hover:shadow-none"
        >
          {saving ? "..." : t.save}
        </button>
      </div>
    </div>
  );
};

export default JournalScreen;

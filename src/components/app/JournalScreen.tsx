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
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interim = transcript;
      }
      setText((prev) => {
        const base = prev.endsWith(" ") ? prev : prev ? prev + " " : "";
        return (base + finalTranscript + interim).replace(/\s+/g, " ").trim();
      });
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
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

  useEffect(() => {
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
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
          className="px-8 h-[48px] rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] transition-all active:scale-[0.97] shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)]"
        >
          {t.done}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-primary transition-all active:scale-[0.97]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">{t.back}</span>
        </button>
        <img
          src={JU_STICKERS.diary}
          alt="Writing"
          className="w-9 h-9 animate-ju-float"
        />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.whats_on_mind}
        className="w-full min-h-[260px] p-5 rounded-2xl bg-card border border-border/40 text-foreground font-writing text-[17px] leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 resize-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        autoFocus
      />

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
          className="flex-1 h-[48px] rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] transition-all active:scale-[0.97] disabled:opacity-40 shadow-[0_2px_12px_-3px_hsl(var(--primary)/0.35)]"
        >
          {saving ? "..." : t.save}
        </button>
      </div>
    </div>
  );
};

export default JournalScreen;
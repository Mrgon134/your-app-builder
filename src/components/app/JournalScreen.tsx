import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { coachResponses } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

interface JournalScreenProps {
  onBack: () => void;
  onSave: (text: string) => void;
}

const useTypingEffect = (text: string, speed = 22) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
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

const JournalScreen: React.FC<JournalScreenProps> = ({ onBack, onSave }) => {
  const { t } = useLang();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [insight, setInsight] = useState("");

  const handleSave = () => {
    if (!text.trim()) return;
    // Mock AI insight
    const responses = coachResponses.gentle;
    setInsight(responses[Math.floor(Math.random() * responses.length)]);
    onSave(text);
    setSaved(true);
  };

  const { displayed: typedInsight, done: insightDone } = useTypingEffect(insight);

  if (saved) {
    return (
      <div className="animate-fade-up text-center py-8">
        <div className="text-5xl mb-4 animate-celebrate-pop">🎉</div>
        <h2 className="font-serif text-2xl font-bold mb-6">{t.done}!</h2>
        {insight && (
          <div className="bg-card rounded-3xl p-6 mb-8 text-left shadow-sm border border-border/50">
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">{t.ju_insight}</p>
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
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground mb-6 transition-all active:scale-[0.97]">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">{t.back}</span>
      </button>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.whats_on_mind}
        className="w-full min-h-[280px] p-5 rounded-3xl bg-card border border-border/50 text-foreground font-writing text-lg leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        autoFocus
      />

      <button
        onClick={handleSave}
        disabled={!text.trim()}
        className="w-full mt-6 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97] disabled:opacity-40 disabled:hover:shadow-none"
      >
        {t.save}
      </button>
    </div>
  );
};

export default JournalScreen;

import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { coachResponses } from "@/lib/constants";
import { JU_STICKERS } from "@/lib/stickers";
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
    const responses = coachResponses.gentle;
    setInsight(responses[Math.floor(Math.random() * responses.length)]);
    onSave(text);
    setSaved(true);
  };

  const { displayed: typedInsight, done: insightDone } = useTypingEffect(insight);

  if (saved) {
    return (
      <div className="animate-fade-up text-center py-8">
        {/* Yay sticker for celebration */}
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
        {/* Dear Diary sticker while writing */}
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

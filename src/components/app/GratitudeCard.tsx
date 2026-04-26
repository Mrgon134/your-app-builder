import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check, Sparkles } from "lucide-react";
import { getTodayGratitude, saveGratitude, getGratitudeStreak } from "@/lib/gratitude";

const GratitudeCard: React.FC = () => {
  const [items, setItems] = useState<string[]>(["", "", ""]);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const existing = getTodayGratitude();
    if (existing && existing.items.length > 0) {
      setItems([...existing.items, "", "", ""].slice(0, 3));
      setSaved(true);
    }
    setStreak(getGratitudeStreak());
  }, []);

  const handleSave = () => {
    const filled = items.filter((i) => i.trim().length > 0);
    if (filled.length === 0) return;
    saveGratitude(filled);
    setSaved(true);
    setStreak(getGratitudeStreak());
    if (navigator.vibrate) navigator.vibrate([10, 40, 10]);
  };

  const handleChange = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    setItems(next);
    setSaved(false);
  };

  const filledCount = items.filter((i) => i.trim().length > 0).length;

  // Collapsed state — just a cute card
  if (!expanded && !saved) {
    return (
      <motion.button
        onClick={() => setExpanded(true)}
        whileTap={{ scale: 0.97 }}
        className="w-full glass-card rounded-2xl p-5 text-left press-spring"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground">A small good thing</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              What felt kind, steady, or worth keeping today?
            </p>
          </div>
          {streak > 0 && (
            <span className="ml-auto text-[11px] font-bold text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full">
              {streak}d
            </span>
          )}
        </div>
      </motion.button>
    );
  }

  // Saved state — show summary
  if (saved) {
    const filled = items.filter((i) => i.trim().length > 0);
    return (
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span className="text-[11px] font-bold text-pink-500 uppercase tracking-widest">A small good thing</span>
          {streak > 1 && (
            <span className="ml-auto text-[11px] font-medium text-muted-foreground">
              {streak} day streak
            </span>
          )}
        </div>
        <div className="space-y-1.5">
          {filled.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2"
            >
              <Sparkles className="w-3 h-3 text-pink-400 mt-1 flex-shrink-0" />
              <p className="text-[13px] text-foreground leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => { setSaved(false); setExpanded(true); }}
          className="mt-3 text-[11px] text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          Edit
        </button>
      </div>
    );
  }

  // Expanded editing state
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500" />
          <span className="text-[11px] font-bold text-pink-500 uppercase tracking-widest">A small good thing</span>
        </div>
        <button
          onClick={() => setExpanded(false)}
          className="text-[11px] text-muted-foreground font-medium"
        >
          Close
        </button>
      </div>

      <p className="text-[13px] text-muted-foreground mb-4">
        Name up to 3 things that felt kind, steady, or worth keeping today.
      </p>

      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[13px] text-muted-foreground/50 w-5 text-center font-bold">{i + 1}</span>
            <input
              type="text"
              value={item}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={
                i === 0 ? "Something that softened the day..." :
                i === 1 ? "Someone or something that helped..." :
                "A small moment worth keeping..."
              }
              className="gratitude-input flex-1 px-3 py-2.5 rounded-xl bg-background border border-border/50 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/30 transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && i < 2) {
                  const next = document.querySelectorAll<HTMLInputElement>(".gratitude-input");
                  next[i + 1]?.focus();
                } else if (e.key === "Enter" && i === 2) {
                  handleSave();
                }
              }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {filledCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            onClick={handleSave}
            className="mt-4 w-full py-3 rounded-2xl bg-pink-500 text-white font-semibold text-[14px] press-spring shadow-[0_4px_20px_-4px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save this
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GratitudeCard;

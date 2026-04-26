import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, Check, ChevronDown, ChevronUp, Flame } from "lucide-react";
import {
  getCurrentRitualType,
  getTodayRituals,
  saveMorningRitual,
  saveEveningRitual,
  getRitualStreak,
  type RitualType,
} from "@/lib/daily-ritual";
import { useLang } from "@/lib/i18n";

const DailyRitualCard: React.FC = () => {
  const { t } = useLang();
  const ritualType = getCurrentRitualType();
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [streak, setStreak] = useState(0);

  // Morning state
  const [gratitude, setGratitude] = useState<string[]>(["", "", ""]);
  const [intention, setIntention] = useState("");

  // Evening state
  const [highlight, setHighlight] = useState("");
  const [learned, setLearned] = useState("");

  useEffect(() => {
    const rituals = getTodayRituals();
    setStreak(getRitualStreak());

    if (ritualType === "morning" && rituals.morning) {
      setGratitude([...rituals.morning.gratitude, "", "", ""].slice(0, 3));
      setIntention(rituals.morning.intention);
      setSaved(true);
    } else if (ritualType === "evening" && rituals.evening) {
      setHighlight(rituals.evening.highlight);
      setLearned(rituals.evening.learned);
      setSaved(true);
    }
  }, [ritualType]);

  const handleSaveMorning = () => {
    const filled = gratitude.filter(g => g.trim().length > 0);
    if (filled.length === 0 && !intention.trim()) return;
    saveMorningRitual(gratitude, intention);
    setSaved(true);
    setStreak(getRitualStreak());
    if (navigator.vibrate) navigator.vibrate([10, 40, 10]);
  };

  const handleSaveEvening = () => {
    if (!highlight.trim() && !learned.trim()) return;
    saveEveningRitual(highlight, learned);
    setSaved(true);
    setStreak(getRitualStreak());
    if (navigator.vibrate) navigator.vibrate([10, 40, 10]);
  };

  const isMorning = ritualType === "morning";
  const accentColor = isMorning ? "rgb(251,191,36)" : "rgb(129,140,248)";
  const accentBg = isMorning ? "rgba(251,191,36,0.1)" : "rgba(129,140,248,0.1)";
  const accentBorder = isMorning ? "rgba(251,191,36,0.2)" : "rgba(129,140,248,0.2)";
  const gradientBg = isMorning
    ? "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.04) 100%)"
    : "linear-gradient(135deg, rgba(129,140,248,0.08) 0%, rgba(99,102,241,0.04) 100%)";

  // Collapsed preview
  if (!expanded && !saved) {
    return (
      <motion.button
        onClick={() => setExpanded(true)}
        whileTap={{ scale: 0.97 }}
        className="w-full rounded-2xl p-5 text-left press-spring"
        style={{ background: gradientBg, border: `1px solid ${accentBorder}` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: accentBg }}>
            {isMorning ? (
              <Sun className="w-5 h-5" style={{ color: accentColor }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: accentColor }} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-foreground">
              {isMorning ? (t.ritual_morning_title || "Morning Check-in") : (t.ritual_evening_title || "Evening Reflection")}
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              {isMorning ? (t.ritual_morning_desc || "Start your day with intention") : (t.ritual_evening_desc || "How did your day go?")}
            </p>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: accentBg }}>
              <Flame className="w-3 h-3" style={{ color: accentColor }} />
              <span className="text-[11px] font-bold" style={{ color: accentColor }}>{streak}d</span>
            </div>
          )}
          <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </motion.button>
    );
  }

  // Saved summary
  if (saved) {
    return (
      <div className="rounded-2xl p-5" style={{ background: gradientBg, border: `1px solid ${accentBorder}` }}>
        <div className="flex items-center gap-2 mb-3">
          {isMorning ? (
            <Sun className="w-4 h-4" style={{ color: accentColor }} />
          ) : (
            <Moon className="w-4 h-4" style={{ color: accentColor }} />
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
            {isMorning ? (t.ritual_morning_label || "Morning Check-in") : (t.ritual_evening_label || "Evening Reflection")}
          </span>
          <Check className="w-3.5 h-3.5 ml-auto" style={{ color: accentColor }} />
          {streak > 1 && (
            <span className="text-[11px] font-medium text-muted-foreground">
              {streak} {t.days_streak || "day streak"}
            </span>
          )}
        </div>

        {isMorning ? (
          <div className="space-y-2">
            {gratitude.filter(g => g.trim()).map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-2">
                <Sparkles className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <p className="text-[13px] text-foreground leading-relaxed">{g}</p>
              </motion.div>
            ))}
            {intention && (
              <div className="mt-2 pt-2 border-t" style={{ borderColor: accentBorder }}>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">{t.ritual_intention || "Intention:"}</p>
                <p className="text-[13px] text-foreground font-medium">{intention}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {highlight && (
              <div>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">{t.ritual_highlight || "Best moment:"}</p>
                <p className="text-[13px] text-foreground leading-relaxed">{highlight}</p>
              </div>
            )}
            {learned && (
              <div className="mt-2 pt-2 border-t" style={{ borderColor: accentBorder }}>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">{t.ritual_learned || "Learned:"}</p>
                <p className="text-[13px] text-foreground leading-relaxed">{learned}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => { setSaved(false); setExpanded(true); }}
          className="mt-3 text-[11px] text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          {t.edit || "Edit"}
        </button>
      </div>
    );
  }

  // Expanded editing
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="rounded-2xl p-5"
      style={{ background: gradientBg, border: `1px solid ${accentBorder}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isMorning ? (
            <Sun className="w-4 h-4" style={{ color: accentColor }} />
          ) : (
            <Moon className="w-4 h-4" style={{ color: accentColor }} />
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
            {isMorning ? (t.ritual_morning_label || "Morning Check-in") : (t.ritual_evening_label || "Evening Reflection")}
          </span>
        </div>
        <button onClick={() => setExpanded(false)} className="text-[11px] text-muted-foreground font-medium press-spring">
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {isMorning ? (
        <>
          <p className="text-[13px] text-muted-foreground mb-3">
            {t.ritual_grateful_qn || "3 things you're grateful for this morning:"}
          </p>
          <div className="space-y-2 mb-4">
            {gratitude.map((g, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[13px] text-muted-foreground/50 w-5 text-center font-bold">{i + 1}</span>
                <input
                  type="text"
                  value={g}
                  onChange={(e) => {
                    const next = [...gratitude];
                    next[i] = e.target.value;
                    setGratitude(next);
                  }}
                  placeholder={
                    i === 0 ? (t.ritual_g1 || "Something that made you smile...") :
                    i === 1 ? (t.ritual_g2 || "Someone you appreciate...") :
                    (t.ritual_g3 || "A small win...")
                  }
                  className="ritual-input flex-1 px-3 py-2.5 rounded-xl bg-background border border-border/50 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": accentBorder } as React.CSSProperties}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && i < 2) {
                      const inputs = document.querySelectorAll<HTMLInputElement>(".ritual-input");
                      inputs[i + 1]?.focus();
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <p className="text-[13px] text-muted-foreground mb-2">
            {t.ritual_intention_qn || "What would make today feel a little steadier?"}
          </p>
          <input
            type="text"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder={t.ritual_intention_ph || "One thing I can return to today..."}
            className="w-full px-3 py-2.5 rounded-xl bg-background border border-border/50 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 transition-all mb-4"
            style={{ "--tw-ring-color": accentBorder } as React.CSSProperties}
            onKeyDown={(e) => { if (e.key === "Enter") handleSaveMorning(); }}
          />

          <AnimatePresence>
            {(gratitude.some(g => g.trim()) || intention.trim()) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                onClick={handleSaveMorning}
                className="w-full py-3 rounded-2xl text-white font-semibold text-[14px] press-spring flex items-center justify-center gap-2"
                style={{ background: accentColor, boxShadow: `0 4px 20px -4px ${accentBg}` }}
              >
                <Sun className="w-4 h-4" />
                {t.ritual_start_btn || "Begin gently"}
              </motion.button>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <p className="text-[13px] text-muted-foreground mb-2">
            {t.ritual_highlight_qn || "What part of today deserves to be remembered?"}
          </p>
          <input
            type="text"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder={t.ritual_highlight_ph || "A moment I want to keep..."}
            className="w-full px-3 py-2.5 rounded-xl bg-background border border-border/50 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 transition-all mb-4"
            style={{ "--tw-ring-color": accentBorder } as React.CSSProperties}
          />

          <p className="text-[13px] text-muted-foreground mb-2">
            {t.ritual_learned_qn || "What did today teach you about yourself?"}
          </p>
          <input
            type="text"
            value={learned}
            onChange={(e) => setLearned(e.target.value)}
            placeholder={t.ritual_learned_ph || "Something I noticed..."}
            className="w-full px-3 py-2.5 rounded-xl bg-background border border-border/50 text-[14px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 transition-all mb-4"
            style={{ "--tw-ring-color": accentBorder } as React.CSSProperties}
            onKeyDown={(e) => { if (e.key === "Enter") handleSaveEvening(); }}
          />

          <AnimatePresence>
            {(highlight.trim() || learned.trim()) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                onClick={handleSaveEvening}
                className="w-full py-3 rounded-2xl text-white font-semibold text-[14px] press-spring flex items-center justify-center gap-2"
                style={{ background: accentColor, boxShadow: `0 4px 20px -4px ${accentBg}` }}
              >
                <Moon className="w-4 h-4" />
                {t.ritual_end_btn || "Close the day"}
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

export default DailyRitualCard;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle, Calendar } from "lucide-react";
import { MOODS } from "@/lib/constants";
import { EntryRow } from "@/lib/api";
import MoodIcon from "@/components/MoodIcon";
import { useLang } from "@/lib/i18n";

interface Props {
  entry: EntryRow | null;
  isOpen: boolean;
  onClose: () => void;
}

const EntryDetailModal: React.FC<Props> = ({ entry, isOpen, onClose }) => {
  const { t, lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShow(true);
    } else {
      document.body.style.overflow = "unset";
      setShow(false);
    }
  }, [isOpen]);

  if (!entry) return null;

  const moodData = MOODS.find((m) => m.value === entry.mood);
  const formattedDate = new Date(entry.entry_date).toLocaleDateString(lang || "en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[10vh] sm:top-auto z-50 w-[92vw] sm:w-full max-w-md max-h-[80vh] flex flex-col bg-card/90 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-3xl overflow-hidden left-1/2 -translate-x-1/2"
            style={{ 
              boxShadow: `0 20px 60px -15px ${moodData?.color || "var(--primary)"}20, inset 0 1px 0 rgba(255,255,255,0.1)` 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: `${moodData?.color || "var(--primary)"}15` }}
                >
                  <MoodIcon value={entry.mood} color={moodData?.color} size={22} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground tracking-tight">
                    {moodData?.label || "Mood"}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 pt-2 pb-8 overscroll-contain">
              
              {/* Journal Text */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.12em]">Your Entry</p>
                </div>
                {entry.text ? (
                  <p className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap font-medium">
                    {entry.text}
                  </p>
                ) : (
                  <p className="text-[14px] leading-relaxed text-muted-foreground italic">
                    {t.no_text_entry || "Just a mood check-in."}
                  </p>
                )}
              </div>

              {/* AI Insight */}
              {entry.ai_summary && (
                <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
                  <div 
                    className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: `linear-gradient(135deg, ${moodData?.color || "var(--primary)"}, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4" style={{ color: moodData?.color || "var(--primary)" }} />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: moodData?.color || "var(--primary)" }}>
                        {t.ju_insight || "Ju's Insight"}
                      </p>
                    </div>
                    <p className="text-[14px] leading-relaxed text-foreground">
                      {entry.ai_summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EntryDetailModal;

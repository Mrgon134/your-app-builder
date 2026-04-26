import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Lock, Send, ArrowLeft, Calendar } from "lucide-react";
import {
  createLetter,
  getReadyToOpenLetters,
  getSealedLetters,
  openLetter,
  getOpenDateOptions,
  FutureLetter,
} from "@/lib/future-letters";

interface LetterToFutureSelfProps {
  onClose?: () => void;
}

const LetterToFutureSelf: React.FC<LetterToFutureSelfProps> = ({ onClose }) => {
  const [mode, setMode] = useState<"list" | "write" | "read">("list");
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [readyLetters, setReadyLetters] = useState<FutureLetter[]>([]);
  const [sealedLetters, setSealedLetters] = useState<FutureLetter[]>([]);
  const [openedLetter, setOpenedLetter] = useState<FutureLetter | null>(null);
  const [justSealed, setJustSealed] = useState(false);

  const dateOptions = getOpenDateOptions();

  const refresh = () => {
    setReadyLetters(getReadyToOpenLetters());
    setSealedLetters(getSealedLetters());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSend = () => {
    if (!text.trim() || !selectedDate) return;
    createLetter(text.trim(), selectedDate);
    setText("");
    setSelectedDate("");
    setJustSealed(true);
    if (navigator.vibrate) navigator.vibrate([10, 50, 20]);
    setTimeout(() => {
      setJustSealed(false);
      setMode("list");
      refresh();
    }, 2000);
  };

  const handleOpen = (letter: FutureLetter) => {
    const opened = openLetter(letter.id);
    if (opened) {
      setOpenedLetter(opened);
      setMode("read");
      refresh();
      if (navigator.vibrate) navigator.vibrate([10, 30, 10, 30, 10]);
    }
  };

  // Just sealed animation
  if (justSealed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-5"
        >
          <Lock className="w-10 h-10 text-amber-500" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[22px] font-bold text-foreground tracking-tight mb-2"
        >
          Letter Sealed
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[14px] text-muted-foreground"
        >
          Ju will keep this safe until it's time.
        </motion.p>
      </div>
    );
  }

  // Reading a letter
  if (mode === "read" && openedLetter) {
    const writtenDate = new Date(openedLetter.writtenAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <div className="animate-fade-in">
        <button onClick={() => { setMode("list"); setOpenedLetter(null); }} className="flex items-center gap-1 text-primary mb-5 press-spring">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">Back</span>
        </button>

        <div className="glass-card rounded-3xl p-6 border border-amber-500/20" style={{ background: "linear-gradient(160deg, hsl(var(--card)) 0%, rgba(245,158,11,0.04) 100%)" }}>
          <div className="flex items-center gap-2 mb-4">
            <MailOpen className="w-5 h-5 text-amber-500" />
            <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">A Letter from You</span>
          </div>
          <p className="text-[11px] text-muted-foreground mb-4">Written on {writtenDate}</p>
          <p className="text-[15px] text-foreground leading-relaxed whitespace-pre-wrap font-medium">
            {openedLetter.text}
          </p>
        </div>
      </div>
    );
  }

  // Writing mode
  if (mode === "write") {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setMode("list")} className="flex items-center gap-1 text-primary mb-5 press-spring">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">Back</span>
        </button>

        <h2 className="text-[22px] font-bold text-foreground tracking-tight mb-1">Write to Future You</h2>
        <p className="text-[13px] text-muted-foreground mb-5">What do you want your future self to remember?</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dear future me..."
          className="w-full min-h-[180px] p-5 rounded-2xl glass-card text-foreground text-[15px] leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/30 resize-none transition-all mb-4"
          autoFocus
        />

        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Open this letter in...
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {dateOptions.map((opt) => (
            <button
              key={opt.date}
              onClick={() => setSelectedDate(opt.date)}
              className="px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all press-spring"
              style={{
                background: selectedDate === opt.date ? "rgba(245,158,11,0.15)" : "hsl(var(--foreground)/0.04)",
                border: `1.5px solid ${selectedDate === opt.date ? "rgba(245,158,11,0.5)" : "transparent"}`,
                color: selectedDate === opt.date ? "rgb(245,158,11)" : "hsl(var(--muted-foreground))",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {text.trim() && selectedDate && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              onClick={handleSend}
              className="w-full py-3.5 rounded-2xl bg-amber-500 text-white font-semibold text-[15px] press-spring shadow-[0_4px_20px_-4px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Seal & Send to Future
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // List mode — default
  return (
    <div className="space-y-4">
      {/* Ready to open letters */}
      {readyLetters.length > 0 && (
        <div>
          <p className="text-[11px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <MailOpen className="w-3.5 h-3.5" />
            Ready to Open
          </p>
          {readyLetters.map((letter) => {
            const writtenDate = new Date(letter.writtenAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            return (
              <motion.button
                key={letter.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpen(letter)}
                className="w-full glass-card rounded-2xl p-4 mb-2 text-left press-spring border border-amber-500/20"
                style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.06), transparent)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center animate-pulse-scale">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-foreground">A letter from past you</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Written {writtenDate} — tap to open</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Sealed letters */}
      {sealedLetters.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Sealed ({sealedLetters.length})
          </p>
          {sealedLetters.map((letter) => {
            const openDate = new Date(letter.openDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            return (
              <div
                key={letter.id}
                className="glass-card rounded-2xl p-4 mb-2 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground/[0.05] flex items-center justify-center">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">Sealed letter</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Opens {openDate}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write new */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setMode("write")}
        className="w-full py-3.5 rounded-2xl border-2 border-dashed border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold text-[14px] press-spring flex items-center justify-center gap-2 hover:bg-amber-500/5 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Write a Letter to Future You
      </motion.button>

      {readyLetters.length === 0 && sealedLetters.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-4">
          Write your first letter. Ju will keep it safe until it's time.
        </p>
      )}
    </div>
  );
};

export default LetterToFutureSelf;

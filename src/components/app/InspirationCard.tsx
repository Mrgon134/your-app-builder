import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Quote, RefreshCw } from "lucide-react";
import { getTodayInspiration, toggleFavorite, isFavorite } from "@/lib/daily-inspiration";

const InspirationCard: React.FC = () => {
  const [showQuote, setShowQuote] = useState(true); // toggle between quote and affirmation
  const inspiration = getTodayInspiration();
  const [liked, setLiked] = useState(false);

  const currentText = showQuote ? inspiration.quote : inspiration.affirmation;

  useEffect(() => {
    setLiked(isFavorite(currentText));
  }, [currentText]);

  const handleLike = () => {
    const nowLiked = toggleFavorite(currentText);
    setLiked(nowLiked);
    if (navigator.vibrate) navigator.vibrate(8);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: showQuote
          ? "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.06) 50%, rgba(236,72,153,0.04) 100%)"
          : "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(251,191,36,0.06) 50%, rgba(253,224,71,0.04) 100%)",
        border: "1px solid",
        borderColor: showQuote ? "rgba(139,92,246,0.12)" : "rgba(245,158,11,0.12)",
      }}
    >
      {/* Top row: label + toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Quote
            className="w-3.5 h-3.5"
            style={{ color: showQuote ? "rgb(139,92,246)" : "rgb(245,158,11)" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: showQuote ? "rgb(139,92,246)" : "rgb(245,158,11)" }}
          >
            {showQuote ? "Daily Quote" : "Today's Affirmation"}
          </span>
        </div>

        <button
          onClick={() => { setShowQuote(!showQuote); if (navigator.vibrate) navigator.vibrate(6); }}
          className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/60 hover:text-muted-foreground transition-colors press-spring"
        >
          <RefreshCw className="w-3 h-3" />
          {showQuote ? "Affirmation" : "Quote"}
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={showQuote ? "quote" : "affirmation"}
        initial={{ opacity: 0, x: showQuote ? -10 : 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-[15px] font-medium text-foreground leading-relaxed italic mb-2">
          "{currentText}"
        </p>
        {showQuote && (
          <p className="text-[12px] text-muted-foreground font-medium">
            — {inspiration.author}
          </p>
        )}
      </motion.div>

      {/* Bottom: like button */}
      <div className="flex justify-end mt-3">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleLike}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: liked
              ? showQuote ? "rgba(139,92,246,0.12)" : "rgba(245,158,11,0.12)"
              : "rgba(0,0,0,0.04)",
          }}
        >
          <Heart
            className="w-4 h-4 transition-colors"
            style={{
              color: liked
                ? showQuote ? "rgb(139,92,246)" : "rgb(245,158,11)"
                : "hsl(var(--muted-foreground))",
              fill: liked
                ? showQuote ? "rgb(139,92,246)" : "rgb(245,158,11)"
                : "transparent",
            }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InspirationCard;

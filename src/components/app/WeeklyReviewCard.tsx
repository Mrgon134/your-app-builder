import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, TrendingUp, TrendingDown, Minus, X, Sparkles } from "lucide-react";
import { type EntryRow } from "@/lib/api";
import {
  shouldShowWeeklyReview,
  dismissWeeklyReview,
  generateWeeklyReview,
} from "@/lib/weekly-review";

interface WeeklyReviewCardProps {
  entries: EntryRow[];
}

const WeeklyReviewCard: React.FC<WeeklyReviewCardProps> = ({ entries }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !shouldShowWeeklyReview()) return null;

  const review = generateWeeklyReview(entries);
  if (!review) return null;

  const handleDismiss = () => {
    dismissWeeklyReview();
    setDismissed(true);
  };

  const TrendIcon =
    review.moodTrend === "up" ? TrendingUp :
    review.moodTrend === "down" ? TrendingDown : Minus;

  const trendColor =
    review.moodTrend === "up" ? "rgb(34,197,94)" :
    review.moodTrend === "down" ? "rgb(244,63,94)" : "rgb(156,163,175)";

  const trendLabel =
    review.moodTrend === "up" ? "Mood went up ↑" :
    review.moodTrend === "down" ? "Mood dipped ↓" : "Mood stayed steady";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(99,102,241,0.04) 50%, rgba(236,72,153,0.04) 100%)",
        border: "1px solid rgba(168,85,247,0.12)",
      }}
    >
      {/* Close */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-foreground/5 transition-all press-spring"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-purple-400" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
          Your Week in Review
        </span>
      </div>

      <p className="text-[13px] text-muted-foreground mb-4">
        {review.weekStart} – {review.weekEnd}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Entries count */}
        <div className="text-center">
          <p className="text-[24px] font-bold text-foreground tabular-nums">{review.entryCount}</p>
          <p className="text-[10px] text-muted-foreground font-medium">entries</p>
        </div>

        {/* Mood trend */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <TrendIcon className="w-5 h-5" style={{ color: trendColor }} />
          </div>
          <p className="text-[10px] font-medium mt-1" style={{ color: trendColor }}>
            {trendLabel}
          </p>
        </div>

        {/* Top mood */}
        {review.topMood && (
          <div className="text-center">
            <div className="w-6 h-6 rounded-full mx-auto mb-1" style={{ background: review.topMood.color }} />
            <p className="text-[10px] text-muted-foreground font-medium">
              {review.topMood.label} × {review.topMood.count}
            </p>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="space-y-2">
        {review.gratitudeCount > 0 && (
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <p className="text-[12px] text-foreground">
              You practiced gratitude <strong>{review.gratitudeCount}</strong> {review.gratitudeCount === 1 ? "time" : "times"}
            </p>
          </div>
        )}
        {review.topActivities.length > 0 && (
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <p className="text-[12px] text-foreground">
              Top activities: {review.topActivities.join(", ")}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WeeklyReviewCard;

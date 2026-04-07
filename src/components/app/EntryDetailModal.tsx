import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle, Calendar, Mic, Camera, MapPin } from "lucide-react";
import { MOODS } from "@/lib/constants";
import { EntryRow } from "@/lib/api";
import MoodIcon from "@/components/MoodIcon";
import { useLang } from "@/lib/i18n";
import VoicePlayer from "@/components/app/VoicePlayer";

interface Props {
  entry: EntryRow | null;
  isOpen: boolean;
  onClose: () => void;
}

const EntryDetailModal: React.FC<Props> = ({ entry, isOpen, onClose }) => {
  const { t, lang } = useLang();
  const [show, setShow] = useState(false);
  
  // Cache the entry so it doesn't disappear instantly during exit animation
  const [cachedEntry, setCachedEntry] = useState<EntryRow | null>(entry);

  useEffect(() => {
    if (entry) {
      setCachedEntry(entry);
    }
  }, [entry]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShow(true);
    } else {
      document.body.style.overflow = "unset";
      setShow(false);
    }
  }, [isOpen]);

  if (!cachedEntry) return null;

  const moodData = MOODS.find((m) => m.value === cachedEntry.mood);
  const formattedDate = new Date(cachedEntry.entry_date).toLocaleDateString(lang || "en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const modalContent = (
    <AnimatePresence>
      {show && (
        <motion.div
          key="entry-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md max-h-[85vh] flex flex-col bg-card backdrop-blur-3xl border border-border/50 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto"
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
                  <MoodIcon value={cachedEntry.mood} color={moodData?.color} size={22} />
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
              <div className="flex items-center gap-2">
                {cachedEntry.audio_url && (
                  <div className="flex items-center gap-1 h-6 px-2 rounded-full bg-primary/10">
                    <Mic className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-semibold text-primary">{t.voice_entry || "Voice"}</span>
                  </div>
                )}
                {cachedEntry.photo_url && (
                  <div className="flex items-center gap-1 h-6 px-2 rounded-full bg-green-500/10">
                    <Camera className="w-3 h-3 text-green-600" />
                    <span className="text-[10px] font-semibold text-green-600">Photo</span>
                  </div>
                )}
                {cachedEntry.location_lat != null && (
                  <div className="flex items-center gap-1 h-6 px-2 rounded-full bg-red-500/10">
                    <MapPin className="w-3 h-3 text-red-500" />
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 pt-2 pb-8 overscroll-contain">
              
              {/* Photo */}
              {cachedEntry.photo_url && (
                <div className="mb-5 rounded-2xl overflow-hidden">
                  <img
                    src={cachedEntry.photo_url}
                    alt="Journal photo"
                    className="w-full max-h-64 object-cover rounded-2xl"
                  />
                </div>
              )}

              {/* Location */}
              {cachedEntry.location_lat != null && cachedEntry.location_lng != null && (
                <div className="mb-5 flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/5 border border-red-500/10">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {cachedEntry.location_name || `${cachedEntry.location_lat.toFixed(4)}°, ${cachedEntry.location_lng.toFixed(4)}°`}
                  </span>
                </div>
              )}

              {/* Voice Player */}
              {cachedEntry.audio_url && (
                <div className="mb-5">
                  <VoicePlayer
                    audioUrl={cachedEntry.audio_url}
                    segments={cachedEntry.transcript_segments || []}
                    accentColor={moodData?.color}
                    entryDate={cachedEntry.entry_date}
                  />
                </div>
              )}

              {/* Journal Text */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.12em]">Your Entry</p>
                </div>
                {cachedEntry.text ? (
                  <p className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap font-medium">
                    {cachedEntry.text}
                  </p>
                ) : (
                  <p className="text-[14px] leading-relaxed text-muted-foreground italic">
                    {t.no_text_entry || "Just a mood check-in."}
                  </p>
                )}
              </div>

              {/* AI Insight */}
              {cachedEntry.ai_summary && (
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
                      {cachedEntry.ai_summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
};

export default EntryDetailModal;

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Users,
  X,
  Lock,
} from "lucide-react";

interface MomentCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasProAccess: boolean;
  onUpgrade: () => void;
  onSelectType: (type: "calendar" | "location" | "photo" | "quick") => void;
}

const MomentCaptureModal: React.FC<MomentCaptureModalProps> = ({
  isOpen,
  onClose,
  hasProAccess,
  onUpgrade,
  onSelectType,
}) => {
  if (!hasProAccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-card rounded-3xl p-7 w-full max-w-xs shadow-2xl border border-border/30 text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Capture Moments
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Effortlessly turn your life events into journal entries
              </p>
              <button
                onClick={() => {
                  onUpgrade();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-transform active:scale-95"
              >
                Start 7-day trial
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-sm text-muted-foreground mt-3"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-3xl w-full max-w-xs shadow-2xl border border-border/30 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/20">
              <h3 className="text-lg font-bold text-foreground">Capture</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-foreground/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Options */}
            <div className="p-5 space-y-3">
              {[
                {
                  type: "calendar" as const,
                  label: "Calendar Event",
                  desc: "Turn a scheduled event into a moment",
                  icon: Calendar,
                  color: "bg-blue-500",
                },
                {
                  type: "location" as const,
                  label: "Location",
                  desc: "Capture where you are",
                  icon: MapPin,
                  color: "bg-red-500",
                },
                {
                  type: "photo" as const,
                  label: "Photo",
                  desc: "Upload an image to journal about",
                  icon: ImageIcon,
                  color: "bg-green-500",
                },
                {
                  type: "quick" as const,
                  label: "Quick Moment",
                  desc: "Fast text capture with mood",
                  icon: Users,
                  color: "bg-purple-500",
                },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.type}
                    onClick={() => {
                      onSelectType(option.type);
                      onClose();
                    }}
                    className="w-full p-4 rounded-2xl bg-foreground/3 hover:bg-foreground/6 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${option.color} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {option.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer tip */}
            <div className="px-5 py-3 bg-foreground/2 border-t border-border/20">
              <p className="text-xs text-muted-foreground">
                💡 Moments are auto-saved as journal entries with context
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MomentCaptureModal;

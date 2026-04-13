"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, CameraOff, RefreshCw, Check, Loader2 } from "lucide-react";
import { useFaceDetection } from "@/hooks/useFaceDetection";
import { useLang } from "@/lib/i18n";
import { MOODS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";

interface FacialMoodDetectorProps {
  isOpen: boolean;
  onClose: () => void;
  onMoodDetected: (mood: number) => void;
}

const EXPRESSION_LABELS: Record<string, string> = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  fearful: "Fearful",
  disgusted: "Disgusted",
  surprised: "Surprised",
  neutral: "Neutral",
};

const FacialMoodDetector: React.FC<FacialMoodDetectorProps> = ({
  isOpen,
  onClose,
  onMoodDetected,
}) => {
  const { t } = useLang();
  const { status, moodResult, videoRef, canvasRef, activate, confirmMood, reset } =
    useFaceDetection();

  // Auto-start when modal opens
  useEffect(() => {
    if (isOpen) {
      activate();
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleUse = () => {
    if (moodResult) {
      onMoodDetected(moodResult.moodValue);
      onClose();
    }
  };

  const handleScanAgain = () => {
    activate();
  };

  const detectedMoodData = moodResult
    ? MOODS.find((m) => m.value === moodResult.moodValue)
    : null;

  const isScanning = status === "scanning" || status === "requesting-camera";
  const isLoading = status === "loading-models" || status === "requesting-camera";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              reset();
              onClose();
            }
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />

          {/* Sheet */}
          <motion.div
            className="relative w-full max-w-sm bg-card border border-border/30 rounded-t-3xl overflow-hidden shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div>
                <h3 className="text-[17px] font-bold text-foreground">
                  {t.face_detect_title || "Detect your mood"}
                </h3>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {t.face_detect_subtitle || "AI reads your facial expression"}
                </p>
              </div>
              <button
                onClick={() => { reset(); onClose(); }}
                className="w-9 h-9 rounded-full bg-foreground/[0.06] flex items-center justify-center press-spring"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 pb-6">

              {/* ─── States: loading / scanning ─── */}
              {(status === "idle" || status === "loading-models" || isScanning) && (
                <>
                  {/* Camera viewfinder */}
                  <div
                    className="relative rounded-2xl overflow-hidden bg-black"
                    style={{ aspectRatio: "4/3" }}
                  >
                    {/* Loading overlay */}
                    {(status === "idle" || status === "loading-models") && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-[13px] text-white/70">
                          {t.face_loading_ai || "Loading AI model..."}
                        </p>
                      </div>
                    )}

                    {/* Requesting camera overlay */}
                    {status === "requesting-camera" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-3">
                        <Camera className="w-8 h-8 text-white/50" />
                        <p className="text-[13px] text-white/70">
                          {t.face_requesting_camera || "Opening camera..."}
                        </p>
                      </div>
                    )}

                    {/* Live video — mirrored like a selfie */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />

                    {/* Canvas overlay for bounding box — also mirrored */}
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ transform: "scaleX(-1)" }}
                    />

                    {/* Scanning pulse ring */}
                    {status === "scanning" && !moodResult && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                          className="w-20 h-20 rounded-full border-2 border-primary/40"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Live result card — shown while scanning */}
                  {status === "scanning" && (
                    <div className="mt-4">
                      {moodResult && detectedMoodData ? (
                        <motion.div
                          key={moodResult.moodValue}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-3 rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${detectedMoodData.color}15 0%, ${detectedMoodData.color}08 100%)`,
                            border: `1.5px solid ${detectedMoodData.color}40`,
                          }}
                        >
                          <MoodIcon value={moodResult.moodValue} color={detectedMoodData.color} size={40} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[15px] font-bold text-foreground">
                                {t[detectedMoodData.key] || detectedMoodData.label}
                              </span>
                              <span
                                className="text-[13px] font-semibold tabular-nums"
                                style={{ color: detectedMoodData.color }}
                              >
                                {moodResult.confidence}%
                              </span>
                            </div>
                            {/* Confidence bar */}
                            <div className="w-full h-1.5 rounded-full bg-foreground/[0.08] overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: detectedMoodData.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${moodResult.confidence}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              {t.face_expression_label || "Expression"}:{" "}
                              {EXPRESSION_LABELS[moodResult.dominantExpression] || moodResult.dominantExpression}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span className="text-[13px]">
                            {t.face_looking || "Looking for your face..."}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action buttons — shown while scanning and result is ready */}
                  {status === "scanning" && moodResult && (
                    <div className="flex gap-2.5 mt-4">
                      <button
                        onClick={handleScanAgain}
                        className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-2xl bg-foreground/[0.06] press-spring"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[14px] font-semibold text-muted-foreground">
                          {t.face_scan_again || "Scan again"}
                        </span>
                      </button>
                      <motion.button
                        onClick={() => { confirmMood(); handleUse(); }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-2xl text-white press-spring"
                        style={{
                          background: detectedMoodData
                            ? `linear-gradient(135deg, ${detectedMoodData.color} 0%, ${detectedMoodData.color}cc 100%)`
                            : "#7C6EDB",
                        }}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="text-[14px] font-semibold">
                          {t.face_use_mood || "Use this mood"}
                        </span>
                      </motion.button>
                    </div>
                  )}

                  {/* No result yet — just cancel */}
                  {status === "scanning" && !moodResult && (
                    <button
                      onClick={() => { reset(); onClose(); }}
                      className="w-full mt-3 h-10 rounded-2xl text-[14px] font-medium text-muted-foreground"
                    >
                      {t.face_cancel || "Cancel"}
                    </button>
                  )}
                </>
              )}

              {/* ─── Error: Camera permission denied ─── */}
              {status === "error-permission" && (
                <div className="flex flex-col items-center text-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <CameraOff className="w-7 h-7 text-destructive" />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-foreground">
                      {t.face_permission_title || "Camera access needed"}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
                      {t.face_permission_desc ||
                        "Allow camera access in your browser settings to use mood detection."}
                    </p>
                  </div>
                  <button
                    onClick={() => { reset(); onClose(); }}
                    className="h-11 px-8 rounded-2xl bg-foreground/[0.06] text-[14px] font-semibold text-foreground press-spring"
                  >
                    {t.back || "Go back"}
                  </button>
                </div>
              )}

              {/* ─── Error: No face detected ─── */}
              {status === "error-no-face" && (
                <div className="flex flex-col items-center text-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Camera className="w-7 h-7 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-foreground">
                      {t.face_no_face_title || "No face detected"}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
                      {t.face_no_face_desc ||
                        "Make sure your face is visible and well-lit, then try again."}
                    </p>
                  </div>
                  <div className="flex gap-2.5 w-full">
                    <button
                      onClick={() => { reset(); onClose(); }}
                      className="flex-1 h-11 rounded-2xl bg-foreground/[0.06] text-[14px] font-semibold text-muted-foreground press-spring"
                    >
                      {t.back || "Back"}
                    </button>
                    <button
                      onClick={handleScanAgain}
                      className="flex-1 h-11 rounded-2xl text-white text-[14px] font-semibold press-spring"
                      style={{ background: "#7C6EDB" }}
                    >
                      {t.face_try_again || "Try again"}
                    </button>
                  </div>
                </div>
              )}

              {/* ─── Error: Model failed to load ─── */}
              {status === "error-model" && (
                <div className="flex flex-col items-center text-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                    <CameraOff className="w-7 h-7 text-destructive" />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-foreground">
                      {t.face_model_error || "Could not load detection"}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
                      {t.face_model_error_desc ||
                        "Check your internet connection and try again."}
                    </p>
                  </div>
                  <div className="flex gap-2.5 w-full">
                    <button
                      onClick={() => { reset(); onClose(); }}
                      className="flex-1 h-11 rounded-2xl bg-foreground/[0.06] text-[14px] font-semibold text-muted-foreground press-spring"
                    >
                      {t.back || "Back"}
                    </button>
                    <button
                      onClick={handleScanAgain}
                      className="flex-1 h-11 rounded-2xl text-white text-[14px] font-semibold press-spring"
                      style={{ background: "#7C6EDB" }}
                    >
                      {t.face_try_again || "Retry"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FacialMoodDetector;

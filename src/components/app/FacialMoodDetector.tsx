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
  happy: "Happy", sad: "Sad", angry: "Angry",
  fearful: "Fearful", disgusted: "Disgusted", surprised: "Surprised", neutral: "Neutral",
};

/** Region metadata — labels per language */
const REGION_LABELS: Record<string, Record<string, string>> = {
  eyes:     { en: "Eyes",     id: "Mata",   es: "Ojos",    pt: "Olhos",   ja: "目",     ko: "눈",    zh: "眼睛",  hi: "आँखें",  default: "Eyes"     },
  eyebrows: { en: "Brows",    id: "Alis",   es: "Cejas",   pt: "Sobrancelhas", ja: "眉",ko: "눈썹",  zh: "眉毛",  hi: "भौंहें", default: "Brows"    },
  cheeks:   { en: "Cheeks",   id: "Pipi",   es: "Mejillas",pt: "Bochechas",ja: "頬",    ko: "볼",    zh: "脸颊",  hi: "गाल",   default: "Cheeks"   },
  forehead: { en: "Forehead", id: "Jidat",  es: "Frente",  pt: "Testa",   ja: "額",     ko: "이마",  zh: "额头",  hi: "माथा",  default: "Forehead" },
  chin:     { en: "Chin",     id: "Dagu",   es: "Barbilla",pt: "Queixo",  ja: "顎",     ko: "턱",    zh: "下巴",  hi: "ठुड्डी", default: "Chin"     },
  aura:     { en: "Aura",     id: "Aura",   es: "Aura",    pt: "Aura",    ja: "オーラ", ko: "아우라", zh: "气场",  hi: "ऊर्जा", default: "Aura"     },
};

const REGIONS = [
  { key: "eyes" },
  { key: "eyebrows" },
  { key: "cheeks" },
  { key: "forehead" },
  { key: "chin" },
  { key: "aura" },
] as const;

type RegionKey = typeof REGIONS[number]["key"];

/** Score color: red < 4, orange 4–6, teal ≥ 7 */
const scoreColor = (s: number) =>
  s >= 7 ? "#4ECDC4" : s >= 4 ? "#FFB347" : "#E8878C";

const FacialMoodDetector: React.FC<FacialMoodDetectorProps> = ({
  isOpen,
  onClose,
  onMoodDetected,
}) => {
  const { t, lang } = useLang();
  const { status, moodResult, videoRef, canvasRef, activate, confirmMood, reset } =
    useFaceDetection();

  useEffect(() => {
    if (isOpen) activate();
    else reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleUse = () => {
    if (moodResult) {
      onMoodDetected(moodResult.moodValue);
      onClose();
    }
  };

  const detectedMoodData = moodResult
    ? MOODS.find((m) => m.value === moodResult.moodValue)
    : null;

  const isScanning = status === "scanning" || status === "requesting-camera";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // ── Positioned at top so camera viewfinder is immediately visible ──
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[4vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) { reset(); onClose(); }
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/75 backdrop-blur-lg" />

          {/* Card — scrollable for shorter screens */}
          <motion.div
            className="relative w-full max-w-sm bg-card border border-border/30 rounded-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: "92vh" }}
            initial={{ scale: 0.93, opacity: 0, y: -12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 420, damping: 38 }}
          >
            <div className="overflow-y-auto" style={{ maxHeight: "92vh" }}>

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div>
                  <h3 className="text-[17px] font-bold text-foreground">
                    {t.face_detect_title || "Detect your mood"}
                  </h3>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {t.face_detect_subtitle || "Ju reads the mood your face is carrying"}
                  </p>
                </div>
                <button
                  onClick={() => { reset(); onClose(); }}
                  className="w-9 h-9 rounded-full bg-foreground/[0.06] flex items-center justify-center press-spring flex-shrink-0"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="px-5 pb-6 space-y-4">

                {/* ══ SCANNING STATE ══ */}
                {(status === "idle" || status === "loading-models" || isScanning) && (
                  <>
                    {/* Camera viewfinder */}
                    <div className="relative rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "4/3" }}>

                      {/* Loading overlays */}
                      {(status === "idle" || status === "loading-models") && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-3">
                          <Loader2 className="w-8 h-8 text-primary animate-spin" />
                          <p className="text-[13px] text-white/70">
                            {t.face_loading_ai || "Getting the mood reader ready..."}
                          </p>
                        </div>
                      )}
                      {status === "requesting-camera" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-3">
                          <Camera className="w-8 h-8 text-white/50" />
                          <p className="text-[13px] text-white/70">
                            {t.face_requesting_camera || "Opening camera..."}
                          </p>
                        </div>
                      )}

                      {/* Live feed — mirrored like selfie */}
                      <video
                        ref={videoRef}
                        autoPlay playsInline muted
                        className="w-full h-full object-cover"
                        style={{ transform: "scaleX(-1)" }}
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ transform: "scaleX(-1)" }}
                      />

                      {/* Pulse ring while waiting for first detection */}
                      {status === "scanning" && !moodResult && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <motion.div
                            className="w-24 h-24 rounded-full border-2 border-primary/40"
                            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.15, 0.5] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                          />
                        </div>
                      )}

                      {/* Scanning badge in corner */}
                      {status === "scanning" && moodResult && (
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-green-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span className="text-[10px] font-semibold text-white/80">LIVE</span>
                        </div>
                      )}
                    </div>

                    {/* ── Searching indicator ── */}
                    {status === "scanning" && !moodResult && (
                      <div className="flex items-center justify-center gap-2 py-1 text-muted-foreground">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-[13px]">
                          {t.face_looking || "Looking for your face..."}
                        </span>
                      </div>
                    )}

                    {/* ── Region scores + summary — appear once face is detected ── */}
                    {status === "scanning" && moodResult && detectedMoodData && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-3"
                      >
                        {/* Overall mood pill */}
                        <div
                          className="flex items-center gap-3 p-3 rounded-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${detectedMoodData.color}18 0%, ${detectedMoodData.color}08 100%)`,
                            border: `1.5px solid ${detectedMoodData.color}40`,
                          }}
                        >
                          <MoodIcon value={moodResult.moodValue} color={detectedMoodData.color} size={38} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[15px] font-bold text-foreground">
                                {t[detectedMoodData.key] || detectedMoodData.label}
                              </span>
                              <span className="text-[12px] font-semibold text-muted-foreground">
                                {EXPRESSION_LABELS[moodResult.dominantExpression] || moodResult.dominantExpression}
                                {" · "}{moodResult.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* ── 6 region scores grid (2 columns) ── */}
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-2">
                            {t.face_region_scores || "Expression breakdown"}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {REGIONS.map((region, i) => {
                              const score = moodResult.regionScores[region.key as RegionKey];
                              const color = scoreColor(score);
                              return (
                                <motion.div
                                  key={region.key}
                                  initial={{ opacity: 0, x: i % 2 === 0 ? -6 : 6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex flex-col gap-1.5 p-2.5 rounded-xl"
                                  style={{ background: `${color}10`, border: `1px solid ${color}25` }}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-semibold text-foreground">
                                      {REGION_LABELS[region.key]?.[lang] ?? REGION_LABELS[region.key]?.default}
                                    </span>
                                    <span
                                      className="text-[13px] font-bold tabular-nums"
                                      style={{ color }}
                                    >
                                      {score}/10
                                    </span>
                                  </div>
                                  {/* Score bar */}
                                  <div className="w-full h-1.5 rounded-full bg-foreground/[0.06] overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full"
                                      style={{ background: color }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${score * 10}%` }}
                                      transition={{ duration: 0.4, delay: i * 0.05 }}
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* ── AI Emotional Summary ── */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 }}
                          className="p-3.5 rounded-2xl"
                          style={{
                            background: "rgba(124,110,219,0.06)",
                            border: "1px solid rgba(124,110,219,0.15)",
                          }}
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: "#7C6EDB" }}>
                            ✦ {t.face_ai_summary || "Ju's read"}
                          </p>
                          {moodResult.summaryLoading ? (
                            <div className="space-y-2 py-0.5">
                              {/* Shimmer skeleton lines while waiting for AI */}
                              {[1, 0.85, 0.6].map((w, i) => (
                                <motion.div
                                  key={i}
                                  className="h-3 rounded-full"
                                  style={{
                                    width: `${w * 100}%`,
                                    background: "linear-gradient(90deg, rgba(124,110,219,0.08) 25%, rgba(124,110,219,0.18) 50%, rgba(124,110,219,0.08) 75%)",
                                    backgroundSize: "200% 100%",
                                  }}
                                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                />
                              ))}
                            </div>
                          ) : (
                            <motion.p
                              key={moodResult.summary}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4 }}
                              className="text-[13px] text-foreground leading-relaxed"
                            >
                              {moodResult.summary}
                            </motion.p>
                          )}
                        </motion.div>

                        {/* ── Action buttons ── */}
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => activate()}
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
                              background: `linear-gradient(135deg, ${detectedMoodData.color} 0%, ${detectedMoodData.color}cc 100%)`,
                            }}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[14px] font-semibold">
                              {t.face_use_mood || "Use this mood"}
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Cancel while waiting for face */}
                    {status === "scanning" && !moodResult && (
                      <button
                        onClick={() => { reset(); onClose(); }}
                        className="w-full h-10 rounded-2xl text-[14px] font-medium text-muted-foreground"
                      >
                        {t.face_cancel || "Cancel"}
                      </button>
                    )}
                  </>
                )}

                {/* ══ ERROR: Camera permission ══ */}
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
                        {t.face_permission_desc || "Allow camera access in your browser settings to use mood detection."}
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

                {/* ══ ERROR: No face ══ */}
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
                        {t.face_no_face_desc || "Make sure your face is visible and well-lit, then try again."}
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
                        onClick={() => activate()}
                        className="flex-1 h-11 rounded-2xl text-white text-[14px] font-semibold press-spring"
                        style={{ background: "#7C6EDB" }}
                      >
                        {t.face_try_again || "Try again"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ══ ERROR: Model load failed ══ */}
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
                        {t.face_model_error_desc || "Check your internet connection and try again."}
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
                        onClick={() => activate()}
                        className="flex-1 h-11 rounded-2xl text-white text-[14px] font-semibold press-spring"
                        style={{ background: "#7C6EDB" }}
                      >
                        {t.face_try_again || "Retry"}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FacialMoodDetector;

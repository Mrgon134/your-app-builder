"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JU_STICKERS } from "@/lib/stickers";
import { useLang } from "@/lib/i18n";
import { useFaceDetection } from "@/hooks/useFaceDetection";
import { MOODS } from "@/lib/constants";
import { drawMoodMomentCard, shareImage } from "@/lib/share-card";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PostEntryFlowProps {
  /** Mood value (1-5) selected when starting to write. Pass 0 if unknown. */
  beforeMood: number;
  /** Called when the user is fully done (Yes I feel better / Skip / Done) */
  onDismiss: () => void;
  /** Called when the user captures a selfie blob (for Supabase upload) */
  onSelfieCapture?: (blob: Blob) => void;
}

type Step = "checkin" | "selfie-invite" | "camera" | "comparison";

// ─── AI Check-in message ─────────────────────────────────────────────────────

async function fetchCheckinMessage(
  lang: string,
  timeHour: number,
  beforeMood: number
): Promise<string> {
  const timeCtx =
    timeHour < 6
      ? "late night"
      : timeHour < 12
      ? "morning"
      : timeHour < 17
      ? "afternoon"
      : timeHour < 21
      ? "evening"
      : "night";

  const moodLabels: Record<number, string> = {
    0: "unknown", 1: "rough", 2: "low", 3: "okay", 4: "good", 5: "great",
  };

  const langNames: Record<string, string> = {
    en: "English", id: "Indonesian (Bahasa Indonesia)", es: "Spanish",
    pt: "Portuguese", ja: "Japanese", ko: "Korean", zh: "Chinese", hi: "Hindi",
    ar: "Arabic", fr: "French", de: "German", ms: "Malay", th: "Thai",
    vi: "Vietnamese", fil: "Filipino",
  };

  const prompt = `CRITICAL: Respond ONLY in ${langNames[lang] || "English"}. 1-2 sentences max.

You are Ju, the companion inside Nuju journal. The user just finished writing their journal entry. It is ${timeCtx}.
${beforeMood > 0 ? `They started writing feeling ${moodLabels[beforeMood] || "okay"} (${beforeMood}/5).` : ""}

Write a warm, curious check-in — did writing help? Make them feel seen. Sound human, not robotic.
Ask if they feel a bit better now. Under 25 words. No bullet points.`;

  const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-coach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      persona: "gentle",
      lang,
      userName: "",
    }),
  });
  if (!res.ok) throw new Error(`ai-coach ${res.status}`);
  const data = await res.json();
  return (data.message || data.content || data.reply || "").trim();
}

async function fetchComparisonMessage(
  lang: string,
  beforeMood: number,
  afterMood: number
): Promise<string> {
  const langNames: Record<string, string> = {
    en: "English", id: "Indonesian (Bahasa Indonesia)", es: "Spanish",
    pt: "Portuguese", ja: "Japanese", ko: "Korean", zh: "Chinese", hi: "Hindi",
  };

  const improved = afterMood > beforeMood;
  const same = afterMood === beforeMood;

  const prompt = `CRITICAL: Respond ONLY in ${langNames[lang] || "English"}. 1-2 sentences max.

You are Ju from Nuju journal. The user just journaled and took a selfie.
Before writing: mood ${beforeMood}/5. After writing: mood ${afterMood}/5.
${improved ? "They look better now!" : same ? "Their mood seems about the same." : "They might still be processing."}

Give a warm, honest 1-sentence reaction. Sound like a real friend. Under 20 words. No bullet points.`;

  const res = await fetch(`${SUPABASE_URL}/functions/v1/ai-coach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      persona: "gentle",
      lang,
      userName: "",
    }),
  });
  if (!res.ok) throw new Error(`ai-coach ${res.status}`);
  const data = await res.json();
  return (data.message || data.content || data.reply || "").trim();
}

// ─── Mood badge (vertical layout for comparison) ──────────────────────────────

function MoodBadgeVertical({ mood }: { mood: number }) {
  const m = MOODS.find((x) => x.value === mood) ?? MOODS[2];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
        style={{ background: m.color + "25", border: `2px solid ${m.color}`, color: m.color }}
      >
        {mood}
      </div>
      <span className="text-xs font-medium" style={{ color: m.color }}>
        {m.label}
      </span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PostEntryFlow({ beforeMood, onDismiss, onSelfieCapture }: PostEntryFlowProps) {
  const { lang, t } = useLang();

  const [step, setStep] = useState<Step>("checkin");
  const [checkinMsg, setCheckinMsg] = useState<string>("");
  const [checkinLoading, setCheckinLoading] = useState(true);

  const [selfieBlob, setSelfieBlob] = useState<Blob | null>(null);
  const [selfieSrc, setSelfieSrc] = useState<string | null>(null);
  const [afterMood, setAfterMood] = useState<number | null>(null);
  const [comparisonMsg, setComparisonMsg] = useState<string>("");
  const [comparisonLoading, setComparisonLoading] = useState(false);

  const [isCapturing, setIsCapturing] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [shareBlob, setShareBlob] = useState<Blob | null>(null);

  const selfieSrcRef = useRef<string | null>(null);

  const {
    status: faceStatus,
    moodResult,
    videoRef,
    canvasRef,
    activate,
    confirmMood,
    reset: resetFace,
    captureFrame,
  } = useFaceDetection();

  // ── Load AI check-in message on mount ──
  useEffect(() => {
    const hour = new Date().getHours();
    setCheckinLoading(true);
    fetchCheckinMessage(lang, hour, beforeMood)
      .then((msg) => setCheckinMsg(msg))
      .catch(() => {
        // Fallback
        const fallbacks: Record<string, string> = {
          en: "Hey, how are you feeling now that you've written it all out?",
          id: "Gimana, sekarang sudah sedikit lebih baik setelah nulis?",
        };
        setCheckinMsg(fallbacks[lang] ?? fallbacks["en"]);
      })
      .finally(() => setCheckinLoading(false));
  }, [lang, beforeMood]);

  // ── Revoke object URL on cleanup ──
  useEffect(() => {
    return () => {
      if (selfieSrcRef.current) URL.revokeObjectURL(selfieSrcRef.current);
    };
  }, []);

  const goToSelfieInvite = () => setStep("selfie-invite");

  const goToCamera = () => {
    setStep("camera");
    activate();
  };

  const handleCapture = useCallback(async () => {
    if (!moodResult || !captureFrame) return;
    setIsCapturing(true);
    try {
      const frozenMood = moodResult.moodValue;
      const blob = await captureFrame();
      confirmMood();

      // Revoke previous selfie URL
      if (selfieSrcRef.current) URL.revokeObjectURL(selfieSrcRef.current);
      const src = URL.createObjectURL(blob);
      selfieSrcRef.current = src;

      setSelfieBlob(blob);
      setSelfieSrc(src);
      setAfterMood(frozenMood);

      onSelfieCapture?.(blob);

      // Load comparison AI message
      setComparisonLoading(true);
      setStep("comparison");
      fetchComparisonMessage(lang, beforeMood > 0 ? beforeMood : frozenMood, frozenMood)
        .then(setComparisonMsg)
        .catch(() => {
          const fallbacks: Record<string, string> = {
            en: "Your face tells a story — and you just wrote a beautiful chapter.",
            id: "Wajahmu bercerita — dan kamu baru saja menulis bab yang indah.",
          };
          setComparisonMsg(fallbacks[lang] ?? fallbacks["en"]);
        })
        .finally(() => setComparisonLoading(false));
    } catch {
      // silently ignore capture errors
    } finally {
      setIsCapturing(false);
    }
  }, [moodResult, captureFrame, confirmMood, lang, beforeMood, onSelfieCapture]);

  const getOrGenerateCard = useCallback(async (): Promise<Blob> => {
    if (shareBlob) return shareBlob;
    if (!selfieBlob || afterMood === null) throw new Error("No selfie");
    const blob = await drawMoodMomentCard({
      selfieBlob,
      beforeMood: beforeMood > 0 ? beforeMood : afterMood,
      afterMood,
      date: new Date().toISOString(),
      beforeLabel: t.post_entry_before || "Before writing",
      afterLabel: t.post_entry_after || "After writing",
    });
    setShareBlob(blob);
    return blob;
  }, [shareBlob, selfieBlob, afterMood, beforeMood, t]);

  const handleShare = async () => {
    setIsGeneratingCard(true);
    try {
      const blob = await getOrGenerateCard();
      await shareImage(blob, t.post_entry_journey_label || "My Emotional Journey", "nuju-moment.jpg");
    } catch {
      // ignore
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const handleSaveImage = async () => {
    setIsGeneratingCard(true);
    try {
      const blob = await getOrGenerateCard();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nuju-moment.jpg";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    } finally {
      setIsGeneratingCard(false);
    }
  };

  // ─── Card shared styles ───────────────────────────────────────────────────

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(124,110,219,0.2)",
    borderRadius: 24,
    padding: "24px 20px",
  };

  const springAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { type: "spring", stiffness: 380, damping: 35 },
  };

  // ─── Render steps ─────────────────────────────────────────────────────────

  return (
    <AnimatePresence mode="wait">
      {/* ── Step 1: Check-in ── */}
      {step === "checkin" && (
        <motion.div key="checkin" {...springAnim} style={cardStyle}>
          <div className="flex flex-col items-center gap-4">
            <img src={JU_STICKERS.love} alt="Ju" className="w-16 h-16 object-contain" />
            <div className="text-center space-y-1">
              <p className="font-semibold text-base" style={{ color: "#E8E4F8" }}>
                {t.post_entry_checkin_title || "Feeling any better?"}
              </p>
              {checkinLoading ? (
                <div className="h-4 rounded-full animate-pulse mx-auto w-3/4" style={{ background: "rgba(124,110,219,0.2)" }} />
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm leading-relaxed"
                  style={{ color: "#9B93C0" }}
                >
                  {checkinMsg}
                </motion.p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full mt-1">
              <button
                onClick={onDismiss}
                className="w-full py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95"
                style={{ background: "#7C6EDB", color: "#fff" }}
              >
                {t.post_entry_checkin_yes || "Yes, I feel better 😊"}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={goToSelfieInvite}
                  className="flex-1 py-3 rounded-2xl font-medium text-sm transition-all active:scale-95"
                  style={{ background: "rgba(124,110,219,0.15)", color: "#B0A8D8" }}
                >
                  {t.post_entry_checkin_kinda || "Kind of..."}
                </button>
                <button
                  onClick={goToSelfieInvite}
                  className="flex-1 py-3 rounded-2xl font-medium text-sm transition-all active:scale-95"
                  style={{ background: "rgba(124,110,219,0.15)", color: "#B0A8D8" }}
                >
                  {t.post_entry_checkin_no || "Not really..."}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Step 2: Selfie invite ── */}
      {step === "selfie-invite" && (
        <motion.div key="selfie-invite" {...springAnim} style={cardStyle}>
          <div className="flex flex-col items-center gap-4">
            <img src={JU_STICKERS.hmm} alt="Ju" className="w-16 h-16 object-contain" />
            <div className="text-center space-y-1">
              <p className="font-semibold text-base" style={{ color: "#E8E4F8" }}>
                {t.post_entry_selfie_title || "Show your mood!"}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#9B93C0" }}>
                {t.post_entry_selfie_desc || "Want to express your mood with a selfie? This moment can help you feel more relieved."}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full mt-1">
              <button
                onClick={goToCamera}
                className="w-full py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ background: "#7C6EDB", color: "#fff" }}
              >
                <span>📸</span>
                {t.post_entry_selfie_cta || "Take a selfie"}
              </button>
              <button
                onClick={onDismiss}
                className="w-full py-3 rounded-2xl font-medium text-sm transition-all active:scale-95"
                style={{ background: "rgba(124,110,219,0.15)", color: "#B0A8D8" }}
              >
                {t.post_entry_skip || "Skip"}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Step 3: Camera ── */}
      {step === "camera" && (
        <motion.div key="camera" {...springAnim} style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <div className="relative">
            {/* Video feed */}
            <div className="relative bg-black" style={{ aspectRatio: "4/3", maxHeight: 320 }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ transform: "scaleX(-1)", pointerEvents: "none" }}
              />

              {/* Status overlay */}
              {(faceStatus === "loading-models" || faceStatus === "requesting-camera") && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: "rgba(19,17,28,0.85)" }}>
                  <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#7C6EDB", borderTopColor: "transparent" }} />
                  <p className="text-sm" style={{ color: "#B0A8D8" }}>
                    {faceStatus === "loading-models" ? (t.face_loading_ai || "Loading AI model...") : (t.face_requesting_camera || "Opening camera...")}
                  </p>
                </div>
              )}

              {/* Pulse ring while scanning */}
              {faceStatus === "scanning" && !moodResult && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full border-2 animate-ping opacity-40"
                    style={{ borderColor: "#7C6EDB" }}
                  />
                </div>
              )}

              {/* Mood badge overlay */}
              {moodResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: (MOODS.find((m) => m.value === moodResult.moodValue)?.color ?? "#7C6EDB") + "33",
                    color: MOODS.find((m) => m.value === moodResult.moodValue)?.color ?? "#7C6EDB",
                    border: `1px solid ${MOODS.find((m) => m.value === moodResult.moodValue)?.color ?? "#7C6EDB"}50`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {MOODS.find((m) => m.value === moodResult.moodValue)?.label ?? ""}
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3 p-4">
              <button
                onClick={() => { resetFace(); setStep("selfie-invite"); }}
                className="flex-1 py-3 rounded-2xl font-medium text-sm transition-all active:scale-95"
                style={{ background: "rgba(124,110,219,0.15)", color: "#B0A8D8" }}
              >
                {t.back || "Back"}
              </button>
              <AnimatePresence>
                {moodResult && (
                  <motion.button
                    key="capture"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className="flex-1 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95"
                    style={{ background: "#7C6EDB", color: "#fff", opacity: isCapturing ? 0.7 : 1 }}
                  >
                    {isCapturing ? "..." : (t.post_entry_capture_btn || "Take photo")}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Error states */}
            {(faceStatus === "error-permission" || faceStatus === "error-no-face" || faceStatus === "error-model") && (
              <div className="px-4 pb-4 text-center">
                <p className="text-sm mb-3" style={{ color: "#E8878C" }}>
                  {faceStatus === "error-permission"
                    ? (t.face_permission_title || "Camera access needed")
                    : faceStatus === "error-no-face"
                    ? (t.face_no_face_title || "No face detected")
                    : (t.face_model_error || "Could not load detection")}
                </p>
                <button
                  onClick={() => { resetFace(); goToCamera(); }}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: "rgba(124,110,219,0.2)", color: "#B0A8D8" }}
                >
                  {t.face_try_again || "Try again"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Step 4: Comparison ── */}
      {step === "comparison" && afterMood !== null && (
        <motion.div key="comparison" {...springAnim} style={cardStyle}>
          <div className="flex flex-col gap-4">
            {/* Selfie preview */}
            {selfieSrc && (
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", maxHeight: 220 }}>
                <img
                  src={selfieSrc}
                  alt="Your selfie"
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
            )}

            {/* Ju's comparison message */}
            <div className="flex items-start gap-3">
              <img src={JU_STICKERS.yay} alt="Ju" className="w-10 h-10 object-contain flex-shrink-0 mt-0.5" />
              <div>
                {comparisonLoading ? (
                  <div className="space-y-1.5">
                    <div className="h-3 rounded-full animate-pulse w-full" style={{ background: "rgba(124,110,219,0.2)" }} />
                    <div className="h-3 rounded-full animate-pulse w-4/5" style={{ background: "rgba(124,110,219,0.2)" }} />
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm leading-relaxed"
                    style={{ color: "#B0A8D8" }}
                  >
                    {comparisonMsg}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Before / After row */}
            <div className="flex items-center justify-center gap-6 py-3 px-4 rounded-2xl" style={{ background: "rgba(124,110,219,0.08)" }}>
              <div className="flex flex-col items-center gap-1">
                <MoodBadgeVertical mood={beforeMood > 0 ? beforeMood : afterMood} />
                <span className="text-xs mt-0.5" style={{ color: "#6B6499" }}>
                  {t.post_entry_before || "Before writing"}
                </span>
              </div>
              <div className="text-xl" style={{ color: "#7C6EDB" }}>→</div>
              <div className="flex flex-col items-center gap-1">
                <MoodBadgeVertical mood={afterMood} />
                <span className="text-xs mt-0.5" style={{ color: "#6B6499" }}>
                  {t.post_entry_after || "After writing"}
                </span>
              </div>
            </div>

            {/* Improvement message */}
            {afterMood > (beforeMood > 0 ? beforeMood : afterMood) && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm font-medium"
                style={{ color: "#4ECDC4" }}
              >
                {t.post_entry_mood_improved || "You look better! Writing helps ✨"}
              </motion.p>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleShare}
                disabled={isGeneratingCard}
                className="flex-1 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                style={{ background: "#7C6EDB", color: "#fff", opacity: isGeneratingCard ? 0.7 : 1 }}
              >
                <span>↑</span>
                {isGeneratingCard ? "..." : (t.post_entry_share || "Share moment")}
              </button>
              <button
                onClick={handleSaveImage}
                disabled={isGeneratingCard}
                className="py-3 px-4 rounded-2xl font-medium text-sm transition-all active:scale-95"
                style={{ background: "rgba(124,110,219,0.15)", color: "#B0A8D8", opacity: isGeneratingCard ? 0.7 : 1 }}
                title={t.post_entry_save || "Save"}
              >
                ↓
              </button>
            </div>

            <button
              onClick={onDismiss}
              className="w-full py-3 rounded-2xl font-medium text-sm transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.06)", color: "#9B93C0" }}
            >
              {t.done || "Done"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

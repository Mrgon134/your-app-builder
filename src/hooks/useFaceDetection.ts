import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";

// Module-level cache — survives React component lifecycle so models load only once per session
let modelsLoaded = false;

const MODEL_URL = "/models";
const DETECT_INTERVAL_MS = 180; // ~5.5fps — faster response
const FACE_SUMMARY_URL = `${SUPABASE_URL}/functions/v1/ai-face-summary`;

export type ExpressionResult = {
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  neutral: number;
};

/** Per-facial-area emotional expression scores, each 0–10 */
export type RegionScores = {
  eyes: number;      // Eye brightness / alertness
  eyebrows: number;  // Brow relaxation
  cheeks: number;    // Cheek lift — Duchenne smile marker
  forehead: number;  // Forehead relaxation
  chin: number;      // Jaw relaxation
  aura: number;      // Overall facial energy composite
};

export type MoodDetectionResult = {
  moodValue: 1 | 2 | 3 | 4 | 5;
  confidence: number;
  dominantExpression: string;
  regionScores: RegionScores;
  summary: string;
  summaryLoading: boolean;  // true while waiting for AI response
};

// ─── Region Score Calculator ─────────────────────────────────────────────────

export function calculateRegionScores(e: ExpressionResult): RegionScores {
  const clamp = (v: number) => Math.round(Math.max(0, Math.min(10, v)));

  return {
    eyes:     clamp(5 + e.happy * 5 + e.surprised * 3 - e.sad * 5 - e.fearful * 3 - e.angry * 2),
    eyebrows: clamp(5 + e.surprised * 5 + e.happy * 2 - e.angry * 6 - e.disgusted * 4 - e.fearful * 3 - e.sad * 2),
    cheeks:   clamp(5 + e.happy * 5 + e.surprised * 2 - e.sad * 4 - e.angry * 4 - e.disgusted * 5),
    forehead: clamp(5 + e.happy * 4 + e.neutral * 2 - e.angry * 5 - e.fearful * 5 - e.disgusted * 4 - e.sad * 2),
    chin:     clamp(5 + e.happy * 4.5 + e.neutral * 2 - e.angry * 5 - e.disgusted * 4 - e.sad * 3 - e.fearful * 3),
    aura:     clamp(5 + e.happy * 5 + e.surprised * 3 - e.sad * 3.5 - e.angry * 4 - e.fearful * 3.5 - e.disgusted * 4),
  };
}

// ─── Fallback Summary (used when AI call fails / no internet) ────────────────
// Keep these short and honest — they're only shown if the API is unavailable
const FALLBACK_SUMMARY: Record<number, string> = {
  1: "That weight is real. Write even one sentence — getting it out of your head is the first step.",
  2: "Something's pulling on you today. Write it out here — you don't need the right words.",
  3: "Steady is good. Worth taking a moment to check in with what today actually felt like.",
  4: "There's good energy here. Write down what's working before the day takes it.",
  5: "You're glowing. Document this — future you will want this reminder that days like this exist.",
};

// ─── AI Summary Fetcher ───────────────────────────────────────────────────────

async function fetchAISummary(
  expressions: ExpressionResult,
  regionScores: RegionScores,
  moodValue: number,
  dominantExpression: string,
  confidence: number,
  lang: string
): Promise<string> {
  const res = await fetch(FACE_SUMMARY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ expressions, regionScores, moodValue, dominantExpression, confidence, lang }),
  });

  if (!res.ok) throw new Error(`ai-face-summary ${res.status}`);
  const data = await res.json();
  if (!data.summary) throw new Error("Empty summary from API");
  return data.summary as string;
}

// ─── Main Analysis Function ───────────────────────────────────────────────────
// Returns initial result with summaryLoading=true — summary is populated async by the hook

export function analyzeExpressions(expressions: ExpressionResult): Omit<MoodDetectionResult, "summary" | "summaryLoading"> {
  const weighted =
    expressions.happy     * 5.0 +
    expressions.surprised * 4.5 +
    expressions.neutral   * 3.0 +
    expressions.sad       * 1.5 +
    expressions.fearful   * 1.5 +
    expressions.angry     * 1.0 +
    expressions.disgusted * 1.0;

  const total = Object.values(expressions).reduce((s, v) => s + (v as number), 0) || 1;
  const rawScore = weighted / total;
  const moodValue = Math.max(1, Math.min(5, Math.round(rawScore))) as 1 | 2 | 3 | 4 | 5;

  const sorted = Object.entries(expressions).sort(([, a], [, b]) => (b as number) - (a as number));
  const [dominantExpression, topScore] = sorted[0] as [string, number];
  const confidence = Math.round(topScore * 100);

  const regionScores = calculateRegionScores(expressions);

  return { moodValue, confidence, dominantExpression, regionScores };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type FaceDetectionStatus =
  | "idle"
  | "loading-models"
  | "requesting-camera"
  | "scanning"
  | "result"
  | "error-permission"
  | "error-no-face"
  | "error-model";

export function useFaceDetection() {
  const { lang } = useLang();

  const [status, setStatus] = useState<FaceDetectionStatus>("idle");
  const [moodResult, setMoodResult] = useState<MoodDetectionResult | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastDetectTime = useRef<number>(0);
  const noFaceFrames = useRef<number>(0);
  // Tracks whether we've already fired the AI summary request for this scan
  const summaryFiredRef = useRef<boolean>(false);

  const stopStream = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    noFaceFrames.current = 0;
  };

  const reset = () => {
    stopStream();
    summaryFiredRef.current = false;
    setStatus("idle");
    setMoodResult(null);
  };

  const activate = async () => {
    setMoodResult(null);
    summaryFiredRef.current = false;
    noFaceFrames.current = 0;

    if (!modelsLoaded) {
      setStatus("loading-models");
      try {
        const faceapi = await import("face-api.js");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        modelsLoaded = true;
      } catch {
        setStatus("error-model");
        return;
      }
    }

    setStatus("requesting-camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          videoRef.current.onloadedmetadata = () => { videoRef.current?.play(); resolve(); };
        });
      }
      setStatus("scanning");
      startDetectionLoop();
    } catch (err: unknown) {
      const isPermission =
        err instanceof Error &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");
      setStatus(isPermission ? "error-permission" : "error-permission");
    }
  };

  const startDetectionLoop = () => {
    const loop = async (timestamp: number) => {
      if (timestamp - lastDetectTime.current < DETECT_INTERVAL_MS) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      lastDetectTime.current = timestamp;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      try {
        const faceapi = await import("face-api.js");
        const detection = await faceapi
          .detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.3 })
          )
          .withFaceExpressions();

        if (detection) {
          noFaceFrames.current = 0;

          // Draw corner-bracket bounding box
          const dims = faceapi.matchDimensions(canvas, video, true);
          const resized = faceapi.resizeResults(detection, dims);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { x, y, width, height } = resized.detection.box;
            const L = Math.min(20, width * 0.2);
            ctx.strokeStyle = "#7C6EDB";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            [
              [[x, y + L], [x, y], [x + L, y]],
              [[x + width - L, y], [x + width, y], [x + width, y + L]],
              [[x, y + height - L], [x, y + height], [x + L, y + height]],
              [[x + width - L, y + height], [x + width, y + height], [x + width, y + height - L]],
            ].forEach(([p1, p2, p3]) => {
              ctx.beginPath();
              ctx.moveTo(p1[0], p1[1]);
              ctx.lineTo(p2[0], p2[1]);
              ctx.lineTo(p3[0], p3[1]);
              ctx.stroke();
            });
          }

          const partial = analyzeExpressions(detection.expressions as ExpressionResult);

          if (!summaryFiredRef.current) {
            // ── First detection: set initial result + fire AI summary request ──
            summaryFiredRef.current = true;

            setMoodResult({ ...partial, summary: "", summaryLoading: true });

            // Capture snapshot for the API call (don't use detection.expressions directly
            // since it might mutate before the async call completes)
            const exprSnapshot = { ...detection.expressions } as ExpressionResult;
            const scoresSnapshot = { ...partial.regionScores };

            fetchAISummary(
              exprSnapshot,
              scoresSnapshot,
              partial.moodValue,
              partial.dominantExpression,
              partial.confidence,
              lang
            )
              .then((summary) => {
                setMoodResult((prev) =>
                  prev ? { ...prev, summary, summaryLoading: false } : null
                );
              })
              .catch(() => {
                setMoodResult((prev) =>
                  prev
                    ? { ...prev, summary: FALLBACK_SUMMARY[partial.moodValue] ?? FALLBACK_SUMMARY[3], summaryLoading: false }
                    : null
                );
              });
          } else {
            // ── Subsequent detections: update scores/mood but PRESERVE summary ──
            setMoodResult((prev) =>
              prev
                ? { ...partial, summary: prev.summary, summaryLoading: prev.summaryLoading }
                : { ...partial, summary: "", summaryLoading: false }
            );
          }
        } else {
          noFaceFrames.current += 1;
          if (noFaceFrames.current > 28) {
            stopStream();
            setStatus("error-no-face");
            return;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch { /* keep looping on transient errors */ }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  const confirmMood = () => {
    stopStream();
    setStatus("result");
  };

  return { status, moodResult, videoRef, canvasRef, activate, confirmMood, reset };
}

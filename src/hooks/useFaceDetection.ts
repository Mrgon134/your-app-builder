import { useRef, useState } from "react";

// Module-level cache — survives React component lifecycle so models load only once per session
let modelsLoaded = false;

const MODEL_URL = "/models";
const DETECT_INTERVAL_MS = 180; // ~5.5fps — faster than before for snappier response

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
  eyes: number;      // Eye brightness / alertness (happy=wide bright, sad=heavy)
  eyebrows: number;  // Brow relaxation (surprised=raised, angry=furrowed)
  cheeks: number;    // Cheek lift — Duchenne smile marker (happy=high)
  forehead: number;  // Forehead relaxation (angry/fearful=tension lines)
  chin: number;      // Jaw relaxation (angry=clenched, happy=loose)
  aura: number;      // Overall facial energy / positivity composite
};

export type MoodDetectionResult = {
  moodValue: 1 | 2 | 3 | 4 | 5;
  confidence: number;        // 0–100, dominant expression probability
  dominantExpression: string;
  regionScores: RegionScores;
  summary: string;           // AI-style emotional narrative
};

// ─── Region Score Calculator ────────────────────────────────────────────────

/**
 * Derives per-area emotional expression scores from face-api.js probabilities.
 * Each score uses a base of 5 shifted by positive/negative expression weights.
 * Clamped to 0–10 integer.
 *
 * Validated against:
 *   Cemberut  (sad 0.4, neutral 0.4, angry 0.1): avg ~3.8 → Low ✓
 *   Marah     (angry 0.65, neutral 0.2):          avg ~2.1 → Rough ✓
 *   Senyum    (happy 0.9):                        avg ~9.2 → Great ✓
 */
export function calculateRegionScores(e: ExpressionResult): RegionScores {
  const clamp = (v: number) => Math.round(Math.max(0, Math.min(10, v)));

  return {
    // Eyes: bright & wide in happy/surprised; heavy in sad/fearful
    eyes: clamp(5 + e.happy * 5 + e.surprised * 3 - e.sad * 5 - e.fearful * 3 - e.angry * 2),

    // Eyebrows: lifted in surprised; deeply furrowed in angry/disgusted
    eyebrows: clamp(5 + e.surprised * 5 + e.happy * 2 - e.angry * 6 - e.disgusted * 4 - e.fearful * 3 - e.sad * 2),

    // Cheeks: raised in genuine smile (Duchenne marker); dropped in sad/disgusted
    cheeks: clamp(5 + e.happy * 5 + e.surprised * 2 - e.sad * 4 - e.angry * 4 - e.disgusted * 5),

    // Forehead: relaxed in happy/neutral; tension lines in angry/fearful
    forehead: clamp(5 + e.happy * 4 + e.neutral * 2 - e.angry * 5 - e.fearful * 5 - e.disgusted * 4 - e.sad * 2),

    // Chin: loose jaw in happy/neutral; clenched in angry/disgusted
    chin: clamp(5 + e.happy * 4.5 + e.neutral * 2 - e.angry * 5 - e.disgusted * 4 - e.sad * 3 - e.fearful * 3),

    // Aura: overall positive facial energy composite
    aura: clamp(5 + e.happy * 5 + e.surprised * 3 - e.sad * 3.5 - e.angry * 4 - e.fearful * 3.5 - e.disgusted * 4),
  };
}

// ─── Emotional Summary Generator ────────────────────────────────────────────

const MOOD_OPENERS: Record<number, string[]> = {
  1: [
    "Your face is carrying real heaviness right now.",
    "The stress in your expression is very visible.",
    "Your features are showing signs of strain.",
  ],
  2: [
    "There's a quiet sadness written in your features.",
    "Your face feels a little weighed down today.",
    "Your expression reflects something low right now.",
  ],
  3: [
    "Your face looks calm and steady.",
    "You appear composed — neither up nor down.",
    "Your expression is fairly balanced right now.",
  ],
  4: [
    "There's a warm ease radiating from your face.",
    "Your features carry a nice sense of lightness.",
    "Your expression shows a quiet, genuine goodness.",
  ],
  5: [
    "Joy is genuinely written all over your face.",
    "Your face is glowing with positive energy.",
    "Your expression is radiating real happiness.",
  ],
};

export function generateEmotionalSummary(
  scores: RegionScores,
  expressions: ExpressionResult,
  moodValue: 1 | 2 | 3 | 4 | 5
): string {
  const openers = MOOD_OPENERS[moodValue];
  const opener = openers[Math.floor(Math.random() * openers.length)];

  const observations: string[] = [];

  if (scores.eyes >= 7)        observations.push("your eyes are bright and alert");
  else if (scores.eyes <= 4)   observations.push("your eyes look heavy or tired");

  if (scores.eyebrows <= 3)    observations.push("your brows are deeply furrowed");
  else if (scores.eyebrows >= 8) observations.push("your brows are relaxed and open");

  if (scores.cheeks >= 7)      observations.push("your cheeks have a genuine upward lift");
  else if (scores.cheeks <= 3) observations.push("the muscles around your cheeks feel tight");

  if (scores.forehead <= 3)    observations.push("there's visible tension in your forehead");
  else if (scores.forehead >= 8) observations.push("your forehead looks completely at ease");

  if (scores.chin <= 3)        observations.push("some jaw tension is coming through");

  let detail = "";
  if (observations.length >= 2) {
    detail = ` I can see ${observations[0]}, and ${observations[1]}.`;
  } else if (observations.length === 1) {
    detail = ` I notice ${observations[0]}.`;
  }

  let closing = "";
  if (expressions.happy > 0.5)         closing = " That smile looks real — hold onto whatever's causing it.";
  else if (expressions.angry > 0.3)    closing = " Take a breath. Your face is holding a lot right now.";
  else if (expressions.sad > 0.3)      closing = " Whatever you're carrying, you don't have to hold it alone.";
  else if (expressions.surprised > 0.4) closing = " Something seems to have caught you off guard today.";
  else if (expressions.neutral > 0.65) closing = " You seem centered and composed — that's a solid place to be.";

  return opener + detail + closing;
}

// ─── Main Analysis Function ──────────────────────────────────────────────────

/**
 * Full facial expression analysis — weighted mood score + per-region scores + narrative.
 *
 * Weighted mood scoring (instead of dominant-only) so subtle negative
 * expressions (cemberut, marah) register even when neutral is still highest:
 *   happy=5.0  surprised=4.5  neutral=3.0  sad=1.5  fearful=1.5  angry=1.0  disgusted=1.0
 */
export function analyzeExpressions(expressions: ExpressionResult): MoodDetectionResult {
  // Weighted overall mood score
  const weighted =
    expressions.happy      * 5.0 +
    expressions.surprised  * 4.5 +
    expressions.neutral    * 3.0 +
    expressions.sad        * 1.5 +
    expressions.fearful    * 1.5 +
    expressions.angry      * 1.0 +
    expressions.disgusted  * 1.0;

  const total = Object.values(expressions).reduce((s, v) => s + (v as number), 0) || 1;
  const rawScore = weighted / total;
  const moodValue = Math.max(1, Math.min(5, Math.round(rawScore))) as 1 | 2 | 3 | 4 | 5;

  // Dominant expression for label display
  const sorted = Object.entries(expressions).sort(([, a], [, b]) => (b as number) - (a as number));
  const [dominantExpression, topScore] = sorted[0] as [string, number];
  const confidence = Math.round(topScore * 100);

  const regionScores = calculateRegionScores(expressions);
  const summary = generateEmotionalSummary(regionScores, expressions, moodValue);

  return { moodValue, confidence, dominantExpression, regionScores, summary };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

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
  const [status, setStatus] = useState<FaceDetectionStatus>("idle");
  const [moodResult, setMoodResult] = useState<MoodDetectionResult | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastDetectTime = useRef<number>(0);
  const noFaceFrames = useRef<number>(0);

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
    setStatus("idle");
    setMoodResult(null);
  };

  const activate = async () => {
    setMoodResult(null);
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
      const isPermission = err instanceof Error &&
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
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 320,      // was 224 — larger = more sensitive
              scoreThreshold: 0.3, // was default 0.5 — lower = catches more faces
            })
          )
          .withFaceExpressions();

        if (detection) {
          noFaceFrames.current = 0;

          // Draw corner-bracket bounding box on canvas
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
            // four corner brackets
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

          const result = analyzeExpressions(detection.expressions as ExpressionResult);
          setMoodResult(result);
        } else {
          noFaceFrames.current += 1;
          // ~5 seconds (28 frames × 180ms) before showing error
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

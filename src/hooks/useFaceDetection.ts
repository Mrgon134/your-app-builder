import { useRef, useState } from "react";

// Module-level cache — survives React component lifecycle so models load only once per session
let modelsLoaded = false;

const MODEL_URL = "/models";
const DETECT_INTERVAL_MS = 250; // ~4fps for detection to save CPU

export type ExpressionResult = {
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  neutral: number;
};

export type MoodDetectionResult = {
  moodValue: 1 | 2 | 3 | 4 | 5;
  confidence: number; // 0–100
  dominantExpression: string;
};

/** Maps face-api.js expression probabilities to a Nuju mood value (1–5) */
export function expressionToMood(expressions: ExpressionResult): MoodDetectionResult {
  const sorted = Object.entries(expressions).sort(([, a], [, b]) => (b as number) - (a as number));
  const [dominantExpression, topScore] = sorted[0] as [string, number];
  const confidence = Math.round(topScore * 100);

  let moodValue: 1 | 2 | 3 | 4 | 5;

  if (dominantExpression === "happy") {
    moodValue = topScore >= 0.7 ? 5 : 4;
  } else if (dominantExpression === "surprised") {
    moodValue = 4;
  } else if (dominantExpression === "neutral") {
    moodValue = 3;
  } else if (dominantExpression === "sad") {
    moodValue = 2;
  } else {
    // angry, fearful, disgusted → Rough
    moodValue = 1;
  }

  return { moodValue, confidence, dominantExpression };
}

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

    // Step 1: Load models (lazy, cached after first load)
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

    // Step 2: Request camera
    setStatus("requesting-camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      streamRef.current = stream;

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise<void>((resolve) => {
          if (!videoRef.current) return resolve();
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            resolve();
          };
        });
      }
      setStatus("scanning");
      startDetectionLoop();
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")
      ) {
        setStatus("error-permission");
      } else {
        setStatus("error-permission");
      }
    }
  };

  const startDetectionLoop = () => {
    const loop = async (timestamp: number) => {
      // Throttle detections to DETECT_INTERVAL_MS
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
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }))
          .withFaceExpressions();

        if (detection) {
          noFaceFrames.current = 0;

          // Draw bounding box on canvas overlay
          const dims = faceapi.matchDimensions(canvas, video, true);
          const resized = faceapi.resizeResults(detection, dims);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw bounding box manually with brand color
            const box = resized.detection.box;
            ctx.strokeStyle = "#7C6EDB";
            ctx.lineWidth = 2;
            ctx.strokeRect(box.x, box.y, box.width, box.height);
            // Corner accents
            const cornerLen = 16;
            ctx.strokeStyle = "#7C6EDB";
            ctx.lineWidth = 3;
            // top-left
            ctx.beginPath(); ctx.moveTo(box.x, box.y + cornerLen); ctx.lineTo(box.x, box.y); ctx.lineTo(box.x + cornerLen, box.y); ctx.stroke();
            // top-right
            ctx.beginPath(); ctx.moveTo(box.x + box.width - cornerLen, box.y); ctx.lineTo(box.x + box.width, box.y); ctx.lineTo(box.x + box.width, box.y + cornerLen); ctx.stroke();
            // bottom-left
            ctx.beginPath(); ctx.moveTo(box.x, box.y + box.height - cornerLen); ctx.lineTo(box.x, box.y + box.height); ctx.lineTo(box.x + cornerLen, box.y + box.height); ctx.stroke();
            // bottom-right
            ctx.beginPath(); ctx.moveTo(box.x + box.width - cornerLen, box.y + box.height); ctx.lineTo(box.x + box.width, box.y + box.height); ctx.lineTo(box.x + box.width, box.y + box.height - cornerLen); ctx.stroke();
          }

          const result = expressionToMood(detection.expressions as ExpressionResult);
          setMoodResult(result);
        } else {
          noFaceFrames.current += 1;
          // After ~4 seconds of no face (16 frames × 250ms), show error
          if (noFaceFrames.current > 16) {
            stopStream();
            setStatus("error-no-face");
            return;
          }
          // Clear canvas when no face
          const ctx = canvas.getContext("2d");
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch {
        // Detection error — keep looping
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  const confirmMood = () => {
    stopStream();
    setStatus("result");
  };

  return {
    status,
    moodResult,
    videoRef,
    canvasRef,
    activate,
    confirmMood,
    reset,
  };
}

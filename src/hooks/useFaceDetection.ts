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
//
// Design principles:
//   1. Validate the emotion — make the user feel *seen*, not analyzed
//   2. Create a moment of curiosity — they want to reflect more
//   3. Always end with a pull toward journaling (question or invitation)
//   4. Sound like Ju — warm, direct, personal. Never clinical.
//   5. Per-mood × per-expression so outputs never feel copy-paste
//
// Structure per template: [emotional mirror] [micro-insight] [journaling pull]

const SUMMARIES: Record<number, Record<string, string[]>> = {
  // ── Rough ────────────────────────────────────────────────────────────────
  1: {
    angry: [
      "That frustration is real — I can see it in your whole face. Something today pushed you to your edge, and holding it in will only make it heavier. Write the ugly version. No filter needed here. What set this off?",
      "There's fire in your features right now. That kind of intensity usually means something matters deeply to you — or someone crossed a line. Don't let it fester. What happened?",
    ],
    sad: [
      "More than just a hard day is written on your face. Something hit deep, and you don't have to make it make sense right now. This is the place where you just say what it is. Talk to me — what's going on?",
      "That look goes beyond today. Something has been building, and it's showing. You deserve somewhere to put this. Write even one sentence — anything. What's the thing you haven't said out loud yet?",
    ],
    fearful: [
      "I can see that held-breath tension — something feels uncertain or scary right now. Whatever you're dreading, naming it makes it smaller. It's okay to be afraid here. What is it you're most worried about?",
      "There's anxiety sitting right there in your expression. That kind of feeling usually lives rent-free until you get it out somewhere. This is that somewhere. What's weighing on you?",
    ],
    disgusted: [
      "Something really rubbed you the wrong way today — that reaction is all over your face. You don't have to justify it. Just let it out. What happened that felt so wrong?",
    ],
    default: [
      "You're holding it together on the surface, but your face tells a different story. That tension underneath — it's real, and it matters. You don't have to name it perfectly. Just start writing. What's actually going on today?",
      "Even in stillness, the weight shows. Sometimes the hardest days are the ones we just push through without acknowledging them. Today deserves a moment of honesty. What are you not letting yourself feel right now?",
    ],
  },

  // ── Low ──────────────────────────────────────────────────────────────────
  2: {
    sad: [
      "I can see the weight in your eyes. You don't have to explain it or wrap it in a neat story — whatever this is, it's valid. Sometimes the heaviest things become clearer when you write them down. Tell me what happened.",
      "That quiet sadness on your face speaks volumes. You might not even know where to start, and that's okay. Just write one sentence — anything. Ju is here, and this space is yours. What's been sitting with you?",
    ],
    angry: [
      "There's a slow burn in your expression — not explosive, just exhausted. Like something has been wrong for a while and you're running low on patience for it. What's been building up that you haven't dealt with yet?",
    ],
    neutral: [
      "Something in you feels muted right now. Not dramatic — just low. Those are actually the days worth paying the most attention to, because something quieter is asking to be heard. What's going on underneath?",
      "You look like you're going through the motions today. That's a real feeling, and it deserves more than just pushing through. What would you say if you let yourself be fully honest right now?",
    ],
    default: [
      "Something feels off today, even if you can't name it exactly. That vague heaviness — it usually points to something specific if you give it space. Let this be where you actually sit with it. What's dragging?",
    ],
  },

  // ── Okay ─────────────────────────────────────────────────────────────────
  3: {
    neutral: [
      "You look steady — but 'okay' can mean a lot of things. Sometimes it's genuinely fine. Sometimes it's holding it together. Which one is it today? A quick entry will tell you more than you expect. What's the honest answer?",
      "That composed look... there's something grounded about it. But even balanced days have texture. What's the one moment from today that stood out — good or bad — that you haven't processed yet?",
    ],
    happy: [
      "There's a small warmth flickering in your expression — not quite great yet, but heading there. Something small is working today. Don't let it go unnoticed. What's the thing that's quietly going right?",
    ],
    sad: [
      "You're hanging in there, and that genuinely counts. But I can see something still pulling on you even as you stay balanced. What's the thing you're not quite letting yourself feel today?",
    ],
    default: [
      "Steady is good. But something tells me there's more to today than 'okay.' What happened that you haven't told anyone about yet — even something small?",
    ],
  },

  // ── Good ─────────────────────────────────────────────────────────────────
  4: {
    happy: [
      "There's a real warmth in your expression right now. Something clicked today — maybe small, maybe significant. Write it down before the day drowns it out. What made this actually feel good?",
      "That quiet contentment? It's earned. Something is working in your favor right now, and you should know why. Capture it — you'll want to revisit this exact energy on harder days. What's the thing worth holding onto?",
    ],
    surprised: [
      "Something caught you off guard in the best way today. That wide-eyed energy — something good happened that you didn't see coming. I want to hear about it. What was it?",
    ],
    neutral: [
      "You're doing genuinely well — I can see it, even through the calm. There's an ease in your face that comes from things actually going alright. What's been the quiet win today that you haven't celebrated yet?",
    ],
    default: [
      "Good energy on you today. Something is working — or someone reminded you that you're more capable than you give yourself credit for. Don't let it just pass by. What's the thing worth remembering about today?",
    ],
  },

  // ── Great ─────────────────────────────────────────────────────────────────
  5: {
    happy: [
      "Look at that — your whole face is lit up. Whatever is happening today, write it down right now. Future you will want to remember exactly this feeling when things get hard again. What made today this good?",
      "You're genuinely glowing. That kind of joy is worth more than just feeling it — it's worth keeping. Capture what made today feel this good so you can come back to it. What's the thing at the center of this?",
      "That smile isn't just on your mouth — it's in your eyes, your cheeks, your whole energy. This is a good day. Don't just ride it — document it. Tell me everything.",
    ],
    surprised: [
      "Something incredible happened, didn't it? That can't-believe-it energy is all over your face. Don't just ride the high — write it down. You'll want this memory exactly as it is right now.",
    ],
    default: [
      "Your face is radiating something real right now. Whatever is behind this energy — it's worth documenting. Not just for today, but for every future day that needs a reminder that this kind of feeling is possible for you. What's the story?",
    ],
  },
};

/** Pick the most emotionally relevant expression key for the current mood */
function pickExpressionKey(expressions: ExpressionResult, moodValue: number): string {
  // For low moods, surface negative expressions even at lower probabilities
  if (moodValue <= 2) {
    if (expressions.angry > 0.18)    return "angry";
    if (expressions.sad > 0.18)      return "sad";
    if (expressions.fearful > 0.18)  return "fearful";
    if (expressions.disgusted > 0.14) return "disgusted";
  }
  // For high moods, surface positive expressions
  if (moodValue >= 4) {
    if (expressions.happy > 0.25)    return "happy";
    if (expressions.surprised > 0.25) return "surprised";
  }
  // Fallback to raw dominant expression
  const sorted = Object.entries(expressions)
    .sort(([, a], [, b]) => (b as number) - (a as number));
  return sorted[0][0];
}

/** Optional one-line addendum for interesting score contradictions */
function scoreAddendum(scores: RegionScores, moodValue: number): string {
  if (moodValue >= 4 && scores.eyebrows <= 3)
    return " Though I notice some tension still in your brows — something's still on your mind even through the good energy.";
  if (moodValue >= 4 && scores.eyes <= 4)
    return " Your eyes look a little tired even through the positivity — something's costing you energy today.";
  if (moodValue <= 2 && scores.eyes >= 8)
    return " Interesting — even through the low mood, there's something bright in your eyes. Something giving you a sliver of hope?";
  return "";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateEmotionalSummary(
  scores: RegionScores,
  expressions: ExpressionResult,
  moodValue: 1 | 2 | 3 | 4 | 5
): string {
  const moodBank = SUMMARIES[moodValue];
  const key = pickExpressionKey(expressions, moodValue);
  const templates = moodBank[key] ?? moodBank.default;
  return pick(templates) + scoreAddendum(scores, moodValue);
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

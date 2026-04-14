import { MOODS } from "@/lib/constants";

const BRAND_COLOR = "#7C6EDB";
const BG_LIGHT = "#F8F6FF";
const TEXT_DARK = "#1A1A2E";
const TEXT_MUTED = "#777777";

// Draw rounded rect helper
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Draw mood emoji face on canvas
function drawMoodFace(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, mood: number, color: string) {
  // Circle bg
  ctx.fillStyle = color + "25";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Circle border
  ctx.strokeStyle = color;
  ctx.lineWidth = radius * 0.08;
  ctx.stroke();

  // Eyes
  const eyeR = radius * 0.1;
  const eyeY = cy - radius * 0.1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx - radius * 0.3, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + radius * 0.3, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fill();

  // Mouth
  ctx.strokeStyle = color;
  ctx.lineWidth = radius * 0.08;
  ctx.lineCap = "round";
  ctx.beginPath();
  const mouthY = cy + radius * 0.25;
  if (mood >= 4) {
    ctx.moveTo(cx - radius * 0.35, mouthY);
    ctx.quadraticCurveTo(cx, mouthY + radius * (mood === 5 ? 0.4 : 0.25), cx + radius * 0.35, mouthY);
  } else if (mood === 3) {
    ctx.moveTo(cx - radius * 0.25, mouthY + radius * 0.05);
    ctx.lineTo(cx + radius * 0.25, mouthY + radius * 0.05);
  } else {
    ctx.moveTo(cx - radius * 0.3, mouthY + radius * 0.15);
    ctx.quadraticCurveTo(cx, mouthY - radius * (mood === 1 ? 0.25 : 0.15), cx + radius * 0.3, mouthY + radius * 0.15);
  }
  ctx.stroke();
}

function drawBrandWatermark(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 28px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("nuju.app", w / 2, h - 60);
  
  ctx.fillStyle = BRAND_COLOR + "40";
  ctx.font = "500 20px 'DM Sans', sans-serif";
  ctx.fillText("Track your mood · Talk to Ju", w / 2, h - 30);
}

export type ShareCardType = "daily" | "weekly" | "streak" | "year";

interface DailyCardData {
  mood: number;
  date: string;
  text?: string;
}

interface WeeklyCardData {
  moods: number[];
  avgMood: number;
  totalEntries: number;
}

interface StreakCardData {
  streak: number;
}

interface YearCardData {
  year: string;
  totalEntries: number;
  avgMood: number;
  bestMonth: string;
  streak: number;
}

export async function generateShareCard(
  type: ShareCardType,
  data: DailyCardData | WeeklyCardData | StreakCardData | YearCardData
): Promise<Blob> {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#F5F3FF");
  grad.addColorStop(0.5, "#EDE9FE");
  grad.addColorStop(1, "#F8F6FF");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle pattern dots
  ctx.fillStyle = BRAND_COLOR + "08";
  for (let x = 0; x < W; x += 40) {
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (type === "daily") {
    drawDailyCard(ctx, W, H, data as DailyCardData);
  } else if (type === "weekly") {
    drawWeeklyCard(ctx, W, H, data as WeeklyCardData);
  } else if (type === "year") {
    drawYearCard(ctx, W, H, data as YearCardData);
  } else {
    drawStreakCard(ctx, W, H, data as StreakCardData);
  }

  drawBrandWatermark(ctx, W, H);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

function drawDailyCard(ctx: CanvasRenderingContext2D, W: number, H: number, data: DailyCardData) {
  const moodData = MOODS.find((m) => m.value === data.mood) || MOODS[2];

  // Title
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "700 48px 'Lora', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Today's Mood", W / 2, 280);

  // Date
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 32px 'DM Sans', sans-serif";
  const dateStr = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  ctx.fillText(dateStr, W / 2, 340);

  // Big mood face
  drawMoodFace(ctx, W / 2, H * 0.4, 160, data.mood, moodData.color);

  // Mood label
  ctx.fillStyle = moodData.color;
  ctx.font = "700 64px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(moodData.label, W / 2, H * 0.4 + 240);

  // Quote card
  if (data.text) {
    const cardY = H * 0.6;
    const cardW = W - 160;
    const cardH = 300;
    const cardX = 80;

    ctx.fillStyle = "#FFFFFF90";
    roundRect(ctx, cardX, cardY, cardW, cardH, 32);
    ctx.fill();

    ctx.strokeStyle = BRAND_COLOR + "20";
    ctx.lineWidth = 2;
    roundRect(ctx, cardX, cardY, cardW, cardH, 32);
    ctx.stroke();

    // Quote text (truncated)
    ctx.fillStyle = TEXT_DARK;
    ctx.font = "italic 400 30px 'Newsreader', Georgia, serif";
    ctx.textAlign = "center";
    const quote = data.text.length > 120 ? data.text.slice(0, 120) + "…" : data.text;
    wrapText(ctx, `"${quote}"`, W / 2, cardY + 80, cardW - 80, 44);
  }
}

function drawWeeklyCard(ctx: CanvasRenderingContext2D, W: number, H: number, data: WeeklyCardData) {
  // Title
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "700 48px 'Lora', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("My Week in Moods", W / 2, 280);

  // Week bars
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const barW = 100;
  const gap = 20;
  const totalW = days.length * barW + (days.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const barBaseY = H * 0.55;
  const maxBarH = 400;

  data.moods.forEach((mood, i) => {
    const moodData = MOODS.find((m) => m.value === mood) || MOODS[2];
    const barH = Math.max(mood * (maxBarH / 5), 40);
    const x = startX + i * (barW + gap);
    const y = barBaseY - barH;

    // Bar
    ctx.fillStyle = moodData.color;
    roundRect(ctx, x, y, barW, barH, 20);
    ctx.fill();

    // Day label
    ctx.fillStyle = TEXT_MUTED;
    ctx.font = "500 26px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(days[i], x + barW / 2, barBaseY + 40);

    // Mood face on top
    drawMoodFace(ctx, x + barW / 2, y - 40, 28, mood, moodData.color);
  });

  // Stats row
  const statsY = H * 0.7;
  // Avg mood
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "700 72px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(data.avgMood.toFixed(1), W * 0.3, statsY);
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 28px 'DM Sans', sans-serif";
  ctx.fillText("Avg Mood", W * 0.3, statsY + 40);

  // Total entries
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "700 72px 'DM Sans', sans-serif";
  ctx.fillText(String(data.totalEntries), W * 0.7, statsY);
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 28px 'DM Sans', sans-serif";
  ctx.fillText("Entries", W * 0.7, statsY + 40);
}

function drawStreakCard(ctx: CanvasRenderingContext2D, W: number, H: number, data: StreakCardData) {
  // Title
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "700 48px 'Lora', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("🔥 Streak Milestone!", W / 2, 300);

  // Big streak number
  ctx.fillStyle = BRAND_COLOR;
  ctx.font = "800 200px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(String(data.streak), W / 2, H * 0.45);

  // Label
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "600 48px 'DM Sans', sans-serif";
  ctx.fillText("days in a row", W / 2, H * 0.45 + 70);

  // Motivational text
  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "italic 400 32px 'Newsreader', Georgia, serif";
  ctx.fillText("Consistency is a superpower.", W / 2, H * 0.6);

  // Decorative flames
  const flames = ["🔥", "✨", "💜", "🌟"];
  flames.forEach((emoji, i) => {
    ctx.font = "64px sans-serif";
    const angle = (i / flames.length) * Math.PI * 2 - Math.PI / 2;
    const rx = 280;
    const ry = 280;
    const x = W / 2 + Math.cos(angle) * rx;
    const y = H * 0.42 + Math.sin(angle) * ry;
    ctx.fillText(emoji, x - 32, y + 20);
  });
}

function drawYearCard(ctx: CanvasRenderingContext2D, W: number, H: number, data: YearCardData) {
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "700 48px 'Lora', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(`${data.year} in Review`, W / 2, 240);

  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "500 28px 'DM Sans', sans-serif";
  ctx.fillText("A look back at your journaling year", W / 2, 292);

  const heroX = 90;
  const heroY = 360;
  const heroW = W - 180;
  const heroH = 300;
  ctx.fillStyle = "#FFFFFFB8";
  roundRect(ctx, heroX, heroY, heroW, heroH, 40);
  ctx.fill();
  ctx.strokeStyle = BRAND_COLOR + "25";
  ctx.lineWidth = 2;
  roundRect(ctx, heroX, heroY, heroW, heroH, 40);
  ctx.stroke();

  ctx.fillStyle = BRAND_COLOR;
  ctx.font = "800 128px 'DM Sans', sans-serif";
  ctx.fillText(String(data.totalEntries), W / 2, heroY + 155);
  ctx.fillStyle = TEXT_DARK;
  ctx.font = "600 34px 'DM Sans', sans-serif";
  ctx.fillText("entries captured", W / 2, heroY + 215);

  const stats = [
    { label: "Avg Mood", value: data.avgMood.toFixed(1), color: "#4ECDC4" },
    { label: "Best Month", value: data.bestMonth, color: "#FFB347" },
    { label: "Streak", value: `${data.streak}d`, color: "#E8878C" },
  ];
  const cardW = 270;
  const cardH = 190;
  const gap = 45;
  const totalW = cardW * stats.length + gap * (stats.length - 1);
  const startX = (W - totalW) / 2;
  const statsY = 760;

  stats.forEach((stat, index) => {
    const x = startX + index * (cardW + gap);
    ctx.fillStyle = "#FFFFFF96";
    roundRect(ctx, x, statsY, cardW, cardH, 32);
    ctx.fill();
    ctx.strokeStyle = stat.color + "30";
    ctx.lineWidth = 2;
    roundRect(ctx, x, statsY, cardW, cardH, 32);
    ctx.stroke();

    ctx.fillStyle = stat.color;
    ctx.font = "700 42px 'DM Sans', sans-serif";
    ctx.fillText(stat.value, x + cardW / 2, statsY + 88);

    ctx.fillStyle = TEXT_MUTED;
    ctx.font = "600 24px 'DM Sans', sans-serif";
    ctx.fillText(stat.label, x + cardW / 2, statsY + 130);
  });

  const avgMoodValue = Math.max(1, Math.min(5, Math.round(data.avgMood)));
  const avgMoodData = MOODS.find((m) => m.value === avgMoodValue) || MOODS[2];
  drawMoodFace(ctx, W / 2, 1270, 120, avgMoodValue, avgMoodData.color);

  ctx.fillStyle = TEXT_DARK;
  ctx.font = "600 42px 'DM Sans', sans-serif";
  ctx.fillText("You kept showing up for yourself.", W / 2, 1480);

  ctx.fillStyle = TEXT_MUTED;
  ctx.font = "italic 400 30px 'Newsreader', Georgia, serif";
  wrapText(
    ctx,
    `From ${data.totalEntries} moments captured to a ${data.streak}-day streak, this year counts.`,
    W / 2,
    1545,
    W - 220,
    44
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== "") {
      ctx.fillText(line.trim(), x, currentY);
      line = word + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

// ─── Mood Moment Card (Post-Entry Selfie Journey) ────────────────────────────

export interface MoodMomentCardData {
  selfieBlob: Blob;
  beforeMood: number;    // 1–5 from selectedMood when writing
  afterMood: number;     // 1–5 from face scan after writing
  date: string;          // ISO string
  beforeLabel?: string;  // e.g. "Before writing"
  afterLabel?: string;   // e.g. "After writing"
}

async function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load failed")); };
    img.src = url;
  });
}

export async function drawMoodMomentCard(data: MoodMomentCardData): Promise<Blob> {
  const W = 1080;
  const H = 1350; // 4:5 ratio — Instagram/TikTok
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const beforeMoodObj = MOODS.find((m) => m.value === data.beforeMood) ?? MOODS[2];
  const afterMoodObj = MOODS.find((m) => m.value === data.afterMood) ?? MOODS[2];

  // ── Background ──
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#13111C");
  bg.addColorStop(1, "#1E1B36");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Selfie photo (top ~58%) ──
  const PHOTO_H = 780;
  const CORNER = 40;
  ctx.save();
  roundRect(ctx, 0, 0, W, PHOTO_H, CORNER);
  ctx.clip();
  try {
    const selfieImg = await loadImageFromBlob(data.selfieBlob);
    // Cover-fit the selfie
    const scale = Math.max(W / selfieImg.width, PHOTO_H / selfieImg.height);
    const sw = selfieImg.width * scale;
    const sh = selfieImg.height * scale;
    const sx = (W - sw) / 2;
    const sy = (PHOTO_H - sh) / 2;
    ctx.drawImage(selfieImg, sx, sy, sw, sh);
  } catch {
    ctx.fillStyle = "#2A2640";
    ctx.fillRect(0, 0, W, PHOTO_H);
  }
  ctx.restore();

  // Bottom gradient overlay on photo
  const photoGrad = ctx.createLinearGradient(0, PHOTO_H - 200, 0, PHOTO_H);
  photoGrad.addColorStop(0, "rgba(19,17,28,0)");
  photoGrad.addColorStop(1, "rgba(19,17,28,0.95)");
  ctx.fillStyle = photoGrad;
  ctx.fillRect(0, PHOTO_H - 200, W, 200);

  // ── Title ──
  ctx.fillStyle = "#E8E4F8";
  ctx.font = "600 52px 'Lora', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(data.beforeLabel?.replace("Before writing", "My Emotional Journey") ?? "My Emotional Journey", W / 2, 870);

  // ── Before/After card ──
  const CARD_X = 60;
  const CARD_Y = 910;
  const CARD_W = W - 120;
  const CARD_H = 310;
  const CARD_R = 32;

  // Glass card background
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  roundRect(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, CARD_R);
  ctx.fill();
  ctx.strokeStyle = "rgba(124,110,219,0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const halfW = CARD_W / 2;
  const centerX = CARD_X + halfW;
  const cardCY = CARD_Y + CARD_H / 2;

  // Divider line
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX, CARD_Y + 30);
  ctx.lineTo(centerX, CARD_Y + CARD_H - 30);
  ctx.stroke();

  // Arrow between the two halves
  ctx.fillStyle = BRAND_COLOR;
  ctx.font = "bold 40px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("→", centerX, cardCY + 14);

  // ── Before section ──
  const FACE_R = 52;
  const beforeX = CARD_X + halfW / 2;
  drawMoodFace(ctx, beforeX, CARD_Y + 100, FACE_R, data.beforeMood, beforeMoodObj.color);

  ctx.fillStyle = beforeMoodObj.color;
  ctx.font = "bold 36px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(beforeMoodObj.label, beforeX, CARD_Y + 185);

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "26px 'DM Sans', sans-serif";
  ctx.fillText(data.beforeLabel ?? "Before writing", beforeX, CARD_Y + 225);

  // ── After section ──
  const afterX = CARD_X + halfW + halfW / 2;
  drawMoodFace(ctx, afterX, CARD_Y + 100, FACE_R, data.afterMood, afterMoodObj.color);

  ctx.fillStyle = afterMoodObj.color;
  ctx.font = "bold 36px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(afterMoodObj.label, afterX, CARD_Y + 185);

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "26px 'DM Sans', sans-serif";
  ctx.fillText(data.afterLabel ?? "After writing", afterX, CARD_Y + 225);

  // Mood improvement sparkle
  if (data.afterMood > data.beforeMood) {
    ctx.fillStyle = "#4ECDC4";
    ctx.font = "500 28px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ Writing helped!", W / 2, CARD_Y + CARD_H + 50);
  }

  // ── Date ──
  const dateStr = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "26px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(dateStr, W / 2, 1285);

  // ── Brand watermark ──
  drawBrandWatermark(ctx, W, H);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
      "image/jpeg",
      0.92
    );
  });
}

export async function shareImage(blob: Blob, title: string, fileName = "nuju-mood.png") {
  const file = new File([blob], fileName, { type: blob.type || "image/png" });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title,
      text: "Check out my mood on Nuju 💜",
      files: [file],
    });
  } else {
    // Fallback: download
    downloadBlob(blob, fileName);
  }
}

export function downloadBlob(blob: Blob, fileName = "nuju-moment.jpg") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export type ShareTarget = "instagram" | "tiktok" | "whatsapp" | "x" | "save";

export interface ShareTargetMeta {
  id: ShareTarget;
  label: string;
  icon: string;
  color: string;
}

export const SHARE_TARGETS: ShareTargetMeta[] = [
  { id: "instagram", label: "IG Story",  icon: "📸", color: "#E1306C" },
  { id: "tiktok",    label: "TikTok",    icon: "🎵", color: "#010101" },
  { id: "whatsapp",  label: "WA Status", icon: "💬", color: "#25D366" },
  { id: "x",         label: "X / Tweet", icon: "𝕏",  color: "#1DA1F2" },
  { id: "save",      label: "Save",      icon: "💾", color: "#7C6EDB" },
];

/**
 * Share to a specific social target.
 *
 * On mobile the approach is:
 *  - Generate the share card image
 *  - Use navigator.share / clipboard / deep-link depending on platform
 *
 * Instagram Stories: use the ig:// deep link with the image copied to clipboard
 * and ask the user to paste, OR use the Web Share API with files targeting IG.
 *
 * For all platforms: we first try the Web Share API with the target hint,
 * then fall back to opening the app deep-link after saving to clipboard,
 * then fall back to download.
 */
export async function shareToTarget(
  blob: Blob, 
  target: ShareTarget,
  caption = "My mood moment on Nuju 💜 nuju.app"
) {
  const file = new File([blob], "nuju-moment.jpg", { type: "image/jpeg" });
  const canNativeShare = navigator.share && navigator.canShare?.({ files: [file] });

  switch (target) {
    case "save":
      downloadBlob(blob, "nuju-moment.jpg");
      return;

    case "instagram": {
      // Try native share (works on mobile — iOS/Android will show IG Stories as an option)
      if (canNativeShare) {
        await navigator.share({ files: [file] });
        return;
      }
      // Fallback: copy image to clipboard and open IG
      await copyImageToClipboard(blob);
      window.open("https://www.instagram.com/stories/create/", "_blank");
      return;
    }

    case "tiktok": {
      if (canNativeShare) {
        await navigator.share({ files: [file] });
        return;
      }
      // TikTok doesn't have a direct web-to-story URL, so download + open
      downloadBlob(blob, "nuju-moment.jpg");
      window.open("https://www.tiktok.com/upload", "_blank");
      return;
    }

    case "whatsapp": {
      if (canNativeShare) {
        await navigator.share({ files: [file], text: caption });
        return;
      }
      // Fallback: send text link (WA Web cannot receive files from JS)
      downloadBlob(blob, "nuju-moment.jpg");
      window.open(`https://wa.me/?text=${encodeURIComponent(caption + "\n\n(image saved to your device — attach it!)")}`, "_blank");
      return;
    }

    case "x": {
      if (canNativeShare) {
        await navigator.share({ files: [file], text: caption });
        return;
      }
      // Fallback: open X tweet composer
      downloadBlob(blob, "nuju-moment.jpg");
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(caption + "\n\n(image saved — attach it to your tweet!)")}`, "_blank");
      return;
    }
  }
}

/** Copy an image blob to the system clipboard (if supported). */
async function copyImageToClipboard(blob: Blob) {
  try {
    // Convert to PNG if needed (clipboard API requires image/png)
    let pngBlob = blob;
    if (blob.type !== "image/png") {
      const img = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      pngBlob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), "image/png"));
    }
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": pngBlob }),
    ]);
  } catch {
    // Clipboard write not supported — silently ignore
  }
}

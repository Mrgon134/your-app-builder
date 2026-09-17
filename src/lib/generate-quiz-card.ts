import { QuizMeta, QuizResult } from "@/data/quizzes";
import { DassEvaluationResult, SupportedLang } from "@/data/dass21";
import { AttachmentProfile } from "@/data/attachment-style";
import { AdhdResultProfile } from "@/data/adhd-screener";
import { InnerChildProfile, InnerChildLang } from "@/data/inner-child";
import { BurnoutResult, BurnoutLang } from "@/data/burnout-screener";
import { LoveLanguageResult, LoveLang } from "@/data/love-languages";
import { PeoplePleaserResult, PeoplePleaserLang } from "@/data/people-pleasing";
import { HspProfile, HspLang } from "@/data/hsp";
import { ShadowResult, ShadowLang } from "@/data/shadow-work";
import { DopamineProfile, DopamineLang } from "@/data/dopamine-detox";
import { VagalProfile, VagalLang } from "@/data/nervous-system";
import { RsdProfile, RsdLang, RsdLevel } from "@/data/rsd-screener";
import { DistortionInfo, CbtLang } from "@/data/cognitive-distortions";
import { DissociationProfile, DissociationLang, DissociationLevel } from "@/data/dissociation-screener";
import { ImposterProfile, ImposterLang, ImposterLevel, ArchetypeDetail } from "@/data/imposter-syndrome";
import { AgilityScoreResult, AgilityLang } from "@/data/emotional-agility";
import { HfaScoreResult, HfaLang } from "@/data/high-functioning-anxiety";
import { ParentificationScoreResult, ParentificationLang } from "@/data/parentification";
import { AlexithymiaScoreResult, AlexithymiaLang } from "@/data/alexithymia";
import { LimerenceScoreResult, LimerenceLang } from "@/data/limerence";
import { SensoryScoreResult, SensoryLang } from "@/data/sensory-overload";
import { PerfectionismScoreResult, PerfectionismLang } from "@/data/perfectionism";
import { SocialBatteryScoreResult, SocialBatteryLang } from "@/data/social-battery";
import { GaslightingScoreResult, GaslightingLang } from "@/data/gaslighting";
import { CortisolScoreResult, CortisolLang } from "@/data/cortisol";
import { EmotionalAvailabilityScoreResult, EmotionalAvailabilityLang } from "@/data/emotional-availability";
import { BedtimeProcrastinationScoreResult, BedtimeProcrastinationLang } from "@/data/bedtime-procrastination";
import { ChronicGuiltScoreResult, ChronicGuiltLang } from "@/data/chronic-guilt";
import { HyperIndependenceScoreResult, HyperIndependenceLang } from "@/data/hyper-independence";

/**
 * Draws a rounded rectangle path on the canvas context with fallback for older environments.
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

/**
 * Helper to wrap text cleanly across multiple lines.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 4
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  let linesCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      if (linesCount >= maxLines - 1) {
        ctx.fillText(line.trim() + "...", x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
      linesCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

/**
 * Loads an image with a timeout fallback.
 */
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src || typeof window === "undefined") {
      return resolve(null);
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      return resolve(img);
    }

    // 1.2 second fallback timeout
    setTimeout(() => resolve(null), 1200);
  });
}

export interface GeneratedCardResult {
  dataUrl: string;
  blob: Blob;
  file: File;
}

/**
 * Generates an ultra-crisp 1080x1350px shareable card for Instagram Stories, WhatsApp Status & Twitter.
 */
export async function generateQuizResultCard(
  quiz: QuizMeta,
  result: QuizResult
): Promise<GeneratedCardResult> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create 2D canvas context");
  }

  // 1. BASE BACKGROUND: Warm luxury paper tone (#FAF8F5)
  ctx.fillStyle = "#FAF7F2";
  ctx.fillRect(0, 0, width, height);

  // 2. ATMOSPHERIC AMBIENT GLOWS
  // Top-right amber radial aura
  const amberGlow = ctx.createRadialGradient(900, 180, 50, 900, 180, 550);
  amberGlow.addColorStop(0, "rgba(245, 158, 11, 0.18)");
  amberGlow.addColorStop(0.6, "rgba(245, 158, 11, 0.05)");
  amberGlow.addColorStop(1, "rgba(250, 247, 242, 0)");
  ctx.fillStyle = amberGlow;
  ctx.fillRect(0, 0, width, height);

  // Bottom-left rose-peach radial aura
  const peachGlow = ctx.createRadialGradient(180, 1150, 50, 180, 1150, 600);
  peachGlow.addColorStop(0, "rgba(244, 63, 94, 0.12)");
  peachGlow.addColorStop(0.6, "rgba(244, 63, 94, 0.03)");
  peachGlow.addColorStop(1, "rgba(250, 247, 242, 0)");
  ctx.fillStyle = peachGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. INNER ELEGANT BORDER
  ctx.save();
  ctx.strokeStyle = "rgba(180, 160, 140, 0.4)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36);
  ctx.stroke();
  ctx.restore();

  // Corner decorative accents
  ctx.fillStyle = "rgba(180, 150, 120, 0.6)";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✦", 68, 68);
  ctx.fillText("✦", width - 68, 68);
  ctx.fillText("✦", 68, height - 68);
  ctx.fillText("✦", width - 68, height - 68);

  // 4. TOP BADGE: "NUJU REFLECTION LAB • [FLAG] [QUIZ TITLE]"
  const topPillX = width / 2;
  const topPillY = 95;
  const topPillText = `NUJU REFLECTION LAB • ${quiz.countryFlag || "✨"} ${quiz.shortTitle.toUpperCase()}`;

  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const pillWidth = ctx.measureText(topPillText).width + 56;
  const pillHeight = 44;

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "#FFFFFF";
  drawRoundedRect(ctx, topPillX - pillWidth / 2, topPillY - pillHeight / 2, pillWidth, pillHeight, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(217, 119, 6, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "#92400E"; // Amber-800
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(topPillText, topPillX, topPillY + 1);

  // 5. MASCOT AVATAR SECTION
  const mascotCenterY = 270;
  const mascotRadius = 110;

  // Mascot circular halo & shadow
  ctx.save();
  ctx.shadowColor = "rgba(217, 119, 6, 0.15)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(width / 2, mascotCenterY, mascotRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // Load and draw mascot image
  const mascotImg = await loadImage(result.mascotImage);
  if (mascotImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, mascotCenterY, mascotRadius - 6, 0, Math.PI * 2);
    ctx.clip();
    const imgSize = 190;
    ctx.drawImage(
      mascotImg,
      width / 2 - imgSize / 2,
      mascotCenterY - imgSize / 2 + 5,
      imgSize,
      imgSize
    );
    ctx.restore();
  } else {
    // Fallback emoji avatar if image not ready
    ctx.font = "80px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🌿", width / 2, mascotCenterY);
  }

  // 6. RESULT BADGE / PERCENTAGE PILL
  const badgeY = 418;
  const badgeText = `${result.badge} ${result.percentageDisplay ? `• ${result.percentageDisplay}` : ""}`.trim();
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const badgeWidth = ctx.measureText(badgeText).width + 48;
  const badgeHeight = 44;

  ctx.save();
  ctx.shadowColor = "rgba(217, 119, 6, 0.1)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "#FEF3C7"; // Amber-100
  drawRoundedRect(ctx, width / 2 - badgeWidth / 2, badgeY - badgeHeight / 2, badgeWidth, badgeHeight, 22);
  ctx.fill();
  ctx.strokeStyle = "#FDE68A";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "#B45309"; // Amber-700
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, width / 2, badgeY);

  // 7. DIAGNOSIS TITLE & QUOTABLE TAGLINE
  ctx.fillStyle = "#1C1917"; // Stone-900
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // Wrap title cleanly
  const titleY = 465;
  const nextY = wrapText(ctx, result.title, width / 2, titleY, 900, 52, 2);

  // Tagline in elegant italics
  ctx.font = "italic 24px Georgia, serif";
  ctx.fillStyle = "#57534E"; // Stone-600
  const taglineY = Math.max(nextY + 12, 575);
  const afterTaglineY = wrapText(ctx, `“${result.tagline}”`, width / 2, taglineY, 860, 36, 2);

  // 8. PSYCHOLOGICAL INSIGHT & ACTION STEPS CARD
  const cardX = 70;
  const cardY = Math.max(afterTaglineY + 25, 660);
  const cardWidth = width - 140;
  const cardHeight = 440;

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.04)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = "#FFFFFF";
  drawRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(220, 210, 200, 0.8)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Card Section 1: Insight header
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#B45309";
  ctx.fillText("🧠 DIAGNOSA PSIKOLOGI EMOSI", cardX + 36, cardY + 32);

  // Card Section 2: Insight body text
  ctx.font = "21px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#44403C";
  const insightEndY = wrapText(
    ctx,
    result.description,
    cardX + 36,
    cardY + 70,
    cardWidth - 72,
    33,
    3
  );

  // Divider inside card
  ctx.strokeStyle = "#F5F0EB";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const dividerY = Math.max(insightEndY + 20, cardY + 195);
  ctx.moveTo(cardX + 36, dividerY);
  ctx.lineTo(cardX + cardWidth - 36, dividerY);
  ctx.stroke();

  // Card Section 3: 2 Key Actionable Steps
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#15803D"; // Emerald-700
  ctx.fillText("🌱 LANGKAH PEMULIHAN CEPAT", cardX + 36, dividerY + 20);

  ctx.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#292524";

  let stepY = dividerY + 56;
  if (result.actionableSteps[0]) {
    stepY = wrapText(
      ctx,
      `1. ${result.actionableSteps[0]}`,
      cardX + 36,
      stepY,
      cardWidth - 72,
      29,
      2
    );
  }
  if (result.actionableSteps[1]) {
    wrapText(
      ctx,
      `2. ${result.actionableSteps[1]}`,
      cardX + 36,
      stepY + 8,
      cardWidth - 72,
      29,
      2
    );
  }

  // 9. FOOTER BRANDING & VIRAL CTA
  const footerY = 1170;

  // Divider line above footer
  ctx.strokeStyle = "rgba(200, 190, 180, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(70, footerY);
  ctx.lineTo(width - 70, footerY);
  ctx.stroke();

  // Left Brand: Logo & Tagline
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "bold 32px Georgia, serif";
  ctx.fillStyle = "#1C1917";
  ctx.fillText("Nuju", 70, footerY + 24);

  // Small dot
  ctx.fillStyle = "#D97706";
  ctx.beginPath();
  ctx.arc(150, footerY + 44, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#78716C";
  ctx.fillText("Ruang curhat & rilis emosi harian • Unduh di App Store", 70, footerY + 68);

  // Right Viral CTA Box
  const ctaPillText = "Cek Kondisimu di nuju.app/quiz →";
  ctx.font = "bold 19px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const ctaWidth = ctx.measureText(ctaPillText).width + 42;
  const ctaHeight = 50;
  const ctaX = width - 70 - ctaWidth;
  const ctaY = footerY + 30;

  ctx.save();
  ctx.shadowColor = "rgba(217, 119, 6, 0.25)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "#D97706"; // Amber-600
  drawRoundedRect(ctx, ctaX, ctaY, ctaWidth, ctaHeight, 25);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ctaPillText, ctaX + ctaWidth / 2, ctaY + ctaHeight / 2);

  // 10. CONVERT TO DATA URL, BLOB, AND FILE
  const dataUrl = canvas.toDataURL("image/png", 0.95);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Failed to create blob from canvas"));
      },
      "image/png",
      0.95
    );
  });

  const fileName = `nuju-${quiz.slug}-${result.id}.png`;
  const file = new File([blob], fileName, { type: "image/png" });

  return {
    dataUrl,
    blob,
    file,
  };
}

/**
 * Generates an ultra-crisp 1080x1350px shareable card specifically for DASS-21 3-pillar results.
 */
export async function generateDass21Card(
  result: DassEvaluationResult,
  lang: SupportedLang = "en"
): Promise<GeneratedCardResult> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create 2D canvas context");
  }

  // 1. BASE BACKGROUND: Warm luxury paper tone (#FAF8F5)
  ctx.fillStyle = "#FAF7F2";
  ctx.fillRect(0, 0, width, height);

  // 2. ATMOSPHERIC AMBIENT GLOWS
  const amberGlow = ctx.createRadialGradient(920, 200, 60, 920, 200, 600);
  amberGlow.addColorStop(0, "rgba(245, 158, 11, 0.20)");
  amberGlow.addColorStop(0.6, "rgba(245, 158, 11, 0.05)");
  amberGlow.addColorStop(1, "rgba(250, 247, 242, 0)");
  ctx.fillStyle = amberGlow;
  ctx.fillRect(0, 0, width, height);

  const tealGlow = ctx.createRadialGradient(180, 1150, 60, 180, 1150, 600);
  tealGlow.addColorStop(0, "rgba(20, 184, 166, 0.15)");
  tealGlow.addColorStop(0.6, "rgba(20, 184, 166, 0.04)");
  tealGlow.addColorStop(1, "rgba(250, 247, 242, 0)");
  ctx.fillStyle = tealGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. INNER ELEGANT BORDER
  ctx.save();
  ctx.strokeStyle = "rgba(180, 160, 140, 0.35)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 36, 36, width - 72, height - 72, 32);
  ctx.stroke();
  ctx.restore();

  // 4. HEADER PILL & TITLE
  const headerBadge = lang === "en" ? "NUJU LABS • DASS-21 CLINICAL SCREENER" : "NUJU LABS • SKRINING DASS-21 KLINIS";
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const badgeMetrics = ctx.measureText(headerBadge);
  const badgeWidth = badgeMetrics.width + 36;
  const badgeHeight = 36;
  const badgeX = (width - badgeWidth) / 2;
  const badgeY = 65;

  ctx.fillStyle = "rgba(245, 158, 11, 0.12)";
  drawRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 18);
  ctx.stroke();

  ctx.fillStyle = "#B45309";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(headerBadge, width / 2, badgeY + badgeHeight / 2);

  // 5. SCORE DISPLAY & MASCOT JU
  const scoreCardY = 125;
  const scoreCardHeight = 240;
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  drawRoundedRect(ctx, 70, scoreCardY, width - 140, scoreCardHeight, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(230, 220, 205, 0.9)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 70, scoreCardY, width - 140, scoreCardHeight, 28);
  ctx.stroke();
  ctx.restore();

  // Mascot Image on the right of card
  const mascotImg = await loadImage(result.mascotImage);
  if (mascotImg) {
    ctx.save();
    const mascotSize = 180;
    const mascotX = width - 70 - mascotSize - 35;
    const mascotY = scoreCardY + (scoreCardHeight - mascotSize) / 2;
    ctx.beginPath();
    ctx.arc(mascotX + mascotSize / 2, mascotY + mascotSize / 2, mascotSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(mascotImg, mascotX, mascotY, mascotSize, mascotSize);
    ctx.restore();
  }

  // Left text of score card: Wellness Index
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#78716C";
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const indexLabel = lang === "en" ? "MENTAL WELLNESS INDEX" : "INDEKS KESEHATAN MENTAL";
  ctx.fillText(indexLabel, 110, scoreCardY + 38);

  ctx.font = "bold 84px Georgia, serif";
  ctx.fillStyle = "#1C1917";
  ctx.fillText(`${result.wellnessIndex}`, 110, scoreCardY + 62);

  ctx.font = "32px Georgia, serif";
  ctx.fillStyle = "#A8A29E";
  ctx.fillText("/ 100", 250, scoreCardY + 104);

  // Status badge under score
  ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const statusText = result.tagline;
  ctx.fillStyle = "#44403C";
  wrapText(ctx, statusText, 110, scoreCardY + 160, 520, 22, 2);

  // 6. RESULT TITLE
  ctx.textAlign = "center";
  ctx.font = "bold 38px Georgia, serif";
  ctx.fillStyle = "#1C1917";
  ctx.fillText(result.title, width / 2, 400);

  // 7. THREE PILLARS BREAKDOWN SECTION (Depression, Anxiety, Stress)
  const pillarsY = 460;
  const pillarWidth = (width - 140 - 32) / 3;
  const pillarHeight = 240;

  const pillarsData = [
    {
      name: lang === "en" ? "Depression" : "Depresi",
      icon: "💙",
      score: result.depression.score,
      severity: result.depression.severityLabel,
      color: "#3B82F6",
      lightBg: "rgba(59, 130, 246, 0.08)",
      borderColor: "rgba(59, 130, 246, 0.25)",
      percent: result.depression.percentage,
    },
    {
      name: lang === "en" ? "Anxiety" : "Kecemasan",
      icon: "⚡",
      score: result.anxiety.score,
      severity: result.anxiety.severityLabel,
      color: "#F59E0B",
      lightBg: "rgba(245, 158, 11, 0.08)",
      borderColor: "rgba(245, 158, 11, 0.25)",
      percent: result.anxiety.percentage,
    },
    {
      name: lang === "en" ? "Stress" : "Stres",
      icon: "🔥",
      score: result.stress.score,
      severity: result.stress.severityLabel,
      color: "#EF4444",
      lightBg: "rgba(239, 68, 68, 0.08)",
      borderColor: "rgba(239, 68, 68, 0.25)",
      percent: result.stress.percentage,
    },
  ];

  pillarsData.forEach((p, idx) => {
    const pX = 70 + idx * (pillarWidth + 16);

    // Pillar Card Container
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.04)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    drawRoundedRect(ctx, pX, pillarsY, pillarWidth, pillarHeight, 20);
    ctx.fill();
    ctx.strokeStyle = p.borderColor;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, pX, pillarsY, pillarWidth, pillarHeight, 20);
    ctx.stroke();
    ctx.restore();

    // Pillar Header (Icon + Name)
    ctx.textAlign = "center";
    ctx.font = "28px -apple-system, sans-serif";
    ctx.fillText(p.icon, pX + pillarWidth / 2, pillarsY + 45);

    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#1C1917";
    ctx.fillText(p.name, pX + pillarWidth / 2, pillarsY + 78);

    // Pillar Score
    ctx.font = "bold 36px Georgia, serif";
    ctx.fillStyle = p.color;
    ctx.fillText(`${p.score}`, pX + pillarWidth / 2, pillarsY + 120);

    ctx.font = "14px Georgia, serif";
    ctx.fillStyle = "#A8A29E";
    ctx.fillText("/ 42", pX + pillarWidth / 2, pillarsY + 144);

    // Pillar Severity Badge
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const sevMetrics = ctx.measureText(p.severity);
    const sevBadgeW = sevMetrics.width + 20;
    const sevBadgeH = 26;
    const sevBadgeX = pX + (pillarWidth - sevBadgeW) / 2;
    const sevBadgeY = pillarsY + 160;

    ctx.fillStyle = p.lightBg;
    drawRoundedRect(ctx, sevBadgeX, sevBadgeY, sevBadgeW, sevBadgeH, 13);
    ctx.fill();
    ctx.fillStyle = p.color;
    ctx.textBaseline = "middle";
    ctx.fillText(p.severity, pX + pillarWidth / 2, sevBadgeY + sevBadgeH / 2);

    // Mini progress bar at bottom of pillar
    const barX = pX + 24;
    const barW = pillarWidth - 48;
    const barY = pillarsY + 208;
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    drawRoundedRect(ctx, barX, barY, barW, 6, 3);
    ctx.fill();
    ctx.fillStyle = p.color;
    drawRoundedRect(ctx, barX, barY, Math.max(8, (barW * p.percent) / 100), 6, 3);
    ctx.fill();
  });

  // 8. CBT KEY TAKEAWAY QUOTE CARD
  const quoteY = 730;
  const quoteHeight = 220;
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.shadowColor = "rgba(0, 0, 0, 0.04)";
  ctx.shadowBlur = 12;
  drawRoundedRect(ctx, 70, quoteY, width - 140, quoteHeight, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(220, 210, 195, 0.8)";
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, 70, quoteY, width - 140, quoteHeight, 22);
  ctx.stroke();
  ctx.restore();

  // Quote Label
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#D97706";
  const cbtLabel = lang === "en" ? "💡 PSYCHOLOGICAL INSIGHT (CBT)" : "💡 REFLEKSI PSIKOLOGIS (CBT)";
  ctx.fillText(cbtLabel, 105, quoteY + 28);

  ctx.font = "italic 21px Georgia, serif";
  ctx.fillStyle = "#292524";
  const mainInsight = result.cbtInsights[0] || result.summary;
  wrapText(ctx, `"${mainInsight}"`, 105, quoteY + 60, width - 210, 32, 2);

  // Journaling prompt preview
  ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#78716C";
  const promptLabel = lang === "en" ? "RECOMMENDED REFLECTION:" : "REKOMENDASI JURNAL:";
  ctx.fillText(promptLabel, 105, quoteY + 140);

  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#44403C";
  wrapText(ctx, result.recommendedJournalPrompt, 105, quoteY + 165, width - 210, 24, 2);

  // 9. MEDICAL DISCLAIMER STRIP
  const discY = 975;
  ctx.textAlign = "center";
  ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#A8A29E";
  const discText =
    lang === "en"
      ? "Screening tool for self-awareness only. Not a medical diagnosis. In crisis, call 988 (US) or 119 ext 8 (ID)."
      : "Alat skrining mandiri untuk refleksi diri, bukan diagnosis medis. Bantuan darurat: hubungi 119 ext 8 (ID) / 988.";
  ctx.fillText(discText, width / 2, discY);

  // 10. FOOTER VIRAL BRANDING
  const footerY = 1200;
  ctx.strokeStyle = "rgba(220, 210, 195, 0.8)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(70, footerY);
  ctx.lineTo(width - 70, footerY);
  ctx.stroke();

  // Left Brand: Logo & Tagline
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "bold 32px Georgia, serif";
  ctx.fillStyle = "#1C1917";
  ctx.fillText("Nuju", 70, footerY + 24);

  ctx.fillStyle = "#D97706";
  ctx.beginPath();
  ctx.arc(150, footerY + 44, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#78716C";
  const footerSub = lang === "en" ? "Daily AI Journaling & Mental Wellness • nuju.app" : "Jurnal AI & Refleksi Emosi Harian • nuju.app";
  ctx.fillText(footerSub, 70, footerY + 68);

  // Right Viral CTA Box
  const ctaPillText = lang === "en" ? "Take Free Test at nuju.app/quiz →" : "Cek Skor Mentalmu di nuju.app/quiz →";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const ctaWidth = ctx.measureText(ctaPillText).width + 42;
  const ctaHeight = 50;
  const ctaX = width - 70 - ctaWidth;
  const ctaY = footerY + 30;

  ctx.save();
  ctx.shadowColor = "rgba(217, 119, 6, 0.25)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "#D97706";
  drawRoundedRect(ctx, ctaX, ctaY, ctaWidth, ctaHeight, 25);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ctaPillText, ctaX + ctaWidth / 2, ctaY + ctaHeight / 2);

  // 11. CONVERT TO DATA URL, BLOB, AND FILE
  const dataUrl = canvas.toDataURL("image/png", 0.95);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Failed to create blob from canvas"));
      },
      "image/png",
      0.95
    );
  });

  const fileName = `nuju-dass21-result-${result.wellnessIndex}.png`;
  const file = new File([blob], fileName, { type: "image/png" });

  return {
    dataUrl,
    blob,
    file,
  };
}

/**
 * Generates an aesthetic high-resolution Instagram Story share card (1080x1350)
 * for the Attachment Style Assessment.
 */
export async function generateAttachmentCard(
  profile: AttachmentProfile,
  anxietyScore: number,
  avoidanceScore: number,
  lang: string = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0F172A");
  bgGrad.addColorStop(0.5, "#1E1B4B");
  bgGrad.addColorStop(1, "#090D16");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle radial glow
  const glow = ctx.createRadialGradient(width * 0.7, height * 0.3, 20, width * 0.7, height * 0.3, 450);
  glow.addColorStop(0, "rgba(244, 63, 94, 0.18)");
  glow.addColorStop(1, "rgba(244, 63, 94, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Card Frame
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Header Brand
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("JU JOURNAL • ECR-R ATTACHMENT ASSESSMENT", 80, 110);

  // Badge
  ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
  drawRoundedRect(ctx, 80, 160, 240, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("RELATIONAL BLUEPRINT", 200, 191);

  // Title
  const titleText = (profile.title as any)[lang] || profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 64px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  wrapText(ctx, titleText, 80, 280, width - 160, 76, 2);

  // Tagline
  const taglineText = `"${(profile.tagline as any)[lang] || profile.tagline.en}"`;
  ctx.fillStyle = "#FDA4AF";
  ctx.font = "italic 32px Georgia, serif";
  wrapText(ctx, taglineText, 80, 440, width - 160, 46, 2);

  // Scores Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 560, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.stroke();

  // Score 1: Anxiety
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ATTACHMENT ANXIETY (ABANDONMENT FEAR)", 120, 615);

  ctx.fillStyle = "#F43F5E";
  ctx.font = "800 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${anxietyScore}%`, width - 120, 615);

  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  drawRoundedRect(ctx, 120, 635, width - 240, 14, 7);
  ctx.fill();
  ctx.fillStyle = "#F43F5E";
  drawRoundedRect(ctx, 120, 635, ((width - 240) * Math.min(100, anxietyScore)) / 100, 14, 7);
  ctx.fill();

  // Score 2: Avoidance
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ATTACHMENT AVOIDANCE (VULNERABILITY SHUTDOWN)", 120, 705);

  ctx.fillStyle = "#A855F7";
  ctx.font = "800 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${avoidanceScore}%`, width - 120, 705);

  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  drawRoundedRect(ctx, 120, 725, width - 240, 14, 7);
  ctx.fill();
  ctx.fillStyle = "#A855F7";
  drawRoundedRect(ctx, 120, 725, ((width - 240) * Math.min(100, avoidanceScore)) / 100, 14, 7);
  ctx.fill();

  // Core Trigger Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 800, width - 160, 220, 28);
  ctx.fill();

  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CORE RELATIONSHIP TRIGGER", 120, 850);

  const triggerText = (profile.trigger as any)[lang] || profile.trigger.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, triggerText, 120, 895, width - 240, 38, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Test your relational attachment free at:", 80, 1220);

  ctx.fillStyle = "#F43F5E";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ju-journal.com/quiz/attachment-style", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-attachment-${profile.id}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an aesthetic high-resolution Instagram Story share card (1080x1350)
 * for the Adult ADHD & Dopamine Fatigue Screener.
 */
export async function generateAdhdCard(
  profile: AdhdResultProfile,
  totalScore: number,
  inattentionScore: number,
  hyperactivityScore: number,
  dopamineScore: number,
  lang: string = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  // Dark Amber slate gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#090D16");
  bgGrad.addColorStop(0.5, "#1E1A0F");
  bgGrad.addColorStop(1, "#0A0A0B");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Glow
  const glow = ctx.createRadialGradient(width * 0.8, height * 0.25, 20, width * 0.8, height * 0.25, 450);
  glow.addColorStop(0, "rgba(245, 158, 11, 0.2)");
  glow.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Frame
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Header Brand
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("JU JOURNAL • WHO ASRS v1.1 ADHD SCREENER", 80, 110);

  // Badge
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 160, 280, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("EXECUTIVE FUNCTION PROFILE", 220, 191);

  // Profile Title
  const titleText = (profile.title as any)[lang] || profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  wrapText(ctx, titleText, 80, 280, width - 160, 72, 2);

  // Headline
  const headlineText = (profile.headline as any)[lang] || profile.headline.en;
  ctx.fillStyle = "#FDE68A";
  ctx.font = "500 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, headlineText, 80, 440, width - 160, 42, 2);

  // 3-Pillar Subscore Cards
  const cardY = 560;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Inattention
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#60A5FA";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("INATTENTION", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${inattentionScore}/20`, 100, cardY + 110);

  // Pillar 2: Restlessness
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB923C";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RESTLESSNESS", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${hyperactivityScore}/12`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Dopamine Friction
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DOPAMINE", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${dopamineScore}/16`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Dopamine State Box
  ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
  drawRoundedRect(ctx, 80, 780, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NEUROLOGICAL DOPAMINE BASELINE", 120, 830);

  const dopaText = (profile.dopamineState as any)[lang] || profile.dopamineState.en;
  ctx.fillStyle = "#FEF3C7";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, dopaText, 120, 875, width - 240, 38, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your focus and dopamine baseline free at:", 80, 1220);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ju-journal.com/quiz/adhd-screener", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-adhd-${profile.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an aesthetic high-resolution Instagram Story share card (1080x1350)
 * for the Inner Child Wound Archetype Screener.
 */
export async function generateInnerChildCard(
  profile: InnerChildProfile,
  woundType: string,
  lang: InnerChildLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context failed");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#090614");
  bgGrad.addColorStop(0.5, "#140c24");
  bgGrad.addColorStop(1, "#090614");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Glowing orb top right
  const orb = ctx.createRadialGradient(width - 150, 180, 20, width - 150, 180, 450);
  orb.addColorStop(0, "rgba(236, 72, 153, 0.22)");
  orb.addColorStop(0.6, "rgba(139, 92, 246, 0.08)");
  orb.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Border frame
  ctx.strokeStyle = "rgba(236, 72, 153, 0.25)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36);
  ctx.stroke();

  // Header tag
  ctx.fillStyle = "rgba(236, 72, 153, 0.15)";
  drawRoundedRect(ctx, 80, 90, 440, 48, 24);
  ctx.fill();
  ctx.fillStyle = "#F472B6";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("INNER CHILD ARCHETYPE SCREENER", 104, 122);

  // Emoji
  ctx.font = "90px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(profile.emoji || "🕊️", 80, 260);

  // Archetype Title
  const archetypeText = (profile.archetype as any)[lang] || profile.archetype.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, archetypeText, 80, 340, width - 160, 60, 2);

  // Tagline
  const taglineText = (profile.tagline as any)[lang] || profile.tagline.en;
  ctx.fillStyle = "#F9A8D4";
  ctx.font = "italic 500 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${taglineText}"`, 80, 470, width - 160, 42, 2);

  // Origin Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 580, width - 160, 240, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(236, 72, 153, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F472B6";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CHILDHOOD ORIGIN & ROOT CONDITIONING", 120, 630);

  const originText = (profile.origin as any)[lang] || profile.origin.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, originText, 120, 680, width - 240, 38, 3);

  // Healing Truth Box
  ctx.fillStyle = "rgba(139, 92, 246, 0.08)";
  drawRoundedRect(ctx, 80, 850, width - 160, 240, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#A78BFA";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("REPARENTING SOMATIC TRUTH", 120, 900);

  const healingText = (profile.healingTruth as any)[lang] || profile.healingTruth.en;
  ctx.fillStyle = "#EDE9FE";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, healingText, 120, 950, width - 240, 38, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Discover your subconscious childhood wound free at:", 80, 1220);

  ctx.fillStyle = "#F472B6";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/inner-child", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-inner-child-${woundType}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an aesthetic high-resolution Instagram Story share card (1080x1350)
 * for the Maslach Burnout Inventory (MBI) Screener.
 */
export async function generateBurnoutCard(
  result: BurnoutResult,
  lang: BurnoutLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context failed");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0D0C13");
  bgGrad.addColorStop(0.5, "#18131E");
  bgGrad.addColorStop(1, "#0D0C13");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Glowing orb top right
  const orb = ctx.createRadialGradient(width - 150, 180, 20, width - 150, 180, 450);
  const isHigh = result.tier === "high" || result.tier === "severe";
  orb.addColorStop(0, isHigh ? "rgba(239, 68, 68, 0.25)" : "rgba(245, 158, 11, 0.25)");
  orb.addColorStop(0.6, "rgba(249, 115, 22, 0.08)");
  orb.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Border frame
  ctx.strokeStyle = isHigh ? "rgba(239, 68, 68, 0.3)" : "rgba(245, 158, 11, 0.3)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36);
  ctx.stroke();

  // Header tag
  ctx.fillStyle = isHigh ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 90, 480, 48, 24);
  ctx.fill();
  ctx.fillStyle = isHigh ? "#FCA5A5" : "#FDE68A";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("MASLACH BURNOUT SCREENER (MBI)", 104, 122);

  // Overall Score & Tier
  ctx.fillStyle = isHigh ? "#EF4444" : "#F59E0B";
  ctx.font = "900 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.totalScore}/48`, 80, 240);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const titleText = (result.title as any)[lang] || result.title.en;
  wrapText(ctx, titleText, 80, 310, width - 160, 52, 2);

  // 3-Pillar Subscore Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Exhaustion
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F87171";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EXHAUSTION", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.exhaustionScore}/16`, 100, cardY + 110);

  // Pillar 2: Cynicism
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB923C";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CYNICISM", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.cynicismScore}/16`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Inefficacy
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("INEFFICACY", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.inefficacyScore}/16`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Core Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = isHigh ? "#FCA5A5" : "#FDE68A";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CLINICAL ASSESSMENT SUMMARY", 120, 710);

  const descText = (result.description as any)[lang] || result.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 38, 3);

  // Recovery Protocol Box
  ctx.fillStyle = isHigh ? "rgba(239, 68, 68, 0.08)" : "rgba(245, 158, 11, 0.08)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = isHigh ? "rgba(239, 68, 68, 0.25)" : "rgba(245, 158, 11, 0.25)";
  ctx.stroke();

  ctx.fillStyle = isHigh ? "#EF4444" : "#F59E0B";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RECOMMENDED RECOVERY PROTOCOL", 120, 940);

  const recStrategy = (result.recoveryStrategy as any)[lang] || result.recoveryStrategy.en;
  const recText = Array.isArray(recStrategy) ? recStrategy.slice(0, 2).map((s: string, i: number) => `${i + 1}. ${s}`).join("  ") : String(recStrategy);
  ctx.fillStyle = "#FEF3C7";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, recText, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Assess your occupational burnout risk free at:", 80, 1220);

  ctx.fillStyle = isHigh ? "#EF4444" : "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/burnout", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-burnout-${result.tier}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an aesthetic high-resolution Instagram Story share card (1080x1350)
 * for the 5 Love Languages & Relational Needs Profiler.
 */
export async function generateLoveLanguageCard(
  result: LoveLanguageResult,
  lang: LoveLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context failed");

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#100615");
  bgGrad.addColorStop(0.5, "#200C2A");
  bgGrad.addColorStop(1, "#100615");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Glowing orb top right
  const orb = ctx.createRadialGradient(width - 150, 180, 20, width - 150, 180, 450);
  orb.addColorStop(0, "rgba(244, 63, 94, 0.28)");
  orb.addColorStop(0.6, "rgba(217, 70, 239, 0.1)");
  orb.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Border frame
  ctx.strokeStyle = "rgba(244, 63, 94, 0.3)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36);
  ctx.stroke();

  // Header tag
  ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
  drawRoundedRect(ctx, 80, 90, 440, 48, 24);
  ctx.fill();
  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("5 LOVE LANGUAGES PROFILER", 104, 122);

  // Emoji
  ctx.font = "90px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(result.primary.emoji || "💌", 80, 255);

  // Primary Title
  const titleText = (result.primary.title as any)[lang] || result.primary.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 50px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 335, width - 160, 58, 2);

  // Tagline
  const taglineText = (result.primary.tagline as any)[lang] || result.primary.tagline.en;
  ctx.fillStyle = "#F472B6";
  ctx.font = "italic 500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${taglineText}"`, 80, 445, width - 160, 38, 2);

  // 5 Languages Distribution Progress Bars
  const startY = 540;
  const barHeight = 12;
  const spacing = 62;
  const barWidth = width - 160 - 240;

  const langsList: { id: string; label: string; pct: number; color: string }[] = [
    { id: "words", label: "Words of Affirmation", pct: result.percentages.words, color: "#F43F5E" },
    { id: "time", label: "Quality Time", pct: result.percentages.time, color: "#EC4899" },
    { id: "acts", label: "Acts of Service", pct: result.percentages.acts, color: "#A855F7" },
    { id: "gifts", label: "Receiving Gifts", pct: result.percentages.gifts, color: "#F59E0B" },
    { id: "touch", label: "Physical Touch", pct: result.percentages.touch, color: "#06B6D4" },
  ];

  langsList.forEach((item, idx) => {
    const y = startY + idx * spacing;

    // Label
    ctx.fillStyle = "#E2E8F0";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(item.label, 80, y + 16);

    // Percentage
    ctx.fillStyle = item.color;
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${item.pct}%`, width - 80, y + 16);
    ctx.textAlign = "left";

    // Progress track
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    drawRoundedRect(ctx, 80, y + 26, width - 160, barHeight, 6);
    ctx.fill();

    // Progress fill
    ctx.fillStyle = item.color;
    const fillWidth = ((width - 160) * Math.max(item.pct, 4)) / 100;
    drawRoundedRect(ctx, 80, y + 26, fillWidth, barHeight, 6);
    ctx.fill();
  });

  // "How to Love Me" Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 880, width - 160, 240, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("HOW TO LOVE & NURTURE ME", 120, 930);

  const tips = (result.primary.howToLoveMe as any)[lang] || result.primary.howToLoveMe.en;
  const tipText = Array.isArray(tips) ? tips.slice(0, 2).map((t: string, i: number) => `• ${t}`).join("  ") : String(tips);
  ctx.fillStyle = "#FFE4E6";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tipText, 120, 975, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Discover your primary love language free at:", 80, 1220);

  ctx.fillStyle = "#F43F5E";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/love-languages", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-love-language-${result.primary.id}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an aesthetic high-resolution Instagram Story share card (1080x1350)
 * for the People-Pleasing & Boundaries Screener.
 */
export async function generatePeoplePleaserCard(
  result: PeoplePleaserResult,
  lang: PeoplePleaserLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context failed");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#061311");
  bgGrad.addColorStop(0.5, "#0D2521");
  bgGrad.addColorStop(1, "#061311");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Glowing orb top right
  const orb = ctx.createRadialGradient(width - 150, 180, 20, width - 150, 180, 450);
  orb.addColorStop(0, "rgba(20, 184, 166, 0.25)");
  orb.addColorStop(0.6, "rgba(16, 185, 129, 0.08)");
  orb.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Border frame
  ctx.strokeStyle = "rgba(20, 184, 166, 0.3)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36);
  ctx.stroke();

  // Header tag
  ctx.fillStyle = "rgba(20, 184, 166, 0.15)";
  drawRoundedRect(ctx, 80, 90, 480, 48, 24);
  ctx.fill();
  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("FAWN RESPONSE & BOUNDARY SCREENER", 104, 122);

  // Overall Score
  ctx.fillStyle = "#14B8A6";
  ctx.font = "900 68px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.totalScore}/${result.maxScore}`, 80, 240);

  // Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const titleText = (result.title as any)[lang] || result.title.en;
  wrapText(ctx, titleText, 80, 310, width - 160, 54, 2);

  // 3-Pillar Subscore Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Appeasement
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("APPEASEMENT", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.fawnScore}/12`, 100, cardY + 110);

  // Pillar 2: Overcommitment
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#34D399";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("OVERCOMMIT", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.overcommitmentScore}/12`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Guilt Sponge
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#A78BFA";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("GUILT SPONGE", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.guiltScore}/12`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NERVOUS SYSTEM ADAPTATION", 120, 710);

  const descText = (result.description as any)[lang] || result.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 38, 3);

  // Power Boundary Script Box
  ctx.fillStyle = "rgba(20, 184, 166, 0.08)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("YOUR ZERO-GUILT BOUNDARY SCRIPT", 120, 940);

  const scriptText = (result.boundaryScript as any)[lang] || result.boundaryScript.en;
  ctx.fillStyle = "#CCFBF1";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${scriptText}"`, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your people-pleasing and fawn response free at:", 80, 1220);

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/people-pleasing", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-people-pleaser-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface HspCardInput {
  totalScore: number;
  maxScore: number;
  level: string;
  profile: HspProfile;
  percentages: {
    sensory: number;
    empathy: number;
    subtlety: number;
  };
}

export async function generateHspCard(
  result: HspCardInput,
  lang: HspLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0F0715");
  bgGrad.addColorStop(0.5, "#1A0B22");
  bgGrad.addColorStop(1, "#08040C");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing orb in upper right
  const orb = ctx.createRadialGradient(width - 150, 200, 20, width - 150, 200, 450);
  orb.addColorStop(0, "rgba(236, 72, 153, 0.25)");
  orb.addColorStop(1, "rgba(236, 72, 153, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#EC4899";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · HIGHLY SENSITIVE PERSON (HSP) SCREENER", 80, 110);

  // Badge pill
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(236, 72, 153, 0.15)";
  drawRoundedRect(ctx, 80, 150, 380, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(236, 72, 153, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#F472B6";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#F9A8D4";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // 3 Pillar Score Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Sensory Overload
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F472B6";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SENSORY", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.sensory}%`, 100, cardY + 110);

  // Pillar 2: Empathy
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EMPATHY", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.empathy}%`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Subtlety
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SUBTLETY", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.subtlety}%`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(236, 72, 153, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F472B6";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NEUROLOGICAL TRAIT PROFILE", 120, 710);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 38, 3);

  // Sensory Sanctuary Protocol Box
  ctx.fillStyle = "rgba(236, 72, 153, 0.08)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(236, 72, 153, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#EC4899";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SENSORY SANCTUARY PROTOCOL", 120, 940);

  const tipText = (result.profile.sanctuaryBlueprint[lang] || result.profile.sanctuaryBlueprint.en)[0] || "";
  ctx.fillStyle = "#FCE7F3";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tipText}"`, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your sensory sensitivity & overload profile free at:", 80, 1220);

  ctx.fillStyle = "#EC4899";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/hsp", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-hsp-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export async function generateShadowCard(
  result: ShadowResult,
  lang: ShadowLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0B0616");
  bgGrad.addColorStop(0.5, "#140C26");
  bgGrad.addColorStop(1, "#06030D");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing purple orb in upper right
  const orb = ctx.createRadialGradient(width - 150, 200, 20, width - 150, 200, 450);
  orb.addColorStop(0, "rgba(168, 85, 247, 0.25)");
  orb.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#A855F7";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · JUNGIAN SHADOW WORK MIRROR", 80, 110);

  // Badge pill
  const badgeText = result.primary.archetypeBadge[lang] || result.primary.archetypeBadge.en;
  ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
  drawRoundedRect(ctx, 80, 150, 420, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#C084FC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.primary.name[lang] || result.primary.name.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 50px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 60, 2);

  // Tagline
  const tagline = result.primary.tagline[lang] || result.primary.tagline.en;
  ctx.fillStyle = "#D8B4FE";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // 4 Archetype Distribution Horizontal Bars
  const barY = 440;
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, barY, width - 160, 200, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#C084FC";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SUBCONSCIOUS SHADOW SPECTRUM", 110, barY + 42);

  const archetypes = [
    { label: "Tyrant / Perfectionist", pct: result.percentages.tyrant, color: "#A855F7" },
    { label: "Martyr / Fawn", pct: result.percentages.martyr, color: "#F43F5E" },
    { label: "Ice Wall / Detached", pct: result.percentages.ice_wall, color: "#06B6D4" },
    { label: "Chaos Rebel", pct: result.percentages.chaos_rebel, color: "#F59E0B" },
  ];

  archetypes.forEach((item, idx) => {
    const yOffset = barY + 70 + idx * 30;
    ctx.fillStyle = "#CBD5E1";
    ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(item.label, 110, yOffset + 14);

    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    drawRoundedRect(ctx, 360, yOffset, 480, 16, 8);
    ctx.fill();

    ctx.fillStyle = item.color;
    drawRoundedRect(ctx, 360, yOffset, Math.max(16, (480 * item.pct) / 100), 16, 8);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(`${item.pct}%`, 860, yOffset + 14);
  });

  // Disowned Trait Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 670, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#C084FC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DISOWNED SUBCONSCIOUS TRAIT", 120, 720);

  const disowned = result.primary.disownedTrait[lang] || result.primary.disownedTrait.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, disowned, 120, 765, width - 240, 38, 3);

  // Gold in the Shadow Box
  ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
  drawRoundedRect(ctx, 80, 895, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("THE GOLD IN YOUR SHADOW", 120, 945);

  const goldText = result.primary.goldInTheShadow[lang] || result.primary.goldInTheShadow.en;
  ctx.fillStyle = "#FEF3C7";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${goldText}"`, 120, 990, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Explore your subconscious shadow & reparenting prompts at:", 80, 1220);

  ctx.fillStyle = "#C084FC";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/shadow-work", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-shadow-${result.primary.id}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface DopamineCardInput {
  totalScore: number;
  maxScore: number;
  level: string;
  profile: DopamineProfile;
  percentages: {
    compulsion: number;
    hedonic: number;
    boredom: number;
  };
}

export async function generateDopamineCard(
  result: DopamineCardInput,
  lang: DopamineLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#160C04");
  bgGrad.addColorStop(0.5, "#231405");
  bgGrad.addColorStop(1, "#0A0502");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing amber orb in upper right
  const orb = ctx.createRadialGradient(width - 150, 200, 20, width - 150, 200, 450);
  orb.addColorStop(0, "rgba(245, 158, 11, 0.25)");
  orb.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · DOPAMINE DETOX & SCREEN SCREENER", 80, 110);

  // Badge pill
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 150, 380, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#FDE68A";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // 3 Pillar Score Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Compulsion
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("COMPULSION", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.compulsion}%`, 100, cardY + 110);

  // Pillar 2: Hedonic Depletion
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB923C";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DEPLETION", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.hedonic}%`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Boredom Intolerance
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F87171";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("BOREDOM", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.boredom}%`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NEURAL RECEPTOR DIAGNOSIS", 120, 710);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 38, 3);

  // Dopamine Fasting Protocol Box
  ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RECOMMENDED FASTING PROTOCOL", 120, 940);

  const tipText = (result.profile.fastingProtocol[lang] || result.profile.fastingProtocol.en)[0] || "";
  ctx.fillStyle = "#FEF3C7";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tipText}"`, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your screen addiction & dopamine tolerance free at:", 80, 1220);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/dopamine-detox", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-dopamine-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface VagalCardInput {
  dominantState: string;
  profile: VagalProfile;
  percentages: {
    ventral: number;
    sympathetic: number;
    dorsal: number;
  };
}

export async function generateNervousSystemCard(
  result: VagalCardInput,
  lang: VagalLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#06130D");
  bgGrad.addColorStop(0.5, "#0D2218");
  bgGrad.addColorStop(1, "#030A07");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing emerald orb in upper right
  const orb = ctx.createRadialGradient(width - 150, 200, 20, width - 150, 200, 450);
  orb.addColorStop(0, "rgba(16, 185, 129, 0.25)");
  orb.addColorStop(1, "rgba(16, 185, 129, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#10B981";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · POLYVAGAL NERVOUS SYSTEM METER", 80, 110);

  // Badge pill
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
  drawRoundedRect(ctx, 80, 150, 430, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#34D399";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#A7F3D0";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // 3 Pillar Score Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Ventral Safety
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#10B981";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VENTRAL", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.ventral}%`, 100, cardY + 110);

  // Pillar 2: Sympathetic Fight/Flight
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SYMPATHETIC", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.sympathetic}%`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Dorsal Freeze
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DORSAL", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.percentages.dorsal}%`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#34D399";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("AUTONOMIC NERVOUS SYSTEM DIAGNOSIS", 120, 710);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 38, 3);

  // Regulation Drill Box
  ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#10B981";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("IMMEDIATE SOMATIC REGULATION DRILL", 120, 940);

  const drillText = result.profile.regulationDrill[lang] || result.profile.regulationDrill.en;
  ctx.fillStyle = "#D1FAE5";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${drillText}"`, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Scan your fight, flight, or freeze state free at:", 80, 1220);

  ctx.fillStyle = "#10B981";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/nervous-system", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-vagal-${result.dominantState}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface RsdCardInput {
  level: RsdLevel;
  profile: RsdProfile;
  subscales: {
    vigilance: { percentage: number };
    criticism: { percentage: number };
    catastrophizing: { percentage: number };
  };
}

export async function generateRsdCard(
  result: RsdCardInput,
  lang: RsdLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#13071E");
  bgGrad.addColorStop(0.5, "#210C35");
  bgGrad.addColorStop(1, "#0A0310");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing rose orb in upper right
  const orb = ctx.createRadialGradient(width - 150, 200, 20, width - 150, 200, 450);
  orb.addColorStop(0, "rgba(244, 63, 94, 0.25)");
  orb.addColorStop(1, "rgba(244, 63, 94, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · REJECTION SENSITIVITY (RSD) SCREENER", 80, 110);

  // Badge pill
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
  drawRoundedRect(ctx, 80, 150, 430, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#FECDD3";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // 3 Pillar Score Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Vigilance
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VIGILANCE", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.vigilance.percentage}%`, 100, cardY + 110);

  // Pillar 2: Criticism
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CRITICISM", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.criticism.percentage}%`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Catastrophizing
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#E11D48";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RUMINATION", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.catastrophizing.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NEUROBIOLOGICAL VULNERABILITY DIAGNOSIS", 120, 710);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 38, 3);

  // De-escalation Protocol Box
  ctx.fillStyle = "rgba(244, 63, 94, 0.08)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RECOMMENDED EMOTIONAL DE-ESCALATION DRILL", 120, 940);

  const kitTip = (result.profile.deescalationKit[lang] || result.profile.deescalationKit.en)[0] || "";
  ctx.fillStyle = "#FFE4E6";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${kitTip}"`, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your rejection sensitive dysphoria & emotional reactivity at:", 80, 1220);

  ctx.fillStyle = "#F43F5E";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/rsd", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-rsd-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface CbtCardInput {
  primaryDistortion: DistortionInfo;
  topDistortions: { distortion: DistortionInfo; score: number; percentage: number }[];
  totalScore: number;
  dominantPercentage: number;
}

export async function generateCbtCard(
  result: CbtCardInput,
  lang: CbtLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background gradient: Deep Indigo / Slate Night
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#090D16");
  bgGrad.addColorStop(0.4, "#0F172A");
  bgGrad.addColorStop(1, "#1E1B4B");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing Indigo/Violet orb
  const orb = ctx.createRadialGradient(width - 160, 220, 20, width - 160, 220, 480);
  orb.addColorStop(0, "rgba(99, 102, 241, 0.28)");
  orb.addColorStop(1, "rgba(99, 102, 241, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · COGNITIVE DISTORTIONS & THOUGHT SPOTTER", 80, 110);

  // Badge pill
  const badgeText = result.primaryDistortion.badge[lang] || result.primaryDistortion.badge.en;
  ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
  drawRoundedRect(ctx, 80, 150, 460, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#A5B4FC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.primaryDistortion.title[lang] || result.primaryDistortion.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const tagline = result.primaryDistortion.tagline[lang] || result.primaryDistortion.tagline.en;
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // Top 3 Distortion Frequency Bars
  const startY = 440;
  const barHeight = 12;
  const spacing = 62;

  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DOMINANT COGNITIVE BIAS BREAKDOWN", 80, startY);

  const top3 = result.topDistortions.slice(0, 3);
  top3.forEach((item, idx) => {
    const y = startY + 25 + idx * spacing;
    const label = item.distortion.title[lang] || item.distortion.title.en;

    // Label
    ctx.fillStyle = "#F1F5F9";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText(label, 80, y + 16);

    // Percentage
    ctx.fillStyle = item.distortion.color || "#818CF8";
    ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${item.percentage}%`, width - 80, y + 16);
    ctx.textAlign = "left";

    // Track
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    drawRoundedRect(ctx, 80, y + 26, width - 160, barHeight, 6);
    ctx.fill();

    // Fill
    ctx.fillStyle = item.distortion.color || "#818CF8";
    const fillW = ((width - 160) * Math.max(item.percentage, 5)) / 100;
    drawRoundedRect(ctx, 80, y + 26, fillW, barHeight, 6);
    ctx.fill();
  });

  // Clinical Definition Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 680, width - 160, 190, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#A5B4FC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("COGNITIVE MECHANISM (AARON BECK & DAVID BURNS)", 120, 725);

  const defText = result.primaryDistortion.definition[lang] || result.primaryDistortion.definition.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, defText, 120, 770, width - 240, 36, 3);

  // CBT Thought Record & Reframe Formula Box
  ctx.fillStyle = "rgba(99, 102, 241, 0.09)";
  drawRoundedRect(ctx, 80, 895, width - 160, 260, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EVIDENCE-BASED CBT REFRAMING FORMULA", 120, 940);

  const reframe = result.primaryDistortion.reframeFormula[lang] || result.primaryDistortion.reframeFormula.en;
  ctx.fillStyle = "#E0E7FF";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${reframe}"`, 120, 985, width - 240, 36, 3);

  const thoughtRecord = result.primaryDistortion.cbtThoughtRecord[lang] || result.primaryDistortion.cbtThoughtRecord.en;
  ctx.fillStyle = "#34D399";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `Reframed Alternative: ${thoughtRecord.rationalAlternative}`, 120, 1095, width - 240, 30, 2);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Spot your cognitive distortions & reframe overthinking at:", 80, 1220);

  ctx.fillStyle = "#818CF8";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/cognitive-distortions", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-cbt-${result.primaryDistortion.id}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface DissociationCardInput {
  level: DissociationLevel;
  profile: DissociationProfile;
  subscales: {
    depersonalization: { percentage: number };
    derealization: { percentage: number };
    absorption: { percentage: number };
  };
}

export async function generateDissociationCard(
  result: DissociationCardInput,
  lang: DissociationLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background: Deep Mystical Indigo / Violet
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0B0716");
  bgGrad.addColorStop(0.5, "#180F33");
  bgGrad.addColorStop(1, "#05020B");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing violet / purple orb
  const orb = ctx.createRadialGradient(width - 150, 200, 20, width - 150, 200, 480);
  orb.addColorStop(0, "rgba(139, 92, 246, 0.28)");
  orb.addColorStop(1, "rgba(139, 92, 246, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#A78BFA";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · SOMATIC DISSOCIATION & DPDR SCREENER", 80, 110);

  // Badge pill
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
  drawRoundedRect(ctx, 80, 150, 450, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#C4B5FD";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 184);

  // Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#DDD6FE";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${tagline}"`, 80, 360, width - 160, 36, 2);

  // 3 Pillar Score Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Depersonalization
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#C4B5FD";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DEPERSONALIZE", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.depersonalization.percentage}%`, 100, cardY + 110);

  // Pillar 2: Derealization
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#A78BFA";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DEREALIZE", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.derealization.percentage}%`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Absorption & Numbing
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#8B5CF6";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ABSORPTION", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.absorption.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Clinical Description Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 660, width - 160, 200, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(139, 92, 246, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#C4B5FD";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DORSAL VAGAL SHUTOFF EVALUATION", 120, 710);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 755, width - 240, 36, 3);

  // Somatic Re-connection Protocol Box
  ctx.fillStyle = "rgba(139, 92, 246, 0.09)";
  drawRoundedRect(ctx, 80, 890, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(139, 92, 246, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#A78BFA";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RECOMMENDED SOMATIC EMBODIMENT DRILL", 120, 940);

  const drillTip = (result.profile.somaticReconnection[lang] || result.profile.somaticReconnection.en)[0] || "";
  ctx.fillStyle = "#EDE9FE";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${drillTip}"`, 120, 985, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your somatic dissociation & derealization free at:", 80, 1220);

  ctx.fillStyle = "#A78BFA";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/dissociation", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-dissociation-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

export interface ImposterCardInput {
  level: ImposterLevel;
  profile: ImposterProfile;
  dominantArchetype: ArchetypeDetail;
  subscales: {
    fraud_terror: { percentage: number };
    luck_attribution: { percentage: number };
    overworking: { percentage: number };
  };
}

export async function generateImposterCard(
  result: ImposterCardInput,
  lang: ImposterLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  // Background: Deep Slate & Warm Bronze Amber
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0D0F17");
  bgGrad.addColorStop(0.5, "#1C1726");
  bgGrad.addColorStop(1, "#09080E");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glowing warm amber orb
  const orb = ctx.createRadialGradient(width - 160, 200, 20, width - 160, 200, 480);
  orb.addColorStop(0, "rgba(245, 158, 11, 0.25)");
  orb.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("JU · IMPOSTER SYNDROME & FRAUD FEAR DIAGNOSTIC", 80, 110);

  // Archetype Badge Pill
  const archName = result.dominantArchetype.name[lang] || result.dominantArchetype.name.en;
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 150, 480, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FCD34D";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`ARCHETYPE: ${archName.toUpperCase()}`, 105, 184);

  // Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 265, width - 160, 62, 2);

  // Tagline
  const archTagline = result.dominantArchetype.tagline[lang] || result.dominantArchetype.tagline.en;
  ctx.fillStyle = "#FEF3C7";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${archTagline}"`, 80, 360, width - 160, 36, 2);

  // 3 Pillar Score Cards
  const cardY = 440;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Fraud Terror
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("FRAUD FEAR", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.fraud_terror.percentage}%`, 100, cardY + 110);

  // Pillar 2: Luck Attribution
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("LUCK ATTRIB", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.luck_attribution.percentage}%`, 100 + colWidth + 20, cardY + 110);

  // Pillar 3: Overworking
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#D97706";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("OVERWORK", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.overworking.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);

  // Cognitive Mantra Box
  ctx.fillStyle = "rgba(245, 158, 11, 0.09)";
  drawRoundedRect(ctx, 80, 660, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EVIDENCE-BASED COGNITIVE MANTRA", 120, 710);

  const mantraText = result.dominantArchetype.mantra[lang] || result.dominantArchetype.mantra.en;
  ctx.fillStyle = "#FFFBEB";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, `"${mantraText}"`, 120, 755, width - 240, 36, 3);

  // Internalization Action Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 900, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SUCCESS RE-INTERNALIZATION DRILL", 120, 945);

  const drillText = (result.profile.internalizationDrill[lang] || result.profile.internalizationDrill.en)[0] || "";
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 990, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Diagnose your imposter syndrome archetype free at:", 80, 1220);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/imposter-syndrome", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-imposter-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an ultra-premium 1080x1350 Instagram / TikTok story card for Emotional Agility.
 */
export async function generateAgilityCard(
  result: AgilityScoreResult,
  lang: AgilityLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#090d16");
  bgGrad.addColorStop(0.5, "#0e1a2d");
  bgGrad.addColorStop(1, "#16253b");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glow orb
  const orbGrad = ctx.createRadialGradient(850, 200, 10, 850, 200, 500);
  orbGrad.addColorStop(0, "rgba(20, 184, 166, 0.22)");
  orbGrad.addColorStop(1, "rgba(20, 184, 166, 0)");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Brand
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("NUJU LABS • DR. SUSAN DAVID & AAQ-2 MODEL", 80, 110);
  ctx.letterSpacing = "0px";

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Emotional Agility & Experiential Avoidance Diagnostic", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(45, 212, 191, 0.15)";
  drawRoundedRect(ctx, 80, 195, 620, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(titleText, 80, 315);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 365, width - 160, 40, 2);

  // 3 Pillar Cards
  const cardY = 460;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Bottling (Suppression)
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("BOTTLING", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.bottling.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Suppression & Mask", 100, cardY + 145);

  // Pillar 2: Brooding (Rumination)
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB923C";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("BROODING", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.brooding.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Rumination Loops", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Values-Aligned Action
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VALUES ACTION", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.values.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Clarity & Courage", 100 + (colWidth + 20) * 2, cardY + 145);

  // Primary Clinical Insight Box
  ctx.fillStyle = "rgba(45, 212, 191, 0.08)";
  drawRoundedRect(ctx, 80, 680, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(45, 212, 191, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CLINICAL AGILITY TRAJECTORY", 120, 730);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 775, width - 240, 36, 3);

  // Stepping Out Protocol Drill
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 920, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("UN-HOOKING & STEPPING OUT PROTOCOL", 120, 965);

  const drills = result.profile.protocolDrills[lang] || result.profile.protocolDrills.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1010, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Take the free Harvard-backed Emotional Agility screener at:", 80, 1220);

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/emotional-agility", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-agility-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an ultra-premium 1080x1350 Instagram / TikTok story card for High-Functioning Anxiety.
 */
export async function generateHfaCard(
  result: HfaScoreResult,
  lang: HfaLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#080c14");
  bgGrad.addColorStop(0.5, "#101826");
  bgGrad.addColorStop(1, "#182236");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Amber/Indigo Glow Orb
  const orbGrad = ctx.createRadialGradient(850, 200, 10, 850, 200, 500);
  orbGrad.addColorStop(0, "rgba(245, 158, 11, 0.2)");
  orbGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Brand
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("NUJU LABS • CLINICAL SOMATIC DIAGNOSTICS", 80, 110);
  ctx.letterSpacing = "0px";

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("High-Functioning Anxiety & Overthinking Mask Matrix", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 195, 660, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FCD34D";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(titleText, 80, 315);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 365, width - 160, 40, 2);

  // 3 Pillar Cards
  const cardY = 460;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Internal Turmoil
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#EF4444";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("TURMOIL", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.internal_turmoil.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Silent Biological Dread", 100, cardY + 145);

  // Pillar 2: Hyper-Performance
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("HYPER-OUTPUT", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.hyper_performance.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Fear-Driven Ambition", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Composure Mask
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("COMPOSURE", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.composure_mask.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Flawless Facade", 100 + (colWidth + 20) * 2, cardY + 145);

  // Somatic De-Masking Box
  ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
  drawRoundedRect(ctx, 80, 680, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#FCD34D";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SOMATIC REALITY CHECK", 120, 730);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 775, width - 240, 36, 3);

  // Action Drill Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 920, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VAGAL RESET & DE-MASKING DRILL", 120, 965);

  const drills = result.profile.demaskingDrills[lang] || result.profile.demaskingDrills.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1010, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your high-functioning anxiety and overthinking mask free at:", 80, 1220);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/high-functioning-anxiety", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-hfa-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an ultra-premium 1080x1350 Instagram / TikTok story card for Parentification & Eldest Child.
 */
export async function generateParentificationCard(
  result: ParentificationScoreResult,
  lang: ParentificationLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0c0d14");
  bgGrad.addColorStop(0.5, "#181726");
  bgGrad.addColorStop(1, "#221b33");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Rose/Purple Glow Orb
  const orbGrad = ctx.createRadialGradient(850, 200, 10, 850, 200, 500);
  orbGrad.addColorStop(0, "rgba(225, 29, 72, 0.22)");
  orbGrad.addColorStop(1, "rgba(225, 29, 72, 0)");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Brand
  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("NUJU LABS • FAMILY SYSTEMS & PARENTIFICATION", 80, 110);
  ctx.letterSpacing = "0px";

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Parentification & Eldest Child Syndrome Diagnostic", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(225, 29, 72, 0.15)";
  drawRoundedRect(ctx, 80, 195, 680, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(225, 29, 72, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(titleText, 80, 315);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 365, width - 160, 40, 2);

  // 3 Pillar Cards
  const cardY = 460;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Emotional Parentification
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#E11D48";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EMOTIONAL", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.emotional_parentification.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Parent Confidant", 100, cardY + 145);

  // Pillar 2: Instrumental Burden
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("INSTRUMENTAL", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.instrumental_burden.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Adult Logistics", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Hyper-Responsibility
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("HYPER-DUTY", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.hyper_responsibility.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Guilt & Over-Care", 100 + (colWidth + 20) * 2, cardY + 145);

  // Clinical Insight Box
  ctx.fillStyle = "rgba(225, 29, 72, 0.08)";
  drawRoundedRect(ctx, 80, 680, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(225, 29, 72, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("FAMILY SYSTEM IMPACT", 120, 730);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 775, width - 240, 36, 3);

  // Reparenting Action Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 920, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("REPARENTING & BOUNDARY PROTOCOL", 120, 965);

  const drills = result.profile.reparentingDrills[lang] || result.profile.reparentingDrills.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1010, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your parentification and eldest child syndrome free at:", 80, 1220);

  ctx.fillStyle = "#FB7185";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/parentification", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-parentification-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an ultra-premium 1080x1350 Instagram / TikTok story card for Alexithymia.
 */
export async function generateAlexithymiaCard(
  result: AlexithymiaScoreResult,
  lang: AlexithymiaLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#080c14");
  bgGrad.addColorStop(0.5, "#0f172a");
  bgGrad.addColorStop(1, "#1e293b");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Cyan/Indigo Glow Orb
  const orbGrad = ctx.createRadialGradient(850, 200, 10, 850, 200, 500);
  orbGrad.addColorStop(0, "rgba(56, 189, 248, 0.2)");
  orbGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Brand
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("NUJU LABS • TORONTO ALEXITHYMIA SCALE (TAS-20)", 80, 110);
  ctx.letterSpacing = "0px";

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Alexithymia & Emotional Numbing Diagnostic", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
  drawRoundedRect(ctx, 80, 195, 680, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#7DD3FC";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(titleText, 80, 315);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#94A3B8";
  ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 365, width - 160, 40, 2);

  // 3 Pillar Cards
  const cardY = 460;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Identifying Feelings
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("IDENTIFYING", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.identifying_feelings.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Sensory Decoding", 100, cardY + 145);

  // Pillar 2: Describing Feelings
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DESCRIBING", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.describing_feelings.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Verbal Expression", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: External Thinking
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EXTERNAL", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.external_thinking.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Pragmatic Focus", 100 + (colWidth + 20) * 2, cardY + 145);

  // Clinical Insight Box
  ctx.fillStyle = "rgba(56, 189, 248, 0.08)";
  drawRoundedRect(ctx, 80, 680, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#7DD3FC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NEUROLOGICAL INTEROCEPTION PROFILE", 120, 730);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 775, width - 240, 36, 3);

  // Interoception Training Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 920, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SOMATIC INTEROCEPTION TRAINING", 120, 965);

  const drills = result.profile.interoceptionDrills[lang] || result.profile.interoceptionDrills.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1010, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Diagnose emotional numbing and alexithymia free at:", 80, 1220);

  ctx.fillStyle = "#38BDF8";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/alexithymia", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-alexithymia-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an ultra-premium 1080x1350 Instagram / TikTok story card for Limerence & Obsessive Love.
 */
export async function generateLimerenceCard(
  result: LimerenceScoreResult,
  lang: LimerenceLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient - Deep Crimson & Velvet Midnight
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#18060e");
  bgGrad.addColorStop(0.5, "#2a0a19");
  bgGrad.addColorStop(1, "#0d0208");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Magenta / Rose Radial Glow Orb
  const orbGrad = ctx.createRadialGradient(850, 200, 10, 850, 200, 500);
  orbGrad.addColorStop(0, "rgba(244, 63, 94, 0.25)");
  orbGrad.addColorStop(1, "rgba(244, 63, 94, 0)");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Brand
  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("NUJU LABS • DR. DOROTHY TENNOV MODEL", 80, 110);
  ctx.letterSpacing = "0px";

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Limerence & Romantic Obsession Screener", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
  drawRoundedRect(ctx, 80, 195, 680, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(titleText, 80, 315);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 365, width - 160, 40, 2);

  // 3 Pillar Cards
  const cardY = 460;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Involuntary Rumination
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RUMINATION", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.involuntary_rumination.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Intrusive Loop", 100, cardY + 145);

  // Pillar 2: Dopamine Volatility
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DOPAMINE", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.dopamine_volatility.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Mood Rollercoaster", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Idealization
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#E11D48";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("IDEALIZATION", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.crystallized_idealization.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Pedestalization", 100 + (colWidth + 20) * 2, cardY + 145);

  // Neurobiology Box
  ctx.fillStyle = "rgba(244, 63, 94, 0.08)";
  drawRoundedRect(ctx, 80, 680, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CLINICAL ATTACHMENT & DOPAMINE INSIGHT", 120, 730);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 775, width - 240, 36, 3);

  // Detachment Training Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 920, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DOPAMINE FAST & DETACHMENT PROTOCOL", 120, 965);

  const drills = result.profile.detachmentProtocols[lang] || result.profile.detachmentProtocols.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1010, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen romantic obsession & limerence free at:", 80, 1220);

  ctx.fillStyle = "#FB7185";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/limerence", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-limerence-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an ultra-premium 1080x1350 Instagram / TikTok story card for Sensory Overload & Empathy Burnout.
 */
export async function generateSensoryCard(
  result: SensoryScoreResult,
  lang: SensoryLang = "en"
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient - Deep Teal & Slate
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#041517");
  bgGrad.addColorStop(0.5, "#082429");
  bgGrad.addColorStop(1, "#0a191c");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Emerald / Teal Radial Glow Orb
  const orbGrad = ctx.createRadialGradient(850, 200, 10, 850, 200, 500);
  orbGrad.addColorStop(0, "rgba(20, 184, 166, 0.25)");
  orbGrad.addColorStop(1, "rgba(20, 184, 166, 0)");
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Header Brand
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("NUJU LABS • DR. ELAINE ARON HSP MODEL", 80, 110);
  ctx.letterSpacing = "0px";

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Sensory Overload & Empathy Burnout Diagnostic", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(20, 184, 166, 0.15)";
  drawRoundedRect(ctx, 80, 195, 680, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 60px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(titleText, 80, 315);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#99F6E4";
  ctx.font = "500 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 365, width - 160, 40, 2);

  // 3 Pillar Cards
  const cardY = 460;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Sensory Threshold
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SENSORY", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.sensory_threshold.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Reactivity", 100, cardY + 145);

  // Pillar 2: Empathic Absorption
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EMPATHIC", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.empathic_absorption.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Absorption", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Overstimulation
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#06B6D4";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("OVERLOAD", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.overstimulation_exhaustion.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Depletion Rate", 100 + (colWidth + 20) * 2, cardY + 145);

  // Clinical Insight Box
  ctx.fillStyle = "rgba(20, 184, 166, 0.08)";
  drawRoundedRect(ctx, 80, 680, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SENSORY PROCESSING SENSITIVITY PROFILE", 120, 730);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 775, width - 240, 36, 3);

  // Decompression Training Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 920, width - 160, 210, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SENSORY DECOMPRESSION PROTOCOL", 120, 965);

  const drills = result.profile.decompressionProtocols[lang] || result.profile.decompressionProtocols.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1010, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen sensory overload and empathy burnout free at:", 80, 1220);

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/sensory-overload", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-sensory-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story card (1080x1350) for Clinical Perfectionism & Fear of Failure Screener.
 */
export async function generatePerfectionismCard(
  result: PerfectionismScoreResult,
  lang: PerfectionismLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#0F172A");
  grad.addColorStop(0.5, "#1E293B");
  grad.addColorStop(1, "#0A0F1D");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle Glow
  const glow = ctx.createRadialGradient(width - 200, 200, 50, width - 200, 200, 500);
  glow.addColorStop(0, "rgba(245, 158, 11, 0.15)");
  glow.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app", 80, 105);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CLINICAL PERFECTIONISM SCREENER", 220, 103);

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Frost & Hewitt Multidimensional Perfectionism Scale (FMPS)", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 195, 680, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FCD34D";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 58px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 310, width - 160, 64, 2);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#FDE68A";
  ctx.font = "500 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 435, width - 160, 38, 2);

  // 3 Pillar Cards
  const cardY = 525;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Mistake Concern
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#EF4444";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("MISTAKES", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.mistake_rumination.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Fear of Error", 100, cardY + 145);

  // Pillar 2: High Standards
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("STANDARDS", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.personal_standards.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Inner Demands", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Social Expectations
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#3B82F6";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("EXTERNAL", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.socially_prescribed.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Pleasing Pressure", 100 + (colWidth + 20) * 2, cardY + 145);

  // Psychology Insight Box
  ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
  drawRoundedRect(ctx, 80, 735, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#FCD34D";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("COGNITIVE INSIGHT", 120, 780);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 825, width - 240, 36, 3);

  // Recovery Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 965, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ADAPTIVE REFRAME PROTOCOL", 120, 1010);

  const protocols = result.profile.actionProtocols[lang] || result.profile.actionProtocols.en;
  const protocolText = protocols[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, protocolText, 120, 1055, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Take the Clinical Perfectionism Screener free at:", 80, 1220);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/perfectionism", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-perfectionism-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story card (1080x1350) for Social Battery & Introvert Hangover Screener.
 */
export async function generateSocialBatteryCard(
  result: SocialBatteryScoreResult,
  lang: SocialBatteryLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#090D16");
  grad.addColorStop(0.5, "#131B2E");
  grad.addColorStop(1, "#0B1120");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle Cyan/Purple Ambient Glow
  const glow = ctx.createRadialGradient(200, 300, 50, 200, 300, 600);
  glow.addColorStop(0, "rgba(59, 130, 246, 0.15)");
  glow.addColorStop(1, "rgba(59, 130, 246, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app", 80, 105);

  ctx.fillStyle = "#60A5FA";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SOCIAL BATTERY & INTROVERT HANGOVER", 220, 103);

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Sensory Depletion & Social Energy Assessment", 80, 150);

  // Battery Level Box
  const batteryPct = result.remainingBattery;
  let batteryColor = "#10B981";
  if (batteryPct <= 25) batteryColor = "#EF4444";
  else if (batteryPct <= 60) batteryColor = "#F59E0B";

  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 80, 195, 420, 52, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = batteryColor;
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`🔋 BATTERY REMAINING: ${batteryPct}%`, 105, 230);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 56px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 315, width - 160, 62, 2);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#93C5FD";
  ctx.font = "500 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 440, width - 160, 38, 2);

  // 3 Pillar Cards
  const cardY = 530;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Masking Drain
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("MASKING", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.social_masking.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Emotional Labor", 100, cardY + 145);

  // Pillar 2: Sensory Load
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SENSORY", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.sensory_overload.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Ambient Noise", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Recovery Deficit
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#A855F7";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DEFICIT", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.recovery_deficit.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Solitude Starvation", 100 + (colWidth + 20) * 2, cardY + 145);

  // Nervous System Insight Box
  ctx.fillStyle = "rgba(59, 130, 246, 0.08)";
  drawRoundedRect(ctx, 80, 735, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#93C5FD";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ENERGY & FATIGUE DIAGNOSIS", 120, 780);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 825, width - 240, 36, 3);

  // Recharge Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 965, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("RECOMMENDED RECHARGE PROTOCOL", 120, 1010);

  const drills = result.profile.rechargeProtocols[lang] || result.profile.rechargeProtocols.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1055, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Test your social battery and introvert hangover free at:", 80, 1220);

  ctx.fillStyle = "#60A5FA";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/social-battery", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-social-battery-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story card (1080x1350) for Gaslighting & Manipulation Radar.
 */
export async function generateGaslightingCard(
  result: GaslightingScoreResult,
  lang: GaslightingLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#130A18");
  grad.addColorStop(0.5, "#22122C");
  grad.addColorStop(1, "#0D0612");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle Purple/Rose Glow
  const glow = ctx.createRadialGradient(width - 200, 200, 50, width - 200, 200, 500);
  glow.addColorStop(0, "rgba(217, 70, 239, 0.15)");
  glow.addColorStop(1, "rgba(217, 70, 239, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app", 80, 105);

  ctx.fillStyle = "#E879F9";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("GASLIGHTING & MANIPULATION RADAR", 220, 103);

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Relational Coercion & Cognitive Invalidation Framework", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(217, 70, 239, 0.15)";
  drawRoundedRect(ctx, 80, 195, 720, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(217, 70, 239, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#F0ABFC";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 58px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 310, width - 160, 64, 2);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#F5D0FE";
  ctx.font = "500 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 435, width - 160, 38, 2);

  // 3 Pillar Cards
  const cardY = 525;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Reality Distortion
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F43F5E";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DISTORTION", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.reality_distortion.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Memory Doubts", 100, cardY + 145);

  // Pillar 2: Eggshell Walking
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#EAB308";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VIGILANCE", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.hyper_vigilance.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Eggshells Walk", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Apology Reflex
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#C084FC";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("AUTONOMY", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.apology_reflex.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Apology Reflex", 100 + (colWidth + 20) * 2, cardY + 145);

  // Psychology Insight Box
  ctx.fillStyle = "rgba(217, 70, 239, 0.08)";
  drawRoundedRect(ctx, 80, 735, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(217, 70, 239, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#F0ABFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("COGNITIVE & SENSORY DIAGNOSIS", 120, 780);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 825, width - 240, 36, 3);

  // Recovery Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 965, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SOVEREIGN EMPOWERMENT PROTOCOL", 120, 1010);

  const protocols = result.profile.empowermentProtocols[lang] || result.profile.empowermentProtocols.en;
  const protocolText = protocols[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, protocolText, 120, 1055, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Take the Gaslighting & Manipulation Radar free at:", 80, 1220);

  ctx.fillStyle = "#E879F9";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/gaslighting", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-gaslighting-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story card (1080x1350) for Cortisol & Somatic Stress Body Screener.
 */
export async function generateCortisolCard(
  result: CortisolScoreResult,
  lang: CortisolLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#081414");
  grad.addColorStop(0.5, "#0F2625");
  grad.addColorStop(1, "#071010");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle Emerald/Amber Ambient Glow
  const glow = ctx.createRadialGradient(200, 300, 50, 200, 300, 600);
  glow.addColorStop(0, "rgba(20, 184, 166, 0.15)");
  glow.addColorStop(1, "rgba(20, 184, 166, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Brand Header
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app", 80, 105);

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CORTISOL & SOMATIC STRESS SCREENER", 220, 103);

  // Subtitle
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
  ctx.font = "500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Allostatic Load & HPA-Axis Dysregulation Framework", 80, 150);

  // Profile Badge
  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "rgba(20, 184, 166, 0.15)";
  drawRoundedRect(ctx, 80, 195, 720, 48, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 226);

  // Profile Title
  const titleText = result.profile.title[lang] || result.profile.title.en;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 56px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, titleText, 80, 315, width - 160, 62, 2);

  // Tagline
  const tagText = result.profile.tagline[lang] || result.profile.tagline.en;
  ctx.fillStyle = "#99F6E4";
  ctx.font = "500 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, tagText, 80, 440, width - 160, 38, 2);

  // 3 Pillar Cards
  const cardY = 530;
  const colWidth = (width - 160 - 40) / 3;

  // Pillar 1: Circadian & Sleep
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CIRCADIAN", 100, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.circadian_sleep.percentage}%`, 100, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Sleep Disruption", 100, cardY + 145);

  // Pillar 2: Muscular Tension
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + colWidth + 20, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#EF4444";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SOMATIC", 100 + colWidth + 20, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.muscular_somatic.percentage}%`, 100 + colWidth + 20, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Jaw & Muscle Armor", 100 + colWidth + 20, cardY + 145);

  // Pillar 3: Neuroendocrine Overdrive
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80 + (colWidth + 20) * 2, cardY, colWidth, 180, 24);
  ctx.fill();
  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("OVERDRIVE", 100 + (colWidth + 20) * 2, cardY + 45);
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${result.subscales.neuroendocrine_overdrive.percentage}%`, 100 + (colWidth + 20) * 2, cardY + 110);
  ctx.font = "500 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillText("Wired but Tired", 100 + (colWidth + 20) * 2, cardY + 145);

  // Nervous System Insight Box
  ctx.fillStyle = "rgba(20, 184, 166, 0.08)";
  drawRoundedRect(ctx, 80, 735, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.3)";
  ctx.stroke();

  ctx.fillStyle = "#5EEAD4";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("HPA-AXIS PHYSIOLOGY DIAGNOSIS", 120, 780);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 825, width - 240, 36, 3);

  // Down-Regulation Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 965, width - 160, 205, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("ALLOSTATIC DOWN-REGULATION PROTOCOL", 120, 1010);

  const drills = result.profile.downRegulationProtocols[lang] || result.profile.downRegulationProtocols.en;
  const drillText = drills[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, drillText, 120, 1055, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Test your cortisol and somatic stress free at:", 80, 1220);

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/cortisol-stress", 80, 1260);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `ju-cortisol-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story format (1080x1350) share card for the Emotional Availability Screener.
 */
export async function generateEmotionalAvailabilityCard(
  result: EmotionalAvailabilityScoreResult,
  lang: EmotionalAvailabilityLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background gradient: Indigo / Deep Cyan / Midnight Blue
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0B0F19");
  bgGrad.addColorStop(0.45, "#111827");
  bgGrad.addColorStop(1, "#0A101D");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft glow accents
  const glow = ctx.createRadialGradient(width * 0.85, height * 0.15, 20, width * 0.85, height * 0.15, 450);
  glow.addColorStop(0, "rgba(99, 102, 241, 0.18)");
  glow.addColorStop(1, "rgba(99, 102, 241, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Card border
  ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Top header tag
  ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
  drawRoundedRect(ctx, 80, 80, 480, 56, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NUJU EMOTIONAL AVAILABILITY RADAR", 105, 115);

  // Assessment title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Emotional Availability", 80, 200);

  // Level Badge Pill
  ctx.fillStyle = "rgba(99, 102, 241, 0.2)";
  drawRoundedRect(ctx, 80, 235, 360, 50, 25);
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
  ctx.stroke();

  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "#A5B4FC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 268);

  // Archetype Title Banner
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 40px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const archTitle = result.profile.title[lang] || result.profile.title.en;
  ctx.fillText(archTitle, 80, 340);

  // Tagline
  ctx.fillStyle = "#C7D2FE";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  wrapText(ctx, `"${tagline}"`, 80, 390, width - 160, 36, 2);

  // Subscales breakdown boxes
  const boxWidth = 280;
  const boxHeight = 160;
  const boxY = 480;

  // Box 1: Vulnerability Tolerance
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, boxY, boxWidth, boxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VULNERABILITY", 105, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.vulnerability_tolerance.percentage}%`, 105, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Exposure Fear", 105, boxY + 135);

  // Box 2: Stonewalling
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 400, boxY, boxWidth, boxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("STONEWALLING", 425, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.defensive_stonewalling.percentage}%`, 425, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Conflict Shutdown", 425, boxY + 135);

  // Box 3: Autonomy Anxiety
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 720, boxY, boxWidth, boxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#A78BFA";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("AUTONOMY FEAR", 745, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.autonomy_anxiety.percentage}%`, 745, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Engulfment Panic", 745, boxY + 135);

  // Psychology Mechanism Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  drawRoundedRect(ctx, 80, 680, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#818CF8";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("INTIMACY DEFENSE ARCHITECTURE", 120, 725);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 770, width - 240, 36, 3);

  // Action Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 930, width - 160, 215, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VULNERABILITY EXPANSION PROTOCOL", 120, 975);

  const protocols = result.profile.actionProtocols[lang] || result.profile.actionProtocols.en;
  const protocolText = protocols[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, protocolText, 120, 1020, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your emotional availability free at:", 80, 1200);

  ctx.fillStyle = "#818CF8";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/emotional-availability", 80, 1245);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `nuju-emotional-availability-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story format (1080x1350) share card for the Revenge Bedtime Procrastination Screener.
 */
export async function generateBedtimeProcrastinationCard(
  result: BedtimeProcrastinationScoreResult,
  lang: BedtimeProcrastinationLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background gradient: Deep Midnight Purple / Dark Obsidian
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#0C091A");
  bgGrad.addColorStop(0.5, "#140C29");
  bgGrad.addColorStop(1, "#0A0614");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Moonlit Amber / Violet Glow
  const glow = ctx.createRadialGradient(width * 0.8, height * 0.2, 10, width * 0.8, height * 0.2, 500);
  glow.addColorStop(0, "rgba(245, 158, 11, 0.18)");
  glow.addColorStop(0.6, "rgba(168, 85, 247, 0.12)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Card border
  ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Top header pill
  ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
  drawRoundedRect(ctx, 80, 80, 520, 56, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("REVENGE BEDTIME PROCRASTINATION INDEX", 105, 115);

  // Assessment title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Midnight Sleep Dread", 80, 195);

  // Level Badge Pill
  ctx.fillStyle = "rgba(168, 85, 247, 0.2)";
  drawRoundedRect(ctx, 80, 230, 360, 50, 25);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
  ctx.stroke();

  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "#E9D5FF";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 263);

  // Archetype Title Banner
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 40px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const archTitle = result.profile.title[lang] || result.profile.title.en;
  ctx.fillText(archTitle, 80, 335);

  // Tagline
  ctx.fillStyle = "#FDE68A";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  wrapText(ctx, `"${tagline}"`, 80, 385, width - 160, 36, 2);

  // Subscales breakdown boxes
  const boxWidth = 280;
  const boxHeight = 160;
  const boxY = 480;

  // Box 1: Autonomy Deficit
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, boxY, boxWidth, boxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DAYTIME DEFICIT", 105, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.autonomy_deficit.percentage}%`, 105, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Freedom Hunger", 105, boxY + 135);

  // Box 2: Dopamine Chasing
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 400, boxY, boxWidth, boxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#C084FC";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("DOPAMINE CHASE", 425, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.dopamine_chasing.percentage}%`, 425, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Midnight Scrolling", 425, boxY + 135);

  // Box 3: Morning Regret
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 720, boxY, boxWidth, boxHeight, 24);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("MORNING GUILT", 745, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.morning_regret.percentage}%`, 745, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Circadian Debt", 745, boxY + 135);

  // Psychology Mechanism Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  drawRoundedRect(ctx, 80, 680, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NOCTURNAL REBELLION DYNAMICS", 120, 725);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 770, width - 240, 36, 3);

  // Action Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 930, width - 160, 215, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CIRCADIAN REPAIR PROTOCOL", 120, 975);

  const protocols = result.profile.actionProtocols[lang] || result.profile.actionProtocols.en;
  const protocolText = protocols[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, protocolText, 120, 1020, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Test your sleep procrastination patterns free at:", 80, 1200);

  ctx.fillStyle = "#F59E0B";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/revenge-bedtime-procrastination", 80, 1245);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `nuju-bedtime-procrastination-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story format (1080x1350) share card for the Chronic Guilt & Self-Sabotage Screener.
 */
export async function generateChronicGuiltCard(
  result: ChronicGuiltScoreResult,
  lang: ChronicGuiltLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background gradient: Deep Crimson Noir / Velvet Ember
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#19080E");
  bgGrad.addColorStop(0.5, "#250F18");
  bgGrad.addColorStop(1, "#0F0408");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Warm Crimson / Amber Glow
  const glow = ctx.createRadialGradient(width * 0.8, height * 0.2, 10, width * 0.8, height * 0.2, 500);
  glow.addColorStop(0, "rgba(225, 29, 72, 0.22)");
  glow.addColorStop(0.6, "rgba(245, 158, 11, 0.12)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Card border
  ctx.strokeStyle = "rgba(225, 29, 72, 0.28)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Top header pill
  ctx.fillStyle = "rgba(225, 29, 72, 0.18)";
  drawRoundedRect(ctx, 80, 80, 520, 56, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(225, 29, 72, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CHRONIC GUILT & SELF-SABOTAGE INDEX", 105, 115);

  // Assessment title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Toxic Burden & Penance", 80, 195);

  // Level Badge Pill
  ctx.fillStyle = "rgba(244, 63, 94, 0.22)";
  drawRoundedRect(ctx, 80, 230, 380, 50, 25);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.45)";
  ctx.stroke();

  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "#FECDD3";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 263);

  // Archetype Title Banner
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 40px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const archTitle = result.profile.title[lang] || result.profile.title.en;
  ctx.fillText(archTitle, 80, 335);

  // Tagline
  ctx.fillStyle = "#FDE68A";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  wrapText(ctx, `"${tagline}"`, 80, 385, width - 160, 36, 2);

  // Subscales breakdown boxes
  const boxWidth = 280;
  const boxHeight = 160;
  const boxY = 480;

  // Box 1: Omnipotent Responsibility
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 80, boxY, boxWidth, boxHeight, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(225, 29, 72, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("OMNIPOTENT RESP.", 105, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.omnipotent_responsibility.percentage}%`, 105, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Emotional Rescuing", 105, boxY + 135);

  // Box 2: Punitive Sabotage
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 400, boxY, boxWidth, boxHeight, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#FBBF24";
  ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("PUNITIVE SABOTAGE", 425, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.punitive_self_sabotage.percentage}%`, 425, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Penance & Deprivation", 425, boxY + 135);

  // Box 3: Unworthiness Anxiety
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 720, boxY, boxWidth, boxHeight, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#C084FC";
  ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("UNWORTHINESS", 745, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.unworthiness_anxiety.percentage}%`, 745, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Existential Apology", 745, boxY + 135);

  // Psychology Mechanism Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  drawRoundedRect(ctx, 80, 680, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(225, 29, 72, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#FDA4AF";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("CORE PSYCHODYNAMICS & SUPER-EGO CONFLICT", 120, 725);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 770, width - 240, 36, 3);

  // Action Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 930, width - 160, 215, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("UNCONDITIONAL REPAIR PROTOCOL", 120, 975);

  const protocols = result.profile.actionProtocols[lang] || result.profile.actionProtocols.en;
  const protocolText = protocols[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, protocolText, 120, 1020, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your chronic guilt & self-sabotage levels at:", 80, 1200);

  ctx.fillStyle = "#FB7185";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/chronic-guilt", 80, 1245);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `nuju-chronic-guilt-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}

/**
 * Generates an Instagram Story format (1080x1350) share card for the Hyper-Independence Screener.
 */
export async function generateHyperIndependenceCard(
  result: HyperIndependenceScoreResult,
  lang: HyperIndependenceLang
): Promise<{ dataUrl: string; blob: Blob; file: File }> {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Background gradient: Deep Slate / Obsidian Steel
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#09131C");
  bgGrad.addColorStop(0.5, "#0E1C2B");
  bgGrad.addColorStop(1, "#050910");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Steel Blue / Cyan Glow
  const glow = ctx.createRadialGradient(width * 0.8, height * 0.2, 10, width * 0.8, height * 0.2, 500);
  glow.addColorStop(0, "rgba(2, 132, 199, 0.24)");
  glow.addColorStop(0.6, "rgba(13, 148, 136, 0.14)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Card border
  ctx.strokeStyle = "rgba(2, 132, 199, 0.3)";
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 40);
  ctx.stroke();

  // Top header pill
  ctx.fillStyle = "rgba(2, 132, 199, 0.18)";
  drawRoundedRect(ctx, 80, 80, 520, 56, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(2, 132, 199, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("HYPER-INDEPENDENCE DIAGNOSTIC", 105, 115);

  // Assessment title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 46px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Trauma Shield & Self-Reliance", 80, 195);

  // Level Badge Pill
  ctx.fillStyle = "rgba(14, 165, 233, 0.22)";
  drawRoundedRect(ctx, 80, 230, 380, 50, 25);
  ctx.fill();
  ctx.strokeStyle = "rgba(14, 165, 233, 0.45)";
  ctx.stroke();

  const badgeText = result.profile.badge[lang] || result.profile.badge.en;
  ctx.fillStyle = "#BAE6FD";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(badgeText.toUpperCase(), 105, 263);

  // Archetype Title Banner
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 40px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const archTitle = result.profile.title[lang] || result.profile.title.en;
  ctx.fillText(archTitle, 80, 335);

  // Tagline
  ctx.fillStyle = "#7DD3FC";
  ctx.font = "italic 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const tagline = result.profile.tagline[lang] || result.profile.tagline.en;
  wrapText(ctx, `"${tagline}"`, 80, 385, width - 160, 36, 2);

  // Subscales breakdown boxes
  const boxWidth = 280;
  const boxHeight = 160;
  const boxY = 480;

  // Box 1: Solitary Armor
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 80, boxY, boxWidth, boxHeight, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("SOLITARY ARMOR", 105, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.solitary_armor.percentage}%`, 105, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Help Delegation Refusal", 105, boxY + 135);

  // Box 2: Vulnerability Phobia
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 400, boxY, boxWidth, boxHeight, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 184, 166, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#2DD4BF";
  ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("VULNERABILITY PHOBIA", 425, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.vulnerability_phobia.percentage}%`, 425, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Emotional Containment", 425, boxY + 135);

  // Box 3: Threat Detection
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  drawRoundedRect(ctx, 720, boxY, boxWidth, boxHeight, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(244, 63, 94, 0.25)";
  ctx.stroke();

  ctx.fillStyle = "#FB7185";
  ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("THREAT DETECTION", 745, boxY + 45);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(`${result.subscales.threat_detection.percentage}%`, 745, boxY + 105);
  ctx.fillStyle = "#94A3B8";
  ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Anticipatory Betrayal", 745, boxY + 135);

  // Psychology Mechanism Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  drawRoundedRect(ctx, 80, 680, width - 160, 220, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(2, 132, 199, 0.2)";
  ctx.stroke();

  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("NEURO-DEFENSE SYSTEM & INTERDEPENDENCE CAPACITY", 120, 725);

  const descText = result.profile.description[lang] || result.profile.description.en;
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, descText, 120, 770, width - 240, 36, 3);

  // Action Protocol Box
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  drawRoundedRect(ctx, 80, 930, width - 160, 215, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("PROGRESSIVE INTERDEPENDENCE PROTOCOL", 120, 975);

  const protocols = result.profile.actionProtocols[lang] || result.profile.actionProtocols.en;
  const protocolText = protocols[0] || "";
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  wrapText(ctx, protocolText, 120, 1020, width - 240, 36, 3);

  // Footer CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "bold 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("Screen your hyper-independence trauma patterns at:", 80, 1200);

  ctx.fillStyle = "#38BDF8";
  ctx.font = "900 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText("nuju.app/quiz/hyper-independence", 80, 1245);

  const dataUrl = canvas.toDataURL("image/png", 0.95);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed blob"))), "image/png", 0.95);
  });
  const file = new File([blob], `nuju-hyper-independence-${result.level}.png`, { type: "image/png" });

  return { dataUrl, blob, file };
}









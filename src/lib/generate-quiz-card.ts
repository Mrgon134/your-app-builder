import { QuizMeta, QuizResult } from "@/data/quizzes";

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

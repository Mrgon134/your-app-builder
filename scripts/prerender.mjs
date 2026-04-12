/**
 * Prerender public routes after Vite build.
 * Uses Playwright to render each route and saves the full HTML to dist/.
 * Run: node scripts/prerender.mjs
 */
import { chromium } from "playwright";
import { preview } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

const ROUTES = [
  "/",
  "/about",
  "/support",
  "/contact",
  "/install",
  "/privacy",
  "/terms",
  "/medical-disclaimer",
  "/blog",
  "/blog/how-to-start-journaling",
  "/blog/benefits-of-mood-tracking",
  "/blog/ai-journal-vs-traditional",
  "/blog/journaling-prompts-for-anxiety",
  "/blog/journaling-for-mental-health",
  "/blog/what-is-a-mood-journal",
  "/blog/5-minute-daily-journaling-habit",
  "/blog/bedtime-journaling-routine-for-sleep",
  "/blog/what-is-ai-journaling",
  "/blog/voice-journaling-guide",
  "/blog/mood-tracking-for-anxiety",
  "/blog/journaling-for-self-discovery",
  "/blog/how-to-track-emotions-daily",
  "/blog/best-journaling-apps-2026",
  "/blog/daylio-alternatives",
  "/blog/best-mood-tracker-apps",
  "/blog/best-ai-journaling-apps",
  "/blog/journaling-for-adhd",
  "/blog/journaling-for-relationships",
  "/blog/journaling-before-therapy",
  "/blog/mood-tracking-for-therapists",
  "/blog/3am-anxiety-journaling",
  "/blog/cara-mulai-journaling",
  "/blog/manfaat-mood-tracking",
  "/blog/aplikasi-jurnal-terbaik",
  "/blog/journaling-untuk-kesehatan-mental",
];

async function prerender() {
  // Start Vite preview server
  const server = await preview({
    preview: { port: 4174, strictPort: true, host: "127.0.0.1" },
    build: { outDir: "dist" },
  });
  const baseUrl = "http://127.0.0.1:4174";

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  console.log(`Prerendering ${ROUTES.length} routes...`);

  for (const route of ROUTES) {
    const page = await context.newPage();
    const url = `${baseUrl}${route}`;

    await page.goto(url, { waitUntil: "networkidle" });
    // Wait a bit for react-helmet-async to inject meta tags
    await page.waitForTimeout(800);

    const html = await page.content();

    // Write to dist/route/index.html
    const outPath =
      route === "/"
        ? join(DIST, "index.html")
        : join(DIST, route.slice(1), "index.html");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, `<!DOCTYPE html>\n${html}`);
    console.log(`  ✓ ${route} → ${outPath.replace(DIST, "dist")}`);

    await page.close();
  }

  await browser.close();
  server.httpServer.close();
  console.log("Prerendering complete!");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err.message);
  console.error("Skipping prerendering — the build is still valid without it.");
  process.exit(0); // Don't fail the build
});

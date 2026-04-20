/**
 * Prerender public routes after Vite build.
 * Uses Playwright to render each route and saves the full HTML to dist/.
 * Run: node scripts/prerender.mjs
 */
import { chromium } from "playwright";
import { preview } from "vite";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const SITEMAP_PATH = join(__dirname, "..", "public", "sitemap.xml");

const FALLBACK_ROUTES = [
  "/",
  "/about",
  "/support",
  "/contact",
  "/install",
  "/privacy",
  "/terms",
  "/medical-disclaimer",
  "/blog",
  "/guides/journaling",
];

function getRoutesToPrerender() {
  const routeSet = new Set(FALLBACK_ROUTES);

  if (existsSync(SITEMAP_PATH)) {
    const sitemap = readFileSync(SITEMAP_PATH, "utf8");
    const matches = sitemap.matchAll(/<loc>https:\/\/nuju\.app([^<]*)<\/loc>/g);

    for (const match of matches) {
      const route = match[1]?.trim() || "/";
      routeSet.add(route === "" ? "/" : route);
    }
  }

  return Array.from(routeSet).sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });
}

async function prerender() {
  const routes = getRoutesToPrerender();

  const server = await preview({
    preview: { port: 4174, strictPort: true, host: "127.0.0.1" },
    build: { outDir: "dist" },
  });
  const baseUrl = "http://127.0.0.1:4174";

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  console.log(`Prerendering ${routes.length} routes...`);

  for (const route of routes) {
    const page = await context.newPage();
    const url = `${baseUrl}${route}`;

    await page.goto(url, { waitUntil: "networkidle" });
    // Wait a bit for react-helmet-async to inject meta tags.
    await page.waitForTimeout(800);

    const html = await page.content();
    const outPath =
      route === "/"
        ? join(DIST, "index.html")
        : join(DIST, route.slice(1), "index.html");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, `<!DOCTYPE html>\n${html}`);
    console.log(`  Rendered ${route} -> ${outPath.replace(DIST, "dist")}`);

    await page.close();
  }

  await browser.close();
  server.httpServer.close();
  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerender failed:", err.message);
  console.error("Skipping prerendering - the build is still valid without it.");
  process.exit(0);
});

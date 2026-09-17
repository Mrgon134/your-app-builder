/**
 * Generates sitemap.xml and rss.xml from blog-posts.ts metadata.
 *
 * Writes to public/ so Vite copies them to dist/ on build.
 * Runs before `vite build` so output reflects the current blog data.
 *
 * Uses esbuild (already a Vite dep) to transpile the TS module.
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

const BASE_URL = "https://nuju.app";
const OG_IMAGE =
  "https://sxgmlnlqmdjjfmcypivi.supabase.co/functions/v1/og-image";

const STATIC_ROUTES = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/ai-journal", priority: "0.9", changefreq: "weekly" },
  { loc: "/mood-tracker", priority: "0.9", changefreq: "weekly" },
  { loc: "/voice-journaling", priority: "0.8", changefreq: "weekly" },
  { loc: "/install", priority: "0.8", changefreq: "monthly" },
  { loc: "/about", priority: "0.6", changefreq: "monthly" },
  { loc: "/support", priority: "0.6", changefreq: "monthly" },
  { loc: "/contact", priority: "0.5", changefreq: "monthly" },
  { loc: "/privacy", priority: "0.4", changefreq: "yearly" },
  { loc: "/terms", priority: "0.4", changefreq: "yearly" },
  { loc: "/blog", priority: "0.8", changefreq: "weekly" },
  { loc: "/guides/journaling", priority: "0.9", changefreq: "monthly" },
  { loc: "/quiz", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/mental-health", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/mental-health-test", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/attachment-style", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/adhd-screener", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/inner-child", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/burnout", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/soundscapes", priority: "0.9", changefreq: "weekly" },
  { loc: "/tools/panic-sos", priority: "0.9", changefreq: "weekly" },
  { loc: "/tools/breathwork", priority: "0.95", changefreq: "weekly" },
  { loc: "/breathe", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/love-languages", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/people-pleasing", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/bilateral", priority: "0.95", changefreq: "weekly" },
  { loc: "/emdr", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/hsp", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/shadow-work", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/grounding", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/dopamine-detox", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/nervous-system", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/sleep", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/rsd", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/cognitive-distortions", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/nsdr", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/dissociation", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/imposter-syndrome", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/solfeggio", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/emotional-agility", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/high-functioning-anxiety", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/box-breathing", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/parentification", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/alexithymia", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/vocal-toning", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/limerence", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/sensory-overload", priority: "0.95", changefreq: "weekly" },
  { loc: "/tools/physiological-sigh", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/perfectionism", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/fear-of-failure", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/social-battery", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/introvert-hangover", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/gaslighting", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/emotional-manipulation", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/cortisol-stress", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/chronic-stress-body", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/emotional-availability", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/vulnerability-test", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/revenge-bedtime-procrastination", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/sleep-procrastination", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/chronic-guilt", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/guilt-self-sabotage", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/hyper-independence", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/trauma-independence", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/emotional-enmeshment", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/family-boundaries", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/fear-of-being-perceived", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/spotlight-effect", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/decision-fatigue", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/brain-fog", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/fomo", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/social-comparison", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/attachment-compatibility", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/relationship-attachment", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/existential-dread", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/quarter-life-crisis", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/emotional-numbness", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/dissociative-blunting", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/toxic-independence", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/counter-dependency", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/compassion-fatigue", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/empathy-burnout", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/intimacy-avoidance", priority: "0.95", changefreq: "weekly" },
  { loc: "/quiz/intimacy-anorexia", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/baterai-emosi", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/tipe-overthinking", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/burnout-screener", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/gaya-regulasi-emosi", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/high-functioning-anxiety-us", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/feierabend-burnout-de", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/winter-blues-nordic-no", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/dutch-niksen-burnout-nl", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/honne-tatemae-jp", priority: "0.9", changefreq: "weekly" },
  { loc: "/quiz/nunchi-hwabyung-kr", priority: "0.9", changefreq: "weekly" },
  { loc: "/ebook", priority: "0.9", changefreq: "weekly" },
  { loc: "/buku", priority: "0.8", changefreq: "weekly" },
];

const escapeXml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

async function loadBlogModule() {
  const result = await build({
    entryPoints: [join(ROOT, "src/data/blog-posts.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node20",
    write: false,
  });
  const cacheDir = join(ROOT, "node_modules/.cache/nuju-feeds");
  mkdirSync(cacheDir, { recursive: true });
  const tmpFile = join(cacheDir, "blog-posts.mjs");
  writeFileSync(tmpFile, result.outputFiles[0].text);
  return import(pathToFileURL(tmpFile).href);
}

function buildSitemap(posts, getPostLanguage, LANGUAGE_ALTERNATES) {
  const today = new Date().toISOString().slice(0, 10);

  const urlBlocks = STATIC_ROUTES.map(
    (r) =>
      `  <url>
    <loc>${BASE_URL}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>
  </url>`,
  );

  const HIGH_PRIORITY_SLUGS = new Set([
    "best-ai-journaling-apps",
    "best-mood-tracker-apps",
    "best-journaling-apps-2026",
    "daylio-alternatives",
    "reflectly-alternatives",
    "best-ai-voice-journal-apps-2026",
    "3am-anxiety-journaling",
    "ai-journal-for-overthinking",
  ]);

  for (const post of posts) {
    const lang = getPostLanguage(post);
    let priority = "0.7";
    if (HIGH_PRIORITY_SLUGS.has(post.slug)) {
      priority = "0.85";
    } else if (lang === "id") {
      priority = "0.6";
    }
    const alt = LANGUAGE_ALTERNATES[post.slug];
    let hreflangBlock = "";
    if (alt) {
      const altLang = alt.language === "en" ? "id" : "en";
      hreflangBlock = `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/blog/${post.slug}"/>
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}/blog/${alt.alternateSlug}"/>`;
    } else {
      hreflangBlock = `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/blog/${post.slug}"/>`;
    }
    urlBlocks.push(
      `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt ?? post.publishedAt}</lastmod>
    <priority>${priority}</priority>
    <changefreq>monthly</changefreq>
    <image:image>
      <image:loc>${OG_IMAGE}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.description)}</image:caption>
    </image:image>${hreflangBlock}
  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks.join("\n")}
</urlset>
`;
}

function buildRss(posts, getPostLanguage) {
  const sorted = posts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  const items = sorted
    .map((post) => {
      const lang = getPostLanguage(post);
      const pubDate = new Date(`${post.publishedAt}T12:00:00Z`).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${pubDate}</pubDate>
      <dc:language>${lang}</dc:language>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Nuju Blog - Journaling, Mood Tracking &amp; Emotional Wellness</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical guides on journaling, mood tracking, and emotional wellness from the Nuju team.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

async function main() {
  const mod = await loadBlogModule();
  const { BLOG_POSTS, getPostLanguage, LANGUAGE_ALTERNATES } = mod;
  const today = new Date().toISOString().slice(0, 10);
  const publishedPosts = BLOG_POSTS.filter((post) => post.publishedAt <= today);

  const sitemap = buildSitemap(
    publishedPosts,
    getPostLanguage,
    LANGUAGE_ALTERNATES,
  );
  const rss = buildRss(publishedPosts, getPostLanguage);

  mkdirSync(PUBLIC_DIR, { recursive: true });
  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), sitemap);
  writeFileSync(join(PUBLIC_DIR, "rss.xml"), rss);

  console.log(
    `Generated sitemap.xml (${publishedPosts.length} blog posts + ${STATIC_ROUTES.length} static routes)`,
  );
  console.log(`Generated rss.xml (${publishedPosts.length} items)`);
}

main().catch((err) => {
  console.error("Feed generation failed:", err);
  process.exit(1);
});

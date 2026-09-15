import fs from "fs";
import path from "path";

const ARTICLES_DIR = "docs/articles";

function parseFrontmatterAndContent(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, markdown: fileContent };
  }

  const rawYaml = match[1];
  const markdown = match[2];
  const frontmatter = {};

  const lines = rawYaml.split(/\r?\n/);
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();

      // Unquote string
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      } else if (val.startsWith("[") && val.endsWith("]")) {
        // Parse JSON-like array
        try {
          val = JSON.parse(val.replace(/'/g, '"'));
        } catch {
          val = val
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
        }
      }
      frontmatter[key] = val;
    }
  }

  return { frontmatter, markdown };
}

function parseMarkdownToSections(markdown) {
  const sections = [];
  const faqs = [];
  const lines = markdown.split(/\r?\n/);

  let currentList = null;
  let currentListType = null;
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join(" ").trim();
      if (content && !content.startsWith("```")) {
        sections.push({ type: "p", content });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      sections.push({ type: currentListType, content: currentList });
      currentList = null;
      currentListType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Skip empty lines
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    // Skip top H1 if already in title
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      continue;
    }

    // Horizontal rules or divider lines
    if (line === "---" || line === "***") {
      flushParagraph();
      flushList();
      continue;
    }

    // Skip ASCII boxes or code block markers
    if (line.startsWith("```") || line.startsWith("+---") || line.startsWith("|")) {
      flushParagraph();
      flushList();
      continue;
    }

    // Check H2
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      sections.push({ type: "h2", content: line.replace(/^##\s+/, "") });
      continue;
    }

    // Check H3
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      sections.push({ type: "h3", content: line.replace(/^###\s+/, "") });
      continue;
    }

    // Check Unordered List
    if (line.startsWith("* ") || line.startsWith("- ")) {
      flushParagraph();
      if (currentListType !== "ul") {
        flushList();
        currentListType = "ul";
        currentList = [];
      }
      currentList.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    // Check Ordered List
    const olMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (currentListType !== "ol") {
        flushList();
        currentListType = "ol";
        currentList = [];
      }
      currentList.push(olMatch[2]);
      continue;
    }

    // Regular paragraph lines
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();

  return { sections, faqs };
}

function mapCountryToLanguage(country) {
  const map = {
    ID: "id",
    DE: "de",
    CH: "de",
    JP: "ja",
    KR: "ko",
    NL: "nl",
    NO: "en",
    US: "en",
    UK: "en",
  };
  return map[country] || "en";
}

function mapTagsToCategory(tags, country) {
  if (Array.isArray(tags) && tags.length > 0) {
    return tags[0];
  }
  if (country === "ID") return "Refleksi Diri";
  if (country === "JP") return "Mental Health & Reflection";
  if (country === "KR") return "Self-Care & AI Diary";
  if (country === "DE" || country === "CH") return "Burnout Prevention";
  return "AI Journaling & Wellness";
}

async function convert() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} markdown articles in ${ARTICLES_DIR}`);

  const allPosts = [];

  for (const file of files) {
    const fullPath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { frontmatter, markdown } = parseFrontmatterAndContent(content);

    const slug = frontmatter.slug || file.replace(/\.md$/, "");
    const title = frontmatter.title || slug;
    const description = frontmatter.description || "";
    const publishedAt = frontmatter.date || "2026-09-15";
    const readingTimeMatch = (frontmatter.reading_time || "7 min").match(/\d+/);
    const readingTime = readingTimeMatch ? parseInt(readingTimeMatch[0], 10) : 7;
    const language = mapCountryToLanguage(frontmatter.target_country);
    const category = mapTagsToCategory(frontmatter.tags, frontmatter.target_country);

    const keywords = [];
    if (frontmatter.primary_keyword) keywords.push(frontmatter.primary_keyword);
    if (Array.isArray(frontmatter.secondary_keywords)) {
      keywords.push(...frontmatter.secondary_keywords);
    }

    const { sections, faqs } = parseMarkdownToSections(markdown);

    allPosts.push({
      slug,
      title,
      description,
      publishedAt,
      readingTime,
      category,
      language,
      metaTitle: title,
      metaDescription: description,
      keywords,
      sections,
      faq: faqs.length > 0 ? faqs : undefined,
    });
  }

  // Split into Batch 15 (first 25) and Batch 16 (remaining 25)
  const batch15Posts = allPosts.slice(0, 25);
  const batch16Posts = allPosts.slice(25);

  const batch15Code = `import { BlogPost } from "./blog-posts";\n\nexport const ANTIGRAVITY_BLOG_POSTS_BATCH15: BlogPost[] = ${JSON.stringify(batch15Posts, null, 2)};\n`;
  const batch16Code = `import { BlogPost } from "./blog-posts";\n\nexport const ANTIGRAVITY_BLOG_POSTS_BATCH16: BlogPost[] = ${JSON.stringify(batch16Posts, null, 2)};\n`;

  fs.writeFileSync("src/data/antigravity-posts-batch15.ts", batch15Code, "utf8");
  fs.writeFileSync("src/data/antigravity-posts-batch16.ts", batch16Code, "utf8");

  console.log(`Generated src/data/antigravity-posts-batch15.ts (${batch15Posts.length} posts)`);
  console.log(`Generated src/data/antigravity-posts-batch16.ts (${batch16Posts.length} posts)`);
}

convert().catch(console.error);

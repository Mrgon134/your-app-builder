import { describe, it, expect } from "vitest";
import { getPublishedBlogPosts, getPostLanguage } from "@/data/blog-posts";
import { getBlogQuizOrTool } from "@/data/blog-quiz-tool-mapping";

describe("Complete multilingual CTA audit across all blog posts", () => {
  it("ensures non-English posts have non-empty, localized CTAs and appropriate topic assignments", () => {
    const posts = getPublishedBlogPosts(new Date());
    expect(posts.length).toBeGreaterThan(900);

    const fallbackToEn = [];

    for (const post of posts) {
      const lang = (getPostLanguage(post) || "en").toLowerCase();
      const target = getBlogQuizOrTool(post, lang);

      expect(target).toBeDefined();
      expect(target.quizTitle).toBeTruthy();
      expect(target.primaryButtonLabel).toBeTruthy();
      expect(target.quizBadge).toBeTruthy();
      expect(target.quizHref).toMatch(/^\/(quiz|tools|tes-)/);

      if (["de", "fr", "es", "ja", "ko", "zh"].includes(lang)) {
        const enTarget = getBlogQuizOrTool(post, "en");
        if (target.quizTitle === enTarget.quizTitle) {
          fallbackToEn.push({
            slug: post.slug,
            lang,
            topic: target.topic,
            title: target.quizTitle,
          });
        }
      }
    }

    console.log(`Audited ${posts.length} posts. Fallback to English count: ${fallbackToEn.length}`);
    if (fallbackToEn.length > 0) {
      console.log("Fallback samples:", fallbackToEn.slice(0, 10));
    }

    // Expect ZERO English fallbacks for foreign language posts!
    expect(fallbackToEn.length).toBe(0);
  });
});

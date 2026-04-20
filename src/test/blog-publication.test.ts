import {
  getPublishedBlogPost,
  getPublishedBlogPosts,
} from "@/data/blog-posts";
import { describe, expect, it } from "vitest";

describe("blog publication helpers", () => {
  const referenceDate = new Date("2026-04-20T12:00:00Z");

  it("returns only posts that are published on or before the reference date", () => {
    const posts = getPublishedBlogPosts(referenceDate);
    const slugs = posts.map((post) => post.slug);

    expect(slugs).toContain("how-to-track-emotions-daily");
    expect(slugs).toContain("best-journaling-apps-2026");
    expect(slugs).toContain("daylio-alternatives");
    expect(slugs).toContain("reflectly-alternatives");
    expect(slugs).toContain("best-mood-tracker-apps");
    expect(slugs).toContain("best-ai-journaling-apps");
    expect(slugs).toContain("ai-journal-for-overthinking");
    expect(slugs).toContain("mood-tracker-for-self-awareness");
    expect(slugs).toContain("journaling-for-adhd");
    expect(slugs).not.toContain("aplikasi-jurnal-terbaik");
  });

  it("normalizes mojibake in published blog metadata", () => {
    const post = getPublishedBlogPost("how-to-start-journaling", referenceDate);

    expect(post).toBeDefined();
    expect(post?.description).not.toMatch(/â|Â/);
    expect(post?.description).toContain("what to write, when to write");
  });
});

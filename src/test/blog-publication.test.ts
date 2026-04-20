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
    expect(slugs).not.toContain("best-journaling-apps-2026");
    expect(slugs).not.toContain("best-ai-journaling-apps");
  });

  it("normalizes mojibake in published blog metadata", () => {
    const post = getPublishedBlogPost("how-to-start-journaling", referenceDate);

    expect(post).toBeDefined();
    expect(post?.description).not.toMatch(/â|Â/);
    expect(post?.description).toContain("what to write, when to write");
  });
});

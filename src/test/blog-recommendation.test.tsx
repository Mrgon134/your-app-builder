import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/SEOHead", () => ({
  default: () => null,
}));

vi.mock("react-helmet-async", () => ({
  Helmet: () => null,
}));

import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

const renderBlog = () =>
  render(
    <MemoryRouter>
      <Blog />
    </MemoryRouter>,
  );

const renderBlogPost = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>,
  );

describe("Blog recommendation surfaces", () => {
  it("highlights recommendation pages on the blog index", () => {
    renderBlog();

    expect(screen.getByTestId("blog-recommendation-hub")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /best ai journaling apps in 2026/i }),
    ).toHaveAttribute("href", "/blog/best-ai-journaling-apps");
    expect(
      screen.getByRole("link", { name: /see how nuju works/i }),
    ).toHaveAttribute("href", "/install");
  });

  it("adds a recommendation snapshot to comparison pages", () => {
    renderBlogPost("daylio-alternatives");

    expect(screen.getByTestId("blog-recommendation-cta")).toBeInTheDocument();
    expect(screen.getByText(/when nuju is the better fit/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /start the free reveal/i }),
    ).toHaveAttribute("href", expect.stringContaining("/onboarding?source=blog_daylio-alternatives"));
    expect(
      screen.getByRole("link", { name: /see how nuju works/i }),
    ).toHaveAttribute("href", "/install");
    expect(screen.getByText(/encrypted storage/i)).toBeInTheDocument();
  });
});

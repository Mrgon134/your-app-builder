import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const analyticsEvents = {
  trackRecommendationHubView: vi.fn(),
  trackRecommendationPageView: vi.fn(),
  trackRecommendationCtaClick: vi.fn(),
};

vi.mock("@/components/SEOHead", () => ({
  default: () => null,
}));

vi.mock("react-helmet-async", () => ({
  Helmet: () => null,
}));

vi.mock("@/hooks/use-posthog-events", () => ({
  usePostHogEvents: () => analyticsEvents,
}));

import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

const renderBlog = () =>
  render(
    <MemoryRouter initialEntries={["/blog"]}>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/onboarding" element={<div>Onboarding</div>} />
        <Route path="/install" element={<div>Install</div>} />
      </Routes>
    </MemoryRouter>,
  );

const renderBlogPost = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/onboarding" element={<div>Onboarding</div>} />
        <Route path="/install" element={<div>Install</div>} />
      </Routes>
    </MemoryRouter>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Blog recommendation surfaces", () => {
  it("highlights recommendation pages on the blog index", () => {
    renderBlog();

    const hub = screen.getByTestId("blog-recommendation-hub");

    expect(hub).toBeInTheDocument();
    expect(analyticsEvents.trackRecommendationHubView).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("link", { name: /best ai journaling apps in 2026/i }),
    ).toHaveAttribute("href", "/blog/best-ai-journaling-apps");
    expect(
      screen.getByRole("link", { name: /see how nuju works/i }),
    ).toHaveAttribute("href", "/install");

    fireEvent.click(within(hub).getByRole("link", { name: /start the free reveal/i }));
    expect(analyticsEvents.trackRecommendationCtaClick).toHaveBeenCalledWith(
      "blog_hub",
      "Recommendation Hub",
      "blog_recommendation_hub_primary",
      "reveal",
    );
  });

  it("adds a recommendation snapshot to comparison pages", () => {
    renderBlogPost("daylio-alternatives");

    expect(screen.getByTestId("blog-recommendation-cta")).toBeInTheDocument();
    expect(screen.getByText(/when nuju is the better fit/i)).toBeInTheDocument();
    expect(analyticsEvents.trackRecommendationPageView).toHaveBeenCalledWith(
      "daylio-alternatives",
      "App Comparison",
      "alternative",
    );
    expect(
      screen.getByRole("link", { name: /start the free reveal/i }),
    ).toHaveAttribute("href", expect.stringContaining("/onboarding?source=blog_daylio-alternatives"));
    expect(
      screen.getByRole("link", { name: /see how nuju works/i }),
    ).toHaveAttribute("href", "/install");
    expect(screen.getByText(/encrypted storage/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /start the free reveal/i }));
    expect(analyticsEvents.trackRecommendationCtaClick).toHaveBeenCalledWith(
      "daylio-alternatives",
      "App Comparison",
      "blog_recommendation_snapshot_primary",
      "reveal",
    );
  });
});

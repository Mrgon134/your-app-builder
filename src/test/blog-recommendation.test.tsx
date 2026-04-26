import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const analyticsEvents = {
  trackRecommendationHubView: vi.fn(),
  trackRecommendationPageView: vi.fn(),
  trackRecommendationCtaClick: vi.fn(),
};
const seoHeadProps = vi.fn();

vi.mock("@/components/SEOHead", () => ({
  default: (props: unknown) => {
    seoHeadProps(props);
    return null;
  },
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

afterEach(() => {
  vi.useRealTimers();
});

describe("Blog recommendation surfaces", () => {
  it("highlights recommendation pages on the blog index", () => {
    renderBlog();

    const hub = screen.getByTestId("blog-recommendation-hub");
    const hubLinks = within(hub);

    expect(hub).toBeInTheDocument();
    expect(analyticsEvents.trackRecommendationHubView).toHaveBeenCalledTimes(1);
    expect(
      hubLinks.getByRole("link", { name: /best ai journaling apps in 2026/i }),
    ).toHaveAttribute("href", "/blog/best-ai-journaling-apps");
    expect(
      hubLinks.getByRole("link", { name: /see how nuju works/i }),
    ).toHaveAttribute("href", "/install");

    fireEvent.click(hubLinks.getByRole("link", { name: /start the free reveal/i }));
    expect(analyticsEvents.trackRecommendationCtaClick).toHaveBeenCalledWith(
      "blog_hub",
      "Recommendation Hub",
      "blog_recommendation_hub_primary",
      "reveal",
    );
  }, 20000);

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

  it("sharpens metadata for the best ai journaling apps comparison page", () => {
    renderBlogPost("best-ai-journaling-apps");

    expect(screen.getByRole("heading", { name: /best ai journaling apps in 2026: 8 tested, 3 worth using/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /quick answer: which ai journaling app should you try first/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how we tested the 8 apps/i })).toBeInTheDocument();
    expect(seoHeadProps).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Best AI Journaling Apps in 2026: 8 Tested, 3 Worth Using",
        description:
          "We tested 8 AI journaling apps for privacy, mood tracking, free access, and emotional insight. See the 3 worth trying first.",
        canonical: "https://nuju.app/blog/best-ai-journaling-apps",
      }),
    );
  });

  it("adds targeted internal links to priority Search Console pages", () => {
    renderBlogPost("best-ai-journaling-apps");

    const cluster = screen.getByTestId("blog-internal-link-cluster");

    expect(cluster).toBeInTheDocument();
    expect(within(cluster).getByRole("link", { name: /best mood tracker apps in 2026/i })).toHaveAttribute(
      "href",
      "/blog/best-mood-tracker-apps",
    );
    expect(within(cluster).getByRole("link", { name: /best daylio alternatives/i })).toHaveAttribute(
      "href",
      "/blog/daylio-alternatives",
    );
    expect(within(cluster).getByRole("link", { name: /how to start a journaling habit/i })).toHaveAttribute(
      "href",
      "/blog/how-to-start-journaling",
    );
  });

  it("marks scheduled future blog posts as noindex instead of redirecting to the blog", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-24T08:00:00Z"));

    renderBlogPost("3am-anxiety-journaling");

    expect(
      screen.getByRole("heading", {
        name: /this article is scheduled for april 29, 2026/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /read published articles/i }),
    ).toHaveAttribute("href", "/blog");
    expect(seoHeadProps).toHaveBeenCalledWith(
      expect.objectContaining({
        canonical: "https://nuju.app/blog/3am-anxiety-journaling",
        noindex: true,
      }),
    );
  });
});

import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

const seoHeadProps = vi.fn();

vi.mock("@/components/SEOHead", () => ({
  default: (props: unknown) => {
    seoHeadProps(props);
    return null;
  },
}));

vi.mock("react-helmet-async", () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import MoodTracker from "@/pages/MoodTracker";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/mood-tracker"]}>
      <Routes>
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/onboarding" element={<div>Onboarding</div>} />
        <Route path="/install" element={<div>Install</div>} />
        <Route path="/ai-journal" element={<div>AI Journal</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("MoodTracker landing page", () => {
  it("renders the H1 targeting the mood tracker app keyword", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /the mood tracker app that explains what is moving you/i,
      }),
    ).toBeInTheDocument();
  });

  it("sets canonical SEO metadata for /mood-tracker", () => {
    renderPage();
    expect(seoHeadProps).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Mood Tracker App with AI Insights and 10-Second Check-Ins",
        canonical: "https://nuju.app/mood-tracker",
      }),
    );
  });

  it("links the hero CTA into the onboarding flow with a tracked source", () => {
    renderPage();
    const heroCtas = within(screen.getByTestId("mood-tracker-hero"));
    expect(
      heroCtas.getByRole("link", { name: /start the free ju gets you reveal/i }),
    ).toHaveAttribute("href", "/onboarding?source=mood_tracker_hero");
  });

  it("links to the mood-tracker comparison and Daylio-alternatives blog posts", () => {
    renderPage();
    expect(
      screen.getByRole("link", { name: /read the 8-app mood tracker roundup/i }),
    ).toHaveAttribute("href", "/blog/best-mood-tracker-apps");
    expect(
      screen.getByRole("link", { name: /the daylio alternatives guide/i }),
    ).toHaveAttribute("href", "/blog/daylio-alternatives");
  });

  it("renders the FAQ block backing the FAQPage schema", () => {
    renderPage();
    expect(screen.getByText(/what is a mood tracker app\?/i)).toBeInTheDocument();
    expect(screen.getByText(/how is nuju different from daylio\?/i)).toBeInTheDocument();
  });
});

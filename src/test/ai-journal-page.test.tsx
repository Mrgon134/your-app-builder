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

import AiJournal from "@/pages/AiJournal";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/ai-journal"]}>
      <Routes>
        <Route path="/ai-journal" element={<AiJournal />} />
        <Route path="/onboarding" element={<div>Onboarding</div>} />
        <Route path="/install" element={<div>Install</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("AiJournal landing page", () => {
  it("renders the H1 targeting the AI journaling app keyword", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /the ai journal app that reads what you actually wrote/i,
      }),
    ).toBeInTheDocument();
  });

  it("sets canonical SEO metadata for the /ai-journal product page", () => {
    renderPage();
    expect(seoHeadProps).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "AI Journal App for Mood Tracking, Memory, and Private Reflection",
        canonical: "https://nuju.app/ai-journal",
      }),
    );
  });

  it("links the primary hero CTA into the onboarding flow with a tracked source", () => {
    renderPage();
    const heroCtas = within(screen.getByTestId("ai-journal-hero"));
    expect(
      heroCtas.getByRole("link", { name: /start the free ju gets you reveal/i }),
    ).toHaveAttribute("href", "/onboarding?source=ai_journal_hero");
  });

  it("links to the comparison blog pages so blog and product pages reinforce each other", () => {
    renderPage();
    expect(
      screen.getByRole("link", { name: /read the 8-app ai journaling roundup/i }),
    ).toHaveAttribute("href", "/blog/best-ai-journaling-apps");
    expect(
      screen.getByRole("link", { name: /the mood tracker comparison/i }),
    ).toHaveAttribute("href", "/blog/best-mood-tracker-apps");
  });

  it("renders the FAQ block so the FAQPage schema has visible content to back it up", () => {
    renderPage();
    expect(screen.getByText(/what is an ai journaling app\?/i)).toBeInTheDocument();
    expect(screen.getByText(/is nuju free\?/i)).toBeInTheDocument();
    expect(screen.getByText(/does nuju replace therapy\?/i)).toBeInTheDocument();
  });
});

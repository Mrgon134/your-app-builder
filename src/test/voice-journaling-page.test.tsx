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

import VoiceJournaling from "@/pages/VoiceJournaling";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/voice-journaling"]}>
      <Routes>
        <Route path="/voice-journaling" element={<VoiceJournaling />} />
        <Route path="/onboarding" element={<div>Onboarding</div>} />
        <Route path="/install" element={<div>Install</div>} />
        <Route path="/ai-journal" element={<div>AI Journal</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("VoiceJournaling landing page", () => {
  it("renders the H1 targeting the voice journaling keyword", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /journal by talking when typing feels heavy/i,
      }),
    ).toBeInTheDocument();
  });

  it("sets canonical SEO metadata for /voice-journaling", () => {
    renderPage();
    expect(seoHeadProps).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Voice Journaling App with AI Transcription and Reflection",
        canonical: "https://nuju.app/voice-journaling",
      }),
    );
  });

  it("links the hero CTA into the onboarding flow with a tracked source", () => {
    renderPage();
    const heroCtas = within(screen.getByTestId("voice-journaling-hero"));
    expect(
      heroCtas.getByRole("link", { name: /start the free ju gets you reveal/i }),
    ).toHaveAttribute("href", "/onboarding?source=voice_journaling_hero");
  });

  it("renders FAQ entries backing the FAQPage schema", () => {
    renderPage();
    expect(screen.getByText(/what is voice journaling\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/where is my voice data stored\?/i),
    ).toBeInTheDocument();
  });
});

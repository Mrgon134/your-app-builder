import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import AdSenseBanner from "@/components/AdSenseBanner";

describe("AdSenseBanner Component", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // @ts-expect-error - reset adsbygoogle
    delete window.adsbygoogle;
  });

  it("renders an advertisement container with Google AdSense ins tag", () => {
    const { getByTestId } = render(<AdSenseBanner format="auto" />);
    const container = getByTestId("adsense-banner-container");
    expect(container).toBeInTheDocument();

    const ins = container.querySelector("ins.adsbygoogle");
    expect(ins).toBeInTheDocument();
    expect(ins).toHaveAttribute("data-ad-client", "ca-pub-2385213858617155");
    expect(ins).toHaveAttribute("data-ad-format", "auto");
    expect(ins).toHaveAttribute("data-full-width-responsive", "true");
  });

  it("passes numeric ad slot to data-ad-slot correctly", () => {
    const { getByTestId } = render(<AdSenseBanner slot="1234567890" />);
    const container = getByTestId("adsense-banner-container");
    const ins = container.querySelector("ins.adsbygoogle");
    expect(ins).toHaveAttribute("data-ad-slot", "1234567890");
  });

  it("safely sanitizes non-numeric slot strings to avoid Google AdSense slot errors", () => {
    const { getByTestId } = render(<AdSenseBanner slot="quiz-result-mid" />);
    const container = getByTestId("adsense-banner-container");
    const ins = container.querySelector("ins.adsbygoogle");
    expect(ins).not.toHaveAttribute("data-ad-slot");
  });
});

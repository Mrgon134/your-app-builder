import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const analyticsEvents = {
  trackRecommendationHubView: vi.fn(),
  trackRecommendationPageView: vi.fn(),
  trackRecommendationCtaClick: vi.fn(),
  trackCtaClick: vi.fn(),
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

import BlogPost, { renderFormattedInline } from "@/pages/BlogPost";
import { getBlogQuizOrTool } from "@/data/blog-quiz-tool-mapping";

const renderBlogPost = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/quiz/:slug" element={<div>Quiz Target</div>} />
        <Route path="/tes-:slug" element={<div>Tes Target</div>} />
        <Route path="/tools/:slug" element={<div>Tool Target</div>} />
      </Routes>
    </MemoryRouter>,
  );

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("renderFormattedInline markdown parser", () => {
  it("converts **bold text** to <strong> and leaves no asterisks", () => {
    const { container } = render(
      <div>{renderFormattedInline("Ini adalah **kata tebal** dan **istilah penting**.")}</div>,
    );

    const strongs = container.querySelectorAll("strong");
    expect(strongs.length).toBe(2);
    expect(strongs[0].textContent).toBe("kata tebal");
    expect(strongs[1].textContent).toBe("istilah penting");
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).toBe("Ini adalah kata tebal dan istilah penting.");
  });

  it("handles nested formatting like **Kebaikan (*Self-Kindness*):** correctly", () => {
    const { container } = render(
      <div>{renderFormattedInline("**Kebaikan (*Self-Kindness*):** Melatih respon ramah.")}</div>,
    );

    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    const em = strong?.querySelector("em");
    expect(em).not.toBeNull();
    expect(em?.textContent).toBe("Self-Kindness");
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).not.toContain("*Self-Kindness*");
  });

  it("converts markdown links to clickable elements", () => {
    const { container } = render(
      <MemoryRouter>
        <div>{renderFormattedInline("Pelajari di [artikel ini](/blog/mental-health) sekarang.")}</div>
      </MemoryRouter>,
    );

    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/blog/mental-health");
    expect(link?.textContent).toBe("artikel ini");
  });

  it("safely strips embedded script tags", () => {
    const { container } = render(
      <div>{renderFormattedInline('<script type="application/ld+json">{"@context":"test"}</script>')}</div>,
    );

    expect(container.textContent).toBe("");
  });
});

describe("getBlogQuizOrTool topic mapping", () => {
  it("maps Acrophobia posts to appropriate quiz targets in ID and EN", () => {
    const enPost = {
      slug: "acrophobia-fear-of-heights-cohen-aq-vertigo",
      title: "Acrophobia (Fear of Heights): Causes, Cohen AQ Screener & Vertigo",
      category: "Phobias",
      sections: [],
    };
    const idPost = {
      slug: "akrofobia-takut-ketinggian-vertigo-panik-cohen-aq",
      title: "Akrofobia (Takut Ketinggian): Penyebab, Skrining Cohen AQ, dan Bedanya dengan Vertigo",
      category: "Fobia",
      sections: [],
    };

    const enTarget = getBlogQuizOrTool(enPost, "en");
    expect(enTarget).not.toBeNull();
    expect(enTarget?.href).toBe("/quiz/acrophobia");
    expect(enTarget?.type).toBe("quiz");

    const idTarget = getBlogQuizOrTool(idPost, "id");
    expect(idTarget).not.toBeNull();
    expect(idTarget?.href).toBe("/tes-akrofobia");
    expect(idTarget?.buttonText).toMatch(/Mulai Tes/i);
  });

  it("maps Glossophobia and Claustrophobia to respective screeners", () => {
    const glosso = {
      slug: "glossophobia-public-speaking-anxiety-prca-24-guide",
      title: "Glossophobia: Overcoming Fear of Public Speaking",
      category: "Anxiety",
      sections: [],
    };
    const target = getBlogQuizOrTool(glosso, "en");
    expect(target).not.toBeNull();
    expect(target?.href).toBe("/quiz/glossophobia");
  });

  it("maps Toxic Positivity and Dopamine Detox posts", () => {
    const toxic = {
      slug: "mengubah-toxic-positivity-jadi-validasi-emosi-prompt-refleksi",
      title: "Mengubah Toxic Positivity Menjadi Validasi Emosi Sehat",
      category: "Mindset",
      sections: [],
    };
    const target = getBlogQuizOrTool(toxic, "id");
    expect(target).not.toBeNull();
    expect(target?.href).toBe("/quiz/toxic-positivity");

    const dopamine = {
      slug: "reset-dopamin-48-jam-protokol-detoks-digital-fokus",
      title: "Reset Dopamin 48 Jam: Protokol Detoks Digital",
      category: "Productivity",
      sections: [],
    };
    const dopamineTarget = getBlogQuizOrTool(dopamine, "id");
    expect(dopamineTarget).not.toBeNull();
    expect(dopamineTarget?.href).toBe("/quiz/dopamine-detox");
  });
});

describe("BlogPost UI rendering with Quiz/Tool CTA and bold text", () => {
  it("renders the interactive CTA card pointing to the relevant quiz on Indonesian Acrophobia post", () => {
    renderBlogPost("akrofobia-takut-ketinggian-vertigo-panik-cohen-aq");

    const ctaCard = screen.getByTestId("blog-quiz-tool-cta");
    expect(ctaCard).toBeInTheDocument();

    const ctaLink = screen.getByTestId("blog-quiz-tool-cta-link");
    expect(ctaLink).toHaveAttribute("href", "/tes-akrofobia");

    // Verify bold formatting in post content
    const boldElements = document.querySelectorAll(".prose-nuju strong");
    expect(boldElements.length).toBeGreaterThan(0);

    // Verify post body does not have raw unparsed ** asterisks
    const prose = document.querySelector(".prose-nuju");
    expect(prose?.textContent).not.toContain("**");
  });

  it("tracks CTA click events when user clicks the Quiz/Tool CTA button", () => {
    renderBlogPost("acrophobia-fear-of-heights-cohen-aq-vertigo");

    const ctaCard = screen.getByTestId("blog-quiz-tool-cta");
    expect(ctaCard).toBeInTheDocument();

    const ctaLink = screen.getByTestId("blog-quiz-tool-cta-link");
    expect(ctaLink).toHaveAttribute("href", "/quiz/acrophobia");

    fireEvent.click(ctaLink);
    expect(analyticsEvents.trackRecommendationCtaClick).toHaveBeenCalledWith(
      "acrophobia-fear-of-heights-cohen-aq-vertigo",
      expect.any(String),
      "blog_article_primary_quiz_cta",
      "quiz",
    );
  });
});

describe("Advanced markdown bolding edge cases", () => {
  it("renders ***Why* did I feel like that? ...** as bold with italic inside and NO raw asterisks", () => {
    const { container } = render(
      <div>{renderFormattedInline("***Why* did I feel like that? ...**")}</div>,
    );

    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    const em = strong?.querySelector("em");
    expect(em).not.toBeNull();
    expect(em?.textContent).toBe("Why");
    expect(container.textContent).toBe("Why did I feel like that? ...");
    expect(container.textContent).not.toContain("*");
  });

  it("handles parenthetical italic inside bold **arousal kognitif pra-tidur (*pre-sleep cognitive arousal*)**", () => {
    const { container } = render(
      <div>
        {renderFormattedInline(
          "Kondisi ini dalam psikologi dikenal sebagai **arousal kognitif pra-tidur (*pre-sleep cognitive arousal*)**.",
        )}
      </div>,
    );

    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    const em = strong?.querySelector("em");
    expect(em).not.toBeNull();
    expect(em?.textContent).toBe("pre-sleep cognitive arousal");
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).not.toContain("(*");
  });

  it("leaves fill-in-the-blank underscores ___ intact without converting to em/strong", () => {
    const { container } = render(
      <div>
        {renderFormattedInline(
          "Today I felt ___ because ___ and my mood was ___.",
        )}
      </div>,
    );

    expect(container.querySelectorAll("strong").length).toBe(0);
    expect(container.querySelectorAll("em").length).toBe(0);
    expect(container.textContent).toBe(
      "Today I felt ___ because ___ and my mood was ___.",
    );
  });

  it("renders __underscore bold__ correctly", () => {
    const { container } = render(
      <div>{renderFormattedInline("Teks ini __sangat penting__ untuk dipahami.")}</div>,
    );

    const strong = container.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong?.textContent).toBe("sangat penting");
    expect(container.textContent).not.toContain("__");
  });
});

describe("Multilingual CTA resolution across all 8 languages", () => {
  const overthinkingPost = {
    slug: "cara-mengatasi-overthinking-malam-hari-guided-journaling",
    title: "Cara Mengatasi Overthinking Malam Hari Lewat Journaling",
    category: "Overthinking",
    sections: [],
  };

  it("resolves Indonesian CTA with native copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "id");
    expect(target.quizTitle).toMatch(/Ruminasi|Overthinking/i);
    expect(target.primaryButtonLabel).toMatch(/Mulai Tes/i);
    expect(target.quizBadge).toMatch(/Detik|Gratis/i);
  });

  it("resolves German CTA with native German copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "de");
    expect(target.quizTitle).toMatch(/Grübel|Overthinking|Test/i);
    expect(target.primaryButtonLabel).toMatch(/starten/i);
    expect(target.quizBadge).toMatch(/Sekunden|Kostenlos/i);
  });

  it("resolves French CTA with native French copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "fr");
    expect(target.quizTitle).toMatch(/Rumination|Overthinking|Test/i);
    expect(target.primaryButtonLabel).toMatch(/test/i);
    expect(target.quizBadge).toMatch(/Secondes|Gratuit/i);
  });

  it("resolves Spanish CTA with native Spanish copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "es");
    expect(target.quizTitle).toMatch(/Rumiación|Sobrepensamiento|Test/i);
    expect(target.primaryButtonLabel).toMatch(/test/i);
    expect(target.quizBadge).toMatch(/Segundos|Gratis/i);
  });

  it("resolves Japanese CTA with native Japanese copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "ja");
    expect(target.quizTitle).toMatch(/反芻思考|診断/);
    expect(target.primaryButtonLabel).toMatch(/スタート/);
    expect(target.quizBadge).toMatch(/無料/);
  });

  it("resolves Korean CTA with native Korean copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "ko");
    expect(target.quizTitle).toMatch(/반추|오버씽킹|진단/);
    expect(target.primaryButtonLabel).toMatch(/시작하기/);
    expect(target.quizBadge).toMatch(/무료/);
  });

  it("resolves Chinese CTA with native Chinese copy", () => {
    const target = getBlogQuizOrTool(overthinkingPost, "zh");
    expect(target.quizTitle).toMatch(/思维反刍|内耗|自评/);
    expect(target.primaryButtonLabel).toMatch(/测评/);
    expect(target.quizBadge).toMatch(/免费/);
  });
});


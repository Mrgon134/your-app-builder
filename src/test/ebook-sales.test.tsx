import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/SEOHead", () => ({
  default: () => null,
}));

vi.mock("@/components/AdSenseBanner", () => ({
  default: () => <div data-testid="adsense-banner" />,
}));

vi.mock("@/components/AppStoreCta", () => ({
  default: () => <div data-testid="appstore-cta">Download App</div>,
}));

import EbookSalesPage from "@/pages/EbookSalesPage";
import EbookReaderPage from "@/pages/EbookReaderPage";
import { EBOOK_METADATA, EBOOK_CHAPTERS, EBOOK_DAILY_PROMPTS } from "@/data/ebook-content";

describe("Ebook Data Integrity", () => {
  it("has metadata with title, author, and discount voucher", () => {
    expect(EBOOK_METADATA.title).toBe("Berdamai dengan Pikiran Sendiri");
    expect(EBOOK_METADATA.discountVoucherCode).toBe("BERDAMAI2026");
    expect(EBOOK_METADATA.authors.length).toBeGreaterThan(0);
  });

  it("has 6 core chapters with takeaways and exercises", () => {
    expect(EBOOK_CHAPTERS.length).toBeGreaterThanOrEqual(6);
    EBOOK_CHAPTERS.forEach((ch) => {
      expect(ch.title).toBeTruthy();
      expect(ch.keyTakeaways.length).toBeGreaterThan(0);
      expect(ch.content.length).toBeGreaterThan(0);
    });
  });

  it("has complete 30 days of CBT and Stoic journaling prompts", () => {
    expect(EBOOK_DAILY_PROMPTS.length).toBe(30);
    expect(EBOOK_DAILY_PROMPTS[0].day).toBe(1);
    expect(EBOOK_DAILY_PROMPTS[29].day).toBe(30);
  });
});

describe("EbookSalesPage Component", () => {
  const renderSalesPage = () =>
    render(
      <MemoryRouter initialEntries={["/ebook"]}>
        <Routes>
          <Route path="/ebook" element={<EbookSalesPage />} />
          <Route path="/ebook/read" element={<EbookReaderPage />} />
        </Routes>
      </MemoryRouter>
    );

  it("renders the main heading and book tagline", () => {
    renderSalesPage();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Berdamai dengan Pikiran Sendiri/i,
      })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/30 hari terapi overthinking/i).length).toBeGreaterThan(0);
  });

  it("renders chapter titles in the preview list", () => {
    renderSalesPage();
    expect(
      screen.getByText(/Mengapa Otak Kita Selalu Membayangkan Skenario Terburuk/i)
    ).toBeInTheDocument();
  });

  it("renders pricing options for Basic and Bundle", () => {
    renderSalesPage();
    expect(screen.getByText(/Pilih Paket Standar/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilih Paket Bundling VIP/i)).toBeInTheDocument();
  });

  it("opens checkout modal with coupon field when purchase CTA is clicked", () => {
    renderSalesPage();
    const cta = screen.getByText(/Pilih Paket Standar/i);
    fireEvent.click(cta);

    expect(screen.getByText(/Checkout eBook Nuju/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contoh: Irfan Pratama/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nama@email.com/i)).toBeInTheDocument();
  });
});

describe("EbookReaderPage Component", () => {
  const renderReaderPage = () =>
    render(
      <MemoryRouter initialEntries={["/ebook/read"]}>
        <Routes>
          <Route path="/ebook/read" element={<EbookReaderPage />} />
          <Route path="/ebook" element={<EbookSalesPage />} />
        </Routes>
      </MemoryRouter>
    );

  it("renders the reader navigation and first chapter", () => {
    renderReaderPage();
    const chapterMatches = screen.getAllByText(/Mengapa Otak Kita Selalu Membayangkan Skenario Terburuk/i);
    expect(chapterMatches.length).toBeGreaterThan(0);
    expect(screen.getByText(/Daftar Bab/i)).toBeInTheDocument();
    expect(screen.getByText(/30 Hari Prompt Refleksi Ju/i)).toBeInTheDocument();
  });

  it("switches to the 30-Day Prompt Journal tab and shows day 1 prompt", () => {
    renderReaderPage();
    const promptsTab = screen.getByText(/30 Hari Prompt Refleksi Ju/i);
    fireEvent.click(promptsTab);

    expect(screen.getAllByText(/Hari ke-1/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Membongkar Beban Tersembunyi/i)).toBeInTheDocument();
    expect(screen.getByText(/Salin Prompt Hari ke-1/i)).toBeInTheDocument();
  });
});

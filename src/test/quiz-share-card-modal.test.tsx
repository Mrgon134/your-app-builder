import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuizShareCardModal from "@/components/QuizShareCardModal";
import { getQuizBySlug } from "@/data/quizzes";

// Mock generateQuizResultCard
vi.mock("@/lib/generate-quiz-card", () => ({
  generateQuizResultCard: vi.fn().mockResolvedValue({
    dataUrl: "data:image/png;base64,samplecardimage",
    blob: new Blob(["dummy"], { type: "image/png" }),
    file: new File(["dummy"], "nuju-test.png", { type: "image/png" }),
  }),
}));

describe("QuizShareCardModal Component", () => {
  it("renders the modal when isOpen is true with action buttons", async () => {
    const quiz = getQuizBySlug("baterai-emosi");
    expect(quiz).toBeDefined();
    if (!quiz) return;

    const result = quiz.results[0];

    render(
      <QuizShareCardModal
        isOpen={true}
        onClose={vi.fn()}
        quiz={quiz}
        result={result}
      />
    );

    expect(await screen.findByText("Simpan Kartu Hasil Tes")).toBeInTheDocument();
    expect(screen.getByText("Share ke Story / WA")).toBeInTheDocument();
    expect(screen.getByText("Download Gambar (PNG)")).toBeInTheDocument();
    expect(screen.getByText("Salin Teks & Link Hasil Tes")).toBeInTheDocument();
  });
});

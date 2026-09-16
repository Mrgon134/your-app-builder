import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import QuizLeadCapture from "@/components/QuizLeadCapture";
import { getQuizBySlug } from "@/data/quizzes";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  },
}));

describe("QuizLeadCapture Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders lead capture form with email input and submit button", () => {
    const quiz = getQuizBySlug("baterai-emosi");
    expect(quiz).toBeDefined();
    if (!quiz) return;
    const result = quiz.results[0];

    render(<QuizLeadCapture quiz={quiz} result={result} />);

    expect(screen.getByTestId("quiz-lead-capture")).toBeInTheDocument();
    expect(
      screen.getByText("Save Your Results & Get a 7-Day Recovery Guide")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email address...")).toBeInTheDocument();
    expect(screen.getByText("Send My Results")).toBeInTheDocument();
  });

  it("submits valid email and renders celebration confirmation state", async () => {
    const quiz = getQuizBySlug("baterai-emosi");
    expect(quiz).toBeDefined();
    if (!quiz) return;
    const result = quiz.results[0];

    render(<QuizLeadCapture quiz={quiz} result={result} />);

    const input = screen.getByPlaceholderText("Enter your email address...");
    const submitBtn = screen.getByText("Send My Results");

    fireEvent.change(input, { target: { value: "sahabat@nuju.app" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId("quiz-lead-success")).toBeInTheDocument();
      expect(screen.getByText("Your Diagnostic Results Have Been Sent!")).toBeInTheDocument();
    });

    const stored = JSON.parse(localStorage.getItem("nuju-quiz-leads") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].email).toBe("sahabat@nuju.app");
    expect(stored[0].quizSlug).toBe("baterai-emosi");
  });
});

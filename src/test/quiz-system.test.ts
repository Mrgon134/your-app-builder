import { describe, it, expect } from "vitest";
import { getAllQuizzes, getQuizBySlug } from "@/data/quizzes";

describe("Nuju Interactive Quiz System", () => {
  it("should have all 4 core psychological quizzes defined", () => {
    const quizzes = getAllQuizzes();
    expect(quizzes.length).toBeGreaterThanOrEqual(4);

    const slugs = quizzes.map((q) => q.slug);
    expect(slugs).toContain("baterai-emosi");
    expect(slugs).toContain("tipe-overthinking");
    expect(slugs).toContain("burnout-screener");
    expect(slugs).toContain("gaya-regulasi-emosi");
  });

  it("should ensure each quiz has valid questions and options", () => {
    const quizzes = getAllQuizzes();

    for (const quiz of quizzes) {
      expect(quiz.title).toBeTruthy();
      expect(quiz.description).toBeTruthy();
      expect(quiz.questions.length).toBeGreaterThanOrEqual(4);
      expect(quiz.results.length).toBeGreaterThanOrEqual(3);
      expect(quiz.faqs.length).toBeGreaterThanOrEqual(2);

      for (const question of quiz.questions) {
        expect(question.prompt).toBeTruthy();
        expect(question.options.length).toBeGreaterThanOrEqual(3);
        for (const opt of question.options) {
          expect(opt.label).toBeTruthy();
          if (quiz.type === "numeric_score") {
            expect(opt.score).toBeDefined();
          } else {
            expect(opt.archetypeId).toBeDefined();
          }
        }
      }
    }
  });

  it("should retrieve a quiz by slug or id correctly", () => {
    const batteryQuiz = getQuizBySlug("baterai-emosi");
    expect(batteryQuiz).toBeDefined();
    expect(batteryQuiz?.shortTitle).toBe("Tes Baterai Emosi");

    const overthinkingQuiz = getQuizBySlug("tipe-overthinking");
    expect(overthinkingQuiz).toBeDefined();
    expect(overthinkingQuiz?.type).toBe("archetype");
  });
});

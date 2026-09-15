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

  it("should have all 10 international and local quizzes defined", () => {
    const quizzes = getAllQuizzes();
    expect(quizzes.length).toBe(10);

    const slugs = quizzes.map((q) => q.slug);
    // Local Indonesian
    expect(slugs).toContain("baterai-emosi");
    expect(slugs).toContain("tipe-overthinking");
    expect(slugs).toContain("burnout-screener");
    expect(slugs).toContain("gaya-regulasi-emosi");

    // International Tier-1
    expect(slugs).toContain("high-functioning-anxiety-us");
    expect(slugs).toContain("feierabend-burnout-de");
    expect(slugs).toContain("winter-blues-nordic-no");
    expect(slugs).toContain("dutch-niksen-burnout-nl");
    expect(slugs).toContain("honne-tatemae-jp");
    expect(slugs).toContain("nunchi-hwabyung-kr");
  });

  it("should ensure international quizzes have proper language and country mappings", () => {
    const germanQuiz = getQuizBySlug("feierabend-burnout-de");
    expect(germanQuiz?.targetCountry).toBe("DE");
    expect(germanQuiz?.language).toBe("de");

    const norwayQuiz = getQuizBySlug("winter-blues-nordic-no");
    expect(norwayQuiz?.targetCountry).toBe("NO");

    const dutchQuiz = getQuizBySlug("dutch-niksen-burnout-nl");
    expect(dutchQuiz?.targetCountry).toBe("NL");

    const usQuiz = getQuizBySlug("high-functioning-anxiety-us");
    expect(usQuiz?.targetCountry).toBe("US");

    const jpQuiz = getQuizBySlug("honne-tatemae-jp");
    expect(jpQuiz?.targetCountry).toBe("JP");
    expect(jpQuiz?.language).toBe("ja");

    const krQuiz = getQuizBySlug("nunchi-hwabyung-kr");
    expect(krQuiz?.targetCountry).toBe("KR");
    expect(krQuiz?.language).toBe("ko");
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

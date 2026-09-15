import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateQuizResultCard } from "@/lib/generate-quiz-card";
import { getQuizBySlug } from "@/data/quizzes";

describe("Quiz Result Card Generator", () => {
  beforeEach(() => {
    // Provide a lightweight mock for canvas 2d context in jsdom
    const mockCtx = {
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1,
      font: "",
      textAlign: "",
      textBaseline: "",
      shadowColor: "",
      shadowBlur: 0,
      shadowOffsetY: 0,
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      clip: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      fillText: vi.fn(),
      drawImage: vi.fn(),
      quadraticCurveTo: vi.fn(),
      roundRect: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 100 }),
      createRadialGradient: vi.fn().mockReturnValue({
        addColorStop: vi.fn(),
      }),
    };

    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((type) => {
      if (type === "2d") return mockCtx;
      return null;
    });

    HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue("data:image/png;base64,fakeimagedata");
    HTMLCanvasElement.prototype.toBlob = vi.fn().mockImplementation((cb) => {
      cb(new Blob(["fakedata"], { type: "image/png" }));
    });

    // Mock Image in jsdom so it fires onload synchronously
    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      private _src = "";
      set src(value: string) {
        this._src = value;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 1);
      }
      get src() {
        return this._src;
      }
      complete = true;
      naturalWidth = 200;
    }
    // @ts-expect-error - mock Image
    global.Image = MockImage;
  });

  it("should generate dataUrl, blob, and file for an Indonesian quiz result", async () => {
    const quiz = getQuizBySlug("baterai-emosi");
    expect(quiz).toBeDefined();
    if (!quiz) return;

    const result = quiz.results[0];
    const generated = await generateQuizResultCard(quiz, result);

    expect(generated).toBeDefined();
    expect(generated.dataUrl).toContain("data:image/png");
    expect(generated.blob).toBeInstanceOf(Blob);
    expect(generated.file).toBeInstanceOf(File);
    expect(generated.file.name).toContain("nuju-baterai-emosi");
  });

  it("should generate dataUrl and file for an international quiz result (e.g. Germany/Japan)", async () => {
    const quiz = getQuizBySlug("honne-tatemae-jp");
    expect(quiz).toBeDefined();
    if (!quiz) return;

    const result = quiz.results[0];
    const generated = await generateQuizResultCard(quiz, result);

    expect(generated).toBeDefined();
    expect(generated.dataUrl).toContain("data:image/png");
    expect(generated.file.name).toContain("nuju-honne-tatemae-jp");
  });
});

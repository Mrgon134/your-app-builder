import { describe, expect, it } from "vitest";
import { getMoodHighlight } from "@/lib/mood-highlights";
import type { EntryRow } from "@/lib/api";

const t = {
  mood_best: "Best day",
  mood_steady_day: "Steady day",
  mood_tough_day: "Tough day",
};

const makeEntry = (mood: number): EntryRow => ({
  id: `entry-${mood}-${Math.random()}`,
  mood,
  text: "",
  energy: null,
  prompt_text: null,
  entry_date: "2026-04-09",
  created_at: "2026-04-09T00:00:00.000Z",
  ai_summary: null,
  audio_url: null,
  transcript_segments: null,
  photo_url: null,
  location_lat: null,
  location_lng: null,
  location_name: null,
  capture_type: "journal",
});

describe("getMoodHighlight", () => {
  it("keeps Best day for genuinely positive moods", () => {
    const result = getMoodHighlight([makeEntry(5), makeEntry(4), makeEntry(4)], t);

    expect(result.label).toBe("Best day");
    expect(result.mood).toBe(5);
    expect(result.tone).toBe("positive");
  });

  it("switches to Steady day for middling moods", () => {
    const result = getMoodHighlight([makeEntry(3), makeEntry(3), makeEntry(2)], t);

    expect(result.label).toBe("Steady day");
    expect(result.mood).toBe(3);
    expect(result.tone).toBe("neutral");
  });

  it("switches away from Best day when moods are low", () => {
    const result = getMoodHighlight([makeEntry(2), makeEntry(1), makeEntry(1), makeEntry(1)], t);

    expect(result.label).toBe("Tough day");
    expect(result.mood).toBeLessThanOrEqual(2);
    expect(result.tone).toBe("negative");
  });
});

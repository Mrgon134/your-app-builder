import stickerHi from "@/assets/sticker-hi.webp";
import stickerZen from "@/assets/sticker-zen.webp";
import stickerDiary from "@/assets/sticker-diary.webp";
import stickerLove from "@/assets/sticker-love.webp";
import stickerZzz from "@/assets/sticker-zzz.webp";
import stickerYay from "@/assets/sticker-yay.webp";
import stickerHmm from "@/assets/sticker-hmm.webp";
import stickerGoodJob from "@/assets/sticker-goodjob.webp";

export const JU_STICKERS = {
  hi: stickerHi,
  zen: stickerZen,
  diary: stickerDiary,
  love: stickerLove,
  zzz: stickerZzz,
  yay: stickerYay,
  hmm: stickerHmm,
  goodjob: stickerGoodJob,
} as const;

export type StickerKey = keyof typeof JU_STICKERS;

/**
 * Sticker → App State mapping:
 * hi       → HomeScreen first open / welcome back
 * zen      → Mood 3 (Okay) selected
 * diary    → JournalScreen header while writing
 * love     → Mood 4-5 (Good/Great) selected
 * zzz      → Night time (after 9pm) HomeScreen
 * yay      → After saving entry
 * hmm      → Coach typing indicator
 * goodjob  → Entry saved confirmation
 */
export const getMascotForState = (opts: {
  selectedMood?: number | null;
  isNight?: boolean;
  screen?: string;
}): StickerKey => {
  const { selectedMood, isNight, screen } = opts;

  if (screen === "journal-writing") return "diary";
  if (screen === "journal-saved") return "yay";
  if (screen === "coach-typing") return "hmm";
  if (screen === "entry-confirmed") return "goodjob";

  if (selectedMood === 1) return "hmm";
  if (selectedMood === 2) return "zzz";
  if (selectedMood === 3) return "zen";
  if (selectedMood === 4) return "love";
  if (selectedMood === 5) return "yay";

  if (isNight) return "zzz";

  return "hi";
};

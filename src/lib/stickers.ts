import stickerHi from "@/assets/sticker-hi.png";
import stickerZen from "@/assets/sticker-zen.png";
import stickerDiary from "@/assets/sticker-diary.png";
import stickerLove from "@/assets/sticker-love.png";
import stickerZzz from "@/assets/sticker-zzz.png";
import stickerYay from "@/assets/sticker-yay.png";
import stickerHmm from "@/assets/sticker-hmm.png";
import stickerGoodJob from "@/assets/sticker-goodjob.png";

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

  if (selectedMood === 3) return "zen";
  if (selectedMood && selectedMood >= 4) return "love";

  if (isNight) return "zzz";

  return "hi";
};

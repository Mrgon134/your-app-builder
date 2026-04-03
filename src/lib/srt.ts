export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

/** Format seconds to SRT timestamp: HH:MM:SS,mmm */
function formatSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

/** Generate SRT subtitle content from segments */
export function generateSRT(segments: TranscriptSegment[]): string {
  return segments
    .map((seg, i) => `${i + 1}\n${formatSrtTime(seg.start)} --> ${formatSrtTime(seg.end)}\n${seg.text}\n`)
    .join("\n");
}

/** Trigger browser download of SRT file */
export function downloadSRT(segments: TranscriptSegment[], filename = "journal"): void {
  const srt = generateSRT(segments);
  const blob = new Blob([srt], { type: "text/srt;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.srt`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Download audio file from URL */
export async function downloadAudio(audioUrl: string, filename = "journal"): Promise<void> {
  try {
    const resp = await fetch(audioUrl);
    const blob = await resp.blob();
    const ext = blob.type.includes("webm") ? "webm" : blob.type.includes("ogg") ? "ogg" : blob.type.includes("mp4") ? "m4a" : "webm";
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Audio download failed:", err);
  }
}

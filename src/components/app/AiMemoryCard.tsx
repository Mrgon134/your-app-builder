import React, { useEffect, useMemo, useState } from "react";
import { Brain } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { fetchAiMemoryLines, type EntryRow } from "@/lib/api";
import { JU_STICKERS } from "@/lib/stickers";

interface AiMemoryCardProps {
  entries: EntryRow[];
  hasProAccess: boolean;
  userName?: string | null;
}

type PatternKey =
  | "trending_up"
  | "trending_down"
  | "low_patch"
  | "consistent"
  | "avg_good"
  | "writes_on_low";

const PATTERNS: Record<PatternKey, Record<string, string>> = {
  trending_up: {
    en: "Your mood has been moving upward lately. Something is helping - keep noticing what that is.",
    id: "Mood kamu lagi bergerak naik belakangan ini. Berarti ada sesuatu yang membantu - coba perhatikan apa itu.",
  },
  trending_down: {
    en: "Your mood has dipped lately, but you still showed up here. That matters a lot.",
    id: "Mood kamu lagi turun belakangan ini, tapi kamu tetap hadir di sini. Itu penting banget.",
  },
  low_patch: {
    en: "Things have felt especially heavy lately - thank you for staying honest with yourself.",
    id: "Akhir-akhir ini rasanya lagi berat banget - makasih ya karena kamu tetap jujur sama dirimu.",
  },
  consistent: {
    en: "You have been showing up consistently. That habit is already a quiet kind of progress.",
    id: "Kamu lagi konsisten hadir buat diri sendiri. Kebiasaan itu sendiri sudah bentuk progress.",
  },
  avg_good: {
    en: "Your average mood has been fairly positive. You may be doing better than it feels in the moment.",
    id: "Rata-rata mood kamu cukup positif. Mungkin kamu lagi lebih baik dari yang terasa saat ini.",
  },
  writes_on_low: {
    en: "You tend to write more when things feel low. That looks like a healthy outlet, not a failure.",
    id: "Kamu cenderung lebih banyak nulis saat lagi rendah. Itu kelihatan seperti outlet yang sehat, bukan kegagalan.",
  },
};

const PATTERN_STICKERS: Record<PatternKey, keyof typeof JU_STICKERS> = {
  trending_up: "yay",
  trending_down: "zzz",
  low_patch: "hmm",
  consistent: "goodjob",
  avg_good: "love",
  writes_on_low: "zen",
};

const getPatternCopy = (key: PatternKey, lang: string) => PATTERNS[key][lang] || PATTERNS[key].en;

const derivePatternKeys = (entries: EntryRow[]): PatternKey[] => {
  if (entries.length < 3) return [];

  const result: PatternKey[] = [];
  const moods = entries.map((entry) => entry.mood);
  const avgMood = moods.reduce((sum, mood) => sum + mood, 0) / moods.length;
  const lowEntries = entries.filter((entry) => entry.mood <= 2);
  const highEntries = entries.filter((entry) => entry.mood >= 4);
  const lowShare = lowEntries.length / entries.length;
  const highShare = highEntries.length / entries.length;

  const half = Math.max(1, Math.floor(moods.length / 2));
  const recentSlice = moods.slice(0, half);
  const olderSlice = moods.slice(-half);
  const recentAvg = recentSlice.reduce((sum, mood) => sum + mood, 0) / recentSlice.length;
  const olderAvg = olderSlice.reduce((sum, mood) => sum + mood, 0) / olderSlice.length;

  if (avgMood <= 2.2 || lowShare >= 0.6) {
    result.push("low_patch");
  } else if (recentAvg - olderAvg >= 0.75 && recentAvg >= 3.2) {
    result.push("trending_up");
  } else if (olderAvg - recentAvg >= 0.6) {
    result.push("trending_down");
  } else if (avgMood >= 3.7 || highShare >= 0.5) {
    result.push("avg_good");
  }

  if (entries.length >= 7) {
    result.push("consistent");
  }

  if (entries.length >= 5 && lowEntries.length >= 2) {
    const avgLowLen = lowEntries.reduce((sum, entry) => sum + entry.text.length, 0) / lowEntries.length;
    const avgHighLen = highEntries.length
      ? highEntries.reduce((sum, entry) => sum + entry.text.length, 0) / highEntries.length
      : 0;

    if (avgLowLen > Math.max(avgHighLen, 40) * 1.2) {
      result.push("writes_on_low");
    }
  }

  return result.slice(0, 3);
};

const AiMemoryCard: React.FC<AiMemoryCardProps> = ({ entries, hasProAccess, userName = null }) => {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [aiMemories, setAiMemories] = useState<string[] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const patternKeys = useMemo(() => derivePatternKeys(entries), [entries]);
  const fallbackMemories = useMemo(
    () => patternKeys.map((key) => getPatternCopy(key, lang)),
    [lang, patternKeys]
  );
  const memoryCacheKey = useMemo(() => {
    const latestIds = entries.slice(0, 6).map((entry) => entry.id).join(".");
    return `nuju-ai-memory-card:${lang}:${userName || "anon"}:${entries.length}:${latestIds}`;
  }, [entries, lang, userName]);
  const memories = aiMemories?.length ? aiMemories : fallbackMemories;
  const primarySticker = patternKeys.length > 0
    ? JU_STICKERS[PATTERN_STICKERS[patternKeys[0]]]
    : JU_STICKERS.goodjob;

  useEffect(() => {
    if (!hasProAccess || entries.length < 3) {
      setAiMemories(null);
      return;
    }

    let cancelled = false;
    try {
      const cached = sessionStorage.getItem(memoryCacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAiMemories(parsed);
          return;
        }
      }
    } catch {
      // Cache is optional; the local rule-based copy remains the fallback.
    }

    fetchAiMemoryLines({ entries, lang, userName })
      .then((lines) => {
        if (cancelled || lines.length === 0) return;
        setAiMemories(lines);
        try {
          sessionStorage.setItem(memoryCacheKey, JSON.stringify(lines));
        } catch {
          // Ignore cache write failures.
        }
      })
      .catch((error) => {
        console.warn("AI memory card fallback used:", error);
        if (!cancelled) setAiMemories(null);
      });

    return () => {
      cancelled = true;
    };
  }, [entries, hasProAccess, lang, memoryCacheKey, userName]);

  if (!hasProAccess || entries.length < 3 || memories.length === 0 || !visible) return null;

  return (
    <div
      className="bg-card rounded-3xl p-5 mb-4 shadow-sm border border-border/50 transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <img src={primarySticker} alt="Ju remembers" className="w-8 h-8" />
        <div className="flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-primary" />
          <p className="text-xs font-medium text-primary uppercase tracking-wider">
            {t.ju_remembers || "Ju remembers"}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mb-2">
        {(t.ju_memory_desc || "Based on your past {n} entries, Ju noticed:").replace("{n}", String(entries.length))}
      </p>

      <ul className="space-y-1.5">
        {memories.map((memory, index) => (
          <li key={index} className="font-writing text-sm italic text-foreground leading-relaxed">
            - {memory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AiMemoryCard;

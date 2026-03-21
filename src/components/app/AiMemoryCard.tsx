import React, { useState, useEffect, useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { Brain } from "lucide-react";

interface AiMemoryCardProps {
  entries: Array<{ mood: number; date: string; text: string }>;
}

const MEMORY_PATTERNS = {
  en: [
    "You tend to feel more positive on weekdays when you journal in the morning.",
    "I noticed you mention work stress often. Want to explore that with me?",
    "Your mood has been trending upward this week — keep it up!",
    "You write more on days when you feel low. That's actually a healthy pattern.",
    "The word 'grateful' appears in 3 of your recent entries. That's powerful.",
  ],
  id: [
    "Kamu cenderung lebih positif di hari kerja saat menulis pagi hari.",
    "Aku notice kamu sering sebut soal stres kerja. Mau eksplorasi bareng?",
    "Mood kamu trending naik minggu ini — terus ya!",
    "Kamu lebih banyak nulis saat merasa sedih. Itu pola yang sehat lho.",
    "Kata 'bersyukur' muncul di 3 entri terakhir kamu. Itu keren.",
  ],
};

const AiMemoryCard: React.FC<AiMemoryCardProps> = ({ entries }) => {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const memories = useMemo(() => {
    if (entries.length < 3) return null;
    const patterns = MEMORY_PATTERNS[lang as keyof typeof MEMORY_PATTERNS] || MEMORY_PATTERNS.en;
    // 3+ entries: 1 pattern. 7+: 3 patterns per spec
    const count = entries.length >= 7 ? 3 : 1;
    const startIdx = entries.length % patterns.length;
    return Array.from({ length: count }, (_, i) => patterns[(startIdx + i) % patterns.length]);
  }, [entries.length, lang]);

  if (!memories || !visible) return null;

  return (
    <div
      className="bg-card rounded-3xl p-5 mb-4 shadow-sm border border-border/50 transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <img
          src={JU_STICKERS.goodjob}
          alt="Ju remembers"
          className="w-8 h-8"
        />
        <div className="flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-primary" />
          <p className="text-xs font-medium text-primary uppercase tracking-wider">
            {(t.ju_remembers || "Ju remembers")}
          </p>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">
        {(t.ju_memory_desc || "Based on your past {n} entries, Ju noticed:").replace("{n}", String(entries.length))}
      </p>
      <ul className="space-y-1.5">
        {memories.map((m, i) => (
          <li key={i} className="font-writing text-sm italic text-foreground leading-relaxed">
            • {m}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AiMemoryCard;

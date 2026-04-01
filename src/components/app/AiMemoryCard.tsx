import React, { useState, useEffect, useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { Brain } from "lucide-react";
import { EntryRow } from "@/lib/api";

interface AiMemoryCardProps {
  entries: EntryRow[];
  hasProAccess: boolean;
}

// Translated pattern templates — each key maps to a language map
const PATTERNS: Record<string, Record<string, string>> = {
  trending_up: {
    en: "Your mood has been trending upward recently — great momentum!",
    id: "Mood kamu lagi naik belakangan ini — terus pertahankan!",
    es: "Tu ánimo ha estado mejorando recientemente — ¡gran impulso!",
    fr: "Ton humeur est en hausse récemment — bel élan !",
    de: "Deine Stimmung verbessert sich in letzter Zeit — toller Schwung!",
    ja: "最近、気分が上向いています — その勢いを続けて！",
    ko: "최근 기분이 좋아지고 있어요 — 좋은 흐름이에요!",
    zh: "最近你的心情一直在好转 — 保持下去！",
    hi: "हाल ही में आपका मूड बेहतर हो रहा है — बढ़िया!",
    ar: "مزاجك في تحسن مؤخراً — استمر في هذا الزخم!",
    ms: "Mood anda semakin baik kebelakangan ini — teruskan!",
    th: "อารมณ์ของคุณกำลังดีขึ้นเร็วๆ นี้ — ยอดเยี่ยม!",
    vi: "Cảm xúc của bạn đang cải thiện gần đây — tiếp tục nhé!",
    fil: "Papataas ang mood mo kamakailan — napakagandang momentum!",
  },
  trending_down: {
    en: "Your mood has dipped a bit lately — but you're still here, and that matters.",
    id: "Mood kamu sempat turun, tapi kamu tetap nulis — itu sudah luar biasa.",
    es: "Tu ánimo ha bajado un poco — pero sigues aquí, y eso importa.",
    fr: "Ton humeur a un peu baissé — mais tu es toujours là, et c'est important.",
    de: "Deine Stimmung ist etwas gesunken — aber du bist noch hier, und das zählt.",
    ja: "最近少し気分が落ちていますが、それでも書き続けているあなたは素晴らしい。",
    ko: "기분이 조금 내려갔지만 — 그래도 여기 있다는 게 중요해요.",
    zh: "最近心情有些低落 — 但你还在这里，这很重要。",
    hi: "हाल में मूड थोड़ा गिरा, लेकिन आप यहाँ हैं — यह बड़ी बात है।",
    ar: "تراجع مزاجك قليلاً مؤخراً — لكنك لا تزال هنا، وهذا يهم.",
    ms: "Mood anda sedikit menurun — tapi anda masih di sini, dan itu penting.",
    th: "อารมณ์ลดลงเล็กน้อย — แต่คุณยังอยู่ที่นี่ และนั่นสำคัญมาก",
    vi: "Cảm xúc có hơi xuống gần đây — nhưng bạn vẫn ở đây, điều đó quan trọng.",
    fil: "Bumaba ng kaunti ang mood mo — pero nandito ka pa rin, at iyon ang mahalaga.",
  },
  consistent: {
    en: "You've been showing up consistently — journaling regularly is one of the best things you can do.",
    id: "Kamu rutin nulis belakangan ini — itu salah satu kebiasaan terbaik.",
    es: "Has sido consistente — escribir regularmente es una de las mejores cosas que puedes hacer.",
    fr: "Tu es régulier(ère) — écrire régulièrement est l'une des meilleures choses pour toi.",
    de: "Du bist konsequent dabei — regelmäßiges Schreiben ist eine der besten Gewohnheiten.",
    ja: "継続して書いていますね — 定期的な日記は最高の習慣の一つです。",
    ko: "꾸준히 쓰고 있네요 — 정기적으로 일기 쓰는 건 최고의 습관 중 하나예요.",
    zh: "你一直在坚持写 — 定期写日记是你能做的最好的事情之一。",
    hi: "आप लगातार लिख रहे हैं — नियमित journaling सबसे अच्छी आदतों में से एक है।",
    ar: "أنت ملتزم بالكتابة — الكتابة المنتظمة من أفضل العادات.",
    ms: "Anda konsisten dalam menulis — menulis secara berkala adalah antara kebiasaan terbaik.",
    th: "คุณเขียนสม่ำเสมอ — การเขียนบันทึกเป็นประจำเป็นหนึ่งในสิ่งที่ดีที่สุดที่คุณทำได้",
    vi: "Bạn đã kiên trì viết — viết nhật ký đều đặn là một trong những thói quen tốt nhất.",
    fil: "Palagi kang lumalabas at nagsusulat — isa ito sa mga pinakamahusay na gawi.",
  },
  avg_good: {
    en: "Your average mood this week has been positive — you're doing better than you might think.",
    id: "Rata-rata mood kamu minggu ini positif — kamu lebih baik dari yang kamu kira.",
    es: "Tu estado de ánimo promedio ha sido positivo — estás mejor de lo que crees.",
    fr: "Ton humeur moyenne a été positive — tu vas mieux que tu ne le penses.",
    de: "Deine durchschnittliche Stimmung war positiv — es geht dir besser, als du denkst.",
    ja: "今週の平均気分はポジティブです — 思っているより調子がいいですよ。",
    ko: "이번 주 평균 기분이 긍정적이에요 — 생각보다 훨씬 잘하고 있어요.",
    zh: "本周你的平均心情是积极的 — 你比你想象的要好。",
    hi: "इस हफ्ते आपका औसत मूड सकारात्मक रहा — आप सोचते हैं उससे बेहतर कर रहे हैं।",
    ar: "كان متوسط مزاجك إيجابياً هذا الأسبوع — أنت أفضل مما تظن.",
    ms: "Purata mood anda minggu ini adalah positif — anda lebih baik daripada yang anda fikir.",
    th: "อารมณ์เฉลี่ยของคุณสัปดาห์นี้เป็นบวก — คุณทำได้ดีกว่าที่คิด",
    vi: "Tâm trạng trung bình của bạn tuần này tích cực — bạn đang làm tốt hơn bạn nghĩ.",
    fil: "Positibo ang average mood mo ngayong linggo — mas maganda ka kaysa sa iniisip mo.",
  },
  writes_on_low: {
    en: "You tend to write more when you're feeling low. That's actually a healthy outlet.",
    id: "Kamu lebih banyak nulis saat merasa sedih. Itu cara yang sehat banget.",
    es: "Tiendes a escribir más cuando te sientes bajo. Es una salida muy saludable.",
    fr: "Tu as tendance à écrire plus quand tu te sens bas. C'est un exutoire sain.",
    de: "Du schreibst mehr, wenn du dich schlecht fühlst. Das ist ein gesundes Ventil.",
    ja: "気分が落ちている日ほど書いていますね。それは健全な発散方法です。",
    ko: "기분이 안 좋을 때 더 많이 쓰는 경향이 있어요. 그건 정말 건강한 방법이에요.",
    zh: "你在情绪低落时写得更多。这其实是很健康的发泄方式。",
    hi: "आप कम मूड पर ज़्यादा लिखते हैं। यह एक स्वस्थ आउटलेट है।",
    ar: "تميل إلى الكتابة أكثر عندما تشعر بالانخفاض. هذا منفذ صحي.",
    ms: "Anda cenderung menulis lebih banyak apabila berasa rendah. Itu cara yang sihat.",
    th: "คุณมีแนวโน้มเขียนมากขึ้นเมื่อรู้สึกไม่ดี นั่นเป็นทางออกที่ดีต่อสุขภาพ",
    vi: "Bạn có xu hướng viết nhiều hơn khi cảm thấy không tốt. Đó là cách giải tỏa lành mạnh.",
    fil: "May tendensya kang magsulat nang mas marami kapag mababa ang mood. Malusog na paraan iyon.",
  },
};

function derivePatterns(entries: EntryRow[], lang: string): string[] {
  const get = (key: string) => PATTERNS[key][lang] || PATTERNS[key].en;
  const result: string[] = [];

  if (entries.length < 3) return result;

  const moods = entries.map((e) => e.mood);
  const avgMood = moods.reduce((a, b) => a + b, 0) / moods.length;

  // Pattern 1: mood trend
  // entries are sorted newest-first, so firstHalf = recent, secondHalf = older
  const half = Math.floor(moods.length / 2);
  const recentAvg = moods.slice(0, half).reduce((a, b) => a + b, 0) / half;
  const olderAvg = moods.slice(-half).reduce((a, b) => a + b, 0) / half;
  if (recentAvg - olderAvg >= 0.5) result.push(get("trending_up"));
  else if (olderAvg - recentAvg >= 0.5) result.push(get("trending_down"));
  else if (avgMood >= 3.5) result.push(get("avg_good"));

  // Pattern 2: consistency (≥5 entries = consistent)
  if (entries.length >= 7) result.push(get("consistent"));

  // Pattern 3: writes more on low mood days
  if (entries.length >= 5) {
    const lowEntries = entries.filter((e) => e.mood <= 2);
    const highEntries = entries.filter((e) => e.mood >= 4);
    if (lowEntries.length >= 2) {
      const avgLowLen = lowEntries.reduce((a, e) => a + e.text.length, 0) / lowEntries.length;
      const avgHighLen = highEntries.length
        ? highEntries.reduce((a, e) => a + e.text.length, 0) / highEntries.length
        : 0;
      if (avgLowLen > avgHighLen * 1.3) result.push(get("writes_on_low"));
    }
  }

  // Return max 3 patterns
  return result.slice(0, 3);
}

const AiMemoryCard: React.FC<AiMemoryCardProps> = ({ entries, hasProAccess }) => {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const memories = useMemo(() => derivePatterns(entries, lang), [entries, lang]);

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
        <img src={JU_STICKERS.goodjob} alt="Ju remembers" className="w-8 h-8" />
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

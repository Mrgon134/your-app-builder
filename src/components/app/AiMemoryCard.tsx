import React, { useState, useEffect, useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { Brain } from "lucide-react";

interface AiMemoryCardProps {
  entries: Array<{ mood: number; date: string; text: string }>;
}

const MEMORY_PATTERNS: Record<string, string[]> = {
  en: [
    "You tend to feel more positive when you journal regularly.",
    "Your mood has been trending upward recently — keep going!",
    "You write more on days when you feel low. That's a healthy outlet.",
    "Showing up to journal even on hard days says a lot about your resilience.",
    "Your mood tends to dip mid-week. You're not alone in that.",
  ],
  id: [
    "Kamu cenderung lebih positif saat rutin menulis jurnal.",
    "Mood kamu lagi trending naik — terus ya!",
    "Kamu lebih banyak nulis saat merasa sedih. Itu outlet yang sehat.",
    "Tetap nulis walau hari berat itu tanda kamu tangguh.",
    "Mood kamu sering turun di tengah minggu. Itu normal banget.",
  ],
  es: [
    "Tiendes a sentirte más positivo cuando escribes con regularidad.",
    "Tu ánimo ha estado mejorando recientemente — ¡sigue así!",
    "Escribes más en los días que te sientes bajo. Es una salida saludable.",
    "Seguir escribiendo incluso en días difíciles muestra tu resiliencia.",
    "Tu ánimo tiende a bajar a mitad de semana. No estás solo en eso.",
  ],
  fr: [
    "Tu as tendance à te sentir mieux quand tu écris régulièrement.",
    "Ton humeur est en hausse ces derniers temps — continue !",
    "Tu écris davantage les jours où tu te sens bas. C'est un exutoire sain.",
    "Continuer à écrire même les jours difficiles montre ta résilience.",
    "Ton humeur tend à baisser en milieu de semaine. Tu n'es pas seul(e).",
  ],
  de: [
    "Du neigst dazu, dich besser zu fühlen, wenn du regelmäßig schreibst.",
    "Deine Stimmung verbessert sich in letzter Zeit — weiter so!",
    "Du schreibst mehr an schlechten Tagen. Das ist ein gesundes Ventil.",
    "Auch an schwierigen Tagen zu schreiben zeigt deine Widerstandskraft.",
    "Deine Stimmung neigt dazu, Mitte der Woche zu sinken. Das ist normal.",
  ],
  ja: [
    "定期的に書くと気分が良くなる傾向があります。",
    "最近、気分が上向いています — その調子で！",
    "気分が落ち込む日ほど書いていますね。それは健全な発散方法です。",
    "辛い日でも書き続けることが、あなたの強さを表しています。",
    "週の半ばに気分が落ちる傾向があります。それは珍しいことではありません。",
  ],
  ms: [
    "Anda cenderung berasa lebih positif apabila menulis dengan kerap.",
    "Mood anda sedang meningkat kebelakangan ini — teruskan!",
    "Anda lebih banyak menulis pada hari yang terasa rendah. Itu pelepasan yang sihat.",
    "Terus menulis walaupun pada hari yang sukar menunjukkan ketahanan anda.",
    "Mood anda cenderung turun di pertengahan minggu. Itu perkara biasa.",
  ],
  th: [
    "คุณมีแนวโน้มรู้สึกดีขึ้นเมื่อเขียนอย่างสม่ำเสมอ",
    "อารมณ์ของคุณกำลังดีขึ้นเร็วๆ นี้ — ทำต่อไปเลย!",
    "คุณเขียนมากขึ้นในวันที่รู้สึกไม่ดี นั่นเป็นทางออกที่ดีต่อสุขภาพ",
    "การเขียนต่อแม้ในวันที่ยากแสดงถึงความยืดหยุ่นของคุณ",
    "อารมณ์คุณมักลดลงกลางสัปดาห์ คุณไม่ได้อยู่คนเดียวในเรื่องนี้",
  ],
  vi: [
    "Bạn có xu hướng cảm thấy tích cực hơn khi viết nhật ký đều đặn.",
    "Cảm xúc của bạn đang cải thiện gần đây — tiếp tục nhé!",
    "Bạn viết nhiều hơn vào những ngày không tốt. Đó là cách giải tỏa lành mạnh.",
    "Vẫn viết kể cả những ngày khó nói lên sức mạnh của bạn.",
    "Cảm xúc bạn có xu hướng giảm vào giữa tuần. Bạn không một mình đâu.",
  ],
  fil: [
    "May tendensya kang mas maging positibo kapag regular kang nagsusulat.",
    "Papataas ang mood mo kamakailan — ituloy mo!",
    "Mas marami kang sinusulat sa mga araw na hindi ka maganda ang pakiramdam. Malusog na outlet iyon.",
    "Ang patuloy na pagsusulat kahit sa mahirap na araw ay nagpapakita ng iyong lakas.",
    "Ang mood mo ay may tendensyang bumaba sa kalagitnaan ng linggo. Hindi ka nag-iisa.",
  ],
  ar: [
    "تميل إلى الشعور بتحسن عند الكتابة بانتظام.",
    "مزاجك في تحسن مؤخراً — استمر!",
    "تكتب أكثر في الأيام الصعبة. هذا منفذ صحي.",
    "الاستمرار في الكتابة حتى في الأيام الصعبة يعكس قدرتك على الصمود.",
    "مزاجك يميل إلى الانخفاض في منتصف الأسبوع. أنت لست وحدك.",
  ],
  hi: [
    "नियमित रूप से लिखने पर आप अधिक सकारात्मक महसूस करते हैं।",
    "हाल ही में आपका मूड बेहतर हो रहा है — जारी रखें!",
    "मुश्किल दिनों में आप ज़्यादा लिखते हैं। यह एक स्वस्थ आउटलेट है।",
    "कठिन दिनों में भी लिखते रहना आपकी मज़बूती को दर्शाता है।",
    "सप्ताह के मध्य में आपका मूड थोड़ा गिरता है। आप अकेले नहीं हैं।",
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

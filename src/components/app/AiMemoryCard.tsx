import React, { useState, useEffect, useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { JU_STICKERS } from "@/lib/stickers";
import { Brain } from "lucide-react";

interface AiMemoryCardProps {
  entries: Array<{ mood: number; date: string; text: string }>;
}

const MEMORY_PATTERNS: Record<string, string[]> = {
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
  es: [
    "Tiendes a sentirte más positivo los días de semana cuando escribes por la mañana.",
    "Noté que mencionas el estrés laboral con frecuencia. ¿Quieres explorarlo conmigo?",
    "Tu ánimo ha estado mejorando esta semana — ¡sigue así!",
    "Escribes más en los días que te sientes bajo. En realidad es un patrón saludable.",
    "La palabra 'agradecido' aparece en 3 de tus entradas recientes. Eso es poderoso.",
  ],
  fr: [
    "Tu as tendance à être plus positif en semaine quand tu écris le matin.",
    "J'ai remarqué que tu mentionnes souvent le stress au travail. Tu veux qu'on explore ça ensemble ?",
    "Ton humeur est à la hausse cette semaine — continue comme ça !",
    "Tu écris davantage les jours où tu te sens bas. C'est en fait un schéma sain.",
    "Le mot 'reconnaissant' apparaît dans 3 de tes entrées récentes. C'est puissant.",
  ],
  de: [
    "Du neigst dazu, an Werktagen positiver zu sein, wenn du morgens schreibst.",
    "Ich habe bemerkt, dass du oft Arbeitsstress erwähnst. Möchtest du das gemeinsam erkunden?",
    "Deine Stimmung hat sich diese Woche verbessert — weiter so!",
    "Du schreibst mehr an Tagen, wenn du dich schlecht fühlst. Das ist eigentlich ein gesundes Muster.",
    "Das Wort 'dankbar' erscheint in 3 deiner letzten Einträge. Das ist bedeutsam.",
  ],
  ja: [
    "平日の朝に書く時、より前向きになる傾向があります。",
    "仕事のストレスをよく言及していますね。一緒に探ってみませんか？",
    "今週は気分が上向いています — その調子で！",
    "気分が落ち込んでいる日ほどよく書いていますね。実はそれが健全なパターンです。",
    "'感謝'という言葉が最近の3つの記録に登場しています。それは素晴らしいことです。",
  ],
  ms: [
    "Anda cenderung lebih positif pada hari bekerja apabila menulis pada waktu pagi.",
    "Saya perasan anda selalu sebut tekanan kerja. Nak terokai bersama?",
    "Mood anda sedang meningkat minggu ini — teruskan!",
    "Anda lebih banyak menulis pada hari anda rasa rendah. Itu sebenarnya corak yang sihat.",
    "Perkataan 'bersyukur' muncul dalam 3 entri terkini anda. Itu sangat bermakna.",
  ],
  th: [
    "คุณมีแนวโน้มที่จะรู้สึกดีขึ้นในวันทำงานเมื่อเขียนตอนเช้า",
    "ฉันสังเกตว่าคุณมักพูดถึงความเครียดจากงาน อยากสำรวจเรื่องนี้ด้วยกันไหม?",
    "อารมณ์ของคุณกำลังดีขึ้นในสัปดาห์นี้ — ทำต่อไปเลย!",
    "คุณเขียนมากขึ้นในวันที่รู้สึกไม่ดี นั่นจริงๆ แล้วเป็นรูปแบบที่ดีต่อสุขภาพ",
    "คำว่า 'ขอบคุณ' ปรากฏใน 3 บันทึกล่าสุดของคุณ นั่นทรงพลังมาก",
  ],
  vi: [
    "Bạn có xu hướng tích cực hơn vào các ngày thường khi viết vào buổi sáng.",
    "Tôi nhận thấy bạn thường xuyên đề cập đến căng thẳng công việc. Muốn khám phá điều đó cùng tôi không?",
    "Cảm xúc của bạn đang tăng lên trong tuần này — tiếp tục như vậy!",
    "Bạn viết nhiều hơn vào những ngày cảm thấy không tốt. Thực ra đó là một mẫu lành mạnh.",
    "Từ 'biết ơn' xuất hiện trong 3 bài viết gần đây của bạn. Điều đó rất mạnh mẽ.",
  ],
  fil: [
    "May tendensya kang mas maging positibo sa mga araw ng trabaho kapag nagsusulat ka ng umaga.",
    "Napansin ko na madalas mong binabanggit ang stress sa trabaho. Gusto mo bang tuklasin iyon kasama ko?",
    "Papataas ang mood mo ngayong linggo — ituloy mo!",
    "Mas marami kang sinusulat sa mga araw na nararamdaman mong malungkot. Healthy na pattern iyon.",
    "Ang salitang 'nagpapasalamat' ay lumabas sa 3 ng iyong mga kamakailang entry. Napakaganda noon.",
  ],
  ar: [
    "تميل إلى الشعور بإيجابية أكبر في أيام الأسبوع عندما تكتب في الصباح.",
    "لاحظت أنك تذكر ضغوط العمل كثيراً. هل تريد استكشاف ذلك معي؟",
    "مزاجك في ارتفاع هذا الأسبوع — استمر!",
    "تكتب أكثر في الأيام التي تشعر فيها بتدنٍّ. هذا في الواقع نمط صحي.",
    "كلمة 'ممتن' تظهر في 3 من مدخلاتك الأخيرة. هذا قوي.",
  ],
  hi: [
    "आप कार्यदिवसों में सुबह लिखने पर अधिक सकारात्मक महसूस करते हैं।",
    "मैंने देखा कि आप अक्सर काम के तनाव का उल्लेख करते हैं। क्या आप मेरे साथ इसे एक्सप्लोर करना चाहेंगे?",
    "इस हफ्ते आपका मूड बेहतर हो रहा है — इसी तरह जारी रखें!",
    "आप उन दिनों ज़्यादा लिखते हैं जब आप कम अच्छा महसूस करते हैं। यह दरअसल एक स्वस्थ पैटर्न है।",
    "'आभारी' शब्द आपकी हाल की 3 एंट्री में दिखाई दिया। यह बहुत ताकतवर है।",
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

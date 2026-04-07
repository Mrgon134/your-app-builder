import React, { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { MOODS, getGreeting, getLocalizedRandomPrompt } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import { JU_STICKERS, getMascotForState } from "@/lib/stickers";
import { hasProAccess } from "@/lib/trial";
import SignupPrompt from "@/components/app/SignupPrompt";
import AiMemoryCard from "@/components/app/AiMemoryCard";
import TimeCapsuleCard from "@/components/app/TimeCapsuleCard";
import {
  Settings, Flame, PenLine, Mic, RefreshCw,
  BedDouble, BatteryLow, Zap, Sparkles, Check,
  Dumbbell, Moon, Utensils, Briefcase, Users, Gamepad2,
  Wind,
} from "lucide-react";
import HabitSection from "@/components/app/HabitSection";
import EntryDetailModal from "@/components/app/EntryDetailModal";
import { EntryRow } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

import DailyRitualCard from "@/components/app/DailyRitualCard";
import WeeklyReviewCard from "@/components/app/WeeklyReviewCard";

// Preload all sticker images in memory on mount
const preloadedImages: HTMLImageElement[] = [];
const preloadStickers = () => {
  if (preloadedImages.length > 0) return;
  Object.values(JU_STICKERS).forEach((src) => {
    const img = new Image();
    img.src = src;
    preloadedImages.push(img);
  });
};
preloadStickers();

// 5-segment energy levels (lucide icons only, no emoji)
const ENERGY_LEVELS = [
  { value: 20, icon: BedDouble,  label: "Drained", color: "#9B93C0" },
  { value: 40, icon: BatteryLow, label: "Low",     color: "#7C6EDB" },
  { value: 60, icon: Zap,        label: "Okay",    color: "#7C6EDB" },
  { value: 80, icon: Sparkles,   label: "Good",    color: "#7C6EDB" },
  { value: 100, icon: Flame,     label: "Full",    color: "#FFB347" },
] as const;

// Activity tags (lucide icons, no emoji)
const ACTIVITY_TAGS = [
  { id: "move",   icon: Dumbbell,  label: "Move"   },
  { id: "sleep",  icon: Moon,      label: "Sleep"  },
  { id: "food",   icon: Utensils,  label: "Food"   },
  { id: "work",   icon: Briefcase, label: "Work"   },
  { id: "social", icon: Users,     label: "Social" },
  { id: "fun",    icon: Gamepad2,  label: "Fun"    },
] as const;

// Mood-reactive speech bubble messages — multilingual
const JU_BUBBLES: Record<string, Record<string, string>> = {
  en: { "1": "I'm right here with you. No pressure.", "2": "Let's take this one step at a time", "3": "A steady day has its own beauty", "4": "You're doing well today", "5": "What a wonderful feeling", default: "How are you today?" },
  id: { "1": "Aku di sini bersamamu. Nggak ada tekanan.", "2": "Pelan-pelan aja, satu langkah sekaligus", "3": "Hari yang biasa pun ada indahnya", "4": "Kamu baik-baik aja hari ini", "5": "Perasaan yang luar biasa!", default: "Gimana kabar hari ini?" },
  ms: { "1": "Aku di sini bersamamu. Tiada tekanan.", "2": "Kita buat satu langkah dulu", "3": "Hari biasa pun ada keindahannya", "4": "Kamu baik-baik hari ini", "5": "Perasaan yang luar biasa!", default: "Apa khabar hari ini?" },
  es: { "1": "Estoy aquí contigo. Sin presión.", "2": "Vamos paso a paso", "3": "Un día tranquilo tiene su propia belleza", "4": "Lo estás haciendo bien hoy", "5": "¡Qué sensación tan maravillosa!", default: "¿Cómo estás hoy?" },
  fr: { "1": "Je suis là avec toi. Sans pression.", "2": "On y va étape par étape", "3": "Une journée calme a sa propre beauté", "4": "Tu t'en sors bien aujourd'hui", "5": "Quelle merveilleuse sensation !", default: "Comment tu vas aujourd'hui ?" },
  de: { "1": "Ich bin hier bei dir. Kein Druck.", "2": "Schritt für Schritt", "3": "Ein ruhiger Tag hat seine eigene Schönheit", "4": "Du machst das heute gut", "5": "Was für ein wunderbares Gefühl!", default: "Wie geht es dir heute?" },
  ja: { "1": "ここにいるよ。プレッシャーなしでいい。", "2": "一歩ずつ進もう", "3": "穏やかな日にも美しさがある", "4": "今日はよくやってるよ", "5": "素晴らしい気分だね！", default: "今日の調子はどう？" },
  ko: { "1": "여기 있을게, 부담 갖지 마.", "2": "한 걸음씩 같이 가자", "3": "평범한 하루도 나름의 아름다움이 있어", "4": "오늘 잘 하고 있어", "5": "정말 멋진 기분이네!", default: "오늘 어때?" },
  zh: { "1": "我在这里陪你，不用有压力。", "2": "我们一步一步来", "3": "平静的一天也有它的美", "4": "你今天做得很好", "5": "真是美妙的感觉！", default: "今天感觉怎么样？" },
  hi: { "1": "मैं यहाँ हूँ तुम्हारे साथ। कोई दबाव नहीं।", "2": "एक-एक कदम चलते हैं", "3": "शांत दिन की भी अपनी सुंदरता है", "4": "आज तुम अच्छा कर रहे हो", "5": "कितना शानदार एहसास है!", default: "आज कैसा महसूस हो रहा है?" },
  ar: { "1": "أنا هنا معك. لا ضغط.", "2": "لنأخذها خطوة بخطوة", "3": "ليوم الهادئ جماله الخاص", "4": "أنت تتعامل معها بشكل جيد اليوم", "5": "يا له من شعور رائع!", default: "كيف حالك اليوم؟" },
  th: { "1": "ฉันอยู่ตรงนี้กับคุณ ไม่ต้องกดดัน", "2": "ทีละก้าวนะ", "3": "วันธรรมดาก็มีความงามในแบบของมัน", "4": "คุณทำได้ดีวันนี้", "5": "ความรู้สึกที่วิเศษมาก!", default: "วันนี้เป็นยังไงบ้าง?" },
  vi: { "1": "Tôi ở đây bên bạn. Không áp lực gì cả.", "2": "Hãy từng bước một nhé", "3": "Ngày bình thường cũng có vẻ đẹp riêng", "4": "Hôm nay bạn làm tốt lắm", "5": "Cảm giác tuyệt vời quá!", default: "Hôm nay bạn thế nào?" },
  fil: { "1": "Nandito ako para sa iyo. Walang pressure.", "2": "Isa-isang hakbang lang", "3": "May sariling ganda ang tahimik na araw", "4": "Magaling ka ngayon", "5": "Napakagandang pakiramdam!", default: "Kumusta ka ngayon?" },
};

// Activity tag labels — multilingual
const ACTIVITY_LABELS: Record<string, Record<string, string>> = {
  en: { move: "Move", sleep: "Sleep", food: "Food", work: "Work", social: "Social", fun: "Fun" },
  id: { move: "Gerak", sleep: "Tidur", food: "Makan", work: "Kerja", social: "Sosial", fun: "Hiburan" },
  ms: { move: "Gerak", sleep: "Tidur", food: "Makan", work: "Kerja", social: "Sosial", fun: "Seronok" },
  es: { move: "Mover", sleep: "Dormir", food: "Comer", work: "Trabajo", social: "Social", fun: "Diversión" },
  fr: { move: "Bouger", sleep: "Dormir", food: "Manger", work: "Travail", social: "Social", fun: "Amusement" },
  de: { move: "Bewegen", sleep: "Schlafen", food: "Essen", work: "Arbeit", social: "Sozial", fun: "Spaß" },
  ja: { move: "運動", sleep: "睡眠", food: "食事", work: "仕事", social: "交流", fun: "楽しみ" },
  ko: { move: "운동", sleep: "수면", food: "식사", work: "일", social: "교류", fun: "즐거움" },
  zh: { move: "运动", sleep: "睡眠", food: "饮食", work: "工作", social: "社交", fun: "娱乐" },
  hi: { move: "व्यायाम", sleep: "नींद", food: "खाना", work: "काम", social: "मेलजोल", fun: "मौज" },
  ar: { move: "تحرك", sleep: "نوم", food: "طعام", work: "عمل", social: "تواصل", fun: "ترفيه" },
  th: { move: "ออกกำลัง", sleep: "นอน", food: "อาหาร", work: "งาน", social: "สังคม", fun: "ความสนุก" },
  vi: { move: "Vận động", sleep: "Ngủ", food: "Ăn uống", work: "Công việc", social: "Giao lưu", fun: "Vui chơi" },
  fil: { move: "Kilos", sleep: "Tulog", food: "Pagkain", work: "Trabaho", social: "Sosyal", fun: "Kasiyahan" },
};

// Energy level labels — multilingual [drained, low, okay, good, full]
const ENERGY_LABEL_KEYS = ["drained", "low", "okay", "good", "energized"] as const;

// Streak milestone copy
const getStreakMessage = (streak: number, t: Record<string, string>): string | null => {
  if (streak >= 3) return (t.streak_milestone || "🔥 {n} days!").replace("{n}", String(streak));
  return null;
};

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onWrite?: () => void;
  onTalk?: () => void;
  onSettings: () => void;
  onUpgrade: () => void;
  onQuickLog?: () => void;
  streak: number;
  entries: EntryRow[];
  selectedMood?: number;
  onMoodSelect?: (mood: number) => void;
  energy?: number;
  onEnergyChange?: (val: number) => void;
  selectedActivities?: string[];
  onActivitiesChange?: (activities: string[]) => void;
  plan?: string | null;
  trialStartedAt?: string | null;
  hasBanner?: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate, onWrite, onTalk, onSettings, onUpgrade, onQuickLog,
  streak, entries,
  selectedMood: controlledMood, onMoodSelect: controlledMoodSelect,
  energy: controlledEnergy, onEnergyChange: controlledEnergyChange,
  selectedActivities: controlledActivities, onActivitiesChange,
  plan, trialStartedAt, hasBanner,
}) => {
  const { t, lang } = useLang();
  const [localMood, setLocalMood] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("");
  const [localEnergy, setLocalEnergy] = useState(60);
  const [moodAnimating, setMoodAnimating] = useState<number | null>(null);
  const [localActivities, setLocalActivities] = useState<string[]>([]);
  const [moodTouched, setMoodTouched] = useState(false);
  const selectedActivities = controlledActivities ?? localActivities;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const selectedMood = controlledMood ?? localMood;
  const energy = controlledEnergy ?? localEnergy;
  const selectedMoodData = MOODS.find((m) => m.value === selectedMood);
  const [selectedEntry, setSelectedEntry] = useState<EntryRow | null>(null);

  // PWA Install Prompt State
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Set localized prompt on mount / language change
  useEffect(() => {
    setPrompt(getLocalizedRandomPrompt(t));
  }, [lang]);

  const greeting = getGreeting(t);
  const isNight = new Date().getHours() >= 21;
  const stickerKey = getMascotForState({ selectedMood, isNight });
  const juImg = JU_STICKERS[stickerKey];

  // Today's date string — locale-aware
  const LANG_LOCALE: Record<string, string> = {
    en: "en-US", id: "id-ID", ms: "ms-MY", es: "es-ES", fr: "fr-FR",
    de: "de-DE", ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", hi: "hi-IN",
    ar: "ar-SA", th: "th-TH", vi: "vi-VN", fil: "fil-PH",
  };
  const today = new Date();
  const locale = LANG_LOCALE[lang] || "en-US";
  const dateStr = today.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });

  // Dynamic Contextual Greeting (First Impression Hook)
  let displayTitle = greeting;
  let displaySubtitle = dateStr;

  if (entries.length === 0) {
    displayTitle = "Hey, I'm Ju.";
    displaySubtitle = "I'll learn your patterns the more you share.";
  } else if (streak > 0 && streak % 30 === 0 && !selectedMood) {
    displayTitle = `${streak} days strong 🔥`;
    displaySubtitle = "You're rewriting your story.";
  } else if (streak > 0 && streak % 7 === 0 && !selectedMood) {
    displayTitle = `Day ${streak} — impressive`;
    displaySubtitle = "You're building something real.";
  } else if (entries.length > 0 && !selectedMood) {
    const daysSinceLastEntry = Math.floor((new Date().getTime() - new Date(entries[0].created_at).getTime()) / (1000 * 60 * 60 * 24));
    const lastMoodData = MOODS.find(m => m.value === entries[0].mood);

    if (daysSinceLastEntry >= 3 && daysSinceLastEntry < 7) {
      displayTitle = "We've missed you. 💙";
      displaySubtitle = `It's been ${daysSinceLastEntry} days. What's changed?`;
    } else if (daysSinceLastEntry >= 7) {
      displayTitle = "Welcome back.";
      displaySubtitle = "You last felt " + (lastMoodData?.label?.toLowerCase() || 'okay') + ". Let's check in.";
    } else {
      // Recent entry
      const avgMoodRecent = Math.round(entries.slice(0, Math.min(7, entries.length)).reduce((s, e) => s + e.mood, 0) / Math.min(7, entries.length));
      const lastMood = entries[0].mood;
      const isMoodImproving = lastMood > (entries[1]?.mood || 3);

      displayTitle = "Welcome back.";
      if (isMoodImproving && lastMood >= 4) {
        displaySubtitle = "Your mood's been trending up. Let's keep it going. ⬆️";
      } else if (lastMood <= 2 && entries.length >= 3) {
        displaySubtitle = "You've been through tough days. I'm here to listen.";
      } else {
        displaySubtitle = `Glad to see you. You felt ${lastMoodData?.label?.toLowerCase() || 'okay'} last time.`;
      }
    }
  }

  // Parallax scroll tracking and PWA Install Prompt
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const parent = scrollRef.current.closest('[class*="overflow"]') as HTMLElement | null;
        setScrollY(parent ? parent.scrollTop : window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // PWA Install Prompt Listener
    const handleInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      if (!localStorage.getItem("nuju-dismiss-install")) setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);

    // iOS PWA Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = ("standalone" in window.navigator) && (window.navigator as any).standalone;
    if (isIosDevice && !isStandalone && !localStorage.getItem("nuju-dismiss-install")) {
      setIsIOS(true);
      setShowInstallBanner(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  const handleMoodSelect = (value: number) => {
    if (controlledMoodSelect) controlledMoodSelect(value);
    else setLocalMood(value);
    setMoodAnimating(value);
    setMoodTouched(true);
    setTimeout(() => setMoodAnimating(null), 400);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleEnergySelect = (value: number) => {
    if (controlledEnergyChange) controlledEnergyChange(value);
    else setLocalEnergy(value);
    if (navigator.vibrate) navigator.vibrate(6);
  };

  const toggleActivity = (id: string) => {
    const next = selectedActivities.includes(id)
      ? selectedActivities.filter((a) => a !== id)
      : [...selectedActivities, id];
    if (onActivitiesChange) onActivitiesChange(next);
    else setLocalActivities(next);
    if (navigator.vibrate) navigator.vibrate(6);
  };

  // Dynamic title size based on scroll
  const titleScale = Math.max(0.82, 1 - scrollY * 0.002);
  const titleOpacity = Math.max(0.6, 1 - scrollY * 0.003);

  // Nearest energy level for display label
  const nearestEnergy = ENERGY_LEVELS.reduce((prev, curr) =>
    Math.abs(curr.value - energy) < Math.abs(prev.value - energy) ? curr : prev
  );

  return (
    <div ref={scrollRef} className="animate-page-slide-in space-y-5">
      {/* Animated gradient mesh header — reacts to selected mood color */}
      <div className={`gradient-mesh relative -mx-4 px-4 pt-6 pb-5 rounded-b-[28px] ${hasBanner ? "mt-0" : "-mt-6"}`}>
        {/* Mood color overlay — child div so it doesn't conflict with gradient-mesh background */}
        {selectedMoodData && (
          <div
            className="absolute inset-0 rounded-b-[28px] pointer-events-none"
            style={{
              background: `linear-gradient(160deg, ${selectedMoodData.color}1A 0%, transparent 65%)`,
              transition: "background 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        )}
        {/* Header — Apple Large Title */}
        <div className="flex items-center justify-between mb-1">
          <div
            style={{
              transform: `scale(${titleScale})`,
              opacity: titleOpacity,
              transformOrigin: "left center",
              transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
            }}
          >
            <h1 className="text-[34px] font-bold text-foreground tracking-tight leading-tight">{displayTitle}</h1>
            <p className="text-[13px] text-muted-foreground/70 font-medium mt-0.5">{displaySubtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="animate-dynamic-island flex items-center gap-1.5 h-10 px-4 rounded-full bg-foreground/[0.06] dark:bg-foreground/[0.08] backdrop-blur-sm">
                <Flame className={`w-[15px] h-[15px] text-mood-okay ${streak >= 7 ? "animate-streak-fire" : ""}`} />
                <span className="text-[14px] font-bold text-foreground tabular-nums">{streak}</span>
                {getStreakMessage(streak, t) && (
                  <span className="text-[11px] font-medium text-muted-foreground hidden xs:inline">{getStreakMessage(streak, t)}</span>
                )}
              </div>
            )}
            <button
              onClick={onSettings}
              className="w-10 h-10 rounded-full bg-foreground/[0.06] dark:bg-foreground/[0.08] backdrop-blur-sm flex items-center justify-center press-spring"
            >
              <Settings className="w-[18px] h-[18px] text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="glass-card rounded-2xl p-4 flex items-center justify-between animate-fade-in border border-primary/20 bg-primary/5">
          <div>
            <p className="font-semibold text-[14px] text-foreground text-primary">{t.install_app || "Add Nuju to Home Screen"}</p>
            <p className="text-[12px] text-muted-foreground mt-0.5 max-w-[200px]">
              {isIOS 
                ? "Tap Share > 'Add to Home Screen' for native performance."
                : "Install the app for a native experience and notifications."}
            </p>
          </div>
          {!isIOS && installPrompt ? (
            <button 
              onClick={async () => {
                if (!installPrompt) return;
                installPrompt.prompt();
                const { outcome } = await installPrompt.userChoice;
                if (outcome === 'accepted') setShowInstallBanner(false);
              }}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold shadow-[0_2px_10px_-2px_hsl(var(--primary)/0.4)] transition-transform active:scale-95"
            >
              Install
            </button>
          ) : (
            <button 
              onClick={() => {
                setShowInstallBanner(false);
                localStorage.setItem("nuju-dismiss-install", "1");
              }}
              className="text-[12px] text-muted-foreground font-medium px-2 py-1 uppercase tracking-wide opacity-70 hover:opacity-100"
            >
              Dismiss
            </button>
          )}
        </div>
      )}



      {/* Mascot + speech bubble */}
      <div className="flex flex-col items-center gap-10 mt-6">
        <div
          className="relative w-28 h-28"
          style={{ transform: `translateY(${-scrollY * 0.12}px)`, transition: "transform 0.05s linear" }}
        >
          {/* Visual Progression: Glow intensifies based on streak */}
          <div 
            className="absolute inset-[-12px] rounded-full animate-glow-pulse transition-all duration-1000" 
            style={{ 
              background: streak >= 7 ? "hsl(var(--primary)/0.25)" : streak >= 3 ? "hsl(var(--primary)/0.15)" : "hsl(var(--primary)/0.08)",
              boxShadow: streak >= 7 ? "0 0 60px hsl(var(--primary)/0.3), inset 0 0 20px hsl(var(--primary)/0.2)" : "none",
              transform: streak >= 7 ? "scale(1.15)" : streak >= 3 ? "scale(1.05)" : "scale(1)"
            }}
          />
          <img
            src={juImg}
            alt="Ju"
            className="relative w-full h-full object-contain animate-parallax-float"
            style={{ willChange: "transform" }}
          />
        </div>
        {/* Mood-reactive speech bubble — pure text, no emoji */}
        <div
          key={String(selectedMood)}
          className="flex flex-col items-center gap-1.5 animate-fade-up"
        >
          <div className="glass-card rounded-full px-4 py-1.5">
            <p className="text-[13px] text-foreground/80 font-medium">
              {(JU_BUBBLES[lang] || JU_BUBBLES.en)[String(selectedMood)] ?? (JU_BUBBLES[lang] || JU_BUBBLES.en).default}
            </p>
          </div>
          {selectedMood === 1 && (
            <p className="text-[12px] text-muted-foreground/70 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {t.writing_helps || "Writing even a little can help"}
            </p>
          )}
        </div>
      </div>

      {/* Mood selector — taller gradient cards with glow ring */}
      <div>
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-3 px-0.5">
          {t.how_feeling}
        </p>
        <div id="tour-mood-selector" className="flex justify-center gap-2 px-0.5">
          {MOODS.map((mood, index) => {
            const isSelected = selectedMood === mood.value;
            const isAnimating = moodAnimating === mood.value;
            return (
              <motion.button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex flex-col items-center gap-2 flex-1 pt-4 pb-3 rounded-2xl transition-colors duration-300 relative overflow-hidden"
                style={{
                  background: isSelected
                    ? `linear-gradient(160deg, ${mood.color}28 0%, ${mood.color}12 100%)`
                    : "transparent",
                  boxShadow: isSelected
                    ? `0 0 0 1.5px ${mood.color}70, 0 6px 24px ${mood.color}25, inset 0 1px 0 rgba(255,255,255,0.12)`
                    : "0 0 0 1.5px transparent",
                }}
              >
                <motion.div
                  animate={{ 
                    scale: isSelected ? 1.15 : 1,
                    rotate: isAnimating ? [0, -10, 10, -5, 5, 0] : 0 
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <MoodIcon value={mood.value} color={mood.color} size={38} />
                </motion.div>
                <span
                  className="text-[10px] font-semibold tracking-wide transition-colors duration-200"
                  style={{ color: isSelected ? mood.color : "hsl(var(--muted-foreground))" }}
                >
                  {t[mood.key] || mood.label}
                </span>
                
                {/* Playful pop effect on select */}
                <AnimatePresence>
                  {isAnimating && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: `radial-gradient(circle, ${mood.color}50 0%, transparent 60%)` }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Activity tags row */}
      <div className="flex gap-2 flex-wrap px-0.5">
        {ACTIVITY_TAGS.map(({ id, icon: Icon, label }) => {
          const active = selectedActivities.includes(id);
          return (
            <button
              key={id}
              onClick={() => toggleActivity(id)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-full transition-all duration-200 press-spring"
              style={{
                background: active ? "hsl(var(--primary)/0.1)" : "hsl(var(--foreground)/0.04)",
                border: `1px solid ${active ? "hsl(var(--primary)/0.35)" : "transparent"}`,
              }}
            >
              <Icon
                className="w-3.5 h-3.5"
                style={{ color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                strokeWidth={active ? 2.2 : 1.6}
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
              >
                {(ACTIVITY_LABELS[lang] || ACTIVITY_LABELS.en)[id] || label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Energy — 5-segment icon picker (always visible) */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">{t.energy}</p>
          <span className="text-[11px] font-medium text-muted-foreground">{t[ENERGY_LABEL_KEYS[ENERGY_LEVELS.indexOf(nearestEnergy)]] || nearestEnergy.label}</span>
        </div>
        <div className="flex gap-2">
          {ENERGY_LEVELS.map((lvl) => {
            const active = energy >= lvl.value;
            const isNearest = nearestEnergy.value === lvl.value;
            const Icon = lvl.icon;
            return (
              <button
                key={lvl.value}
                onClick={() => handleEnergySelect(lvl.value)}
                className="flex-1 flex flex-col items-center gap-2 py-3.5 rounded-xl transition-all duration-200 press-spring"
                style={{
                  background: active ? `${lvl.color}14` : "transparent",
                  border: `1.5px solid ${isNearest ? lvl.color + "80" : active ? lvl.color + "30" : "transparent"}`,
                }}
              >
                <Icon
                  className="w-5 h-5 transition-all duration-200"
                  style={{
                    color: active ? lvl.color : "hsl(var(--muted-foreground)/0.3)",
                    strokeWidth: active ? 2.2 : 1.5,
                  }}
                />
                {isNearest && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: lvl.color }} />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-2.5 font-medium px-1">
          <span>{t.drained}</span>
          <span>{t.energized}</span>
        </div>
      </div>

      {/* Action buttons — always visible right after mood/activity */}
      <div id="tour-action-buttons" className="space-y-2.5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              onWrite ? onWrite() : onNavigate("journal");
            }}
            className="flex items-center justify-center gap-2.5 h-[54px] rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] press-spring shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]"
          >
            <PenLine className="w-[18px] h-[18px]" />
            {t.write}
          </button>
          <button
            onClick={() => {
              if (!hasProAccess(plan ?? null, trialStartedAt ?? null)) {
                onUpgrade();
                return;
              }
              onTalk ? onTalk() : onNavigate("journal");
            }}
            className="flex items-center justify-center gap-2.5 h-[54px] rounded-2xl bg-foreground/[0.06] dark:bg-foreground/[0.08] text-foreground font-semibold text-[15px] press-spring backdrop-blur-sm relative overflow-hidden"
          >
            <Mic className="w-[18px] h-[18px]" />
            {t.talk}
          </button>
        </div>

        {/* Breathing exercise quick action */}
        <button
          onClick={() => onNavigate("explore")}
          className="w-full flex items-center justify-center gap-2 h-[44px] rounded-2xl border border-primary/20 bg-primary/5 text-primary font-medium text-[13px] press-spring transition-all hover:border-primary/40 hover:bg-primary/10"
        >
          <Wind className="w-4 h-4" />
          {"Take a breath"}
        </button>

        {/* Quick log — appears when mood is explicitly tapped */}
        {moodTouched && onQuickLog && (
          <button
            onClick={onQuickLog}
            className="w-full flex items-center justify-center gap-2 h-[44px] rounded-2xl border border-border/50 text-muted-foreground font-medium text-[13px] press-spring animate-fade-up transition-all hover:border-border hover:text-foreground"
          >
            <Check className="w-3.5 h-3.5" />
            {t.log_mood_only || "Log mood only"}
          </button>
        )}
      </div>

      {/* Progressive disclosure — revealed after mood tap */}
      {moodTouched && (
        <div className="space-y-5 animate-fade-up">

          {/* Prompt card */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.12em]">{t.todays_prompt}</p>
              <button
                onClick={() => setPrompt(getLocalizedRandomPrompt(t))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all press-spring"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[16px] text-foreground leading-relaxed font-medium">{prompt}</p>
          </div>
        </div>
      )}

      {/* Retention */}
      <SignupPrompt
        entriesCount={entries.length}
        onDismiss={() => {}}
        onUpgrade={onUpgrade}
        plan={plan}
        trialStartedAt={trialStartedAt}
      />
      
      {/* Time Capsule — Echoes of the Past */}
      <TimeCapsuleCard entries={entries} onClick={setSelectedEntry} />

      {/* Weekly Review — shows on Sun/Mon (inspired by Rosebud) */}
      <WeeklyReviewCard entries={entries} />

      {/* Morning/Evening Check-in — replaces GratitudeCard (inspired by 5MJ + Rosebud) */}
      <DailyRitualCard />
      
      <AiMemoryCard entries={entries} hasProAccess={hasProAccess(plan ?? null, trialStartedAt ?? null)} />

      {/* Recent entries — clean iOS-list style, no cards */}
      {entries.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2 px-0.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">{t.recent || "Recent"}</p>
            <button
              onClick={() => onNavigate("history")}
              className="text-[11px] text-primary font-medium press-spring"
            >
              {t.see_all || "See all"}
            </button>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            {entries.slice(0, 3).map((entry, i) => {
              const moodData = MOODS.find((m) => m.value === entry.mood);
              const relativeDate = (() => {
                const d = new Date(entry.entry_date);
                const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
                if (diff === 0) return t.today || "Today";
                if (diff === 1) return t.yesterday || "Yesterday";
                return d.toLocaleDateString(lang || "en", { month: "short", day: "numeric" });
              })();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedEntry(entry)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 press-spring text-left"
                  style={i > 0 ? { boxShadow: "inset 0 0.5px 0 hsl(var(--border)/0.5)" } : {}}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: moodData?.color ?? "#7C6EDB" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-foreground font-medium truncate">
                      {entry.text ? entry.text.slice(0, 44) + (entry.text.length > 44 ? "…" : "") : moodData?.label ?? "Mood logged"}
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{relativeDate}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Daily Habits */}
      <HabitSection plan={plan} onUpgrade={onUpgrade} />

      {/* Spacer for bottom nav */}
      <div className="h-2" />

      {/* Entry Detail Modal (History) */}
      <EntryDetailModal 
        entry={selectedEntry} 
        isOpen={!!selectedEntry} 
        onClose={() => setSelectedEntry(null)} 
      />
    </div>
  );
};

export default HomeScreen;

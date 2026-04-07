import React, { useState, useEffect, useCallback } from "react";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Bell, Check, ChevronLeft, Star, X, Crown } from "lucide-react";
import { MOODS, AI_PERSONAS } from "@/lib/constants";
import MoodIcon from "@/components/MoodIcon";
import {
  requestNotificationPermission,
  scheduleLocalReminder,
  schedulePostInstallNotification,
} from "@/lib/notifications";

// Assets
import juHi from "@/assets/sticker-hi.webp";
import juYay from "@/assets/sticker-yay.webp";
import juHmm from "@/assets/sticker-hmm.webp";
import juLove from "@/assets/sticker-love.webp";
import coachGentle from "@/assets/coach-gentle.webp";
import coachTough from "@/assets/coach-tough.webp";
import coachWise from "@/assets/coach-wise.webp";
import coachFun from "@/assets/coach-fun.webp";

const COACH_IMAGES: Record<string, string> = {
  gentle: coachGentle,
  tough: coachTough,
  wise: coachWise,
  fun: coachFun,
};

// ─── Constants ────────────────────────────────────────────

const TOTAL_STEPS = 11;

const PAIN_OPTIONS = [
  { id: "inconsistent", emoji: "🔄" },
  { id: "blank",        emoji: "📝" },
  { id: "time",         emoji: "⏰" },
  { id: "personal",     emoji: "🔒" },
  { id: "boring",       emoji: "😴" },
];

const TINDER_STATEMENTS = [
  "tinder_thoughts",
  "tinder_effort",
  "tinder_understand",
  "tinder_start",
];

const TESTIMONIALS = [
  { name: "Sarah", age: 24, tag: "testimonial_tag_1", text: "testimonial_1" },
  { name: "Rina",  age: 21, tag: "testimonial_tag_2", text: "testimonial_2" },
  { name: "Marcus", age: 29, tag: "testimonial_tag_3", text: "testimonial_3" },
];

const REMINDER_OPTIONS = [
  { label: "8:00 AM", hour: 8 },
  { label: "12:00 PM", hour: 12 },
  { label: "6:00 PM", hour: 18 },
  { label: "9:00 PM", hour: 21 },
];

const DEMO_INSIGHTS: Record<number, string> = {
  1: "demo_insight_1",
  2: "demo_insight_2",
  3: "demo_insight_3",
  4: "demo_insight_4",
  5: "demo_insight_5",
};

const SOLUTION_ITEMS = [
  { pain: "pain_inconsistent", solution: "solution_inconsistent", stat: "83%" },
  { pain: "pain_blank", solution: "solution_blank", icon: "✨" },
  { pain: "pain_understand", solution: "solution_understand", icon: "🧠" },
  { pain: "pain_boring", solution: "solution_boring", icon: "🎭" },
];

// ─── Sub-components ───────────────────────────────────────

const ProgressBar: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div className="w-full h-1 rounded-full overflow-hidden mb-6" style={{ background: "rgba(124,110,219,0.12)" }}>
    <motion.div
      className="h-full rounded-full"
      style={{ background: "#7C6EDB" }}
      animate={{ width: `${((step + 1) / total) * 100}%` }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  </div>
);

const PrimaryButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ onClick, disabled, children }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className="w-full py-4 rounded-2xl font-semibold text-base transition-all disabled:opacity-40"
    style={{ background: "#7C6EDB", color: "white" }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);

const SecondaryButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full py-3 rounded-2xl font-medium text-sm"
    style={{ color: "#777" }}
  >
    {children}
  </button>
);

// Tinder-style swipe card
const SwipeCard: React.FC<{
  statement: string;
  onSwipe: (dir: "left" | "right") => void;
  hint: string;
}> = ({ statement, onSwipe, hint }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const rightOpacity = useTransform(x, [0, 80], [0, 1]);
  const leftOpacity = useTransform(x, [-80, 0], [1, 0]);

  const handleDragEnd = (_: never, info: PanInfo) => {
    if (info.offset.x > 80) onSwipe("right");
    else if (info.offset.x < -80) onSwipe("left");
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0, transition: { duration: 0.25 } }}
    >
      <div
        className="h-full rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(124,110,219,0.15)",
          boxShadow: "0 8px 32px -8px rgba(124,110,219,0.15)",
        }}
      >
        {/* Swipe indicators */}
        <motion.div
          className="absolute top-6 right-6 rounded-full px-3 py-1 text-sm font-bold"
          style={{ opacity: rightOpacity, background: "rgba(78,205,196,0.15)", color: "#4ECDC4", border: "2px solid #4ECDC4" }}
        >
          <Check className="w-5 h-5" />
        </motion.div>
        <motion.div
          className="absolute top-6 left-6 rounded-full px-3 py-1 text-sm font-bold"
          style={{ opacity: leftOpacity, background: "rgba(232,135,140,0.15)", color: "#E8878C", border: "2px solid #E8878C" }}
        >
          <X className="w-5 h-5" />
        </motion.div>

        <div className="text-5xl mb-6">💭</div>
        <p className="text-lg font-medium leading-relaxed" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
          "{statement}"
        </p>
        <p className="text-xs mt-6" style={{ color: "#999" }}>{hint}</p>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────

interface OnboardingProps {
  onComplete: () => void;
  onStartTrial?: () => void;
}

const OnboardingScreen: React.FC<OnboardingProps> = ({ onComplete, onStartTrial }) => {
  const { t } = useLang();

  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [tindexIndex, setTinderIndex] = useState(0);
  const [tinderRelates, setTinderRelates] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [reminderSet, setReminderSet] = useState(false);
  const [demoMood, setDemoMood] = useState<number | null>(null);
  const [demoText, setDemoText] = useState("");
  const [showDemoInsight, setShowDemoInsight] = useState(false);

  // Goal options
  const GOAL_OPTIONS = [
    { id: "stress",    emoji: "😮‍💨", label: t.onb_intent_stress || "Manage stress",       desc: t.onb_intent_stress_desc || "Unload what's on my mind" },
    { id: "awareness", emoji: "🔍",  label: t.onb_intent_awareness || "Know myself better",  desc: t.onb_intent_awareness_desc || "Understand my patterns" },
    { id: "habits",    emoji: "🌱",  label: t.onb_intent_habits || "Build a habit",          desc: t.onb_intent_habits_desc || "Show up every day" },
    { id: "exploring", emoji: "✨",  label: t.onb_intent_exploring || "Just exploring",       desc: t.onb_intent_exploring_desc || "See what this is about" },
  ];

  // Navigation
  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  }, [step]);

  const goBack = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  // Processing auto-advance
  useEffect(() => {
    if (step === 7) {
      const timer = setTimeout(() => setStep(8), 2800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Persist selections
  const handleFinish = useCallback((startTrial: boolean) => {
    try {
      if (selectedGoal) localStorage.setItem("nuju-intent", selectedGoal);
      if (selectedPains.length) localStorage.setItem("nuju-pain-points", JSON.stringify(selectedPains));
      if (selectedCoach) localStorage.setItem("nuju-coach-persona", selectedCoach);
      if (tinderRelates.length) localStorage.setItem("nuju-tinder-relates", JSON.stringify(tinderRelates));
    } catch {}

    if (startTrial && onStartTrial) onStartTrial();
    schedulePostInstallNotification();
    onComplete();
  }, [selectedGoal, selectedPains, selectedCoach, tinderRelates, onComplete, onStartTrial]);

  // Tinder swipe handler
  const handleTinderSwipe = (dir: "left" | "right") => {
    if (dir === "right") {
      setTinderRelates((prev) => [...prev, TINDER_STATEMENTS[tindexIndex]]);
    }
    if (tindexIndex < TINDER_STATEMENTS.length - 1) {
      setTinderIndex(tindexIndex + 1);
    } else {
      goNext();
    }
  };

  // Pain toggle
  const togglePain = (id: string) => {
    setSelectedPains((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Reminder handler
  const handleReminderTap = async (hour: number) => {
    setSelectedHour(hour);
    const granted = await requestNotificationPermission();
    if (granted) {
      scheduleLocalReminder(hour, 0);
      setReminderSet(true);
    }
  };

  // ─── SCREEN 0: Welcome ─────────────────────────
  const renderWelcome = () => (
    <div className="w-full max-w-sm mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        className="relative w-36 h-36 mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
        <img src={juHi} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
      </motion.div>

      <motion.h1
        className="text-2xl font-bold mb-3 leading-tight"
        style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {t.onb_welcome_title || "Your mind deserves a companion that listens"}
      </motion.h1>

      <motion.p
        className="text-base leading-relaxed mb-2"
        style={{ color: "#777" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {t.onb_welcome_desc || "Understand yourself in just 30 seconds a day"}
      </motion.p>

      {/* Micro social proof */}
      <motion.div
        className="flex items-center gap-2 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        <div className="flex -space-x-1.5">
          <div className="w-4 h-4 rounded-full bg-[#7C6EDB]" />
          <div className="w-4 h-4 rounded-full bg-[#4ECDC4]" />
          <div className="w-4 h-4 rounded-full bg-[#FFB347]" />
        </div>
        <span className="text-xs font-medium" style={{ color: "#999" }}>
          {t.join_count || "Join 2,847+ early users"}
        </span>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <PrimaryButton onClick={goNext}>
          {t.onb_welcome_cta || "Let's go ✨"}
        </PrimaryButton>
      </motion.div>
    </div>
  );

  // ─── SCREEN 1: Goal Question ────────────────────
  const renderGoal = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
        <img src={juHi} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
      </div>

      <h2 className="text-2xl font-bold mb-1.5" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_intent_title || "What brought you here?"}
      </h2>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "#777" }}>
        {t.onb_intent_desc || "Ju will personalize your experience based on what matters to you."}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {GOAL_OPTIONS.map(({ id, emoji, label, desc }) => {
          const isSelected = selectedGoal === id;
          return (
            <motion.button
              key={id}
              onClick={() => setSelectedGoal(id)}
              className="flex flex-col items-start p-4 rounded-2xl text-left transition-all"
              style={{
                background: isSelected ? "rgba(124,110,219,0.12)" : "rgba(124,110,219,0.05)",
                border: `1.5px solid ${isSelected ? "#7C6EDB" : "rgba(124,110,219,0.15)"}`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-2xl mb-2">{emoji}</span>
              <span className="text-sm font-semibold block" style={{ color: "#1A1A2E" }}>{label}</span>
              <span className="text-xs mt-0.5" style={{ color: "#777" }}>{desc}</span>
            </motion.button>
          );
        })}
      </div>

      <PrimaryButton onClick={goNext} disabled={!selectedGoal}>
        {t.onb_next || "Next"}
      </PrimaryButton>
    </div>
  );

  // ─── SCREEN 2: Pain Points ──────────────────────
  const renderPains = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_pain_title || "What usually gets in the way?"}
      </h2>
      <p className="text-sm mb-6" style={{ color: "#777" }}>
        {t.onb_pain_desc || "Select all that apply — no judgment here"}
      </p>

      <div className="flex flex-col gap-2.5 mb-8">
        {PAIN_OPTIONS.map(({ id, emoji }) => {
          const isSelected = selectedPains.includes(id);
          const label = t[`onb_pain_${id}`] || {
            inconsistent: "I'm not consistent",
            blank: "I don't know what to write",
            time: "I don't have time",
            personal: "It feels too personal",
            boring: "Journaling feels boring",
          }[id];

          return (
            <motion.button
              key={id}
              onClick={() => togglePain(id)}
              className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
              style={{
                background: isSelected ? "rgba(124,110,219,0.10)" : "rgba(124,110,219,0.04)",
                border: `1.5px solid ${isSelected ? "#7C6EDB" : "rgba(124,110,219,0.12)"}`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-sm font-medium flex-1" style={{ color: "#1A1A2E" }}>{label}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#7C6EDB" }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <PrimaryButton onClick={goNext} disabled={selectedPains.length === 0}>
        {t.onb_next || "Next"}
      </PrimaryButton>
    </div>
  );

  // ─── SCREEN 3: Social Proof ─────────────────────
  const renderSocialProof = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_social_title || "You're in good company"}
      </h2>
      <p className="text-sm mb-6" style={{ color: "#777" }}>
        {t.onb_social_desc || "Thousands of people journal with Ju every day"}
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {TESTIMONIALS.map(({ name, age, tag, text }, i) => (
          <motion.div
            key={name}
            className="rounded-2xl p-5 text-left"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(124,110,219,0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-[#FFB347] text-[#FFB347]" />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)", fontStyle: "italic" }}>
              "{t[`onb_${text}`] || {
                testimonial_1: "I've tried 5 journaling apps. Nuju is the only one I stuck with past a week. Ju just... gets it.",
                testimonial_2: "30 seconds before bed and I genuinely sleep better. The mood insights blew my mind.",
                testimonial_3: "I was skeptical about AI journaling but Ju's responses feel more insightful than what I'd write myself.",
              }[text]}"
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: ["#7C6EDB", "#4ECDC4", "#FFB347"][i] }}
              >
                {name[0]}
              </div>
              <div>
                <span className="text-xs font-semibold" style={{ color: "#1A1A2E" }}>{name}, {age}</span>
                <span className="text-xs ml-1.5" style={{ color: "#999" }}>
                  · {t[`onb_${tag}`] || {
                    testimonial_tag_1: "Busy professional",
                    testimonial_tag_2: "College student",
                    testimonial_tag_3: "First-time journaler",
                  }[tag]}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <PrimaryButton onClick={goNext}>
        {t.onb_next || "Next"}
      </PrimaryButton>
    </div>
  );

  // ─── SCREEN 4: Tinder Cards ─────────────────────
  const renderTinderCards = () => {
    const currentStatement = TINDER_STATEMENTS[tindexIndex];
    const statementText = t[`onb_${currentStatement}`] || {
      tinder_thoughts: "I have so many thoughts but nowhere to put them",
      tinder_effort: "I know I should journal but it always feels like too much effort",
      tinder_understand: "I wish someone could help me understand why I feel this way",
      tinder_start: "I want to take care of my mental health but don't know where to start",
    }[currentStatement] || "";

    return (
      <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
          {t.onb_tinder_title || "Do you relate?"}
        </h2>
        <p className="text-sm mb-6" style={{ color: "#777" }}>
          {`${tindexIndex + 1} / ${TINDER_STATEMENTS.length}`}
        </p>

        <div className="relative w-full" style={{ height: 280 }}>
          <AnimatePresence mode="wait">
            <SwipeCard
              key={tindexIndex}
              statement={statementText}
              onSwipe={handleTinderSwipe}
              hint={t.onb_tinder_hint || "Swipe right if you relate, left if not"}
            />
          </AnimatePresence>
        </div>

        {/* Tap fallback buttons */}
        <div className="flex gap-3 mt-6">
          <motion.button
            onClick={() => handleTinderSwipe("left")}
            className="flex-1 py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2"
            style={{ background: "rgba(232,135,140,0.1)", color: "#E8878C", border: "1.5px solid rgba(232,135,140,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" /> {t.onb_tinder_nope || "Nope"}
          </motion.button>
          <motion.button
            onClick={() => handleTinderSwipe("right")}
            className="flex-1 py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2"
            style={{ background: "rgba(78,205,196,0.1)", color: "#4ECDC4", border: "1.5px solid rgba(78,205,196,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Check className="w-4 h-4" /> {t.onb_tinder_relate || "That's me"}
          </motion.button>
        </div>
      </div>
    );
  };

  // ─── SCREEN 5: Solution ─────────────────────────
  const renderSolution = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <motion.div
        className="relative w-24 h-24 mx-auto mb-5"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <img src={juYay} alt="Ju" className="w-full h-full object-contain" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_solution_title || "Nuju was built for exactly this"}
      </h2>
      <p className="text-sm mb-6" style={{ color: "#777" }}>
        {t.onb_solution_desc || "Here's how Ju helps with what you told us"}
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {SOLUTION_ITEMS.map(({ pain, solution, stat, icon }, i) => (
          <motion.div
            key={pain}
            className="rounded-2xl p-4 text-left"
            style={{
              background: "rgba(124,110,219,0.05)",
              border: "1px solid rgba(124,110,219,0.1)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-xs mb-1.5 line-through" style={{ color: "#999" }}>
              {t[`onb_${pain}`] || {
                pain_inconsistent: "I'm not consistent",
                pain_blank: "I don't know what to write",
                pain_understand: "I don't understand my feelings",
                pain_boring: "Journaling feels boring",
              }[pain]}
            </p>
            <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>
              {stat && <span style={{ color: "#7C6EDB" }}>{stat} </span>}
              {icon && <span className="mr-1">{icon}</span>}
              {t[`onb_${solution}`] || {
                solution_inconsistent: "of users journal 5+ days a week — it only takes 30 seconds",
                solution_blank: "Ju gives you a daily prompt and guides the conversation",
                solution_understand: "AI spots patterns across entries you'd never notice alone",
                solution_boring: "4 coach personalities keep every session fresh and personal",
              }[solution]}
            </p>
          </motion.div>
        ))}
      </div>

      <PrimaryButton onClick={goNext}>
        {t.onb_next || "Next"}
      </PrimaryButton>
    </div>
  );

  // ─── SCREEN 6: Coach Picker ─────────────────────
  const renderCoachPicker = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_coach_title || "Pick your coach vibe"}
      </h2>
      <p className="text-sm mb-6" style={{ color: "#777" }}>
        {t.onb_coach_desc || "You can switch anytime — Ju adapts to your style"}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {AI_PERSONAS.map((persona) => {
          const isSelected = selectedCoach === persona.id;
          return (
            <motion.button
              key={persona.id}
              onClick={() => setSelectedCoach(persona.id)}
              className="flex flex-col items-center p-4 rounded-2xl transition-all"
              style={{
                background: isSelected ? `${persona.color}20` : "rgba(124,110,219,0.04)",
                border: `2px solid ${isSelected ? persona.color : "rgba(124,110,219,0.1)"}`,
              }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                <img
                  src={COACH_IMAGES[persona.id]}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold mb-0.5" style={{ color: "#1A1A2E" }}>
                {persona.name}
              </span>
              <span className="text-xs" style={{ color: "#777" }}>
                {persona.desc}
              </span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: persona.color }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <PrimaryButton onClick={goNext} disabled={!selectedCoach}>
        {t.onb_next || "Next"}
      </PrimaryButton>
    </div>
  );

  // ─── SCREEN 7: Processing ──────────────────────
  const renderProcessing = () => {
    const steps = [
      t.onb_processing_1 || "Setting up your coach",
      t.onb_processing_2 || "Personalizing your prompts",
      t.onb_processing_3 || "Calibrating mood insights",
    ];

    return (
      <div className="w-full max-w-sm mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          className="relative w-28 h-28 mb-8"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <img src={juHmm} alt="Ju thinking" className="w-full h-full object-contain" />
        </motion.div>

        <h2 className="text-xl font-bold mb-6" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
          {t.onb_processing_title || "Preparing your journal..."}
        </h2>

        <div className="flex flex-col gap-3 w-full">
          {steps.map((label, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 px-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.6 }}
            >
              <motion.div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0, background: "rgba(124,110,219,0.15)" }}
                animate={{
                  scale: 1,
                  background: "#7C6EDB",
                }}
                transition={{ delay: 0.8 + i * 0.6 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SCREEN 8: App Demo ─────────────────────────
  const renderDemo = () => {
    const insightKey = demoMood ? DEMO_INSIGHTS[demoMood] : null;
    const insightText = insightKey
      ? t[`onb_${insightKey}`] || {
          demo_insight_1: "I can feel the weight you're carrying. The fact that you showed up to write about it says something powerful about your resilience.",
          demo_insight_2: "Even on quieter days, there's something worth noticing. You're paying attention — and that matters more than you think.",
          demo_insight_3: "Steady days have their own wisdom. Not every day needs to be extraordinary — sometimes 'okay' is exactly enough.",
          demo_insight_4: "There's a warmth in what you wrote. Something good is building here, and you're noticing it.",
          demo_insight_5: "I love this energy! Let's capture what made today special so we can recreate it. ✨",
        }[insightKey]
      : "";

    return (
      <div className="w-full max-w-sm mx-auto animate-fade-up">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
            {t.onb_demo_title || "Try it now"}
          </h2>
          <p className="text-sm" style={{ color: "#777" }}>
            {t.onb_demo_desc || "Pick your mood and write one thing on your mind"}
          </p>
        </div>

        {/* Mood selector */}
        <div className="flex justify-center gap-2 mb-5">
          {MOODS.map((mood) => {
            const isSelected = demoMood === mood.value;
            return (
              <motion.button
                key={mood.value}
                onClick={() => setDemoMood(mood.value)}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                style={{
                  background: isSelected ? `${mood.color}20` : "transparent",
                  border: isSelected ? `2px solid ${mood.color}` : "2px solid transparent",
                }}
                whileTap={{ scale: 0.92 }}
                animate={isSelected ? { scale: 1.08 } : { scale: 1 }}
              >
                <MoodIcon value={mood.value} size={32} color={mood.color} />
                <span className="text-[10px] font-medium" style={{ color: isSelected ? mood.color : "#999" }}>
                  {t[mood.key] || mood.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Journal textarea */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(124,110,219,0.12)",
          }}
        >
          <textarea
            value={demoText}
            onChange={(e) => setDemoText(e.target.value)}
            placeholder={t.onb_demo_placeholder || "What's on your mind right now?"}
            className="w-full border-none outline-none resize-none bg-transparent text-sm leading-relaxed"
            style={{
              color: "#1A1A2E",
              fontFamily: "var(--font-writing, 'Newsreader', serif)",
              minHeight: 80,
            }}
            rows={3}
          />
        </div>

        {/* Show insight button or insight card */}
        <AnimatePresence mode="wait">
          {!showDemoInsight && demoMood && demoText.length >= 5 && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <PrimaryButton onClick={() => setShowDemoInsight(true)}>
                {t.onb_demo_cta || "See Ju's insight ✨"}
              </PrimaryButton>
            </motion.div>
          )}

          {showDemoInsight && (
            <motion.div
              key="insight"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: "linear-gradient(135deg, rgba(124,110,219,0.08), rgba(78,205,196,0.08))",
                  border: "1.5px solid rgba(124,110,219,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <img src={juLove} alt="Ju" className="w-8 h-8 object-contain" />
                  <span className="text-xs font-bold" style={{ color: "#7C6EDB" }}>
                    {t.ju_insight || "Ju's insight"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
                  {insightText}
                </p>
              </div>

              <p className="text-xs text-center mb-4" style={{ color: "#999" }}>
                {t.onb_demo_teaser || "This is just the beginning — Ju learns more with every entry"}
              </p>

              <PrimaryButton onClick={goNext}>
                {t.onb_next || "Continue"}
              </PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip if not engaged */}
        {!showDemoInsight && (
          <SecondaryButton onClick={goNext}>
            {t.onb_skip || "Skip"}
          </SecondaryButton>
        )}
      </div>
    );
  };

  // ─── SCREEN 9: Notification Priming ─────────────
  const renderNotification = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
        <img src={juHi} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
      </div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_reminder_title || "Never miss a check-in"}
      </h2>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "#777" }}>
        {t.onb_notif_desc || "Ju will send a gentle nudge at your ideal time"}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {REMINDER_OPTIONS.map(({ label, hour }) => {
          const isSelected = selectedHour === hour;
          return (
            <motion.button
              key={hour}
              onClick={() => handleReminderTap(hour)}
              className="py-3.5 rounded-2xl font-semibold text-[15px] transition-all"
              style={{
                background: isSelected ? "#7C6EDB" : "rgba(124,110,219,0.08)",
                color: isSelected ? "white" : "#7C6EDB",
                border: `1.5px solid ${isSelected ? "#7C6EDB" : "rgba(124,110,219,0.2)"}`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {label}
            </motion.button>
          );
        })}
      </div>

      {reminderSet && (
        <motion.div
          className="flex items-center justify-center gap-2 mb-5"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Bell className="w-4 h-4" style={{ color: "#7C6EDB" }} />
          <span className="text-xs font-medium" style={{ color: "#7C6EDB" }}>
            {`${t.onb_reminder_set || "Reminder set! Ju will check in at"} ${REMINDER_OPTIONS.find((o) => o.hour === selectedHour)?.label}`}
          </span>
        </motion.div>
      )}

      <PrimaryButton onClick={goNext}>
        {reminderSet ? (t.onb_next || "Next") : (t.onb_skip_reminder || "Skip for now")}
      </PrimaryButton>
    </div>
  );

  // ─── SCREEN 10: Paywall ─────────────────────────
  const renderPaywall = () => (
    <div className="w-full max-w-sm mx-auto text-center animate-fade-up">
      <motion.div
        className="relative w-20 h-20 mx-auto mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <img src={juYay} alt="Ju" className="w-full h-full object-contain" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A2E", fontFamily: "var(--font-serif, 'Lora', serif)" }}>
        {t.onb_paywall_title || "Your journal is ready"}
      </h2>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "#777" }}>
        {t.onb_paywall_desc || "Start with 7 days of Pro — free. Cancel anytime."}
      </p>

      {/* Testimonial */}
      <div
        className="rounded-2xl p-4 mb-5 text-left"
        style={{
          background: "rgba(124,110,219,0.05)",
          border: "1px solid rgba(124,110,219,0.1)",
        }}
      >
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 fill-[#FFB347] text-[#FFB347]" />
          ))}
        </div>
        <p className="text-xs leading-relaxed mb-2" style={{ color: "#1A1A2E", fontStyle: "italic" }}>
          "{t.onb_paywall_review || "The free trial convinced me in 2 days. Ju's insights are genuinely helpful — worth every penny."}"
        </p>
        <span className="text-[10px] font-medium" style={{ color: "#999" }}>— Alex, 26</span>
      </div>

      {/* Pro features */}
      <div className="flex flex-col gap-2 mb-6 text-left">
        {[
          t.onb_paywall_feat_1 || "Unlimited AI coach conversations",
          t.onb_paywall_feat_2 || "Deep mood insights & pattern detection",
          t.onb_paywall_feat_3 || "Full journal history & export",
          t.onb_paywall_feat_4 || "Voice journaling",
        ].map((feat, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2.5 px-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,110,219,0.12)" }}>
              <Check className="w-3 h-3" style={{ color: "#7C6EDB" }} />
            </div>
            <span className="text-sm" style={{ color: "#1A1A2E" }}>{feat}</span>
          </motion.div>
        ))}
      </div>

      {/* Trial CTA */}
      <motion.button
        onClick={() => handleFinish(true)}
        className="w-full py-4 rounded-2xl font-bold text-base mb-3 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7C6EDB, #4ECDC4)",
          color: "white",
          boxShadow: "0 4px 20px -4px rgba(124,110,219,0.4)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Crown className="w-4 h-4" />
          {t.onb_paywall_cta || "Start 7-day free trial"}
        </div>
      </motion.button>

      <SecondaryButton onClick={() => handleFinish(false)}>
        {t.onb_paywall_free || "Continue with free plan"}
      </SecondaryButton>
    </div>
  );

  // ─── Screen Router ─────────────────────────────
  const screens = [
    renderWelcome,     // 0
    renderGoal,        // 1
    renderPains,       // 2
    renderSocialProof, // 3
    renderTinderCards, // 4
    renderSolution,    // 5
    renderCoachPicker, // 6
    renderProcessing,  // 7
    renderDemo,        // 8
    renderNotification,// 9
    renderPaywall,     // 10
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "#F5F3FF" }}
    >
      {/* Top bar: progress + skip */}
      <div className="w-full max-w-sm mx-auto px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          {step > 0 && step !== 7 ? (
            <button onClick={goBack} className="text-sm font-medium flex items-center gap-0.5" style={{ color: "#777" }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-5" />
          )}
          {step < TOTAL_STEPS - 1 && step !== 7 && (
            <button
              onClick={() => handleFinish(false)}
              className="text-sm font-medium"
              style={{ color: "#999" }}
            >
              {t.onb_skip || "Skip"}
            </button>
          )}
        </div>
        {step !== 7 && <ProgressBar step={step} total={TOTAL_STEPS} />}
      </div>

      {/* Screen content */}
      <div className="flex-1 flex items-center px-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
          >
            {screens[step]()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingScreen;

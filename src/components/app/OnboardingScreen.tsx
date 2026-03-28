import React, { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Bell, BellOff } from "lucide-react";
import juMain from "@/assets/ju-main.webp";
import juGreat from "@/assets/ju-great.webp";
import juOkay from "@/assets/ju-okay.webp";
import { requestNotificationPermission, scheduleLocalReminder } from "@/lib/notifications";

const REMINDER_OPTIONS = [
  { label: "8:00 AM", hour: 8 },
  { label: "12:00 PM", hour: 12 },
  { label: "6:00 PM", hour: 18 },
  { label: "9:00 PM", hour: 21 },
];

const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLang();

  const INTENT_OPTIONS = [
    { id: "stress",    emoji: "😮‍💨", label: t.onb_intent_stress || "Manage stress",       desc: t.onb_intent_stress_desc || "Unload what's on my mind" },
    { id: "awareness", emoji: "🔍",  label: t.onb_intent_awareness || "Know myself better",  desc: t.onb_intent_awareness_desc || "Understand my patterns" },
    { id: "habits",    emoji: "🌱",  label: t.onb_intent_habits || "Build a habit",          desc: t.onb_intent_habits_desc || "Show up every day" },
    { id: "exploring", emoji: "✨",  label: t.onb_intent_exploring || "Just exploring",       desc: t.onb_intent_exploring_desc || "See what this is about" },
  ];

  // step 0 = intent, steps 1-4 = slides, step 5 = reminder
  const [step, setStep] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [reminderSet, setReminderSet] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const slides = [
    { title: t.onb_title_1, desc: t.onb_desc_1, img: juMain },
    { title: t.onb_title_2, desc: t.onb_desc_2, img: juGreat },
    { title: t.onb_title_3, desc: t.onb_desc_3, img: juOkay },
    { title: t.onb_title_4, desc: t.onb_desc_4, img: juMain },
  ];

  const TOTAL_STEPS = 1 + slides.length + 1; // intent + 4 slides + reminder
  const isIntentStep = step === 0;
  const isReminderStep = step === slides.length + 1;
  const isLast = step === slides.length; // last slide (step 4)
  const slideIndex = step - 1; // slides start at step 1

  const handleReminderTap = async (hour: number) => {
    setSelectedHour(hour);
    const granted = await requestNotificationPermission();
    if (granted) {
      scheduleLocalReminder(hour, 0);
      setReminderSet(true);
    }
  };

  const handleNext = () => {
    if (isReminderStep) {
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  const handleIntentSelect = (id: string) => {
    setSelectedIntent(id);
    try { localStorage.setItem("nuju-intent", id); } catch {}
  };

  const Dots = () => (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: i === step ? 24 : 8,
            background: i === step ? "#7C6EDB" : "#E8E4F8",
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6" style={{ background: "#F5F3FF" }}>
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-sm font-medium"
        style={{ color: "#777" }}
      >
        {t.onb_skip}
      </button>

      {isIntentStep ? (
        /* Step 0 — Why are you here? */
        <div className="w-full max-w-sm mx-auto text-center animate-fade-up" key="intent">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
            <img src={juMain} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
            {t.onb_intent_title || "Why are you here?"}
          </h2>
          <p className="text-base leading-relaxed mb-7" style={{ color: "#777" }}>
            {t.onb_intent_desc || "Ju will personalize your experience based on what matters to you."}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {INTENT_OPTIONS.map(({ id, emoji, label, desc }) => {
              const isSelected = selectedIntent === id;
              return (
                <button
                  key={id}
                  onClick={() => handleIntentSelect(id)}
                  className="flex flex-col items-start p-4 rounded-2xl text-left transition-all active:scale-[0.97]"
                  style={{
                    background: isSelected ? "rgba(124,110,219,0.12)" : "rgba(124,110,219,0.05)",
                    border: `1.5px solid ${isSelected ? "#7C6EDB" : "rgba(124,110,219,0.15)"}`,
                  }}
                >
                  <span className="text-2xl mb-2">{emoji}</span>
                  <span className="text-[14px] font-semibold block" style={{ color: "#1A1A2E" }}>{label}</span>
                  <span className="text-[12px] mt-0.5" style={{ color: "#777" }}>{desc}</span>
                </button>
              );
            })}
          </div>
          <Dots />
          <button
            onClick={handleNext}
            disabled={!selectedIntent}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.97] disabled:opacity-40"
            style={{ background: "#7C6EDB", color: "white" }}
          >
            {t.onb_next}
          </button>
        </div>
      ) : isReminderStep ? (
        /* Reminder step */
        <div className="w-full max-w-sm mx-auto text-center animate-fade-up" key="reminder">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
            <img src={juMain} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
          </div>

          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
            {t.onb_reminder_title || "Never miss a day"}
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#777" }}>
            {t.onb_reminder_desc || "When should Ju check in with you?"}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {REMINDER_OPTIONS.map(({ label, hour }) => {
              const isSelected = selectedHour === hour;
              return (
                <button
                  key={hour}
                  onClick={() => handleReminderTap(hour)}
                  className="py-3.5 rounded-2xl font-semibold text-[15px] transition-all active:scale-[0.97]"
                  style={{
                    background: isSelected ? "#7C6EDB" : "rgba(124,110,219,0.08)",
                    color: isSelected ? "white" : "#7C6EDB",
                    border: `1.5px solid ${isSelected ? "#7C6EDB" : "rgba(124,110,219,0.2)"}`,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {reminderSet && (
            <div className="flex items-center justify-center gap-2 mb-6 animate-fade-up">
              <Bell className="w-4 h-4" style={{ color: "#7C6EDB" }} />
              <span className="text-[13px] font-medium" style={{ color: "#7C6EDB" }}>
                {`${t.onb_reminder_set || "Reminder set! Ju will check in at"} ${REMINDER_OPTIONS.find(o => o.hour === selectedHour)?.label}`}
              </span>
            </div>
          )}

          <Dots />

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.97]"
            style={{ background: "#7C6EDB", color: "white" }}
          >
            {reminderSet ? t.onb_start : (t.onb_skip_reminder || "Skip for now")}
          </button>
        </div>
      ) : (
        /* Regular slides (steps 1-4) */
        <div className="w-full max-w-sm mx-auto text-center animate-fade-up" key={step}>
          <div className="relative w-40 h-40 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
            <img src={slides[slideIndex].img} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
          </div>

          <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            {slides[slideIndex].title}
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#777" }}>
            {slides[slideIndex].desc}
          </p>

          <Dots />

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.97]"
            style={{ background: "#7C6EDB", color: "white" }}
          >
            {isLast ? t.onb_next : t.onb_next}
          </button>
        </div>
      )}
    </div>
  );
};

export default OnboardingScreen;

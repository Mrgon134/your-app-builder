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
  const [step, setStep] = useState(0);
  const [reminderSet, setReminderSet] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const slides = [
    { title: t.onb_title_1, desc: t.onb_desc_1, img: juMain },
    { title: t.onb_title_2, desc: t.onb_desc_2, img: juGreat },
    { title: t.onb_title_3, desc: t.onb_desc_3, img: juOkay },
    { title: t.onb_title_4, desc: t.onb_desc_4, img: juMain },
  ];

  const TOTAL_STEPS = slides.length + 1; // 4 slides + 1 reminder step
  const isReminderStep = step === slides.length;
  const isLast = step === slides.length - 1;

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
    } else if (isLast) {
      setStep(step + 1); // go to reminder step
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6" style={{ background: "#F5F3FF" }}>
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-sm font-medium"
        style={{ color: "#777" }}
      >
        {t.onb_skip}
      </button>

      {isReminderStep ? (
        /* Reminder step */
        <div className="w-full max-w-sm mx-auto text-center animate-fade-up" key="reminder">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
            <img src={juMain} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
          </div>

          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: "#1A1A2E" }}>
            Never miss a day
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#777" }}>
            When should Ju check in with you?
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
                Reminder set! Ju will check in at {REMINDER_OPTIONS.find(o => o.hour === selectedHour)?.label}
              </span>
            </div>
          )}

          {/* Dots */}
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

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.97]"
            style={{ background: "#7C6EDB", color: "white" }}
          >
            {reminderSet ? t.onb_start : "Skip for now"}
          </button>
        </div>
      ) : (
        /* Regular slides */
        <div className="w-full max-w-sm mx-auto text-center animate-fade-up" key={step}>
          <div className="relative w-40 h-40 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full animate-glow-pulse" style={{ background: "rgba(124,110,219,0.15)" }} />
            <img src={slides[step].img} alt="Ju" className="relative w-full h-full object-contain animate-ju-float" />
          </div>

          <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
            {slides[step].title}
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#777" }}>
            {slides[step].desc}
          </p>

          {/* Dots */}
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

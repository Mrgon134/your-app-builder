import React, { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import juMain from "@/assets/ju-main.webp";
import juGreat from "@/assets/ju-great.webp";
import juOkay from "@/assets/ju-okay.webp";

const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useLang();
  const [step, setStep] = useState(0);

  const slides = [
    { title: t.onb_title_1, desc: t.onb_desc_1, img: juMain },
    { title: t.onb_title_2, desc: t.onb_desc_2, img: juGreat },
    { title: t.onb_title_3, desc: t.onb_desc_3, img: juOkay },
    { title: t.onb_title_4, desc: t.onb_desc_4, img: juMain },
  ];

  const isLast = step === slides.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6" style={{ background: "#F5F3FF" }}>
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-sm font-medium"
        style={{ color: "#777" }}
      >
        {t.onb_skip}
      </button>

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
          {slides.map((_, i) => (
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
          onClick={() => (isLast ? onComplete() : setStep(step + 1))}
          className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.97]"
          style={{ background: "#7C6EDB", color: "white" }}
        >
          {isLast ? t.onb_start : t.onb_next}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;

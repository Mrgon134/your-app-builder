import React from "react";
import { ArrowRight, Lock, Mic, PenLine, Sparkles } from "lucide-react";
import juMain from "@/assets/ju-main.webp";
import juRough from "@/assets/ju-rough.webp";
import juLow from "@/assets/ju-low.webp";
import juOkay from "@/assets/ju-okay.webp";
import juGood from "@/assets/ju-good.webp";
import juGreat from "@/assets/ju-great.webp";

const signalBars = [38, 54, 46, 66, 58, 74, 70, 86];

const moodChoices = [
  { label: "Rough", image: juRough, active: true },
  { label: "Low", image: juLow },
  { label: "Okay", image: juOkay },
  { label: "Good", image: juGood },
  { label: "Great", image: juGreat },
];

const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-full max-w-[19.5rem] rounded-[3.15rem] border-[10px] border-zinc-950 bg-zinc-950 shadow-[0_34px_90px_-46px_rgba(24,24,27,0.88)]">
      <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-zinc-950" aria-hidden="true" />
      <div className="overflow-hidden rounded-[2.35rem] bg-[#fbf8f0] text-zinc-950">
        <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-bold text-zinc-950">
          <span>9:41</span>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-2.5 w-3.5 rounded-[0.22rem] border border-zinc-950" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-950" />
          </div>
        </div>
        {children}
        <div className="mx-auto mb-2 mt-5 h-1 w-24 rounded-full bg-zinc-950/85" />
      </div>
    </div>
  );
};

const HeroPatternPreview: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-[38rem] lg:ml-auto">
      <div
        className="absolute inset-x-6 top-8 h-[82%] rounded-[3rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(246,243,235,0.46))] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
        aria-hidden="true"
      />

      <div className="relative grid items-center gap-5 lg:grid-cols-[0.88fr_0.62fr]">
        <PhoneFrame>
          <div className="px-6 pb-3 pt-6">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/72 px-3 py-1.5 text-[11px] font-bold text-zinc-600 shadow-sm">
                <Lock className="h-3.5 w-3.5 text-[#6f66c9]" />
                Private reveal
              </div>
              <Sparkles className="h-4 w-4 text-[#6f66c9]" />
            </div>

            <h3 className="mt-8 text-center text-[2.35rem] font-black leading-[0.95] tracking-tight text-zinc-950">
              Journaling,
              <br />
              but it gets <span className="text-[#6f66c9]">you.</span>
            </h3>
            <p className="mx-auto mt-4 max-w-[15rem] text-center text-sm leading-6 text-zinc-600">
              Tap a mood. Say the heavy part. See the pattern underneath.
            </p>

            <div className="relative mx-auto mt-7 flex h-44 w-44 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffffff_0%,#eee7ff_54%,rgba(238,231,255,0)_72%)]">
              <span className="absolute inset-8 rounded-full border border-[#6f66c9]/10" />
              <span className="absolute -right-2 top-10 h-8 w-8 rotate-45 rounded-[0.7rem] bg-[#6f66c9]/18" />
              <img src={juMain} alt="Ju companion" className="relative h-32 w-32 object-contain drop-shadow-[0_20px_24px_rgba(111,102,201,0.22)]" width={128} height={128} />
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-[#6f66c9] px-5 py-4 text-sm font-black text-white shadow-[0_18px_38px_-24px_rgba(24,24,27,0.8)]">
              Start reveal
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-zinc-500">
              <Lock className="h-3.5 w-3.5" />
              Private by design. Always.
            </p>
          </div>
        </PhoneFrame>

        <div className="hidden flex-col gap-4 lg:flex">
          <div className="rounded-[2rem] border border-white/72 bg-white/78 p-4 shadow-[0_24px_70px_-48px_rgba(24,24,27,0.75)] backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Mood check-in</p>
              <PenLine className="h-4 w-4 text-[#6f66c9]" />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {moodChoices.map((mood) => (
                <div
                  key={mood.label}
                  className={`rounded-[1rem] border p-2 text-center ${
                    mood.active ? "border-[#6f66c9] bg-[#f3f0ff]" : "border-zinc-200 bg-zinc-50/70"
                  }`}
                >
                  <img src={mood.image} alt={`${mood.label} mood`} className="mx-auto h-8 w-8 object-contain" width={32} height={32} />
                  <p className="mt-1 text-[10px] font-bold text-zinc-600">{mood.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-[1.35rem] border border-zinc-200 bg-[#fbfaf7] p-4">
              <p className="text-sm font-bold text-zinc-950">What feels heavy right now?</p>
              <div className="mt-4 flex h-9 items-end gap-1">
                {signalBars.map((height, index) => (
                  <span
                    key={index}
                    className="w-1.5 rounded-full bg-[#6f66c9]/42"
                    style={{
                      height: `${height}%`,
                      animation: "typing-dots 1.8s ease-in-out infinite alternate",
                      animationDelay: `${index * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-900/10 bg-zinc-950 p-5 text-white shadow-[0_30px_80px_-48px_rgba(24,24,27,0.9)]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">Ju noticed</p>
              <Mic className="h-4 w-4 text-white/64" />
            </div>
            <p className="mt-5 text-[1.45rem] font-black leading-tight tracking-tight">
              You are carrying more than you let on.
            </p>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">Next gentle step</p>
              <p className="mt-2 text-sm leading-6 text-white/78">Give your care a place to rest. You do not have to fix it today.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroPatternPreview);

export const MOODS = [
  { label: "Rough", value: 1, color: "#E8878C", key: "rough" as const },
  { label: "Low", value: 2, color: "#6C9BCF", key: "low" as const },
  { label: "Okay", value: 3, color: "#FFB347", key: "okay" as const },
  { label: "Good", value: 4, color: "#95E1D3", key: "good" as const },
  { label: "Great", value: 5, color: "#4ECDC4", key: "great" as const },
];

export const AI_PERSONAS = [
  { id: "gentle" as const, name: "Gentle Guide", color: "#B8C4F0", desc: "Warm, understanding, nurturing" },
  { id: "tough" as const, name: "Tough Coach", color: "#D4A0D0", desc: "Direct, motivating, no excuses" },
  { id: "wise" as const, name: "Wise Sage", color: "#E8D5A3", desc: "Thoughtful, philosophical, deep" },
  { id: "fun" as const, name: "Fun Friend", color: "#A8E6CF", desc: "Playful, uplifting, honest" },
];

export const PROMPTS = [
  "What made you smile today, even just a little?",
  "If your mood was a weather, what would it be right now?",
  "What's one thing you're proud of this week?",
  "Who made your day better today?",
  "What would you tell your past self from last month?",
  "What's weighing on your mind right now?",
  "Describe your perfect tomorrow in 3 sentences.",
  "What's a small win you haven't celebrated yet?",
];

export const coachResponses: Record<string, string[]> = {
  gentle: [
    "I hear you, and what you're feeling is completely valid. Let's explore that together.",
    "That takes courage to share. What do you think is at the heart of this feeling?",
    "You're doing beautifully just by being here. What would feel supportive right now?",
  ],
  tough: [
    "Alright, let's cut through the noise. What's the ONE thing you can actually control here?",
    "I believe in you, but belief isn't enough — what's your next move?",
    "Stop waiting for motivation. Action creates motivation. What's your smallest next step?",
  ],
  wise: [
    "Consider this: every challenge contains the seed of its own resolution.",
    'Marcus Aurelius wrote: "The obstacle is the way." What if this difficulty is exactly what you need?',
    "Sit with this question: in 5 years, will this matter? If yes, act. If no, release.",
  ],
  fun: [
    "Bro, you know what? You're overthinking this. Let's vibe it out!",
    "Plot twist: you're actually doing way better than you think. Evidence? You're HERE, working on yourself!",
    "Okay real talk — what would the most confident version of you do right now? Yeah, do THAT.",
  ],
};

export const getGreeting = (t: Record<string, string>) => {
  const h = new Date().getHours();
  if (h < 6) return t.greeting_late;
  if (h < 12) return t.greeting_morning;
  if (h < 17) return t.greeting_afternoon;
  if (h < 21) return t.greeting_evening;
  return t.greeting_night;
};

export const getRandomPrompt = () => PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

export const getLocalizedRandomPrompt = (t: Record<string, string>): string => {
  const keys = ["prompt_1","prompt_2","prompt_3","prompt_4","prompt_5","prompt_6","prompt_7","prompt_8"] as const;
  const localizedPrompts = keys.map((k, i) => t[k] || PROMPTS[i]).filter(Boolean);
  return localizedPrompts[Math.floor(Math.random() * localizedPrompts.length)];
};

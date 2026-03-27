export interface Program {
  id: string;
  title: string;
  description: string;
  days: number;
  emoji: string;
  color: string;
  category: "gratitude" | "mindfulness" | "growth" | "resilience" | "clarity";
  prompts: string[];
}

export const GUIDED_PROGRAMS: Program[] = [
  {
    id: "gratitude-7",
    title: "Gratitude Journey",
    description: "7 days of intentional gratitude to rewire your brain for positivity.",
    days: 7,
    emoji: "🌸",
    color: "#E8878C",
    category: "gratitude",
    prompts: [
      "Write 3 things you're grateful for today that you usually take for granted.",
      "Who is someone you're grateful for? Describe how they've impacted your life.",
      "What challenge are you secretly grateful for? How has it made you stronger?",
      "Describe a moment from today that made you smile, even briefly.",
      "What about your body or health are you grateful for right now?",
      "What simple pleasure brought you joy this week?",
      "Look back at this week. What growth are you most grateful for?",
    ],
  },
  {
    id: "stress-relief-5",
    title: "Stress Relief Reset",
    description: "5 days of journaling to identify, process, and release stress.",
    days: 5,
    emoji: "🧘",
    color: "#6C9BCF",
    category: "mindfulness",
    prompts: [
      "What is your biggest source of stress right now? Write it all out, uncensored.",
      "What is within your control in this situation? What isn't? Let go of the latter.",
      "What does your body feel like when you're stressed? Where do you hold tension?",
      "Write a letter to your stressed self from a calm, future version of you.",
      "What one thing can you do differently tomorrow to reduce your stress?",
    ],
  },
  {
    id: "self-discovery-14",
    title: "Know Yourself",
    description: "14 days of deep self-reflection to understand who you really are.",
    days: 14,
    emoji: "🔍",
    color: "#7C6EDB",
    category: "growth",
    prompts: [
      "Describe yourself in 10 words. Which words feel most true? Which feel aspirational?",
      "What did you love doing as a child? Does that still resonate with you?",
      "What are your top 3 values? Are you living in alignment with them?",
      "What fear is holding you back the most right now?",
      "Describe your ideal day, in detail. What does it tell you about your priorities?",
      "What do people thank you for? What does that reveal about your gifts?",
      "When do you feel most alive? Most drained?",
      "What would you regret NOT doing in your life?",
      "Describe a time you were truly proud of yourself. What made it meaningful?",
      "What boundaries do you need to set but haven't?",
      "Who do you admire most and why? What does that tell you about your values?",
      "What belief about yourself is limiting your growth?",
      "Write a letter to your 10-year-ago self. What do you wish they knew?",
      "Who are you becoming? Describe the person you're growing into.",
    ],
  },
  {
    id: "morning-clarity-7",
    title: "Morning Clarity",
    description: "7 mornings of intention-setting to start each day with purpose.",
    days: 7,
    emoji: "☀️",
    color: "#FFB347",
    category: "clarity",
    prompts: [
      "What is the ONE thing that would make today great?",
      "What are you looking forward to today? What are you dreading? Why?",
      "Set 3 intentions for today — one for work, one for relationships, one for yourself.",
      "What mindset do you want to embody today? Write it as an affirmation.",
      "If today was perfect, what would happen?",
      "What would you do today if you weren't afraid?",
      "Week reflection: What wins did you have? What will you do differently next week?",
    ],
  },
  {
    id: "resilience-10",
    title: "Resilience Builder",
    description: "10 days to develop mental toughness and bounce-back ability.",
    days: 10,
    emoji: "💪",
    color: "#4ECDC4",
    category: "resilience",
    prompts: [
      "Describe the hardest thing you've overcome. What did it teach you?",
      "What does resilience mean to you? When have you shown it?",
      "What is your current biggest challenge? What resources do you have to face it?",
      "Write about a failure that eventually led to something better.",
      "What coping strategies work best for you? Which ones are harmful?",
      "Who in your life models resilience? What can you learn from them?",
      "What would you do if you knew you couldn't fail?",
      "Write about a time you surprised yourself with your own strength.",
      "What story are you telling yourself about your struggles? Is it helping or hurting?",
      "Imagine yourself 1 year from now, having overcome this challenge. What do you see?",
    ],
  },
];

export const getProgramById = (id: string): Program | undefined =>
  GUIDED_PROGRAMS.find((p) => p.id === id);

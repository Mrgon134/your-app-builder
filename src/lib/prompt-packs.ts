// Prompt Packs — themed journaling prompts
// Inspired by Day One (Editors' Choice) — their most-requested feature

const STORAGE_KEY = "nuju-prompt-packs";

export interface PromptPack {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  prompts: string[];
}

export const PROMPT_PACKS: PromptPack[] = [
  {
    id: "self-discovery",
    title: "Self-Discovery",
    description: "Explore who you truly are",
    icon: "🔍",
    color: "rgb(99,102,241)",
    prompts: [
      "What are 3 values that guide your life?",
      "Describe your ideal day from start to finish.",
      "What's something you believe that most people would disagree with?",
      "If you could tell your younger self one thing, what would it be?",
      "What fear would you conquer if you knew you couldn't fail?",
      "What brings you the most joy in daily life?",
      "Describe a moment that fundamentally changed who you are.",
      "What part of your personality are you most proud of?",
      "What do you wish other people understood about you?",
      "If money wasn't a factor, how would you spend your time?",
      "What's a belief you've changed your mind about?",
      "What does your dream life look like in 5 years?",
    ],
  },
  {
    id: "gratitude-deep",
    title: "Gratitude Deep-Dive",
    description: "Beyond the surface — find hidden blessings",
    icon: "🙏",
    color: "rgb(236,72,153)",
    prompts: [
      "Name someone who made your life better without knowing it.",
      "What's a difficult experience you're now grateful for?",
      "Describe a small daily luxury you often take for granted.",
      "Who taught you something valuable, and what was it?",
      "What's a skill you have that you're grateful for?",
      "Describe a place that brings you peace and why.",
      "What's a mistake that led to something beautiful?",
      "Name 3 things about your body you're grateful for.",
      "What technology are you most grateful for today?",
      "Describe a friendship that has shaped who you are.",
    ],
  },
  {
    id: "stress-anxiety",
    title: "Stress & Anxiety",
    description: "Process worries and find clarity",
    icon: "🧘",
    color: "rgb(20,184,166)",
    prompts: [
      "What's weighing on your mind right now? Write it all out.",
      "What can you control about this situation? What can't you?",
      "Describe the worst-case scenario. How likely is it really?",
      "What would you tell a friend who feels the way you do?",
      "List 5 things that are going well right now.",
      "What's one small step you can take today to feel better?",
      "When was the last time you felt anxious about something that turned out fine?",
      "What does your body need right now?",
      "Write a letter to your anxiety. What would you say?",
      "Describe your safe place in vivid detail.",
    ],
  },
  {
    id: "relationships",
    title: "Relationships",
    description: "Understand your connections deeper",
    icon: "💕",
    color: "rgb(244,63,94)",
    prompts: [
      "Who do you feel most yourself around, and why?",
      "Describe a conversation that changed your perspective.",
      "Is there someone you need to forgive? What's holding you back?",
      "What quality do you most admire in your closest friend?",
      "How do you show love? How do you like to receive it?",
      "Describe a relationship you'd like to improve. What's one step?",
      "Who has believed in you when you didn't believe in yourself?",
      "What boundaries do you need to set or reinforce?",
      "Write about a time someone's kindness surprised you.",
      "What does healthy love look like to you?",
    ],
  },
  {
    id: "career-clarity",
    title: "Career & Purpose",
    description: "Find meaning in your work",
    icon: "🎯",
    color: "rgb(245,158,11)",
    prompts: [
      "What would you do if you knew you wouldn't be judged?",
      "Describe your ideal work environment.",
      "What's a skill you'd love to develop this year?",
      "When do you feel most 'in the zone'?",
      "What legacy do you want to leave through your work?",
      "What's the biggest risk you've taken professionally? Was it worth it?",
      "Who inspires your career vision, and why?",
      "If you could start over, what would you do differently?",
      "What's one thing about your work that energizes you?",
      "Describe your ideal Monday morning.",
    ],
  },
  {
    id: "healing",
    title: "Healing & Growth",
    description: "Process emotions and move forward",
    icon: "🌱",
    color: "rgb(34,197,94)",
    prompts: [
      "What emotion have you been avoiding? Write about it.",
      "Describe a wound that's still healing. What does it need?",
      "What would forgiveness (of yourself or others) look like?",
      "Write about a loss that still affects you.",
      "What pattern in your life would you like to break?",
      "Describe the version of yourself you're becoming.",
      "What have you survived that made you stronger?",
      "Write a letter of compassion to yourself.",
      "What does healing feel like in your body?",
      "Name one thing you're ready to let go of.",
    ],
  },
];

interface PackProgress {
  [packId: string]: number[]; // indices of completed prompts
}

function loadProgress(): PackProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: PackProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getPackProgress(packId: string): number[] {
  return loadProgress()[packId] || [];
}

export function markPromptDone(packId: string, promptIndex: number) {
  const progress = loadProgress();
  if (!progress[packId]) progress[packId] = [];
  if (!progress[packId].includes(promptIndex)) {
    progress[packId].push(promptIndex);
  }
  saveProgress(progress);
}

export function getNextPrompt(packId: string): { prompt: string; index: number } | null {
  const pack = PROMPT_PACKS.find((p) => p.id === packId);
  if (!pack) return null;
  const done = getPackProgress(packId);
  const remaining = pack.prompts
    .map((p, i) => ({ prompt: p, index: i }))
    .filter((p) => !done.includes(p.index));
  return remaining.length > 0 ? remaining[0] : null;
}

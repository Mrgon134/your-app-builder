// Daily Inspiration — Affirmation + Quote system
// Inspired by 5 Minute Journal (4.8★, #1 user-loved feature) & Stoic

const STORAGE_KEY = "nuju-inspiration-favorites";

export interface DailyInspiration {
  quote: string;
  author: string;
  affirmation: string;
}

// 60 curated quotes — enough for 2 months of unique content
const QUOTES: { text: string; author: string }[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The wound is the place where the Light enters you.", author: "Rumi" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Out of suffering have emerged the strongest souls.", author: "Kahlil Gibran" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Nothing is permanent in this wicked world, not even our troubles.", author: "Charlie Chaplin" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "Inhale the future, exhale the past.", author: "Unknown" },
  { text: "You are enough just as you are.", author: "Meghan Markle" },
  { text: "Vulnerability is the birthplace of innovation, creativity and change.", author: "Brené Brown" },
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Courage doesn't always roar. Sometimes it's the quiet voice at the end of the day saying 'I will try again tomorrow.'", author: "Mary Anne Radmacher" },
  { text: "We can complain because rose bushes have thorns, or rejoice because thorn bushes have roses.", author: "Abraham Lincoln" },
  { text: "When the world says give up, hope whispers try one more time.", author: "Unknown" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brownn" },
  { text: "Be gentle with yourself. You're doing the best you can.", author: "Unknown" },
  { text: "Stars can't shine without darkness.", author: "D.H. Sidebottom" },
  { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
  { text: "An entire sea of water can't sink a ship unless it gets inside the ship.", author: "Goi Nasu" },
  { text: "Feelings are just visitors. Let them come and go.", author: "Mooji" },
  { text: "Talk to yourself like someone you love.", author: "Brené Brown" },
  { text: "Just because my path is different doesn't mean I'm lost.", author: "Gerard Abrams" },
  { text: "The struggle you're in today is developing the strength you need for tomorrow.", author: "Robert Tew" },
  { text: "Worrying does not take away tomorrow's troubles. It takes away today's peace.", author: "Randy Armstrong" },
  { text: "Those who move forward with a happy spirit will find that things always work out.", author: "Gordon B. Hinckley" },
  { text: "Sometimes the bravest thing you can do is ask for help.", author: "Unknown" },
  { text: "Not everything that weighs you down is yours to carry.", author: "Unknown" },
  { text: "Healing is not linear.", author: "Unknown" },
  { text: "You have survived 100% of your worst days. You're doing great.", author: "Unknown" },
  { text: "Small steps every day lead to big changes.", author: "Unknown" },
  { text: "What consumes your mind, controls your life.", author: "Unknown" },
  { text: "Breathe. It's just a bad day, not a bad life.", author: "Unknown" },
  { text: "The sun will rise and we will try again.", author: "Twenty One Pilots" },
  { text: "Your feelings are valid. Your struggles are real. And you are worthy of compassion.", author: "Unknown" },
  { text: "Growth is uncomfortable. You'll thank yourself later.", author: "Unknown" },
  { text: "One day, all the hard days will make sense.", author: "Unknown" },
];

// 60 curated affirmations
const AFFIRMATIONS: string[] = [
  "I am worthy of love, happiness, and fulfillment.",
  "I choose to focus on what I can control.",
  "I am becoming the best version of myself, one day at a time.",
  "My feelings are valid and I give myself permission to feel them.",
  "I am resilient, strong, and brave.",
  "I release what no longer serves me.",
  "I am exactly where I need to be right now.",
  "I trust the process and timing of my life.",
  "I deserve rest, peace, and recovery.",
  "I am growing, even when it doesn't feel like it.",
  "Today I choose joy over worry.",
  "I am capable of achieving great things.",
  "My past does not define my future.",
  "I am grateful for this moment, right here.",
  "I give myself permission to take things one step at a time.",
  "I am at peace with who I am.",
  "I trust myself to make the right decisions.",
  "I radiate love, confidence, and inner peace.",
  "Every challenge I face is an opportunity to grow.",
  "I am worthy of all the good things happening in my life.",
  "I let go of negative thoughts and embrace positivity.",
  "My mental health is a priority.",
  "I am proud of how far I've come.",
  "I choose to be kind to myself today.",
  "I am open to new possibilities.",
  "I celebrate my small victories.",
  "I attract positive energy into my life.",
  "I am enough, just as I am.",
  "I forgive myself for past mistakes.",
  "I am creating a life I love.",
  "Today I focus on progress, not perfection.",
  "I am in charge of my own happiness.",
  "I release the need to compare myself to others.",
  "I trust that everything works out in my favor.",
  "I am a magnet for miracles.",
  "I embrace my imperfections as part of what makes me unique.",
  "I am surrounded by love and support.",
  "I have the power to create change in my life.",
  "I choose courage over comfort.",
  "I am healing, and that is enough.",
  "I welcome abundance into my life.",
  "I listen to my body and respect its needs.",
  "I am grateful for the lessons life teaches me.",
  "I am worthy of taking up space in this world.",
  "I honor my journey, even the difficult parts.",
  "I am free to let go and move forward.",
  "Today, I choose to see the beauty around me.",
  "I am allowed to feel good about myself.",
  "I trust my intuition to guide me.",
  "I am committed to my own growth and wellbeing.",
  "I replace fear with curiosity.",
  "I am becoming more mindful every day.",
  "I have the strength to overcome anything.",
  "I am worthy of my own love and care.",
  "I choose thoughts that nourish my soul.",
  "I am doing the best I can, and that is enough.",
  "I am building a life that aligns with my values.",
  "I deserve to take breaks without guilt.",
  "I am patient with myself and my process.",
  "I give myself grace as I navigate life's ups and downs.",
];

/** Deterministic daily index based on date */
function getDayIndex(bank_length: number): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return seed % bank_length;
}

export function getTodayInspiration(): DailyInspiration {
  const quoteIdx = getDayIndex(QUOTES.length);
  // Offset affirmation so it doesnt correlate with quote
  const affIdx = (getDayIndex(AFFIRMATIONS.length) + 17) % AFFIRMATIONS.length;

  return {
    quote: QUOTES[quoteIdx].text,
    author: QUOTES[quoteIdx].author,
    affirmation: AFFIRMATIONS[affIdx],
  };
}

export function toggleFavorite(text: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const favs: string[] = raw ? JSON.parse(raw) : [];
    const idx = favs.indexOf(text);
    if (idx >= 0) {
      favs.splice(idx, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
      return false;
    } else {
      favs.push(text);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
      return true;
    }
  } catch {
    return false;
  }
}

export function isFavorite(text: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const favs: string[] = raw ? JSON.parse(raw) : [];
    return favs.includes(text);
  } catch {
    return false;
  }
}

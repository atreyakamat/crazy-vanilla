export interface DayData {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  emoji: string;
  date: string;
  gradientFrom?: string;
  gradientTo?: string;
  keyLine?: string;
}

export const days: DayData[] = [
  {
    id: 1,
    name: "Rose Day",
    title: "Rose Day",
    subtitle: "A rose for every reason I love you",
    emoji: "🌹",
    date: "Feb 7",
    gradientFrom: "from-rose-100",
    gradientTo: "to-pink-50",
    keyLine: "Every petal, a reason I love you",
  },
  {
    id: 2,
    name: "Propose Day",
    title: "Propose Day",
    subtitle: "Hold on to what matters",
    emoji: "💍",
    date: "Feb 8",
    gradientFrom: "from-blue-100",
    gradientTo: "to-indigo-50",
    keyLine: "Let's hold on to what matters",
  },
  {
    id: 3,
    name: "Chocolate Day",
    title: "Chocolate Day",
    subtitle: "Unwrap something sweet",
    emoji: "🍫",
    date: "Feb 9",
    gradientFrom: "from-amber-100",
    gradientTo: "to-orange-50",
    keyLine: "Sweetness, unwrapped just for you",
  },
  {
    id: 4,
    name: "Teddy Day",
    title: "Teddy Day",
    subtitle: "A little comfort, just for you",
    emoji: "🧸",
    date: "Feb 10",
    gradientFrom: "from-yellow-100",
    gradientTo: "to-amber-50",
    keyLine: "Here when you need comfort",
  },
  {
    id: 5,
    name: "Promise Day",
    title: "Promise Day",
    subtitle: "Words that stay",
    emoji: "🤝",
    date: "Feb 11",
    gradientFrom: "from-violet-100",
    gradientTo: "to-purple-50",
    keyLine: "These words are my promise",
  },
  {
    id: 6,
    name: "Hug Day",
    title: "Hug Day",
    subtitle: "Feel the warmth",
    emoji: "🤗",
    date: "Feb 12",
    gradientFrom: "from-orange-100",
    gradientTo: "to-red-50",
    keyLine: "Wrapped in warmth and presence",
  },
  {
    id: 7,
    name: "Kiss Day",
    title: "Kiss Day",
    subtitle: "Come a little closer",
    emoji: "💋",
    date: "Feb 13",
    gradientFrom: "from-pink-100",
    gradientTo: "to-rose-50",
    keyLine: "A quiet moment, just us",
  },
  {
    id: 8,
    name: "Valentine's Day",
    title: "Valentine's Day",
    subtitle: "The moment it all comes together",
    emoji: "❤️",
    date: "Feb 14",
    gradientFrom: "from-red-100",
    gradientTo: "to-rose-50",
    keyLine: "Everything leads here, to you",
  },
];

export function getDayById(id: number): DayData | undefined {
  return days.find((day) => day.id === id);
}

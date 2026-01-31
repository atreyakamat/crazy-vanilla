export interface DayData {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  emoji: string;
  date: string;
}

export const days: DayData[] = [
  {
    id: 1,
    name: "Rose Day",
    title: "Rose Day",
    subtitle: "A rose for every reason I love you",
    emoji: "🌹",
    date: "Feb 7",
  },
  {
    id: 2,
    name: "Propose Day",
    title: "Propose Day",
    subtitle: "Hold on to what matters",
    emoji: "💍",
    date: "Feb 8",
  },
  {
    id: 3,
    name: "Chocolate Day",
    title: "Chocolate Day",
    subtitle: "Unwrap something sweet",
    emoji: "🍫",
    date: "Feb 9",
  },
  {
    id: 4,
    name: "Teddy Day",
    title: "Teddy Day",
    subtitle: "A little comfort, just for you",
    emoji: "🧸",
    date: "Feb 10",
  },
  {
    id: 5,
    name: "Promise Day",
    title: "Promise Day",
    subtitle: "Words that stay",
    emoji: "🤝",
    date: "Feb 11",
  },
  {
    id: 6,
    name: "Hug Day",
    title: "Hug Day",
    subtitle: "Feel the warmth",
    emoji: "🤗",
    date: "Feb 12",
  },
  {
    id: 7,
    name: "Kiss Day",
    title: "Kiss Day",
    subtitle: "Come a little closer",
    emoji: "💋",
    date: "Feb 13",
  },
  {
    id: 8,
    name: "Valentine's Day",
    title: "Valentine's Day",
    subtitle: "The moment it all comes together",
    emoji: "❤️",
    date: "Feb 14",
  },
];

export function getDayById(id: number): DayData | undefined {
  return days.find((day) => day.id === id);
}

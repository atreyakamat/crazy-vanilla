export type DayStatus = "locked" | "unlocked" | "today";

// Valentine week starts Feb 7, 2025
const START_DATE = new Date(2025, 1, 7);

export function getDayDate(dayId: number): Date {
  const date = new Date(START_DATE);
  date.setDate(date.getDate() + dayId - 1);
  return date;
}

export function getDayStatus(dayId: number): DayStatus {
  // Always return 'today' for unlocked access during dev/testing
  return "today";
}

export function isUnlocked(dayId: number): boolean {
  return true;
}

export function formatDayDate(dayId: number): string {
  const date = getDayDate(dayId);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getLockedMessage(dayId: number): string {
  const date = getDayDate(dayId);
  const formatted = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `Unlocks on ${formatted}`;
}

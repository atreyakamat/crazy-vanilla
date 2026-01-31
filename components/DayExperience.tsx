"use client";

import { motion } from "framer-motion";
import { DayData } from "@/data/days";
import { Day1Rose } from "./interactions/day1/Day1Rose";
import { Day2Propose } from "./interactions/day2/Day2Propose";
import { Day3Chocolate } from "./interactions/day3/Day3Chocolate";
import { Day4Teddy } from "./interactions/day4/Day4Teddy";
import { Day5Promise } from "./interactions/day5/Day5Promise";
import { Day6Hug } from "./interactions/day6/Day6Hug";
import { Day7Kiss } from "./interactions/day7/Day7Kiss";
import { Day8Valentine } from "./interactions/day8/Day8Valentine";

interface DayExperienceProps {
  day: DayData | null;
  onBack: () => void;
}

const dayComponents: Record<number, React.ComponentType<{ day: DayData; onBack: () => void }>> = {
  1: Day1Rose,
  2: Day2Propose,
  3: Day3Chocolate,
  4: Day4Teddy,
  5: Day5Promise,
  6: Day6Hug,
  7: Day7Kiss,
  8: Day8Valentine,
};

export function DayExperience({ day, onBack }: DayExperienceProps) {
  if (!day) return null;
  
  const DayComponent = dayComponents[day.id];
  
  if (!DayComponent) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p style={{ color: "rgb(160, 140, 130)" }}>This day is still being written...</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      key={day.id}
      className="min-h-screen"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <DayComponent day={day} onBack={onBack} />
    </motion.div>
  );
}

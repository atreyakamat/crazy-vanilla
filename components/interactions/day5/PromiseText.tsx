"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface PromiseTextProps {
  progress: number; // 0 to 1
  isComplete: boolean;
}

const words = ["I", "promise", "to", "keep", "choosing", "you."];

// Define reveal thresholds for each word
const wordThresholds = [0, 0.15, 0.30, 0.45, 0.65, 0.85];

export function PromiseText({ progress, isComplete }: PromiseTextProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-4">
      {words.map((word, index) => {
        const threshold = wordThresholds[index];
        const nextThreshold = wordThresholds[index + 1] || 1;
        const wordProgress = Math.max(0, Math.min(1, (progress - threshold) / (nextThreshold - threshold)));
        const isVisible = progress >= threshold;
        const isEmphasized = word === "keep" || word === "choosing";
        
        return (
          <motion.span
            key={index}
            className={`
              font-serif inline-block
              ${isEmphasized ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}
            `}
            style={{
              color: isEmphasized ? "rgb(120, 95, 75)" : "rgb(140, 115, 90)",
              letterSpacing: isEmphasized ? "0.03em" : "0.01em",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 8,
            }}
            transition={{
              duration: 0.5,
              ease: organicEasings.reveal,
            }}
          >
            {/* Character-by-character reveal within word */}
            {word.split("").map((char, charIndex) => {
              const charProgress = wordProgress;
              const charThreshold = charIndex / word.length;
              const isCharVisible = charProgress > charThreshold;
              
              return (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  animate={{
                    opacity: isCharVisible ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface IdlePromptProps {
  show: boolean;
}

const prompts = [
  "Take your time…",
  "There's no rush here.",
  "Patience is beautiful.",
  "I'll wait.",
];

export function IdlePrompt({ show }: IdlePromptProps) {
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          className="absolute bottom-24 left-0 right-0 text-center font-serif text-warm-400 text-lg italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.7, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{
            duration: 1.2,
            ease: organicEasings.fade,
          }}
        >
          {prompt}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

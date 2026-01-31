"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface RevealMessageProps {
  show: boolean;
  line1: string;
  line2: string;
}

export function RevealMessage({ show, line1, line2 }: RevealMessageProps) {
  const words1 = line1.split(" ");
  const words2 = line2.split(" ");
  
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-16 sm:pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-rose rounded-2xl p-8 sm:p-10 max-w-md mx-auto romantic-shadow">
        {/* First line */}
        <p className="font-serif text-xl sm:text-2xl text-warm-700 text-center leading-relaxed mb-3">
          {words1.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + i * 0.15,
                ease: organicEasings.reveal,
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        
        {/* Second line - more emphasis */}
        <p className="font-serif text-2xl sm:text-3xl text-warm-800 text-center leading-relaxed font-medium">
          {words2.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.8 + i * 0.18,
                ease: organicEasings.reveal,
              }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        
        {/* Subtle decorative element */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.8, ease: organicEasings.bloom }}
        >
          <span className="text-2xl">🌹</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

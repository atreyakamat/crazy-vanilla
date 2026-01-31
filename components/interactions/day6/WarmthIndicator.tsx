"use client";

import { motion } from "framer-motion";

interface WarmthIndicatorProps {
  warmth: number;
  isHolding: boolean;
  isComplete: boolean;
}

export function WarmthIndicator({ warmth, isHolding, isComplete }: WarmthIndicatorProps) {
  if (isComplete) return null;
  
  // Color shifts with warmth
  const r = 180 + warmth * 60;
  const g = 160 - warmth * 20;
  const b = 170 - warmth * 40;
  
  return (
    <motion.div
      className="absolute bottom-32 sm:bottom-36 left-0 right-0 flex justify-center"
      animate={{
        opacity: isHolding ? 0.7 : warmth > 0 ? 0.4 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        {/* Progress dots */}
        {[0.25, 0.5, 0.75, 1].map((threshold, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              scale: warmth >= threshold ? 1.2 : 1,
              background: warmth >= threshold 
                ? `rgb(${r}, ${g}, ${b})` 
                : `rgba(${180}, ${160}, ${170}, 0.3)`,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

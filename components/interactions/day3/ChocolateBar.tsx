"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface ChocolateBarProps {
  revealProgress: number; // 0 to 1
  isComplete: boolean;
}

export function ChocolateBar({ revealProgress, isComplete }: ChocolateBarProps) {
  // Chocolate becomes more vibrant as revealed
  const glowIntensity = revealProgress * 0.4;
  const highlightOpacity = 0.1 + revealProgress * 0.2;
  
  return (
    <div className="relative w-56 sm:w-64 h-28 sm:h-32">
      {/* Chocolate bar base */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: 0.9 + revealProgress * 0.1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `
            0 4px 20px rgba(80, 40, 20, ${0.2 + glowIntensity}),
            0 8px 40px rgba(60, 30, 15, ${0.15 + glowIntensity * 0.5}),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Chocolate surface */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              145deg,
              rgb(89, 60, 40) 0%,
              rgb(70, 45, 28) 30%,
              rgb(55, 35, 22) 70%,
              rgb(65, 42, 26) 100%
            )`,
          }}
        />
        
        {/* Chocolate segments grid */}
        <div className="absolute inset-3 grid grid-cols-4 grid-rows-2 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-sm relative overflow-hidden"
              style={{
                background: `linear-gradient(
                  135deg,
                  rgba(100, 70, 45, 0.6) 0%,
                  rgba(60, 40, 25, 0.4) 100%
                )`,
                boxShadow: `
                  inset 1px 1px 2px rgba(255, 255, 255, 0.05),
                  inset -1px -1px 2px rgba(0, 0, 0, 0.2)
                `,
              }}
              initial={{ opacity: 0.7 }}
              animate={{ 
                opacity: 0.7 + revealProgress * 0.3,
              }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
            >
              {/* Segment highlight */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    135deg,
                    rgba(255, 255, 255, ${highlightOpacity * 0.5}) 0%,
                    transparent 50%
                  )`,
                }}
                animate={{
                  opacity: revealProgress > 0.5 ? 1 : 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Surface shine - grows as revealed */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              120deg,
              transparent 30%,
              rgba(255, 255, 255, ${highlightOpacity}) 50%,
              transparent 70%
            )`,
          }}
          animate={{
            opacity: revealProgress,
            x: isComplete ? [0, 100, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.5 },
            x: { duration: 2, delay: 0.5, ease: "easeInOut" },
          }}
        />
        
        {/* Warmth glow on completion */}
        {isComplete && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
            style={{
              background: `radial-gradient(
                ellipse at center,
                rgba(200, 150, 100, 0.3) 0%,
                transparent 70%
              )`,
            }}
          />
        )}
      </motion.div>
      
      {/* Heart emboss on chocolate - revealed */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isComplete ? 1 : 0,
          scale: isComplete ? 1 : 0.8,
        }}
        transition={{ delay: 0.3, duration: 0.8, ease: organicEasings.bloom }}
      >
        <span className="text-3xl drop-shadow-lg">💝</span>
      </motion.div>
    </div>
  );
}

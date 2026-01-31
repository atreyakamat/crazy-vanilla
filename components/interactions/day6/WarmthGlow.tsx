"use client";

import { motion } from "framer-motion";

interface WarmthGlowProps {
  warmth: number; // 0 to 1
  isHolding: boolean;
  isComplete: boolean;
}

export function WarmthGlow({ warmth, isHolding, isComplete }: WarmthGlowProps) {
  // Visual properties mapped to warmth
  const blur = 30 - warmth * 20; // 30px -> 10px
  const innerOpacity = 0.3 + warmth * 0.4;
  const outerScale = 1 + warmth * 0.3;
  const pulseIntensity = isHolding && !isComplete ? 0.05 : 0;
  
  // Color shifts from cool to warm
  const r = 200 + warmth * 50;
  const g = 180 - warmth * 20;
  const b = 190 - warmth * 60;
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Outermost glow - expands with warmth */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 280,
          height: 280,
        }}
        animate={{
          scale: outerScale,
          opacity: 0.15 + warmth * 0.2,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.4) 0%, transparent 70%)`,
            filter: `blur(${blur + 10}px)`,
          }}
        />
      </motion.div>
      
      {/* Middle glow layer */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
        }}
        animate={{
          scale: 1 + warmth * 0.15,
          opacity: 0.3 + warmth * 0.3,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${r + 20}, ${g + 10}, ${b}, 0.5) 0%, transparent 65%)`,
            filter: `blur(${blur}px)`,
          }}
        />
      </motion.div>
      
      {/* Inner core - becomes clearer */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 120,
          height: 120,
        }}
        animate={{
          opacity: innerOpacity,
          scale: [1, 1 + pulseIntensity, 1],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${r + 30}, ${g + 20}, ${b + 10}, 0.6) 0%, rgba(${r}, ${g}, ${b}, 0.3) 60%, transparent 100%)`,
            filter: `blur(${blur * 0.5}px)`,
          }}
        />
      </motion.div>
      
      {/* Center symbol - emerges with warmth */}
      <motion.div
        className="relative z-10"
        animate={{
          opacity: 0.4 + warmth * 0.6,
          scale: 0.9 + warmth * 0.1,
          filter: `blur(${(1 - warmth) * 4}px)`,
        }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="text-5xl sm:text-6xl"
          style={{
            filter: `drop-shadow(0 0 ${10 + warmth * 20}px rgba(${r}, ${g - 30}, ${b - 40}, 0.5))`,
          }}
          animate={isComplete ? {
            scale: [1, 1.05, 1],
          } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🤗
        </motion.span>
      </motion.div>
      
      {/* Warmth particles - appear as warmth builds */}
      {warmth > 0.3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(Math.floor(warmth * 6))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                background: `rgba(${r + 20}, ${g}, ${b - 20}, ${0.3 + warmth * 0.3})`,
                left: `${50 + Math.cos(i * 1.2) * (30 + warmth * 20)}%`,
                top: `${50 + Math.sin(i * 1.2) * (30 + warmth * 20)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0.5],
                x: Math.cos(i * 0.8) * 20,
                y: Math.sin(i * 0.8) * 20 - 15,
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

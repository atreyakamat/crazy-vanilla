"use client";

import { motion } from "framer-motion";

interface FallingPetalProps {
  delay: number;
  startX: number;
  color: string;
}

export function FallingPetal({ delay, startX, color }: FallingPetalProps) {
  // Gravity-like easing - accelerates then floats
  const duration = 7 + Math.random() * 4; // Slower, more sparse
  const drift = (Math.random() - 0.5) * 80;
  const rotation = Math.random() * 180;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: startX,
        y: -60,
        rotate: rotation,
        opacity: 0,
      }}
      animate={{
        x: [startX, startX + drift * 0.3, startX + drift],
        y: ["0vh", "115vh"],
        rotate: [rotation, rotation + 60, rotation + 120],
        opacity: [0, 0.7, 0.7, 0],
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Gravity-like: slow start, steady fall
        times: [0, 0.05, 0.85, 1],
      }}
    >
      <svg
        viewBox="0 0 28 38"
        className="w-6 h-8 sm:w-10 sm:h-12"
        style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.08))" }}
      >
        <ellipse
          cx="14"
          cy="19"
          rx="11"
          ry="16"
          fill={color}
          opacity="0.8"
        />
        <ellipse
          cx="14"
          cy="19"
          rx="6"
          ry="10"
          fill={color}
          opacity="0.5"
          style={{ filter: "brightness(1.15)" }}
        />
      </svg>
    </motion.div>
  );
}

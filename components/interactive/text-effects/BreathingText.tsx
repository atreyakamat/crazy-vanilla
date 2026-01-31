"use client";

/**
 * BreathingText
 * 
 * Text that slowly expands and contracts like breathing.
 * Creates a calm, living text element.
 * 
 * @param children - Text content
 * @param intensity - Breathing scale range
 * @param duration - Breath cycle duration
 */

import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";
import { ReactNode } from "react";

interface BreathingTextProps {
  children: ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}

export function BreathingText({
  children,
  intensity = 0.03,
  duration = 4,
  className = "",
}: BreathingTextProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  
  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{
        scale: [1, 1 + intensity, 1],
        opacity: [1, 0.95, 1],
      }}
      transition={{
        duration: duration / animationSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

// Example usage:
// <BreathingText className="text-2xl text-rose-400">
//   Love breathes
// </BreathingText>

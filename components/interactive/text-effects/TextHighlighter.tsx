"use client";

/**
 * TextHighlighter
 * 
 * Creates stylized highlight effects on text.
 * Looks like marker or paint highlighting.
 * 
 * @param children - Text to highlight
 * @param color - Highlight color
 * @param animate - Animate highlight appearance
 * @param delay - Animation delay
 */

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface TextHighlighterProps {
  children: ReactNode;
  color?: string;
  animate?: boolean;
  delay?: number;
  className?: string;
}

export function TextHighlighter({
  children,
  color = "rgba(248, 180, 190, 0.3)",
  animate = true,
  delay = 0,
  className = "",
}: TextHighlighterProps) {
  const { prefersReducedMotion } = useAnimation();
  
  const shouldAnimate = animate && !prefersReducedMotion;
  
  return (
    <span className={`relative inline ${className}`}>
      <motion.span
        className="absolute inset-0 -skew-x-3 rounded"
        style={{ 
          background: color,
          zIndex: -1,
          margin: "-2px -4px",
          padding: "2px 4px",
        }}
        initial={shouldAnimate ? { scaleX: 0, originX: 0 } : undefined}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.8, 0.25, 1],
        }}
      />
      {children}
    </span>
  );
}

// Example usage:
// <p>
//   I will always <TextHighlighter>choose you</TextHighlighter>
// </p>

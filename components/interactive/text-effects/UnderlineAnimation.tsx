"use client";

/**
 * UnderlineAnimation
 * 
 * Text with animated underline effects.
 * Multiple styles: draw, expand, gradient.
 * 
 * @param children - Text content
 * @param style - Animation style
 * @param color - Underline color
 * @param thickness - Line thickness
 * @param trigger - When to animate
 */

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface UnderlineAnimationProps {
  children: ReactNode;
  style?: "draw" | "expand" | "gradient";
  color?: string;
  thickness?: number;
  trigger?: "hover" | "always" | "active";
  active?: boolean;
  className?: string;
}

export function UnderlineAnimation({
  children,
  style = "draw",
  color = "rgb(200, 160, 150)",
  thickness = 2,
  trigger = "hover",
  active = false,
  className = "",
}: UnderlineAnimationProps) {
  const { prefersReducedMotion } = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  
  const isActive = trigger === "always" || (trigger === "hover" && isHovered) || (trigger === "active" && active);
  
  const underlineVariants = {
    draw: {
      initial: { scaleX: 0, originX: 0 },
      active: { scaleX: 1 },
    },
    expand: {
      initial: { scaleX: 0, originX: 0.5 },
      active: { scaleX: 1 },
    },
    gradient: {
      initial: { opacity: 0 },
      active: { opacity: 1 },
    },
  };
  
  const variant = underlineVariants[style];
  
  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.span
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: thickness,
          background: style === "gradient" 
            ? `linear-gradient(90deg, transparent, ${color}, transparent)`
            : color,
          borderRadius: thickness / 2,
        }}
        initial={prefersReducedMotion ? "active" : "initial"}
        animate={isActive ? "active" : "initial"}
        variants={variant}
        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      />
    </span>
  );
}

// Example usage:
// <UnderlineAnimation style="draw" color="rgb(248, 180, 190)">
//   Hover for underline
// </UnderlineAnimation>

"use client";

/**
 * SimpleMarquee
 * 
 * Continuous horizontal scrolling text or content.
 * Smooth, infinite loop animation.
 * 
 * @param children - Content to scroll
 * @param speed - Scroll speed (pixels per second)
 * @param direction - Scroll direction
 * @param pauseOnHover - Pause when hovered
 */

import { ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface SimpleMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: number;
  className?: string;
}

export function SimpleMarquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  gap = 40,
  className = "",
}: SimpleMarqueeProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, [children]);
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  const duration = contentWidth / (speed * animationSpeed);
  
  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? [-contentWidth - gap, 0] : [0, -contentWidth - gap],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <div className="flex" style={{ gap }}>
          {children}
        </div>
        <div className="flex" style={{ gap, marginLeft: gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Example usage:
// <SimpleMarquee speed={30}>
//   <span className="mx-4">💕 Love 💕</span>
//   <span className="mx-4">Forever</span>
// </SimpleMarquee>

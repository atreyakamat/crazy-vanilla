"use client";

/**
 * BoxCarousel
 * 
 * Infinitely scrolling carousel of items.
 * Smooth, looping animation with hover pause.
 * 
 * @param items - Array of items to display
 * @param itemWidth - Width of each item
 * @param gap - Gap between items
 * @param speed - Scroll speed
 */

import { ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface BoxCarouselProps {
  items: ReactNode[];
  itemWidth?: number;
  gap?: number;
  speed?: number;
  className?: string;
}

export function BoxCarousel({
  items,
  itemWidth = 200,
  gap = 20,
  speed = 40,
  className = "",
}: BoxCarouselProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  
  const totalWidth = items.length * (itemWidth + gap);
  const duration = totalWidth / (speed * animationSpeed);
  
  if (prefersReducedMotion) {
    return (
      <div className={`flex overflow-x-auto ${className}`} style={{ gap }}>
        {items.map((item, i) => (
          <div key={i} style={{ minWidth: itemWidth }}>{item}</div>
        ))}
      </div>
    );
  }
  
  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex"
        animate={{
          x: [0, -totalWidth],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          gap,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Double the items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={i}
            style={{ minWidth: itemWidth, flexShrink: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Example usage:
// <BoxCarousel
//   items={memories.map(m => <MemoryCard key={m.id} {...m} />)}
//   itemWidth={180}
//   speed={30}
// />

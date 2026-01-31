"use client";

/**
 * Typewriter
 * 
 * Reveals text character by character like typing.
 * Great for emotional text reveals.
 * 
 * @param text - Text to type
 * @param speed - Characters per second
 * @param delay - Initial delay before typing
 * @param cursor - Show blinking cursor
 * @param onComplete - Callback when typing finishes
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({
  text,
  speed = 30,
  delay = 0,
  cursor = true,
  onComplete,
  className = "",
}: TypewriterProps) {
  const { prefersReducedMotion } = useAnimation();
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }
    
    setDisplayText("");
    setIsComplete(false);
    
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, 1000 / speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, prefersReducedMotion, onComplete]);
  
  return (
    <span className={className}>
      {displayText}
      <AnimatePresence>
        {cursor && !isComplete && (
          <motion.span
            className="inline-block ml-0.5"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            exit={{ opacity: 0 }}
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// Example usage:
// <Typewriter
//   text="I love you..."
//   speed={20}
//   delay={500}
//   className="font-serif text-xl"
// />

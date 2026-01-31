"use client";

/**
 * ScrambleText
 * 
 * Text that scrambles through random characters before revealing.
 * Can trigger on hover or on mount.
 * 
 * @param text - Final text to display
 * @param trigger - When to scramble ("hover" | "mount" | "manual")
 * @param scrambleSpeed - Scramble iteration speed
 * @param characters - Characters to use for scrambling
 */

import { useState, useEffect, useCallback } from "react";
import { useAnimation } from "../AnimationProvider";

interface ScrambleTextProps {
  text: string;
  trigger?: "hover" | "mount" | "manual";
  scrambleSpeed?: number;
  characters?: string;
  active?: boolean;
  className?: string;
}

const DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyz";

export function ScrambleText({
  text,
  trigger = "hover",
  scrambleSpeed = 30,
  characters = DEFAULT_CHARS,
  active = false,
  className = "",
}: ScrambleTextProps) {
  const { prefersReducedMotion } = useAnimation();
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const scramble = useCallback(() => {
    if (prefersReducedMotion || isScrambling) return;
    
    setIsScrambling(true);
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iteration += 1 / 3;
    }, scrambleSpeed);
    
    return () => clearInterval(interval);
  }, [text, scrambleSpeed, characters, prefersReducedMotion, isScrambling]);
  
  useEffect(() => {
    if (trigger === "mount") {
      scramble();
    }
  }, [trigger, scramble]);
  
  useEffect(() => {
    if (trigger === "manual" && active) {
      scramble();
    }
  }, [trigger, active, scramble]);
  
  const handleMouseEnter = () => {
    if (trigger === "hover") {
      scramble();
    }
  };
  
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }
  
  return (
    <span
      className={`${className} ${trigger === "hover" ? "cursor-pointer" : ""}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}

// Example usage:
// <ScrambleText text="Hover me" trigger="hover" className="font-mono" />

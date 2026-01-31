"use client";

/**
 * NumberTicker
 * 
 * Animates numbers counting up or down.
 * Great for statistics or countdowns.
 * 
 * @param value - Target number
 * @param duration - Animation duration
 * @param decimals - Decimal places
 * @param prefix - Text before number
 * @param suffix - Text after number
 */

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface NumberTickerProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function NumberTicker({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: NumberTickerProps) {
  const { prefersReducedMotion } = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    
    spring.set(value);
    
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(latest);
    });
    
    return unsubscribe;
  }, [value, spring, prefersReducedMotion]);
  
  const formattedValue = displayValue.toFixed(decimals);
  
  return (
    <span className={className}>
      {prefix}
      <motion.span>{formattedValue}</motion.span>
      {suffix}
    </span>
  );
}

// Example usage:
// <NumberTicker value={100} suffix="%" duration={1.5} />

"use client";

/**
 * CirclingElements
 * 
 * Creates orbiting elements around a center point.
 * Perfect for decorative, ambient animations.
 * 
 * @param items - Array of elements to orbit
 * @param radius - Orbit radius
 * @param duration - Full orbit duration
 * @param reverse - Reverse direction
 */

import { motion } from "framer-motion";
import { useAnimation } from "./AnimationProvider";
import { ReactNode } from "react";

interface CirclingElementsProps {
  items: ReactNode[];
  radius?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export function CirclingElements({
  items,
  radius = 80,
  duration = 20,
  reverse = false,
  className = "",
}: CirclingElementsProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  
  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `calc(50% + ${Math.cos((i / items.length) * Math.PI * 2) * radius}px)`,
              top: `calc(50% + ${Math.sin((i / items.length) * Math.PI * 2) * radius}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {items.map((item, i) => {
        const startAngle = (i / items.length) * 360;
        
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              marginLeft: -radius,
              marginTop: -radius,
              width: radius * 2,
              height: radius * 2,
            }}
            animate={{
              rotate: reverse ? [startAngle, startAngle - 360] : [startAngle, startAngle + 360],
            }}
            transition={{
              duration: duration / animationSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="absolute"
              style={{
                left: radius,
                top: 0,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                animate={{ rotate: reverse ? [0, 360] : [0, -360] }}
                transition={{
                  duration: duration / animationSpeed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {item}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Example usage:
// <CirclingElements
//   items={["💕", "✨", "🌸", "💫"]}
//   radius={60}
//   duration={15}
// />

"use client";

/**
 * AnimatedGradientSvg
 * 
 * Creates a flowing, organic gradient background using animated SVG circles.
 * Perfect for emotional, warm backgrounds in the Valentine experience.
 * 
 * @param colors - Array of colors for the gradient blobs
 * @param intensity - Opacity intensity (0-1)
 * @param speed - Animation speed multiplier
 * @param blur - Blur amount for soft edges
 * @param className - Additional CSS classes
 */

import { motion } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface AnimatedGradientSvgProps {
  colors?: string[];
  intensity?: number;
  speed?: number;
  blur?: number;
  className?: string;
}

export function AnimatedGradientSvg({
  colors = ["#FFB3BA", "#FFDAC1", "#BAE1FF", "#F8B4BE"],
  intensity = 0.6,
  speed = 1,
  blur = 80,
  className = "",
}: AnimatedGradientSvgProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  const effectiveSpeed = speed * animationSpeed;
  
  // Generate blob configurations
  const blobs = colors.map((color, i) => ({
    color,
    cx: 20 + (i * 25) % 80,
    cy: 20 + (i * 30) % 60,
    r: 25 + (i % 3) * 10,
    duration: (20 + i * 5) / effectiveSpeed,
    delay: i * 2,
  }));
  
  if (prefersReducedMotion) {
    // Static fallback
    return (
      <div 
        className={`absolute inset-0 -z-10 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colors.join(", ")})`,
          opacity: intensity,
        }}
      />
    );
  }
  
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="gooey-gradient">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur / 10} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="gooey"
            />
          </filter>
        </defs>
        
        <g filter="url(#gooey-gradient)" style={{ opacity: intensity }}>
          {blobs.map((blob, i) => (
            <motion.circle
              key={i}
              cx={blob.cx}
              cy={blob.cy}
              r={blob.r}
              fill={blob.color}
              animate={{
                cx: [blob.cx, blob.cx + 20, blob.cx - 10, blob.cx],
                cy: [blob.cy, blob.cy - 15, blob.cy + 20, blob.cy],
                r: [blob.r, blob.r * 1.2, blob.r * 0.9, blob.r],
              }}
              transition={{
                duration: blob.duration,
                delay: blob.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

// Example usage:
// <AnimatedGradientSvg colors={["#FFB3BA", "#FFDAC1"]} intensity={0.5} />

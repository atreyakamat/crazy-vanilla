"use client";

/**
 * TextAlongPath
 * 
 * Renders text that follows a curved SVG path.
 * Great for decorative, flowing text elements.
 * 
 * @param text - The text to display
 * @param path - SVG path data string
 * @param animate - Whether to animate along the path
 * @param duration - Animation duration
 * @param fontSize - Text size
 * @param fill - Text color
 */

import { motion } from "framer-motion";
import { useAnimation } from "./AnimationProvider";
import { useId } from "react";

interface TextAlongPathProps {
  text: string;
  path?: string;
  animate?: boolean;
  duration?: number;
  fontSize?: number;
  fill?: string;
  className?: string;
}

export function TextAlongPath({
  text,
  path = "M10,90 Q95,10 180,90 T350,90",
  animate = true,
  duration = 20,
  fontSize = 14,
  fill = "currentColor",
  className = "",
}: TextAlongPathProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  const pathId = useId();
  
  const shouldAnimate = animate && !prefersReducedMotion;
  
  return (
    <svg 
      className={`overflow-visible ${className}`}
      viewBox="0 0 360 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <path id={pathId} d={path} fill="none" />
      </defs>
      
      <motion.text
        fontSize={fontSize}
        fill={fill}
        style={{ fontFamily: "inherit" }}
      >
        <textPath 
          href={`#${pathId}`}
          startOffset={shouldAnimate ? undefined : "0%"}
        >
          {shouldAnimate ? (
            <motion.tspan
              animate={{ startOffset: ["0%", "100%"] }}
              transition={{
                duration: duration / animationSpeed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {text}
            </motion.tspan>
          ) : (
            text
          )}
        </textPath>
      </motion.text>
    </svg>
  );
}

// Example usage:
// <TextAlongPath text="Love flows endlessly ✨" fill="rgb(180, 140, 130)" />

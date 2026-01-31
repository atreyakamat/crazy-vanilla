"use client";

/**
 * ElasticLine
 * 
 * Creates an elastic, rubber-band-like line between two points.
 * The line stretches and bounces with physics.
 * 
 * @param start - Starting point coordinates
 * @param end - Ending point coordinates
 * @param color - Line color
 * @param thickness - Line thickness
 * @param tension - Spring tension
 */

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface Point {
  x: number;
  y: number;
}

interface ElasticLineProps {
  start: Point;
  end: Point;
  color?: string;
  thickness?: number;
  tension?: number;
  className?: string;
}

export function ElasticLine({
  start,
  end,
  color = "rgba(200, 160, 150, 0.5)",
  thickness = 2,
  tension = 200,
  className = "",
}: ElasticLineProps) {
  const { prefersReducedMotion } = useAnimation();
  
  // Create control point for bezier curve
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  const controlX = useSpring(midX, { stiffness: tension, damping: 20 });
  const controlY = useSpring(midY, { stiffness: tension, damping: 20 });
  
  const [path, setPath] = useState("");
  
  useEffect(() => {
    controlX.set(midX + (Math.random() - 0.5) * 20);
    controlY.set(midY + (Math.random() - 0.5) * 20);
    
    // Reset to center
    const timeout = setTimeout(() => {
      controlX.set(midX);
      controlY.set(midY);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [start, end, midX, midY, controlX, controlY]);
  
  useEffect(() => {
    const unsubX = controlX.on("change", (x) => {
      const y = controlY.get();
      setPath(`M ${start.x} ${start.y} Q ${x} ${y} ${end.x} ${end.y}`);
    });
    
    const unsubY = controlY.on("change", (y) => {
      const x = controlX.get();
      setPath(`M ${start.x} ${start.y} Q ${x} ${y} ${end.x} ${end.y}`);
    });
    
    return () => {
      unsubX();
      unsubY();
    };
  }, [start, end, controlX, controlY]);
  
  if (prefersReducedMotion) {
    return (
      <svg className={`absolute inset-0 pointer-events-none ${className}`}>
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={color}
          strokeWidth={thickness}
        />
      </svg>
    );
  }
  
  return (
    <svg className={`absolute inset-0 pointer-events-none ${className}`}>
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
    </svg>
  );
}

// Example usage:
// <ElasticLine start={{ x: 50, y: 50 }} end={{ x: 200, y: 150 }} />

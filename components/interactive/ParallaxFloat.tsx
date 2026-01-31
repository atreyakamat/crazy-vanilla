"use client";

/**
 * ParallaxFloat
 * 
 * Creates floating elements with depth-based parallax motion.
 * Responds to mouse movement for immersive 3D-like effect.
 * 
 * @param children - Elements to float
 * @param depth - Parallax depth (higher = more movement)
 * @param float - Enable floating animation
 * @param floatIntensity - Floating movement range
 * @param floatSpeed - Floating animation speed
 */

import { useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface ParallaxFloatProps {
  children: ReactNode;
  depth?: number;
  float?: boolean;
  floatIntensity?: number;
  floatSpeed?: number;
  className?: string;
}

export function ParallaxFloat({
  children,
  depth = 1,
  float = true,
  floatIntensity = 10,
  floatSpeed = 4,
  className = "",
}: ParallaxFloatProps) {
  const { prefersReducedMotion, animationSpeed } = useAnimation();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20 * depth, 20 * depth]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20 * depth, 20 * depth]), springConfig);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set((clientX / window.innerWidth) - 0.5);
      mouseY.set((clientY / window.innerHeight) - 0.5);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY]);
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      style={{ x, y }}
      animate={float ? {
        y: [0, -floatIntensity, 0],
      } : undefined}
      transition={float ? {
        duration: floatSpeed / animationSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Example usage:
// <ParallaxFloat depth={2} floatIntensity={15}>
//   <div className="text-4xl">🌹</div>
// </ParallaxFloat>

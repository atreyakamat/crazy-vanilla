"use client";

/**
 * CursorAttractor
 * 
 * Creates elements that are attracted to or repelled by the cursor.
 * Adds playful physics-based interaction.
 * 
 * @param children - Elements to apply attraction to
 * @param strength - Attraction force (negative for repulsion)
 * @param radius - Effect radius in pixels
 * @param damping - Movement smoothing
 */

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface CursorAttractorProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  damping?: number;
  className?: string;
}

export function CursorAttractor({
  children,
  strength = 30,
  radius = 200,
  damping = 20,
  className = "",
}: CursorAttractorProps) {
  const { prefersReducedMotion } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping });
  const springY = useSpring(y, { stiffness: 150, damping });
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < radius) {
        const force = (1 - distance / radius) * strength;
        x.set(dx * force / distance || 0);
        y.set(dy * force / distance || 0);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    
    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };
    
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion, radius, strength, x, y]);
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

// Example usage:
// <CursorAttractor strength={20}>
//   <div className="w-20 h-20 rounded-full bg-rose-200" />
// </CursorAttractor>

"use client";

/**
 * Gravity
 * 
 * Applies gravity physics to child elements.
 * Elements fall and bounce with realistic motion.
 * 
 * @param children - Elements to apply gravity to
 * @param gravity - Gravity strength
 * @param bounce - Bounce factor (0-1)
 * @param friction - Ground friction
 */

import { useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface GravityProps {
  children: ReactNode;
  gravity?: number;
  bounce?: number;
  friction?: number;
  groundY?: number;
  className?: string;
}

export function Gravity({
  children,
  gravity = 0.5,
  bounce = 0.6,
  friction = 0.98,
  groundY,
  className = "",
}: GravityProps) {
  const { prefersReducedMotion } = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityY = useRef(0);
  const y = useMotionValue(0);
  
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;
    
    const ground = groundY ?? (containerRef.current.parentElement?.clientHeight || 400);
    let animationFrame: number;
    
    const update = () => {
      velocityY.current += gravity;
      velocityY.current *= friction;
      
      let newY = y.get() + velocityY.current;
      
      // Bounce off ground
      const elementHeight = containerRef.current?.clientHeight || 0;
      if (newY > ground - elementHeight) {
        newY = ground - elementHeight;
        velocityY.current *= -bounce;
      }
      
      y.set(newY);
      
      // Stop when settled
      if (Math.abs(velocityY.current) > 0.1 || newY < ground - elementHeight - 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };
    
    animationFrame = requestAnimationFrame(update);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [prefersReducedMotion, gravity, bounce, friction, groundY, y]);
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

// Example usage:
// <Gravity gravity={0.3} bounce={0.5}>
//   <div className="w-8 h-8 rounded-full bg-rose-300" />
// </Gravity>

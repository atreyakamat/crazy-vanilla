"use client";

/**
 * PixelTrail
 * 
 * Creates a soft particle trail following the cursor/touch.
 * Adds subtle life and responsiveness to interactions.
 * 
 * @param color - Trail particle color
 * @param size - Base particle size
 * @param count - Number of trail particles
 * @param decay - How quickly particles fade
 * @param enabled - Whether trail is active
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface PixelTrailProps {
  color?: string;
  size?: number;
  count?: number;
  decay?: number;
  enabled?: boolean;
}

export function PixelTrail({
  color = "rgba(248, 180, 190, 0.6)",
  size = 8,
  count = 12,
  decay = 0.92,
  enabled = true,
}: PixelTrailProps) {
  const { prefersReducedMotion, isTouch } = useAnimation();
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  
  const addParticle = useCallback((x: number, y: number) => {
    // Only add if moved enough
    const dx = x - lastPosition.current.x;
    const dy = y - lastPosition.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 10) return;
    
    lastPosition.current = { x, y };
    
    const newParticle: Particle = {
      id: particleId.current++,
      x,
      y,
      size: size * (0.8 + Math.random() * 0.4),
      opacity: 1,
    };
    
    setParticles(prev => [...prev.slice(-count + 1), newParticle]);
  }, [count, size]);
  
  // Decay particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, opacity: p.opacity * decay }))
          .filter(p => p.opacity > 0.05)
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [decay]);
  
  // Track mouse/touch
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;
    
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const point = "touches" in e ? e.touches[0] : e;
      if (point) {
        addParticle(point.clientX, point.clientY);
      }
    };
    
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [enabled, prefersReducedMotion, addParticle]);
  
  if (!enabled || prefersReducedMotion) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
              opacity: particle.opacity,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Example usage:
// <PixelTrail color="rgba(248, 180, 190, 0.5)" size={6} />

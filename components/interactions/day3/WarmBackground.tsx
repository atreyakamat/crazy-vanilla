"use client";

import { motion } from "framer-motion";

interface WarmBackgroundProps {
  revealProgress: number;
}

export function WarmBackground({ revealProgress }: WarmBackgroundProps) {
  const warmth = 0.1 + revealProgress * 0.15;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - warm cocoa blended with cream */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(
            150deg,
            rgb(${255 - revealProgress * 10}, ${248 - revealProgress * 8}, ${240 - revealProgress * 15}) 0%,
            rgb(${250 - revealProgress * 15}, ${235 - revealProgress * 20}, ${220 - revealProgress * 25}) 30%,
            rgb(${245 - revealProgress * 20}, ${225 - revealProgress * 25}, ${205 - revealProgress * 30}) 60%,
            rgb(${255 - revealProgress * 8}, ${245 - revealProgress * 12}, ${235 - revealProgress * 18}) 100%
          )`,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Warm ambient glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            rgba(180, 140, 100, ${warmth}) 0%,
            transparent 60%
          )`,
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Cozy ambient drift - slower, warmer */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            `radial-gradient(ellipse at 30% 40%, rgba(200, 160, 120, 0.15) 0%, transparent 50%)`,
            `radial-gradient(ellipse at 70% 60%, rgba(200, 160, 120, 0.15) 0%, transparent 50%)`,
            `radial-gradient(ellipse at 30% 40%, rgba(200, 160, 120, 0.15) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle grain */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Warm vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(160, 120, 80, 0.08) 100%
          )`,
        }}
      />
      
      {/* Floating warmth particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: `rgba(200, 160, 100, ${0.1 + i * 0.05})`,
            left: `${20 + i * 20}%`,
            top: `${25 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}

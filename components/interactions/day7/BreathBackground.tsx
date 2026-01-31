"use client";

import { motion } from "framer-motion";

interface BreathBackgroundProps {
  proximity: number;
  isMerged: boolean;
}

export function BreathBackground({ proximity, isMerged }: BreathBackgroundProps) {
  // Warmth increases with proximity
  const warmth = proximity * 0.3;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - minimal, warm-neutral */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isMerged
            ? `linear-gradient(
                170deg,
                rgb(255, 252, 250) 0%,
                rgb(253, 248, 245) 50%,
                rgb(255, 250, 248) 100%
              )`
            : `linear-gradient(
                170deg,
                rgb(${254 + warmth * 2}, ${251 - warmth * 3}, ${250 - warmth * 5}) 0%,
                rgb(${252 + warmth * 3}, ${247 - warmth * 4}, ${245 - warmth * 8}) 50%,
                rgb(${255 + warmth}, ${250 - warmth * 2}, ${248 - warmth * 5}) 100%
              )`,
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Center warmth - builds with proximity */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            rgba(245, 210, 205, ${isMerged ? 0.15 : proximity * 0.12}) 0%,
            transparent ${30 + proximity * 20}%
          )`,
        }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Almost imperceptible ambient - holds breath */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={{
          background: [
            `radial-gradient(ellipse at 48% 48%, rgba(240, 220, 215, 0.05) 0%, transparent 35%)`,
            `radial-gradient(ellipse at 52% 52%, rgba(240, 220, 215, 0.05) 0%, transparent 35%)`,
            `radial-gradient(ellipse at 48% 48%, rgba(240, 220, 215, 0.05) 0%, transparent 35%)`,
          ],
        }}
        transition={{
          duration: 60, // Very slow - breath held
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Minimal grain */}
      <div 
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

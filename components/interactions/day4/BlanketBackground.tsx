"use client";

import { motion } from "framer-motion";

interface BlanketBackgroundProps {
  isHugging: boolean;
}

export function BlanketBackground({ isHugging }: BlanketBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - warm blanket gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isHugging
            ? `linear-gradient(
                155deg,
                rgb(255, 250, 242) 0%,
                rgb(252, 242, 228) 30%,
                rgb(248, 235, 218) 60%,
                rgb(255, 248, 238) 100%
              )`
            : `linear-gradient(
                155deg,
                rgb(255, 252, 247) 0%,
                rgb(250, 240, 225) 30%,
                rgb(245, 232, 215) 60%,
                rgb(252, 245, 235) 100%
              )`,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Warmth glow - intensifies on hug */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            rgba(220, 190, 150, ${isHugging ? 0.2 : 0.1}) 0%,
            transparent 60%
          )`,
        }}
        transition={{ duration: 1 }}
      />
      
      {/* Very slow ambient drift - slowest of all days */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            `radial-gradient(ellipse at 35% 35%, rgba(210, 180, 140, 0.12) 0%, transparent 45%)`,
            `radial-gradient(ellipse at 65% 65%, rgba(210, 180, 140, 0.12) 0%, transparent 45%)`,
            `radial-gradient(ellipse at 35% 35%, rgba(210, 180, 140, 0.12) 0%, transparent 45%)`,
          ],
        }}
        transition={{
          duration: 40, // Slowest ambient motion
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle fabric-like texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gentle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(200, 170, 130, 0.06) 100%
          )`,
        }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

interface FocusedBackgroundProps {
  isComplete: boolean;
}

export function FocusedBackground({ isComplete }: FocusedBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - pure, calm gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isComplete
            ? `linear-gradient(
                165deg,
                rgb(255, 253, 250) 0%,
                rgb(252, 248, 243) 50%,
                rgb(255, 252, 248) 100%
              )`
            : `linear-gradient(
                165deg,
                rgb(255, 254, 252) 0%,
                rgb(250, 247, 242) 50%,
                rgb(255, 253, 250) 100%
              )`,
        }}
        transition={{ duration: 2 }}
      />
      
      {/* Very subtle center warmth on completion */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(
            ellipse at 50% 45%,
            rgba(200, 175, 150, ${isComplete ? 0.08 : 0.03}) 0%,
            transparent 50%
          )`,
        }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Minimal ambient - almost imperceptible */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            `radial-gradient(ellipse at 45% 45%, rgba(190, 170, 150, 0.05) 0%, transparent 40%)`,
            `radial-gradient(ellipse at 55% 55%, rgba(190, 170, 150, 0.05) 0%, transparent 40%)`,
            `radial-gradient(ellipse at 45% 45%, rgba(190, 170, 150, 0.05) 0%, transparent 40%)`,
          ],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Barely-there grain */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

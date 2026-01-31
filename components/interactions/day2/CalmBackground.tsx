"use client";

import { motion } from "framer-motion";

interface CalmBackgroundProps {
  stability: number; // 0 to 1 - affects blur and warmth
}

export function CalmBackground({ stability }: CalmBackgroundProps) {
  // Environment responds to stability
  const warmth = stability * 0.15;
  const clarity = stability * 0.3;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - calm neutral gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(
            160deg,
            rgb(${255 - stability * 5}, ${253 - stability * 3}, ${251 - stability * 5}) 0%,
            rgb(${254 + warmth * 10}, ${249 - warmth * 20}, ${245 - warmth * 30}) 50%,
            rgb(${255 - stability * 3}, ${251 - stability * 5}, ${249 - stability * 8}) 100%
          )`,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Very slow ambient drift - almost imperceptible */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse at 40% 30%, rgba(240, 220, 210, ${0.08 + warmth}) 0%, transparent 50%)`,
            `radial-gradient(ellipse at 60% 70%, rgba(240, 220, 210, ${0.08 + warmth}) 0%, transparent 50%)`,
            `radial-gradient(ellipse at 40% 30%, rgba(240, 220, 210, ${0.08 + warmth}) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 30, // Very slow
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle grain - slightly reduced */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette that softens with stability */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at center, 
            transparent ${50 + clarity * 20}%, 
            rgba(240, 230, 220, ${0.15 - stability * 0.1}) 100%)`,
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Single, slow floating element - optional, very subtle */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "rgba(220, 200, 190, 0.2)",
          left: "70%",
          top: "25%",
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

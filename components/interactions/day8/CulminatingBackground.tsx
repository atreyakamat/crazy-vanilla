"use client";

import { motion } from "framer-motion";

interface CulminatingBackgroundProps {
  convergence: number;
  isResolved: boolean;
}

export function CulminatingBackground({ convergence, isResolved }: CulminatingBackgroundProps) {
  // Blend of all days - warm, soft, balanced
  const warmth = isResolved ? 1 : convergence;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - refined warm gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(
            165deg,
            rgb(${255 - warmth * 2}, ${252 - warmth * 4}, ${250 - warmth * 8}) 0%,
            rgb(${253 - warmth * 3}, ${247 - warmth * 6}, ${243 - warmth * 12}) 35%,
            rgb(${251 - warmth * 4}, ${244 - warmth * 8}, ${238 - warmth * 15}) 65%,
            rgb(${254 - warmth * 2}, ${250 - warmth * 5}, ${247 - warmth * 10}) 100%
          )`,
        }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Central warmth - grows with resolution */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            rgba(235, 205, 195, ${isResolved ? 0.2 : warmth * 0.15}) 0%,
            transparent ${40 + warmth * 20}%
          )`,
        }}
        transition={{ duration: 2 }}
      />
      
      {/* Extremely slow ambient - nearly still */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            `radial-gradient(ellipse at 48% 48%, rgba(230, 210, 200, 0.08) 0%, transparent 35%)`,
            `radial-gradient(ellipse at 52% 52%, rgba(230, 210, 200, 0.08) 0%, transparent 35%)`,
            `radial-gradient(ellipse at 48% 48%, rgba(230, 210, 200, 0.08) 0%, transparent 35%)`,
          ],
        }}
        transition={{
          duration: 90, // Extremely slow - rest
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Soft vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(220, 200, 190, 0.06) 100%
          )`,
        }}
      />
      
      {/* Minimal grain */}
      <div 
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

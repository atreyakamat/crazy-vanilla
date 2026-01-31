"use client";

import { motion } from "framer-motion";

interface PresenceBackgroundProps {
  warmth: number; // 0 to 1
}

export function PresenceBackground({ warmth }: PresenceBackgroundProps) {
  // Color temperature shift - cool to warm
  // Start: cool beige/lavender, End: warm rose/cream
  const bgR1 = 248 + warmth * 7;
  const bgG1 = 245 - warmth * 5;
  const bgB1 = 250 - warmth * 15;
  
  const bgR2 = 245 + warmth * 10;
  const bgG2 = 238 - warmth * 8;
  const bgB2 = 245 - warmth * 20;
  
  const bgR3 = 250 + warmth * 5;
  const bgG3 = 242 - warmth * 10;
  const bgB3 = 248 - warmth * 18;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - shifts from cool to warm */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(
            160deg,
            rgb(${bgR1}, ${bgG1}, ${bgB1}) 0%,
            rgb(${bgR2}, ${bgG2}, ${bgB2}) 50%,
            rgb(${bgR3}, ${bgG3}, ${bgB3}) 100%
          )`,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* Central warmth glow - grows with warmth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(
            ellipse at 50% 50%,
            rgba(${220 + warmth * 30}, ${180 + warmth * 10}, ${170 + warmth * 10}, ${warmth * 0.2}) 0%,
            transparent ${40 + warmth * 20}%
          )`,
        }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Subtle ambient - slows down as warmth increases */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse at 40% 40%, rgba(${210 + warmth * 20}, ${190 - warmth * 10}, ${200 - warmth * 20}, 0.08) 0%, transparent 40%)`,
            `radial-gradient(ellipse at 60% 60%, rgba(${210 + warmth * 20}, ${190 - warmth * 10}, ${200 - warmth * 20}, 0.08) 0%, transparent 40%)`,
            `radial-gradient(ellipse at 40% 40%, rgba(${210 + warmth * 20}, ${190 - warmth * 10}, ${200 - warmth * 20}, 0.08) 0%, transparent 40%)`,
          ],
        }}
        transition={{
          duration: 30 + warmth * 20, // Slows as warmth builds
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Soft vignette - warms at edges */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(
            ellipse at center,
            transparent ${50 + warmth * 10}%,
            rgba(${200 + warmth * 40}, ${170 + warmth * 20}, ${160 + warmth * 20}, ${0.05 + warmth * 0.05}) 100%
          )`,
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Minimal grain */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

interface PresenceFormProps {
  x: number;
  y: number;
  proximity: number; // 0 = far apart, 1 = touching
  isMerged: boolean;
  side: "left" | "right";
}

export function PresenceForm({ x, y, proximity, isMerged, side }: PresenceFormProps) {
  // Visual properties based on proximity
  const blur = 12 - proximity * 10; // 12px -> 2px
  const opacity = 0.5 + proximity * 0.4;
  const scale = 1 + proximity * 0.1;
  
  // Colors deepen with proximity
  const isLeft = side === "left";
  const baseHue = isLeft ? 350 : 355; // Slightly different warm tones
  const saturation = 20 + proximity * 30;
  const lightness = 75 - proximity * 10;
  
  // Glow intensifies
  const glowOpacity = 0.2 + proximity * 0.4;
  const glowSize = 40 + proximity * 30;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
      }}
      animate={{
        x: isMerged ? 0 : x,
        y: isMerged ? 0 : y,
        scale: isMerged ? 1.2 : scale,
        opacity: isMerged ? 0 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 60, damping: 20 },
        y: { type: "spring", stiffness: 60, damping: 20 },
        scale: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: 1.5, ease: "easeOut" },
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 100,
          height: 100,
          left: -50,
          top: -50,
          background: `radial-gradient(circle, 
            hsla(${baseHue}, ${saturation}%, ${lightness}%, ${glowOpacity}) 0%, 
            transparent 70%)`,
          filter: `blur(${glowSize}px)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main form */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          background: `radial-gradient(circle at 30% 30%, 
            hsla(${baseHue}, ${saturation + 10}%, ${lightness + 10}%, ${opacity}) 0%,
            hsla(${baseHue}, ${saturation}%, ${lightness - 5}%, ${opacity * 0.8}) 60%,
            hsla(${baseHue}, ${saturation - 5}%, ${lightness - 10}%, ${opacity * 0.6}) 100%)`,
          filter: `blur(${blur}px)`,
          boxShadow: `0 0 ${20 + proximity * 20}px hsla(${baseHue}, ${saturation}%, ${lightness}%, ${glowOpacity})`,
        }}
      />
      
      {/* Inner highlight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 30,
          height: 30,
          left: -15,
          top: -20,
          background: `radial-gradient(circle, 
            rgba(255, 255, 255, ${0.1 + proximity * 0.2}) 0%, 
            transparent 70%)`,
          filter: `blur(${blur * 0.5}px)`,
        }}
      />
    </motion.div>
  );
}

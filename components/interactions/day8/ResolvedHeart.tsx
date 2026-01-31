"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface ResolvedHeartProps {
  show: boolean;
}

export function ResolvedHeart({ show }: ResolvedHeartProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: organicEasings.bloom }}
    >
      {/* Outer glow - warmth of all days combined */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          left: -90,
          top: -90,
          background: `radial-gradient(circle,
            rgba(235, 200, 190, 0.4) 0%,
            rgba(225, 190, 180, 0.2) 40%,
            transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Heart shape - soft, abstract */}
      <motion.div
        className="relative"
        initial={{ rotate: -5 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1.5, ease: organicEasings.settle }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24"
          style={{ filter: "drop-shadow(0 0 20px rgba(220, 180, 170, 0.5))" }}
        >
          <defs>
            <radialGradient id="heartGradientFinal" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="rgba(245, 215, 205, 0.95)" />
              <stop offset="50%" stopColor="rgba(235, 195, 185, 0.9)" />
              <stop offset="100%" stopColor="rgba(220, 175, 165, 0.85)" />
            </radialGradient>
          </defs>
          
          <motion.path
            d="M50 88 
               C25 70, 8 50, 12 32 
               C16 14, 35 10, 50 28 
               C65 10, 84 14, 88 32 
               C92 50, 75 70, 50 88Z"
            fill="url(#heartGradientFinal)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: organicEasings.bloom }}
          />
          
          {/* Inner highlight */}
          <motion.ellipse
            cx="38"
            cy="38"
            rx="10"
            ry="12"
            fill="rgba(255, 255, 255, 0.25)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </svg>
      </motion.div>
      
      {/* Settling particles - memories becoming one */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: `rgba(${230 + i * 3}, ${195 - i * 5}, ${185 - i * 5}, 0.6)`,
          }}
          initial={{
            x: Math.cos((i / 7) * Math.PI * 2) * 60,
            y: Math.sin((i / 7) * Math.PI * 2) * 60,
            opacity: 0,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5 + i * 0.15,
            ease: organicEasings.settle,
          }}
        />
      ))}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface StabilityRingProps {
  progress: number; // 0 to 100
  isHolding: boolean;
  isComplete: boolean;
}

export function StabilityRing({ progress, isHolding, isComplete }: StabilityRingProps) {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        className="w-48 h-48 -rotate-90"
        viewBox="0 0 160 160"
      >
        {/* Background ring - very subtle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="rgba(200, 180, 170, 0.1)"
          strokeWidth="2"
        />
        
        {/* Progress ring */}
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ 
            strokeDashoffset: isComplete ? 0 : strokeDashoffset,
            opacity: isHolding || progress > 0 ? 0.7 : 0,
          }}
          transition={{
            strokeDashoffset: { duration: 0.1, ease: "linear" },
            opacity: { duration: 0.4, ease: organicEasings.fade },
          }}
        />
        
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(220, 170, 160, 0.6)" />
            <stop offset="100%" stopColor="rgba(200, 140, 130, 0.8)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Completion burst */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-warm-300"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0,
              }}
              animate={{ 
                x: Math.cos((i / 8) * Math.PI * 2) * 60,
                y: Math.sin((i / 8) * Math.PI * 2) * 60,
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: organicEasings.drift,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

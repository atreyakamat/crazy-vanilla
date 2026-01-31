"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface PromiseUnderlineProps {
  progress: number; // 0 to 1
  isComplete: boolean;
  isInteracting: boolean;
}

export function PromiseUnderline({ progress, isComplete, isInteracting }: PromiseUnderlineProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto h-1 mt-2">
      {/* Background line - subtle guide */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(180, 160, 140, 0.15)" }}
        animate={{
          opacity: isComplete ? 0 : 0.5,
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Drawn underline */}
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full origin-left"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(160, 130, 110, 0.6) 0%,
            rgba(180, 150, 125, 0.8) 50%,
            rgba(160, 130, 110, 0.6) 100%
          )`,
          width: "100%",
          scaleX: progress,
        }}
        animate={{
          opacity: progress > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Writing point indicator */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          left: `${progress * 100}%`,
          background: "rgba(160, 130, 110, 0.8)",
          boxShadow: "0 0 8px rgba(160, 130, 110, 0.4)",
        }}
        animate={{
          opacity: isInteracting && !isComplete ? 0.8 : 0,
          scale: isInteracting ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Completion glow */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2] }}
          transition={{ duration: 1.5, ease: organicEasings.fade }}
          style={{
            background: "rgba(180, 150, 125, 0.3)",
            boxShadow: "0 0 12px rgba(180, 150, 125, 0.3)",
          }}
        />
      )}
    </div>
  );
}

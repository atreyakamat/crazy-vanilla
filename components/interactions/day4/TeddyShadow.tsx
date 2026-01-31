"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface TeddyShadowProps {
  offsetX: number;
  offsetY: number;
  isHugging: boolean;
  isDragging: boolean;
}

export function TeddyShadow({ offsetX, offsetY, isHugging, isDragging }: TeddyShadowProps) {
  // Shadow stretches based on offset from center
  const stretchX = 1 + Math.abs(offsetX) * 0.002;
  const stretchY = 1 - Math.abs(offsetY) * 0.001;
  const shadowOffsetX = offsetX * 0.1;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        bottom: -20,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      animate={{
        x: shadowOffsetX,
        scaleX: isHugging ? 1.3 : stretchX,
        scaleY: isHugging ? 0.7 : stretchY,
        opacity: isDragging ? 0.15 : isHugging ? 0.25 : 0.2,
      }}
      transition={{
        type: "tween",
        duration: 0.4,
        ease: organicEasings.settle,
      }}
    >
      <div
        className="w-28 h-6 sm:w-36 sm:h-8 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(120, 90, 60, 0.4) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

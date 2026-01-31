"use client";

import { motion } from "framer-motion";

interface HugZoneProps {
  isActive: boolean;
  isNear: boolean;
}

export function HugZone({ isActive, isNear }: HugZoneProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        border: "2px dashed",
        borderColor: "rgba(200, 170, 130, 0.3)",
      }}
      animate={{
        scale: isNear ? 1.1 : [1, 1.05, 1],
        opacity: isActive ? 0 : isNear ? 0.6 : 0.25,
        borderColor: isNear 
          ? "rgba(200, 160, 120, 0.5)" 
          : "rgba(200, 170, 130, 0.3)",
      }}
      transition={{
        scale: isNear 
          ? { duration: 0.3 } 
          : { duration: 3, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.4 },
      }}
    />
  );
}

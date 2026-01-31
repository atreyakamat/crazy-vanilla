"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface MergedFormProps {
  show: boolean;
}

export function MergedForm({ show }: MergedFormProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: organicEasings.bloom }}
    >
      {/* Outer glow - unified warmth */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          left: -100,
          top: -100,
          background: `radial-gradient(circle, 
            rgba(240, 200, 195, 0.4) 0%, 
            rgba(235, 190, 185, 0.2) 40%,
            transparent 70%)`,
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main merged form */}
      <motion.div
        className="relative rounded-full"
        style={{
          width: 100,
          height: 100,
          marginLeft: -50,
          marginTop: -50,
          background: `radial-gradient(circle at 40% 35%,
            rgba(250, 220, 215, 0.9) 0%,
            rgba(240, 200, 195, 0.8) 40%,
            rgba(230, 185, 180, 0.7) 70%,
            rgba(220, 175, 170, 0.6) 100%)`,
          filter: "blur(3px)",
          boxShadow: `
            0 0 40px rgba(240, 195, 190, 0.5),
            0 0 80px rgba(230, 180, 175, 0.3)
          `,
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Soft inner light */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 40,
          height: 40,
          left: -20,
          top: -25,
          background: `radial-gradient(circle, 
            rgba(255, 255, 255, 0.3) 0%, 
            transparent 70%)`,
          filter: "blur(4px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </motion.div>
  );
}

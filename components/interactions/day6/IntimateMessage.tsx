"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface IntimateMessageProps {
  show: boolean;
}

export function IntimateMessage({ show }: IntimateMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-16 sm:pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
    >
      <motion.div
        className="max-w-sm mx-auto text-center"
        initial={{ y: 15 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: organicEasings.settle }}
      >
        {/* First line */}
        <motion.p
          className="font-serif text-xl sm:text-2xl leading-relaxed mb-2"
          style={{ color: "rgb(160, 120, 110)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          That warmth?
        </motion.p>
        
        {/* Second line - the reveal */}
        <motion.p
          className="font-serif text-2xl sm:text-3xl leading-relaxed"
          style={{ 
            color: "rgb(140, 100, 90)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          That's you.
        </motion.p>
        
        {/* Subtle heart */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 3, duration: 0.8, ease: organicEasings.bloom }}
        >
          <span className="text-xl">💕</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

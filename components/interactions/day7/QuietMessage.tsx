"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface QuietMessageProps {
  show: boolean;
}

export function QuietMessage({ show }: QuietMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-16 sm:pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
    >
      <motion.div
        className="max-w-sm mx-auto text-center"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, delay: 1.8, ease: organicEasings.settle }}
      >
        {/* First line */}
        <motion.p
          className="font-serif text-xl sm:text-2xl leading-relaxed mb-2"
          style={{ 
            color: "rgba(170, 140, 135, 0.9)",
            letterSpacing: "0.04em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          Some closeness
        </motion.p>
        
        {/* Second line */}
        <motion.p
          className="font-serif text-xl sm:text-2xl leading-relaxed"
          style={{ 
            color: "rgba(160, 130, 125, 0.9)",
            letterSpacing: "0.04em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.8 }}
        >
          doesn't need words.
        </motion.p>
        
        {/* Subtle symbol */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <span className="text-lg">💋</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

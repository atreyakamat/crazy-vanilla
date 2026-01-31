"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface SweetMessageProps {
  show: boolean;
}

export function SweetMessage({ show }: SweetMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-16 sm:pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="max-w-sm mx-auto text-center">
        {/* First line */}
        <motion.p
          className="font-serif text-xl sm:text-2xl leading-relaxed mb-2"
          style={{ color: "rgb(120, 85, 60)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: organicEasings.reveal,
          }}
        >
          Some things are sweeter
        </motion.p>
        
        {/* Second line - slight emphasis */}
        <motion.p
          className="font-serif text-xl sm:text-2xl leading-relaxed"
          style={{ color: "rgb(100, 70, 45)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.8,
            ease: organicEasings.reveal,
          }}
        >
          when you take your time.
        </motion.p>
        
        {/* Decorative element */}
        <motion.div
          className="mt-6 flex justify-center items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <div className="w-6 h-px" style={{ background: "rgb(180, 140, 100)" }} />
          <span className="text-lg">🍫</span>
          <div className="w-6 h-px" style={{ background: "rgb(180, 140, 100)" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

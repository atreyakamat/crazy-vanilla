"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface VowMessageProps {
  show: boolean;
}

export function VowMessage({ show }: VowMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-20 sm:pb-24 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      {/* Simple divider */}
      <motion.div
        className="w-12 h-px mb-4"
        style={{ background: "rgba(160, 140, 120, 0.3)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: organicEasings.fade }}
      />
      
      {/* Quiet affirmation */}
      <motion.p
        className="text-sm tracking-wide"
        style={{ color: "rgba(160, 140, 120, 0.6)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        — and I mean it.
      </motion.p>
    </motion.div>
  );
}

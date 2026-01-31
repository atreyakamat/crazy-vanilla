"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface ComfortMessageProps {
  show: boolean;
}

export function ComfortMessage({ show }: ComfortMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-16 sm:pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8 }}
    >
      <motion.div
        className="max-w-sm mx-auto text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1, ease: organicEasings.settle }}
      >
        <motion.p
          className="font-serif text-2xl sm:text-3xl leading-relaxed tracking-wide"
          style={{ 
            color: "rgb(140, 105, 75)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            delay: 1.2,
            ease: organicEasings.fade,
          }}
        >
          You make things feel safe.
        </motion.p>
        
        {/* Small decorative element */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-xl">🧸</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

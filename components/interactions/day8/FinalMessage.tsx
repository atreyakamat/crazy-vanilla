"use client";

import { motion } from "framer-motion";

interface FinalMessageProps {
  show: boolean;
}

export function FinalMessage({ show }: FinalMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-20 sm:pb-28 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }} // Opacity only - breathing in
    >
      <motion.div
        className="max-w-md mx-auto text-center"
      >
        {/* First line */}
        <motion.p
          className="font-serif text-xl sm:text-2xl leading-relaxed mb-3"
          style={{ 
            color: "rgba(148, 118, 108, 0.88)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.8 }} // Opacity only
        >
          This wasn't a week.
        </motion.p>
        
        {/* Second line - the truth */}
        <motion.p
          className="font-serif text-2xl sm:text-3xl leading-relaxed"
          style={{ 
            color: "rgba(128, 98, 88, 0.92)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 2.8 }} // Opacity only
        >
          This was how I love you.
        </motion.p>
        
        {/* Gentle signature */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 2 }} // Long wait, opacity only
        >
          <motion.p
            className="text-sm mb-1"
            style={{ color: "rgba(168, 148, 138, 0.55)" }}
          >
            with all my love,
          </motion.p>
          <motion.p
            className="font-serif text-lg"
            style={{ color: "rgba(148, 123, 113, 0.75)" }}
          >
            — Forever Yours
          </motion.p>
        </motion.div>
        
        {/* Valentine acknowledgment - screen rests indefinitely */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 8, duration: 1.5 }}
        >
          <span className="text-2xl">❤️</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

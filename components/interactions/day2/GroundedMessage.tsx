"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface GroundedMessageProps {
  show: boolean;
}

export function GroundedMessage({ show }: GroundedMessageProps) {
  if (!show) return null;
  
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center pb-20 sm:pb-24 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-sm mx-auto text-center">
        {/* First line */}
        <motion.p
          className="font-serif text-xl sm:text-2xl text-warm-600 leading-relaxed mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: organicEasings.reveal,
          }}
        >
          This is me choosing you.
        </motion.p>
        
        {/* Second line - emphasis words with spacing */}
        <motion.p
          className="text-warm-500 text-lg sm:text-xl tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 2.4,
              ease: organicEasings.reveal,
            }}
          >
            Calmly.
          </motion.span>
          <span className="inline-block w-6" />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 3.0,
              ease: organicEasings.reveal,
            }}
          >
            Sincerely.
          </motion.span>
        </motion.p>
        
        {/* Small decorative element - very subtle */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <div className="w-8 h-px bg-warm-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}

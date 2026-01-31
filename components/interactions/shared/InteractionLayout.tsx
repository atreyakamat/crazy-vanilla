"use client";

import { motion } from "framer-motion";
import { DayData } from "@/data/days";
import { fadeUpVariants } from "@/lib/animations";
import { ArrowLeft } from "lucide-react";

interface InteractionLayoutProps {
  day: DayData;
  onBack: () => void;
  children: React.ReactNode;
  showMessage?: boolean;
  customMessage?: string;
}

export function InteractionLayout({ 
  day, 
  onBack, 
  children, 
  showMessage = false,
  customMessage,
}: InteractionLayoutProps) {
  return (
    <div className={`
      min-h-screen flex flex-col
      bg-gradient-to-br ${day.gradientFrom} ${day.gradientTo}
    `}>
      {/* Header */}
      <motion.header 
        className="relative z-50 p-4 sm:p-6"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-warm-500 hover:text-warm-700 transition-colors"
        >
          <motion.span
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.span>
          <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Back
          </span>
        </button>
      </motion.header>
      
      {/* Title section */}
      <motion.div 
        className="text-center px-6 pb-6"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <span className="text-4xl mb-3 block">{day.emoji}</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-warm-800 mb-2">
          {day.title}
        </h1>
        <p className="text-warm-500">{day.subtitle}</p>
      </motion.div>
      
      {/* Main interaction area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {children}
      </div>
      
      {/* Key line reveal */}
      <AnimatedMessage 
        show={showMessage} 
        message={customMessage || day.keyLine} 
      />
    </div>
  );
}

function AnimatedMessage({ show, message }: { show: boolean; message: string }) {
  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 p-8 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ 
        opacity: show ? 1 : 0, 
        y: show ? 0 : 40,
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="glass-rose rounded-2xl p-6 max-w-md mx-auto romantic-shadow">
        <p className="font-serif text-lg sm:text-xl text-warm-800 italic leading-relaxed">
          "{message}"
        </p>
      </div>
    </motion.div>
  );
}

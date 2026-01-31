"use client";

import { motion } from "framer-motion";
import { DayData } from "@/data/days";
import { DayStatus, getLockedMessage, formatDayDate } from "@/lib/date";
import { scaleVariants } from "@/lib/animations";
import { Lock } from "lucide-react";

interface DayCardProps {
  day: DayData;
  status: DayStatus;
  onClick: () => void;
  index: number;
}

export function DayCard({ day, status, onClick, index }: DayCardProps) {
  const isLocked = status === "locked";
  const isToday = status === "today";
  
  return (
    <motion.button
      variants={scaleVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isLocked ? "hover" : undefined}
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
      custom={index}
      transition={{ delay: index * 0.08 }}
      onClick={() => !isLocked && onClick()}
      disabled={isLocked}
      className={`
        relative w-full p-5 rounded-2xl text-left
        transition-all duration-500 ease-soft
        ${isLocked 
          ? "glass opacity-60 cursor-not-allowed" 
          : "glass-rose cursor-pointer hover:shadow-xl hover:shadow-blush-200/30"
        }
        ${isToday ? "ring-2 ring-blush-300 ring-offset-2 ring-offset-cream-50" : ""}
      `}
    >
      {/* Glow effect for today */}
      {isToday && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blush-200/30 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      <div className="relative z-10 flex items-start gap-4">
        {/* Emoji container */}
        <motion.div
          className={`
            flex items-center justify-center w-14 h-14 rounded-xl text-2xl
            ${isLocked ? "bg-warm-100" : "bg-gradient-to-br " + day.gradientFrom + " " + day.gradientTo}
          `}
          animate={isToday ? { scale: [1, 1.05, 1] } : undefined}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {isLocked ? <Lock className="w-5 h-5 text-warm-400" /> : day.emoji}
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-warm-400 uppercase tracking-wider">
              Day {day.id}
            </span>
            <span className="text-xs text-warm-300">•</span>
            <span className="text-xs text-warm-400">
              {formatDayDate(day.id)}
            </span>
            {isToday && (
              <span className="px-2 py-0.5 text-xs font-medium bg-blush-200 text-blush-700 rounded-full">
                Today
              </span>
            )}
          </div>
          
          <h3 className={`
            font-serif text-lg font-medium mb-1 truncate
            ${isLocked ? "text-warm-400" : "text-warm-800"}
          `}>
            {day.name}
          </h3>
          
          <p className="text-sm text-warm-500 truncate">
            {isLocked ? getLockedMessage(day.id) : day.subtitle}
          </p>
        </div>
      </div>
      
      {/* Subtle arrow for unlocked */}
      {!isLocked && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-blush-300"
          initial={{ x: 0, opacity: 0.5 }}
          whileHover={{ x: 5, opacity: 1 }}
        >
          →
        </motion.div>
      )}
    </motion.button>
  );
}

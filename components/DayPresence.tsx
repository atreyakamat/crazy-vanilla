"use client";

import { motion } from "framer-motion";
import { DayData } from "@/data/days";
import { DayStatus, getLockedMessage, formatDayDate } from "@/lib/date";
import { dayPresenceVariants, sharedElementTransition } from "@/lib/transitions";
import { Lock } from "lucide-react";

interface DayPresenceProps {
  day: DayData;
  status: DayStatus;
  onClick: () => void;
  index: number;
}

export function DayPresence({ day, status, onClick, index }: DayPresenceProps) {
  const isLocked = status === "locked";
  const isToday = status === "today";
  const isPast = status === "unlocked";
  
  // Determine presence state
  const presenceState = isLocked ? "locked" : isToday ? "today" : isPast ? "past" : "future";
  
  return (
    <motion.button
      layout
      layoutId={`day-${day.id}`}
      variants={dayPresenceVariants}
      initial="future"
      animate={presenceState}
      whileHover={!isLocked ? { 
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }
      } : undefined}
      whileTap={!isLocked ? { scale: 0.99 } : undefined}
      onClick={() => !isLocked && onClick()}
      disabled={isLocked}
      transition={sharedElementTransition}
      className={`
        relative w-full p-5 rounded-2xl text-left
        transition-colors duration-700
        ${isLocked 
          ? "cursor-not-allowed" 
          : "cursor-pointer"
        }
        ${isToday 
          ? "bg-white/50 backdrop-blur-sm shadow-lg shadow-blush-100/30" 
          : isPast
            ? "bg-white/35 backdrop-blur-sm"
            : "bg-white/20 backdrop-blur-sm"
        }
      `}
      style={{
        borderWidth: 1,
        borderColor: isToday 
          ? "rgba(248, 180, 190, 0.3)" 
          : "rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Today indicator - gentle glow */}
      {isToday && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(248, 180, 190, 0.15)",
              "0 0 30px rgba(248, 180, 190, 0.25)",
              "0 0 20px rgba(248, 180, 190, 0.15)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      <div className="relative z-10 flex items-start gap-4">
        {/* Day symbol */}
        <motion.div
          layout
          className={`
            flex items-center justify-center w-12 h-12 rounded-xl text-xl
            ${isLocked 
              ? "bg-warm-100/50" 
              : isToday
                ? "bg-gradient-to-br from-blush-100 to-rose-100"
                : "bg-warm-50/80"
            }
          `}
        >
          {isLocked ? (
            <Lock className="w-4 h-4 text-warm-300" />
          ) : (
            <motion.span
              animate={isToday ? { 
                scale: [1, 1.08, 1],
                rotate: [0, 3, -3, 0],
              } : undefined}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {day.emoji}
            </motion.span>
          )}
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: isLocked ? "rgb(180, 170, 165)" : "rgb(160, 140, 130)" }}
            >
              Day {day.id}
            </span>
            <span className="text-xs" style={{ color: "rgb(200, 190, 185)" }}>•</span>
            <span 
              className="text-xs"
              style={{ color: isLocked ? "rgb(180, 170, 165)" : "rgb(160, 140, 130)" }}
            >
              {formatDayDate(day.id)}
            </span>
            {isToday && (
              <motion.span 
                className="px-2 py-0.5 text-xs font-medium rounded-full"
                style={{ 
                  background: "rgba(248, 180, 190, 0.25)",
                  color: "rgb(180, 100, 110)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                Today
              </motion.span>
            )}
          </div>
          
          <h3 
            className="font-serif text-lg font-medium mb-1 truncate"
            style={{ color: isLocked ? "rgb(170, 160, 155)" : "rgb(100, 80, 70)" }}
          >
            {day.name}
          </h3>
          
          <p 
            className="text-sm truncate"
            style={{ color: isLocked ? "rgb(180, 170, 165)" : "rgb(140, 125, 115)" }}
          >
            {isLocked ? getLockedMessage(day.id) : day.subtitle}
          </p>
        </div>
        
        {/* Subtle arrow for accessible days */}
        {!isLocked && (
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(180, 160, 150, 0.4)" }}
            initial={{ x: 0 }}
            whileHover={{ x: 4, opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

"use client";

import { motion } from "framer-motion";
import { days, DayData } from "@/data/days";
import { getDayStatus, isUnlocked, formatDayDate, getLockedMessage } from "@/lib/date";
import { Lock } from "lucide-react";

interface JourneyHomeProps {
  onDaySelect: (day: DayData) => void;
  completedDays: number[];
}

export function JourneyHome({ onDaySelect }: JourneyHomeProps) {
  return (
    <motion.div
      className="min-h-screen px-4 py-8 sm:px-6 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <motion.header 
        className="text-center mb-10 sm:mb-14"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ 
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(248, 180, 190, 0.2)",
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-lg">💝</span>
          <span className="text-sm font-medium" style={{ color: "rgb(180, 120, 130)" }}>
            February 7 – 14
          </span>
        </motion.div>
        
        <h1 
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium mb-4"
          style={{ color: "rgb(100, 75, 65)" }}
        >
          8 Days of Valentine
        </h1>
        
        <p className="max-w-md mx-auto leading-relaxed" style={{ color: "rgb(140, 120, 110)" }}>
          A little journey, just for you.
          <br />
          <span className="text-sm opacity-80">Each day unlocks something new.</span>
        </p>
      </motion.header>
      
      <motion.div
        className="max-w-lg mx-auto space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
          },
        }}
      >
        {days.map((day) => {
          const status = getDayStatus(day.id);
          const unlocked = isUnlocked(day.id);
          const isToday = status === "today";
          const isPast = status === "unlocked";
          
          return (
            <motion.button
              key={day.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
              }}
              whileHover={unlocked ? { scale: 1.02 } : undefined}
              whileTap={unlocked ? { scale: 0.99 } : undefined}
              onClick={() => unlocked && onDaySelect(day)}
              disabled={!unlocked}
              className={`
                relative w-full p-5 rounded-2xl text-left transition-colors duration-700
                ${!unlocked ? "cursor-not-allowed" : "cursor-pointer"}
                ${isToday ? "bg-white/50 backdrop-blur-sm shadow-lg" : isPast ? "bg-white/35 backdrop-blur-sm" : "bg-white/20 backdrop-blur-sm"}
              `}
              style={{
                borderWidth: 1,
                borderColor: isToday ? "rgba(248, 180, 190, 0.3)" : "rgba(255, 255, 255, 0.2)",
              }}
            >
              {isToday && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{ boxShadow: ["0 0 20px rgba(248, 180, 190, 0.15)", "0 0 30px rgba(248, 180, 190, 0.25)", "0 0 20px rgba(248, 180, 190, 0.15)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              
              <div className="relative z-10 flex items-start gap-4">
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl text-xl ${!unlocked ? "bg-orange-50/50" : isToday ? "bg-gradient-to-br from-pink-50 to-rose-100" : "bg-orange-50/80"}`}
                >
                  {!unlocked ? (
                    <Lock className="w-4 h-4" style={{ color: "rgb(180, 170, 165)" }} />
                  ) : (
                    <motion.span
                      animate={isToday ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] } : undefined}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {day.emoji}
                    </motion.span>
                  )}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: !unlocked ? "rgb(180, 170, 165)" : "rgb(160, 140, 130)" }}>
                      Day {day.id}
                    </span>
                    <span className="text-xs" style={{ color: "rgb(200, 190, 185)" }}>•</span>
                    <span className="text-xs" style={{ color: !unlocked ? "rgb(180, 170, 165)" : "rgb(160, 140, 130)" }}>
                      {formatDayDate(day.id)}
                    </span>
                    {isToday && (
                      <motion.span 
                        className="px-2 py-0.5 text-xs font-medium rounded-full"
                        style={{ background: "rgba(248, 180, 190, 0.25)", color: "rgb(180, 100, 110)" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Today
                      </motion.span>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-lg font-medium mb-1 truncate" style={{ color: !unlocked ? "rgb(170, 160, 155)" : "rgb(100, 80, 70)" }}>
                    {day.name}
                  </h3>
                  
                  <p className="text-sm truncate" style={{ color: !unlocked ? "rgb(180, 170, 165)" : "rgb(140, 125, 115)" }}>
                    {!unlocked ? getLockedMessage(day.id) : day.subtitle}
                  </p>
                </div>
                
                {unlocked && (
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(180, 160, 150, 0.4)" }}
                    whileHover={{ x: 4, opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
      
      <motion.footer
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="text-sm" style={{ color: "rgb(170, 155, 145)" }}>Made with 💕</p>
      </motion.footer>
    </motion.div>
  );
}

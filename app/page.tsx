"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { days, DayData } from "@/data/days";
import { getDayStatus, isUnlocked, formatDayDate, getLockedMessage } from "@/lib/date";
import { DayRenderer } from "@/components/DayRenderer";
import { Lock } from "lucide-react";

export default function ValentineJourney() {
  const [activeDay, setActiveDay] = useState<DayData | null>(null);

  const handleDaySelect = useCallback((day: DayData) => {
    if (isUnlocked(day.id)) {
      setActiveDay(day);
    }
  }, []);

  const handleBack = useCallback(() => {
    setActiveDay(null);
  }, []);

  if (activeDay) {
    return <DayRenderer day={activeDay} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-blush-50 to-rose-50">
      <motion.div
        className="min-h-screen px-4 py-8 sm:px-6 sm:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.header
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/40 backdrop-blur-sm border border-blush-200/30"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-lg">💝</span>
            <span className="text-sm font-medium text-rose-400">February 7 – 14</span>
          </motion.div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium mb-4 text-warm-800">
            8 Days of Valentine
          </h1>
          
          <p className="max-w-md mx-auto leading-relaxed text-warm-600">
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
            visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
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
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
                whileHover={unlocked ? { scale: 1.02 } : undefined}
                whileTap={unlocked ? { scale: 0.99 } : undefined}
                onClick={() => handleDaySelect(day)}
                disabled={!unlocked}
                className={`
                  relative w-full p-5 rounded-2xl text-left transition-colors duration-700
                  ${!unlocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                  ${isToday ? "bg-white/60 backdrop-blur-sm shadow-lg border-blush-200" : isPast ? "bg-white/40 backdrop-blur-sm" : "bg-white/25 backdrop-blur-sm"}
                  border border-white/30
                `}
              >
                {isToday && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ boxShadow: ["0 0 20px rgba(248, 180, 190, 0.2)", "0 0 30px rgba(248, 180, 190, 0.35)", "0 0 20px rgba(248, 180, 190, 0.2)"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                )}
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-xl ${!unlocked ? "bg-warm-100/50" : isToday ? "bg-gradient-to-br from-blush-100 to-rose-100" : "bg-warm-50/80"}`}>
                    {!unlocked ? <Lock className="w-4 h-4 text-warm-400" /> : (
                      <motion.span animate={isToday ? { scale: [1, 1.1, 1] } : undefined} transition={{ duration: 3, repeat: Infinity }}>
                        {day.emoji}
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase tracking-wider text-warm-500">Day {day.id}</span>
                      <span className="text-xs text-warm-300">•</span>
                      <span className="text-xs text-warm-500">{formatDayDate(day.id)}</span>
                      {isToday && <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blush-100 text-rose-500">Today</span>}
                    </div>
                    <h3 className="font-serif text-lg font-medium mb-1 text-warm-800">{day.name}</h3>
                    <p className="text-sm text-warm-600">{!unlocked ? getLockedMessage(day.id) : day.subtitle}</p>
                  </div>
                  
                  {unlocked && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-300">→</div>}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
        
        <motion.footer className="text-center mt-12" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.5 }}>
          <p className="text-sm text-warm-500">Made with 💕</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

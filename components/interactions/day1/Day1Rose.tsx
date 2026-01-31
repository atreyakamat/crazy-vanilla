"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day1RoseProps {
  day: DayData;
  onBack: () => void;
}

const roseConfigs = [
  { id: 1, primary: "#e8a0a0", secondary: "#d4787a", glow: "rgba(232, 160, 160, 0.35)" },
  { id: 2, primary: "#f0b0b8", secondary: "#e8909a", glow: "rgba(240, 176, 184, 0.35)" },
  { id: 3, primary: "#dda0b0", secondary: "#c87888", glow: "rgba(221, 160, 176, 0.35)" },
];

export function Day1Rose({ day, onBack }: Day1RoseProps) {
  const [state, setState] = useState<"idle" | "hovering" | "selected" | "completed">("idle");
  const [hoveredRose, setHoveredRose] = useState<number | null>(null);
  const [selectedRose, setSelectedRose] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleSelect = useCallback((id: number) => {
    if (state === "selected" || state === "completed") return;
    setSelectedRose(id);
    setState("selected");
    setTimeout(() => { setState("completed"); setShowMessage(true); }, 2800);
  }, [state]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream-50 via-blush-50 to-rose-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm text-warm-600 hover:bg-white/70 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
      </motion.header>

      <AnimatePresence>
        {state !== "completed" && (
          <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <motion.span className="text-4xl sm:text-5xl block mb-4" animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 5, repeat: Infinity }}>
              🌹
            </motion.span>
            <h1 className="font-serif text-2xl sm:text-3xl mb-2 text-warm-800">{day.name}</h1>
            <p className="text-sm text-warm-600">{day.subtitle}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="flex items-center gap-6 sm:gap-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
          {roseConfigs.map((rose, index) => {
            const isSelected = selectedRose === rose.id;
            const isOther = selectedRose !== null && selectedRose !== rose.id;
            const isHovered = hoveredRose === rose.id;
            
            return (
              <motion.button
                key={rose.id}
                onClick={() => handleSelect(rose.id)}
                onMouseEnter={() => { setHoveredRose(rose.id); setState("hovering"); }}
                onMouseLeave={() => { setHoveredRose(null); if (state === "hovering") setState("idle"); }}
                disabled={isOther}
                className="relative focus:outline-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isOther ? 0 : 1, y: isOther ? 15 : 0, scale: isSelected ? 1.1 : isHovered ? 1.05 : 1, filter: `blur(${isHovered || isSelected ? 0 : 1.5}px)` }}
                transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
              >
                <motion.div className="absolute inset-0 rounded-full pointer-events-none" animate={{ opacity: isHovered || isSelected ? 0.5 : 0, scale: isHovered || isSelected ? 1.4 : 1 }} transition={{ duration: 0.8 }} style={{ background: `radial-gradient(circle, ${rose.glow} 0%, transparent 65%)` }} />
                <svg viewBox="0 0 100 120" className="w-24 h-28 sm:w-32 sm:h-36">
                  <path d="M50 120 Q48 100 50 80 Q52 70 50 60" fill="none" stroke="#5a7a5a" strokeWidth="3" strokeLinecap="round" />
                  <path d="M50 85 Q32 78 26 65 Q38 72 50 78" fill="#6b8a6b" />
                  {[0, 72, 144, 216, 288].map((r, i) => <ellipse key={i} cx="50" cy="28" rx="17" ry="24" fill={rose.primary} transform={`rotate(${r} 50 45)`} opacity="0.88" />)}
                  {[36, 108, 180, 252, 324].map((r, i) => <ellipse key={i} cx="50" cy="32" rx="11" ry="16" fill={rose.secondary} transform={`rotate(${r} 50 42)`} />)}
                  <circle cx="50" cy="42" r="7" fill={rose.secondary} style={{ filter: "brightness(0.92)" }} />
                </svg>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {state === "selected" && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute" style={{ left: `${Math.random() * 100}%` }} initial={{ y: -60, opacity: 0 }} animate={{ y: "115vh", opacity: [0, 0.7, 0.7, 0] }} transition={{ duration: 7 + Math.random() * 3, delay: i * 0.5 }}>
              <svg viewBox="0 0 28 38" className="w-6 h-8 sm:w-10 sm:h-12"><ellipse cx="14" cy="19" rx="11" ry="16" fill={roseConfigs[selectedRose! - 1]?.primary || "#f0b0b8"} opacity="0.8" /></svg>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {state === "idle" && <motion.p className="absolute bottom-14 left-0 right-0 text-center text-sm text-warm-500" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} transition={{ delay: 1.5 }}>Choose a rose</motion.p>}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && (
          <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 sm:pb-20 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }}>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 sm:p-10 max-w-md mx-auto text-center shadow-lg">
              <motion.p className="font-serif text-xl sm:text-2xl mb-3 text-warm-700" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>Didn't matter which one you chose.</motion.p>
              <motion.p className="font-serif text-2xl sm:text-3xl font-medium text-warm-800" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>I was always choosing you.</motion.p>
              <motion.div className="mt-6" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.5 }}><span className="text-2xl">🌹</span></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

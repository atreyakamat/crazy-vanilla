"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day2ProposeProps { day: DayData; onBack: () => void; }

export function Day2Propose({ day, onBack }: Day2ProposeProps) {
  const [stability, setStability] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const holdRef = useRef<NodeJS.Timeout | null>(null);
  const decayRef = useRef<NodeJS.Timeout | null>(null);
  const stabilityRef = useRef(0);

  const handleStart = useCallback(() => {
    if (isComplete) return;
    if (decayRef.current) clearInterval(decayRef.current);
    holdRef.current = setInterval(() => {
      stabilityRef.current = Math.min(stabilityRef.current + 0.7, 100);
      setStability(stabilityRef.current);
      if (stabilityRef.current >= 100) { if (holdRef.current) clearInterval(holdRef.current); setIsComplete(true); setTimeout(() => setShowMessage(true), 1000); }
    }, 25);
  }, [isComplete]);

  const handleEnd = useCallback(() => {
    if (isComplete) return;
    if (holdRef.current) clearInterval(holdRef.current);
    decayRef.current = setInterval(() => {
      stabilityRef.current = Math.max(stabilityRef.current - 0.4, 0);
      setStability(stabilityRef.current);
      if (stabilityRef.current <= 0 && decayRef.current) clearInterval(decayRef.current);
    }, 25);
  }, [isComplete]);

  useEffect(() => () => { if (holdRef.current) clearInterval(holdRef.current); if (decayRef.current) clearInterval(decayRef.current); }, []);

  const norm = stability / 100;
  const isHolding = holdRef.current !== null && !isComplete;

  return (
    <div className="relative min-h-screen overflow-hidden select-none touch-none bg-gradient-to-br from-cream-50 via-warm-50 to-blush-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm text-warm-600"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!isComplete && norm < 0.7 && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" animate={{ opacity: 1 - norm }} exit={{ opacity: 0 }}><h1 className="font-serif text-2xl sm:text-3xl mb-2 text-warm-800">{day.name}</h1><p className="text-sm text-warm-600">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <motion.div className="absolute inset-0 flex items-center justify-center cursor-pointer" onMouseDown={handleStart} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={handleStart} onTouchEnd={handleEnd}>
        <div className="relative">
          <motion.div className="absolute w-64 h-64 rounded-full" style={{ left: -128, top: -128 }} animate={{ opacity: [0.15 + norm * 0.2, 0.3 + norm * 0.2], scale: isComplete ? 1.15 : [0.96, 1.04] }} transition={{ duration: 1.8 + norm * 1.5, repeat: isComplete ? 0 : Infinity }}>
            <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, rgba(${225 + norm * 25}, ${175 - norm * 25}, ${165 - norm * 35}, ${0.15 + norm * 0.35}) 0%, transparent 65%)` }} />
          </motion.div>
          <motion.div className="relative w-32 h-32" animate={{ scale: isComplete ? 1 : [1 - 0.08 * (1 - norm * 0.85), 1 + 0.08 * (1 - norm * 0.85)] }} transition={{ duration: 1.8 + norm * 1.5, repeat: isComplete ? 0 : Infinity }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs><radialGradient id="hg2" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor={`rgb(${248 + norm * 7}, ${198 - norm * 35}, ${188 - norm * 45})`} /><stop offset="100%" stopColor={`rgb(${218 + norm * 22}, ${148 - norm * 28}, ${138 - norm * 38})`} /></radialGradient></defs>
              <path d="M50 88 C25 70, 8 50, 12 32 C16 14, 35 10, 50 28 C65 10, 84 14, 88 32 C92 50, 75 70, 50 88Z" fill="url(#hg2)" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }} />
              <ellipse cx="38" cy="36" rx="9" ry="11" fill={`rgba(255,255,255,${0.15 + norm * 0.2})`} />
            </svg>
          </motion.div>
          <svg className="absolute w-48 h-48 -rotate-90" style={{ left: -8, top: -8 }} viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(200, 180, 170, 0.15)" strokeWidth="2" />
            <motion.circle cx="80" cy="80" r="70" fill="none" stroke={`rgba(220, 160, 150, 0.6)`} strokeWidth="2" strokeLinecap="round" strokeDasharray={2 * Math.PI * 70} strokeDashoffset={2 * Math.PI * 70 * (1 - norm)} animate={{ opacity: stability > 0 ? 0.7 : 0 }} />
          </svg>
        </div>
      </motion.div>

      <AnimatePresence>{!isComplete && <motion.p className="absolute bottom-20 text-center w-full text-sm text-warm-500" animate={{ opacity: 1 - norm * 0.8 }} exit={{ opacity: 0 }}>{stability > 0 ? (stability > 55 ? "Steady now..." : "Hold gently...") : "Press and hold"}</motion.p>}</AnimatePresence>
      <AnimatePresence>{showMessage && <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}><motion.p className="font-serif text-xl sm:text-2xl mb-3 text-warm-700" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>This is me choosing you.</motion.p><motion.p className="text-lg text-warm-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>Calmly. Sincerely.</motion.p></motion.div>}</AnimatePresence>
    </div>
  );
}

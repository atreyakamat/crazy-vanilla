"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day6HugProps { day: DayData; onBack: () => void; }

export function Day6Hug({ day, onBack }: Day6HugProps) {
  const [warmth, setWarmth] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const holdRef = useRef<NodeJS.Timeout | null>(null);
  const decayRef = useRef<NodeJS.Timeout | null>(null);
  const warmthRef = useRef(0);

  const handleStart = useCallback(() => {
    if (isComplete) return;
    if (decayRef.current) clearInterval(decayRef.current);
    setIsHolding(true);
    holdRef.current = setInterval(() => { warmthRef.current = Math.min(warmthRef.current + 0.006, 1); setWarmth(warmthRef.current); if (warmthRef.current >= 1) { if (holdRef.current) clearInterval(holdRef.current); setIsComplete(true); setIsHolding(false); setTimeout(() => setShowMessage(true), 1400); } }, 25);
  }, [isComplete]);

  const handleEnd = useCallback(() => {
    if (isComplete) return;
    setIsHolding(false);
    if (holdRef.current) clearInterval(holdRef.current);
    decayRef.current = setInterval(() => { warmthRef.current = Math.max(warmthRef.current - 0.003, 0); setWarmth(warmthRef.current); if (warmthRef.current <= 0 && decayRef.current) clearInterval(decayRef.current); }, 25);
  }, [isComplete]);

  useEffect(() => () => { if (holdRef.current) clearInterval(holdRef.current); if (decayRef.current) clearInterval(decayRef.current); }, []);

  const glowColor = `rgba(${220 + warmth * 30}, ${180 - warmth * 20}, ${170 - warmth * 30}, ${0.3 + warmth * 0.4})`;

  return (
    <div className="relative min-h-screen overflow-hidden select-none touch-none bg-gradient-to-br from-rose-50 via-blush-50 to-warm-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/55 backdrop-blur-sm text-rose-600"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!isComplete && warmth < 0.65 && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" animate={{ opacity: Math.max(0.15, 1 - warmth * 1.4) }}><span className="text-3xl block mb-3 opacity-65">🤗</span><h1 className="font-serif text-xl sm:text-2xl mb-1 text-rose-800">{day.name}</h1><p className="text-sm text-rose-600">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <motion.div className="absolute inset-0 flex items-center justify-center cursor-pointer" onMouseDown={handleStart} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={handleStart} onTouchEnd={handleEnd}>
        <div className="relative">
          <motion.div className="absolute rounded-full" style={{ width: 280, height: 280, left: -140, top: -140, background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }} animate={{ scale: 1 + warmth * 0.3, opacity: 0.15 + warmth * 0.2 }} />
          <motion.div className="absolute rounded-full" style={{ width: 200, height: 200, left: -100, top: -100, background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`, filter: `blur(${30 - warmth * 20}px)` }} animate={{ scale: 1 + warmth * 0.15, opacity: 0.3 + warmth * 0.3 }} />
          <motion.span className="text-5xl sm:text-6xl relative z-10" animate={{ opacity: 0.4 + warmth * 0.6, scale: 0.9 + warmth * 0.1, filter: `blur(${(1 - warmth) * 4}px)` }} style={{ filter: `drop-shadow(0 0 ${10 + warmth * 20}px ${glowColor})` }}>🤗</motion.span>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-32 left-0 right-0 flex justify-center gap-3" animate={{ opacity: isHolding || warmth > 0 ? 0.7 : 0 }}>{[0.25, 0.5, 0.75, 1].map((t, i) => <motion.div key={i} className="w-2 h-2 rounded-full" animate={{ scale: warmth >= t ? 1.2 : 1, background: warmth >= t ? `rgb(${180 + warmth * 60}, ${160 - warmth * 20}, ${170 - warmth * 40})` : "rgba(180, 160, 170, 0.3)" }} />)}</motion.div>

      <AnimatePresence>{!isComplete && <motion.p className="absolute bottom-20 text-center w-full text-sm text-rose-600" exit={{ opacity: 0 }}>{isHolding ? (warmth < 0.5 ? "Stay with me..." : warmth < 0.9 ? "I feel you..." : "Almost there...") : "Press and hold"}</motion.p>}</AnimatePresence>
      <AnimatePresence>{showMessage && <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}><motion.p className="font-serif text-xl sm:text-2xl mb-2 text-rose-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>That warmth?</motion.p><motion.p className="font-serif text-2xl sm:text-3xl text-rose-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>That's you.</motion.p></motion.div>}</AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day8ValentineProps { day: DayData; onBack: () => void; }

const dayPoints = [
  { id: 1, x: -90, y: -60, color: "rgba(232, 160, 160, 0.7)" },
  { id: 2, x: 70, y: -80, color: "rgba(220, 180, 160, 0.7)" },
  { id: 3, x: -60, y: 30, color: "rgba(200, 160, 120, 0.7)" },
  { id: 4, x: 85, y: 45, color: "rgba(210, 180, 145, 0.7)" },
  { id: 5, x: -40, y: -90, color: "rgba(180, 160, 150, 0.7)" },
  { id: 6, x: 30, y: 70, color: "rgba(230, 190, 180, 0.7)" },
  { id: 7, x: -80, y: 80, color: "rgba(235, 200, 195, 0.7)" },
];

export function Day8Valentine({ day, onBack }: Day8ValentineProps) {
  const [convergence, setConvergence] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = useCallback(() => {
    if (isResolved || intervalRef.current) return;
    setHasInteracted(true);
    intervalRef.current = setInterval(() => {
      setConvergence((prev) => {
        const next = Math.min(prev + 0.004, 1);
        if (next >= 1) { if (intervalRef.current) clearInterval(intervalRef.current); setIsResolved(true); setTimeout(() => setShowMessage(true), 2200); }
        return next;
      });
    }, 25);
  }, [isResolved]);

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);

  return (
    <div className="relative min-h-screen overflow-hidden select-none bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/55 backdrop-blur-sm text-rose-600"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!hasInteracted && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" exit={{ opacity: 0 }}><motion.span className="text-4xl block mb-4" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}>❤️</motion.span><h1 className="font-serif text-2xl sm:text-3xl mb-2 text-rose-800">{day.name}</h1><p className="text-sm text-rose-600">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <motion.div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handleInteraction}>
        <motion.div className="relative w-64 h-64" animate={{ opacity: isResolved ? 0 : 1 }} transition={{ duration: 1.5 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="-128 -128 256 256">
            {convergence > 0.3 && dayPoints.map((point, i) => <motion.line key={i} x1={point.x * (1 - convergence)} y1={point.y * (1 - convergence)} x2={0} y2={0} stroke={`rgba(230, 200, 190, ${(convergence - 0.3) * 0.4})`} strokeWidth="0.5" />)}
          </svg>
          {dayPoints.map((point) => <motion.div key={point.id} className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full" style={{ background: point.color, boxShadow: `0 0 ${10 + convergence * 15}px ${point.color}` }} animate={{ x: point.x * (1 - convergence) - 4, y: point.y * (1 - convergence) - 4, scale: 1 + convergence * 0.3 }} transition={{ duration: 2 }} />)}
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 20 + convergence * 40, height: 20 + convergence * 40, background: `radial-gradient(circle, rgba(240, 210, 200, ${convergence * 0.5}), transparent 70%)` }} />
        </motion.div>
        {isResolved && <motion.div className="absolute" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }}><svg viewBox="0 0 100 100" className="w-24 h-24" style={{ filter: "drop-shadow(0 0 20px rgba(220, 180, 170, 0.5))" }}><defs><radialGradient id="hgf8" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="rgba(245, 215, 205, 0.95)" /><stop offset="100%" stopColor="rgba(220, 175, 165, 0.85)" /></radialGradient></defs><path d="M50 88 C25 70, 8 50, 12 32 C16 14, 35 10, 50 28 C65 10, 84 14, 88 32 C92 50, 75 70, 50 88Z" fill="url(#hgf8)" /></svg></motion.div>}
      </motion.div>

      <AnimatePresence>{!hasInteracted && <motion.p className="absolute bottom-24 text-center w-full text-sm text-rose-600" animate={{ opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 4, repeat: Infinity }} exit={{ opacity: 0 }}>Tap to begin</motion.p>}</AnimatePresence>

      <AnimatePresence>{showMessage && (
        <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-20 sm:pb-28 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>
          <motion.p className="font-serif text-xl sm:text-2xl mb-3 text-rose-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>This wasn't a week.</motion.p>
          <motion.p className="font-serif text-2xl sm:text-3xl mb-10 text-rose-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>This was how I love you.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.5 }}><p className="text-sm mb-1 text-rose-500">with all my love,</p><p className="font-serif text-lg text-rose-700">— Forever Yours</p></motion.div>
          <motion.span className="mt-8 text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 8 }}>❤️</motion.span>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

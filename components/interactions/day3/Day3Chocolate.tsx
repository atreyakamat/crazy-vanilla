"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day3ChocolateProps { day: DayData; onBack: () => void; }

export function Day3Chocolate({ day, onBack }: Day3ChocolateProps) {
  const [revealProgress, setRevealProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const dragStartX = useRef(0);
  const progressRef = useRef(0);

  const handleStart = (x: number) => { if (!isComplete) dragStartX.current = x; };
  const handleMove = (x: number) => {
    if (isComplete || dragStartX.current === 0) return;
    const progress = Math.max(progressRef.current, Math.max(0, Math.min(1, (x - dragStartX.current) / 200)));
    progressRef.current = progress;
    setRevealProgress(progress);
    if (progress >= 0.85) { setRevealProgress(1); setIsComplete(true); }
  };
  const handleEnd = () => { dragStartX.current = 0; };

  return (
    <div className="relative min-h-screen overflow-hidden select-none touch-none bg-gradient-to-br from-amber-50 via-orange-50 to-warm-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm text-amber-700"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!isComplete && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" exit={{ opacity: 0 }}><motion.span className="text-4xl block mb-4" animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity }}>🍫</motion.span><h1 className="font-serif text-2xl sm:text-3xl mb-2 text-amber-900">{day.name}</h1><p className="text-sm text-amber-700">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative w-56 sm:w-64 h-28 sm:h-32 cursor-grab active:cursor-grabbing" onMouseDown={(e) => handleStart(e.clientX)} onMouseMove={(e) => handleMove(e.clientX)} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchStart={(e) => handleStart(e.touches[0].clientX)} onTouchMove={(e) => handleMove(e.touches[0].clientX)} onTouchEnd={handleEnd}>
          <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ background: "linear-gradient(145deg, rgb(89, 60, 40), rgb(55, 35, 22))", boxShadow: `0 4px 20px rgba(80, 40, 20, ${0.2 + revealProgress * 0.2})` }}>
            <div className="absolute inset-3 grid grid-cols-4 grid-rows-2 gap-1">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="rounded-sm" style={{ background: "linear-gradient(135deg, rgba(100, 70, 45, 0.6), rgba(60, 40, 25, 0.4))" }} />)}</div>
            {isComplete && <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}><span className="text-3xl">💝</span></motion.div>}
          </div>
          {!isComplete && <motion.div className="absolute inset-0 rounded-xl overflow-hidden" style={{ x: revealProgress * 220, opacity: 1 - revealProgress * 0.4 }}><div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgb(218, 175, 95), rgb(245, 215, 140), rgb(200, 160, 80))" }} /><div className="absolute top-1/2 left-0 right-0 h-5 -translate-y-1/2" style={{ background: "linear-gradient(180deg, rgb(180, 80, 100), rgb(200, 100, 120), rgb(170, 70, 90))" }} /></motion.div>}
        </motion.div>
      </div>

      <AnimatePresence>{!isComplete && <motion.p className="absolute bottom-20 text-center w-full text-sm text-amber-700" exit={{ opacity: 0 }}>{revealProgress > 0.1 ? (revealProgress > 0.5 ? "Almost there..." : "Slowly now...") : "Drag to unwrap →"}</motion.p>}</AnimatePresence>
      <AnimatePresence>{isComplete && <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}><motion.p className="font-serif text-xl sm:text-2xl mb-2 text-amber-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>Some things are sweeter</motion.p><motion.p className="font-serif text-xl sm:text-2xl text-amber-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>when you take your time.</motion.p></motion.div>}</AnimatePresence>
    </div>
  );
}

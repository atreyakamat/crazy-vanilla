"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day4TeddyProps { day: DayData; onBack: () => void; }

export function Day4Teddy({ day, onBack }: Day4TeddyProps) {
  const [isHugged, setIsHugged] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 120, damping: 25 }), smoothY = useSpring(rawY, { stiffness: 120, damping: 25 });

  const handleDragEnd = useCallback(() => {
    const x = rawX.get(), y = rawY.get();
    if (Math.sqrt(x * x + y * y) < 60) { setIsHugged(true); rawX.set(0); rawY.set(0); setTimeout(() => setShowMessage(true), 800); }
    else { const startX = x, startY = y, start = Date.now(); const animate = () => { const p = Math.min((Date.now() - start) / 1500, 1); rawX.set(startX * (1 - (1 - Math.pow(1 - p, 3)))); rawY.set(startY * (1 - (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(animate); }; requestAnimationFrame(animate); }
  }, [rawX, rawY]);

  return (
    <div ref={constraintsRef} className="relative min-h-screen overflow-hidden select-none touch-none bg-gradient-to-br from-amber-50 via-orange-50 to-warm-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm text-amber-700"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!isHugged && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" exit={{ opacity: 0 }}><motion.span className="text-4xl block mb-4" animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity }}>🧸</motion.span><h1 className="font-serif text-2xl sm:text-3xl mb-2 text-amber-900">{day.name}</h1><p className="text-sm text-amber-700">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="absolute w-32 h-32 rounded-full border-2 border-dashed border-amber-300/30" animate={{ scale: [1, 1.05, 1], opacity: isHugged ? 0 : 0.25 }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.div className="relative cursor-grab active:cursor-grabbing" style={{ x: smoothX, y: smoothY }} drag={!isHugged} dragConstraints={constraintsRef} dragElastic={0.1} dragMomentum={false} onDragEnd={handleDragEnd}>
          <motion.div animate={!isHugged ? { y: [0, -8, 0] } : { y: 0 }} transition={{ duration: 4, repeat: Infinity }}>
            <motion.div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full bg-amber-900/20" animate={{ scaleX: isHugged ? 1.3 : 1 }} />
            <motion.svg viewBox="0 0 120 140" className="w-32 h-40 sm:w-40 sm:h-48" animate={{ scaleX: isHugged ? 1.08 : 1, scaleY: isHugged ? 0.92 : 1 }} transition={{ duration: 0.6 }}>
              <defs><radialGradient id="fur4" cx="40%" cy="30%" r="70%"><stop offset="0%" stopColor="rgb(225, 200, 170)" /><stop offset="100%" stopColor="rgb(190, 160, 125)" /></radialGradient></defs>
              <ellipse cx="30" cy="25" rx="18" ry="18" fill="url(#fur4)" /><ellipse cx="30" cy="25" rx="10" ry="10" fill="rgb(235, 210, 185)" />
              <ellipse cx="90" cy="25" rx="18" ry="18" fill="url(#fur4)" /><ellipse cx="90" cy="25" rx="10" ry="10" fill="rgb(235, 210, 185)" />
              <ellipse cx="60" cy="50" rx="35" ry="32" fill="url(#fur4)" />
              <motion.ellipse cx="60" cy="100" fill="url(#fur4)" animate={{ rx: isHugged ? 42 : 38, ry: isHugged ? 34 : 38 }} />
              <motion.ellipse cx="25" cy="95" rx="12" ry="20" fill="url(#fur4)" style={{ transformOrigin: "25px 80px" }} animate={{ rotate: isHugged ? 25 : 0 }} />
              <motion.ellipse cx="95" cy="95" rx="12" ry="20" fill="url(#fur4)" style={{ transformOrigin: "95px 80px" }} animate={{ rotate: isHugged ? -25 : 0 }} />
              <ellipse cx="40" cy="132" rx="14" ry="10" fill="url(#fur4)" /><ellipse cx="80" cy="132" rx="14" ry="10" fill="url(#fur4)" />
              <ellipse cx="60" cy="58" rx="12" ry="8" fill="rgb(235, 210, 185)" /><ellipse cx="60" cy="54" rx="5" ry="4" fill="rgb(100, 75, 55)" />
              <motion.ellipse cx="47" cy="42" rx="4" fill="rgb(60, 45, 35)" animate={{ ry: isHugged ? 2 : 5 }} />
              <motion.ellipse cx="73" cy="42" rx="4" fill="rgb(60, 45, 35)" animate={{ ry: isHugged ? 2 : 5 }} />
              <motion.path fill="none" stroke="rgb(100, 75, 55)" strokeWidth="2" strokeLinecap="round" animate={{ d: isHugged ? "M 50 62 Q 60 72 70 62" : "M 52 62 Q 60 68 68 62" }} />
              <motion.path d="M 60 95 C 55 90, 48 93, 48 98 C 48 103, 55 108, 60 112 C 65 108, 72 103, 72 98 C 72 93, 65 90, 60 95" fill="rgb(220, 160, 160)" animate={{ scale: isHugged ? 1.15 : 1 }} style={{ transformOrigin: "60px 100px" }} />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>{!isHugged && <motion.p className="absolute bottom-20 text-center w-full text-sm text-amber-700" exit={{ opacity: 0 }}>Drag me close</motion.p>}</AnimatePresence>
      <AnimatePresence>{showMessage && <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}><motion.p className="font-serif text-2xl sm:text-3xl text-center text-amber-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>You make things feel safe.</motion.p></motion.div>}</AnimatePresence>
    </div>
  );
}

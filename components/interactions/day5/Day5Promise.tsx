"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day5PromiseProps { day: DayData; onBack: () => void; }
const words = ["I", "promise", "to", "keep", "choosing", "you."];
const thresholds = [0, 0.15, 0.30, 0.45, 0.65, 0.85];

export function Day5Promise({ day, onBack }: Day5PromiseProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const handleInteraction = useCallback((clientX: number) => {
    if (isComplete || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newProgress = Math.max(progressRef.current, Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
    progressRef.current = newProgress;
    setProgress(newProgress);
    if (newProgress >= 1) setIsComplete(true);
  }, [isComplete]);

  return (
    <div className="relative min-h-screen overflow-hidden select-none bg-gradient-to-br from-cream-50 via-warm-50 to-blush-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm text-warm-600"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!isComplete && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" exit={{ opacity: 0 }}><span className="text-3xl block mb-3 opacity-80">🤝</span><h1 className="font-serif text-xl sm:text-2xl mb-1 text-warm-800">{day.name}</h1><p className="text-sm text-warm-600">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-4 mb-2">
            {words.map((word, i) => <motion.span key={i} className={`font-serif inline-block ${word === "keep" || word === "choosing" ? "text-2xl sm:text-3xl text-warm-800" : "text-xl sm:text-2xl text-warm-700"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: progress >= thresholds[i] ? 1 : 0, y: progress >= thresholds[i] ? 0 : 8 }} transition={{ duration: 0.5 }}>{word}</motion.span>)}
          </div>
          <div className="relative w-full max-w-sm mx-auto h-1 mt-2"><div className="absolute inset-0 rounded-full bg-warm-200/30" /><motion.div className="absolute left-0 top-0 h-full rounded-full origin-left bg-gradient-to-r from-warm-400/60 to-warm-500/80" style={{ width: "100%", scaleX: progress }} /></div>
          <div ref={containerRef} className="w-full h-24 cursor-pointer touch-none" onMouseMove={(e) => handleInteraction(e.clientX)} onTouchMove={(e) => e.touches[0] && handleInteraction(e.touches[0].clientX)} />
        </div>
      </div>

      <AnimatePresence>{progress === 0 && !isComplete && <motion.div className="absolute bottom-24 left-0 right-0 text-center" exit={{ opacity: 0 }}><p className="text-sm text-warm-500">Trace to reveal</p><motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-warm-400">→</motion.span></motion.div>}</AnimatePresence>
      <AnimatePresence>{isComplete && <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-20 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}><div className="w-12 h-px mb-4 bg-warm-300/30" /><p className="text-sm text-warm-500">— and I mean it.</p></motion.div>}</AnimatePresence>
    </div>
  );
}

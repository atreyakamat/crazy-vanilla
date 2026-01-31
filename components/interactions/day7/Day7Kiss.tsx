"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day7KissProps { day: DayData; onBack: () => void; }

export function Day7Kiss({ day, onBack }: Day7KissProps) {
  const [isMerged, setIsMerged] = useState(false);
  const [proximity, setProximity] = useState(0);
  const [leftPos, setLeftPos] = useState({ x: -80, y: 0 });
  const [rightPos, setRightPos] = useState({ x: 80, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (isMerged || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const normY = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const closeness = Math.max(0, 1 - Math.sqrt(normX * normX + normY * normY));
    const approach = closeness * 80 * 0.9;
    setLeftPos({ x: -80 + approach + normX * 15, y: normY * 20 });
    setRightPos({ x: 80 - approach + normX * 15, y: normY * 20 });
    const newProx = Math.max(0, Math.min(1, 1 - Math.abs((-80 + approach) - (80 - approach)) / 160));
    setProximity(newProx);
    if (newProx > 0.92) setIsMerged(true);
  }, [isMerged]);

  const handleLeave = useCallback(() => { if (isMerged) return; setLeftPos({ x: -80, y: 0 }); setRightPos({ x: 80, y: 0 }); setProximity(0); }, [isMerged]);
  const blur = 12 - proximity * 10;

  return (
    <div className="relative min-h-screen overflow-hidden select-none touch-none bg-gradient-to-br from-rose-50 via-pink-50 to-blush-50">
      <motion.header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6"><button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm text-rose-600"><ArrowLeft className="w-4 h-4" /></button></motion.header>

      <AnimatePresence>{!isMerged && proximity < 0.5 && <motion.div className="absolute top-20 sm:top-24 left-0 right-0 text-center px-6" animate={{ opacity: 0.7 - proximity }}><span className="text-3xl block mb-3 opacity-60">💋</span><h1 className="font-serif text-xl sm:text-2xl mb-1 text-rose-800">{day.name}</h1><p className="text-sm text-rose-600">{day.subtitle}</p></motion.div>}</AnimatePresence>

      <motion.div ref={containerRef} className="absolute inset-0 cursor-pointer" onMouseMove={(e) => handleMove(e.clientX, e.clientY)} onMouseLeave={handleLeave} onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX, e.touches[0].clientY)} onTouchEnd={handleLeave}>
        <motion.div className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle at 30% 30%, rgba(${200 + proximity * 50}, ${180 - proximity * 20}, ${190 - proximity * 60}, ${0.5 + proximity * 0.4}), transparent)`, filter: `blur(${blur}px)`, boxShadow: `0 0 ${20 + proximity * 20}px rgba(220, 180, 175, ${0.2 + proximity * 0.4})` }} animate={{ x: isMerged ? -40 : leftPos.x - 40, y: isMerged ? -40 : leftPos.y - 40, opacity: isMerged ? 0 : 1, scale: 1 + proximity * 0.1 }} transition={{ type: "spring", stiffness: 60, damping: 20 }} />
        <motion.div className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle at 30% 30%, rgba(${200 + proximity * 50}, ${180 - proximity * 20}, ${190 - proximity * 60}, ${0.5 + proximity * 0.4}), transparent)`, filter: `blur(${blur}px)`, boxShadow: `0 0 ${20 + proximity * 20}px rgba(220, 180, 175, ${0.2 + proximity * 0.4})` }} animate={{ x: isMerged ? -40 : rightPos.x - 40, y: isMerged ? -40 : rightPos.y - 40, opacity: isMerged ? 0 : 1, scale: 1 + proximity * 0.1 }} transition={{ type: "spring", stiffness: 60, damping: 20 }} />
        {isMerged && <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full" style={{ background: "radial-gradient(circle at 40% 35%, rgba(250, 220, 215, 0.9), rgba(220, 175, 165, 0.6))", filter: "blur(3px)", boxShadow: "0 0 40px rgba(240, 195, 190, 0.5)" }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} />}
      </motion.div>

      <AnimatePresence>{!isMerged && proximity < 0.2 && <motion.p className="absolute bottom-24 text-center w-full text-sm text-rose-600" exit={{ opacity: 0 }}>Move gently toward the center</motion.p>}</AnimatePresence>
      <AnimatePresence>{isMerged && <motion.div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}><motion.p className="font-serif text-xl sm:text-2xl mb-2 text-rose-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>Some closeness</motion.p><motion.p className="font-serif text-xl sm:text-2xl text-rose-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>doesn't need words.</motion.p></motion.div>}</AnimatePresence>
    </div>
  );
}

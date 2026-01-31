"use client";

import { motion } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface DayRendererProps {
  day: DayData;
  onBack: () => void;
}

export function DayRenderer({ day, onBack }: DayRendererProps) {
  return (
    <motion.div
      key={day.id}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 text-stone-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white/70 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-stone-600" />
        </button>
      </header>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">{day.emoji}</div>
        <h2 className="font-serif text-3xl mb-2">{day.name}</h2>
        <p className="text-stone-600 max-w-xs mx-auto mb-8">{day.subtitle}</p>

        <div className="p-6 bg-white/40 backdrop-blur-md rounded-xl border border-white/50">
          <p className="text-sm text-stone-500 font-medium">Interaction Coming Soon</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

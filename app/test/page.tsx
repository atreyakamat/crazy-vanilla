"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { days, DayData } from "@/data/days";
import { DayRenderer } from "@/components/DayRenderer";

export default function TestPage() {
  const [activeDay, setActiveDay] = useState<DayData | null>(null);

  if (activeDay) {
    return <DayRenderer day={activeDay} onBack={() => setActiveDay(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-blush-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif text-center mb-2 text-warm-800">
          🧪 Day Testing Framework
        </h1>
        <p className="text-center mb-8 text-sm text-warm-600">
          Click any day to test it directly. All days are unlocked for testing.
        </p>

        <div className="grid gap-4">
          {days.map((day) => (
            <motion.button
              key={day.id}
              onClick={() => setActiveDay(day)}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm text-left hover:bg-white/80 transition-colors border border-blush-100"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blush-100 to-rose-100 text-xl">
                {day.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-warm-500">
                    Day {day.id}
                  </span>
                  <span className="text-xs text-warm-300">•</span>
                  <span className="text-xs text-warm-500">{day.title}</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-warm-800">
                  {day.name}
                </h3>
                <p className="text-sm text-warm-600">{day.subtitle}</p>
              </div>
              <div className="text-2xl text-warm-300">→</div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-white/40 backdrop-blur-sm">
          <h2 className="font-medium mb-2 text-warm-800">Testing Notes:</h2>
          <ul className="text-sm space-y-1 text-warm-600">
            <li>• <strong>Day 1:</strong> Hover/tap roses, select one</li>
            <li>• <strong>Day 2:</strong> Press and hold anywhere for 3.5s</li>
            <li>• <strong>Day 3:</strong> Drag wrapper to the right slowly</li>
            <li>• <strong>Day 4:</strong> Drag teddy to center and release</li>
            <li>• <strong>Day 5:</strong> Trace/drag from left to right</li>
            <li>• <strong>Day 6:</strong> Press and hold for 4s to build warmth</li>
            <li>• <strong>Day 7:</strong> Move cursor/finger toward center to merge forms</li>
            <li>• <strong>Day 8:</strong> Tap once to start convergence</li>
          </ul>
        </div>

        <p className="text-center mt-8 text-sm text-warm-500">
          <a href="/" className="underline hover:no-underline">← Back to main experience</a>
        </p>
      </div>
    </div>
  );
}

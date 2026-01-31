"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";
import { 
  EmotionalState, 
  emotionToColors, 
  initialEmotionalState, 
  dayEmotions, 
  blendEmotions 
} from "@/lib/emotional-state";

interface JourneyContainerProps {
  activeDay: number | null;
  children: React.ReactNode;
}

export function JourneyContainer({ activeDay, children }: JourneyContainerProps) {
  const [emotion, setEmotion] = useState<EmotionalState>(initialEmotionalState);
  const emotionRef = useRef(emotion);
  emotionRef.current = emotion;
  
  useEffect(() => {
    const targetEmotion: EmotionalState = activeDay === null
      ? {
          ...initialEmotionalState,
          warmth: Math.max(initialEmotionalState.warmth, emotionRef.current.warmth * 0.3),
          completion: emotionRef.current.completion,
        }
      : {
          ...emotionRef.current,
          ...dayEmotions[activeDay],
          completion: activeDay / 8,
        };
    
    const startEmotion = { ...emotionRef.current };
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setEmotion(blendEmotions(startEmotion, targetEmotion, progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [activeDay]);
  
  const colors = useMemo(() => emotionToColors(emotion), [emotion]);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{ background: colors.gradient }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at 50% 45%, ${colors.glowColor} 0%, transparent 55%)`,
        }}
        transition={{ duration: 2 }}
      />
      
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none opacity-25"
        animate={{
          background: [
            `radial-gradient(ellipse at 40% 40%, ${colors.glowColor} 0%, transparent 40%)`,
            `radial-gradient(ellipse at 60% 60%, ${colors.glowColor} 0%, transparent 40%)`,
            `radial-gradient(ellipse at 40% 40%, ${colors.glowColor} 0%, transparent 40%)`,
          ],
        }}
        transition={{
          duration: colors.ambientDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {children}
    </div>
  );
}

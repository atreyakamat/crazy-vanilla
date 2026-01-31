"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface InteractionZoneProps {
  onProgressChange: (progress: number) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
  currentProgress: number;
  isComplete: boolean;
}

export function InteractionZone({
  onProgressChange,
  onInteractionStart,
  onInteractionEnd,
  currentProgress,
  isComplete,
}: InteractionZoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  
  const calculateProgress = useCallback((clientX: number) => {
    if (!containerRef.current) return currentProgress;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    
    // Only allow forward progress (can't go backward)
    return Math.max(currentProgress, progress);
  }, [currentProgress]);
  
  const handleStart = useCallback((clientX: number) => {
    if (isComplete) return;
    isInteracting.current = true;
    onInteractionStart();
    onProgressChange(calculateProgress(clientX));
  }, [isComplete, calculateProgress, onInteractionStart, onProgressChange]);
  
  const handleMove = useCallback((clientX: number) => {
    if (!isInteracting.current || isComplete) return;
    onProgressChange(calculateProgress(clientX));
  }, [isComplete, calculateProgress, onProgressChange]);
  
  const handleEnd = useCallback(() => {
    isInteracting.current = false;
    onInteractionEnd();
  }, [onInteractionEnd]);
  
  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();
  
  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };
  const onTouchEnd = () => handleEnd();
  
  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto h-24 cursor-pointer touch-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {/* Invisible interaction area */}
      <div className="absolute inset-0" />
      
      {/* Visual guide line - shows before interaction starts */}
      {currentProgress === 0 && !isComplete && (
        <motion.div
          className="absolute left-4 right-4 top-1/2 h-px"
          style={{ background: "rgba(180, 160, 140, 0.2)" }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface WrapperProps {
  onProgressChange: (progress: number) => void;
  onComplete: () => void;
  isComplete: boolean;
}

export function Wrapper({ onProgressChange, onComplete, isComplete }: WrapperProps) {
  const constraintsRef = useRef(null);
  const dragX = useMotionValue(0);
  const lastVelocity = useRef(0);
  
  // Maximum drag distance for full reveal
  const MAX_DRAG = 200;
  
  // Transform drag to wrapper position with resistance
  const wrapperX = useTransform(dragX, [0, MAX_DRAG], [0, 220]);
  const wrapperOpacity = useTransform(dragX, [0, MAX_DRAG * 0.8, MAX_DRAG], [1, 0.6, 0]);
  const wrapperScale = useTransform(dragX, [0, MAX_DRAG], [1, 0.95]);
  
  // Fold deformation based on drag
  const foldRotate = useTransform(dragX, [0, MAX_DRAG * 0.5, MAX_DRAG], [0, 5, 15]);
  const foldSkew = useTransform(dragX, [0, MAX_DRAG], [0, -8]);
  
  // Calculate progress for parent
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentX = dragX.get();
    const velocity = Math.abs(info.velocity.x);
    lastVelocity.current = velocity;
    
    // Apply resistance for fast drags - slow down the response
    const resistanceFactor = velocity > 500 ? 0.3 : velocity > 200 ? 0.6 : 1;
    const newX = Math.max(0, Math.min(currentX + info.delta.x * resistanceFactor, MAX_DRAG));
    
    dragX.set(newX);
    onProgressChange(newX / MAX_DRAG);
  };
  
  const handleDragEnd = () => {
    const currentX = dragX.get();
    const progress = currentX / MAX_DRAG;
    
    // If past 85%, complete the unwrap
    if (progress > 0.85) {
      dragX.set(MAX_DRAG);
      onProgressChange(1);
      onComplete();
    }
    // Otherwise stay where released (no snap back)
  };
  
  if (isComplete) {
    return null;
  }
  
  return (
    <div 
      ref={constraintsRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: wrapperX, opacity: wrapperOpacity, scale: wrapperScale }}
        drag="x"
        dragConstraints={{ left: 0, right: MAX_DRAG }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        {/* Main wrapper body */}
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ 
            rotateY: foldRotate,
            skewY: foldSkew,
            transformOrigin: "left center",
          }}
        >
          {/* Gold foil base */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                rgb(218, 175, 95) 0%,
                rgb(245, 215, 140) 25%,
                rgb(200, 160, 80) 50%,
                rgb(235, 200, 120) 75%,
                rgb(195, 155, 75) 100%
              )`,
            }}
          />
          
          {/* Foil texture lines */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.1) 2px,
                rgba(255, 255, 255, 0.1) 4px
              )`,
            }}
          />
          
          {/* Wrapper crinkle texture */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(0, 0, 0, 0.05) 10px,
                rgba(0, 0, 0, 0.05) 20px
              )`,
            }}
          />
          
          {/* Ribbon stripe */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-5 -translate-y-1/2"
            style={{
              background: `linear-gradient(
                180deg,
                rgb(180, 80, 100) 0%,
                rgb(200, 100, 120) 50%,
                rgb(170, 70, 90) 100%
              )`,
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
            }}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                110deg,
                transparent 20%,
                rgba(255, 255, 255, 0.4) 40%,
                rgba(255, 255, 255, 0.1) 60%,
                transparent 80%
              )`,
            }}
            animate={{
              x: [-100, 300],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Edge shadow for depth */}
          <div 
            className="absolute inset-y-0 right-0 w-4"
            style={{
              background: `linear-gradient(
                to right,
                transparent,
                rgba(0, 0, 0, 0.15)
              )`,
            }}
          />
        </motion.div>
        
        {/* Left fold/tab */}
        <motion.div
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-l-lg"
          style={{
            background: `linear-gradient(
              to left,
              rgb(200, 160, 80),
              rgb(180, 140, 60)
            )`,
            boxShadow: `
              -2px 0 8px rgba(0, 0, 0, 0.2),
              inset 1px 0 0 rgba(255, 255, 255, 0.1)
            `,
            rotateY: foldRotate,
            transformOrigin: "right center",
          }}
        />
        
        {/* Right fold edge */}
        <motion.div
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-20 rounded-r-lg"
          style={{
            background: `linear-gradient(
              to right,
              rgb(190, 150, 70),
              rgb(170, 130, 50)
            )`,
            boxShadow: `2px 0 8px rgba(0, 0, 0, 0.15)`,
          }}
        />
      </motion.div>
      
      {/* Drag handle indicator */}
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        <span className="text-amber-700/40 text-xs">→</span>
      </motion.div>
    </div>
  );
}

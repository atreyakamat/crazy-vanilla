"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface TeddyBearProps {
  isHugging: boolean;
  isDragging: boolean;
  tiltX: number; // -1 to 1 based on drag direction
  tiltY: number;
}

export function TeddyBear({ isHugging, isDragging, tiltX, tiltY }: TeddyBearProps) {
  // Subtle tilt based on drag direction
  const rotation = tiltX * 8;
  const scaleX = isHugging ? 1.08 : 1;
  const scaleY = isHugging ? 0.92 : 1;
  
  return (
    <motion.div
      className="relative"
      animate={{
        rotate: isDragging ? rotation : 0,
        scaleX: scaleX,
        scaleY: scaleY,
      }}
      transition={{
        rotate: { type: "spring", stiffness: 100, damping: 20 },
        scaleX: { duration: 0.6, ease: organicEasings.settle },
        scaleY: { duration: 0.6, ease: organicEasings.settle },
      }}
    >
      <svg
        viewBox="0 0 120 140"
        className="w-32 h-40 sm:w-40 sm:h-48"
        style={{ filter: "drop-shadow(0 8px 16px rgba(160, 120, 80, 0.2))" }}
      >
        <defs>
          {/* Soft fur gradient */}
          <radialGradient id="furGradient" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgb(225, 200, 170)" />
            <stop offset="50%" stopColor="rgb(210, 180, 145)" />
            <stop offset="100%" stopColor="rgb(190, 160, 125)" />
          </radialGradient>
          
          {/* Inner ear/paw gradient */}
          <radialGradient id="innerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(235, 210, 185)" />
            <stop offset="100%" stopColor="rgb(220, 190, 160)" />
          </radialGradient>
          
          {/* Soft shadow for depth */}
          <filter id="softInner" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="0" dy="2" result="offset" />
            <feComposite in="SourceGraphic" in2="offset" operator="over" />
          </filter>
        </defs>
        
        {/* Left ear */}
        <motion.ellipse
          cx="30"
          cy="25"
          rx="18"
          ry="18"
          fill="url(#furGradient)"
          animate={{
            cy: isHugging ? 27 : 25,
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Left ear inner */}
        <ellipse
          cx="30"
          cy="25"
          rx="10"
          ry="10"
          fill="url(#innerGradient)"
        />
        
        {/* Right ear */}
        <motion.ellipse
          cx="90"
          cy="25"
          rx="18"
          ry="18"
          fill="url(#furGradient)"
          animate={{
            cy: isHugging ? 27 : 25,
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Right ear inner */}
        <ellipse
          cx="90"
          cy="25"
          rx="10"
          ry="10"
          fill="url(#innerGradient)"
        />
        
        {/* Head */}
        <motion.ellipse
          cx="60"
          cy="50"
          rx="35"
          ry="32"
          fill="url(#furGradient)"
          animate={{
            ry: isHugging ? 30 : 32,
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Body */}
        <motion.ellipse
          cx="60"
          cy="100"
          rx="38"
          ry="38"
          fill="url(#furGradient)"
          animate={{
            ry: isHugging ? 34 : 38,
            rx: isHugging ? 42 : 38,
          }}
          transition={{ duration: 0.5, ease: organicEasings.settle }}
        />
        
        {/* Left arm */}
        <motion.ellipse
          cx="25"
          cy="95"
          rx="12"
          ry="20"
          fill="url(#furGradient)"
          style={{ transformOrigin: "25px 80px" }}
          animate={{
            rotate: isHugging ? 25 : 0,
          }}
          transition={{ duration: 0.5, ease: organicEasings.settle }}
        />
        
        {/* Right arm */}
        <motion.ellipse
          cx="95"
          cy="95"
          rx="12"
          ry="20"
          fill="url(#furGradient)"
          style={{ transformOrigin: "95px 80px" }}
          animate={{
            rotate: isHugging ? -25 : 0,
          }}
          transition={{ duration: 0.5, ease: organicEasings.settle }}
        />
        
        {/* Left leg */}
        <ellipse
          cx="40"
          cy="132"
          rx="14"
          ry="10"
          fill="url(#furGradient)"
        />
        <ellipse
          cx="40"
          cy="132"
          rx="8"
          ry="6"
          fill="url(#innerGradient)"
        />
        
        {/* Right leg */}
        <ellipse
          cx="80"
          cy="132"
          rx="14"
          ry="10"
          fill="url(#furGradient)"
        />
        <ellipse
          cx="80"
          cy="132"
          rx="8"
          ry="6"
          fill="url(#innerGradient)"
        />
        
        {/* Muzzle */}
        <ellipse
          cx="60"
          cy="58"
          rx="12"
          ry="8"
          fill="url(#innerGradient)"
        />
        
        {/* Nose */}
        <ellipse
          cx="60"
          cy="54"
          rx="5"
          ry="4"
          fill="rgb(100, 75, 55)"
        />
        
        {/* Eyes */}
        <motion.ellipse
          cx="47"
          cy="42"
          rx="4"
          ry="5"
          fill="rgb(60, 45, 35)"
          animate={{
            ry: isHugging ? 2 : 5, // Close eyes during hug
          }}
          transition={{ duration: 0.3, delay: isHugging ? 0.2 : 0 }}
        />
        <motion.ellipse
          cx="73"
          cy="42"
          rx="4"
          ry="5"
          fill="rgb(60, 45, 35)"
          animate={{
            ry: isHugging ? 2 : 5,
          }}
          transition={{ duration: 0.3, delay: isHugging ? 0.2 : 0 }}
        />
        
        {/* Eye highlights */}
        <circle cx="48" cy="40" r="1.5" fill="rgba(255,255,255,0.6)" />
        <circle cx="74" cy="40" r="1.5" fill="rgba(255,255,255,0.6)" />
        
        {/* Smile - grows during hug */}
        <motion.path
          d="M 52 62 Q 60 68 68 62"
          fill="none"
          stroke="rgb(100, 75, 55)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: isHugging 
              ? "M 50 62 Q 60 72 70 62" 
              : "M 52 62 Q 60 68 68 62",
          }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        
        {/* Belly heart */}
        <motion.path
          d="M 60 95 
             C 55 90, 48 93, 48 98 
             C 48 103, 55 108, 60 112 
             C 65 108, 72 103, 72 98 
             C 72 93, 65 90, 60 95"
          fill="rgb(220, 160, 160)"
          animate={{
            scale: isHugging ? 1.15 : 1,
            opacity: isHugging ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ transformOrigin: "60px 100px" }}
        />
      </svg>
    </motion.div>
  );
}

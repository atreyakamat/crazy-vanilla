"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface RoseProps {
  id: number;
  isHovered: boolean;
  isSelected: boolean;
  isOther: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  colorScheme: {
    primary: string;
    secondary: string;
    glow: string;
    accent: string;
  };
}

export function Rose({
  id,
  isHovered,
  isSelected,
  isOther,
  onHover,
  onLeave,
  onSelect,
  colorScheme,
}: RoseProps) {
  // Multi-stage bloom: focus → scale → petals (overlapping)
  const focusBlur = isHovered || isSelected ? 0 : 3;
  const saturation = isHovered || isSelected ? 1.15 : 0.85;
  const baseScale = isSelected ? 1.12 : isHovered ? 1.06 : 1;
  const petalExpansion = isHovered || isSelected ? 1.04 : 1;
  
  return (
    <motion.button
      className="relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-200 focus-visible:ring-offset-4 rounded-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
      onTouchEnd={onLeave}
      onClick={onSelect}
      disabled={isOther}
      initial={{ opacity: 0, scale: 0.85, y: 25 }}
      animate={{
        opacity: isOther ? 0 : 1,
        scale: baseScale,
        y: isOther ? 15 : 0,
        x: isOther ? (id === 1 ? -40 : id === 3 ? 40 : 0) : 0,
        filter: `blur(${focusBlur}px) saturate(${saturation})`,
      }}
      transition={{
        // Stagger the stages: focus first, then scale, then position
        opacity: { duration: 1.4, ease: organicEasings.fade },
        scale: { duration: 0.9, ease: organicEasings.bloom, delay: 0.1 },
        y: { duration: 1.2, ease: organicEasings.bloom },
        x: { duration: 1.6, ease: organicEasings.settle },
        filter: { duration: 0.6, ease: organicEasings.fade }, // Focus sharpens first
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {/* Glow layer - subtle, builds slowly */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered || isSelected ? 0.5 : 0,
          scale: isHovered || isSelected ? 1.4 : 1,
        }}
        transition={{
          duration: 1.2, // Slow glow build
          ease: organicEasings.bloom,
          delay: 0.15, // After focus sharpens
        }}
        style={{
          background: `radial-gradient(circle, ${colorScheme.glow} 0%, transparent 65%)`,
        }}
      />
      
      {/* Rose SVG - Abstract, organic */}
      <motion.svg
        viewBox="0 0 100 120"
        className="w-24 h-28 sm:w-32 sm:h-36"
        animate={{
          scale: petalExpansion,
        }}
        transition={{
          duration: 1.4, // Petals expand last, slowest
          ease: organicEasings.bloom,
          delay: 0.25,
        }}
      >
        {/* Stem - draws in */}
        <motion.path
          d="M50 120 Q48 100 50 80 Q52 70 50 60"
          fill="none"
          stroke="#5a7a5a"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1.8, delay: 0.2, ease: organicEasings.bloom }}
        />
        
        {/* Leaf */}
        <motion.path
          d="M50 85 Q32 78 26 65 Q38 72 50 78"
          fill="#6b8a6b"
          initial={{ opacity: 0, scale: 0, x: 10 }}
          animate={{ opacity: 0.85, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ transformOrigin: "50px 85px" }}
        />
        
        {/* Outer petals - expand microscopically on hover */}
        <motion.g
          animate={{
            scale: isHovered || isSelected ? 1.03 : 1,
          }}
          transition={{ duration: 1.6, ease: organicEasings.bloom, delay: 0.3 }}
          style={{ transformOrigin: "50px 45px" }}
        >
          {[0, 72, 144, 216, 288].map((rotation, i) => (
            <motion.ellipse
              key={i}
              cx="50"
              cy="28"
              rx="17"
              ry="24"
              fill={colorScheme.primary}
              transform={`rotate(${rotation} 50 45)`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ 
                opacity: 0.88,
                scale: isHovered || isSelected ? 1.08 : 1,
              }}
              transition={{ 
                duration: 1.3, 
                delay: 0.08 * i + 0.1,
                ease: organicEasings.bloom,
              }}
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
            />
          ))}
        </motion.g>
        
        {/* Inner petals - tighter, more responsive */}
        <motion.g
          animate={{
            scale: isHovered || isSelected ? 1.06 : 1,
          }}
          transition={{ duration: 1.3, ease: organicEasings.bloom, delay: 0.35 }}
          style={{ transformOrigin: "50px 42px" }}
        >
          {[36, 108, 180, 252, 324].map((rotation, i) => (
            <motion.ellipse
              key={i}
              cx="50"
              cy="32"
              rx="11"
              ry="16"
              fill={colorScheme.secondary}
              transform={`rotate(${rotation} 50 42)`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ 
                opacity: 1,
                scale: isHovered || isSelected ? 1.12 : 1,
              }}
              transition={{ 
                duration: 1.1,
                delay: 0.12 * i + 0.35,
                ease: organicEasings.bloom,
              }}
            />
          ))}
        </motion.g>
        
        {/* Center bloom - heart of the rose */}
        <motion.circle
          cx="50"
          cy="42"
          r="7"
          fill={colorScheme.accent}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isHovered || isSelected ? 1.15 : 1,
            opacity: 1,
          }}
          transition={{ duration: 0.9, delay: 0.7, ease: organicEasings.bloom }}
          style={{ filter: "brightness(0.92)" }}
        />
      </motion.svg>
    </motion.button>
  );
}

"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface AbstractHeartProps {
  stability: number; // 0 to 1
  isHolding: boolean;
  isComplete: boolean;
}

export function AbstractHeart({ stability, isHolding, isComplete }: AbstractHeartProps) {
  // Idle pulse: slightly imperfect, almost anxious when unstable
  // As stability increases: amplitude decreases, rhythm evens out
  const pulseAmplitude = 0.08 * (1 - stability * 0.85);
  const pulseSpeed = 1.8 + stability * 1.5; // Slower, steadier with stability
  const pulseIrregularity = (1 - stability) * 0.15; // Random variance decreases
  
  // Glow becomes warmer with stability
  const glowWarmth = stability;
  const glowIntensity = 0.15 + stability * 0.35;
  
  // Scale range narrows to stillness
  const scaleBase = 1;
  const scaleVariance = pulseAmplitude;
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow - warmer, steadier with stability */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        animate={{
          opacity: isComplete ? 0.45 : [glowIntensity * 0.5, glowIntensity, glowIntensity * 0.5],
          scale: isComplete ? 1.15 : [0.96, 1.04, 0.96],
        }}
        transition={{
          duration: pulseSpeed * 1.3,
          repeat: isComplete ? 0 : Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle, 
            rgba(${225 + glowWarmth * 25}, ${175 - glowWarmth * 25}, ${165 - glowWarmth * 35}, ${glowIntensity}) 0%, 
            transparent 65%)`,
        }}
      />
      
      {/* Middle glow layer - stabilizes */}
      <motion.div
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        animate={{
          opacity: isComplete ? 0.55 : [0.25, 0.45, 0.25],
          scale: isComplete ? 1.08 : [0.97 + pulseIrregularity, 1.03 - pulseIrregularity, 0.97 + pulseIrregularity],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: isComplete ? 0 : Infinity,
          ease: "easeInOut",
          delay: 0.08,
        }}
        style={{
          background: `radial-gradient(circle, 
            rgba(${235 + glowWarmth * 18}, ${185 - glowWarmth * 18}, ${175 - glowWarmth * 25}, 0.35) 0%, 
            transparent 55%)`,
        }}
      />
      
      {/* Main heart form */}
      <motion.div
        className="relative w-32 h-32 cursor-pointer"
        animate={{
          scale: isComplete 
            ? 1 
            : [scaleBase - scaleVariance, scaleBase + scaleVariance, scaleBase - scaleVariance],
          rotate: isComplete 
            ? 0 
            : [(1 - stability) * -0.8, (1 - stability) * 0.8, (1 - stability) * -0.8],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: isComplete ? 0 : Infinity,
          ease: [0.45, 0.05, 0.55, 0.95], // Breathing ease
        }}
      >
        {/* Heart SVG */}
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{
            filter: `blur(${(1 - stability) * 0.8}px)`,
          }}
        >
          <defs>
            <radialGradient id="heartGradient" cx="50%" cy="40%" r="60%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: `rgb(${248 + glowWarmth * 7}, ${198 - glowWarmth * 35}, ${188 - glowWarmth * 45})`,
                }}
                transition={{ duration: 0.6 }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: `rgb(${218 + glowWarmth * 22}, ${148 - glowWarmth * 28}, ${138 - glowWarmth * 38})`,
                }}
                transition={{ duration: 0.6 }}
              />
            </radialGradient>
            
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.12" />
            </filter>
          </defs>
          
          <motion.path
            d="M50 88 
               C25 70, 8 50, 12 32 
               C16 14, 35 10, 50 28 
               C65 10, 84 14, 88 32 
               C92 50, 75 70, 50 88Z"
            fill="url(#heartGradient)"
            filter="url(#softShadow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: organicEasings.bloom }}
          />
          
          {/* Inner highlight - more visible when stable */}
          <motion.ellipse
            cx="38"
            cy="36"
            rx="9"
            ry="11"
            fill={`rgba(255,255,255,${0.15 + stability * 0.2})`}
            animate={{
              opacity: isComplete ? 0.4 : [0.18, 0.32, 0.18],
            }}
            transition={{
              duration: pulseSpeed * 0.85,
              repeat: isComplete ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </motion.div>
      
      {/* Holding indicator ring */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border-2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: isHolding && !isComplete ? 0.35 : 0,
          scale: isHolding && !isComplete ? 1 : 0.92,
          borderColor: `rgba(${218 + glowWarmth * 28}, ${158 - glowWarmth * 18}, ${148 - glowWarmth * 28}, 0.35)`,
        }}
        transition={{ duration: 0.7, ease: organicEasings.fade }}
      />
    </div>
  );
}

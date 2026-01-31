"use client";

import { motion } from "framer-motion";
import { organicEasings } from "@/lib/animations";

interface DayPoint {
  id: number;
  initialX: number;
  initialY: number;
  color: string;
  size: number;
}

// Each point represents a day - positioned loosely like memories
const dayPoints: DayPoint[] = [
  { id: 1, initialX: -90, initialY: -60, color: "rgba(232, 160, 160, 0.7)", size: 8 },  // Rose
  { id: 2, initialX: 70, initialY: -80, color: "rgba(220, 180, 160, 0.7)", size: 7 },   // Propose
  { id: 3, initialX: -60, initialY: 30, color: "rgba(200, 160, 120, 0.7)", size: 9 },   // Chocolate
  { id: 4, initialX: 85, initialY: 45, color: "rgba(210, 180, 145, 0.7)", size: 8 },    // Teddy
  { id: 5, initialX: -40, initialY: -90, color: "rgba(180, 160, 150, 0.7)", size: 6 },  // Promise
  { id: 6, initialX: 30, initialY: 70, color: "rgba(230, 190, 180, 0.7)", size: 8 },    // Hug
  { id: 7, initialX: -80, initialY: 80, color: "rgba(235, 200, 195, 0.7)", size: 7 },   // Kiss
];

interface DayConstellationProps {
  convergence: number; // 0 = spread, 1 = converged
  isResolved: boolean;
  onInteraction: () => void;
}

export function DayConstellation({ convergence, isResolved, onInteraction }: DayConstellationProps) {
  return (
    <motion.div
      className="relative w-64 h-64 cursor-pointer"
      onClick={onInteraction}
      initial={{ opacity: 0 }}
      animate={{ opacity: isResolved ? 0 : 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Connection lines - appear as convergence increases */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="-128 -128 256 256"
      >
        {convergence > 0.2 && dayPoints.map((point, i) => {
          const nextPoint = dayPoints[(i + 1) % dayPoints.length];
          const currentX = point.initialX * (1 - convergence);
          const currentY = point.initialY * (1 - convergence);
          const nextX = nextPoint.initialX * (1 - convergence);
          const nextY = nextPoint.initialY * (1 - convergence);
          
          return (
            <motion.line
              key={`line-${i}`}
              x1={currentX}
              y1={currentY}
              x2={nextX}
              y2={nextY}
              stroke={`rgba(220, 190, 180, ${(convergence - 0.2) * 0.4})`}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: convergence > 0.3 ? 1 : 0 }}
              transition={{ duration: 2, ease: organicEasings.fade }}
            />
          );
        })}
        
        {/* Center connections */}
        {convergence > 0.4 && dayPoints.map((point, i) => {
          const currentX = point.initialX * (1 - convergence);
          const currentY = point.initialY * (1 - convergence);
          
          return (
            <motion.line
              key={`center-${i}`}
              x1={currentX}
              y1={currentY}
              x2={0}
              y2={0}
              stroke={`rgba(230, 200, 190, ${(convergence - 0.4) * 0.3})`}
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}
      </svg>
      
      {/* Day points */}
      {dayPoints.map((point, index) => {
        const currentX = point.initialX * (1 - convergence);
        const currentY = point.initialY * (1 - convergence);
        
        return (
          <motion.div
            key={point.id}
            className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
            style={{
              width: point.size,
              height: point.size,
              marginLeft: -point.size / 2,
              marginTop: -point.size / 2,
              background: point.color,
              boxShadow: `0 0 ${10 + convergence * 15}px ${point.color}`,
            }}
            initial={{ x: point.initialX, y: point.initialY, opacity: 0 }}
            animate={{
              x: currentX,
              y: currentY,
              opacity: 1,
              scale: 1 + convergence * 0.3,
            }}
            transition={{
              x: { duration: 2, ease: organicEasings.settle },
              y: { duration: 2, ease: organicEasings.settle },
              opacity: { duration: 1, delay: index * 0.15 },
              scale: { duration: 1.5 },
            }}
          >
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: point.color }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Center glow - builds with convergence */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 20 + convergence * 40,
          height: 20 + convergence * 40,
          background: `radial-gradient(circle, 
            rgba(240, 210, 200, ${convergence * 0.5}) 0%, 
            transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

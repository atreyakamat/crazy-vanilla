"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AmbientBackgroundProps {
  accentColor?: string;
  intensity?: number;
}

export function AmbientBackground({ 
  accentColor = "rgba(248, 180, 190, 0.12)",
  intensity = 0.5,
}: AmbientBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - early morning light feeling */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            140deg,
            #fffefa 0%,
            #fef8f6 20%,
            #fefaf7 45%,
            #fef8f5 70%,
            #fffdfb 100%
          )`,
        }}
      />
      
      {/* Layered gradient drift - extremely slow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse at 25% 25%, ${accentColor} 0%, transparent 45%)`,
            `radial-gradient(ellipse at 75% 65%, ${accentColor} 0%, transparent 45%)`,
            `radial-gradient(ellipse at 35% 75%, ${accentColor} 0%, transparent 45%)`,
            `radial-gradient(ellipse at 25% 25%, ${accentColor} 0%, transparent 45%)`,
          ],
        }}
        transition={{
          duration: 35, // Very slow drift
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ opacity: intensity }}
      />
      
      {/* Secondary layer for depth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse at 65% 35%, rgba(255, 245, 235, 0.4) 0%, transparent 40%)`,
            `radial-gradient(ellipse at 35% 55%, rgba(255, 245, 235, 0.4) 0%, transparent 40%)`,
            `radial-gradient(ellipse at 65% 35%, rgba(255, 245, 235, 0.4) 0%, transparent 40%)`,
          ],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle grain texture - low contrast */}
      <div 
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating particles - very subtle life */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "rgba(248, 200, 195, 0.25)",
            left: `${12 + i * 18}%`,
            top: `${18 + (i % 3) * 28}%`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 6, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

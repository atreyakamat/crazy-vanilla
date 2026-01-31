"use client";

/**
 * DragElements
 * 
 * Makes elements draggable with smooth motion and boundaries.
 * Perfect for interactive card or object movement.
 * 
 * @param children - Element to make draggable
 * @param constraints - Drag boundaries
 * @param onDragEnd - Callback when drag ends
 * @param snapBack - Whether to return to origin
 * @param elastic - Elasticity at boundaries
 */

import { ReactNode, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useAnimation } from "./AnimationProvider";

interface DragElementsProps {
  children: ReactNode;
  constraints?: { top?: number; right?: number; bottom?: number; left?: number } | "parent";
  onDragEnd?: (info: PanInfo) => void;
  snapBack?: boolean;
  elastic?: number;
  className?: string;
}

export function DragElements({
  children,
  constraints = "parent",
  onDragEnd,
  snapBack = false,
  elastic = 0.5,
  className = "",
}: DragElementsProps) {
  const { prefersReducedMotion } = useAnimation();
  const constraintsRef = useRef(null);
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div ref={constraints === "parent" ? constraintsRef : undefined} className="relative">
      <motion.div
        className={`cursor-grab active:cursor-grabbing ${className}`}
        drag
        dragConstraints={constraints === "parent" ? constraintsRef : constraints}
        dragElastic={elastic}
        dragMomentum={!snapBack}
        whileDrag={{ scale: 1.02, zIndex: 10 }}
        onDragEnd={(_, info) => onDragEnd?.(info)}
        animate={snapBack ? { x: 0, y: 0 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Example usage:
// <DragElements snapBack>
//   <div className="w-24 h-24 bg-rose-200 rounded-xl" />
// </DragElements>

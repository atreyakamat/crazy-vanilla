"use client";

/**
 * GooeyFilter
 * 
 * SVG filter wrapper that creates liquid, gooey visual effects.
 * Wrap any elements to give them an organic, melting appearance.
 * 
 * @param id - Unique filter ID
 * @param blur - Blur amount for gooey effect
 * @param contrast - Color matrix contrast
 * @param children - Elements to apply filter to
 */

import { ReactNode } from "react";

interface GooeyFilterProps {
  id?: string;
  blur?: number;
  contrast?: number;
  children: ReactNode;
  className?: string;
}

export function GooeyFilter({
  id = "gooey",
  blur = 10,
  contrast = 20,
  children,
  className = "",
}: GooeyFilterProps) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={id}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} -${contrast / 2}`}
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      <div style={{ filter: `url(#${id})` }}>
        {children}
      </div>
    </div>
  );
}

// Example usage:
// <GooeyFilter blur={12}>
//   <div className="flex gap-2">
//     <div className="w-10 h-10 rounded-full bg-rose-300" />
//     <div className="w-10 h-10 rounded-full bg-rose-400" />
//   </div>
// </GooeyFilter>

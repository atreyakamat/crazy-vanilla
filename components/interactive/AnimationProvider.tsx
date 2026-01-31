"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface AnimationContextType {
  prefersReducedMotion: boolean;
  animationSpeed: number;
  isTouch: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  animationSpeed: 1,
  isTouch: false,
});

export function AnimationProvider({ children }: { children: ReactNode }) {
  return (
    <AnimationContext.Provider value={{ prefersReducedMotion: false, animationSpeed: 1, isTouch: false }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}

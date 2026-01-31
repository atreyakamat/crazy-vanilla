import { Variants, Transition } from "framer-motion";

// Unified easing curves - emotional, not mechanical
export const easings = {
  soft: [0.16, 1, 0.3, 1] as const,
  gentle: [0.34, 1.02, 0.64, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  breathe: [0.45, 0, 0.55, 1] as const,
  settle: [0.25, 0.8, 0.25, 1] as const,
};

// Organic easings - feel human, not computed
export const organicEasings = {
  bloom: [0.23, 1, 0.32, 1] as const,
  drift: [0.25, 0.46, 0.45, 0.94] as const,
  reveal: [0.4, 0, 0.2, 1] as const,
  fade: [0.16, 1, 0.3, 1] as const,
  settle: [0.34, 1.02, 0.64, 1] as const,
  breathe: [0.45, 0, 0.55, 1] as const,
  unwrap: [0.32, 0.72, 0.35, 1] as const,
  comfort: [0.25, 0.8, 0.25, 1] as const,
};

// Base transitions - consistent timing across experience
export const transitions: Record<string, Transition> = {
  soft: {
    type: "tween",
    ease: easings.soft,
    duration: 0.6,
  },
  gentle: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  slow: {
    type: "tween",
    ease: easings.soft,
    duration: 1.2,
  },
  breathe: {
    type: "tween",
    ease: easings.breathe,
    duration: 0.8,
  },
  emotional: {
    type: "tween",
    ease: easings.settle,
    duration: 1.5,
  },
};

// Fade variants - opacity only, respectful
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: organicEasings.fade },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4, ease: organicEasings.fade },
  },
};

// Fade up variants - gentle entry
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: organicEasings.settle },
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: { duration: 0.5, ease: organicEasings.fade },
  },
};

// Stagger container - unified rhythm
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

// Float animation - living, not distracting
export const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 5,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

// Pulse animation - breathing, not alerting
export const pulseAnimation = {
  scale: [1, 1.03, 1],
  opacity: [1, 0.92, 1],
  transition: {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

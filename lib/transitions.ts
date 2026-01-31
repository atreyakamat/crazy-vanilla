import { Transition, Variants } from "framer-motion";

// All transitions decelerate into rest
export const journeyTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.8, 0.25, 1], // Decelerate into stillness
  duration: 0.8,
};

export const breatheTransition: Transition = {
  type: "tween",
  ease: [0.4, 0, 0.2, 1],
  duration: 1.2,
};

export const settleTransition: Transition = {
  type: "tween",
  ease: [0.23, 1, 0.32, 1],
  duration: 1.5,
};

// Container variants for day transitions
export const dayContainerVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      ...settleTransition,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    transition: {
      ...breatheTransition,
      duration: 0.8,
    },
  },
};

// Shared element transitions for layout continuity
export const sharedElementTransition: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
  mass: 0.8,
};

// Text reveal - opacity only, respectful
export const textRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Day card presence states
export const dayPresenceVariants: Variants = {
  past: {
    opacity: 0.85,
    scale: 1,
    y: 0,
  },
  today: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  future: {
    opacity: 0.5,
    scale: 0.98,
    y: 0,
  },
  locked: {
    opacity: 0.4,
    scale: 0.96,
    y: 0,
  },
};

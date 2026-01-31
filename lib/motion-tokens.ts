/**
 * 🎨 EMOTION-DRIVEN DESIGN TOKENS
 * 
 * Use these in your Framer Motion animations to stay consistent
 * with the Tailwind design system.
 * 
 * Philosophy: Tailwind handles static styles, Framer handles transitions
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⏱ TIMING (matches Tailwind duration tokens)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const timing = {
  fast: 0.2,      // Quick acknowledgment (200ms)
  soft: 0.4,      // Gentle response (400ms)
  slow: 0.7,      // Emotional shift (700ms)
  linger: 1.2,    // Ambient drift (1200ms)
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎢 EASING (matches Tailwind ease tokens)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const easing = {
  settle: [0.25, 0.8, 0.25, 1],           // Slow deceleration
  soft: [0.16, 1, 0.3, 1],                // Gentle ease
  drift: [0.34, 0.46, 0.45, 0.94],        // Ambient float
  breathe: [0.45, 0, 0.55, 1],            // Inhale/exhale
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎭 PRESET TRANSITIONS
// Ready-to-use transition configs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const transitions = {
  // Quick interaction acknowledgment
  fast: {
    duration: timing.fast,
    ease: easing.soft,
  },
  
  // Gentle UI response
  soft: {
    duration: timing.soft,
    ease: easing.soft,
  },
  
  // Emotional state change
  emotional: {
    duration: timing.slow,
    ease: easing.settle,
  },
  
  // Ambient movement
  ambient: {
    duration: timing.linger,
    ease: easing.drift,
  },
  
  // Breathing rhythm
  breathe: {
    duration: timing.linger,
    ease: easing.breathe,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📦 COMMON VARIANTS
// Reusable animation patterns
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const variants = {
  // Fade in/out
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.soft,
  },
  
  // Fade up (entry from below)
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: transitions.emotional,
  },
  
  // Scale in (gentle bloom)
  scaleIn: {
    initial: { scale: 0.92, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: transitions.soft,
  },
  
  // Blur in (focus reveal)
  blurIn: {
    initial: { filter: "blur(12px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(8px)", opacity: 0 },
    transition: transitions.emotional,
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌀 AMBIENT ANIMATIONS
// Infinite loops for background life
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ambient = {
  // Breathing scale + opacity
  breathe: {
    animate: {
      scale: [1, 1.03, 1],
      opacity: [1, 0.92, 1],
    },
    transition: {
      duration: 5,
      ease: easing.breathe,
      repeat: Infinity,
    },
  },
  
  // Vertical float
  float: {
    animate: {
      y: [0, -12, 0],
    },
    transition: {
      duration: 6,
      ease: easing.drift,
      repeat: Infinity,
    },
  },
  
  // Multi-directional drift
  drift: {
    animate: {
      x: [0, 10, -8, 0],
      y: [0, -8, 10, 0],
    },
    transition: {
      duration: 8,
      ease: easing.drift,
      repeat: Infinity,
    },
  },
  
  // Gentle pulse
  pulse: {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [1, 0.94, 1],
    },
    transition: {
      duration: 4,
      ease: easing.breathe,
      repeat: Infinity,
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 INTERACTION GESTURES
// Hover and tap responses
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const gestures = {
  // Gentle hover lift
  hoverLift: {
    whileHover: { 
      scale: 1.02, 
      y: -2,
    },
    whileTap: { 
      scale: 0.98,
    },
    transition: transitions.fast,
  },
  
  // Soft scale pulse on hover
  hoverPulse: {
    whileHover: { 
      scale: 1.05,
    },
    whileTap: { 
      scale: 0.95,
    },
    transition: transitions.soft,
  },
  
  // Glow on hover (use with shadow)
  hoverGlow: {
    whileHover: { 
      boxShadow: "0 0 35px rgba(248, 180, 190, 0.4)",
    },
    transition: transitions.soft,
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📐 SAFE ANIMATION CONSTRAINTS
// Never exceed these values
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const constraints = {
  minDuration: 0.2,      // Never animate faster than 200ms
  maxScale: 1.08,        // Never scale larger than 8%
  maxBlur: 20,           // Never blur more than 20px
  maxRotate: 360,        // One full rotation max
  maxTranslateY: 100,    // Max vertical movement (vh)
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💡 USAGE EXAMPLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * EXAMPLE 1: Simple fade in
 * 
 * <motion.div
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 *   transition={transitions.soft}
 * >
 *   Content
 * </motion.div>
 */

/**
 * EXAMPLE 2: Using preset variants
 * 
 * <motion.div
 *   {...variants.fadeUp}
 * >
 *   Content
 * </motion.div>
 */

/**
 * EXAMPLE 3: Ambient animation
 * 
 * <motion.div
 *   className="text-6xl"
 *   {...ambient.breathe}
 * >
 *   🌹
 * </motion.div>
 */

/**
 * EXAMPLE 4: Interactive gesture
 * 
 * <motion.button
 *   className="glass-soft rounded-2xl px-6 py-3"
 *   {...gestures.hoverLift}
 * >
 *   Click me
 * </motion.button>
 */

/**
 * EXAMPLE 5: Custom with design tokens
 * 
 * <motion.div
 *   animate={{ x: [0, 100, 0] }}
 *   transition={{
 *     duration: timing.linger,
 *     ease: easing.drift,
 *     repeat: Infinity,
 *   }}
 * >
 *   Drifting element
 * </motion.div>
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔒 ACCESSIBILITY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * IMPORTANT: Always respect user motion preferences
 * 
 * import { useReducedMotion } from "framer-motion";
 * 
 * const prefersReducedMotion = useReducedMotion();
 * 
 * <motion.div
 *   animate={prefersReducedMotion ? {} : { scale: 1.05 }}
 * >
 * 
 * Or use the AnimationProvider context:
 * const { prefersReducedMotion } = useAnimation();
 */

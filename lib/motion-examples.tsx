/**
 * 🎯 PRACTICAL EXAMPLES
 * Tailwind + Framer Motion Integration Patterns
 * 
 * Shows the correct way to combine static styling (Tailwind)
 * with dynamic motion (Framer Motion)
 */

import { motion } from "framer-motion";
import { transitions, variants, ambient, gestures } from "@/lib/motion-tokens";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ CORRECT PATTERNS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Pattern 1: Static Card with Motion Entry
export function EmotionalCard() {
  return (
    <motion.div
      className="emotion-card"  // ← Tailwind handles structure & color
      {...variants.fadeUp}       // ← Framer handles entry animation
    >
      <div className="text-6xl mb-4 animate-breathe">🌹</div>
      <h3 className="font-serif text-emotive text-accent-deep">
        Rose Day
      </h3>
      <p className="text-guidance text-text-soft">
        A rose for every reason I love you
      </p>
    </motion.div>
  );
}

// Pattern 2: Interactive Button with Gesture
export function InteractiveButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      className="glass-rose rounded-2xl px-6 py-3 text-whisper"
      {...gestures.hoverLift}    // ← Framer handles hover state
      onClick={onClick}
    >
      Touch to reveal
    </motion.button>
  );
}

// Pattern 3: Ambient Background Layer
export function AmbientLayer({ day }: { day: string }) {
  return (
    <>
      {/* Static gradient - Tailwind */}
      <div className="ambient-bg" />
      
      {/* Animated drift - CSS */}
      <div className="ambient-drift" data-day={day} />
      
      {/* Warm glow - Framer Motion */}
      <motion.div
        className="absolute inset-0 ambient-warm"
        {...ambient.breathe}
      />
    </>
  );
}

// Pattern 4: Day-Aware Container
export function DayContainer({ 
  day, 
  children 
}: { 
  day: string; 
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="interaction-stage"
      data-day={day}              // ← Tailwind responds to data attribute
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transitions.emotional}
    >
      {children}
    </motion.div>
  );
}

// Pattern 5: Staggered List with Emotion Cards
export function DayList({ days }: { days: any[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,  // ← Stagger with soft timing
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {days.map((day) => (
        <motion.div
          key={day.id}
          className="emotion-card"
          variants={variants.scaleIn}
        >
          <div className="text-4xl mb-2">{day.emoji}</div>
          <h3 className="font-serif text-xl text-accent-deep">
            {day.name}
          </h3>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Pattern 6: Floating Interactive Element
export function FloatingRose({ onInteract }: { onInteract: () => void }) {
  return (
    <motion.div
      className="relative cursor-pointer"
      {...ambient.float}          // ← Ambient float animation
      {...gestures.hoverPulse}   // ← Interactive gesture
      onClick={onInteract}
    >
      <div className="text-8xl filter drop-shadow-warm">
        🌹
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-warm opacity-40 bg-accent-warm rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Pattern 7: Page Transition with Day Change
export function PageTransition({ 
  children, 
  dayId 
}: { 
  children: React.ReactNode; 
  dayId: number;
}) {
  return (
    <motion.div
      key={dayId}                 // ← Key triggers re-mount
      className="min-h-screen bg-ambient-gradient"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={transitions.emotional}
    >
      {children}
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ❌ ANTI-PATTERNS (What NOT to do)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ❌ WRONG: Mixing CSS animation with Framer Motion
function WrongDuplicateAnimation() {
  return (
    <motion.div
      className="animate-fade-in-soft"  // ← CSS animation
      animate={{ opacity: 1 }}          // ← Framer animation (redundant!)
    >
      Content
    </motion.div>
  );
}

// ✅ CORRECT: Choose one approach
function CorrectSingleAnimation() {
  return (
    <motion.div
      className="opacity-0"             // ← Initial state only
      animate={{ opacity: 1 }}          // ← Framer handles transition
      transition={transitions.soft}
    >
      Content
    </motion.div>
  );
}

// ❌ WRONG: Animating layout properties
function WrongLayoutShift() {
  return (
    <motion.div
      animate={{ width: 500 }}  // ← Causes layout shift!
    >
      Content
    </motion.div>
  );
}

// ✅ CORRECT: Use transform/opacity only
function CorrectGPUAnimation() {
  return (
    <motion.div
      className="w-full"          // ← Tailwind sets static width
      animate={{ scale: 1.2 }}   // ← Transform is GPU-accelerated
    >
      Content
    </motion.div>
  );
}

// ❌ WRONG: Too fast, too much
function WrongOveranimated() {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.5,           // ← Too much scale
        rotate: 720,          // ← Too much rotation
      }}
      transition={{ 
        duration: 0.05,       // ← Too fast!
      }}
    >
      Content
    </motion.div>
  );
}

// ✅ CORRECT: Subtle, intentional
function CorrectSubtle() {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,          // ← Gentle scale
        y: -2,                // ← Subtle lift
      }}
      transition={transitions.fast}
    >
      Content
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 REAL-WORLD PATTERNS
// Complete component examples
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Complete Day Card Component
export function DayCard({ 
  day, 
  isUnlocked, 
  onClick 
}: { 
  day: any; 
  isUnlocked: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      className={`
        emotion-card text-left w-full
        ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
      `}
      onClick={isUnlocked ? onClick : undefined}
      disabled={!isUnlocked}
      {...(isUnlocked && gestures.hoverLift)}
      variants={variants.scaleIn}
    >
      {/* Emoji with ambient animation */}
      <motion.div
        className="text-5xl mb-3"
        {...(isUnlocked && ambient.breathe)}
      >
        {day.emoji}
      </motion.div>
      
      {/* Title */}
      <h3 className="font-serif text-xl mb-1 text-accent-deep">
        {day.name}
      </h3>
      
      {/* Subtitle */}
      <p className="text-guidance text-text-soft text-sm">
        {day.subtitle}
      </p>
      
      {/* Date badge */}
      <div className="glass-soft rounded-full px-3 py-1 mt-3 inline-block">
        <span className="text-whisper text-xs">
          {day.date}
        </span>
      </div>
    </motion.button>
  );
}

// Complete Interaction Stage
export function InteractionStage({ 
  children, 
  day 
}: { 
  children: React.ReactNode; 
  day: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Layered ambient backgrounds */}
      <AmbientLayer day={day} />
      
      {/* Main content area */}
      <motion.div
        className="center-stage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.emotional}
      >
        {children}
      </motion.div>
      
      {/* Optional grain texture */}
      <div className="grain-overlay" />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💡 PERFORMANCE TIPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 1. Use layout animations sparingly
 *    - Avoid width, height, top, left
 *    - Prefer transform and opacity
 * 
 * 2. Limit concurrent animations
 *    - Max 5-7 simultaneous animations on mobile
 *    - Use stagger for lists
 * 
 * 3. Use will-change carefully
 *    <motion.div className="will-change-transform">
 *    Only when actually animating!
 * 
 * 4. Disable animations on slow devices
 *    const prefersReducedMotion = useReducedMotion();
 *    
 * 5. Use AnimatePresence for exits
 *    <AnimatePresence mode="wait">
 *      {show && <motion.div exit={{ opacity: 0 }} />}
 *    </AnimatePresence>
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📱 MOBILE CONSIDERATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Touch-optimized button
export function TouchButton({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode; 
  onClick: () => void;
}) {
  return (
    <motion.button
      className="
        glass-rose rounded-2xl 
        px-8 py-4           
        min-h-[44px]        
        text-guidance
        active:scale-95     
      "
      whileTap={{ scale: 0.95 }}
      transition={transitions.fast}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

/**
 * Key mobile optimizations:
 * - Min tap target: 44x44px
 * - Use whileTap instead of whileHover
 * - Shorter animation durations
 * - Test on actual devices
 * - Monitor frame rate
 */

// Emotional state that carries across the entire experience
// Each day inherits and contributes to the collective mood

export interface EmotionalState {
  warmth: number;      // 0-1: cool to warm
  stillness: number;   // 0-1: active to resting
  intimacy: number;    // 0-1: distant to close
  completion: number;  // 0-1: journey progress
}

// Each day's emotional signature
export const dayEmotions: Record<number, Partial<EmotionalState>> = {
  1: { warmth: 0.3, stillness: 0.4, intimacy: 0.2 },  // Rose: gentle beginning
  2: { warmth: 0.4, stillness: 0.6, intimacy: 0.3 },  // Propose: calm commitment
  3: { warmth: 0.5, stillness: 0.5, intimacy: 0.4 },  // Chocolate: warm indulgence
  4: { warmth: 0.6, stillness: 0.7, intimacy: 0.5 },  // Teddy: comfort
  5: { warmth: 0.5, stillness: 0.8, intimacy: 0.5 },  // Promise: intentional
  6: { warmth: 0.8, stillness: 0.6, intimacy: 0.7 },  // Hug: presence
  7: { warmth: 0.7, stillness: 0.9, intimacy: 0.9 },  // Kiss: intimate
  8: { warmth: 0.9, stillness: 1.0, intimacy: 1.0 },  // Valentine: complete
};

// Interpolate between emotional states for smooth transitions
export function blendEmotions(
  from: EmotionalState,
  to: Partial<EmotionalState>,
  progress: number
): EmotionalState {
  const ease = easeOutCubic(progress);
  return {
    warmth: from.warmth + ((to.warmth ?? from.warmth) - from.warmth) * ease,
    stillness: from.stillness + ((to.stillness ?? from.stillness) - from.stillness) * ease,
    intimacy: from.intimacy + ((to.intimacy ?? from.intimacy) - from.intimacy) * ease,
    completion: from.completion + ((to.completion ?? from.completion) - from.completion) * ease,
  };
}

// Calculate background colors from emotional state
export function emotionToColors(emotion: EmotionalState) {
  const { warmth, stillness, intimacy } = emotion;
  
  // Base colors shift with warmth
  const r1 = Math.round(255 - warmth * 5);
  const g1 = Math.round(252 - warmth * 8 - intimacy * 3);
  const b1 = Math.round(250 - warmth * 15 - intimacy * 5);
  
  const r2 = Math.round(253 - warmth * 8);
  const g2 = Math.round(247 - warmth * 12 - intimacy * 4);
  const b2 = Math.round(243 - warmth * 20 - intimacy * 8);
  
  // Ambient motion slows with stillness
  const ambientDuration = 30 + stillness * 40;
  
  // Glow intensity increases with intimacy
  const glowOpacity = 0.05 + intimacy * 0.12;
  
  return {
    gradient: `linear-gradient(160deg, rgb(${r1}, ${g1}, ${b1}) 0%, rgb(${r2}, ${g2}, ${b2}) 100%)`,
    ambientDuration,
    glowOpacity,
    glowColor: `rgba(${Math.round(235 + warmth * 15)}, ${Math.round(200 - warmth * 20)}, ${Math.round(190 - warmth * 30)}, ${glowOpacity})`,
  };
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

// Initial emotional state
export const initialEmotionalState: EmotionalState = {
  warmth: 0.2,
  stillness: 0.3,
  intimacy: 0.1,
  completion: 0,
};

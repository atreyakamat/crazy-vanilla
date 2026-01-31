/**
 * Interactive Animation Components
 * 
 * A curated library of animation and interaction effects
 * for the crazy-vanilla Valentine experience.
 * 
 * Import components individually to optimize bundle size.
 */

// Provider
export { AnimationProvider, useAnimation } from "./AnimationProvider";

// SVG & Visual Motion
export { AnimatedGradientSvg } from "./AnimatedGradientSvg";
export { GooeyFilter } from "./GooeyFilter";
export { TextAlongPath } from "./TextAlongPath";

// Cursor, Trails & Physics
export { PixelTrail } from "./PixelTrail";
export { CursorAttractor } from "./CursorAttractor";
export { Gravity } from "./Gravity";

// Interactive Motion
export { DragElements } from "./DragElements";
export { ElasticLine } from "./ElasticLine";
export { ParallaxFloat } from "./ParallaxFloat";
export { CirclingElements } from "./CirclingElements";

// Text Effects
export { BreathingText } from "./text-effects/BreathingText";
export { Typewriter } from "./text-effects/Typewriter";
export { ScrambleText } from "./text-effects/ScrambleText";
export { UnderlineAnimation } from "./text-effects/UnderlineAnimation";
export { TextHighlighter } from "./text-effects/TextHighlighter";
export { NumberTicker } from "./text-effects/NumberTicker";

// Layout Effects
export { SimpleMarquee } from "./layout-effects/SimpleMarquee";
export { StackingCards } from "./layout-effects/StackingCards";
export { BoxCarousel } from "./layout-effects/BoxCarousel";

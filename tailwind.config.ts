import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🎨 EMOTION-FIRST COLOR SYSTEM
      // Each color tells a feeling, not a function
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      colors: {
        // Base emotions - the foundation
        "bg-base": "#fffdfb",        // Warm cream, never pure white
        "bg-soft": "#fef7f7",        // Blush-tinted peace
        "bg-calm": "#fbf7f4",        // Warm neutral, grounded
        
        // Accent emotions - when something matters
        "accent-warm": "#f8b4be",    // Gentle rose, not loud
        "accent-deep": "#d43d5c",    // Muted rose, commitment
        
        // Text emotions - how words feel
        "text-main": "#78645a",      // Warm charcoal, readable
        "text-soft": "#a09189",      // Faded warmth, guidance
        "text-whisper": "#b4a599",   // Nearly invisible, ambient
        
        // Semantic color scales (expanded for gradients)
        blush: {
          50: "#fef7f7",
          100: "#fdeef0",
          200: "#fbd5db",
          300: "#f8b4be",
          400: "#f28a9a",
          500: "#e85d75",
          600: "#d43d5c",
          700: "#b22e4a",
          800: "#942941",
          900: "#7c263c",
        },
        cream: {
          50: "#fffdfb",
          100: "#fef9f3",
          200: "#fdf2e6",
          300: "#fbe7d1",
          400: "#f7d4ae",
          500: "#f2bc85",
          600: "#dfa06a",
        },
        warm: {
          50: "#fdfcfb",
          100: "#fbf7f4",
          200: "#f7ede5",
          300: "#f0ddd0",
          400: "#e5c4ae",
          500: "#d6a78a",
          600: "#c99070",
          700: "#a87458",
          800: "#78645a",
          900: "#5a4d45",
        },
        rose: {
          50: "#fef7f7",
          100: "#fdeef0",
          200: "#fbd5db",
          300: "#f8b4be",
          400: "#f28a9a",
          500: "#e85d75",
          deep: "#c44569",
          soft: "#f8b4be",
          petal: "#fdeef0",
        },
        
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 🌹 DAY-BASED TONAL VARIANTS
        // Each day has its own subtle emotional tint
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        "day-rose": {
          light: "#fef7f7",
          base: "#fbd5db",
          accent: "#f28a9a",
        },
        "day-commit": {
          light: "#f0f4fa",
          base: "#c5d9f0",
          accent: "#7ba3d6",
        },
        "day-sweet": {
          light: "#fef8f0",
          base: "#fde9cf",
          accent: "#f5c77e",
        },
        "day-comfort": {
          light: "#fefbf6",
          base: "#faecd6",
          accent: "#f0d4a3",
        },
        "day-promise": {
          light: "#f7f5fc",
          base: "#e0d9f0",
          accent: "#b8a4d9",
        },
        "day-warmth": {
          light: "#fef6f3",
          base: "#fdd8c7",
          accent: "#f5a87a",
        },
        "day-intimate": {
          light: "#fef5f7",
          base: "#fcd4dc",
          accent: "#f499aa",
        },
        "day-final": {
          light: "#fef3f5",
          base: "#fcced8",
          accent: "#f87e98",
        },
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // ✍️ TYPOGRAPHY SYSTEM
      // Two fonts: Serif for emotion, Sans for clarity
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        // Generous line heights, breathing room
        "emotive": ["2.25rem", { lineHeight: "1.35", letterSpacing: "0.01em" }],
        "whisper": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.03em" }],
        "guidance": ["0.9375rem", { lineHeight: "1.5", letterSpacing: "0.005em" }],
        "anchor": ["1.125rem", { lineHeight: "1.55", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        "emotive": "0.01em",    // Slightly open for romance
        "tight-ui": "-0.015em",  // Compact for UI
        "ambient": "0.05em",     // Airy, whisper-like
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📐 SPACING & RADIUS
      // Soft increments, never harsh edges
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      spacing: {
        '1.5': '0.375rem',  // 6px
        '3': '0.75rem',     // 12px
        '4.5': '1.125rem',  // 18px
        '6': '1.5rem',      // 24px
        '9': '2.25rem',     // 36px
        '12': '3rem',       // 48px
        '18': '4.5rem',     // 72px
        '24': '6rem',       // 96px
      },
      borderRadius: {
        'lg': '0.75rem',     // Small UI elements
        'xl': '1rem',        // Cards, buttons
        '2xl': '1.25rem',    // Interactive focus
        '3xl': '1.75rem',    // Emotional containers
        '4xl': '2rem',       // Hero elements
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // ⏱ MOTION & ANIMATION TOKENS
      // Emotion-based timing, never mechanical
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      transitionDuration: {
        "fast": "200ms",      // Quick acknowledgment
        "soft": "400ms",      // Gentle response
        "slow": "700ms",      // Emotional shift
        "linger": "1200ms",   // Ambient drift
      },
      transitionTimingFunction: {
        "settle": "cubic-bezier(0.25, 0.8, 0.25, 1)",     // Slow deceleration
        "soft": "cubic-bezier(0.16, 1, 0.3, 1)",          // Gentle ease
        "drift": "cubic-bezier(0.34, 0.46, 0.45, 0.94)",  // Ambient float
        "breathe": "cubic-bezier(0.45, 0, 0.55, 1)",      // Inhale/exhale
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🌀 KEYFRAME ANIMATIONS
      // Slow, organic, never distracting
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      animation: {
        // Ambient - background life
        "breathe": "breathe 5s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "float": "float 6s cubic-bezier(0.34, 0.46, 0.45, 0.94) infinite",
        "drift": "drift 8s cubic-bezier(0.34, 0.46, 0.45, 0.94) infinite",
        
        // Entry - gentle arrivals
        "fade-in-soft": "fade-in-soft 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "blur-in": "blur-in 1000ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 600ms cubic-bezier(0.34, 1.02, 0.64, 1) forwards",
        
        // Interaction - responsive, not jarring
        "pulse-calm": "pulse-calm 4s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        "glow-soft": "glow-soft 3s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate",
        "warm-glow": "warm-glow 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate",
        
        // Specific interactions
        "petal-fall": "petal-fall 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "bloom": "bloom 800ms cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { 
            transform: "scale(1)", 
            opacity: "1" 
          },
          "50%": { 
            transform: "scale(1.03)", 
            opacity: "0.92" 
          },
        },
        float: {
          "0%, 100%": { 
            transform: "translateY(0px)" 
          },
          "50%": { 
            transform: "translateY(-12px)" 
          },
        },
        drift: {
          "0%, 100%": { 
            transform: "translateX(0) translateY(0)" 
          },
          "33%": { 
            transform: "translateX(10px) translateY(-8px)" 
          },
          "66%": { 
            transform: "translateX(-8px) translateY(10px)" 
          },
        },
        "fade-in-soft": {
          "0%": { 
            opacity: "0" 
          },
          "100%": { 
            opacity: "1" 
          },
        },
        "blur-in": {
          "0%": { 
            filter: "blur(12px)", 
            opacity: "0" 
          },
          "100%": { 
            filter: "blur(0px)", 
            opacity: "1" 
          },
        },
        "scale-in": {
          "0%": { 
            transform: "scale(0.92)", 
            opacity: "0" 
          },
          "100%": { 
            transform: "scale(1)", 
            opacity: "1" 
          },
        },
        "pulse-calm": {
          "0%, 100%": { 
            transform: "scale(1)", 
            opacity: "1" 
          },
          "50%": { 
            transform: "scale(1.02)", 
            opacity: "0.94" 
          },
        },
        "glow-soft": {
          "0%": { 
            boxShadow: "0 0 20px rgba(248, 180, 190, 0.2)" 
          },
          "100%": { 
            boxShadow: "0 0 35px rgba(248, 180, 190, 0.4)" 
          },
        },
        "warm-glow": {
          "0%": { 
            boxShadow: "0 4px 30px rgba(242, 138, 154, 0.15)" 
          },
          "100%": { 
            boxShadow: "0 8px 50px rgba(242, 138, 154, 0.3)" 
          },
        },
        "petal-fall": {
          "0%": { 
            transform: "translateY(-100px) rotate(0deg)", 
            opacity: "0" 
          },
          "10%": { 
            opacity: "1" 
          },
          "90%": { 
            opacity: "1" 
          },
          "100%": { 
            transform: "translateY(100vh) rotate(360deg)", 
            opacity: "0" 
          },
        },
        bloom: {
          "0%": { 
            transform: "scale(0.85)", 
            opacity: "0" 
          },
          "100%": { 
            transform: "scale(1)", 
            opacity: "1" 
          },
        },
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🌫️ BLUR & DEPTH
      // Layered softness, never harsh
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      backdropBlur: {
        xs: "2px",
        soft: "8px",
        warm: "12px",
        deep: "16px",
      },
      blur: {
        soft: "8px",
        warm: "12px",
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🎭 SHADOWS & DEPTH
      // Emotional weight, not flat
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      boxShadow: {
        "soft": "0 2px 16px -2px rgba(200, 160, 150, 0.12)",
        "warm": "0 4px 24px -4px rgba(242, 138, 154, 0.15), 0 8px 40px -8px rgba(180, 140, 130, 0.1)",
        "romantic": "0 4px 30px -4px rgba(200, 160, 150, 0.18), 0 12px 50px -12px rgba(180, 140, 130, 0.12)",
        "glow-rose": "0 0 30px rgba(248, 180, 190, 0.3)",
        "glow-warm": "0 0 40px rgba(242, 188, 133, 0.25)",
      },
      
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📱 RESPONSIVE & ACCESSIBILITY
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      screens: {
        'xs': '375px',
        'motion-safe': { 'raw': '(prefers-reduced-motion: no-preference)' },
        'motion-reduce': { 'raw': '(prefers-reduced-motion: reduce)' },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addVariant }: { addVariant: Function }) {
      addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
      addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
    },
  ],
};

export default config;

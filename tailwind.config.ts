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
      colors: {
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
        },
        warm: {
          50: "#fdfcfb",
          100: "#fbf7f4",
          200: "#f7ede5",
          300: "#f0ddd0",
          400: "#e5c4ae",
          500: "#d6a78a",
        },
        rose: {
          deep: "#c44569",
          soft: "#f8b4be",
          petal: "#fdeef0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "breathe": "breathe 5s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "bloom": "bloom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "bounce-soft": "bounce-soft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.02)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bloom: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(248, 180, 190, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(248, 180, 190, 0.6)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
      },
      transitionTimingFunction: {
        "soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        "gentle": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
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

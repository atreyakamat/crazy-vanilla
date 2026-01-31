# 🌹 Crazy Vanilla - Styling Guide

**An emotion-driven design system for romantic interactions**

---

## Philosophy

- **Calm > Busy** — Animations breathe, never distract
- **Intentional > Clever** — Every class has emotional meaning
- **Romantic > Technical** — Named for feelings, not functions
- **Invisible when working** — The best design disappears

---

## 🎨 Color System

### Semantic Emotion Colors

```html
<!-- Base emotions -->
<div class="bg-bg-base">     <!-- Warm cream foundation -->
<div class="bg-bg-soft">     <!-- Blush-tinted peace -->
<div class="bg-bg-calm">     <!-- Warm neutral, grounded -->

<!-- Accent emotions -->
<div class="text-accent-warm">  <!-- Gentle rose -->
<div class="text-accent-deep">  <!-- Muted rose, commitment -->

<!-- Text emotions -->
<div class="text-text-main">    <!-- Warm charcoal, readable -->
<div class="text-text-soft">    <!-- Faded warmth, guidance -->
<div class="text-text-whisper"> <!-- Nearly invisible -->
```

### Day-Specific Tints

Each day has its own emotional palette:

```html
<body data-day="rose">      <!-- Feb 7: Rose Day -->
<body data-day="commit">    <!-- Feb 8: Propose Day -->
<body data-day="sweet">     <!-- Feb 9: Chocolate Day -->
<body data-day="comfort">   <!-- Feb 10: Teddy Day -->
<body data-day="promise">   <!-- Feb 11: Promise Day -->
<body data-day="warmth">    <!-- Feb 12: Hug Day -->
<body data-day="intimate">  <!-- Feb 13: Kiss Day -->
<body data-day="final">     <!-- Feb 14: Valentine's Day -->
```

---

## ✍️ Typography

### Semantic Font Sizes

```html
<!-- Emotional headlines -->
<h1 class="text-emotive font-serif">Every petal, a reason I love you</h1>

<!-- Subtle guidance -->
<p class="text-whisper">Touch to reveal</p>

<!-- UI labels -->
<span class="text-guidance">Day 3 of 8</span>

<!-- Body text -->
<p class="text-anchor">The message unfolds slowly...</p>
```

### Font Families

- **Serif** (Playfair Display) → Emotional lines, romantic moments
- **Sans** (Inter) → UI guidance, dates, labels

---

## 📦 Components

### Glass Effects

```html
<!-- Soft glass - general use -->
<div class="glass-soft rounded-3xl p-6">
  Soft transparency
</div>

<!-- Warm glass - rose-tinted -->
<div class="glass-warm rounded-2xl p-4">
  Warm, inviting
</div>

<!-- Rose glass - emotional moments -->
<div class="glass-rose rounded-3xl p-8">
  Deep emotional focus
</div>
```

### Emotion Cards

```html
<!-- Interactive card with hover -->
<button class="emotion-card">
  <div class="text-4xl mb-2">🌹</div>
  <h3 class="font-serif text-xl">Rose Day</h3>
  <p class="text-text-soft text-sm">A rose for every reason</p>
</button>
```

### Interaction Stages

```html
<!-- Full interaction container -->
<div class="interaction-stage">
  <div class="center-stage">
    <!-- Your interactive element -->
    <div class="text-center">
      <h2 class="text-emotive font-serif mb-4">Touch the rose</h2>
      <p class="text-whisper">It blooms for you</p>
    </div>
  </div>
</div>
```

---

## 🌫️ Ambient Backgrounds

### Layered Backgrounds

```html
<!-- Base ambient layer -->
<div class="ambient-bg"></div>

<!-- Slow gradient drift (responds to data-day) -->
<div class="ambient-bg ambient-drift"></div>

<!-- Warm radial glow -->
<div class="absolute inset-0 ambient-warm"></div>

<!-- Combined example -->
<div class="relative min-h-screen">
  <div class="ambient-bg"></div>
  <div class="ambient-drift"></div>
  <div class="ambient-warm"></div>
  
  <div class="relative z-10">
    <!-- Your content here -->
  </div>
</div>
```

---

## ⏱ Motion & Animation

### Duration Tokens

```html
<!-- Quick acknowledgment -->
<div class="transition-all duration-fast">200ms</div>

<!-- Gentle response -->
<div class="transition-all duration-soft">400ms</div>

<!-- Emotional shift -->
<div class="transition-all duration-slow">700ms</div>

<!-- Ambient drift -->
<div class="transition-all duration-linger">1200ms</div>
```

### Easing Curves

```html
<!-- Slow deceleration -->
<div class="transition-all ease-settle"></div>

<!-- Gentle in/out -->
<div class="transition-all ease-soft"></div>

<!-- Ambient movement -->
<div class="transition-all ease-drift"></div>

<!-- Breathing rhythm -->
<div class="transition-all ease-breathe"></div>
```

### Pre-built Animations

```html
<!-- Ambient (infinite loops) -->
<div class="animate-breathe">Slow scale + opacity</div>
<div class="animate-float">Vertical drift</div>
<div class="animate-drift">Multi-directional float</div>

<!-- Entry animations -->
<div class="animate-fade-in-soft">Gentle fade in</div>
<div class="animate-blur-in">Blur to focus</div>
<div class="animate-scale-in">Soft scale up</div>

<!-- Interactive -->
<div class="animate-pulse-calm">Gentle pulse</div>
<div class="animate-glow-soft">Soft glow loop</div>
<div class="animate-warm-glow">Warm shadow pulse</div>

<!-- Special effects -->
<div class="animate-petal-fall">Falling petal motion</div>
<div class="animate-bloom">Flower opening</div>
```

---

## 🎭 Shadows & Depth

```html
<!-- Subtle elevation -->
<div class="soft-shadow"></div>

<!-- Warm depth -->
<div class="warm-shadow"></div>

<!-- Emotional focus -->
<div class="romantic-shadow"></div>

<!-- Glowing effects -->
<div class="glow-soft">Soft rose glow</div>
<div class="glow-warm">Warm amber glow</div>
<div class="glow-rose">Intense rose glow</div>
```

---

## 🌀 Advanced Utilities

### Blur Effects

```html
<div class="blur-soft">8px blur</div>
<div class="blur-warm">12px blur</div>
<div class="blur-deep">16px blur</div>
```

### Grain Overlay (Optional Texture)

```html
<div class="relative grain-overlay">
  <!-- Content with subtle film grain -->
</div>
```

### Gradient Backgrounds

```html
<!-- Ambient gradient -->
<div class="bg-ambient-gradient"></div>

<!-- Day-specific transition -->
<div class="bg-day-transition"></div>
```

---

## 🎯 Complete Example

### Day Interaction Page

```html
<body data-day="rose">
  <!-- Ambient background layers -->
  <div class="ambient-bg"></div>
  <div class="ambient-drift"></div>
  
  <!-- Main content -->
  <div class="interaction-stage">
    <div class="center-stage">
      
      <!-- Emotional card -->
      <div class="emotion-card text-center">
        <div class="text-6xl mb-4 animate-breathe">🌹</div>
        
        <h1 class="text-emotive font-serif mb-2 text-accent-deep">
          Rose Day
        </h1>
        
        <p class="text-guidance text-text-soft mb-6">
          A rose for every reason I love you
        </p>
        
        <button class="glass-rose rounded-2xl px-6 py-3 
                       transition-all duration-soft ease-soft
                       hover:scale-105 hover:glow-soft">
          <span class="text-whisper">Touch to reveal</span>
        </button>
      </div>
      
    </div>
  </div>
</body>
```

---

## 🔒 Safety Rules

### Performance Constraints

- ✅ All animations ≥ 200ms
- ✅ Max scale: 1.08
- ✅ Max blur: 20px
- ✅ Respects `prefers-reduced-motion`
- ✅ No layout-shifting animations

### Best Practices

1. **Use Tailwind for static styling** → colors, spacing, radius
2. **Use Framer Motion for transitions** → state changes, gestures
3. **Never duplicate animation logic** → Choose one approach
4. **Test on mobile first** → Touch interactions, performance
5. **Respect user preferences** → Motion, contrast, font size

---

## 🤝 Tailwind + Framer Motion

### Division of Labor

```tsx
// ✅ CORRECT: Tailwind handles static, Framer handles state
<motion.div
  className="glass-soft rounded-3xl p-6"  // Static styling
  initial={{ opacity: 0, y: 20 }}         // Entry state
  animate={{ opacity: 1, y: 0 }}          // Final state
  whileHover={{ scale: 1.02 }}            // Interaction
>
  Content
</motion.div>

// ❌ WRONG: Duplicating animation logic
<motion.div
  className="animate-fade-in-soft"  // CSS animation
  animate={{ opacity: 1 }}          // Framer animation (redundant)
>
```

### Mapping Motion Values to Tokens

```tsx
import { motion } from "framer-motion";

const emotionalTransition = {
  duration: 0.7,  // duration-slow
  ease: [0.25, 0.8, 0.25, 1]  // ease-settle
};

<motion.div
  animate={{ scale: 1.02 }}
  transition={emotionalTransition}
/>
```

---

## 🎨 Day-Aware Styling

### Strategy

Each day applies a `data-day` attribute to the body, which:
- Adjusts ambient color tint
- Modifies animation speed
- Changes glow warmth

### Implementation

```tsx
// In your day component
useEffect(() => {
  document.body.setAttribute('data-day', 'rose');
  return () => document.body.removeAttribute('data-day');
}, []);
```

### CSS Response

```css
/* Defined in globals.css */
[data-day="rose"] {
  --day-tint: 248, 180, 190;
  --ambient-speed: 9s;
}
```

---

## 📱 Mobile Considerations

### Touch-Friendly

- All interactive elements ≥ 44px
- No hover-dependent functionality
- Large tap targets with visual feedback

### Performance

- GPU-accelerated transforms only
- Avoid `width`, `height`, `top`, `left` animations
- Use `transform` and `opacity`

### Safe Area Support

```html
<!-- Automatically handled in globals.css -->
<body class="pb-[env(safe-area-inset-bottom)]">
```

---

## 🎭 Emotion > Function

### ❌ Technical Naming

```html
<div class="bg-gray-100 hover:bg-gray-200">
```

### ✅ Emotional Naming

```html
<div class="bg-bg-soft hover:bg-bg-calm">
```

---

## Final Words

This design system is the **emotional spine** of the product.

If a class exists purely to show off → remove it.
If an animation feels mechanical → slow it down.
If a color looks technical → warm it up.

**The goal: Romance through restraint.**

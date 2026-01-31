"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayData } from "@/data/days";
import { ArrowLeft } from "lucide-react";

interface Day1RoseProps {
  day: DayData;
  onBack: () => void;
}

type RoseState = "idle" | "hover" | "selected" | "resolved";
type RoseColor = "dusty-pink" | "warm-rose" | "soft-peach";

interface Rose {
  id: RoseColor;
  image: string;
  alt: string;
  size: { width: number; height: number };
  stemHeight: number;
  offsetY: number;
  border?: boolean;
}

const roses: Rose[] = [
  {
    id: "dusty-pink",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFkYciEtqsAHX8cjgXL5YfEAQeBU8EzPYonOooloKg_POi0X7oNK8bvPT-nouVnlnZSyHsy2vAVCbgpstuXXxJbQnCagxUyd-uxnocvzm69VcvVSq_JB_e3K3vxj-rjKGOB8KR-isd28aoE6C1Z12LpjESYSyJDabCdrYfpkjns_QMzhfbSPaImcwL-pAoBRzgEaoQY-zg_FPHoQNbs8lavDNYtQQGXHGIt2oB61Lwj1L5__1R-RTyLCTONW6ZV-2JW8ys799EEw",
    alt: "A single muted dusty pink rose in soft light",
    size: { width: 192, height: 256 },
    stemHeight: 80,
    offsetY: 0,
  },
  {
    id: "warm-rose",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-H5reUZeBLtF_wxqJ09ziaZHtgkjfc9wsIvy2ytM1zWgOWUJAxanSdhpwIIEgXMHuPQpeOiGAKJNgRa8qLmFZb06N5vl2BXoRi5-3OGeS6dYHap5ASfE67S0o-VLPM5AHIBJT634IQpCsDVUMedpqs6_OSAYtEqnmShUqzipsalkcK-zjsaftSGbBXEWEMx38rovqJ2d4RyqEULj_yZVaYodpUTQv1ss-CnCTd21bEaSC-1tIMc5AN_iJR7f5T2Z8U1I_EFQs2Q",
    alt: "A vibrant deep warm rose flower",
    size: { width: 224, height: 288 },
    stemHeight: 96,
    offsetY: -32,
    border: true,
  },
  {
    id: "soft-peach",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWymOddb6FQmip3mPrTJo-QDpZKQwxFwD8x5-HM5pQ4m4JI36vdZ5PY7Nx4KFeaCb0E1u7BmZTzP_uYnd8ofB9ntSNkozJdjPnpimJIm_ubVsVVktnYoKgIt5jpupMoRHj-Gl_scIMgqdKeiQ_TqKUYWXVPdnlOZF_-T0lGRMB0dkedeDm7vgXaqqP6NxZ3oZdPitfmjI8JihOvWiw0THzPpXMSCGQnQLyZF_99AnhMP7-r2bvWs2zKh0siFZRBCn9r48_nAkWFA",
    alt: "A delicate soft peach colored rose",
    size: { width: 192, height: 256 },
    stemHeight: 80,
    offsetY: 0,
  },
];

export function Day1Rose({ day, onBack }: Day1RoseProps) {
  const [state, setState] = useState<RoseState>("idle");
  const [hoveredRose, setHoveredRose] = useState<RoseColor | null>(null);
  const [selectedRose, setSelectedRose] = useState<RoseColor | null>(null);
  const [showPatienceText, setShowPatienceText] = useState(false);
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  
  const patienceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const petalIdRef = useRef(0);

  // Reset patience timer on any interaction
  const resetPatienceTimer = useCallback(() => {
    lastInteractionRef.current = Date.now();
    setShowPatienceText(false);
    
    if (patienceTimerRef.current) {
      clearTimeout(patienceTimerRef.current);
    }
    
    if (state === "idle" || state === "hover") {
      patienceTimerRef.current = setTimeout(() => {
        setShowPatienceText(true);
      }, 4500); // 4.5 seconds
    }
  }, [state]);

  // Initialize patience timer
  useEffect(() => {
    resetPatienceTimer();
    return () => {
      if (patienceTimerRef.current) {
        clearTimeout(patienceTimerRef.current);
      }
    };
  }, [resetPatienceTimer]);

  // Handle rose hover
  const handleRoseHover = useCallback((roseId: RoseColor) => {
    if (state === "idle" || state === "hover") {
      setHoveredRose(roseId);
      setState("hover");
      resetPatienceTimer();
    }
  }, [state, resetPatienceTimer]);

  // Handle rose hover exit
  const handleRoseLeave = useCallback(() => {
    if (state === "hover") {
      setHoveredRose(null);
      setState("idle");
      resetPatienceTimer();
    }
  }, [state, resetPatienceTimer]);

  // Handle rose selection
  const handleRoseSelect = useCallback((roseId: RoseColor) => {
    if (state !== "idle" && state !== "hover") return;
    
    resetPatienceTimer();
    setSelectedRose(roseId);
    setState("selected");
    
    if (patienceTimerRef.current) {
      clearTimeout(patienceTimerRef.current);
    }

    // Generate petals after initial acknowledgment (300ms)
    setTimeout(() => {
      const petalCount = 3 + Math.floor(Math.random() * 4); // 3-6 petals
      const newPetals = Array.from({ length: petalCount }, (_, i) => ({
        id: petalIdRef.current++,
        x: -200 + Math.random() * 400, // Random horizontal spread
        delay: Math.random() * 1000, // Staggered timing
      }));
      setPetals(newPetals);
    }, 300);

    // Move to resolved state
    setTimeout(() => {
      setState("resolved");
    }, 1400);
  }, [state, resetPatienceTimer]);

  // Background gradient tint based on hovered/selected rose
  const getBackgroundTint = () => {
    const activeRose = selectedRose || hoveredRose;
    if (!activeRose) return "rgba(244, 199, 195, 0.15)";
    
    switch (activeRose) {
      case "dusty-pink":
        return "rgba(216, 167, 177, 0.12)";
      case "warm-rose":
        return "rgba(224, 122, 95, 0.12)";
      case "soft-peach":
        return "rgba(242, 204, 143, 0.12)";
      default:
        return "rgba(244, 199, 195, 0.15)";
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-base">
      {/* Animated Background Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at top left, ${getBackgroundTint()} 0%, transparent 50%)`,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.8, 0.25, 1],
        }}
      />

      {/* Subtle Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA93sSl0mltqDloAWtA7FH4OzT4m2UD-wGtdbx5gJEmsIgOS-LIt5U50HZWjJNRfNw-V-edt47riPjglCuMRCZ9C__KGbdVBmLIKhWW0FVBRmebcIuPtlwfaQDhAePNKJ9IkfTvzRq8CiWMPnmpV5LtCQ7oggFEBtdkYrhxuMK9Gmk1d0rRgiRc19nHe7d8hVBHSIfbsnZx77QVznYcvyVOaAiuKdpjXj-88jqoCsIEE1PlR81M4O8tCSQYTNXGbPCBJwrPr3fOEg')",
        }}
      />

      {/* Back Button */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <motion.button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white/70 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4 text-warm-800" />
        </motion.button>
      </header>

      {/* Main Stage */}
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-10">
        
        {/* Roses Container */}
        <div className="relative flex flex-row items-end justify-center gap-12 mb-16">
          {roses.map((rose, index) => (
            <RoseComponent
              key={rose.id}
              rose={rose}
              index={index}
              state={state}
              isHovered={hoveredRose === rose.id}
              isSelected={selectedRose === rose.id}
              onHover={() => handleRoseHover(rose.id)}
              onLeave={handleRoseLeave}
              onSelect={() => handleRoseSelect(rose.id)}
            />
          ))}
        </div>

        {/* Petal Fall */}
        <AnimatePresence>
          {state === "selected" && petals.map((petal) => (
            <Petal key={petal.id} x={petal.x} delay={petal.delay} />
          ))}
        </AnimatePresence>

        {/* Text Reveal */}
        <AnimatePresence>
          {state === "resolved" && (
            <motion.div
              className="max-w-[800px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            >
              <h1 className="text-warm-800 tracking-tight text-[42px] font-light leading-relaxed italic px-4 pb-3 font-serif">
                "Didn't matter which one you chose.<br />I was always choosing you."
              </h1>
              <div className="mt-8 opacity-40">
                <span className="text-warm-800 text-sm">♥</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Patience Reward */}
        <AnimatePresence>
          {showPatienceText && state === "idle" && (
            <motion.div
              className="absolute bottom-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-text-whisper text-sm tracking-ambient">
                Take your time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Individual Rose Component
interface RoseComponentProps {
  rose: Rose;
  index: number;
  state: RoseState;
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}

function RoseComponent({
  rose,
  index,
  state,
  isHovered,
  isSelected,
  onHover,
  onLeave,
  onSelect,
}: RoseComponentProps) {
  const isOther = state === "selected" && !isSelected;
  const isCentered = state === "resolved" && isSelected;

  // Idle float animation (very subtle)
  const idleFloat = state === "idle" ? {
    y: [0, -4, 0],
    transition: {
      duration: 6 + index * 0.5,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1],
    },
  } : {};

  // Selection animation phases
  const getAnimationProps = () => {
    if (isCentered) {
      return {
        scale: 1.05,
        opacity: 1,
        x: 0,
        y: -50,
        transition: {
          duration: 1.0,
          ease: [0.25, 0.8, 0.25, 1],
        },
      };
    }

    if (isOther) {
      const driftDirection = index === 0 ? -100 : index === 2 ? 100 : 0;
      return {
        opacity: 0,
        x: driftDirection,
        y: 20,
        scale: 0.9,
        transition: {
          opacity: { duration: 0.8, delay: 0.3 },
          x: { duration: 1.0, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] },
          y: { duration: 1.0, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] },
          scale: { duration: 0.8, delay: 0.3 },
        },
      };
    }

    if (isSelected && state === "selected") {
      return {
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
      };
    }

    if (isHovered) {
      return {
        scale: 1.04,
        filter: "blur(0px) saturate(1.1)",
        transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
      };
    }

    return {
      scale: 1,
      opacity: 1,
      filter: "blur(0px) saturate(1)",
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
    };
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      style={{ translateY: rose.offsetY }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onSelect}
      animate={{
        ...idleFloat,
        ...getAnimationProps(),
      }}
    >
      {/* Rose Image */}
      <motion.div
        className="bg-center bg-no-repeat bg-cover rounded-full transition-shadow duration-700"
        style={{
          width: rose.size.width,
          height: rose.size.height,
          backgroundImage: `url("${rose.image}")`,
          ...(rose.border && {
            border: "4px solid rgba(255, 255, 255, 0.2)",
          }),
        }}
        animate={{
          boxShadow: isHovered 
            ? "0 12px 40px -8px rgba(120, 100, 90, 0.25)"
            : "0 8px 30px -8px rgba(120, 100, 90, 0.15)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Stem */}
      {!isCentered && (
        <motion.div
          className="w-px bg-warm-800/10 mt-4"
          style={{ height: rose.stemHeight }}
          animate={{
            opacity: isOther ? 0 : 1,
          }}
          transition={{ duration: 0.6, delay: isOther ? 0 : 0.3 }}
        />
      )}
    </motion.div>
  );
}

// Petal Component
interface PetalProps {
  x: number;
  delay: number;
}

function Petal({ x, delay }: PetalProps) {
  return (
    <motion.div
      className="absolute top-1/3 left-1/2 pointer-events-none"
      style={{
        width: 40,
        height: 50,
        background: "radial-gradient(ellipse at center, rgba(244, 199, 195, 0.6) 0%, rgba(244, 199, 195, 0.3) 60%, transparent 100%)",
        borderRadius: "50% 50% 50% 0",
      }}
      initial={{
        x: 0,
        y: -100,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        x: x,
        y: "100vh",
        rotate: 360,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: {
          times: [0, 0.1, 0.9, 1],
          duration: 4,
        },
      }}
    />
  );
}

"use client";

/**
 * StackingCards
 * 
 * Card stack with drag-to-dismiss interaction.
 * Cards rotate and scale based on position.
 * 
 * @param cards - Array of card content
 * @param onCardDismiss - Callback when card is dismissed
 * @param cardClassName - Class for individual cards
 */

import { useState, ReactNode } from "react";
import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { useAnimation } from "../AnimationProvider";

interface StackingCardsProps {
  cards: ReactNode[];
  onCardDismiss?: (index: number, direction: "left" | "right") => void;
  cardClassName?: string;
  className?: string;
}

export function StackingCards({
  cards,
  onCardDismiss,
  cardClassName = "",
  className = "",
}: StackingCardsProps) {
  const { prefersReducedMotion } = useAnimation();
  const [currentCards, setCurrentCards] = useState(cards.map((card, i) => ({ id: i, content: card })));
  
  const handleDragEnd = (index: number, info: PanInfo) => {
    const threshold = 100;
    
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? "right" : "left";
      
      setCurrentCards(prev => prev.filter((_, i) => i !== 0));
      onCardDismiss?.(index, direction);
    }
  };
  
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {currentCards[0]?.content}
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {currentCards.slice(0, 3).map((card, i) => {
          const isTop = i === 0;
          const scale = 1 - i * 0.05;
          const y = i * 8;
          const rotate = i * 2;
          
          return (
            <motion.div
              key={card.id}
              className={`absolute inset-0 ${cardClassName}`}
              style={{ zIndex: 10 - i }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{
                scale,
                y,
                rotate,
                opacity: 1,
              }}
              exit={{
                x: 300,
                opacity: 0,
                rotate: 20,
                transition: { duration: 0.3 },
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => isTop && handleDragEnd(card.id, info)}
              whileDrag={{ scale: 1.02, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {card.content}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Example usage:
// <StackingCards
//   cards={[<Card1 />, <Card2 />, <Card3 />]}
//   onCardDismiss={(i, dir) => console.log(`Dismissed ${i} to ${dir}`)}
// />

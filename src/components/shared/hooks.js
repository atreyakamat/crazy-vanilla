import { useState, useEffect, useRef } from 'react';

export function usePatienceReward(delay = 4500, disabled = false) {
  const [showPatience, setShowPatience] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      setShowPatience(false);
      return;
    }

    const startTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowPatience(true);
      }, delay);
    };

    const handleInteraction = () => {
      setShowPatience(false);
      startTimer();
    };

    startTimer();
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [delay, disabled]);

  return showPatience;
}

export function useHoldInteraction(duration = 2000) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef(null);
  const animationRef = useRef(null);

  const startHold = () => {
    if (isComplete) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setHoldProgress(progress);
      
      if (progress >= 1) {
        setIsComplete(true);
        setIsHolding(false);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const endHold = () => {
    setIsHolding(false);
    cancelAnimationFrame(animationRef.current);
    
    if (!isComplete) {
      // Slowly decay progress
      const decay = () => {
        setHoldProgress(prev => {
          const next = prev - 0.01;
          if (next <= 0) return 0;
          animationRef.current = requestAnimationFrame(decay);
          return next;
        });
      };
      animationRef.current = requestAnimationFrame(decay);
    }
  };

  return { isHolding, holdProgress, isComplete, startHold, endHold };
}

export function useDragInteraction(initialPos = { x: 0, y: 0 }) {
  const [position, setPosition] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosRef = useRef(initialPos);

  const startDrag = (e) => {
    setIsDragging(true);
    const pos = getEventPosition(e);
    lastPosRef.current = pos;
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const pos = getEventPosition(e);
    const delta = {
      x: pos.x - lastPosRef.current.x,
      y: pos.y - lastPosRef.current.y
    };
    setPosition(prev => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y
    }));
    setVelocity(delta);
    lastPosRef.current = pos;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const getEventPosition = (e) => {
    if (e.touches) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  return { position, setPosition, isDragging, velocity, startDrag, onDrag, endDrag };
}

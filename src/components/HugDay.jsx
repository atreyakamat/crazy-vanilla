import { useState, useEffect, useRef } from 'react';
import { usePatienceReward, useHoldInteraction } from './shared/hooks';
import './shared/styles.css';
import './HugDay.css';

export default function HugDay({ onComplete }) {
  const { isHolding, holdProgress, isComplete, startHold, endHold } = useHoldInteraction(3000);
  const [showFinalText, setShowFinalText] = useState(false);
  const [lingeringWarmth, setLingeringWarmth] = useState(0);
  const [showDontLetGoText, setShowDontLetGoText] = useState(false);
  const [extraWarmthUnlocked, setExtraWarmthUnlocked] = useState(false);
  const [holdDuration, setHoldDuration] = useState(0);
  
  // Secret features
  const [showMeltText, setShowMeltText] = useState(false);
  const [postHugWarmth, setPostHugWarmth] = useState(0);
  const [showStillWarm, setShowStillWarm] = useState(false);
  
  const holdStartRef = useRef(null);
  const lingerTimerRef = useRef(null);
  const postHugTimerRef = useRef(null);
  const showPatience = usePatienceReward(5000, isComplete);

  // Secret: Melt text for very long holds
  useEffect(() => {
    if (holdDuration > 8000 && !showMeltText) {
      setShowMeltText(true);
    }
  }, [holdDuration, showMeltText]);

  // Secret: Post-hug warmth lingers and shows message
  useEffect(() => {
    if (isComplete && !isHolding) {
      setPostHugWarmth(1);
      postHugTimerRef.current = setTimeout(() => {
        setShowStillWarm(true);
      }, 5000);
    }
    return () => clearTimeout(postHugTimerRef.current);
  }, [isComplete, isHolding]);

  useEffect(() => {
    if (isComplete && !showFinalText) {
      setTimeout(() => setShowFinalText(true), 800);
    }
  }, [isComplete, showFinalText]);

  // Track hold duration for extra warmth
  useEffect(() => {
    if (isHolding) {
      holdStartRef.current = Date.now();
    } else if (holdStartRef.current) {
      const duration = Date.now() - holdStartRef.current;
      setHoldDuration(prev => prev + duration);
      
      // If held for more than 4 seconds total, unlock extra warmth
      if (holdDuration + duration > 4000 && !extraWarmthUnlocked) {
        setExtraWarmthUnlocked(true);
        setShowDontLetGoText(true);
      }
    }
  }, [isHolding, holdDuration, extraWarmthUnlocked]);

  // Lingering warmth effect when released early
  useEffect(() => {
    if (!isHolding && holdProgress > 0 && holdProgress < 1 && !isComplete) {
      setLingeringWarmth(holdProgress * 0.6);
      
      // Slowly fade the lingering warmth
      lingerTimerRef.current = setInterval(() => {
        setLingeringWarmth(prev => {
          if (prev <= 0.01) {
            clearInterval(lingerTimerRef.current);
            return 0;
          }
          return prev * 0.95;
        });
      }, 50);
    }
    return () => clearInterval(lingerTimerRef.current);
  }, [isHolding, holdProgress, isComplete]);

  const handleStart = (e) => {
    e.preventDefault();
    clearInterval(lingerTimerRef.current);
    setLingeringWarmth(0);
    startHold();
  };

  const handleEnd = (e) => {
    e.preventDefault();
    endHold();
  };

  // Calculate visual states - include lingering warmth
  const effectiveWarmth = isComplete ? 1 : Math.max(holdProgress, lingeringWarmth);
  const warmth = effectiveWarmth;
  const extraGlow = extraWarmthUnlocked ? 0.15 : 0;
  const blurAmount = 30 - warmth * 25;
  const glowSize = 100 + warmth * 150 + (extraWarmthUnlocked ? 30 : 0);
  const bgHue = 220 - warmth * 30;

  return (
    <div 
      className="day-canvas hug-day"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      style={{
        background: `hsl(${bgHue}, ${10 + warmth * 15}%, ${97 - warmth * 2}%)`
      }}
    >
      {/* Ambient Background */}
      <div 
        className="ambient-bg hug-gradient"
        style={{
          background: `radial-gradient(circle at center, 
            hsla(${30 + warmth * 20}, ${50 + warmth * 30}%, ${70 + warmth * 10}%, ${0.1 + warmth * 0.2}) 0%, 
            transparent 70%)`
        }}
      />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div className="interaction-stage">
        <div className="hug-container">
          {/* Central Glow */}
          <div 
            className={`hug-glow ${isComplete ? 'complete' : ''} ${extraWarmthUnlocked ? 'extra-warm' : ''}`}
            style={{
              width: `${glowSize}px`,
              height: `${glowSize}px`,
              filter: `blur(${blurAmount}px)`,
              background: `radial-gradient(circle, 
                hsla(${30 + warmth * 20}, ${60 + warmth * 20 + extraGlow * 100}%, ${75 + warmth * 10}%, ${0.4 + warmth * 0.4 + extraGlow}) 0%,
                hsla(${20 + warmth * 15}, ${40 + warmth * 20}%, ${80 + warmth * 5}%, ${0.2 + warmth * 0.2}) 50%,
                transparent 100%)`,
              transform: `scale(${1 + warmth * 0.1})`
            }}
          />

          {/* Inner warmth core */}
          <div 
            className="warmth-core"
            style={{
              opacity: warmth * 0.8,
              transform: `scale(${0.5 + warmth * 0.5})`
            }}
          />

          {/* Hold indicator */}
          {!isComplete && (
            <div 
              className="hold-hint"
              style={{ opacity: isHolding ? 0 : 0.4 }}
            >
              <span className="material-symbols-outlined">touch_app</span>
            </div>
          )}
        </div>

        {/* Emotional Text */}
        <div className={`emotional-text ${showFinalText ? 'visible' : ''}`}>
          <h1>
            "That warmth?<br />
            That's you."
          </h1>
        </div>

        {/* Don't let go text - for long holds */}
        <div className={`dont-let-go-text ${showDontLetGoText && isComplete ? 'visible' : ''}`}>
          <p>Okay… now I don't want to let go. 🤗</p>
        </div>

        {/* Melt text - for very long holds */}
        <div className={`melt-text ${showMeltText ? 'visible' : ''}`}>
          <p>You're melting me. 💕</p>
        </div>

        {/* Still warm text - appears after completion */}
        <div className={`still-warm-text ${showStillWarm ? 'visible' : ''}`}>
          <p>I can still feel that warmth.</p>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Press and hold anywhere.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

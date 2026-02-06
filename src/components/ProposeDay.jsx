import { useState, useRef, useEffect } from 'react';
import { usePatienceReward, useHoldInteraction } from './shared/hooks';
import './shared/styles.css';
import './ProposeDay.css';

export default function ProposeDay({ onComplete }) {
  const { isHolding, holdProgress, isComplete, startHold, endHold } = useHoldInteraction(3000);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showShyPulse, setShowShyPulse] = useState(false);
  const [showLongHoldText, setShowLongHoldText] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  
  // Secret features
  const [showSecretYes, setShowSecretYes] = useState(false);
  const [yesRevealed, setYesRevealed] = useState(false);
  const [showForeverText, setShowForeverText] = useState(false);
  
  const tapTimerRef = useRef(null);
  const holdStartRef = useRef(null);
  const showPatience = usePatienceReward(5000, isComplete);

  // Show text after completion
  useEffect(() => {
    if (isComplete && !showFinalText) {
      setTimeout(() => setShowFinalText(true), 800);
      // Show forever text after a longer pause
      setTimeout(() => setShowForeverText(true), 6000);
    }
  }, [isComplete, showFinalText]);

  // Secret: After 7 taps, reveal a "yes" explosion
  useEffect(() => {
    if (tapCount >= 7 && !yesRevealed && !isComplete) {
      setShowSecretYes(true);
      setYesRevealed(true);
      setTimeout(() => setShowSecretYes(false), 4000);
    }
  }, [tapCount, yesRevealed, isComplete]);

  // Track long holds for extra message
  useEffect(() => {
    if (holdProgress > 0.9 && !showLongHoldText && !isComplete) {
      setShowLongHoldText(true);
    }
  }, [holdProgress, showLongHoldText, isComplete]);

  const handleStart = (e) => {
    e.preventDefault();
    holdStartRef.current = Date.now();
    startHold();
  };

  const handleEnd = (e) => {
    e.preventDefault();
    const holdDuration = Date.now() - (holdStartRef.current || Date.now());
    
    // Detect quick tap (less than 200ms)
    if (holdDuration < 200 && !isComplete) {
      setTapCount(prev => prev + 1);
      setShowShyPulse(true);
      setTimeout(() => setShowShyPulse(false), 600);
    }
    
    endHold();
  };

  // Calculate visual states based on progress
  const pulseSpeed = isHolding ? 1 - holdProgress * 0.6 : 1;
  const glowIntensity = holdProgress * 0.8;
  const blurAmount = 20 - holdProgress * 15;

  return (
    <div className="day-canvas propose-day">
      {/* Secret Yes Explosion */}
      {showSecretYes && (
        <div className="secret-yes-container">
          <div className="yes-burst">YES! 💕</div>
          <div className="yes-hearts">
            {[...Array(15)].map((_, i) => (
              <span 
                key={i}
                className="burst-heart"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 60}%`,
                  top: `${50 + (Math.random() - 0.5) * 60}%`,
                  animationDelay: `${i * 50}ms`
                }}
              >
                ♥
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ambient Background */}
      <div 
        className="ambient-bg propose-gradient"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: 0.6 + holdProgress * 0.4
        }}
      />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div className="interaction-stage">
        {!isComplete && (
          <div
            className={`heart-container ${isHolding ? 'holding' : ''} ${showShyPulse ? 'shy-pulse' : ''}`}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
          >
            <div 
              className="heart-form"
              style={{
                animationDuration: `${pulseSpeed}s`,
                boxShadow: `0 0 ${60 + glowIntensity * 80}px rgba(224, 122, 95, ${0.2 + glowIntensity * 0.4})`,
                filter: `blur(${8 - holdProgress * 6}px) saturate(${1 + holdProgress * 0.3})`
              }}
            >
              <div className="heart-inner" />
            </div>
            
            {/* Progress ring */}
            <svg className="progress-ring" viewBox="0 0 200 200">
              <circle 
                className="progress-track"
                cx="100" cy="100" r="90"
              />
              <circle 
                className="progress-fill"
                cx="100" cy="100" r="90"
                style={{
                  strokeDashoffset: 565 - (565 * holdProgress)
                }}
              />
            </svg>
          </div>
        )}

        {/* Shy tap feedback */}
        {tapCount > 0 && tapCount < 3 && !isComplete && (
          <div className="shy-tap-hint">
            <p>Hold a little longer... 😌</p>
          </div>
        )}

        {isComplete && (
          <div className="heart-complete">
            <div className="heart-form still" />
          </div>
        )}

        {/* Long hold extra text */}
        <div className={`long-hold-text ${showLongHoldText && isComplete ? 'visible' : ''}`}>
          <p>Yeah… that feels right.</p>
        </div>

        {/* Emotional Text */}
        <div className={`emotional-text ${showFinalText ? 'visible' : ''}`}>
          <h1>
            "This is me choosing you.<br />
            Calmly. Sincerely."
          </h1>
        </div>

        {/* Forever text - appears after pause */}
        <div className={`forever-text ${showForeverText ? 'visible' : ''}`}>
          <p>...like it was always meant to be.</p>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Press and hold.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { usePatienceReward } from './shared/hooks';
import './shared/styles.css';
import './PromiseDay.css';

const promiseWords = ['I', 'promise', 'to', 'keep', 'choosing', 'you.'];

export default function PromiseDay({ onComplete }) {
  const [revealedWords, setRevealedWords] = useState(0);
  const [underlineProgress, setUnderlineProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalState, setShowFinalState] = useState(false);
  const [showPauseText, setShowPauseText] = useState(false);
  const [underlineThickness, setUnderlineThickness] = useState(1);
  const [interactionCount, setInteractionCount] = useState(0);
  
  // Secret features
  const [showSecretPromise, setShowSecretPromise] = useState(false);
  const [completionHoldTime, setCompletionHoldTime] = useState(0);
  const [showForeverText, setShowForeverText] = useState(false);
  
  const progressRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const completionTimerRef = useRef(null);
  
  const showPatience = usePatienceReward(5000, isComplete);

  // Secret: Hold after completion for extra message
  useEffect(() => {
    if (isComplete && isInteracting) {
      completionTimerRef.current = setInterval(() => {
        setCompletionHoldTime(prev => {
          if (prev >= 4 && !showSecretPromise) {
            setShowSecretPromise(true);
            setTimeout(() => setShowSecretPromise(false), 4000);
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(completionTimerRef.current);
      setCompletionHoldTime(0);
    }
    return () => clearInterval(completionTimerRef.current);
  }, [isComplete, isInteracting, showSecretPromise]);

  // Show forever text after a pause
  useEffect(() => {
    if (showFinalState) {
      const timer = setTimeout(() => setShowForeverText(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [showFinalState]);

  useEffect(() => {
    if (revealedWords >= promiseWords.length && !isComplete) {
      setIsComplete(true);
      setTimeout(() => setShowFinalState(true), 800);
    }
  }, [revealedWords, isComplete]);

  // Show pause text if user stops midway
  useEffect(() => {
    if (!isInteracting && revealedWords > 0 && revealedWords < promiseWords.length) {
      pauseTimerRef.current = setTimeout(() => {
        setShowPauseText(true);
      }, 2000);
    } else {
      clearTimeout(pauseTimerRef.current);
      setShowPauseText(false);
    }
    return () => clearTimeout(pauseTimerRef.current);
  }, [isInteracting, revealedWords]);

  useEffect(() => {
    if (isInteracting && revealedWords < promiseWords.length) {
      progressRef.current = setInterval(() => {
        setUnderlineProgress(prev => {
          const newProgress = prev + 0.02;
          
          // Reveal next word at intervals
          const wordThreshold = (revealedWords + 1) / promiseWords.length;
          if (newProgress >= wordThreshold && revealedWords < promiseWords.length) {
            setRevealedWords(r => r + 1);
          }
          
          return Math.min(newProgress, 1);
        });
      }, 50);
    } else {
      clearInterval(progressRef.current);
    }
    
    return () => clearInterval(progressRef.current);
  }, [isInteracting, revealedWords]);

  const handleStart = (e) => {
    if (isComplete) return;
    setIsInteracting(true);
    setShowPauseText(false);
    
    // Track re-interactions - thicken underline each time
    setInteractionCount(prev => prev + 1);
    if (interactionCount > 0) {
      setUnderlineThickness(prev => Math.min(prev + 0.5, 3));
    }
  };

  const handleEnd = () => {
    setIsInteracting(false);
  };

  return (
    <div 
      className="day-canvas promise-day"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      {/* Ambient Background */}
      <div className="ambient-bg promise-gradient" />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div className="interaction-stage">
        <div className="promise-container">
          {/* Writing Surface Line */}
          <div className="writing-surface">
            <div 
              className="underline"
              style={{ 
                width: `${underlineProgress * 100}%`,
                height: `${underlineThickness}px`
              }}
            />
          </div>

          {/* Promise Text */}
          <div className="promise-text">
            {promiseWords.map((word, index) => (
              <span
                key={index}
                className={`promise-word ${index < revealedWords ? 'revealed' : ''}`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Cursor indicator */}
          {!isComplete && (
            <div 
              className={`write-cursor ${isInteracting ? 'active' : ''}`}
              style={{ left: `${underlineProgress * 100}%` }}
            />
          )}

          {/* Pause text */}
          <div className={`pause-text ${showPauseText ? 'visible' : ''}`}>
            <p>Take your time. I'm not going anywhere. 😌</p>
          </div>
        </div>

        {/* Final stillness state */}
        {showFinalState && (
          <div className="emotional-text visible">
            <div className="complete-mark">
              <span className="material-symbols-outlined">done</span>
            </div>
          </div>
        )}

        {/* Forever text - appears after completion pause */}
        <div className={`forever-promise-text ${showForeverText ? 'visible' : ''}`}>
          <p>This promise is written in my heart.</p>
        </div>

        {/* Secret promise - appears when holding after complete */}
        <div className={`secret-promise-text ${showSecretPromise ? 'visible' : ''}`}>
          <p>Forever isn't long enough with you. 💕</p>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Tap or hold to write.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { usePatienceReward } from './shared/hooks';
import './shared/styles.css';
import './ValentinesDay.css';

const dayIcons = ['🌹', '💍', '🍫', '🧸', '🤝', '🤗', '💋'];
const dayMemories = [
  'the first bloom',
  'when you said yes',
  'something sweet',
  'comfort in arms',
  'words that stay',
  'warmth that lingers',
  'closer than words'
];

export default function ValentinesDay({ onComplete }) {
  const [isConverging, setIsConverging] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [highlightedDay, setHighlightedDay] = useState(null);
  const [showExtraLine, setShowExtraLine] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  
  // The ultimate secrets
  const [showNidhikaLine, setShowNidhikaLine] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [completeTapCount, setCompleteTapCount] = useState(0);
  const [showFinalSecret, setShowFinalSecret] = useState(false);
  
  const holdTimerRef = useRef(null);
  const extraLineTimerRef = useRef(null);
  
  const showPatience = usePatienceReward(5000, showFinalText);

  useEffect(() => {
    if (isConverging) {
      const connectionDelay = isLongPress ? 1200 : 800;
      const textDelay = isLongPress ? 2800 : 2000;
      
      setTimeout(() => setShowConnections(true), connectionDelay);
      setTimeout(() => setShowFinalText(true), textDelay);
    }
  }, [isConverging, isLongPress]);

  // Show extra line after a pause on final text
  useEffect(() => {
    if (showFinalText) {
      extraLineTimerRef.current = setTimeout(() => {
        setShowExtraLine(true);
      }, 4000);
      
      // Show Nidhika line after longer pause
      setTimeout(() => setShowNidhikaLine(true), 8000);
    }
    return () => {
      if (extraLineTimerRef.current) clearTimeout(extraLineTimerRef.current);
    };
  }, [showFinalText]);

  // Secret: Tap after complete to burst hearts
  useEffect(() => {
    if (showFinalText && completeTapCount >= 3 && !showHeartBurst) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 3000);
    }
    
    // Ultimate secret: 7 taps (one for each day) reveals final message
    if (completeTapCount >= 7 && !showFinalSecret) {
      setShowFinalSecret(true);
    }
  }, [completeTapCount, showFinalText, showHeartBurst, showFinalSecret]);

  const handleInteractionStart = () => {
    if (showFinalText) {
      setCompleteTapCount(prev => prev + 1);
      return;
    }
    
    if (hasInteracted) return;
    
    // Start long press timer
    holdTimerRef.current = setTimeout(() => {
      setIsLongPress(true);
      setHasInteracted(true);
      setIsConverging(true);
    }, 800);
  };

  const handleInteractionEnd = () => {
    if (showFinalText) return;
    if (hasInteracted) return;
    
    // If released before long press, do quick tap
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    
    setHasInteracted(true);
    setIsConverging(true);
  };

  const handleStarHover = (index) => {
    if (!isConverging) {
      setHighlightedDay(index);
    }
  };

  // Calculate constellation positions
  const getStarPosition = (index, converging) => {
    const baseAngle = (index / 7) * Math.PI * 2 - Math.PI / 2;
    const radius = converging ? 30 : 120;
    return {
      x: 50 + Math.cos(baseAngle) * radius,
      y: 50 + Math.sin(baseAngle) * radius
    };
  };

  return (
    <div 
      className={`day-canvas valentines-day ${isLongPress ? 'gentle-mode' : ''}`}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={() => holdTimerRef.current && clearTimeout(holdTimerRef.current)}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {/* Ambient Background - Harmony of all previous tones */}
      <div className="ambient-bg valentines-gradient" />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div className="interaction-stage">
        <div className={`constellation ${isConverging ? 'converging' : ''} ${isLongPress ? 'gentle' : ''}`}>
          {/* Stars representing each day */}
          {dayIcons.map((icon, index) => {
            const pos = getStarPosition(index, isConverging);
            return (
              <div
                key={index}
                className={`star day-${index + 1} ${highlightedDay === index ? 'highlighted' : ''}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transitionDelay: isLongPress ? `${index * 150}ms` : `${index * 100}ms`
                }}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={() => setHighlightedDay(null)}
              >
                <span className="star-icon">{icon}</span>
                <div className="star-glow" />
              </div>
            );
          })}

          {/* Memory text on hover */}
          {highlightedDay !== null && !isConverging && (
            <div className="memory-text">
              <p>{dayMemories[highlightedDay]}</p>
            </div>
          )}

          {/* Connecting Lines */}
          {showConnections && (
            <svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none">
              {dayIcons.map((_, index) => {
                const pos1 = getStarPosition(index, true);
                const pos2 = getStarPosition((index + 1) % 7, true);
                return (
                  <line
                    key={index}
                    x1={pos1.x}
                    y1={pos1.y}
                    x2={pos2.x}
                    y2={pos2.y}
                    className="connection-line"
                    style={{ animationDelay: `${index * 150}ms` }}
                  />
                );
              })}
            </svg>
          )}

          {/* Center Heart */}
          {showConnections && (
            <div className="center-heart">
              <span>❤️</span>
            </div>
          )}
        </div>

        {/* Emotional Text */}
        <div className={`emotional-text ${showFinalText ? 'visible' : ''}`}>
          <h1>
            "This wasn't a week.<br />
            This was how I love you."
          </h1>
        </div>

        {/* Extra line - appears after pause */}
        <div className={`extra-line ${showExtraLine ? 'visible' : ''}`}>
          <p>And I'd do it all again.</p>
        </div>

        {/* Nidhika line - the personal touch */}
        <div className={`nidhika-line ${showNidhikaLine ? 'visible' : ''}`}>
          <p>With you, Nidhika. Always you. 💕</p>
        </div>

        {/* Heart burst - secret interaction */}
        {showHeartBurst && (
          <div className="heart-burst-container">
            {[...Array(20)].map((_, i) => (
              <span 
                key={i}
                className="burst-heart"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 80}%`,
                  top: `${50 + (Math.random() - 0.5) * 80}%`,
                  animationDelay: `${i * 30}ms`,
                  fontSize: `${0.8 + Math.random() * 1}rem`
                }}
              >
                {['♥', '💕', '💗', '💖', '❤️'][Math.floor(Math.random() * 5)]}
              </span>
            ))}
          </div>
        )}

        {/* Final secret - the ultimate message */}
        <div className={`final-secret ${showFinalSecret ? 'visible' : ''}`}>
          <div className="secret-content">
            <p className="secret-main">You found all seven. ✨</p>
            <p className="secret-sub">One for each day I fell deeper in love with you.</p>
            <p className="secret-end">Happy Valentine's Day, my love.</p>
          </div>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Tap anywhere.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

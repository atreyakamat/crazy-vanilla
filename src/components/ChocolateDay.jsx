import { useState, useRef, useEffect } from 'react';
import { usePatienceReward } from './shared/hooks';
import './shared/styles.css';
import './ChocolateDay.css';

export default function ChocolateDay({ onComplete }) {
  const [unwrapProgress, setUnwrapProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showSlowDownText, setShowSlowDownText] = useState(false);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [showPatientReward, setShowPatientReward] = useState(false);
  
  // Secret features
  const [showShareText, setShowShareText] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [showSweetMessage, setShowSweetMessage] = useState(false);
  
  const startXRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const containerRef = useRef(null);
  const slowDownTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);
  
  const showPatience = usePatienceReward(5000, isComplete);

  useEffect(() => {
    if (unwrapProgress >= 1 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => setShowFinalText(true), 1000);
      // After completing, show sweet share message
      setTimeout(() => setShowShareText(true), 4000);
    }
  }, [unwrapProgress, isComplete]);

  // Secret: If they pause mid-unwrap multiple times, show sweet message
  useEffect(() => {
    if (pauseCount >= 3 && !showSweetMessage && !isComplete) {
      setShowSweetMessage(true);
      setTimeout(() => setShowSweetMessage(false), 3000);
    }
  }, [pauseCount, showSweetMessage, isComplete]);

  // Reward for patient unwrapping
  useEffect(() => {
    if (unwrapProgress > 0.3 && dragSpeed < 3 && !showPatientReward && !isComplete) {
      setShowPatientReward(true);
    }
  }, [unwrapProgress, dragSpeed, showPatientReward, isComplete]);

  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    lastTimeRef.current = Date.now();
    
    // Clear pause timer
    clearTimeout(pauseTimerRef.current);
  };

  const handleMove = (e) => {
    if (!isDragging || isComplete) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startXRef.current;
    const deltaTime = Date.now() - lastTimeRef.current;
    
    // Calculate speed
    const speed = Math.abs(deltaX) / Math.max(deltaTime, 1) * 100;
    setDragSpeed(speed);
    
    // Add resistance - MORE resistance if going too fast
    let resistance = 0.003;
    if (speed > 15) {
      resistance = 0.001; // Much more resistance when fast
      // Show slow down message
      if (!showSlowDownText) {
        setShowSlowDownText(true);
        clearTimeout(slowDownTimerRef.current);
        slowDownTimerRef.current = setTimeout(() => setShowSlowDownText(false), 2000);
      }
    }
    
    const newProgress = Math.min(1, Math.max(0, unwrapProgress + deltaX * resistance));
    
    setUnwrapProgress(newProgress);
    startXRef.current = clientX;
    lastTimeRef.current = Date.now();
  };

  const handleEnd = () => {
    setIsDragging(false);
    setDragSpeed(0);
    
    // Track pauses mid-unwrap
    if (unwrapProgress > 0.1 && unwrapProgress < 0.9) {
      pauseTimerRef.current = setTimeout(() => {
        setPauseCount(prev => prev + 1);
      }, 1000);
    }
  };

  return (
    <div className="day-canvas chocolate-day">
      {/* Ambient Background */}
      <div className="ambient-bg chocolate-gradient" />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div 
        className="interaction-stage"
        ref={containerRef}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div className="chocolate-container">
          {/* Chocolate Bar */}
          <div className="chocolate-bar">
            {/* Chocolate squares with revealing layers */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="chocolate-square"
                style={{
                  opacity: unwrapProgress > (i / 8) ? 1 : 0.3,
                  filter: `saturate(${0.5 + unwrapProgress * 0.5})`
                }}
              >
                <div className="chocolate-sheen" style={{ opacity: unwrapProgress * 0.6 }} />
                <div className="chocolate-texture" style={{ opacity: unwrapProgress * 0.8 }} />
              </div>
            ))}
          </div>

          {/* Wrapper */}
          <div 
            className={`wrapper ${isDragging ? 'dragging' : ''} ${dragSpeed > 15 ? 'resisting' : ''}`}
            style={{
              transform: `translateX(${unwrapProgress * 100}%)`,
              opacity: 1 - unwrapProgress * 0.3
            }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <div className="wrapper-fold" />
            <div className="wrapper-pattern">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="wrapper-stripe" />
              ))}
            </div>
            <div className="wrapper-edge" />
          </div>

          {/* Slow down teasing text */}
          <div className={`slow-down-text ${showSlowDownText ? 'visible' : ''}`}>
            <p>Hey… slow down 😌</p>
          </div>

          {/* Patient reward - early sheen */}
          {showPatientReward && (
            <div className="patient-reward">
              <div className="early-sheen" />
            </div>
          )}
        </div>

        {/* Emotional Text */}
        <div className={`emotional-text ${showFinalText ? 'visible' : ''}`}>
          <h1>
            "Some things are sweeter<br />
            when you take your time."
          </h1>
        </div>

        {/* Share text - appears after completion */}
        <div className={`share-text ${showShareText ? 'visible' : ''}`}>
          <p>But sharing it with you makes it better 💕</p>
        </div>

        {/* Sweet message for pausing mid-unwrap */}
        <div className={`sweet-message ${showSweetMessage ? 'visible' : ''}`}>
          <p>Savoring the anticipation? That's so you.</p>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Drag slowly to unwrap.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

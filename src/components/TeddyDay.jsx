import { useState, useEffect, useRef } from 'react';
import { usePatienceReward } from './shared/hooks';
import './shared/styles.css';
import './TeddyDay.css';

export default function TeddyDay({ onComplete }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHugging, setIsHugging] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [showComeBackText, setShowComeBackText] = useState(false);
  const [droppedFarAway, setDroppedFarAway] = useState(false);
  
  // Secret features
  const [hugCount, setHugCount] = useState(0);
  const [showExtraHug, setShowExtraHug] = useState(false);
  const [showStayText, setShowStayText] = useState(false);
  const [stayTimer, setStayTimer] = useState(0);
  
  const lastPosRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const wiggleHistoryRef = useRef([]);
  const stayTimerRef = useRef(null);
  
  const showPatience = usePatienceReward(5000, showFinalText);

  // Track how long teddy stays hugged
  useEffect(() => {
    if (isHugging) {
      stayTimerRef.current = setInterval(() => {
        setStayTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(stayTimerRef.current);
      setStayTimer(0);
    }
    return () => clearInterval(stayTimerRef.current);
  }, [isHugging]);

  // Show extra text if they stay hugging for a while
  useEffect(() => {
    if (stayTimer >= 10 && !showStayText) {
      setShowStayText(true);
    }
  }, [stayTimer, showStayText]);

  // Secret: Multiple hugs unlock extra message
  useEffect(() => {
    if (hugCount >= 3 && !showExtraHug) {
      setShowExtraHug(true);
      setTimeout(() => setShowExtraHug(false), 4000);
    }
  }, [hugCount, showExtraHug]);

  // Detect wiggling motion
  useEffect(() => {
    if (isDragging) {
      wiggleHistoryRef.current.push({ ...velocity, time: Date.now() });
      // Keep only last 500ms of history
      wiggleHistoryRef.current = wiggleHistoryRef.current.filter(v => Date.now() - v.time < 500);
      
      // Check for direction changes (wiggling)
      if (wiggleHistoryRef.current.length > 5) {
        let directionChanges = 0;
        for (let i = 1; i < wiggleHistoryRef.current.length; i++) {
          if (Math.sign(wiggleHistoryRef.current[i].x) !== Math.sign(wiggleHistoryRef.current[i-1].x)) {
            directionChanges++;
          }
        }
        if (directionChanges >= 3) {
          setIsWiggling(true);
          // Tilt teddy based on velocity
          setRotation(velocity.x * 0.3);
        }
      }
    } else {
      setIsWiggling(false);
      setRotation(0);
      wiggleHistoryRef.current = [];
    }
  }, [velocity, isDragging]);

  // Soft drift back to center when not dragging
  useEffect(() => {
    if (!isDragging && !isHugging && (Math.abs(position.x) > 5 || Math.abs(position.y) > 5)) {
      const drift = () => {
        setPosition(prev => {
          const newX = prev.x * 0.95;
          const newY = prev.y * 0.95;
          if (Math.abs(newX) < 1 && Math.abs(newY) < 1) {
            return { x: 0, y: 0 };
          }
          animationRef.current = requestAnimationFrame(drift);
          return { x: newX, y: newY };
        });
      };
      animationRef.current = requestAnimationFrame(drift);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging, isHugging, position]);

  // Show "come back" text when dropped far and drifting back
  useEffect(() => {
    if (droppedFarAway && !isDragging && !isHugging) {
      const distance = Math.sqrt(position.x * position.x + position.y * position.y);
      if (distance > 30) {
        setShowComeBackText(true);
      } else {
        setShowComeBackText(false);
        setDroppedFarAway(false);
      }
    }
  }, [position, droppedFarAway, isDragging, isHugging]);

  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    cancelAnimationFrame(animationRef.current);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastPosRef.current = { x: clientX, y: clientY };
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - lastPosRef.current.x;
    const deltaY = clientY - lastPosRef.current.y;
    
    // Soft lag effect
    setPosition(prev => ({
      x: prev.x + deltaX * 0.6,
      y: prev.y + deltaY * 0.6
    }));
    
    setVelocity({ x: deltaX, y: deltaY });
    lastPosRef.current = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    setIsDragging(false);
    
    // Check if near center for hug
    const distance = Math.sqrt(position.x * position.x + position.y * position.y);
    if (distance < 50) {
      triggerHug();
    } else if (distance > 100) {
      // Dropped far away - show come back text
      setDroppedFarAway(true);
    }
  };

  const triggerHug = () => {
    setIsHugging(true);
    setPosition({ x: 0, y: 0 });
    setHugCount(prev => prev + 1);
    
    setTimeout(() => {
      setShowFinalText(true);
    }, 1200);
  };

  // Calculate shadow based on position
  const shadowX = position.x * 0.3;
  const shadowY = position.y * 0.3 + 20;
  const shadowBlur = 30 + Math.abs(position.y) * 0.2;

  return (
    <div 
      className="day-canvas teddy-day"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      ref={containerRef}
    >
      {/* Ambient Background */}
      <div className="ambient-bg teddy-gradient" />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div className="interaction-stage">
        <div 
          className={`teddy-container ${isDragging ? 'dragging' : ''} ${isHugging ? 'hugging' : ''} ${isWiggling ? 'wiggling' : ''}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {/* Teddy Shadow */}
          <div 
            className="teddy-shadow"
            style={{
              transform: `translate(${shadowX}px, ${shadowY}px)`,
              filter: `blur(${shadowBlur}px)`,
              opacity: 0.15 + Math.abs(position.y) * 0.001
            }}
          />
          
          {/* Teddy Body */}
          <div className={`teddy ${isHugging ? 'squash' : ''}`}>
            {/* Head */}
            <div className="teddy-head">
              <div className="teddy-ear left" />
              <div className="teddy-ear right" />
              <div className="teddy-face">
                <div className="teddy-eye left" />
                <div className="teddy-eye right" />
                <div className="teddy-nose" />
                <div className="teddy-mouth" />
              </div>
            </div>
            
            {/* Body */}
            <div className="teddy-body">
              <div className="teddy-belly" />
              <div className="teddy-arm left" />
              <div className="teddy-arm right" />
              <div className="teddy-leg left" />
              <div className="teddy-leg right" />
            </div>
          </div>
        </div>

        {/* Emotional Text */}
        <div className={`emotional-text ${showFinalText ? 'visible' : ''}`}>
          <h1>
            "You make things feel safe."
          </h1>
        </div>

        {/* Come back text */}
        <div className={`come-back-text ${showComeBackText ? 'visible' : ''}`}>
          <p>I'll always come back to you. 🧸</p>
        </div>

        {/* Extra hug secret text */}
        <div className={`extra-hug-text ${showExtraHug ? 'visible' : ''}`}>
          <p>You really like hugging me, don't you? 🥰</p>
        </div>

        {/* Stay text - when they stay hugging */}
        <div className={`stay-text ${showStayText ? 'visible' : ''}`}>
          <p>I could stay like this forever.</p>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Drag me around.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

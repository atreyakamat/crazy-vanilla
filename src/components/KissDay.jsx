import { useState, useEffect, useRef } from 'react';
import { usePatienceReward } from './shared/hooks';
import './shared/styles.css';
import './KissDay.css';

export default function KissDay({ onComplete }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [proximity, setProximity] = useState(0);
  const [isMerged, setIsMerged] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const containerRef = useRef(null);
  
  // Playful additions
  const [showYouSure, setShowYouSure] = useState(false);
  const [wasClose, setWasClose] = useState(false);
  const [showHesitation, setShowHesitation] = useState(false);
  const [approachSpeed, setApproachSpeed] = useState(0);
  const [colorBonus, setColorBonus] = useState(0);
  const lastProximityRef = useRef(0);
  const lastMoveTimeRef = useRef(Date.now());
  
  const showPatience = usePatienceReward(5000, isMerged);

  // Track if they've been close then moved away
  useEffect(() => {
    if (proximity >= 0.7 && !wasClose) {
      setWasClose(true);
    }
    
    if (wasClose && proximity < 0.5 && !isMerged) {
      setShowHesitation(true);
      setTimeout(() => setShowHesitation(false), 2500);
    }
  }, [proximity, wasClose, isMerged]);

  // Show "you sure?" just before merge
  useEffect(() => {
    if (proximity >= 0.85 && proximity < 0.95 && !showYouSure && !isMerged) {
      setShowYouSure(true);
    }
    if (proximity < 0.8) {
      setShowYouSure(false);
    }
  }, [proximity, showYouSure, isMerged]);

  // Color bonus for slow, patient approach
  useEffect(() => {
    if (approachSpeed < 0.02 && proximity > 0.3) {
      // Very slow approach gets rewarded
      setColorBonus(prev => Math.min(0.3, prev + 0.01));
    }
  }, [approachSpeed, proximity]);

  useEffect(() => {
    if (proximity >= 0.95 && !isMerged) {
      setIsMerged(true);
      setShowYouSure(false);
      setTimeout(() => setShowFinalText(true), 1500);
    }
  }, [proximity, isMerged]);

  const handleMove = (e) => {
    if (isMerged) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    
    setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    
    // Calculate proximity based on how centered the cursor is
    const centerDist = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
    const newProximity = Math.max(0, 1 - centerDist * 2);
    
    // Track approach speed
    const now = Date.now();
    const timeDelta = now - lastMoveTimeRef.current;
    const proxDelta = Math.abs(newProximity - lastProximityRef.current);
    setApproachSpeed(timeDelta > 0 ? proxDelta / timeDelta * 1000 : 0);
    
    lastProximityRef.current = newProximity;
    lastMoveTimeRef.current = now;
    
    setProximity(newProximity);
  };

  // Shape positions based on proximity
  const shape1X = 30 - proximity * 15;
  const shape2X = 70 + proximity * 15;
  const blurAmount = 15 - proximity * 12;
  const colorDepth = proximity * 0.4 + colorBonus;

  return (
    <div 
      className="day-canvas kiss-day"
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Ambient Background */}
      <div className="ambient-bg kiss-gradient" />

      {/* Breathing Space Top */}
      <div className="breathing-space" />

      {/* Interaction Stage */}
      <div className="interaction-stage">
        <div className={`shapes-container ${isMerged ? 'merged' : ''}`}>
          {!isMerged ? (
            <>
              {/* Shape 1 */}
              <div 
                className="gradient-shape shape-1"
                style={{
                  left: `${shape1X}%`,
                  filter: `blur(${blurAmount}px)`,
                  background: `radial-gradient(circle, 
                    hsla(350, ${50 + colorDepth * 30}%, ${70 - colorDepth * 10}%, ${0.6 + colorDepth}) 0%, 
                    transparent 70%)`
                }}
              />
              
              {/* Shape 2 */}
              <div 
                className="gradient-shape shape-2"
                style={{
                  left: `${shape2X}%`,
                  filter: `blur(${blurAmount}px)`,
                  background: `radial-gradient(circle, 
                    hsla(20, ${50 + colorDepth * 30}%, ${75 - colorDepth * 10}%, ${0.6 + colorDepth}) 0%, 
                    transparent 70%)`
                }}
              />
            </>
          ) : (
            /* Merged Shape */
            <div className="merged-shape">
              <div className="merge-glow" />
            </div>
          )}
        </div>

        {/* Emotional Text */}
        <div className={`emotional-text ${showFinalText ? 'visible' : ''}`}>
          <h1>
            "Some closeness<br />
            doesn't need words."
          </h1>
        </div>

        {/* You Sure text - appears just before merge */}
        <div className={`you-sure-text ${showYouSure ? 'visible' : ''}`}>
          <p>you sure? 😌</p>
        </div>

        {/* Hesitation text - when they pull away */}
        <div className={`hesitation-text ${showHesitation ? 'visible' : ''}`}>
          <p>...take your time</p>
        </div>
      </div>

      {/* Breathing Space Bottom */}
      <div className="breathing-space" />

      {/* Patience Reward */}
      <div className={`patience-text ${showPatience ? 'visible' : ''}`}>
        Bring them closer.
      </div>

      {/* Texture Overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import './LoveLetter.css';

// This appears when user draws a heart shape on the screen
export default function LoveLetter() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const pathRef = useRef([]);
  const lastPointRef = useRef(null);
  
  useEffect(() => {
    const handleMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      
      if (lastPointRef.current) {
        pathRef.current.push({ x, y });
        
        // Keep only last 50 points
        if (pathRef.current.length > 50) {
          pathRef.current.shift();
        }
        
        // Check for heart-like pattern (loop back near start)
        if (pathRef.current.length >= 30) {
          const start = pathRef.current[0];
          const current = pathRef.current[pathRef.current.length - 1];
          const dist = Math.sqrt(Math.pow(current.x - start.x, 2) + Math.pow(current.y - start.y, 2));
          
          // If they looped back near where they started
          if (dist < 50 && !hasShown) {
            // Calculate total path length to ensure it's a proper loop
            let totalDist = 0;
            for (let i = 1; i < pathRef.current.length; i++) {
              const p1 = pathRef.current[i-1];
              const p2 = pathRef.current[i];
              totalDist += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            }
            
            if (totalDist > 300) {
              setIsVisible(true);
              setHasShown(true);
              setTimeout(() => setIsVisible(false), 10000);
            }
          }
        }
      }
      
      lastPointRef.current = { x, y };
    };
    
    const handleEnd = () => {
      pathRef.current = [];
      lastPointRef.current = null;
    };
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [hasShown]);
  
  if (!isVisible) return null;
  
  return (
    <div className="love-letter-overlay" onClick={() => setIsVisible(false)}>
      <div className="love-letter">
        <div className="letter-fold" />
        <div className="letter-content">
          <p className="letter-greeting">My dearest Nidhika,</p>
          <p className="letter-body">
            Every day with you feels like a gift I never knew I was waiting for.
            You make ordinary moments feel extraordinary,
            and I fall in love with you a little more each time you smile.
          </p>
          <p className="letter-closing">
            This is just the beginning of forever.
          </p>
          <p className="letter-signature">
            Yours, always and completely 💕
          </p>
        </div>
        <div className="letter-seal">💝</div>
      </div>
    </div>
  );
}

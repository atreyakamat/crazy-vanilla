import { useEffect, useRef } from 'react';
import './CursorTrail.css';

export default function CursorTrail({ color = 'rose' }) {
  const trailsRef = useRef([]);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let lastX = 0, lastY = 0;
    let throttle = false;
    
    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = `cursor-trail ${color}`;
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      container.appendChild(trail);
      
      setTimeout(() => trail.remove(), 1000);
    };
    
    const handleMove = (e) => {
      if (throttle) return;
      throttle = true;
      setTimeout(() => throttle = false, 50);
      
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      
      const dist = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
      if (dist > 20) {
        createTrail(x, y);
        lastX = x;
        lastY = y;
      }
    };
    
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [color]);
  
  return <div ref={containerRef} className="cursor-trail-container" />;
}

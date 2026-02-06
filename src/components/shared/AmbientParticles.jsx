import { useEffect, useRef } from 'react';
import './AmbientParticles.css';

const particleTypes = {
  rose: ['🌸', '✿', '❀', '✾'],
  heart: ['♡', '♥', '❤', '💕'],
  sparkle: ['✨', '⋆', '˚', '·'],
  warm: ['○', '◦', '˚', '·'],
};

export default function AmbientParticles({ type = 'sparkle', count = 12, speed = 'slow' }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const particles = [];
    const symbols = particleTypes[type] || particleTypes.sparkle;
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = `ambient-particle ${speed}`;
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particle.style.opacity = 0.1 + Math.random() * 0.2;
      particle.style.fontSize = `${0.5 + Math.random() * 0.8}rem`;
      container.appendChild(particle);
      particles.push(particle);
    }
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, [type, count, speed]);
  
  return <div ref={containerRef} className="ambient-particles-container" />;
}

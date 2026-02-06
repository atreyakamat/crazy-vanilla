import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowTitle(true), 500),
      setTimeout(() => setShowSubtitle(true), 1500),
      setTimeout(() => setShowHint(true), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);
  
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/nidhikaroseroseka');
    }, 800);
  };
  
  return (
    <div 
      className={`landing-page ${isExiting ? 'exiting' : ''}`}
      onClick={handleEnter}
      onTouchStart={handleEnter}
    >
      {/* Floating hearts background */}
      <div className="floating-elements">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              opacity: 0.1 + Math.random() * 0.15,
              fontSize: `${0.5 + Math.random() * 1}rem`
            }}
          >
            ♡
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="landing-content">
        <div className={`landing-title ${showTitle ? 'visible' : ''}`}>
          <h1>8 Days</h1>
          <p className="title-accent">of loving you</p>
        </div>
        
        <div className={`landing-subtitle ${showSubtitle ? 'visible' : ''}`}>
          <p>A journey through moments</p>
          <p>that belong only to us</p>
        </div>
        
        <div className={`for-you ${showSubtitle ? 'visible' : ''}`}>
          <span>for</span>
          <span className="name">Nidhika</span>
          <span>💕</span>
        </div>
      </div>
      
      <div className={`landing-hint ${showHint ? 'visible' : ''}`}>
        <p>tap anywhere to begin</p>
      </div>
      
      {/* Texture overlay */}
      <div className="texture-overlay" />
    </div>
  );
}

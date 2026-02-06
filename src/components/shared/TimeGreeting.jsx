import { useState, useEffect } from 'react';
import './TimeGreeting.css';

export default function TimeGreeting() {
  const [greeting, setGreeting] = useState('');
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const hour = new Date().getHours();
    
    let message = '';
    if (hour >= 5 && hour < 12) {
      message = 'Good morning, beautiful ☀️';
    } else if (hour >= 12 && hour < 17) {
      message = 'Hope your day is as lovely as you 🌸';
    } else if (hour >= 17 && hour < 21) {
      message = 'The evening is softer with you in my thoughts 🌅';
    } else {
      message = 'Even the stars are jealous of your glow 🌙';
    }
    
    setGreeting(message);
    
    // Fade out after 4 seconds
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`time-greeting ${show ? 'visible' : ''}`}>
      <p>{greeting}</p>
    </div>
  );
}

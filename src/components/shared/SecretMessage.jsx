import { useState, useEffect } from 'react';
import './SecretMessage.css';

// Secret message that appears when typing "nidhika" anywhere
export default function SecretMessage() {
  const [typedKeys, setTypedKeys] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [secretSeen, setSecretSeen] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key.length === 1 && key.match(/[a-z]/)) {
        setTypedKeys(prev => {
          const newKeys = (prev + key).slice(-7);
          if (newKeys === 'nidhika' && !secretSeen) {
            setShowSecret(true);
            setSecretSeen(true);
            setTimeout(() => setShowSecret(false), 8000);
          }
          return newKeys;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretSeen]);
  
  if (!showSecret) return null;
  
  return (
    <div className="secret-message-overlay">
      <div className="secret-message-content">
        <div className="secret-heart">💝</div>
        <p className="secret-text">
          Every moment with you<br />
          is a universe I want to live in forever.
        </p>
        <p className="secret-signature">— for you, always</p>
      </div>
    </div>
  );
}

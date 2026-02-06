import { useState, useEffect, useRef } from 'react';
import './RoseDay.css';

const roses = [
  {
    id: 'dusty-pink',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFkYciEtqsAHX8cjgXL5YfEAQeBU8EzPYonOooloKg_POi0X7oNK8bvPT-nouVnlnZSyHsy2vAVCbgpstuXXxJbQnCagxUyd-uxnocvzm69VcvVSq_JB_e3K3vxj-rjKGOB8KR-isd28aoE6C1Z12LpjESYSyJDabCdrYfpkjns_QMzhfbSPaImcwL-pAoBRzgEaoQY-zg_FPHoQNbs8lavDNYtQQGXHGIt2oB61Lwj1L5__1R-RTyLCTONW6ZV-2JW8ys799EEw',
    alt: 'A single muted dusty pink rose in soft light',
    size: 'w-48 h-64',
    stem: 'h-20',
    color: 'dusty-pink'
  },
  {
    id: 'warm-rose',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-H5reUZeBLtF_wxqJ09ziaZHtgkjfc9wsIvy2ytM1zWgOWUJAxanSdhpwIIEgXMHuPQpeOiGAKJNgRa8qLmFZb06N5vl2BXoRi5-3OGeS6dYHap5ASfE67S0o-VLPM5AHIBJT634IQpCsDVUMedpqs6_OSAYtEqnmShUqzipsalkcK-zjsaftSGbBXEWEMx38rovqJ2d4RyqEULj_yZVaYodpUTQv1ss-CnCTd21bEaSC-1tIMc5AN_iJR7f5T2Z8U1I_EFQs2Q',
    alt: 'A vibrant deep warm rose flower',
    size: 'w-56 h-72',
    stem: 'h-24',
    color: 'warm-rose',
    isCenter: true
  },
  {
    id: 'soft-peach',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWymOddb6FQmip3mPrTJo-QDpZKQwxFwD8x5-HM5pQ4m4JI36vdZ5PY7Nx4KFeaCb0E1u7BmZTzP_uYnd8ofB9ntSNkozJdjPnpimJIm_ubVsVVktnYoKgIt5jpupMoRHj-Gl_scIMgqdKeiQ_TqKUYWXVPdnlOZF_-T0lGRMB0dkedeDm7vgXaqqP6NxZ3oZdPitfmjI8JihOvWiw0THzPpXMSCGQnQLyZF_99AnhMP7-r2bvWs2zKh0siFZRBCn9r48_nAkWFA',
    alt: 'A delicate soft peach colored rose',
    size: 'w-48 h-64',
    stem: 'h-20',
    color: 'soft-peach'
  }
];

function Petal({ delay, direction }) {
  return (
    <div 
      className="petal"
      style={{
        animationDelay: `${delay}ms`,
        '--drift-x': direction
      }}
    />
  );
}

export default function RoseDay() {
  const [hoveredRose, setHoveredRose] = useState(null);
  const [selectedRose, setSelectedRose] = useState(null);
  const [showPatienceText, setShowPatienceText] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [petals, setPetals] = useState([]);
  const [hoveredRoses, setHoveredRoses] = useState(new Set());
  const [showJealousyText, setShowJealousyText] = useState(false);
  const [showThinkingText, setShowThinkingText] = useState(false);
  const [patienceMessage, setPatienceMessage] = useState("Take your time.");
  
  // Secret interactions
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [showSecretBloom, setShowSecretBloom] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  
  const patienceTimerRef = useRef(null);
  const thinkingTimerRef = useRef(null);
  const lastTapRef = useRef(0);
  const longPressTimerRef = useRef(null);

  // Double tap secret - blooms extra petals
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setDoubleTapCount(prev => prev + 1);
      if (doubleTapCount >= 2) {
        setShowSecretBloom(true);
        setTimeout(() => setShowSecretBloom(false), 3000);
      }
    }
    lastTapRef.current = now;
  };

  // Long press on final text reveals whisper
  const handleLongPressStart = () => {
    if (showFinalText) {
      longPressTimerRef.current = setTimeout(() => {
        setLongPressActive(true);
        setShowWhisper(true);
      }, 1500);
    }
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimerRef.current);
    if (longPressActive) {
      setTimeout(() => setShowWhisper(false), 2000);
      setLongPressActive(false);
    }
  };

  // Track which roses have been hovered
  useEffect(() => {
    if (hoveredRose && !selectedRose) {
      setHoveredRoses(prev => new Set([...prev, hoveredRose]));
    }
  }, [hoveredRose, selectedRose]);

  // Check if all roses have been hovered - show jealousy message
  useEffect(() => {
    if (hoveredRoses.size === 3 && !selectedRose && !showJealousyText) {
      setTimeout(() => setShowJealousyText(true), 500);
    }
  }, [hoveredRoses, selectedRose, showJealousyText]);

  // Patience reward - show text after 4-5 seconds of no interaction
  useEffect(() => {
    const startPatienceTimer = () => {
      clearTimeout(patienceTimerRef.current);
      clearTimeout(thinkingTimerRef.current);
      
      patienceTimerRef.current = setTimeout(() => {
        if (!selectedRose) {
          setShowPatienceText(true);
          setPatienceMessage("Take your time.");
        }
      }, 4500);

      // Show "thinking about it" message if user is clearly deliberating
      thinkingTimerRef.current = setTimeout(() => {
        if (!selectedRose && hoveredRoses.size > 0) {
          setShowThinkingText(true);
        }
      }, 7000);
    };

    const handleInteraction = () => {
      setShowPatienceText(false);
      setShowThinkingText(false);
      startPatienceTimer();
    };

    if (!selectedRose) {
      startPatienceTimer();
      window.addEventListener('mousemove', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);
    }

    return () => {
      clearTimeout(patienceTimerRef.current);
      clearTimeout(thinkingTimerRef.current);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [selectedRose, hoveredRoses]);

  const handleRoseHover = (roseId) => {
    if (!selectedRose) {
      setHoveredRose(roseId);
    }
  };

  const handleRoseLeave = () => {
    if (!selectedRose) {
      setHoveredRose(null);
    }
  };

  const handleRoseSelect = (roseId) => {
    if (selectedRose) return;

    setSelectedRose(roseId);
    setShowPatienceText(false);

    // Generate petals with random delays
    const newPetals = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: 300 + Math.random() * 800,
      direction: (Math.random() - 0.5) * 100
    }));
    
    setTimeout(() => {
      setPetals(newPetals);
    }, 500);

    // Show final text after animation completes
    setTimeout(() => {
      setShowFinalText(true);
    }, 2200);
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-soft overflow-hidden"
      onClick={handleDoubleTap}
    >
      {/* Secret Bloom Effect */}
      {showSecretBloom && (
        <div className="secret-bloom-container">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="secret-petal"
              style={{
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 100}ms`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      {/* Decorative floating roses in background */}
      <div className="fixed top-10 left-10 w-24 h-24 bg-center bg-no-repeat bg-cover rounded-full opacity-20 blur-sm animate-float-slow" 
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=200&fit=crop")` }} />
      <div className="fixed top-20 right-20 w-32 h-32 bg-center bg-no-repeat bg-cover rounded-full opacity-15 blur-sm animate-float-delayed" 
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=200&h=200&fit=crop")` }} />
      <div className="fixed bottom-32 left-20 w-28 h-28 bg-center bg-no-repeat bg-cover rounded-full opacity-20 blur-sm animate-float-medium" 
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop")` }} />
      <div className="fixed bottom-20 right-16 w-20 h-20 bg-center bg-no-repeat bg-cover rounded-full opacity-25 blur-sm animate-float-slow" 
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1502307664042-a3e362e67b9f?w=200&h=200&fit=crop")` }} />

      {/* Happy Rose Day Header */}
      <div className={`absolute top-16 left-0 right-0 text-center z-20 transition-opacity duration-1000 ${
        showFinalText ? 'opacity-0' : 'opacity-100'
      }`}>
        <h2 className="text-5xl md:text-6xl font-light text-warm-charcoal dark:text-white/90 italic tracking-wide mb-2">
          Happy Rose Day
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-dusty-pink to-transparent"></div>
          <span className="material-symbols-outlined text-primary text-2xl animate-pulse-gentle">favorite</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-dusty-pink to-transparent"></div>
        </div>
      </div>

      {/* Roses Container */}
      <div className="layout-container flex flex-col items-center justify-center w-full max-w-[1200px] px-10 z-10">
        <div className={`flex flex-row items-end justify-center gap-12 mb-16 transition-all duration-1000 ${
          selectedRose ? 'roses-separating' : ''
        }`}>
          {roses.map((rose, index) => (
            <div
              key={rose.id}
              className={`flex flex-col items-center group cursor-pointer rose-container ${
                rose.isCenter ? '-translate-y-8' : ''
              } ${hoveredRose === rose.id ? 'rose-hovered' : ''} ${
                selectedRose === rose.id ? 'rose-selected' : ''
              } ${selectedRose && selectedRose !== rose.id ? 'rose-unselected' : ''}`}
              onMouseEnter={() => handleRoseHover(rose.id)}
              onMouseLeave={handleRoseLeave}
              onClick={() => handleRoseSelect(rose.id)}
              data-rose-color={rose.color}
            >
              <div
                className={`${rose.size} bg-center bg-no-repeat bg-cover rounded-full shadow-2xl transition-all duration-700 ${
                  rose.isCenter ? 'border-4 border-white/20' : ''
                }`}
                style={{ backgroundImage: `url("${rose.image}")` }}
                data-alt={rose.alt}
              />
              <div className={`${rose.stem} w-px bg-warm-charcoal/10 mt-4 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Text Zone */}
        <div 
          className={`layout-content-container flex flex-col max-w-[800px] text-center transition-opacity duration-1000 ${
            showFinalText ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
        >
          <h1 className="text-warm-charcoal dark:text-white/90 tracking-tight text-[42px] font-light leading-relaxed italic px-4 pb-3">
            "Didn't matter which one you chose.<br />I was always choosing you."
          </h1>
          <div className="mt-8 opacity-40">
            <span className="material-symbols-outlined text-warm-charcoal dark:text-white text-sm">favorite</span>
          </div>
          
          {/* Whisper - revealed on long press */}
          <div className={`whisper-text ${showWhisper ? 'visible' : ''}`}>
            <p>...and I'd choose you in every lifetime.</p>
          </div>
        </div>
      </div>

      {/* Patience Reward Text */}
      <div className={`fixed bottom-20 left-0 right-0 text-center transition-opacity duration-1000 z-20 ${
        showPatienceText ? 'opacity-60' : 'opacity-0'
      }`}>
        <p className="text-warm-charcoal dark:text-white/70 text-sm font-light italic">
          {patienceMessage}
        </p>
      </div>

      {/* Jealousy Text - when all roses have been hovered */}
      <div className={`fixed bottom-32 left-0 right-0 text-center transition-opacity duration-1000 z-20 ${
        showJealousyText && !selectedRose ? 'opacity-50' : 'opacity-0'
      }`}>
        <p className="text-warm-charcoal dark:text-white/70 text-sm font-light italic">
          Careful… they're all getting jealous. 😌
        </p>
      </div>

      {/* Thinking Text - when user deliberates */}
      <div className={`fixed bottom-20 left-0 right-0 text-center transition-opacity duration-1000 z-20 ${
        showThinkingText && !selectedRose && !showPatienceText ? 'opacity-50' : 'opacity-0'
      }`}>
        <p className="text-warm-charcoal dark:text-white/70 text-sm font-light italic">
          You're thinking about it. That's cute.
        </p>
      </div>

      {/* Petals */}
      <div className="petals-container">
        {petals.map(petal => (
          <Petal key={petal.id} delay={petal.delay} direction={petal.direction} />
        ))}
      </div>

      {/* Minimal Subtle Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA93sSl0mltqDloAWtA7FH4OzT4m2UD-wGtdbx5gJEmsIgOS-LIt5U50HZWjJNRfNw-V-edt47riPjglCuMRCZ9C__KGbdVBmLIKhWW0FVBRmebcIuPtlwfaQDhAePNKJ9IkfTvzRq8CiWMPnmpV5LtCQ7oggFEBtdkYrhxuMK9Gmk1d0rRgiRc19nHe7d8hVBHSIfbsnZx77QVznYcvyVOaAiuKdpjXj-88jqoCsIEE1PlR81M4O8tCSQYTNXGbPCBJwrPr3fOEg')"
        }}
      />
    </div>
  );
}

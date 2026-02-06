import { useNavigate, useLocation } from 'react-router-dom';
import './DayNavigation.css';

const days = [
  { path: '/nidhikaroseroseka', icon: '🌹', label: 'Rose' },
  { path: '/nidhikawillshesayyes', icon: '💍', label: 'Propose' },
  { path: '/nidhikachocolatelove', icon: '🍫', label: 'Chocolate' },
  { path: '/nidhikateddyhug', icon: '🧸', label: 'Teddy' },
  { path: '/nidhikapromiseforever', icon: '🤝', label: 'Promise' },
  { path: '/nidhikawarmhug', icon: '🤗', label: 'Hug' },
  { path: '/nidhikakiss', icon: '💋', label: 'Kiss' },
  { path: '/nidhikavalentine', icon: '❤️', label: 'Valentine' },
];

export default function DayNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentDayIndex = () => {
    return days.findIndex(d => d.path === location.pathname);
  };
  
  const currentIndex = getCurrentDayIndex();
  
  const goToDay = (index) => {
    if (index >= 0 && index < days.length) {
      navigate(days[index].path);
    }
  };
  
  return (
    <div className="day-navigation">
      <div className="day-dots">
        {days.map((day, index) => (
          <button
            key={day.path}
            className={`day-dot ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
            onClick={() => goToDay(index)}
            title={day.label}
          >
            <span className="dot-icon">{day.icon}</span>
          </button>
        ))}
      </div>
      
      <div className="nav-arrows">
        {currentIndex > 0 && (
          <button className="nav-arrow prev" onClick={() => goToDay(currentIndex - 1)}>
            ←
          </button>
        )}
        {currentIndex < days.length - 1 && currentIndex >= 0 && (
          <button className="nav-arrow next" onClick={() => goToDay(currentIndex + 1)}>
            →
          </button>
        )}
      </div>
    </div>
  );
}

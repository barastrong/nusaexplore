import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [activeLink, setActiveLink] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavigation = (page, link) => {
    setActiveLink(link);
    navigate(page);
  };

  return (
    <nav>
      <div className="nav-logo" onClick={() => handleNavigation('/', 'home')}>
        Nusa<span>Explore</span>
      </div>
      <div className="nav-links">
        <button className={`nav-btn ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleNavigation('/', 'home')}>Beranda</button>
        <button className={`nav-btn ${activeLink === 'map' ? 'active' : ''}`} onClick={() => handleNavigation('/map', 'map')}>Jelajah</button>
        <button className={`nav-btn ${activeLink === 'games' ? 'active' : ''}`} onClick={() => handleNavigation('/games', 'games')}>Games</button>
        <button className={`nav-btn ${activeLink === 'culture' ? 'active' : ''}`} onClick={() => handleNavigation('/', 'culture')}>Budaya</button>
        <button className="nav-btn primary" onClick={() => handleNavigation('/map', 'map')}>Mulai Jelajah</button>
        <button className="theme-toggle" onClick={toggleTheme} title="Ganti tema">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

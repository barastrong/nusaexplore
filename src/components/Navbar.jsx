import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Close menu when screen size changes to desktop
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    console.log('Menu toggled:', newState);
  };

  const handleNavigation = (page, link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
    navigate(page);
  };

  return (
    <nav>
      <div className="nav-logo" onClick={() => handleNavigation('/', 'home')}>
        Nusa<span>Explore</span>
      </div>
      
      {/* Hamburger Menu Button */}
      <button 
        className={`nav-hamburger ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu} 
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <button className={`nav-btn ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleNavigation('/', 'home')}>Beranda</button>
        <button className={`nav-btn ${activeLink === 'map' ? 'active' : ''}`} onClick={() => handleNavigation('/map', 'map')}>Jelajah</button>
        <button className={`nav-btn ${activeLink === 'games' ? 'active' : ''}`} onClick={() => handleNavigation('/games', 'games')}>Games</button>
        <button className="nav-btn primary" onClick={() => handleNavigation('/map', 'map')}>Mulai Jelajah</button>
        <button className="theme-toggle" onClick={toggleTheme} title="Ganti tema">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './header.css';
import mm from '../assets/mm1.jpeg'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-h">
        <div className="logo">
          <Link to="/">
            <img src={mm} alt="mm-hall" width={100}/>
          </Link>
        </div>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <div className="dropdown">
            <span>Events <i className="arrow-down"></i></span>
            <div className="dropdown-content">
              <Link to="/events/weddings" onClick={() => setIsOpen(false)}>Weddings</Link>
              <Link to="/events/parties" onClick={() => setIsOpen(false)}>Parties</Link>
              <Link to="/events/ceremonies" onClick={() => setIsOpen(false)}>Ceremonies</Link>
              <Link to="/events/corporate" onClick={() => setIsOpen(false)}>Corporate Events</Link>
            </div>
          </div>
          <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <FaPhone />
            <span>+91 94913 01258</span>
          </div>
          <div className="contact-item">
            <FaEnvelope />
            <span>info@mmfunctionhall.com</span>
          </div>
        </div>

        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
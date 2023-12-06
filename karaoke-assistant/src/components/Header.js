import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Karaoke Assistant
      </Link>
      <Link to="/browse" className="browse-link">
        Browse Songs
      </Link>
      <Link to="/about" className="about-link">
        About
      </Link>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Karoake Assistant
      </Link>
      <Link to="/about" className="about-link">
        About
      </Link>
    </header>
  );
};

export default Header;

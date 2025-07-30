import React from 'react';
import './Navbar.css'; // Add this line

const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li><a href="#welcome-section">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a id="profile-link" href="https://github.com/ThantShweYeeLin" target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
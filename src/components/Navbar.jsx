import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-brand">
          <a>
            <span>Mors Code</span>
          </a>
        </div>

  
        <div className="navbar-title">
          <p>
            Full Stack Developer / MERN Stack
          </p>
        </div>

      </div>
    </header>
  );
}
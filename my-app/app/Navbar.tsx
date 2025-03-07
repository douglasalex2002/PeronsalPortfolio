'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${
        showNavbar ? styles.slideDown : ''
      }`}
    >
      <div id='top-row'>
        <div className='top-row-left'>
          <a href="#top-row" className="left-buttons" id='AD-button'>AD</a>
          <a href="#AboutMe" className="left-buttons" id='hover-underline'>About Me</a>
          <a href="#Experience" className="left-buttons" id='hover-underline'>Experience</a>
          <a href="#Projects" className="left-buttons" id='hover-underline'>Projects</a>
        </div>
        <div>
          <a href="#ContactMe" className='topButtons' id="contact-me">Contact Me</a>
        </div>
      </div>
    </nav>
  );
}

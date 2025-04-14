"use client";

import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setShowNavbar(window.scrollY > 30);
      } else {
        setShowNavbar(false);
      }
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 920;
      setIsMobile(mobile);
      
      if (mobile) {
        setShowNavbar(false);
      } else {
        setShowNavbar(window.scrollY > 30);
      }
    };

    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(
        "alexdouglas.dev",
        "PersonalPortfolio",
        formRef.current,
        "pcVO_PO8CueMBf2Nj"
      )
      .then(() => {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setShowOverlay(false);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("There was an error sending your message. Please try again.");
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('alexdouglas.dev@gmail.com')
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Regular navbar for desktop */}
      <nav className={`${styles.navbar} ${showNavbar ? styles.slideDown : ""}`}>
        <div className="navbar-content">
          <div className="top-row-left">
            <a href="#" className="left-buttons" id="AD-button">
              AD
            </a>
            <a href="#AboutMe" className="left-buttons hover-expand-nav">
              About Me
            </a>
            <a href="#Experience" className="left-buttons hover-expand-nav">
              Experience
            </a>
            <a href="#Projects" className="left-buttons hover-expand-nav">
              Projects
            </a>
          </div>
          <div>
            <a
              href="#ContactMe"
              onClick={handleContactClick}
              className="topButtons"
              id="contact-me"
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      {/* Hamburger menu for mobile, directly on gray background */}
      {isMobile && (
        <div className={`${styles.mobileHamburger} ${showSidebar ? styles.hamburgerOpen : ''}`} onClick={handleHamburgerClick}>
          <div className={styles.hamburger}>
            <span className={showSidebar ? styles.hamburgerSpan1 : ''}></span>
            <span className={showSidebar ? styles.hamburgerSpan2 : ''}></span>
            <span className={showSidebar ? styles.hamburgerSpan3 : ''}></span>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <div className={`${styles.sidebar} ${showSidebar ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarContent}>
            <h2 className={styles.sidebarTitle}>Menu</h2>
            <div className={styles.sidebarLinks}>
              <a href="#" className={styles.sidebarLink} onClick={() => setShowSidebar(false)}>
                Home
              </a>
              <a href="#AboutMe" className={styles.sidebarLink} onClick={() => setShowSidebar(false)}>
                About Me
              </a>
              <a href="#Experience" className={styles.sidebarLink} onClick={() => setShowSidebar(false)}>
                Experience
              </a>
              <a href="#Projects" className={styles.sidebarLink} onClick={() => setShowSidebar(false)}>
                Projects
              </a>
              <a href="#ContactMe" onClick={(e) => {
                e.preventDefault(); 
                setShowOverlay(true); 
                setShowSidebar(false);
              }} className={styles.sidebarLink}>
                Contact Me
              </a>
            </div>
            
            <div className={styles.sidebarDivider}></div>
            
            <div className={styles.sidebarSocials}>
              <h3 className={styles.sidebarSocialsTitle}>Connect With Me</h3>
              <div className={styles.sidebarSocialLinks}>
                <a 
                  href="https://github.com/douglasalex2002" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.sidebarSocialLink}
                >
                  <svg className={styles.sidebarSocialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/douglasalex2002/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.sidebarSocialLink}
                >
                  <svg className={styles.sidebarSocialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="/Resume_Alex_Douglas.pdf" 
                  download 
                  className={styles.sidebarSocialLink}
                >
                  <svg className={styles.sidebarSocialIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for closing sidebar when clicking outside */}
      {showSidebar && (
        <div 
          className={styles.sidebarOverlay} 
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {showOverlay && (
        <div
          className="overlay"
          onClick={() => setShowOverlay(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="overlay-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#232323",
              color: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
            }}
          >
            <div className="contact-header">
              <h3>Want to reach out?</h3>
              <p className="contact-email">
                alexdouglas.dev@gmail.com
                <button 
                  className="copy-button" 
                  onClick={copyToClipboard} 
                  title="Copy to clipboard"
                >
                  {copySuccess ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                  )}
                </button>
              </p>
              <div className="contact-divider">
                <span className="divider-line"></span>
                <span className="divider-text">OR</span>
                <span className="divider-line"></span>
              </div>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label htmlFor="message" style={{ display: "block", marginBottom: "5px" }}>
                  Your Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px" }}
                ></textarea>
              </div>
              <button type="submit" className="send-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .send-button {
          display: block;
          width: 100%;
          padding: 10px;
          font-size: 18px;
          background-color: #8A5CF7;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .send-button:hover {
          background-color: #9c78fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(138, 92, 247, 0.4);
        }
      `}</style>
    </>
  );
}

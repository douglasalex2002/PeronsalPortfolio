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

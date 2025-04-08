"use client";

import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";

const Page: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [typewriterText, setTypewriterText] = useState<string>("");
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const typewriterTexts = ["Software Engineer", "Scuba Diver", "Traveling Enthusiast"];

  useEffect(() => {
    const typewriterTimeout = setTimeout(() => {
      const currentText = typewriterTexts[currentTextIndex];
      
      // Handle typing and deleting
      if (!isDeleting) {
        setTypewriterText(currentText.substring(0, typewriterText.length + 1));
        
        // If we've fully typed the text, start deleting after a delay
        if (typewriterText === currentText) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        setTypewriterText(currentText.substring(0, typewriterText.length - 1));
        
        // If we've fully deleted the text, move to the next phrase
        if (typewriterText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % typewriterTexts.length);
        }
      }
    }, isDeleting ? 50 : 150);
    
    return () => clearTimeout(typewriterTimeout);
  }, [typewriterText, currentTextIndex, isDeleting, typewriterTexts]);

  const handleContactClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
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

  return (
    <>
      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
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
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message:</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="send-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="colored-rectangle"></div>
      <div id="space"></div>

      <div id="top-row">
        <div className="top-row-left">
          <a href="#" className="left-buttons" id="AD-button">
            <span>AD</span>
          </a>
          <a href="#AboutMe" className="left-buttons hover-expand">
            About Me
          </a>
          <a href="#Experience" className="left-buttons hover-expand">
            Experience
          </a>
          <a href="#Projects" className="left-buttons hover-expand">
            Projects
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={handleContactClick}
            className="topButtons"
            id="contact-me"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div id="AboutMe">
        <div className="about-me-container">
          <div className="about-me-left">
            <img
              src="/pictures/headshot_circle.png"
              alt="Professional Headshot"
              width="450"
              height="450"
              className="about-me-items"
            />
            <p className="about-me-items" id="about-me-text">
              <span>Hello, I am a </span>
              
              <span className="typewriter-container">
                <span className="typewrite">
                  {typewriterText}
                  <span className="typing-cursor"></span>
                </span>
              </span>
            </p>
          </div>
          <div className="about-me-right">
            <div className="about-me-box">
              <h2>Hello World</h2>
            </div>
          </div>
        </div>
      </div>

      <div id="featuredWork">
        <h1 className="section-title" id="featured-work-title">Featured Work</h1>
        <div id="featured-work-projects">
          <div className="single-featured-work" id="left-single">
            <img src="/pictures/placeholder.png" alt="Place Holder" className="featured-images" />
            <h1 className="featured-title">Title One</h1>
            <p className="featured-text">Languages:</p>
            <p className="featured-text">Other Tools:</p>
          </div>
          <div className="single-featured-work" id="middle-single">
            <img src="/pictures/placeholder.png" alt="Place Holder" className="featured-images" />
            <h1 className="featured-title">Title Two</h1>
            <p className="featured-text">Languages:</p>
            <p className="featured-text">Other Tools:</p>
          </div>
          <div className="single-featured-work" id="right-single">
            <img src="/pictures/placeholder.png" alt="Place Holder" className="featured-images" />
            <h1 className="featured-title">Title Three</h1>
            <p className="featured-text">Languages:</p>
            <p className="featured-text">Other Tools:</p>
          </div>
        </div>
      </div>

      <div id="Experience">
        <div id="left-experience">
          <div id="experience-title">Experience</div>
        </div>
        <div id="right-experience">
          <div>
            <img src="/pictures/portfolio.png" alt="Portfolio Picture" className="portfolio-img" />
            <div className="job-text">
              <p className="job-role">Software Engineer Intern</p>
              <p className="company-name">RevSpring</p>
              <p className="job-dates">Jun 2025 - Aug 2025</p>
              <div className="job-bullets">
                <p>- Lorem ipsum odor amet, consectetuer adipiscing elit...</p>
                <p>- Lorem ipsum odor amet, consectetuer adipiscing elit...</p>
                <p>- Lorem ipsum odor amet, consectetuer adipiscing elit...</p>
              </div>
            </div>
          </div>
          <div>
            <img src="/pictures/portfolio.png" alt="Portfolio Picture" className="portfolio-img" />
            <div className="job-text">
              <p className="job-role">Job Site Manager</p>
              <p className="company-name">WaterFront Restoration</p>
              <p className="job-dates">Jun 2022 - Aug 2024 (Seasonal)</p>
              <div className="job-bullets">
                <p>- Led and collaborated with a team of 5 to successfully complete projects...</p>
                <p>- Balanced quality workmanship with time efficiency...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="Projects">
        <h1 className="section-title">Projects</h1>
        <div className="projects-grid-container">
          <div>
            <img src="/pictures/placeholder.png" alt="Place Holder" className="proj-pic" />
            <p>Project One</p>
          </div>
          <div>
            <img src="/pictures/placeholder.png" alt="Place Holder" className="proj-pic" />
            <p>Project Two</p>
          </div>
          <div>
            <img src="/pictures/placeholder.png" alt="Place Holder" className="proj-pic" />
            <p>Project Three</p>
          </div>
          <div>
            <img src="/pictures/placeholder.png" alt="Place Holder" className="proj-pic" />
            <p>Project Four</p>
          </div>
          <div>
            <img src="/pictures/placeholder.png" alt="Place Holder" className="proj-pic" />
            <p>Project Five</p>
          </div>
          <div>
            <img src="/pictures/placeholder.png" alt="Place Holder" className="proj-pic" />
            <p>Project Six</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

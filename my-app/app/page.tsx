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
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const typewriterTexts = ["Software Engineer.", "Scuba Diver.", "Traveling Enthusiast."];

  useEffect(() => {
    const typewriterTimeout = setTimeout(() => {
      const currentText = typewriterTexts[currentTextIndex];

      if (!isDeleting) {
        setTypewriterText(currentText.substring(0, typewriterText.length + 1));

        if (typewriterText === currentText) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      } else {
        setTypewriterText(currentText.substring(0, typewriterText.length - 1));

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
        process.env.EMAILJS_API_KEY
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

  const toggleImage = () => {
    setIsFlipped(!isFlipped);
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
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
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
            <div className={`headshot-wrapper ${isFlipped ? 'flipped' : ''}`} onClick={toggleImage}>
              <div className="headshot-inner">
                <div className="headshot-front">
                  <img
                    src="/pictures/headshot_circle.png"
                    alt="Professional Headshot"
                    width="450"
                    height="450"
                    className="about-me-items"
                  />
                </div>
                <div className="headshot-back">
                  <img
                    src="/pictures/color-picture.png"
                    alt="Color Picture"
                    width="450"
                    height="450"
                    className="about-me-items"
                  />
                </div>
              </div>
            </div>
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
              <div className="about-header">
                <div className="about-info">
                  <h2>Alex Douglas</h2>
                  <h3>Glen Allen, VA</h3>
                </div>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/douglasalex2002/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="social-text">LinkedIn</span>
                  </a>
                  <a href="https://github.com/douglasalex2002" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="social-text">GitHub</span>
                  </a>
                  <a href="/Resume_Alex_Douglas.pdf" download className="social-link resume-link">
                    <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                    <span className="resume-text">Resume</span>
                  </a>
                </div>
              </div>
              <div className="about-me-divider"></div>
              <p>
                I'm currently studying Computer Science at James Madison University and will be graduating in May 2026. I started out focusing on full-stack web development, and lately, I've been shifting my focus toward backend development. When I'm not coding, you'll usually find me exploring new places—I've been fortunate enough to travel to fascinating spots like Egypt, Peru, and Turkey—or staying active by lifting weights, playing volleyball, and reading a good book. My goal in the coming years is to work for a company where I get to do what I truly enjoy: software engineering.
              </p>
              <div className="tech-stack">
                <h4>Tech Stack</h4>
                <div className="tech-items">
                  <span className="tech-item">
                    <svg className="tech-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07l-.02-.16-.03-.24-.05-.32-.08-.36-.1-.4-.13-.43-.15-.43-.17-.43-.19-.42-.2-.4-.2-.37-.2-.34-.19-.31-.17-.27-.14-.24-.11-.19-.07-.15-.04-.1L21.04 1zm-14.5 13.95h-.16l-.24.02-.32.04-.36.1-.4.16-.42.24-.42.33-.4.45-.36.57-.32.71-.24.86-.16 1.04-.06 1.23.05 1.23.14 1.04.21.88.28.73.32.59.35.47.36.35.36.27.35.18.32.12.28.06.21.03h6.08v-3.06l-.02-.21-.04-.27-.07-.32-.1-.35-.15-.37-.2-.36-.27-.35-.33-.32-.41-.27-.5-.22-.59-.14-.69-.05h-3.75v-7.19z" fill="#3572A5" />
                    </svg>
                    Python
                  </span>
                  <span className="tech-item">
                    <svg className="tech-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.93-953.534-3.798-18.2 2.03-7.823 2.904M9.292 13.21s-6.522 1.551-2.313 2.116c1.781.241 5.328.187 8.627-.095 2.7-.229 5.408-.716 5.408-.716s-.953.408-1.64.88c-6.619 1.74-19.39.927-15.737-.864 3.072-1.505 5.655-1.322 5.655-1.322M17.127 17.206c6.727-3.498 3.615-6.862 1.446-6.413-.527.11-.764.206-.764.206s.196-.307.571-.44c4.273-1.501 7.558 4.461-1.387 6.832 0-.001.104-.094.134-.185M14.401 0s3.729 3.729-3.535 9.47c-5.806 4.604-1.324 7.24 0 10.238-3.388-3.059-5.878-5.751-4.203-8.25 2.46-3.666 9.276-5.44 7.738-11.458M10.198 29.676c6.463.413 16.392-.23 16.619-3.294 0 0-.452 1.16-5.342 2.084-5.516 1.037-12.316.916-16.359.252 0 0 .827.683 5.082.958" fill="#EA2D2E" />
                    </svg>
                    Java
                  </span>
                  <span className="tech-item">
                    <img src="/pictures/javascript-svgrepo-com.svg" alt="JavaScript" className="tech-icon" />
                    JavaScript
                  </span>
                  <span className="tech-item">
                    <svg className="tech-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" fill="#61DAFB" />
                    </svg>
                    React.js
                  </span>
                  <span className="tech-item">
                    <img src="/pictures/next-dot-js-svgrepo-com.svg" alt="Next.js" className="tech-icon" />
                    Next.js
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="Experience">
        <div id="left-experience">
          <div id="experience-title">Experience</div>
        </div>
        <div id="right-experience">
          <div className="timeline-label start">2025</div>
          <div className="timeline"></div>
          <div className="timeline-label end">2022</div>
          <div className="job-entry">
            <img src="/pictures/portfolio.png" alt="Portfolio Picture" className="portfolio-img" />
            <div className="job-text">
              <p className="job-role">Incoming Software Engineer Intern</p>
              <p className="company-name">
                <a href="https://revspringinc.com/" target="_blank" rel="noopener noreferrer">
                  RevSpring
                </a>
              </p>
              <p className="job-dates">Jun 2025 - Aug 2025</p>
              <div className="job-bullets">
                <p>- N/A (Coming Soon)</p>
                <p>- N/A (Coming Soon)</p>
                <p>- N/A (Coming Soon)</p>
              </div>
            </div>
          </div>
          <div className="job-entry">
            <img src="/pictures/portfolio.png" alt="Portfolio Picture" className="portfolio-img" />
            <div className="job-text">
              <p className="job-role">Job Site Manager</p>
              <p className="company-name">
                <a href="https://www.waterfrontrestoration.com/" target="_blank" rel="noopener noreferrer">
                  WaterFront Restoration
                </a>
              </p>
              <p className="job-dates">Jun 2022 - Aug 2024 (Seasonal)</p>
              <div className="job-bullets">
                <p>- Led and collaborated with a team of 5 to successfully complete projects...</p>
                <p>- Balanced quality workmanship with time efficiency...</p>
              </div>
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
            <p className="featured-text">Tech:</p>
            <div className="card-overlay">
              <p className="card-description">
                Under Construction!
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
          <div className="single-featured-work" id="middle-single">
            <img src="/pictures/placeholder.png" alt="Place Holder" className="featured-images" />
            <h1 className="featured-title">Title Two</h1>
            <p className="featured-text">Tech:</p>
            <div className="card-overlay">
              <p className="card-description">
                Under Construction!
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
          <div className="single-featured-work" id="right-single">
            <img src="/pictures/placeholder.png" alt="Place Holder" className="featured-images" />
            <h1 className="featured-title">Title Three</h1>
            <p className="featured-text">Tech:</p>
            <div className="card-overlay">
              <p className="card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
        <div className="more-projects-link">
          <a href="#Projects">Want to check out more of my projects? <span className="arrow-icon">→</span></a>
        </div>
      </div>

      <div id="newSection" className="gray-section">
        <h1 className="section-title">Placeholder</h1>
        <div className="section-content">
          <p>New section content will go here</p>
        </div>
      </div>

      <div id="Projects">
        <h1 className="section-title">More Projects</h1>
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

      <footer className="footer">
        <p>
          Developed with <span className="heart">❤️</span> by <a href="#AboutMe" className="footer-link">Alex Douglas</a>
        </p>
      </footer>
    </>
  );
};

export default Page;

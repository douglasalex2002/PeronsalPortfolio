"use client"

import React, { useState } from 'react'

const Page: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  return (
    <>
     {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="overlay-content">
            Hello world
          </div>
        </div>
      )}
      <div className='colored-rectangle'></div>
      <div id='space'></div>
      <div id='top-row'>
        <div className='top-row-left'>
          <a href="#" className="left-buttons" id='AD-button'>
            <span>AD</span>
          </a>
          <a href="#AboutMe" className="left-buttons" id='hover-underline'>About Me</a>
          <a href="#Experience" className="left-buttons" id='hover-underline'>Experience</a>
          <a href="#Projects" className="left-buttons" id='hover-underline'>Projects</a>
        </div>
        <div>
        <a href="#" onClick={handleContactClick} className='topButtons' id="contact-me">Contact Me</a>
        </div>
      </div>
      <div id='AboutMe'>
        <img src="/pictures/headshot_circle.png" alt="Professional Headshot" width="450" height="450" className="about-me-items" />
        <p className="about-me-items" id="about-me-text">Hello, I am <span id="my-name">Alex Douglas</span>. Lorem ipsum odor amet, consectetuer adipiscing elit. Facilisis ante nibh sit urna porttitor ornare tristique enim. Tempor dictum nibh volutpat enim eget aliquet maecenas.</p>
      </div>
      <div id="featuredWork">
        <h1 className="section-title" id="featured-work-title">Featured Work</h1>
        <div id="featured-work-projects">
          <div className='single-featured-work' id="left-single">
            <img src='/pictures/placeholder.png' alt="Place Holder" className='featured-images'></img>
            <h1 className='featured-title'>Title One</h1>
            <p className="featured-text">Languages:</p>
            <p className="featured-text">Other Tools:</p>
          </div>
          <div className='single-featured-work' id="middle-single">
            <img src='/pictures/placeholder.png' alt="Place Holder" className='featured-images'></img>
            <h1 className='featured-title'>Title Two</h1>
            <p className="featured-text">Languages:</p>
            <p className="featured-text">Other Tools:</p>
          </div>
          <div className='single-featured-work' id="right-single">
            <img src='/pictures/placeholder.png' alt="Place Holder" className='featured-images'></img>
            <h1 className='featured-title'>Title Three</h1>
            <p className="featured-text">Languages:</p>
            <p className="featured-text">Other Tools:</p>
          </div>
        </div>
      </div>
      <div id='Experience'>
        <div id="left-experience">
          <div id='experience-title'>
            Experience
          </div>
        </div>
        <div id="right-experience">
          <div>
            <img src='/pictures/portfolio.png' alt="Portfolio Picture" className='portfolio-img'></img>
            <div className='job-text'>
              <p className='job-role'>Software Engineer Intern</p>
              <p className='company-name'>RevSpring</p>
              <p className='job-dates'>Jun 2025 - Aug 2025</p>
              <div className='job-bullets'>
                <p>- Lorem ipsum odor amet, consectetuer adipiscing elit. Accumsan suspendisse duis non torquent blandit inceptos potenti pharetra. Lacus natoque condimentum; finibus interdum ipsum mollis.</p>
                <p>- Lorem ipsum odor amet, consectetuer adipiscing elit. Accumsan suspendisse duis non torquent blandit inceptos potenti pharetra. Lacus natoque condimentum; finibus interdum ipsum mollis.</p>
                <p>- Lorem ipsum odor amet, consectetuer adipiscing elit. Accumsan suspendisse duis non torquent blandit inceptos potenti pharetra. Lacus natoque condimentum; finibus interdum ipsum mollis.</p>
              </div>
            </div>
          </div>
          <div>
            <img src='/pictures/portfolio.png' alt="Portfolio Picture" className='portfolio-img'></img>
            <div className='job-text'>
              <p className='job-role'>Job Site Manager</p>
              <p className='company-name'>WaterFront Restoration</p>
              <p className='job-dates'>Jun 2022 - Aug 2024 (Seasonal)</p>
              <div className='job-bullets'>
                <p>- Led and collaborated with a team of 5 to successfully complete projects on time and within budget, ensuring smooth workflow and task delegation.</p>
                <p>- Balanced quality workmanship with time efficiency, optimizing processes to meet project deadlines without compromising standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='Projects'>
        <h1 className="section-title">
          Projects
        </h1>
        <div className='projects-grid-container'>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project One</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Two</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Three</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Four</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Five</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Six</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Seven</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Eight</p>
          </div>
          <div>
            <img src='/pictures/placeholder.png' alt="Place Holder" className="proj-pic"></img>
            <p>Project Nine</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
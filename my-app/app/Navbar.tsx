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

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open overlay on "Contact Me" click
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  // EmailJS form submission handler
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

  return (
    <>
      <nav className={`${styles.navbar} ${showNavbar ? styles.slideDown : ""}`}>
        <div id="top-row">
          <div className="top-row-left">
            <a href="#" className="left-buttons" id="AD-button">
              AD
            </a>
            <a href="#AboutMe" className="left-buttons" id="hover-underline">
              About Me
            </a>
            <a href="#Experience" className="left-buttons" id="hover-underline">
              Experience
            </a>
            <a href="#Projects" className="left-buttons" id="hover-underline">
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
          background-color: #663399;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }
        .send-button:hover {
          background-color: #5a2e85;
        }
      `}</style>
    </>
  );
}

import React from "react";
import "../styles/Footer.css";

const Footer = () => (
  <div className="footer-section">
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <span role="img" aria-label="brain" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}></span>
          <h2 style={{ margin: "0.5rem 0" }}>MindCare</h2>
          <p>Promoting mental health and wellbeing through evidence-based breathing techniques.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/exercises">Exercises</a>
          <a href="/tracker">Progress Tracker</a>
          <a href="/resources">Resources</a>
          <a href="/feedback">Feedback</a>
        </div>
        <div className="footer-ods">
          <h2>ODS 3: Health & Wellbeing</h2>
          <p>This project contributes to UN Sustainable Development Goal 3</p>
        </div>
      </div>
      <div className="footer-bottom">
         2025 MindCare. All rights reserved.<br />
        <a href="/privacy" style={{ color: "#60a5fa" }}>Privacy Policy</a>
      </div>
    </footer>
  </div>
);

export default Footer;

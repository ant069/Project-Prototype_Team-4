import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🧠 MindCare</h3>
          <p>Promoting mental health and wellbeing through evidence-based breathing techniques.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/exercises">Exercises</Link></li>
            <li><Link to="/tracker">Progress Tracker</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>ODS 3: Health & Wellbeing</h3>
          <p>This project contributes to UN Sustainable Development Goal 3</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"></a>
            <a href="#" aria-label="Twitter"></a>
            <a href="#" aria-label="Instagram"></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 MindCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
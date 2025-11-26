import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <div className="landing-navbar-container">
          <div className="landing-brand">
            <span className="brand-icon"></span>
            <span className="brand-text">MindCare</span>
          </div>
          <div className="landing-nav-links">
            <Link to="/login" className="nav-link">Sign In</Link>
            <Link to="/register" className="nav-link-button">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">MindCare</h1>
          <p className="hero-subtitle">Find calm, one breath at a time</p>
          <Link to="/register" className="btn-start-now">Start Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;

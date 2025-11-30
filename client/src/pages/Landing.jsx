import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Landing.css";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">MindCare</h1>
          <p className="hero-subtitle">
            Promoting mental health and wellbeing through evidence-based breathing techniques.
          </p>
          {user ? (
            <Link to="/home" className="cta-button primary">
              Go to Dashboard
            </Link>
          ) : (
            <div className="cta-buttons">
              <Link to="/login" className="cta-button secondary">
                Sign In
              </Link>
              <Link to="/register" className="cta-button primary">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;

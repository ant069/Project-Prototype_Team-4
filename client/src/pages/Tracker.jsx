import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Tracker.css';

const Tracker = () => {
  return (
    <>
      <div className="tracker-page">
        <div className="tracker-container">
          <div className="tracker-hero">
            <div className="tracker-hero-content">
              <div className="tracker-hero-icon"></div>
              <h1 className="tracker-hero-title">Your Wellness Journey</h1>
              <p className="tracker-hero-subtitle">Track your progress and celebrate every mindful moment</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon"></div>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">0</div>
                <div className="stat-label">Total Sessions</div>
                <span className="stat-trend"> Start Today</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon"></div>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">0 min</div>
                <div className="stat-label">Time Practiced</div>
                <span className="stat-trend"> Build Habits</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon"></div>
              </div>
              <div className="stat-card-body">
                <div className="stat-value">0 days</div>
                <div className="stat-label">Current Streak</div>
                <span className="stat-trend"> Keep Going</span>
              </div>
            </div>
          </div>

          <div className="why-section">
            <div className="why-content">
              <div className="why-header">
                <span className="why-icon"></span>
                <h2 className="why-title">Why MindCare?</h2>
                <p className="why-subtitle">
                  We help you build daily habits that reduce stress, improve focus, and restore balance. 
                  No pressurejust breathe, one moment at a time.
                </p>
              </div>
              
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon"></div>
                  </div>
                  <h3 className="feature-title">Reduce Stress</h3>
                  <p className="feature-description">
                    Evidence-based breathing techniques scientifically proven to calm your nervous 
                    system and lower cortisol levels naturally.
                  </p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon"></div>
                  </div>
                  <h3 className="feature-title">Track Progress</h3>
                  <p className="feature-description">
                    Monitor your wellness journey with detailed insights. Celebrate milestones and 
                    watch your improvements grow over time.
                  </p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon"></div>
                  </div>
                  <h3 className="feature-title">Expert Resources</h3>
                  <p className="feature-description">
                    Access curated content from licensed mental health professionals and trusted 
                    organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-banner">
            <div className="cta-content">
              <div className="cta-icon"></div>
              <h2 className="cta-title">Ready to Start Your Journey?</h2>
              <p className="cta-subtitle">
                Join thousands who've found calm through mindful breathing
              </p>
              <Link to="/exercises" className="btn-cta">
                Begin Practice Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracker;

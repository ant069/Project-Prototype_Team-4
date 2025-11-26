import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      to: '/exercises',
      icon: '',
      title: 'Practice',
      description: 'Start a breathing exercise and find your calm',
      badge: 'Start Now'
    },
    {
      to: '/tracker',
      icon: '',
      title: 'Track',
      description: 'View your progress and celebrate your journey',
      badge: 'View Stats'
    },
    {
      to: '/resources',
      icon: '',
      title: 'Learn',
      description: 'Explore curated mental health resources',
      badge: 'Explore'
    },
    {
      to: '/feedback',
      icon: '',
      title: 'Feedback',
      description: 'Share your thoughts and help us improve',
      badge: 'Share'
    }
  ];

  return (
    <>
      <div className="home-page">
        <section className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome back, {user?.name}!</h1>
            <p className="welcome-subtitle">Take a moment to breathe and find your calm</p>
            <Link to="/exercises" className="btn-start-exercise">
              Start Breathing Exercise
            </Link>
          </div>
        </section>

        <section className="progress-section">
          <h2 className="progress-title">Your Progress</h2>
          <div className="progress-grid">
            <div className="progress-card">
              <div className="progress-icon"></div>
              <div className="progress-number">0</div>
              <div className="progress-label">Total Sessions</div>
            </div>
            <div className="progress-card">
              <div className="progress-icon"></div>
              <div className="progress-number">0</div>
              <div className="progress-label">Minutes Practiced</div>
            </div>
            <div className="progress-card">
              <div className="progress-icon"></div>
              <div className="progress-number">0</div>
              <div className="progress-label">Week Streak</div>
            </div>
          </div>
        </section>

        <section className="sessions-section">
          <div className="sessions-header">
            <h2 className="sessions-title">Recent Sessions</h2>
            <Link to="/tracker" className="view-all-link">View All </Link>
          </div>
          <div className="empty-state">
            <p>No sessions yet. Start your first breathing exercise!</p>
            <Link to="/exercises" className="get-started-link">Get Started</Link>
          </div>
        </section>

        <section className="quick-actions-section">
          <h2 className="quick-actions-title">Quick Actions</h2>
          <div className="actions-list">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.to} className="action-link">
                <div className="action-item">
                  <div className="action-icon-wrapper">
                    <span className="action-icon">{action.icon}</span>
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">{action.title}</h3>
                    <p className="action-description">{action.description}</p>
                    <span className="action-badge">{action.badge}</span>
                  </div>
                  <div className="action-arrow"></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
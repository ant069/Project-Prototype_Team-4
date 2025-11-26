import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/ExerciseDetail.css';

const GuidedMeditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5);

  const durations = [5, 10, 15, 20];

  const startMeditation = () => {
    setIsPlaying(true);
  };

  const stopMeditation = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div className="exercise-detail-page">
        <div className="exercise-container">
          <div className="exercise-header">
            <Link to="/exercises" className="back-link"> Back to Exercises</Link>
            <h1 className="exercise-title">Guided Meditation</h1>
            <p className="exercise-description">
              Let a soothing voice guide you through mindfulness meditation. 
              Perfect for beginners and experienced meditators alike.
            </p>
          </div>

          <div className="meditation-container">
            <div className="meditation-visual">
              <div className={`meditation-circle ${isPlaying ? 'playing' : ''}`}>
                {isPlaying ? '' : ''}
              </div>
              {isPlaying && (
                <div className="playing-text">
                  Meditation in Progress...
                  <div className="duration-display">{duration} minutes</div>
                </div>
              )}
            </div>

            {!isPlaying && (
              <div className="duration-selector">
                <h3>Select Duration</h3>
                <div className="duration-buttons">
                  {durations.map(d => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`duration-btn ${duration === d ? 'active' : ''}`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="controls">
            {!isPlaying ? (
              <button onClick={startMeditation} className="btn-start">
                Start Meditation
              </button>
            ) : (
              <button onClick={stopMeditation} className="btn-stop">
                Stop Meditation
              </button>
            )}
          </div>

          <div className="exercise-benefits">
            <h2 className="benefits-title">Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Inner Peace</h3>
                <p>Cultivates calm and emotional balance</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Mental Clarity</h3>
                <p>Improves focus and decision-making</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Self-Compassion</h3>
                <p>Develops kindness toward yourself</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GuidedMeditation;
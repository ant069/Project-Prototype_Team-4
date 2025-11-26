import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/ExerciseDetail.css';

const BreathingExercise = () => {
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
        
        const totalTime = seconds % 16;
        if (totalTime < 4) setPhase('inhale');
        else if (totalTime < 8) setPhase('hold');
        else if (totalTime < 12) setPhase('exhale');
        else setPhase('hold');
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startExercise = () => {
    setIsActive(true);
    setSeconds(0);
    setPhase('inhale');
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase('ready');
    setSeconds(0);
  };

  const getPhaseText = () => {
    switch(phase) {
      case 'inhale': return 'Breathe In... ';
      case 'hold': return 'Hold... ';
      case 'exhale': return 'Breathe Out... ';
      default: return 'Ready to Begin? ';
    }
  };

  const getPhaseColor = () => {
    switch(phase) {
      case 'inhale': return '#4A90E2';
      case 'hold': return '#F4D35E';
      case 'exhale': return '#5EC9A7';
      default: return '#A8B5D1';
    }
  };

  return (
    <>
      <div className="exercise-detail-page">
        <div className="exercise-container">
          <div className="exercise-header">
            <Link to="/exercises" className="back-link"> Back to Exercises</Link>
            <h1 className="exercise-title">Box Breathing</h1>
            <p className="exercise-description">
              A powerful technique used by Navy SEALs to stay calm under pressure. 
              Breathe in for 4 seconds, hold for 4, exhale for 4, hold for 4.
            </p>
          </div>

          <div className="breathing-circle-container">
            <div 
              className={`breathing-circle ${phase}`}
              style={{ borderColor: getPhaseColor() }}
            >
              <div className="phase-text">{getPhaseText()}</div>
              {isActive && (
                <div className="timer-text">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</div>
              )}
            </div>
          </div>

          <div className="controls">
            {!isActive ? (
              <button onClick={startExercise} className="btn-start">
                Start Exercise
              </button>
            ) : (
              <button onClick={stopExercise} className="btn-stop">
                Stop Exercise
              </button>
            )}
          </div>

          <div className="exercise-benefits">
            <h2 className="benefits-title">Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Reduces Anxiety</h3>
                <p>Calms the nervous system and reduces stress hormones</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Improves Focus</h3>
                <p>Enhances concentration and mental clarity</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Lowers Heart Rate</h3>
                <p>Promotes relaxation and better sleep</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BreathingExercise;

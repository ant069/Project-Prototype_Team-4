import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/ExerciseDetail.css';

const BodyScan = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { part: 'Feet & Toes', instruction: 'Notice any tension in your feet and toes. Let them relax.', duration: 30 },
    { part: 'Legs', instruction: 'Feel the weight of your legs. Release any tightness.', duration: 30 },
    { part: 'Core', instruction: 'Breathe into your abdomen. Feel it rise and fall.', duration: 30 },
    { part: 'Chest & Back', instruction: 'Notice your heartbeat. Allow your chest to soften.', duration: 30 },
    { part: 'Arms & Hands', instruction: 'Let your arms rest heavily. Release tension in your hands.', duration: 30 },
    { part: 'Neck & Shoulders', instruction: 'Drop your shoulders. Release jaw tension.', duration: 30 },
    { part: 'Head & Face', instruction: 'Soften your forehead, eyes, and jaw. Feel completely relaxed.', duration: 30 }
  ];

  const startScan = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const stopScan = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      stopScan();
    }
  };

  return (
    <>
      <div className="exercise-detail-page">
        <div className="exercise-container">
          <div className="exercise-header">
            <Link to="/exercises" className="back-link"> Back to Exercises</Link>
            <h1 className="exercise-title">Body Scan Meditation</h1>
            <p className="exercise-description">
              Progressive relaxation technique that helps release physical tension and 
              connect with your body, one part at a time.
            </p>
          </div>

          <div className="body-scan-container">
            {!isActive ? (
              <div className="scan-preview">
                <div className="scan-icon"></div>
                <h2>7-Minute Full Body Scan</h2>
                <p>Find a comfortable position and let's begin</p>
              </div>
            ) : (
              <div className="scan-active">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="current-part">{steps[currentStep].part}</div>
                <div className="current-instruction">{steps[currentStep].instruction}</div>
                <div className="step-counter">Step {currentStep + 1} of {steps.length}</div>
              </div>
            )}
          </div>

          <div className="controls">
            {!isActive ? (
              <button onClick={startScan} className="btn-start">
                Begin Body Scan
              </button>
            ) : (
              <>
                <button onClick={nextStep} className="btn-next">
                  {currentStep < steps.length - 1 ? 'Next Area ' : 'Complete'}
                </button>
                <button onClick={stopScan} className="btn-stop">
                  Stop
                </button>
              </>
            )}
          </div>

          <div className="exercise-benefits">
            <h2 className="benefits-title">Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Better Sleep</h3>
                <p>Helps you fall asleep faster and deeper</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Body Awareness</h3>
                <p>Increases mind-body connection</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon"></div>
                <h3>Deep Relaxation</h3>
                <p>Releases physical and mental tension</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BodyScan;

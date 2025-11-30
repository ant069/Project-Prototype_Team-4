import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Exercises.css';

const Exercises = () => {
  const exercises = [
    {
      id: 1,
      title: 'Box Breathing',
      description: 'A calming technique that helps reduce stress and improve focus through rhythmic breathing patterns.',
      icon: '',
      duration: '5 min',
      difficulty: 'Beginner',
      link: '/exercises/breathing'
    },
    {
      id: 2,
      title: 'Body Scan',
      description: 'Progressive relaxation that releases tension by bringing awareness to each part of your body.',
      icon: '',
      duration: '10 min',
      difficulty: 'Beginner',
      link: '/exercises/body-scan'
    },
    {
      id: 3,
      title: 'Guided Meditation',
      description: 'Follow along with soothing voice guidance to achieve deep relaxation and mental clarity.',
      icon: '',
      duration: '15 min',
      difficulty: 'All Levels',
      link: '/exercises/meditation'
    }
  ];

  return (
    <>
      <div className="exercises-page">
        <div className="exercises-container">
          <div className="exercises-hero">
            <h1 className="exercises-title">Breathing Exercises</h1>
            <p className="exercises-subtitle">
              Choose a practice that fits your needs and start your journey to inner peace
            </p>
          </div>

          <div className="exercises-grid">
            {exercises.map(exercise => (
              <div key={exercise.id} className="exercise-card">
                <div className="exercise-icon">{exercise.icon}</div>
                <div className="exercise-content">
                  <h2 className="exercise-title">{exercise.title}</h2>
                  <p className="exercise-description">{exercise.description}</p>
                  <div className="exercise-meta">
                    <span className="meta-item"> {exercise.duration}</span>
                    <span className="meta-item"> {exercise.difficulty}</span>
                  </div>
                  <Link to={exercise.link} className="btn-try">
                    Try Now 
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercises;

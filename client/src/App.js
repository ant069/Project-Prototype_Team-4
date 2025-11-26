import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import BreathingExercise from './pages/BreathingExercise';
import GuidedMeditation from './pages/GuidedMeditation';
import BodyScan from './pages/BodyScan';
import Tracker from './pages/Tracker';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/breathing" element={<BreathingExercise />} />
        <Route path="/meditation" element={<GuidedMeditation />} />
        <Route path="/bodyscan" element={<BodyScan />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
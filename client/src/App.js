import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import BreathingExercise from './pages/BreathingExercise';
import BodyScan from './pages/BodyScan';
import GuidedMeditation from './pages/GuidedMeditation';
import Tracker from './pages/Tracker';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              
              <Route path="/exercises" element={
                <ProtectedRoute>
                  <Exercises />
                </ProtectedRoute>
              } />
              
              <Route path="/exercises/breathing" element={
                <ProtectedRoute>
                  <BreathingExercise />
                </ProtectedRoute>
              } />
              
              <Route path="/exercises/body-scan" element={
                <ProtectedRoute>
                  <BodyScan />
                </ProtectedRoute>
              } />
              
              <Route path="/exercises/meditation" element={
                <ProtectedRoute>
                  <GuidedMeditation />
                </ProtectedRoute>
              } />
              
              <Route path="/tracker" element={
                <ProtectedRoute>
                  <Tracker />
                </ProtectedRoute>
              } />
              
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="/feedback" element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              } />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

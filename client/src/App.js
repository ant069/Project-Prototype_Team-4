import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Exercises from './pages/Exercises';
import BreathingExercise from './pages/BreathingExercise';
import BodyScan from './pages/BodyScan';
import GuidedMeditation from './pages/GuidedMeditation';
import Tracker from './pages/Tracker';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import Feedback from './pages/Feedback';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/home" replace />;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/exercises" element={
          <PrivateRoute>
            <Exercises />
          </PrivateRoute>
        } />
        <Route path="/exercises/breathing" element={
          <PrivateRoute>
            <BreathingExercise />
          </PrivateRoute>
        } />
        <Route path="/exercises/body-scan" element={
          <PrivateRoute>
            <BodyScan />
          </PrivateRoute>
        } />
        <Route path="/exercises/meditation" element={
          <PrivateRoute>
            <GuidedMeditation />
          </PrivateRoute>
        } />
        <Route path="/tracker" element={
          <PrivateRoute>
            <Tracker />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/resources" element={
          <PrivateRoute>
            <Resources />
          </PrivateRoute>
        } />
        <Route path="/feedback" element={
          <PrivateRoute>
            <Feedback />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;

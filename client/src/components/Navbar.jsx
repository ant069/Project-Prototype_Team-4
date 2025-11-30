import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={user ? "/home" : "/"} className="navbar-brand">
           MindCare
        </Link>
        
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/exercises" className="nav-link">Exercises</Link>
              <Link to="/tracker" className="nav-link">Tracker</Link>
              <Link to="/resources" className="nav-link">Resources</Link>
              <Link to="/feedback" className="nav-link">Feedback</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

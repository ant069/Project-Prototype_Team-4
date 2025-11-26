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
        <Link to="/home" className="navbar-brand">
           MindCare
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/home" className="navbar-link">Home</Link></li>
          <li><Link to="/exercises" className="navbar-link">Exercises</Link></li>
          <li><Link to="/tracker" className="navbar-link">Tracker</Link></li>
          <li><Link to="/resources" className="navbar-link">Resources</Link></li>
          <li><Link to="/feedback" className="navbar-link">Feedback</Link></li>
          <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
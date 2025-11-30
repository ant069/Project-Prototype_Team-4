import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={user ? "/home" : "/"} className="navbar-brand">
          <span role="img" aria-label="logo" className="brand-icon"></span>
          MindCare
        </Link>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/home" className="nav-btn">Home</Link>
              <Link to="/exercises" className="nav-btn">Exercises</Link>
              <Link to="/tracker" className="nav-btn">Tracker</Link>
              <Link to="/resources" className="nav-btn">Resources</Link>
              <Link to="/feedback" className="nav-btn">Feedback</Link>
              <Link to="/profile" className="nav-btn">Profile</Link>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Sign In</Link>
              <Link to="/register" className="nav-btn nav-btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

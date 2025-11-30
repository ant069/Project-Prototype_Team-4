import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

const defaultAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=MindCareUser";

const mockSessions = [
  { date: "2025-11-28", activity: "Breathing Exercise", duration: "10 min" },
  { date: "2025-11-27", activity: "Meditation", duration: "15 min" },
  { date: "2025-11-26", activity: "Progress Tracker", duration: "5 min" }
];

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(() => localStorage.getItem("profileName") || user?.name || "");
  const [email, setEmail] = useState(() => localStorage.getItem("profileEmail") || user?.email || "");
  const [avatar, setAvatar] = useState(() =>
    localStorage.getItem("profileAvatar") || defaultAvatar
  );
  const [showProfile, setShowProfile] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      localStorage.setItem("profileAvatar", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("A valid email is required.");
      return;
    }
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);
    setShowProfile(true);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h2>Please log in to view your profile.</h2>
        </div>
      </div>
    );
  }

  if (showProfile) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar-wrapper" onClick={handleAvatarClick} title="Change photo">
              <img
                src={avatar}
                alt="Profile"
                className="profile-avatar"
                width={90}
                height={90}
                style={{ borderRadius: "50%", border: "4px solid #fff" }}
              />
              <div className="profile-avatar-overlay">
                <span role="img" aria-label="pencil" className="profile-pencil-icon"></span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <h1>{name || "Your Profile"}</h1>
            <p style={{ color: "#e0e7ff", marginBottom: "1.5rem" }}>{email}</p>
            <button className="profile-btn" style={{marginBottom:"1.5rem"}} onClick={()=>setShowProfile(false)}>
              Edit Profile
            </button>
          </div>
          <div className="profile-sessions">
            <h2>Your Recent Sessions</h2>
            <table className="profile-sessions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {mockSessions.map((s, i) => (
                  <tr key={i}>
                    <td>{s.date}</td>
                    <td>{s.activity}</td>
                    <td>{s.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-wrapper" onClick={handleAvatarClick} title="Change photo">
            <img
              src={avatar}
              alt="Profile"
              className="profile-avatar"
              width={90}
              height={90}
              style={{ borderRadius: "50%", border: "4px solid #fff" }}
            />
            <div className="profile-avatar-overlay">
              <span role="img" aria-label="pencil" className="profile-pencil-icon"></span>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <h1>Edit Profile</h1>
        </div>
        <form className="profile-form" onSubmit={handleSave}>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="profile-info">
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="profile-input"
                required
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="profile-input"
                required
              />
            </label>
          </div>
          <button type="submit" className="profile-btn">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import '../styles/Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    favoriteExercise: ''
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        favoriteExercise: user.favoriteExercise || ''
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/user/profile', formData);
      updateUser(response.data.user);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully! ✅' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to update profile' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      await api.put('/user/password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setMessage({ type: 'success', text: 'Password changed successfully! ✅' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to change password' });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account settings</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Profile Information */}
      <div className="profile-card">
        <div className="card-header">
          <h2>Profile Information</h2>
          {!isEditing && (
            <button 
              className="btn btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Favorite Exercise</label>
              <select
                value={formData.favoriteExercise}
                onChange={(e) => setFormData({...formData, favoriteExercise: e.target.value})}
              >
                <option value="">Select an exercise</option>
                <option value="Box Breathing">Box Breathing</option>
                <option value="4-7-8 Breathing">4-7-8 Breathing</option>
                <option value="Deep Breathing">Deep Breathing</option>
              </select>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name,
                    email: user.email,
                    bio: user.bio || '',
                    favoriteExercise: user.favoriteExercise || ''
                  });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-save">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-display">
            <div className="profile-field">
              <label>Name</label>
              <p>{user?.name}</p>
            </div>

            <div className="profile-field">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>

            <div className="profile-field">
              <label>Bio</label>
              <p>{user?.bio || 'No bio yet'}</p>
            </div>

            <div className="profile-field">
              <label>Favorite Exercise</label>
              <p>{user?.favoriteExercise || 'Not selected'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Password Change */}
      <div className="profile-card">
        <div className="card-header">
          <h2>Change Password</h2>
          {!showPasswordForm && (
            <button 
              className="btn btn-edit"
              onClick={() => setShowPasswordForm(true)}
            >
              Change
            </button>
          )}
        </div>

        {showPasswordForm ? (
          <form onSubmit={handlePasswordChange} className="profile-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
                minLength={6}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-save">
                Update Password
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-display">
            <p className="text-muted">••••••••</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
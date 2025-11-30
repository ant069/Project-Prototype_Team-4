import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Feedback.css';

const Feedback = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'improvement',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: formData.type,
          message: formData.message,
          rating: parseInt(formData.rating)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        type: 'improvement',
        rating: 5
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Feedback error:', err);
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="feedback-page">
        {/* Decorative floating elements around */}
        <div className="decor-element decor-1">
          <div className="decor-icon"></div>
          <div className="decor-text">Share your thoughts</div>
        </div>
        <div className="decor-element decor-2">
          <div className="decor-icon"></div>
          <div className="decor-text">Rate your experience</div>
        </div>
        <div className="decor-element decor-3">
          <div className="decor-icon"></div>
          <div className="decor-text">Help us improve</div>
        </div>
        <div className="decor-element decor-4">
          <div className="decor-icon"></div>
          <div className="decor-text">Your voice matters</div>
        </div>
        <div className="decor-element decor-5">
          <div className="decor-icon"></div>
          <div className="decor-text">Suggest features</div>
        </div>
        <div className="decor-element decor-6">
          <div className="decor-icon"></div>
          <div className="decor-text">Quick & easy</div>
        </div>

        {/* Floating circles background */}
        <div className="bg-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>

        <div className="feedback-container">
          <div className="feedback-header">
            <div className="feedback-icon-main"></div>
            <h1>We'd Love to Hear From You</h1>
            <p>Your feedback helps us improve MindCare for everyone</p>
          </div>

          {success && (
            <div className="alert alert-success">
              <span className="alert-icon"></span>
              <div>
                <strong>Thank you!</strong>
                <p>Your feedback has been submitted successfully.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <span className="alert-icon"></span>
              <div>
                <strong>Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  <span className="label-icon"></span>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon"></span>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">
                  <span className="label-icon"></span>
                  Feedback Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="bug"> Bug Report</option>
                  <option value="feature"> Feature Request</option>
                  <option value="improvement"> Improvement</option>
                  <option value="other"> Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon"></span>
                  Rating
                </label>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`rating-btn ${formData.rating === num ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, rating: num})}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <span className="label-icon"></span>
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell us what you think..."
                value={formData.message}
                onChange={handleChange}
                required
                maxLength="1000"
              />
              <div className="textarea-footer">
                <span className="char-count">{formData.message.length}/1000</span>
                <span className="char-hint"> Be as detailed as you like</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="btn-icon"></span>
                  Submit Feedback
                </>
              )}
            </button>
          </form>

          <div className="feedback-info">
            <div className="info-card">
              <span className="info-icon"></span>
              <div>
                <strong>Secure & Private</strong>
                <p>Your data is protected</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon"></span>
              <div>
                <strong>Quick Response</strong>
                <p>We reply in 24-48h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
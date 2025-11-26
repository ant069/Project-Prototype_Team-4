import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import '../styles/Feedback.css';

const Feedback = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/feedback', formData);
      setMessage({ type: 'success', text: 'Thank you for your feedback! We appreciate your input. 🙏' });
      setFormData({ ...formData, message: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage({ type: 'error', text: 'Failed to submit feedback. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>We'd Love Your Feedback</h1>
        <p>Help us improve MindCare for everyone</p>
      </div>

      <div className="feedback-content">
        <div className="feedback-info">
          <div className="info-card">
            <div className="info-icon">💡</div>
            <h3>Suggestions</h3>
            <p>Have ideas for new features or improvements? We're all ears!</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🐛</div>
            <h3>Report Issues</h3>
            <p>Found a bug? Let us know so we can fix it quickly.</p>
          </div>

          <div className="info-card">
            <div className="info-icon">⭐</div>
            <h3>Share Your Experience</h3>
            <p>Tell us how MindCare has helped you on your wellness journey.</p>
          </div>
        </div>

        <div className="feedback-form-section">
          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Feedback</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Share your thoughts, suggestions, or report any issues..."
                rows={6}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
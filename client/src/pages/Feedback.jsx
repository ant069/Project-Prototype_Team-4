import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Feedback.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Feedback = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: 5,
    category: "general",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/feedback`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSubmitted(true);
      setFormData({
        rating: 5,
        category: "general",
        message: ""
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-header">
          <span role="img" aria-label="feedback" className="feedback-icon"></span>
          <h1>We Value Your Feedback</h1>
          <p>Help us improve MindCare by sharing your thoughts</p>
        </div>

        {submitted && (
          <div className="alert alert-success">
             Thank you for your feedback! We appreciate your input.
          </div>
        )}

        {error && (
          <div className="alert alert-error">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="5"> Excellent</option>
              <option value="4"> Good</option>
              <option value="3"> Average</option>
              <option value="2"> Poor</option>
              <option value="1"> Very Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="general">General Feedback</option>
              <option value="exercises">Exercises</option>
              <option value="ui">User Interface</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Feedback</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your thoughts, suggestions, or report issues..."
              rows="6"
              required
            />
          </div>

          <button type="submit" className="feedback-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;

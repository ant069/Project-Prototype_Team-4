import React, { useState, useEffect } from 'react';
import '../styles/DailyQuote.css';

const DailyQuote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/quotes/daily');
      const data = await response.json();
      if (data.success) {
        setQuote(data);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="quote-loading">Loading inspiration...</div>;
  if (!quote) return null;

  return (
    <div className="daily-quote">
      <div className="quote-icon">💭</div>
      <blockquote className="quote-text">"{quote.quote}"</blockquote>
      <cite className="quote-author"> {quote.author}</cite>
    </div>
  );
};

export default DailyQuote;
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Fallback quotes array (más variedad)
const fallbackQuotes = [
  {
    content: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    content: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh"
  },
  {
    content: "Breathing in, I calm body and mind. Breathing out, I smile.",
    author: "Thích Nhất Hạnh"
  },
  {
    content: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    content: "Be where you are; otherwise you will miss your life.",
    author: "Buddha"
  },
  {
    content: "The only way out is through.",
    author: "Robert Frost"
  },
  {
    content: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thích Nhất Hạnh"
  },
  {
    content: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha"
  },
  {
    content: "Within you there is a stillness and a sanctuary to which you can retreat at any time.",
    author: "Hermann Hesse"
  },
  {
    content: "Surrender to what is. Let go of what was. Have faith in what will be.",
    author: "Sonia Ricotti"
  }
];

router.get('/', async (req, res) => {
  try {
    // Try to fetch from API with timeout
    const response = await axios.get('https://api.quotable.io/random', {
      timeout: 5000,
      params: {
        tags: 'wisdom|inspirational|life'
      }
    });
    
    console.log('✅ Quote fetched from API');
    
    res.json({
      content: response.data.content,
      author: response.data.author,
      source: 'api'
    });
  } catch (error) {
    console.warn('⚠️ Quote API Error, using fallback:', error.message);
    
    // Return random fallback quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    res.json({
      ...randomQuote,
      source: 'fallback'
    });
  }
});

module.exports = router;
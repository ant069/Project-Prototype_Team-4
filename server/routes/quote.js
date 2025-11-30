const express = require('express');
const router = express.Router();
const axios = require('axios');

let cachedQuote = null;
let cacheTimestamp = null;
const CACHE_DURATION = 60 * 60 * 1000;

router.get('/daily', async (req, res) => {
  try {
    const now = Date.now();
    
    if (cachedQuote && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return res.json({
        success: true,
        quote: cachedQuote,
        cached: true
      });
    }

    const response = await axios.get('https://api.quotable.io/random', {
      params: {
        tags: 'inspirational|wisdom|happiness|wellness',
        maxLength: 150
      },
      timeout: 5000
    });

    cachedQuote = {
      text: response.data.content,
      author: response.data.author,
      tags: response.data.tags
    };
    cacheTimestamp = now;

    res.json({
      success: true,
      quote: cachedQuote,
      cached: false
    });
  } catch (error) {
    console.error('Quote fetch error:', error.message);
    
    if (cachedQuote) {
      return res.json({
        success: true,
        quote: cachedQuote,
        cached: true,
        warning: 'Using cached quote due to API error'
      });
    }

    res.json({
      success: true,
      quote: {
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        author: 'Nelson Mandela',
        tags: ['inspirational']
      },
      cached: false,
      warning: 'Using fallback quote'
    });
  }
});

router.get('/random', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random', {
      params: {
        tags: 'inspirational|wisdom|happiness|wellness',
        maxLength: 150
      },
      timeout: 5000
    });

    res.json({
      success: true,
      quote: {
        text: response.data.content,
        author: response.data.author,
        tags: response.data.tags
      }
    });
  } catch (error) {
    console.error('Random quote error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quote'
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET daily motivational quote
router.get('/daily', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random?tags=inspirational');
    res.json({
      success: true,
      quote: response.data.content,
      author: response.data.author
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quote'
    });
  }
});

module.exports = router;
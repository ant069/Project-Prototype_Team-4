<<<<<<< HEAD
﻿const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');

// @route   POST /api/feedback
// @desc    Enviar feedback
// @access  Private
router.post('/', auth, createFeedback);

// @route   GET /api/feedback
// @desc    Obtener todo el feedback (solo admin)
// @access  Private
router.get('/', auth, getAllFeedback);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Private
router.post('/', [
  auth,
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('message').isLength({ min: 10, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const feedback = new Feedback({
      userId: req.userId,
      name,
      email,
      message
    });

    await feedback.save();

    res.status(201).json({ 
      message: 'Feedback submitted successfully',
      feedback 
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a

const express = require('express');
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

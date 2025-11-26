const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const feedbackController = require('../controllers/feedbackController');

// Todas las rutas requieren autenticación
router.use(auth);

// @route   POST /api/feedback
// @desc    Enviar feedback
// @access  Private
router.post('/', feedbackController.createFeedback);

// @route   GET /api/feedback
// @desc    Obtener todo el feedback del usuario
// @access  Private
router.get('/', feedbackController.getUserFeedback);

// @route   GET /api/feedback/:id
// @desc    Obtener feedback específico
// @access  Private
router.get('/:id', feedbackController.getFeedbackById);

module.exports = router;

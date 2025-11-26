const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserSessions, createSession, getStats } = require('../controllers/sessionController');

// @route   GET /api/sessions
// @desc    Obtener todas las sesiones del usuario
// @access  Private
router.get('/', auth, getUserSessions);

// @route   POST /api/sessions
// @desc    Crear nueva sesión
// @access  Private
router.post('/', auth, createSession);

// @route   GET /api/sessions/stats
// @desc    Obtener estadísticas del usuario
// @access  Private
router.get('/stats', auth, getStats);

module.exports = router;

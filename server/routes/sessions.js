const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sessionController = require('../controllers/sessionController');

// Todas las rutas requieren autenticación
router.use(auth);

// @route   POST /api/sessions
// @desc    Crear una nueva sesión de meditación
// @access  Private
router.post('/', sessionController.createSession);

// @route   GET /api/sessions
// @desc    Obtener todas las sesiones del usuario
// @access  Private
router.get('/', sessionController.getUserSessions);

// @route   GET /api/sessions/:id
// @desc    Obtener una sesión específica
// @access  Private
router.get('/:id', sessionController.getSessionById);

// @route   PUT /api/sessions/:id
// @desc    Actualizar una sesión
// @access  Private
router.put('/:id', sessionController.updateSession);

// @route   DELETE /api/sessions/:id
// @desc    Eliminar una sesión
// @access  Private
router.delete('/:id', sessionController.deleteSession);

module.exports = router;

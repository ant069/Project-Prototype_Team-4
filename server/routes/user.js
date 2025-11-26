const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// Todas las rutas requieren autenticación
router.use(auth);

// @route   GET /api/user/profile
// @desc    Obtener perfil del usuario
// @access  Private
router.get('/profile', userController.getProfile);

// @route   PUT /api/user/profile
// @desc    Actualizar perfil del usuario
// @access  Private
router.put('/profile', userController.updateProfile);

// @route   GET /api/user/stats
// @desc    Obtener estadísticas del usuario
// @access  Private
router.get('/stats', userController.getStats);

module.exports = router;

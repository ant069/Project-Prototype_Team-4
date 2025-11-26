const Session = require('../models/Session');

// @desc    Crear una nueva sesión
// @route   POST /api/sessions
// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { type, duration, completed, mood, notes } = req.body;

    const session = new Session({
      user: req.user.userId,
      type,
      duration,
      completed,
      mood,
      notes
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Error al crear la sesión' });
  }
};

// @desc    Obtener todas las sesiones del usuario
// @route   GET /api/sessions
// @access  Private
exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error('Error getting sessions:', error);
    res.status(500).json({ message: 'Error al obtener las sesiones' });
  }
};

// @desc    Obtener una sesión específica
// @route   GET /api/sessions/:id
// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!session) {
      return res.status(404).json({ message: 'Sesión no encontrada' });
    }

    res.json(session);
  } catch (error) {
    console.error('Error getting session:', error);
    res.status(500).json({ message: 'Error al obtener la sesión' });
  }
};

// @desc    Actualizar una sesión
// @route   PUT /api/sessions/:id
// @access  Private
exports.updateSession = async (req, res) => {
  try {
    const { type, duration, completed, mood, notes } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { type, duration, completed, mood, notes },
      { new: true, runValidators: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Sesión no encontrada' });
    }

    res.json(session);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Error al actualizar la sesión' });
  }
};

// @desc    Eliminar una sesión
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!session) {
      return res.status(404).json({ message: 'Sesión no encontrada' });
    }

    res.json({ message: 'Sesión eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: 'Error al eliminar la sesión' });
  }
};

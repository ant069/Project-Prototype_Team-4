const Session = require('../models/Session');

// Obtener todas las sesiones del usuario
const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.userId }).sort({ completedAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener sesiones', error: error.message });
  }
};

// Crear nueva sesión
const createSession = async (req, res) => {
  try {
    const { exerciseType, duration, moodBefore, moodAfter, notes } = req.body;
    const session = new Session({
      userId: req.user.userId,
      exerciseType,
      duration,
      moodBefore,
      moodAfter,
      notes
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear sesión', error: error.message });
  }
};

// Obtener estadísticas del usuario
const getStats = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.userId });
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const averageMoodImprovement = sessions.length > 0
      ? sessions.reduce((sum, session) => sum + (session.moodAfter - session.moodBefore), 0) / sessions.length
      : 0;

    res.json({
      totalSessions,
      totalDuration,
      averageMoodImprovement,
      recentSessions: sessions.slice(-5).reverse()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
};

module.exports = {
  getUserSessions,
  createSession,
  getStats
};

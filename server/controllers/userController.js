const User = require('../models/User');
const Session = require('../models/Session');

// @desc    Obtener perfil del usuario
// @route   GET /api/user/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// @desc    Actualizar perfil del usuario
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, email, preferences },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

// @desc    Obtener estadísticas del usuario
// @route   GET /api/user/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.userId });

    const stats = {
      totalSessions: sessions.length,
      completedSessions: sessions.filter(s => s.completed).length,
      totalMinutes: sessions.reduce((acc, s) => acc + s.duration, 0),
      averageDuration: sessions.length > 0 
        ? sessions.reduce((acc, s) => acc + s.duration, 0) / sessions.length 
        : 0,
      sessionsByType: sessions.reduce((acc, s) => {
        acc[s.type] = (acc[s.type] || 0) + 1;
        return acc;
      }, {}),
      recentSessions: sessions.slice(0, 5)
    };

    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
};

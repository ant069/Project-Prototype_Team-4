const Feedback = require('../models/Feedback');

// @desc    Crear feedback
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
  try {
    const { type, message, rating } = req.body;

    // Validación
    if (!type || !message) {
      return res.status(400).json({ error: 'Type and message are required' });
    }

    const feedback = new Feedback({
      user: req.user.userId || req.user.id,
      type,
      message,
      rating: rating || 5
    });

    await feedback.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Feedback submitted successfully',
      feedback 
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback. Please try again.' });
  }
};

// @desc    Obtener feedback del usuario
// @route   GET /api/feedback
// @access  Private
exports.getUserFeedback = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const feedback = await Feedback.find({ user: userId })
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ error: 'Error al obtener el feedback' });
  }
};

// @desc    Obtener feedback específico
// @route   GET /api/feedback/:id
// @access  Private
exports.getFeedbackById = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    const feedback = await Feedback.findOne({
      _id: req.params.id,
      user: userId
    });

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback no encontrado' });
    }

    res.json(feedback);
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ error: 'Error al obtener el feedback' });
  }
};
const Feedback = require('../models/Feedback');

// @desc    Crear feedback
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
  try {
    const { session, rating, comment, category } = req.body;

    const feedback = new Feedback({
      user: req.user.userId,
      session,
      rating,
      comment,
      category
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Error al crear el feedback' });
  }
};

// @desc    Obtener feedback del usuario
// @route   GET /api/feedback
// @access  Private
exports.getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.userId })
      .populate('session')
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ message: 'Error al obtener el feedback' });
  }
};

// @desc    Obtener feedback específico
// @route   GET /api/feedback/:id
// @access  Private
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate('session');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback no encontrado' });
    }

    res.json(feedback);
  } catch (error) {
    console.error('Error getting feedback:', error);
    res.status(500).json({ message: 'Error al obtener el feedback' });
  }
};

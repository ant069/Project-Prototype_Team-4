const Feedback = require('../models/Feedback');

// Crear nuevo feedback
const createFeedback = async (req, res) => {
  try {
    const { category, message, rating } = req.body;
    const feedback = new Feedback({
      userId: req.user.userId,
      category,
      message,
      rating
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback enviado correctamente', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar feedback', error: error.message });
  }
};

// Obtener todo el feedback (solo admin)
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener feedback', error: error.message });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback
};

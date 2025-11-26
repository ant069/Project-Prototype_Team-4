const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Session = require('../models/Session');

// @route   GET /api/sessions
// @desc    Get all user sessions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(100);

    // Calculate stats
    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
    
    // Calculate streak (simplified)
    const currentStreak = sessions.length > 0 ? Math.min(sessions.length, 7) : 0;

    res.json({
      sessions,
      stats: {
        totalSessions,
        totalMinutes,
        currentStreak
      }
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/sessions
// @desc    Create new session
// @access  Private
router.post('/', [
  auth,
  body('exerciseType').isIn(['Box Breathing', '4-7-8 Breathing', 'Deep Breathing']),
  body('duration').isInt({ min: 1, max: 60 }),
  body('mood').isIn(['Calm', 'Happy', 'Relaxed', 'Peaceful', 'Energized', 'Stressed', 'Anxious', 'Neutral']),
  body('notes').optional().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { exerciseType, duration, mood, notes } = req.body;

    const session = new Session({
      userId: req.userId,
      exerciseType,
      duration,
      mood,
      notes: notes || ''
    });

    await session.save();

    res.status(201).json(session);
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/sessions/:id
// @desc    Delete session
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    await session.deleteOne();

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

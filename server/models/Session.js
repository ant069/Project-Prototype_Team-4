const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseType: {
    type: String,
    required: [true, 'Exercise type is required'],
    enum: ['Box Breathing', '4-7-8 Breathing', 'Deep Breathing']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
    max: [60, 'Duration cannot exceed 60 minutes']
  },
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['Calm', 'Happy', 'Relaxed', 'Peaceful', 'Energized', 'Stressed', 'Anxious', 'Neutral']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
sessionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Session', sessionSchema);
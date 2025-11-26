const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindcare';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  exerciseType: { type: String, required: true },
  duration: { type: Number, required: true, min: 1, max: 120 },
  mood: { type: String, required: true },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now, index: true }
});

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'mindcare-secret-2025',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = 'user_' + Date.now() + Math.random().toString(36).substr(2, 9);
  }
  next();
});

app.get('/', async (req, res) => {
  try {
    const userSessions = await Session.find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    const stats = await Session.aggregate([
      { $match: { userId: req.session.userId } },
      { $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        totalMinutes: { $sum: '$duration' }
      }}
    ]);
    
    res.render('index', {
      recentSessions: userSessions,
      stats: stats[0] || { totalSessions: 0, totalMinutes: 0 },
      message: req.query.message
    });
  } catch (error) {
    console.error('Error loading home:', error);
    res.render('index', {
      recentSessions: [],
      stats: { totalSessions: 0, totalMinutes: 0 },
      message: null
    });
  }
});

app.get('/exercises', (req, res) => {
  res.render('exercises');
});

app.get('/tracker', async (req, res) => {
  try {
    const userSessions = await Session.find({ userId: req.session.userId })
      .sort({ createdAt: -1 });
    
    res.render('tracker', { sessions: userSessions });
  } catch (error) {
    console.error('Error loading tracker:', error);
    res.render('tracker', { sessions: [] });
  }
});

app.post('/api/sessions', async (req, res) => {
  try {
    const { exerciseType, duration, mood, notes } = req.body;
    
    if (!exerciseType || !duration || !mood) {
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan campos requeridos' 
      });
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum < 1 || durationNum > 120) {
      return res.status(400).json({ 
        success: false, 
        error: 'La duración debe estar entre 1 y 120 minutos' 
      });
    }

    const newSession = new Session({
      userId: req.session.userId,
      exerciseType,
      duration: durationNum,
      mood,
      notes: notes || ''
    });

    await newSession.save();
    res.json({ success: true, session: newSession });
  } catch (error) {
    console.error('Error saving session:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al guardar la sesión' 
    });
  }
});

app.get('/resources', async (req, res) => {
  let quote = { 
    q: 'Peace comes from within. Do not seek it without.', 
    a: 'Buddha' 
  };
  
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    
    if (data && data[0]) {
      quote = { 
        q: data[0].q, 
        a: data[0].a 
      };
    }
  } catch (error) {
    console.log('API unavailable, using fallback quote');
  }
  
  res.render('resources', { quote });
});

app.get('/feedback', (req, res) => {
  res.render('feedback', { success: req.query.success });
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Todos los campos son requeridos' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Formato de email inválido' 
      });
    }

    const newFeedback = new Feedback({ 
      name: name.trim(), 
      email: email.trim(), 
      message: message.trim() 
    });
    
    await newFeedback.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al enviar el feedback' 
    });
  }
});

app.delete('/api/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId
    });
    
    if (!session) {
      return res.status(404).json({ 
        success: false, 
        error: 'Sesión no encontrada' 
      });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al eliminar la sesión' 
    });
  }
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
  console.log(`🚀 MindCare ejecutándose en http://localhost:${PORT}`);
});

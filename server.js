require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

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
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    touchAfter: 24 * 3600
  }),
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

app.get('/', async (req, res) => {
  try {
    const recentSessions = await Session.find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Calcula las estadísticas
    const allSessions = await Session.find({ userId: req.session.userId });
    const totalMinutes = allSessions.reduce((sum, session) => sum + session.duration, 0);
    
    const stats = {
      totalSessions: allSessions.length,
      totalMinutes: totalMinutes,
      currentStreak: allSessions.length > 0 ? Math.ceil(allSessions.length / 7) : 0
    };
    
    res.render('index', { 
      recentSessions,
      message: req.query.message || null,
      stats: stats
    });
  } catch (error) {
    console.error('Error loading home:', error);
    res.render('index', { 
      recentSessions: [],
      message: null,
      stats: {
        totalSessions: 0,
        totalMinutes: 0,
        currentStreak: 0
      }
    });
  }
});

app.get('/exercises', (req, res) => {
  res.render('exercises');
});

app.get('/tracker', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.session.userId })
      .sort({ createdAt: -1 });
    res.render('tracker', { sessions });
  } catch (error) {
    console.error('Error loading tracker:', error);
    res.render('tracker', { sessions: [] });
  }
});

app.post('/api/sessions', async (req, res) => {
  try {
    const { exerciseType, duration, mood, notes } = req.body;
    
    if (!exerciseType || !duration || !mood) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSession = new Session({
      userId: req.session.userId,
      exerciseType,
      duration: parseInt(duration),
      mood,
      notes: notes || ''
    });

    await newSession.save();
    res.json({ success: true, session: newSession });
  } catch (error) {
    console.error('Error saving session:', error);
    res.status(500).json({ error: 'Failed to save session' });
  }
});

app.get('/resources', async (req, res) => {
  res.render('resources');
});

app.get('/feedback', (req, res) => {
  res.render('feedback');
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.delete('/api/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MindCare ejecutándose en http://localhost:${PORT}`);
});

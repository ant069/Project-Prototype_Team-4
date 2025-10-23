require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const crypto = require('crypto');
const app = express();

// Debe ir ANTES de session() cuando usas secure cookies detrás de proxy (Render)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', sessionSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);
const User = mongoose.model('User', userSchema);

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
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Asignar un userId por navegador (guest) ANTES de usar Session en rutas
app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = `guest_${crypto.randomUUID()}`;
  }
  next();
});

// Health (para Render)
app.get('/health', (req, res) => res.json({ ok: true }));

// Home con stats reales por usuario
app.get('/', async (req, res) => {
  try {
    const recentSessions = await Session.find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const all = await Session.find({ userId: req.session.userId });
    const totalMinutes = all.reduce((sum, s) => sum + s.duration, 0);
    const stats = {
      totalSessions: all.length,
      totalMinutes,
      currentStreak: all.length ? Math.ceil(all.length / 7) : 0
    };

    res.render('index', { recentSessions, message: null, stats });
  } catch (e) {
    console.error('Home error:', e);
    res.render('index', { recentSessions: [], message: null, stats: { totalSessions: 0, totalMinutes: 0, currentStreak: 0 } });
  }
});

// Exercises (protegido)
app.get('/exercises', (req, res) => res.render('exercises'));

// Tracker mostrando sesiones del usuario
app.get('/tracker', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.session.userId })
      .sort({ createdAt: -1 });
    res.render('tracker', { sessions });
  } catch (e) {
    console.error('Tracker error:', e);
    res.render('tracker', { sessions: [] });
  }
});

// Resources (protegido)
app.get('/resources', (req, res) => res.render('resources', { quote: { q: "Peace comes from within. Do not seek it without.", a: "Buddha" } }));

// Feedback (protegido)
app.get('/feedback', (req, res) => res.render('feedback', { success: null }));

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

// Registro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    
    req.session.userId = user._id.toString();
    req.session.userName = user.name;
    
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    req.session.userId = user._id.toString();
    req.session.userName = user.name;
    
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Middleware: proteger rutas (solo para usuarios registrados)
function requireAuth(req, res, next) {
  if (!req.session.userId || req.session.userId.startsWith('guest_')) {
    return res.redirect('/login');
  }
  next();
}

app.use((req, res, next) => {
  res.locals.message = res.locals.message ?? null;
  res.locals.stats = res.locals.stats ?? { totalSessions: 0, totalMinutes: 0, currentStreak: 0 };
  next();
});

app.get('/login', (req, res) => {
  if (req.session.userId && !req.session.userId.startsWith('user_')) {
    return res.redirect('/');
  }
  res.render('login');
});

app.get('/register', (req, res) => {
  if (req.session.userId && !req.session.userId.startsWith('user_')) {
    return res.redirect('/');
  }
  res.render('register');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});



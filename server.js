const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const sessionsData = [];
const feedbackData = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'mindcare-secret-2025',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = 'user_' + Date.now();
  }
  next();
});

app.get('/', (req, res) => {
  const userSessions = sessionsData.filter(s => s.userId === req.session.userId);
  const recentSessions = userSessions.slice(-5).reverse();
  
  const totalSessions = userSessions.length;
  const totalMinutes = userSessions.reduce((sum, s) => sum + s.duration, 0);
  
  res.render('index', {
    recentSessions,
    stats: { totalSessions, totalMinutes },
    message: req.query.message
  });
});

app.get('/exercises', (req, res) => {
  res.render('exercises');
});

app.get('/tracker', (req, res) => {
  const userSessions = sessionsData
    .filter(s => s.userId === req.session.userId)
    .reverse();
  
  res.render('tracker', { sessions: userSessions });
});

app.post('/api/sessions', (req, res) => {
  const { exerciseType, duration, mood, notes } = req.body;
  
  if (!exerciseType || !duration || !mood) {
    return res.status(400).json({ 
      success: false, 
      error: 'Faltan campos requeridos' 
    });
  }

  if (duration < 1 || duration > 120) {
    return res.status(400).json({ 
      success: false, 
      error: 'La duración debe estar entre 1 y 120 minutos' 
    });
  }

  const newSession = {
    id: Date.now().toString(),
    userId: req.session.userId,
    exerciseType,
    duration: parseInt(duration),
    mood,
    notes: notes || '',
    createdAt: new Date()
  };

  sessionsData.push(newSession);
  res.json({ success: true, session: newSession });
});

app.get('/resources', (req, res) => {
  const quotes = [
    { q: 'Peace comes from within. Do not seek it without.', a: 'Buddha' },
    { q: 'The present moment is filled with joy and happiness.', a: 'Thich Nhat Hanh' },
    { q: 'Breath is the bridge which connects life to consciousness.', a: 'Thich Nhat Hanh' }
  ];
  
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.render('resources', { quote: randomQuote });
});

app.get('/feedback', (req, res) => {
  res.render('feedback', { success: req.query.success });
});

app.post('/api/feedback', (req, res) => {
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

  const newFeedback = {
    id: Date.now().toString(),
    name,
    email,
    message,
    createdAt: new Date()
  };

  feedbackData.push(newFeedback);
  res.json({ success: true });
});

app.delete('/api/sessions/:id', (req, res) => {
  const index = sessionsData.findIndex(s => 
    s.id === req.params.id && s.userId === req.session.userId
  );
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Sesión no encontrada' });
  }
  
  sessionsData.splice(index, 1);
  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`MindCare ejecutándose en http://localhost:${PORT}`);
});
<<<<<<< HEAD
﻿#  MindCare - Mental Wellness Platform

![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green?logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.21.1-blue?logo=express)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Node](https://img.shields.io/badge/Node-18+-green?logo=node.js)
![JWT](https://img.shields.io/badge/JWT-Auth-orange?logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-yellow)

##  Live Demo
 **Live Application:** https://mindcare-bw9t.onrender.com

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](docs/screenshots/landing.png)
*Clean, modern landing page with clear call-to-action*

### 📊 Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*Track your progress with statistics and recent sessions*

### 🫁 Breathing Exercise
![Breathing Exercise](docs/screenshots/breathing.png)
*Interactive breathing animations for stress relief*

### 📈 Session Tracker
![Session Tracker](docs/screenshots/tracker.png)
*Complete history of your wellness journey*

---
# ðŸ§˜ MindCare - Mental Wellness Platform
=======
# 🧘 MindCare - Mental Wellness Platform
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a

**Live Demo:** https://mindcare-bw9t.onrender.com  
**Repository:** https://github.com/ant069/Project-Prototype_Team-4

---

<<<<<<< HEAD
## ðŸ“‹ Description
=======
## 📋 Description
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a

MindCare is a professional mental wellness web platform built with the MERN stack (MongoDB, Express, React, Node.js). It offers scientifically validated breathing exercises, guided meditation, body scan, and personalized progress tracking to help users manage stress and improve mental wellbeing.

---

<<<<<<< HEAD
## ðŸŽ¯ Objective
=======
## 🎯 Objective
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a

Provide accessible, evidence-based tools to reduce stress, improve focus, and promote mental wellness through breathing techniques, mindfulness practices, and progress tracking.

**Aligned with UN SDG 3:** Good Health and Well-being

---

##  Technologies Used

### Frontend
- **React 18.3.1** - Modern UI library with Hooks
- **React Router 6.28.0** - Client-side routing
- **Context API** - Global state management (authentication)
- **Axios 1.7.7** - HTTP client for API requests
- **Bootstrap 5.3.3** - Responsive CSS framework
- **Bootstrap Icons** - Icon library
- **CSS3** - Custom animations and styling

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.21.1** - Web application framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose 8.8.1** - MongoDB object modeling (ODM)

### Security & Authentication
- **JWT (jsonwebtoken 9.0.2)** - Secure token-based authentication
- **bcryptjs 2.4.3** - Password hashing with salt rounds
- **CORS 2.8.5** - Cross-origin resource sharing configuration
- **express-session** - Session management
- **connect-mongo 5.1.0** - MongoDB session store

### External APIs
- **Quotable API** - Daily motivational and inspirational quotes

### Deployment
- **Render** - Web service hosting (backend + frontend)
- **MongoDB Atlas** - Database cloud hosting

---

<<<<<<< HEAD

## 📸 Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)
*Welcoming landing page with call-to-action*

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*User dashboard with daily quote and activity overview*

### Breathing Exercise
![Breathing Exercise](docs/screenshots/breathing.png)
*Interactive breathing exercise with visual guide*

### Meditation Tracker
![Tracker](docs/screenshots/tracker.png)
*Track your meditation sessions and progress*
=======
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a
##  Features

###  Authentication & User Management
-  User registration with email validation
-  Secure login with JWT tokens
-  Password hashing with bcrypt (10 salt rounds)
-  Profile management (edit name, email, password)
-  Protected routes (frontend + backend)
-  Persistent sessions with localStorage

###  Wellness Exercises
-  **Box Breathing** (4-4-4-4) - Navy SEAL technique
-  **4-7-8 Breathing** - Dr. Andrew Weil's method
-  **Deep Breathing** (6-2-6) - Stress reduction
-  **Guided Meditation** - 5/10/15/20 minute sessions
-  **Body Scan** - 7-step progressive relaxation
-  Animated breathing guide with visual cues
-  Timer with Start/Pause/Stop controls

###  Progress Tracking
-  Session history with detailed logs
-  Statistics dashboard (Total Sessions, Time Practiced, Current Streak)
-  Streak calculation (consecutive practice days)
-  Delete sessions from history
-  Filter sessions by exercise type

###  User Engagement
-  Daily motivational quotes (Quotable API)
-  Feedback form to contact developers
-  Educational resources library
-  Crisis hotline information

###  Design & UX
-  Fully responsive (mobile, tablet, desktop)
-  Smooth scroll reveal animations
-  Count-up statistics animation
-  Hover effects and transitions
-  Accessibility support (prefers-reduced-motion)
-  Professional UI with Bootstrap 5

---

##  Installation

### Prerequisites
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **MongoDB** installed locally OR MongoDB Atlas account
- **npm** or **yarn** package manager
- **Git** for cloning the repository

---

### 1 Clone the Repository

```bash
git clone https://github.com/ant069/Project-Prototype_Team-4.git
cd Project-Prototype_Team-4
```

---

### 2 Backend Setup

```bash
cd server
npm install
```

**Create `.env` file in `/server` directory:**

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/mindcare
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindcare

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

**Generate JWT Secret:**
```bash
# Windows PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Linux/Mac
openssl rand -base64 64
```

---

### 3 Frontend Setup

```bash
cd ../client
npm install
```

**Create `.env` file in `/client` directory:**

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

---

### 4 Run the Project

**Option A: Run Both Servers Separately**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# App running on http://localhost:3000
```

**Option B: Run from Root (if configured)**
```bash
# From project root
npm run dev
```

---

### 5 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **MongoDB:** mongodb://localhost:27017/mindcare

---

##  Project Structure

```
Project-Prototype_Team-4/
 client/                      # React Frontend
    public/
       index.html          # HTML entry point
       manifest.json       # PWA manifest
    src/
       components/         # Reusable React components
          Navbar.jsx
          Footer.jsx
          ProtectedRoute.jsx
          DailyQuote.jsx
       context/            # React Context API
          AuthContext.js  # Global auth state
       pages/              # Page components
          Landing.jsx     # Welcome page
          Login.jsx       # User login
          Register.jsx    # User registration
          Home.jsx        # Dashboard
          Exercises.jsx   # Exercise list
          BreathingExercise.jsx
          BodyScan.jsx
          GuidedMeditation.jsx
          Tracker.jsx     # Session history
          Profile.jsx     # User profile
          Feedback.jsx    # Feedback form
          Resources.jsx   # Educational resources
       styles/             # CSS modules
       config/
          api.js          # Axios configuration
       App.js              # Main app component
       index.js            # React entry point
    package.json

 server/                      # Express Backend
    models/                 # Mongoose schemas
       User.js            # User model
       Session.js         # Session tracking
       Feedback.js        # User feedback
    routes/                # API endpoints
       auth.js           # Authentication routes
       user.js           # User profile routes
       sessions.js       # Session CRUD
       feedback.js       # Feedback routes
       quotes.js         # Quote API proxy
    middleware/            # Express middleware
       auth.js           # JWT verification
       errorHandler.js   # Error handling
    server.js             # Express app entry point
    .env                  # Environment variables
    package.json

 docs/                       # Documentation
    ARCHITECTURE.md        # System architecture
    DATABASE.md            # Database schema design
    DEPLOYMENT.md          # Deployment guide
    TESTING.md             # Testing plan
    WIREFRAMES.md          # Design mockups
    PRESENTATION.md        # Project presentation
    DEVLOG.md              # Development log
    REFLECTION.md          # Team reflection
    ANTONIO_PERSONAL_REFLECTION.md
    DIEGO_PERSONAL_REFLECTION_TEMPLATE.md
    GAEL_PERSONAL_REFLECTION_TEMPLATE.md
    diagrams/              # System diagrams
    wireframes/            # UI wireframes

 .gitignore                 # Git ignore rules
 README.md                  # This file
```

---

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user and return JWT
- `GET /api/auth/verify` - Verify JWT token validity

### User Profile
- `GET /api/user/profile` - Get user profile data
- `PUT /api/user/profile` - Update user profile (name, email)
- `PUT /api/user/password` - Change user password

### Sessions
- `GET /api/sessions` - Get all user sessions
- `POST /api/sessions` - Create new session record
- `DELETE /api/sessions/:id` - Delete specific session
- `GET /api/sessions/stats` - Get user statistics

### Feedback
- `POST /api/feedback` - Submit user feedback

### Quotes
- `GET /api/quotes/daily` - Get daily motivational quote

---

##  Development Team

### Team 4 - MindCare

<<<<<<< HEAD
**Diego Arias PÃ©rez** - Backend Developer & Database Architecture
=======
**Diego Arias Pérez** - Backend Developer & Database Architecture
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a
- MongoDB schema design and implementation
- RESTful API development (18 endpoints)
- JWT authentication system
- Database optimization and indexing
- Third-party API integration (Quotable)

**Gael Rodriguez Hernandez** - Frontend Developer & UI/UX Design
- React component architecture
- Breathing exercise animations
- Responsive design with Bootstrap
- User interface and experience design
- Accessibility implementation

<<<<<<< HEAD
**Antonio EnrÃ­quez Velasco** - Full Stack Developer & Project Integration
=======
**Antonio Enríquez Velasco** - Full Stack Developer & Project Integration
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a
- Frontend-backend integration
- AuthContext implementation
- Protected routes configuration
- CORS and deployment setup
- Project documentation and coordination

---

##  Complete Documentation

### Technical Documentation
- [ System Architecture](docs/ARCHITECTURE.md) - Component diagrams, data flow
- [ Database Design](docs/DATABASE.md) - Schemas, relationships, indexes
- [ Deployment Guide](docs/DEPLOYMENT.md) - Production setup on Render
- [ Testing Plan](docs/TESTING.md) - Test cases and scenarios
- [ Wireframes & Mockups](docs/WIREFRAMES.md) - UI/UX design process

### Project Documentation
- [ Project Presentation](docs/PRESENTATION.md) - Executive summary
- [ Development Log](docs/DEVLOG.md) - Week-by-week progress
- [ Team Reflection](docs/REFLECTION.md) - Challenges and learnings
- [ Personal Reflections](docs/) - Individual team member experiences

---

##  Contributing to UN Sustainable Development Goals

### SDG 3: Good Health and Well-being

MindCare directly contributes to the United Nations **Sustainable Development Goal 3**: "Ensure healthy lives and promote well-being for all at all ages."

**How we contribute:**
-  Provide free, accessible mental health tools
-  Reduce barriers to stress management resources
-  Promote preventive mental health care
-  Support mental wellness through evidence-based techniques
-  Offer 24/7 availability for breathing exercises
-  Include crisis hotline information for emergencies

---

##  Security Features

-  **Password Hashing:** bcrypt with 10 salt rounds
-  **JWT Authentication:** Secure token-based auth
-  **Protected Routes:** Both frontend and backend
-  **CORS Configuration:** Restricted origins
-  **Environment Variables:** Sensitive data protection
-  **Input Validation:** Server-side validation on all endpoints
-  **Error Handling:** No sensitive data in error messages

---

##  Testing

**Manual Testing Performed:**
-  Authentication flow (register, login, logout)
-  Protected route access control
-  CRUD operations for sessions
-  API endpoint responses
-  Responsive design (mobile, tablet, desktop)
-  Cross-browser compatibility (Chrome, Firefox, Safari)
-  Accessibility (keyboard navigation, screen readers)

**Future Testing:**
- [ ] Unit tests with Jest
- [ ] Integration tests with Supertest
- [ ] End-to-end tests with Cypress
- [ ] Performance testing with Lighthouse

---

##  Known Issues

- None at the moment! 

---

##  Future Enhancements

**Phase 2 (Short-term):**
- [ ] Dark mode toggle
- [ ] Progress charts with Chart.js
- [ ] Export session data (CSV/PDF)
- [ ] Confirmation modals for delete actions
- [ ] Password strength meter

**Phase 3 (Long-term):**
- [ ] Mobile app (React Native)
- [ ] Push notifications for reminders
- [ ] Social features (friends, challenges)
- [ ] Integration with Apple Health / Google Fit
- [ ] Multi-language support (i18n)
- [ ] Voice-guided meditations
- [ ] Premium features (freemium model)

---

##  License

MIT License - See [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

**Technologies:**
- MongoDB team for excellent documentation
- React team for a powerful UI library
- Express team for a lightweight framework
- Bootstrap team for rapid styling
- Quotable API for motivational quotes
- Render for free hosting

**Learning Resources:**
- MDN Web Docs
- Stack Overflow community
- React documentation
- Mongoose guides

**Special Thanks:**
- Our professor for guidance and feedback
- Classmates for user testing and suggestions
- Family for patience during late-night coding sessions

---

##  Contact

**Project Repository:** https://github.com/ant069/Project-Prototype_Team-4  
**Live Demo:** https://mindcare-bw9t.onrender.com

**Team 4:**
<<<<<<< HEAD
- Diego Arias PÃ©rez
- Gael Rodriguez Hernandez
- Antonio EnrÃ­quez Velasco
=======
- Diego Arias Pérez
- Gael Rodriguez Hernandez
- Antonio Enríquez Velasco
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a

---

**Developed with  by Team 4**  
**Web Development Final Project**  
**Universidad Panamericana - November 2025**

---

##  Quick Start Commands

```bash
# Clone repository
git clone https://github.com/ant069/Project-Prototype_Team-4.git
cd Project-Prototype_Team-4

# Install all dependencies
cd server && npm install
cd ../client && npm install

# Create .env files (see Installation section)

# Run backend (Terminal 1)
cd server && npm run dev

# Run frontend (Terminal 2)
cd client && npm start

# Access app at http://localhost:3000
```

---

<<<<<<< HEAD
**Ready to improve your mental wellness? Start breathing! **

=======
**Ready to improve your mental wellness? Start breathing! **
>>>>>>> 505d182e36863c3ddf638af3803f1ea4114dcf3a

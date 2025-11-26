#  Development Log - MindCare MERN Project

**Project:** MindCare - Mental Wellness Platform  
**Team:** Team 4 (Diego Arias Pérez, Gael Rodriguez Hernandez, Antonio Enríquez Velasco)  
**Course:** Web Development with MERN Stack  
**Institution:** Tecnológico de Monterrey  
**Timeline:** October - November 2025  
**Live Demo:** https://mindcare-bw9t.onrender.com  
**Repository:** https://github.com/ant069/Project-Prototype_Team-4

---

##  Project Overview

MindCare is a full-stack mental wellness application built with the MERN stack (MongoDB, Express, React, Node.js). The platform provides scientifically-backed breathing exercises, guided meditation, body scan techniques, and comprehensive session tracking to help users manage stress and improve mental wellbeing.

### Tech Stack

**Backend:** Node.js, Express 4.21.1, MongoDB Atlas, Mongoose, JWT, bcryptjs  
**Frontend:** React 18.3.1, React Router 6.28.0, Context API, Axios, Bootstrap 5  
**Deployment:** Render (web service) + MongoDB Atlas (database)

---

##  Development Timeline

### Week 1 (Oct 20-26, 2025) - Foundation

**Oct 20-21: Project Planning & Setup**
- Team kickoff meeting: defined roles and responsibilities
- Created GitHub repository with monorepo structure (`/client` and `/server`)
- Initialized React app (Create React App) and Express server
- Set up MongoDB Atlas cluster and configured environment variables
- **Team Decision:** Use Context API over Redux for simpler state management

**Oct 22-24: Database Design (Diego)**
- Designed MongoDB schemas (User, Session, Feedback)
- Implemented Mongoose models with validation
- Created database connection utility with error handling
- Added indexes for email uniqueness and query performance

**Oct 25-26: Authentication Backend (Diego)**
- Implemented JWT authentication system
- Built auth middleware for protected routes
- Created registration and login endpoints with bcrypt password hashing
- Configured CORS for frontend-backend communication
- **Challenge:** Initial CORS configuration issues - solved by properly ordering middleware

---

### Week 2 (Oct 27 - Nov 2, 2025) - Core Backend & Auth Flow

**Oct 27-29: RESTful API Development (Diego)**
- Built complete CRUD API for sessions (`GET`, `POST`, `DELETE`)
- Created user profile endpoints (`GET`, `PUT`)
- Implemented statistics calculation endpoint (`/api/sessions/stats`)
- Added feedback submission endpoint
- Integrated Quotable API for daily motivational quotes via backend proxy
- **Learning:** REST API design patterns and error handling best practices

**Oct 30-31: React Setup & Routing (Gael & Antonio)**
- Configured React Router v6 with protected routes
- Created reusable components: `Navbar`, `Footer`, `ProtectedRoute`, `DailyQuote`
- Built landing, login, and register pages
- Integrated Bootstrap 5 for responsive design
- **Challenge:** Understanding React Router v6 new syntax (different from v5)

**Nov 1-2: AuthContext Implementation (Antonio)**
- Implemented Context API for global auth state
- Created `AuthProvider` with login/logout/register methods
- Added token persistence using localStorage
- Built automatic token verification on app load
- Implemented loading states to prevent UI flicker
- **Major Challenge:** Fixed infinite redirect loop in `ProtectedRoute` by adding loading state
- **Time Investment:** ~8 hours debugging auth flow (CORS + redirect issues)

---

### Week 3 (Nov 3-9, 2025) - Features & Exercises

**Nov 3-4: Home Dashboard (Gael & Antonio)**
- Created statistics dashboard with three key metrics:
  - Total Sessions
  - Time Practiced (in minutes)
  - Current Streak (consecutive days)
- Implemented count-up animation for statistics
- Added daily quote display with API integration
- Built recent sessions preview section
- **UI Enhancement:** Scroll reveal animations for smooth user experience

**Nov 5-7: Breathing Exercises (Gael)**
- Implemented three breathing techniques:
  1. **Box Breathing** (4-4-4-4 pattern) - Navy SEAL technique
  2. **4-7-8 Breathing** - Dr. Andrew Weil's relaxation method
  3. **Deep Breathing** (6-2-6 pattern) - Stress reduction
- Created animated breathing circle with CSS transforms
- Built timer with Start/Pause/Stop controls
- Added phase indicators (Inhale/Hold/Exhale)
- Implemented session saving on exercise completion
- **Design Decision:** Respect `prefers-reduced-motion` for accessibility

**Nov 8-9: Body Scan & Meditation (Gael)**
- Built 7-step body scan progressive relaxation:
  - Feet  Legs  Hips  Abdomen  Arms  Neck  Head
- Created guided meditation with duration selection (5/10/15/20 min)
- Implemented step-by-step timer with visual progress
- Added meditation completion tracking
- **Learning:** React `useEffect` cleanup functions for timer management

---

### Week 4 (Nov 10-16, 2025) - Tracking & User Management

**Nov 10-12: Session Tracker (Antonio & Diego)**
- Built session history page with list view
- Implemented delete functionality with optimistic updates
- Added filtering by exercise type
- Created statistics summary at page top
- **Major Challenge:** Streak calculation with timezone handling
  - **Problem:** Users in different timezones saw different streaks
  - **Solution:** Normalized dates using `toDateString()` before comparison
  - **Time:** 2 days to debug and implement correctly

**Nov 13-14: User Profile (Antonio)**
- Created profile view/edit mode toggle
- Implemented profile update (name, email)
- Built password change functionality with current password verification
- Added form validation and error handling
- **Security:** Required current password to change password

**Nov 15-16: Feedback & Resources (Gael)**
- Built feedback form with validation
- Created resources page with curated mental health links
- Organized resources by category (articles, hotlines, techniques)
- Added success confirmation messages
- **UX Enhancement:** External link indicators for accessibility

---

### Week 5 (Nov 17-23, 2025) - Polish & Deployment

**Nov 17-18: UI Polish (Gael)**
- Added scroll reveal animations using `IntersectionObserver`
- Implemented count-up animation for statistics
- Created hover effects and smooth transitions
- Fixed card alignment issues with Flexbox
- Ensured mobile responsiveness across all pages
- **Accessibility:** Added `prefers-reduced-motion` media query

**Nov 19-20: Bug Fixes & Testing (Team)**

**Major Bugs Fixed:**

1. **CORS Configuration** (Antonio - 4 hours)
   - Issue: Frontend blocked by CORS policy
   - Fix: Configured Express CORS middleware with correct origin

2. **Infinite Redirect Loop** (Antonio - 3 hours)
   - Issue: ProtectedRoute redirecting infinitely
   - Fix: Added loading state to wait for token verification

3. **Session userId Undefined** (Diego & Antonio - 2 hours)
   - Issue: req.user.id vs req.userId mismatch
   - Fix: Standardized to req.userId across all routes

4. **Streak Calculation Timezone Bug** (Diego - 2 days)
   - Issue: Different streaks for different timezones
   - Fix: Normalized dates before comparison

5. **Card Height Misalignment** (Gael - 30 min)
   - Issue: Exercise cards different heights
   - Fix: Flexbox with `margin-top: auto` on buttons

**Nov 21-22: Deployment (Antonio & Diego)**
- Created Render web service connected to GitHub
- Configured environment variables in Render dashboard
- Set up MongoDB Atlas network access (0.0.0.0/0)
- Built production React app and served from Express
- **Deployment Challenges:**
  - MongoDB connection timeout (fixed by IP whitelist)
  - Frontend not loading (fixed by correct build path)
  - API calls failing (fixed by using relative URLs)
- **Total Deployment Time:** 3 hours

**Nov 23: Documentation (Antonio)**
- Wrote comprehensive README.md with installation guide
- Created technical documentation (Architecture, Database, Testing)
- Documented personal reflection (4000+ words)
- Added code comments and JSDoc for complex functions
- Created this DEVLOG

---

##  Use of Generative AI

### How We Used AI

**Antonio (Full Stack & Integration):**
- CORS configuration explanations and debugging strategies
- React Context API patterns and best practices
- JWT authentication flow examples
- Git conflict resolution techniques

**Diego (Backend Developer):**
- Mongoose schema design patterns
- REST API naming conventions and structure
- MongoDB aggregation pipeline examples
- JWT token expiration configuration

**Gael (Frontend Developer):**
- CSS Grid and Flexbox layout suggestions
- Bootstrap utility class quick references
- CSS animation timing functions
- Accessibility attribute recommendations

### AI Philosophy

 **What AI Helped With:**
- Quick syntax lookups and API references
- Error message interpretations
- Code pattern suggestions
- Documentation structure templates

 **What We Did Ourselves:**
- Complete feature implementation
- System architecture design
- Complex bug debugging
- All project decisions

**Our Approach:** We used AI as a learning accelerator, not a code generator. Every solution was understood, adapted, and tested by the team.

---

##  Team Contributions

### Diego Arias Pérez - Backend Developer & Database Architect

**Key Contributions:**
- Designed complete database schema (User, Session, Feedback models)
- Implemented JWT authentication system with bcrypt
- Built all RESTful API endpoints (18 total)
- Integrated Quotable API via backend proxy
- Implemented streak calculation algorithm

**Skills Acquired:**
- Express.js middleware patterns
- MongoDB Atlas deployment and management
- JWT token security best practices
- Error handling and validation

**Most Challenging:**
- Debugging streak calculation timezone issues (2 days)

**Most Rewarding:**
- Zero database-related bugs in production

---

### Gael Rodriguez Hernandez - Frontend Developer & UI/UX Designer

**Key Contributions:**
- Designed and implemented all React pages (12 total)
- Created breathing exercise animations with CSS
- Built responsive layouts using Bootstrap Grid
- Implemented scroll reveal and count-up animations
- Ensured accessibility with ARIA labels and keyboard navigation

**Skills Acquired:**
- React Hooks (useState, useEffect, useContext)
- CSS animations with @keyframes
- Bootstrap 5 utilities and components
- Accessibility best practices (WCAG)

**Most Challenging:**
- Creating smooth breathing circle animation

**Most Rewarding:**
- Users saying "the breathing animations are so calming"

---

### Antonio Enríquez Velasco - Full Stack Developer & Project Integration

**Key Contributions:**
- Implemented AuthContext for global state management
- Built ProtectedRoute component with loading states
- Integrated all frontend pages with backend APIs
- Coordinated team workflow (Git, daily standups)
- Wrote comprehensive documentation (8 documents)

**Skills Acquired:**
- Full-stack integration patterns
- React Context API architecture
- CORS debugging and configuration
- Git workflows (branches, PRs, code reviews)

**Most Challenging:**
- Debugging complete authentication flow (1 week total)

**Most Rewarding:**
- Seeing the complete app work seamlessly end-to-end

---

##  Project Statistics

| Metric | Count |
|--------|-------|
| Total Development Time | 142 hours |
| Lines of Code | ~8,500 |
| Git Commits | 127 |
| Pull Requests | 23 |
| API Endpoints | 18 |
| React Components | 15 |
| Database Models | 3 |
| Documentation Pages | 8 |

**Time Breakdown:**
- Planning & Design: 12 hours
- Backend Development: 35 hours
- Frontend Development: 40 hours
- Integration & Testing: 25 hours
- Bug Fixes: 15 hours
- Documentation: 10 hours
- Deployment: 5 hours

---

##  Key Learnings

### Technical Lessons

1. **Authentication is Complex:** JWT tokens, token persistence, loading states, and CORS require careful coordination between frontend and backend.

2. **CORS is Backend Config:** CORS errors appear in the browser but are solved on the server by configuring Express middleware.

3. **Loading States Prevent Bugs:** Always handle async operations with loading states to avoid race conditions and flicker.

4. **Consistent Naming Matters:** The `req.user.id` vs `req.userId` bug taught us that consistent interfaces prevent silent errors.

5. **Timezone Normalization:** When comparing dates by "day," always normalize to avoid timezone issues.

6. **Flexbox for Alignment:** `margin-top: auto` is perfect for aligning items at the bottom of flex containers.

### Process Lessons

1. **Daily Standups Work:** 10-minute daily check-ins kept the team aligned and caught blockers early.

2. **Feature Branches + PRs:** Using Git feature branches with pull requests prevented merge conflicts (zero destructive conflicts!).

3. **Code Reviews Catch Bugs:** Reviewing each other's code before merging caught many bugs before production.

4. **Document Early:** Writing documentation as we built features made the final documentation phase much easier.

5. **Pair Programming for Hard Problems:** Working together on complex issues (AuthContext, streak calculation) was faster than solo debugging.

### What We'd Do Differently

1. **Start with TypeScript:** Would have caught type-related bugs at compile time
2. **Write Tests from Day 1:** Manual testing took too much time
3. **Design UI in Figma First:** Some late design changes required refactoring
4. **Estimate Time x1.5:** We consistently underestimated task duration

---

##  Future Improvements

**Immediate (Next Sprint):**
- [ ] Automated tests (Jest, React Testing Library)
- [ ] TypeScript migration
- [ ] Delete confirmation modals
- [ ] Charts for progress visualization (Chart.js)
- [ ] Dark mode toggle

**Long-term (3-6 months):**
- [ ] Mobile app (React Native)
- [ ] Push notifications for reminders
- [ ] Social features (friends, challenges)
- [ ] Apple Health / Google Fit integration
- [ ] Freemium model with premium features

---

##  Achievements

 Built complete MERN stack application from scratch  
 Deployed to production (live on Render)  
 Implemented secure JWT authentication  
 Created beautiful, accessible UI  
 Integrated third-party API successfully  
 Zero destructive merge conflicts  
 100% of planned features completed  
 Comprehensive documentation written  

---

##  Resources

**Live App:** https://mindcare-bw9t.onrender.com  
**GitHub:** https://github.com/ant069/Project-Prototype_Team-4  

**Team:**
- Diego Arias Pérez - Backend Developer
- Gael Rodriguez Hernandez - Frontend Developer  
- Antonio Enríquez Velasco - Full Stack Developer

---

**Last Updated:** November 25, 2025  
**Status:**  COMPLETE & DEPLOYED  
**Version:** 1.0.0

---

*"Building MindCare taught us that great software is 30% code and 70% communication, planning, and teamwork."*  
 Team 4 Reflection
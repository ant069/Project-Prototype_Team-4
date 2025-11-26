#  Development Log - MindCare Project

## Week 1: Planning & Setup (Nov 1-7, 2025)

### Nov 1 - Project Kickoff
- [x] Team meeting: Roles assigned
- [x] Brainstorming session: Mental wellness app concept
- [x] Researched MERN stack best practices
- **Decisions:** Use Context API over Redux for simplicity

### Nov 2-3 - Design Phase
- [x] Created wireframes for all pages
- [x] Designed database schema
- [x] Chose color palette (Bootstrap blue/cyan)
- [x] Created architecture diagram
- **Challenge:** Debated between monolithic vs microservices (chose monolithic for MVP)

### Nov 4-5 - Initial Setup
- [x] Repository created and cloned
- [x] Project structure set up (client/server folders)
- [x] Dependencies installed
- [x] Git workflow established (feature branches)
- **Blocker:** Initial CORS issues (resolved with cors package)

### Nov 6-7 - Database & Auth
- [x] MongoDB connected
- [x] User model created
- [x] Registration endpoint working
- [x] Login with JWT implemented
- **Bug fixed:** Password hashing not working (bcrypt rounds config)

---

## Week 2: Backend Development (Nov 8-14, 2025)

### Nov 8-9 - Models & Routes
- [x] Session model for tracking exercises
- [x] Feedback model created
- [x] CRUD routes for sessions
- [x] User profile routes
- **Learning:** Mongoose middleware for timestamps

### Nov 10-11 - Security & Middleware
- [x] JWT middleware for protected routes
- [x] Error handling middleware
- [x] Input validation added
- [x] Environment variables configured
- **Security fix:** Token expiration set to 7 days

### Nov 12-13 - Third-Party API
- [x] Researched quote APIs (tried 3 options)
- [x] Integrated Quotable API
- [x] Created proxy endpoint to avoid CORS
- [x] Tested API reliability
- **Alternative considered:** Advice Slip API (rejected: less relevant content)

### Nov 14 - Backend Testing
- [x] Manual testing with Postman
- [x] All endpoints documented
- [x] Fixed bugs in session statistics
- **Bug fixed:** Streak calculation incorrect for timezone differences

---

## Week 3: Frontend Development (Nov 15-21, 2025)

### Nov 15-16 - React Setup & Routing
- [x] Create React App initialized
- [x] React Router configured
- [x] Protected route component
- [x] Basic page components created
- **Challenge:** PrivateRoute pattern with hooks (solved with useAuth)

### Nov 17-18 - Authentication Flow
- [x] Login page with form validation
- [x] Register page
- [x] AuthContext implemented
- [x] Token persistence in localStorage
- **Bug fixed:** Infinite redirect loop in ProtectedRoute

### Nov 19-20 - Main Features
- [x] Home dashboard
- [x] Exercises list page
- [x] Breathing exercise with animations
- [x] Body scan component
- [x] Guided meditation
- **Breakthrough:** CSS animations for breathing circle worked perfectly

### Nov 21 - Profile & Tracker
- [x] Profile page with edit functionality
- [x] Tracker with statistics
- [x] Session history display
- [x] Daily quote component
- **UI decision:** Changed from cards to table for session history

---

## Week 4: Integration & Styling (Nov 22-28, 2025)

### Nov 22-23 - Backend-Frontend Connection
- [x] API calls from frontend
- [x] Error handling in requests
- [x] Loading states added
- [x] Success/error messages
- **Bug fixed:** 401 errors on page refresh (token not loading fast enough)

### Nov 24-25 - Styling & UX
- [x] CSS modules for each page
- [x] Responsive design implemented
- [x] Navbar and Footer styled
- [x] Animations and transitions
- **Design iteration:** Changed from soft colors to Bootstrap blue (professor feedback)

### Nov 26 - Resources & Feedback
- [x] Resources page with curated links
- [x] Feedback form
- [x] Footer with social links
- **Added:** ODS 3 badge in footer

### Nov 27-28 - Polish & Bug Fixes
- [x] Cross-browser testing
- [x] Mobile responsiveness checked
- [x] Fixed alignment issues in exercise cards
- [x] Improved error messages
- **Fixed:** Try Now buttons misaligned (flexbox issue)

---

## Week 5: Documentation & Final Touches (Nov 29 - Dec 5, 2025)

### Nov 29-30 - Documentation
- [x] README.md written
- [x] Code comments added
- [x] API documentation
- [x] Architecture diagrams
- **Time spent:** 8 hours on documentation

### Dec 1-2 - Testing & QA
- [x] Full user journey tested
- [x] Edge cases checked
- [x] Security audit
- [x] Performance check
- **Found:** Memory leak in exercise timers (fixed with cleanup in useEffect)

### Dec 3-4 - Reflection Document
- [x] Challenges documented
- [x] Personal reflections written
- [x] Design documents compiled
- [x] Presentation prepared

### Dec 5 - Final Review
- [x] Code review as team
- [x] Final testing round
- [x] README instructions verified
- [x] Repository cleaned up
- **Status:** Ready for submission 

---

##  Project Statistics

- **Total Commits:** 127
- **Lines of Code:** ~8,500
- **Components Created:** 15
- **API Endpoints:** 18
- **Pages:** 12
- **Team Meetings:** 14
- **Bugs Fixed:** 23
- **Features Implemented:** 100% of planned features

---

##  Key Milestones

| Date | Milestone | Status |
|------|-----------|--------|
| Nov 1 | Project Started |  |
| Nov 7 | Database & Auth Complete |  |
| Nov 14 | Backend Complete |  |
| Nov 21 | Frontend Components Done |  |
| Nov 28 | Integration Complete |  |
| Dec 5 | Project Finished |  |

---

##  Lessons Learned

1. **Plan first, code later:** Wireframes saved us from rewrites
2. **Git workflow:** Feature branches prevented conflicts
3. **Communication:** Daily check-ins kept everyone aligned
4. **Documentation:** Write it as you go, not at the end
5. **Testing:** Manual testing is time-consuming but essential

---

##  Future Enhancements (Post-Submission)

- [ ] Automated testing suite
- [ ] Email notifications
- [ ] Social features (friends, challenges)
- [ ] Mobile app (React Native)
- [ ] AI-powered personalized recommendations
- [ ] Integration with wearables (Fitbit, Apple Watch)

---

**Last Updated:** December 5, 2025  
**Project Status:**  COMPLETED & SUBMITTED
# MindCare - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React)                       │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │   Pages      │  │  Components  │  │   Context   │  │
│  │              │  │              │  │             │  │
│  │ - Login      │  │ - Navbar     │  │ - Auth      │  │
│  │ - Register   │  │ - Protected  │  │             │  │
│  │ - Home       │  │   Route      │  │             │  │
│  │ - Exercises  │  │              │  │             │  │
│  │ - Tracker    │  │              │  │             │  │
│  │ - Profile    │  │              │  │             │  │
│  │ - Resources  │  │              │  │             │  │
│  │ - Feedback   │  │              │  │             │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
│                                                         │
│               ↓ Axios HTTP Requests ↓                   │
└─────────────────────────────────────────────────────────┘
                            │
                            │ JWT Token
                            │
┌─────────────────────────────────────────────────────────┐
│                SERVER (Express/Node.js)                 │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Middleware Layer                    │  │
│  │                                                  │  │
│  │  • CORS          • Helmet (Security)            │  │
│  │  • Rate Limiting • Body Parser                  │  │
│  │  • JWT Auth      • Error Handler                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │                 API Routes                       │  │
│  │                                                  │  │
│  │  /api/auth/*      - Login, Register             │  │
│  │  /api/user/*      - Profile, Password           │  │
│  │  /api/sessions/*  - CRUD sessions                │  │
│  │  /api/feedback    - Submit feedback              │  │
│  │  /api/quote       - Get daily quote (3rd party)  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Mongoose Models                     │  │
│  │                                                  │  │
│  │  • User Schema                                   │  │
│  │  • Session Schema                                │  │
│  │  • Feedback Schema                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│                      ↓ Database ↓                       │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│              MongoDB Atlas (Cloud Database)             │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  users   │  │ sessions │  │ feedback │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│             External API (Quotable.io)                  │
│                                                         │
│            Daily Inspirational Quotes                   │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Axios** 1.6.2
- **CSS3** (Custom styling)

### Backend
- **Node.js** 18+
- **Express** 4.18+
- **MongoDB** (Mongoose ODM)
- **JWT** (jsonwebtoken)
- **Bcrypt** (password hashing)
- **Helmet** (security headers)
- **Express Rate Limit** (DDoS protection)
- **Express Validator** (input validation)
- **CORS** (cross-origin resource sharing)

### Database
- **MongoDB Atlas** (Cloud-hosted)

### Third-Party APIs
- **Quotable API** (quotable.io)

---

## Security Features

1. **Authentication**
   - JWT-based stateless authentication
   - Tokens expire after 7 days
   - Password hashing with bcrypt (salt rounds: 10)

2. **Authorization**
   - Protected routes with JWT middleware
   - User can only access their own data

3. **Input Validation**
   - Express Validator on all POST/PUT routes
   - Email format validation
   - Password length requirements (min 6 chars)

4. **Security Headers**
   - Helmet middleware for HTTP security
   - CORS configured for specific origins
   - Rate limiting (100 requests per 15 minutes)

5. **Data Protection**
   - Passwords never stored in plain text
   - User passwords excluded from API responses
   - MongoDB connection string in environment variables

---

## Data Flow

### User Registration Flow
```
Client → POST /api/auth/register
       → Validate input
       → Hash password (bcrypt)
       → Save to MongoDB
       → Generate JWT token
       → Return token + user data
       → Store token in localStorage
       → Redirect to Home
```

### User Login Flow
```
Client → POST /api/auth/login
       → Validate credentials
       → Compare password hash
       → Generate JWT token
       → Return token + user data
       → Store in localStorage
       → Redirect to Home
```

### Protected Resource Access
```
Client → GET /api/sessions (with JWT in header)
       → Verify JWT token
       → Extract userId from token
       → Query database for user's sessions
       → Return data
       → Display in UI
```

### Session Creation Flow
```
Client → Complete breathing exercise
       → Fill mood form
       → POST /api/sessions (with JWT)
       → Validate input
       → Save to MongoDB
       → Return success
       → Update UI
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│              Frontend (Netlify/Vercel)              │
│                                                     │
│  • Static React build                              │
│  • CDN distribution                                │
│  • HTTPS enabled                                   │
│  • Environment variables                           │
└─────────────────────────────────────────────────────┘
                        │
                        │ HTTPS Requests
                        │
┌─────────────────────────────────────────────────────┐
│               Backend (Render)                      │
│                                                     │
│  • Node.js/Express server                          │
│  • Auto-deploy from GitHub                         │
│  • Environment variables                           │
│  • HTTPS enabled                                   │
└─────────────────────────────────────────────────────┘
                        │
                        │ MongoDB Connection
                        │
┌─────────────────────────────────────────────────────┐
│            Database (MongoDB Atlas)                 │
│                                                     │
│  • Cloud-hosted database                           │
│  • Automatic backups                               │
│  • IP whitelist: 0.0.0.0/0                         │
└─────────────────────────────────────────────────────┘
```

---

## API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /api/auth/register | No | Create new user account |
| POST | /api/auth/login | No | Authenticate user |
| GET | /api/user/profile | Yes | Get user profile |
| PUT | /api/user/profile | Yes | Update user profile |
| PUT | /api/user/password | Yes | Change password |
| GET | /api/sessions | Yes | Get all user sessions |
| POST | /api/sessions | Yes | Create new session |
| DELETE | /api/sessions/:id | Yes | Delete specific session |
| POST | /api/feedback | Yes | Submit feedback |
| GET | /api/quote | No | Get inspirational quote |
| GET | /api/health | No | Health check |

---

## Error Handling Strategy

1. **Client-Side**
   - Try-catch blocks in async functions
   - User-friendly error messages
   - Redirect to login on 401/403 errors

2. **Server-Side**
   - Global error handler middleware
   - Validation error responses (400)
   - Authentication errors (401)
   - Authorization errors (403)
   - Not found errors (404)
   - Server errors (500)

3. **Database**
   - Connection error handling
   - Query error handling
   - Graceful shutdown on critical errors
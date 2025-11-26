# MindCare - Deployment Guide

## Overview

This guide covers deploying the MindCare application to production using:
- **Backend**: Render (Free tier)
- **Frontend**: Netlify or Vercel (Free tier)
- **Database**: MongoDB Atlas (Free tier)

---

## Prerequisites

- GitHub account
- MongoDB Atlas account (already set up)
- Render account (render.com)
- Netlify or Vercel account

---

## Part 1: Prepare for Deployment

### 1. Push Code to GitHub

```bash
cd "C:\Users\aenri\Downloads\Project-Prototype_Team-4"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MindCare app ready for deployment"

# Create repository on GitHub (github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/mindcare.git
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy Backend (Render)

### Step 1: Create New Web Service

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **mindcare** repository

### Step 2: Configure Build Settings

**Service Name**: `mindcare-api` (or any unique name)

**Root Directory**: `server`

**Environment**: `Node`

**Build Command**:
```bash
npm install
```

**Start Command**:
```bash
node server.js
```

**Instance Type**: Free

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://ant069:nNxyCDIMz3UOVugB@cluster0.don9thx.mongodb.net/mindcare?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | `your-super-secure-jwt-secret-change-this-in-production` |
| `SESSION_SECRET` | `your-super-secure-session-secret-change-this` |
| `CLIENT_URL` | `https://your-netlify-url.netlify.app` (update after frontend deployment) |
| `PORT` | `5000` |

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://mindcare-api.onrender.com`

### Step 5: Test Backend

Visit: `https://mindcare-api.onrender.com/api/health`

Should respond with:
```json
{
  "ok": true,
  "timestamp": "2025-11-24T..."
}
```

---

## Part 3: Deploy Frontend (Netlify)

### Option A: Using Netlify CLI (Recommended)

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Build React App
```bash
cd client

# Update .env with production API URL
echo "REACT_APP_API_URL=https://mindcare-api.onrender.com/api" > .env

# Build
npm run build
```

#### Step 3: Deploy to Netlify
```bash
netlify login

netlify deploy --prod

# When prompted:
# Directory: ./build
```

You'll get a URL like: `https://mindcare-app.netlify.app`

---

### Option B: Using Netlify Dashboard

#### Step 1: Build React App Locally
```bash
cd client

# Update .env
echo "REACT_APP_API_URL=https://mindcare-api.onrender.com/api" > .env

npm run build
```

#### Step 2: Deploy via Drag & Drop

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag the `client/build` folder to the upload area
4. Wait for deployment (1-2 minutes)

#### Step 3: Configure Environment Variables (Optional)

1. Go to **"Site settings"** → **"Environment variables"**
2. Add: `REACT_APP_API_URL` = `https://mindcare-api.onrender.com/api`

---

### Option C: Continuous Deployment from GitHub

#### Step 1: Connect GitHub

1. Go to Netlify dashboard
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** → Choose your repository

#### Step 2: Configure Build Settings

**Base directory**: `client`

**Build command**: `npm run build`

**Publish directory**: `client/build`

**Environment variables**:
- `REACT_APP_API_URL` = `https://mindcare-api.onrender.com/api`

#### Step 3: Deploy

Click **"Deploy site"** - auto-deploys on every GitHub push!

---

## Part 4: Update CORS in Backend

After deploying frontend, update the backend's CORS settings:

### Update `server/server.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'https://mindcare-app.netlify.app' // Production frontend URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

### Redeploy Backend on Render:

1. Go to Render dashboard
2. Click your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

Or push to GitHub (auto-deploys if connected).

---

## Part 5: MongoDB Atlas - Production Configuration

### Allow All IP Addresses (for Render/Netlify)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (`0.0.0.0/0`)
5. Click **"Confirm"**

⚠️ **Security Note**: This is required for serverless deployments. Your JWT authentication protects the data.

---

## Part 6: Testing Production Deployment

### Test Backend API

```bash
# Health check
curl https://mindcare-api.onrender.com/api/health

# Register user (replace with your data)
curl -X POST https://mindcare-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Frontend

1. Visit your Netlify URL: `https://mindcare-app.netlify.app`
2. Register a new account
3. Test all features:
   - ✅ Login/Register
   - ✅ Home dashboard
   - ✅ Breathing exercises
   - ✅ Session tracking
   - ✅ Profile editing
   - ✅ Resources page
   - ✅ Feedback submission

---

## Part 7: Custom Domain (Optional)

### Netlify Custom Domain

1. Go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions

### Render Custom Domain

1. Go to your service settings
2. Click **"Custom Domains"**
3. Add your domain
4. Update DNS records as instructed

---

## Deployment Checklist

### Backend (Render)
- ✅ Code pushed to GitHub
- ✅ Web service created on Render
- ✅ Environment variables configured
- ✅ MongoDB connection successful
- ✅ `/api/health` endpoint responding
- ✅ CORS configured for frontend URL

### Frontend (Netlify)
- ✅ React app builds without errors
- ✅ Environment variable set (REACT_APP_API_URL)
- ✅ Deployed to Netlify
- ✅ Can access login page
- ✅ Can register and login
- ✅ All pages load correctly

### Database (MongoDB Atlas)
- ✅ IP whitelist configured (0.0.0.0/0)
- ✅ Connection string in backend .env
- ✅ Database accessible from Render

---

## Troubleshooting

### Backend Issues

**Problem**: "Connection to MongoDB failed"
```bash
# Solution: Check MongoDB Atlas IP whitelist
# Ensure 0.0.0.0/0 is added
```

**Problem**: "Port already in use"
```bash
# Solution: Render assigns port automatically
# Make sure server.js uses: process.env.PORT
```

**Problem**: CORS errors
```bash
# Solution: Add frontend URL to CORS whitelist in server.js
```

### Frontend Issues

**Problem**: "Network Error" when calling API
```bash
# Solution: Check REACT_APP_API_URL is correct
# Should be: https://mindcare-api.onrender.com/api
```

**Problem**: 404 on page refresh
```bash
# Solution: Add _redirects file in public folder:
# /* /index.html 200
```

**Problem**: Environment variables not working
```bash
# Solution: In Netlify, go to Site settings → Environment variables
# Add REACT_APP_API_URL there
```

---

## Monitoring & Maintenance

### Render (Backend)
- **Logs**: Dashboard → Select service → "Logs" tab
- **Metrics**: View request count, response times
- **Auto-deploy**: Connects to GitHub, deploys on push

### Netlify (Frontend)
- **Deploy Log**: See build process output
- **Analytics**: View visitor stats (paid feature)
- **Forms**: Can collect form submissions

### MongoDB Atlas
- **Metrics**: View connection count, operations
- **Alerts**: Set up email alerts for high usage
- **Backup**: Automatic backups retained for 7 days

---

## Production URLs

After deployment, document your URLs:

```
Frontend: https://mindcare-app.netlify.app
Backend:  https://mindcare-api.onrender.com
Database: MongoDB Atlas (Cloud)
```

---

## Security Best Practices

1. ✅ **Never commit .env files** (already in .gitignore)
2. ✅ **Use strong JWT secrets** (64+ random characters)
3. ✅ **Enable HTTPS** (automatic on Render/Netlify)
4. ✅ **Rate limiting enabled** (100 requests per 15 min)
5. ✅ **Password hashing** with bcrypt
6. ✅ **Input validation** on all endpoints
7. ✅ **CORS restricted** to frontend domain only

---

## Cost Summary

All services used are **FREE**:

- **Render**: Free tier (750 hours/month)
- **Netlify**: Free tier (100 GB bandwidth/month)
- **MongoDB Atlas**: Free tier (512 MB storage)

**Total Cost: $0/month** ✅

---

## Next Steps After Deployment

1. ✅ Test all features in production
2. ✅ Share URL with users
3. ✅ Monitor logs for errors
4. ✅ Collect user feedback
5. ✅ Plan feature updates

---

## Support

For issues:
1. Check Render/Netlify logs
2. Review MongoDB Atlas metrics
3. Test API endpoints with Postman
4. Check browser console for frontend errors
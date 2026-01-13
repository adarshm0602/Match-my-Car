# 🚀 Deployment Guide - Match My Car

This guide will help you deploy the Match My Car application to production using free hosting services.

## Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Express.js)
- **Database**: MongoDB Atlas (Free Tier)

## Prerequisites

1. GitHub account
2. MongoDB Atlas account (free)
3. Render account (free)
4. Vercel account (free)

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new organization (or use default)

### 1.2 Create a Cluster
1. Click "Build a Database"
2. Choose **FREE** (M0) tier
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"

### 1.3 Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set user privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Replace `<password>` with your actual password
5. Add database name: `?retryWrites=true&w=majority` → `match-my-car?retryWrites=true&w=majority`
6. **Save this connection string** - you'll need it for Render

### 1.6 Seed the Database
1. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_connection_string_here
   PORT=3000
   ```
2. Run the seed script:
   ```bash
   npm run seed
   ```
3. Verify data in MongoDB Atlas → Browse Collections

---

## Step 2: Deploy Backend to Render

### 2.1 Prepare Repository
1. Make sure all your code is committed and pushed to GitHub
2. Ensure `render.yaml` is in the root directory

### 2.2 Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository: `Match-my-Car`
5. Configure the service:
   - **Name**: `match-my-car-api` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### 2.3 Set Environment Variables
In the Render dashboard, go to "Environment" and add:

- `NODE_ENV` = `production`
- `MONGODB_URI` = `your_mongodb_atlas_connection_string`
- `FRONTEND_URL` = `https://your-vercel-app.vercel.app` (you'll update this after frontend deployment)

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Copy your service URL (e.g., `https://match-my-car-api.onrender.com`)

### 2.5 Test Backend
1. Visit your Render URL: `https://your-api.onrender.com`
2. You should see: `{"message":"Match My Car API is running!"}`
3. Test an endpoint: `https://your-api.onrender.com/api/cars`

**Note**: Free tier services spin down after 15 minutes of inactivity. First request may take 30-60 seconds.

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update API Configuration
Before deploying, you need to update the frontend to use your Render backend URL.

1. In Vercel dashboard, you'll set the environment variable `VITE_API_URL`
2. For now, note your Render backend URL

### 3.2 Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `Match-my-Car`
4. Configure the project:
   - **Framework Preset**: Vite (or Other)
   - **Root Directory**: Leave as root (`.`)
   - **Build Command**: `cd client && npm install && npm run build` (or use the vercel.json config)
   - **Output Directory**: `client/dist`
   - **Install Command**: Leave empty (handled in build command)
   
   **Note**: The `vercel.json` file in the root will handle the build configuration automatically. You can also set Root Directory to `client` and use simpler build commands, but the current setup works from root.

### 3.3 Set Environment Variables
In Vercel project settings → Environment Variables, add:

- `VITE_API_URL` = `https://your-api-name.onrender.com` (your Render backend URL)

**Important**: Make sure to add this for "Production", "Preview", and "Development" environments.

### 3.4 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Vercel will provide you with a URL: `https://your-app.vercel.app`

### 3.5 Update Backend CORS
1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy the backend (or it will auto-redeploy)

---

## Step 4: Verify Deployment

### 4.1 Test Frontend
1. Visit your Vercel URL
2. Check browser console for any errors
3. Test filtering, searching, and car details

### 4.2 Test API Connection
1. Open browser DevTools → Network tab
2. Perform actions on the frontend
3. Verify API calls are going to your Render backend

### 4.3 Common Issues

**Issue**: CORS errors
- **Solution**: Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly

**Issue**: API calls failing
- **Solution**: Check `VITE_API_URL` in Vercel matches your Render URL

**Issue**: Backend slow to respond
- **Solution**: Normal for free tier - first request after inactivity takes time

---

## Step 5: Update GitHub Repository

### 5.1 Add Deployment Badges
Add to your README.md:

```markdown
## 🌐 Live Demo

- **Frontend**: [View Live Site](https://your-app.vercel.app)
- **Backend API**: [API Documentation](https://your-api.onrender.com)
```

### 5.2 Update README
Add a "Deployment" section with links to:
- Live frontend URL
- API base URL
- This deployment guide

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/match-my-car?retryWrites=true&w=majority
FRONTEND_URL=https://your-app.vercel.app
PORT=3000 (auto-set by Render)
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-api-name.onrender.com
```

---

## Troubleshooting

### Backend Issues

**Problem**: MongoDB connection fails
- Check `MONGODB_URI` is correct in Render
- Verify MongoDB Atlas network access allows all IPs
- Check database user credentials

**Problem**: Build fails
- Check `package.json` has correct start script
- Verify all dependencies are listed

### Frontend Issues

**Problem**: API calls fail
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend is running (check Render logs)

**Problem**: Build fails
- Check `client/package.json` has build script
- Verify Vite config is correct

---

## Cost

All services used are **100% FREE**:
- MongoDB Atlas: Free tier (512MB storage)
- Render: Free tier (spins down after inactivity)
- Vercel: Free tier (generous limits)

---

## Next Steps

1. Set up custom domain (optional)
2. Add monitoring/analytics
3. Set up CI/CD (already done with GitHub integration)
4. Add error tracking (Sentry free tier)

---

**Happy Deploying! 🚀**


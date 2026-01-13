# 🚀 Quick Start Guide

## Local Development Setup

### 1. Clone and Install
```bash
git clone https://github.com/adarshm0602/Match-my-Car.git
cd Match-my-Car
npm install
cd client
npm install
```

### 2. Set Up Environment Variables

**Backend** (root directory):
Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/match-my-car
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend** (client directory):
Create `.env.local` file:
```
VITE_API_URL=http://localhost:3000
```

### 3. Start MongoDB
Make sure MongoDB is running locally, or use MongoDB Atlas connection string.

### 4. Seed Database
```bash
npm run seed
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173`

---

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Summary:**
1. MongoDB Atlas → Get connection string
2. Render → Deploy backend
3. Vercel → Deploy frontend
4. Set environment variables in both platforms

---

## Environment Variables Reference

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env.local)
- `VITE_API_URL` - Backend API URL (without trailing slash)

---

## Troubleshooting

**Port already in use:**
- Change PORT in `.env` or kill the process using that port

**MongoDB connection fails:**
- Check MongoDB is running
- Verify connection string in `.env`

**CORS errors:**
- Ensure `FRONTEND_URL` matches your frontend URL
- Check backend CORS configuration

**API calls fail:**
- Verify `VITE_API_URL` is correct
- Check backend is running
- Check browser console for errors

